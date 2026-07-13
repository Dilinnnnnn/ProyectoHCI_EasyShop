import { useEffect } from "react";
import { Heart, ShoppingCart, Star, Volume2, Minus, Plus, Zap } from "lucide-react";
import { useApp } from "../context/AppContext";
import { products } from "../data/products";
import { TopBar } from "../components/layout/TopBar";
import { useTextToSpeech } from "../hooks/useTextToSpeech";
import { useHapticFeedback } from "../hooks/useHapticFeedback";

export const ProductDetailScreen = () => {
  const { state, goBack, addToCart, toggleFavorite, updateQty, navigate } = useApp();
  const { speak } = useTextToSpeech(state.accessibility);
  const { vibrate } = useHapticFeedback(state.accessibility);

  const product = products.find((p) => p.id === state.selectedProductId);
  const cartItem = state.cartItems.find((ci) => ci.id === state.selectedProductId);
  const isFav = state.selectedProductId ? state.favorites.includes(state.selectedProductId) : false;

  const doAction = (msg: string, fn: () => void) => {
    if (state.accessibility.ttsEnabled) speak(msg);
    if (state.accessibility.hapticEnabled) vibrate("confirm");
    fn();
  };

  useEffect(() => {
    if (product) {
      speak(`${product.name}. Precio: ${product.price.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} dólares. ${product.description}`);
    }
  }, [product]);

  if (!product) {
    return (
      <div className="flex-1 flex flex-col overflow-hidden bg-background">
        <TopBar title="Producto" showBack />
        <div className="flex-1 flex items-center justify-center">
          <p className="text-muted-foreground">Producto no encontrado</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col overflow-hidden bg-background">
      <TopBar title={product.name} showBack />

      <div className="screen-scroll flex-1 overflow-y-auto">
        <div className="aspect-square bg-muted">
          <img src={product.image} alt={product.name} className="w-full h-full object-cover object-center" />
        </div>

        <div className="p-5 space-y-5">
          <div className="flex items-start justify-between">
            <div className="space-y-1.5">
              <h1 className="text-2xl font-bold text-foreground">{product.name}</h1>
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-0.5">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star key={s} className={`w-5 h-5 ${s <= Math.round(product.rating) ? "text-favorite fill-favorite" : "text-muted"}`} />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">{product.rating} ({product.reviews} reseñas)</span>
              </div>
            </div>
            <button
              onClick={() => toggleFavorite(product.id)}
              className={`w-14 h-14 rounded-xl flex items-center justify-center border-2 transition-all ${isFav ? "bg-favorite border-favorite text-favorite-foreground" : "bg-card border-border text-muted-foreground hover:bg-muted"}`}
              aria-label={isFav ? "Quitar de favoritos" : "Agregar a favoritos"}
            >
              <Heart className="w-7 h-7" fill={isFav ? "currentColor" : "none"} />
            </button>
          </div>

          <div className="flex items-baseline gap-3">
            <span className="text-3xl font-bold text-primary">${product.price.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
            <span className="text-sm text-muted-foreground line-through">
              ${(product.price * 1.3).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </span>
            <span className="text-sm font-bold text-destructive bg-destructive/10 px-2 py-0.5 rounded-full">-30%</span>
          </div>

          <div className="flex items-center gap-2">
            {product.stock > 10 ? (
              <span className="text-sm font-bold text-success flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-success" />
                En stock ({product.stock} disponibles)
              </span>
            ) : product.stock > 0 ? (
              <span className="text-sm font-bold text-warning flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-warning" />
                Quedan {product.stock} unidades
              </span>
            ) : (
              <span className="text-sm font-bold text-destructive flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-destructive" />
                Agotado
              </span>
            )}
          </div>

          <div className="border-t border-border pt-4">
            <h3 className="font-bold text-foreground mb-2">Descripción</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{product.description}</p>
          </div>

          <div className="space-y-3">
            {cartItem ? (
              <>
                <div className="flex items-center gap-3 bg-card border-2 border-primary rounded-xl px-4 py-4">
                  <button
                    onClick={() => updateQty(product.id, -1)}
                    className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center text-foreground active:bg-muted/70"
                    aria-label="Disminuir cantidad"
                  >
                    <Minus className="w-6 h-6" />
                  </button>
                  <span className="flex-1 text-center font-bold text-xl text-foreground">{cartItem.qty}</span>
                  <button
                    onClick={() => updateQty(product.id, 1)}
                    className="w-12 h-12 rounded-xl bg-primary text-primary-foreground flex items-center justify-center active:bg-primary-hover"
                    aria-label="Aumentar cantidad"
                  >
                    <Plus className="w-6 h-6" />
                  </button>
                </div>
                <button
                  onClick={() => doAction("Ir al carrito", () => navigate("cart"))}
                  className="w-full py-4 rounded-xl bg-secondary text-secondary-foreground font-bold text-lg hover:bg-secondary-hover transition-all active:scale-[0.97] flex items-center justify-center gap-2"
                >
                  <ShoppingCart className="w-6 h-6" />
                  Ir al carrito
                </button>
              </>
            ) : (
              <button
                onClick={() => doAction(`${product.name} agregado al carrito`, () => addToCart(product))}
                className="w-full py-4 rounded-xl bg-primary text-primary-foreground font-bold text-lg hover:bg-primary-hover transition-all active:scale-[0.97] flex items-center justify-center gap-2"
              >
                <ShoppingCart className="w-6 h-6" />
                Agregar al carrito
              </button>
            )}

            <div className="flex gap-2">
              <button
                onClick={() => speak(`${product.name}. ${product.description}`)}
                className="w-14 h-14 rounded-xl border-2 border-border flex items-center justify-center text-muted-foreground hover:bg-muted transition-all shrink-0"
                aria-label="Escuchar descripción"
              >
                <Volume2 className="w-6 h-6" />
              </button>
              <button
                onClick={() => doAction(`Comprar ${product.name} ahora`, () => { addToCart(product); navigate("cart"); })}
                className="flex-1 py-4 rounded-xl bg-primary text-primary-foreground font-bold text-lg hover:bg-primary-hover transition-all active:scale-[0.97] flex items-center justify-center gap-2"
              >
                <Zap className="w-6 h-6" />
                Comprar ahora
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
