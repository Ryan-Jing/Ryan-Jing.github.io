/**
 * ==========================================
 * PERSONAL PORTFOLIO WEBSITE
 * Interactive JavaScript for animations and functionality
 * ==========================================
 */

// ==========================================
// SIDEBAR NAVIGATION TOGGLE
// Handles sidebar expand/collapse functionality
// ==========================================
const sidebar = document.getElementById('sidebar');
const sidebarToggle = document.getElementById('sidebar-toggle');
const sidebarLinks = document.querySelectorAll('.sidebar-link');

// Toggle sidebar on button click
if (sidebarToggle) {
    sidebarToggle.addEventListener('click', () => {
        sidebar.classList.toggle('expanded');
    });
}

// Close sidebar when clicking a link
sidebarLinks.forEach(link => {
    link.addEventListener('click', () => {
        sidebar.classList.remove('expanded');
    });
});

// Close sidebar when clicking outside of it
document.addEventListener('click', (e) => {
    if (sidebar.classList.contains('expanded') &&
        !sidebar.contains(e.target)) {
        sidebar.classList.remove('expanded');
    }
});

// ==========================================
// SMOOTH SCROLLING
// Smooth scroll behavior for anchor links
// ==========================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));

        if (target) {
            // Smooth scroll without navbar offset since sidebar doesn't take up horizontal space
            const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - 20;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ==========================================
// SCROLL ANIMATIONS
// Animate elements when they come into view
// Uses Intersection Observer API for performance
// ==========================================

// Animate project cards
const projectCards = document.querySelectorAll('.project-card');
const experienceItems = document.querySelectorAll('.experience-item');
const sections = document.querySelectorAll('.section');

// Intersection Observer options
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.15
};

// Create observer for animations
const animationObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            // Add delay based on index for staggered animation
            setTimeout(() => {
                entry.target.classList.add('active');
            }, index * 100);
        }
    });
}, observerOptions);

// Observe project cards
projectCards.forEach(card => {
    card.classList.add('scroll-animate');
    animationObserver.observe(card);
});

// Observe experience items
experienceItems.forEach(item => {
    animationObserver.observe(item);
});

// ==========================================
// CLICK ANIMATION (POP EFFECT)
// Adds a pop effect when buttons are clicked
// ==========================================
const buttons = document.querySelectorAll('.btn');

buttons.forEach(button => {
    button.addEventListener('click', function(e) {
        // Create ripple effect
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;

        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');

        this.appendChild(ripple);

        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// Add ripple styles dynamically
const style = document.createElement('style');
style.textContent = `
    .btn {
        position: relative;
        overflow: hidden;
    }

    .ripple {
        position: absolute;
        border-radius: 50%;
        background-color: rgba(255, 255, 255, 0.4);
        transform: scale(0);
        animation: ripple-animation 0.6s ease-out;
        pointer-events: none;
    }

    @keyframes ripple-animation {
        to {
            transform: scale(2);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// ==========================================
// PROJECT CARD HOVER EFFECTS
// Enhanced hover animations for project cards
// ==========================================
projectCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transition = 'all 0.3s ease';
    });

    card.addEventListener('mouseleave', function() {
        this.style.transition = 'all 0.3s ease';
    });
});

// ==========================================
// HIGHLIGHT ANIMATION ON SCROLL
// Highlights section titles when they come into view
// ==========================================
const sectionTitles = document.querySelectorAll('.section-title');

const titleObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'slideInFromBottom 0.6s ease forwards';
        }
    });
}, observerOptions);

sectionTitles.forEach(title => {
    titleObserver.observe(title);
});

// Add slide-in animation
const slideStyle = document.createElement('style');
slideStyle.textContent = `
    @keyframes slideInFromBottom {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(slideStyle);

// ==========================================
// ACTIVE NAVIGATION LINK HIGHLIGHTING
// Updates active nav link based on scroll position
// ==========================================
const sectionsForNav = document.querySelectorAll('section[id]');

function updateActiveNavLink() {
    const scrollPosition = window.scrollY + 150;

    sectionsForNav.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        const sidebarLink = document.querySelector(`.sidebar-link[href="#${sectionId}"]`);

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            sidebarLinks.forEach(link => link.classList.remove('active'));
            if (sidebarLink) {
                sidebarLink.classList.add('active');
            }
        }
    });
}

window.addEventListener('scroll', updateActiveNavLink);

// Add active link styles for sidebar
const activeStyle = document.createElement('style');
activeStyle.textContent = `
    .sidebar-link.active {
        color: var(--accent-bright);
        background: rgba(255, 255, 255, 0.05);
    }

    .sidebar-link.active::before {
        height: 100%;
    }
`;
document.head.appendChild(activeStyle);

// ==========================================
// SOCIAL LINKS HOVER EFFECTS
// Animated hover effects for social media links
// ==========================================
const socialLinks = document.querySelectorAll('.social-link');

socialLinks.forEach(link => {
    link.addEventListener('mouseenter', function() {
        const icon = this.querySelector('.social-icon');
        if (icon) {
            icon.style.transform = 'scale(1.2) rotate(5deg)';
            icon.style.transition = 'transform 0.3s ease';
        }
    });

    link.addEventListener('mouseleave', function() {
        const icon = this.querySelector('.social-icon');
        if (icon) {
            icon.style.transform = 'scale(1) rotate(0deg)';
        }
    });
});

// ==========================================
// TAG ANIMATIONS
// Animated effects for project tags
// ==========================================
// Only animate tags within project cards, not experience tags
projectCards.forEach(card => {
    const tags = card.querySelectorAll('.tag');
    tags.forEach((tag, index) => {
        // Staggered fade-in when parent card is visible
        tag.style.opacity = '0';
        tag.style.transform = 'translateY(10px)';
        tag.style.transition = `all 0.3s ease ${index * 0.05}s`;
    });
});

const tagObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const cardTags = entry.target.querySelectorAll('.tag');
            cardTags.forEach((tag, index) => {
                setTimeout(() => {
                    tag.style.opacity = '1';
                    tag.style.transform = 'translateY(0)';
                }, index * 50);
            });
        }
    });
}, observerOptions);

projectCards.forEach(card => {
    tagObserver.observe(card);
});

// ==========================================
// EXPERIENCE TIMELINE ANIMATION
// Animated timeline appearance
// ==========================================
// Timeline animation is handled by CSS keyframes for the ::before pseudo-element

// Add timeline animation
const timelineStyle = document.createElement('style');
timelineStyle.textContent = `
    .timeline::before {
        transform-origin: top;
        animation: drawLine 1.5s ease forwards;
    }

    @keyframes drawLine {
        from {
            transform: translateX(-50%) scaleY(0);
        }
        to {
            transform: translateX(-50%) scaleY(1);
        }
    }
`;
document.head.appendChild(timelineStyle);

// ==========================================
// CURSOR EFFECT (OPTIONAL)
// Custom cursor effect for interactive elements
// Uncomment to enable
// ==========================================
/*
const cursor = document.createElement('div');
cursor.classList.add('custom-cursor');
document.body.appendChild(cursor);

document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
});

const cursorStyle = document.createElement('style');
cursorStyle.textContent = `
    .custom-cursor {
        width: 20px;
        height: 20px;
        border: 2px solid var(--orange);
        border-radius: 50%;
        position: fixed;
        pointer-events: none;
        z-index: 9999;
        transition: transform 0.2s ease;
        transform: translate(-50%, -50%);
    }
`;
document.head.appendChild(cursorStyle);
*/

// ==========================================
// PERFORMANCE OPTIMIZATION
// Debounce scroll events for better performance
// ==========================================
function debounce(func, wait = 10) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debounce to scroll events
const debouncedScroll = debounce(() => {
    updateActiveNavLink();
}, 10);

window.addEventListener('scroll', debouncedScroll);

// ==========================================
// INITIALIZE
// Run on page load
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    console.log('Portfolio website loaded successfully!');
    console.log('Built with passion by Ryan Jing');

    // Initial check for active nav link
    updateActiveNavLink();

    // Add loaded class to body for any CSS transitions
    document.body.classList.add('loaded');
});

// ==========================================
// LAZY LOADING IMAGES
// Lazy load images when they come into viewport
// TO USE: Add 'data-src' attribute to images instead of 'src'
// ==========================================
const lazyImages = document.querySelectorAll('img[data-src]');

const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.classList.add('loaded');
            imageObserver.unobserve(img);
        }
    });
}, observerOptions);

lazyImages.forEach(img => {
    imageObserver.observe(img);
});

// ==========================================
// CONTACT FORM VALIDATION (IF ADDED)
// Placeholder for future form validation
// ==========================================
/*
const contactForm = document.getElementById('contact-form');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        // Add form validation logic here
        console.log('Form submitted');
    });
}
*/

// ==========================================
// SCROLL TO TOP BUTTON (OPTIONAL)
// Uncomment to enable scroll to top functionality
// ==========================================
/*
const scrollTopBtn = document.createElement('button');
scrollTopBtn.innerHTML = '↑';
scrollTopBtn.classList.add('scroll-top-btn');
document.body.appendChild(scrollTopBtn);

window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
        scrollTopBtn.style.display = 'block';
    } else {
        scrollTopBtn.style.display = 'none';
    }
});

scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

const scrollTopStyle = document.createElement('style');
scrollTopStyle.textContent = `
    .scroll-top-btn {
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background-color: var(--orange);
        color: white;
        border: none;
        font-size: 1.5rem;
        cursor: pointer;
        display: none;
        z-index: 999;
        transition: all 0.3s ease;
        box-shadow: 0 4px 12px rgba(214, 93, 14, 0.3);
    }

    .scroll-top-btn:hover {
        background-color: var(--orange-bright);
        transform: translateY(-5px);
    }

    .scroll-top-btn:active {
        animation: pop 0.3s ease;
    }
`;
document.head.appendChild(scrollTopStyle);
*/

// ==========================================
// CLICK ASTERISK ANIMATION
// Simple cartoon-style grey asterisk on click
// ==========================================
document.addEventListener('click', (e) => {
    const asterisk = document.createElement('div');
    asterisk.className = 'click-asterisk';
    asterisk.textContent = '*';
    asterisk.style.left = e.clientX + 'px';
    asterisk.style.top = e.clientY + 'px';

    document.body.appendChild(asterisk);

    // Remove after brief display
    setTimeout(() => {
        asterisk.remove();
    }, 300);
});

// Add asterisk click styles
const asteriskStyle = document.createElement('style');
asteriskStyle.textContent = `
    .click-asterisk {
        position: fixed;
        pointer-events: none;
        z-index: 9999;
        font-size: 20px;
        font-weight: bold;
        color: var(--gray);
        opacity: 0.5;
        transform: translate(-50%, -50%) scale(0);
        font-family: var(--font-mono);
        animation: asteriskPop 0.3s steps(3) forwards;
    }

    @keyframes asteriskPop {
        0% {
            transform: translate(-50%, -50%) scale(0);
            opacity: 0;
        }
        33% {
            transform: translate(-50%, -50%) scale(1);
            opacity: 0.5;
        }
        66% {
            transform: translate(-50%, -50%) scale(1.3);
            opacity: 0.6;
        }
        100% {
            transform: translate(-50%, -50%) scale(1.5);
            opacity: 0;
        }
    }

    /* Hide on touch devices */
    @media (hover: none) {
        .click-asterisk {
            display: none;
        }
    }
`;
document.head.appendChild(asteriskStyle);

// ==========================================
// PROJECT VIDEO HOVER PLAYBACK
// Auto-play videos on hover, pause on mouse leave
// ==========================================
/**
 * HOW TO USE FOR OTHER PROJECTS:
 *
 * 1. In your HTML, replace the image placeholder with a video element:
 *    <video class="project-video" muted loop playsinline>
 *        <source src="assets/projects/YOUR_PROJECT/video.mp4" type="video/mp4">
 *        Your browser does not support the video tag.
 *    </video>
 *
 * 2. Video attributes explained:
 *    - class="project-video" : REQUIRED - This class is what the JavaScript targets
 *    - muted : REQUIRED - Videos must be muted to autoplay in browsers
 *    - loop : Makes video restart when it ends
 *    - playsinline : Prevents fullscreen on mobile (especially iOS)
 *    - controls : Add this if you want play/pause buttons (optional)
 *    - poster="path/to/image.jpg" : Add thumbnail before video plays (optional)
 *
 * 3. Supported video formats:
 *    - MP4 (type="video/mp4") - Best compatibility
 *    - WebM (type="video/webm") - Smaller file size
 *    - OGG (type="video/ogg") - Firefox/Chrome
 *
 * 4. That's it! The code below will automatically handle all videos with
 *    class="project-video" - they'll play on hover and pause when mouse leaves.
 */

// Find all video elements with the project-video class
const projectVideos = document.querySelectorAll('.project-video');

// Add hover event listeners to each video
projectVideos.forEach(video => {
    // When mouse enters the video area
    video.addEventListener('mouseenter', function() {
        this.play(); // Start playing the video
    });

    // When mouse leaves the video area
    video.addEventListener('mouseleave', function() {
        this.pause(); // Pause the video
        this.currentTime = 0; // Reset to beginning (optional - remove this line to keep progress)
    });

    // Optional: Add a fade-in effect when video starts playing
    video.addEventListener('play', function() {
        this.style.opacity = '1';
        this.style.transition = 'opacity 0.3s ease';
    });

    // Optional: Add a slight fade when paused
    video.addEventListener('pause', function() {
        this.style.opacity = '0.95';
    });
});

// Add CSS styling for project videos
const videoStyle = document.createElement('style');
videoStyle.textContent = `
    /* Style for all project videos */
    .project-video {
        width: 100%;
        height: 100%;
        object-fit: cover; /* Makes video fill the container while maintaining aspect ratio */
        border-radius: 8px; /* Matches project card styling */
        transition: opacity 0.3s ease, transform 0.3s ease;
    }

    /* Subtle zoom effect on hover (optional) */
    .project-card:hover .project-video {
        transform: scale(1.02);
    }

    /* Loading state - shows gray background while video loads */
    .project-video:not([src]) {
        background-color: #2a2a2a;
    }

    /* Ensure videos fit properly in project cards */
    .project-image {
        overflow: hidden; /* Prevents video from spilling out during zoom */
        border-radius: 8px;
    }
`;
document.head.appendChild(videoStyle);

// ==========================================
// PROJECT CARD EXPAND/MODAL SYSTEM
// Click to expand cards into fullscreen modal
// ==========================================
/**
 * HOW TO USE FOR YOUR PROJECTS:
 *
 * 1. Add the data-expand-content attribute to your project card:
 *    <div class="project-card" data-expand-content='["path/to/media1.mp4", "path/to/image.jpg"]'>
 *
 * 2. Add the expand button inside the project-content div:
 *    <div class="expand-button">
 *        Click to expand <span class="expand-arrow">↓</span>
 *    </div>
 *
 * 3. Supported file formats:
 *    - Videos: .mp4, .webm, .ogg
 *    - Images: .jpg, .jpeg, .png, .gif, .webp
 *
 * 4. Layout system:
 *    - 1 item: Full screen
 *    - 2 items: Split screen (50/50)
 *    - 3 items: 2 on left (stacked), 1 on right
 *    - 4+ items: Grid layout
 *
 * 5. Controls:
 *    - Click X button to close
 *    - Press ESC key to close
 *    - Click outside modal to close
 */

// Function to determine if file is a video
function isVideo(filename) {
    const videoExtensions = ['.mp4', '.webm', '.ogg', '.mov'];
    return videoExtensions.some(ext => filename.toLowerCase().endsWith(ext));
}

// Function to create media element (video or image)
function createMediaElement(src) {
    if (isVideo(src)) {
        const video = document.createElement('video');
        video.controls = true;
        video.muted = false; // Allow audio in modal
        video.loop = true;
        video.className = 'modal-media';

        const source = document.createElement('source');
        source.src = src;
        source.type = 'video/mp4';

        video.appendChild(source);
        return video;
    } else {
        const img = document.createElement('img');
        img.src = src;
        img.alt = 'Project media';
        img.className = 'modal-media';
        return img;
    }
}

// Function to get layout class based on number of items
function getLayoutClass(itemCount) {
    if (itemCount === 1) return 'layout-single';
    if (itemCount === 2) return 'layout-double';
    if (itemCount === 3) return 'layout-triple';
    return 'layout-grid';
}

// Function to open modal
function openModal(contentUrls) {
    // Create modal overlay
    const modalOverlay = document.createElement('div');
    modalOverlay.className = 'modal-overlay';
    modalOverlay.id = 'project-modal';

    // Create modal container
    const modalContainer = document.createElement('div');
    modalContainer.className = 'modal-container';

    // Create close button
    const closeButton = document.createElement('button');
    closeButton.className = 'modal-close';
    closeButton.innerHTML = '×';
    closeButton.setAttribute('aria-label', 'Close modal');

    // Create content wrapper with appropriate layout
    const contentWrapper = document.createElement('div');
    contentWrapper.className = `modal-content ${getLayoutClass(contentUrls.length)}`;

    // Add media elements
    contentUrls.forEach(url => {
        const mediaWrapper = document.createElement('div');
        mediaWrapper.className = 'modal-media-wrapper';
        const mediaElement = createMediaElement(url);
        mediaWrapper.appendChild(mediaElement);
        contentWrapper.appendChild(mediaWrapper);
    });

    // Assemble modal
    modalContainer.appendChild(closeButton);
    modalContainer.appendChild(contentWrapper);
    modalOverlay.appendChild(modalContainer);
    document.body.appendChild(modalOverlay);

    // Prevent body scrolling when modal is open
    document.body.style.overflow = 'hidden';

    // Fade in animation
    setTimeout(() => {
        modalOverlay.classList.add('active');
    }, 10);

    // Close handlers
    closeButton.addEventListener('click', closeModal);
    modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) {
            closeModal();
        }
    });
}

// Function to close modal
function closeModal() {
    const modal = document.getElementById('project-modal');
    if (modal) {
        modal.classList.remove('active');

        // Pause all videos in modal
        modal.querySelectorAll('video').forEach(video => {
            video.pause();
        });

        // Remove modal after animation
        setTimeout(() => {
            modal.remove();
            document.body.style.overflow = ''; // Restore body scrolling
        }, 300);
    }
}

// ESC key handler
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' || e.key === 'Esc') {
        closeModal();
    }
});

// Add click listeners to expand buttons and project images
document.addEventListener('click', (e) => {
    // Handle expand button clicks
    if (e.target.closest('.expand-button')) {
        const projectCard = e.target.closest('.project-card');
        const contentUrls = projectCard.getAttribute('data-expand-content');

        if (contentUrls) {
            try {
                const urls = JSON.parse(contentUrls);
                openModal(urls);
            } catch (err) {
                console.error('Error parsing expand content:', err);
            }
        }
    }

    // Handle project image clicks
    if (e.target.closest('.project-image')) {
        const projectCard = e.target.closest('.project-card');
        const contentUrls = projectCard.getAttribute('data-expand-content');

        if (contentUrls) {
            try {
                const urls = JSON.parse(contentUrls);
                openModal(urls);
            } catch (err) {
                console.error('Error parsing expand content:', err);
            }
        }
    }
});

// Add styles for modal, expand button, and video hover hint
const modalStyle = document.createElement('style');
modalStyle.textContent = `
    /* ===== PROJECT CARD LAYOUT FIX ===== */
    .project-card {
        display: flex;
        flex-direction: column;
        height: 100%;
    }

    .project-content {
        display: flex;
        flex-direction: column;
        flex: 1;
        min-height: 0;
    }

    /* ===== EXPAND BUTTON ===== */
    .expand-button {
        margin-top: auto;
        padding: 0.2rem;
        text-align: center;
        font-size: 0.85rem;
        color: var(--gray);
        opacity: 0.6;
        cursor: pointer;
        transition: all 0.3s ease;
        user-select: none;
        border-top: 1px solid rgba(255, 255, 255, 0.1);
    }

    .expand-button:hover {
        opacity: 1;
        color: var(--accent-bright);
    }

    .expand-arrow {
        display: inline-block;
        margin-left: 0.3rem;
        transition: transform 0.3s ease;
    }

    .expand-button:hover .expand-arrow {
        transform: translateY(3px);
    }

    /* ===== VIDEO HOVER HINT ===== */
    .video-hover-hint {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: rgba(0, 0, 0, 0.7);
        color: var(--white);
        padding: 0.5rem 1rem;
        border-radius: 4px;
        font-size: 0.9rem;
        opacity: 0.7;
        pointer-events: none;
        transition: opacity 0.3s ease;
        z-index: 2;
    }

    .project-card:hover .video-hover-hint,
    .project-video:hover ~ .video-hover-hint,
    .project-video.playing ~ .video-hover-hint {
        opacity: 0;
    }

    /* ===== MODAL OVERLAY ===== */
    .modal-overlay {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.95);
        z-index: 10000;
        display: flex;
        align-items: center;
        justify-content: center;
        opacity: 0;
        transition: opacity 0.3s ease;
        backdrop-filter: blur(5px);
    }

    .modal-overlay.active {
        opacity: 1;
    }

    /* ===== MODAL CONTAINER ===== */
    .modal-container {
        position: relative;
        width: 90%;
        height: 90vh;
        max-width: 1400px;
        background: var(--card-bg);
        border-radius: 12px;
        padding: 2rem;
        box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
        transform: scale(0.9);
        transition: transform 0.3s ease;
    }

    .modal-overlay.active .modal-container {
        transform: scale(1);
    }

    /* ===== CLOSE BUTTON ===== */
    .modal-close {
        position: absolute;
        top: 1rem;
        right: 1rem;
        width: 40px;
        height: 40px;
        border: none;
        background: transparent;
        color: var(--white);
        font-size: 2rem;
        line-height: 1;
        cursor: pointer;
        transition: all 0.3s ease;
        z-index: 10001;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .modal-close:hover {
        color: var(--orange);
        transform: rotate(90deg);
    }

    /* ===== MODAL CONTENT LAYOUTS ===== */
    .modal-content {
        width: 100%;
        height: 100%;
        display: flex;
        gap: 1rem;
    }

    /* Single item - full screen */
    .modal-content.layout-single {
        justify-content: center;
        align-items: center;
    }

    .modal-content.layout-single .modal-media-wrapper {
        width: 100%;
        height: 100%;
    }

    /* Two items - split screen */
    .modal-content.layout-double {
        flex-direction: row;
    }

    .modal-content.layout-double .modal-media-wrapper {
        flex: 1;
        height: 100%;
    }

    /* Three items - 2 left, 1 right */
    .modal-content.layout-triple {
        flex-direction: row;
    }

    .modal-content.layout-triple .modal-media-wrapper:first-child,
    .modal-content.layout-triple .modal-media-wrapper:nth-child(2) {
        flex: 1;
        height: calc(50% - 0.5rem);
    }

    .modal-content.layout-triple .modal-media-wrapper:nth-child(3) {
        flex: 1;
        height: 100%;
    }

    /* Four+ items - grid */
    .modal-content.layout-grid {
        flex-wrap: wrap;
    }

    .modal-content.layout-grid .modal-media-wrapper {
        flex: 1 1 calc(50% - 0.5rem);
        height: calc(50% - 0.5rem);
        min-width: 300px;
    }

    /* ===== MEDIA WRAPPER ===== */
    .modal-media-wrapper {
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        background: rgba(0, 0, 0, 0.3);
        border-radius: 8px;
        overflow: hidden;
    }

    /* ===== MEDIA ELEMENTS ===== */
    .modal-media {
        max-width: 100%;
        max-height: 100%;
        width: auto;
        height: auto;
        object-fit: contain;
        border-radius: 4px;
    }

    video.modal-media {
        width: 100%;
        height: 100%;
        object-fit: contain;
    }

    /* ===== IMAGE STYLING ===== */
    .project-image-img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 8px;
        transition: transform 0.3s ease;
    }

    .project-card:hover .project-image-img {
        transform: scale(1.02);
    }

    /* ===== EXPERIENCE TAGS ===== */
    .experience-tags {
        display: flex;
        flex-wrap: wrap;
        gap: 0.5rem;
        margin-top: 1rem;
    }

    /* Tags in experience section inherit the same styling from .tag */

    /* ===== RESPONSIVE DESIGN ===== */
    @media (max-width: 768px) {
        .modal-container {
            width: 95%;
            height: 95vh;
            padding: 1rem;
        }

        .modal-content.layout-double,
        .modal-content.layout-triple {
            flex-direction: column;
        }

        .modal-content.layout-triple .modal-media-wrapper {
            flex: 1;
            height: calc(33.333% - 0.5rem) !important;
        }

        .modal-content.layout-grid .modal-media-wrapper {
            flex: 1 1 100%;
            height: auto;
            min-height: 200px;
        }
    }
`;
document.head.appendChild(modalStyle);

/**
 * ==========================================
 * END OF JAVASCRIPT FILE
 *
 * TO ADD MORE FUNCTIONALITY:
 * - Copy relevant sections above
 * - Follow the same commenting structure
 * - Test thoroughly on different devices
 * ==========================================
 */
