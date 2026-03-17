// ===== PORTFOLIO V3 — MATRIX COSMOS — main.js =====

import * as THREE from 'three';

// =====================================================
// 1. THREE.JS PARTICLE NEBULA (Layer 1)
// =====================================================
const nebulaCanvas = document.getElementById('nebulaCanvas');
const renderer = new THREE.WebGLRenderer({
  canvas: nebulaCanvas,
  antialias: false,
  alpha: true,
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;

// Particle count
const PARTICLE_COUNT = 1500;

// Custom shader material
const vertexShader = `
  attribute float aSize;
  attribute float aPhase;
  attribute vec3 aColor;
  uniform float uTime;
  uniform float uMorph;
  varying vec3 vColor;
  varying float vAlpha;

  // Noise function
  vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec4 permute(vec4 x) { return mod289(((x*34.0)+1.0)*x); }

  float snoise(vec3 v) {
    const vec2 C = vec2(1.0/6.0, 1.0/3.0);
    const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
    vec3 i = floor(v + dot(v, C.yyy));
    vec3 x0 = v - i + dot(i, C.xxx);
    vec3 g = step(x0.yzx, x0.xyz);
    vec3 l = 1.0 - g;
    vec3 i1 = min(g.xyz, l.zxy);
    vec3 i2 = max(g.xyz, l.zxy);
    vec3 x1 = x0 - i1 + C.xxx;
    vec3 x2 = x0 - i2 + C.yyy;
    vec3 x3 = x0 - D.yyy;
    i = mod289(i);
    vec4 p = permute(permute(permute(
      i.z + vec4(0.0, i1.z, i2.z, 1.0))
      + i.y + vec4(0.0, i1.y, i2.y, 1.0))
      + i.x + vec4(0.0, i1.x, i2.x, 1.0));
    float n_ = 0.142857142857;
    vec3 ns = n_ * D.wyz - D.xzx;
    vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
    vec4 x_ = floor(j * ns.z);
    vec4 y_ = floor(j - 7.0 * x_);
    vec4 x = x_ * ns.x + ns.yyyy;
    vec4 y = y_ * ns.x + ns.yyyy;
    vec4 h = 1.0 - abs(x) - abs(y);
    vec4 b0 = vec4(x.xy, y.xy);
    vec4 b1 = vec4(x.zw, y.zw);
    vec4 s0 = floor(b0)*2.0 + 1.0;
    vec4 s1 = floor(b1)*2.0 + 1.0;
    vec4 sh = -step(h, vec4(0.0));
    vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy;
    vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww;
    vec3 p0 = vec3(a0.xy, h.x);
    vec3 p1 = vec3(a0.zw, h.y);
    vec3 p2 = vec3(a1.xy, h.z);
    vec3 p3 = vec3(a1.zw, h.w);
    vec4 norm = 1.79284291400159 - 0.85373472095314 * vec4(dot(p0,p0), dot(p1,p1), dot(p2,p2), dot(p3,p3));
    p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;
    vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
    m = m * m;
    return 42.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
  }

  void main() {
    vColor = aColor;

    float angle = aPhase * 6.2832;
    float radius = 1.8 + sin(aPhase * 12.0 + uTime * 0.3) * 0.5;

    // Nebula ring shape
    vec3 nebulaPos = vec3(
      cos(angle) * radius,
      sin(angle * 0.7 + uTime * 0.1) * 0.6,
      sin(angle) * radius
    );

    // Add noise-based displacement
    float n = snoise(position * 0.5 + uTime * 0.08);
    nebulaPos += position * 0.3 + vec3(n * 0.4);

    // Morph between shapes
    float morphPhase = sin(uTime * 0.15) * 0.5 + 0.5;

    // Diamond shape
    vec3 diamondPos = vec3(
      cos(angle) * (1.5 + abs(sin(angle * 2.0))),
      sin(angle * 2.0) * 1.2,
      sin(angle) * (1.5 + abs(cos(angle * 2.0)))
    ) + position * 0.2;

    vec3 finalPos = mix(nebulaPos, diamondPos, morphPhase * uMorph);

    // Pulse size
    float pulse = 1.0 + sin(uTime * 2.0 + aPhase * 20.0) * 0.3;
    float size = aSize * pulse;

    vAlpha = 0.4 + sin(uTime + aPhase * 10.0) * 0.3;

    vec4 mvPosition = modelViewMatrix * vec4(finalPos, 1.0);
    gl_PointSize = size * (200.0 / -mvPosition.z);
    gl_Position = projectionMatrix * mvPosition;
  }
`;

const fragmentShader = `
  varying vec3 vColor;
  varying float vAlpha;

  void main() {
    float dist = length(gl_PointCoord - vec2(0.5));
    if (dist > 0.5) discard;

    // Soft glow
    float glow = 1.0 - smoothstep(0.0, 0.5, dist);
    glow = pow(glow, 1.5);

    gl_FragColor = vec4(vColor, glow * vAlpha);
  }
`;

// Create geometry
const geometry = new THREE.BufferGeometry();
const positions = new Float32Array(PARTICLE_COUNT * 3);
const sizes = new Float32Array(PARTICLE_COUNT);
const phases = new Float32Array(PARTICLE_COUNT);
const colors = new Float32Array(PARTICLE_COUNT * 3);

const colorPalette = [
  new THREE.Color('#4f8ffa'),
  new THREE.Color('#7bb5ff'),
  new THREE.Color('#a78bfa'),
  new THREE.Color('#7dd3fc'),
];

for (let i = 0; i < PARTICLE_COUNT; i++) {
  const i3 = i * 3;

  // Random positions in a spherical area
  const theta = Math.random() * Math.PI * 2;
  const phi = Math.acos(2 * Math.random() - 1);
  const r = 1.5 + Math.random() * 2;

  positions[i3] = r * Math.sin(phi) * Math.cos(theta);
  positions[i3 + 1] = r * Math.sin(phi) * Math.sin(theta) * 0.4; // Flatten Y
  positions[i3 + 2] = r * Math.cos(phi);

  sizes[i] = Math.random() * 3 + 0.5;
  phases[i] = Math.random();

  const col = colorPalette[Math.floor(Math.random() * colorPalette.length)];
  colors[i3] = col.r;
  colors[i3 + 1] = col.g;
  colors[i3 + 2] = col.b;
}

geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
geometry.setAttribute('aSize', new THREE.BufferAttribute(sizes, 1));
geometry.setAttribute('aPhase', new THREE.BufferAttribute(phases, 1));
geometry.setAttribute('aColor', new THREE.BufferAttribute(colors, 3));

const material = new THREE.ShaderMaterial({
  vertexShader,
  fragmentShader,
  uniforms: {
    uTime: { value: 0 },
    uMorph: { value: 0.5 },
  },
  transparent: true,
  blending: THREE.AdditiveBlending,
  depthWrite: false,
});

const particles = new THREE.Points(geometry, material);
scene.add(particles);

// Mouse interaction
const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };

// Nebula animation loop
let nebulaTime = 0;
function animateNebula() {
  requestAnimationFrame(animateNebula);
  nebulaTime += 0.005;
  material.uniforms.uTime.value = nebulaTime;

  // Smooth mouse follow for camera
  mouse.x += (mouse.targetX - mouse.x) * 0.02;
  mouse.y += (mouse.targetY - mouse.y) * 0.02;

  camera.position.x = mouse.x * 0.5;
  camera.position.y = mouse.y * 0.3;
  camera.lookAt(0, 0, 0);

  // Slow rotation
  particles.rotation.y += 0.001;
  particles.rotation.x = Math.sin(nebulaTime * 0.5) * 0.05;

  renderer.render(scene, camera);
}
animateNebula();

// =====================================================
// 2. MATRIX RAIN (Layer 2)
// =====================================================
const matrixCanvas = document.getElementById('matrixCanvas');
const ctx = matrixCanvas.getContext('2d');

function resizeMatrixCanvas() {
  matrixCanvas.width = window.innerWidth;
  matrixCanvas.height = window.innerHeight;
}
resizeMatrixCanvas();

// Katakana characters
const katakana = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
const latin = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
const chars = katakana + latin;

const fontSize = 14;
let columns = Math.floor(matrixCanvas.width / fontSize);
let drops = new Array(columns).fill(1);

// Random start positions for natural look
for (let i = 0; i < drops.length; i++) {
  drops[i] = Math.floor(Math.random() * matrixCanvas.height / fontSize) * -1;
}

function drawMatrix() {
  // Very subtle trail effect
  ctx.fillStyle = 'rgba(1, 1, 8, 0.04)';
  ctx.fillRect(0, 0, matrixCanvas.width, matrixCanvas.height);

  for (let i = 0; i < drops.length; i++) {
    const text = chars.charAt(Math.floor(Math.random() * chars.length));
    const x = i * fontSize;
    const y = drops[i] * fontSize;

    // Lead character slightly brighter
    if (Math.random() > 0.95) {
      ctx.fillStyle = 'rgba(79, 143, 250, 0.45)';
      ctx.font = `bold ${fontSize}px ${getComputedStyle(document.documentElement).getPropertyValue('--font-mono').trim() || 'monospace'}`;
    } else {
      ctx.fillStyle = 'rgba(79, 143, 250, 0.25)';
      ctx.font = `${fontSize}px ${getComputedStyle(document.documentElement).getPropertyValue('--font-mono').trim() || 'monospace'}`;
    }

    ctx.fillText(text, x, y);

    // Reset when off screen
    if (y > matrixCanvas.height && Math.random() > 0.975) {
      drops[i] = 0;
    }
    drops[i]++;
  }

  requestAnimationFrame(drawMatrix);
}
drawMatrix();

// =====================================================
// 3. GSAP ANIMATIONS
// =====================================================
gsap.registerPlugin(ScrollTrigger);

// --- Hero Intro Animation ---
const heroTl = gsap.timeline({ delay: 0.3 });

heroTl
  .to('.hero-name-line', {
    opacity: 1,
    y: 0,
    duration: 1.2,
    stagger: 0.15,
    ease: 'power3.out',
  })
  .add(() => {
    typeText();
  }, '-=0.4')
  .to('.hero-scroll-indicator', {
    opacity: 1,
    duration: 0.8,
    ease: 'power2.out',
  }, '+=1');

// Typing effect for subtitle
function typeText() {
  const subtitle = document.getElementById('heroSubtitle');
  const text = 'Software Engineer & Creative Developer';
  let i = 0;
  subtitle.innerHTML = '<span class="typing-cursor"></span>';

  function type() {
    if (i < text.length) {
      subtitle.innerHTML = text.substring(0, i + 1) + '<span class="typing-cursor"></span>';
      i++;
      setTimeout(type, 50 + Math.random() * 30);
    } else {
      // Remove cursor after a pause
      setTimeout(() => {
        subtitle.innerHTML = text;
      }, 2000);
    }
  }
  type();
}

// --- Hero Scroll Pinning ---
const heroPin = gsap.timeline({
  scrollTrigger: {
    trigger: '#hero',
    start: 'top top',
    end: 'bottom top',
    pin: '.hero-pin-wrapper',
    scrub: 1,
  },
});

// Phase 1: Name fades out & parallaxes up
heroPin
  .to('.hero-name-container', {
    y: -150,
    opacity: 0,
    duration: 0.4,
    ease: 'none',
  })
  .to('.hero-scroll-indicator', {
    opacity: 0,
    duration: 0.1,
  }, 0)
  // Phase 2: Manifesto fades in
  .to('#heroManifesto', {
    opacity: 1,
    duration: 0.1,
  }, 0.35)
  .to('.manifesto-word', {
    opacity: 1,
    y: 0,
    duration: 0.08,
    stagger: 0.04,
    ease: 'power2.out',
  }, 0.35)
  // Phase 3: Manifesto fades out
  .to('#heroManifesto', {
    opacity: 0,
    y: -50,
    duration: 0.3,
    ease: 'none',
  }, 0.75);

// --- Nav show/hide ---
let lastScroll = 0;
const nav = document.getElementById('nav');
ScrollTrigger.create({
  trigger: document.body,
  start: 'top top',
  end: 'max',
  onUpdate: (self) => {
    const currentScroll = self.scroll();
    if (currentScroll > lastScroll && currentScroll > 100) {
      nav.classList.add('hidden');
    } else {
      nav.classList.remove('hidden');
    }
    lastScroll = currentScroll;
  },
});

// --- Section Reveals ---
document.querySelectorAll('.section-title, .about-text, .about-stats, .contact-headline, .contact-cta, .contact-socials').forEach((el) => {
  el.classList.add('reveal');
  ScrollTrigger.create({
    trigger: el,
    start: 'top 85%',
    once: true,
    onEnter: () => el.classList.add('active'),
  });
});

// Project cards: separate reveal that doesn't conflict with 3D
document.querySelectorAll('.project-card').forEach((el, i) => {
  gsap.from(el, {
    opacity: 0,
    y: 40,
    duration: 0.8,
    delay: i * 0.1,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: el,
      start: 'top 85%',
      once: true,
    },
  });
});

// --- Stat Counter Animation ---
document.querySelectorAll('.stat-number').forEach((el) => {
  const target = parseInt(el.getAttribute('data-target'), 10);
  ScrollTrigger.create({
    trigger: el,
    start: 'top 85%',
    once: true,
    onEnter: () => {
      gsap.to(el, {
        innerText: target,
        duration: 2,
        snap: { innerText: 1 },
        ease: 'power2.out',
        onUpdate: function () {
          el.textContent = Math.round(parseFloat(el.textContent));
        },
      });
    },
  });
});

// =====================================================
// 4. CUSTOM CURSOR
// =====================================================
const cursor = document.getElementById('cursor');
const cursorDot = document.getElementById('cursorDot');
let cursorX = 0, cursorY = 0;
let dotX = 0, dotY = 0;
let cursorVisible = false;

document.addEventListener('mousemove', (e) => {
  cursorX = e.clientX;
  if (!cursorVisible && cursor && cursorDot) {
    cursorVisible = true;
    cursor.style.opacity = '1';
    cursorDot.style.opacity = '1';
  }
  cursorY = e.clientY;

  // For nebula mouse repulsion
  mouse.targetX = (e.clientX / window.innerWidth - 0.5) * 2;
  mouse.targetY = -(e.clientY / window.innerHeight - 0.5) * 2;
});

function updateCursor() {
  dotX += (cursorX - dotX) * 0.15;
  dotY += (cursorY - dotY) * 0.15;

  cursor.style.left = dotX + 'px';
  cursor.style.top = dotY + 'px';

  cursorDot.style.left = cursorX + 'px';
  cursorDot.style.top = cursorY + 'px';

  requestAnimationFrame(updateCursor);
}
updateCursor();

// Cursor hover state
document.querySelectorAll('a, button, .magnetic-btn, .project-card, .orbit-item').forEach((el) => {
  el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
  el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
});

// =====================================================
// 5. MAGNETIC BUTTONS
// =====================================================
document.querySelectorAll('.magnetic-btn').forEach((btn) => {
  btn.addEventListener('mousemove', (e) => {
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    btn.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
  });

  btn.addEventListener('mouseleave', () => {
    btn.style.transform = '';
  });
});

// =====================================================
// 6. SMOOTH SCROLL NAVIGATION
// =====================================================
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', (e) => {
    e.preventDefault();
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      gsap.to(window, {
        scrollTo: { y: target, offsetY: 80 },
        duration: 1,
        ease: 'power3.inOut',
      });
    }
  });
});

// =====================================================
// 7. RESIZE HANDLER
// =====================================================
window.addEventListener('resize', () => {
  // Three.js
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);

  // Matrix canvas
  resizeMatrixCanvas();
  columns = Math.floor(matrixCanvas.width / fontSize);
  const newDrops = new Array(columns).fill(1);
  for (let i = 0; i < newDrops.length; i++) {
    newDrops[i] = drops[i] !== undefined ? drops[i] : Math.floor(Math.random() * -50);
  }
  drops = newDrops;
});

// =====================================================
// 8. PROJECT CARD FLIP (Click-based)
// =====================================================
document.querySelectorAll('.project-card').forEach((card) => {
  card.addEventListener('click', (e) => {
    // Don't flip if clicking a link
    if (e.target.closest('a')) return;
    card.classList.toggle('flipped');
  });
});

// =====================================================
// 9. EASTER EGG — Konami Code
// =====================================================
const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
let konamiIndex = 0;

document.addEventListener('keydown', (e) => {
  if (e.key === konamiCode[konamiIndex]) {
    konamiIndex++;
    if (konamiIndex === konamiCode.length) {
      konamiIndex = 0;
      // Activate rainbow mode
      document.documentElement.style.setProperty('--primary', '#ff6b6b');
      setTimeout(() => document.documentElement.style.setProperty('--primary', '#feca57'), 500);
      setTimeout(() => document.documentElement.style.setProperty('--primary', '#48dbfb'), 1000);
      setTimeout(() => document.documentElement.style.setProperty('--primary', '#ff9ff3'), 1500);
      setTimeout(() => document.documentElement.style.setProperty('--primary', '#4f8ffa'), 2500);
    }
  } else {
    konamiIndex = 0;
  }
});

// =====================================================
// 10. PRELOADER — hide after everything loads
// =====================================================
window.addEventListener('load', () => {
  document.body.style.opacity = '1';
});

console.log(
  '%c✦ Min Thep Portfolio V3 — Matrix Cosmos ✦',
  'background: #010108; color: #4f8ffa; font-size: 14px; padding: 8px 16px; border-radius: 4px; font-family: monospace;'
);
