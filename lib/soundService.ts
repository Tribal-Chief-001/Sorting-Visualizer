class SoundService {
  private audioContext: AudioContext | null = null;
  private isMuted: boolean = true;

  private initializeAudioContext() {
    if (!this.audioContext) {
      this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
  }

  public setMuted(muted: boolean) {
    this.isMuted = muted;
    // If we are un-muting for the first time, we need to initialize the context.
    if (!muted) {
      this.initializeAudioContext();
    }
  }

  private playNote(frequency: number, duration: number, type: OscillatorType = 'sine') {
    if (this.isMuted || !this.audioContext) return;

    const oscillator = this.audioContext.createOscillator();
    const gainNode = this.audioContext.createGain();

    oscillator.type = type;
    oscillator.frequency.setValueAtTime(frequency, this.audioContext.currentTime);

    gainNode.gain.setValueAtTime(0.1, this.audioContext.currentTime); // Start with low volume
    gainNode.gain.exponentialRampToValueAtTime(0.0001, this.audioContext.currentTime + duration);

    oscillator.connect(gainNode);
    gainNode.connect(this.audioContext.destination);

    oscillator.start();
    oscillator.stop(this.audioContext.currentTime + duration);
  }

  public playCompareSound() {
    this.playNote(440, 0.05, 'triangle'); // A short, sharp sound
  }

  public playWriteSound() {
    this.playNote(660, 0.05, 'sine'); // A slightly higher, softer sound
  }
}

export const soundService = new SoundService();
