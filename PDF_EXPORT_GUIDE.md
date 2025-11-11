# PDF Export Guide

## Quick Start

Your portfolio now includes a PDF-exportable version in the `/pdf` folder!

### Generate a PDF (3 steps)

1. Open `pdf/index.html` in any web browser
2. Press **Ctrl+P** (or **Cmd+P** on Mac)
3. Choose "Save as PDF" and click Save

That's it! You now have a static PDF of your entire portfolio.

---

## How It Works

The PDF system creates a **static, non-interactive version** of your website where:

- ✓ All projects are fully expanded (no click-to-expand)
- ✓ All images and content are visible
- ✓ No JavaScript or animations
- ✓ Optimized for printing and PDF export
- ✓ Professional layout with page breaks

### What's Included

**In the PDF by default:**
- About section with your bio
- All 6 projects (EMG, ERG, Mechanoreceptor, DJ, CAD, Deck) - fully expanded
- All 6 work experiences with full descriptions
- Contact information (email, LinkedIn, GitHub)

**Commented out (optional):**
- Artworks section - to include it, uncomment the section in `pdf/index.html`

---

## Keeping PDF Updated

### Option 1: Automatic Update Script

When you update your main website, sync the PDF version automatically:

```bash
cd pdf
npm run update
```

Or:

```bash
cd pdf
node update-pdf-content.js
```

**What this updates:**
- Project titles, descriptions, tags, and media
- Experience items and descriptions
- All expand-content data

### Option 2: Manual Editing

You can also directly edit `pdf/index.html` if you prefer manual control.

---

## Customization

### Including Artworks

By default, artworks are commented out to keep the PDF concise. To include them:

1. Open `pdf/index.html` in a text editor
2. Find line ~500 with `<!-- ARTWORKS SECTION (COMMENTED OUT) -->`
3. Delete the `<!--` before the section and `-->` after it
4. Save and regenerate your PDF

### Adjusting Page Breaks

Edit `pdf/style.css` to control pagination:

```css
/* Force new page before section */
.experience-section {
    page-break-before: always;
}

/* Keep content together */
.project-expanded {
    page-break-inside: avoid;
}
```

### Changing Font Size

In `pdf/style.css`:

```css
html {
    font-size: 12pt;  /* Increase for larger text */
}
```

---

## Tips for Best Quality PDFs

### Browser Print Settings

**Recommended settings:**
- **Destination:** Save as PDF
- **Layout:** Portrait
- **Paper size:** A4 or Letter
- **Margins:** Default (or 0.5in custom)
- **Scale:** 100%
- **Background graphics:** ON (to include subtle backgrounds)

### Image Quality

- The PDF includes all images from your main website
- Higher resolution source images = better PDF quality
- Images are automatically sized for print

### File Size

If your PDF is too large:
1. Reduce image sizes in your main website's `/assets` folder
2. Run the update script to refresh
3. Regenerate the PDF

---

## Technical Details

### Folder Structure

```
pdf/
├── index.html              # Static HTML with all content expanded
├── style.css               # Print-optimized CSS
├── update-pdf-content.js   # Auto-update script
├── package.json            # NPM configuration
└── README.md               # Detailed documentation
```

### How Auto-Update Works

The `update-pdf-content.js` script:

1. Reads your main `index.html`
2. Extracts all project cards (including `data-expand-content`)
3. Parses and expands all hidden content
4. Extracts all experience items
5. Generates clean, static HTML
6. Updates `pdf/index.html` with all content visible

### Image Paths

The PDF version uses relative paths from the `/pdf` folder:
- `../assets/projects/...` (goes up to parent, then into assets)
- This allows images to work from both the PDF folder and when viewing the HTML

---

## Use Cases

### When to Use the PDF Version

✓ Job applications requiring document uploads
✓ Email attachments for recruiters
✓ Printing physical copies for career fairs
✓ Situations where hosting a website isn't possible
✓ Archival/backup purposes

### When to Use the Web Version

✓ Personal website hosting (primary showcase)
✓ LinkedIn/resume links
✓ When you want interactive elements (videos, hover effects)
✓ Real-time updates (web version reflects latest changes immediately)

---

## Troubleshooting

### "Command not found: node"

You need Node.js installed to run the update script:
- Download from: https://nodejs.org/
- Or install via: `brew install node` (Mac) / `apt install nodejs` (Linux)

### Images Not Showing in PDF

Check that:
1. Image files exist in `/assets/...`
2. Paths in PDF use `../assets/...` (relative from pdf folder)
3. Browser has permission to access local files

### Content Out of Date

Run the update script:
```bash
cd pdf
npm run update
```

### PDF Looks Different Than Website

This is expected! The PDF version:
- Has no animations or hover effects
- Uses different colors (print-optimized)
- Has different spacing for print layout
- Shows all content at once (no collapsing)

---

## Advanced: Git Hook for Auto-Updates

To automatically update the PDF version when you commit changes:

1. Create `.git/hooks/pre-commit` (no extension)
2. Add this content:

```bash
#!/bin/sh
echo "Updating PDF export..."
cd pdf && node update-pdf-content.js && cd ..
git add pdf/index.html
echo "PDF export updated!"
```

3. Make it executable:
```bash
chmod +x .git/hooks/pre-commit
```

Now every time you commit changes to your main website, the PDF version updates automatically!

---

## Summary

🎯 **To generate PDF:** Open `pdf/index.html` in browser → Print → Save as PDF

🔄 **To update PDF content:** Run `npm run update` in the `/pdf` folder

📝 **To customize:** Edit `pdf/index.html` or `pdf/style.css`

💡 **For help:** See `pdf/README.md` for detailed documentation

---

**Note:** The PDF export system is completely independent from your main website. Changes to the main website won't affect the PDF until you run the update script.
