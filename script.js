document.addEventListener('DOMContentLoaded', function() {
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
    document.getElementById("current-date").textContent = currentDate.toLocaleDateString('en-GB', {
      day: '2-digit', month: 'long', year: 'numeric'
    });
    document.getElementById("current-time").textContent = currentDate.toLocaleTimeString();
    document.getElementById("year").textContent = currentDate.getFullYear();
  }

  setInterval(updateDateTime, 1000);
  updateDateTime();

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
      document.querySelector(this.getAttribute('href')).scrollIntoView({
        behavior: 'smooth'
      });
    });
  });

  // Form submission handling
  const form = document.getElementById('contactForm');
  const formStatus = document.getElementById('form-status');
  
  if (form) {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      const formData = new FormData(form);
      
      fetch(form.action, {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      })
      .then(response => {
        if (response.ok) {
          formStatus.innerHTML = 'Message sent successfully!';
          formStatus.style.color = 'green';
          form.reset();
        } else {
          throw new Error('Network response was not ok');
        }
      })
      .catch(error => {
        formStatus.innerHTML = 'Oops! There was a problem sending your message.';
        formStatus.style.color = 'red';
        console.error('Error:', error);
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
  document.getElementById('age').textContent = `Age: ${age.years} years, ${age.months} months, ${age.days} days`;

  // Animation on scroll
  const animateOnScroll = function() {
    const elements = document.querySelectorAll('.experience-card, .project-card, .skill-card');
    
    elements.forEach(element => {
      const elementPosition = element.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;
      
      if (elementPosition < windowHeight - 100) {
        element.style.opacity = '1';
        element.style.transform = 'translateY(0)';
      }
    });
  };

  // Initialize elements with hidden state
  document.querySelectorAll('.experience-card, .project-card, .skill-card').forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  });

  // Run once on load
  animateOnScroll();
  
  // Then run on scroll
  window.addEventListener('scroll', animateOnScroll);
});