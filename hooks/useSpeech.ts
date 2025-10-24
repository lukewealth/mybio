import { useState, useEffect } from 'react';

export const useSpeech = () => {
  const [speaking, setSpeaking] = useState(false);
  const [supported, setSupported] = useState(false);

  useEffect(() => {
    if ('speechSynthesis' in window) {
      setSupported(true);
    }
  }, []);

  const speak = (utterance: SpeechSynthesisUtterance) => {
    if (supported) {
      setSpeaking(true);
      utterance.onend = () => setSpeaking(false);
      utterance.onerror = () => setSpeaking(false);
      window.speechSynthesis.speak(utterance);
    } else {
      console.error("Speech synthesis not supported.");
    }
  };

  const cancel = () => {
    if (supported && window.speechSynthesis.speaking) {
      window.speechSynthesis.cancel();
      setSpeaking(false);
    }
  };

  return { speak, cancel, speaking, supported };
};
