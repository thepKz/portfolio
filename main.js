// Navigation functionality
class Navigation {
  constructor() {
    this.nav = document.querySelector('.nav');
    this.navToggle = document.getElementById('nav-toggle');
    this.navMenu = document.getElementById('nav-menu');
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
        const offsetTop = target.offsetTop - 80; // Account for fixed nav height
        
        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth'
        });
      }
    }
  }
}

// Skills animation
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
    
    // Unobserve after animation
    this.observer?.unobserve(skillBar);
  }
}

// Scroll animations
class ScrollAnimations {
  constructor() {
    this.animatedElements = document.querySelectorAll('.project-card, .skill-category, .contact-item, .stat-item');
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
      // Set initial state
      element.style.opacity = '0';
      element.style.transform = 'translateY(30px)';
      element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
      
      this.observer?.observe(element);
    });
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
    
    // Get form data
    const formData = new FormData(this.form);
    const data = Object.fromEntries(formData);
    
    // Simple validation
    if (this.validateForm(data)) {
      this.showSuccess();
      this.form?.reset();
    } else {
      this.showError();
    }
  }
  
  validateForm(data) {
    // Basic validation - in real app, use more robust validation
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
    this.showMessage('Tin nhắn đã được gửi thành công!', 'success');
  }
  
  showError() {
    this.showMessage('Vui lòng điền đầy đủ thông tin!', 'error');
  }
  
  showMessage(message, type) {
    // Create message element
    const messageEl = document.createElement('div');
    messageEl.className = `form-message form-message--${type}`;
    messageEl.textContent = message;
    
    // Style the message
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
      backgroundColor: type === 'success' ? '#00ff88' : '#ff0066'
    });
    
    // Add to DOM
    document.body.appendChild(messageEl);
    
    // Animate in
    setTimeout(() => {
      messageEl.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after delay
    setTimeout(() => {
      messageEl.style.transform = 'translateX(100%)';
      setTimeout(() => {
        document.body.removeChild(messageEl);
      }, 300);
    }, 3000);
  }
}

// Cursor effects (optional enhancement)
class CursorEffects {
  constructor() {
    this.cursor = null;
    this.cursorFollower = null;
    this.isTouch = 'ontouchstart' in window;
    
    if (!this.isTouch) {
      this.init();
    }
  }
  
  init() {
    this.createCursor();
    this.bindEvents();
  }
  
  createCursor() {
    // Main cursor
    this.cursor = document.createElement('div');
    this.cursor.className = 'custom-cursor';
    Object.assign(this.cursor.style, {
      position: 'fixed',
      width: '8px',
      height: '8px',
      backgroundColor: '#ff0066',
      borderRadius: '50%',
      pointerEvents: 'none',
      zIndex: '9999',
      transition: 'transform 0.1s ease'
    });
    
    // Cursor follower
    this.cursorFollower = document.createElement('div');
    this.cursorFollower.className = 'custom-cursor-follower';
    Object.assign(this.cursorFollower.style, {
      position: 'fixed',
      width: '30px',
      height: '30px',
      border: '2px solid #00ff88',
      borderRadius: '50%',
      pointerEvents: 'none',
      zIndex: '9998',
      transition: 'transform 0.15s ease'
    });
    
    document.body.appendChild(this.cursor);
    document.body.appendChild(this.cursorFollower);
  }
  
  bindEvents() {
    document.addEventListener('mousemove', (e) => this.updateCursor(e));
    
    // Hover effects
    const hoverElements = document.querySelectorAll('a, button, .btn, .project-card, .skill-category');
    
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

// Performance optimization
class PerformanceOptimizer {
  constructor() {
    this.init();
  }
  
  init() {
    this.lazyLoadImages();
    this.optimizeAnimations();
  }
  
  lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.removeAttribute('data-src');
          imageObserver.unobserve(img);
        }
      });
    });
    
    images.forEach(img => imageObserver.observe(img));
  }
  
  optimizeAnimations() {
    // Reduce animations on low-end devices
    if (navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4) {
      document.documentElement.style.setProperty('--transition-normal', '0.1s ease');
      document.documentElement.style.setProperty('--transition-slow', '0.2s ease');
    }
  }
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new Navigation();
  new SkillsAnimation();
  new ScrollAnimations();
  new ContactForm();
  new CursorEffects();
  new PerformanceOptimizer();
  
  // Add loading animation
  const loader = document.querySelector('.loader');
  if (loader) {
    setTimeout(() => {
      loader.style.opacity = '0';
      setTimeout(() => {
        loader.remove();
      }, 500);
    }, 1000);
  }
});

// Handle page visibility for performance
document.addEventListener('visibilitychange', () => {
  if (document.hidden) {
    // Pause animations when page is not visible
    document.body.style.animationPlayState = 'paused';
  } else {
    // Resume animations when page becomes visible
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

// Console easter egg
console.log(`
%c🚀 PORTFOLIO WEBSITE 🚀
%cThiết kế với đam mê bởi Creative Developer
%cHãy liên hệ nếu bạn thích những gì bạn thấy!

`, 
'color: #ff0066; font-size: 20px; font-weight: bold;',
'color: #00ff88; font-size: 14px;',
'color: #ffff00; font-size: 12px;'
);