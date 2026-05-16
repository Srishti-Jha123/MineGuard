/**
 * Industrial Buzzer Utility using Web Audio API
 */

let audioCtx: AudioContext | null = null;

export const playBuzzer = (duration = 500) => {
  try {
    if (!audioCtx) {
      audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
    }

    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }

    const oscillator = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();

    // Industrial buzzer sound: Square wave at low frequency
    oscillator.type = 'square';
    oscillator.frequency.setValueAtTime(150, audioCtx.currentTime); // Low frequency for "buzz"
    
    // Add a second oscillator for a more complex "harsh" sound
    const oscillator2 = audioCtx.createOscillator();
    oscillator2.type = 'sawtooth';
    oscillator2.frequency.setValueAtTime(155, audioCtx.currentTime);

    gainNode.gain.setValueAtTime(0.1, audioCtx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + duration / 1000);

    oscillator.connect(gainNode);
    oscillator2.connect(gainNode);
    gainNode.connect(audioCtx.destination);

    oscillator.start();
    oscillator2.start();
    
    setTimeout(() => {
      oscillator.stop();
      oscillator2.stop();
    }, duration);
  } catch (error) {
    console.error('Failed to play buzzer:', error);
  }
};
