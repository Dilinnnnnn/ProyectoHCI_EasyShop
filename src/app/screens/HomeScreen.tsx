import { useState, useEffect } from "react";
import { Search, Mic, Star, TrendingUp, Clock, ChevronRight, Volume2, Hand, Settings, ShoppingCart, Zap } from "lucide-react";
import { useApp } from "../context/AppContext";
import { products, categories } from "../data/products";
import { TopBar } from "../components/layout/TopBar";
import { BottomNav } from "../components/layout/BottomNav";
import { useTextToSpeech } from "../hooks/useTextToSpeech";
import { useHapticFeedback } from "../hooks/useHapticFeedback";

interface HomeScreenProps {
  voiceActive: boolean;
  onVoice: () => void;
}

function SkeletonBlock({ className }: { className?: string }) {
  return <div className={`skeleton ${className ?? ""}`} />;
}

export const HomeScreen = ({ voiceActive, onVoice }: HomeScreenProps) => {
  const { navigate, selectCategory, selectProduct, setSearch, addRecentSearch, state, addToCart, toggleFavorite, setAccessibility } = useApp();
  const [searchInput, setSearchInput] = useState("");
  const [loading, setLoading] = useState(true);
  const { speak } = useTextToSpeech(state.accessibility);
  const { vibrate } = useHapticFeedback(state.accessibility);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 600);
    return () => clearTimeout(t);
  }, []);

  const handleSearch = (q: string) => {
    if (q.trim()) {
      setSearch(q.trim());
      addRecentSearch(q.trim());
      navigate("product-list");
    }
  };

  const doAction = (msg: string, fn: () => void) => {
    if (state.accessibility.ttsEnabled) speak(msg);
    if (state.accessibility.hapticEnabled) vibrate("confirm");
    fn();
  };

  const featured = products.filter((p) => [1, 2, 3].includes(p.id));
  const recommended = products.filter((p) => [7, 8, 14].includes(p.id));
  const recentItems = state.orderHistory.length > 0
    ? state.orderHistory[0].items.slice(0, 3).map((oi) => products.find((p) => p.id === oi.id)).filter(Boolean)
    : [];
  const offers = products.filter((p) => p.price < 25).slice(0, 4);
  const favoriteIds = state.favorites;

  return (
    <div className="flex-1 flex flex-col overflow-hidden bg-background">
      <TopBar title="EasyShop" showVoice onVoice={onVoice} voiceActive={voiceActive} />

      <div className="screen-scroll flex-1 overflow-y-auto">
        {/* Hero Banner */}
        <div className="bg-gradient-to-br from-primary via-primary to-primary/80 text-primary-foreground px-5 pb-5 pt-5">
          <p className="text-sm opacity-90 font-medium">Bienvenido a</p>
          <h1 className="text-2xl font-bold mt-0.5">EasyShop</h1>
          <p className="text-sm opacity-80 mt-1 mb-4">Compras accesibles para todos</p>

          {/* Search + Voice */}
          <div className="bg-primary-foreground/15 backdrop-blur-sm rounded-2xl px-4 py-2 flex items-center gap-3">
            <Search className="w-5 h-5 shrink-0 opacity-70" />
            <input
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch(searchInput)}
              placeholder="Buscar productos..."
              className="flex-1 bg-transparent outline-none text-primary-foreground placeholder:text-primary-foreground/60 py-3"
              aria-label="Buscar productos"
            />
            <button
              onClick={() => { doAction("Asistente de voz activado", onVoice); }}
              className={`flex items-center gap-2 px-4 py-3 rounded-xl font-bold text-sm transition-all shrink-0 ${
                voiceActive ? "bg-voice text-voice-foreground animate-voice-pulse" : "bg-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/30"
              }`}
              aria-label="Buscar por voz"
            >
              <Mic className="w-5 h-5" />
              <span>Buscar por voz</span>
            </button>
          </div>
        </div>

        {/* Acceso rápido - always visible */}
        <section className="bg-background border-b border-border px-4 py-4">
          <div className="grid grid-cols-3 gap-3">
            <button
              onClick={() => { doAction("Asistente de voz", onVoice); }}
              className="flex flex-col items-center gap-3 py-7 rounded-2xl bg-voice/10 text-voice font-bold active:scale-95 transition-all"
            >
              <Mic className="w-11 h-11" />
              <span className="text-sm font-bold text-center leading-tight">Comandos por voz</span>
            </button>
            <button
              onClick={() => { doAction("Modo una mano activado", () => setAccessibility({ oneHandMode: !state.accessibility.oneHandMode })); }}
              className="flex flex-col items-center gap-3 py-7 rounded-2xl bg-secondary/10 text-secondary font-bold active:scale-95 transition-all"
            >
              <Hand className="w-11 h-11" />
              <span className="text-sm font-bold text-center leading-tight">Modo una mano</span>
            </button>
            <button
              onClick={() => { doAction("Configuración de accesibilidad", () => navigate("accessibility")); }}
              className="flex flex-col items-center gap-3 py-7 rounded-2xl bg-primary/10 text-primary font-bold active:scale-95 transition-all"
            >
              <Settings className="w-11 h-11" />
              <span className="text-sm font-bold text-center leading-tight">Configurar</span>
            </button>
          </div>
        </section>

        <div className="px-4 pb-4 space-y-5 pt-4">

          {/* Categories */}
          <section>
            <div className="flex items-center justify-between mb-3">
              <h2 className="font-bold text-lg text-foreground flex items-center gap-1.5">
                <TrendingUp className="w-5 h-5 text-primary" />
                Categorías
              </h2>
              <button onClick={() => navigate("categories")} className="text-sm font-bold text-primary active:text-primary/80">
                Ver todo
              </button>
            </div>
            {loading ? (
              <div className="grid grid-cols-2 gap-3">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="flex items-center gap-4 p-4 bg-card rounded-2xl border border-border">
                    <SkeletonBlock className="w-14 h-14 rounded-2xl shrink-0" />
                    <SkeletonBlock className="h-5 w-28 rounded" />
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-3">
                {categories.slice(0, 8).map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => { doAction(`Categoría ${cat.label}`, () => selectCategory(cat.id)); }}
                    className="flex items-center gap-4 p-5 bg-card rounded-2xl border border-border hover:shadow-sm active:scale-[0.97] transition-all text-left min-h-[80px]"
                    aria-label={cat.label}
                  >
                    <div
                      className="w-16 h-16 rounded-2xl flex items-center justify-center shrink-0 shadow-sm"
                      style={{ backgroundColor: cat.color + "18", color: cat.color }}
                    >
                      <span className="text-2xl font-bold">{cat.label[0]}</span>
                    </div>
                    <span className="font-bold text-base text-foreground">{cat.label}</span>
                  </button>
                ))}
              </div>
            )}
          </section>

          {/* Featured Products - 2 per row */}
          <section>
            <div className="flex items-center justify-between mb-3">
              <h2 className="font-bold text-lg text-foreground flex items-center gap-1.5">
                <Star className="w-5 h-5 text-favorite" />
                Destacados
              </h2>
            </div>
            {loading ? (
              <div className="grid grid-cols-2 gap-3">
                {[1, 2].map((i) => (
                  <div key={i}>
                    <SkeletonBlock className="aspect-square rounded-xl" />
                    <div className="mt-2 space-y-1.5">
                      <SkeletonBlock className="h-4 w-3/4 rounded" />
                      <SkeletonBlock className="h-4 w-1/2 rounded" />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-3">
                {featured.map((p) => {
                  const isFav = favoriteIds.includes(p.id);
                  const isInCart = state.cartItems.some((ci) => ci.id === p.id);
                  return (
                    <div
                      key={p.id}
                      className="bg-card rounded-2xl border border-border overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                    >
                      <button
                        onClick={() => selectProduct(p.id)}
                        className="w-full text-left"
                        aria-label={p.name}
                      >
                        <div className="aspect-square bg-muted relative">
                          <img src={p.image} alt={p.name} className="w-full h-full object-cover object-center" loading="lazy" />
                          <button
                            onClick={(e) => { e.stopPropagation(); toggleFavorite(p.id); }}
                            className={`absolute top-3 left-3 w-10 h-10 rounded-full flex items-center justify-center shadow-lg ${isFav ? "bg-favorite text-favorite-foreground" : "bg-card/90 text-muted-foreground hover:bg-card"}`}
                            aria-label={isFav ? "Quitar de favoritos" : "Agregar a favoritos"}
                          >
                            <Star className="w-5 h-5" fill={isFav ? "currentColor" : "none"} />
                          </button>
                          {isInCart && (
                            <div className="absolute top-3 right-3 bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-full shadow-lg flex items-center gap-1">
                              <ShoppingCart className="w-3.5 h-3.5" />
                              En carrito
                            </div>
                          )}
                        </div>
                        <div className="p-3 space-y-1.5">
                          <h3 className="font-bold text-sm text-foreground leading-tight line-clamp-2">{p.name}</h3>
                          <div className="flex items-center gap-1">
                            <Star className="w-3.5 h-3.5 text-favorite" fill="currentColor" />
                            <span className="text-xs font-medium text-muted-foreground">{p.rating}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="font-bold text-xl text-primary">${p.price.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                            {p.stock <= 5 && <span className="text-[10px] font-bold text-destructive">Quedan {p.stock}</span>}
                          </div>
                        </div>
                      </button>
                      <div className="px-3 pb-3">
                        <button
                          onClick={() => { doAction(`${p.name} agregado al carrito`, () => addToCart(p)); }}
                          className={`w-full py-3.5 rounded-xl text-sm font-bold transition-all active:scale-95 ${isInCart ? "bg-secondary/10 text-secondary border-2 border-secondary" : "bg-primary text-primary-foreground hover:bg-primary-hover"}`}
                        >
                          {isInCart ? "Agregado ✓" : "Agregar al carrito"}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </section>

          {/* Offers */}
          <section className="bg-gradient-to-r from-destructive/5 to-warning/5 rounded-2xl border border-destructive/10 p-4">
            <div className="flex items-center gap-2 mb-3">
              <div className="px-2.5 py-0.5 bg-destructive text-destructive-foreground text-[10px] font-bold rounded-full">OFERTA</div>
              <h2 className="font-bold text-lg text-foreground">Precios bajos</h2>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {offers.map((p) => (
                <button
                  key={p.id}
                  onClick={() => selectProduct(p.id)}
                  className="bg-card rounded-2xl border border-border overflow-hidden active:scale-[0.97] transition-transform text-left"
                  aria-label={p.name}
                >
                  <div className="aspect-square bg-muted">
                    <img src={p.image} alt={p.name} className="w-full h-full object-cover object-center" loading="lazy" />
                  </div>
                  <div className="p-3 space-y-1">
                    <p className="font-bold text-sm text-foreground line-clamp-2">{p.name}</p>
                    <p className="font-bold text-lg text-destructive">${p.price.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
                  </div>
                </button>
              ))}
            </div>
          </section>

          {/* Recommended - 2 per row */}
          <section>
            <div className="flex items-center justify-between mb-3">
              <h2 className="font-bold text-lg text-foreground flex items-center gap-1.5">
                <TrendingUp className="w-5 h-5 text-secondary" />
                Recomendados
              </h2>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {recommended.map((p) => (
                <button
                  key={p.id}
                  onClick={() => selectProduct(p.id)}
                  className="bg-card rounded-2xl border border-border overflow-hidden active:scale-[0.97] transition-transform text-left"
                  aria-label={p.name}
                >
                  <div className="aspect-square bg-muted">
                    <img src={p.image} alt={p.name} className="w-full h-full object-cover object-center" loading="lazy" />
                  </div>
                  <div className="p-3 space-y-1">
                    <p className="font-bold text-sm text-foreground line-clamp-2">{p.name}</p>
                    <div className="flex items-center gap-1">
                      <Star className="w-3.5 h-3.5 text-favorite" fill="currentColor" />
                      <span className="text-xs text-muted-foreground">{p.rating}</span>
                    </div>
                    <p className="font-bold text-lg text-primary">${p.price.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
                  </div>
                </button>
              ))}
            </div>
          </section>

          {/* Recent Purchases */}
          {recentItems.length > 0 && (
            <section>
              <div className="flex items-center gap-1.5 mb-3">
                <Clock className="w-5 h-5 text-muted-foreground" />
                <h2 className="font-bold text-lg text-foreground">Compras recientes</h2>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {recentItems.map((item) => item && (
                  <button
                    key={item.id}
                    onClick={() => selectProduct(item.id)}
                    className="text-left"
                    aria-label={item.name}
                  >
                    <div className="aspect-square bg-muted rounded-xl overflow-hidden border border-border">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover object-center" loading="lazy" />
                    </div>
                    <p className="text-[11px] font-bold text-muted-foreground mt-1 line-clamp-1">{item.name}</p>
                  </button>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>

      <BottomNav active="home" />
    </div>
  );
};
