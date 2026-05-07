# Michael Echebi — Portfolio

A clean, recruiter-friendly single-page portfolio. Pure static site — HTML, CSS, JavaScript, and assets. No build step required.

## Structure

```
.
├── index.html                   # Main page (Home / About / Resume / Project / Contact)
├── thanks.html                  # Form submission redirect page
├── netlify.toml                 # Netlify config (headers + caching)
├── css/
│   └── styles.css
├── js/
│   └── main.js
└── assets/
    ├── profile.jpg              # Profile photo
    └── Michael_Echebi_Resume.pdf
```

## Deploy to Netlify

### Option 1 — Drag & drop (easiest)

1. Go to [app.netlify.com/drop](https://app.netlify.com/drop)
2. Drag the entire portfolio folder onto the drop zone.
3. Netlify gives you a live URL in seconds. Rename the site or attach a custom domain in **Site settings → Domain management**.

### Option 2 — Netlify CLI

```bash
npm install -g netlify-cli
cd portfolio
netlify deploy --prod
```

When prompted for the publish directory, enter `.` (the current folder).

### Option 3 — GitHub → Netlify (recommended for ongoing updates)

1. Push this folder to a GitHub repo.
2. In Netlify, click **Add new site → Import an existing project** and pick the repo.
3. Build command: *(leave blank)*. Publish directory: `.` (root).
4. Click **Deploy**.

## Contact form

The contact form uses **Netlify Forms** automatically once deployed. Submissions appear in **Site settings → Forms** in your Netlify dashboard. No backend code needed.

To receive email notifications when someone submits:
1. Open your Netlify site dashboard.
2. Go to **Forms → Settings & usage → Form notifications**.
3. Add an email notification pointing at `michaelechebi@gmail.com`.

## Updating content

- **Resume** — replace `assets/Michael_Echebi_Resume.pdf` with a new file of the same name.
- **Profile photo** — replace `assets/profile.jpg`.
- **Text** — edit `index.html`. Each section is clearly commented (`<!-- HERO -->`, `<!-- ABOUT -->`, etc.).
- **Colors / spacing** — edit the CSS variables at the top of `css/styles.css`.

## Local preview

Any static server works. The simplest:

```bash
# Python 3
python3 -m http.server 8000

# Node (if you have it)
npx serve .
```

Then open `http://localhost:8000`.
