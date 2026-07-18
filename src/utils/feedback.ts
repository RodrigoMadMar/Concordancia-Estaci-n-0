import { Vibration } from "react-native";

function playTone(frequency: number, durationMs: number, gainValue = 0.03) {
  const webGlobal = globalThis as typeof globalThis & {
    AudioContext?: typeof AudioContext;
    webkitAudioContext?: typeof AudioContext;
  };
  const AudioContextCtor = webGlobal.AudioContext ?? webGlobal.webkitAudioContext;

  if (AudioContextCtor == null) {
    return;
  }

  const audioContext = new AudioContextCtor();
  const oscillator = audioContext.createOscillator();
  const gain = audioContext.createGain();

  oscillator.frequency.value = frequency;
  oscillator.type = "sine";
  gain.gain.value = gainValue;
  oscillator.connect(gain);
  gain.connect(audioContext.destination);
  oscillator.start();
  oscillator.stop(audioContext.currentTime + durationMs / 1000);
}

export function playStampFeedback() {
  Vibration.vibrate(35);
  playTone(420, 90, 0.035);
}

export function playTrainReleaseFeedback() {
  Vibration.vibrate([20, 60, 45]);
  playTone(96, 340, 0.025);
}

export function playDiscordanceFeedback() {
  Vibration.vibrate([18, 45, 38]);
  playTone(220, 90, 0.035);

  if (typeof window !== "undefined") {
    window.setTimeout(() => playTone(147, 130, 0.03), 110);
  }
}
