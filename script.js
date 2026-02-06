// ==================== Wait for DOM to Load ====================
document.addEventListener('DOMContentLoaded', function() {
    
    // ==================== Loading Animation ====================
    const loader = document.getElementById('loader');
    
    window.addEventListener('load', function() {
        setTimeout(() => {
            loader.classList.add('hidden');
        }, 1000);
    });

    // ==================== Navbar Functionality ====================
    const navbar = document.getElementById('navbar');
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Sticky navbar on scroll
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Mobile menu toggle
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Active link on scroll
    window.addEventListener('scroll', function() {
        let current = '';
        const sections = document.querySelectorAll('section');

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.pageYOffset >= sectionTop - 100) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').slice(1) === current) {
                link.classList.add('active');
            }
        });
    });

    // ==================== Theme Toggle ====================
    const themeToggle = document.getElementById('themeToggle');
    const body = document.body;
    const themeIcon = themeToggle.querySelector('i');

    // Check for saved theme preference
    const currentTheme = localStorage.getItem('theme') || 'dark';
    
    if (currentTheme === 'light') {
        body.classList.add('light-theme');
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
    }

    // Theme toggle functionality
    themeToggle.addEventListener('click', function() {
        body.classList.toggle('light-theme');
        
        if (body.classList.contains('light-theme')) {
            themeIcon.classList.remove('fa-moon');
            themeIcon.classList.add('fa-sun');
            localStorage.setItem('theme', 'light');
        } else {
            themeIcon.classList.remove('fa-sun');
            themeIcon.classList.add('fa-moon');
            localStorage.setItem('theme', 'dark');
        }
    });

    // ==================== Typing Effect ====================
    const typingText = document.querySelector('.typing-text');
    const phrases = [
        'Full Stack Developer',
        'Web Developer',
        'Frontend Specialist',
        'Backend Engineer',
        'Problem Solver',
        'Creative Coder'
    ];
    
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    function typeEffect() {
        const currentPhrase = phrases[phraseIndex];
        
        if (isDeleting) {
            typingText.textContent = currentPhrase.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50;
        } else {
            typingText.textContent = currentPhrase.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 100;
        }

        if (!isDeleting && charIndex === currentPhrase.length) {
            // Pause at end of phrase
            typingSpeed = 2000;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            typingSpeed = 500;
        }

        setTimeout(typeEffect, typingSpeed);
    }

    // Start typing effect
    typeEffect();

    // ==================== Scroll Reveal Animation ====================
    const revealElements = document.querySelectorAll('.reveal');

    function revealOnScroll() {
        revealElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            const revealPoint = 100;

            if (elementTop < windowHeight - revealPoint) {
                element.classList.add('active');
            }
        });
    }

    // Initial check on page load
    revealOnScroll();

    // Check on scroll
    window.addEventListener('scroll', revealOnScroll);

    // ==================== Project Filtering ====================
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');

            const filterValue = this.getAttribute('data-filter');

            projectCards.forEach(card => {
                const category = card.getAttribute('data-category');
                
                if (filterValue === 'all' || category === filterValue) {
                    card.classList.remove('hide');
                    // Re-trigger animation
                    card.style.animation = 'none';
                    setTimeout(() => {
                        card.style.animation = '';
                    }, 10);
                } else {
                    card.classList.add('hide');
                }
            });
        });
    });

    // ==================== Smooth Scroll ====================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 80;
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ==================== Scroll to Top Button ====================
    const scrollTopBtn = document.getElementById('scrollTop');

    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 500) {
            scrollTopBtn.classList.add('show');
        } else {
            scrollTopBtn.classList.remove('show');
        }
    });

    scrollTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // ==================== Contact Form ====================
    const contactForm = document.getElementById('contactForm');

    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();

        // Get form values
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;

        // Basic validation
        if (!name || !email || !subject || !message) {
            showNotification('Please fill in all fields', 'error');
            return;
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showNotification('Please enter a valid email address', 'error');
            return;
        }

        // Simulate form submission
        const submitBtn = contactForm.querySelector('.btn');
        const originalText = submitBtn.innerHTML;
        
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;

        // Simulate API call
        setTimeout(() => {
            showNotification('Message sent successfully! I\'ll get back to you soon.', 'success');
            contactForm.reset();
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }, 2000);
    });

    // ==================== Notification System ====================
    function showNotification(message, type = 'success') {
        // Remove existing notification if any
        const existingNotification = document.querySelector('.notification');
        if (existingNotification) {
            existingNotification.remove();
        }

        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
                <span>${message}</span>
            </div>
        `;

        // Add styles
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: ${type === 'success' ? 'rgba(34, 197, 94, 0.9)' : 'rgba(239, 68, 68, 0.9)'};
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 8px;
            backdrop-filter: blur(10px);
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
            z-index: 10000;
            animation: slideInRight 0.3s ease;
            display: flex;
            align-items: center;
            gap: 0.5rem;
            max-width: 400px;
        `;

        document.body.appendChild(notification);

        // Auto remove after 4 seconds
        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 4000);
    }

    // Add notification animations to CSS
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideInRight {
            from {
                transform: translateX(400px);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }

        @keyframes slideOutRight {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(400px);
                opacity: 0;
            }
        }

        .notification-content {
            display: flex;
            align-items: center;
            gap: 0.75rem;
        }

        .notification-content i {
            font-size: 1.5rem;
        }
    `;
    document.head.appendChild(style);

    // ==================== Parallax Effect ====================
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.hero-image');
        
        parallaxElements.forEach(element => {
            const speed = 0.3;
            element.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });

    // ==================== Card Tilt Effect ====================
    const cards = document.querySelectorAll('.glass-card');

    cards.forEach(card => {
        card.addEventListener('mousemove', function(e) {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
        });

        card.addEventListener('mouseleave', function() {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
        });
    });

    // ==================== Dynamic Year in Footer ====================
    const yearElement = document.querySelector('.footer-content p');
    if (yearElement) {
        const currentYear = new Date().getFullYear();
        yearElement.innerHTML = yearElement.innerHTML.replace('2024', currentYear);
    }

    // ==================== Intersection Observer for Better Performance ====================
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, observerOptions);

    // Observe all reveal elements
    revealElements.forEach(element => {
        observer.observe(element);
    });

    // ==================== Keyboard Navigation ====================
    document.addEventListener('keydown', function(e) {
        // Press 'T' to toggle theme
        if (e.key === 't' || e.key === 'T') {
            if (!e.target.matches('input, textarea')) {
                themeToggle.click();
            }
        }

        // Press 'Escape' to close mobile menu
        if (e.key === 'Escape') {
            if (navMenu.classList.contains('active')) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            }
        }
    });

    // ==================== Preload Images ====================
    function preloadImages() {
        const images = document.querySelectorAll('img[data-src]');
        
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.add('loaded');
                    observer.unobserve(img);
                }
            });
        });

        images.forEach(img => imageObserver.observe(img));
    }

    preloadImages();

    // ==================== Console Message ====================
    console.log('%c👋 Hello Developer!', 'color: #667eea; font-size: 24px; font-weight: bold;');
    console.log('%cLooking for something? Feel free to explore the code!', 'color: #764ba2; font-size: 14px;');
    console.log('%cInterested in working together? Let\'s connect!', 'color: #667eea; font-size: 14px;');

    // ==================== Easter Egg ====================
    let konamiCode = [];
    const konamiPattern = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

    document.addEventListener('keydown', function(e) {
        konamiCode.push(e.key);
        konamiCode = konamiCode.slice(-10);

        if (konamiCode.join(',') === konamiPattern.join(',')) {
            activateEasterEgg();
            konamiCode = [];
        }
    });

    function activateEasterEgg() {
        // Create confetti effect
        const confettiColors = ['#667eea', '#764ba2', '#f093fb', '#f5576c', '#4facfe'];
        const confettiCount = 100;

        for (let i = 0; i < confettiCount; i++) {
            createConfetti(confettiColors);
        }

        showNotification('🎉 Konami Code activated! You found the easter egg!', 'success');
    }

    function createConfetti(colors) {
        const confetti = document.createElement('div');
        confetti.style.cssText = `
            position: fixed;
            width: 10px;
            height: 10px;
            background: ${colors[Math.floor(Math.random() * colors.length)]};
            left: ${Math.random() * 100}vw;
            top: -10px;
            opacity: 1;
            pointer-events: none;
            z-index: 10000;
            animation: confettiFall ${2 + Math.random() * 3}s linear forwards;
        `;
        
        document.body.appendChild(confetti);

        setTimeout(() => {
            confetti.remove();
        }, 5000);
    }

    // Add confetti animation
    const confettiStyle = document.createElement('style');
    confettiStyle.textContent = `
        @keyframes confettiFall {
            to {
                transform: translateY(100vh) rotate(${Math.random() * 360}deg);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(confettiStyle);

    // ==================== Performance Monitoring ====================
    if ('PerformanceObserver' in window) {
        const perfObserver = new PerformanceObserver((list) => {
            for (const entry of list.getEntries()) {
                if (entry.duration > 50) {
                    console.warn('Long task detected:', entry.name, entry.duration + 'ms');
                }
            }
        });

        try {
            perfObserver.observe({ entryTypes: ['measure'] });
        } catch (e) {
            // Observer not supported
        }
    }

    // ==================== Accessibility Improvements ====================
    // Skip to main content link
    const skipLink = document.createElement('a');
    skipLink.href = '#about';
    skipLink.className = 'skip-link';
    skipLink.textContent = 'Skip to main content';
    skipLink.style.cssText = `
        position: absolute;
        top: -40px;
        left: 0;
        background: var(--accent-primary);
        color: white;
        padding: 8px;
        text-decoration: none;
        z-index: 10000;
    `;

    skipLink.addEventListener('focus', function() {
        this.style.top = '0';
    });

    skipLink.addEventListener('blur', function() {
        this.style.top = '-40px';
    });

    document.body.insertBefore(skipLink, document.body.firstChild);

    // Announce page changes for screen readers
    function announceForScreenReader(message) {
        const announcement = document.createElement('div');
        announcement.setAttribute('role', 'status');
        announcement.setAttribute('aria-live', 'polite');
        announcement.className = 'sr-only';
        announcement.textContent = message;
        announcement.style.cssText = `
            position: absolute;
            width: 1px;
            height: 1px;
            padding: 0;
            margin: -1px;
            overflow: hidden;
            clip: rect(0, 0, 0, 0);
            white-space: nowrap;
            border: 0;
        `;
        
        document.body.appendChild(announcement);
        
        setTimeout(() => {
            announcement.remove();
        }, 1000);
    }

    // ==================== Service Worker Registration ====================
    // Uncomment this section if you want to add PWA capabilities
    /*
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('/sw.js')
                .then(registration => {
                    console.log('ServiceWorker registered:', registration);
                })
                .catch(error => {
                    console.log('ServiceWorker registration failed:', error);
                });
        });
    }
    */

    // ==================== Analytics (Placeholder) ====================
    // Add your analytics tracking code here
    function trackEvent(category, action, label) {
        // Example: Google Analytics
        // gtag('event', action, {
        //     'event_category': category,
        //     'event_label': label
        // });
        
        console.log('Event tracked:', category, action, label);
    }

    // Track button clicks
    document.querySelectorAll('.btn').forEach(button => {
        button.addEventListener('click', function() {
            const buttonText = this.textContent.trim();
            trackEvent('Button', 'Click', buttonText);
        });
    });

    // ==================== Log Page Load Time ====================
    window.addEventListener('load', function() {
        const loadTime = performance.timing.domContentLoadedEventEnd - performance.timing.navigationStart;
        console.log('Page loaded in', loadTime + 'ms');
    });

    // ==================== Initialize Complete ====================
    console.log('✅ Portfolio initialized successfully!');
});
