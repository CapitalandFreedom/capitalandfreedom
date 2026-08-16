# capitalandfreedom.com

A static website. No build step, no framework, no dependencies. What is in this folder is exactly what gets served.

## What is in here

```
index.html            Home
coaching.html         The eight week course, pricing, application form
about.html            Namita's story
free.html             Lead magnets + email capture
newsletter.html       The Sunday Letter signup
notes/index.html      Article list
notes/*.html          Two finished articles
faq.html              Questions
contact.html          Contact form
thank-you.html        Where every form lands
disclaimer.html       The important legal page
privacy.html          Privacy policy
terms.html            Terms
404.html              Not found page
assets/css/site.css   All styling
assets/js/site.js     Mobile menu + scroll reveal
netlify.toml          Headers, caching, tidy URLs
robots.txt            Search engine rules
sitemap.xml           Page list for Google
```

## Put it live in about fifteen minutes

### 1. Push to GitHub

```bash
cd capitalandfreedom
git init
git add .
git commit -m "First version of the site"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/capitalandfreedom.git
git push -u origin main
```

Make the repository private if you prefer. Netlify works with both.

### 2. Connect Netlify

1. Sign up at netlify.com with the GitHub account.
2. Add new site, then Import an existing project.
3. Pick the repository.
4. Leave the build command empty. Set the publish directory to `.` (a single dot).
5. Deploy.

You get a temporary address like `random-name-123.netlify.app`. Check it works.

### 3. Point the domain

1. In Netlify: Domain management, then Add a domain, then type `capitalandfreedom.com`.
2. Netlify will show you the exact DNS records to create. Use the values it shows you, not values copied from a blog post, because they change.
3. Two ways to do it:
   - **Easiest:** switch the domain's nameservers to Netlify DNS at your registrar. Netlify then handles everything.
   - **Or:** keep your current DNS and add the A record and CNAME that Netlify displays.
4. Wait for DNS to spread, usually under an hour, sometimes longer.
5. Turn on HTTPS. Netlify issues a free certificate automatically once DNS resolves.

**Careful:** if the domain's DNS also holds your Google Workspace email records, do not remove the MX records. If you move nameservers to Netlify, you must re-create the Google MX records inside Netlify DNS or `mail@capitalandfreedom.com` will stop working. Copy them down before you switch.

### 4. Turn on forms

Every form on the site already has `data-netlify="true"`. In the Netlify dashboard, open Forms, and you will see submissions land there after the first real submit.

Set up an email alert: Forms, then Form notifications, then send to `mail@capitalandfreedom.com`.

The free Netlify plan includes 100 form submissions per month. That is fine to begin with. Once you connect an email platform, submissions can go there instead.

## Connecting the email platform

The forms currently post to Netlify. When the email tool is ready, swap each form over.

**One important change since you planned this:** MailerLite's free plan dropped to 250 subscribers and 2,500 emails a month from 1 July 2026, with the limits enforced from 13 August 2026. That is very tight for a list you want to grow.

For a genuinely free start, **Kit** (the tool formerly called ConvertKit) has a free plan up to 10,000 subscribers with unlimited broadcasts, one automation and landing pages. For an audience-building newsletter that is the better fit. Brevo is another option: unlimited contacts but capped at 300 emails a day.

If you still prefer MailerLite, everything below works the same way.

### How to swap a form

Find the form tag, for example in `free.html`:

```html
<form class="form" name="lead-magnet" method="POST" data-netlify="true" ... action="/thank-you.html">
  <input type="hidden" name="form-name" value="lead-magnet">
```

Replace it with your provider's form action:

```html
<form class="form" method="POST" action="PASTE_YOUR_FORM_ENDPOINT_HERE">
```

Delete the `data-netlify`, `netlify-honeypot` and hidden `form-name` lines. Keep everything else, including the field names `first_name` and `email`, because most providers expect those.

Keep `action="/thank-you.html"` if your provider allows a custom redirect. Otherwise use theirs.

### Delivering the lead magnets

1. Make the four PDFs and the spreadsheet.
2. Put the files in `assets/downloads/` in this repo and push.
3. In your email tool, build a welcome automation that fires on signup and links to those files, for example `https://capitalandfreedom.com/assets/downloads/first-investment-kit.pdf`.

Sending files by email instead of linking them straight from the page is deliberate. It confirms the email address works, and it starts the relationship in the inbox where the newsletter lives.

## Editing pages

Every page is plain HTML. Open it, change the words, save, commit, push. Netlify redeploys in under a minute.

Things you will want to change often:

| What | Where |
|---|---|
| Cohort date | `coaching.html`, search for "12 September 2026" |
| Prices | `coaching.html` in the pricing section, and `faq.html` |
| Seat count | `coaching.html` |
| New article | Copy a file from `notes/`, edit it, then add a row to `notes/index.html` and a line to `sitemap.xml` |
| Colours and fonts | The `:root` block at the top of `assets/css/site.css` |

## Before you sell the first seat

- [ ] Replace the placeholder notes at the bottom of `disclaimer.html`, `privacy.html` and `terms.html` with your registered business details.
- [ ] Have an Indian lawyer who knows SEBI regulations read the disclaimer, the terms, and the sales page.
- [ ] Add a real photograph of Namita to the About page.
- [ ] Add a social share image at `assets/og.jpg` (1200 x 630 pixels) and add the `og:image` meta tag to each page.
- [ ] Set up a payment link (Razorpay, Instamojo or similar) and point the Apply buttons at it after the application step.
- [ ] Add Google Search Console and submit `sitemap.xml`.
- [ ] Test every form end to end, on a phone.

## Things deliberately left out

No analytics script, no Facebook pixel, no chat widget, no cookie banner. The site loads fast and collects almost nothing, which suits a brand built on trust. If you want visitor numbers later, Netlify Analytics or a privacy-friendly tool like Plausible can be added without changing any page.
