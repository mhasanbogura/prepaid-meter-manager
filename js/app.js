/* Meter Manager v1.0.4 — reverse-engineered from the PrepaidPro APK+
   Talks directly to the official DESCO prepaid portal APIs. */
'use strict';

/* ================= i18n ================= */
const I18N = {
  en: {
    'app.name': 'Meter Manager',
    'nav.home': 'Home', 'nav.settings': 'Settings', 'nav.help': 'Help & Support', 'nav.about': 'About',
    'drawer.foot': 'Data is fetched directly from the official DESCO portal. We don\'t store your data.',
    'home.title': 'My Meters', 'home.add': 'Add meter', 'home.add.sub': 'Track a DESCO or NESCO prepaid meter',
    'home.empty.title': 'No meter added yet', 'home.empty.text': 'Enter your 8-digit DESCO account number, 12-digit meter number, or NESCO consumer number to see live balance, consumption and recharge history.',
    'home.hero': 'Check your DESCO / NESCO prepaid electricity meter: live balance, daily & monthly usage, average daily cost and recharge history — all in a web.',
    'hero.live': 'Live balance & meter info', 'hero.cost': 'Average cost per day', 'hero.history': 'Total use of this month & last month', 'hero.consumption': 'Daily & monthly consumption', 'hero.recharge': 'Recharge history',
    'home.reorder': 'Drag to reorder', 'home.avg_day': 'Average cost per day: {v}',
    'home.desc': 'Your prepaid meter balances and usage, pulled live from DESCO and NESCO Server.',
    'home.last_updated': 'Updated {t}', 'home.updated_never': 'Not updated yet', 'home.low': 'Low balance',
    'home.refreshing': 'Updating…', 'home.max': 'Maximum 5 meters allowed.',
    'meter.desco': 'DESCO', 'meter.nesco': 'NESCO',
    'meter.remove_q': 'Remove this meter?', 'meter.remove_text': 'The meter will be removed from this device only.',
    'btn.cancel': 'Cancel', 'btn.remove': 'Remove', 'btn.add': 'Add meter', 'btn.close': 'Close', 'btn.ok': 'OK', 'btn.edit': 'Edit',
    'btn.refresh': 'Update',
    'btn.copy': 'Copy token', 'btn.check': 'Check payment status', 'btn.done': 'Done',
    'add.title': 'Add meter', 'add.provider': 'Provider',
    'add.number': 'Account or meter number', 'add.number.hint': 'Enter the 8-digit account number or 12-digit meter number printed on your bill.',
    'add.search': 'Search', 'add.search_desc': 'Search in DESCO database', 'add.search_nes': 'Search in NESCO database',
    'add.found': 'Meter found!', 'add.checking': 'Searching…',
    'add.nickname': 'Nickname (optional)', 'add.nickname_hint': 'e.g. Home, Office',
    'add.notfound': 'Not found in the DESCO database. Check the number and try again.',
    'add.exists': 'This meter is already added.',
    'add.error': 'DESCO server is temporarily unreachable. Try again in a moment.',
    'detail.balance': 'Remaining balance', 'detail.balance_note': 'Meter may be temporarily offline',
    'detail.customer': 'Customer info', 'detail.info': 'Info', 'detail.history': 'Usage',
    'detail.name': 'Name', 'detail.account': 'Account', 'detail.meter': 'Meter', 'detail.route': 'Route',
    'detail.load': 'Sanctioned load', 'detail.tariff': 'Tariff', 'detail.phase': 'Phase', 'detail.status': 'Status',
    'detail.reading_time': 'Last reading: {t}',
    'detail.daily': 'Daily consumption (last 15 days)', 'detail.monthly': 'Monthly consumption (last 12 months)',
    'detail.recharge_history': 'Recharge history', 'detail.recharge_empty': 'No recharges in the last year.',
    'detail.total': 'Total', 'detail.energy': 'Energy', 'detail.vat': 'VAT', 'detail.rebate': 'Rebate',
    'detail.date': 'Date', 'detail.order': 'Order', 'detail.token': 'Token', 'detail.kwh': 'kWh', 'detail.bdt': '৳',
    'detail.chart_unit': 'kWh', 'detail.chart_taka': '৳',
    'detail.consumption_empty': 'No consumption data for this period.',
    'detail.avg_daily': 'Avg. daily cost: {v}',
    'detail.mobile': 'Mobile', 'detail.address': 'Address', 'detail.office': 'Office',
    'detail.meter_type': 'Meter type', 'detail.father': 'Father/Husband', 'detail.feed': 'Feeder',
    'detail.total_use': 'Total use', 'detail.this_month': 'This month', 'detail.last_month': 'Last month',
    'detail.units': 'Units', 'detail.install_date': 'Install date', 'detail.min_recharge': 'Min. recharge', 'detail.method': 'Method',
    'edit.title': 'Edit meter', 'edit.nickname': 'Nickname', 'edit.nickname_hint': 'e.g. Home, Office', 'edit.low_threshold': 'Low balance threshold',
    'nesco.needs_server': 'NESCO needs the local server running. Start it with `node server.js`.',
    'nesco.no_data': 'Not found in the NESCO database. Check the number and try again.',
    'alerts.title': 'Balance alert', 'alerts.body': 'Meter {n} balance fell to {b}. Recharge soon to avoid disconnection.',
    'alerts.perm': 'Notifications are blocked. Enable them in your browser settings.',
    'settings.language': 'Language / ভাষা', 'settings.theme': 'Theme',
    'settings.alerts': 'Balance alerts', 'settings.alerts.enable': 'Low-balance & recharge notifications',
    'settings.alerts.threshold': 'Alert when balance falls below (BDT)', 'settings.alerts.freq': 'Check every',
    'settings.alerts.note': 'Alerts need notification permission. On mobile, install this page (PWA) and keep it open to receive them.',
    'settings.auto': 'Auto update', 'settings.auto.enable': 'Auto-update balances in background',
    'settings.auto.freq': 'Update every',
    'settings.data': 'Meter data', 'settings.data.note': 'Your meters are stored only in this browser (localStorage) and are never sent to any server other than the official DESCO portal API.',
    'settings.clear': 'Remove all meters & reset', 'settings.cleared': 'All meter data cleared.',
    'settings.perm': 'Enable notifications', 'settings.perm.granted': 'Notifications enabled',
    'help.q1': 'How do I add a meter?', 'help.a1': 'Open Home, tap Add meter, choose DESCO, then enter your DESCO prepaid account number (8 digits) or meter number (12 digits). If it exists in the DESCO database, its info will load.',
    'help.q2': 'Why does it say "Account No. does not exist"?', 'help.a2': 'The number was not found in the official DESCO prepaid database. Check the number printed on your meter, bill or receipt and try again.',
    'help.q3': 'Is my data safe?', 'help.a3': 'Yes. Your meter numbers stay in your browser only. All meter data is fetched live from the official DESCO portal and is never stored by this app.',
    'help.contact': 'Need more help?', 'help.contact_text': 'For meter problems, contact the DESCO call centre 16116. For app problems, contact us on WhatsApp.',
    'about.text': 'A simple, private tool to keep an eye on your DESCO or NESCO prepaid electricity meter: live balance, daily & monthly consumption and recharge history.',
    'about.data': 'Data source: prepaid.desco.org.bd',
    'about.disclaimer': 'This is an unofficial viewer. Meter Manager is not affiliated with DESCO. All trademarks belong to their owners.',
    'err.network': 'Network error. Check your connection and try again.',
    'err.server': 'DESCO server is temporarily unreachable.',
    'time.just': 'just now', 'time.min': '{m} min ago', 'time.hour': '{h} h ago',
    'today': 'Today'
  },
  bn: {
    'app.name': 'মিটার ম্যানেজার',
    'nav.home': 'হোম', 'nav.settings': 'সেটিংস', 'nav.help': 'সাহায্য ও সহায়তা', 'nav.about': 'সম্পর্কে',
    'drawer.foot': 'সরকারি ডেসকো পোর্টাল থেকে সরাসরি তথ্য আনা হয়। আমরা আপনার তথ্য সংরক্ষণ করি না।',
    'home.title': 'আমার মিটারসমূহ', 'home.add': 'মিটার যোগ করুন', 'home.add.sub': 'ডেসকো প্রিপেইড মিটার ট্র্যাক করুন',
    'home.empty.title': 'এখনো কোনো মিটার যোগ করা হয়নি', 'home.empty.text': 'ডেসকো ৮ অंকের অ্যাকাউন্ট নম্বর, ১২ অংকের মিটার নম্বর অথবা নেসকো কনজিউমার নম্বর দিন — লাইভ ব্যালেন্স, ব্যবহার ও রিচার্জ ইতিহাস দেখুন।',
    'home.hero': 'ডেসকো/নেসকো প্রিপেইড বিদ্যুৎ মিটার যাচাই করুন: লাইভ ব্যালেন্স, দৈনিক-মাসিক ব্যবহার, গড় দৈনিক খরচ ও রিচার্জ ইতিহাস — সব এক জায়গায়।',
    'hero.live': 'লাইভ ব্যালেন্স ও মিটারের তথ্য', 'hero.cost': 'গড় দৈনিক খরচ', 'hero.history': 'এই মাস ও গত মাসের মোট ব্যবহার', 'hero.consumption': 'দৈনিক ও মাসিক ব্যবহার', 'hero.recharge': 'রিচার্জ ইতিহাস',
    'home.reorder': 'সাজাতে টেনে আনুন', 'home.avg_day': 'গড় খরচ প্রতিদিন: {v}',
    'home.desc': 'ডেসকো ও নেসকো সার্ভার থেকে সরাসরি আনা আপনার প্রিপেইড মিটারের ব্যালেন্স ও ব্যবহার।',
    'home.last_updated': 'আপডেট হয়েছে {t}', 'home.updated_never': 'এখনো আপডেট হয়নি', 'home.low': 'ব্যালেন্স কম',
    'home.refreshing': 'আপডেট হচ্ছে…', 'home.max': 'সর্বোচ্চ ৫টি মিটার যোগ করা যাবে।',
    'meter.desco': 'ডেসকো', 'meter.nesco': 'নেসকো',
    'meter.remove_q': 'এই মিটারটি মুছে ফেলবেন?', 'meter.remove_text': 'মিটারটি শুধু এই ডিভাইস থেকে সরানো হবে।',
    'btn.cancel': 'বাতিল', 'btn.remove': 'মুছে ফেলুন', 'btn.add': 'মিটার যোগ করুন', 'btn.close': 'বন্ধ', 'btn.ok': 'ঠিক আছে', 'btn.edit': 'সম্পাদনা',
    'btn.refresh': 'আপডেট',
    'btn.copy': 'টোকেন কপি', 'btn.check': 'পেমেন্ট স্ট্যাটাস দেখুন', 'btn.done': 'সম্পন্ন',
    'add.title': 'মিটার যোগ করুন', 'add.provider': 'প্রোভাইডার',
    'add.number': 'অ্যাকাউন্ট বা মিটার নম্বর', 'add.number.hint': 'বিলে লেখা ৮ সংখ্যার অ্যাকাউন্ট নম্বর বা ১২ সংখ্যার মিটার নম্বর দিন।',
    'add.search': 'খুঁজুন', 'add.search_desc': 'ডেসকো ডাটাবেজে খুঁজুন', 'add.search_nes': 'নেসকো ডাটাবেজে খুঁজুন',
    'add.found': 'মিটার পাওয়া গেছে!', 'add.checking': 'খোঁজা হচ্ছে…',
    'add.nickname': 'ডাকনাম (ঐচ্ছিক)', 'add.nickname_hint': 'যেমন: বাসা, অফিস',
    'add.notfound': 'ডেসকো ডাটাবেজে পাওয়া যায়নি। নম্বর মিলিয়ে দেখুন।',
    'add.exists': 'এই মিটারটি আগেই যোগ করা হয়েছে।',
    'add.error': 'ডেসকো সার্ভার সাময়িকভাবে অনুপলব্ধ। একটু পরে চেষ্টা করুন।',
    'detail.balance': 'অবশিষ্ট ব্যালেন্স', 'detail.balance_note': 'মিটার সাময়িকভাবে অফলাইনে থাকতে পারে',
    'detail.customer': 'গ্রাহকের তথ্য', 'detail.info': 'তথ্য', 'detail.history': 'ব্যবহার',
    'detail.name': 'নাম', 'detail.account': 'অ্যাকাউন্ট', 'detail.meter': 'মিটার', 'detail.route': 'রুট',
    'detail.load': 'অনুমোদিত লোড', 'detail.tariff': 'ট্যারিফ', 'detail.phase': 'ফেজ', 'detail.status': 'স্ট্যাটাস',
    'detail.reading_time': 'শেষ রিডিং: {t}',
    'detail.daily': 'দৈনিক ব্যবহার (শেষ ১৫ দিন)', 'detail.monthly': 'মাসিক ব্যবহার (শেষ ১২ মাস)',
    'detail.recharge_history': 'রিচার্জ ইতিহাস', 'detail.recharge_empty': 'গত এক বছরে কোনো রিচার্জ নেই।',
    'detail.total': 'মোট', 'detail.energy': 'এনার্জি', 'detail.vat': 'ভ্যাট', 'detail.rebate': 'রিবেট',
    'detail.date': 'তারিখ', 'detail.order': 'অর্ডার', 'detail.token': 'টোকেন', 'detail.kwh': 'কিলোওয়াট', 'detail.bdt': '৳',
    'detail.chart_unit': 'কিলোওয়াট', 'detail.chart_taka': '৳',
    'detail.consumption_empty': 'এই সময়ের কোনো ব্যবহারের তথ্য নেই।',
    'detail.avg_daily': 'গড় দৈনিক খরচ: {v}',
    'detail.mobile': 'মোবাইল', 'detail.address': 'ঠিকানা', 'detail.office': 'অফিস',
    'detail.meter_type': 'মিটারের ধরন', 'detail.father': 'বাবা/স্বামীর নাম', 'detail.feed': 'ফিডার',
    'detail.total_use': 'মোট ব্যবহার', 'detail.this_month': 'এই মাস', 'detail.last_month': 'গত মাস',
    'detail.units': 'ইউনিট', 'detail.install_date': 'ইনস্টল তারিখ', 'detail.min_recharge': 'সর্বনিম্ন রিচার্জ', 'detail.method': 'পদ্ধতি',
    'edit.title': 'মিটার সম্পাদনা', 'edit.nickname': 'ডাকনাম', 'edit.nickname_hint': 'যেমন: বাসা, অফিস', 'edit.low_threshold': 'কম ব্যালেন্স সীমা',
    'nesco.needs_server': 'নেসকোর জন্য লোকাল সার্ভার দরকার। `node server.js` দিয়ে চালু করুন।',
    'nesco.no_data': 'নেসকো ডাটাবেজে পাওয়া যায়নি। নম্বর মিলিয়ে দেখুন।',
    'alerts.title': 'ব্যালেন্স অ্যালার্ট', 'alerts.body': 'মিটার {n} এর ব্যালেন্স {b} এ নেমে এসেছে। সংযোগ বিচ্ছিন্ন হওয়ার আগে রিচার্জ করুন।',
    'alerts.perm': 'নোটিফিকেশন ব্লক করা আছে। ব্রাউজার সেটিংস থেকে অনুমতি দিন।',
    'settings.language': 'ভাষা / Language', 'settings.theme': 'থিম',
    'settings.alerts': 'ব্যালেন্স অ্যালার্ট', 'settings.alerts.enable': 'কম ব্যালেন্স ও রিচার্জ নোটিফিকেশন',
    'settings.alerts.threshold': 'কত টাকার নিচে নেমে গেলে অ্যালার্ট দেবে', 'settings.alerts.freq': 'প্রতি',
    'settings.alerts.note': 'অ্যালার্টের জন্য নোটিফিকেশন অনুমতি প্রয়োজন। মোবাইলে এই পৃষ্ঠাটি (PWA) ইনস্টল করে খোলা রাখুন।',
    'settings.auto': 'স্বয়ংক্রিয় আপডেট', 'settings.auto.enable': 'পটভূমিতে ব্যালেন্স অটো-আপডেট',
    'settings.auto.freq': 'প্রতি',
    'settings.data': 'মিটারের তথ্য', 'settings.data.note': 'আপনার মিটারগুলো শুধু এই ব্রাউজারে (localStorage) থাকে এবং কোনো সার্ভারে পাঠানো হয় না — শুধু সরকারি ডেসকো পোর্টাল API-তে।',
    'settings.clear': 'সব মিটার মুছে রিসেট করুন', 'settings.cleared': 'সব তথ্য মুছে ফেলা হয়েছে।',
    'settings.perm': 'নোটিফিকেশন চালু করুন', 'settings.perm.granted': 'নোটিফিকেশন চালু আছে',
    'help.q1': 'মিটার কীভাবে যোগ করব?', 'help.a1': 'হোম খুলে Add meter চাপুন, ডেসকো বেছে নিন, তারপর বিলে লেখা ৮ সংখ্যার অ্যাকাউন্ট বা ১২ সংখ্যার মিটার নম্বর দিন।',
    'help.q2': '"অ্যাকাউন্ট নম্বর পাওয়া যায়নি" কেন দেখায়?', 'help.a2': 'নম্বরটি সরকারি ডেসকো প্রিপেইড ডাটাবেজে নেই। মিটার, বিল বা রসিদে লেখা নম্বরটি মিলিয়ে আবার চেষ্টা করুন।',
    'help.q3': 'আমার তথ্য কি নিরাপদ?', 'help.a3': 'হ্যাঁ। মিটার নম্বর শুধু আপনার ব্রাউজারে থাকে। সব তথ্য সরাসরি সরকারি ডেসকো পোর্টাল থেকে আসে — এই অ্যাপে সংরক্ষণ হয় না।',
    'help.contact': 'আরও সাহায্য দরকার?', 'help.contact_text': 'মিটার সমস্যায় ডেসকো কল সেন্টার ১৬১১৬। অ্যাপ সমস্যায় হোয়াটসঅ্যাপে যোগাযোগ করুন।',
    'about.text': 'আপনার ডেসকো প্রিপেইড বিদ্যুৎ মিটারের ওপর নজর রাখার একটি সহজ ও গোপনীয় টুল: লাইভ ব্যালেন্স, দৈনিক-মাসিক ব্যবহার ও রিচার্জ ইতিহাস।',
    'about.data': 'তথ্যের উৎস: prepaid.desco.org.bd',
    'about.disclaimer': 'এটি একটি অনানুষ্ঠানিক ভিউয়ার। প্রিপেইডপ্রো ডেসকোর সাথে সম্পর্কিত নয়। সব ট্রেডমার্ক স্ব-স্ব মালিকের।',
    'err.network': 'নেটওয়ার্ক সমস্যা। সংযোগ পরীক্ষা করে আবার চেষ্টা করুন।',
    'err.server': 'ডেসকো সার্ভার সাময়িকভাবে অনুপলব্ধ।',
    'time.just': 'এইমাত্র', 'time.min': '{m} মিনিট আগে', 'time.hour': '{h} ঘণ্টা আগে',
    'today': 'আজ'
  }
};

/* ================= state ================= */
const LS_METERS = 'prepaidpro.meters.v1';
const LS_SETTINGS = 'prepaidpro.settings.v1';
const MAX_METERS = Infinity;
const LOW_BALANCE = 200;
const WHATSAPP = 'https://wa.me/8801721665453';
const DESCO = 'https://prepaid.desco.org.bd';
const NESCO_API = '/nesco';

var state = { meters: [], settings: null };
var currentView = 'home';
var currentMeterId = null;
let langs = I18N.en;

const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];

function loadState() {
  try { state.meters = JSON.parse(localStorage.getItem(LS_METERS)) || []; } catch { state.meters = []; }
  try {
    state.settings = JSON.parse(localStorage.getItem(LS_SETTINGS)) || {};
  } catch { state.settings = {}; }
  state.settings = Object.assign({
    lang: 'en', theme: 'light', alerts: false, alertThreshold: 200,
    alertFreq: 60, autoRefresh: true, autoFreq: 600
  }, state.settings);
}
function saveMeters() { localStorage.setItem(LS_METERS, JSON.stringify(state.meters)); }
function saveSettings() { localStorage.setItem(LS_SETTINGS, JSON.stringify(state.settings)); }

const DRIVE_FOLDER_ID = '1PBrhSIvDk0QrgNS6XeTeA1RDLFPeTqKV';
const DRIVE_API_KEY = 'AIzaSyA4ymjFIbuGVhFsKjxVV46RT-qWqNHNiY4';

async function driveFetchMdByName(fileName) {
  try {
    const q = encodeURIComponent(`'${DRIVE_FOLDER_ID}' in parents and name='${fileName}' and trashed=false`);
    const listUrl = `https://www.googleapis.com/drive/v3/files?q=${q}&key=${DRIVE_API_KEY}&fields=files(id)`;
    const listRes = await fetch(listUrl);
    if (!listRes.ok) return null;
    const listData = await listRes.json();
    if (!listData.files || !listData.files.length) return null;
    const fileId = listData.files[0].id;
    const contentUrl = `https://www.googleapis.com/drive/v3/files/${fileId}?alt=media&key=${DRIVE_API_KEY}`;
    const contentRes = await fetch(contentUrl);
    if (!contentRes.ok) return null;
    return (await contentRes.text()).trim();
  } catch { return null; }
}

async function driveFetchCached(key, fileName) {
  const cached = localStorage.getItem(key);
  if (cached) return cached;
  const content = await driveFetchMdByName(fileName);
  if (content) localStorage.setItem(key, content);
  return content;
}

/* ================= helpers ================= */
function t(key, vars) {
  let s = langs[key] ?? I18N.en[key] ?? key;
  if (vars) for (const k in vars) s = s.replaceAll('{' + k + '}', vars[k]);
  return s;
}
function esc(s) { return String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c])); }
function fmtNum(n) {
  n = Number(n); if (!isFinite(n)) return '–';
  return n.toLocaleString('en-IN', { maximumFractionDigits: 2 });
}
function fmtBdt(n) { return '৳' + fmtNum(n); }
function fmtUnits(n) { n = Number(n); if (!isNaN(n)) return fmtNum(n) + ' kWh'; return '–'; }
function fmtToken(s) {
  if (!s) return '';
  const digits = s.replace(/\D/g, '');
  if (!digits) return s;
  return digits.replace(/(.{4})/g, '$1<br>').replace(/<br>$/, '');
}
function descoTakaToKwh(taka) {
  if (taka <= 0) return 0;
  const tiers = [
    { kwh: 75, rate: 6.18 },
    { kwh: 125, rate: 8.50 },
    { kwh: 100, rate: 9.10 },
    { kwh: 100, rate: 9.62 },
    { kwh: 200, rate: 15.01 },
    { kwh: Infinity, rate: 17.75 }
  ];
  let remaining = taka;
  let totalKwh = 0;
  for (const tier of tiers) {
    const tierCost = tier.kwh * tier.rate;
    if (remaining < tierCost) {
      totalKwh += remaining / tier.rate;
      return Math.round(totalKwh * 100) / 100;
    }
    totalKwh += tier.kwh;
    remaining -= tierCost;
  }
  return Math.round(totalKwh * 100) / 100;
}
function fmtDate(s) {
  if (!s) return '';
  const d = new Date(s); if (isNaN(d)) return String(s);
  return d.toLocaleDateString(langs === I18N.bn ? 'bn-BD' : 'en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
}
function timeAgo(ts) {
  if (!ts) return t('home.updated_never');
  const m = Math.floor((Date.now() - ts) / 60000);
  if (m < 1) return t('time.just');
  if (m < 60) return t('time.min', { m });
  return t('time.hour', { h: Math.floor(m / 60) });
}
function toast(msg, isErr = false) {
  const el = $('#toast');
  el.textContent = msg;
  el.classList.toggle('err', isErr);
  el.hidden = false;
  clearTimeout(el._tm);
  el._tm = setTimeout(() => { el.hidden = true; }, 3200);
}
function pad(n) { return String(n).padStart(2, '0'); }
function todayStr(offsetDays = 0) {
  const d = new Date(); d.setDate(d.getDate() - offsetDays);
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}
function monthStr(offsetMonths = 0) {
  const d = new Date(); d.setDate(1); d.setMonth(d.getMonth() - offsetMonths);
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}`;
}
function bdDigits(str) {
  const map = { '০': '0', '১': '1', '২': '2', '৩': '3', '৪': '4', '৫': '5', '৬': '6', '৭': '7', '৮': '8', '৯': '9' };
  return String(str).replace(/[০-৯]/g, c => map[c]);
}
function notify(title, body) {
  if (!('Notification' in window) || Notification.permission !== 'granted') return;
  try { new Notification(title, { body, icon: 'icons/icon-317.png' }); } catch { /* ignored */ }
}

/* ================= API layer ================= */
function isDemo() {
  return location.search.includes('demo') || localStorage.getItem('prepaidpro.demo') === '1';
}
function mockResponse(path) {
  const now = new Date();
  if (path.includes('getCustomerInfo')) return { code: 200, desc: 'OK', data: { accountNo: '10000001', meterNo: '123456789012', customerName: 'Demo Customer', route: 'R-12', sanctionLoad: '5 kW', tariffSolution: 'D', phaseType: 'Single', status: 'Active' } };
  if (path.includes('getBalance')) return { code: 200, desc: 'OK', data: { balance: 480.5, readingTime: new Date(now.getTime() - 3600000).toISOString() } };
  if (path.includes('getCustomerDailyConsumption')) {
    const data = [];
    for (let i = 14; i >= 0; i--) {
      const d = new Date(); d.setDate(d.getDate() - i);
      const unit = Math.round(6 + Math.sin(i * 1.7) * 4 + Math.random() * 3);
      data.push({ consumptionDate: d.toISOString().slice(0, 10), consumedUnit: unit, consumedTaka: Math.round(unit * 6.7) });
    }
    return { code: 200, desc: 'OK', data };
  }
  if (path.includes('getCustomerMonthlyConsumption')) {
    const data = [];
    for (let i = 11; i >= 0; i--) {
      const d = new Date(); d.setDate(1); d.setMonth(d.getMonth() - i);
      const unit = Math.round(150 + Math.sin(i * 0.9) * 45 + Math.random() * 20);
      data.push({ month: `${d.getFullYear()}-${pad(d.getMonth() + 1)}`, consumedUnit: unit, consumedTaka: Math.round(unit * 6.7) });
    }
    return { code: 200, desc: 'OK', data };
  }
  if (path.includes('getRechargeHistory')) {
    const data = [];
    for (let i = 1; i <= 8; i++) {
      const d = new Date(); d.setDate(d.getDate() - i * 24);
      const total = [500, 1000, 500, 2000, 1000, 500, 1000, 500][i - 1];
      data.push({ orderID: 'PP' + (100000 + i), meterNo: '123456789012', rechargeDate: d.toISOString().slice(0, 10), totalAmount: total, energyAmount: Math.round(total / 1.15), VAT: Math.round(total * 0.05), rebate: i % 3 === 0 ? 25 : 0, tokenNo: 'TOK' + (200000 + i), chargeItems: [{ tokenNo: 'TOK' + (200000 + i) }] });
    }
    return { code: 200, desc: 'OK', data };
  }
  if (path.includes('min/recharge')) return { code: 200, desc: 'OK', data: 200 };
  return { code: 200, desc: 'OK', data: null };
}
async function apiGet(url, params, timeoutMs = 25000) {
  if (isDemo()) return mockResponse(url);
  const u = new URL(url);
  if (params) for (const k in params) if (params[k] !== undefined && params[k] !== null && params[k] !== '') u.searchParams.set(k, params[k]);
  const ctrl = new AbortController();
  const tm = setTimeout(() => ctrl.abort(), timeoutMs);
  try {
    const res = await fetch(u, { method: 'GET', headers: { Accept: 'application/json' }, signal: ctrl.signal });
    if (!res.ok) throw new Error('http ' + res.status);
    const json = await res.json().catch(() => ({ code: -1, desc: 'bad json', data: null }));
    return json;
  } finally {
    clearTimeout(tm);
  }
}
async function probeSystemType(accountNo, meterNo) {
  const systems = ['tkdes', 'unified'];
  const results = await Promise.allSettled(systems.map(sys =>
    apiGet(`${DESCO}/api/${sys}/customer/getCustomerInfo`, { accountNo, meterNo })));
  for (let i = 0; i < results.length; i++) {
    const r = results[i];
    if (r.status === 'fulfilled' && r.value && r.value.code === 200 && r.value.data && r.value.data.accountNo) {
      return { sys: systems[i], info: r.value.data };
    }
  }
  return null;
}
function balanceOf(meter) { return meter.balance !== null && meter.balance !== undefined ? Number(meter.balance) : null; }
function lowBalance(meter) { const b = balanceOf(meter); return b !== null && b < (meter.lowThreshold ?? state.settings.alertThreshold ?? LOW_BALANCE); }
function median(arr) {
  if (!arr.length) return 0;
  const s = [...arr].sort((a, b) => a - b);
  const m = Math.floor(s.length / 2);
  return s.length % 2 ? s[m] : (s[m - 1] + s[m]) / 2;
}
function avgDailyCost(normalizedDays) {
  const vals = normalizedDays.slice(-7).map(d => d.taka);
  const nz = vals.filter(v => v > 0);
  if (!nz.length) return null;
  if (nz.length === 1) return Math.round(nz[0] / 7);
  const med = median(nz);
  const cap = Math.max(med * 3, 25);
  const sum = vals.reduce((s, v) => s + Math.min(v || 0, cap), 0);
  return Math.round(sum / 7);
}
function nescoAvgDailyCost(history) {
  const months = { JAN: 0, FEB: 1, MAR: 2, APR: 3, MAY: 4, JUN: 5, JUL: 6, AUG: 7, SEP: 8, OCT: 9, NOV: 10, DEC: 11 };
  const rows = (history || []).map(r => {
    const m = /^(\d{1,2})-([A-Z]{3})-(\d{4})/.exec(String(r.rechargeDate || ''));
    if (!m || !(m[2] in months)) return null;
    return { t: new Date(+m[3], months[m[2]], +m[1]).getTime(), amt: Number(r.rechargeAmount) || 0 };
  }).filter(Boolean).sort((a, b) => a.t - b.t);
  if (rows.length < 2) return null;
  const span = (rows[rows.length - 1].t - rows[0].t) / 86400000;
  if (span <= 0) return null;
  const total = rows.reduce((s, r) => s + r.amt, 0);
  return Math.round(total / Math.max(span, 7));
}

async function refreshMeter(meter, opts = {}) {
  meter.loading = true;
  if (!opts.silent) renderHome();
  const maxTries = opts.tries ?? 3;
  for (let t = 1; t <= maxTries; t++) {
    try {
      await refreshMeterOnce(meter);
      break;
    } catch (e) {
      meter.err = t('err.network');
      if (t < maxTries) await new Promise(r => setTimeout(r, 2000 * t));
    }
  }
  meter.updatedAt = Date.now();
  meter.loading = false;
  if (!opts.silent) { renderHome(); if (currentView === 'meter' && currentMeterId === meter.id) renderMeterDetail(); }
}

async function refreshMeterOnce(meter) {
  if (meter.provider === 'desco') {
    if (!meter.info) {
      const p = await probeSystemType(meter.accountNo, meter.meterNo);
      if (!p) {
        meter.err = t('add.notfound');
        meter.balance = null;
        return;
      }
      meter.sys = p.sys;
      meter.info = p.info;
    }
    if (meter.info) {
      meter.accountNo = meter.info.accountNo || meter.accountNo;
      meter.meterNo = meter.info.meterNo || meter.meterNo;
    }
    const params = { accountNo: meter.accountNo || undefined, meterNo: meter.meterNo || undefined };
    const [balR, dailyR] = await Promise.all([
      apiGet(`${DESCO}/api/${meter.sys}/customer/getBalance`, params)
        .catch(() => ({ code: -1 })),
      apiGet(`${DESCO}/api/${meter.sys}/customer/getCustomerDailyConsumption`,
        Object.assign({}, params, { dateFrom: todayStr(13), dateTo: todayStr(0) }))
        .catch(() => ({ data: [] }))
    ]);
    if (dailyR.code === 200 && Array.isArray(dailyR.data)) {
      meter.avgDailyCost = avgDailyCost(normalizeDaily(dailyR.data));
      meter.dailyData = dailyR.data;
    }
    const balOk = balR.code === 200 && balR.data && balR.data.balance !== undefined && balR.data.balance !== null;
    if (!balOk && meter.sys) {
      const alt = meter.sys === 'tkdes' ? 'unified' : 'tkdes';
      const altR = await apiGet(`${DESCO}/api/${alt}/customer/getBalance`, params).catch(() => ({ code: -1 }));
      if (altR.code === 200 && altR.data && altR.data.balance !== undefined && altR.data.balance !== null) {
        meter.sys = alt;
        balR.code = 200; balR.data = altR.data;
      }
    }
    if (balOk || (balR.code === 200 && balR.data && balR.data.balance !== undefined && balR.data.balance !== null)) {
      meter.balance = balR.data.balance;
      meter.readingTime = balR.data.readingTime || meter.readingTime;
      meter.err = null;
    } else if (balR.code === 16001) {
      meter.balance = null;
      meter.err = balR.desc || t('add.notfound');
    } else if (balR.code === -1) {
      throw new Error('network');
    } else {
      meter.balance = null;
      meter.err = t('err.server');
    }
  } else if (meter.provider === 'nesco') {
    const r = await nescoQuery(meter.consumerNo);
    if (!r.ok) throw new Error(r.error || t('nesco.no_data'));
    meter.info = Object.assign({}, meter.info, r.info);
    meter.history = r.history || [];
    meter.avgDailyCost = nescoAvgDailyCost(meter.history);
    const bal = Number(r.info.balance);
    if (!isNaN(bal)) { meter.balance = bal; }
    meter.readingTime = new Date().toISOString();
    meter.consumerNo = r.info.consumerNo || meter.consumerNo;
    meter.err = null;
  }
}

async function refreshAllMeters() {
  for (const m of state.meters) {
    m.loading = true;
    renderHome();
    await refreshMeter(m, { silent: true });
    renderHome();
    await new Promise(r => setTimeout(r, 2000));
  }
}

/* ================= dialogs ================= */
function openDialog(title, bodyHtml, actions = []) {
  $('#dlgTitle').textContent = title;
  $('#dlgBody').innerHTML = bodyHtml;
  $('#dlgActions').innerHTML = actions.map(a =>
    `<button class="btn ${a.cls || 'secondary'}" data-act="${a.key}">${esc(a.label)}</button>`).join('');
  $('#dlg').hidden = false;
  $('#dlgActions').onclick = ev => {
    const btn = ev.target.closest('[data-act]'); if (!btn) return;
    const act = actions.find(a => a.key === btn.dataset.act);
    if (act && act.fn) act.fn(btn);
  };
  const dlg = $('#dlg');
  dlg.onclick = e => { if (e.target === dlg) closeDialog(); };
  dlg.querySelectorAll('.btn').forEach(b => {
    b.ontouchstart = () => b.classList.add('pressed');
    b.ontouchend = () => b.classList.remove('pressed');
    b.ontouchcancel = () => b.classList.remove('pressed');
  });
}
function closeDialog() { $('#dlg').hidden = true; }

/* ================= add meter ================= */
function showAddMeter() {
  openDialog(t('add.title'), `
    <label>${esc(t('add.provider'))}</label>
    <div id="addProvider" style="display:flex;gap:8px;margin-bottom:12px">
      <button type="button" class="btn secondary sm prov-btn" data-prov="desco" style="flex:1">${esc(t('meter.desco'))}</button>
      <button type="button" class="btn secondary sm prov-btn" data-prov="nesco" style="flex:1">${esc(t('meter.nesco'))}</button>
    </div>
    <label>${esc(t('add.number'))}</label>
    <input type="text" id="dlgMeterNo" inputmode="numeric" maxlength="14" placeholder="e.g. 12345678" autocomplete="off">
    <div class="hint" id="addHint">${esc(t('add.number.hint'))}</div>
    <label>${esc(t('add.nickname'))}</label>
    <input type="text" id="dlgNickname" placeholder="${esc(t('add.nickname_hint'))}" maxlength="30" autocomplete="off">
    <div id="addStatus" style="margin-top:10px;font-size:13.5px;min-height:18px"></div>`,
    [
      { key: 'search', label: t('add.search_desc'), cls: '', fn: () => doAddMeter(prov) }
    ]);
  let prov = 'desco';
  $$('#addProvider .prov-btn').forEach(b => {
    b.onclick = () => {
      prov = b.dataset.prov;
      $$('#addProvider .prov-btn').forEach(x => x.style.outline = x === b ? '3px solid var(--primary)' : '');
      $('#addHint').textContent = prov === 'nesco'
        ? 'Enter your 8 to 11 digit NESCO consumer / customer number.'
        : t('add.number.hint');
      $('#dlgActions [data-act="search"]').textContent = prov === 'nesco' ? t('add.search_nes') : t('add.search_desc');
    };
  });
  $$('#addProvider .prov-btn')[0].style.outline = '3px solid var(--primary)';
  const no = $('#dlgMeterNo');
  no.addEventListener('keydown', e => { if (e.key === 'Enter') doAddMeter(prov); });
  no.focus();
  if (window.visualViewport) {
    const scrollInput = () => { const el = document.activeElement; if (el && el.tagName === 'INPUT') el.scrollIntoView({ block: 'nearest' }); };
    window.visualViewport.addEventListener('resize', scrollInput);
    window.addEventListener('focusout', () => setTimeout(scrollInput, 100), { once: true });
  }
}

function exportMetersTxt() {
  return state.meters.map(m => {
    const num = m.accountNo || m.meterNo || m.consumerNo || '';
    const prov = m.provider || '';
    const nick = m.nickname || '';
    return nick ? `${nick} ${prov} ${num}` : `${prov} ${num}`;
  }).join('\n');
}
function importMetersFromText(text) {
  const lines = text.split(/\r?\n/).map(l => l.trim()).filter(l => l && !l.startsWith('#'));
  if (!lines.length) { toast('No valid lines found.', true); return; }
  let added = 0, skipped = 0, failed = 0;
  for (const line of lines) {
    const parts = line.split(/\s+/);
    let nickname = '', prov = '', num = '';
    if (parts.length >= 3) {
      prov = parts[parts.length - 2].toLowerCase();
      num = parts[parts.length - 1].replace(/[\s\-]/g, '');
      if (prov !== 'desco' && prov !== 'nesco') {
        prov = parts[0].toLowerCase();
        num = parts[1].replace(/[\s\-]/g, '');
        nickname = parts.slice(2).join(' ');
      } else {
        nickname = parts.slice(0, parts.length - 2).join(' ');
      }
    } else if (parts.length === 2) {
      prov = parts[0].toLowerCase();
      num = parts[1].replace(/[\s\-]/g, '');
      nickname = '';
    } else { failed++; continue; }
    if (prov !== 'desco' && prov !== 'nesco') { failed++; continue; }
    if (state.meters.some(m => m.consumerNo === num || m.accountNo === num || m.meterNo === num)) { skipped++; continue; }
    if (prov === 'nesco' && !/^\d{8,11}$/.test(num)) { failed++; continue; }
    if (prov === 'desco' && !/^\d{8,12}$/.test(num)) { failed++; continue; }
    const isAccount = num.length === 8;
    state.meters.push({
      id: 'm' + Date.now() + added,
      provider: prov,
      consumerNo: prov === 'nesco' ? num : undefined,
      accountNo: prov === 'desco' && isAccount ? num : undefined,
      meterNo: prov === 'desco' && !isAccount ? num : undefined,
      nickname,
      balance: null, readingTime: null, updatedAt: null, err: null, loading: true
    });
    added++;
  }
  saveMeters(); renderHome();
  toast(`Added: ${added}, Skipped: ${skipped}, Failed: ${failed}. Updating…`);
  refreshAllMeters().then(() => renderHome());
}
function showImportExport() {
  const txt = exportMetersTxt();
  openDialog('Import / Export', `
    <textarea id="ieText" style="width:100%;min-height:120px;font-family:monospace;font-size:13px;padding:10px;border-radius:8px;border:1px solid var(--border);background:var(--surface);color:var(--text);resize:vertical">${esc(txt)}</textarea>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-top:12px">
      <button class="btn secondary" onclick="ieExport()" style="white-space:nowrap">Export to file</button>
      <button class="btn secondary" onclick="ieImport()" style="white-space:nowrap">Import from file</button>
    </div>
    <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:8px;margin-top:8px">
      <button class="btn secondary" onclick="ieCopy()" style="white-space:nowrap">Copy</button>
      <button class="btn secondary" onclick="iePaste()" style="white-space:nowrap">Paste</button>
      <button class="btn secondary" onclick="ieSave()" style="white-space:nowrap">Save</button>
    </div>`, []);
  $('#dlgTitle').style.textAlign = 'center';
}
window.ieCopy = () => {
  const text = $('#ieText').value;
  if (window.NescoBridge && NescoBridge.clipboardWrite) {
    NescoBridge.clipboardWrite(text);
    toast('Copied');
  } else {
    navigator.clipboard.writeText(text).then(() => toast('Copied')).catch(() => toast('Copy failed', true));
  }
};
window.iePaste = async () => {
  if (window.NescoBridge && NescoBridge.clipboardRead) {
    const text = NescoBridge.clipboardRead();
    if (text) { $('#ieText').value = text; toast('Pasted'); }
    else toast('Clipboard is empty', true);
  } else {
    try {
      const text = await navigator.clipboard.readText();
      $('#ieText').value = text;
      toast('Pasted');
    } catch (e) {
      toast('Paste failed – check clipboard permission', true);
    }
  }
};
window.ieSave = () => {
  const text = $('#ieText').value.trim();
  if (!text) { toast('Nothing to save', true); return; }
  const current = exportMetersTxt().trim();
  if (text === current) { toast('No changes'); closeDialog(); return; }
  state.meters = [];
  saveMeters();
  importMetersFromText(text);
  closeDialog();
  if (currentView !== 'home') { currentView = 'home'; currentMeterId = null; $('#view-home').style.display=''; $('#view-settings').style.display='none'; }
  renderHome();
  toast('Meters imported');
};
window.ieExport = async () => {
  const text = $('#ieText').value;
  try {
    if (window.NescoBridge && NescoBridge.saveFileWithPicker) {
      NescoBridge.saveFileWithPicker(text, 'meters.txt');
      return;
    }
    const blob = new Blob([text], { type: 'text/plain' });
    const file = new File([blob], 'meters.txt', { type: 'text/plain' });
    if (navigator.share && navigator.canShare && navigator.canShare({ files: [file] })) {
      await navigator.share({ files: [file], title: 'Export meters' });
      toast('File exported');
    } else if (window.showSaveFilePicker) {
      const handle = await window.showSaveFilePicker({
        suggestedName: 'meters.txt',
        types: [{ description: 'Text file', accept: { 'text/plain': ['.txt'] } }]
      });
      const writable = await handle.createWritable();
      await writable.write(text);
      await writable.close();
      toast('File exported');
    } else {
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url; a.download = 'meters.txt';
      document.body.appendChild(a); a.click();
      setTimeout(() => { document.body.removeChild(a); URL.revokeObjectURL(url); }, 1000);
      toast('File exported');
    }
  } catch (e) {
    if (e.name !== 'AbortError') toast('Export failed', true);
  }
};
window.ieImport = () => {
  if (window.NescoBridge && NescoBridge.loadFileWithPicker) {
    window._onFileLoaded = (content) => {
      $('#ieText').value = content.replace(/\\n/g, '\n');
      delete window._onFileLoaded;
    };
    NescoBridge.loadFileWithPicker();
  } else {
    const inp = document.createElement('input');
    inp.type = 'file'; inp.accept = '.txt,text/plain';
    inp.onchange = async () => { const f = inp.files[0]; if (f) { const t = await f.text(); $('#ieText').value = t; } };
    inp.click();
  }
};

async function doAddMeter(prov) {
  if (!prov || prov.tagName) {
    const sel = $('#addProvider .prov-btn[style*="3px solid var(--primary)"]') ||
      $$('#addProvider .prov-btn').find(b => getComputedStyle(b).outlineStyle === 'solid');
    prov = sel ? sel.dataset.prov : 'desco';
  }
  const raw = bdDigits($('#dlgMeterNo').value.trim().replace(/[\s\-]/g, ''));
  const nickname = ($('#dlgNickname')?.value || '').trim();
  const status = $('#addStatus');
  const btn = $('#dlgActions [data-act="search"]');
  if (!raw) { status.textContent = t('add.number.hint'); return; }
  if (prov === 'nesco') {
    if (!/^\d{8,11}$/.test(raw)) { status.textContent = 'NESCO consumer number is 8 to 11 digits.'; return; }
  } else if (!/^\d{8,12}$/.test(raw)) { status.textContent = t('add.number.hint'); return; }
  if (state.meters.length >= MAX_METERS) { toast(t('home.max')); return; }
  if (state.meters.some(m => m.provider === prov && (m.consumerNo === raw || m.accountNo === raw || m.meterNo === raw))) {
    toast(t('add.exists')); return;
  }
  btn.disabled = true; btn.style.opacity = .6;
  status.textContent = t('add.checking');
  try {
    let meter;
    if (prov === 'nesco') {
      const r = await nescoQuery(raw);
      if (!r.ok) throw new Error(r.error || t('nesco.no_data'));
      if (!r.info || (!r.info.name && !r.info.consumerNo && !r.info.meterNo && (!r.history || r.history.length === 0))) {
        throw new Error('Not found in the NESCO database. Check the number and try again.');
      }
      meter = {
        id: 'm' + Date.now(), provider: 'nesco',
        consumerNo: raw, nickname: nickname || '',
        info: r.info, history: r.history || [], balance: null, readingTime: new Date().toISOString(),
        updatedAt: null, err: null, loading: true
      };
    } else {
      const isAccount = raw.length === 8;
      const probe = await probeSystemType(isAccount ? raw : undefined, isAccount ? undefined : raw);
      if (!probe) { status.textContent = t('add.notfound'); return; }
      meter = {
        id: 'm' + Date.now(), provider: 'desco', sys: probe.sys,
        accountNo: probe.info.accountNo, meterNo: probe.info.meterNo,
        nickname: nickname || '',
        info: probe.info, balance: null, readingTime: null, updatedAt: null, err: null, loading: true
      };
    }
    state.meters.push(meter); saveMeters();
    closeDialog(); renderHome();
    await refreshMeter(meter, { silent: true });
    if (currentView === 'home') renderHome();
    toast(t('add.found'));
  } catch (e) {
    status.textContent = e.message && e.message.includes('node server.js') ? t('nesco.needs_server') : (prov === 'nesco' ? (e.message || t('nesco.no_data')) : (t('add.error') + (e.message ? ' (' + e.message + ')' : '')));
  } finally {
    btn.disabled = false; btn.style.opacity = 1;
  }
}

async function nescoQuery(custNo) {
  if (isDemo()) {
    return {
      ok: true,
      info: {
        name: 'Demo NESCO Customer', address: 'Rajshahi', mobile: '+880 17********',
        office: 'Rajshahi S&D1', consumerNo: custNo, meterNo: '20410021308',
        sanctionedLoad: '3', tariff: 'LT-A', meterType: 'Single-Phase Meter',
        meterStatus: 'Install With Active', installDate: '21/08/2024 17:53:30',
        minimumRecharge: '235.2', balance: '412.6'
      },
      history: [
        { orderId: '1242636780101181440', rechargeDate: '30-JUL-2026 8:41 AM', rechargeAmount: 500, energyUnit: 50.96, vat: 23.81, method: 'BKASH' },
        { orderId: '1242636780101181441', rechargeDate: '28-JUN-2026 9:12 AM', rechargeAmount: 1000, energyUnit: 102.4, vat: 47.62, method: 'NAGAD' },
        { orderId: '1242636780101181442', rechargeDate: '25-MAY-2026 7:05 PM', rechargeAmount: 300, energyUnit: 30.1, vat: 14.29, method: 'ROCKET' }
      ]
    };
  }
  if (window.NescoBridge && typeof window.NescoBridge.nescoLookupSync === 'function') {
    try {
      var r = JSON.parse(window.NescoBridge.nescoLookupSync(custNo));
      return r;
    } catch(e) { return { ok: false, error: e.message }; }
  }
  const base = await findNescoBase();
  if (!base) return { ok: false, error: 'run node server.js' };
  try {
    const res = await fetch(`${base}?cust=${encodeURIComponent(custNo)}`);
    return await res.json();
  } catch { return { ok: false, error: 'run node server.js' }; }
}

/* Find a working NESCO proxy endpoint: same-origin /nesco first, then the
   bundled local server on 127.0.0.1/localhost:3000. The winner is cached. */
var nescoBase = null;
var nescoBaseChecked = false;
async function findNescoBase() {
  if (nescoBaseChecked) return nescoBase;
  nescoBaseChecked = true;
  const custom = new URLSearchParams(location.search).get('proxy');
  const candidates = [];
  if (custom) candidates.push(custom.replace(/\/+$/, '') + '/nesco');
  try { candidates.push(new URL('/nesco', location.href).toString().replace(/\/+$/, '/nesco')); } catch { candidates.push('/nesco'); }
  if (location.protocol === 'file:') {
    candidates.push('http://127.0.0.1:3000/nesco', 'http://localhost:3000/nesco');
  } else {
    const host = location.hostname;
    candidates.push('https://prepaidmetermanager.up.railway.app/nesco');
    if (host !== '127.0.0.1' && host !== 'localhost') {
      candidates.push(`http://${host}:3000/nesco`);
    }
    candidates.push(`http://127.0.0.1:3000/nesco`, `http://localhost:3000/nesco`);
  }
  for (const c of [...new Set(candidates)]) {
    try {
      const r = await fetch(c + '?probe=1', { method: 'GET' });
      if (r.ok) { nescoBase = c.replace(/\/+$/, ''); return nescoBase; }
    } catch { /* try next */ }
  }
  return null;
}

/* ================= meter detail ================= */
function scrollToTop() {
  try {
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
    const v = document.getElementById('view-home');
    if (v) v.scrollTop = 0;
  } catch (e) { /* ignore */ }
}
function openMeter(id) {
  currentMeterId = id;
  currentView = 'meter';
  history.pushState({ view: 'meter', id }, '', '');
  scrollToTop();
  renderMeterDetail();
  requestAnimationFrame(scrollToTop);
  setTimeout(scrollToTop, 100);
}
function currentMeter() { return state.meters.find(m => m.id === currentMeterId); }

async function renderMeterDetail() {
  const m = currentMeter();
  const c = $('#homeContent');
  if (!m) { showView('home'); return; }
  c.innerHTML = `
    <div class="page-head">
      <h2 style="font-size:19px">${esc(m.nickname || m.info?.customerName || m.info?.name || m.accountNo || m.meterNo || m.consumerNo)}</h2>
    </div>
    <div class="balance-hero">
      <div class="bh-label"><span>${esc(t('detail.balance'))}</span><span>${m.provider === 'nesco' ? 'NESCO' : 'DESCO'} · ${esc(m.info?.accountNo || m.accountNo || m.consumerNo || '')}</span></div>
      <div class="bh-amount"${lowBalance(m) && m.balance != null ? ' style="color:#ff6b6b"' : ''}>${m.balance === null ? '––' : fmtBdt(m.balance)}${lowBalance(m) ? ' <span style="font-size:13px;font-weight:700;color:#ff6b6b">Low balance</span>' : ''}</div>
      <div class="bh-meta">
        <span>${esc(t('detail.meter'))}: ${esc(m.info?.meterNo || m.meterNo || m.consumerNo || '–')}</span>
        ${m.avgDailyCost != null ? `<span>${esc(t('home.avg_day', { v: fmtBdt(m.avgDailyCost) }))}</span>` : ''}
        <span>${esc(t('detail.reading_time', { t: m.readingTime ? fmtDate(m.readingTime) : '–' }))}</span>
      </div>
      ${m.loading ? '<div style="opacity:.9;font-size:12.5px">' + esc(t('home.refreshing')) + '</div>' : (m.err ? `<div style="opacity:.9;font-size:12.5px;color:#ffd9d9">${esc(m.err)}</div>` : '')}
    </div>
    ${m.provider === 'desco' ? renderInfoCard(m) : ''}
    ${m.provider === 'desco' ? '<div id="totalUseWrap"></div>' : ''}
    ${m.provider === 'nesco' ? renderNescoInfoCard(m) : ''}
    ${m.provider === 'nesco' ? renderNescoTotalUse(m) : ''}
    ${m.provider === 'desco' ? '<div id="consumptionWrap"></div>' : ''}
    ${m.provider === 'desco' ? '<div id="historyWrap"></div>' : ''}
    ${m.provider === 'nesco' ? renderNescoHistory(m) : ''}
  `;
  if (m.provider === 'desco') loadDetailData(m);
}
function renderNescoInfoCard(m) {
  const i = m.info || {};
  return `<section class="card">
    <h3>${esc(t('detail.customer'))}</h3>
    <table class="list"><tbody>
      ${kv(t('detail.name'), i.name)}${kv(t('detail.father'), i.fatherOrHusband)}${kv(t('detail.address'), i.address)}
      ${kv(t('detail.mobile'), i.mobile)}${kv(t('detail.office'), i.office)}${kv(t('detail.account'), i.consumerNo)}
      ${kv(t('detail.meter'), i.meterNo)}${kv(t('detail.load'), i.sanctionedLoad)}${kv(t('detail.tariff'), i.tariff)}
      ${kv(t('detail.meter_type'), i.meterType)}${kv(t('detail.status'), i.meterStatus)}
      ${kv(t('detail.install_date'), i.installDate)}${kv(t('detail.min_recharge'), i.minimumRecharge)}
    </tbody></table>
  </section>`;
}
function renderNescoHistory(m) {
  const rows = (m.history || []).slice(0, 60);
  return `<section class="card">
    <h3>${esc(t('detail.recharge_history'))}</h3>
    ${rows.length
      ? `<div class="tbl-scroll"><table class="list"><thead><tr><th>${esc(t('detail.date'))}</th><th>${esc(t('detail.token'))}</th><th style="text-align:center">${esc(t('detail.total'))}</th><th style="text-align:center">Energy<br>Amount</th><th style="text-align:center">Energy<br>(kWh)</th><th style="text-align:center">VAT &<br>Other Charges</th></tr></thead><tbody>
        ${rows.map(r => {
          const total = Number(r.rechargeAmount) || 0;
          const ea = Number(r.electricityAmount) || 0;
          return `<tr><td>${esc(r.rechargeDate || '')}</td><td style="color:var(--text-2);white-space:normal;word-break:break-all;max-width:140px">${fmtToken(r.tokenNo || r.orderId || '')}</td><td style="text-align:right;font-weight:600">${fmtBdt(total)}</td><td style="text-align:right">${fmtBdt(ea)}</td><td style="text-align:right">${fmtUnits(r.energyUnit)}</td><td style="text-align:right">${fmtBdt(total - ea)}</td></tr>`;
        }).join('')}
      </tbody></table></div>`
      : `<p class="muted">${esc(t('detail.recharge_empty'))}</p>`}
  </section>`;
}
const NESCO_MONTHS = { 'JAN':'01','FEB':'02','MAR':'03','APR':'04','MAY':'05','JUN':'06','JUL':'07','AUG':'08','SEP':'09','OCT':'10','NOV':'11','DEC':'12' };
function parseNescoDate(s) {
  const m = /^(\d{1,2})-([A-Z]{3})-(\d{4})/.exec(String(s || ''));
  if (!m) return null;
  return `${m[3]}-${NESCO_MONTHS[m[2]] || '01'}`;
}
function renderNescoTotalUse(m) {
  const hist = m.history || [];
  if (!hist.length) return '';
  let totalTaka = 0, totalUnit = 0;
  let earliestDate = null;
  for (const r of hist) {
    totalTaka += Number(r.rechargeAmount) || 0;
    totalUnit += Number(r.energyUnit) || 0;
    const d = parseNescoDate(r.rechargeDate);
    if (d && (!earliestDate || d < earliestDate)) earliestDate = d;
  }
  if (!earliestDate || totalTaka <= 0) return '';
  const balance = Number(m.balance);
  const now = new Date();
  if (isNaN(balance) || balance >= totalTaka) {
    const byMonth = {};
    for (const r of hist) {
      const key = parseNescoDate(r.rechargeDate);
      if (!key) continue;
      if (!byMonth[key]) byMonth[key] = { taka: 0, unit: 0 };
      byMonth[key].taka += Number(r.rechargeAmount) || 0;
      byMonth[key].unit += Number(r.energyUnit) || 0;
    }
    const thisKey = `${now.getFullYear()}-${pad(now.getMonth() + 1)}`;
    const lm = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    const lastKey = `${lm.getFullYear()}-${pad(lm.getMonth() + 1)}`;
    return renderTotalUseCard(byMonth[thisKey] || { taka: 0, unit: 0 }, byMonth[lastKey] || { taka: 0, unit: 0 });
  }
  const consumedTaka = totalTaka - balance;
  const costPerUnit = totalUnit > 0 ? totalTaka / totalUnit : 0;
  const consumedUnit = costPerUnit > 0 ? consumedTaka / costPerUnit : 0;
  const startDate = new Date(earliestDate + '-01');
  const daysDiff = Math.max(1, Math.round((now - startDate) / 864e5));
  const dailyTaka = consumedTaka / daysDiff;
  const dailyUnit = consumedUnit / daysDiff;
  const thisMonthDays = now.getDate();
  const lastMonthDate = new Date(now.getFullYear(), now.getMonth() - 1, 1);
  const lastMonthDays = new Date(lastMonthDate.getFullYear(), lastMonthDate.getMonth() + 1, 0).getDate();
  return renderTotalUseCard(
    { taka: Math.round(dailyTaka * thisMonthDays * 100) / 100, unit: Math.round(dailyUnit * thisMonthDays * 100) / 100 },
    { taka: Math.round(dailyTaka * lastMonthDays * 100) / 100, unit: Math.round(dailyUnit * lastMonthDays * 100) / 100 }
  );
}
function renderInfoCard(m) {
  const i = m.info || {};
  return `<section class="card">
    <h3>${esc(t('detail.customer'))}</h3>
    <table class="list"><tbody>
      ${kv(t('detail.name'), i.customerName)}${kv(t('detail.account'), i.accountNo)}${kv(t('detail.meter'), i.meterNo)}
      ${kv(t('detail.route'), i.route)}${kv(t('detail.load'), i.sanctionLoad)}${kv(t('detail.tariff'), i.tariffSolution)}
      ${kv(t('detail.phase'), i.phaseType)}${kv(t('detail.status'), i.status)}
    </tbody></table>
  </section>`;
}
function kv(k, v) { return v ? `<tr><td style="color:var(--text-2)">${esc(k)}</td><td style="font-weight:600">${esc(v)}</td></tr>` : ''; }

async function loadDetailData(m) {
  const wrap = $('#consumptionWrap'); if (!wrap) return;
  wrap.innerHTML = '<div class="spinner"></div>';
  const params = { accountNo: m.accountNo, meterNo: m.meterNo };
  let daily = [], monthly = [], hist = [];
  try {
    [daily, monthly, hist] = await Promise.all([
      apiGet(`${DESCO}/api/${m.sys}/customer/getCustomerDailyConsumption`, Object.assign({}, params, { dateFrom: todayStr(14), dateTo: todayStr(1) }))
        .then(r => (r.code === 200 && Array.isArray(r.data)) ? r.data : []).catch(() => []),
      apiGet(`${DESCO}/api/${m.sys}/customer/getCustomerMonthlyConsumption`, Object.assign({}, params, { monthFrom: monthStr(11), monthTo: monthStr(0) }))
        .then(r => (r.code === 200 && Array.isArray(r.data)) ? r.data : []).catch(() => []),
      apiGet(`${DESCO}/api/${m.sys}/customer/getRechargeHistory`, Object.assign({}, params, { dateFrom: todayStr(364), dateTo: todayStr(0) }))
        .then(r => (r.code === 200 && Array.isArray(r.data)) ? r.data : []).catch(() => [])
    ]);
  } catch { /* partial ok */ }

  if (currentMeterId !== m.id) return;
  const days = normalizeDaily(daily);
  m.avgDailyCost = avgDailyCost(days);
  m.dailyData = daily;
  saveMeters();
  const dWrap = $('#consumptionWrap'); if (!dWrap) return;
  dWrap.innerHTML = `
    ${renderDailyChart(m, daily)}
    ${renderMonthlyChart(m, monthly)}
  `;
  const dCanvas = $('#chDaily'), mCanvas = $('#chMonthly');
  if (dCanvas) {
    const chartDays = normalizeDaily(daily);
    drawChart(dCanvas, chartDays.map(d => { const dt = new Date(d.d); return dt.toLocaleDateString(langs === I18N.bn ? 'bn-BD' : 'en-GB', { day: 'numeric', month: 'short' }); }),
      [{ name: '৳', color: getCss('--primary'), values: chartDays.map(d => d.taka) },
       { name: 'kWh', color: getCss('--accent'), values: chartDays.map(d => d.unit) }]);
  }
  if (mCanvas) {
    const months = normalizeMonthly(monthly);
    drawChart(mCanvas, months.map(x => new Date(x.m + '-01').toLocaleDateString(langs === I18N.bn ? 'bn-BD' : 'en-GB', { month: 'short', year: '2-digit' })),
      [{ name: '৳', color: getCss('--primary'), values: months.map(x => x.taka) },
       { name: 'kWh', color: getCss('--accent'), values: months.map(x => x.unit) }]);
  }
  const hWrap = $('#historyWrap'); if (!hWrap) return;
  hWrap.innerHTML = renderHistory(hist);
  const tWrap = $('#totalUseWrap');
  if (tWrap) tWrap.innerHTML = renderTotalUse(monthly, hist, m.balance);
  if (hist.length > 0) {
    const total = hist.reduce((s, r) => s + (Number(r.totalAmount) || 0), 0);
    const el = $('#histTotal'); if (el) el.textContent = fmtBdt(total);
  }
}

function normalizeDaily(daily) {
  const rows = [];
  for (const r of daily) {
    const d = r.consumptionDate || r.date || r.readingDate || (r.month ? r.month + '-01' : '');
    if (!d) continue;
    rows.push({
      d: d.slice(0, 10),
      unit: Number(r.consumedUnit) || Number(r.consumptionUnit) || 0,
      taka: Number(r.consumedTaka) || Number(r.consumptionTaka) || 0
    });
  }
  rows.sort((a, b) => a.d < b.d ? -1 : a.d > b.d ? 1 : 0);
  let cumulative = rows.length > 1;
  if (cumulative) {
    for (let i = 1; i < rows.length; i++) {
      if (rows[i].unit < rows[i - 1].unit) { cumulative = false; break; }
    }
  }
  const byDate = {};
  if (cumulative) {
    for (let i = 0; i < rows.length; i++) {
      const prev = i > 0 ? rows[i - 1] : null;
      byDate[rows[i].d] = {
        unit: prev ? Math.max(0, rows[i].unit - prev.unit) : 0,
        taka: prev ? (rows[i].taka - prev.taka > 0 ? rows[i].taka - prev.taka : rows[i].taka) : 0
      };
    }
  } else {
    for (const r of rows) byDate[r.d] = { unit: r.unit, taka: r.taka };
  }
  const days = [];
  for (let i = 14; i >= 0; i--) {
    const d = todayStr(i);
    days.push({ d, unit: byDate[d]?.unit || 0, taka: byDate[d]?.taka || 0 });
  }
  return days;
}
function normalizeMonthly(monthly) {
  const byMonth = {};
  for (const r of monthly) byMonth[(r.month || '').slice(0, 7)] = { unit: Number(r.consumedUnit) || 0, taka: Number(r.consumedTaka) || 0 };
  const out = [];
  for (let i = 11; i >= 0; i--) {
    const m = monthStr(i);
    out.push({ m, unit: byMonth[m]?.unit || 0, taka: byMonth[m]?.taka || 0 });
  }
  return out;
}

function renderDailyChart(m, daily) {
  const days = normalizeDaily(daily);
  const has = days.some(d => d.unit > 0 || d.taka > 0);
  const labels = days.map(d => { const dt = new Date(d.d); return dt.toLocaleDateString(langs === I18N.bn ? 'bn-BD' : 'en-GB', { day: 'numeric', month: 'short' }); });
  return `<section class="card">
    <h3>${esc(t('detail.daily'))}</h3>
    ${has
      ? `<div class="chart-wrap"><canvas id="chDaily"></canvas></div>
         <div class="chart-legend"><span><span class="dot" style="background:var(--primary)"></span>${esc(t('detail.chart_taka'))}</span><span><span class="dot" style="background:var(--accent)"></span>${esc(t('detail.chart_unit'))}</span></div>`
      : `<p class="muted">${esc(t('detail.consumption_empty'))}</p>`}
  </section>`;
}
function renderMonthlyChart(m, monthly) {
  const months = normalizeMonthly(monthly);
  const has = months.some(x => x.unit > 0 || x.taka > 0);
  const labels = months.map(x => { const d = new Date(x.m + '-01'); return d.toLocaleDateString(langs === I18N.bn ? 'bn-BD' : 'en-GB', { month: 'short', year: '2-digit' }); });
  return `<section class="card">
    <h3>${esc(t('detail.monthly'))}</h3>
    ${has
      ? `<div class="chart-wrap"><canvas id="chMonthly"></canvas></div>
         <div class="chart-legend"><span><span class="dot" style="background:var(--primary)"></span>${esc(t('detail.chart_taka'))}</span><span><span class="dot" style="background:var(--accent)"></span>${esc(t('detail.chart_unit'))}</span></div>`
      : `<p class="muted">${esc(t('detail.consumption_empty'))}</p>`}
  </section>`;
}
function renderTotalUse(monthly, hist, balance) {
  const h = hist || [];
  if (h.length && balance != null) {
    let totalTaka = 0;
    let earliest = null;
    for (const r of h) {
      totalTaka += Number(r.totalAmount) || 0;
      const d = (r.rechargeDate || '').slice(0, 10);
      if (d && (!earliest || d < earliest)) earliest = d;
    }
    if (earliest && totalTaka > 0) {
      const bal = Number(balance) || 0;
      const consumedTaka = Math.max(0, totalTaka - bal);
      const sd = new Date(earliest), ed = new Date();
      const daysDiff = Math.max(1, Math.round((ed - sd) / 864e5));
      const dailyT = consumedTaka / daysDiff;
      const now = new Date();
      const thisDays = now.getDate();
      const lm = new Date(now.getFullYear(), now.getMonth() - 1, 1);
      const lastDays = new Date(lm.getFullYear(), lm.getMonth() + 1, 0).getDate();
      const thisMT = Math.round(dailyT * thisDays * 100) / 100;
      const lastMT = Math.round(dailyT * lastDays * 100) / 100;
      const thisMonth = { taka: thisMT, unit: descoTakaToKwh(thisMT) };
      const lastMonth = { taka: lastMT, unit: descoTakaToKwh(lastMT) };
      return renderTotalUseCard(thisMonth, lastMonth);
    }
  }
  const nm = normalizeMonthly(monthly);
  const thisMonth = nm[nm.length - 1] || { taka: 0, unit: 0 };
  const lastMonth = nm[nm.length - 2] || { taka: 0, unit: 0 };
  return renderTotalUseCard(thisMonth, lastMonth);
}
function renderTotalUseCard(thisMonth, lastMonth) {
  return `<section class="card">
    <h3>${esc(t('detail.total_use'))}</h3>
    <table class="list"><tbody>
      <tr><td style="color:var(--text-2)">${esc(t('detail.this_month'))}</td><td style="text-align:right"><strong>${fmtBdt(thisMonth.taka)}</strong></td><td style="text-align:right">${fmtUnits(thisMonth.unit)}</td></tr>
      <tr><td style="color:var(--text-2)">${esc(t('detail.last_month'))}</td><td style="text-align:right"><strong>${fmtBdt(lastMonth.taka)}</strong></td><td style="text-align:right">${fmtUnits(lastMonth.unit)}</td></tr>
    </tbody></table>
  </section>`;
}

function renderHistory(hist) {
  const rows = hist.slice(0, 60);
  return `<section class="card">
    <h3>${esc(t('detail.recharge_history'))}</h3>
    ${rows.length
      ? `<div class="tbl-scroll"><table class="list"><thead><tr><th>${esc(t('detail.date'))}</th><th>${esc(t('detail.token'))}</th><th style="text-align:center">${esc(t('detail.total'))}</th><th style="text-align:center">Energy<br>Amount</th><th style="text-align:center">Energy<br>(kWh)</th><th style="text-align:center">VAT &<br>Other Charges</th></tr></thead><tbody>
        ${rows.map(r => {
          const total = Number(r.totalAmount) || 0;
          const ea = Number(r.energyAmount) || 0;
          const tokens = (r.chargeItems || []).map(c => c.tokenNo || c.token || '').filter(Boolean).join(', ');
          const tokenDisplay = tokens || r.tokenNo || r.token || r.orderID || '';
          return `<tr><td>${esc(fmtDate(r.rechargeDate))}</td><td style="color:var(--text-2);white-space:normal;word-break:break-all;max-width:140px">${fmtToken(tokenDisplay)}</td><td style="text-align:right;font-weight:600">${fmtBdt(total)}</td><td style="text-align:right">${fmtBdt(ea)}</td><td style="text-align:right">${fmtUnits(descoTakaToKwh(ea))}</td><td style="text-align:right">${fmtBdt(total - ea)}</td></tr>`;
        }).join('')}
      </tbody></table></div>`
      : `<p class="muted">${esc(t('detail.recharge_empty'))}</p>`}
  </section>`;
}

/* ================= home ================= */
function renderHome() {
  const c = $('#homeContent');
  if (currentView === 'meter') return;
  const demoBanner = isDemo() ? '<div class="banner">Demo mode – showing sample data. Remove `?demo=1` to use live DESCO/NESCO data.</div>' : '';
  if (!state.meters.length) {
    c.innerHTML = demoBanner + `
      <section class="card hero-card">
        <img src="icons/icon-electricity.svg" alt="" class="hero-logo" width="72" height="72">
        <h1>${esc(t('app.name'))}</h1>
        <p class="muted" style="font-size:13.5px;line-height:1.6">${esc(t('home.hero'))}</p>
        <ul class="hero-list">
          <li>${esc(t('hero.live'))}</li>
          <li>${esc(t('hero.cost'))}</li>
          <li>${esc(t('hero.history'))}</li>
          <li>${esc(t('hero.consumption'))}</li>
          <li>${esc(t('hero.recharge'))}</li>
        </ul>
      </section>
      <div class="empty card">
        <h3>${esc(t('home.empty.title'))}</h3>
        <button class="add-meter" onclick="window.ppShowAdd()">
          <svg width="22" height="22" fill="currentColor" viewBox="0 0 24 24"><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/></svg>
          ${esc(t('home.add'))}
        </button>
        <p class="muted">${esc(t('home.empty.text'))}</p>
      </div>`;
    return;
  }
  const list = state.meters.map(m => {
    const b = balanceOf(m);
    const low = lowBalance(m);
    const errShort = m.err ? (m.err.length > 30 ? m.err.slice(0, 29) + '…' : m.err) : '';
    const badge = m.err ? `<span class="mc-badge err" title="${esc(m.err)}">${esc(errShort)}</span>`
      : m.loading ? `<span class="mc-badge ok">${esc(t('home.refreshing'))}</span>`
      : ``;
    const avg = m.avgDailyCost != null ? `<span class="mc-avg">${esc(t('home.avg_day', { v: fmtBdt(m.avgDailyCost) }))}</span>` : '';
    return `<div class="meter-card" draggable="true" data-id="${m.id}" onclick="window.ppOpen('${m.id}')">
      <div class="mc-top">
        <span class="mc-provider">${m.provider === 'nesco' ? 'NESCO' : 'DESCO' + (m.sys === 'unified' ? ' · Unified' : '')}</span>
        <div class="mc-actions">
          <button class="mc-action mc-action-danger" title="${esc(t('btn.remove'))}" onclick="event.stopPropagation();window.ppRemove('${m.id}')">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/></svg>
          </button>
          <button class="mc-action" title="${esc(t('btn.edit'))}" onclick="event.stopPropagation();window.ppEditMeter('${m.id}')">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04a1 1 0 000-1.41l-2.34-2.34a1 1 0 00-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/></svg>
          </button>
          <button class="mc-action" title="${esc(t('btn.refresh'))}" onclick="event.stopPropagation();window.ppRefresh('${m.id}')">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M17.65 6.35A7.958 7.958 0 0012 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08A5.99 5.99 0 0112 18c-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z"/></svg>
          </button>
        </div>
      </div>
      <div class="mc-number">${esc(m.nickname || m.info?.customerName || m.info?.name || '')}${(m.nickname || m.info?.customerName || m.info?.name) ? '<br>' : ''}${esc(m.accountNo || m.meterNo || m.consumerNo)}</div>
      <div class="mc-balance ${b !== null && low ? 'low' : ''}" style="${b !== null && low ? 'color:#ff6b6b' : ''}">${b === null ? '––' : fmtBdt(b)}${low ? ' <span style="font-size:12px;font-weight:700;color:#ff6b6b">Low balance</span>' : ''}</div>
      <div class="mc-sub"><span>${avg || ''}</span><span>${m.updatedAt ? esc(t('home.last_updated', { t: timeAgo(m.updatedAt) })) : esc(t('home.updated_never'))}</span>${badge}</div>
    </div>`;
  }).join('');
  c.innerHTML = demoBanner + `
    <div style="display:flex;align-items:center;justify-content:space-between">
      <h2 class="section-title">${esc(t('home.title'))}</h2>
      <span style="font-size:12px;color:var(--text-2)">${esc(t('home.last_updated', { t: timeAgo(Math.max(...state.meters.map(m => m.updatedAt || 0))) }))}</span>
    </div>
    <p class="home-desc">${esc(t('home.desc'))}</p>
    <div class="meter-grid">${list}</div>
    ${state.meters.length < MAX_METERS
      ? `<button class="add-meter" onclick="window.ppShowAdd()">
          <svg width="22" height="22" fill="currentColor" viewBox="0 0 24 24"><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/></svg>
          ${esc(t('home.add'))}
        </button>`
      : `<p class="muted" style="text-align:center">${esc(t('home.max'))}</p>`}
  `;
}
let dragId = null;
$('#homeContent').addEventListener('dragstart', e => {
  const card = e.target.closest('.meter-card[draggable]');
  if (!card) return;
  dragId = card.dataset.id;
  card.classList.add('dragging');
  e.dataTransfer.effectAllowed = 'move';
  try { e.dataTransfer.setData('text/plain', card.dataset.id); } catch { }
});
$('#homeContent').addEventListener('dragover', e => {
  const card = e.target.closest('.meter-card[draggable]');
  if (!card || !dragId || card.dataset.id === dragId) return;
  e.preventDefault();
  e.dataTransfer.dropEffect = 'move';
  card.classList.add('drop-target');
});
$('#homeContent').addEventListener('dragleave', e => {
  const card = e.target.closest('.meter-card[draggable]');
  if (card) card.classList.remove('drop-target');
});
$('#homeContent').addEventListener('drop', e => {
  e.preventDefault();
  const grid = $('.meter-grid'); if (!grid || !dragId) return;
  const target = e.target.closest('.meter-card[draggable]');
  if (!target || target.dataset.id === dragId) { cleanupDrag(); return; }
  const from = state.meters.findIndex(m => m.id === dragId);
  const to = state.meters.findIndex(m => m.id === target.dataset.id);
  if (from >= 0 && to >= 0) {
    const [moved] = state.meters.splice(from, 1);
    state.meters.splice(to, 0, moved);
    saveMeters();
    renderHome();
  }
  cleanupDrag();
});
$('#homeContent').addEventListener('dragend', e => {
  const card = e.target.closest('.meter-card[draggable]');
  if (card) card.classList.remove('dragging');
  cleanupDrag();
});
function cleanupDrag() {
  dragId = null;
  $$('.meter-card.drop-target, .meter-card.dragging').forEach(c => c.classList.remove('drop-target', 'dragging'));
}
window.ppOpen = id => openMeter(id);
window.ppRefresh = id => { const m = state.meters.find(x => x.id === id); if (m) refreshMeter(m); };
window.ppRemove = id => {
  openDialog(t('meter.remove_q'), `<p class="body-text">${esc(t('meter.remove_text'))}</p>`, [
    { key: 'cancel', label: t('btn.cancel'), cls: 'secondary', fn: closeDialog },
    { key: 'remove', label: t('btn.remove'), cls: 'danger', fn: () => { state.meters = state.meters.filter(m => m.id !== id); saveMeters(); closeDialog(); renderHome(); } }
  ]);
};
window.ppEditMeter = id => {
  const m = state.meters.find(x => x.id === id);
  if (!m) return;
  openDialog(t('edit.title'), `
    <label>${esc(t('edit.nickname'))}</label>
    <input type="text" id="dlgEditNick" value="${esc(m.nickname || '')}" placeholder="${esc(t('edit.nickname_hint'))}" maxlength="30" autocomplete="off">
    <label style="margin-top:12px">${esc(t('edit.low_threshold'))}</label>
    <input type="number" id="dlgEditLow" value="${m.lowThreshold ?? state.settings.alertThreshold ?? LOW_BALANCE}" min="0" max="99999" step="1" inputmode="numeric">`, [
    { key: 'cancel', label: t('btn.cancel'), cls: 'secondary', fn: closeDialog },
    { key: 'save', label: t('btn.ok'), cls: 'primary', fn: () => {
      m.nickname = $('#dlgEditNick').value.trim();
      const newLow = Number($('#dlgEditLow').value);
      m.lowThreshold = isNaN(newLow) ? (state.settings.alertThreshold ?? LOW_BALANCE) : newLow;
      saveMeters(); closeDialog(); renderHome();
    }}
  ]);
  if (window.visualViewport) {
    const scrollInput2 = () => { const el = document.activeElement; if (el && el.tagName === 'INPUT') el.scrollIntoView({ block: 'nearest' }); };
    window.visualViewport.addEventListener('resize', scrollInput2);
    window.addEventListener('focusout', () => setTimeout(scrollInput2, 100), { once: true });
  }
};
window.ppShowAdd = showAddMeter;

/* ================= charts ================= */
function getCss(prop) { return getComputedStyle(document.body).getPropertyValue(prop).trim() || '#0b3d91'; }
function drawChart(canvas, labels, series) {
  const dpr = window.devicePixelRatio || 1;
  const w = Math.max(canvas.clientWidth, 300);
  const h = 190;
  canvas.width = w * dpr; canvas.height = h * dpr;
  canvas.style.height = h + 'px';
  const ctx = canvas.getContext('2d');
  ctx.scale(dpr, dpr);
  ctx.clearRect(0, 0, w, h);
  const css = getComputedStyle(document.body);
  const txt = css.getPropertyValue('--text').trim() || '#14181f';
  const txt2 = css.getPropertyValue('--text-2').trim() || '#5b6472';
  const line = css.getPropertyValue('--border').trim() || '#dfe4ec';
  const padL = 44, padR = 12, padT = 14, padB = 30;
  const maxV = Math.max(1, ...series.flatMap(s => s.values.map(v => Number(v) || 0)));
  const minV = 0;
  const iw = w - padL - padR, ih = h - padT - padB;
  const yFor = v => padT + ih - ((v - minV) / (maxV - minV)) * ih;

  ctx.strokeStyle = line; ctx.fillStyle = txt2; ctx.font = '11px sans-serif'; ctx.textAlign = 'right';
  ctx.beginPath();
  for (let i = 0; i <= 4; i++) {
    const v = minV + (maxV - minV) * i / 4;
    const y = yFor(v);
    ctx.moveTo(padL, y); ctx.lineTo(w - padR, y);
    ctx.fillText(fmtNum(v), padL - 6, y + 4);
  }
  ctx.stroke();

  const n = labels.length;
  const step = iw / n;
  ctx.textAlign = 'center';
  labels.forEach((l, i) => {
    if (n > 20 && i % 3 !== 0) return;
    ctx.fillStyle = txt2;
    ctx.fillText(l, padL + step * (i + 0.5), h - 10);
  });

  series.forEach(sr => {
    ctx.strokeStyle = sr.color; ctx.lineWidth = 2; ctx.beginPath();
    const pts = sr.values.map((v, i) => [padL + step * (i + 0.5), yFor(Number(v) || 0)]);
    pts.forEach((p, i) => i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1]));
    ctx.stroke();
    ctx.fillStyle = sr.color;
    pts.forEach(p => { ctx.beginPath(); ctx.arc(p[0], p[1], 3, 0, Math.PI * 2); ctx.fill(); });
  });
}

/* ================= views / nav ================= */
function showView(name) {
  currentView = name;
  if (name === 'home') { currentMeterId = null; $('#view-home').style.display=''; $('#view-settings').style.display='none'; renderHome(); }
  if (name === 'meter') renderMeterDetail();
  scrollToTop();
}
function initUi() {
  $('#btnBrand').onclick = () => { currentView = 'home'; currentMeterId = null; $('#view-home').style.display=''; $('#view-settings').style.display='none'; renderHome(); scrollToTop(); };
  $('#btnSettings').onclick = () => { currentView = 'settings'; $('#view-home').style.display='none'; $('#view-settings').style.display=''; renderSettings(); scrollToTop(); };
  $('#btnRefreshAll').onclick = async () => {
    const el = $('#refreshIcon'); el.parentElement.classList.add('spinning');
    await refreshAllMeters();
    saveMeters();
    el.parentElement.classList.remove('spinning');
    if (currentView === 'home') renderHome();
    toast(t('home.last_updated', { t: t('time.just') }));
  };
  document.addEventListener('click', e => {
    const back = e.target.closest('[data-back]');
    if (back) { e.preventDefault(); if (!$('#dlg').hidden) { closeDialog(); return; } currentMeterId = null; showView('home'); return; }
    if (currentView === 'meter' &&
      (e.target === $('#homeContent') || e.target === $('#view-home') ||
       (e.target.classList && (e.target.classList.contains('home-content') || e.target.classList.contains('view'))))) {
      currentMeterId = null; showView('home');
    }
  });
  syncSettingsUi();
}
function renderSettings() {
  const lang = state.settings.lang || 'en';
  const threshold = state.settings.alertThreshold ?? LOW_BALANCE;
  $('#settingsContent').innerHTML = `
    <h2 class="section-title" style="margin-bottom:2px">Settings</h2>
    <p class="muted" style="margin-bottom:12px">Manage preferences and theme settings.</p>

    <section class="card">
      <h3 style="text-align:center">General Settings</h3>

      <div class="row" style="justify-content:space-between;gap:12px">
        <div style="display:flex;align-items:center;gap:12px;flex:1">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" style="opacity:.6"><path d="M17 1.01L7 1c-1.1 0-2 .9-2 2v18c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V3c0-1.1-.9-1.99-2-1.99zM17 19H7V5h10v14z"/></svg>
          <div>
            <div style="font-weight:600">Device Theme</div>
            <div class="hint" style="margin:0">Automatically switch theme based on system</div>
          </div>
        </div>
        <label class="toggle"><input type="checkbox" id="settDeviceTheme" ${state.settings.theme === 'system' ? 'checked' : ''}><span class="toggle-slider"></span></label>
      </div>

      <div class="row" style="justify-content:space-between;gap:12px">
        <div style="display:flex;align-items:center;gap:12px;flex:1">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" style="opacity:.6"><path d="M9 2c-1.05 0-2.05.16-3 .46 4.06 1.27 7 5.06 7 9.54 0 4.48-2.94 8.27-7 9.54.95.3 1.95.46 3 .46 5.52 0 10-4.48 10-10S14.52 2 9 2z"/></svg>
          <div>
            <div style="font-weight:600">OLED Theme</div>
            <div class="hint" style="margin:0">Use OLED black backdrop for eye comfort</div>
          </div>
        </div>
        <label class="toggle"><input type="checkbox" id="settDarkTheme" ${state.settings.theme === 'oled' ? 'checked' : ''}><span class="toggle-slider"></span></label>
      </div>

      <div class="row" style="justify-content:space-between;gap:12px">
        <div style="display:flex;align-items:center;gap:12px;flex:1">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" style="opacity:.6"><path d="M12.87 15.07l-2.54-2.51.03-.03A17.52 17.52 0 0014.07 6H17V4h-7V2H8v2H1v2h11.17C11.5 7.92 10.44 9.75 9 11.35 8.07 10.32 7.3 9.19 6.69 8h-2c.73 1.63 1.73 3.17 2.98 4.56l-5.09 5.02L4 19l5-5 3.11 3.11.76-2.04M18.5 10h-2L12 22h2l1.12-3h4.75L21 22h2l-4.5-12m-2.62 7l1.62-4.33L19.12 17h-3.24z"/></svg>
          <div style="font-weight:600">Language</div>
        </div>
        <div class="lang-toggle" id="settLangToggle" data-lang="${lang}">
          <div class="lt-slider"></div>
          <span class="lt-label ${lang === 'bn' ? 'active' : ''}">বাংলা</span>
          <span class="lt-label ${lang === 'en' ? 'active' : ''}">English</span>
        </div>
      </div>

      <div class="row" style="justify-content:space-between;gap:12px">
        <div style="display:flex;align-items:center;gap:12px;flex:1">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" style="opacity:.6"><path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"/></svg>
          <div>
            <div style="font-weight:600">Low balance threshold</div>
            <div class="hint" style="margin:0">Default threshold (BDT)</div>
          </div>
        </div>
        <input type="number" id="settThreshold" value="${threshold}" min="0" max="99999" step="50" inputmode="numeric" style="width:80px;text-align:right">
      </div>
    </section>

    <div style="display:flex;flex-direction:column;gap:10px;margin-top:16px">
      <div class="settings-box" onclick="window._settingsShare()">Share</div>
      <div class="settings-box" onclick="showImportExport()">Import / Export</div>
      <div class="settings-box" onclick="window._settingsDeleteAll()" style="color:var(--danger)">Delete All Meters</div>
      <div class="settings-box" id="btnAbout" onclick="window._settingsAbout(this)">About App</div>
      <div class="settings-box" id="btnContact" onclick="window._settingsContact(this)">Contact Developer</div>
    </div>

    <div style="text-align:center;margin-top:40px;padding:16px 0;border-top:1px solid var(--border)">
      <span style="font-size:11px;color:var(--text-2);font-family:serif;letter-spacing:0.5px">Version ${state.settings._version || '1.0.83'} (build ${state.settings._build || '252'})</span>
    </div>`;

  $('#settDeviceTheme').onchange = (e) => {
    if (e.target.checked) {
      state.settings.theme = 'system';
    } else {
      const resolved = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'oled' : 'light';
      state.settings.theme = resolved;
    }
    saveSettings(); applyTheme(); renderSettings();
  };
  $('#settDarkTheme').onchange = (e) => {
    if (e.target.checked) {
      state.settings.theme = 'oled';
    } else {
      state.settings.theme = 'light';
    }
    saveSettings(); applyTheme(); renderSettings();
  };
  $('#settLangToggle').onclick = () => {
    state.settings.lang = state.settings.lang === 'bn' ? 'en' : 'bn';
    saveSettings(); renderSettings(); applyLang();
  };
  $('#settThreshold').onchange = (e) => {
    const v = Number(e.target.value);
    state.settings.alertThreshold = isNaN(v) ? LOW_BALANCE : v;
    saveSettings();
  };
}
function syncSettingsUi() {
}
window._settingsShare = function() {
  const url = 'https://drive.google.com/uc?export=download&id=1dGVmrcVDRqGnTkBqa2dElq0tMnZ2dJHx';
  const msg = 'Check out Meter Manager – a simple app to track DESCO prepaid electricity meters in Bangladesh!\n\nDownload: ' + url;
  if (navigator.share) {
    navigator.share({ title: 'Meter Manager', text: msg }).catch(() => {});
  } else {
    navigator.clipboard.writeText(msg).then(() => toast('Link copied to clipboard!')).catch(() => toast('Could not copy link', true));
  }
};
window._settingsDeleteAll = function() {
  if (!state.meters.length) { toast(t('home.empty.title')); return; }
  openDialog(t('settings.clear'), '<p class="body-text">' + esc(t('meter.remove_text')) + '</p>', [
    { key: 'cancel', label: t('btn.cancel'), cls: 'secondary', fn: closeDialog },
    { key: 'remove', label: t('btn.remove'), cls: 'danger', fn: () => { state.meters = []; saveMeters(); closeDialog(); renderHome(); toast(t('settings.cleared')); } }
  ]);
};
window._settingsAbout = async function(el) {
  el.textContent = 'Loading...';
  const md = await driveFetchCached('cached_about_md', 'About.md');
  el.textContent = 'About App';
  if (!md) { openDialog('About App', '<p class="body-text">No description available.</p>', [{ key: 'ok', label: 'OK', cls: 'primary', fn: closeDialog }]); return; }
  let html = '<div style="text-align:center;margin-bottom:12px"><img src="icons/icon-512.png" class="about-logo" style="width:80px;height:80px;border-radius:20px"><div style="font-weight:700;font-size:16px;margin-top:4px">Meter Manager</div></div>';
  for (const line of md.split('\n')) {
    const trimmed = line.trim();
    if (!trimmed) { html += '<br>'; continue; }
    if (trimmed.startsWith('## ')) { html += `<div style="font-weight:700;font-size:14px;color:var(--primary);margin:8px 0 4px">${esc(trimmed.slice(3))}</div>`; }
    else if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
      const txt = trimmed.slice(2).replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
      html += `<div style="font-size:13px;line-height:1.6;margin-left:8px">• ${txt}</div>`;
    } else { html += `<div style="font-size:13px;line-height:1.6">${trimmed.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/`([^`]+)`/g, '<code style="background:var(--surface-2);padding:1px 4px;border-radius:3px">$1</code>')}</div>`; }
  }
  openDialog('', html, [{ key: 'ok', label: 'OK', cls: 'primary', fn: closeDialog }]);
};
window._settingsContact = async function(el) {
  el.textContent = 'Loading...';
  const md = await driveFetchCached('cached_contact_md', 'Contact.md');
  el.textContent = 'Contact Developer';
  if (!md) { openDialog('Contact Developer', '<p class="body-text">No contact information available.</p>', [{ key: 'ok', label: 'OK', cls: 'primary', fn: closeDialog }]); return; }
  let developerName = 'Developer';
  const entries = [];
  for (const line of md.split('\n')) {
    const trimmed = line.trim().replace(/^[-*]\s*/, '');
    if (!trimmed.includes(':')) continue;
    const idx = trimmed.indexOf(':');
    const label = trimmed.slice(0, idx).trim();
    const value = trimmed.slice(idx + 1).trim();
    if (!label || !value) continue;
    if (label.toLowerCase() === 'name') { developerName = value; continue; }
    entries.push({ label, value });
  }
  const icons = { whatsapp: '💬', email: '📧', github: '🐙', facebook: '📘', telegram: '✈️', twitter: '🐦', phone: '📞', website: '🌐' };
  let html = `<div style="text-align:center;margin-bottom:12px"><div style="font-weight:700;font-size:16px">${esc(developerName)}</div></div><div style="display:flex;flex-direction:column;gap:8px">`;
  for (const { label, value } of entries) {
    const lower = label.toLowerCase();
    let href = value;
    if (lower.includes('whatsapp')) href = 'https://wa.me/' + value.replace(/[^0-9]/g, '');
    else if (lower.includes('email') || lower.includes('mail')) href = 'mailto:' + value;
    else if (lower.includes('github')) href = 'https://github.com/' + value.replace(/^https?:\/\/github\.com\//, '');
    else if (lower.includes('facebook') && !lower.includes('messenger')) href = 'https://facebook.com/' + value.replace(/^https?:\/\/(www\.)?facebook\.com\//, '');
    else if (lower.includes('telegram')) href = 'https://t.me/' + value.replace(/^https?:\/\/t\.me\//, '');
    else if (lower.includes('twitter') || lower.includes('x')) href = 'https://x.com/' + value.replace(/^https?:\/\/(www\.)?(twitter|x)\.com\//, '');
    else if (lower.includes('phone')) href = 'tel:' + value.replace(/[^0-9+]/g, '');
    else if (lower.includes('website') || lower.includes('url')) href = value.startsWith('http') ? value : 'https://' + value;
    const icon = Object.entries(icons).find(([k]) => lower.includes(k));
    html += `<a href="${esc(href)}" target="_blank" rel="noopener" class="settings-box" style="text-decoration:none;display:flex;align-items:center;gap:10px"><span style="font-size:18px">${icon ? icon[1] : '🔗'}</span><span>${esc(label)}</span></a>`;
  }
  html += '</div>';
  openDialog('', html, [{ key: 'ok', label: 'OK', cls: 'primary', fn: closeDialog }]);
};
function applyLang() {
  langs = I18N[state.settings.lang] || I18N.en;
  document.documentElement.lang = state.settings.lang;
  document.title = t('app.name');
  $$('[data-i18n]').forEach(el => { el.innerHTML = t(el.dataset.i18n); });
  renderHome();
}
function applyTheme() {
  const t1 = state.settings.theme === 'system'
    ? (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'oled' : 'light')
    : state.settings.theme;
  document.documentElement.dataset.theme = t1;
  document.querySelector('meta[name="theme-color"]').content = t1 === 'oled' ? '#0a0a0a' : t1 === 'dark' ? '#1a1f2a' : '#e8ebf0';
}
async function enableNotifications() {
  if (!('Notification' in window)) { toast(t('alerts.perm'), true); return; }
  if (Notification.permission === 'granted') { toast(t('settings.perm.granted')); return; }
  const res = await Notification.requestPermission();
  if (res !== 'granted') toast(t('alerts.perm'), true);
}
let alertTimer = null, autoTimer = null, autoBusy = false;
function scheduleAlerts() {
  clearInterval(alertTimer);
  if (!state.settings.alerts) return;
  alertTimer = setInterval(checkAlerts, state.settings.alertFreq * 60000);
}
function scheduleAutoRefresh() {
  clearInterval(autoTimer);
  if (!state.settings.autoRefresh) return;
  autoTimer = setInterval(() => {
    if (autoBusy) return;
    autoBusy = true;
    refreshAllMeters().then(() => { autoBusy = false; renderHome(); });
  }, state.settings.autoFreq * 1000);
}
async function checkAlerts() {
  for (const m of state.meters) {
    const b = balanceOf(m);
    if (b !== null && b < state.settings.alertThreshold && !m._alerted) {
      m._alerted = true; saveMeters();
      notify(t('alerts.title'), t('alerts.body', { n: m.accountNo || m.consumerNo, b: fmtBdt(b) }));
    } else if (b !== null && b >= state.settings.alertThreshold) {
      m._alerted = false;
    }
  }
}

/* ================= PWA ================= */
window.__pp = { get state() { return state; }, refreshMeter, probeSystemType, apiGet, t, DESCO };
function registerSw() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('service-worker.js').catch(() => { /* offline optional */ });
  }
}

/* ================= boot ================= */
async function boot() {
  loadState();
  applyLang();
  applyTheme();
  initUi();
  registerSw();
  showView('home');
  state.meters.forEach(m => { m.loading = true; m.err = null; });
  renderHome();
  await refreshAllMeters();
  renderHome();
  scheduleAlerts();
  scheduleAutoRefresh();
}
document.addEventListener('DOMContentLoaded', boot);

/* ================= Pull-to-refresh ================= */
(function() {
  let startY = 0, pulling = false;
  const home = document.getElementById('view-home');
  if (!home) return;
  home.addEventListener('touchstart', e => {
    if (home.scrollTop === 0) { startY = e.touches[0].clientY; pulling = true; }
  }, { passive: true });
  home.addEventListener('touchmove', e => {
    if (!pulling) return;
    const dy = e.touches[0].clientY - startY;
    if (dy > 80) { pulling = false; toast(t('home.refreshing')); refreshAllMeters().then(() => renderHome()); }
  }, { passive: true });
  home.addEventListener('touchend', () => { pulling = false; }, { passive: true });
})();
