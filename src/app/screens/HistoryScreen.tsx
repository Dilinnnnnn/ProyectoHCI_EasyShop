import { Package, RefreshCw, Truck, Clock, Check } from "lucide-react";
import { useApp } from "../context/AppContext";
import { products } from "../data/products";
import { TopBar } from "../components/layout/TopBar";
import { BottomNav } from "../components/layout/BottomNav";

const statusConfig = {
  "Entregado": { icon: Check, color: "text-success", bg: "bg-success/10" },
  "En camino": { icon: Truck, color: "text-primary", bg: "bg-primary/10" },
  "Procesando": { icon: Clock, color: "text-warning", bg: "bg-warning/10" },
};

export const HistoryScreen = () => {
  const { state, navigate, addToCart } = useApp();
  const orders = state.orderHistory;

  return (
    <div className="flex-1 flex flex-col overflow-hidden bg-background">
      <TopBar title="Mis pedidos" showBack />
      <div className="screen-scroll flex-1 overflow-y-auto p-4">
        {orders.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-4 py-20">
            <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center">
              <Package className="w-10 h-10 text-muted-foreground" />
            </div>
            <p className="font-bold text-lg text-foreground">No tienes pedidos</p>
            <p className="text-sm text-muted-foreground text-center">Realiza tu primera compra para verla aquí</p>
            <button
              onClick={() => navigate("home")}
              className="px-6 py-3 rounded-xl bg-primary text-primary-foreground font-bold hover:bg-primary-hover transition-all active:scale-[0.97]"
            >
              Comprar ahora
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            {orders.map((order) => {
              const config = statusConfig[order.status];
              const StatusIcon = config.icon;
              return (
                <div key={order.id} className="bg-card rounded-xl border border-border overflow-hidden shadow-sm">
                  <div className="p-4 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-foreground">#{order.id}</span>
                      <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold ${config.bg} ${config.color}`}>
                        <StatusIcon className="w-3.5 h-3.5" />
                        {order.status}
                      </div>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {new Date(order.date).toLocaleDateString("es-CL", { day: "numeric", month: "long", year: "numeric" })}
                    </div>
                    <div className="space-y-1.5">
                      {order.items.slice(0, 3).map((item) => (
                        <div key={item.id} className="flex items-center gap-2 text-sm">
                          <div className="w-8 h-8 rounded-lg bg-muted overflow-hidden shrink-0">
                            {(() => {
                              const p = products.find((pr) => pr.id === item.id);
                              return p?.image ? (
                                <img src={p.image} alt={item.name} className="w-full h-full object-cover" />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center text-xs font-bold text-muted-foreground">{item.name[0]}</div>
                              );
                            })()}
                          </div>
                          <span className="flex-1 text-muted-foreground truncate">{item.name} x{item.qty}</span>
                          <span className="font-bold text-foreground">${(item.price * item.qty).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                        </div>
                      ))}
                      {order.items.length > 3 && (
                        <p className="text-xs text-muted-foreground">+{order.items.length - 3} productos más</p>
                      )}
                    </div>
                    <div className="flex items-center justify-between pt-2 border-t border-border">
                      <span className="font-bold text-foreground">Total</span>
                      <span className="font-bold text-lg text-primary">${order.total.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      order.items.forEach((item) => {
                        const p = products.find((pr) => pr.id === item.id);
                        if (p) addToCart(p, item.qty);
                      });
                      navigate("cart");
                    }}
                    className="w-full py-3 bg-primary/5 text-primary font-bold text-sm flex items-center justify-center gap-2 hover:bg-primary/10 transition-colors active:bg-primary/15"
                  >
                    <RefreshCw className="w-4 h-4" />
                    Comprar de nuevo
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>
      <BottomNav active="history" />
    </div>
  );
};
