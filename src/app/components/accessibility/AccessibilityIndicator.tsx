import { Mic, Volume2, Hand, Eye, Moon, Type } from "lucide-react";
import { useApp } from "../../context/AppContext";

export const AccessibilityIndicator = () => {
  const { state } = useApp();
  const a = state.accessibility;

  const chips: { label: string; className: string; icon?: React.ReactNode }[] = [];

  if (a.voiceCommands) chips.push({ label: "Voz activa", className: "voice", icon: <Mic className="w-3 h-3" /> });
  if (a.ttsEnabled) chips.push({ label: "Lectura activa", className: "", icon: <Volume2 className="w-3 h-3" /> });
  if (a.oneHandMode) chips.push({ label: "1 mano", className: "success", icon: <Hand className="w-3 h-3" /> });
  if (a.buttonSize === "large") chips.push({ label: "Botones grandes", className: "", icon: <Type className="w-3 h-3" /> });
  if (a.highContrast) chips.push({ label: "Alto contraste", className: "", icon: <Eye className="w-3 h-3" /> });
  if (a.darkMode) chips.push({ label: "Modo oscuro", className: "", icon: <Moon className="w-3 h-3" /> });

  if (chips.length === 0) return null;

  return (
    <div className="accessibility-indicator animate-slide-down">
      {chips.map((chip) => (
        <span key={chip.label} className={`chip ${chip.className}`}>
          {chip.icon}
          {chip.label}
        </span>
      ))}
    </div>
  );
};
