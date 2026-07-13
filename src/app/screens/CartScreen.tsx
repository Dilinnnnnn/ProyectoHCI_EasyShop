import { Trash2, Minus, Plus, ShoppingBag } from "lucide-react";
import { useApp } from "../context/AppContext";
import { products } from "../data/products";
import { TopBar } from "../components/layout/TopBar";
import { BottomNav } from "../components/layout/BottomNav";
import { useTextToSpeech } from "../hooks/useTextToSpeech";
import { useHapticFeedback } from "../hooks/useHapticFeedback";

export const CartScreen = () => {
  const { state, navigate, removeFromCart, updateQty } = useApp();
  const { speak } = useTextToSpeech(state.accessibility);
  const { vibrate } = useHapticFeedback(state.accessibility);

  const cartItems = state.cartItems;
  const total = cartItems.reduce((sum, i) => sum + i.price * i.qty, 0);

  const doAction = (msg: string, fn: () => void) => {
    if (state.accessibility.ttsEnabled) speak(msg);
    if (state.accessibility.hapticEnabled) vibrate("confirm");
    fn();
  };

  return (
    <div className="flex-1 flex flex-col overflow-hidden bg-background">
      <TopBar title="Carrito" showBack />
      <div className="screen-scroll flex-1 overflow-y-auto p-4">
        {cartItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-4 py-20">
            <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center">
              <ShoppingBag className="w-10 h-10 text-muted-foreground" />
            </div>
            <p className="font-bold text-lg text-foreground">Tu carrito está vacío</p>
            <p className="text-sm text-muted-foreground">Agrega productos para comenzar</p>
            <button
              onClick={() => navigate("home")}
              className="px-8 py-4 rounded-xl bg-primary text-primary-foreground font-bold text-lg hover:bg-primary-hover transition-all active:scale-[0.97]"
            >
              Ir a comprar
            </button>
          </div>
        ) : (
          <>
            <div className="space-y-3">
              {cartItems.map((item) => {
                const product = products.find((p) => p.id === item.id);
                return (
                  <div key={item.id} className="bg-card rounded-2xl border border-border p-4 flex gap-3 items-center animate-slide-in-right shadow-sm">
                    <div className="w-20 h-20 rounded-xl bg-muted shrink-0 overflow-hidden">
                      {product?.image ? (
                        <img src={product.image} alt={item.name} className="w-full h-full object-cover object-center" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-muted-foreground font-bold text-lg">{item.name[0]}</div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-sm text-foreground line-clamp-1">{item.name}</h3>
                      <p className="font-bold text-lg text-primary mt-0.5">${(item.price * item.qty).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <button
                          onClick={() => updateQty(item.id, -1)}
                          className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center text-foreground active:bg-muted/70"
                          aria-label="Disminuir cantidad"
                        >
                          <Minus className="w-5 h-5" />
                        </button>
                        <span className="w-10 text-center font-bold text-lg text-foreground">{item.qty}</span>
                        <button
                          onClick={() => updateQty(item.id, 1)}
                          className="w-10 h-10 rounded-xl bg-primary text-primary-foreground flex items-center justify-center active:bg-primary-hover"
                          aria-label="Aumentar cantidad"
                        >
                          <Plus className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => doAction(`${item.name} eliminado del carrito`, () => removeFromCart(item.id))}
                          className="ml-auto w-10 h-10 rounded-xl bg-destructive/10 flex items-center justify-center text-destructive active:bg-destructive/20"
                          aria-label="Eliminar producto"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-4 bg-card rounded-2xl border border-border p-5 space-y-3 shadow-sm">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Subtotal ({cartItems.length} productos)</span>
                <span className="font-bold text-foreground">${total.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Envío</span>
                <span className="font-bold text-success flex items-center gap-1">
                  <ShoppingBag className="w-4 h-4" />
                  Gratis
                </span>
              </div>
              <div className="border-t border-border pt-3 flex items-center justify-between">
                <span className="font-bold text-lg text-foreground">Total</span>
                <span className="font-bold text-2xl text-primary">${total.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
              </div>
              <button
                onClick={() => doAction(`Total: ${total.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} dólares. Continuar al pago`, () => navigate("payment"))}
                className="w-full py-4 rounded-xl bg-primary text-primary-foreground font-bold text-lg hover:bg-primary-hover transition-all active:scale-[0.97]"
              >
                Continuar al pago
              </button>
            </div>
          </>
        )}
      </div>
      <BottomNav active="cart" />
    </div>
  );
};
