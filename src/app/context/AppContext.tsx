import React, { createContext, useContext, useReducer, useCallback, useEffect } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { Product } from "../data/products";

// ─── Types ────────────────────────────────────────────────────────────────────

export type Screen =
  | "splash"
  | "home"
  | "categories"
  | "product-list"
  | "product-detail"
  | "cart"
  | "payment"
  | "confirmation"
  | "profile"
  | "history"
  | "accessibility";

export interface CartItem {
  id: number;
  name: string;
  price: number;
  qty: number;
}

export interface OrderItem {
  id: number;
  name: string;
  price: number;
  qty: number;
}

export interface Order {
  id: string;
  items: OrderItem[];
  total: number;
  date: string;
  status: "Entregado" | "En camino" | "Procesando";
}

export interface AccessibilitySettings {
  textSize: "small" | "medium" | "large" | "xlarge";
  buttonSize: "normal" | "large";
  highContrast: boolean;
  darkMode: boolean;
  voiceCommands: boolean;
  ttsEnabled: boolean;
  gestureSensitivity: "low" | "medium" | "high";
  oneHandMode: boolean;
  hapticEnabled: boolean;
  readingSpeed: "slow" | "normal" | "fast";
  tutorialSeen: boolean;
}

export interface AppState {
  screen: Screen;
  previousScreen: Screen | null;
  selectedProductId: number | null;
  selectedCategoryId: string | null;
  searchQuery: string;
  cartItems: CartItem[];
  favorites: number[];
  orderHistory: Order[];
  recentSearches: string[];
  accessibility: AccessibilitySettings;
}

// ─── Actions ──────────────────────────────────────────────────────────────────

type Action =
  | { type: "NAVIGATE"; screen: Screen }
  | { type: "GO_BACK" }
  | { type: "SELECT_PRODUCT"; productId: number }
  | { type: "SELECT_CATEGORY"; categoryId: string }
  | { type: "SET_SEARCH"; query: string }
  | { type: "ADD_TO_CART"; product: Product; qty?: number }
  | { type: "REMOVE_FROM_CART"; productId: number }
  | { type: "UPDATE_QTY"; productId: number; delta: number }
  | { type: "TOGGLE_FAVORITE"; productId: number }
  | { type: "ADD_ORDER"; order: Order }
  | { type: "ADD_RECENT_SEARCH"; query: string }
  | { type: "SET_ACCESSIBILITY"; settings: Partial<AccessibilitySettings> }
  | { type: "SET_CART"; items: CartItem[] };

// ─── Initial State ────────────────────────────────────────────────────────────

const defaultAccessibility: AccessibilitySettings = {
  textSize: "medium",
  buttonSize: "normal",
  highContrast: false,
  darkMode: false,
  voiceCommands: true,
  ttsEnabled: true,
  gestureSensitivity: "medium",
  oneHandMode: false,
  hapticEnabled: true,
  readingSpeed: "normal",
  tutorialSeen: false,
};

const defaultState: AppState = {
  screen: "splash",
  previousScreen: null,
  selectedProductId: null,
  selectedCategoryId: null,
  searchQuery: "",
  cartItems: [],
  favorites: [],
  orderHistory: [],
  recentSearches: [],
  accessibility: defaultAccessibility,
};

// ─── Reducer ──────────────────────────────────────────────────────────────────

function appReducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case "NAVIGATE":
      return {
        ...state,
        previousScreen: state.screen,
        screen: action.screen,
      };
    case "GO_BACK":
      return {
        ...state,
        screen: state.previousScreen || "home",
        previousScreen: null,
      };
    case "SELECT_PRODUCT":
      return { ...state, previousScreen: state.screen, selectedProductId: action.productId, screen: "product-detail" };
    case "SELECT_CATEGORY":
      return { ...state, previousScreen: state.screen, selectedCategoryId: action.categoryId, screen: "product-list" };
    case "SET_SEARCH":
      return { ...state, searchQuery: action.query };
    case "ADD_TO_CART": {
      const existing = state.cartItems.find((i) => i.id === action.product.id);
      if (existing) {
        return {
          ...state,
          cartItems: state.cartItems.map((i) =>
            i.id === action.product.id ? { ...i, qty: i.qty + (action.qty ?? 1) } : i
          ),
        };
      }
      return {
        ...state,
        cartItems: [
          ...state.cartItems,
          {
            id: action.product.id,
            name: action.product.name,
            price: action.product.price,
            qty: action.qty ?? 1,
          },
        ],
      };
    }
    case "REMOVE_FROM_CART":
      return {
        ...state,
        cartItems: state.cartItems.filter((i) => i.id !== action.productId),
      };
    case "UPDATE_QTY": {
      return {
        ...state,
        cartItems: state.cartItems
          .map((i) =>
            i.id === action.productId ? { ...i, qty: Math.max(0, i.qty + action.delta) } : i
          )
          .filter((i) => i.qty > 0),
      };
    }
    case "TOGGLE_FAVORITE": {
      const isFav = state.favorites.includes(action.productId);
      return {
        ...state,
        favorites: isFav
          ? state.favorites.filter((id) => id !== action.productId)
          : [...state.favorites, action.productId],
      };
    }
    case "ADD_ORDER":
      return {
        ...state,
        orderHistory: [action.order, ...state.orderHistory],
      };
    case "ADD_RECENT_SEARCH": {
      const searches = [action.query, ...state.recentSearches.filter((s) => s !== action.query)].slice(0, 8);
      return { ...state, recentSearches: searches };
    }
    case "SET_ACCESSIBILITY":
      return {
        ...state,
        accessibility: { ...state.accessibility, ...action.settings },
      };
    case "SET_CART":
      return { ...state, cartItems: action.items };
    default:
      return state;
  }
}

// ─── Context ──────────────────────────────────────────────────────────────────

export interface AppContextValue {
  state: AppState;
  navigate: (screen: Screen) => void;
  goBack: () => void;
  selectProduct: (productId: number) => void;
  selectCategory: (categoryId: string) => void;
  setSearch: (query: string) => void;
  addToCart: (product: Product, qty?: number) => void;
  removeFromCart: (productId: number) => void;
  updateQty: (productId: number, delta: number) => void;
  toggleFavorite: (productId: number) => void;
  addOrder: (order: Order) => void;
  addRecentSearch: (query: string) => void;
  setAccessibility: (settings: Partial<AccessibilitySettings>) => void;
  setCart: (items: CartItem[]) => void;
}

const AppContext = createContext<AppContextValue | null>(null);

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within AppProvider");
  return ctx;
}

// ─── Provider ─────────────────────────────────────────────────────────────────

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [savedAccessibility, setSavedAccessibility] = useLocalStorage<AccessibilitySettings>(
    "easyshop-accessibility",
    defaultAccessibility
  );
  const [savedCart, setSavedCart] = useLocalStorage<CartItem[]>(
    "easyshop-cart",
    defaultState.cartItems
  );
  const [savedFavorites, setSavedFavorites] = useLocalStorage<number[]>(
    "easyshop-favorites",
    []
  );
  const [savedOrders, setSavedOrders] = useLocalStorage<Order[]>(
    "easyshop-orders",
    []
  );
  const [savedSearches, setSavedSearches] = useLocalStorage<string[]>(
    "easyshop-searches",
    defaultState.recentSearches
  );
  const [savedTutorial, setSavedTutorial] = useLocalStorage<boolean>(
    "easyshop-tutorial-seen",
    false
  );

  const [state, dispatch] = useReducer(appReducer, {
    ...defaultState,
    accessibility: { ...defaultAccessibility, ...savedAccessibility, tutorialSeen: savedTutorial },
    cartItems: savedCart,
    favorites: savedFavorites,
    orderHistory: savedOrders,
    recentSearches: savedSearches,
  });

  // Sync to localStorage
  useEffect(() => setSavedAccessibility(state.accessibility), [state.accessibility]);
  useEffect(() => setSavedCart(state.cartItems), [state.cartItems]);
  useEffect(() => setSavedFavorites(state.favorites), [state.favorites]);
  useEffect(() => setSavedOrders(state.orderHistory), [state.orderHistory]);
  useEffect(() => setSavedSearches(state.recentSearches), [state.recentSearches]);
  useEffect(() => setSavedTutorial(state.accessibility.tutorialSeen), [state.accessibility.tutorialSeen]);

  const navigate = useCallback((screen: Screen) => dispatch({ type: "NAVIGATE", screen }), []);
  const goBack = useCallback(() => dispatch({ type: "GO_BACK" }), []);
  const selectProduct = useCallback((productId: number) => dispatch({ type: "SELECT_PRODUCT", productId }), []);
  const selectCategory = useCallback((categoryId: string) => dispatch({ type: "SELECT_CATEGORY", categoryId }), []);
  const setSearch = useCallback((query: string) => dispatch({ type: "SET_SEARCH", query }), []);
  const addToCart = useCallback((product: Product, qty?: number) => dispatch({ type: "ADD_TO_CART", product, qty }), []);
  const removeFromCart = useCallback((productId: number) => dispatch({ type: "REMOVE_FROM_CART", productId }), []);
  const updateQty = useCallback((productId: number, delta: number) => dispatch({ type: "UPDATE_QTY", productId, delta }), []);
  const toggleFavorite = useCallback((productId: number) => dispatch({ type: "TOGGLE_FAVORITE", productId }), []);
  const addOrder = useCallback((order: Order) => dispatch({ type: "ADD_ORDER", order }), []);
  const addRecentSearch = useCallback((query: string) => dispatch({ type: "ADD_RECENT_SEARCH", query }), []);
  const setAccessibility = useCallback((settings: Partial<AccessibilitySettings>) => dispatch({ type: "SET_ACCESSIBILITY", settings }), []);
  const setCart = useCallback((items: CartItem[]) => dispatch({ type: "SET_CART", items }), []);

  return (
    <AppContext.Provider
      value={{
        state,
        navigate,
        goBack,
        selectProduct,
        selectCategory,
        setSearch,
        addToCart,
        removeFromCart,
        updateQty,
        toggleFavorite,
        addOrder,
        addRecentSearch,
        setAccessibility,
        setCart,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
