        // Mobile menu functionality
        const mobileMenuBtn = document.querySelector(".mobile-menu-btn");
        const mobileMenu = document.querySelector(".mobile-menu");

        mobileMenuBtn.addEventListener("click", function() {
            mobileMenu.classList.toggle("active");
            const icon = mobileMenuBtn.querySelector("svg");
            if (mobileMenu.classList.contains("active")) {
                icon.innerHTML = '<path d="M18 6L6 18M6 6L18 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>';
            } else {
                icon.innerHTML = '<path d="M4 6H20M4 12H20M4 18H20" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>';
            }
        });

        // Close mobile menu when clicking on links
        document.querySelectorAll(".mobile-nav-link").forEach(function(link) {
            link.addEventListener("click", function() {
                mobileMenu.classList.remove("active");
                const icon = mobileMenuBtn.querySelector("svg");
                icon.innerHTML = '<path d="M4 6H20M4 12H20M4 18H20" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>';
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
                    
                    // Close mobile menu if open
                    if (mobileMenu.classList.contains("active")) {
                        mobileMenu.classList.remove("active");
                        const icon = mobileMenuBtn.querySelector("svg");
                        icon.innerHTML = '<path d="M4 6H20M4 12H20M4 18H20" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>';
                    }
                }
            });
        });

        // Animate skill bars when they come into view
        const skillObserver = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    const skillFills = entry.target.querySelectorAll(".skill-fill");
                    skillFills.forEach(function(fill) {
                        const width = fill.getAttribute("data-width");
                        setTimeout(function() {
                            fill.style.width = width + "%";
                        }, 200);
                    });
                }
            });
        }, { threshold: 0.5, rootMargin: "0px 0px -100px 0px" });

        // Observe skills section
        const skillsSection = document.querySelector(".skills-progress");
        if (skillsSection) {
            skillObserver.observe(skillsSection);
        }

        /* // Add scroll-based navbar background
        const navbar = document.querySelector(".floating-nav");
        window.addEventListener("scroll", function() {
            if (window.scrollY > 100) {
                navbar.style.background = "rgba(255, 255, 255, 0.98)";
                navbar.style.boxShadow = "0 10px 40px rgba(0, 0, 0, 0.15)";
            } else {
                navbar.style.background = "rgba(255, 255, 255, 0.95)";
                navbar.style.boxShadow = "0 10px 40px rgba(0, 0, 0, 0.1)";
            }
        }); */

        // Form submission handler
        const contactForm = document.querySelector(".contact-form");
        if (contactForm) {
            contactForm.addEventListener("submit", function(e) {
                e.preventDefault();

                // Get form data
                const formData = new FormData(contactForm);
                const data = Object.fromEntries(formData);

                // Simple validation
                if (!data.email || !data.message) {
                    alert("Please fill in all required fields.");
                    return;
                }

                // Simulate form submission
                const submitBtn = contactForm.querySelector('button[type="submit"]');
                const originalText = submitBtn.innerHTML;

                submitBtn.innerHTML = 'Sending...';
                submitBtn.disabled = true;

                setTimeout(function() {
                    submitBtn.innerHTML = 'Message Sent!';
                    submitBtn.disabled = false;
                    
                    setTimeout(function() {
                        submitBtn.innerHTML = originalText;
                        contactForm.reset();
                    }, 2000);
                }, 1500);
            });
        }

        // Lazy load images
        document.addEventListener("DOMContentLoaded", function() {
            const lazyImages = document.querySelectorAll(".lazy-load");
            
            const lazyImageObserver = new IntersectionObserver(function(entries, observer) {
                entries.forEach(function(entry) {
                    if (entry.isIntersecting) {
                        const lazyImage = entry.target;
                        lazyImage.src = lazyImage.dataset.src;
                        lazyImage.classList.add("loaded");
                        lazyImageObserver.unobserve(lazyImage);
                    }
                });
            });

            lazyImages.forEach(function(lazyImage) {
                lazyImageObserver.observe(lazyImage);
            });
        });

        // Theme toggle functionality
        const themeToggle = document.querySelector(".theme-toggle");
        const themeIconLight = document.querySelector(".theme-icon-light");
        const themeIconDark = document.querySelector(".theme-icon-dark");
        
        // Check for saved theme preference or respect OS preference
        const savedTheme = localStorage.getItem("theme") || (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
        
        if (savedTheme === "dark") {
            document.documentElement.setAttribute("data-theme", "dark");
            themeIconLight.style.display = "none";
            themeIconDark.style.display = "block";
        } else {
            document.documentElement.setAttribute("data-theme", "light");
            themeIconLight.style.display = "block";
            themeIconDark.style.display = "none";
        }
        
        themeToggle.addEventListener("click", function() {
            const currentTheme = document.documentElement.getAttribute("data-theme");
            const newTheme = currentTheme === "light" ? "dark" : "light";
            
            document.documentElement.setAttribute("data-theme", newTheme);
            localStorage.setItem("theme", newTheme);
            
            if (newTheme === "dark") {
                themeIconLight.style.display = "none";
                themeIconDark.style.display = "block";
            } else {
                themeIconLight.style.display = "block";
                themeIconDark.style.display = "none";
            }
        });

        // Initialize animations on page load
        window.addEventListener("load", function() {
            // Add entrance animations to cards
            const cards = document.querySelectorAll(".card, .project-card, .service-card, .stat-card");
            cards.forEach(function(card, index) {
                card.style.animationDelay = (index * 0.1) + "s";
                card.classList.add("animate-fade-in");
            });
            
            // Add CSS class for fade-in animation
            const style = document.createElement("style");
            style.textContent = 
                ".animate-fade-in {" +
                "    animation: fadeInUp 0.8s ease-out forwards;" +
                "    opacity: 0;" +
                "}";
            document.head.appendChild(style);
        });

        console.log("🚀 Abedalrahman's portfolio loaded successfully!");