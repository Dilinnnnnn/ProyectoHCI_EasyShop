import { useState } from "react";
import { X, ChevronRight, ChevronLeft, Mic, Hand, ShoppingCart, Accessibility, Settings } from "lucide-react";
import { useApp } from "../../context/AppContext";
import { WLabel } from "../wireframe/WLabel";
import { WBtn } from "../wireframe/WBtn";
import { useTextToSpeech } from "../../hooks/useTextToSpeech";
import { useHapticFeedback } from "../../hooks/useHapticFeedback";

interface TutorialOverlayProps {
  onClose: () => void;
}

const steps = [
  {
    icon: Mic,
    title: "Compra con tu voz",
    description: "Toca el botón turquesa \"Buscar por voz\" en cualquier pantalla y di lo que necesitas. Por ejemplo: \"Buscar zapatillas\", \"Agregar al carrito\" o \"Comprar ahora\". No necesitas escribir nada.",
    bgClass: "bg-voice/10",
    textClass: "text-voice",
  },
  {
    icon: Hand,
    title: "Navega con un solo toque",
    description: "Todos los botones son grandes y fáciles de pulsar. Usa el menú inferior para ir a Inicio, Categorías, Carrito, Pedidos o Perfil. Con un solo dedo puedes comprar todo.",
    bgClass: "bg-secondary/10",
    textClass: "text-secondary",
  },
  {
    icon: Settings,
    title: "Activa el modo una mano",
    description: "En Accesibilidad, activa \"Modo una mano\" para mover los controles a la parte inferior de la pantalla. Todo queda al alcance de tu pulgar. También puedes hacerlo desde el acceso rápido en Inicio.",
    bgClass: "bg-primary/10",
    textClass: "text-primary",
  },
  {
    icon: Accessibility,
    title: "Todas las funciones de accesibilidad",
    description: "Desde Perfil > Accesibilidad puedes: agrandar texto y botones, activar alto contraste, modo oscuro, comandos por voz, lectura en voz alta, vibración háptica y más. Todo se ajusta al instante.",
    bgClass: "bg-accent/10",
    textClass: "text-accent",
  },
  {
    icon: ShoppingCart,
    title: "¡Listo para comprar!",
    description: "Ya conoces lo básico. Recuerda: puedes usar la voz para todo, navegar con un solo toque y ajustar la app a tus necesidades. EasyShop está diseñada para ti.",
    bgClass: "bg-favorite/15",
    textClass: "text-favorite",
  },
];

export const TutorialOverlay = ({ onClose }: TutorialOverlayProps) => {
  const [step, setStep] = useState(0);
  const { state, setAccessibility } = useApp();
  const { speak } = useTextToSpeech(state.accessibility);
  const { vibrate } = useHapticFeedback(state.accessibility);

  const currentStep = steps[step];

  const handleNext = () => {
    if (step < steps.length - 1) {
      setStep(step + 1);
      speak(steps[step + 1].description);
      if (state.accessibility.hapticEnabled) vibrate("confirm");
    } else {
      setAccessibility({ tutorialSeen: true });
      if (state.accessibility.hapticEnabled) vibrate("success");
      onClose();
    }
  };

  const handleSkip = () => {
    setAccessibility({ tutorialSeen: true });
    onClose();
  };

  return (
    <div className="absolute inset-0 z-50 bg-overlay/90 flex items-center justify-center p-4 animate-fade-in">
      <div className="bg-card rounded-2xl max-w-sm w-full flex flex-col overflow-hidden animate-scale-in shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          <WLabel text={`Paso ${step + 1} de ${steps.length}`} bold size="sm" muted />
          <button
            onClick={handleSkip}
            className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-muted-foreground"
            aria-label="Cerrar tutorial"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex flex-col items-center gap-5 p-6">
          <div
            className={`w-24 h-24 rounded-2xl flex items-center justify-center ${currentStep.bgClass}`}
          >
            <currentStep.icon className={`w-12 h-12 ${currentStep.textClass}`} />
          </div>
          <div className="flex flex-col items-center gap-3 text-center">
            <WLabel text={currentStep.title} bold size="xl" />
            <WLabel text={currentStep.description} size="sm" muted className="leading-relaxed" />
          </div>
        </div>

        {/* Progress dots */}
        <div className="flex justify-center gap-2 pb-4">
          {steps.map((_, i) => (
            <div
              key={i}
              className={`h-2 rounded-full transition-all ${i === step ? "w-8 bg-primary" : "w-2 bg-muted"}`}
            />
          ))}
        </div>

        {/* Actions */}
        <div className="flex gap-2 p-4 border-t border-border">
          {step > 0 && (
            <button
              onClick={() => setStep(step - 1)}
              className="flex items-center justify-center gap-1 px-4 py-4 rounded-xl border border-border text-muted-foreground font-bold text-sm active:bg-muted transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
              Atrás
            </button>
          )}
          <WBtn
            label={step === steps.length - 1 ? "¡Comenzar!" : "Siguiente"}
            icon={step === steps.length - 1 ? undefined : <ChevronRight className="w-5 h-5" />}
            dark
            onClick={handleNext}
            className="flex-1 py-4"
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
