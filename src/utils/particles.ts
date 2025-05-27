interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  life: number;
  maxLife: number;
}

export class ParticleSystem {
  private particles: Particle[] = [];
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private enabled: boolean = true;

  constructor() {
    this.canvas = document.createElement('canvas');
    this.ctx = this.canvas.getContext('2d')!;
    this.setupCanvas();
    this.animate();

    window.addEventListener('resize', () => this.setupCanvas());
  }

  private setupCanvas() {
    this.canvas.style.position = 'fixed';
    this.canvas.style.top = '0';
    this.canvas.style.left = '0';
    this.canvas.style.width = '100%';
    this.canvas.style.height = '100%';
    this.canvas.style.pointerEvents = 'none';
    this.canvas.style.zIndex = '9999';

    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;

    if (!document.body.contains(this.canvas)) {
      document.body.appendChild(this.canvas);
    }
  }

  emit(x: number, y: number, options: {
    count?: number;
    spread?: number;
    speed?: number;
    size?: number;
    color?: string;
    life?: number;
  } = {}) {
    if (!this.enabled) return;

    const {
      count = 10,
      spread = Math.PI * 2,
      speed = 5,
      size = 5,
      color = '#3b82f6',
      life = 1000
    } = options;

    for (let i = 0; i < count; i++) {
      const angle = Math.random() * spread;
      const velocity = Math.random() * speed;

      this.particles.push({
        x,
        y,
        vx: Math.cos(angle) * velocity,
        vy: Math.sin(angle) * velocity,
        size: size * (0.5 + Math.random() * 0.5),
        color,
        life,
        maxLife: life
      });
    }
  }

  private animate = () => {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.particles = this.particles.filter(particle => {
      particle.x += particle.vx;
      particle.y += particle.vy;
      particle.life -= 16.67; // Approx. 60 FPS

      const progress = particle.life / particle.maxLife;
      const alpha = progress;
      const scale = 1 - progress;

      this.ctx.beginPath();
      this.ctx.arc(particle.x, particle.y, particle.size * scale, 0, Math.PI * 2);
      this.ctx.fillStyle = `${particle.color}${Math.floor(alpha * 255).toString(16).padStart(2, '0')}`;
      this.ctx.fill();

      return particle.life > 0;
    });

    requestAnimationFrame(this.animate);
  }

  setEnabled(enabled: boolean) {
    this.enabled = enabled;
    if (!enabled) {
      this.particles = [];
    }
  }
}

export const particleSystem = new ParticleSystem();
