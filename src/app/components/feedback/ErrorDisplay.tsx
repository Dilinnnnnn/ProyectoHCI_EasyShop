import { AlertTriangle, RefreshCw } from "lucide-react";
import { WLabel } from "../wireframe/WLabel";
import { WBtn } from "../wireframe/WBtn";
import { useEffect } from "react";
import { useTextToSpeech } from "../../hooks/useTextToSpeech";
import { useApp } from "../../context/AppContext";

interface ErrorDisplayProps {
  title: string;
  message: string;
  solution: string;
  onRetry?: () => void;
}

export const ErrorDisplay = ({ title, message, solution, onRetry }: ErrorDisplayProps) => {
  const { state } = useApp();
  const { speak } = useTextToSpeech(state.accessibility);

  useEffect(() => {
    speak(`${title}. ${message}. ${solution}`);
  }, []);

  return (
    <div className="flex flex-col items-center gap-4 p-6 bg-destructive/5 border border-destructive/20 rounded-xl animate-scale-in">
      <div className="w-16 h-16 rounded-full bg-destructive/10 flex items-center justify-center">
        <AlertTriangle className="w-8 h-8 text-destructive" />
      </div>
      <div className="flex flex-col items-center gap-1 text-center">
        <WLabel text={title} bold size="lg" className="text-destructive" />
        <WLabel text={message} size="sm" muted />
        <WLabel text={solution} size="sm" className="text-primary mt-1" />
      </div>
      {onRetry && (
        <WBtn
          label="Reintentar"
          icon={<RefreshCw className="w-5 h-5" />}
          dark
          onClick={onRetry}
          className="w-full"
        />
      )}
    </div>
  );
};
