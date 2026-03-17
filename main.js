// ============================================================
// DIGITAL COSMOS — Min Thep Portfolio
// Three.js Particle Universe · GSAP Animations · Interactions
// ============================================================

import * as THREE from 'three';

// --- Device Detection ---
const isMobile = /Android|iPhone|iPad|iPod|webOS|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth < 768;
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// ============================================================
// 1. THREE.JS PARTICLE UNIVERSE
// ============================================================
(function initParticleUniverse() {
  const canvas = document.getElementById('heroCanvas');
  if (!canvas) return;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.z = 8;

  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: false,
    alpha: true,
    powerPreference: 'high-performance'
  });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  // Particle count adaptive
  const PARTICLE_COUNT = isMobile ? 600 : 1500;
  const positions = new Float32Array(PARTICLE_COUNT * 3);
  const colors = new Float32Array(PARTICLE_COUNT * 3);
  const sizes = new Float32Array(PARTICLE_COUNT);
  const originalPositions = new Float32Array(PARTICLE_COUNT * 3);
  const velocities = new Float32Array(PARTICLE_COUNT * 3);

  // Color palette
  const colorPalette = [
    new THREE.Color(0x4f8ffa), // primary
    new THREE.Color(0x7bb5ff), // primary-bright
    new THREE.Color(0xa78bfa), // accent
    new THREE.Color(0x7dd3fc), // glow
    new THREE.Color(0x3a6bc7), // dimmer blue
  ];

  // Initialize particles in nebula shape — spread wider, keep center clear for text
  for (let i = 0; i < PARTICLE_COUNT; i++) {
    const i3 = i * 3;
    // Distribution that avoids center: min radius 2.5 so text area stays clear
    const radius = 2.5 + Math.pow(Math.random(), 0.5) * 6;
    const theta = Math.random() * Math.PI * 2;
    const phi = (Math.random() - 0.5) * Math.PI;
    
    positions[i3] = radius * Math.cos(theta) * Math.cos(phi);
    positions[i3 + 1] = radius * Math.sin(phi) * 0.5;
    positions[i3 + 2] = radius * Math.sin(theta) * Math.cos(phi) * 0.6 - 2;
    
    originalPositions[i3] = positions[i3];
    originalPositions[i3 + 1] = positions[i3 + 1];
    originalPositions[i3 + 2] = positions[i3 + 2];

    velocities[i3] = 0;
    velocities[i3 + 1] = 0;
    velocities[i3 + 2] = 0;

    const color = colorPalette[Math.floor(Math.random() * colorPalette.length)];
    colors[i3] = color.r;
    colors[i3 + 1] = color.g;
    colors[i3 + 2] = color.b;

    sizes[i] = Math.random() * 1.8 + 0.4;
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
  geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

  // Custom shader for particles
  const vertexShader = `
    attribute float size;
    varying vec3 vColor;
    void main() {
      vColor = color;
      vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
      gl_PointSize = size * (300.0 / -mvPosition.z);
      gl_Position = projectionMatrix * mvPosition;
    }
  `;

  const fragmentShader = `
    varying vec3 vColor;
    void main() {
      float dist = length(gl_PointCoord - vec2(0.5));
      if (dist > 0.5) discard;
      float alpha = 1.0 - smoothstep(0.0, 0.5, dist);
      gl_FragColor = vec4(vColor, alpha * 0.25);
    }
  `;

  const material = new THREE.ShaderMaterial({
    vertexShader,
    fragmentShader,
    vertexColors: true,
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending
  });

  const particles = new THREE.Points(geometry, material);
  scene.add(particles);

  // Mouse interaction
  const mouse = { x: 0, y: 0, worldX: 0, worldY: 0 };
  let isExploding = false;
  let explosionTime = 0;

  document.addEventListener('mousemove', (e) => {
    mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
    mouse.worldX = mouse.x * 5;
    mouse.worldY = mouse.y * 3;
  });

  // Click = BLOOM explosion
  canvas.addEventListener('click', () => {
    if (isExploding) return;
    isExploding = true;
    explosionTime = 0;

    const posAttr = geometry.attributes.position;
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const i3 = i * 3;
      const dx = posAttr.array[i3] - mouse.worldX;
      const dy = posAttr.array[i3 + 1] - mouse.worldY;
      const dz = posAttr.array[i3 + 2];
      const dist = Math.sqrt(dx * dx + dy * dy + dz * dz) + 0.1;
      const force = 8 / dist;

      velocities[i3] += (dx / dist) * force * (0.5 + Math.random());
      velocities[i3 + 1] += (dy / dist) * force * (0.5 + Math.random());
      velocities[i3 + 2] += (Math.random() - 0.5) * force;

      // Color burst
      const burstColor = colorPalette[Math.floor(Math.random() * colorPalette.length)];
      colors[i3] = burstColor.r;
      colors[i3 + 1] = burstColor.g;
      colors[i3 + 2] = burstColor.b;
    }
    geometry.attributes.color.needsUpdate = true;

    setTimeout(() => { isExploding = false; }, 2000);
  });

  // Shape targets for constellation morphing
  const shapes = {
    star: [],
    diamond: [],
    infinity: []
  };

  // Generate star shape — ensure particles stay away from center
  for (let i = 0; i < PARTICLE_COUNT; i++) {
    const angle = (i / PARTICLE_COUNT) * Math.PI * 2;
    const outerR = 5;
    const innerR = 3;
    const r = i % 2 === 0 ? outerR : innerR;
    const a = angle * 5;
    shapes.star.push(
      Math.cos(a) * r * (0.85 + Math.random() * 0.3),
      Math.sin(a) * r * (0.85 + Math.random() * 0.3),
      (Math.random() - 0.5) * 0.8 - 3
    );
  }

  // Generate diamond/ring shape
  for (let i = 0; i < PARTICLE_COUNT; i++) {
    const t = (i / PARTICLE_COUNT) * Math.PI * 2;
    const r = 3.5 + Math.random() * 1.5;
    shapes.diamond.push(
      Math.cos(t) * r * (0.85 + Math.random() * 0.3),
      Math.sin(t) * r * (0.85 + Math.random() * 0.3) * 0.6,
      (Math.random() - 0.5) * 0.6 - 3
    );
  }

  // Generate infinity/lemniscate shape — wide spread, pushed behind text
  for (let i = 0; i < PARTICLE_COUNT; i++) {
    const t = (i / PARTICLE_COUNT) * Math.PI * 2;
    const scale = 5.5;
    const x = scale * Math.cos(t) / (1 + Math.sin(t) * Math.sin(t));
    const y = scale * Math.sin(t) * Math.cos(t) / (1 + Math.sin(t) * Math.sin(t));
    shapes.infinity.push(
      x * (0.9 + Math.random() * 0.2),
      y * (0.9 + Math.random() * 0.2),
      (Math.random() - 0.5) * 0.5 - 3
    );
  }

  const shapeKeys = ['star', 'diamond', 'infinity'];
  let currentShapeIndex = -1; // -1 = nebula
  let shapeTransitionProgress = 0;
  let targetShape = null;
  let morphStartPositions = null;
  let lastShapeChange = 0;
  const SHAPE_INTERVAL = 10000; // 10s between morphs

  function startMorph() {
    currentShapeIndex = (currentShapeIndex + 1) % shapeKeys.length;
    targetShape = shapes[shapeKeys[currentShapeIndex]];
    morphStartPositions = new Float32Array(positions);
    shapeTransitionProgress = 0;
    lastShapeChange = Date.now();
  }

  // Animation loop
  let time = 0;
  function animate() {
    requestAnimationFrame(animate);
    time += 0.002;

    const posAttr = geometry.attributes.position;
    const sizeAttr = geometry.attributes.size;

    // Constellation morph timing
    if (!isExploding && Date.now() - lastShapeChange > SHAPE_INTERVAL) {
      startMorph();
    }

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const i3 = i * 3;

      if (isExploding) {
        // Apply explosion velocities
        posAttr.array[i3] += velocities[i3] * 0.02;
        posAttr.array[i3 + 1] += velocities[i3 + 1] * 0.02;
        posAttr.array[i3 + 2] += velocities[i3 + 2] * 0.02;

        // Damping
        velocities[i3] *= 0.96;
        velocities[i3 + 1] *= 0.96;
        velocities[i3 + 2] *= 0.96;
      } else {
        // Return to positions (original or target shape)
        let targetX, targetY, targetZ;

        if (targetShape && shapeTransitionProgress < 1) {
          shapeTransitionProgress += 0.003;
          const t = Math.min(shapeTransitionProgress, 1);
          const eased = t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
          
          targetX = morphStartPositions[i3] + (targetShape[i3] - morphStartPositions[i3]) * eased;
          targetY = morphStartPositions[i3 + 1] + (targetShape[i3 + 1] - morphStartPositions[i3 + 1]) * eased;
          targetZ = morphStartPositions[i3 + 2] + (targetShape[i3 + 2] - morphStartPositions[i3 + 2]) * eased;
        } else if (targetShape && shapeTransitionProgress >= 1) {
          targetX = targetShape[i3];
          targetY = targetShape[i3 + 1];
          targetZ = targetShape[i3 + 2];
        } else {
          targetX = originalPositions[i3];
          targetY = originalPositions[i3 + 1];
          targetZ = originalPositions[i3 + 2];
        }

        // Gentle return + floating motion
        posAttr.array[i3] += (targetX - posAttr.array[i3]) * 0.02;
        posAttr.array[i3 + 1] += (targetY - posAttr.array[i3 + 1]) * 0.02;
        posAttr.array[i3 + 2] += (targetZ - posAttr.array[i3 + 2]) * 0.02;

        // Add floating motion
        posAttr.array[i3] += Math.sin(time + i * 0.01) * 0.001;
        posAttr.array[i3 + 1] += Math.cos(time + i * 0.013) * 0.001;

        // Damping velocity
        velocities[i3] *= 0.95;
        velocities[i3 + 1] *= 0.95;
        velocities[i3 + 2] *= 0.95;
      }

      // Mouse repulsion (subtle)
      if (!isMobile) {
        const dx = posAttr.array[i3] - mouse.worldX;
        const dy = posAttr.array[i3 + 1] - mouse.worldY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 1.5) {
          const force = (1.5 - dist) * 0.02;
          posAttr.array[i3] += dx * force;
          posAttr.array[i3 + 1] += dy * force;
        }
      }

      // Pulsing sizes
      sizeAttr.array[i] = (Math.sin(time * 2 + i * 0.1) * 0.3 + 1.0) * (isMobile ? 1.2 : 1);
    }

    posAttr.needsUpdate = true;
    sizeAttr.needsUpdate = true;

    // Gentle scene rotation
    particles.rotation.y = time * 0.3;
    particles.rotation.x = Math.sin(time * 0.5) * 0.05;

    renderer.render(scene, camera);
  }

  if (!prefersReducedMotion) {
    animate();
  } else {
    renderer.render(scene, camera);
  }

  // Resize
  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });
})();


// ============================================================
// 2. CUSTOM CURSOR
// ============================================================
(function initCursor() {
  if (isMobile) return;

  const dot = document.getElementById('cursorDot');
  const glow = document.getElementById('cursorGlow');
  if (!dot || !glow) return;

  let cursorX = 0, cursorY = 0;
  let dotX = 0, dotY = 0;
  let glowX = 0, glowY = 0;

  let cursorVisible = false;
  document.addEventListener('mousemove', (e) => {
    cursorX = e.clientX;
    cursorY = e.clientY;
    if (!cursorVisible) {
      cursorVisible = true;
      dot.style.opacity = '1';
      glow.style.opacity = '1';
    }
  });

  // Hover detection for interactive elements
  const interactiveSelectors = 'a, button, .project-card, .social-btn, .hero-btn, .nav-link, .orbit-tag, .card-link, .easter-egg-btn, .contact-email';
  
  document.addEventListener('mouseover', (e) => {
    if (e.target.closest(interactiveSelectors)) {
      document.body.classList.add('cursor-hover');
    }
  });
  document.addEventListener('mouseout', (e) => {
    if (e.target.closest(interactiveSelectors)) {
      document.body.classList.remove('cursor-hover');
    }
  });

  function updateCursor() {
    dotX += (cursorX - dotX) * 0.3;
    dotY += (cursorY - dotY) * 0.3;
    glowX += (cursorX - glowX) * 0.12;
    glowY += (cursorY - glowY) * 0.12;

    dot.style.left = dotX + 'px';
    dot.style.top = dotY + 'px';
    glow.style.left = glowX + 'px';
    glow.style.top = glowY + 'px';

    requestAnimationFrame(updateCursor);
  }
  updateCursor();
})();


// ============================================================
// 3. NAVIGATION — Active Section Tracking + Indicator
// ============================================================
(function initNavigation() {
  const nav = document.getElementById('nav');
  const links = document.querySelectorAll('.nav-link');
  const indicator = document.querySelector('.nav-indicator');
  const sections = ['hero', 'about', 'skills', 'projects', 'contact'];

  function updateIndicator(activeLink) {
    if (!activeLink || !indicator) return;
    const rect = activeLink.getBoundingClientRect();
    const pillRect = activeLink.parentElement.getBoundingClientRect();
    indicator.style.width = rect.width + 'px';
    indicator.style.transform = `translateX(${rect.left - pillRect.left - 8}px)`;
  }

  // Set initial indicator
  const firstActive = document.querySelector('.nav-link.active');
  if (firstActive) {
    setTimeout(() => updateIndicator(firstActive), 100);
  }

  // Click handling
  links.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.getElementById(link.dataset.section);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // Scroll spy
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        links.forEach(l => l.classList.remove('active'));
        const active = document.querySelector(`.nav-link[data-section="${id}"]`);
        if (active) {
          active.classList.add('active');
          updateIndicator(active);
        }
      }
    });
  }, { threshold: 0.3, rootMargin: '-10% 0px -10% 0px' });

  sections.forEach(id => {
    const el = document.getElementById(id);
    if (el) observer.observe(el);
  });

  // Re-calc indicator on resize
  window.addEventListener('resize', () => {
    const active = document.querySelector('.nav-link.active');
    if (active) updateIndicator(active);
  });
})();


// ============================================================
// 4. GSAP SCROLL ANIMATIONS
// ============================================================
(function initScrollAnimations() {
  if (prefersReducedMotion) return;

  gsap.registerPlugin(ScrollTrigger);

  // Reveal elements
  document.querySelectorAll('[data-reveal]').forEach(el => {
    ScrollTrigger.create({
      trigger: el,
      start: 'top 85%',
      once: true,
      onEnter: () => el.classList.add('revealed')
    });
  });

  // Parallax hero on scroll
  gsap.to('.hero-content', {
    y: -100,
    opacity: 0,
    ease: 'none',
    scrollTrigger: {
      trigger: '.hero',
      start: 'top top',
      end: 'bottom top',
      scrub: true
    }
  });

  // Scroll indicator fade
  gsap.to('.scroll-indicator', {
    opacity: 0,
    ease: 'none',
    scrollTrigger: {
      trigger: '.hero',
      start: '10% top',
      end: '30% top',
      scrub: true
    }
  });
})();


// ============================================================
// 5. GLITCH TEXT EFFECT
// ============================================================
(function initGlitchEffect() {
  const glitchEl = document.querySelector('.glitch-text');
  if (!glitchEl) return;

  // Trigger on load
  setTimeout(() => {
    glitchEl.classList.add('active');
    setTimeout(() => glitchEl.classList.remove('active'), 400);
  }, 1200);

  // Periodic glitch
  setInterval(() => {
    glitchEl.classList.add('active');
    setTimeout(() => glitchEl.classList.remove('active'), 400);
  }, 5000);
})();


// ============================================================
// 6. STATS COUNTER ANIMATION
// ============================================================
(function initCounters() {
  const counters = document.querySelectorAll('.stat-number');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.dataset.count);
        const suffix = el.dataset.suffix || '';
        const duration = 1500;
        const start = performance.now();

        function update(now) {
          const elapsed = now - start;
          const progress = Math.min(elapsed / duration, 1);
          // Ease-out cubic
          const eased = 1 - Math.pow(1 - progress, 3);
          const current = Math.floor(eased * target);
          el.textContent = current + suffix;

          if (progress < 1) {
            requestAnimationFrame(update);
          } else {
            el.textContent = target + suffix;
          }
        }
        requestAnimationFrame(update);
        observer.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(c => observer.observe(c));
})();


// ============================================================
// 7. ORBITAL SYSTEM ROTATION
// ============================================================
(function initOrbitalRotation() {
  if (prefersReducedMotion) return;

  const orbits = document.querySelectorAll('.orbit');
  let time = 0;
  const speeds = [0.08, -0.05, 0.03]; // Different speeds per orbit

  function rotateOrbits() {
    time += 0.016; // ~60fps
    orbits.forEach((orbit, index) => {
      const angle = time * speeds[index] * (180 / Math.PI);
      // Only rotate the tags, not the ring
      const tags = orbit.querySelectorAll('.orbit-tag');
      tags.forEach(tag => {
        const baseAngle = parseFloat(getComputedStyle(tag).getPropertyValue('--angle'));
        const currentAngle = baseAngle + angle;
        const orbitRadius = getComputedStyle(tag).getPropertyValue('--orbit-radius').trim();
        tag.style.transform = `translate(-50%, -50%) rotate(${currentAngle}deg) translateX(${orbitRadius}) rotate(${-currentAngle}deg)`;
      });
    });
    requestAnimationFrame(rotateOrbits);
  }
  rotateOrbits();
})();


// ============================================================
// 8. PROJECT CARDS — 3D Tilt + Flip
// ============================================================
(function initProjectCards() {
  const cards = document.querySelectorAll('.project-card');

  cards.forEach(card => {
    const inner = card.querySelector('.card-inner');

    // Flip on click
    card.addEventListener('click', (e) => {
      // Don't flip if clicking a link
      if (e.target.closest('a')) return;
      card.classList.toggle('flipped');
    });

    if (isMobile) return;

    // 3D tilt on hover
    card.addEventListener('mousemove', (e) => {
      if (card.classList.contains('flipped')) return;
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -8;
      const rotateY = ((x - centerX) / centerX) * 8;

      inner.style.transform = `perspective(1200px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
    });

    card.addEventListener('mouseleave', () => {
      if (card.classList.contains('flipped')) {
        inner.style.transform = 'rotateY(180deg)';
      } else {
        inner.style.transform = '';
      }
    });
  });
})();


// ============================================================
// 9. MAGNETIC BUTTONS (Contact section)
// ============================================================
(function initMagneticButtons() {
  if (isMobile) return;

  const magneticBtns = document.querySelectorAll('.magnetic');

  magneticBtns.forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      const distance = Math.sqrt(x * x + y * y);
      const maxDist = 100;

      if (distance < maxDist) {
        const strength = 0.3;
        btn.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
      }
    });

    btn.addEventListener('mouseleave', () => {
      btn.style.transform = '';
      btn.style.transition = 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)';
      setTimeout(() => { btn.style.transition = ''; }, 400);
    });
  });
})();


// ============================================================
// 10. EASTER EGGS
// ============================================================

// --- Fireworks (Press K) ---
(function initFireworks() {
  const canvas = document.getElementById('fireworksCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let active = false;
  let particles = [];

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  class Firework {
    constructor(x, y) {
      this.x = x;
      this.y = y;
      this.particles = [];
      const count = 40 + Math.floor(Math.random() * 30);
      const hue = Math.random() * 360;
      for (let i = 0; i < count; i++) {
        const angle = (i / count) * Math.PI * 2;
        const speed = 2 + Math.random() * 4;
        this.particles.push({
          x, y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          life: 1,
          decay: 0.015 + Math.random() * 0.01,
          color: `hsl(${hue + Math.random() * 40 - 20}, 80%, ${50 + Math.random() * 30}%)`
        });
      }
    }
    update() {
      this.particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.05;
        p.vx *= 0.98;
        p.vy *= 0.98;
        p.life -= p.decay;
      });
      this.particles = this.particles.filter(p => p.life > 0);
    }
    draw() {
      this.particles.forEach(p => {
        ctx.globalAlpha = p.life;
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
        ctx.fill();
      });
    }
  }

  let fireworks = [];
  let animFrame;

  function animateFireworks() {
    if (!active && fireworks.length === 0) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      canvas.classList.remove('active');
      return;
    }

    ctx.globalAlpha = 0.15;
    ctx.fillStyle = '#010108';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    fireworks.forEach(fw => {
      fw.update();
      fw.draw();
    });
    fireworks = fireworks.filter(fw => fw.particles.length > 0);

    animFrame = requestAnimationFrame(animateFireworks);
  }

  let fireworkInterval;

  document.addEventListener('keydown', (e) => {
    if (e.key === 'k' || e.key === 'K') {
      if (active) return;
      active = true;
      canvas.classList.add('active');
      
      // Launch fireworks for 3 seconds
      fireworkInterval = setInterval(() => {
        fireworks.push(new Firework(
          Math.random() * canvas.width,
          Math.random() * canvas.height * 0.5
        ));
      }, 150);

      animateFireworks();

      setTimeout(() => {
        active = false;
        clearInterval(fireworkInterval);
      }, 3000);
    }
  });
})();

// --- Matrix Rain (Click ⌘ button) ---
(function initMatrixRain() {
  const canvas = document.getElementById('matrixCanvas');
  const btn = document.getElementById('matrixBtn');
  if (!canvas || !btn) return;

  const ctx = canvas.getContext('2d');
  let active = false;

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  const chars = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789';
  const fontSize = 14;
  let columns;
  let drops;

  function initDrops() {
    columns = Math.floor(canvas.width / fontSize);
    drops = new Array(columns).fill(0).map(() => Math.random() * -100);
  }
  initDrops();

  let animFrame;

  function drawMatrix() {
    if (!active) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      canvas.classList.remove('active');
      return;
    }

    ctx.fillStyle = 'rgba(1, 1, 8, 0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = '#4f8ffa';
    ctx.font = `${fontSize}px JetBrains Mono, monospace`;

    for (let i = 0; i < drops.length; i++) {
      const char = chars[Math.floor(Math.random() * chars.length)];
      const x = i * fontSize;
      const y = drops[i] * fontSize;

      // Bright lead character
      if (Math.random() > 0.5) {
        ctx.fillStyle = '#7bb5ff';
      } else {
        ctx.fillStyle = '#4f8ffa';
      }

      ctx.fillText(char, x, y);

      if (y > canvas.height && Math.random() > 0.975) {
        drops[i] = 0;
      }
      drops[i]++;
    }

    animFrame = requestAnimationFrame(drawMatrix);
  }

  btn.addEventListener('click', () => {
    if (active) return;
    active = true;
    initDrops();
    canvas.classList.add('active');
    drawMatrix();

    setTimeout(() => {
      active = false;
    }, 3000);
  });
})();


// ============================================================
// 11. SMOOTH SCROLL LINK FOR HERO CTA
// ============================================================
(function initSmoothLinks() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
})();


// ============================================================
// 12. SCROLL-BASED PARTICLE DENSITY HINT (Space voyage feeling)
// ============================================================
(function initScrollParticleHint() {
  if (prefersReducedMotion) return;

  // Add subtle background glow that changes based on scroll position
  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        const scrolled = window.scrollY / (document.body.scrollHeight - window.innerHeight);
        // Shift body background slightly based on scroll
        const r = Math.round(1 + scrolled * 4);
        const g = Math.round(1 + scrolled * 3);
        const b = Math.round(8 + scrolled * 20);
        document.body.style.background = `rgb(${r}, ${g}, ${b})`;
        ticking = false;
      });
      ticking = true;
    }
  });
})();
