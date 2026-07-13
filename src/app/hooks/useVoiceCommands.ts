import { useCallback } from "react";
import { AppContextValue } from "../context/AppContext";
import { products, searchProducts, categories } from "../data/products";

type AppActions = Pick<AppContextValue, "navigate" | "selectCategory" | "selectProduct" | "addToCart" | "setSearch" | "addRecentSearch" | "setCart" | "addOrder" | "state">;

export function useVoiceCommands(actions: AppActions) {
  const processCommand = useCallback(
    (transcript: string) => {
      const cmd = transcript.toLowerCase().trim();

      // Search commands
      if (cmd.startsWith("buscar ") || cmd.startsWith("encontrar ") || cmd.startsWith("quisar ")) {
        const query = cmd.replace(/^(buscar|encontrar|quisar)\s+/, "");
        actions.setSearch(query);
        actions.addRecentSearch(query);
        actions.navigate("product-list");
        return `Buscando "${query}"`;
      }

      // Category commands
      if (cmd.includes("mostrar") || cmd.includes("ver") || cmd.includes("ir a")) {
        for (const cat of categories) {
          if (cmd.includes(cat.label.toLowerCase()) || cmd.includes(cat.id)) {
            actions.selectCategory(cat.id);
            return `Mostrando ${cat.label}`;
          }
        }
      }

      // Show all categories
      if (cmd.includes("categorías") || cmd.includes("categorias")) {
        actions.navigate("categories");
        return "Mostrando categorías";
      }

      // Add product commands
      if (cmd.includes("agregar") || cmd.includes("añadir") || cmd.includes("poner en carrito")) {
        const firstMatch = cmd.includes("primer") || cmd.includes("primero");
        if (firstMatch && products.length > 0) {
          actions.addToCart(products[0]);
          return `Agregado: ${products[0].name}`;
        }
        for (const p of products) {
          if (cmd.includes(p.name.toLowerCase())) {
            actions.addToCart(p);
            return `Agregado: ${p.name}`;
          }
        }
        if (products.length > 0) {
          actions.addToCart(products[0]);
          return `Agregado: ${products[0].name}`;
        }
      }

      // Navigation commands
      if (cmd.includes("abrir carrito") || cmd.includes("ver carrito") || cmd.includes("mi carrito")) {
        actions.navigate("cart");
        return "Abriendo carrito";
      }

      if (cmd.includes("continuar") || cmd.includes("ir al pago") || cmd.includes("pagar")) {
        actions.navigate("payment");
        return "Continuando al pago";
      }

      if (cmd.includes("confirmar") || cmd.includes("comprar") || cmd.includes("finalizar")) {
        actions.navigate("payment");
        return "Confirmando compra";
      }

      if (cmd.includes("volver al inicio") || cmd.includes("inicio") || cmd.includes("pantalla principal")) {
        actions.navigate("home");
        return "Volviendo al inicio";
      }

      if (cmd.includes("perfil")) {
        actions.navigate("profile");
        return "Abriendo perfil";
      }

      if (cmd.includes("pedidos") || cmd.includes("historial")) {
        actions.navigate("history");
        return "Mostrando pedidos";
      }

      if (cmd.includes("accesibilidad") || cmd.includes("configuración")) {
        actions.navigate("accessibility");
        return "Abriendo accesibilidad";
      }

      // Repurchase
      if (cmd.includes("comprar de nuevo") || cmd.includes("repetir") || cmd.includes("último pedido")) {
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

      // Product detail
      if (cmd.includes("detalle") || cmd.includes("más información")) {
        actions.navigate("product-detail");
        return "Mostrando detalle del producto";
      }

      return null;
    },
    [actions]
  );

  return { processCommand };
}
