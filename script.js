document.addEventListener('DOMContentLoaded', function() {
  // Theme Toggle Functionality
  const themeSwitch = document.getElementById('theme-switch');  // Toggle switch input for dark/light mode
  const colorOptions = document.querySelectorAll('.color-option');  // Color selection buttons/options

  // Check for saved theme preference in localStorage or use system preference
  const savedTheme = localStorage.getItem('theme') || 
                    (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  // Check for saved color preference, default to black if none saved
  const savedColor = localStorage.getItem('color') || 'black';

  // Apply the saved or default theme and color
  if (savedTheme === 'dark') {
    document.documentElement.setAttribute('data-theme', 'dark');
    themeSwitch.checked = true; // Set toggle to 'dark' checked state
  }
  document.documentElement.setAttribute('data-color', savedColor);

  // Listen for theme toggle switch changes
  themeSwitch.addEventListener('change', function() {
    if (this.checked) {
      document.documentElement.setAttribute('data-theme', 'dark');
      localStorage.setItem('theme', 'dark');  // Save preference
    } else {
      document.documentElement.setAttribute('data-theme', 'light');
      localStorage.setItem('theme', 'light'); // Save preference
    }
  });

  // Color picker functionality: clicking a color option changes theme color
  colorOptions.forEach(option => {
    option.addEventListener('click', function() {
      const color = this.getAttribute('data-color');
      document.documentElement.setAttribute('data-color', color);
      localStorage.setItem('color', color); // Save selected color
    });
  });

  // Header scroll effect: add or remove class based on scroll position
  const header = document.getElementById('header');
  window.addEventListener('scroll', function() {
    if (window.scrollY > 50) {
      header.classList.add('scrolled'); // Add class for scrolled style
    } else {
      header.classList.remove('scrolled'); // Remove class when near top
    }
  });

  // Initialize Typed.js for animated typing effect on element with id #typed-text
  var typed = new Typed("#typed-text", {
    strings: [
      "Computer Engineer",
      "Full Stack Developer",
      "Web Developer",
      "Software Developer",
      "Data Analyst"
    ],
    typeSpeed: 80,      // Speed of typing
    backSpeed: 40,      // Speed of deleting text
    backDelay: 800,     // Delay before deleting
    startDelay: 400,    // Delay before starting typing
    loop: true,         // Loop the typing effect
    showCursor: true,   // Show cursor at end
    cursorChar: "|",    // Cursor character style
  });

  // Function to update the current date and time in footer
  function updateDateTime() {
    const currentDate = new Date();
    
    // Format date as "15 May 2023"
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    const formattedDate = currentDate.toLocaleDateString('en-GB', options);
    
    // Format time as "14:30:45" 24-hour format
    const formattedTime = currentDate.toLocaleTimeString('en-GB', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    });
    
    // Update the DOM elements with current date and time
    document.getElementById("current-date").textContent = formattedDate;
    document.getElementById("current-time").textContent = formattedTime;
  }

  // Call immediately to update, then update every second
  updateDateTime();
  setInterval(updateDateTime, 1000);

  // Function to toggle mobile menu open/close
  function toggleMenu() {
    const menu = document.querySelector(".menu-links");
    const icon = document.querySelector(".hamburger-icon");
    menu.classList.toggle("open");   // Toggle menu visibility
    icon.classList.toggle("open");   // Toggle hamburger icon animation
  }

  // Smooth scrolling for anchor links starting with '#'
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();  // Prevent default jump
      
      const targetId = this.getAttribute('href');
      
      // Close mobile menu if open on link click
      const menu = document.querySelector(".menu-links");
      const icon = document.querySelector(".hamburger-icon");
      if (menu.classList.contains("open")) {
        menu.classList.remove("open");
        icon.classList.remove("open");
      }
      
      // Scroll smoothly to target element if it exists and not '#' only
      if (targetId !== '#') {
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          const headerHeight = document.getElementById('header').offsetHeight;
          const targetPosition = targetElement.offsetTop - headerHeight; // Adjust for fixed header
          
          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
        }
      }
    });
  });

  // Form submission handling with fetch API (assumes form has id 'contactForm')
  const form = document.getElementById('contactForm');
  
  if (form) {
    form.addEventListener('submit', function(e) {
      e.preventDefault();  // Prevent default form submission
      
      const formData = new FormData(form);
      const formStatus = document.createElement('p');
      formStatus.className = 'form-status';  // Styling for status messages
      
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
          form.reset();  // Clear form fields
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
        // Remove any existing status message to avoid duplicates
        const existingStatus = form.querySelector('.form-status');
        if (existingStatus) {
          existingStatus.remove();
        }
        
        // Append new status message
        form.appendChild(formStatus);
        
        // Fade out and remove the message after 5 seconds
        setTimeout(() => {
          formStatus.style.opacity = '0';
          setTimeout(() => {
            formStatus.remove();
          }, 500);
        }, 5000);
      });
    });
  }

  // Calculate age given a birthdate, returns years, months, days
  function calculateAge(birthDate) {
    const today = new Date();
    let ageYears = today.getFullYear() - birthDate.getFullYear();
    let ageMonths = today.getMonth() - birthDate.getMonth();
    let ageDays = today.getDate() - birthDate.getDate();

    // Adjust days and months if days negative
    if (ageDays < 0) {
      ageMonths--;
      // Days in previous month
      ageDays += new Date(today.getFullYear(), today.getMonth(), 0).getDate();
    }

    // Adjust years and months if months negative
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

  // Update age on webpage inside element with id 'age'
  const birthDate = new Date('2003-11-21');
  const age = calculateAge(birthDate);
  document.getElementById('age').textContent = `${age.years} years, ${age.months} months, ${age.days} days Old`;

  // Animate elements on scroll by adding 'animate' class with staggered delay
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
        // Stagger animations using index-based delay
        const delay = index * 0.1;
        element.style.animationDelay = `${delay}s`;
        element.classList.add('animate');
      }
    });
  }

  // Initialize elements with hidden state (opacity and translateY)
  document.querySelectorAll(
    '.about-card, .details-card, .timeline-container, ' +
    '.certification-card, .skill-card, .project-card, ' +
    '.experience-card'
  ).forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  });

  // Run animation check once on page load
  animateOnScroll();
  
  // Run animation check on every scroll event
  window.addEventListener('scroll', animateOnScroll);

  // Add floating animation to skill cards with random delays and durations for natural effect
  const skillCards = document.querySelectorAll('.skill-card');
  skillCards.forEach((card, index) => {
    const delay = Math.random() * 2; // Random delay up to 2 seconds
    card.style.animationDelay = `${delay}s`;
    
    const duration = 3 + Math.random() * 3; // Duration between 3-6 seconds
    card.style.animationDuration = `${duration}s`;
  });

  // Add hover effect to skill cards: add skill-specific class and pulse icon animation
  skillCards.forEach(card => {
    const skill = card.getAttribute('data-skill');  // Skill name for CSS class
    const icon = card.querySelector('i');            // Icon inside skill card
    
    card.addEventListener('mouseenter', () => {
      card.classList.add(`${skill}-hover`);         // Add hover class for color change
      icon.style.animation = 'floatIcon 1.5s ease-in-out infinite'; // Icon pulse animation
    });
    
    card.addEventListener('mouseleave', () => {
      card.classList.remove(`${skill}-hover`);      // Remove hover class
      icon.style.animation = '';                     // Stop pulse animation
    });
  });

  // Auto-scroll functionality triggered by button with id 'autoScrollBtn'
  const scrollBtn = document.getElementById('autoScrollBtn');
  let autoScroll = false;      // State of auto-scrolling
  let scrollDirection = 'down'; // Scroll direction toggle

  scrollBtn.addEventListener('click', () => {
    autoScroll = !autoScroll;
    scrollBtn.classList.toggle('active', autoScroll);

    if (autoScroll) {
      autoScrollFunction();  // Start auto-scrolling when enabled
    }
  });

  // Auto-scroll function to scroll page up and down smoothly and continuously
  function autoScrollFunction() {
    if (!autoScroll) return;

    const scrollStep = 6;  // Scroll step size in pixels (faster scroll)
    const delay = 12;      // Delay between scroll steps in milliseconds (smoother scroll)
    const scrollMax = document.body.scrollHeight - window.innerHeight;

    const scroll = () => {
      if (!autoScroll) return;

      const currentScroll = window.scrollY;

      if (scrollDirection === 'down') {
        if (currentScroll + scrollStep < scrollMax) {
          window.scrollBy(0, scrollStep);
        } else {
          scrollDirection = 'up';  // Change direction when bottom reached
        }
      } else {
        if (currentScroll - scrollStep > 0) {
          window.scrollBy(0, -scrollStep);
        } else {
          scrollDirection = 'down';  // Change direction when top reached
        }
      }

      setTimeout(scroll, delay);
    };

    scroll();
  }

  // Function to open the page in a desktop-sized window once, using localStorage to remember
  function openInDesktopOnce() {
    if (localStorage.getItem('desktopOpened') === 'true') {
      return; // Already opened once, skip opening again
    }

    const currentURL = window.location.href;
    const width = 1920;
    const height = 1080;
    const left = (screen.width - width) / 2;
    const top = (screen.height - height) / 2;

    window.open(
      currentURL,
      '_blank',
      `width=${width},height=${height},left=${left},top=${top},resizable=yes,scrollbars=yes`
    );

    localStorage.setItem('desktopOpened', 'true'); // Mark as opened once
  }

  // Function to speak welcome message using Web Speech API
  function speakWelcomeMessage() {
    const message = new SpeechSynthesisUtterance(
      "Hi, I’m Pratik Abhang, a computer engineer. Welcome to my portfolio, where technology transforms ideas into reality."
    );

    message.lang = 'en-US';
    message.rate = 1;
    message.pitch = 1;

    // Get available voices and filter for English voices
    const voices = speechSynthesis.getVoices();
    const englishVoices = voices.filter(voice => voice.lang.toLowerCase().startsWith('en'));

    // Try to select a preferred male voice, fallback to first English or first voice
    const maleVoiceNameHints = ['google us english'];
    let maleVoice = englishVoices.find(voice =>
      maleVoiceNameHints.some(hint => voice.name.toLowerCase().includes(hint))
    ) || englishVoices[0] || voices[0];

    message.voice = maleVoice;
    speechSynthesis.speak(message);
  }

  // Initialize speech after 5 seconds delay, ensuring voices are loaded
  function initSpeechAfterDelay() {
    setTimeout(() => {
      // Check if voices are loaded; if not, wait for onvoiceschanged event
      if (speechSynthesis.getVoices().length === 0 && speechSynthesis.onvoiceschanged !== undefined) {
        speechSynthesis.onvoiceschanged = () => {
          speakWelcomeMessage();
          speechSynthesis.onvoiceschanged = null; // Remove event listener after first call
        };
      } else {
        speakWelcomeMessage();
      }
    }, 5000); // Delay of 5 seconds
  }

  // On window load, open desktop window once and speak welcome message
  window.addEventListener('load', initSpeechAfterDelay);

  window.onload = function () {
    openInDesktopOnce();

    // Speak welcome message after 5 seconds on every page load
    setTimeout(() => {
      // On mobile, speech might require user interaction; check speaking state
      if (speechSynthesis.speaking || speechSynthesis.pending) return;
      speakWelcomeMessage();
    }, 5000);
  };
});
