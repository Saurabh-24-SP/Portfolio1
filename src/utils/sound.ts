export class SoundManager {
  private audioContext: AudioContext | null = null;
  private gainNode: GainNode | null = null;
  private sounds: Map<string, AudioBuffer> = new Map();
  private enabled: boolean = true;

  constructor() {
    try {
      this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      this.gainNode = this.audioContext.createGain();
      this.gainNode.connect(this.audioContext.destination);
    } catch (error) {
      console.warn('Web Audio API not supported');
    }
  }

  async loadSound(name: string, url: string) {
    if (!this.audioContext) return;

    try {
      const response = await fetch(url);
      const arrayBuffer = await response.arrayBuffer();
      const audioBuffer = await this.audioContext.decodeAudioData(arrayBuffer);
      this.sounds.set(name, audioBuffer);
    } catch (error) {
      console.error(`Error loading sound ${name}:`, error);
    }
  }

  play(name: string, options: { volume?: number; pitch?: number } = {}) {
    if (!this.enabled || !this.audioContext || !this.gainNode) return;

    const sound = this.sounds.get(name);
    if (!sound) return;

    const source = this.audioContext.createBufferSource();
    source.buffer = sound;
    
    const gainNode = this.audioContext.createGain();
    gainNode.gain.value = options.volume ?? 1;
    
    if (options.pitch) {
      source.playbackRate.value = options.pitch;
    }

    source.connect(gainNode);
    gainNode.connect(this.gainNode);
    
    source.start(0);
    
    // Auto cleanup
    source.onended = () => {
      source.disconnect();
      gainNode.disconnect();
    };
  }

  setVolume(volume: number) {
    if (this.gainNode) {
      this.gainNode.gain.value = Math.max(0, Math.min(1, volume));
    }
  }

  setEnabled(enabled: boolean) {
    this.enabled = enabled;
  }
}

export const soundManager = new SoundManager();

// Initialize common sounds
soundManager.loadSound('hover', '/sounds/hover.mp3');
soundManager.loadSound('click', '/sounds/click.mp3');
soundManager.loadSound('success', '/sounds/success.mp3');
