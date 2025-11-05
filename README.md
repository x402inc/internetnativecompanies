# Internet Native Companies (INC)

A modern, responsive landing site for Internet Native Companies. Lightweight stack (HTML/CSS/JS + a tiny PHP endpoint) — no build tools required.

## Tech
- HTML5
- CSS (custom, no framework)
- Vanilla JS (+ jQuery for convenience)
- PHP (single endpoint for email capture)

## Project Structure
```
/var/www/internetnativecompanies.com
├── index.html                 # Main landing page
├── subscribe.php              # POST endpoint, appends to storage/subscribers.csv
├── privacy.html               # Privacy Policy
├── terms.html                 # Terms of Use
├── assets/
│   ├── css/
│   │   └── style.css          # Theme, layout, components, responsive rules
│   ├── js/
│   │   └── main.js            # Nav, smooth scroll, reveal, modal, subscribe AJAX
│   └── img/
│       ├── logo-inc.png       # App logo
│       └── inc-social.jpg     # Social share image (Open Graph & Twitter)
└── storage/
    └── subscribers.csv        # Created on first subscription (git-ignored typically)
```

## Features
- Clean, Base-inspired design; fully responsive
- Sticky header with mobile dropdown
- Reveal-on-scroll animations, hover polish
- “Mint” CTA opens a Coming Soon modal
- Email subscribe form (AJAX → PHP → CSV)
- Social metadata (OG + Twitter) using `assets/img/inc-social.jpg`
- Social links (X, Email) in header and footer

## Running Locally
Requirements: PHP 7.4+ (or any web server capable of serving PHP files)

Option A: PHP built-in server
```bash
cd /var/www/internetnativecompanies.com
php -S 0.0.0.0:8080 -t .
```
Open http://localhost:8080 in your browser.

Option B: Any PHP-capable server (Apache/Nginx). Point the docroot to this directory.

## Email Capture Endpoint
- Endpoint: `POST /subscribe.php`
- Params: `email` (required), `website` (honeypot)
- Storage: `storage/subscribers.csv` (auto-created with header row)
- Response: `application/json` payload like `{ "success": true, "message": "Subscribed" }`

To rotate/clear submissions, archive or remove `storage/subscribers.csv` (it will be recreated on next submit).

## Customization
- Colors/spacing/components: edit `assets/css/style.css`
- Interactions/modal/scroll: edit `assets/js/main.js`
- Social metadata & titles: edit `<head>` in `index.html`
- Share image: replace `assets/img/inc-social.jpg` (1200×630 recommended)

## Deployment
- Copy the directory to your server (or push to your web host)
- Ensure PHP can write to `storage/` (the code creates it with 0755 if missing)
- Configure your domain (A/AAAA records) and TLS as usual

## Social
- X: https://x.com/x402_INC
- Email: contact@internetnativecompanies.com

## License
Proprietary © Internet Native Companies. All rights reserved.


