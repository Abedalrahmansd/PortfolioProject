// Import Lucide icons library
import lucide from "lucide"

// Initialize Lucide icons
lucide.createIcons()

// Mobile menu functionality
const mobileMenuBtn = document.querySelector(".mobile-menu-btn")
const mobileMenu = document.querySelector(".mobile-menu")
const mobileNavLinks = document.querySelectorAll(".mobile-nav-link")

mobileMenuBtn.addEventListener("click", () => {
  mobileMenu.classList.toggle("active")
  const icon = mobileMenuBtn.querySelector("i")
  if (mobileMenu.classList.contains("active")) {
    icon.setAttribute("data-lucide", "x")
  } else {
    icon.setAttribute("data-lucide", "menu")
  }
  lucide.createIcons()
})

// Close mobile menu when clicking on links
mobileNavLinks.forEach((link) => {
  link.addEventListener("click", () => {
    mobileMenu.classList.remove("active")
    const icon = mobileMenuBtn.querySelector("i")
    icon.setAttribute("data-lucide", "menu")
    lucide.createIcons()
  })
})

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()
    const target = document.querySelector(this.getAttribute("href"))
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }
  })
})

// Advanced scroll-based background animation
let scrollY = 0
let lastScrollY = 0
let scrollDirection = "down"

const backgroundElements = document.querySelectorAll(".bg-element")

function updateBackgroundAnimation() {
  scrollY = window.scrollY

  // Determine scroll direction
  if (scrollY > lastScrollY) {
    scrollDirection = "down"
  } else {
    scrollDirection = "up"
  }
  lastScrollY = scrollY

  // Calculate scroll progress
  const scrollProgress = scrollY / (document.documentElement.scrollHeight - window.innerHeight)

  // Animate each background element
  backgroundElements.forEach((element, index) => {
    const speed = (index + 1) * 0.3
    const direction = scrollDirection === "down" ? 1 : -1
    const rotation = scrollProgress * 180 * direction * (index + 1)
    const scale = 1 + scrollProgress * 0.5
    const xMovement = Math.sin(scrollProgress * Math.PI * 4 + index) * 100
    const yMovement = scrollY * speed * direction

    element.style.transform = `
            translateY(${yMovement}px) 
            translateX(${xMovement}px)
            rotate(${rotation}deg) 
            scale(${scale})
        `
    element.style.opacity = `${0.3 + Math.sin(scrollProgress * Math.PI * 2 + index) * 0.4}`
  })
}

// Throttled scroll event listener
let ticking = false
window.addEventListener("scroll", () => {
  if (!ticking) {
    requestAnimationFrame(() => {
      updateBackgroundAnimation()
      ticking = false
    })
    ticking = true
  }
})

// Animate skill bars when they come into view
const observerOptions = {
  threshold: 0.5,
  rootMargin: "0px 0px -100px 0px",
}

const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const skillFills = entry.target.querySelectorAll(".skill-fill")
      skillFills.forEach((fill) => {
        const width = fill.getAttribute("data-width")
        setTimeout(() => {
          fill.style.width = width + "%"
        }, 200)
      })
    }
  })
}, observerOptions)

// Observe skills section
const skillsSection = document.querySelector(".skills-progress")
if (skillsSection) {
  skillObserver.observe(skillsSection)
}

// Add scroll-based navbar background
const navbar = document.querySelector(".floating-nav")
window.addEventListener("scroll", () => {
  if (window.scrollY > 100) {
    navbar.style.background = "rgba(255, 255, 255, 0.98)"
    navbar.style.boxShadow = "0 10px 40px rgba(0, 0, 0, 0.15)"
  } else {
    navbar.style.background = "rgba(255, 255, 255, 0.95)"
    navbar.style.boxShadow = "0 10px 40px rgba(0, 0, 0, 0.1)"
  }
})

// Form submission handler
const contactForm = document.querySelector(".contact-form")
if (contactForm) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault()

    // Get form data
    const formData = new FormData(contactForm)
    const data = Object.fromEntries(formData)

    // Simple validation
    if (!data.email || !data.message) {
      alert("Please fill in all required fields.")
      return
    }

    // Simulate form submission
    const submitBtn = contactForm.querySelector('button[type="submit"]')
    const originalText = submitBtn.innerHTML

    submitBtn.innerHTML = '<i data-lucide="loader-2"></i> Sending...'
    submitBtn.disabled = true
    lucide.createIcons()

    setTimeout(() => {
      submitBtn.innerHTML = '<i data-lucide="check"></i> Message Sent!'
      lucide.createIcons()

      setTimeout(() => {
        submitBtn.innerHTML = originalText
        submitBtn.disabled = false
        contactForm.reset()
        lucide.createIcons()
      }, 2000)
    }, 1500)
  })
}

// Add loading animation for project images
const projectImages = document.querySelectorAll(".project-image img")
projectImages.forEach((img) => {
  img.addEventListener("load", () => {
    img.style.opacity = "1"
  })
})

// Initialize animations on page load
window.addEventListener("load", () => {
  // Trigger initial background animation
  updateBackgroundAnimation()

  // Add entrance animations to cards
  const cards = document.querySelectorAll(".card, .project-card, .service-card, .stat-card")
  cards.forEach((card, index) => {
    card.style.animationDelay = `${index * 0.1}s`
    card.classList.add("animate-fade-in")
  })
})

// Add CSS class for fade-in animation
const style = document.createElement("style")
style.textContent = `
    .animate-fade-in {
        animation: fadeInUp 0.8s ease-out forwards;
        opacity: 0;
    }
`
document.head.appendChild(style)

// Parallax effect for hero section
const heroSection = document.querySelector(".hero-section")
window.addEventListener("scroll", () => {
  const scrolled = window.pageYOffset
  const rate = scrolled * -0.5

  if (heroSection) {
    heroSection.style.transform = `translateY(${rate}px)`
  }
})

// Add hover effects to navigation links
const navLinks = document.querySelectorAll(".nav-link")
navLinks.forEach((link) => {
  link.addEventListener("mouseenter", () => {
    link.style.transform = "translateY(-2px)"
  })

  link.addEventListener("mouseleave", () => {
    link.style.transform = "translateY(0)"
  })
})

console.log("🚀 Abedalrahman's portfolio loaded successfully!")
