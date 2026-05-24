# Photographer Portfolio Website — Claude Code Context

## Project Overview

Build a **professional photography portfolio website** for a client applying for a **UK Creative Visa (UKVI)**. The website must present the photographer as a serious, internationally recognised creative professional. It will be submitted as evidence of exceptional talent in photography.

The site must look world-class — on par with top photographers represented by agencies like Magnum Photos, VII, or featured in Vogue/National Geographic. This is not a hobbyist portfolio. It is a professional credential.

---

## Directory Structure

```
project/
├── CONTEXT.md              ← this file
├── index.html              ← main entry point
├── assets/
│   └── images/             ← all photographer's photos go here
│       ├── hero/           ← 1–3 hero/banner images (best work)
│       ├── portrait/       ← portrait category photos
│       ├── editorial/      ← editorial category photos
│       ├── commercial/     ← commercial category photos
│       ├── events/         ← events category photos
│       └── [other]/        ← any other categories found
├── css/
│   └── style.css
├── js/
│   └── main.js
└── content/                ← PLACEHOLDER FOLDER (not yet populated)
    ├── cv.md               ← CV/résumé (to be provided later)
    ├── bio.md              ← Artist statement / biography
    ├── experience.md       ← Work history and notable projects
    └── clients.md          ← Client list / publications
```

> **NOTE:** Scan the `assets/images/` folder and auto-detect all subfolders as gallery categories. Build the nav and gallery sections dynamically from whatever categories exist.

---

## Phase 1 — Current Task (Images Only)

Build the full website now using **placeholder text** for all written content. The visual design and all gallery functionality must be complete. Content will be dropped in later without rebuilding.

### What to build now:
- [ ] Full responsive HTML/CSS/JS website
- [ ] Navigation with all detected photo categories
- [ ] Hero / full-screen landing section
- [ ] About section (placeholder bio text — mark with `<!-- PLACEHOLDER: bio -->`)
- [ ] Portfolio / Gallery section with category filtering
- [ ] Lightbox for full-screen photo viewing
- [ ] Experience / CV section (placeholder — mark with `<!-- PLACEHOLDER: cv -->`)
- [ ] Clients / Publications section (placeholder — mark with `<!-- PLACEHOLDER: clients -->`)
- [ ] Contact section (placeholder email/social — mark with `<!-- PLACEHOLDER: contact -->`)
- [ ] Footer

---

## Phase 2 — Content Update (Later)

When the CV and written content are provided, update only the placeholder sections. The design must not change. Sections to update:
- Photographer's real name (replace all instances of `[PHOTOGRAPHER NAME]`)
- Bio / artist statement
- CV / experience timeline
- Client list and publications
- Contact details and social links
- Any event descriptions or caption text for photos

---

## Design Direction

### Aesthetic
- **Tone:** Luxury editorial — refined, quiet confidence. Think high-end fashion meets documentary.
- **Palette:** Deep near-black background (`#0a0a0a` or similar), off-white text, single muted accent (warm gold or cool grey — pick one and commit).
- **Typography:** Pair a distinctive serif display font (e.g. Playfair Display, Cormorant Garamond, or DM Serif Display) with a clean sans-serif for body text (e.g. Outfit, DM Sans, or Lato). Load from Google Fonts.
- **Layout:** Full-bleed images. Generous whitespace. Asymmetric grid for gallery. No rounded corners. No drop shadows on photos.
- **Animation:** Subtle fade-in on scroll. Smooth lightbox transitions. Category filter crossfade. Cursor dot (optional).
- **No:** Bootstrap. No Tailwind. No cookie-cutter templates. No purple gradients.

### Key UX Principles
- Photos are the hero — UI should disappear behind the work.
- Mobile-first and fully responsive.
- Fast loading — use `loading="lazy"` on all gallery images.
- Keyboard navigable lightbox (arrow keys, Escape).
- Smooth scroll between sections.

---

## Technical Requirements

- **Pure HTML + CSS + JS** (no frameworks, no build tools) — must open directly in browser with no server needed.
- Single `index.html` entry point.
- All assets referenced with relative paths.
- No external dependencies except Google Fonts (CDN is fine).
- Comments throughout marking every placeholder section for easy content replacement later.
- Valid, semantic HTML5 (`<header>`, `<nav>`, `<main>`, `<section>`, `<footer>`, `<figure>`, `<figcaption>`).
- CSS custom properties (variables) for all colours, fonts, spacing — makes content updates trivial.

---

## Placeholder Instructions (for Claude Code)

Use these exact HTML comment markers so they are easy to find-and-replace in Phase 2:

```html
<!-- PLACEHOLDER: photographer-name → replace [PHOTOGRAPHER NAME] throughout -->
<!-- PLACEHOLDER: bio → replace with artist statement from content/bio.md -->
<!-- PLACEHOLDER: cv → replace with experience from content/cv.md -->
<!-- PLACEHOLDER: clients → replace with client list from content/clients.md -->
<!-- PLACEHOLDER: contact → replace with real email, phone, social links -->
<!-- PLACEHOLDER: photo-captions → add captions/alt text per photo -->
```

---

## Gallery / Image Handling

1. Scan `assets/images/` subfolders — each subfolder = one category.
2. Build a category filter bar (e.g. ALL | PORTRAIT | EDITORIAL | EVENTS | COMMERCIAL).
3. Display all photos in a **masonry or asymmetric CSS grid**.
4. On click → open **lightbox** with full-size image, prev/next navigation, close button.
5. Add descriptive `alt` text placeholders: `alt="[PHOTOGRAPHER NAME] — [CATEGORY] photography"`.

---

## UKVI / Visa Context

This portfolio must convey:
- **Breadth** of work across multiple professional categories.
- **Depth** of skill — the gallery layout must make each image shine.
- **Professionalism** — the site itself is evidence of a credible creative career.
- When CV is added: a clear timeline of professional experience, named clients, and notable publications/exhibitions.

The overall impression when a UKVI caseworker views this site: *"This is an internationally recognised professional photographer."*

---

## Phase 2 Prompt (use this when CV/content is ready)

> "Here is the photographer's CV and content. Please update all PLACEHOLDER sections in `index.html` and `style.css` accordingly. Replace all instances of `[PHOTOGRAPHER NAME]` with the real name. Add the bio, experience timeline, client list, and contact details. Do not change the design or layout — only fill in the content."

---

## Quick Start for Claude Code

```
1. Read this CONTEXT.md fully.
2. List all image files found in assets/images/ and its subfolders.
3. Build index.html, css/style.css, and js/main.js per the spec above.
4. Use placeholder text for all written content, marked with HTML comments.
5. Test that the gallery filter, lightbox, and responsive layout all work.
6. Output a summary of what was built and which PLACEHOLDER markers are in the file.
```
