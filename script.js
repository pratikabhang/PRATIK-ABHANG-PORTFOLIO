document.addEventListener('DOMContentLoaded', function() {
  // Theme and Color Picker Functionality
  const themeSwitch = document.getElementById('theme-switch');
  const colorOptions = document.querySelectorAll('.color-option');
  
  // Load saved preferences or use defaults
  const savedTheme = localStorage.getItem('theme') || 
                    (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  const savedColor = localStorage.getItem('color') || 'black';
  
  // Apply saved preferences
  if (savedTheme === 'dark') {
    document.documentElement.setAttribute('data-theme', 'dark');
    themeSwitch.checked = true;
  }
  
  document.documentElement.setAttribute('data-color', savedColor);
  
  // Theme switch event
  themeSwitch.addEventListener('change', function() {
    if (this.checked) {
      document.documentElement.setAttribute('data-theme', 'dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.setAttribute('data-theme', 'light');
      localStorage.setItem('theme', 'light');
    }
  });

  // Color picker events
  colorOptions.forEach(option => {
    option.addEventListener('click', function() {
      const color = this.getAttribute('data-color');
      document.documentElement.setAttribute('data-color', color);
      localStorage.setItem('color', color);
    });
  });

  // Header scroll effect
  const header = document.getElementById('header');
  window.addEventListener('scroll', function() {
    header.classList.toggle('scrolled', window.scrollY > 50);
  });

  // Typed.js initialization
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

  // Update date and time in footer
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

  // Toggle mobile menu
  function toggleMenu() {
    const menu = document.querySelector(".menu-links");
    const icon = document.querySelector(".hamburger-icon");
    menu.classList.toggle("open");
    icon.classList.toggle("open");
  }

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      
      // Close mobile menu if open
      const menu = document.querySelector(".menu-links");
      const icon = document.querySelector(".hamburger-icon");
      if (menu.classList.contains("open")) {
        menu.classList.remove("open");
        icon.classList.remove("open");
      }
      
      // Scroll to target
      if (targetId !== '#') {
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          const headerHeight = document.getElementById('header').offsetHeight;
          const targetPosition = targetElement.offsetTop - headerHeight;
          
          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
        }
      }
    });
  });

  // Form submission handling
  const form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      const formData = new FormData(form);
      const formStatus = document.createElement('p');
      formStatus.className = 'form-status';
      
      fetch(form.action, {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      })
      .then(response => {
        if (response.ok) {
          formStatus.textContent = 'Message sent successfully!';
          formStatus.style.color = 'var(--secondary-color)';
          form.reset();
        } else {
          throw new Error('Network response was not ok');
        }
      })
      .catch(error => {
        formStatus.textContent = 'Oops! There was a problem sending your message.';
        formStatus.style.color = 'var(--accent-color)';
        console.error('Error:', error);
      })
      .finally(() => {
        const existingStatus = form.querySelector('.form-status');
        if (existingStatus) existingStatus.remove();
        
        form.appendChild(formStatus);
        
        setTimeout(() => {
          formStatus.style.opacity = '0';
          setTimeout(() => formStatus.remove(), 500);
        }, 5000);
      });
    });
  }

  // Calculate and display age
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

  // Animate elements on scroll
  function animateOnScroll() {
    const elements = document.querySelectorAll(
      '.about-card, .details-card, .timeline-container, ' +
      '.skill-card, .project-card'
    );
    
    const windowHeight = window.innerHeight;
    const scrollPosition = window.scrollY + windowHeight;
    
    elements.forEach((element, index) => {
      const elementPosition = element.offsetTop;
      
      if (scrollPosition > elementPosition + 100 && !element.classList.contains('animate')) {
        element.style.animationDelay = `${index * 0.1}s`;
        element.classList.add('animate');
      }
    });
  }

  // Initialize elements with hidden state
  document.querySelectorAll(
    '.about-card, .details-card, .timeline-container, ' +
    '.skill-card, .project-card'
  ).forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
  });

  animateOnScroll();
  window.addEventListener('scroll', animateOnScroll);

  // Add floating animation to skills
  const skillCards = document.querySelectorAll('.skill-card');
  skillCards.forEach((card, index) => {
    const delay = Math.random() * 2;
    const duration = 3 + Math.random() * 3;
    card.style.animationDelay = `${delay}s`;
    card.style.animationDuration = `${duration}s`;
  });
});