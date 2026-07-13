import { useState, useRef, useEffect, useCallback } from "react";
import { AppProvider, useApp } from "./context/AppContext";
import { FloatingMicButton } from "./components/accessibility/FloatingMicButton";
import { VoiceAssistantOverlay } from "./components/accessibility/VoiceAssistantOverlay";
import { TutorialOverlay } from "./components/accessibility/TutorialOverlay";

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

function ScreenRouter() {
  const { state } = useApp();
  const [voiceActive, setVoiceActive] = useState(false);
  const [voiceAssistantOpen, setVoiceAssistantOpen] = useState(false);
  const [showTutorial, setShowTutorial] = useState(false);
  const voiceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleVoice = useCallback(() => {
    setVoiceActive(true);
    setVoiceAssistantOpen(true);
    if (voiceTimer.current) clearTimeout(voiceTimer.current);
    voiceTimer.current = setTimeout(() => {
      setVoiceActive(false);
    }, 10000);
  }, []);

  const stopVoice = useCallback(() => {
    setVoiceActive(false);
    setVoiceAssistantOpen(false);
    if (voiceTimer.current) clearTimeout(voiceTimer.current);
  }, []);

  useEffect(() => {
    if (state.screen === "home" && !state.accessibility.tutorialSeen && !showTutorial) {
      const timer = setTimeout(() => setShowTutorial(true), 800);
      return () => clearTimeout(timer);
    }
  }, [state.screen, state.accessibility.tutorialSeen]);

  useEffect(() => {
    return () => {
      if (voiceTimer.current) clearTimeout(voiceTimer.current);
    };
  }, []);

  const switchScreen = () => {
    switch (state.screen) {
      case "splash":
        return <SplashScreen />;
      case "home":
        return <HomeScreen voiceActive={voiceActive} onVoice={handleVoice} />;
      case "categories":
        return <CategoriesScreen voiceActive={voiceActive} onVoice={handleVoice} />;
      case "product-list":
        return <ProductListScreen voiceActive={voiceActive} onVoice={handleVoice} />;
      case "product-detail":
        return <ProductDetailScreen />;
      case "cart":
        return <CartScreen />;
      case "payment":
        return <PaymentScreen />;
      case "confirmation":
        return <ConfirmationScreen />;
      case "profile":
        return <ProfileScreen />;
      case "history":
        return <HistoryScreen />;
      case "accessibility":
        return <AccessibilityScreen />;
      default:
        return <HomeScreen voiceActive={voiceActive} onVoice={handleVoice} />;
    }
  };

  const a11y = state.accessibility;

  return (
    <div
      className={`flex flex-col flex-1 min-h-0 textsize-${a11y.textSize} btnsize-${a11y.buttonSize}
        ${a11y.darkMode ? "dark" : ""}
        ${a11y.highContrast ? "high-contrast" : ""}
        ${a11y.oneHandMode ? "one-hand-mode" : ""}`}
    >
      {switchScreen()}

      {a11y.voiceCommands && state.screen !== "splash" && (
        <FloatingMicButton onClick={handleVoice} active={voiceActive} />
      )}

      {voiceAssistantOpen && (
        <VoiceAssistantOverlay onClose={stopVoice} />
      )}

      {showTutorial && (
        <TutorialOverlay onClose={() => setShowTutorial(false)} />
      )}
    </div>
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
        <ScreenRouter />
      </div>
    </AppProvider>
  );
}
