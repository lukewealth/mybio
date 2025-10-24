'use client';
import React, { useState, useEffect, useRef } from 'react';
import { useSpeech } from '../hooks/useSpeech'; // Assuming this hook exists

interface NarratorProps {
  text: string;
  voice?: SpeechSynthesisVoice | null;
  rate?: number;
  pitch?: number;
}

const Narrator: React.FC<NarratorProps> = ({ text, voice = null, rate = 1, pitch = 1 }) => {
  const { speak, cancel, speaking, supported } = useSpeech();
  const [hasSpoken, setHasSpoken] = useState(false);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  useEffect(() => {
    if (supported && text && !hasSpoken) {
      const utterance = new SpeechSynthesisUtterance(text);
      if (voice) {
        utterance.voice = voice;
      }
      utterance.rate = rate;
      utterance.pitch = pitch;
      utterance.onend = () => {
        setHasSpoken(true);
      };
      utteranceRef.current = utterance;
      speak(utterance);
    }

    return () => {
      cancel();
    };
  }, [text, voice, rate, pitch, supported, hasSpoken, speak, cancel]);

  if (!supported) {
    return <p className="text-red-500">Speech synthesis not supported in this browser.</p>;
  }

  return (
    <div className="narrator-container p-4 bg-gray-800 text-white rounded-lg shadow-lg">
      <p className="text-lg">{text}</p>
      {speaking && <p className="text-sm text-gray-400">Speaking...</p>}
      {/* You can add controls here if needed, e.g., a replay button */}
    </div>
  );
};

export default Narrator;