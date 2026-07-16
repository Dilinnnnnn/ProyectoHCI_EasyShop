import { useCallback } from "react";
import { AppContextValue, Order } from "../context/AppContext";
import { products, searchProducts, categories } from "../data/products";

type AppActions = Pick<AppContextValue, "navigate" | "goBack" | "selectCategory" | "selectProduct" | "addToCart" | "setSearch" | "addRecentSearch" | "setCart" | "addOrder" | "setPaymentMethod" | "setPaymentStep" | "state">;

const accents: Record<string, string> = {
  á: "a", é: "e", í: "i", ó: "o", ú: "u", ü: "u", ñ: "n",
};

function normalize(s: string) {
  return s.toLowerCase().replace(/[áéíóúüñ]/g, (c) => accents[c] || c);
}

export function useVoiceCommands(actions: AppActions) {
  const processCommand = useCallback(
    (transcript: string) => {
      const cmd = normalize(transcript.trim());
      const words = cmd.split(/\s+/);

      // Helper: find matching category in command
      const findCategory = () => {
        for (const cat of categories) {
          if (cmd.includes(normalize(cat.label)) || cmd.includes(cat.id)) {
            return cat;
          }
        }
        return null;
      };

      // ─── Search ("buscar zapatillas", "buscar tecnología") ──────────────
      if (cmd.startsWith("buscar ") || cmd.startsWith("encontrar ") || cmd.startsWith("quisar ")) {
        const queryRaw = transcript.replace(/^(buscar|encontrar|quisar)\s+/i, "").replace(/[^a-záéíóúüñ0-9\s]+$/i, "").trim();
        const queryNorm = normalize(queryRaw);
        // If query matches a category, navigate to that category
        for (const cat of categories) {
          if (queryNorm.includes(normalize(cat.label)) || queryNorm.includes(cat.id)) {
            actions.selectCategory(cat.id);
            return `Mostrando ${cat.label}`;
          }
        }
        // Otherwise, do a text search
        actions.setSearch(queryRaw);
        actions.addRecentSearch(queryRaw);
        actions.navigate("product-list");
        return `Buscando "${queryRaw}"`;
      }

      // ─── Categories ("abrir tecnología", "mostrar ropa", etc) ──────────
      const categoryTrigger = words.find(w =>
        ["mostrar", "ver", "ir", "abrir", "categoria", "categoría"].includes(w)
      );
      if (categoryTrigger) {
        const cat = findCategory();
        if (cat) {
          actions.selectCategory(cat.id);
          return `Mostrando ${cat.label}`;
        }
      }

      if (cmd.includes("categorias") || cmd.includes("categorías")) {
        actions.navigate("categories");
        return "Mostrando categorías";
      }

      // ─── Add to cart ──────────────────────────────────────────────────
      if (cmd.includes("agregar") || cmd.includes("añadir") || cmd.includes("poner en carrito")) {
        // Look for a matching product name in the command
        for (const p of products) {
          if (cmd.includes(normalize(p.name))) {
            actions.addToCart(p);
            return `Agregado: ${p.name}`;
          }
        }
        // If no product name matched, add first visible product
        const currentCategory = actions.state.selectedCategoryId;
        const available = currentCategory
          ? products.filter(p => p.category === currentCategory)
          : products;
        if (available.length > 0) {
          actions.addToCart(available[0]);
          return `Agregado: ${available[0].name}`;
        }
        if (products.length > 0) {
          actions.addToCart(products[0]);
          return `Agregado: ${products[0].name}`;
        }
      }

      // ─── Payment flow ──────────────────────────────────────────────────
      if (cmd.includes("tarjeta") || cmd.includes("debito") || cmd.includes("credito") || cmd.includes("visa") || cmd.includes("mastercard")) {
        actions.setPaymentMethod("card");
        if (actions.state.screen !== "payment") actions.navigate("payment");
        return "Seleccionado pago con tarjeta";
      }
      if (cmd.includes("efectivo") || cmd.includes("contra entrega") || cmd.includes("contraentrega")) {
        actions.setPaymentMethod("cash");
        if (actions.state.screen !== "payment") actions.navigate("payment");
        return "Seleccionado pago en efectivo";
      }
      if (cmd.includes("transferencia") || cmd.includes("banco")) {
        actions.setPaymentMethod("transfer");
        if (actions.state.screen !== "payment") actions.navigate("payment");
        return "Seleccionado pago por transferencia";
      }

      if (cmd === "siguiente" || cmd.includes("siguiente paso") || cmd.includes("siguiente")) {
        if (actions.state.screen === "payment") {
          const next = actions.state.paymentStep + 1;
          if (next <= 2) {
            actions.setPaymentStep(next);
            return `Paso siguiente`;
          }
        } else {
          actions.navigate("payment");
          return "Continuando al pago";
        }
      }

      if (cmd.includes("atras") || cmd.includes("anterior") || cmd.includes("volver atras") || cmd === "volver") {
        if (actions.state.screen === "payment") {
          const prev = actions.state.paymentStep - 1;
          if (prev >= 0) {
            actions.setPaymentStep(prev);
            return `Paso anterior`;
          }
        }
        actions.goBack();
        return "Volviendo atrás";
      }

      // ─── Navigation ───────────────────────────────────────────────────
      if (cmd.includes("abrir carrito") || cmd.includes("ver carrito") || cmd.includes("mi carrito") || cmd === "carrito") {
        actions.navigate("cart");
        return "Abriendo carrito";
      }

      if (cmd.includes("ir al pago") || cmd.includes("pagar") || cmd.includes("continuar compra")) {
        actions.navigate("payment");
        return "Continuando al pago";
      }

      if (cmd.includes("confirmar compra") || cmd.includes("confirmar pedido") || cmd === "confirmar") {
        if (actions.state.screen === "payment" && actions.state.paymentStep === 2) {
          const items = actions.state.cartItems;
          if (items.length > 0) {
            const total = items.reduce((sum, i) => sum + i.price * i.qty, 0);
            const order: Order = {
              id: `E${Date.now().toString(36).toUpperCase()}`,
              items: items.map((i) => ({ id: i.id, name: i.name, price: i.price, qty: i.qty })),
              total,
              date: new Date().toISOString(),
              status: "Procesando",
            };
            actions.addOrder(order);
            actions.setPaymentStep(0);
            actions.setPaymentMethod("card");
            actions.navigate("confirmation");
            return "Compra confirmada";
          }
          return "No hay productos en el carrito";
        }
        actions.navigate("payment");
        return "Continuando al pago";
      }

      if (cmd.includes("volver al inicio") || cmd.includes("pantalla principal") || cmd === "inicio") {
        actions.navigate("home");
        return "Volviendo al inicio";
      }

      if (cmd.includes("perfil") || cmd.includes("mi perfil")) {
        actions.navigate("profile");
        return "Abriendo perfil";
      }

      if (cmd.includes("pedidos") || cmd.includes("historial") || cmd.includes("mis pedidos")) {
        actions.navigate("history");
        return "Mostrando pedidos";
      }

      if (cmd.includes("accesibilidad") || cmd.includes("configuracion")) {
        actions.navigate("accessibility");
        return "Abriendo accesibilidad";
      }

      // ─── Repurchase ───────────────────────────────────────────────────
      if (cmd.includes("comprar de nuevo") || cmd.includes("repetir") || cmd.includes("ultimo pedido")) {
        const lastOrder = actions.state.orderHistory[0];
        if (lastOrder) {
          lastOrder.items.forEach((item) => {
            const product = products.find((p) => p.id === item.id);
            if (product) actions.addToCart(product, item.qty);
          });
          actions.navigate("cart");
          return "Agregando productos de tu último pedido";
        }
        return "No se encontró un pedido anterior";
      }

      // ─── Product detail ───────────────────────────────────────────────
      if (cmd.includes("detalle") || cmd.includes("mas informacion") || cmd.includes("más información")) {
        actions.navigate("product-detail");
        return "Mostrando detalle del producto";
      }

      return null;
    },
    [actions]
  );

  return { processCommand };
}
