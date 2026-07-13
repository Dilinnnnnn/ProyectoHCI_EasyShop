import { Volume2, VolumeX } from "lucide-react";
import { useTextToSpeech } from "../../hooks/useTextToSpeech";
import { useApp } from "../../context/AppContext";

interface AudioPlaybackButtonProps {
  text: string;
  className?: string;
}

export const AudioPlaybackButton = ({ text, className = "" }: AudioPlaybackButtonProps) => {
  const { state } = useApp();
  const { speak, stop, isSpeaking } = useTextToSpeech(state.accessibility);

  return (
    <button
      onClick={() => (isSpeaking ? stop() : speak(text))}
      className={`w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary active:bg-primary/20 transition-colors
        ${className}`}
      aria-label={isSpeaking ? "Detener lectura" : "Leer información"}
    >
      {isSpeaking ? (
        <VolumeX className="w-5 h-5 animate-pulse" />
      ) : (
        <Volume2 className="w-5 h-5" />
      )}
    </button>
  );
};
