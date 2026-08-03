# Meter Manager

A browser-based manager for DESCO and NESCO prepaid electricity meters.

## Run

```bash
node server.js
```

Then open **http://127.0.0.1:3000**

The server both:
- serves the app (index.html, css, js, icons), and
- proxies NESCO portal requests (needed because the NESCO portal requires
  session cookies across requests, which browsers cannot do cross-origin).

DESCO works directly against the official DESCO portal API — no proxy needed.

## Features

- Add DESCO prepaid meters (8-digit account or 12-digit meter number)
- Add NESCO prepaid meters (8–11 digit consumer number)
- Live balance, customer info, recharge history
- Daily (15d) + monthly (12m) consumption charts (DESCO only)
- Balance alerts, EN/BN language, light/dark themes
- Auto refresh, PWA installable
- Demo mode: `http://127.0.0.1:3000/index.html?demo=1`

## Notes

- NESCO data comes from the public NESCO customer portal
  (customer.nesco.gov.bd) via the bundled proxy. Keep `server.js` running
  when using NESCO meters.
- Meter data is stored only in your browser (localStorage).
