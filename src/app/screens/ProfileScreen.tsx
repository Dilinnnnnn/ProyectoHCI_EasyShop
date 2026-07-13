import { MapPin, CreditCard, Bell, Mic, Accessibility, HelpCircle, LogOut, BookOpen, Heart, ShoppingBag, User, ChevronRight } from "lucide-react";
import { useApp } from "../context/AppContext";
import { TopBar } from "../components/layout/TopBar";
import { BottomNav } from "../components/layout/BottomNav";

export const ProfileScreen = () => {
  const { navigate, state } = useApp();

  const sections = [
    {
      title: "Mis compras",
      items: [
        { icon: ShoppingBag, label: "Mis pedidos", action: () => navigate("history") },
        { icon: Heart, label: "Favoritos", badge: state.favorites.length, action: () => navigate("home") },
      ],
    },
    {
      title: "Configuración",
      items: [
        { icon: MapPin, label: "Direcciones" },
        { icon: CreditCard, label: "Métodos de pago" },
        { icon: Bell, label: "Notificaciones" },
        { icon: Mic, label: "Comandos de voz" },
      ],
    },
    {
      title: "Otros",
      items: [
        { icon: Accessibility, label: "Accesibilidad", action: () => navigate("accessibility") },
        { icon: BookOpen, label: "Tutorial" },
        { icon: HelpCircle, label: "Ayuda" },
      ],
    },
  ];

  return (
    <div className="flex-1 flex flex-col overflow-hidden bg-background">
      <TopBar title="Perfil" />
      <div className="screen-scroll flex-1 overflow-y-auto">
        {/* Avatar Section */}
        <div className="bg-gradient-to-b from-primary to-primary/80 text-primary-foreground px-5 py-8 flex flex-col items-center gap-3">
          <div className="w-20 h-20 rounded-full bg-primary-foreground/20 flex items-center justify-center border-4 border-primary-foreground/30">
            <User className="w-10 h-10" />
          </div>
          <div className="text-center">
            <h2 className="font-bold text-xl">Usuario</h2>
            <p className="text-sm opacity-80">usuario@email.com</p>
          </div>
        </div>

        <div className="px-4 pb-4 space-y-4 -mt-2">
          {/* Stats */}
          <div className="bg-card rounded-xl border border-border p-4 grid grid-cols-3 gap-3 text-center shadow-sm">
            <div>
              <p className="font-bold text-xl text-primary">{state.orderHistory.length}</p>
              <p className="text-xs text-muted-foreground font-medium">Pedidos</p>
            </div>
            <div>
              <p className="font-bold text-xl text-primary">{state.favorites.length}</p>
              <p className="text-xs text-muted-foreground font-medium">Favoritos</p>
            </div>
            <div>
              <p className="font-bold text-xl text-primary">{state.cartItems.reduce((s, i) => s + i.qty, 0)}</p>
              <p className="text-xs text-muted-foreground font-medium">En carrito</p>
            </div>
          </div>

          {/* Sections */}
          {sections.map((section) => (
            <div key={section.title} className="bg-card rounded-xl border border-border overflow-hidden shadow-sm">
              <div className="px-4 pt-3 pb-1">
                <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider">{section.title}</h3>
              </div>
              {section.items.map((item) => (
                <button
                  key={item.label}
                  onClick={item.action}
                  className="w-full flex items-center gap-3 px-4 py-3.5 text-left active:bg-muted/50 transition-colors"
                >
                  <div className="w-9 h-9 rounded-lg bg-muted flex items-center justify-center text-muted-foreground">
                    <item.icon className="w-5 h-5" />
                  </div>
                  <span className="flex-1 font-medium text-foreground">{item.label}</span>
                  {item.badge !== undefined && (
                    <span className="px-2 py-0.5 rounded-full bg-primary/10 text-primary text-xs font-bold">{item.badge}</span>
                  )}
                  <ChevronRight className="w-4 h-4 text-muted-foreground" />
                </button>
              ))}
            </div>
          ))}

          {/* Logout */}
          <button className="w-full py-4 rounded-xl bg-card border border-border flex items-center justify-center gap-2 text-destructive font-bold hover:bg-destructive/5 transition-all active:scale-[0.97]">
            <LogOut className="w-5 h-5" />
            Cerrar sesión
          </button>
        </div>
      </div>
      <BottomNav active="profile" />
    </div>
  );
};
