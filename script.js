/**
 * ==========================================
 * PERSONAL PORTFOLIO WEBSITE
 * Interactive JavaScript for animations and functionality
 * ==========================================
 */

// ==========================================
// MOBILE NAVIGATION TOGGLE
// Handles hamburger menu for mobile devices
// ==========================================
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

// Toggle mobile menu
if (hamburger) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
}

// Close mobile menu when clicking a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// ==========================================
// NAVBAR SCROLL EFFECT
// Changes navbar background on scroll
// ==========================================
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
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
            const navbarHeight = navbar.offsetHeight;
            const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navbarHeight;

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
        const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            navLinks.forEach(link => link.classList.remove('active'));
            if (navLink) {
                navLink.classList.add('active');
            }
        }
    });
}

window.addEventListener('scroll', updateActiveNavLink);

// Add active link styles
const activeStyle = document.createElement('style');
activeStyle.textContent = `
    .nav-link.active {
        color: var(--accent-bright);
    }

    .nav-link.active::after {
        width: 80%;
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
const tags = document.querySelectorAll('.tag');

tags.forEach((tag, index) => {
    // Staggered fade-in when parent card is visible
    tag.style.opacity = '0';
    tag.style.transform = 'translateY(10px)';
    tag.style.transition = `all 0.3s ease ${index * 0.05}s`;
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
