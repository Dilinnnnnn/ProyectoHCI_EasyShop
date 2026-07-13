import { Trash2, Minus, Plus, ShoppingBag } from "lucide-react";
import { useApp } from "../context/AppContext";
import { products } from "../data/products";
import { TopBar } from "../components/layout/TopBar";
import { BottomNav } from "../components/layout/BottomNav";

export const CartScreen = () => {
  const { state, navigate, removeFromCart, updateQty } = useApp();
  const cartItems = state.cartItems;
  const total = cartItems.reduce((sum, i) => sum + i.price * i.qty, 0);

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
              className="px-6 py-3 rounded-xl bg-primary text-primary-foreground font-bold hover:bg-primary-hover transition-all active:scale-[0.97]"
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
                  <div
                    key={item.id}
                    className="bg-card rounded-xl border border-border p-3 flex gap-3 items-center animate-slide-in-right"
                  >
                    <div className="w-20 h-20 rounded-xl bg-muted shrink-0 overflow-hidden">
                      {product?.image ? (
                        <img src={product.image} alt={item.name} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-muted-foreground font-bold">
                          {item.name[0]}
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-sm text-foreground line-clamp-1">{item.name}</h3>
                      <p className="font-bold text-base text-primary mt-0.5">${(item.price * item.qty).toLocaleString("es-CL")}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <button
                          onClick={() => updateQty(item.id, -1)}
                          className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center text-foreground active:bg-muted/70"
                          aria-label="Disminuir cantidad"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="w-8 text-center font-bold text-foreground">{item.qty}</span>
                        <button
                          onClick={() => updateQty(item.id, 1)}
                          className="w-8 h-8 rounded-lg bg-primary text-primary-foreground flex items-center justify-center active:bg-primary-hover"
                          aria-label="Aumentar cantidad"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="ml-auto w-9 h-9 rounded-lg bg-destructive/10 flex items-center justify-center text-destructive active:bg-destructive/20"
                          aria-label="Eliminar producto"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-4 bg-card rounded-xl border border-border p-4 space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="font-bold text-foreground">${total.toLocaleString("es-CL")}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Envío</span>
                <span className="font-bold text-success">Gratis</span>
              </div>
              <div className="border-t border-border pt-3 flex items-center justify-between">
                <span className="font-bold text-lg text-foreground">Total</span>
                <span className="font-bold text-xl text-primary">${total.toLocaleString("es-CL")}</span>
              </div>
              <button
                onClick={() => navigate("payment")}
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
