/**
 * PORTFOLIO WEBSITE JAVASCRIPT
 * Author: Pratik Abhang
 * Version: 6.0 — Final Complete Edition
 */

(function () {
  'use strict';

  const $ = (selector, context = document) => context.querySelector(selector);
  const $$ = (selector, context = document) => Array.from(context.querySelectorAll(selector));
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  document.addEventListener('DOMContentLoaded', function () {

    /* ============ LOADER ============ */
    const loader = $('#loader');

    window.addEventListener('load', function () {
      document.body.classList.add('loaded');
      if (loader) setTimeout(() => { loader.style.display = 'none'; }, 600);
    });

    setTimeout(() => {
      document.body.classList.add('loaded');
      if (loader && loader.style.display !== 'none') loader.style.display = 'none';
    }, 3000);

    /* ============ RIPPLE FOLLOWER (replaces cursor) ============ */
    const ripple = $('#rippleFollower');

    if (ripple && !prefersReducedMotion && window.matchMedia('(hover: hover)').matches) {
      let targetX = 0, targetY = 0, currentX = 0, currentY = 0;
      let active = false;

      document.addEventListener('mousemove', (e) => {
        targetX = e.clientX;
        targetY = e.clientY;
        if (!active) {
          active = true;
          ripple.style.opacity = '1';
        }
      });

      document.addEventListener('mouseleave', () => {
        ripple.style.opacity = '0';
      });

      (function animate() {
        currentX += (targetX - currentX) * 0.18;
        currentY += (targetY - currentY) * 0.18;
        ripple.style.left = currentX + 'px';
        ripple.style.top = currentY + 'px';
        requestAnimationFrame(animate);
      })();

      const hoverTargets = 'a, button, .btn, .social-icon, .skill-card, .project-card, .certificate-card, .achievement-card, .filter-btn, .color-option-nav, .about-card, .details-card, .experience-card';
      document.addEventListener('mouseover', (e) => {
        if (e.target.closest(hoverTargets)) ripple.classList.add('grow');
      });
      document.addEventListener('mouseout', (e) => {
        if (e.target.closest(hoverTargets)) ripple.classList.remove('grow');
      });
    }

    /* ============ SCROLL PROGRESS ============ */
    const scrollProgress = $('#scrollProgress');

    function updateScrollProgress() {
      if (!scrollProgress) return;
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      scrollProgress.style.width = progress + '%';
    }

    /* ============ MOBILE MENU ============ */
    const menuLinks = $('.menu-links');
    const hamburgerIcon = $('.hamburger-icon');

    window.toggleMenu = function () {
      if (!menuLinks || !hamburgerIcon) return;
      menuLinks.classList.toggle('open');
      hamburgerIcon.classList.toggle('open');
      const isExpanded = menuLinks.classList.contains('open');
      hamburgerIcon.setAttribute('aria-expanded', isExpanded);
      document.body.style.overflow = isExpanded ? 'hidden' : '';
    };

    document.addEventListener('click', function (e) {
      if (menuLinks && menuLinks.classList.contains('open')) {
        const insideMenu = menuLinks.contains(e.target);
        const onHamburger = hamburgerIcon && hamburgerIcon.contains(e.target);
        if (!insideMenu && !onHamburger) {
          menuLinks.classList.remove('open');
          hamburgerIcon.classList.remove('open');
          hamburgerIcon.setAttribute('aria-expanded', 'false');
          document.body.style.overflow = '';
        }
      }
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && menuLinks && menuLinks.classList.contains('open')) {
        menuLinks.classList.remove('open');
        hamburgerIcon.classList.remove('open');
        hamburgerIcon.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
        hamburgerIcon.focus();
      }
    });

    /* ============ THEME (default white/black) ============ */
    const themeSwitch = $('#theme-switch-nav');
    const colorOptions = $$('.color-option-nav');

    const savedTheme = localStorage.getItem('theme') || 'light';
    const savedColor = localStorage.getItem('color') || 'black';

    function applyTheme(theme) {
      document.documentElement.setAttribute('data-theme', theme);
      if (themeSwitch) themeSwitch.checked = theme === 'dark';
      localStorage.setItem('theme', theme);
      const meta = $('meta[name="theme-color"]');
      if (meta) meta.setAttribute('content', theme === 'dark' ? '#0a0a0a' : '#ffffff');
    }

    function applyColor(color) {
      document.documentElement.setAttribute('data-color', color);
      localStorage.setItem('color', color);
      colorOptions.forEach(opt => {
        opt.classList.toggle('active', opt.getAttribute('data-color') === color);
      });
    }

    applyTheme(savedTheme);
    applyColor(savedColor);

    if (themeSwitch) {
      themeSwitch.addEventListener('change', function () {
        applyTheme(this.checked ? 'dark' : 'light');
        syncArrowColor();
      });
    }

    colorOptions.forEach(option => {
      option.addEventListener('click', function () {
        applyColor(this.getAttribute('data-color'));
        syncArrowColor();
      });
    });

    /* ============ HEADER SCROLL ============ */
    const header = $('#header');

    function handleHeaderScroll() {
      if (!header) return;
      header.classList.toggle('scrolled', window.scrollY > 50);
    }

    /* ============ TYPED.JS ============ */
    const typedElement = $('#typed-text');

    if (typedElement && typeof Typed !== 'undefined') {
      new Typed('#typed-text', {
        strings: [
          "Passionate Computer Engineer",
          "Full Stack Developer",
          "AI & Machine Learning Enthusiast",
          "HPC & Cloud Computing Explorer",
          "Cybersecurity Specialist",
          "Creative Web Developer",
          "Data Analyst",
          "System Design Architect",
          "Problem Solver"
        ],
        typeSpeed: 65,
        backSpeed: 30,
        backDelay: 900,
        startDelay: 500,
        loop: true,
        showCursor: true,
        cursorChar: "|",
        smartBackspace: true
      });
    }

    /* ============ DATE / TIME ============ */
    const dateElement = $('#current-date');
    const timeElement = $('#current-time');

    function updateDateTime() {
      if (!dateElement || !timeElement) return;
      const now = new Date();
      dateElement.textContent = now.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
      timeElement.textContent = now.toLocaleTimeString('en-GB', {
        hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false
      });
    }

    updateDateTime();
    setInterval(updateDateTime, 1000);

    /* ============ SMOOTH SCROLL ============ */
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
            smoothScrollTo(targetPosition, 900);
          }
          history.pushState(null, '', targetId);
        }
      });
    });

    function smoothScrollTo(targetPosition, duration) {
      const start = window.scrollY;
      const distance = targetPosition - start;
      let startTime = null;

      function easeInOutCubic(t) {
        return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
      }

      function animation(currentTime) {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const progress = Math.min(timeElapsed / duration, 1);
        const eased = easeInOutCubic(progress);
        window.scrollTo(0, start + distance * eased);
        if (timeElapsed < duration) requestAnimationFrame(animation);
        else window.scrollTo(0, targetPosition);
      }

      requestAnimationFrame(animation);
    }

    /* ============ CONTACT FORM ============ */
    const form = $('#contactForm');
    const sendBtn = $('#sendBtn');

    if (form && sendBtn) {
      form.addEventListener('submit', async function (e) {
        e.preventDefault();
        if (!form.checkValidity()) { form.reportValidity(); return; }

        const formStatus = $('.form-status', form);
        const btnIcon = $('.btn-icon i', sendBtn);
        const btnText = $('.btn-text', sendBtn);
        const originalIconClass = btnIcon ? btnIcon.className : 'fas fa-paper-plane';
        const originalText = btnText ? btnText.textContent : 'Send Message';

        sendBtn.disabled = true;
        if (btnIcon) btnIcon.className = 'fas fa-spinner fa-spin';
        if (btnText) btnText.textContent = 'Sending...';
        if (formStatus) { formStatus.textContent = ''; formStatus.className = 'form-status'; }

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
          console.error('Form error:', error);
          if (formStatus) {
            formStatus.textContent = '✗ Oops! There was a problem. Please try again or email me directly.';
            formStatus.classList.add('error', 'show');
          }
        } finally {
          sendBtn.disabled = false;
          if (btnIcon) btnIcon.className = originalIconClass;
          if (btnText) btnText.textContent = originalText;
          if (formStatus) setTimeout(() => formStatus.classList.remove('show'), 6000);
        }
      });

      $$('input, textarea', form).forEach(field => {
        field.addEventListener('blur', function () {
          this.style.borderColor = (this.value && !this.checkValidity()) ? '#ef4444' : '';
        });
        field.addEventListener('input', function () {
          if (this.checkValidity()) this.style.borderColor = '';
        });
      });
    }

    /* ============ AGE ============ */
    function calculateAge(birthDate) {
      const today = new Date();
      let y = today.getFullYear() - birthDate.getFullYear();
      let m = today.getMonth() - birthDate.getMonth();
      let d = today.getDate() - birthDate.getDate();
      if (d < 0) { m--; d += new Date(today.getFullYear(), today.getMonth(), 0).getDate(); }
      if (m < 0) { y--; m += 12; }
      return { years: y, months: m, days: d };
    }

    const ageElement = $('#age');
    if (ageElement) {
      const age = calculateAge(new Date('2003-11-21'));
      ageElement.textContent = `${age.years} years, ${age.months} months, ${age.days} days old`;
    }

    /* ============ SKILLS FILTER ============ */
    const filterBtns = $$('.filter-btn');
    const skillCards = $$('.skill-card');

    filterBtns.forEach(btn => {
      btn.addEventListener('click', function () {
        const filter = this.getAttribute('data-filter');
        filterBtns.forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        skillCards.forEach((card, i) => {
          const category = card.getAttribute('data-category');
          if (filter === 'all' || category === filter) {
            card.classList.remove('hidden');
            card.style.animation = 'none';
            void card.offsetWidth;
            card.style.animation = `fadeInUp 0.5s ease forwards ${i * 0.02}s`;
          } else {
            card.classList.add('hidden');
          }
        });
      });
    });

    /* ============ SCROLL ANIMATIONS ============ */
    const animatedElements = $$(
      '.about-card, .details-card, .education-card, .skill-card, ' +
      '.project-card, .experience-card, .certificate-card, .achievement-card'
    );

    animatedElements.forEach(element => {
      if (!prefersReducedMotion) {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
      }
    });

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          const delay = Math.min(index * 0.08, 0.4);
          setTimeout(() => {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            entry.target.classList.add('animate');
          }, prefersReducedMotion ? 0 : delay * 1000);
          observer.unobserve(entry.target);
        }
      });
    }, { root: null, rootMargin: '0px 0px -50px 0px', threshold: 0.1 });

    animatedElements.forEach(element => observer.observe(element));

    /* ============ SECTION NAV ============ */
    const sections = ['home', 'about', 'skills', 'experience', 'projects', 'certificates', 'achievements', 'contact'];
    const upBtn = $('.up-btn');
    const downBtn = $('.down-btn');

    function getCurrentSectionIndex() {
      const scrollPos = window.scrollY + window.innerHeight / 2;
      for (let i = 0; i < sections.length; i++) {
        const section = $('#' + sections[i]);
        if (section) {
          const top = section.offsetTop;
          const bottom = top + section.offsetHeight;
          if (scrollPos >= top && scrollPos < bottom) return i;
        }
      }
      return 0;
    }

    if (upBtn) {
      upBtn.addEventListener('click', () => {
        const idx = getCurrentSectionIndex();
        if (idx > 0) {
          const target = $('#' + sections[idx - 1]);
          if (target) target.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth' });
        }
      });
    }

    if (downBtn) {
      downBtn.addEventListener('click', () => {
        const idx = getCurrentSectionIndex();
        if (idx < sections.length - 1) {
          const target = $('#' + sections[idx + 1]);
          if (target) target.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth' });
        }
      });
    }

    /* ============ ARROW SYNC ============ */
    function syncArrowColor() {
      const color = getComputedStyle(document.documentElement).getPropertyValue('--primary-color').trim();
      const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
      const bg = isDark ? '#0a0a0a' : '#ffffff';
      [upBtn, downBtn].forEach(btn => {
        if (btn) {
          btn.style.background = color;
          btn.style.color = bg;
        }
      });
    }

    syncArrowColor();

    /* ============ SCROLL TOP ============ */
    const scrollTopBtn = $('#scrollTopBtn');

    if (scrollTopBtn) {
      scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: prefersReducedMotion ? 'auto' : 'smooth' });
      });
    }

    /* ============ ACTIVE NAV ============ */
    const navLinks = $$('.nav-links a, .footer-links a');

    function updateActiveNav() {
      const scrollPos = window.scrollY + 120;
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

    /* ============ COMBINED SCROLL ============ */
    let ticking = false;

    function onScroll() {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleHeaderScroll();
          updateScrollProgress();
          updateActiveNav();
          if (scrollTopBtn) scrollTopBtn.classList.toggle('visible', window.scrollY > 500);
          ticking = false;
        });
        ticking = true;
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    /* ============ PARALLAX ============ */
    if (!prefersReducedMotion) {
      const shapes = $$('.floating-shape');
      window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        if (scrollY < window.innerHeight) {
          shapes.forEach((shape, index) => {
            const speed = 0.02 + (index * 0.008);
            shape.style.transform = `translateY(${scrollY * speed}px)`;
          });
        }
      }, { passive: true });
    }

    /* ============ LAZY LOADING ============ */
    if ('loading' in HTMLImageElement.prototype) {
      $$('img[loading="lazy"]').forEach(img => { img.loading = 'lazy'; });
    }

    /* ============ RESIZE ============ */
    let resizeTimeout;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        if (window.innerWidth > 768 && menuLinks && menuLinks.classList.contains('open')) {
          menuLinks.classList.remove('open');
          hamburgerIcon.classList.remove('open');
          hamburgerIcon.setAttribute('aria-expanded', 'false');
          document.body.style.overflow = '';
        }
        syncArrowColor();
      }, 250);
    });

    /* ============ KEYBOARD NAV ============ */
    document.addEventListener('keydown', (e) => {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
      if (e.key === 'ArrowDown' && e.altKey) {
        e.preventDefault();
        const idx = getCurrentSectionIndex();
        if (idx < sections.length - 1) {
          const target = $('#' + sections[idx + 1]);
          if (target) target.scrollIntoView({ behavior: 'smooth' });
        }
      } else if (e.key === 'ArrowUp' && e.altKey) {
        e.preventDefault();
        const idx = getCurrentSectionIndex();
        if (idx > 0) {
          const target = $('#' + sections[idx - 1]);
          if (target) target.scrollIntoView({ behavior: 'smooth' });
        }
      }
    });

    /* ============ INIT ============ */
    console.log('%c✨ Portfolio v6.0 Loaded', 'color: #10b981; font-weight: bold; font-size: 14px;');
    console.log('%c👨‍💻 Designed by Pratik Abhang', 'color: #2563eb; font-size: 12px;');
    console.log('%c💡 Alt+↑/↓ to navigate sections', 'color: #9ca3af; font-size: 11px;');

  });

})();