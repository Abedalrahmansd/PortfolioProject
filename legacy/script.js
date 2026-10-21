        const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        const isFinePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
        const motionOn = !prefersReducedMotion;
        const richMotionOn = motionOn && isFinePointer;

        // ------------------------------------------------------------
        // Mobile menu
        // ------------------------------------------------------------
        const mobileMenuBtn = document.querySelector(".mobile-menu-btn");
        const mobileMenu = document.querySelector(".mobile-menu");

        function closeMobileMenu() {
            mobileMenu.classList.remove("active");
            const icon = mobileMenuBtn.querySelector("svg");
            icon.innerHTML = '<path d="M4 6H20M4 12H20M4 18H20" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>';
        }

        mobileMenuBtn.addEventListener("click", function() {
            mobileMenu.classList.toggle("active");
            const icon = mobileMenuBtn.querySelector("svg");
            if (mobileMenu.classList.contains("active")) {
                icon.innerHTML = '<path d="M18 6L6 18M6 6L18 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>';
            } else {
                icon.innerHTML = '<path d="M4 6H20M4 12H20M4 18H20" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>';
            }
        });

        document.querySelectorAll(".mobile-nav-link").forEach(function(link) {
            link.addEventListener("click", closeMobileMenu);
        });

        // ------------------------------------------------------------
        // Click ripple — real feedback on nav links & buttons
        // ------------------------------------------------------------
        document.querySelectorAll(".nav-link, .mobile-nav-link, .btn").forEach(function(el) {
            el.addEventListener("click", function(e) {
                const rect = el.getBoundingClientRect();
                const size = Math.max(rect.width, rect.height) * 1.8;
                const ripple = document.createElement("span");
                ripple.className = "click-ripple";
                ripple.style.width = ripple.style.height = size + "px";
                ripple.style.left = (e.clientX - rect.left - size / 2) + "px";
                ripple.style.top = (e.clientY - rect.top - size / 2) + "px";
                el.appendChild(ripple);
                ripple.addEventListener("animationend", function() { ripple.remove(); });
            });
        });

        // ------------------------------------------------------------
        // Smooth scrolling for in-page anchors + a landing pulse so
        // navigating to a section feels like it actually "arrived"
        // ------------------------------------------------------------
        document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
            anchor.addEventListener("click", function (e) {
                const targetId = this.getAttribute("href");
                if (targetId.length < 2) return;
                const target = document.querySelector(targetId);
                if (target) {
                    e.preventDefault();
                    target.scrollIntoView({ behavior: motionOn ? "smooth" : "auto", block: "start" });
                    if (mobileMenu.classList.contains("active")) closeMobileMenu();

                    const heading = target.querySelector("h1, h2, .section-header h2, .section-header");
                    if (heading && motionOn) {
                        setTimeout(function() {
                            heading.classList.add("section-landed");
                            heading.addEventListener("animationend", function cleanup() {
                                heading.classList.remove("section-landed");
                                heading.removeEventListener("animationend", cleanup);
                            });
                        }, 500);
                    }
                }
            });
        });

        // ------------------------------------------------------------
        // Nav: shrink on scroll + scrollspy active link + scroll progress
        // + a light parallax drift on the hero aurora blobs
        // ------------------------------------------------------------
        const nav = document.querySelector(".floating-nav");
        const navLinks = document.querySelectorAll(".nav-link");
        const sections = Array.from(navLinks)
            .map(function(link) { return document.querySelector(link.getAttribute("href")); })
            .filter(Boolean);
        const progressRingFill = document.querySelector(".progress-ring-fill");
        const RING_CIRCUMFERENCE = 2 * Math.PI * 20;
        const auroraBlobs = document.querySelectorAll(".aurora-blob");

        function onScroll() {
            if (nav) nav.classList.toggle("nav-scrolled", window.scrollY > 40);

            let current = sections[0];
            for (const section of sections) {
                if (section.getBoundingClientRect().top - 140 <= 0) current = section;
            }
            navLinks.forEach(function(link) {
                link.classList.toggle("active", current && link.getAttribute("href") === "#" + current.id);
            });

            if (progressRingFill) {
                const scrollable = document.documentElement.scrollHeight - window.innerHeight;
                const pct = scrollable > 0 ? Math.min(window.scrollY / scrollable, 1) : 0;
                progressRingFill.style.strokeDashoffset = String(RING_CIRCUMFERENCE * (1 - pct));
            }

            if (motionOn && auroraBlobs.length) {
                const y = window.scrollY * 0.08;
                auroraBlobs.forEach(function(blob, i) {
                    blob.style.setProperty("--parallax", (y * (i % 2 === 0 ? 1 : -1)).toFixed(1) + "px");
                });
            }
        }
        document.addEventListener("scroll", onScroll, { passive: true });
        onScroll();

        // ------------------------------------------------------------
        // Contact form → real mailto: (no fake "sent" state)
        // ------------------------------------------------------------
        const CONTACT_EMAIL = "aboudysaad@hotmail.com";
        const contactForm = document.querySelector(".contact-form");
        if (contactForm) {
            contactForm.addEventListener("submit", function(e) {
                e.preventDefault();
                const formData = new FormData(contactForm);
                const data = Object.fromEntries(formData);
                const firstName = (data.firstName || "").trim();
                const lastName = (data.lastName || "").trim();
                const email = (data.email || "").trim();
                const message = (data.message || "").trim();

                if (!email || !message) {
                    alert("Please fill in all required fields.");
                    return;
                }

                const subject = `Portfolio contact from ${firstName} ${lastName}`.trim();
                const body = `Name: ${firstName} ${lastName}\nEmail: ${email}\n\n${message}`;
                const mailtoUrl = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

                const submitBtn = contactForm.querySelector('button[type="submit"]');
                const originalText = submitBtn.innerHTML;
                window.location.href = mailtoUrl;
                submitBtn.innerHTML = "Opening your email app…";
                submitBtn.disabled = true;
                setTimeout(function() {
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                    contactForm.reset();
                }, 2000);
            });
        }

        // ------------------------------------------------------------
        // Lazy load images
        // ------------------------------------------------------------
        (function() {
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
            lazyImages.forEach(function(img) { lazyImageObserver.observe(img); });
        })();

        // ------------------------------------------------------------
        // Theme toggle — circular reveal that expands from the button.
        // Built by hand (no View Transitions API) so it actually works
        // everywhere, including WebViews that don't support it.
        // ------------------------------------------------------------
        const themeToggle = document.querySelector(".theme-toggle");
        const themeIconLight = document.querySelector(".theme-icon-light");
        const themeIconDark = document.querySelector(".theme-icon-dark");

        function applyThemeIcons(theme) {
            themeIconLight.style.display = theme === "dark" ? "none" : "block";
            themeIconDark.style.display = theme === "dark" ? "block" : "none";
        }

        function setTheme(theme) {
            document.documentElement.setAttribute("data-theme", theme);
            localStorage.setItem("theme", theme);
            applyThemeIcons(theme);
        }

        const savedTheme = localStorage.getItem("theme") ||
            (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
        setTheme(savedTheme);

        themeToggle.addEventListener("click", function(e) {
            const currentTheme = document.documentElement.getAttribute("data-theme");
            const newTheme = currentTheme === "light" ? "dark" : "light";

            if (!motionOn) {
                setTheme(newTheme);
                return;
            }

            const rect = themeToggle.getBoundingClientRect();
            const x = rect.left + rect.width / 2;
            const y = rect.top + rect.height / 2;
            const endRadius = Math.hypot(
                Math.max(x, window.innerWidth - x),
                Math.max(y, window.innerHeight - y)
            );
            const oldFlatColor = currentTheme === "dark" ? "#070d16" : "#ffffff";

            // Switch the real page to the new theme in real time as the
            // reveal plays. The theme swap itself briefly blocks the
            // main thread (every element's colors recalculating at
            // once), so we do that swap FIRST while the overlay is
            // still just a static, fully-covering flat color — then
            // only start the animated reveal on the frame after, once
            // that heavy work has already settled and won't stall it.
            const overlay = document.createElement("div");
            overlay.className = "theme-reveal-overlay";
            overlay.style.background = oldFlatColor;
            overlay.style.clipPath = `circle(${endRadius}px at ${x}px ${y}px)`;
            document.body.appendChild(overlay);

            requestAnimationFrame(function() {
                setTheme(newTheme);
                requestAnimationFrame(function() {
                    const anim = overlay.animate(
                        [
                            { clipPath: `circle(${endRadius}px at ${x}px ${y}px)` },
                            { clipPath: `circle(0px at ${x}px ${y}px)` }
                        ],
                        { duration: 550, easing: "cubic-bezier(0.65, 0, 0.35, 1)", fill: "forwards" }
                    );
                    anim.onfinish = function() { overlay.remove(); };
                    anim.oncancel = function() { overlay.remove(); };

                    // Safety net in case onfinish doesn't fire for any reason
                    setTimeout(function() {
                        if (overlay.isConnected) overlay.remove();
                    }, 900);
                });
            });
        });

        // ------------------------------------------------------------
        // Scroll reveal — directional, staggered, with a cleanup pass
        // so transforms don't fight with hover/tilt afterwards.
        // ------------------------------------------------------------
        function setupReveal(selector, direction) {
            document.querySelectorAll(selector).forEach(function(el) {
                el.classList.add("reveal", "reveal-" + direction);
            });
        }
        setupReveal(".section-header", "up");
        setupReveal(".about-left .card", "left");
        setupReveal(".about-right .skill-tier", "right");
        setupReveal(".service-card", "up");
        setupReveal(".contact-info .card", "left");
        setupReveal(".contact-form-container .card", "right");
        document.querySelectorAll(".projects-grid .project-card").forEach(function(el, i) {
            el.classList.add("reveal", i % 2 === 0 ? "reveal-left" : "reveal-right");
        });

        const revealObserver = new IntersectionObserver(function(entries, observer) {
            entries.forEach(function(entry) {
                if (!entry.isIntersecting) return;
                const el = entry.target;
                const siblings = Array.from(el.parentElement.children).filter(function(s) {
                    return s.classList.contains("reveal");
                });
                const staggerIndex = siblings.indexOf(el);
                el.style.transitionDelay = motionOn ? (Math.min(staggerIndex, 6) * 0.09) + "s" : "0s";
                el.classList.add("in-view");
                observer.unobserve(el);

                el.addEventListener("transitionend", function cleanup(ev) {
                    if (ev.propertyName !== "transform") return;
                    el.classList.remove("reveal", "reveal-left", "reveal-right", "reveal-up", "in-view");
                    el.style.transitionDelay = "";
                    el.removeEventListener("transitionend", cleanup);
                });
            });
        }, { threshold: 0.15, rootMargin: "0px 0px -60px 0px" });

        document.querySelectorAll(".reveal").forEach(function(el) { revealObserver.observe(el); });

        // ------------------------------------------------------------
        // Rich, pointer-only interactions: tilt, spotlight border,
        // magnetic buttons, and the cursor companion.
        // ------------------------------------------------------------
        if (richMotionOn) {
            document.querySelectorAll(".project-card, .service-card, .project-tech-item, .project-feature-card, .project-gallery-item, .project-stat-item").forEach(function(card) {
                card.addEventListener("mousemove", function(e) {
                    const rect = card.getBoundingClientRect();
                    const x = e.clientX - rect.left;
                    const y = e.clientY - rect.top;
                    const nx = x / rect.width - 0.5;
                    const ny = y / rect.height - 0.5;
                    card.style.setProperty("--mx", x + "px");
                    card.style.setProperty("--my", y + "px");
                    card.style.transform =
                        `translateY(-10px) rotateX(${(-ny * 6).toFixed(2)}deg) rotateY(${(nx * 6).toFixed(2)}deg)`;
                });
                card.addEventListener("mouseleave", function() {
                    card.style.transform = "";
                });
            });

            document.querySelectorAll(".btn-primary, .btn-outline").forEach(function(btn) {
                btn.addEventListener("mousemove", function(e) {
                    const rect = btn.getBoundingClientRect();
                    const x = (e.clientX - rect.left) / rect.width - 0.5;
                    const y = (e.clientY - rect.top) / rect.height - 0.5;
                    btn.style.transform = `translate(${x * 10}px, ${y * 10}px)`;
                });
                btn.addEventListener("mouseleave", function() {
                    btn.style.transform = "";
                });
            });

            // Cursor companion — soft glow + breathing ring + an
            // orbiting "</>" glyph that trails the pointer with no lag
            // (raf + lerp, transform-only so it stays GPU-composited).
            const companion = document.createElement("div");
            companion.className = "cursor-companion";
            companion.innerHTML =
                '<span class="cursor-companion-glow"></span>' +
                '<span class="cursor-ring"></span>' +
                '<span class="cursor-orbit"><span class="cursor-orbit-glyph">&lt;/&gt;</span></span>';
            document.body.appendChild(companion);

            let cx = window.innerWidth / 2, cy = window.innerHeight / 2;
            let tx = cx, ty = cy;
            window.addEventListener("mousemove", function(e) {
                tx = e.clientX;
                ty = e.clientY;
            });
            (function animateCompanion() {
                cx += (tx - cx) * 0.22;
                cy += (ty - cy) * 0.22;
                companion.style.transform = `translate(${cx}px, ${cy}px)`;
                requestAnimationFrame(animateCompanion);
            })();

            const hoverTargets = document.querySelectorAll(
                "a, button, .project-card, .service-card, .marquee-item, .project-tech-item, .project-feature-card, .project-gallery-item, .project-stat-item, input, textarea"
            );
            hoverTargets.forEach(function(el) {
                el.addEventListener("mouseenter", function() { companion.classList.add("hovering"); });
                el.addEventListener("mouseleave", function() { companion.classList.remove("hovering"); });
            });

            // Spawning code-symbol particle trail — throttled so it's
            // a clear, visible trail rather than a performance hazard.
            const PARTICLE_CHARS = ["<", ">", "{", "}", ";", "/", "*", "=", "()"];
            let lastParticleAt = 0;
            window.addEventListener("mousemove", function(e) {
                const now = performance.now();
                if (now - lastParticleAt < 90) return;
                lastParticleAt = now;
                const p = document.createElement("span");
                p.className = "cursor-particle";
                p.textContent = PARTICLE_CHARS[Math.floor(Math.random() * PARTICLE_CHARS.length)];
                p.style.left = e.clientX + "px";
                p.style.top = e.clientY + "px";
                p.style.fontSize = (11 + Math.random() * 6).toFixed(0) + "px";
                p.style.setProperty("--dx", ((Math.random() - 0.5) * 40).toFixed(0) + "px");
                p.style.setProperty("--rot", ((Math.random() - 0.5) * 60).toFixed(0) + "deg");
                document.body.appendChild(p);
                p.addEventListener("animationend", function() { p.remove(); });
            });
        }

        // ------------------------------------------------------------
        // Hero headline — letters assemble on load (the one signature
        // page-load moment; everything else stays quiet by comparison)
        // ------------------------------------------------------------
        (function() {
            const target = document.querySelector(".title-gradient");
            if (!target || !motionOn) return;
            const text = target.textContent;
            target.textContent = "";
            target.setAttribute("aria-label", text);
            const spans = text.split("").map(function(ch) {
                const span = document.createElement("span");
                span.textContent = ch;
                span.className = "letter-in";
                target.appendChild(span);
                return span;
            });
            const totalWidth = target.offsetWidth;
            spans.forEach(function(span, i) {
                span.style.backgroundSize = totalWidth + "px 100%";
                span.style.backgroundPositionX = (-span.offsetLeft) + "px";
                span.style.animationDelay = (0.35 + i * 0.04) + "s";
            });
        })();

        // ------------------------------------------------------------
        // Tech showcase band — duplicate each row for a seamless loop
        // only when motion is actually on; otherwise leave it as a
        // clean static wrapped set of chips (no scrollbar, no dupes).
        // ------------------------------------------------------------
        (function() {
            const band = document.querySelector(".marquee-band");
            if (!band) return;
            if (!motionOn) {
                band.classList.add("marquee-static");
                return;
            }
            band.querySelectorAll(".marquee-track").forEach(function(track) {
                track.innerHTML += track.innerHTML;
            });
        })();

        // ------------------------------------------------------------
        // Typewriter — cycles through role titles in the hero subtitle
        // ------------------------------------------------------------
        (function() {
            const el = document.getElementById("typewriter-role");
            if (!el) return;
            const words = ["Flutter Developer", "Full-Stack Engineer", "Mobile App Specialist", "Clean Architecture Advocate"];

            if (!motionOn) {
                el.textContent = words[0];
                return;
            }

            let wordIndex = 0, charIndex = words[0].length, deleting = false;

            function tick() {
                const word = words[wordIndex];
                if (deleting) {
                    charIndex--;
                    el.textContent = word.slice(0, charIndex);
                    if (charIndex === 0) {
                        deleting = false;
                        wordIndex = (wordIndex + 1) % words.length;
                        setTimeout(tick, 400);
                        return;
                    }
                    setTimeout(tick, 35);
                } else {
                    charIndex++;
                    el.textContent = word.slice(0, charIndex);
                    if (charIndex === word.length) {
                        deleting = true;
                        setTimeout(tick, 1800);
                        return;
                    }
                    setTimeout(tick, 65);
                }
            }
            setTimeout(tick, 2200);
        })();

        console.log("🚀 Abedalrahman's portfolio loaded successfully!");
