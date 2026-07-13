import { useCallback, useRef, useState } from "react";
import { AccessibilitySettings } from "../context/AppContext";

const speedMap: Record<string, number> = {
  slow: 0.7,
  normal: 1,
  fast: 1.5,
};

export function useTextToSpeech(settings: AccessibilitySettings) {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  const speak = useCallback(
    (text: string) => {
      if (!settings.ttsEnabled) return;
      if (!window.speechSynthesis) return;

      window.speechSynthesis.cancel();

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "es-ES";
      utterance.rate = speedMap[settings.readingSpeed] || 1;
      utterance.pitch = 1;
      utterance.volume = 1;

      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);

      utteranceRef.current = utterance;
      window.speechSynthesis.speak(utterance);
    },
    [settings.ttsEnabled, settings.readingSpeed]
  );

  const stop = useCallback(() => {
    window.speechSynthesis?.cancel();
    setIsSpeaking(false);
  }, []);

  return { speak, stop, isSpeaking };
}
