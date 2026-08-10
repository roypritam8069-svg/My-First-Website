// ============================
// ROYGREEN BOTANICALS - JAVASCRIPT
// ============================
document.addEventListener("DOMContentLoaded", function () {

    const preloader = document.getElementById("preloader");

    if (preloader) {
        setTimeout(function () {
            preloader.style.opacity = "0";

            setTimeout(function () {
                preloader.style.display = "none";
            }, 500);

        }, 500);
    }

});
document.addEventListener('DOMContentLoaded', function() {

    // ---------- PRELOADER ----------

    const preloader = document.getElementById('preloader');

    if (preloader) {
        setTimeout(() => {
            preloader.classList.add('hide');
        }, 1500);
    }

    // ---------- AOS ANIMATION ----------

    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            easing: 'ease-in-out',
            once: true,
            offset: 100
        });
    }

    // ---------- THEME TOGGLE ----------

    const themeBtn = document.getElementById('themeBtn');
    const body = document.body;

    // Check saved theme
    if (localStorage.getItem('theme') === 'dark') {
        body.classList.add('dark-mode');
        if (themeBtn) {
            themeBtn.innerHTML = '<i class="fa-solid fa-sun"></i>';
        }
    }

    if (themeBtn) {
        themeBtn.addEventListener('click', function() {
            body.classList.toggle('dark-mode');

            if (body.classList.contains('dark-mode')) {
                localStorage.setItem('theme', 'dark');
                this.innerHTML = '<i class="fa-solid fa-sun"></i>';
            } else {
                localStorage.setItem('theme', 'light');
                this.innerHTML = '<i class="fa-solid fa-moon"></i>';
            }
        });
    }

    // ---------- MOBILE MENU ----------

    const menuBtn = document.getElementById('menuBtn');
    const navMenu = document.querySelector('.nav-menu');

    if (menuBtn && navMenu) {
        menuBtn.addEventListener('click', function() {
            navMenu.classList.toggle('active');

            const icon = this.querySelector('i');
            if (navMenu.classList.contains('active')) {
                icon.className = 'fa-solid fa-xmark';
            } else {
                icon.className = 'fa-solid fa-bars';
            }
        });

        // Close menu on link click
        navMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                const icon = menuBtn.querySelector('i');
                if (icon) {
                    icon.className = 'fa-solid fa-bars';
                }
            });
        });
    }

    // ---------- HEADER SCROLL ----------

    const header = document.querySelector('.header');

    if (header) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }

    // ---------- COUNTER ANIMATION ----------

    const counters = document.querySelectorAll('.counter');

    function animateCounter(counter) {
        const target = parseInt(counter.textContent);
        let current = 0;
        const increment = Math.ceil(target / 60);
        const duration = 2000;
        const stepTime = Math.floor(duration / 60);

        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                counter.textContent = target;
                clearInterval(timer);
            } else {
                counter.textContent = current;
            }
        }, stepTime);
    }

    // Intersection Observer for counters
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px'
    };

    const counterObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                animateCounter(counter);
                counterObserver.unobserve(counter);
            }
        });
    }, observerOptions);

    counters.forEach(counter => {
        counterObserver.observe(counter);
    });

    // ---------- FAQ ACCORDION ----------

    const faqQuestions = document.querySelectorAll('.faq-question');

    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            const answer = this.nextElementSibling;
            const icon = this.querySelector('i');

            // Close other FAQs
            faqQuestions.forEach(q => {
                if (q !== this) {
                    q.classList.remove('active');
                    q.nextElementSibling.classList.remove('open');
                }
            });

            // Toggle current FAQ
            this.classList.toggle('active');
            answer.classList.toggle('open');
        });
    });

    // ---------- NEWSLETTER FORM ----------

    const newsletterForm = document.querySelector('.newsletter-wrapper form');

    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const input = this.querySelector('input[type="email"]');
            if (input && input.value.trim()) {
                alert('Thank you for subscribing to our newsletter! 🌿');
                input.value = '';
            }
        });
    }

    // ---------- CONTACT FORM ----------

    const contactForm = document.querySelector('.contact-form form');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Thank you for your message! We will get back to you soon. 🌿');
            this.reset();
        });
    }

    // ---------- SCROLL TO TOP ----------

    const scrollBtn = document.getElementById('scrollTop');

    if (scrollBtn) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 400) {
                scrollBtn.classList.add('visible');
            } else {
                scrollBtn.classList.remove('visible');
            }
        });

        scrollBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // ---------- ORDER POPUP ----------

    const popup = document.getElementById('orderPopup');
    const closePopup = document.querySelector('.close-popup');

    // Close popup
    if (closePopup && popup) {
        closePopup.addEventListener('click', function() {
            popup.classList.remove('active');
        });
    }

    // Close on overlay click
    if (popup) {
        popup.addEventListener('click', function(e) {
            if (e.target === this) {
                this.classList.remove('active');
            }
        });
    }

    // ---------- IMAGE LIGHTBOX ----------

    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightboxImg');
    const closeLightbox = document.getElementById('closeLightbox');

    // Gallery images
    const galleryImages = document.querySelectorAll('.gallery-item img');

    galleryImages.forEach(img => {
        img.style.cursor = 'pointer';
        img.addEventListener('click', function() {
            if (lightbox && lightboxImg) {
                lightboxImg.src = this.src;
                lightbox.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        });
    });

    // Close lightbox
    if (closeLightbox && lightbox) {
        closeLightbox.addEventListener('click', function() {
            lightbox.classList.remove('active');
            document.body.style.overflow = 'auto';
        });
    }

    if (lightbox) {
        lightbox.addEventListener('click', function(e) {
            if (e.target === this) {
                this.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        });
    }

    // Close with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && lightbox && lightbox.classList.contains('active')) {
            lightbox.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });

    // ---------- COOKIE CONSENT ----------

    const cookieBox = document.querySelector('.cookie-box');
    const acceptBtn = document.getElementById('acceptCookie');

    if (cookieBox && acceptBtn) {
        // Check if cookie already accepted
        if (!localStorage.getItem('cookieAccepted')) {
            setTimeout(() => {
                cookieBox.classList.add('show');
            }, 2000);
        }

        acceptBtn.addEventListener('click', function() {
            localStorage.setItem('cookieAccepted', 'true');
            cookieBox.classList.remove('show');
        });
    }

    // ---------- SMOOTH SCROLL ----------

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');

            if (href === '#') return;

            e.preventDefault();

            const targetElement = document.querySelector(href);
            if (targetElement) {
                const headerHeight = header ? header.offsetHeight : 80;
                const targetPosition = targetElement.offsetTop - headerHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ---------- NAVIGATION ACTIVE LINK ----------

    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-menu a');

    if (sections.length && navLinks.length) {
        window.addEventListener('scroll', function() {
            let current = '';
            const scrollPos = window.scrollY + 120;

            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.offsetHeight;

                if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                    current = section.getAttribute('id');
                }
            });

            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${current}`) {
                    link.classList.add('active');
                }
            });
        });
    }

    // ---------- HERO IMAGE PARALLAX ----------

    const heroImage = document.querySelector('.hero-image img');

    if (heroImage) {
        window.addEventListener('scroll', function() {
            const scrolled = window.scrollY;
            const hero = document.querySelector('.hero');
            if (hero && window.innerWidth > 768) {
                const heroHeight = hero.offsetHeight;
                if (scrolled < heroHeight) {
                    const speed = 0.1;
                    heroImage.style.transform = `translateY(${scrolled * speed}px)`;
                }
            }
        });
    }

});
/* Order Popup - Hidden by default */
.popup-overlay {
    opacity: 0 !important;
    visibility: hidden !important;
    pointer-events: none !important;
}

/* Only show when JavaScript adds active */
.popup-overlay.active {
    opacity: 1 !important;
    visibility: visible !important;
    pointer-events: auto !important;
}
