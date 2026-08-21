/**
 * ==========================================
 * PERSONAL PORTFOLIO WEBSITE
 * Interactive JavaScript for animations and functionality
 * ==========================================
 */

// ==========================================
// SAFARI AUTOPLAY WORKAROUND
// Safari requires user interaction before videos can autoplay
// ==========================================
(function() {
    // Detect Safari browser (but not Chrome on iOS or other browsers)
    const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

    if (isSafari) {
        // Create welcome overlay
        const overlay = document.createElement('div');
        overlay.id = 'safari-welcome-overlay';
        overlay.innerHTML = `
            <div class="welcome-content">
                <h2>Welcome to My Portfolio</h2>
                <p>Click anywhere to continue</p>
                <div class="click-indicator">↓</div>
            </div>
        `;

        // Add styles for the overlay
        const overlayStyle = document.createElement('style');
        overlayStyle.textContent = `
            #safari-welcome-overlay {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background:
                    radial-gradient(circle at 20% 30%, rgba(131, 165, 152, 0.05) 0%, transparent 50%),
                    radial-gradient(circle at 80% 70%, rgba(211, 134, 155, 0.05) 0%, transparent 50%),
                    radial-gradient(circle at 50% 50%, rgba(184, 187, 38, 0.04) 0%, transparent 50%);
                background-color: var(--bg-primary, #282828);
                display: flex;
                justify-content: center;
                align-items: center;
                z-index: 10000;
                cursor: pointer;
                animation: fadeIn 0.5s ease;
            }

            .welcome-content {
                text-align: center;
                color: white;
            }

            .welcome-content h2 {
                font-size: 2.5rem;
                margin-bottom: 1rem;
                color: var(--accent-bright, #d79921);
            }

            .welcome-content p {
                font-size: 1.2rem;
                color: var(--fg-secondary, #a8a8a8);
                margin-bottom: 2rem;
            }

            .click-indicator {
                font-size: 3rem;
                animation: bounce 2s infinite;
            }

            @keyframes fadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
            }

            @keyframes bounce {
                0%, 20%, 50%, 80%, 100% {
                    transform: translateY(0);
                }
                40% {
                    transform: translateY(-20px);
                }
                60% {
                    transform: translateY(-10px);
                }
            }

            @keyframes fadeOut {
                from { opacity: 1; }
                to { opacity: 0; }
            }
        `;
        document.head.appendChild(overlayStyle);
        document.body.appendChild(overlay);

        // Remove overlay on any click
        overlay.addEventListener('click', function() {
            overlay.style.animation = 'fadeOut 0.5s ease';
            setTimeout(() => {
                overlay.remove();
            }, 500);
        });

        // Also remove on any key press
        document.addEventListener('keydown', function removeOverlay() {
            overlay.style.animation = 'fadeOut 0.5s ease';
            setTimeout(() => {
                overlay.remove();
            }, 500);
            document.removeEventListener('keydown', removeOverlay);
        });
    }
})();

// ==========================================
// SIDEBAR NAVIGATION TOGGLE
// Handles sidebar expand/collapse functionality
// ==========================================
const sidebar = document.getElementById('sidebar');
const sidebarToggle = document.getElementById('sidebar-toggle');
const sidebarLinks = document.querySelectorAll('.sidebar-link');

// Mobile only: toggle sidebar on button click (hover handles desktop)
if (sidebarToggle) {
    sidebarToggle.addEventListener('click', () => {
        if (window.innerWidth <= 768) {
            sidebar.classList.toggle('expanded');
        }
    });
}

// Mobile only: close sidebar when clicking a link
sidebarLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (window.innerWidth <= 768) {
            sidebar.classList.remove('expanded');
        }
    });
});

// Mobile only: close sidebar when clicking outside
document.addEventListener('click', (e) => {
    if (window.innerWidth <= 768 &&
        sidebar.classList.contains('expanded') &&
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

// Detect touch devices (mobile) — hover-to-play is replaced with hold-to-play
const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

// Optimize video loading for faster playback
projectVideos.forEach((video, index) => {
    // Set preload attribute to load metadata immediately
    video.setAttribute('preload', 'metadata');

    // Create loading spinner element
    const spinner = document.createElement('div');
    spinner.className = 'video-loading-spinner';
    spinner.innerHTML = '<div class="spinner"></div>';
    video.parentElement.appendChild(spinner);

    // Preload first few videos with higher priority (visible on page load)
    if (index < 3) {
        video.setAttribute('preload', 'auto');
        // Load the first frame immediately for instant display
        video.load();
    }

    let isHovering = false;

    if (!isTouchDevice) {
        // When mouse enters the video area (desktop only)
        video.addEventListener('mouseenter', function() {
            isHovering = true;
            console.log('Mouse enter - readyState:', this.readyState);

            // Show spinner if video isn't ready to play through
            if (this.readyState < 4) {
                spinner.style.display = 'flex';
                console.log('Showing spinner');
            }

            // Ensure video is loaded before playing
            if (this.readyState < 2) {
                this.load();
            }

            const playPromise = this.play();
            if (playPromise !== undefined) {
                playPromise.catch(err => {
                    console.log('Video play failed:', err);
                    spinner.style.display = 'none';
                });
            }
        });

        // When mouse leaves the video area (desktop only)
        video.addEventListener('mouseleave', function() {
            isHovering = false;
            this.pause(); // Pause the video
            this.currentTime = 0; // Reset to beginning
            spinner.style.display = 'none'; // Hide spinner
        });
    }

    // Monitor loading progress
    video.addEventListener('loadstart', function() {
        if (isHovering) {
            spinner.style.display = 'flex';
            console.log('Load started');
        }
    });

    video.addEventListener('loadeddata', function() {
        console.log('Data loaded - readyState:', this.readyState);
    });

    // Hide spinner when video can play through without buffering
    video.addEventListener('canplaythrough', function() {
        spinner.style.display = 'none';
        console.log('Can play through - hiding spinner');
    });

    // Also hide on canplay (slightly earlier)
    video.addEventListener('canplay', function() {
        if (this.readyState >= 3) {
            spinner.style.display = 'none';
        }
    });

    // Hide spinner when actually playing
    video.addEventListener('playing', function() {
        spinner.style.display = 'none';
        console.log('Video playing - hiding spinner');
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

    // Show spinner if waiting for data while hovering
    video.addEventListener('waiting', function() {
        if (isHovering) {
            spinner.style.display = 'flex';
            console.log('Waiting for data - showing spinner');
        }
    });

    // Preload videos as they come into viewport
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && entry.target.readyState < 2) {
                entry.target.load();
            }
        });
    }, { rootMargin: '100px' });

    observer.observe(video);
});

// ==========================================
// MOBILE HOLD-TO-PLAY
// On touch devices, hold the preview to play video.
// A short tap still expands the card normally.
// ==========================================
if (isTouchDevice) {
    // Change hint text from "Hover to play" to "Hold to play"
    document.querySelectorAll('.video-hover-hint, .art-video-hover-hint').forEach(hint => {
        hint.textContent = 'Hold to play';
    });

    projectVideos.forEach((video) => {
        const imageContainer = video.parentElement;
        let holdTimer = null;
        let isHolding = false;
        let touchStartY = 0;

        // Start hold timer on touchstart
        imageContainer.addEventListener('touchstart', (e) => {
            touchStartY = e.touches[0].clientY;
            holdTimer = setTimeout(() => {
                isHolding = true;
                video.classList.add('playing');
                if (video.readyState < 2) video.load();
                video.play().catch(() => {});
            }, 400);
        }, { passive: true });

        // Cancel hold if user scrolls before threshold
        imageContainer.addEventListener('touchmove', (e) => {
            if (!isHolding && holdTimer) {
                const moveY = Math.abs(e.touches[0].clientY - touchStartY);
                if (moveY > 10) {
                    clearTimeout(holdTimer);
                    holdTimer = null;
                }
            }
        }, { passive: true });

        // On release: if holding, stop video and block card expand click
        imageContainer.addEventListener('touchend', (e) => {
            clearTimeout(holdTimer);
            holdTimer = null;
            if (isHolding) {
                video.pause();
                video.currentTime = 0;
                video.classList.remove('playing');
                isHolding = false;
                e.preventDefault(); // suppress click → modal doesn't open
            }
        });

        // Clean up on cancelled touch (e.g. incoming call)
        imageContainer.addEventListener('touchcancel', () => {
            clearTimeout(holdTimer);
            holdTimer = null;
            if (isHolding) {
                video.pause();
                video.currentTime = 0;
                video.classList.remove('playing');
                isHolding = false;
            }
        });
    });
}

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
    .project-image,
    .artwork-image {
        position: relative;
        overflow: hidden; /* Prevents video from spilling out during zoom */
        border-radius: 8px;
    }

    /* Loading spinner overlay */
    .video-loading-spinner {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        display: none;
        justify-content: center;
        align-items: center;
        background-color: rgba(0, 0, 0, 0.5);
        z-index: 10;
        pointer-events: none;
        border-radius: 8px;
    }

    /* Spinner animation */
    .video-loading-spinner .spinner {
        width: 40px;
        height: 40px;
        border: 4px solid rgba(255, 255, 255, 0.3);
        border-top: 4px solid var(--accent-bright, #d79921);
        border-radius: 50%;
        animation: spin 1s linear infinite;
    }

    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
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
 * 1. Add the data-expand-content attribute to your project card.
 *    It holds a JSON array; items render IN ORDER, so you can alternate
 *    text sections and image groups freely:
 *
 *    data-expand-content='[
 *        {"type": "text", "content": "<h3>Title</h3><p>Intro paragraphs...</p>"},
 *        {"src": "assets/projects/X/img1.png", "text": "Caption under image 1"},
 *        {"src": "assets/projects/X/img2.png", "text": "Caption under image 2"},
 *        {"type": "text", "content": "<h4>Next Section</h4><p>More paragraphs...</p>"},
 *        {"src": "assets/projects/X/img3.png", "text": "Another figure"}
 *    ]'
 *
 *    - {"type": "text", "content": ...} = article text (supports HTML:
 *      h3 for the title, h4 for subheadings, p, strong, ul/li)
 *    - {"src": ..., "text": ...} = image/video figure with an optional
 *      caption below it ("text" is plain text only)
 *
 *    A figure can also carry optional sizing keys — handy for portrait
 *    media, which the shared height cap otherwise shrinks:
 *        {"src": "...", "text": "...", "height": 620}
 *        {"src": "...", "text": "...", "ratio": "auto", "height": 620}
 *        {"src": "...", "text": "...", "ratio": "3/4", "fit": "cover"}
 *        {"src": "...", "text": "...", "wide": true, "fill": true}
 *        {"src": "...", "text": "...", "columns": 3}
 *        {"src": "...", "text": "...", "wide": true}
 *      "height" = max height, number for px or a CSS length like "70vh"
 *      "ratio"  = "auto" shrinks the frame to the image's own proportions
 *                 (no bars beside a portrait shot); or a fixed width/height
 *                 shape such as "3/4" or "3:4"
 *      "fit"    = "cover" crops to that shape; default "contain" letterboxes
 *      "wide"   = take the full row instead of one grid column
 *      "half"   = stay in one column even when a rule would stretch it
 *      "columns"= figures per row for the whole gallery (set it on the
 *                 first figure of the run; applies on phones too)
 *      "fill"   = scale out to the full width of the slot, no height cap
 *                 ("wide" + "fill" = edge-to-edge; tall images get tall)
 *      (tall figures are still clamped to 70vh so they fit on phones)
 *
 * 2. Add the expand button inside the project-content div:
 *    <div class="expand-button">
 *        Click to expand <span class="expand-arrow">↓</span>
 *    </div>
 *
 * 3. Supported file formats:
 *    - Videos: .mp4, .webm, .ogg, .mov
 *    - Images: .jpg, .jpeg, .png, .gif, .webp
 *
 * 4. Layout system:
 *    - Consecutive media items form a 2-column gallery grid (1 column on mobile)
 *    - Videos and a lone trailing figure span the full width; only figures
 *      that take a column are counted, so a "wide" hero in the same gallery
 *      does not push the images below it out of their row
 *    - A text item ends the current gallery; the next media item starts a new one
 *    - A gallery normally sits below a divider, but if the text item right
 *      before it ends on a heading (a {"type": "text", "content": "<h4>X</h4>"}
 *      item on its own), the figures tuck in under that heading instead
 *
 * 5. Controls:
 *    - Click X button to close
 *    - Press ESC key to close
 *    - Click outside modal to close
 *    - Click any image, or a video outside its control bar, to expand it
 *      into its own lightbox above the modal (X / ESC / click outside
 *      closes just the lightbox, not the modal underneath)
 */

// Function to determine if file is a video
function isVideo(filename) {
    if (!filename) return false;
    const videoExtensions = ['.mp4', '.webm', '.ogg', '.mov'];
    return videoExtensions.some(ext => filename.toLowerCase().endsWith(ext));
}

// Optional per-item sizing knobs from data-expand-content. Useful for
// portrait media, which otherwise gets squeezed by the shared height cap
// and leaves wide empty bars beside it:
//   "height": 620      cap this figure's media height (number = px, or any
//                      CSS length such as "70vh"); it still shrinks to fit
//                      small screens
//   "ratio": "auto"    shrink the frame to the media's own proportions, so a
//                      portrait image gets no empty bars beside it at all
//   "ratio": "3/4"     pin the frame to a fixed width/height shape, so
//                      mismatched figures line up in the grid ("3:4" works too)
//   "fit": "cover"     fill that shape by cropping instead of letterboxing
//                      (default is "contain", i.e. the whole image is shown)
//   "wide": true       give the figure the full row instead of half of it
//   "half": true       keep the figure in a single grid column even when a
//                      rule below would otherwise stretch it across the row
//                      (a lone figure, an odd trailing figure, or a video)
//   "columns": 3       set how many figures share the row for this whole
//                      gallery — read from the first figure of the run, and
//                      honoured on phones too, unlike the automatic 2-up grid
//   "fill": true       scale the media out to the full width of its slot and
//                      let the height land wherever the image's own shape puts
//                      it, ignoring every height cap — pair with "wide": true
//                      for an edge-to-edge figure. A tall image gets tall, so
//                      this suits landscape media (schematics, screenshots)
function applyFigureSizing(figure, opts) {
    if (opts.wide) {
        figure.classList.add('modal-figure-wide');
    }
    if (opts.fill) {
        figure.classList.add('modal-figure-fill');
    }
    if (opts.half) {
        figure.classList.add('modal-figure-half');
    }
    if (opts.height) {
        figure.classList.add('modal-figure-sized');
        figure.style.setProperty('--figure-height',
            typeof opts.height === 'number' ? opts.height + 'px' : opts.height);
    }
    if (opts.ratio === 'auto') {
        figure.classList.add('modal-figure-natural');
    } else if (opts.ratio) {
        figure.classList.add('modal-figure-ratio');
        figure.style.setProperty('--figure-ratio', String(opts.ratio).replace(':', '/'));
    }
    if (opts.fit === 'cover') {
        figure.classList.add('modal-figure-cover');
    }
}

// Function to create a media figure (video or image with optional caption)
function createMediaElement(item) {
    // Handle both old format (string) and new format (object)
    let src, text, opts;

    if (typeof item === 'string') {
        src = item;
        text = null;
        opts = {};
    } else {
        src = item.src;
        text = item.text || null;
        opts = item;
    }

    const figure = document.createElement('figure');
    figure.className = 'modal-figure';
    applyFigureSizing(figure, opts);

    const mediaFrame = document.createElement('div');
    mediaFrame.className = 'modal-figure-media';

    if (isVideo(src)) {
        figure.classList.add('modal-figure-wide');

        const video = document.createElement('video');
        video.controls = true;
        video.muted = false; // Allow audio in modal
        video.loop = true;
        video.preload = 'metadata';
        video.className = 'modal-media modal-media-expandable';

        const source = document.createElement('source');
        source.src = src;
        source.type = 'video/mp4';

        video.appendChild(source);

        // Show a preview frame instead of a black box before the user hits
        // play: nudge the play head forward once metadata is available so
        // the browser decodes and paints a frame, then reset to the start
        // so playback still begins from 0:00
        function primePreviewFrame() {
            video.currentTime = Math.min(0.1, video.duration || 0.1);
        }
        if (video.readyState >= 1) {
            primePreviewFrame();
        } else {
            video.addEventListener('loadedmetadata', primePreviewFrame, { once: true });
        }
        video.addEventListener('seeked', function resetToStart() {
            video.removeEventListener('seeked', resetToStart);
            video.currentTime = 0;
        });

        // Clicking the video frame expands it into the lightbox; clicking
        // the native control bar strip at the bottom (play/pause, seek,
        // volume, etc.) is left alone so playback controls keep working
        video.addEventListener('click', (e) => {
            const rect = video.getBoundingClientRect();
            const clickY = e.clientY - rect.top;
            const controlBarHeight = 44; // approx. native control bar height
            if (clickY >= rect.height - controlBarHeight) {
                return; // let the native controls handle play/pause etc.
            }
            e.preventDefault();
            e.stopPropagation();
            openLightbox(video);
        });

        mediaFrame.appendChild(video);
    } else {
        const img = document.createElement('img');
        img.src = src;
        img.alt = text || 'Project media';
        img.loading = 'lazy';
        img.className = 'modal-media modal-media-expandable';
        // Click an image to open it large in its own lightbox, layered
        // above the project modal (see openLightbox/closeLightbox below)
        img.addEventListener('click', (e) => {
            e.stopPropagation();
            openLightbox(img);
        });
        mediaFrame.appendChild(img);
    }

    figure.appendChild(mediaFrame);

    // Add optional text caption if provided
    if (text) {
        const caption = document.createElement('figcaption');
        caption.className = 'modal-figure-caption';
        caption.textContent = text;
        figure.appendChild(caption);
    }

    return figure;
}

// Function to create text block element
function createTextElement(content) {
    const textBlock = document.createElement('div');
    textBlock.className = 'modal-text-block';
    textBlock.innerHTML = content; // Support HTML formatting
    return textBlock;
}

// True when a text block's last element is a heading, i.e. the block is a
// section title with no body text of its own
function endsWithHeading(el) {
    if (!el || !el.classList.contains('modal-text-block')) return false;
    const last = el.lastElementChild;
    return !!last && /^H[1-6]$/.test(last.tagName);
}

// Body scroll lock — position:fixed works on iOS Safari where
// overflow:hidden alone does not, and preserves the scroll position
let savedScrollY = 0;

function lockBodyScroll() {
    savedScrollY = window.scrollY;
    document.body.style.position = 'fixed';
    document.body.style.top = `-${savedScrollY}px`;
    document.body.style.left = '0';
    document.body.style.right = '0';
    document.body.style.width = '100%';
}

function unlockBodyScroll() {
    document.body.style.position = '';
    document.body.style.top = '';
    document.body.style.left = '';
    document.body.style.right = '';
    document.body.style.width = '';
    // 'instant' bypasses the global scroll-behavior: smooth
    window.scrollTo({ top: savedScrollY, behavior: 'instant' });
}

// Function to open modal
function openModal(contentItems) {
    // Create modal overlay (blurred, dimmed view of the page behind)
    const modalOverlay = document.createElement('div');
    modalOverlay.className = 'modal-overlay';
    modalOverlay.id = 'project-modal';

    // Create floating modal card
    const modalContainer = document.createElement('div');
    modalContainer.className = 'modal-container';
    modalContainer.setAttribute('role', 'dialog');
    modalContainer.setAttribute('aria-modal', 'true');

    // Create close button
    const closeButton = document.createElement('button');
    closeButton.className = 'modal-close';
    closeButton.innerHTML = '×';
    closeButton.setAttribute('aria-label', 'Close modal');

    // Scrollable content area: text blocks first, then a media gallery
    const contentWrapper = document.createElement('div');
    contentWrapper.className = 'modal-content';

    // Items render in the order they appear in data-expand-content:
    // text blocks become article sections, and each run of consecutive
    // media items becomes a gallery grid — so text and figures can alternate
    let currentGallery = null;
    contentItems.forEach(item => {
        if (typeof item === 'object' && item.type === 'text') {
            currentGallery = null;
            contentWrapper.appendChild(createTextElement(item.content));
        } else {
            if (!currentGallery) {
                currentGallery = document.createElement('div');
                currentGallery.className = 'modal-gallery';
                // "columns": N on the first figure of a run fixes how many
                // figures share the row, instead of the automatic 2-up grid
                if (typeof item === 'object' && item.columns) {
                    currentGallery.classList.add('modal-gallery-fixed');
                    currentGallery.style.setProperty('--gallery-columns', item.columns);
                }
                // A text block ending on a heading is introducing these
                // figures, so keep them tucked under it instead of pushing
                // them away behind the usual section divider
                if (endsWithHeading(contentWrapper.lastElementChild)) {
                    currentGallery.classList.add('modal-gallery-tight');
                }
                contentWrapper.appendChild(currentGallery);
            }
            currentGallery.appendChild(createMediaElement(item));
        }
    });

    // A trailing figure alone on the last row looks better spanning it, but
    // only figures that actually take a column count towards that — a "wide"
    // hero in the same gallery must not flip the parity of the ones below it
    contentWrapper.querySelectorAll('.modal-gallery:not(.modal-gallery-fixed)').forEach(gallery => {
        const inColumns = [...gallery.children].filter(
            figure => !figure.classList.contains('modal-figure-wide'));
        const last = inColumns[inColumns.length - 1];
        if (inColumns.length % 2 === 1 && last && !last.classList.contains('modal-figure-half')) {
            last.classList.add('modal-figure-orphan');
        }
    });

    // Assemble modal
    modalContainer.appendChild(closeButton);
    modalContainer.appendChild(contentWrapper);
    modalOverlay.appendChild(modalContainer);
    document.body.appendChild(modalOverlay);

    // Prevent the main page from scrolling while the modal is open
    lockBodyScroll();

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
    // A lightbox floats above the modal, so closing the modal first tidies
    // up any expanded image/video rather than leaving it stranded
    if (activeLightboxCloser) {
        activeLightboxCloser();
    }

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
            unlockBodyScroll(); // Restore body scrolling and position
        }, 300);
    }
}

// ==========================================
// IMAGE/VIDEO LIGHTBOX
// Expands a single image or video from inside the project modal into a
// large view of its own, with its own blurred backdrop layered above the
// modal. Reuses the actual <img>/<video> node (rather than cloning it) so
// video playback position/state carries over with no extra bookkeeping,
// then moves it back to its original spot when the lightbox closes.
// ==========================================
let activeLightboxCloser = null;

function openLightbox(mediaEl) {
    // Close any lightbox that's already open before opening another
    if (activeLightboxCloser) {
        activeLightboxCloser();
    }

    const originalParent = mediaEl.parentNode;
    const placeholder = document.createComment('lightbox-placeholder');
    originalParent.replaceChild(placeholder, mediaEl);

    const lightboxOverlay = document.createElement('div');
    lightboxOverlay.className = 'lightbox-overlay';
    lightboxOverlay.id = 'media-lightbox';

    const closeButton = document.createElement('button');
    closeButton.className = 'lightbox-close';
    closeButton.innerHTML = '×';
    closeButton.setAttribute('aria-label', 'Close expanded view');

    mediaEl.classList.add('lightbox-media');

    lightboxOverlay.appendChild(closeButton);
    lightboxOverlay.appendChild(mediaEl);
    document.body.appendChild(lightboxOverlay);

    setTimeout(() => {
        lightboxOverlay.classList.add('active');
    }, 10);

    function handleClose() {
        lightboxOverlay.classList.remove('active');
        setTimeout(() => {
            // Restore the media element to its original spot in the modal
            mediaEl.classList.remove('lightbox-media');
            if (placeholder.parentNode) {
                placeholder.parentNode.replaceChild(mediaEl, placeholder);
            }
            lightboxOverlay.remove();
            if (activeLightboxCloser === handleClose) {
                activeLightboxCloser = null;
            }
        }, 300);
    }

    closeButton.addEventListener('click', (e) => {
        e.stopPropagation();
        handleClose();
    });

    // Clicking the backdrop closes only the lightbox. Since the lightbox
    // overlay is a sibling of the project modal (not nested inside it),
    // this click never bubbles through the modal's own overlay, so the
    // project/artwork expand underneath stays open.
    lightboxOverlay.addEventListener('click', (e) => {
        if (e.target === lightboxOverlay) {
            e.stopPropagation();
            handleClose();
        }
    });

    activeLightboxCloser = handleClose;
}

// ESC key handler — closes the topmost layer first: an open lightbox
// before the project modal underneath it
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' || e.key === 'Esc') {
        if (activeLightboxCloser) {
            activeLightboxCloser();
        } else {
            closeModal();
        }
    }
});

// Add click listeners to project/artwork cards (entire card is clickable except tags)
document.addEventListener('click', (e) => {
    // Don't open modal if clicking on a tag
    if (e.target.closest('.tag')) {
        return;
    }

    // Check if click is within a project or artwork card
    const card = e.target.closest('.project-card') || e.target.closest('.artwork-card');

    if (card) {
        const contentUrls = card.getAttribute('data-expand-content');

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

    /* ===== ARTWORK CARD LAYOUT FIX ===== */
    .artwork-card {
        display: flex;
        flex-direction: column;
        height: 100%;
    }

    .artwork-content {
        display: flex;
        flex-direction: column;
        flex: 1;
        min-height: 0;
    }

    /* ===== EXPAND BUTTON ===== */
    @keyframes colorPulse {
        0%, 100% {
            color: var(--gray);
        }
        50% {
            color: var(--accent-bright);
        }
    }

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
        animation: colorPulse 2s ease-in-out infinite;
    }

    .expand-button:hover {
        opacity: 1;
        color: var(--accent-bright);
        animation: none;
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
        top: 85%;
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
    .artwork-card:hover .video-hover-hint,
    .project-video:hover ~ .video-hover-hint,
    .project-video.playing ~ .video-hover-hint {
        opacity: 0;
    }

    /* ===== ART VIDEO HOVER HINT ===== */
    .art-video-hover-hint {
        position: absolute;
        top: 85%;
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

    .project-card:hover .art-video-hover-hint,
    .artwork-card:hover .art-video-hover-hint,
    .project-video:hover ~ .art-video-hover-hint,
    .project-video.playing ~ .art-video-hover-hint {
        opacity: 0;
    }

    /* ===== MODAL OVERLAY =====
       Dimmed + blurred view of the page behind, so the main site
       stays visible around the floating card */
    .modal-overlay {
        position: fixed;
        inset: 0;
        background: rgba(29, 32, 33, 0.55);
        -webkit-backdrop-filter: blur(12px) saturate(85%);
        backdrop-filter: blur(12px) saturate(85%);
        z-index: 10000;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 3vh 2rem;
        opacity: 0;
        transition: opacity 0.3s ease;
    }

    .modal-overlay.active {
        opacity: 1;
    }

    /* ===== FLOATING MODAL CARD ===== */
    .modal-container {
        position: relative;
        width: min(1000px, 100%);
        max-height: 90vh;
        max-height: 90dvh;
        display: flex;
        flex-direction: column;
        background: var(--bg-secondary);
        border: 1px solid var(--glass-border);
        border-radius: 16px;
        box-shadow: 0 24px 80px rgba(0, 0, 0, 0.55), 0 4px 16px rgba(0, 0, 0, 0.35);
        transform: scale(0.96) translateY(14px);
        transition: transform 0.3s ease;
        overflow: hidden;
    }

    .modal-overlay.active .modal-container {
        transform: scale(1) translateY(0);
    }

    /* ===== CLOSE BUTTON ===== */
    .modal-close {
        position: absolute;
        top: 1rem;
        right: 1rem;
        width: 38px;
        height: 38px;
        border: 1px solid var(--glass-border);
        border-radius: 50%;
        background: rgba(40, 40, 40, 0.85);
        color: var(--fg-secondary);
        font-size: 1.5rem;
        line-height: 1;
        cursor: pointer;
        transition: all 0.3s ease;
        z-index: 2;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .modal-close:hover {
        color: var(--accent-bright);
        border-color: var(--accent-primary);
        transform: rotate(90deg);
    }

    /* ===== SCROLLABLE CONTENT AREA =====
       Scrolling stays inside the card; overscroll-behavior stops
       the scroll from chaining to the page behind */
    .modal-content {
        overflow-y: auto;
        overflow-x: hidden;
        overscroll-behavior: contain;
        padding: 2.5rem clamp(1.5rem, 4vw, 3rem);
    }

    /* ===== TEXT BLOCKS ===== */
    .modal-text-block {
        max-width: 72ch;
        margin: 0 auto;
        color: var(--fg-secondary);
        font-size: 0.98rem;
        line-height: 1.8;
    }

    .modal-text-block h3 {
        color: var(--accent-bright);
        font-size: 1.45rem;
        line-height: 1.3;
        margin-bottom: 1.5rem;
        padding-bottom: 0.75rem;
        padding-right: 3rem; /* keep clear of the close button */
        border-bottom: 1px solid var(--glass-border);
    }

    .modal-text-block h4 {
        color: var(--fg-primary);
        font-size: 1.05rem;
        margin: 1.75rem 0 0.6rem;
        padding-left: 0.6rem;
        border-left: 3px solid var(--accent-primary);
    }

    /* A section that resumes after a gallery already has the gallery's
       own spacing above it */
    .modal-text-block > h4:first-child {
        margin-top: 0;
    }

    .modal-text-block p {
        margin-bottom: 1.1rem;
    }

    .modal-text-block p:last-child {
        margin-bottom: 0;
    }

    .modal-text-block strong {
        color: var(--fg-primary);
        font-weight: 700;
    }

    .modal-text-block ul,
    .modal-text-block ol {
        margin-left: 1.5rem;
        margin-bottom: 1.1rem;
    }

    .modal-text-block li {
        margin-bottom: 0.5rem;
    }

    /* ===== MEDIA GALLERY =====
       Grid of figure cards, separated from the text by a divider */
    .modal-gallery {
        display: grid;
        grid-template-columns: repeat(2, minmax(0, 1fr));
        gap: 1.25rem;
        margin-top: 2.25rem;
        padding-top: 2rem;
        border-top: 1px solid var(--glass-border);
    }

    .modal-gallery:first-child {
        margin-top: 0;
        padding-top: 0;
        border-top: none;
    }

    /* "columns": N — the author is placing figures by hand, so the count is
       kept at every width and the automatic full-row rules stand down
       (an explicit "wide" still spans) */
    .modal-gallery.modal-gallery-fixed {
        grid-template-columns: repeat(var(--gallery-columns), minmax(0, 1fr));
    }


    /* Figures introduced directly by a heading belong to that section,
       so they sit close under it with no divider */
    .modal-gallery-tight {
        margin-top: 1rem;
        padding-top: 0;
        border-top: none;
    }

    /* Text sections that continue after a gallery */
    .modal-gallery + .modal-text-block {
        margin-top: 2.25rem;
    }

    .modal-text-block + .modal-text-block {
        margin-top: 1.5rem;
    }

    /* ===== FIGURE CARDS ===== */
    .modal-figure {
        margin: 0;
        display: flex;
        flex-direction: column;
        background: var(--bg-primary);
        border: 1px solid var(--glass-border);
        border-radius: 12px;
        overflow: hidden;
    }

    /* Videos take the full row, as does a lone trailing figure — see the
       pass in openModal that tags it .modal-figure-orphan. "half": true on
       an item keeps it in its column instead */
    .modal-figure-wide:not(.modal-figure-half),
    .modal-figure-orphan {
        grid-column: 1 / -1;
    }

    .modal-figure-media {
        flex: 1; /* fill the card so shorter media centers in its grid row */
        display: flex;
        align-items: center;
        justify-content: center;
        background: var(--black);
    }

    .modal-media {
        display: block;
        width: 100%;
        height: auto;
        max-height: 440px;
        object-fit: contain;
    }

    video.modal-media {
        max-height: 480px;
        background: var(--black);
    }

    /* ===== PER-FIGURE SIZING =====
       Driven by "height" / "ratio" / "fit" on an item in data-expand-content.
       min(..., 70vh) keeps a tall figure from running off a phone screen */
    .modal-figure-sized .modal-media {
        max-height: min(var(--figure-height), 70vh);
    }

    /* "ratio": "auto" — the card shrinks to the media's own shape, so
       nothing is boxed in by bars; the height cap still decides how big
       it gets */
    .modal-figure-natural {
        width: fit-content;
        max-width: 100%;
        justify-self: center;
    }

    .modal-figure-natural .modal-figure-media,
    .modal-figure-natural .modal-media {
        width: auto;
        max-width: 100%;
    }

    .modal-figure-ratio .modal-figure-media {
        aspect-ratio: var(--figure-ratio);
    }

    .modal-figure-ratio .modal-media {
        width: 100%;
        height: 100%;
        max-height: none;
    }

    /* A ratio sets the shape; a height alongside it caps how big that
       shape is allowed to get, narrowing the frame to keep the shape */
    .modal-figure-ratio.modal-figure-sized .modal-figure-media {
        max-height: min(var(--figure-height), 70vh);
        max-width: calc(min(var(--figure-height), 70vh) * (var(--figure-ratio)));
        margin: 0 auto;
    }

    .modal-figure-cover .modal-media {
        object-fit: cover;
    }

    /* "fill": true — width drives the size, height follows the image's own
       shape with no cap at all. Last in this block so it wins over the
       height/ratio rules above when an item sets several keys */
    .modal-figure-fill,
    .modal-figure-fill .modal-figure-media,
    .modal-figure-fill .modal-media {
        width: 100%;
        max-width: 100%;
        max-height: none;
        aspect-ratio: auto;
    }

    .modal-figure-fill .modal-media {
        height: auto;
    }

    /* ===== EXPANDABLE MEDIA HINT =====
       Images/videos inside the modal open a full-size lightbox on click */
    .modal-media-expandable {
        cursor: zoom-in;
        transition: opacity 0.2s ease;
    }

    .modal-media-expandable:hover {
        opacity: 0.9;
    }

    /* ===== IMAGE/VIDEO LIGHTBOX =====
       Full-viewport expanded view of a single figure, layered above the
       project modal (higher z-index) so it can be closed independently
       without dismissing the modal underneath */
    .lightbox-overlay {
        position: fixed;
        inset: 0;
        background: rgba(20, 20, 20, 0.75);
        -webkit-backdrop-filter: blur(16px) saturate(85%);
        backdrop-filter: blur(16px) saturate(85%);
        z-index: 10100;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 4vh 4vw;
        opacity: 0;
        transition: opacity 0.3s ease;
        cursor: zoom-out;
    }

    .lightbox-overlay.active {
        opacity: 1;
    }

    .lightbox-overlay .lightbox-media {
        max-width: 92vw;
        max-height: 92vh;
        width: auto;
        height: auto;
        object-fit: contain;
        border-radius: 8px;
        box-shadow: 0 24px 80px rgba(0, 0, 0, 0.55), 0 4px 16px rgba(0, 0, 0, 0.35);
        cursor: default;
        transform: scale(0.96);
        transition: transform 0.3s ease;
    }

    .lightbox-overlay.active .lightbox-media {
        transform: scale(1);
    }

    .lightbox-close {
        position: absolute;
        top: 1.25rem;
        right: 1.25rem;
        width: 42px;
        height: 42px;
        border: 1px solid var(--glass-border);
        border-radius: 50%;
        background: rgba(40, 40, 40, 0.85);
        color: var(--fg-secondary);
        font-size: 1.6rem;
        line-height: 1;
        cursor: pointer;
        transition: all 0.3s ease;
        z-index: 2;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .lightbox-close:hover {
        color: var(--accent-bright);
        border-color: var(--accent-primary);
        transform: rotate(90deg);
    }

    /* ===== FIGURE CAPTIONS ===== */
    .modal-figure-caption {
        padding: 0.75rem 1rem;
        font-size: 0.85rem;
        line-height: 1.5;
        text-align: center;
        color: var(--fg-tertiary);
        background: var(--bg-primary);
        border-top: 1px solid var(--glass-border);
        margin-top: auto;
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
        .modal-overlay {
            padding: 0.75rem;
        }

        .modal-container {
            max-height: calc(100vh - 1.5rem);
            max-height: calc(100dvh - 1.5rem);
            border-radius: 12px;
        }

        .modal-close {
            top: 0.75rem;
            right: 0.75rem;
        }

        .modal-content {
            padding: 1.5rem 1rem;
        }

        .modal-text-block {
            font-size: 0.95rem;
        }

        /* Single column gallery on small screens */
        .modal-gallery {
            grid-template-columns: 1fr;
            gap: 1rem;
            margin-top: 1.75rem;
            padding-top: 1.5rem;
        }

        .modal-gallery-tight {
            margin-top: 0.85rem;
            padding-top: 0;
        }

        .modal-media,
        video.modal-media {
            max-height: 60vh;
        }

        .lightbox-overlay {
            padding: 1.5vh 1rem;
        }

        .lightbox-close {
            top: 0.75rem;
            right: 0.75rem;
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
