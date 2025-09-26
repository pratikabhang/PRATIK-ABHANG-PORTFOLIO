// script.js
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
          smoothScrollTo(targetPosition, 800);
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

      // Remove any existing status messages
      const oldStatus = form.querySelector('.form-status');
      if (oldStatus) oldStatus.remove();

      // Button elements
      const btnIcon = sendBtn.querySelector('.btn-icon i');
      const btnText = sendBtn.querySelector('.btn-text');

      // Start loading animation
      sendBtn.classList.add('sending');
      btnIcon.className = 'fas fa-spinner fa-spin';
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
        // Reset button
        sendBtn.classList.remove('sending');
        btnIcon.className = 'fas fa-paper-plane';
        btnText.textContent = 'Send Message';

        // Append & show status message
        form.appendChild(formStatus);
        setTimeout(() => formStatus.classList.add('show'), 100);

        // Auto-remove status after 5s
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
      '.about-card, .details-card, .education-card, ' +
      '.skill-card, .project-card, .experience-card'
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
    '.about-card, .details-card, .education-card, ' +
    '.skill-card, .project-card, .experience-card'
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

  // Make toggleMenu function globally available
  window.toggleMenu = toggleMenu;
});

// Sections scroll buttons
const sections = ['home','about','skills','experience','projects','contact'];
const upBtn = document.querySelector('.up-btn');
const downBtn = document.querySelector('.down-btn');

// Scroll functionality
function getCurrentSectionIndex() {
  const scrollPos = window.scrollY + window.innerHeight / 2;
  for (let i=0;i<sections.length;i++) {
    const sec = document.getElementById(sections[i]);
    if(sec.offsetTop <= scrollPos && sec.offsetTop + sec.offsetHeight > scrollPos) return i;
  }
  return 0;
}

upBtn.addEventListener('click', ()=>{ 
  const idx = getCurrentSectionIndex(); 
  if(idx>0) document.getElementById(sections[idx-1]).scrollIntoView({behavior:'smooth'});
});

downBtn.addEventListener('click', ()=>{
  const idx = getCurrentSectionIndex(); 
  if(idx<sections.length-1) document.getElementById(sections[idx+1]).scrollIntoView({behavior:'smooth'});
});

// Sync arrow colors with theme
let themeIsDark = false;
const themeSwitch = document.getElementById('theme-switch-nav');

themeSwitch.addEventListener('change', e => {
  themeIsDark = e.target.checked;
  syncArrowColor();
});

function syncArrowColor() {
  const color = getComputedStyle(document.documentElement).getPropertyValue('--primary-color').trim();
  const bg = themeIsDark ? '#111' : '#fff';
  [upBtn, downBtn].forEach(btn=>{
    btn.style.backgroundColor = color;
    btn.style.border = `1px solid ${color}`;
    btn.style.color = bg;
    btn.style.boxShadow = `0 4px 10px ${themeIsDark?'rgba(0,0,0,0.7)':'rgba(0,0,0,0.25)'}`;
  });
}

syncArrowColor();
