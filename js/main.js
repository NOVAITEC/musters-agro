/**
 * Main JavaScript for Musters Agro Website
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Initialize Lucide Icons
    lucide.createIcons();

    // 2. Mobile Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');
    const menuIcon = menuToggle.querySelector('i');

    // Create overlay element dynamically
    const overlay = document.createElement('div');
    overlay.className = 'mobile-menu-overlay';
    document.body.appendChild(overlay);

    let isMenuOpen = false;

    function toggleMenu() {
        isMenuOpen = !isMenuOpen;
        mobileMenu.classList.toggle('open');
        overlay.classList.toggle('open');

        // Change icon between menu and close
        if (isMenuOpen) {
            menuIcon.setAttribute('data-lucide', 'x');
            document.body.style.overflow = 'hidden'; // Prevent scrolling
        } else {
            menuIcon.setAttribute('data-lucide', 'menu');
            document.body.style.overflow = '';
        }
        lucide.createIcons();
    }

    menuToggle.addEventListener('click', toggleMenu);
    overlay.addEventListener('click', () => {
        if (isMenuOpen) toggleMenu();
    });

    // Close mobile menu when a link is clicked
    const mobileLinks = document.querySelectorAll('.mobile-link');
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (isMenuOpen) toggleMenu();
        });
    });

    // 3. Header Scroll Effect
    const header = document.querySelector('.header');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // 4. Smooth Scrolling for Anchor Links (fallback for browsers without CSS smooth scroll)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // 5. Scroll Reveal Animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.animate-up, .process-steps .step, .services-grid .service-card');

    animatedElements.forEach((el, index) => {
        if (!el.classList.contains('animate-up')) {
            el.classList.add('animate-up');
            // Add staggered delay
            const delayClass = `delay-${(index % 4) + 1}`;
            el.classList.add(delayClass);
        }
        observer.observe(el);
    });
});
