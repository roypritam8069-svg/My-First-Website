// ROYGREEN BOTANICALS - JAVASCRIPT
// Keep CSS in style.css only. This file must contain JavaScript only.
document.addEventListener('DOMContentLoaded', function () {
    // ---------- PRELOADER ----------
    const preloader = document.getElementById('preloader');

    if (preloader) {
        window.setTimeout(function () {
            preloader.classList.add('hide');

            window.setTimeout(function () {
                preloader.style.display = 'none';
            }, 500);
        }, 500);
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

    if (localStorage.getItem('theme') === 'dark') {
        body.classList.add('dark-mode');
        if (themeBtn) {
            themeBtn.innerHTML = '<i class="fa-solid fa-sun"></i>';
        }
    }

    if (themeBtn) {
        themeBtn.addEventListener('click', function () {
            body.classList.toggle('dark-mode');
            const isDark = body.classList.contains('dark-mode');

            localStorage.setItem('theme', isDark ? 'dark' : 'light');
            this.innerHTML = isDark
                ? '<i class="fa-solid fa-sun"></i>'
                : '<i class="fa-solid fa-moon"></i>';
        });
    }

    // ---------- MOBILE MENU ----------
    const menuBtn = document.getElementById('menuBtn');
    const navMenu = document.querySelector('.nav-menu');

    if (menuBtn && navMenu) {
        menuBtn.addEventListener('click', function () {
            navMenu.classList.toggle('active');
            const icon = this.querySelector('i');

            if (icon) {
                icon.className = navMenu.classList.contains('active')
                    ? 'fa-solid fa-xmark'
                    : 'fa-solid fa-bars';
            }
        });

        navMenu.querySelectorAll('a').forEach(function (link) {
            link.addEventListener('click', function () {
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

    window.addEventListener('scroll', function () {
        if (header) {
            header.classList.toggle('scrolled', window.scrollY > 50);
        }
    });

    // ---------- COUNTER ANIMATION ----------
    function animateCounter(counter) {
        const target = Number.parseInt(counter.textContent, 10);
        if (Number.isNaN(target)) return;

        let current = 0;
        const increment = Math.ceil(target / 60);
        const timer = window.setInterval(function () {
            current += increment;
            counter.textContent = String(Math.min(current, target));

            if (current >= target) {
                window.clearInterval(timer);
            }
        }, 33);
    }

    if ('IntersectionObserver' in window) {
        const counterObserver = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    animateCounter(entry.target);
                    counterObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5, rootMargin: '0px' });

        document.querySelectorAll('.counter').forEach(function (counter) {
            counterObserver.observe(counter);
        });
    }

    // ---------- FAQ ACCORDION ----------
    const faqQuestions = document.querySelectorAll('.faq-question');

    faqQuestions.forEach(function (question) {
        question.addEventListener('click', function () {
            const answer = this.nextElementSibling;
            if (!answer) return;

            faqQuestions.forEach(function (otherQuestion) {
                if (otherQuestion !== question) {
                    otherQuestion.classList.remove('active');
                    const otherAnswer = otherQuestion.nextElementSibling;
                    if (otherAnswer) otherAnswer.classList.remove('open');
                }
            });

            this.classList.toggle('active');
            answer.classList.toggle('open');
        });
    });

    // ---------- FORMS ----------
    const newsletterForm = document.querySelector('.newsletter-wrapper form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function (event) {
            event.preventDefault();
            const input = this.querySelector('input[type="email"]');
            if (input && input.value.trim()) {
                alert('Thank you for subscribing to our newsletter! 🌿');
                input.value = '';
            }
        });
    }

    const contactForm = document.querySelector('.contact-form form');
    if (contactForm) {
        contactForm.addEventListener('submit', function (event) {
            event.preventDefault();
            alert('Thank you for your message! We will get back to you soon. 🌿');
            this.reset();
        });
    }

    // ---------- SCROLL TO TOP ----------
    const scrollBtn = document.getElementById('scrollTop');

    window.addEventListener('scroll', function () {
        if (scrollBtn) {
            scrollBtn.classList.toggle('visible', window.scrollY > 400);
        }
    });

    if (scrollBtn) {
        scrollBtn.addEventListener('click', function () {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // ---------- ORDER POPUP ----------
    const popup = document.getElementById('orderPopup');
    const closePopup = document.querySelector('.close-popup');

    if (closePopup && popup) {
        closePopup.addEventListener('click', function () {
            popup.classList.remove('active');
        });
    }

    if (popup) {
        popup.addEventListener('click', function (event) {
            if (event.target === popup) {
                popup.classList.remove('active');
            }
        });
    }

    // ---------- IMAGE LIGHTBOX ----------
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightboxImg');
    const closeLightbox = document.getElementById('closeLightbox');

    document.querySelectorAll('.gallery-item img').forEach(function (image) {
        image.addEventListener('click', function () {
            if (lightbox && lightboxImg) {
                lightboxImg.src = this.currentSrc || this.src;
                lightbox.classList.add('active');
                body.style.overflow = 'hidden';
            }
        });
    });

    function closeGalleryLightbox() {
        if (lightbox) lightbox.classList.remove('active');
        body.style.overflow = '';
    }

    if (closeLightbox) {
        closeLightbox.addEventListener('click', closeGalleryLightbox);
    }

    if (lightbox) {
        lightbox.addEventListener('click', function (event) {
            if (event.target === lightbox) closeGalleryLightbox();
        });
    }

    document.addEventListener('keydown', function (event) {
        if (event.key === 'Escape' && lightbox && lightbox.classList.contains('active')) {
            closeGalleryLightbox();
        }
    });

    // ---------- COOKIE CONSENT ----------
    const cookieBox = document.querySelector('.cookie-box');
    const acceptBtn = document.getElementById('acceptCookie');

    if (cookieBox && acceptBtn) {
        if (!localStorage.getItem('cookieAccepted')) {
            window.setTimeout(function () {
                cookieBox.classList.add('show');
            }, 2000);
        }

        acceptBtn.addEventListener('click', function () {
            localStorage.setItem('cookieAccepted', 'true');
            cookieBox.classList.remove('show');
        });
    }

    // ---------- SMOOTH SCROLL ----------
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
        anchor.addEventListener('click', function (event) {
            const href = this.getAttribute('href');
            if (!href || href === '#') return;

            const targetElement = document.querySelector(href);
            if (!targetElement) return;

            event.preventDefault();
            const headerHeight = header ? header.offsetHeight : 80;
            window.scrollTo({
                top: targetElement.offsetTop - headerHeight,
                behavior: 'smooth'
            });
        });
    });

    // ---------- NAVIGATION ACTIVE LINK ----------
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-menu a');

    if (sections.length && navLinks.length) {
        window.addEventListener('scroll', function () {
            const scrollPos = window.scrollY + 120;
            let current = '';

            sections.forEach(function (section) {
                if (scrollPos >= section.offsetTop && scrollPos < section.offsetTop + section.offsetHeight) {
                    current = section.id;
                }
            });

            navLinks.forEach(function (link) {
                link.classList.toggle('active', link.getAttribute('href') === '#' + current);
            });
        });
    }

    // ---------- HERO IMAGE PARALLAX ----------
    const heroImage = document.querySelector('.hero-image img');
    const hero = document.querySelector('.hero');

    if (heroImage && hero) {
        window.addEventListener('scroll', function () {
            if (window.innerWidth <= 768 || window.scrollY >= hero.offsetHeight) return;
            heroImage.style.transform = 'translateY(' + (window.scrollY * 0.1) + 'px)';
        });
    }
});
