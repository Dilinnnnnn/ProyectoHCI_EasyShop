import { Mic } from "lucide-react";

interface FloatingMicButtonProps {
  onClick: () => void;
  active: boolean;
}

export const FloatingMicButton = ({ onClick, active }: FloatingMicButtonProps) => (
  <button
    onClick={onClick}
    className={`absolute bottom-20 right-4 z-50 w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-all active:scale-90 ripple-btn
      ${active
        ? "bg-voice text-voice-foreground animate-voice-pulse"
        : "bg-voice text-voice-foreground hover:bg-voice/90"}`}
    aria-label="Asistente de voz"
  >
    <Mic className="w-6 h-6" />
  </button>
);
