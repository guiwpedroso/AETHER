/**
 * Web Audio API Procedural Synthesizer
 * Generates delicate, futuristic UI soundscapes with zero external assets and zero latency.
 * Respects strict user privacy and browser autoplay policies (starts muted).
 */

class SoundManager {
  private ctx: AudioContext | null = null;
  private muted: boolean = true;
  private masterGain: GainNode | null = null;
  private listeners: ((muted: boolean) => void)[] = [];

  constructor() {
    // Initialized muted by default as required
    this.muted = true;
  }

  private ensureContext() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
        this.masterGain = this.ctx.createGain();
        this.masterGain.gain.setValueAtTime(this.muted ? 0 : 0.2, this.ctx.currentTime);
        this.masterGain.connect(this.ctx.destination);
      }
    }

    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
  }

  public isMuted(): boolean {
    return this.muted;
  }

  public setMuted(mute: boolean) {
    this.muted = mute;
    this.ensureContext();
    if (this.masterGain && this.ctx) {
      const targetGain = this.muted ? 0 : 0.18;
      this.masterGain.gain.cancelScheduledValues(this.ctx.currentTime);
      this.masterGain.gain.linearRampToValueAtTime(targetGain, this.ctx.currentTime + 0.05);
    }
    this.notifyListeners();
  }

  public toggleMute(): boolean {
    this.setMuted(!this.muted);
    if (!this.muted) {
      // Play a confirmation sound upon activation
      this.playSelect();
    }
    return this.muted;
  }

  public subscribe(fn: (muted: boolean) => void): () => void {
    this.listeners.push(fn);
    return () => {
      this.listeners = this.listeners.filter(l => l !== fn);
    };
  }

  private notifyListeners() {
    this.listeners.forEach(fn => fn(this.muted));
  }

  /**
   * Crisp, high-frequency tick for mouse hover on buttons / interactive links
   */
  public playHoverClick() {
    if (this.muted) return;
    this.ensureContext();
    if (!this.ctx || !this.masterGain) return;

    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const filter = this.ctx.createBiquadFilter();

      filter.type = 'highpass';
      filter.frequency.setValueAtTime(1500, this.ctx.currentTime);

      osc.type = 'sine';
      osc.frequency.setValueAtTime(2200, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(3600, this.ctx.currentTime + 0.025);

      gain.gain.setValueAtTime(0.06, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.03);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.masterGain);

      osc.start(this.ctx.currentTime);
      osc.stop(this.ctx.currentTime + 0.035);
    } catch {
      // Ignore audio synthesis errors
    }
  }

  /**
   * Resonant soft futuristic chime for selection, modal opens, parameter toggles
   */
  public playSelect() {
    if (this.muted) return;
    this.ensureContext();
    if (!this.ctx || !this.masterGain) return;

    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(520, now);
      osc.frequency.exponentialRampToValueAtTime(880, now + 0.08);

      gain.gain.setValueAtTime(0.09, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.22);

      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.start(now);
      osc.stop(now + 0.23);
    } catch {
      // Ignore audio synthesis errors
    }
  }

  /**
   * Deep low-frequency resonant whoosh for section scroll jumps or fullscreen moments
   */
  public playWhoosh() {
    if (this.muted) return;
    this.ensureContext();
    if (!this.ctx || !this.masterGain) return;

    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(240, now);
      osc.frequency.exponentialRampToValueAtTime(80, now + 0.35);

      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);

      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.start(now);
      osc.stop(now + 0.42);
    } catch {
      // Ignore audio synthesis errors
    }
  }

  /**
   * Mechanical tactile switch click for 3D Lab controls
   */
  public playSwitch() {
    if (this.muted) return;
    this.ensureContext();
    if (!this.ctx || !this.masterGain) return;

    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'square';
      osc.frequency.setValueAtTime(900, now);
      osc.frequency.exponentialRampToValueAtTime(450, now + 0.04);

      gain.gain.setValueAtTime(0.05, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.045);

      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.start(now);
      osc.stop(now + 0.05);
    } catch {
      // Ignore audio synthesis errors
    }
  }

  /**
   * Preloader micro-tick (called on percentage increments)
   */
  public playTick() {
    if (this.muted) return;
    this.ensureContext();
    if (!this.ctx || !this.masterGain) return;

    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(1400, now);

      gain.gain.setValueAtTime(0.03, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.015);

      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.start(now);
      osc.stop(now + 0.02);
    } catch {
      // Ignore audio synthesis errors
    }
  }
}

export const sound = new SoundManager();
