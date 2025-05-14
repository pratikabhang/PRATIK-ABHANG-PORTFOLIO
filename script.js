document.addEventListener('DOMContentLoaded', function() {
  // Header scroll effect
  const header = document.getElementById('header');
  window.addEventListener('scroll', function() {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // Typed.js initialization for animated text
  var typed = new Typed("#typed-text", {
    strings: [
      "Computer Engineer",
      "Full Stack Developer",
      "Web Developer",
      "Software Engineer",
      "Data Analyst",
      "Designer"
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
    
    // Format date as "15 May 2023"
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    const formattedDate = currentDate.toLocaleDateString('en-GB', options);
    
    // Format time as "14:30:45"
    const formattedTime = currentDate.toLocaleTimeString('en-GB', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    });
    
    document.getElementById("current-date").textContent = formattedDate;
    document.getElementById("current-time").textContent = formattedTime;
  }

  // Update immediately and then every second
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
          formStatus.style.color = 'green';
          form.reset();
        } else {
          throw new Error('Network response was not ok');
        }
      })
      .catch(error => {
        formStatus.textContent = 'Oops! There was a problem sending your message.';
        formStatus.style.color = 'red';
        console.error('Error:', error);
      })
      .finally(() => {
        // Remove any existing status messages
        const existingStatus = form.querySelector('.form-status');
        if (existingStatus) {
          existingStatus.remove();
        }
        
        // Add new status message
        form.appendChild(formStatus);
        
        // Remove after 5 seconds
        setTimeout(() => {
          formStatus.style.opacity = '0';
          setTimeout(() => {
            formStatus.remove();
          }, 500);
        }, 5000);
      });
    });
  }

  // Calculate age
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

  // Update the age on the webpage
  const birthDate = new Date('2003-11-21');
  const age = calculateAge(birthDate);
  document.getElementById('age').textContent = `Age: ${age.years} years`;

  // Animation on scroll
  function animateOnScroll() {
    const elements = document.querySelectorAll(
      '.about-card, .details-card, .timeline-container, ' +
      '.certification-card, .skill-card, .project-card, ' +
      '.experience-card'
    );
    
    const windowHeight = window.innerHeight;
    const scrollPosition = window.scrollY + windowHeight;
    
    elements.forEach((element, index) => {
      const elementPosition = element.offsetTop;
      
      if (scrollPosition > elementPosition + 100 && !element.classList.contains('animate')) {
        // Stagger animations with different delays
        const delay = index * 0.1;
        element.style.animationDelay = `${delay}s`;
        element.classList.add('animate');
      }
    });
  }

  // Initialize elements with hidden state
  document.querySelectorAll(
    '.about-card, .details-card, .timeline-container, ' +
    '.certification-card, .skill-card, .project-card, ' +
    '.experience-card'
  ).forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  });

  // Run once on load
  animateOnScroll();
  
  // Then run on scroll
  window.addEventListener('scroll', animateOnScroll);

  // Add floating animation to skills
  const skillCards = document.querySelectorAll('.skill-card');
  skillCards.forEach((card, index) => {
    // Random delay for floating effect
    const delay = Math.random() * 2;
    card.style.animationDelay = `${delay}s`;
    
    // Random floating duration for more natural effect
    const duration = 3 + Math.random() * 3;
    card.style.animationDuration = `${duration}s`;
  });

  // Add hover effect to skill cards
  skillCards.forEach(card => {
    const skill = card.getAttribute('data-skill');
    const icon = card.querySelector('i');
    
    card.addEventListener('mouseenter', () => {
      // Add class based on skill for color change
      card.classList.add(`${skill}-hover`);
      
      // Add pulse animation to icon
      icon.style.animation = 'floatIcon 1.5s ease-in-out infinite';
    });
    
    card.addEventListener('mouseleave', () => {
      // Remove hover class
      card.classList.remove(`${skill}-hover`);
      
      // Remove pulse animation
      icon.style.animation = '';
    });
  });
});