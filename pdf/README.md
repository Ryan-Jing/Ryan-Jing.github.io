# Portfolio PDF Export

The PDF is a curated, print-first document maintained by hand in `index.html` (styled by
`style.css`). It is deliberately **not** generated from the website markup — the old scraper in
`update-pdf-content.js` is disabled so the recruiter-facing document can stay shorter and denser
than the site.

## Regenerating the PDF

Serve the repo root:

```bash
python3 -m http.server 8765
```

Then print the page with headless Chrome:

```bash
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --headless --disable-gpu --no-pdf-header-footer --virtual-time-budget=45000 --print-to-pdf="pdf/Ryan Jing | Technical Portfolio PDF.pdf" "http://localhost:8765/pdf/index.html"
```

Chrome's own print dialog works too: open `pdf/index.html`, Cmd+P, Save as PDF, margins Default,
**Background graphics on**.

## Keeping it in sync with the site

When a project is added or rewritten in the root `index.html`, mirror it here:

1. Add or update the `<article class="project">` block — heading, `role` line, `tag-list`,
   one intro paragraph, then bullets (aim for 4–8, denser than the site's prose).
2. Add `class="project-with-gallery"` to any project whose figures should be allowed to flow
   across a page break.
3. Pick a handful of figures rather than all of them, and prefer the smaller files (see below).
4. Videos cannot be embedded — use the `.video-note` callout that points at the live site.
5. Regenerate the PDF and skim it for orphaned headings or oversized gaps.

## Layout notes

- Page size and margins come from `@page` in `style.css` (Letter, 0.42in).
- The responsive rules are scoped to `@media screen`. The print page is only ~735 CSS px wide,
  so an unscoped `max-width: 760px` block would fire during export and collapse the two-column
  header and project headings.
- `.project` blocks avoid page breaks; `.project-with-gallery` allows them.
- `.project-heading` uses `break-after: avoid` so a project title never lands alone at the
  bottom of a page.

## File size

Images are embedded at full resolution, so the export lands around 33 MB — over the attachment
limit of most mail providers. Several source photos are 15–24 MB on their own
(`Mood_5.png`, `Mood_6.png`, `Mood_8.png`, `deck_stain_1.png`), which is why they are left out of
the PDF. If the file needs to be smaller, downscale print copies of the referenced images
(~1600 px wide JPEGs) into a `pdf/img/` folder and point the `<img src>` paths there.
