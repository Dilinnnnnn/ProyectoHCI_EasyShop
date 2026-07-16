import { useEffect, useRef } from "react";
import { Mic } from "lucide-react";
import { useApp } from "../../context/AppContext";
import { useVoiceCommands } from "../../hooks/useVoiceCommands";
import { useTextToSpeech } from "../../hooks/useTextToSpeech";

export function BackgroundVoiceListener() {
  const app = useApp();
  const { processCommand } = useVoiceCommands(app);
  const { speak } = useTextToSpeech(app.state.accessibility);
  const processRef = useRef(processCommand);
  const speakRef = useRef(speak);
  processRef.current = processCommand;
  speakRef.current = speak;

  const bgActive = app.state.accessibility.voiceCommands && app.state.screen !== "splash";

  useEffect(() => {
    if (!bgActive) return;

    const SR = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SR) return;

    let recognition: any = null;
    let restartTimer: any = null;

    const start = () => {
      recognition = new SR();
      recognition.lang = "es-ES";
      recognition.continuous = true;
      recognition.interimResults = true;

      recognition.onresult = (event: any) => {
        for (let i = event.resultIndex; i < event.results.length; i++) {
          if (event.results[i].isFinal) {
            const text = event.results[i][0].transcript.toLowerCase().trim();
            if (text.startsWith("compra ") || text === "compra") {
              const cmd = text.replace(/^compra\s*/i, "").trim();
              if (cmd) {
                const response = processRef.current(cmd);
                if (response) speakRef.current(response);
              }
            }
          }
        }
      };

      recognition.onend = () => {
        restartTimer = setTimeout(start, 800);
      };

      recognition.onerror = () => {
        restartTimer = setTimeout(start, 2000);
      };

      try { recognition.start(); } catch {}
    };

    const delay = setTimeout(start, 1500);
    return () => {
      clearTimeout(delay);
      clearTimeout(restartTimer);
      if (recognition) {
        try { recognition.stop(); } catch {}
        try { recognition.abort(); } catch {}
      }
    };
  }, [bgActive]);

  if (!bgActive) return null;

  return (
    <div className="absolute top-1 left-1/2 -translate-x-1/2 z-40 flex items-center gap-2 bg-voice/80 text-voice-foreground px-3 py-1 rounded-full text-[10px] font-bold shadow-lg animate-fade-in pointer-events-none">
      <Mic className="w-3 h-3 animate-voice-pulse" />
      <span>Di <strong>compra</strong> + comando</span>
    </div>
  );
}
