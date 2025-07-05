// OS Interface Controller
class OSInterface {
  constructor() {
    this.activeWindow = 'terminal';
    this.windows = new Map();
    this.backgroundEffects = new BackgroundEffects();
    
    this.init();
  }
  
  init() {
    this.initializeWindows();
    this.bindEvents();
    this.startClock();
    this.showWindow('terminal');
  }
  
  initializeWindows() {
    const windowElements = document.querySelectorAll('.window');
    windowElements.forEach(window => {
      const id = window.id.replace('-app', '');
      this.windows.set(id, {
        element: window,
        isActive: false,
        isMinimized: false
      });
    });
  }
  
  bindEvents() {
    // App icon clicks
    const appIcons = document.querySelectorAll('.app-icon');
    appIcons.forEach(icon => {
      icon.addEventListener('click', () => {
        const appName = icon.getAttribute('data-app');
        this.toggleWindow(appName);
      });
    });
    
    // Window controls
    document.addEventListener('click', (e) => {
      if (e.target.classList.contains('close')) {
        const window = e.target.closest('.window');
        this.hideWindow(window.id.replace('-app', ''));
      }
      
      if (e.target.classList.contains('minimize')) {
        const window = e.target.closest('.window');
        this.minimizeWindow(window.id.replace('-app', ''));
      }
      
      if (e.target.classList.contains('maximize')) {
        const window = e.target.closest('.window');
        this.maximizeWindow(window.id.replace('-app', ''));
      }
    });
    
    // Theme toggle
    const themeToggle = document.getElementById('theme-toggle');
    themeToggle?.addEventListener('click', () => this.toggleTheme());
    
    // Audio toggle
    const audioToggle = document.getElementById('audio-toggle');
    audioToggle?.addEventListener('click', () => this.toggleAudio());
  }
  
  showWindow(windowId) {
    const windowData = this.windows.get(windowId);
    if (!windowData) return;
    
    // Hide other windows
    this.windows.forEach((data, id) => {
      if (id !== windowId) {
        data.element.classList.remove('active');
        data.isActive = false;
        this.updateAppIcon(id, false);
      }
    });
    
    // Show target window
    windowData.element.classList.add('active');
    windowData.isActive = true;
    windowData.isMinimized = false;
    this.updateAppIcon(windowId, true);
    this.activeWindow = windowId;
  }
  
  hideWindow(windowId) {
    const windowData = this.windows.get(windowId);
    if (!windowData) return;
    
    windowData.element.classList.remove('active');
    windowData.isActive = false;
    this.updateAppIcon(windowId, false);
    
    if (this.activeWindow === windowId) {
      this.activeWindow = null;
    }
  }
  
  toggleWindow(windowId) {
    const windowData = this.windows.get(windowId);
    if (!windowData) return;
    
    if (windowData.isActive) {
      this.hideWindow(windowId);
    } else {
      this.showWindow(windowId);
    }
  }
  
  minimizeWindow(windowId) {
    const windowData = this.windows.get(windowId);
    if (!windowData) return;
    
    windowData.element.classList.remove('active');
    windowData.isMinimized = true;
    this.updateAppIcon(windowId, false);
  }
  
  maximizeWindow(windowId) {
    const windowData = this.windows.get(windowId);
    if (!windowData) return;
    
    const window = windowData.element;
    window.style.width = '95%';
    window.style.height = '90%';
    window.style.top = '5%';
    window.style.left = '2.5%';
  }
  
  updateAppIcon(windowId, isActive) {
    const appIcon = document.querySelector(`[data-app="${windowId}"]`);
    if (appIcon) {
      appIcon.classList.toggle('active', isActive);
    }
  }
  
  startClock() {
    const updateTime = () => {
      const now = new Date();
      const timeString = now.toLocaleTimeString('en-US', {
        hour12: false,
        hour: '2-digit',
        minute: '2-digit'
      });
      
      const timeElement = document.getElementById('current-time');
      if (timeElement) {
        timeElement.textContent = timeString;
      }
    };
    
    updateTime();
    setInterval(updateTime, 1000);
  }
  
  toggleTheme() {
    document.body.classList.toggle('light-theme');
    const themeIcon = document.querySelector('.theme-icon');
    if (themeIcon) {
      themeIcon.textContent = document.body.classList.contains('light-theme') ? '☀️' : '🌙';
    }
  }
  
  toggleAudio() {
    this.backgroundEffects.toggleAudio();
    const audioIcon = document.querySelector('.audio-icon');
    if (audioIcon) {
      audioIcon.textContent = this.backgroundEffects.audioEnabled ? '🔊' : '🔇';
    }
  }
}

// Background Effects Controller
class BackgroundEffects {
  constructor() {
    this.canvases = {
      particle: document.getElementById('particle-bg'),
      matrix: document.getElementById('matrix-bg'),
      neural: document.getElementById('neural-bg'),
      wave: document.getElementById('wave-bg')
    };
    
    this.audioEnabled = true;
    this.animationFrames = new Map();
    
    this.init();
  }
  
  init() {
    this.setupCanvases();
    this.startEffects();
  }
  
  setupCanvases() {
    Object.values(this.canvases).forEach(canvas => {
      if (canvas) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      }
    });
    
    window.addEventListener('resize', () => {
      Object.values(this.canvases).forEach(canvas => {
        if (canvas) {
          canvas.width = window.innerWidth;
          canvas.height = window.innerHeight;
        }
      });
    });
  }
  
  startEffects() {
    this.particleSystem();
    this.matrixRain();
    this.neuralNetwork();
    this.audioVisualizer();
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
        this.vx = (Math.random() - 0.5) * 1;
        this.vy = (Math.random() - 0.5) * 1;
        this.size = Math.random() * 2 + 1;
        this.color = `hsl(${180 + Math.random() * 60}, 100%, 50%)`;
        this.opacity = Math.random() * 0.5 + 0.2;
      }
      
      update() {
        this.x += this.vx;
        this.y += this.vy;
        
        if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
        if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
        
        // Add some randomness
        this.vx += (Math.random() - 0.5) * 0.02;
        this.vy += (Math.random() - 0.5) * 0.02;
        
        // Limit velocity
        this.vx = Math.max(-2, Math.min(2, this.vx));
        this.vy = Math.max(-2, Math.min(2, this.vy));
      }
      
      draw() {
        ctx.save();
        ctx.globalAlpha = this.opacity;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
        
        // Add glow effect
        ctx.shadowBlur = 10;
        ctx.shadowColor = this.color;
        ctx.fill();
        ctx.restore();
      }
    }
    
    // Create particles
    for (let i = 0; i < 100; i++) {
      particles.push(new Particle());
    }
    
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach(particle => {
        particle.update();
        particle.draw();
      });
      
      // Draw connections
      ctx.strokeStyle = 'rgba(0, 255, 255, 0.1)';
      ctx.lineWidth = 1;
      
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 100) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
      
      this.animationFrames.set('particle', requestAnimationFrame(animate));
    };
    
    animate();
  }
  
  matrixRain() {
    const canvas = this.canvases.matrix;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const chars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
    const fontSize = 14;
    const columns = Math.floor(canvas.width / fontSize);
    const drops = Array(columns).fill(1);
    
    const animate = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      ctx.fillStyle = '#00ff41';
      ctx.font = `${fontSize}px monospace`;
      
      for (let i = 0; i < drops.length; i++) {
        const text = chars[Math.floor(Math.random() * chars.length)];
        const x = i * fontSize;
        const y = drops[i] * fontSize;
        
        ctx.fillText(text, x, y);
        
        if (y > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
      
      setTimeout(() => {
        this.animationFrames.set('matrix', requestAnimationFrame(animate));
      }, 50);
    };
    
    animate();
  }
  
  neuralNetwork() {
    const canvas = this.canvases.neural;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const nodes = [];
    
    class Node {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
        this.size = Math.random() * 3 + 2;
        this.pulse = Math.random() * Math.PI * 2;
      }
      
      update() {
        this.x += this.vx;
        this.y += this.vy;
        this.pulse += 0.02;
        
        if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
        if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
      }
      
      draw() {
        const opacity = (Math.sin(this.pulse) + 1) * 0.3 + 0.2;
        ctx.save();
        ctx.globalAlpha = opacity;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = '#8000ff';
        ctx.fill();
        
        // Glow effect
        ctx.shadowBlur = 15;
        ctx.shadowColor = '#8000ff';
        ctx.fill();
        ctx.restore();
      }
    }
    
    // Create nodes
    for (let i = 0; i < 30; i++) {
      nodes.push(new Node());
    }
    
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw connections
      ctx.strokeStyle = 'rgba(128, 0, 255, 0.1)';
      ctx.lineWidth = 1;
      
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 150) {
            const opacity = 1 - (distance / 150);
            ctx.save();
            ctx.globalAlpha = opacity * 0.3;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.stroke();
            ctx.restore();
          }
        }
      }
      
      // Draw nodes
      nodes.forEach(node => {
        node.update();
        node.draw();
      });
      
      this.animationFrames.set('neural', requestAnimationFrame(animate));
    };
    
    animate();
  }
  
  audioVisualizer() {
    const canvas = this.canvases.wave;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    let time = 0;
    
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      if (this.audioEnabled) {
        // Create multiple wave layers
        const waves = [
          { color: '#00ffff', amplitude: 30, frequency: 0.01, phase: 0 },
          { color: '#ff0080', amplitude: 20, frequency: 0.015, phase: Math.PI / 3 },
          { color: '#8000ff', amplitude: 25, frequency: 0.008, phase: Math.PI / 2 }
        ];
        
        waves.forEach((wave, index) => {
          ctx.strokeStyle = wave.color;
          ctx.lineWidth = 2;
          ctx.globalAlpha = 0.6;
          ctx.beginPath();
          
          for (let x = 0; x < canvas.width; x += 5) {
            const y = canvas.height / 2 + 
              Math.sin((x + time + wave.phase) * wave.frequency) * wave.amplitude +
              Math.sin((x + time * 1.5) * wave.frequency * 2) * (wave.amplitude * 0.3);
            
            if (x === 0) {
              ctx.moveTo(x, y);
            } else {
              ctx.lineTo(x, y);
            }
          }
          
          ctx.stroke();
        });
      }
      
      time += 2;
      this.animationFrames.set('wave', requestAnimationFrame(animate));
    };
    
    animate();
  }
  
  toggleAudio() {
    this.audioEnabled = !this.audioEnabled;
  }
  
  stopAll() {
    this.animationFrames.forEach((frameId, key) => {
      cancelAnimationFrame(frameId);
    });
    this.animationFrames.clear();
  }
}

// Terminal Controller
class TerminalController {
  constructor() {
    this.output = document.getElementById('terminal-output');
    this.commands = {
      'help': this.showHelp.bind(this),
      'about': this.showAbout.bind(this),
      'projects': this.showProjects.bind(this),
      'skills': this.showSkills.bind(this),
      'contact': this.showContact.bind(this),
      'clear': this.clearTerminal.bind(this),
      'whoami': this.whoami.bind(this),
      'ls': this.listFiles.bind(this),
      'cat': this.catFile.bind(this),
      'neofetch': this.neofetch.bind(this)
    };
    
    this.init();
  }
  
  init() {
    this.bindEvents();
    this.startTypingEffect();
  }
  
  bindEvents() {
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && e.target.closest('.terminal')) {
        this.handleCommand();
      }
    });
  }
  
  startTypingEffect() {
    const typingElements = document.querySelectorAll('.typing-text');
    typingElements.forEach(element => {
      this.typeText(element);
    });
  }
  
  typeText(element) {
    const text = element.getAttribute('data-text');
    const speed = 50;
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
  
  addLine(content, className = '') {
    const line = document.createElement('div');
    line.className = `terminal-line ${className}`;
    line.innerHTML = content;
    this.output.appendChild(line);
    this.scrollToBottom();
  }
  
  scrollToBottom() {
    this.output.scrollTop = this.output.scrollHeight;
  }
  
  showHelp() {
    this.addLine(`
      <span class="output">Available commands:</span><br>
      <span class="command">help</span> - Show this help message<br>
      <span class="command">about</span> - About Minthep<br>
      <span class="command">projects</span> - List projects<br>
      <span class="command">skills</span> - Show skills<br>
      <span class="command">contact</span> - Contact information<br>
      <span class="command">clear</span> - Clear terminal<br>
      <span class="command">neofetch</span> - System information
    `, 'output');
  }
  
  showAbout() {
    this.addLine(`
      <span class="output">
        Name: Minthep<br>
        Role: Creative Developer & Designer<br>
        Experience: 5+ years<br>
        Location: Available Worldwide<br>
        Passion: Creating digital experiences that blend creativity with technology
      </span>
    `, 'output');
  }
  
  showProjects() {
    this.addLine(`
      <span class="output">
        📁 NeuroCommerce - AI-powered e-commerce platform<br>
        📁 CyberDash - Real-time analytics dashboard<br>
        📁 NeonWallet - Cryptocurrency mobile wallet<br>
        📁 MindForge AI - Creative AI assistant platform
      </span>
    `, 'output');
  }
  
  showSkills() {
    this.addLine(`
      <span class="output">
        Frontend: React, Vue.js, TypeScript, Next.js<br>
        Design: Figma, Adobe Creative Suite, Blender<br>
        Backend: Node.js, Python, PostgreSQL<br>
        Tools: Git, Docker, AWS, Vercel
      </span>
    `, 'output');
  }
  
  showContact() {
    this.addLine(`
      <span class="output">
        📧 Email: minthep@creative-dev.com<br>
        🐙 GitHub: github.com/minthep<br>
        💼 LinkedIn: linkedin.com/in/minthep<br>
        🎨 Portfolio: minthep.dev
      </span>
    `, 'output');
  }
  
  clearTerminal() {
    this.output.innerHTML = '';
  }
  
  whoami() {
    this.addLine(`<span class="output">Minthep - Creative Developer & Designer</span>`, 'output');
  }
  
  listFiles() {
    this.addLine(`
      <span class="output">
        drwxr-xr-x  projects/<br>
        drwxr-xr-x  skills/<br>
        -rw-r--r--  about.txt<br>
        -rw-r--r--  contact.json<br>
        -rw-r--r--  resume.pdf
      </span>
    `, 'output');
  }
  
  catFile(args) {
    const filename = args[0];
    switch(filename) {
      case 'about.txt':
        this.showAbout();
        break;
      case 'contact.json':
        this.addLine(`
          <pre class="json-output">{
  "name": "Minthep",
  "email": "minthep@creative-dev.com",
  "role": "Creative Developer & Designer",
  "available": true
}</pre>
        `, 'output');
        break;
      default:
        this.addLine(`<span class="output">cat: ${filename}: No such file or directory</span>`, 'output');
    }
  }
  
  neofetch() {
    this.addLine(`
      <span class="output">
        <span style="color: #00ffff;">      ▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄</span><br>
        <span style="color: #00ffff;">    ▄▀                    ▀▄</span>    <span style="color: #ff0080;">Minthep@creative-dev</span><br>
        <span style="color: #00ffff;">  ▄▀   ◆ MINTHEP.OS ◆     ▀▄</span>  <span style="color: #8000ff;">OS:</span> Creative Developer OS<br>
        <span style="color: #00ffff;">▄▀                          ▀▄</span><span style="color: #8000ff;">Kernel:</span> Creativity v5.0<br>
        <span style="color: #00ffff;">█    ▄▄▄▄▄    ▄▄▄▄▄    ▄▄▄▄▄ █</span><span style="color: #8000ff;">Uptime:</span> 5+ years<br>
        <span style="color: #00ffff;">█   ▀     ▀  ▀     ▀  ▀     ▀█</span><span style="color: #8000ff;">Packages:</span> React, Vue, Node.js<br>
        <span style="color: #00ffff;">▀▄                          ▄▀</span><span style="color: #8000ff;">Shell:</span> Creative Terminal<br>
        <span style="color: #00ffff;">  ▀▄                      ▄▀</span>  <span style="color: #8000ff;">Theme:</span> Cyberpunk Neon<br>
        <span style="color: #00ffff;">    ▀▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▀</span>
      </span>
    `, 'output');
  }
  
  handleCommand() {
    // This would be implemented to handle real command input
    // For now, it's just for demonstration
  }
}

// Form Controller
class FormController {
  constructor() {
    this.form = document.getElementById('contact-form');
    this.init();
  }
  
  init() {
    this.bindEvents();
  }
  
  bindEvents() {
    this.form?.addEventListener('submit', (e) => this.handleSubmit(e));
  }
  
  handleSubmit(e) {
    e.preventDefault();
    
    const formData = new FormData(this.form);
    const data = Object.fromEntries(formData);
    
    // Simulate sending message
    this.showMessage('Message sent successfully! I\'ll get back to you soon.', 'success');
    this.form.reset();
  }
  
  showMessage(message, type) {
    const messageEl = document.createElement('div');
    messageEl.className = `form-message form-message--${type}`;
    messageEl.textContent = message;
    
    Object.assign(messageEl.style, {
      position: 'fixed',
      top: '20px',
      right: '20px',
      padding: '16px 24px',
      borderRadius: '8px',
      color: 'white',
      fontWeight: '600',
      zIndex: '9999',
      transform: 'translateX(100%)',
      transition: 'transform 0.3s ease',
      backgroundColor: type === 'success' ? '#00ff41' : '#ff0080',
      fontFamily: 'JetBrains Mono, monospace'
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

// Lab Effects Controller
class LabEffects {
  constructor() {
    this.canvases = {
      particles: document.getElementById('lab-particles'),
      shader: document.getElementById('lab-shader'),
      '3d': document.getElementById('lab-3d'),
      audio: document.getElementById('lab-audio')
    };
    
    this.init();
  }
  
  init() {
    this.setupCanvases();
    this.startLabEffects();
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
  
  startLabEffects() {
    this.labParticles();
    this.labShader();
    this.lab3D();
    this.labAudio();
  }
  
  labParticles() {
    const canvas = this.canvases.particles;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const particles = [];
    
    class LabParticle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 2;
        this.vy = (Math.random() - 0.5) * 2;
        this.size = Math.random() * 3 + 1;
        this.hue = Math.random() * 360;
        this.life = 1;
        this.decay = Math.random() * 0.02 + 0.005;
      }
      
      update() {
        this.x += this.vx;
        this.y += this.vy;
        this.life -= this.decay;
        this.hue += 1;
        
        if (this.life <= 0) {
          this.x = Math.random() * canvas.width;
          this.y = Math.random() * canvas.height;
          this.life = 1;
        }
      }
      
      draw() {
        ctx.save();
        ctx.globalAlpha = this.life;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `hsl(${this.hue}, 100%, 50%)`;
        ctx.fill();
        ctx.restore();
      }
    }
    
    for (let i = 0; i < 50; i++) {
      particles.push(new LabParticle());
    }
    
    const animate = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach(particle => {
        particle.update();
        particle.draw();
      });
      
      requestAnimationFrame(animate);
    };
    
    animate();
  }
  
  labShader() {
    const canvas = this.canvases.shader;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    let time = 0;
    
    const animate = () => {
      const imageData = ctx.createImageData(canvas.width, canvas.height);
      const data = imageData.data;
      
      for (let x = 0; x < canvas.width; x++) {
        for (let y = 0; y < canvas.height; y++) {
          const index = (y * canvas.width + x) * 4;
          
          const u = x / canvas.width;
          const v = y / canvas.height;
          
          const r = Math.sin(u * 10 + time * 0.01) * 127 + 128;
          const g = Math.sin(v * 10 + time * 0.02) * 127 + 128;
          const b = Math.sin((u + v) * 5 + time * 0.03) * 127 + 128;
          
          data[index] = r;
          data[index + 1] = g;
          data[index + 2] = b;
          data[index + 3] = 255;
        }
      }
      
      ctx.putImageData(imageData, 0, 0);
      time++;
      
      requestAnimationFrame(animate);
    };
    
    animate();
  }
  
  lab3D() {
    const canvas = this.canvases['3d'];
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    let rotation = 0;
    
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const radius = 50;
      
      // Draw rotating cube wireframe
      const points = [
        [-1, -1, -1], [1, -1, -1], [1, 1, -1], [-1, 1, -1],
        [-1, -1, 1], [1, -1, 1], [1, 1, 1], [-1, 1, 1]
      ];
      
      const rotatedPoints = points.map(point => {
        const [x, y, z] = point;
        const rotX = x * Math.cos(rotation) - z * Math.sin(rotation);
        const rotZ = x * Math.sin(rotation) + z * Math.cos(rotation);
        const rotY = y * Math.cos(rotation * 0.7) - rotZ * Math.sin(rotation * 0.7);
        const finalZ = y * Math.sin(rotation * 0.7) + rotZ * Math.cos(rotation * 0.7);
        
        const scale = 200 / (finalZ + 5);
        return [
          centerX + rotX * scale,
          centerY + rotY * scale
        ];
      });
      
      // Draw edges
      const edges = [
        [0, 1], [1, 2], [2, 3], [3, 0],
        [4, 5], [5, 6], [6, 7], [7, 4],
        [0, 4], [1, 5], [2, 6], [3, 7]
      ];
      
      ctx.strokeStyle = '#00ffff';
      ctx.lineWidth = 2;
      
      edges.forEach(edge => {
        const [start, end] = edge;
        ctx.beginPath();
        ctx.moveTo(rotatedPoints[start][0], rotatedPoints[start][1]);
        ctx.lineTo(rotatedPoints[end][0], rotatedPoints[end][1]);
        ctx.stroke();
      });
      
      rotation += 0.02;
      requestAnimationFrame(animate);
    };
    
    animate();
  }
  
  labAudio() {
    const canvas = this.canvases.audio;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    let time = 0;
    
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      const centerY = canvas.height / 2;
      const bars = 32;
      const barWidth = canvas.width / bars;
      
      for (let i = 0; i < bars; i++) {
        const height = Math.sin(time * 0.1 + i * 0.5) * 50 + 60;
        const x = i * barWidth;
        
        const gradient = ctx.createLinearGradient(0, centerY - height, 0, centerY + height);
        gradient.addColorStop(0, '#ff0080');
        gradient.addColorStop(0.5, '#8000ff');
        gradient.addColorStop(1, '#00ffff');
        
        ctx.fillStyle = gradient;
        ctx.fillRect(x, centerY - height / 2, barWidth - 2, height);
      }
      
      time++;
      requestAnimationFrame(animate);
    };
    
    animate();
  }
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new OSInterface();
  new TerminalController();
  new FormController();
  new LabEffects();
  
  // Console easter egg
  console.log(`
%c🚀 MINTHEP.OS - CYBERPUNK PORTFOLIO 🚀
%cCreative Developer & Designer Interface
%cBuilt with cutting-edge web technologies

Welcome to the matrix, user.
Type 'help' in the terminal for available commands.

`, 
'color: #00ffff; font-size: 20px; font-weight: bold; font-family: monospace;',
'color: #ff0080; font-size: 14px; font-family: monospace;',
'color: #8000ff; font-size: 12px; font-family: monospace;'
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

// Handle window resize
window.addEventListener('resize', () => {
  // Recalculate canvas sizes
  const canvases = document.querySelectorAll('canvas');
  canvases.forEach(canvas => {
    if (canvas.id.includes('bg')) {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    } else {
      const rect = canvas.parentElement.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
    }
  });
});