import { useEffect, useState } from "react";
import { Check, Package, Truck, ShoppingBag } from "lucide-react";
import { useApp } from "../context/AppContext";
import { useTextToSpeech } from "../hooks/useTextToSpeech";

export const ConfirmationScreen = () => {
  const { state, navigate } = useApp();
  const { speak } = useTextToSpeech(state.accessibility);
  const [showContent, setShowContent] = useState(false);
  const [confetti, setConfetti] = useState<{ id: number; x: number; color: string; delay: number }[]>([]);

  const lastOrder = state.orderHistory[0];

  useEffect(() => {
    const c = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      color: ["#1565C0", "#42A5F5", "#43A047", "#FFC107", "#D32F2F", "#26C6DA"][Math.floor(Math.random() * 6)],
      delay: Math.random() * 2,
    }));
    setConfetti(c);
    setTimeout(() => setShowContent(true), 300);
    if (lastOrder) {
      speak(`Compra confirmada. Número de pedido: ${lastOrder.id}. Total: ${lastOrder.total.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} dólares.`);
    }
  }, []);

  return (
    <div className="flex-1 flex flex-col overflow-hidden bg-gradient-to-b from-secondary/5 to-background">
      {/* Confetti */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-10">
        {confetti.map((c) => (
          <div
            key={c.id}
            className="absolute top-0 w-2.5 h-2.5 rounded-sm"
            style={{
              left: `${c.x}%`,
              backgroundColor: c.color,
              animation: `confetti-fall 3s ease-out ${c.delay}s forwards`,
            }}
          />
        ))}
      </div>

      <div className="flex-1 flex items-center justify-center p-4">
        <div className={`flex flex-col items-center gap-5 text-center transition-all duration-700 ${showContent ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <div className="w-24 h-24 rounded-full bg-secondary flex items-center justify-center animate-bounce-in shadow-lg">
            <Check className="w-12 h-12 text-secondary-foreground" />
          </div>

          <div className="space-y-1">
            <h1 className="text-2xl font-bold text-foreground">¡Compra exitosa!</h1>
            <p className="text-sm text-muted-foreground">Tu pedido ha sido confirmado</p>
          </div>

          {lastOrder && (
            <div className="bg-card rounded-xl border border-border p-4 w-full max-w-xs mx-auto space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Pedido</span>
                <span className="font-bold text-foreground">#{lastOrder.id}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Total</span>
                <span className="font-bold text-lg text-primary">${lastOrder.total.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <Truck className="w-4 h-4 text-muted-foreground" />
                <span className="font-bold text-success">Entrega estimada: 3-5 días hábiles</span>
              </div>
            </div>
          )}

          <div className="flex flex-col gap-3 w-full max-w-xs">
            <button
              onClick={() => navigate("home")}
              className="w-full py-4 rounded-xl bg-primary text-primary-foreground font-bold text-lg hover:bg-primary-hover transition-all active:scale-[0.97] flex items-center justify-center gap-2"
            >
              <ShoppingBag className="w-5 h-5" />
              Seguir comprando
            </button>
            <button
              onClick={() => navigate("history")}
              className="w-full py-4 rounded-xl bg-card border-2 border-border text-foreground font-bold hover:bg-muted transition-all active:scale-[0.97] flex items-center justify-center gap-2"
            >
              <Package className="w-5 h-5" />
              Ver mis pedidos
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
