#!/usr/bin/env node
/* Meter Manager — local static server + NESCO proxy.
   Run:  node server.js
   Open: http://localhost:3000

   The NESCO customer portal (customer.nesco.gov.bd) renders its data only
   during a POST that must reuse the session cookie issued by a preceding
   GET. Browsers cannot hold that session across a cross-origin CORS call,
   so a tiny server-side proxy is required. This file implements it.

   Endpoint:  GET /nesco?cust=XXXXXXXX
   Returns:   JSON { ok, info, rechargeHistory: [...] }
   */

const http = require('http');
const https = require('https');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3000;
const ROOT = __dirname;
const PANEL = 'https://customer.nesco.gov.bd/pre/panel';
const SUBMIT_HISTORY = '\u09B0\u09BF\u099A\u09BE\u09B0\u09CD\u099C \u09B9\u09BF\u09B8\u09CD\u099F\u09CD\u09B0\u09BF'; // রিচার্জ হিস্ট্রি

/* ---------- tiny https request helper ---------- */
function req(url, opts = {}) {
  return new Promise((resolve, reject) => {
    const u = new URL(url);
    const headers = Object.assign(
      { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)', Accept: '*/*' },
      opts.headers || {}
    );
    const r = https.request(u, { method: opts.method || 'GET', headers }, res => {
      const chunks = [];
      res.on('data', c => chunks.push(c));
      res.on('end', () => resolve({ status: res.statusCode, headers: res.headers, body: Buffer.concat(chunks) }));
    });
    r.on('error', reject);
    if (opts.body) r.write(opts.body);
    r.end();
  });
}

function sessionCookie(headers) {
  const set = headers['set-cookie'];
  if (!set) return '';
  const first = set[0].split(';')[0].trim();
  const keep = first.replace(/=.*$/, '');
  // keep same-named cookies across responses
  const out = set.map(c => c.split(';')[0].trim()).filter(c => c.startsWith(keep) || true);
  return out.join('; ');
}

function extractToken(html) {
  const m = html.match(/name="_token"\s+value="([^"]+)"/) || html.match(/_token" value="([^"]+)"/);
  return m ? m[1] : null;
}

function attr(html, re) {
  const m = html.match(re);
  return m ? m[1].trim() : '';
}

function parseHtml(html) {
  const start = html.indexOf('id="con_info_div"');
  if (start < 0) {
    return { info: {}, history: [] };
  }
  let end = html.indexOf('consumerRechargeData', start);
  if (end < 0) end = html.indexOf('arrear_notice_div', start);
  if (end < 0) end = html.length;
  const seg = html.slice(start, end);
  // Only extract readonly inputs (actual customer data fields)
  const inputs = [...seg.matchAll(/<input[^>]*readonly[^>]*value="([^"]*)"/g)].map(m => m[1]);
  const take = i => (inputs[i] || '').trim();
  const info = {
    name: take(0),
    fatherOrHusband: take(1),
    address: take(2),
    mobile: take(3),
    office: take(4),
    feeder: take(5),
    consumerNo: take(6),
    meterNo: take(7),
    sanctionedLoad: take(8),
    tariff: take(9),
    meterType: take(10),
    meterStatus: take(11),
    installDate: take(12),
    minimumRecharge: take(13),
    balance: take(14),
  };
  const hist = [];
  const reRows = /<[^>]*?consumerRechargeData[^>]*>/g;
  let m2;
  while ((m2 = reRows.exec(html))) {
    const tag = m2[0];
    const keys = ['order', 'token', 'seq', 'rent', 'demandcharge', 'tax', 'pfc', 'subsidyamount',
      'purchaseamount', 'totalamount', 'purchaseenergy', 'salename', 'purchasedate',
      'debtamount', 'paidamount', 'meterno', 'customerno', 'customername', 'tariff', 'organization'];
    const o = {};
    keys.forEach(k => { o[k] = attr(tag, new RegExp(`data-${k}=["']([^"']*)`, 'i')); });
    if (o.order || o.token) hist.push(o);
  }
  return { info, history: hist };
}

/* ---------- type NESCO proxy ---------- */
async function nescoLookup(cust) {
  cust = String(cust).replace(/\D/g, '').slice(0, 11);
  if (!cust) throw new Error('missing customer number');

  const get = await req(PANEL);
  const token = extractToken(get.body.toString('utf8'));
  if (!token) throw new Error('no csrf token');
  const cookie = sessionCookie(get.headers);
  if (!cookie) throw new Error('no session cookie');

  const form = '_token=' + encodeURIComponent(token) +
    '&cust_no=' + encodeURIComponent(cust) +
    '&submit=' + encodeURIComponent(SUBMIT_HISTORY);
  const post = await req(PANEL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Cookie': cookie,
      'Origin': 'https://customer.nesco.gov.bd',
      'Referer': PANEL,
    },
    body: form,
  });
  if (post.status !== 200) throw new Error('nesco portal http ' + post.status);
  const { info, history } = parseHtml(post.body.toString('utf8'));
  if (!info.consumerNo && !info.name && !info.meterNo) throw new Error('NESCO returned no customer data. The portal may have changed or blocked this request.');
  return {
    info,
    history: history.map(h => ({
      orderId: h.order, tokenNo: h.token, seqNo: h.seq,
      meterRent: +(h.rent || 0), demandCharge: +(h.demandcharge || 0),
      vat: +(h.tax || 0), pfcCharge: +(h.pfc || 0),
      subsidy: +(h.subsidyamount || 0), electricityAmount: +(h.purchaseamount || 0),
      rechargeAmount: +(h.totalamount || 0), energyUnit: +(h.purchaseenergy || 0),
      method: h.salename || '', rechargeDate: h.purchasedate || '',
      debtAmount: +(h.debtamount || 0), paidAmount: +(h.paidamount || 0),
      meterNo: h.meterno || '', customerNo: h.customerno || '',
      customerName: h.customername || '', tariff: h.tariff || '', organization: h.organization || '',
    })),
  };
}

/* ---------- static server ---------- */
const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.webmanifest': 'application/manifest+json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.ico': 'image/x-icon',
  '.txt': 'text/plain; charset=utf-8',
  '.md': 'text/markdown; charset=utf-8',
};

const server = http.createServer((req, res) => {
  const url = new URL(req.url, `http://127.0.0.1:${PORT}`);
  const corsHeaders = { 'Content-Type': 'application/json; charset=utf-8', 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Methods': 'GET, OPTIONS', 'Access-Control-Allow-Headers': 'Content-Type' };
  if (req.method === 'OPTIONS') { res.writeHead(204, corsHeaders); res.end(); return; }
  if (url.pathname === '/nesco') {
    const cust = url.searchParams.get('cust') || '';
    if (url.searchParams.get('probe')) {
      res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8', 'Access-Control-Allow-Origin': '*' });
      res.end(JSON.stringify({ ok: true, probe: true }));
      return;
    }
    nescoLookup(cust)
      .then(data => {
        res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8', 'Access-Control-Allow-Origin': '*' });
        res.end(JSON.stringify({ ok: true, ...data }));
      })
      .catch(err => {
        res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8', 'Access-Control-Allow-Origin': '*' });
        res.end(JSON.stringify({ ok: false, error: err.message }));
      });
    return;
  }

  let p = decodeURIComponent(url.pathname);
  if (p === '/') p = '/index.html';
  if (/^\/desco\.html\/\d+/i.test(p)) p = '/desco.html';
  if (/^\/nesco\.html\/\d+/i.test(p)) p = '/nesco.html';
  const file = path.normalize(path.join(ROOT, p));
  if (!file.startsWith(ROOT)) { res.writeHead(403); res.end('403'); return; }
  fs.readFile(file, (err, buf) => {
    if (err) { res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' }); res.end('404 Not Found'); return; }
    const ext = path.extname(file).toLowerCase();
    res.writeHead(200, { 'Content-Type': MIME[ext] || 'application/octet-stream', 'Cache-Control': 'no-cache' });
    res.end(buf);
  });
});

server.listen(PORT, '0.0.0.0', () => {
  console.log(`Meter Manager running on http://0.0.0.0:${PORT}`);
  console.log(`  NESCO proxy:  /nesco?v=...`);
});