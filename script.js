/**
 * LIKITH'S PORTFOLIO - Cinematic Animations
 * Smooth, elegant transitions without flickering
 */

// ===================================
// SMOOTH NAVIGATION
// ===================================
const navbar = document.getElementById('navbar');
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const navLinks = document.getElementById('navLinks');

// Navbar scroll effect with smooth transition
let lastScrollY = 0;
let ticking = false;

function updateNavbar() {
    const scrollY = window.scrollY;

    if (scrollY > 80) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    lastScrollY = scrollY;
    ticking = false;
}

window.addEventListener('scroll', () => {
    if (!ticking) {
        requestAnimationFrame(updateNavbar);
        ticking = true;
    }
}, { passive: true });

// Mobile menu
mobileMenuBtn?.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    mobileMenuBtn.classList.toggle('active');
});

// Close mobile menu on link click
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        mobileMenuBtn.classList.remove('active');
    });
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));

        if (target) {
            const headerOffset = 100;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.scrollY - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ===================================
// CINEMATIC SCROLL REVEAL
// ===================================
const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Add slight delay for cinematic effect
            setTimeout(() => {
                entry.target.classList.add('active');
            }, 100);
        }
    });
}, {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
});

revealElements.forEach(el => revealObserver.observe(el));

// ===================================
// STAGGERED ANIMATIONS
// ===================================
const staggerContainers = document.querySelectorAll('.stagger-children');

const staggerObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const children = entry.target.children;
            Array.from(children).forEach((child, index) => {
                child.style.transitionDelay = `${index * 0.12}s`;
                child.classList.add('stagger-visible');
            });
            entry.target.classList.add('active');
        }
    });
}, {
    threshold: 0.2
});

staggerContainers.forEach(el => staggerObserver.observe(el));

// ===================================
// COUNTING ANIMATION FOR STATS
// ===================================
const statNumbers = document.querySelectorAll('.stat-number[data-count]');

function easeOutQuart(t) {
    return 1 - Math.pow(1 - t, 4);
}

function animateCount(element, target) {
    const duration = 2000;
    const start = performance.now();

    function update(currentTime) {
        const elapsed = currentTime - start;
        const progress = Math.min(elapsed / duration, 1);
        const easedProgress = easeOutQuart(progress);
        const current = Math.floor(easedProgress * target);

        element.textContent = current.toLocaleString() + '+';

        if (progress < 1) {
            requestAnimationFrame(update);
        }
    }

    requestAnimationFrame(update);
}

const countObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const target = parseInt(entry.target.dataset.count);
            animateCount(entry.target, target);
            countObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

statNumbers.forEach(num => countObserver.observe(num));

// ===================================
// SMOOTH CARD HOVER EFFECTS
// ===================================
const cards = document.querySelectorAll('.project-card, .skill-card');

cards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-12px)';
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = '';
    });
});

// ===================================
// TIMELINE ANIMATION
// ===================================
const timelineItems = document.querySelectorAll('.timeline-item');

const timelineObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.classList.add('active');
            }, index * 150);
        }
    });
}, {
    threshold: 0.3
});

timelineItems.forEach(item => timelineObserver.observe(item));

// ===================================
// CONTACT FORM
// ===================================
const contactForm = document.getElementById('contactForm');

contactForm?.addEventListener('submit', async (e) => {
    e.preventDefault();

    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalHTML = submitBtn.innerHTML;

    // Loading state
    submitBtn.innerHTML = '<span>Sending...</span>';
    submitBtn.disabled = true;
    submitBtn.style.opacity = '0.7';

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Success state
    submitBtn.innerHTML = '<span>Message Sent! ✓</span>';
    submitBtn.style.background = 'linear-gradient(135deg, #10b981 0%, #059669 100%)';

    contactForm.reset();

    setTimeout(() => {
        submitBtn.innerHTML = originalHTML;
        submitBtn.style.background = '';
        submitBtn.style.opacity = '';
        submitBtn.disabled = false;
    }, 3000);
});

// ===================================
// PAGE LOAD ANIMATION
// ===================================
document.addEventListener('DOMContentLoaded', () => {
    document.body.classList.add('loaded');

    // Animate hero elements with cinema-style timing
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        heroContent.style.opacity = '0';
        heroContent.style.transform = 'translateY(30px)';

        setTimeout(() => {
            heroContent.style.transition = 'opacity 1s ease, transform 1s ease';
            heroContent.style.opacity = '1';
            heroContent.style.transform = 'translateY(0)';
        }, 200);
    }
});

// ===================================
// KEYBOARD ACCESSIBILITY
// ===================================
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        navLinks.classList.remove('active');
        mobileMenuBtn.classList.remove('active');
    }
});

console.log('%c✨ Portfolio loaded beautifully', 'color: #8b5cf6; font-size: 14px;');
