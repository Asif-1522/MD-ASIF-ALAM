/* ==========================================
   EXTRA INTERACTIVITY LAYER
   Custom cursor, magnetic elements, animated
   nav indicator, flip cards, click particles.
========================================== */

(function () {

    const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

    const supportsHover = window.matchMedia(
        "(hover: hover) and (pointer: fine)"
    ).matches;

    /* ==========================================
       CUSTOM MAGNETIC CURSOR
    ========================================== */

    if (supportsHover && !prefersReducedMotion) {

        const dot = document.getElementById("cursor-dot");
        const ring = document.getElementById("cursor-ring");

        if (dot && ring) {

            let mouseX = window.innerWidth / 2;
            let mouseY = window.innerHeight / 2;

            let ringX = mouseX;
            let ringY = mouseY;

            document.addEventListener("mousemove", (e) => {

                mouseX = e.clientX;
                mouseY = e.clientY;

                dot.style.left = `${mouseX}px`;
                dot.style.top = `${mouseY}px`;

                document.body.classList.add("cursor-active");

            });

            document.addEventListener("mouseleave", () => {
                document.body.classList.remove("cursor-active");
            });

            function ringLoop() {

                ringX += (mouseX - ringX) * 0.18;
                ringY += (mouseY - ringY) * 0.18;

                ring.style.left = `${ringX}px`;
                ring.style.top = `${ringY}px`;

                requestAnimationFrame(ringLoop);

            }

            ringLoop();

            const hoverTargets = document.querySelectorAll(
                "a, button, .skill-card, .project-card, .certificate-card, .timeline-item, .education-card, input, textarea"
            );

            hoverTargets.forEach((el) => {

                el.addEventListener("mouseenter", () => {
                    ring.classList.add("cursor-hover");
                });

                el.addEventListener("mouseleave", () => {
                    ring.classList.remove("cursor-hover");
                });

            });

        }

    }

    /* ==========================================
       MAGNETIC PULL ON BUTTONS / ICONS / NAV LINKS
    ========================================== */

    if (supportsHover && !prefersReducedMotion) {

        const magneticEls = document.querySelectorAll(
            ".btn, .social-icons a, .footer-icons a, .nav-links a"
        );

        magneticEls.forEach((el) => {

            let rect;

            el.addEventListener("mouseenter", () => {
                rect = el.getBoundingClientRect();
            });

            el.addEventListener("mousemove", (e) => {

                if (!rect) rect = el.getBoundingClientRect();

                const relX = e.clientX - (rect.left + rect.width / 2);
                const relY = e.clientY - (rect.top + rect.height / 2);

                el.style.transform =
                    `translate(${relX * 0.28}px, ${relY * 0.35}px)`;

            });

            el.addEventListener("mouseleave", () => {
                el.style.transform = "translate(0,0)";
            });

        });

    }

    /* ==========================================
       ANIMATED NAV INDICATOR
    ========================================== */

    const navbar = document.querySelector(".navbar");
    const navIndicator = document.querySelector(".nav-indicator");
    const navLinkEls = document.querySelectorAll(".nav-links a");

    if (navbar && navIndicator && navLinkEls.length) {

        function moveIndicatorTo(linkEl) {

            const navRect = navbar.getBoundingClientRect();
            const linkRect = linkEl.getBoundingClientRect();

            navIndicator.style.width = `${linkRect.width + 24}px`;
            navIndicator.style.transform =
                `translateX(${linkRect.left - navRect.left - 12}px)`;

            navIndicator.classList.add("show");

        }

        navLinkEls.forEach((link) => {

            link.addEventListener("mouseenter", () => moveIndicatorTo(link));

        });

        navbar.addEventListener("mouseleave", () => {

            const activeLink = document.querySelector(".nav-links a.active");

            if (activeLink) {
                moveIndicatorTo(activeLink);
            } else {
                navIndicator.classList.remove("show");
            }

        });

        // Keep indicator synced with the active section as user scrolls
        const navObserverTarget = () =>
            document.querySelector(".nav-links a.active");

        window.addEventListener("scroll", () => {

            const activeLink = navObserverTarget();

            if (activeLink && !navbar.matches(":hover")) {
                moveIndicatorTo(activeLink);
            }

        }, { passive: true });

        window.addEventListener("resize", () => {

            const activeLink = navObserverTarget();
            if (activeLink) moveIndicatorTo(activeLink);

        });

    }

    /* ==========================================
       CLICK-TO-FLIP CARDS (skills & certificates)
    ========================================== */

    document.querySelectorAll(".skill-card").forEach((card) => {

        const progress = card.querySelector(".skill-progress");

        if (progress) {
            progress.style.setProperty("--level", `${progress.dataset.level || 0}%`);
        }

        card.addEventListener("click", () => {
            card.classList.toggle("flipped");
        });

    });

    document.querySelectorAll(".certificate-card").forEach((card) => {

        card.addEventListener("click", () => {
            card.classList.toggle("flipped");
        });

    });

    /* ==========================================
       CLICK PARTICLE BURST (buttons)
    ========================================== */

    if (!prefersReducedMotion) {

        document.querySelectorAll(".btn").forEach((button) => {

            button.addEventListener("click", (e) => {

                const originX = e.clientX;
                const originY = e.clientY;

                const count = 10;

                for (let i = 0; i < count; i++) {

                    const particle = document.createElement("span");
                    particle.className = "burst-particle";

                    const angle = (Math.PI * 2 * i) / count;
                    const distance = 40 + Math.random() * 30;

                    const bx = Math.cos(angle) * distance;
                    const by = Math.sin(angle) * distance;

                    particle.style.setProperty("--bx", `${bx}px`);
                    particle.style.setProperty("--by", `${by}px`);

                    particle.style.left = `${originX}px`;
                    particle.style.top = `${originY}px`;

                    if (i % 2 === 0) {
                        particle.style.background = "var(--accent)";
                    } else {
                        particle.style.background = "var(--primary)";
                    }

                    document.body.appendChild(particle);

                    setTimeout(() => particle.remove(), 750);

                }

            });

        });

    }

})();
