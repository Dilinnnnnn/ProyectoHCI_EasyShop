import { useState, useEffect } from "react";
import { Search, Mic, Star, TrendingUp, Clock, ChevronRight } from "lucide-react";
import { useApp } from "../context/AppContext";
import { products, categories } from "../data/products";
import { TopBar } from "../components/layout/TopBar";
import { BottomNav } from "../components/layout/BottomNav";
import { useTextToSpeech } from "../hooks/useTextToSpeech";

interface HomeScreenProps {
  voiceActive: boolean;
  onVoice: () => void;
}

function SkeletonBlock({ className }: { className?: string }) {
  return <div className={`skeleton ${className ?? ""}`} />;
}

export const HomeScreen = ({ voiceActive, onVoice }: HomeScreenProps) => {
  const { navigate, selectCategory, selectProduct, setSearch, addRecentSearch, state, addToCart, toggleFavorite } = useApp();
  const [searchInput, setSearchInput] = useState("");
  const [loading, setLoading] = useState(true);
  const { speak } = useTextToSpeech(state.accessibility);

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

  const featured = products.filter((p) => [1, 2, 3].includes(p.id));
  const recommended = products.filter((p) => [7, 8, 14].includes(p.id));
  const recentItems = state.orderHistory.length > 0
    ? state.orderHistory[0].items.slice(0, 3).map((oi) => products.find((p) => p.id === oi.id)).filter(Boolean)
    : [];
  const offers = products.filter((p) => p.price < 30000).slice(0, 3);
  const favoriteIds = state.favorites;

  return (
    <div className="flex-1 flex flex-col overflow-hidden bg-background">
      <TopBar title="EasyShop" showVoice onVoice={onVoice} voiceActive={voiceActive} />

      <div className="screen-scroll flex-1 overflow-y-auto">
        {/* Hero Banner */}
        <div className="bg-gradient-to-br from-primary via-primary to-primary/80 text-primary-foreground px-5 py-6">
          <p className="text-sm opacity-90 font-medium">Bienvenido a</p>
          <h1 className="text-2xl font-bold mt-0.5">EasyShop</h1>
          <p className="text-sm opacity-80 mt-1">Compras accesibles para todos</p>
          <div className="mt-4 bg-primary-foreground/15 backdrop-blur-sm rounded-2xl px-4 py-3 flex items-center gap-3">
            <Search className="w-5 h-5 shrink-0 opacity-70" />
            <input
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch(searchInput)}
              placeholder="Buscar productos..."
              className="flex-1 bg-transparent outline-none text-primary-foreground placeholder:text-primary-foreground/60"
              aria-label="Buscar productos"
            />
            <button
              onClick={onVoice}
              className={`w-11 h-11 rounded-xl flex items-center justify-center transition-all shrink-0 ${
                voiceActive ? "bg-voice text-voice-foreground animate-voice-pulse" : "bg-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/30"
              }`}
              aria-label="Buscar por voz"
            >
              <Mic className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="px-4 pb-4 space-y-5 -mt-2">
          {/* Categories */}
          <section>
            <div className="flex items-center justify-between mb-3">
              <h2 className="font-bold text-lg text-foreground flex items-center gap-1.5">
                <TrendingUp className="w-5 h-5 text-primary" />
                Categorías
              </h2>
              <button
                onClick={() => navigate("categories")}
                className="text-sm font-bold text-primary active:text-primary/80"
              >
                Ver todo
              </button>
            </div>
            {loading ? (
              <div className="grid grid-cols-4 gap-3">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="flex flex-col items-center gap-2">
                    <SkeletonBlock className="w-16 h-16 rounded-2xl" />
                    <SkeletonBlock className="w-14 h-3 rounded" />
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-4 gap-3">
                {categories.slice(0, 8).map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => {
                      selectCategory(cat.id);
                      speak(`Mostrando ${cat.label}`);
                    }}
                    className="flex flex-col items-center gap-2 group"
                    aria-label={cat.label}
                  >
                    <div
                      className="w-16 h-16 rounded-2xl flex items-center justify-center transition-all group-hover:scale-105 group-active:scale-95 shadow-sm"
                      style={{ backgroundColor: cat.color + "18", color: cat.color }}
                    >
                      <span className="text-xl font-bold">{cat.label[0]}</span>
                    </div>
                    <span className="text-[11px] font-bold text-muted-foreground text-center leading-tight">{cat.label}</span>
                  </button>
                ))}
              </div>
            )}
          </section>

          {/* Featured Products */}
          <section>
            <div className="flex items-center justify-between mb-3">
              <h2 className="font-bold text-lg text-foreground flex items-center gap-1.5">
                <Star className="w-5 h-5 text-favorite" />
                Destacados
              </h2>
            </div>
            {loading ? (
              <div className="flex gap-3 overflow-x-auto pb-2 -mx-4 px-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="w-52 shrink-0">
                    <SkeletonBlock className="h-36 rounded-xl" />
                    <div className="mt-2 space-y-1.5">
                      <SkeletonBlock className="h-4 w-3/4 rounded" />
                      <SkeletonBlock className="h-4 w-1/2 rounded" />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex gap-3 overflow-x-auto pb-2 -mx-4 px-4 snap-x snap-mandatory scrollbar-none">
                {featured.map((p) => {
                  const isFav = favoriteIds.includes(p.id);
                  const isInCart = state.cartItems.some((ci) => ci.id === p.id);
                  return (
                    <div
                      key={p.id}
                      className="w-52 shrink-0 bg-card rounded-xl border border-border overflow-hidden snap-start shadow-sm hover:shadow-md transition-shadow"
                    >
                      <button
                        onClick={() => selectProduct(p.id)}
                        className="w-full text-left"
                        aria-label={p.name}
                      >
                        <div className="aspect-[4/3] bg-muted relative overflow-hidden">
                          <img
                            src={p.image}
                            alt={p.name}
                            className="w-full h-full object-cover"
                            loading="lazy"
                          />
                          {isInCart && (
                            <div className="absolute top-2 right-2 bg-primary text-primary-foreground text-xs font-bold px-2 py-0.5 rounded-full shadow">
                              En carrito
                            </div>
                          )}
                          <button
                            onClick={(e) => { e.stopPropagation(); toggleFavorite(p.id); }}
                            className={`absolute top-2 left-2 w-8 h-8 rounded-full flex items-center justify-center shadow ${isFav ? "bg-favorite text-favorite-foreground" : "bg-card/80 text-muted-foreground hover:bg-card"}`}
                            aria-label={isFav ? "Quitar de favoritos" : "Agregar a favoritos"}
                          >
                            <Star className="w-4 h-4" fill={isFav ? "currentColor" : "none"} />
                          </button>
                        </div>
                        <div className="p-3 space-y-1">
                          <h3 className="font-bold text-sm text-foreground leading-tight line-clamp-1">{p.name}</h3>
                          <div className="flex items-center gap-1">
                            <Star className="w-3 h-3 text-favorite" fill="currentColor" />
                            <span className="text-xs font-medium text-muted-foreground">{p.rating}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="font-bold text-lg text-primary">${p.price.toLocaleString("es-CL")}</span>
                            {p.stock <= 5 && (
                              <span className="text-[10px] font-bold text-destructive">Quedan {p.stock}</span>
                            )}
                          </div>
                        </div>
                      </button>
                      <div className="px-3 pb-3">
                        <button
                          onClick={() => addToCart(p)}
                          className={`w-full py-2.5 rounded-xl text-sm font-bold transition-all active:scale-95 ${
                            isInCart ? "bg-secondary/10 text-secondary border-2 border-secondary" : "bg-primary text-primary-foreground hover:bg-primary-hover"
                          }`}
                        >
                          {isInCart ? "Agregado ✓" : "Agregar"}
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
            <div className="flex gap-3 overflow-x-auto pb-1 -mx-1 px-1">
              {offers.map((p) => (
                <button
                  key={p.id}
                  onClick={() => selectProduct(p.id)}
                  className="w-36 shrink-0 bg-card rounded-xl border border-border overflow-hidden active:scale-95 transition-transform"
                  aria-label={p.name}
                >
                  <div className="aspect-square bg-muted">
                    <img src={p.image} alt={p.name} className="w-full h-full object-cover" loading="lazy" />
                  </div>
                  <div className="p-2">
                    <p className="text-xs font-bold text-foreground line-clamp-1">{p.name}</p>
                    <div className="flex items-center gap-1">
                      <span className="font-bold text-sm text-destructive">${p.price.toLocaleString("es-CL")}</span>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </section>

          {/* Recommended */}
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
                  className="bg-card rounded-xl border border-border overflow-hidden active:scale-[0.97] transition-transform text-left"
                  aria-label={p.name}
                >
                  <div className="aspect-square bg-muted">
                    <img src={p.image} alt={p.name} className="w-full h-full object-cover" loading="lazy" />
                  </div>
                  <div className="p-2.5 space-y-0.5">
                    <p className="font-bold text-xs text-foreground line-clamp-1">{p.name}</p>
                    <div className="flex items-center gap-1">
                      <Star className="w-3 h-3 text-favorite" fill="currentColor" />
                      <span className="text-[10px] text-muted-foreground">{p.rating}</span>
                    </div>
                    <p className="font-bold text-sm text-primary">${p.price.toLocaleString("es-CL")}</p>
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
              <div className="flex gap-3 overflow-x-auto pb-2">
                {recentItems.map((item) => item && (
                  <button
                    key={item.id}
                    onClick={() => selectProduct(item.id)}
                    className="w-28 shrink-0"
                    aria-label={item.name}
                  >
                    <div className="aspect-square bg-muted rounded-xl overflow-hidden border border-border">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" loading="lazy" />
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
