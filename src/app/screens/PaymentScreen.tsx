import { useState } from "react";
import { CreditCard, Banknote, Landmark, MapPin, Check } from "lucide-react";
import { useApp } from "../context/AppContext";
import { TopBar } from "../components/layout/TopBar";
import { useTextToSpeech } from "../hooks/useTextToSpeech";
import { useHapticFeedback } from "../hooks/useHapticFeedback";

export const PaymentScreen = () => {
  const { state, navigate, addOrder, setPaymentMethod, setPaymentStep } = useApp();
  const { speak } = useTextToSpeech(state.accessibility);
  const { vibrate } = useHapticFeedback(state.accessibility);
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);

  const step = state.paymentStep;
  const method = state.paymentMethod;

  const cartItems = state.cartItems;
  const total = cartItems.reduce((sum, i) => sum + i.price * i.qty, 0);
  const steps = ["Método", "Dirección", "Resumen"];

  const doAction = (msg: string, fn: () => void) => {
    if (state.accessibility.ttsEnabled) speak(msg);
    if (state.accessibility.hapticEnabled) vibrate("confirm");
    fn();
  };

  const handleConfirm = () => {
    setLoading(true);
    const msg = `Procesando pago por ${total.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} dólares`;
    if (state.accessibility.ttsEnabled) speak(msg);
    setTimeout(() => {
      const order = {
        id: `E${Date.now().toString(36).toUpperCase()}`,
        items: cartItems.map((i) => ({ id: i.id, name: i.name, price: i.price, qty: i.qty })),
        total,
        date: new Date().toISOString(),
        status: "Procesando" as const,
      };
      addOrder(order);
      setPaymentStep(0);
      setPaymentMethod("card");
      if (state.accessibility.hapticEnabled) vibrate("success");
      navigate("confirmation");
    }, 1500);
  };

  const renderStep = () => {
    switch (step) {
      case 0:
        return (
          <div className="space-y-3">
            <h2 className="font-bold text-lg text-foreground mb-3">Método de pago</h2>
            {([
              { id: "card" as const, icon: CreditCard, label: "Tarjeta", desc: "Visa, Mastercard, American Express" },
              { id: "cash" as const, icon: Banknote, label: "Efectivo", desc: "Paga al recibir" },
              { id: "transfer" as const, icon: Landmark, label: "Transferencia", desc: "Banco Estado, Santander, Chile" },
            ]).map((opt) => (
              <button
                key={opt.id}
                onClick={() => setPaymentMethod(opt.id)}
                className={`w-full flex items-center gap-4 p-4 rounded-xl border-2 text-left transition-all ${
                  method === opt.id ? "border-primary bg-primary/5" : "border-border bg-card hover:border-muted-foreground/30"
                }`}
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${method === opt.id ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}>
                  <opt.icon className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <p className="font-bold text-foreground">{opt.label}</p>
                  <p className="text-sm text-muted-foreground">{opt.desc}</p>
                </div>
                {method === opt.id && <Check className="w-6 h-6 text-primary shrink-0" />}
              </button>
            ))}
          </div>
        );
      case 1:
        return (
          <div className="space-y-3">
            <h2 className="font-bold text-lg text-foreground mb-3">Dirección de envío</h2>
            <div className="bg-card rounded-xl border border-border p-4 flex items-center gap-3">
              <MapPin className="w-6 h-6 text-primary shrink-0" />
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Ingresa tu dirección"
                className="flex-1 bg-transparent outline-none text-foreground placeholder:text-muted-foreground py-2"
              />
            </div>
            <p className="text-xs text-muted-foreground">Ej: Av. Providencia 1234, Santiago</p>
          </div>
        );
      case 2:
        return (
          <div className="space-y-3">
            <h2 className="font-bold text-lg text-foreground mb-3">Resumen del pedido</h2>
            <div className="bg-card rounded-2xl border border-border p-5 space-y-3 shadow-sm">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Productos ({cartItems.length})</span>
                <span className="font-bold text-foreground">${total.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Envío</span>
                <span className="font-bold text-success">Gratis</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Método</span>
                <span className="font-bold text-foreground capitalize">{method === "card" ? "Tarjeta" : method === "cash" ? "Efectivo" : "Transferencia"}</span>
              </div>
              {address && (
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Dirección</span>
                  <span className="font-bold text-foreground text-right max-w-[200px] truncate">{address}</span>
                </div>
              )}
              <div className="border-t border-border pt-3 flex items-center justify-between">
                <span className="font-bold text-lg text-foreground">Total a pagar</span>
                <span className="font-bold text-2xl text-primary">${total.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="flex-1 flex flex-col overflow-hidden bg-background">
      <TopBar title="Pago" showBack />
      <div className="screen-scroll flex-1 overflow-y-auto p-4 space-y-4">
        {/* Stepper */}
        <div className="flex items-center justify-center gap-1">
          {steps.map((s, i) => (
            <div key={s} className="flex items-center">
              <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold ${
                i <= step ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
              }`}>
                {i < step && <Check className="w-3 h-3" />}
                {s}
              </div>
              {i < steps.length - 1 && <div className={`w-6 h-0.5 ${i < step ? "bg-primary" : "bg-muted"}`} />}
            </div>
          ))}
        </div>

        {renderStep()}

        <div className="flex gap-2 pt-2">
          {step > 0 && (
            <button
              onClick={() => setPaymentStep(step - 1)}
              className="flex-1 py-4 rounded-xl bg-card border-2 border-border text-foreground font-bold hover:bg-muted transition-all active:scale-[0.97]"
            >
              Atrás
            </button>
          )}
          <button
            onClick={() => step < 2 ? doAction(`Paso siguiente: ${steps[step + 1]}`, () => setPaymentStep(step + 1)) : handleConfirm()}
            disabled={loading || (step === 1 && !address.trim())}
            className="flex-1 py-4 rounded-xl bg-primary text-primary-foreground font-bold text-lg hover:bg-primary-hover transition-all active:scale-[0.97] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Procesando..." : step < 2 ? "Siguiente" : "Confirmar compra"}
          </button>
        </div>
      </div>
    </div>
  );
};
