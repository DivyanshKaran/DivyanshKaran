// Cosmic GitHub Profile JavaScript Interactions

// Particle System for Star Field Background
class StarField {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.stars = [];
    this.mouse = { x: 0, y: 0 };
    
    this.init();
    this.animate();
    this.addEventListeners();
  }
  
  init() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    
    // Create stars
    for (let i = 0; i < 150; i++) {
      this.stars.push({
        x: Math.random() * this.canvas.width,
        y: Math.random() * this.canvas.height,
        z: Math.random() * 1000,
        originalZ: Math.random() * 1000,
        speed: Math.random() * 0.5 + 0.1
      });
    }
  }
  
  animate() {
    this.ctx.fillStyle = '#0a0a0a';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    
    this.stars.forEach(star => {
      star.z -= star.speed;
      
      if (star.z <= 0) {
        star.z = star.originalZ;
        star.x = Math.random() * this.canvas.width;
        star.y = Math.random() * this.canvas.height;
      }
      
      const x = (star.x - this.canvas.width / 2) * (400 / star.z) + this.canvas.width / 2;
      const y = (star.y - this.canvas.height / 2) * (400 / star.z) + this.canvas.height / 2;
      
      if (x >= 0 && x <= this.canvas.width && y >= 0 && y <= this.canvas.height) {
        const size = (1 - star.z / 1000) * 2;
        const alpha = 1 - star.z / 1000;
        
        this.ctx.save();
        this.ctx.globalAlpha = alpha;
        this.ctx.fillStyle = '#ffffff';
        this.ctx.beginPath();
        this.ctx.arc(x, y, size, 0, Math.PI * 2);
        this.ctx.fill();
        this.ctx.restore();
        
        // Add twinkling effect
        if (Math.random() < 0.05) {
          this.ctx.save();
          this.ctx.globalAlpha = alpha * 0.5;
          this.ctx.fillStyle = '#00ffff';
          this.ctx.beginPath();
          this.ctx.arc(x, y, size * 2, 0, Math.PI * 2);
          this.ctx.fill();
          this.ctx.restore();
        }
      }
    });
    
    requestAnimationFrame(() => this.animate());
  }
  
  addEventListeners() {
    window.addEventListener('resize', () => {
      this.canvas.width = window.innerWidth;
      this.canvas.height = window.innerHeight;
    });
    
    document.addEventListener('mousemove', (e) => {
      this.mouse.x = e.clientX;
      this.mouse.y = e.clientY;
    });
  }
}

// Count-up Animation for Stats
class CountUpAnimation {
  constructor(element, target, duration = 2000) {
    this.element = element;
    this.target = target;
    this.duration = duration;
    this.start = 0;
    this.startTime = null;
  }
  
  animate(currentTime) {
    if (!this.startTime) this.startTime = currentTime;
    
    const progress = Math.min((currentTime - this.startTime) / this.duration, 1);
    const easeOutQuart = 1 - Math.pow(1 - progress, 4);
    const current = Math.floor(this.start + (this.target - this.start) * easeOutQuart);
    
    this.element.textContent = current.toLocaleString();
    
    if (progress < 1) {
      requestAnimationFrame((time) => this.animate(time));
    }
  }
  
  startAnimation() {
    requestAnimationFrame((time) => this.animate(time));
  }
}

// Parallax Scrolling Effect
class ParallaxEffect {
  constructor() {
    this.elements = document.querySelectorAll('.parallax-element');
    this.init();
  }
  
  init() {
    window.addEventListener('scroll', this.handleScroll.bind(this));
    window.addEventListener('resize', this.handleResize.bind(this));
  }
  
  handleScroll() {
    const scrolled = window.pageYOffset;
    const rate = scrolled * -0.5;
    
    this.elements.forEach(element => {
      const speed = element.dataset.speed || 0.5;
      const yPos = -(scrolled * speed);
      element.style.transform = `translate3d(0px, ${yPos}px, 0px)`;
    });
  }
  
  handleResize() {
    // Recalculate positions on resize
    this.handleScroll();
  }
}

// Technology Constellation Interactions
class TechConstellation {
  constructor() {
    this.nodes = [];
    this.connections = [];
    this.canvas = null;
    this.ctx = null;
    this.init();
  }
  
  init() {
    this.createCanvas();
    this.createNodes();
    this.createConnections();
    this.draw();
    this.addEventListeners();
  }
  
  createCanvas() {
    this.canvas = document.createElement('canvas');
    this.canvas.style.position = 'absolute';
    this.canvas.style.top = '0';
    this.canvas.style.left = '0';
    this.canvas.style.width = '100%';
    this.canvas.style.height = '100%';
    this.canvas.style.pointerEvents = 'none';
    this.canvas.style.zIndex = '1';
    
    document.querySelector('.tech-constellation').appendChild(this.canvas);
    this.resizeCanvas();
  }
  
  createNodes() {
    const techItems = [
      { name: 'React', x: 100, y: 100 },
      { name: 'Node.js', x: 200, y: 200 },
      { name: 'Python', x: 300, y: 150 },
      { name: 'MongoDB', x: 150, y: 300 },
      { name: 300, y: 250 },
      { name: 'TypeScript', x: 250, y: 350 }
    ];
    
    techItems.forEach(tech => {
      this.nodes.push({
        name: tech.name,
        x: tech.x,
        y: tech.y,
        radius: 25,
        connections: []
      });
    });
  }
  
  createConnections() {
    // Frontend connections
    this.connectNodes('React', 'TypeScript');
    this.connectNodes('React', 'Next.js');
    
    // Backend connections
    this.connectNodes('Node.js', 'Express');
    this.connectNodes('Python', 'FastAPI');
    
    // Database connections
    this.connectNodes('MongoDB', 'Node.js');
    this.connectNodes('PostgreSQL', 'Python');
  }
  
  connectNodes(name1, name2) {
    const node1 = this.nodes.find(n => n.name === name1);
    const node2 = this.nodes.find(n => n.name === name2);
    
    if (node1 && node2) {
      this.connections.push({ from: node1, to: node2 });
      node1.connections.push(node2);
      node2.connections.push(node1);
    }
  }
  
  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    
    // Draw connections
    this.connections.forEach(conn => {
      this.drawConnection(conn.from, conn.to);
    });
    
    // Draw nodes
    this.nodes.forEach(node => {
      this.drawNode(node);
    });
  }
  
  drawConnection(node1, node2) {
    this.ctx.strokeStyle = 'rgba(0, 255, 255, 0.3)';
    this.ctx.lineWidth = 1;
    this.ctx.beginPath();
    this.ctx.moveTo(node1.x, node1.y);
    this.ctx.lineTo(node2.x, node2.y);
    this.ctx.stroke();
    
    // Animate pulse effect
    this.ctx.strokeStyle = 'rgba(0, 255, 255, 0.6)';
    const distance = Math.sqrt(Math.pow(node2.x - node1.x, 2) + Math.pow(node2.y - node1.y, 2));
    const pulseT = Date.now() * 0.001;
    const pulseWidth = Math.sin(pulseT) * 0.5 + 0.5;
    
    this.ctx.lineWidth = pulseWidth * 2;
    this.ctx.beginPath();
    this.ctx.moveTo(node1.x, node1.y);
    this.ctx.lineTo(node2.x, node2.y);
    this.ctx.stroke();
  }
  
  drawNode(node) {
    // Outer glow
    const gradient = this.ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, node.radius + 10);
    gradient.addColorStop(0, 'rgba(0, 255, 255, 0.8)');
    gradient.addColorStop(1, 'rgba(0, 255, 255, 0)');
    
    this.ctx.fillStyle = gradient;
    this.ctx.beginPath();
    this.ctx.arc(node.x, node.y, node.radius + 10, 0, Math.PI * 2);
    this.ctx.fill();
    
    // Main node
    this.ctx.fillStyle = 'rgba(0, 20, 40, 0.8)';
    this.ctx.beginPath();
    this.ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
    this.ctx.fill();
    
    // Border
    this.ctx.strokeStyle = '#00ffff';
    this.ctx.lineWidth = 2;
    this.ctx.beginPath();
    this.ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
    this.ctx.stroke();
  }
  
  addEventListeners() {
    window.addEventListener('resize', this.resizeCanvas.bind(this));
  }
  
  resizeCanvas() {
    this.canvas.width = this.canvas.offsetWidth;
    this.canvas.height = this.canvas.offsetHeight;
    this.draw();
  }
}

// Scroll Progress Indicator
class ScrollProgress {
  constructor() {
    this.progressBar = document.createElement('div');
    this.progressBar.className = 'scroll-progress';
    document.body.appendChild(this.progressBar);
    
    window.addEventListener('scroll', this.updateProgress.bind(this));
  }
  
  updateProgress() {
    const windowHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrolled = (window.scrollY / windowHeight) * 100;
    this.progressBar.style.width = scrolled + '%';
  }
}

// Typing Animation Effect
class TypingAnimation {
  constructor(element, text, speed = 100) {
    this.element = element;
    this.text = text;
    this.speed = speed;
    this.currentIndex = 0;
  }
  
  type() {
    if (this.currentIndex < this.text.length) {
      this.element.textContent += this.text.charAt(this.currentIndex);
      this.currentIndex++;
      setTimeout(() => this.type(), this.speed);
    }
  }
  
  start() {
    this.element.textContent = '';
    this.type();
  }
}

// Initialize all effects when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  // Initialize Star Field
  const canvas = document.createElement('canvas');
  canvas.id = 'particle-canvas';
  document.body.appendChild(canvas);
  new StarField(canvas);
  
  // Initialize Parallax Effect
  new ParallaxEffect();
  
  // Initialize Technology Constellation
  new TechConstellation();
  
  // Initialize Scroll Progress
  new ScrollProgress();
  
  // Initialize Count-up Animations
  setTimeout(() => {
    const commitElement = document.querySelector('[data-count="commits"]');
    const starElement = document.querySelector('[data-count="stars"]');
    const forkElement = document.querySelector('[data-count="forks"]');
    
    if (commitElement) {
      const commitCount = parseInt(commitElement.dataset.countValue) || 1250;
      new CountUpAnimation(commitElement, commitCount, 2000).startAnimation();
    }
    
    if (starElement) {
      const starCount = parseInt(starElement.dataset.countValue) || 89;
      new CountUpAnimation(starElement, starCount, 1500).startAnimation();
    }
    
    if (forkElement) {
      const forkCount = parseInt(forkElement.dataset.countValue) || 34;
      new CountUpAnimation(forkElement, forkCount, 1800).startAnimation();
    }
  }, 1000);
  
  // Add cosmic background to body
  document.body.classList.add('galaxy-bg');
  
  // Initialize intersection observer for animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in');
      }
    });
  }, observerOptions);
  
  // Observe all cards for animation
  document.querySelectorAll('.git-card, .tech-item').forEach(card => {
    observer.observe(card);
  });
});

// Utility function for easing
function easeOutQuart(t) {
  return 1 - Math.pow(1 - t, 4);
}

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
  .animate-in {
    animation: slideInUp 0.6s ease-out forwards;
  }
  
  @keyframes slideInUp {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;
document.head.appendChild(style);
