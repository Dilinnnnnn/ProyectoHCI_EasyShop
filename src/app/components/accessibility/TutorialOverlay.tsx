import { useState } from "react";
import { X, ChevronRight, ChevronLeft, Search, Mic, ShoppingCart, CreditCard, Accessibility } from "lucide-react";
import { useApp } from "../../context/AppContext";
import { WLabel } from "../wireframe/WLabel";
import { WBtn } from "../wireframe/WBtn";
import { useTextToSpeech } from "../../hooks/useTextToSpeech";

interface TutorialOverlayProps {
  onClose: () => void;
}

const steps = [
  {
    icon: Search,
    title: "Buscar productos",
    description: "Usa la barra de búsqueda o pide por voz: \"Buscar zapatillas\". Encuentra lo que necesitas sin escribir.",
    bgClass: "bg-primary/10",
    textClass: "text-primary",
  },
  {
    icon: Mic,
    title: "Usar el micrófono",
    description: "Toca el botón del micrófono y habla. Puedes navegar, buscar y comprar solo con tu voz.",
    bgClass: "bg-accent/10",
    textClass: "text-accent",
  },
  {
    icon: ShoppingCart,
    title: "Agregar productos",
    description: "Toca \"Agregar al carrito\" o di \"Agregar al carrito\". Los botones son grandes para facilitar el acceso.",
    bgClass: "bg-secondary/10",
    textClass: "text-secondary",
  },
  {
    icon: CreditCard,
    title: "Comprar",
    description: "Continúa al pago y confirma con un toque o con tu voz. La app te guía paso a paso.",
    bgClass: "bg-warning/10",
    textClass: "text-warning",
  },
  {
    icon: Accessibility,
    title: "Funciones de accesibilidad",
    description: "Desde Perfil > Accesibilidad, configura texto grande, alto contraste, modo oscuro y más.",
    bgClass: "bg-destructive/10",
    textClass: "text-destructive",
  },
];

export const TutorialOverlay = ({ onClose }: TutorialOverlayProps) => {
  const [step, setStep] = useState(0);
  const { state, setAccessibility } = useApp();
  const { speak } = useTextToSpeech(state.accessibility);

  const currentStep = steps[step];

  const handleNext = () => {
    if (step < steps.length - 1) {
      setStep(step + 1);
      speak(steps[step + 1].description);
    } else {
      setAccessibility({ tutorialSeen: true });
      onClose();
    }
  };

  const handleSkip = () => {
    setAccessibility({ tutorialSeen: true });
    onClose();
  };

  return (
    <div className="absolute inset-0 z-50 bg-foreground/90 flex items-center justify-center p-4 animate-fade-in">
      <div className="bg-card rounded-2xl max-w-sm w-full flex flex-col overflow-hidden animate-scale-in">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          <WLabel text={`Paso ${step + 1} de ${steps.length}`} bold size="sm" muted />
          <button
            onClick={handleSkip}
            className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-muted-foreground"
            aria-label="Cerrar tutorial"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="flex flex-col items-center gap-5 p-6">
          <div
            className={`w-20 h-20 rounded-2xl flex items-center justify-center ${currentStep.bgClass}`}
          >
            <currentStep.icon className={`w-10 h-10 ${currentStep.textClass}`} />
          </div>
          <div className="flex flex-col items-center gap-2 text-center">
            <WLabel text={currentStep.title} bold size="xl" />
            <WLabel text={currentStep.description} size="sm" muted className="leading-relaxed" />
          </div>
        </div>

        {/* Progress dots */}
        <div className="flex justify-center gap-2 pb-4">
          {steps.map((_, i) => (
            <div
              key={i}
              className={`h-2 rounded-full transition-all ${
                i === step ? "w-8 bg-primary" : "w-2 bg-muted"
              }`}
            />
          ))}
        </div>

        {/* Actions */}
        <div className="flex gap-2 p-4 border-t border-border">
          {step > 0 && (
            <button
              onClick={() => setStep(step - 1)}
              className="flex items-center justify-center gap-1 px-4 py-3 rounded-xl border border-border text-muted-foreground font-bold text-sm active:bg-muted transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
              Atrás
            </button>
          )}
          <WBtn
            label={step === steps.length - 1 ? "¡Empezar!" : "Siguiente"}
            icon={step === steps.length - 1 ? undefined : <ChevronRight className="w-5 h-5" />}
            dark
            onClick={handleNext}
            className="flex-1 py-3"
          />
        </div>

        <button
          onClick={handleSkip}
          className="text-center pb-4 text-sm text-muted-foreground font-bold active:text-foreground transition-colors"
        >
          Omitir tutorial
        </button>
      </div>
    </div>
  );
};
