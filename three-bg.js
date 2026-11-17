/* ==========================================
   3D DATA NETWORK BACKGROUND (Three.js)
   A rotating cloud of connected nodes in the
   hero section — a nod to data analysis:
   points of data, linked and visualized.
========================================== */

(function () {

    const container = document.getElementById("hero-canvas");

    if (!container || typeof THREE === "undefined") return;

    // Respect reduced-motion preference
    const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

    let width = container.clientWidth;
    let height = container.clientHeight;

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000);
    camera.position.z = 42;

    const renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true
    });

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);
    container.appendChild(renderer.domElement);

    /* ---------- Build the node network ---------- */

    const NODE_COUNT = 70;
    const RADIUS = 22;

    const nodePositions = [];
    const nodesGeometry = new THREE.BufferGeometry();
    const positionArray = new Float32Array(NODE_COUNT * 3);

    for (let i = 0; i < NODE_COUNT; i++) {

        // Distribute points inside a sphere for a volumetric cloud
        const r = RADIUS * Math.cbrt(Math.random());
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos((Math.random() * 2) - 1);

        const x = r * Math.sin(phi) * Math.cos(theta);
        const y = r * Math.sin(phi) * Math.sin(theta);
        const z = r * Math.cos(phi);

        nodePositions.push(new THREE.Vector3(x, y, z));

        positionArray[i * 3] = x;
        positionArray[i * 3 + 1] = y;
        positionArray[i * 3 + 2] = z;

    }

    nodesGeometry.setAttribute(
        "position",
        new THREE.BufferAttribute(positionArray, 3)
    );

    const nodesMaterial = new THREE.PointsMaterial({
        color: 0x06b6d4,
        size: 0.9,
        transparent: true,
        opacity: 0.85,
        sizeAttenuation: true
    });

    const points = new THREE.Points(nodesGeometry, nodesMaterial);

    const group = new THREE.Group();
    group.add(points);

    /* ---------- Connect nearby nodes with faint lines ---------- */

    const linePositions = [];
    const LINK_DISTANCE = 8.5;

    for (let i = 0; i < NODE_COUNT; i++) {

        for (let j = i + 1; j < NODE_COUNT; j++) {

            const dist = nodePositions[i].distanceTo(nodePositions[j]);

            if (dist < LINK_DISTANCE) {

                linePositions.push(
                    nodePositions[i].x, nodePositions[i].y, nodePositions[i].z,
                    nodePositions[j].x, nodePositions[j].y, nodePositions[j].z
                );

            }

        }

    }

    const linesGeometry = new THREE.BufferGeometry();
    linesGeometry.setAttribute(
        "position",
        new THREE.BufferAttribute(new Float32Array(linePositions), 3)
    );

    const linesMaterial = new THREE.LineBasicMaterial({
        color: 0x4f46e5,
        transparent: true,
        opacity: 0.18
    });

    const lines = new THREE.LineSegments(linesGeometry, linesMaterial);

    group.add(lines);

    scene.add(group);

    /* ---------- Mouse parallax ---------- */

    let targetRotX = 0;
    let targetRotY = 0;

    window.addEventListener("mousemove", (e) => {

        targetRotY = (e.clientX / window.innerWidth - 0.5) * 0.6;
        targetRotX = (e.clientY / window.innerHeight - 0.5) * 0.6;

    });

    /* ---------- Resize handling ---------- */

    function handleResize() {

        width = container.clientWidth;
        height = container.clientHeight;

        if (width === 0 || height === 0) return;

        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        renderer.setSize(width, height);

    }

    window.addEventListener("resize", handleResize);

    /* ---------- Animation loop ---------- */

    let frameId;
    let paused = false;

    function animate() {

        frameId = requestAnimationFrame(animate);

        if (paused) return;

        group.rotation.y += prefersReducedMotion ? 0.0005 : 0.0018;

        group.rotation.x += (targetRotX - group.rotation.x) * 0.03;
        group.rotation.z += (targetRotY * 0.3 - group.rotation.z) * 0.03;

        renderer.render(scene, camera);

    }

    animate();

    // Pause rendering when hero is off-screen (perf friendly)
    const heroSection = document.getElementById("home");

    if ("IntersectionObserver" in window && heroSection) {

        const observer = new IntersectionObserver((entries) => {

            entries.forEach((entry) => {
                paused = !entry.isIntersecting;
            });

        }, { threshold: 0.05 });

        observer.observe(heroSection);

    }

    window.addEventListener("beforeunload", () => {
        cancelAnimationFrame(frameId);
    });

})();
