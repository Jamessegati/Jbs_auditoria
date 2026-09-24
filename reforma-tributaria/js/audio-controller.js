export function createAudioController({ speechSynthesis, Utterance }) {
  const supported = Boolean(speechSynthesis && Utterance);
  const clampRate = rate => Math.min(1.5, Math.max(0.75, Number(rate) || 1));
  let generation = 0;
  return {
    supported,
    speak(text, rate = 1) {
      if (!supported || !String(text).trim()) return false;
      speechSynthesis.cancel();
      const token = ++generation;
      const words = String(text).trim().split(/\s+/);
      const chunks = [];
      let chunk = '';
      for (const word of words) {
        if (chunk && chunk.length + word.length > 600) { chunks.push(chunk); chunk = ''; }
        chunk += `${chunk ? ' ' : ''}${word}`;
      }
      if (chunk) chunks.push(chunk);
      const next = () => {
        if (token !== generation || !chunks.length) return;
        const utterance = new Utterance(chunks.shift());
        utterance.lang = 'pt-BR';
        utterance.rate = clampRate(rate);
        utterance.onend = next;
        utterance.onerror = () => { if (token === generation) generation++; };
        speechSynthesis.speak(utterance);
      };
      next();
      return true;
    },
    pause() { if (supported) speechSynthesis.pause?.(); },
    resume() { if (supported) speechSynthesis.resume?.(); },
    stop() { generation++; if (supported) speechSynthesis.cancel(); },
  };
}
