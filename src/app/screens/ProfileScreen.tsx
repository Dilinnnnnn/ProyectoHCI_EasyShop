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
        <div className="bg-gradient-to-b from-primary to-primary/80 text-primary-foreground px-5 py-10 flex flex-col items-center gap-4">
          <div className="w-28 h-28 rounded-full bg-primary-foreground/20 flex items-center justify-center border-4 border-primary-foreground/30">
            <User className="w-14 h-14" />
          </div>
          <div className="text-center">
            <h2 className="font-bold text-2xl">Usuario</h2>
            <p className="text-base opacity-80">usuario@email.com</p>
          </div>
        </div>

        <div className="px-4 pb-4 space-y-5 -mt-2">
          {/* Stats */}
          <div className="bg-card rounded-2xl border border-border p-5 grid grid-cols-3 gap-3 text-center shadow-sm">
            <div className="py-2">
              <p className="font-bold text-2xl text-primary">{state.orderHistory.length}</p>
              <p className="text-sm text-muted-foreground font-bold">Pedidos</p>
            </div>
            <div className="py-2">
              <p className="font-bold text-2xl text-primary">{state.favorites.length}</p>
              <p className="text-sm text-muted-foreground font-bold">Favoritos</p>
            </div>
            <div className="py-2">
              <p className="font-bold text-2xl text-primary">{state.cartItems.reduce((s, i) => s + i.qty, 0)}</p>
              <p className="text-sm text-muted-foreground font-bold">En carrito</p>
            </div>
          </div>

          {/* Sections */}
          {sections.map((section) => (
            <div key={section.title} className="bg-card rounded-2xl border border-border overflow-hidden shadow-sm">
              <div className="px-5 pt-4 pb-1">
                <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-wider">{section.title}</h3>
              </div>
              {section.items.map((item) => (
                <button
                  key={item.label}
                  onClick={item.action}
                  className="w-full flex items-center gap-4 px-5 py-5 text-left active:bg-muted/50 transition-colors min-h-[72px]"
                >
                  <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center text-muted-foreground shrink-0">
                    <item.icon className="w-6 h-6" />
                  </div>
                  <span className="flex-1 font-bold text-base text-foreground">{item.label}</span>
                  {item.badge !== undefined && (
                    <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-bold">{item.badge}</span>
                  )}
                  <ChevronRight className="w-5 h-5 text-muted-foreground shrink-0" />
                </button>
              ))}
            </div>
          ))}

          {/* Logout */}
          <button className="w-full py-5 rounded-2xl bg-card border-2 border-border flex items-center justify-center gap-3 text-destructive font-bold text-base hover:bg-destructive/5 transition-all active:scale-[0.97] min-h-[64px]">
            <LogOut className="w-6 h-6" />
            Cerrar sesión
          </button>
        </div>
      </div>
      <BottomNav active="profile" />
    </div>
  );
};
