import { useEffect } from "react";
import { Mic, X, MicOff } from "lucide-react";
import { useApp } from "../../context/AppContext";
import { useSpeechRecognition } from "../../hooks/useSpeechRecognition";
import { useVoiceCommands } from "../../hooks/useVoiceCommands";
import { useTextToSpeech } from "../../hooks/useTextToSpeech";

interface VoiceAssistantOverlayProps {
  onClose: () => void;
}

export const VoiceAssistantOverlay = ({ onClose }: VoiceAssistantOverlayProps) => {
  const app = useApp();
  const { status, transcript, interimTranscript, error, isSupported, startListening, stopListening, resetTranscript } = useSpeechRecognition();
  const { processCommand } = useVoiceCommands(app);
  const { speak } = useTextToSpeech(app.state.accessibility);

  useEffect(() => {
    if (isSupported) {
      startListening();
      speak("Di un comando, por ejemplo: buscar zapatillas");
    }
    return () => stopListening();
  }, [isSupported]);

  useEffect(() => {
    if (transcript && status === "processing") {
      const response = processCommand(transcript);
      if (response) {
        speak(response);
        resetTranscript();
        setTimeout(onClose, 2000);
      } else {
        speak("No entendí el comando. Intenta de nuevo.");
        resetTranscript();
      }
    }
  }, [transcript, status]);

  const statusMessage = () => {
    switch (status) {
      case "listening": return "Escuchando...";
      case "processing": return "Procesando...";
      case "error": return "Error";
      default: return "Preparando...";
    }
  };

  const displayText = interimTranscript || transcript || statusMessage();

  return (
    <div className="absolute inset-0 z-50 bg-overlay/70 flex items-center justify-center animate-fade-in">
      <div className="bg-card rounded-2xl p-8 flex flex-col items-center gap-6 mx-4 max-w-sm w-full animate-scale-in relative">
        <button
          onClick={() => { stopListening(); onClose(); }}
          className="absolute top-4 right-4 w-10 h-10 rounded-full bg-muted flex items-center justify-center text-muted-foreground"
          aria-label="Cerrar asistente"
        >
          <X className="w-5 h-5" />
        </button>

        {!isSupported ? (
          <>
            <div className="w-20 h-20 rounded-full bg-destructive/10 flex items-center justify-center">
              <MicOff className="w-10 h-10 text-destructive" />
            </div>
            <p className="text-center font-bold text-lg text-destructive">Voz no disponible</p>
            <p className="text-center text-sm text-muted-foreground">
              Tu navegador no soporta reconocimiento de voz. Usa Chrome o Edge de escritorio.
            </p>
            <button
              onClick={onClose}
              className="w-full py-3 rounded-xl bg-primary text-primary-foreground font-bold"
            >
              Entendido
            </button>
          </>
        ) : (
          <>
            <div className="flex items-center gap-1 h-16">
              {[1, 2, 3, 4, 5, 6, 7].map((bar) => (
                <div
                  key={bar}
                  className="w-2 bg-voice rounded-full transition-all"
                  style={{
                    height: status === "listening" ? `${16 + Math.random() * 36}px` : "8px",
                    animation: status === "listening"
                      ? `voice-wave 0.${3 + bar}s ease-in-out infinite`
                      : "none",
                  }}
                />
              ))}
            </div>

            <div className="flex flex-col items-center gap-2 w-full">
              <div className="flex items-center gap-2">
                <div className={`w-3 h-3 rounded-full ${status === "listening" ? "bg-voice animate-voice-pulse" : status === "processing" ? "bg-primary" : status === "error" ? "bg-destructive" : "bg-muted-foreground"}`} />
                <p className="font-bold text-lg text-foreground">{statusMessage()}</p>
              </div>
              {displayText && (
                <div className="bg-voice/10 border border-voice/20 rounded-xl px-4 py-3 w-full text-center">
                  <p className="text-sm text-voice font-medium">{displayText}</p>
                </div>
              )}
            </div>

            {error && (
              <div className="bg-destructive/10 border border-destructive/20 rounded-xl px-4 py-3 w-full">
                <p className="text-sm text-destructive text-center">{error}</p>
              </div>
            )}

            <p className="text-xs text-muted-foreground text-center">
              Di: "Buscar zapatillas" · "Abrir carrito" · "Volver al inicio"
            </p>
          </>
        )}
      </div>
    </div>
  );
};
