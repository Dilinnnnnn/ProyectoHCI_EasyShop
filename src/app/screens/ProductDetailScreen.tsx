import { useEffect } from "react";
import { Heart, ShoppingCart, Star, Volume2, Minus, Plus } from "lucide-react";
import { useApp } from "../context/AppContext";
import { products } from "../data/products";
import { TopBar } from "../components/layout/TopBar";
import { useTextToSpeech } from "../hooks/useTextToSpeech";

export const ProductDetailScreen = () => {
  const { state, goBack, addToCart, toggleFavorite, updateQty } = useApp();
  const { speak } = useTextToSpeech(state.accessibility);

  const product = products.find((p) => p.id === state.selectedProductId);
  const cartItem = state.cartItems.find((ci) => ci.id === state.selectedProductId);
  const isFav = state.selectedProductId ? state.favorites.includes(state.selectedProductId) : false;

  useEffect(() => {
    if (product) {
      speak(`${product.name}. Precio: ${product.price.toLocaleString("es-CL")} pesos. ${product.description}`);
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
          <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
        </div>

        <div className="p-4 space-y-4">
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <h1 className="text-2xl font-bold text-foreground">{product.name}</h1>
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-0.5">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star key={s} className={`w-4 h-4 ${s <= Math.round(product.rating) ? "text-favorite fill-favorite" : "text-muted"}`} />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">{product.rating} ({product.reviews} reseñas)</span>
              </div>
            </div>
            <button
              onClick={() => toggleFavorite(product.id)}
              className={`w-12 h-12 rounded-xl flex items-center justify-center border-2 transition-all ${isFav ? "bg-favorite border-favorite text-favorite-foreground" : "bg-card border-border text-muted-foreground hover:bg-muted"}`}
              aria-label={isFav ? "Quitar de favoritos" : "Agregar a favoritos"}
            >
              <Heart className="w-6 h-6" fill={isFav ? "currentColor" : "none"} />
            </button>
          </div>

          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold text-primary">${product.price.toLocaleString("es-CL")}</span>
            <span className="text-sm text-muted-foreground line-through">
              ${(product.price * 1.3).toLocaleString("es-CL")}
            </span>
            <span className="text-sm font-bold text-destructive">-30%</span>
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

          <div className="flex items-center gap-2">
            <button
              onClick={() => speak(`${product.name}. ${product.description}`)}
              className="w-12 h-12 rounded-xl border-2 border-border flex items-center justify-center text-muted-foreground hover:bg-muted transition-all"
              aria-label="Escuchar descripción"
            >
              <Volume2 className="w-6 h-6" />
            </button>

            {cartItem ? (
              <div className="flex-1 flex items-center gap-3 bg-card border-2 border-primary rounded-xl px-4 py-3">
                <button
                  onClick={() => updateQty(product.id, -1)}
                  className="w-9 h-9 rounded-lg bg-muted flex items-center justify-center text-foreground active:bg-muted/70"
                  aria-label="Disminuir cantidad"
                >
                  <Minus className="w-5 h-5" />
                </button>
                <span className="flex-1 text-center font-bold text-lg text-foreground">{cartItem.qty}</span>
                <button
                  onClick={() => updateQty(product.id, 1)}
                  className="w-9 h-9 rounded-lg bg-primary text-primary-foreground flex items-center justify-center active:bg-primary-hover"
                  aria-label="Aumentar cantidad"
                >
                  <Plus className="w-5 h-5" />
                </button>
              </div>
            ) : (
              <button
                onClick={() => addToCart(product)}
                className="flex-1 flex items-center justify-center gap-2 bg-primary text-primary-foreground font-bold py-4 px-6 rounded-xl hover:bg-primary-hover transition-all active:scale-[0.97]"
                aria-label="Agregar al carrito"
              >
                <ShoppingCart className="w-6 h-6" />
                Agregar al carrito
              </button>
            )}
          </div>

          {cartItem && (
            <button
              onClick={() => addToCart(product)}
              className="w-full py-3 rounded-xl bg-primary text-primary-foreground font-bold hover:bg-primary-hover transition-all active:scale-[0.97]"
            >
              Agregar otro
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
