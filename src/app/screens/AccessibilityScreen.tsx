import { Eye, Type, MousePointerClick, Volume2, Vibrate, Hand, Sun, Moon, Mic, Gauge, BookOpen } from "lucide-react";
import { useApp } from "../context/AppContext";
import { TopBar } from "../components/layout/TopBar";
import { Switch } from "../components/ui/switch";
import { useTextToSpeech } from "../hooks/useTextToSpeech";
import { useHapticFeedback } from "../hooks/useHapticFeedback";

const textSizeOptions = [
  { value: "small" as const, label: "S", desc: "Pequeño" },
  { value: "medium" as const, label: "M", desc: "Normal" },
  { value: "large" as const, label: "L", desc: "Grande" },
  { value: "xlarge" as const, label: "XL", desc: "Extra" },
];

const speedOptions = [
  { value: "slow" as const, label: "Lenta" },
  { value: "normal" as const, label: "Normal" },
  { value: "fast" as const, label: "Rápida" },
];

const gestureOptions = [
  { value: "low" as const, label: "Baja" },
  { value: "medium" as const, label: "Media" },
  { value: "high" as const, label: "Alta" },
];

export const AccessibilityScreen = () => {
  const { state, setAccessibility } = useApp();
  const { speak } = useTextToSpeech(state.accessibility);
  const { vibrate } = useHapticFeedback(state.accessibility);
  const a11y = state.accessibility;

  const announce = (msg: string) => {
    if (a11y.ttsEnabled) speak(msg);
    if (a11y.hapticEnabled) vibrate("confirm");
  };

  return (
    <div className="flex-1 flex flex-col overflow-hidden bg-background">
      <TopBar title="Accesibilidad" showBack />
      <div className="screen-scroll flex-1 overflow-y-auto p-4 space-y-4">
        <div className="bg-primary/5 border border-primary/20 rounded-xl p-4 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
            <Eye className="w-5 h-5 text-primary" />
          </div>
          <p className="text-sm text-foreground">Configura la app a tu medida. Todos los cambios se aplican al instante.</p>
        </div>

        {/* Display */}
        <div className="bg-card rounded-xl border border-border overflow-hidden shadow-sm">
          <div className="px-4 pt-3 pb-2 flex items-center gap-2">
            <Sun className="w-4 h-4 text-primary" />
            <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Pantalla</h3>
          </div>
          <div className="px-4 pb-4 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1">
                <Type className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm font-bold text-foreground">Tamaño del texto</span>
              </div>
              <div className="flex gap-1">
                {textSizeOptions.map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => { setAccessibility({ textSize: opt.value }); announce(`Texto ${opt.desc}`); }}
                    className={`w-9 h-9 rounded-lg text-xs font-bold transition-all ${
                      a11y.textSize === opt.value
                        ? "bg-primary text-primary-foreground shadow-sm"
                        : "bg-muted text-muted-foreground hover:bg-muted/70"
                    }`}
                    aria-label={`Texto ${opt.desc}`}
                    aria-pressed={a11y.textSize === opt.value}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1">
                <MousePointerClick className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm font-bold text-foreground">Tamaño de botones</span>
              </div>
              <div className="flex gap-1">
                {[{ value: "normal" as const, label: "Normal" }, { value: "large" as const, label: "Grande" }].map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => { setAccessibility({ buttonSize: opt.value }); announce(`Botones ${opt.label}`); }}
                    className={`w-16 h-9 rounded-lg text-xs font-bold transition-all ${
                      a11y.buttonSize === opt.value
                        ? "bg-primary text-primary-foreground shadow-sm"
                        : "bg-muted text-muted-foreground hover:bg-muted/70"
                    }`}
                    aria-label={`Botones ${opt.label}`}
                    aria-pressed={a11y.buttonSize === opt.value}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Theme */}
        <div className="bg-card rounded-xl border border-border overflow-hidden shadow-sm">
          <div className="px-4 pt-3 pb-2 flex items-center gap-2">
            <Eye className="w-4 h-4 text-primary" />
            <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Tema</h3>
          </div>
          <div className="px-4 pb-4 space-y-3">
            <label className="flex items-center gap-3 cursor-pointer">
              <div className="w-9 h-9 rounded-lg bg-muted flex items-center justify-center shrink-0">
                <Eye className="w-4 h-4 text-muted-foreground" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-bold text-foreground">Alto contraste</p>
                <p className="text-xs text-muted-foreground">Colores de alto contraste para mejor visibilidad</p>
              </div>
              <Switch
                checked={a11y.highContrast}
                onCheckedChange={(v) => { setAccessibility({ highContrast: v }); announce(v ? "Alto contraste activado" : "Alto contraste desactivado"); }}
              />
            </label>

            <label className="flex items-center gap-3 cursor-pointer">
              <div className="w-9 h-9 rounded-lg bg-muted flex items-center justify-center shrink-0">
                <Moon className="w-4 h-4 text-muted-foreground" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-bold text-foreground">Modo oscuro</p>
                <p className="text-xs text-muted-foreground">Tema oscuro para reducir fatiga visual</p>
              </div>
              <Switch
                checked={a11y.darkMode}
                onCheckedChange={(v) => { setAccessibility({ darkMode: v }); announce(v ? "Modo oscuro activado" : "Modo oscuro desactivado"); }}
              />
            </label>
          </div>
        </div>

        {/* Voice & Audio */}
        <div className="bg-card rounded-xl border border-border overflow-hidden shadow-sm">
          <div className="px-4 pt-3 pb-2 flex items-center gap-2">
            <Volume2 className="w-4 h-4 text-voice" />
            <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Voz y audio</h3>
          </div>
          <div className="px-4 pb-4 space-y-3">
            <label className="flex items-center gap-3 cursor-pointer">
              <div className="w-9 h-9 rounded-lg bg-voice/10 flex items-center justify-center shrink-0">
                <Mic className="w-4 h-4 text-voice" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-bold text-foreground">Comandos por voz</p>
                <p className="text-xs text-muted-foreground">Controla la app con tu voz</p>
              </div>
              <Switch
                checked={a11y.voiceCommands}
                onCheckedChange={(v) => { setAccessibility({ voiceCommands: v }); announce(v ? "Comandos por voz activados" : "Comandos por voz desactivados"); }}
              />
            </label>

            <label className="flex items-center gap-3 cursor-pointer">
              <div className="w-9 h-9 rounded-lg bg-voice/10 flex items-center justify-center shrink-0">
                <Volume2 className="w-4 h-4 text-voice" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-bold text-foreground">Lectura por voz</p>
                <p className="text-xs text-muted-foreground">Lee en voz alta el contenido de la pantalla</p>
              </div>
              <Switch
                checked={a11y.ttsEnabled}
                onCheckedChange={(v) => { setAccessibility({ ttsEnabled: v }); if (v) speak("Lectura por voz activada"); }}
              />
            </label>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Gauge className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm font-bold text-foreground">Velocidad de lectura</span>
              </div>
              <div className="flex gap-1">
                {speedOptions.map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => { setAccessibility({ readingSpeed: opt.value }); announce(opt.label); }}
                    className={`px-3 h-9 rounded-lg text-xs font-bold transition-all ${
                      a11y.readingSpeed === opt.value
                        ? "bg-voice text-voice-foreground shadow-sm"
                        : "bg-muted text-muted-foreground hover:bg-muted/70"
                    }`}
                    aria-label={`Velocidad ${opt.label}`}
                    aria-pressed={a11y.readingSpeed === opt.value}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Interaction */}
        <div className="bg-card rounded-xl border border-border overflow-hidden shadow-sm">
          <div className="px-4 pt-3 pb-2 flex items-center gap-2">
            <Hand className="w-4 h-4 text-primary" />
            <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Interacción</h3>
          </div>
          <div className="px-4 pb-4 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Gauge className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm font-bold text-foreground">Sensibilidad de gestos</span>
              </div>
              <div className="flex gap-1">
                {gestureOptions.map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => { setAccessibility({ gestureSensitivity: opt.value }); announce(opt.label); }}
                    className={`px-3 h-9 rounded-lg text-xs font-bold transition-all ${
                      a11y.gestureSensitivity === opt.value
                        ? "bg-primary text-primary-foreground shadow-sm"
                        : "bg-muted text-muted-foreground hover:bg-muted/70"
                    }`}
                    aria-label={`Sensibilidad ${opt.label}`}
                    aria-pressed={a11y.gestureSensitivity === opt.value}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            <label className="flex items-center gap-3 cursor-pointer">
              <div className="w-9 h-9 rounded-lg bg-muted flex items-center justify-center shrink-0">
                <Hand className="w-4 h-4 text-muted-foreground" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-bold text-foreground">Modo una mano</p>
                <p className="text-xs text-muted-foreground">Reorganiza los botones en la parte inferior</p>
              </div>
              <Switch
                checked={a11y.oneHandMode}
                onCheckedChange={(v) => { setAccessibility({ oneHandMode: v }); announce(v ? "Modo una mano activado" : "Modo una mano desactivado"); }}
              />
            </label>

            <label className="flex items-center gap-3 cursor-pointer">
              <div className="w-9 h-9 rounded-lg bg-muted flex items-center justify-center shrink-0">
                <Vibrate className="w-4 h-4 text-muted-foreground" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-bold text-foreground">Vibración háptica</p>
                <p className="text-xs text-muted-foreground">Vibración al realizar acciones importantes</p>
              </div>
              <Switch
                checked={a11y.hapticEnabled}
                onCheckedChange={(v) => { setAccessibility({ hapticEnabled: v }); announce(v ? "Vibración háptica activada" : "Vibración háptica desactivada"); }}
              />
            </label>
          </div>
        </div>

        {/* Tutorial */}
        <button
          onClick={() => { setAccessibility({ tutorialSeen: false }); }}
          className="w-full bg-card rounded-xl border border-border p-4 flex items-center gap-3 active:bg-muted/50 transition-colors"
        >
          <div className="w-9 h-9 rounded-lg bg-muted flex items-center justify-center">
            <BookOpen className="w-4 h-4 text-muted-foreground" />
          </div>
          <div className="flex-1 text-left">
            <p className="text-sm font-bold text-foreground">Ver tutorial</p>
            <p className="text-xs text-muted-foreground">Vuelve a ver la guía de inicio rápido</p>
          </div>
        </button>
      </div>
    </div>
  );
};
