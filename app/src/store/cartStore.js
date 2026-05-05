import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useCartStore = create(
  persist(
    (set, get) => ({
      cart: [],
      isDrawerOpen: false,

      setDrawerOpen: (open) => set({ isDrawerOpen: open }),

      addItem: (product) => {
        set((state) => {
          const existing = state.cart.find((i) => i.id === product.id);
          if (existing) {
            return {
              cart: state.cart.map((i) =>
                i.id === product.id ? { ...i, qty: i.qty + 1 } : i
              ),
            };
          }
          return {
            cart: [
              ...state.cart,
              {
                id: product.id,
                name: product.name,
                price: product.price,
                image: product.image,
                unitLabel: product.unitLabel || null,
                qty: 1,
              },
            ],
          };
        });
      },

      removeItem: (id) => {
        set((state) => ({
          cart: state.cart.filter((i) => i.id !== id),
        }));
      },

      updateQuantity: (id, qty) => {
        if (qty <= 0) {
          get().removeItem(id);
          return;
        }
        set((state) => ({
          cart: state.cart.map((i) => (i.id === id ? { ...i, qty } : i)),
        }));
      },

      clearCart: () => set({ cart: [] }),

      cartCount: () => get().cart.reduce((sum, i) => sum + i.qty, 0),
      subtotal: () => get().cart.reduce((sum, i) => sum + i.price * i.qty, 0),
    }),
    {
      name: "delicate-cart",
    }
  )
);
