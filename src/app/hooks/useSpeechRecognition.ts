import { useState, useCallback, useRef, useEffect } from "react";

export type VoiceStatus = "idle" | "listening" | "processing" | "error";

interface SpeechRecognitionResult {
  transcript: string;
  isFinal: boolean;
}

export function useSpeechRecognition() {
  const [status, setStatus] = useState<VoiceStatus>("idle");
  const [transcript, setTranscript] = useState("");
  const [interimTranscript, setInterimTranscript] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSupported, setIsSupported] = useState(false);
  const recognitionRef = useRef<any>(null);
  const restartTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const keepAliveRef = useRef(true);


  useEffect(() => {
    const SR =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    setIsSupported(!!SR);
  }, []);

  useEffect(() => {
    return () => {
      if (restartTimeoutRef.current) clearTimeout(restartTimeoutRef.current);
      if (recognitionRef.current) {
        try { recognitionRef.current.abort(); } catch {}
      }
    };
  }, []);

  const startListening = useCallback(() => {
    setError(null);
    setTranscript("");
    setInterimTranscript("");

    const SR =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SR) {
      setError("Tu navegador no soporta reconocimiento de voz. Usa Chrome o Edge.");
      setStatus("error");
      return;
    }

    try {
      keepAliveRef.current = true;
      const recognition = new SR();
      recognition.lang = "es-ES";
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.maxAlternatives = 3;

      recognition.onstart = () => setStatus("listening");

      recognition.onresult = (event: any) => {
        let finalText = "";
        let interimText = "";

        for (let i = event.resultIndex; i < event.results.length; i++) {
          const result = event.results[i];
          if (result.isFinal) {
            finalText += result[0].transcript;
          } else {
            interimText += result[0].transcript;
          }
        }

        if (finalText) {
          setTranscript((prev) => prev + finalText);
          setStatus("processing");
        }
        setInterimTranscript(interimText);
      };

      recognition.onerror = (event: any) => {
        const map: Record<string, string> = {
          "no-speech": "No se detectó audio. Habla por el micrófono.",
          "audio-capture": "No se detectó micrófono. Conecta uno o verifica los permisos.",
          "not-allowed": "Permiso de micrófono denegado. Actívalo en la configuración del navegador.",
          "network": "Error de red. Verifica tu conexión a internet.",
          "aborted": "",
        };
        const msg = map[event.error];
        if (msg) {
          setError(msg);
          setStatus("error");
        }
      };

      recognition.onend = () => {
        if (keepAliveRef.current) {
          restartTimeoutRef.current = setTimeout(() => {
            try { recognition.start(); } catch {}
          }, 100);
        }
      };

      recognitionRef.current = recognition;
      recognition.start();
    } catch {
      setError("Error al iniciar el reconocimiento de voz.");
      setStatus("error");
    }
  }, []);

  const stopListening = useCallback(() => {
    if (restartTimeoutRef.current) {
      clearTimeout(restartTimeoutRef.current);
      restartTimeoutRef.current = null;
    }
    if (recognitionRef.current) {
      keepAliveRef.current = false;
      try { recognitionRef.current.stop(); } catch {}
      try { recognitionRef.current.abort(); } catch {}
      recognitionRef.current = null;
    }
    setStatus("idle");
  }, []);

  const resetTranscript = useCallback(() => {
    setTranscript("");
    setInterimTranscript("");
    setError(null);
  }, []);

  return {
    status,
    transcript,
    interimTranscript,
    error,
    isSupported,
    startListening,
    stopListening,
    resetTranscript,
  };
}
