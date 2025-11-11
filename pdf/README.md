# PDF Export System

This folder contains a static, PDF-exportable version of your portfolio website with all content expanded and visible.

## Features

- **No JavaScript**: All content is static HTML - no interactive elements
- **All Content Visible**: Projects and experiences are fully expanded by default
- **Print-Optimized**: CSS is designed for clean PDF generation
- **Auto-Update**: Script to sync content from main website

## Files

- `index.html` - PDF-friendly HTML with all content expanded
- `style.css` - Simplified, print-optimized stylesheet
- `update-pdf-content.js` - Script to auto-update from main files
- `README.md` - This file

## Usage

### Generating a PDF

1. Open `pdf/index.html` in your web browser
2. Press `Ctrl+P` (Windows/Linux) or `Cmd+P` (Mac)
3. In the print dialog:
   - Destination: "Save as PDF"
   - Layout: Portrait
   - Paper size: A4 or Letter
   - Margins: Default or Custom (recommended: 0.5in)
   - Options: Enable "Background graphics" if you want styled backgrounds
4. Click "Save" and choose your destination

### Updating PDF Content from Main Website

When you make changes to your main `index.html`, you can automatically update the PDF version:

```bash
cd pdf
node update-pdf-content.js
```

The script will:
- Parse your main `index.html` file
- Extract all project and experience content
- Expand all collapsed content
- Update the PDF version with the latest information

### What Gets Updated Automatically

✓ Project titles, descriptions, and tags
✓ Expanded project content and images
✓ Experience items, dates, and descriptions
✓ Contact information

### What Needs Manual Updates

✗ About section text and image
✗ Artwork section (commented out by default)
✗ Major structural changes

## Artwork Section

The artwork section is **commented out** in the PDF version by default. To include it:

1. Open `pdf/index.html`
2. Find the `ARTWORKS SECTION (COMMENTED OUT)` section (around line 500)
3. Remove the `<!--` and `-->` comment tags
4. Save and regenerate your PDF

## Customization

### Adjusting Page Breaks

Edit `style.css` to control where pages break:

```css
.project-expanded {
    page-break-inside: avoid; /* Prevents breaking within a project */
}

.experience-section {
    page-break-before: always; /* Forces new page before experiences */
}
```

### Changing Colors

The PDF uses simplified colors for print clarity. To adjust:

```css
:root {
    --accent-primary: #d79921; /* Main accent color */
    --bg-primary: white; /* Background color */
}
```

### Font Size

The base font size is optimized for PDF readability:

```css
html {
    font-size: 12pt; /* Adjust for larger/smaller text */
}
```

## Tips for Best Results

1. **Image Quality**: Images are automatically sized for print. Original resolution matters!
2. **Page Length**: The PDF will be as long as needed - no pagination limits
3. **Browser Choice**: Chrome/Edge give the most consistent PDF results
4. **Color vs B&W**: Works well in both color and black & white
5. **File Size**: If PDF is too large, consider reducing image sizes in main website

## Troubleshooting

### Images Not Appearing

Check that image paths use `../assets/...` to go up one directory from the pdf folder.

### Content Out of Date

Run `node update-pdf-content.js` to refresh from the main website.

### Broken Layouts

Ensure your main website's `data-expand-content` attributes use valid JSON.

### Script Errors

Make sure you have Node.js installed:
```bash
node --version  # Should show v14 or higher
```

## Automation

You can set up automatic updates using a git pre-commit hook:

```bash
# Add to .git/hooks/pre-commit
#!/bin/sh
cd pdf && node update-pdf-content.js
git add pdf/index.html
```

This will automatically update the PDF version whenever you commit changes.

## Notes

- Videos are represented as notes with file paths (videos don't work in PDFs)
- Interactive elements (hover effects, animations) are removed
- Links remain clickable in most PDF viewers
- Print date/page numbers can be added via browser print settings
