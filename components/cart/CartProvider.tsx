"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

// Cart state is intentionally minimal — just what's ordered, not what it
// costs or is called. Prices/names are always resolved from `data/menu.ts`
// wherever the cart is displayed, and re-resolved server-side on checkout
// (see lib/actions/orders.ts), so an out-of-date localStorage cart can never
// smuggle in a stale price.
export type CartItem = {
  menuItemId: string;
  quantity: number;
  notes?: string;
};

type CartContextValue = {
  items: CartItem[];
  addItem: (menuItemId: string, quantity?: number) => void;
  removeItem: (menuItemId: string) => void;
  updateQuantity: (menuItemId: string, quantity: number) => void;
  updateNotes: (menuItemId: string, notes: string) => void;
  clearCart: () => void;
  totalItemCount: number;
};

const CartContext = createContext<CartContextValue | null>(null);
const STORAGE_KEY = "schnitzy-haus-cart";

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [hydrated, setHydrated] = useState(false);

  // Read any previously-saved cart once, on mount (client-only — cart never
  // needs to exist on the server). This has to run in an effect, one render
  // after the server-matching empty-array first paint, or the client's
  // initial render would mismatch the server-rendered HTML.
  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      // eslint-disable-next-line react-hooks/set-state-in-effect -- syncing from localStorage, an external store, is exactly what this effect is for
      if (raw) setItems(JSON.parse(raw));
    } catch {
      // Corrupt/blocked storage — just start with an empty cart.
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items, hydrated]);

  const value = useMemo<CartContextValue>(() => {
    const addItem: CartContextValue["addItem"] = (menuItemId, quantity = 1) => {
      setItems((prev) => {
        const existing = prev.find((item) => item.menuItemId === menuItemId);
        if (existing) {
          return prev.map((item) =>
            item.menuItemId === menuItemId
              ? { ...item, quantity: item.quantity + quantity }
              : item,
          );
        }
        return [...prev, { menuItemId, quantity }];
      });
    };

    const removeItem: CartContextValue["removeItem"] = (menuItemId) => {
      setItems((prev) => prev.filter((item) => item.menuItemId !== menuItemId));
    };

    const updateQuantity: CartContextValue["updateQuantity"] = (
      menuItemId,
      quantity,
    ) => {
      if (quantity <= 0) {
        removeItem(menuItemId);
        return;
      }
      setItems((prev) =>
        prev.map((item) =>
          item.menuItemId === menuItemId ? { ...item, quantity } : item,
        ),
      );
    };

    const updateNotes: CartContextValue["updateNotes"] = (menuItemId, notes) => {
      setItems((prev) =>
        prev.map((item) =>
          item.menuItemId === menuItemId ? { ...item, notes } : item,
        ),
      );
    };

    const clearCart = () => setItems([]);

    const totalItemCount = items.reduce((sum, item) => sum + item.quantity, 0);

    return {
      items,
      addItem,
      removeItem,
      updateQuantity,
      updateNotes,
      clearCart,
      totalItemCount,
    };
  }, [items]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a <CartProvider>.");
  }
  return context;
}
