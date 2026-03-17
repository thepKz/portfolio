/* ======================================
   MIN THEP — 3D PORTFOLIO
   Three.js Scene + GSAP Animations
   ====================================== */

import * as THREE from 'three';

// ========================
// THREE.JS 3D SCENE
// ========================

class Scene3D {
  constructor() {
    this.canvas = document.getElementById('three-canvas');
    if (!this.canvas) return;

    this.mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
    this.scrollY = 0;
    this.clock = new THREE.Clock();
    this.meshes = [];
    this.particles = null;

    this.init();
    this.createObjects();
    this.createParticles();
    this.addEventListeners();
    this.animate();
  }

  init() {
    // Scene
    this.scene = new THREE.Scene();
    this.scene.fog = new THREE.FogExp2(0x030014, 0.035);

    // Camera
    this.camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.1,
      100
    );
    this.camera.position.z = 20;

    // Renderer
    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      antialias: true,
      alpha: true,
    });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.setClearColor(0x030014, 1);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0x3b82f6, 0.3);
    this.scene.add(ambientLight);

    const pointLight1 = new THREE.PointLight(0x3b82f6, 2, 50);
    pointLight1.position.set(10, 10, 10);
    this.scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0x8b5cf6, 1.5, 50);
    pointLight2.position.set(-10, -5, 5);
    this.scene.add(pointLight2);

    const pointLight3 = new THREE.PointLight(0x60a5fa, 1, 30);
    pointLight3.position.set(0, 15, -10);
    this.scene.add(pointLight3);
  }

  createObjects() {
    const material = new THREE.MeshPhysicalMaterial({
      color: 0x3b82f6,
      wireframe: true,
      transparent: true,
      opacity: 0.25,
      emissive: 0x3b82f6,
      emissiveIntensity: 0.15,
    });

    const materialAlt = new THREE.MeshPhysicalMaterial({
      color: 0x8b5cf6,
      wireframe: true,
      transparent: true,
      opacity: 0.2,
      emissive: 0x8b5cf6,
      emissiveIntensity: 0.1,
    });

    const materialGlow = new THREE.MeshPhysicalMaterial({
      color: 0x60a5fa,
      wireframe: true,
      transparent: true,
      opacity: 0.18,
      emissive: 0x60a5fa,
      emissiveIntensity: 0.2,
    });

    // Icosahedron (main, center-right)
    const ico = new THREE.Mesh(
      new THREE.IcosahedronGeometry(3, 1),
      material
    );
    ico.position.set(7, 2, -5);
    ico.userData = { speed: 0.3, axis: new THREE.Vector3(1, 0.6, 0.3).normalize(), floatSpeed: 0.8, floatAmp: 0.5 };
    this.scene.add(ico);
    this.meshes.push(ico);

    // Torus Knot (left)
    const torusKnot = new THREE.Mesh(
      new THREE.TorusKnotGeometry(2, 0.5, 100, 16),
      materialAlt
    );
    torusKnot.position.set(-8, -3, -8);
    torusKnot.userData = { speed: 0.2, axis: new THREE.Vector3(0.5, 1, 0.2).normalize(), floatSpeed: 0.6, floatAmp: 0.7 };
    this.scene.add(torusKnot);
    this.meshes.push(torusKnot);

    // Octahedron (top left)
    const octa = new THREE.Mesh(
      new THREE.OctahedronGeometry(2, 0),
      materialGlow
    );
    octa.position.set(-5, 6, -6);
    octa.userData = { speed: 0.35, axis: new THREE.Vector3(0.3, 1, 0.5).normalize(), floatSpeed: 1.0, floatAmp: 0.4 };
    this.scene.add(octa);
    this.meshes.push(octa);

    // Torus (bottom right)
    const torus = new THREE.Mesh(
      new THREE.TorusGeometry(2, 0.4, 16, 40),
      material.clone()
    );
    torus.material.opacity = 0.15;
    torus.position.set(9, -5, -10);
    torus.userData = { speed: 0.25, axis: new THREE.Vector3(1, 0.3, 0.7).normalize(), floatSpeed: 0.5, floatAmp: 0.6 };
    this.scene.add(torus);
    this.meshes.push(torus);

    // Small sphere (accent)
    const sphere = new THREE.Mesh(
      new THREE.SphereGeometry(1.2, 20, 20),
      materialAlt.clone()
    );
    sphere.material.opacity = 0.15;
    sphere.position.set(3, -7, -4);
    sphere.userData = { speed: 0.4, axis: new THREE.Vector3(0.7, 0.5, 1).normalize(), floatSpeed: 1.2, floatAmp: 0.3 };
    this.scene.add(sphere);
    this.meshes.push(sphere);

    // Dodecahedron (far back)
    const dodeca = new THREE.Mesh(
      new THREE.DodecahedronGeometry(1.8, 0),
      materialGlow.clone()
    );
    dodeca.material.opacity = 0.12;
    dodeca.position.set(-10, 0, -12);
    dodeca.userData = { speed: 0.15, axis: new THREE.Vector3(0.4, 0.8, 0.6).normalize(), floatSpeed: 0.7, floatAmp: 0.8 };
    this.scene.add(dodeca);
    this.meshes.push(dodeca);
  }

  createParticles() {
    const count = 600;
    const positions = new Float32Array(count * 3);
    const sizes = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 60;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 60;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 40 - 10;
      sizes[i] = Math.random() * 2 + 0.5;
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

    const material = new THREE.PointsMaterial({
      color: 0x3b82f6,
      size: 0.08,
      transparent: true,
      opacity: 0.6,
      sizeAttenuation: true,
      blending: THREE.AdditiveBlending,
    });

    this.particles = new THREE.Points(geometry, material);
    this.scene.add(this.particles);
  }

  addEventListeners() {
    window.addEventListener('mousemove', (e) => {
      this.mouse.targetX = (e.clientX / window.innerWidth) * 2 - 1;
      this.mouse.targetY = -(e.clientY / window.innerHeight) * 2 + 1;
    });

    window.addEventListener('scroll', () => {
      this.scrollY = window.scrollY;
    });

    window.addEventListener('resize', () => {
      this.camera.aspect = window.innerWidth / window.innerHeight;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(window.innerWidth, window.innerHeight);
    });
  }

  animate() {
    requestAnimationFrame(() => this.animate());

    const elapsed = this.clock.getElapsedTime();
    const delta = this.clock.getDelta();

    // Smooth mouse follow
    this.mouse.x += (this.mouse.targetX - this.mouse.x) * 0.05;
    this.mouse.y += (this.mouse.targetY - this.mouse.y) * 0.05;

    // Rotate and float meshes
    for (const mesh of this.meshes) {
      const { speed, axis, floatSpeed, floatAmp } = mesh.userData;
      mesh.rotation.x += speed * 0.01;
      mesh.rotation.y += speed * 0.015;

      // Float up and down
      mesh.position.y += Math.sin(elapsed * floatSpeed) * floatAmp * 0.005;

      // Mouse influence
      mesh.rotation.x += this.mouse.y * 0.003;
      mesh.rotation.y += this.mouse.x * 0.003;
    }

    // Particles slow rotation
    if (this.particles) {
      this.particles.rotation.y = elapsed * 0.02;
      this.particles.rotation.x = Math.sin(elapsed * 0.01) * 0.1;
    }

    // Camera parallax from mouse
    this.camera.position.x = this.mouse.x * 1.5;
    this.camera.position.y = this.mouse.y * 1.0 - this.scrollY * 0.002;
    this.camera.lookAt(0, -this.scrollY * 0.002, 0);

    this.renderer.render(this.scene, this.camera);
  }
}

// ========================
// GSAP ANIMATIONS
// ========================

function initGSAP() {
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
    // Try again in 100ms if GSAP hasn't loaded yet
    setTimeout(initGSAP, 100);
    return;
  }

  gsap.registerPlugin(ScrollTrigger);

  // Hero animations
  const heroElements = document.querySelectorAll('.hero .animate-in');
  gsap.to(heroElements, {
    opacity: 1,
    y: 0,
    duration: 1,
    stagger: 0.15,
    ease: 'power3.out',
    delay: 0.3,
  });

  // Section reveals
  const sections = document.querySelectorAll('.section:not(.hero)');
  sections.forEach(section => {
    // Section header
    const header = section.querySelector('.section-header');
    if (header) {
      gsap.fromTo(header, 
        { opacity: 0, y: 40 },
        {
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
        }
      );
    }

    // Glass cards
    const cards = section.querySelectorAll('.glass-card');
    if (cards.length) {
      gsap.fromTo(cards,
        { opacity: 0, y: 50 },
        {
          scrollTrigger: {
            trigger: section,
            start: 'top 70%',
            toggleActions: 'play none none none',
          },
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.1,
          ease: 'power3.out',
        }
      );
    }
  });

  // Stat number count-up
  const statNumbers = document.querySelectorAll('.stat-number');
  statNumbers.forEach(stat => {
    const target = parseInt(stat.dataset.target);
    const suffix = stat.dataset.suffix || '';

    ScrollTrigger.create({
      trigger: stat,
      start: 'top 85%',
      onEnter: () => {
        gsap.to({ val: 0 }, {
          val: target,
          duration: 2,
          ease: 'power2.out',
          onUpdate: function () {
            stat.textContent = Math.round(this.targets()[0].val) + suffix;
          },
        });
      },
      once: true,
    });
  });

  // Contact section
  const contactContent = document.querySelector('.contact-content');
  if (contactContent) {
    gsap.fromTo(contactContent,
      { opacity: 0, y: 40 },
      {
        scrollTrigger: {
          trigger: contactContent,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out',
      }
    );
  }

  // Section subtitle
  const sectionSubtitle = document.querySelector('.section-subtitle');
  if (sectionSubtitle) {
    gsap.fromTo(sectionSubtitle,
      { opacity: 0, y: 20 },
      {
        scrollTrigger: {
          trigger: sectionSubtitle,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out',
        delay: 0.2,
      }
    );
  }

  // Certifications section
  const certsSection = document.querySelector('.certs-section');
  if (certsSection) {
    gsap.fromTo(certsSection,
      { opacity: 0, y: 30 },
      {
        scrollTrigger: {
          trigger: certsSection,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
        opacity: 1,
        y: 0,
        duration: 0.7,
        ease: 'power3.out',
      }
    );
  }

  // Parallax effect on scroll for the 3D canvas
  gsap.to('#three-canvas', {
    scrollTrigger: {
      trigger: 'body',
      start: 'top top',
      end: 'bottom bottom',
      scrub: 1,
    },
    opacity: 0.3,
    ease: 'none',
  });

  // Nav scroll effect
  ScrollTrigger.create({
    start: 80,
    onUpdate: (self) => {
      const nav = document.getElementById('nav');
      if (self.scroll() > 80) {
        nav.classList.add('scrolled');
      } else {
        nav.classList.remove('scrolled');
      }
    },
  });

  // Scroll indicator fade
  gsap.to('.scroll-indicator', {
    scrollTrigger: {
      trigger: '.hero',
      start: 'top top',
      end: '20% top',
      scrub: true,
    },
    opacity: 0,
    y: -20,
  });
}

// ========================
// CURSOR GLOW
// ========================

function initCursorGlow() {
  const glow = document.getElementById('cursorGlow');
  if (!glow) return;

  let cx = 0, cy = 0;
  let tx = 0, ty = 0;

  document.addEventListener('mousemove', (e) => {
    tx = e.clientX;
    ty = e.clientY;
  });

  function update() {
    cx += (tx - cx) * 0.08;
    cy += (ty - cy) * 0.08;
    glow.style.transform = `translate(${cx - 250}px, ${cy - 250}px)`;
    requestAnimationFrame(update);
  }
  update();
}

// ========================
// NAVIGATION
// ========================

function initNav() {
  const toggle = document.getElementById('navToggle');
  const overlay = document.getElementById('mobileNav');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');

  if (!toggle || !overlay) return;

  toggle.addEventListener('click', () => {
    toggle.classList.toggle('active');
    overlay.classList.toggle('active');
    document.body.style.overflow = overlay.classList.contains('active') ? 'hidden' : '';
  });

  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      toggle.classList.remove('active');
      overlay.classList.remove('active');
      document.body.style.overflow = '';
    });
  });

  // Smooth scroll for nav links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        const offset = 80;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });
}

// ========================
// PROJECT CARD TILT
// ========================

function initTilt() {
  const cards = document.querySelectorAll('[data-tilt]');

  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -6;
      const rotateY = ((x - centerX) / centerX) * 6;

      card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(800px) rotateX(0) rotateY(0) translateY(0)';
    });
  });
}

// ========================
// ACTIVE NAV LINK
// ========================

function initActiveNav() {
  if (typeof ScrollTrigger === 'undefined') {
    setTimeout(initActiveNav, 200);
    return;
  }

  const sections = document.querySelectorAll('.section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  sections.forEach(section => {
    ScrollTrigger.create({
      trigger: section,
      start: 'top 40%',
      end: 'bottom 40%',
      onToggle: (self) => {
        if (self.isActive) {
          navLinks.forEach(link => link.classList.remove('active'));
          const activeLink = document.querySelector(`.nav-link[href="#${section.id}"]`);
          if (activeLink) activeLink.classList.add('active');
        }
      },
    });
  });
}

// ========================
// INIT
// ========================

document.addEventListener('DOMContentLoaded', () => {
  new Scene3D();
  initCursorGlow();
  initNav();
  initTilt();
  initGSAP();
  initActiveNav();
});
