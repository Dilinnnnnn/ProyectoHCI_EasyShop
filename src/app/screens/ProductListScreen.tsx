import { Star, Heart } from "lucide-react";
import { useApp } from "../context/AppContext";
import { products, getProductsByCategory, getCategoryById, searchProducts } from "../data/products";
import { TopBar } from "../components/layout/TopBar";
import { BottomNav } from "../components/layout/BottomNav";
import { useTextToSpeech } from "../hooks/useTextToSpeech";

interface ProductListScreenProps {
  voiceActive: boolean;
  onVoice: () => void;
}

export const ProductListScreen = ({ voiceActive, onVoice }: ProductListScreenProps) => {
  const { state, selectProduct, addToCart, toggleFavorite } = useApp();
  const { speak } = useTextToSpeech(state.accessibility);

  const category = state.selectedCategoryId ? getCategoryById(state.selectedCategoryId) : null;
  const query = state.searchQuery;

  const items = query
    ? searchProducts(query)
    : category
      ? getProductsByCategory(category.id)
      : products;

  return (
    <div className="flex-1 flex flex-col overflow-hidden bg-background">
      <TopBar
        title={category?.label ?? (query ? `"${query}"` : "Productos")}
        showBack
        showVoice
        onVoice={onVoice}
        voiceActive={voiceActive}
      />
      <div className="screen-scroll flex-1 overflow-y-auto p-4">
        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-3 py-20">
            <p className="font-bold text-lg text-foreground">Sin resultados</p>
            <p className="text-sm text-muted-foreground">Intenta con otra búsqueda</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3">
            {items.map((p) => {
              const isFav = state.favorites.includes(p.id);
              const isInCart = state.cartItems.some((ci) => ci.id === p.id);
              return (
                <div
                  key={p.id}
                  className="bg-card rounded-xl border border-border overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                >
                  <button
                    onClick={() => { selectProduct(p.id); }}
                    className="w-full text-left"
                    aria-label={p.name}
                  >
                    <div className="aspect-square bg-muted relative">
                      <img src={p.image} alt={p.name} className="w-full h-full object-cover" loading="lazy" />
                      <button
                        onClick={(e) => { e.stopPropagation(); toggleFavorite(p.id); }}
                        className={`absolute top-2 left-2 w-8 h-8 rounded-full flex items-center justify-center shadow ${isFav ? "bg-favorite text-favorite-foreground" : "bg-card/80 text-muted-foreground hover:bg-card"}`}
                        aria-label={isFav ? "Quitar de favoritos" : "Agregar a favoritos"}
                      >
                        <Heart className="w-4 h-4" fill={isFav ? "currentColor" : "none"} />
                      </button>
                      {isInCart && (
                        <div className="absolute top-2 right-2 bg-primary text-primary-foreground text-[10px] font-bold px-2 py-0.5 rounded-full shadow">
                          En carrito
                        </div>
                      )}
                    </div>
                    <div className="p-2.5 space-y-1">
                      <h3 className="font-bold text-sm text-foreground line-clamp-1">{p.name}</h3>
                      <div className="flex items-center gap-1">
                        <Star className="w-3 h-3 text-favorite" fill="currentColor" />
                        <span className="text-xs text-muted-foreground">{p.rating}</span>
                      </div>
                      <p className="font-bold text-base text-primary">${p.price.toLocaleString("es-CL")}</p>
                    </div>
                  </button>
                  <div className="px-2.5 pb-2.5">
                    <button
                      onClick={() => { addToCart(p); speak(`${p.name} agregado al carrito`); }}
                      className={`w-full py-2 rounded-lg text-xs font-bold transition-all active:scale-95 ${
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
      </div>
      <BottomNav active="product-list" />
    </div>
  );
};
