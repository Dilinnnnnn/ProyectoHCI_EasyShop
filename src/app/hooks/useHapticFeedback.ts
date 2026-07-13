import { useCallback } from "react";
import { AccessibilitySettings } from "../context/AppContext";

const patterns: Record<string, number | number[]> = {
  add: 50,
  remove: [30, 50, 30],
  success: 200,
  error: [50, 30, 50, 30, 50],
  confirm: 100,
};

export function useHapticFeedback(settings: AccessibilitySettings) {
  const vibrate = useCallback(
    (type: "add" | "remove" | "success" | "error" | "confirm") => {
      if (!settings.hapticEnabled) return;
      if (!navigator.vibrate) return;
      navigator.vibrate(patterns[type] || 50);
    },
    [settings.hapticEnabled]
  );

  return { vibrate };
}
