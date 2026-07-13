import { Home, LayoutGrid, ShoppingCart, Package, User } from "lucide-react";
import { useApp, Screen } from "../../context/AppContext";

interface BottomNavProps {
  active: Screen;
}

const navItems: { id: Screen; icon: React.ReactNode; label: string }[] = [
  { id: "home", icon: <Home className="w-5 h-5" />, label: "Inicio" },
  { id: "categories", icon: <LayoutGrid className="w-5 h-5" />, label: "Categorías" },
  { id: "cart", icon: <ShoppingCart className="w-5 h-5" />, label: "Carrito" },
  { id: "history", icon: <Package className="w-5 h-5" />, label: "Pedidos" },
  { id: "profile", icon: <User className="w-5 h-5" />, label: "Perfil" },
];

export const BottomNav = ({ active }: BottomNavProps) => {
  const { navigate } = useApp();

  return (
    <div className="bottom-nav flex border-t border-border bg-card shrink-0">
      {navItems.map((item) => {
        const isActive = active === item.id;
        return (
          <button
            key={item.id}
            onClick={() => navigate(item.id)}
            className={`flex-1 flex flex-col items-center justify-center py-2.5 gap-1 transition-colors
              ${isActive ? "text-primary border-t-[3px] border-t-primary" : "text-muted-foreground border-t-[3px] border-t-transparent hover:text-foreground"}`}
            aria-label={item.label}
            aria-current={isActive ? "page" : undefined}
          >
            {item.icon}
            <span className={`text-[10px] font-bold ${isActive ? "text-primary" : ""}`}>
              {item.label}
            </span>
          </button>
        );
      })}
    </div>
  );
};
