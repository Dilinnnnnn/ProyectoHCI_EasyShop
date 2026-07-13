import { useEffect } from "react";
import { useApp } from "../context/AppContext";
import { WBox } from "../components/wireframe/WBox";
import { WLabel } from "../components/wireframe/WLabel";

export const SplashScreen = () => {
  const { navigate } = useApp();

  useEffect(() => {
    const t = setTimeout(() => navigate("home"), 2200);
    return () => clearTimeout(t);
  }, [navigate]);

  return (
    <div className="flex-1 flex flex-col items-center justify-center gap-6 bg-gradient-to-b from-primary/10 to-background">
      <div className="w-32 h-32 rounded-3xl bg-primary/10 border-2 border-primary/20 flex flex-col items-center justify-center gap-1">
        <span className="text-4xl">🛒</span>
        <WLabel text="EasyShop" size="xs" bold />
      </div>
      <div className="flex flex-col items-center gap-1">
        <WLabel text="EasyShop" size="2xl" bold />
        <WLabel text="Compras accesibles para todos" muted size="sm" />
      </div>
      <div className="flex flex-col items-center gap-3 mt-4">
        <div className="w-8 h-8 border-4 border-muted border-t-primary rounded-full animate-spin" />
        <WLabel text="Cargando..." size="sm" muted />
      </div>
    </div>
  );
};
