export class PerformanceOptimizer {
  private static instance: PerformanceOptimizer;
  private frameThrottleIds: Map<string, number> = new Map();
  private lowPowerMode: boolean = false;

  static getInstance() {
    if (!PerformanceOptimizer.instance) {
      PerformanceOptimizer.instance = new PerformanceOptimizer();
    }
    return PerformanceOptimizer.instance;
  }

  throttleFrameRate(callback: () => void, key: string, fps: number = 30) {
    if (this.frameThrottleIds.has(key)) {
      cancelAnimationFrame(this.frameThrottleIds.get(key)!);
    }

    const interval = 1000 / fps;
    let then = Date.now();

    const animate = () => {
      const id = requestAnimationFrame(animate);
      this.frameThrottleIds.set(key, id);

      const now = Date.now();
      const delta = now - then;

      if (delta > interval) {
        then = now - (delta % interval);
        callback();
      }
    };

    animate();
  }

  enableLowPowerMode() {
    this.lowPowerMode = true;
    document.documentElement.style.setProperty('--animation-duration', '0.1s');
    document.documentElement.classList.add('low-power-mode');
  }

  disableLowPowerMode() {
    this.lowPowerMode = false;
    document.documentElement.style.removeProperty('--animation-duration');
    document.documentElement.classList.remove('low-power-mode');
  }

  cleanupAnimations() {
    this.frameThrottleIds.forEach(id => cancelAnimationFrame(id));
    this.frameThrottleIds.clear();
  }
}

export const performanceOptimizer = PerformanceOptimizer.getInstance();
