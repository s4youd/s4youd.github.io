# cyber-blog

A static, premium-dark infosec blog. No build step — just HTML files, one shared stylesheet, and a
per-post cross-link system. Drop it on GitHub Pages or any static host.

## Structure

```
cyber-blog/
├── index.html        # post listing (cards with excerpt + tags)
├── about.html        # about / disclosure page
├── css/style.css     # THE one stylesheet for every page
├── js/main.js        # small script: copy buttons on code blocks
├── assets/           # images, etc.
│   ├── nav-logo.png       # circular portrait used next to the site name in the nav
│   └── favicon.ico / .png # standard favicon set (link in every <head>)
└── posts/            # one folder per blog post
    ├── writeup-deadbolt-rce/
    │   └── index.html      # the post itself (+ assets/ → banner, pwned)
    ├── writeup-rate-limit-header-bypass/
    │   └── index.html      # the post itself (+ assets/)
    └── writeup-entity-authz-bypass/
        └── index.html      # the post itself (+ assets/)
        # (optional) assets/  → images / gifs used inside that post
```

## How to add a new post

1. **Copy a template.** The simplest path: copy an existing post folder and rename it. Images for the
   post go in its `assets/` subfolder.

   ```bash
   cp -r posts/writeup-entity-authz-bypass "posts/writeup-<your-slug>"
   ```

2. **Edit the three things at the top of the file** (in `<head>` of `posts/<your-slug>/index.html`):
   - `title` and `meta description`
   - the nav/footer links stay as `../../index.html` / `../../about.html` (posts live two folders
     deep, so they already point up correctly — no need to touch them)

3. **Rewrite the `<header class="article-head">`**:
   - `kicker` — the post category (writeup / research / note)
   - `h1` — the title
   - the date and read time in `article-meta`
   - optionally a `severity` badge (for writeups):
     ```html
     <span class="severity severity--high">High · CVSS 8.1</span>
     ```
   - the `tags` row

4. **Write the body** inside `<div class="article-body">…</div>` using the components below.

5. **Add the related-posts card.** The `related` section at the bottom is the cross-link. Add cards
   for 2–3 other posts you want to recommend:

   ```html
   <a class="related-card" href="writeup-other-slug.html">
     <span class="rc-type">Writeup</span>
     <h3>Other post title</h3>
     <p>One-line hook.</p>
     <span class="continue">Continue reading <span class="arr">&rarr;</span></span>
   </a>
   ```

   Card `href`s are relative to your post's own folder (so `"../other-post-slug/"`). Ensure at least
   one card points to another post so readers keep moving through the blog.

6. **Add a listing card** on `index.html` — copy an existing `<li><a class="post-card">…` block,
   update the `href` (posts/…), title, excerpt, meta date, and tags.

## Reusable body components

All styled for you in `css/style.css`:

| Component | Markup |
|-----------|--------|
| Section heading | `<h2>` / `<h3>` |
| Callout box | `<div class="note"><span class="note-label">Note</span><p>…</p></div>` |
| tl;dr (writeups) | `<div class="tldr note"><span class="note-label">tl;dr</span><p>…</p></div>` |
| Terminal output | `<pre class="terminal"><code>…</code></pre>` (adds the `$` prompt) |
| Code block | `<pre><code>…</code></pre>` (auto copy button via `js/main.js`) |
| Monospace dump / annotated output | `<div class="threshold"><p>…</p></div>` |
| Inline code | `` `<code>text</code>` `` |
| Table | wrap in `<div class="table-wrap"><table>…</table></div>` for mobile scroll |
| Quote | standard `<blockquote>` |
| Divider | `<hr>` |

**Code blocks:** escape `<` and `>` as `&lt;` / `&gt;` inside `<code>` so they render as text.

## Fonts & theming

The stylesheet loads three Google Fonts via the `<link>` in each page head (already present in the
template pages): **Inter** (UI/headings), **Source Serif 4** (article body — the readable serif),
and **JetBrains Mono** (code/tags/meta). No other CSS is required on a per-page basis.

Design niceties baked into `css/style.css`:
- **Fluid clamp() typography** and `text-wrap: balance/pretty` so headings and cards never break
  awkwardly.
- **Sticky blur nav** with an animated active indicator; keyboard `:focus-visible` rings everywhere
  (accessibility).
- **Scrollable code blocks** with a subtle top/bottom fade and styled scrollbars.
- **`prefers-reduced-motion`** support and a fresh **print stylesheet** (inverts to light for clean
  PDF/document output).
- Zebra-striped tables, hover states, and card shadow lifts for a more tactile, premium feel.

## Inline cross-links

You can also link related posts from within the prose, not just the bottom card:

```html
…exactly how I found the endpoint in my
<a href="writeup-idor-account-takeover.html">IDOR writeup</a>.
```

## Notes

- One accent color (cyber green) is used everywhere for links, active nav, code accents, and the
  "continue" arrows. Keep it restrained — it's what makes the design feel premium rather than noisy.
- **Severity badges follow the standard CVSS palette:**
  - `severity--critical` → red
  - `severity--high` → orange
  - `severity--medium` → amber
  - `severity--low` → green
  - `severity--info` → blue

  Example: `<span class="severity severity--high">High · CVSS 8.1</span>`
- **Logo & favicon:** the nav logo is `assets/nav-logo.png` (circular crop of your portrait) and the
  favicon set is generated from the same portrait. To regen the assets after changing the source
  portrait, update the sources or re-crop with your image tool — the HTML already references them.
- PII / real targets: redact before publishing (see the About page for your own disclosure policy).
