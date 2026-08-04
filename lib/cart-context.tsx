"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  ReactNode,
} from "react";

interface CartContextValue {
  count: number;
  addToBag: (quantity?: number) => void;
  reset: () => void;
}

const CartContext = createContext<CartContextValue | undefined>(undefined);
const STORAGE_KEY = "cart-count";

export function CartProvider({ children }: { children: ReactNode }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    try {
      const saved = Number(localStorage.getItem(STORAGE_KEY));
      if (Number.isFinite(saved) && saved > 0) setCount(saved);
    } catch {
      /* ignore */
    }
  }, []);

  const persist = useCallback((next: number) => {
    setCount(next);
    try {
      localStorage.setItem(STORAGE_KEY, String(next));
    } catch {
      /* ignore storage failures */
    }
  }, []);

  const addToBag = useCallback(
    (quantity = 1) => {
      // Edge case: guard against NaN / negative quantities from inputs.
      const q = Number.isFinite(quantity) && quantity > 0 ? Math.floor(quantity) : 1;
      persist(count + q);
    },
    [count, persist]
  );

  const reset = useCallback(() => persist(0), [persist]);

  return (
    <CartContext.Provider value={{ count, addToBag, reset }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within a CartProvider");
  return ctx;
}
