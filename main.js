// Navigation functionality
class Navigation {
  constructor() {
    this.nav = document.querySelector('.nav');
    this.navToggle = document.querySelector('.nav-toggle');
    this.navMenu = document.querySelector('.nav-menu');
    this.navLinks = document.querySelectorAll('.nav-link');
    
    this.init();
  }
  
  init() {
    this.bindEvents();
    this.handleScroll();
  }
  
  bindEvents() {
    // Mobile menu toggle
    this.navToggle?.addEventListener('click', () => this.toggleMobileMenu());
    
    // Close mobile menu when clicking on links
    this.navLinks.forEach(link => {
      link.addEventListener('click', () => this.closeMobileMenu());
    });
    
    // Handle scroll for navigation background
    window.addEventListener('scroll', () => this.handleScroll());
    
    // Smooth scroll for navigation links
    this.navLinks.forEach(link => {
      link.addEventListener('click', (e) => this.smoothScroll(e));
    });
  }
  
  toggleMobileMenu() {
    this.navMenu?.classList.toggle('active');
    this.navToggle?.classList.toggle('active');
  }
  
  closeMobileMenu() {
    this.navMenu?.classList.remove('active');
    this.navToggle?.classList.remove('active');
  }
  
  handleScroll() {
    const scrollY = window.scrollY;
    
    if (scrollY > 50) {
      this.nav?.classList.add('scrolled');
    } else {
      this.nav?.classList.remove('scrolled');
    }
  }
  
  smoothScroll(e) {
    const href = e.target.getAttribute('href');
    
    if (href?.startsWith('#')) {
      e.preventDefault();
      const target = document.querySelector(href);
      
      if (target) {
        const offsetTop = target.offsetTop - 80;
        
        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth'
        });
      }
    }
  }
}

// Custom Cursor
class CustomCursor {
  constructor() {
    this.cursor = document.querySelector('.cursor');
    this.cursorFollower = document.querySelector('.cursor-follower');
    this.isTouch = 'ontouchstart' in window;
    
    if (!this.isTouch && this.cursor && this.cursorFollower) {
      this.init();
    }
  }
  
  init() {
    this.bindEvents();
  }
  
  bindEvents() {
    document.addEventListener('mousemove', (e) => this.updateCursor(e));
    
    // Hover effects
    const hoverElements = document.querySelectorAll('a, button, .btn, .project-card, .skill-tag, .lab-item');
    
    hoverElements.forEach(el => {
      el.addEventListener('mouseenter', () => this.scaleCursor(1.5));
      el.addEventListener('mouseleave', () => this.scaleCursor(1));
    });
  }
  
  updateCursor(e) {
    const { clientX, clientY } = e;
    
    if (this.cursor) {
      this.cursor.style.transform = `translate(${clientX - 4}px, ${clientY - 4}px)`;
    }
    
    if (this.cursorFollower) {
      this.cursorFollower.style.transform = `translate(${clientX - 15}px, ${clientY - 15}px)`;
    }
  }
  
  scaleCursor(scale) {
    if (this.cursorFollower) {
      this.cursorFollower.style.transform += ` scale(${scale})`;
    }
  }
}

// Typing Effect
class TypingEffect {
  constructor() {
    this.typingElements = document.querySelectorAll('.typing-text');
    this.init();
  }
  
  init() {
    this.typingElements.forEach(element => {
      this.typeText(element);
    });
  }
  
  typeText(element) {
    const text = element.getAttribute('data-text');
    const speed = 100;
    let i = 0;
    
    element.textContent = '';
    
    const timer = setInterval(() => {
      if (i < text.length) {
        element.textContent += text.charAt(i);
        i++;
      } else {
        clearInterval(timer);
      }
    }, speed);
  }
}

// Skills Animation
class SkillsAnimation {
  constructor() {
    this.skillBars = document.querySelectorAll('.skill-progress');
    this.observer = null;
    
    this.init();
  }
  
  init() {
    this.createObserver();
    this.observeSkills();
  }
  
  createObserver() {
    const options = {
      threshold: 0.5,
      rootMargin: '0px 0px -100px 0px'
    };
    
    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.animateSkill(entry.target);
        }
      });
    }, options);
  }
  
  observeSkills() {
    this.skillBars.forEach(bar => {
      this.observer?.observe(bar);
    });
  }
  
  animateSkill(skillBar) {
    const width = skillBar.getAttribute('data-width');
    
    if (width) {
      setTimeout(() => {
        skillBar.style.width = `${width}%`;
      }, 200);
    }
    
    this.observer?.unobserve(skillBar);
  }
}

// Scroll Animations
class ScrollAnimations {
  constructor() {
    this.animatedElements = document.querySelectorAll('.project-card, .skill-tag, .contact-item, .lab-item');
    this.observer = null;
    
    this.init();
  }
  
  init() {
    this.createObserver();
    this.observeElements();
  }
  
  createObserver() {
    const options = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };
    
    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }
      });
    }, options);
  }
  
  observeElements() {
    this.animatedElements.forEach(element => {
      element.style.opacity = '0';
      element.style.transform = 'translateY(30px)';
      element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
      
      this.observer?.observe(element);
    });
  }
}

// Lab Canvas Effects
class LabEffects {
  constructor() {
    this.canvases = {
      particle: document.querySelector('#particle-canvas canvas'),
      wave: document.querySelector('#wave-canvas canvas'),
      matrix: document.querySelector('#matrix-canvas canvas'),
      neural: document.querySelector('#neural-canvas canvas')
    };
    
    this.init();
  }
  
  init() {
    this.setupCanvases();
    this.startAnimations();
  }
  
  setupCanvases() {
    Object.values(this.canvases).forEach(canvas => {
      if (canvas) {
        const rect = canvas.parentElement.getBoundingClientRect();
        canvas.width = rect.width;
        canvas.height = rect.height;
      }
    });
  }
  
  startAnimations() {
    this.particleSystem();
    this.waveVisualizer();
    this.matrixRain();
    this.neuralNetwork();
  }
  
  particleSystem() {
    const canvas = this.canvases.particle;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const particles = [];
    
    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 2;
        this.vy = (Math.random() - 0.5) * 2;
        this.size = Math.random() * 3 + 1;
        this.color = `hsl(${Math.random() * 60 + 180}, 100%, 50%)`;
      }
      
      update() {
        this.x += this.vx;
        this.y += this.vy;
        
        if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
        if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
      }
      
      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
      }
    }
    
    for (let i = 0; i < 50; i++) {
      particles.push(new Particle());
    }
    
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach(particle => {
        particle.update();
        particle.draw();
      });
      
      requestAnimationFrame(animate);
    };
    
    animate();
  }
  
  waveVisualizer() {
    const canvas = this.canvases.wave;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    let time = 0;
    
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      ctx.strokeStyle = '#00ffff';
      ctx.lineWidth = 2;
      ctx.beginPath();
      
      for (let x = 0; x < canvas.width; x += 5) {
        const y = canvas.height / 2 + Math.sin((x + time) * 0.01) * 50;
        if (x === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }
      
      ctx.stroke();
      time += 2;
      
      requestAnimationFrame(animate);
    };
    
    animate();
  }
  
  matrixRain() {
    const canvas = this.canvases.matrix;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const chars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
    const fontSize = 14;
    const columns = canvas.width / fontSize;
    const drops = Array(Math.floor(columns)).fill(1);
    
    const animate = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      ctx.fillStyle = '#00ff41';
      ctx.font = `${fontSize}px monospace`;
      
      for (let i = 0; i < drops.length; i++) {
        const text = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);
        
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
      
      setTimeout(() => requestAnimationFrame(animate), 50);
    };
    
    animate();
  }
  
  neuralNetwork() {
    const canvas = this.canvases.neural;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const nodes = [];
    const connections = [];
    
    class Node {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
        this.size = Math.random() * 4 + 2;
      }
      
      update() {
        this.x += this.vx;
        this.y += this.vy;
        
        if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
        if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
      }
      
      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = '#8000ff';
        ctx.fill();
      }
    }
    
    for (let i = 0; i < 20; i++) {
      nodes.push(new Node());
    }
    
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw connections
      ctx.strokeStyle = 'rgba(128, 0, 255, 0.2)';
      ctx.lineWidth = 1;
      
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 100) {
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.stroke();
          }
        }
      }
      
      // Draw nodes
      nodes.forEach(node => {
        node.update();
        node.draw();
      });
      
      requestAnimationFrame(animate);
    };
    
    animate();
  }
}

// Form handling
class ContactForm {
  constructor() {
    this.form = document.querySelector('.contact-form');
    this.inputs = this.form?.querySelectorAll('.form-input');
    
    this.init();
  }
  
  init() {
    this.bindEvents();
  }
  
  bindEvents() {
    this.form?.addEventListener('submit', (e) => this.handleSubmit(e));
    
    this.inputs?.forEach(input => {
      input.addEventListener('focus', () => this.handleInputFocus(input));
      input.addEventListener('blur', () => this.handleInputBlur(input));
    });
  }
  
  handleSubmit(e) {
    e.preventDefault();
    
    const formData = new FormData(this.form);
    const data = Object.fromEntries(formData);
    
    if (this.validateForm(data)) {
      this.showSuccess();
      this.form?.reset();
    } else {
      this.showError();
    }
  }
  
  validateForm(data) {
    return Object.values(data).every(value => value.trim() !== '');
  }
  
  handleInputFocus(input) {
    input.parentElement?.classList.add('focused');
  }
  
  handleInputBlur(input) {
    if (!input.value) {
      input.parentElement?.classList.remove('focused');
    }
  }
  
  showSuccess() {
    this.showMessage('Message sent successfully! I\'ll get back to you soon.', 'success');
  }
  
  showError() {
    this.showMessage('Please fill in all fields!', 'error');
  }
  
  showMessage(message, type) {
    const messageEl = document.createElement('div');
    messageEl.className = `form-message form-message--${type}`;
    messageEl.textContent = message;
    
    Object.assign(messageEl.style, {
      position: 'fixed',
      top: '100px',
      right: '20px',
      padding: '16px 24px',
      borderRadius: '8px',
      color: 'white',
      fontWeight: '600',
      zIndex: '9999',
      transform: 'translateX(100%)',
      transition: 'transform 0.3s ease',
      backgroundColor: type === 'success' ? '#00ff41' : '#ff0080'
    });
    
    document.body.appendChild(messageEl);
    
    setTimeout(() => {
      messageEl.style.transform = 'translateX(0)';
    }, 100);
    
    setTimeout(() => {
      messageEl.style.transform = 'translateX(100%)';
      setTimeout(() => {
        document.body.removeChild(messageEl);
      }, 300);
    }, 3000);
  }
}

// Parallax Effects
class ParallaxEffects {
  constructor() {
    this.elements = document.querySelectorAll('.floating-elements, .avatar-glow, .bg-grid');
    this.init();
  }
  
  init() {
    window.addEventListener('scroll', () => this.handleScroll());
  }
  
  handleScroll() {
    const scrollY = window.pageYOffset;
    
    this.elements.forEach((element, index) => {
      const speed = (index + 1) * 0.1;
      const yPos = -(scrollY * speed);
      element.style.transform = `translateY(${yPos}px)`;
    });
  }
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new Navigation();
  new CustomCursor();
  new TypingEffect();
  new SkillsAnimation();
  new ScrollAnimations();
  new LabEffects();
  new ContactForm();
  new ParallaxEffects();
  
  // Console easter egg
  console.log(`
%c🚀 CYBERPUNK PORTFOLIO 🚀
%cDesigned & Developed by Alex Chen
%cBuilt with cutting-edge web technologies

`, 
'color: #00ffff; font-size: 20px; font-weight: bold;',
'color: #ff0080; font-size: 14px;',
'color: #8000ff; font-size: 12px;'
  );
});

// Handle page visibility for performance
document.addEventListener('visibilitychange', () => {
  if (document.hidden) {
    document.body.style.animationPlayState = 'paused';
  } else {
    document.body.style.animationPlayState = 'running';
  }
});

// Keyboard navigation support
document.addEventListener('keydown', (e) => {
  if (e.key === 'Tab') {
    document.body.classList.add('keyboard-navigation');
  }
});

document.addEventListener('mousedown', () => {
  document.body.classList.remove('keyboard-navigation');
});

// Handle window resize
window.addEventListener('resize', () => {
  // Recalculate canvas sizes
  const canvases = document.querySelectorAll('.lab-canvas canvas');
  canvases.forEach(canvas => {
    const rect = canvas.parentElement.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = rect.height;
  });
});