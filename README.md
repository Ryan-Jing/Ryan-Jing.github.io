# Ryan Jing - Personal Portfolio Website

A minimalist personal portfolio website with a gruvbox-inspired color theme (black, white, and orange accents). Features smooth animations, scroll effects, and a clean, professional design.

## Features

- Minimalist gruvbox color scheme (black, white, orange)
- Smooth scroll animations
- Click/hover animations with pop effects
- Responsive design (mobile-friendly)
- Project showcase section
- Professional experience timeline
- Contact section with social media links
- Resume download functionality

## File Structure

```
Personal-Website/
├── index.html          # Main HTML file
├── style.css           # Styling and animations
├── script.js           # JavaScript functionality
├── README.md           # This file
└── assets/
    ├── icons/          # Favicon and icons
    ├── images/         # General images
    └── projects/       # Project images and videos
```

## Setup Instructions

### 1. Add Your Favicon

Copy your website icon (PNG format) to:
```
assets/icons/favicon.png
```

The icon should be at least 192x192 pixels for best quality.

**Source location:** `/Users/ryanjing/Library/Mobile Documents/com~apple~CloudDocs/Ryan/Uni/Uni Files/Portfolio Stuff`

### 2. Add Your Resume

Copy your resume PDF to:
```
assets/Resume_2025.pdf
```

Or update the link in `index.html` (line ~430) to point to your resume location.

### 3. Add Project Images

Add your project images to:
```
assets/projects/
```

Then update the HTML placeholders in `index.html`:
- Find: `<div class="image-placeholder">`
- Replace with: `<img src="assets/projects/your-image.jpg" alt="Project Name">`

### 4. Add Your Profile Photo

Replace the about section placeholder (line ~130 in index.html):
```html
<div class="about-image-placeholder">
    <img src="assets/images/profile-photo.jpg" alt="Ryan Jing">
</div>
```

### 5. Update Social Media Links

Update these links in the Contact section (around line 420):
- **LinkedIn:** Replace `href="#"` with your LinkedIn URL
- **Instagram:** Replace `href="#"` with your Instagram URL
- **GitHub:** Already set to `https://github.com/ryanjing23`

## How to Add New Content

### Adding a New Project

1. Find the Projects section in `index.html` (around line 160)
2. Copy an existing `project-card` div
3. Update the following:
   - Project title
   - Project description
   - Tags (technologies used)
   - Image path

Example:
```html
<div class="project-card">
    <div class="project-image">
        <img src="assets/projects/my-project.jpg" alt="My New Project">
    </div>
    <div class="project-content">
        <h3 class="project-title">My New Project</h3>
        <p class="project-description">
            Description of your project goes here...
        </p>
        <div class="project-tags">
            <span class="tag">Python</span>
            <span class="tag">Arduino</span>
        </div>
    </div>
</div>
```

### Adding a New Experience

1. Find the Experience section in `index.html` (around line 320)
2. Copy an existing `experience-item` div
3. Update the following:
   - Date range
   - Job title
   - Company name and location
   - Bullet points describing your work

Example:
```html
<div class="experience-item">
    <div class="experience-date">
        <span>Jan - Apr 2026</span>
    </div>
    <div class="experience-content">
        <h3 class="experience-title">Your Job Title</h3>
        <h4 class="experience-company">Company Name | Location</h4>
        <ul class="experience-description">
            <li>Achievement or responsibility 1</li>
            <li>Achievement or responsibility 2</li>
            <li>Achievement or responsibility 3</li>
        </ul>
    </div>
</div>
```

## Customization

### Colors

All colors are defined in `style.css` under `:root` variables (lines 1-30):
- `--orange`: Main orange accent color
- `--orange-bright`: Brighter orange for hovers
- `--bg-dark`: Dark background color
- `--fg-light`: Light text color

To change colors, update these variables.

### Animations

Animation settings are defined in `style.css`:
- `--transition-fast`: 0.2s (quick hover effects)
- `--transition-normal`: 0.3s (standard transitions)
- `--transition-slow`: 0.5s (scroll animations)

Adjust these values to speed up or slow down animations.

### Font

The website uses system fonts by default. To change:
1. Import your font in `style.css` (at the top)
2. Update `--font-primary` variable

## Viewing the Website

### Option 1: Open Locally
Simply double-click `index.html` to open in your browser.

### Option 2: Use a Local Server (Recommended)
```bash
# Using Python 3
python -m http.server 8000

# Then open: http://localhost:8000
```

### Option 3: Use VS Code Live Server
1. Install "Live Server" extension in VS Code
2. Right-click `index.html`
3. Select "Open with Live Server"

## Deployment

### GitHub Pages (Recommended)
1. Create a GitHub repository
2. Push your code
3. Go to Settings → Pages
4. Select main branch as source
5. Your site will be live at `https://yourusername.github.io/repo-name`

### Netlify
1. Drag and drop your folder to https://app.netlify.com
2. Your site will be live instantly

### Vercel
1. Import your GitHub repository to https://vercel.com
2. Deploy with one click

## Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge
- Mobile browsers (iOS Safari, Chrome Mobile)

## Code Comments

The code is thoroughly commented to help you understand and modify it:
- **HTML:** Sections clearly marked with comments
- **CSS:** Each section documented with purpose
- **JavaScript:** Every function explained

## Tips for Success

1. **Keep images optimized:** Use compressed images (< 500KB each)
2. **Test on mobile:** Always check how it looks on phones
3. **Update regularly:** Keep your projects and experience current
4. **Use git:** Version control helps track changes
5. **Get feedback:** Ask friends to review before sharing

## Contact

- **Email:** ryanjing23@gmail.com
- **University:** r5jing@uwaterloo.ca
- **GitHub:** https://github.com/ryanjing23

## License

This website template is free to use and modify for personal use.

---

Built with passion for engineering and design.
