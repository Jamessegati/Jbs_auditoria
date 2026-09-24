export function createAudioController({ speechSynthesis, Utterance }) {
  const supported = Boolean(speechSynthesis && Utterance);
  const clampRate = rate => Math.min(1.5, Math.max(0.75, Number(rate) || 1));
  return {
    supported,
    speak(text, rate = 1) {
      if (!supported || !String(text).trim()) return false;
      speechSynthesis.cancel();
      const utterance = new Utterance(String(text));
      utterance.lang = 'pt-BR';
      utterance.rate = clampRate(rate);
      speechSynthesis.speak(utterance);
      return true;
    },
    pause() { if (supported) speechSynthesis.pause?.(); },
    resume() { if (supported) speechSynthesis.resume?.(); },
    stop() { if (supported) speechSynthesis.cancel(); },
  };
}

