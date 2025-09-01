/* <script src="https://unpkg.com/lucide@latest/dist/umd/lucide.js"></script> */

// Initialize Lucide icons
// Lucide.createIcons();

// Mobile menu functionality
const mobileMenuBtn = document.querySelector(".mobile-menu-btn");
const mobileMenu = document.querySelector(".mobile-menu");
const mobileNavLinks = document.querySelectorAll(".mobile-nav-link");

mobileMenuBtn.addEventListener("click", function() {
  mobileMenu.classList.toggle("active");
  const icon = mobileMenuBtn.querySelector("i");
  if (mobileMenu.classList.contains("active")) {
    icon.setAttribute("data-lucide", "x");
  } else {
    icon.setAttribute("data-lucide", "menu");
  }
  Lucide.createIcons();
});

// Close mobile menu when clicking on links
mobileNavLinks.forEach(function(link) {
  link.addEventListener("click", function() {
    mobileMenu.classList.remove("active");
    const icon = mobileMenuBtn.querySelector("i");
    icon.setAttribute("data-lucide", "menu");
    Lucide.createIcons();
  });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    }
  });
});

// Advanced scroll-based background animation
var scrollY = 0;
var lastScrollY = 0;
var scrollDirection = "down";

var backgroundElements = document.querySelectorAll(".bg-element");

function updateBackgroundAnimation() {
  scrollY = window.scrollY;

  // Determine scroll direction
  if (scrollY > lastScrollY) {
    scrollDirection = "down";
  } else {
    scrollDirection = "up";
  }
  lastScrollY = scrollY;

  // Calculate scroll progress
  var scrollProgress = scrollY / (document.documentElement.scrollHeight - window.innerHeight);

  // Animate each background element
  backgroundElements.forEach(function(element, index) {
    var speed = (index + 1) * 0.3;
    var direction = scrollDirection === "down" ? 1 : -1;
    var rotation = scrollProgress * 180 * direction * (index + 1);
    var scale = 1 + scrollProgress * 0.5;
    var xMovement = Math.sin(scrollProgress * Math.PI * 4 + index) * 100;
    var yMovement = scrollY * speed * direction;

    element.style.transform = 
      "translateY(" + yMovement + "px) " +
      "translateX(" + xMovement + "px) " +
      "rotate(" + rotation + "deg) " +
      "scale(" + scale + ")";
    element.style.opacity = (0.3 + Math.sin(scrollProgress * Math.PI * 2 + index) * 0.4).toString();
  });
}

// Throttled scroll event listener
var ticking = false;
window.addEventListener("scroll", function() {
  if (!ticking) {
    requestAnimationFrame(function() {
      updateBackgroundAnimation();
      ticking = false;
    });
    ticking = true;
  }
});

// Animate skill bars when they come into view
var observerOptions = {
  threshold: 0.5,
  rootMargin: "0px 0px -100px 0px"
};

var skillObserver = new IntersectionObserver(function(entries) {
  entries.forEach(function(entry) {
    if (entry.isIntersecting) {
      var skillFills = entry.target.querySelectorAll(".skill-fill");
      skillFills.forEach(function(fill) {
        var width = fill.getAttribute("data-width");
        setTimeout(function() {
          fill.style.width = width + "%";
        }, 200);
      });
    }
  });
}, observerOptions);

// Observe skills section
var skillsSection = document.querySelector(".skills-progress");
if (skillsSection) {
  skillObserver.observe(skillsSection);
}

// Add scroll-based navbar background
var navbar = document.querySelector(".floating-nav");
window.addEventListener("scroll", function() {
  if (window.scrollY > 100) {
    navbar.style.background = "rgba(255, 255, 255, 0.98)";
    navbar.style.boxShadow = "0 10px 40px rgba(0, 0, 0, 0.15)";
  } else {
    navbar.style.background = "rgba(255, 255, 255, 0.95)";
    navbar.style.boxShadow = "0 10px 40px rgba(0, 0, 0, 0.1)";
  }
});

// Form submission handler
var contactForm = document.querySelector(".contact-form");
if (contactForm) {
  contactForm.addEventListener("submit", function(e) {
    e.preventDefault();

    // Get form data
    var formData = new FormData(contactForm);
    var data = Object.fromEntries(formData);

    // Simple validation
    if (!data.email || !data.message) {
      alert("Please fill in all required fields.");
      return;
    }

    // Simulate form submission
    var submitBtn = contactForm.querySelector('button[type="submit"]');
    var originalText = submitBtn.innerHTML;

    submitBtn.innerHTML = '<i data-lucide="loader-2"></i> Sending...';
    submitBtn.disabled = true;
    Lucide.createIcons();

    setTimeout(function() {
      submitBtn.innerHTML = '<i data-lucide="check"></i> Message Sent!';
      Lucide.createIcons();

      setTimeout(function() {
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
        contactForm.reset();
        Lucide.createIcons();
      }, 2000);
    }, 1500);
  });
}

// Add loading animation for project images
var projectImages = document.querySelectorAll(".project-image img");
projectImages.forEach(function(img) {
  img.addEventListener("load", function() {
    img.style.opacity = "1";
  });
});

// Initialize animations on page load
window.addEventListener("load", function() {
  // Trigger initial background animation
  updateBackgroundAnimation();

  // Add entrance animations to cards
  var cards = document.querySelectorAll(".card, .project-card, .service-card, .stat-card");
  cards.forEach(function(card, index) {
    card.style.animationDelay = (index * 0.1) + "s";
    card.classList.add("animate-fade-in");
  });
});

// Add CSS class for fade-in animation
var style = document.createElement("style");
style.textContent = 
    ".animate-fade-in {" +
    "    animation: fadeInUp 0.8s ease-out forwards;" +
    "    opacity: 0;" +
    "}";
document.head.appendChild(style);

// Parallax effect for hero section
var heroSection = document.querySelector(".hero-section");
window.addEventListener("scroll", function() {
  var scrolled = window.pageYOffset;
  var rate = scrolled * -0.5;

  if (heroSection) {
    heroSection.style.transform = "translateY(" + rate + "px)";
  }
});

// Add hover effects to navigation links
var navLinks = document.querySelectorAll(".nav-link");
navLinks.forEach(function(link) {
  link.addEventListener("mouseenter", function() {
    link.style.transform = "translateY(-2px)";
  });

  link.addEventListener("mouseleave", function() {
    link.style.transform = "translateY(0)";
  });
});

console.log("🚀 Abedalrahman's portfolio loaded successfully!");