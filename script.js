/**
 * PORTFOLIO WEBSITE JAVASCRIPT
 * Author: Pratik Abhang
 * Version: 2.1 - Clean & Optimized
 * Description: Handles theme switching, animations, form submission, and interactive elements
 */

(function () {
  'use strict';

  // ===========================================
  // UTILITY FUNCTIONS
  // ===========================================

  const $ = (selector, context = document) => context.querySelector(selector);
  const $$ = (selector, context = document) => Array.from(context.querySelectorAll(selector));

  // Check for reduced motion preference
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // ===========================================
  // DOM READY
  // ===========================================

  document.addEventListener('DOMContentLoaded', function () {

    // ===========================================
    // LOADING SCREEN
    // ===========================================

    const loader = $('#loader');

    window.addEventListener('load', function () {
      document.body.classList.add('loaded');
      if (loader) {
        setTimeout(() => {
          loader.style.display = 'none';
        }, 500);
      }
    });

    // Fallback: Hide loader after 3 seconds max
    setTimeout(() => {
      document.body.classList.add('loaded');
      if (loader && loader.style.display !== 'none') {
        loader.style.display = 'none';
      }
    }, 3000);

    // ===========================================
    // MOBILE MENU TOGGLE FUNCTIONALITY
    // ===========================================

    const menuLinks = $('.menu-links');
    const hamburgerIcon = $('.hamburger-icon');

    window.toggleMenu = function () {
      if (!menuLinks || !hamburgerIcon) return;

      menuLinks.classList.toggle('open');
      hamburgerIcon.classList.toggle('open');

      const isExpanded = menuLinks.classList.contains('open');
      hamburgerIcon.setAttribute('aria-expanded', isExpanded);

      // Prevent body scroll when menu is open
      document.body.style.overflow = isExpanded ? 'hidden' : '';
    };

    // Close menu when clicking outside
    document.addEventListener('click', function (e) {
      if (menuLinks && menuLinks.classList.contains('open')) {
        const isClickInsideMenu = menuLinks.contains(e.target);
        const isClickOnHamburger = hamburgerIcon && hamburgerIcon.contains(e.target);

        if (!isClickInsideMenu && !isClickOnHamburger) {
          menuLinks.classList.remove('open');
          hamburgerIcon.classList.remove('open');
          hamburgerIcon.setAttribute('aria-expanded', 'false');
          document.body.style.overflow = '';
        }
      }
    });

    // Close menu on escape key
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && menuLinks && menuLinks.classList.contains('open')) {
        menuLinks.classList.remove('open');
        hamburgerIcon.classList.remove('open');
        hamburgerIcon.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
        hamburgerIcon.focus();
      }
    });

    // ===========================================
    // THEME SWITCHING FUNCTIONALITY
    // ===========================================

    const themeSwitch = $('#theme-switch-nav');
    const colorOptions = $$('.color-option-nav');

    // Get saved preferences or defaults
    const savedTheme = localStorage.getItem('theme') || 'light';
    const savedColor = localStorage.getItem('color') || 'black';

    // Apply saved theme on page load
    function applyTheme(theme) {
      document.documentElement.setAttribute('data-theme', theme);
      if (themeSwitch) {
        themeSwitch.checked = theme === 'dark';
      }
      localStorage.setItem('theme', theme);
    }

    // Apply saved color on page load
    function applyColor(color) {
      document.documentElement.setAttribute('data-color', color);
      localStorage.setItem('color', color);

      // Update active state on color options
      colorOptions.forEach(opt => {
        opt.classList.toggle('active', opt.getAttribute('data-color') === color);
      });
    }

    // Initialize theme and color
    applyTheme(savedTheme);
    applyColor(savedColor);

    // Theme switch event listener
    if (themeSwitch) {
      themeSwitch.addEventListener('change', function () {
        applyTheme(this.checked ? 'dark' : 'light');
        syncArrowColor();
      });
    }

    // Color options event listeners
    colorOptions.forEach(option => {
      option.addEventListener('click', function () {
        const color = this.getAttribute('data-color');
        applyColor(color);
        syncArrowColor();
      });
    });

    // ===========================================
    // HEADER SCROLL EFFECT
    // ===========================================

    const header = $('#header');

    function handleHeaderScroll() {
      if (!header) return;

      if (window.scrollY > 50) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }

    window.addEventListener('scroll', handleHeaderScroll, { passive: true });

    // ===========================================
    // TYPED.JS ANIMATION
    // ===========================================

    const typedElement = $('#typed-text');

    if (typedElement && typeof Typed !== 'undefined') {
      new Typed('#typed-text', {
        strings: [
          "Passionate Computer Engineer",
          "Full Stack Developer",
          "Creative Web Developer",
          "Software Developer",
          "Data Analyst",
          "Cloud Computing Enthusiast",
          "Artificial Intelligence Explorer",
          "Cybersecurity Specialist",
          "Data Protection Expert",
          "System Design Architect"
        ],
        typeSpeed: 80,
        backSpeed: 40,
        backDelay: 800,
        startDelay: 400,
        loop: true,
        showCursor: true,
        cursorChar: "|",
        smartBackspace: true
      });
    }

    // ===========================================
    // DATE AND TIME DISPLAY
    // ===========================================

    const dateElement = $('#current-date');
    const timeElement = $('#current-time');

    function updateDateTime() {
      if (!dateElement || !timeElement) return;

      const now = new Date();
      const dateOptions = { day: 'numeric', month: 'long', year: 'numeric' };
      const formattedDate = now.toLocaleDateString('en-GB', dateOptions);
      const formattedTime = now.toLocaleTimeString('en-GB', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
      });

      dateElement.textContent = formattedDate;
      timeElement.textContent = formattedTime;
    }

    // Update immediately and then every second
    updateDateTime();
    setInterval(updateDateTime, 1000);

    // ===========================================
    // SMOOTH SCROLLING FOR ANCHOR LINKS
    // ===========================================

    $$('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href');

        if (targetId === '#' || targetId.length <= 1) return;

        const targetElement = $(targetId);

        if (targetElement) {
          e.preventDefault();

          const headerHeight = header ? header.offsetHeight : 0;
          const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - headerHeight;

          if (prefersReducedMotion) {
            window.scrollTo(0, targetPosition);
          } else {
            smoothScrollTo(targetPosition, 800);
          }

          // Update URL hash without jumping
          history.pushState(null, '', targetId);
        }
      });
    });

    /**
     * Custom smooth scroll with easing
     */
    function smoothScrollTo(targetPosition, duration) {
      const start = window.scrollY;
      const distance = targetPosition - start;
      let startTime = null;

      function easeInOutCubic(t) {
        return t < 0.5
          ? 4 * t * t * t
          : 1 - Math.pow(-2 * t + 2, 3) / 2;
      }

      function animation(currentTime) {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const progress = Math.min(timeElapsed / duration, 1);
        const eased = easeInOutCubic(progress);

        window.scrollTo(0, start + distance * eased);

        if (timeElapsed < duration) {
          requestAnimationFrame(animation);
        } else {
          window.scrollTo(0, targetPosition);
        }
      }

      requestAnimationFrame(animation);
    }

    // ===========================================
    // CONTACT FORM SUBMISSION
    // ===========================================

    const form = $('#contactForm');
    const sendBtn = $('#sendBtn');

    if (form && sendBtn) {
      form.addEventListener('submit', async function (e) {
        e.preventDefault();

        // Validate form
        if (!form.checkValidity()) {
          form.reportValidity();
          return;
        }

        // Get form status element
        const formStatus = $('.form-status', form);

        // Button elements
        const btnIcon = $('.btn-icon i', sendBtn);
        const btnText = $('.btn-text', sendBtn);

        // Store original content
        const originalIconClass = btnIcon ? btnIcon.className : 'fas fa-paper-plane';
        const originalText = btnText ? btnText.textContent : 'Send Message';

        // Start loading state
        sendBtn.disabled = true;
        sendBtn.classList.add('sending');

        if (btnIcon) btnIcon.className = 'fas fa-spinner fa-spin';
        if (btnText) btnText.textContent = 'Sending...';

        if (formStatus) {
          formStatus.textContent = '';
          formStatus.className = 'form-status';
        }

        try {
          const formData = new FormData(form);
          const response = await fetch(form.action, {
            method: 'POST',
            body: formData,
            headers: { 'Accept': 'application/json' }
          });

          if (response.ok) {
            if (formStatus) {
              formStatus.textContent = '✓ Message sent successfully! I\'ll get back to you soon.';
              formStatus.classList.add('success', 'show');
            }
            form.reset();
          } else {
            throw new Error('Form submission failed');
          }
        } catch (error) {
          console.error('Form submission error:', error);
          if (formStatus) {
            formStatus.textContent = '✗ Oops! There was a problem. Please try again or email me directly.';
            formStatus.classList.add('error', 'show');
          }
        } finally {
          // Reset button
          sendBtn.disabled = false;
          sendBtn.classList.remove('sending');

          if (btnIcon) btnIcon.className = originalIconClass;
          if (btnText) btnText.textContent = originalText;

          // Auto-hide status after 6 seconds
          if (formStatus) {
            setTimeout(() => {
              formStatus.classList.remove('show');
            }, 6000);
          }
        }
      });

      // Real-time validation feedback
      $$('input, textarea', form).forEach(field => {
        field.addEventListener('blur', function () {
          if (this.value && !this.checkValidity()) {
            this.style.borderColor = '#e74c3c';
          } else {
            this.style.borderColor = '';
          }
        });

        field.addEventListener('input', function () {
          if (this.checkValidity()) {
            this.style.borderColor = '';
          }
        });
      });
    }

    // ===========================================
    // AGE CALCULATION
    // ===========================================

    function calculateAge(birthDate) {
      const today = new Date();
      let ageYears = today.getFullYear() - birthDate.getFullYear();
      let ageMonths = today.getMonth() - birthDate.getMonth();
      let ageDays = today.getDate() - birthDate.getDate();

      if (ageDays < 0) {
        ageMonths--;
        ageDays += new Date(today.getFullYear(), today.getMonth(), 0).getDate();
      }

      if (ageMonths < 0) {
        ageYears--;
        ageMonths += 12;
      }

      return { years: ageYears, months: ageMonths, days: ageDays };
    }

    const ageElement = $('#age');
    if (ageElement) {
      const birthDate = new Date('2003-11-21');
      const age = calculateAge(birthDate);
      ageElement.textContent = `${age.years} years, ${age.months} months, ${age.days} days old`;
    }

    // ===========================================
    // SKILLS FILTER
    // ===========================================

    const filterBtns = $$('.filter-btn');
    const skillCards = $$('.skill-card');

    filterBtns.forEach(btn => {
      btn.addEventListener('click', function () {
        const filter = this.getAttribute('data-filter');

        // Update active button
        filterBtns.forEach(b => b.classList.remove('active'));
        this.classList.add('active');

        // Filter skill cards
        skillCards.forEach(card => {
          const category = card.getAttribute('data-category');

          if (filter === 'all' || category === filter) {
            card.classList.remove('hidden');
            card.style.animation = 'fadeInUp 0.5s ease forwards';
          } else {
            card.classList.add('hidden');
          }
        });
      });
    });

    // ===========================================
    // SCROLL ANIMATION FOR ELEMENTS
    // ===========================================

    const animatedElements = $$(
      '.about-card, .details-card, .education-card, ' +
      '.skill-card, .project-card, .experience-card'
    );

    // Set initial state for animation
    animatedElements.forEach(element => {
      if (!prefersReducedMotion) {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
      }
    });

    // Intersection Observer for better performance
    const observerOptions = {
      root: null,
      rootMargin: '0px 0px -50px 0px',
      threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          const element = entry.target;

          // Add stagger delay based on index
          const delay = Math.min(index * 0.1, 0.5);

          setTimeout(() => {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
            element.classList.add('animate');
          }, prefersReducedMotion ? 0 : delay * 1000);

          observer.unobserve(element);
        }
      });
    }, observerOptions);

    animatedElements.forEach(element => {
      observer.observe(element);
    });

    // ===========================================
    // SECTION NAVIGATION BUTTONS
    // ===========================================

    const sections = ['home', 'about', 'skills', 'experience', 'projects', 'contact'];
    const upBtn = $('.up-btn');
    const downBtn = $('.down-btn');

    function getCurrentSectionIndex() {
      const scrollPos = window.scrollY + window.innerHeight / 2;

      for (let i = 0; i < sections.length; i++) {
        const section = $('#' + sections[i]);
        if (section) {
          const top = section.offsetTop;
          const bottom = top + section.offsetHeight;

          if (scrollPos >= top && scrollPos < bottom) {
            return i;
          }
        }
      }
      return 0;
    }

    if (upBtn) {
      upBtn.addEventListener('click', () => {
        const idx = getCurrentSectionIndex();
        if (idx > 0) {
          const targetSection = $('#' + sections[idx - 1]);
          if (targetSection) {
            targetSection.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth' });
          }
        }
      });
    }

    if (downBtn) {
      downBtn.addEventListener('click', () => {
        const idx = getCurrentSectionIndex();
        if (idx < sections.length - 1) {
          const targetSection = $('#' + sections[idx + 1]);
          if (targetSection) {
            targetSection.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth' });
          }
        }
      });
    }

    // ===========================================
    // NAVIGATION ARROW COLOR SYNC
    // ===========================================

    function syncArrowColor() {
      const color = getComputedStyle(document.documentElement)
        .getPropertyValue('--primary-color').trim();

      const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
      const bg = isDark ? '#111' : '#fff';

      [upBtn, downBtn].forEach(btn => {
        if (btn) {
          btn.style.background = `linear-gradient(180deg, ${color}, ${color})`;
          btn.style.color = bg;
        }
      });
    }

    syncArrowColor();

    // ===========================================
    // SCROLL TO TOP BUTTON
    // ===========================================

    const scrollTopBtn = $('#scrollTopBtn');

    if (scrollTopBtn) {
      function toggleScrollTopBtn() {
        if (window.scrollY > 500) {
          scrollTopBtn.classList.add('visible');
        } else {
          scrollTopBtn.classList.remove('visible');
        }
      }

      window.addEventListener('scroll', toggleScrollTopBtn, { passive: true });

      scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({
          top: 0,
          behavior: prefersReducedMotion ? 'auto' : 'smooth'
        });
      });
    }

    // ===========================================
    // ACTIVE NAVIGATION INDICATOR
    // ===========================================

    const navLinks = $$('.nav-links a, .footer-links a');

    function updateActiveNav() {
      const scrollPos = window.scrollY + 100;

      sections.forEach((sectionId) => {
        const section = $('#' + sectionId);
        if (!section) return;

        const top = section.offsetTop;
        const bottom = top + section.offsetHeight;

        if (scrollPos >= top && scrollPos < bottom) {
          navLinks.forEach(link => {
            link.classList.toggle('active', link.getAttribute('href') === '#' + sectionId);
          });
        }
      });
    }

    window.addEventListener('scroll', updateActiveNav, { passive: true });
    updateActiveNav();

    // ===========================================
    // SKILL CARD STAGGER ANIMATION
    // ===========================================

    skillCards.forEach((card, index) => {
      card.style.animationDelay = `${(index % 10) * 0.05}s`;
    });

    // ===========================================
    // PARALLAX EFFECT FOR HERO SHAPES
    // ===========================================

    if (!prefersReducedMotion) {
      const shapes = $$('.floating-shape');

      window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;

        shapes.forEach((shape, index) => {
          const speed = 0.02 + (index * 0.01);
          shape.style.transform = `translateY(${scrollY * speed}px)`;
        });
      }, { passive: true });
    }

    // ===========================================
    // LAZY LOADING IMAGES
    // ===========================================

    if ('loading' in HTMLImageElement.prototype) {
      // Native lazy loading supported
      $$('img[loading="lazy"]').forEach(img => {
        img.loading = 'lazy';
      });
    } else {
      // Fallback with Intersection Observer
      const lazyImages = $$('img:not([loading])');

      const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src || img.src;
            imageObserver.unobserve(img);
          }
        });
      });

      lazyImages.forEach(img => imageObserver.observe(img));
    }

    // ===========================================
    // HANDLE RESIZE EVENTS
    // ===========================================

    let resizeTimeout;

    window.addEventListener('resize', () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        // Close mobile menu on resize to desktop
        if (window.innerWidth > 768 && menuLinks && menuLinks.classList.contains('open')) {
          menuLinks.classList.remove('open');
          hamburgerIcon.classList.remove('open');
          hamburgerIcon.setAttribute('aria-expanded', 'false');
          document.body.style.overflow = '';
        }

        // Recalculate arrow colors
        syncArrowColor();
      }, 250);
    });

    // ===========================================
    // INITIALIZATION COMPLETE
    // ===========================================

    console.log('%c✨ Portfolio Loaded Successfully', 'color: #2ecc71; font-weight: bold;');
    console.log('%c👨‍💻 Designed by Pratik Abhang', 'color: #3498db;');

  });

})();