/* ==========================================
   3D TILT INTERACTIONS
   Adds pointer-driven perspective tilt to
   cards and the hero profile photo.
========================================== */

(function () {

    const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) return;

    // Skip on touch-only devices (no hover / no fine pointer)
    const supportsHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

    if (!supportsHover) return;

    /* ---------- Generic card tilt ---------- */

    function addTilt(el, { max = 10, scale = 1.03 } = {}) {

        // Add a glow layer for a nicer light-follows-cursor effect
        const glow = document.createElement("div");
        glow.className = "tilt-glow";
        el.appendChild(glow);

        let rect;

        function onEnter() {
            rect = el.getBoundingClientRect();
        }

        function onMove(e) {

            if (!rect) rect = el.getBoundingClientRect();

            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const px = x / rect.width;
            const py = y / rect.height;

            const rotY = (px - 0.5) * max * 2;
            const rotX = (0.5 - py) * max * 2;

            el.style.transform =
                `perspective(900px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale(${scale})`;

            glow.style.setProperty("--mx", `${px * 100}%`);
            glow.style.setProperty("--my", `${py * 100}%`);

        }

        function onLeave() {
            el.style.transform =
                "perspective(900px) rotateX(0deg) rotateY(0deg) scale(1)";
        }

        el.addEventListener("mouseenter", onEnter);
        el.addEventListener("mousemove", onMove);
        el.addEventListener("mouseleave", onLeave);

    }

    const tiltSelectors = [
        ".skill-card",
        ".project-card",
        ".certificate-card",
        ".timeline-item",
        ".education-card"
    ];

    document.querySelectorAll(tiltSelectors.join(",")).forEach((el) => {
        addTilt(el, { max: 9, scale: 1.03 });
    });

    /* ---------- Hero profile photo tilt ---------- */

    const heroImage = document.getElementById("tilt-hero-image");
    const heroImageInner = heroImage
        ? heroImage.querySelector(".hero-image-inner")
        : null;

    if (heroImage && heroImageInner) {

        let rect;

        heroImage.addEventListener("mouseenter", () => {
            rect = heroImage.getBoundingClientRect();
            heroImageInner.style.animationPlayState = "paused";
        });

        heroImage.addEventListener("mousemove", (e) => {

            if (!rect) rect = heroImage.getBoundingClientRect();

            const px = (e.clientX - rect.left) / rect.width;
            const py = (e.clientY - rect.top) / rect.height;

            const rotY = (px - 0.5) * 26;
            const rotX = (0.5 - py) * 26;

            heroImageInner.style.transform =
                `rotateX(${rotX}deg) rotateY(${rotY}deg)`;

        });

        heroImage.addEventListener("mouseleave", () => {
            heroImageInner.style.transform = "rotateX(0deg) rotateY(0deg)";
            heroImageInner.style.animationPlayState = "running";
        });

    }

})();
