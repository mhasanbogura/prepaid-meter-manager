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
    'edit.title': 'Edit meter', 'edit.nickname': 'Nickname', 'edit.nickname_hint': 'e.g. Home, Office', 'edit.low_threshold': 'Low balance alert threshold (BDT)',
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
    'edit.title': 'মিটার সম্পাদনা', 'edit.nickname': 'ডাকনাম', 'edit.nickname_hint': 'যেমন: বাসা, অফিস', 'edit.low_threshold': 'কম ব্যালেন্স সতর্কতা সীমা (BDT)',
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
function lowBalance(meter) { const b = balanceOf(meter); return b !== null && b < (meter.lowThreshold ?? LOW_BALANCE); }
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
  showView('home');
  renderHome();
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
      <div class="mc-balance ${b !== null && low ? 'low' : ''}">${b === null ? '––' : fmtBdt(b)}${low ? ' <span style="font-size:12px;font-weight:700">Low balance</span>' : ''}</div>
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
    <input type="number" id="dlgEditLow" value="${m.lowThreshold ?? LOW_BALANCE}" min="0" max="99999" step="1" inputmode="numeric">`, [
    { key: 'cancel', label: t('btn.cancel'), cls: 'secondary', fn: closeDialog },
    { key: 'save', label: t('btn.ok'), cls: 'primary', fn: () => {
      m.nickname = $('#dlgEditNick').value.trim();
      const newLow = Number($('#dlgEditLow').value);
      m.lowThreshold = isNaN(newLow) ? LOW_BALANCE : newLow;
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
  $('#view-home').hidden = name !== 'home';
  $('#view-settings').hidden = name !== 'settings';
  if (name === 'home') { currentMeterId = null; renderHome(); }
  if (name === 'meter') renderMeterDetail();
  if (name === 'settings') renderSettings();
  scrollToTop();
}
/* ================= Google Drive helpers ================= */
const DRIVE_FOLDER_ID = '1PBrhSIvDk0QrgNS6XeTeA1RDLFPeTqKV';
const DRIVE_API_KEY = 'AIzaSyA4ymjFIbuGVhFsKjxVV46RT-qWqNHNiY4';

async function driveFindSubfolderId(parentId, folderName) {
  try {
    const q = `'${parentId}' in parents and mimeType='application/vnd.google-apps.folder' and name='${folderName}' and trashed=false`;
    const url = `https://www.googleapis.com/drive/v3/files?q=${encodeURIComponent(q)}&key=${DRIVE_API_KEY}&fields=files(id)`;
    const res = await fetch(url);
    if (!res.ok) return null;
    const json = await res.json();
    return json.files && json.files.length ? json.files[0].id : null;
  } catch { return null; }
}

async function driveSearchFiles(folderId, nameContains, mimeType) {
  try {
    let q = `'${folderId}' in parents and trashed=false`;
    if (nameContains) q += ` and name contains '${nameContains}'`;
    if (mimeType) q += ` and mimeType='${mimeType}'`;
    const url = `https://www.googleapis.com/drive/v3/files?q=${encodeURIComponent(q)}&key=${DRIVE_API_KEY}&fields=files(id,name,mimeType,size)&orderBy=name desc`;
    const res = await fetch(url);
    if (!res.ok) return [];
    const json = await res.json();
    return json.files || [];
  } catch { return []; }
}

async function driveFetchMdContent(fileId) {
  try {
    const url = `https://www.googleapis.com/drive/v3/files/${fileId}?alt=media&key=${DRIVE_API_KEY}`;
    const res = await fetch(url);
    if (!res.ok) return null;
    return (await res.text()).trim();
  } catch { return null; }
}

async function driveFindLatestApk() {
  let files = await driveSearchFiles(DRIVE_FOLDER_ID, 'Meter Manager_com.mahmuduls.metermanager', 'application/vnd.android.package-archive');
  if (!files.length) {
    const androidId = await driveFindSubfolderId(DRIVE_FOLDER_ID, 'Android');
    if (androidId) files = await driveSearchFiles(androidId, 'Meter Manager_com.mahmuduls.metermanager', 'application/vnd.android.package-archive');
  }
  return files.length ? files[0] : null;
}

async function driveFindAboutMd() {
  let files = await driveSearchFiles(DRIVE_FOLDER_ID, 'Meter Manager_com.mahmuduls.metermanager.md');
  if (!files.length) {
    const androidId = await driveFindSubfolderId(DRIVE_FOLDER_ID, 'Android');
    if (androidId) files = await driveSearchFiles(androidId, 'Meter Manager_com.mahmuduls.metermanager.md');
  }
  if (!files.length) return null;
  return await driveFetchMdContent(files[0].id);
}

async function driveFetchMdByName(fileName) {
  let files = await driveSearchFiles(DRIVE_FOLDER_ID, fileName);
  if (!files.length) {
    const androidId = await driveFindSubfolderId(DRIVE_FOLDER_ID, 'Android');
    if (androidId) files = await driveSearchFiles(androidId, fileName);
  }
  if (!files.length) return null;
  return await driveFetchMdContent(files[0].id);
}

/* ================= settings ================= */
function renderSettings() {
  const isDark = document.documentElement.dataset.theme === 'dark';
  const version = '1.0.86';
  const build = '261';
  const lang = state.settings.lang || 'en';
  const notifEnabled = state.settings.notifEnabled !== false;
  const notifHour = state.settings.notifHour ?? 8;
  const notifMinute = state.settings.notifMinute ?? 0;
  const notifInterval = state.settings.notifInterval ?? 24;
  const threshold = state.settings.alertThreshold ?? 200;

  $('#settingsContent').innerHTML = `
    <h2 class="section-title" style="margin-bottom:4px">Settings</h2>
    <p class="muted" style="margin-bottom:16px">Manage preferences and theme settings.</p>

    <section class="card">
      <h3 style="text-align:center">General Settings</h3>

      <div class="row" style="justify-content:space-between;gap:12px">
        <div style="display:flex;align-items:center;gap:12px;flex:1">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" style="opacity:.6"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/><circle cx="12" cy="12" r="5"/></svg>
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
        <label class="toggle"><input type="checkbox" id="settDarkTheme" ${state.settings.theme === 'dark' ? 'checked' : ''}><span class="toggle-slider"></span></label>
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

      <div class="row" style="justify-content:space-between;gap:12px;flex-wrap:wrap">
        <div style="display:flex;align-items:center;gap:12px;flex:1">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" style="opacity:.6"><path d="M12 22c1.1 0 2-.9 2-2h-4a2 2 0 002 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z"/></svg>
          <div>
            <div style="font-weight:600">Update Notifications</div>
            <div class="hint" style="margin:0">Starts at <strong style="cursor:pointer;color:var(--primary)" onclick="window._pickNotifHour()">${_fmtNotifHour(notifHour)}</strong>, repeats every <strong style="cursor:pointer;color:var(--primary)" onclick="window._pickNotifInterval()">${notifInterval} hours</strong></div>
          </div>
        </div>
        <label class="toggle"><input type="checkbox" id="settNotifEnabled" ${notifEnabled ? 'checked' : ''}><span class="toggle-slider"></span></label>
      </div>

      <div class="row" style="justify-content:space-between;gap:12px">
        <div style="display:flex;align-items:center;gap:12px;flex:1">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" style="opacity:.6"><path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"/></svg>
          <div>
            <div style="font-weight:600">Low Balance Alert</div>
            <div class="hint" style="margin:0">Default alert threshold (BDT)</div>
          </div>
        </div>
        <input type="number" id="settThreshold" value="${threshold}" min="0" max="99999" step="50" inputmode="numeric" style="width:80px;text-align:right">
      </div>
    </section>

    <div style="display:flex;flex-direction:column;gap:10px;margin-top:16px">
      <div class="settings-box" id="btnUpdate" onclick="window._settingsUpdate(this)">Update</div>
      <div class="settings-box" onclick="window._settingsShare()">Share</div>
      <div class="settings-box" onclick="showImportExport()">Import / Export</div>
      <div class="settings-box" onclick="window._settingsDeleteAll()" style="color:var(--danger)">Delete All Meters</div>
      <div class="settings-box" id="btnAbout" onclick="window._settingsAbout(this)">About App</div>
      <div class="settings-box" id="btnContact" onclick="window._settingsContact(this)">Contact Developer</div>
    </div>

    <div style="text-align:center;margin-top:40px;padding:16px 0;border-top:1px solid var(--border)">
      <span style="font-size:11px;color:var(--text-2);font-family:serif;letter-spacing:0.5px">Version ${version} (build ${build})</span>
    </div>`;

  $('#settDeviceTheme').onchange = (e) => {
    if (e.target.checked) {
      state.settings.theme = 'system';
    } else {
      const resolved = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      state.settings.theme = resolved;
    }
    saveSettings(); applyTheme(); renderSettings();
  };
  $('#settDarkTheme').onchange = (e) => {
    if (e.target.checked) {
      state.settings.theme = 'dark';
    } else {
      state.settings.theme = 'light';
    }
    saveSettings(); applyTheme(); renderSettings();
  };
  $('#settLangToggle').onclick = () => {
    state.settings.lang = state.settings.lang === 'bn' ? 'en' : 'bn';
    saveSettings(); renderSettings(); applyLang();
  };
  $('#settNotifEnabled').onchange = (e) => {
    state.settings.notifEnabled = e.target.checked;
    saveSettings();
    _syncNotifToJava();
  };
  $('#settThreshold').onchange = (e) => {
    const v = Number(e.target.value);
    state.settings.alertThreshold = isNaN(v) ? 200 : v;
    saveSettings();
  };
}

function _fmtNotifHour(h) {
  const hr = h % 12 || 12;
  const ampm = h >= 12 ? 'PM' : 'AM';
  return `${hr}:00 ${ampm}`;
}

window._pickNotifHour = () => {
  const curHour = state.settings.notifHour ?? 8;
  const isPM = curHour >= 12;
  const selH = curHour % 12 || 12;
  let selectedHour = selH;
  let selectedAmPm = isPM ? 'PM' : 'AM';

  function renderClock() {
    const nums = [12,1,2,3,4,5,6,7,8,9,10,11];
    const r = 110, cx = 140, cy = 140;
    const dots = nums.map(n => {
      const angle = (n * 30 - 90) * Math.PI / 180;
      const x = cx + r * Math.cos(angle);
      const y = cy + r * Math.sin(angle);
      const active = n === selectedHour;
      return `<div style="position:absolute;left:${x - 18}px;top:${y - 18}px;width:36px;height:36px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:15px;font-weight:500;cursor:pointer;transition:all .15s;${active ? 'background:var(--primary);color:#fff' : 'color:var(--text)'}" onclick="window._clockSelect(${n})">${n}</div>`;
    }).join('');
    const angle = (selectedHour * 30 - 90) * Math.PI / 180;
    const handLen = 80;
    const hx = cx + handLen * Math.cos(angle);
    const hy = cy + handLen * Math.sin(angle);

    return `
      <div style="text-align:center;margin-bottom:16px">
        <div style="display:inline-flex;align-items:baseline;gap:4px;font-size:48px;font-weight:700">
          <span id="clockHour" style="color:var(--text)">${selectedHour}</span>
          <span style="color:var(--text-2);font-size:20px">:</span>
          <span style="color:var(--text-2);font-size:20px">00</span>
        </div>
        <div style="display:flex;justify-content:center;gap:4px;margin-top:8px">
          <div class="ampm-btn" id="ampmAM" style="padding:4px 16px;border-radius:8px;font-size:14px;font-weight:600;cursor:pointer;transition:all .15s;${selectedAmPm === 'AM' ? 'background:var(--primary);color:#fff' : 'color:var(--text-2)'}" onclick="window._clockSetAmPm('AM')">AM</div>
          <div class="ampm-btn" id="ampmPM" style="padding:4px 16px;border-radius:8px;font-size:14px;font-weight:600;cursor:pointer;transition:all .15s;${selectedAmPm === 'PM' ? 'background:var(--primary);color:#fff' : 'color:var(--text-2)'}" onclick="window._clockSetAmPm('PM')">PM</div>
        </div>
      </div>
      <div style="position:relative;width:280px;height:280px;margin:0 auto;background:var(--surface-2);border-radius:50%">
        <svg style="position:absolute;inset:0;width:100%;height:100%" viewBox="0 0 280 280">
          <line x1="${cx}" y1="${cy}" x2="${hx}" y2="${hy}" stroke="var(--primary)" stroke-width="2" stroke-linecap="round"/>
          <circle cx="${cx}" cy="${cy}" r="4" fill="var(--primary)"/>
        </svg>
        ${dots}
      </div>`;
  }

  window._clockSelect = (h) => {
    selectedHour = h;
    $('#clockPickerContent').innerHTML = renderClock();
  };
  window._clockSetAmPm = (v) => {
    selectedAmPm = v;
    $('#clockPickerContent').innerHTML = renderClock();
  };

  openDialog('Select time', `<div id="clockPickerContent">${renderClock()}</div>`, [
    { key: 'cancel', label: 'Cancel', cls: 'secondary', fn: closeDialog },
    { key: 'ok', label: 'OK', cls: 'primary', fn: () => {
      let h24 = selectedHour;
      if (selectedAmPm === 'PM' && selectedHour !== 12) h24 = selectedHour + 12;
      if (selectedAmPm === 'AM' && selectedHour === 12) h24 = 0;
      state.settings.notifHour = h24;
      state.settings.notifMinute = 0;
      saveSettings(); _syncNotifToJava(); closeDialog(); renderSettings();
    }}
  ]);
};

window._pickNotifInterval = () => {
  const cur = state.settings.notifInterval ?? 24;
  const intervals = [1,2,3,4,6,8,12,24,48];
  const items = intervals.map(i =>
    `<div style="padding:14px 20px;font-size:16px;cursor:pointer;border-radius:12px;transition:background .15s;${i === cur ? 'color:var(--primary);font-weight:600' : 'color:var(--text)'}" onclick="window._intervalPick(${i})" onmouseenter="this.style.background='var(--surface-2)'" onmouseleave="this.style.background='transparent'">${i} hours</div>`
  ).join('');
  window._intervalPick = (v) => {
    state.settings.notifInterval = v;
    saveSettings(); _syncNotifToJava(); closeDialog(); renderSettings();
  };
  openDialog('Check interval', `<div style="display:flex;flex-direction:column;gap:2px">${items}</div>`, []);
};

function _syncNotifToJava() {
  if (window.NescoBridge && window.NescoBridge.scheduleNotification) {
    window.NescoBridge.scheduleNotification(
      state.settings.notifEnabled !== false,
      state.settings.notifHour ?? 8,
      state.settings.notifMinute ?? 0,
      state.settings.notifInterval ?? 24
    );
  }
}

window._settingsDeleteAll = () => {
  if (!state.meters.length) { toast(t('home.empty.title')); return; }
  openDialog(t('settings.clear'), `<p class="body-text">${esc(t('meter.remove_text'))}</p>`, [
    { key: 'cancel', label: t('btn.cancel'), cls: 'secondary', fn: closeDialog },
    { key: 'remove', label: t('btn.remove'), cls: 'danger', fn: () => { state.meters = []; saveMeters(); closeDialog(); showView('home'); toast(t('settings.cleared')); } }
  ]);
};

window._settingsShare = async () => {
  const apk = await driveFindLatestApk();
  const link = apk ? `https://drive.google.com/uc?export=download&id=${apk.id}` : location.href;
  try {
    if (navigator.share) await navigator.share({ title: 'Meter Manager', text: 'Check out Meter Manager - track your DESCO/NESCO prepaid meter', url: link });
    else { window.NescoBridge?.clipboardWrite(link); toast('Link copied!'); }
  } catch {}
};

window._settingsAbout = async (el) => {
  el.textContent = 'Loading...';
  const md = await driveFindAboutMd();
  el.textContent = 'About App';
  if (!md) {
    openDialog('About', `<div style="text-align:center;margin-bottom:16px"><img src="icons/icon-electricity.svg" style="width:72px;height:72px;border-radius:18px;box-shadow:0 4px 16px rgba(0,0,0,.15)"><h3 style="margin-top:10px">Meter Manager</h3></div><p class="body-text">Helps you track DESCO and NESCO prepaid electricity meters: live balance, daily & monthly consumption, average daily cost and recharge history.</p>`, [
      { key: 'ok', label: 'OK', fn: closeDialog }
    ]);
    return;
  }
  let html = '<div style="text-align:center;margin-bottom:16px"><img src="icons/icon-electricity.svg" style="width:72px;height:72px;border-radius:18px;box-shadow:0 4px 16px rgba(0,0,0,.15)"><h3 style="margin-top:10px">Meter Manager</h3></div>';
  for (const line of md.split('\n')) {
    const t2 = line.trim();
    if (!t2) { html += '<div style="height:8px"></div>'; continue; }
    if (t2.startsWith('## ')) {
      html += `<h3 style="margin:10px 0 6px;color:var(--primary);font-size:15px;text-align:left">${esc(t2.slice(3))}</h3>`;
    } else if (t2.startsWith('# ')) {
      html += `<h2 style="margin:12px 0 6px;color:var(--text);font-size:17px;text-align:left">${esc(t2.slice(2))}</h2>`;
    } else if (t2.startsWith('- ') || t2.startsWith('* ')) {
      const bullet = t2.slice(2);
      const formatted = bullet.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/`(.*?)`/g, '<code style="background:var(--surface-2);padding:1px 4px;border-radius:3px;font-size:12px">$1</code>');
      html += `<div style="display:flex;gap:8px;margin:3px 0;font-size:13.5px;line-height:1.5;text-align:left"><span style="color:var(--primary);font-weight:700;flex-shrink:0">•</span><span>${formatted}</span></div>`;
    } else {
      const formatted = t2.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/`(.*?)`/g, '<code style="background:var(--surface-2);padding:1px 4px;border-radius:3px;font-size:12px">$1</code>');
      html += `<p style="margin:4px 0;font-size:13.5px;line-height:1.6;text-align:left">${formatted}</p>`;
    }
  }
  openDialog('About', html, [{ key: 'ok', label: 'OK', fn: closeDialog }]);
};

window._settingsContact = async (el) => {
  el.textContent = 'Loading...';
  const md = await driveFetchMdByName('Contact.md');
  el.textContent = 'Contact Developer';
  if (!md) {
    openDialog('Contact', '<p class="body-text">No contact information available.</p>', [
      { key: 'ok', label: 'OK', fn: closeDialog }
    ]);
    return;
  }
  let devName = 'Contact Developer';
  const entries = [];
  for (const line of md.split('\n')) {
    const raw = line.trim().replace(/^[-*]\s*/, '');
    if (!raw.includes(':')) continue;
    const [label, ...rest] = raw.split(':');
    const value = rest.join(':').trim();
    if (!label.trim() || !value) continue;
    const ll = label.trim().toLowerCase();
    if (ll === 'name' || ll === 'developer') { devName = value; continue; }
    entries.push({ label: label.trim(), value, ll });
  }
  const svgIcons = {
    whatsapp: `<svg width="20" height="20" viewBox="0 0 24 24" fill="#25D366"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>`,
    messenger: `<svg width="20" height="20" viewBox="0 0 24 24" fill="#0084FF"><path d="M12 2C6.36 2 2 6.37 2 11.8c0 2.91 1.2 5.42 3.15 7.2V22l3.12-1.71c.85.24 1.75.37 2.73.37 5.64 0 10-4.37 10-9.8S17.64 2 12 2zm1.07 13.07l-2.55-2.73L6.5 15.1l5.42-5.72 2.6 2.73 3.97-2.73-5.42 5.71z"/></svg>`,
    instagram: `<svg width="20" height="20" viewBox="0 0 24 24" fill="#E4405F"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>`,
    github: `<svg width="20" height="20" viewBox="0 0 24 24" fill="#9E9E9E"><path d="M12 2A10 10 0 002 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0012 2z"/></svg>`,
    facebook: `<svg width="20" height="20" viewBox="0 0 24 24" fill="#1877F2"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>`,
    telegram: `<svg width="20" height="20" viewBox="0 0 24 24" fill="#0088CC"><path d="M11.944 0A12 12 0 000 12a12 12 0 0012 12 12 12 0 0012-12A12 12 0 0012 0a12 12 0 00-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 01.171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.479.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg>`,
    email: `<svg width="20" height="20" viewBox="0 0 24 24" fill="#EA4335"><path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>`,
    phone: `<svg width="20" height="20" viewBox="0 0 24 24" fill="#0b3d91"><path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/></svg>`,
    website: `<svg width="20" height="20" viewBox="0 0 24 24" fill="#0b3d91"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/></svg>`,
    location: `<svg width="20" height="20" viewBox="0 0 24 24" fill="#0b3d91"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 010-5 2.5 2.5 0 010 5z"/></svg>`,
    twitter: `<svg width="20" height="20" viewBox="0 0 24 24" fill="#1DA1F2"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>`,
    default: `<svg width="20" height="20" viewBox="0 0 24 24" fill="#0b3d91"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/></svg>`
  };
  const contactButtons = entries.map(e => {
    let iconKey = 'default', url = '#';
    if (e.ll.includes('whatsapp')) { iconKey = 'whatsapp'; url = `https://wa.me/${e.value.replace(/[^0-9+]/g, '')}`; }
    else if (e.ll.includes('messenger')) { iconKey = 'messenger'; url = `https://m.me/${e.value}`; }
    else if (e.ll.includes('instagram')) { iconKey = 'instagram'; url = `https://instagram.com/${e.value}`; }
    else if (e.ll.includes('github')) { iconKey = 'github'; url = `https://github.com/${e.value}`; }
    else if (e.ll.includes('facebook')) { iconKey = 'facebook'; url = `https://facebook.com/${e.value}`; }
    else if (e.ll.includes('telegram')) { iconKey = 'telegram'; url = `https://t.me/${e.value}`; }
    else if (e.ll.includes('email') || e.ll.includes('mail')) { iconKey = 'email'; url = `mailto:${e.value}`; }
    else if (e.ll.includes('twitter') || e.ll === 'x') { iconKey = 'twitter'; url = `https://x.com/${e.value}`; }
    else if (e.ll.includes('mobile') || e.ll.includes('phone') || e.ll.includes('call')) { iconKey = 'phone'; url = `tel:${e.value}`; }
    else if (e.ll.includes('website') || e.ll.includes('web')) { iconKey = 'website'; url = e.value.startsWith('http') ? e.value : `https://${e.value}`; }
    else if (e.ll.includes('location') || e.ll.includes('address')) { iconKey = 'location'; url = `geo:0,0?q=${encodeURIComponent(e.value)}`; }
    return `<a href="${esc(url)}" target="_blank" rel="noopener" style="display:flex;align-items:center;gap:12px;padding:12px 16px;background:var(--surface);border:1px solid var(--border);border-radius:12px;text-decoration:none;color:var(--text);font-weight:500;font-size:14px">
      ${svgIcons[iconKey] || svgIcons.default}<span>${esc(e.label)}</span></a>`;
  }).join('');
  openDialog(devName, `<div style="display:flex;flex-direction:column;gap:8px">${contactButtons}</div>`, [
    { key: 'ok', label: 'Close', fn: closeDialog }
  ]);
};

window._updateStatus = (status) => {
  const btn = document.getElementById('btnUpdate');
  if (!btn) return;
  if (status === 'downloading') {
    btn.textContent = 'Downloading...';
    btn.style.pointerEvents = 'none';
    btn.style.color = '';
  } else if (status === 'error') {
    btn.textContent = 'Update failed';
    btn.style.pointerEvents = '';
    setTimeout(() => { btn.textContent = 'Update'; }, 3000);
  }
};

window._settingsUpdate = async (el) => {
  el.textContent = 'Checking for update...';
  el.style.pointerEvents = 'none';
  try {
    const apk = await driveFindLatestApk();
    if (!apk) {
      el.textContent = 'Update';
      el.style.pointerEvents = '';
      openDialog('Update', `<div style="text-align:center"><svg width="48" height="48" viewBox="0 0 24 24" fill="var(--success)" style="margin-bottom:8px"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg><p style="font-size:15px;font-weight:600">You are up to date!</p><p class="muted" style="margin-top:6px">No update information available.</p></div>`, [{ key: 'ok', label: 'OK', fn: closeDialog }]);
      return;
    }
    const remoteName = apk.name || '';
    const verMatch = remoteName.match(/v([\d.]+)/);
    const buildMatch = remoteName.match(/build_(\d+)/);
    const remoteVer = verMatch ? verMatch[1] : '?';
    const remoteBuild = buildMatch ? parseInt(buildMatch[1]) : 0;
    const curBuild = 282;
    const hasUpdate = remoteBuild > curBuild;
    if (!hasUpdate) {
      el.textContent = 'Latest version already installed';
      el.style.pointerEvents = '';
      el.style.color = 'var(--success)';
      openDialog('Update', `<div style="text-align:center"><svg width="48" height="48" viewBox="0 0 24 24" fill="var(--success)" style="margin-bottom:8px"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg><p style="font-size:15px;font-weight:600">You are up to date!</p><p class="muted" style="margin-top:6px">Version ${esc(remoteVer)} (build ${remoteBuild})</p></div>`, [{ key: 'ok', label: 'OK', fn: closeDialog }]);
      return;
    }
    el.textContent = 'Update Available';
    el.style.pointerEvents = '';
    el.style.color = 'var(--primary)';
    const apkSize = apk.size ? (apk.size / 1024 / 1024).toFixed(1) + ' MB' : '';
    openDialog('Update Available', `<div style="text-align:center"><div style="width:64px;height:64px;border-radius:16px;background:linear-gradient(135deg,var(--primary),var(--primary-2));display:flex;align-items:center;justify-content:center;margin:0 auto 12px"><svg width="32" height="32" viewBox="0 0 24 24" fill="#fff"><path d="M5 20h14v-2H5v2zM19 9h-4V3H9v6H5l7 7 7-7z"/></svg></div><p style="font-size:15px;font-weight:600">A new version is available</p><p class="muted" style="margin-top:4px">Version ${esc(remoteVer)} (build ${remoteBuild})${apkSize ? ' · ' + apkSize : ''}</p></div>`, [
      { key: 'cancel', label: 'Later', cls: 'secondary', fn: closeDialog },
      { key: 'install', label: 'Install Update', cls: 'primary', fn: () => {
        el.textContent = 'Downloading...';
        el.style.pointerEvents = 'none';
        closeDialog();
        const link = `https://drive.google.com/uc?export=download&id=${apk.id}`;
        if (window.NescoBridge && window.NescoBridge.downloadAndInstall) window.NescoBridge.downloadAndInstall(link);
        else window.open(link, '_blank');
      }}
    ]);
  } catch {
    el.textContent = 'Update';
    el.style.pointerEvents = '';
  }
};
function initUi() {
  $('#btnBrand').onclick = () => { showView('home'); history.pushState({ view: 'home' }, '', ''); };
  $('#btnSettings').onclick = () => { showView('settings'); history.pushState({ view: 'settings' }, '', ''); };
  $('#btnRefreshAll').onclick = async () => {
    const el = $('#refreshIcon'); el.parentElement.classList.add('spinning');
    await refreshAllMeters();
    saveMeters();
    el.parentElement.classList.remove('spinning');
    if (currentView === 'home') renderHome();
    else if (currentView === 'meter') renderMeterDetail();
    toast(t('home.last_updated', { t: t('time.just') }));
  };
  document.addEventListener('click', e => {
    const back = e.target.closest('[data-back]');
    if (back) { e.preventDefault(); if (!$('#dlg').hidden) { closeDialog(); return; } if (currentView === 'meter') { currentMeterId = null; showView('home'); } else if (currentView === 'settings') { showView('home'); } return; }
    if ((currentView === 'meter' || currentView === 'settings') &&
      (e.target === $('#homeContent') || e.target === $('#view-home') || e.target === $('#settingsContent') || e.target === $('#view-settings') ||
       (e.target.classList && (e.target.classList.contains('home-content') || e.target.classList.contains('view'))))) {
      currentMeterId = null; showView('home');
    }
  });
  syncSettingsUi();
}
function syncSettingsUi() {
}
function applyLang() {
  langs = I18N[state.settings.lang] || I18N.en;
  document.documentElement.lang = state.settings.lang;
  document.title = t('app.name');
  $$('[data-i18n]').forEach(el => { el.innerHTML = t(el.dataset.i18n); });
  renderHome();
}
function applyTheme() {
  const t1 = state.settings.theme === 'system'
    ? (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
    : state.settings.theme;
  document.documentElement.dataset.theme = t1;
  document.querySelector('meta[name="theme-color"]').content = t1 === 'dark' ? '#000000' : '#0b3d91';
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
