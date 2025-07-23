document.addEventListener('DOMContentLoaded', function () {
  // Mobile menu toggle functionality
  function toggleMenu() {
    const menuLinks = document.querySelector('.menu-links');
    const hamburgerIcon = document.querySelector('.hamburger-icon');
    menuLinks.classList.toggle('open');
    hamburgerIcon.classList.toggle('open');
  }

  // Theme switching functionality
  const themeSwitch = document.getElementById('theme-switch-nav');
  const themeSwitchMobile = document.getElementById('theme-switch-nav-mobile');
  const colorOptions = document.querySelectorAll('.color-option-nav');

  // Get saved theme preference or default to light theme
  const savedTheme = localStorage.getItem('theme') || 'light';
  const savedColor = localStorage.getItem('color') || 'black';

  // Apply saved theme
  if (savedTheme === 'dark') {
    document.documentElement.setAttribute('data-theme', 'dark');
    if (themeSwitch) themeSwitch.checked = true;
    if (themeSwitchMobile) themeSwitchMobile.checked = true;
  } else {
    document.documentElement.setAttribute('data-theme', 'light');
    if (themeSwitch) themeSwitch.checked = false;
    if (themeSwitchMobile) themeSwitchMobile.checked = false;
  }

  // Apply saved color
  document.documentElement.setAttribute('data-color', savedColor);

  // Theme switch event listeners
  if (themeSwitch) {
    themeSwitch.addEventListener('change', function () {
      if (this.checked) {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
      } else {
        document.documentElement.setAttribute('data-theme', 'light');
        localStorage.setItem('theme', 'light');
      }
    });
  }

  if (themeSwitchMobile) {
    themeSwitchMobile.addEventListener('change', function () {
      if (this.checked) {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
      } else {
        document.documentElement.setAttribute('data-theme', 'light');
        localStorage.setItem('theme', 'light');
      }
    });
  }

  // Color options event listeners
  colorOptions.forEach(option => {
    option.addEventListener('click', function () {
      const color = this.getAttribute('data-color');
      document.documentElement.setAttribute('data-color', color);
      localStorage.setItem('color', color);
    });
  });

  // Header scroll effect
  const header = document.getElementById('header');
  window.addEventListener('scroll', function () {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // Typed.js animation for profession titles
  var typed = new Typed("#typed-text", {
    strings: [
      "Computer Engineer",
      "Full Stack Developer",
      "Web Developer",
      "Software Developer",
      "Data Analyst"
    ],
    typeSpeed: 80,
    backSpeed: 40,
    backDelay: 800,
    startDelay: 400,
    loop: true,
    showCursor: true,
    cursorChar: "|",
  });

  // Date and time display
  function updateDateTime() {
    const currentDate = new Date();
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    const formattedDate = currentDate.toLocaleDateString('en-GB', options);
    const formattedTime = currentDate.toLocaleTimeString('en-GB', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    });

    document.getElementById("current-date").textContent = formattedDate;
    document.getElementById("current-time").textContent = formattedTime;
  }

  updateDateTime();
  setInterval(updateDateTime, 1000);

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();

      const targetId = this.getAttribute('href');
      if (targetId !== '#' && targetId.length > 1) {
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          const header = document.getElementById('header');
          const headerHeight = header ? header.offsetHeight : 0;
          const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - headerHeight;

          // Smooth scroll with a custom duration
          smoothScrollTo(targetPosition, 800); // 800ms duration
        }
      }
    });
  });

  /**
   * Smooth scroll to a target position
   * @param {number} targetPosition - The vertical position to scroll to
   * @param {number} duration - Duration in milliseconds
   */
  function smoothScrollTo(targetPosition, duration) {
    const start = window.scrollY;
    const distance = targetPosition - start;
    let startTime = null;

    function animation(currentTime) {
      if (startTime === null) startTime = currentTime;
      const timeElapsed = currentTime - startTime;

      // Ease-in-out function
      const ease = easeInOutCubic(timeElapsed, start, distance, duration);

      window.scrollTo(0, ease);

      if (timeElapsed < duration) {
        requestAnimationFrame(animation);
      } else {
        window.scrollTo(0, targetPosition); // Ensure final position
      }
    }

    function easeInOutCubic(t, b, c, d) {
      t /= d / 2;
      if (t < 1) return c / 2 * t * t * t + b;
      t -= 2;
      return c / 2 * (t * t * t + 2) + b;
    }

    requestAnimationFrame(animation);
  }

  // Contact form submission
  const form = document.getElementById('contactForm');
  const sendBtn = document.getElementById('sendBtn');

  if (form && sendBtn) {
    form.addEventListener('submit', async function (e) {
      e.preventDefault();

      const oldStatus = form.querySelector('.form-status');
      if (oldStatus) oldStatus.remove();

      // Start loading
      sendBtn.classList.add('sending');
      const btnIcon = sendBtn.querySelector('i');
      const btnText = sendBtn.querySelector('span');
      btnIcon.className = 'fa-solid fa-spinner fa-spin';
      btnText.textContent = 'Sending...';

      const formData = new FormData(form);
      const formStatus = document.createElement('p');
      formStatus.className = 'form-status';

      try {
        const response = await fetch(form.action, {
          method: 'POST',
          body: formData,
          headers: { 'Accept': 'application/json' }
        });

        if (response.ok) {
          formStatus.textContent = 'Message sent successfully!';
          formStatus.classList.add('success');
          form.reset();
        } else {
          throw new Error('Failed to send');
        }
      } catch (error) {
        formStatus.textContent = 'Oops! There was a problem sending your message.';
        formStatus.classList.add('error');
        console.error(error);
      } finally {
        sendBtn.classList.remove('sending');
        btnIcon.className = 'fas fa-paper-plane';
        btnText.textContent = 'Send Message';

        form.appendChild(formStatus);
        setTimeout(() => formStatus.classList.add('show'), 100);

        setTimeout(() => {
          formStatus.classList.remove('show');
          setTimeout(() => formStatus.remove(), 500);
        }, 5000);
      }
    });
  }

  // Age calculation
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

    return {
      years: ageYears,
      months: ageMonths,
      days: ageDays
    };
  }

  const birthDate = new Date('2003-11-21');
  const age = calculateAge(birthDate);
  document.getElementById('age').textContent = `${age.years} years, ${age.months} months, ${age.days} days Old`;

  // Scroll animation for elements
  function animateOnScroll() {
    const elements = document.querySelectorAll(
      '.about-card, .details-card, .timeline-container, ' +
      '.skill-card, .project-card, ' +
      '.itimeline-container'
    );

    const windowHeight = window.innerHeight;
    const scrollPosition = window.scrollY + windowHeight;

    elements.forEach((element, index) => {
      const elementPosition = element.offsetTop;

      if (scrollPosition > elementPosition + 100 && !element.classList.contains('animate')) {
        const delay = index * 0.1;
        element.style.animationDelay = `${delay}s`;
        element.classList.add('animate');
      }
    });
  }

  // Initialize elements for animation
  document.querySelectorAll(
    '.about-card, .details-card, .timeline-container, ' +
    '.skill-card, .project-card, ' +
    '.itimeline-container'
  ).forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  });

  animateOnScroll();
  window.addEventListener('scroll', animateOnScroll);

  // Skill cards animation
  const skillCards = document.querySelectorAll('.skill-card');
  skillCards.forEach((card, index) => {
    const delay = Math.random() * 2;
    card.style.animationDelay = `${delay}s`;

    const duration = 3 + Math.random() * 3;
    card.style.animationDuration = `${duration}s`;
  });

  // Skill cards hover effects
  skillCards.forEach(card => {
    const skill = card.getAttribute('data-skill');
    const icon = card.querySelector('i');

    card.addEventListener('mouseenter', () => {
      card.classList.add(`${skill}-hover`);
      icon.style.animation = 'floatIcon 1.5s ease-in-out infinite';
    });

    card.addEventListener('mouseleave', () => {
      card.classList.remove(`${skill}-hover`);
      icon.style.animation = '';
    });
  });

  // Auto-scroll button functionality
  const scrollBtn = document.getElementById('autoScrollBtn');
  let autoScroll = false;
  let scrollDirection = 'down';

  scrollBtn.addEventListener('click', () => {
    autoScroll = !autoScroll;
    scrollBtn.classList.toggle('active', autoScroll);

    if (autoScroll) {
      autoScrollFunction();
    }
  });

  function autoScrollFunction() {
    if (!autoScroll) return;

    const scrollStep = 6;
    const delay = 12;
    const scrollMax = document.body.scrollHeight - window.innerHeight;

    const scroll = () => {
      if (!autoScroll) return;

      const currentScroll = window.scrollY;

      if (scrollDirection === 'down') {
        if (currentScroll + scrollStep < scrollMax) {
          window.scrollBy(0, scrollStep);
        } else {
          scrollDirection = 'up';
        }
      } else {
        if (currentScroll - scrollStep > 0) {
          window.scrollBy(0, -scrollStep);
        } else {
          scrollDirection = 'down';
        }
      }

      setTimeout(scroll, delay);
    };

    scroll();
  }

  function speakWelcomeMessage() {
    if (speechSynthesis.speaking) {
      // Already speaking, do not start another speech
      return;
    }

    const message = new SpeechSynthesisUtterance(
      "Welcome to Pratik Abhang's Portfolio!"
    );

    message.lang = 'en-US';
    message.rate = 1;  // Normal speed
    message.pitch = 3; // Higher pitch

    function setVoiceAndSpeak() {
      const voices = speechSynthesis.getVoices();
      message.voice = voices[0] || null;
      speechSynthesis.speak(message);
    }

    if (speechSynthesis.getVoices().length > 0) {
      setVoiceAndSpeak();
    } else {
      speechSynthesis.onvoiceschanged = () => {
        setVoiceAndSpeak();
        speechSynthesis.onvoiceschanged = null;
      };
    }
  }

  // Run 3 seconds after page load, only once
  window.addEventListener('load', () => {
    setTimeout(() => {
      speakWelcomeMessage();
    }, 3000);
  });

  // Disable Ctrl + '+' or Ctrl + '-' keys for zoom on desktop
  window.addEventListener('keydown', function (e) {
    if ((e.ctrlKey || e.metaKey) && (e.key === '+' || e.key === '-' || e.key === '=')) {
      e.preventDefault();
    }
  });

  // Disable zoom via mouse wheel + Ctrl on desktop
  window.addEventListener('wheel', function (e) {
    if (e.ctrlKey) {
      e.preventDefault();
    }
  }, { passive: false });

    document.querySelectorAll('.dropdown-btn .btn').forEach(button => {
    button.addEventListener('click', function (e) {
      e.stopPropagation();
      let parent = this.closest('.dropdown-btn');
      parent.classList.toggle('active');

      // Close other dropdowns if needed
      document.querySelectorAll('.dropdown-btn').forEach(other => {
        if (other !== parent) {
          other.classList.remove('active');
        }
      });
    });
  });

  // Close dropdown if clicked outside
  document.addEventListener('click', function () {
    document.querySelectorAll('.dropdown-btn').forEach(drop => {
      drop.classList.remove('active');
    });
  });
});