// ============================================================
// DIGITAL ART GALLERY IN SPACE — Min Thep Portfolio
// Full-Page Three.js Flow Field · GSAP Animations · Interactions
// ============================================================

import * as THREE from 'three';

// --- Device Detection ---
const isMobile = /Android|iPhone|iPad|iPod|webOS|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth < 768;
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// ============================================================
// 1. FULL-PAGE PERLIN NOISE FLOW FIELD PARTICLES
// ============================================================
(function initFlowField() {
  const canvas = document.getElementById('bgCanvas');
  if (!canvas || prefersReducedMotion) return;

  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: false,
    alpha: true,
    powerPreference: 'high-performance'
  });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));

  const scene = new THREE.Scene();
  const camera = new THREE.OrthographicCamera(
    -window.innerWidth / 2, window.innerWidth / 2,
    window.innerHeight / 2, -window.innerHeight / 2,
    0.1, 100
  );
  camera.position.z = 10;

  // --- Simplex-inspired noise (fast 2D/3D) ---
  // Permutation table
  const perm = new Uint8Array(512);
  const grad3 = [
    [1,1,0],[-1,1,0],[1,-1,0],[-1,-1,0],
    [1,0,1],[-1,0,1],[1,0,-1],[-1,0,-1],
    [0,1,1],[0,-1,1],[0,1,-1],[0,-1,-1]
  ];
  (function initPerm() {
    const p = [];
    for (let i = 0; i < 256; i++) p[i] = i;
    for (let i = 255; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [p[i], p[j]] = [p[j], p[i]];
    }
    for (let i = 0; i < 512; i++) perm[i] = p[i & 255];
  })();

  function noise3D(x, y, z) {
    const X = Math.floor(x) & 255;
    const Y = Math.floor(y) & 255;
    const Z = Math.floor(z) & 255;
    x -= Math.floor(x);
    y -= Math.floor(y);
    z -= Math.floor(z);
    const u = fade(x);
    const v = fade(y);
    const w = fade(z);
    const A = perm[X] + Y;
    const AA = perm[A] + Z;
    const AB = perm[A + 1] + Z;
    const B = perm[X + 1] + Y;
    const BA = perm[B] + Z;
    const BB = perm[B + 1] + Z;
    return lerp(w,
      lerp(v,
        lerp(u, dot3(grad3[perm[AA] % 12], x, y, z), dot3(grad3[perm[BA] % 12], x - 1, y, z)),
        lerp(u, dot3(grad3[perm[AB] % 12], x, y - 1, z), dot3(grad3[perm[BB] % 12], x - 1, y - 1, z))
      ),
      lerp(v,
        lerp(u, dot3(grad3[perm[AA + 1] % 12], x, y, z - 1), dot3(grad3[perm[BA + 1] % 12], x - 1, y, z - 1)),
        lerp(u, dot3(grad3[perm[AB + 1] % 12], x, y - 1, z - 1), dot3(grad3[perm[BB + 1] % 12], x - 1, y - 1, z - 1))
      )
    );
  }

  function fade(t) { return t * t * t * (t * (t * 6 - 15) + 10); }
  function lerp(t, a, b) { return a + t * (b - a); }
  function dot3(g, x, y, z) { return g[0] * x + g[1] * y + g[2] * z; }

  // --- Particle system ---
  const PARTICLE_COUNT = isMobile ? 800 : 2000;
  const W = window.innerWidth;
  const H = window.innerHeight;

  const positions = new Float32Array(PARTICLE_COUNT * 3);
  const velocities = new Float32Array(PARTICLE_COUNT * 2); // vx, vy
  const lifetimes = new Float32Array(PARTICLE_COUNT);
  const sizes = new Float32Array(PARTICLE_COUNT);
  const alphas = new Float32Array(PARTICLE_COUNT);
  const colors = new Float32Array(PARTICLE_COUNT * 3);

  const colorPalette = [
    new THREE.Color(0x4f8ffa),
    new THREE.Color(0x7bb5ff),
    new THREE.Color(0xa78bfa),
    new THREE.Color(0x7dd3fc),
    new THREE.Color(0xc4b5fd),
    new THREE.Color(0xffffff),
  ];

  function respawn(i) {
    const i3 = i * 3;
    const i2 = i * 2;
    // Spawn across full viewport
    positions[i3]     = (Math.random() - 0.5) * W;
    positions[i3 + 1] = (Math.random() - 0.5) * H;
    positions[i3 + 2] = 0;
    velocities[i2]     = 0;
    velocities[i2 + 1] = 0;
    lifetimes[i] = Math.random();
    sizes[i] = 1.0 + Math.random() * 2.0;
    alphas[i] = 0;
    const c = colorPalette[Math.floor(Math.random() * colorPalette.length)];
    colors[i3]     = c.r;
    colors[i3 + 1] = c.g;
    colors[i3 + 2] = c.b;
  }

  for (let i = 0; i < PARTICLE_COUNT; i++) {
    respawn(i);
    lifetimes[i] = Math.random() * 0.8 + 0.1; // Start at varied lifetimes
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute('aSize', new THREE.BufferAttribute(sizes, 1));
  geometry.setAttribute('aAlpha', new THREE.BufferAttribute(alphas, 1));
  geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

  const vertexShader = `
    attribute float aSize;
    attribute float aAlpha;
    varying vec3 vColor;
    varying float vAlpha;
    void main() {
      vColor = color;
      vAlpha = aAlpha;
      vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
      gl_PointSize = aSize * 2.0;
      gl_Position = projectionMatrix * mvPosition;
    }
  `;

  const fragmentShader = `
    varying vec3 vColor;
    varying float vAlpha;
    void main() {
      float dist = length(gl_PointCoord - vec2(0.5));
      if (dist > 0.5) discard;
      float a = 1.0 - smoothstep(0.0, 0.5, dist);
      gl_FragColor = vec4(vColor, a * vAlpha);
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

  const points = new THREE.Points(geometry, material);
  scene.add(points);

  // Mouse tracking (NDC -> world)
  const mouse = { x: 99999, y: 99999, active: false };
  document.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX - W / 2;
    mouse.y = -(e.clientY - H / 2);
    mouse.active = true;
  });
  document.addEventListener('mouseleave', () => {
    mouse.active = false;
  });

  // Scroll tracking
  let scrollProgress = 0;
  window.addEventListener('scroll', () => {
    scrollProgress = window.scrollY / Math.max(1, document.body.scrollHeight - window.innerHeight);
  });

  // Noise parameters
  const NOISE_SCALE = 0.0015;
  const FLOW_SPEED = 0.6;
  const MOUSE_RADIUS = 150;
  const MOUSE_FORCE = 3;

  let time = 0;
  let currentW = W;
  let currentH = H;

  function animate() {
    requestAnimationFrame(animate);
    time += 0.003;

    // Scroll affects flow angle
    const scrollAngle = scrollProgress * Math.PI * 2;
    const posAttr = geometry.attributes.position;
    const alphaAttr = geometry.attributes.aAlpha;

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const i3 = i * 3;
      const i2 = i * 2;

      let px = positions[i3];
      let py = positions[i3 + 1];

      // Perlin noise field
      const nx = px * NOISE_SCALE;
      const ny = py * NOISE_SCALE;
      const nz = time + scrollAngle * 0.1;
      const angle = noise3D(nx, ny, nz) * Math.PI * 4;

      // Flow velocity
      const fx = Math.cos(angle) * FLOW_SPEED;
      const fy = Math.sin(angle) * FLOW_SPEED;

      velocities[i2]     = velocities[i2] * 0.92 + fx * 0.08;
      velocities[i2 + 1] = velocities[i2 + 1] * 0.92 + fy * 0.08;

      // Mouse repulsion
      if (mouse.active && !isMobile) {
        const dx = px - mouse.x;
        const dy = py - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < MOUSE_RADIUS && dist > 0) {
          const force = (MOUSE_RADIUS - dist) / MOUSE_RADIUS * MOUSE_FORCE;
          velocities[i2]     += (dx / dist) * force;
          velocities[i2 + 1] += (dy / dist) * force;
        }
      }

      // Update position
      px += velocities[i2];
      py += velocities[i2 + 1];

      // Lifetime
      lifetimes[i] += 0.002;

      // Fade in and out
      const life = lifetimes[i];
      if (life < 0.1) {
        alphas[i] = life / 0.1 * 0.18;
      } else if (life > 0.9) {
        alphas[i] = (1.0 - life) / 0.1 * 0.18;
      } else {
        alphas[i] = 0.18;
      }

      // Respawn if out of bounds or lifetime ended
      const margin = 100;
      if (life >= 1.0 ||
          px < -currentW / 2 - margin || px > currentW / 2 + margin ||
          py < -currentH / 2 - margin || py > currentH / 2 + margin) {
        respawn(i);
      } else {
        positions[i3] = px;
        positions[i3 + 1] = py;
      }
    }

    posAttr.needsUpdate = true;
    alphaAttr.needsUpdate = true;

    renderer.render(scene, camera);
  }

  animate();

  // Resize
  window.addEventListener('resize', () => {
    currentW = window.innerWidth;
    currentH = window.innerHeight;
    camera.left = -currentW / 2;
    camera.right = currentW / 2;
    camera.top = currentH / 2;
    camera.bottom = -currentH / 2;
    camera.updateProjectionMatrix();
    renderer.setSize(currentW, currentH);
  });
})();


// ============================================================
// 2. CUSTOM CURSOR (Fixed: starts hidden, shows on first move)
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
      // Jump to position immediately on first move
      dotX = cursorX;
      dotY = cursorY;
      glowX = cursorX;
      glowY = cursorY;
      dot.style.left = dotX + 'px';
      dot.style.top = dotY + 'px';
      glow.style.left = glowX + 'px';
      glow.style.top = glowY + 'px';
      // Then fade in
      requestAnimationFrame(() => {
        dot.style.opacity = '1';
        glow.style.opacity = '1';
      });
    }
  });

  // Hover detection
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

  const firstActive = document.querySelector('.nav-link.active');
  if (firstActive) {
    setTimeout(() => updateIndicator(firstActive), 100);
  }

  links.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.getElementById(link.dataset.section);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

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
// 5. STATS COUNTER ANIMATION
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
// 6. ORBITAL SYSTEM ROTATION
// ============================================================
(function initOrbitalRotation() {
  if (prefersReducedMotion) return;

  const orbits = document.querySelectorAll('.orbit');
  let time = 0;
  const speeds = [0.08, -0.05, 0.03];

  function rotateOrbits() {
    time += 0.016;
    orbits.forEach((orbit, index) => {
      const angle = time * speeds[index] * (180 / Math.PI);
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
// 7. PROJECT CARDS — 3D Tilt + Flip
// ============================================================
(function initProjectCards() {
  const cards = document.querySelectorAll('.project-card');

  cards.forEach(card => {
    const inner = card.querySelector('.card-inner');

    card.addEventListener('click', (e) => {
      if (e.target.closest('a')) return;
      card.classList.toggle('flipped');
    });

    if (isMobile) return;

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
// 8. MAGNETIC BUTTONS (Contact section)
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
// 9. EASTER EGGS
// ============================================================

// --- Fireworks (Press K) ---
(function initFireworks() {
  const canvas = document.getElementById('fireworksCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let active = false;

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

    requestAnimationFrame(animateFireworks);
  }

  let fireworkInterval;

  document.addEventListener('keydown', (e) => {
    if (e.key === 'k' || e.key === 'K') {
      if (active) return;
      active = true;
      canvas.classList.add('active');
      
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

// --- Matrix Rain (Click command button) ---
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

    requestAnimationFrame(drawMatrix);
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
// 10. SMOOTH SCROLL LINKS
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
