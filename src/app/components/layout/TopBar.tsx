import { ArrowLeft, Mic } from "lucide-react";
import { useApp } from "../../context/AppContext";

interface TopBarProps {
  title: string;
  showVoice?: boolean;
  showBack?: boolean;
  voiceActive?: boolean;
  onVoice?: () => void;
}

export const TopBar = ({ title, showVoice, showBack, voiceActive, onVoice }: TopBarProps) => {
  const { goBack } = useApp();

  return (
    <div className="flex items-center bg-card border-b border-border px-4 py-3 gap-3 shrink-0">
      {showBack && (
        <button
          onClick={goBack}
          className="w-11 h-11 rounded-xl border border-border flex items-center justify-center bg-muted active:bg-muted/70 transition-colors"
          aria-label="Volver"
        >
          <ArrowLeft className="w-5 h-5 text-foreground" />
        </button>
      )}
      <span className="flex-1 font-bold text-lg text-foreground">{title}</span>
      {showVoice && onVoice && (
        <button
          onClick={onVoice}
          className={`w-11 h-11 rounded-xl border-2 flex items-center justify-center transition-all active:scale-95
            ${voiceActive ? "bg-primary border-primary text-primary-foreground animate-voice-pulse" : "bg-muted border-border text-muted-foreground"}`}
          aria-label="Activar asistente de voz"
        >
          <Mic className="w-5 h-5" />
        </button>
      )}
    </div>
  );
};
