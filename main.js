// OS Interface Controller
class OSInterface {
  constructor() {
    this.activeWindow = 'terminal';
    this.windows = new Map();
    this.backgroundEffects = new BackgroundEffects();
    this.contextMenu = document.getElementById('context-menu');
    this.backgroundMode = 'particle';
    
    this.init();
  }
  
  init() {
    this.initializeWindows();
    this.bindEvents();
    this.startClock();
    this.showWindow('terminal');
    this.initContextMenu();
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
    
    // Prevent default context menu on desktop
    document.addEventListener('contextmenu', (e) => {
      if (e.target.closest('.desktop') && !e.target.closest('.window')) {
        e.preventDefault();
      }
    });
  }
  
  initContextMenu() {
    const desktop = document.querySelector('.desktop');
    
    // Show context menu on right click
    desktop.addEventListener('contextmenu', (e) => {
      if (!e.target.closest('.window')) {
        e.preventDefault();
        this.showContextMenu(e.clientX, e.clientY);
      }
    });
    
    // Hide context menu on left click
    document.addEventListener('click', (e) => {
      if (!e.target.closest('.context-menu')) {
        this.hideContextMenu();
      }
    });
    
    // Handle context menu item clicks
    this.contextMenu.addEventListener('click', (e) => {
      const item = e.target.closest('.context-item');
      if (item) {
        const action = item.getAttribute('data-action');
        this.handleContextAction(action);
        this.hideContextMenu();
      }
    });
  }
  
  showContextMenu(x, y) {
    this.contextMenu.style.left = `${x}px`;
    this.contextMenu.style.top = `${y}px`;
    this.contextMenu.classList.add('show');
    
    // Adjust position if menu goes off screen
    const rect = this.contextMenu.getBoundingClientRect();
    if (rect.right > window.innerWidth) {
      this.contextMenu.style.left = `${x - rect.width}px`;
    }
    if (rect.bottom > window.innerHeight) {
      this.contextMenu.style.top = `${y - rect.height}px`;
    }
  }
  
  hideContextMenu() {
    this.contextMenu.classList.remove('show');
  }
  
  handleContextAction(action) {
    switch (action) {
      case 'terminal':
        this.showWindow('terminal');
        break;
      case 'projects':
        this.showWindow('projects');
        break;
      case 'about':
        this.showWindow('about');
        break;
      case 'background':
        this.cycleBackground();
        break;
      case 'theme':
        this.toggleTheme();
        break;
      case 'refresh':
        this.refreshDesktop();
        break;
    }
  }
  
  cycleBackground() {
    const modes = ['particle', 'matrix', 'neural', 'wave'];
    const currentIndex = modes.indexOf(this.backgroundMode);
    const nextIndex = (currentIndex + 1) % modes.length;
    this.backgroundMode = modes[nextIndex];
    
    // Hide all background canvases
    Object.values(this.backgroundEffects.canvases).forEach(canvas => {
      if (canvas) canvas.style.opacity = '0';
    });
    
    // Show selected background
    const activeCanvas = this.backgroundEffects.canvases[this.backgroundMode];
    if (activeCanvas) {
      activeCanvas.style.opacity = this.backgroundMode === 'particle' ? '0.3' : 
                                   this.backgroundMode === 'matrix' ? '0.1' :
                                   this.backgroundMode === 'neural' ? '0.2' : '0.15';
    }
    
    // Show notification
    this.showNotification(`Background changed to ${this.backgroundMode}`);
  }
  
  refreshDesktop() {
    // Add refresh animation
    document.body.style.opacity = '0.5';
    setTimeout(() => {
      document.body.style.opacity = '1';
      this.showNotification('Desktop refreshed');
    }, 300);
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
    
    // Update context menu theme icon
    const contextThemeIcon = document.querySelector('[data-action="theme"] .context-icon');
    if (contextThemeIcon) {
      contextThemeIcon.textContent = document.body.classList.contains('light-theme') ? '☀️' : '🌙';
    }
    
    this.showNotification(`Switched to ${document.body.classList.contains('light-theme') ? 'light' : 'dark'} theme`);
  }
  
  toggleAudio() {
    this.backgroundEffects.toggleAudio();
    const audioIcon = document.querySelector('.audio-icon');
    if (audioIcon) {
      audioIcon.textContent = this.backgroundEffects.audioEnabled ? '🔊' : '🔇';
    }
    
    this.showNotification(`Audio ${this.backgroundEffects.audioEnabled ? 'enabled' : 'disabled'}`);
  }
  
  showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    
    Object.assign(notification.style, {
      position: 'fixed',
      top: '20px',
      right: '20px',
      background: 'rgba(0, 255, 255, 0.9)',
      color: '#000',
      padding: '12px 20px',
      borderRadius: '8px',
      fontFamily: 'var(--font-mono)',
      fontSize: '0.85rem',
      fontWeight: '600',
      zIndex: '10000',
      transform: 'translateX(100%)',
      transition: 'transform 0.3s ease',
      boxShadow: '0 0 20px rgba(0, 255, 255, 0.5)'
    });
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
      notification.style.transform = 'translateX(0)';
    }, 100);
    
    setTimeout(() => {
      notification.style.transform = 'translateX(100%)';
      setTimeout(() => {
        if (document.body.contains(notification)) {
          document.body.removeChild(notification);
        }
      }, 300);
    }, 3000);
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
    this.initContactMatrix();
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
  
  initContactMatrix() {
    const canvas = document.getElementById('contact-matrix');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const chars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
    const fontSize = 12;
    
    // Set canvas size
    const resizeCanvas = () => {
      const rect = canvas.parentElement.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
    };
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    const columns = Math.floor(canvas.width / fontSize);
    const drops = Array(columns).fill(1);
    
    const animate = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
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
        requestAnimationFrame(animate);
      }, 100);
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
    this.input = document.getElementById('terminal-input');
    this.commandHistory = [];
    this.historyIndex = -1;
    this.currentLine = '';
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
      'neofetch': this.neofetch.bind(this),
      'matrix': this.matrixMode.bind(this),
      'hack': this.hackMode.bind(this),
      'status': this.systemStatus.bind(this)
    };
    
    this.init();
  }
  
  init() {
    this.bindEvents();
    this.startTypingEffect();
    this.focusInput();
    this.setupPrompt();
  }
  
  setupPrompt() {
    // Remove any existing input lines
    const existingInputLines = this.output.querySelectorAll('.input-line');
    existingInputLines.forEach(line => line.remove());
    
    // Add fresh input line
    this.addInputLine();
  }
  
  addInputLine() {
    const inputLine = document.createElement('div');
    inputLine.className = 'terminal-line input-line';
    inputLine.innerHTML = `
      <span class="prompt">minthep@creative-dev:~$</span>
      <input type="text" class="terminal-input" placeholder="Type 'help' for commands..." autocomplete="off">
    `;
    
    this.output.appendChild(inputLine);
    
    // Get the new input element
    this.input = inputLine.querySelector('.terminal-input');
    this.bindInputEvents();
    this.focusInput();
    this.scrollToBottom();
  }
  
  bindEvents() {
    // Auto-focus input when clicking on terminal
    document.querySelector('.terminal')?.addEventListener('click', () => {
      this.focusInput();
    });
  }
  
  bindInputEvents() {
    if (this.input) {
      this.input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          this.handleCommand(this.input.value.trim());
        } else if (e.key === 'ArrowUp') {
          e.preventDefault();
          this.navigateHistory(-1);
        } else if (e.key === 'ArrowDown') {
          e.preventDefault();
          this.navigateHistory(1);
        }
      });
    }
  }
  
  focusInput() {
    if (this.input) {
      this.input.focus();
    }
  }
  
  navigateHistory(direction) {
    if (this.commandHistory.length === 0) return;
    
    this.historyIndex += direction;
    
    if (this.historyIndex < 0) {
      this.historyIndex = -1;
      this.input.value = '';
    } else if (this.historyIndex >= this.commandHistory.length) {
      this.historyIndex = this.commandHistory.length - 1;
    }
    
    if (this.historyIndex >= 0) {
      this.input.value = this.commandHistory[this.historyIndex];
    }
  }
  
  handleCommand(commandLine) {
    if (!commandLine) {
      this.addInputLine();
      return;
    }
    
    // Easter eggs for fun commands
    if (commandLine.toLowerCase().includes('sudo')) {
      this.input.disabled = true;
      this.addLine(`<span class="output" style="color: #ff0080;">Nice try! But you're not getting root access that easily 😏</span>`, 'output');
      this.addInputLine();
      return;
    }
    
    if (commandLine.toLowerCase().includes('rm -rf')) {
      this.input.disabled = true;
      this.addLine(`<span class="output" style="color: #ff0080;">⚠️ DANGER: That command could delete everything! Blocked for safety.</span>`, 'output');
      this.addInputLine();
      return;
    }
    
    // Add to history
    this.commandHistory.push(commandLine);
    this.historyIndex = -1;
    
    // Disable current input
    this.input.disabled = true;
    
    // Parse command and arguments
    const parts = commandLine.split(' ');
    const command = parts[0].toLowerCase();
    const args = parts.slice(1);
    
    // Execute command
    if (this.commands[command]) {
      this.commands[command](args);
    } else {
      this.addLine(`<span class="output">Command not found: ${command}. Type 'help' for available commands.</span>`, 'output');
    }
    
    // Add new input line
    this.addInputLine();
  }
  
  matrixMode() {
    this.addLine(`
      <span class="output" style="color: #00ff41;">
        <pre style="font-size: 0.8rem; line-height: 1.2;">
╔══════════════════════════════════════╗
║           MATRIX MODE ACTIVATED      ║
║                                      ║
║  Wake up, Neo...                     ║
║  The Matrix has you...               ║
║  Follow the white rabbit.            ║
║                                      ║
║  Reality is an illusion.             ║
║  Code is the only truth.             ║
╚══════════════════════════════════════╝

<span style="color: #00ffff;">Entering the Matrix... Reality.exe has stopped working.</span>
        </pre>
      </span>
    `, 'output');
  }
  
  hackMode() {
    this.addLine(`
      <span class="output" style="color: #ff0080;">
        <pre style="font-size: 0.8rem; line-height: 1.2;">
[HACKING MODE INITIATED]
> Scanning network...
> Found 42 vulnerable systems
> Found 127.0.0.1
> Attempting to breach firewall...
> Firewall bypassed successfully
> Root access granted!
> Welcome to the mainframe, hacker.
        </pre>
      </span>
    `, 'output');
  }
  
  systemStatus() {
    this.addLine(`
      <span class="output">
        <span style="color: #00ffff;">🖥️ CYBER SYSTEM STATUS 🖥️</span><br><br>
        <span style="color: #00ff41;">CPU:</span> 99.9% (Quantum Overclocked)<br>
        <span style="color: #00ff41;">RAM:</span> 32GB DDR5 (Neural Enhanced)<br>
        <span style="color: #00ff41;">GPU:</span> RTX 4090 (AI Accelerated)<br>
        <span style="color: #00ff41;">SSD:</span> 2TB NVMe (Encrypted)<br>
        <span style="color: #00ff41;">Network:</span> 10Gbps (Quantum Tunnel)<br>
        <span style="color: #00ff41;">Security:</span> MAXIMUM (Unhackable)<br>
        <span style="color: #00ff41;">Firewall:</span> ACTIVE (Military Grade)<br><br>
        <span style="color: #ff0080;">⚡ SYSTEM PERFORMANCE: LEGENDARY ⚡</span><br>
        <span style="color: #00ff41;">Status: ONLINE AND READY</span>
      </span>
    `, 'output');
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
    
    // Insert before the input line
    const inputLine = this.output.querySelector('.input-line');
    if (inputLine) {
      this.output.insertBefore(line, inputLine);
    } else {
      this.output.appendChild(line);
    }
    
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
      <span class="command">skills</span> - Display skill matrix<br>
      <span class="command">contact</span> - Contact information<br>
      <span class="command">clear</span> - Clear terminal<br>
      <span class="command">neofetch</span> - System information<br>
      <span class="command">matrix</span> - Enter the Matrix<br>
      <span class="command">hack</span> - Activate hacker mode<br>
      <span class="command">status</span> - System status
    `, 'output');
  }
  
  showAbout() {
    this.addLine(`
      <span class="output">
        <span style="color: #00ffff;">👨‍💻 DEVELOPER PROFILE 👨‍💻</span><br><br>
        <span style="color: #00ff41;">Name:</span> Minthep<br>
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
        <span style="color: #00ffff;">🚀 PROJECT PORTFOLIO 🚀</span><br><br>
        <span style="color: #ff0080;">📁 NeuroCommerce</span> - AI-powered e-commerce platform<br>
        <span style="color: #8000ff;">📁 CyberDash</span> - Real-time analytics dashboard<br>
        <span style="color: #00ff41;">📁 NeonWallet</span> - Cryptocurrency mobile wallet<br>
        <span style="color: #ff8000;">📁 MindForge AI</span> - Creative AI assistant platform<br><br>
        <span style="color: #00ffff;">Total Projects: 50+ | Success Rate: 100%</span>
      </span>
    `, 'output');
  }
  
  showSkills() {
    this.addLine(`
      <span class="output">
        <span style="color: #00ffff;">⚡ SKILL MATRIX ⚡</span><br><br>
        <span style="color: #00ff41;">Frontend [95%]:</span> React, Vue.js, TypeScript, Next.js<br>
        <span style="color: #ff0080;">Design [90%]:</span> Figma, Adobe Creative Suite, Blender<br>
        <span style="color: #8000ff;">Backend [85%]:</span> Node.js, Python, PostgreSQL<br>
        <span style="color: #ff8000;">DevOps [80%]:</span> Docker, AWS, Kubernetes<br>
        <span style="color: #00ffff;">Tools [95%]:</span> Git, Docker, AWS, Vercel<br><br>
        <span style="color: #00ff41;">🏆 EXPERTISE LEVEL: LEGENDARY 🏆</span>
      </span>
    `, 'output');
  }
  
  showContact() {
    this.addLine(`
      <span class="output">
        <span style="color: #00ffff;">📞 CONTACT INFORMATION 📞</span><br><br>
        <span style="color: #00ff41;">📧 Email:</span> minthep@creative-dev.com<br>
        <span style="color: #ff0080;">🐙 GitHub:</span> github.com/minthep<br>
        <span style="color: #8000ff;">💼 LinkedIn:</span> linkedin.com/in/minthep<br>
        <span style="color: #ff8000;">🌐 Website:</span> minthep.dev<br><br>
        🎨 Portfolio: minthep.dev
      </span>
    `, 'output');
  }
  
  clearTerminal() {
    this.output.innerHTML = '';
    this.addInputLine();
  }
  
  whoami() {
    this.addLine(`<span class="output">Minthep - Creative Developer & Designer</span>`, 'output');
  }
  
  listFiles() {
    this.addLine(`
      <span class="output">
        <span style="color: #00ffff;">📂 DIRECTORY LISTING 📂</span><br><br>
        <span style="color: #00ff41;">drwxr-xr-x</span>  projects/<br>
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
      case 'resume.pdf':
        this.addLine(`<span class="output" style="color: #00ff41;">📄 Opening resume.pdf... Download started!</span>`, 'output');
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
        <span style="color: #00ffff;">    ▀▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▀</span>    <span style="color: #8000ff;">Memory:</span> 32GB DDR5<br>
                                        <span style="color: #8000ff;">GPU:</span> RTX 4090<br>
                                        <span style="color: #8000ff;">Status:</span> <span style="color: #00ff41;">LEGENDARY</span>
      </span>
    `, 'output');
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

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new OSInterface();
  new TerminalController();
  new FormController();
  
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