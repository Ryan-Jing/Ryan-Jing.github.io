# Projects Folder

## Add Your Project Images and Videos Here

Place all project-related media in this folder.

### Project Media from Your Portfolio:

You have the following assets in your portfolio folder:
```
/Users/ryanjing/Library/Mobile Documents/com~apple~CloudDocs/Ryan/Uni/Coop/Coop Files/Portfolio/AssetsPortfolio/
```

#### Available Assets:
1. **EMG Prosthetic:**
   - Videos: `forearmclaw.mov`, `IMG_0235.mov`
   - Images: Screenshots from portfolio

2. **Arduino Translation:**
   - Video: `ScreenRecordingArduinoTranslate.mov`
   - Video (split): `ArduinoProjectVideoSplit.mp4`

3. **Mathematical Models:**
   - Screenshots available in portfolio

4. **ERG Research:**
   - Lab photos from portfolio

5. **CAD Work:**
   - Screenshots from portfolio
   - BOM images: `skateBOM.png`, `foot_drop.png`

### How to Add Project Images:

1. Copy images from the source folder above
2. Paste them into this `assets/projects/` folder
3. Update the HTML in `index.html`:

**Before:**
```html
<div class="image-placeholder">
    <p>[ EMG Prosthetic Image ]</p>
</div>
```

**After:**
```html
<img src="assets/projects/emg-prosthetic.jpg" alt="EMG Hand Prosthetic">
```

### Video Embedding:

For video demonstrations, you can either:

**Option 1: Upload to YouTube**
Then embed using:
```html
<iframe width="560" height="315"
    src="https://www.youtube.com/embed/VIDEO_ID"
    frameborder="0" allowfullscreen>
</iframe>
```

**Option 2: Use Local Video Files**
```html
<video width="100%" controls>
    <source src="assets/projects/video-name.mp4" type="video/mp4">
    Your browser does not support the video tag.
</video>
```

### Image Naming Convention:
- Use lowercase
- Separate words with hyphens
- Be descriptive

**Good:** `emg-prosthetic-circuit.jpg`
**Bad:** `IMG_1234.jpg`

### Optimize Videos:
- Keep under 10MB if hosting locally
- Consider YouTube/Vimeo for larger videos
- Use MP4 format for best compatibility
