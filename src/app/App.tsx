import { useState, useRef, useEffect, useCallback } from "react";
import { AppProvider, useApp } from "./context/AppContext";
import { useSpeechRecognition } from "./hooks/useSpeechRecognition";
import { FloatingMicButton } from "./components/accessibility/FloatingMicButton";
import { VoiceAssistantOverlay } from "./components/accessibility/VoiceAssistantOverlay";
import { TutorialOverlay } from "./components/accessibility/TutorialOverlay";
import { AccessibilityIndicator } from "./components/accessibility/AccessibilityIndicator";

import { SplashScreen } from "./screens/SplashScreen";
import { HomeScreen } from "./screens/HomeScreen";
import { CategoriesScreen } from "./screens/CategoriesScreen";
import { ProductListScreen } from "./screens/ProductListScreen";
import { ProductDetailScreen } from "./screens/ProductDetailScreen";
import { CartScreen } from "./screens/CartScreen";
import { PaymentScreen } from "./screens/PaymentScreen";
import { ConfirmationScreen } from "./screens/ConfirmationScreen";
import { ProfileScreen } from "./screens/ProfileScreen";
import { HistoryScreen } from "./screens/HistoryScreen";
import { AccessibilityScreen } from "./screens/AccessibilityScreen";

function AppContent() {
  const app = useApp();

  // ─── Single shared speech recognition instance ─────────────
  const {
    status, transcript, interimTranscript, error,
    isSupported, startListening, stopListening, resetTranscript,
  } = useSpeechRecognition();

  const [voiceActive, setVoiceActive] = useState(false);
  const [voiceAssistantOpen, setVoiceAssistantOpen] = useState(false);
  const [showTutorial, setShowTutorial] = useState(false);
  const voiceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // ─── Start continuous listening after first mic press ──────
  const handleVoice = useCallback(() => {
    if (isSupported && status === "idle") {
      resetTranscript();
      startListening();
    }
    resetTranscript();
    setVoiceAssistantOpen(true);
    setVoiceActive(true);
    if (voiceTimer.current) clearTimeout(voiceTimer.current);
    voiceTimer.current = setTimeout(() => setVoiceActive(false), 10000);
  }, [isSupported, status, startListening, resetTranscript]);

  const stopVoice = useCallback(() => {
    setVoiceAssistantOpen(false);
    setVoiceActive(false);
    if (voiceTimer.current) clearTimeout(voiceTimer.current);
  }, []);

  // ─── Wake word "hola" detection ────────────────────────────
  useEffect(() => {
    if (!transcript || status !== "processing") return;
    if (voiceAssistantOpen) return;

    const text = transcript.toLowerCase().trim();

    if (text.startsWith("hola ") || text === "hola") {
      resetTranscript();
      wakeRef.current = true;
      setVoiceAssistantOpen(true);
      setVoiceActive(true);
      if (voiceTimer.current) clearTimeout(voiceTimer.current);
      voiceTimer.current = setTimeout(() => setVoiceActive(false), 10000);
    }
  }, [transcript, status, voiceAssistantOpen]);

  // ─── Keep recognition alive in background ──────────────────
  useEffect(() => {
    if (!isSupported) return;
    // Start after splash
    if (app.state.screen !== "splash" && status === "idle") {
      const timer = setTimeout(() => startListening(), 1000);
      return () => clearTimeout(timer);
    }
  }, [isSupported, app.state.screen, status, startListening]);

  // ─── Tutorial ──────────────────────────────────────────────
  useEffect(() => {
    if (app.state.screen === "home" && !app.state.accessibility.tutorialSeen && !showTutorial) {
      const timer = setTimeout(() => setShowTutorial(true), 800);
      return () => clearTimeout(timer);
    }
  }, [app.state.screen, app.state.accessibility.tutorialSeen, showTutorial]);

  useEffect(() => {
    return () => {
      if (voiceTimer.current) clearTimeout(voiceTimer.current);
    };
  }, []);

  const switchScreen = () => {
    switch (app.state.screen) {
      case "splash": return <SplashScreen />;
      case "home": return <HomeScreen voiceActive={voiceActive} onVoice={handleVoice} />;
      case "categories": return <CategoriesScreen voiceActive={voiceActive} onVoice={handleVoice} />;
      case "product-list": return <ProductListScreen voiceActive={voiceActive} onVoice={handleVoice} />;
      case "product-detail": return <ProductDetailScreen />;
      case "cart": return <CartScreen />;
      case "payment": return <PaymentScreen />;
      case "confirmation": return <ConfirmationScreen />;
      case "profile": return <ProfileScreen />;
      case "history": return <HistoryScreen />;
      case "accessibility": return <AccessibilityScreen />;
      default: return <HomeScreen voiceActive={voiceActive} onVoice={handleVoice} />;
    }
  };

  const a11y = app.state.accessibility;
  const showIndicator = app.state.screen !== "splash" && (
    a11y.voiceCommands || a11y.ttsEnabled || a11y.oneHandMode ||
    a11y.buttonSize === "large" || a11y.highContrast || a11y.darkMode
  );

  return (
    <>
      <div
        className={`flex flex-col flex-1 min-h-0 textsize-${a11y.textSize} btnsize-${a11y.buttonSize}
          ${a11y.darkMode ? "dark" : ""}
          ${a11y.highContrast ? "high-contrast" : ""}
          ${a11y.oneHandMode ? "one-hand-mode" : ""}`}
      >
        {showIndicator && <AccessibilityIndicator />}

        {switchScreen()}

        {voiceAssistantOpen && (
          <VoiceAssistantOverlay
            onClose={stopVoice}
            transcript={transcript}
            interimTranscript={interimTranscript}
            status={status}
            isSupported={isSupported}
          />
        )}

        {showTutorial && (
          <TutorialOverlay onClose={() => setShowTutorial(false)} />
        )}
      </div>

      {a11y.voiceCommands && app.state.screen !== "splash" && (
        <FloatingMicButton onClick={handleVoice} active={voiceActive} />
      )}
    </>
  );
}

export default function App() {
  return (
    <AppProvider>
      <div
        className="relative flex flex-col bg-background h-screen overflow-hidden
          w-full max-w-lg mx-auto
          md:my-4 md:h-[calc(100vh-2rem)] md:rounded-2xl md:shadow-2xl md:border md:border-border"
        style={{ fontFamily: "'Nunito', 'Nunito Sans', system-ui, sans-serif" }}
      >
        <AppContent />
      </div>
    </AppProvider>
  );
}
