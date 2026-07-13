import { useEffect } from "react";
import { X, Check } from "lucide-react";
import { WLabel } from "../wireframe/WLabel";
import { WBtn } from "../wireframe/WBtn";
import { useTextToSpeech } from "../../hooks/useTextToSpeech";
import { useHapticFeedback } from "../../hooks/useHapticFeedback";
import { useApp } from "../../context/AppContext";

interface SmartConfirmationProps {
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export const SmartConfirmation = ({
  title,
  message,
  confirmLabel = "Sí, confirmar",
  cancelLabel = "No, cancelar",
  onConfirm,
  onCancel,
}: SmartConfirmationProps) => {
  const { state } = useApp();
  const { speak } = useTextToSpeech(state.accessibility);
  const { vibrate } = useHapticFeedback(state.accessibility);

  useEffect(() => {
    speak(`${title}. ${message}`);
    vibrate("confirm");
  }, []);

  return (
    <div className="absolute inset-0 z-50 bg-foreground/80 flex items-center justify-center p-4 animate-fade-in">
      <div className="bg-card rounded-2xl p-6 max-w-sm w-full flex flex-col gap-5 animate-scale-in">
        <div className="flex items-center justify-between">
          <WLabel text={title} bold size="lg" />
          <button
            onClick={onCancel}
            className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-muted-foreground"
            aria-label="Cancelar"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <WLabel text={message} size="sm" muted className="leading-relaxed" />

        <div className="flex flex-col gap-2">
          <WBtn
            label={confirmLabel}
            icon={<Check className="w-5 h-5" />}
            dark
            onClick={() => { onConfirm(); }}
            className="py-4"
          />
          <WBtn
            label={cancelLabel}
            onClick={onCancel}
            className="py-4"
          />
        </div>

        <div className="bg-primary/5 rounded-lg p-3">
          <WLabel text='También puedes responder por voz: "sí" o "no"' size="xs" muted />
        </div>
      </div>
    </div>
  );
};
