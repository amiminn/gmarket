import { create } from "zustand";
import { persist } from "zustand/middleware";

interface StoreCartState {
  cart: number[];
  addCart: (id: number) => void;
  removeCart: (id: number) => void;
  toggleCart: (id: number) => void;
  isCart: (id: number) => boolean;
  resetCart: () => void;
}

export const useCartStore = create<StoreCartState>()(
  persist(
    (set, get) => ({
      cart: [],

      addCart: (id) =>
        set({
          cart: Array.from(new Set([...get().cart.map(Number), Number(id)])),
        }),

      removeCart: (id) =>
        set({
          cart: get()
            .cart.map(Number)
            .filter((item) => item !== Number(id)),
        }),

      toggleCart: (id) => {
        const cart = get().cart.map(Number);

        if (cart.includes(id)) {
          set({ cart: cart.filter((x) => x !== Number(id)) });
        } else {
          set({ cart: [...cart, Number(id)] });
        }
      },

      isCart: (id) => get().cart.map(Number).includes(Number(id)),

      resetCart: () => set({ cart: [] }),
    }),
    {
      name: "cart-storage",
    }
  )
);

interface StoreFavState {
  fav: number[]; // Menyimpan ID product
  addFav: (id: number) => void;
  removeFav: (id: number) => void;
  toggleFav: (id: number) => void;
  isFav: (id: number) => boolean;
  resetFav: () => void;
}

export const useFavStore = create<StoreFavState>()(
  persist(
    (set, get) => ({
      fav: [],
      addFav: (id) =>
        set({
          fav: Array.from(new Set([...get().fav, id])),
        }),

      removeFav: (id) =>
        set({
          fav: get().fav.filter((item) => item !== id),
        }),

      toggleFav: (id) => {
        const { fav } = get();
        if (fav.includes(id)) {
          set({ fav: fav.filter((x) => x !== id) });
        } else {
          set({ fav: [...fav, id] });
        }
      },

      isFav: (id) => get().fav.includes(id),

      resetFav: () => set({ fav: [] }),
    }),

    {
      name: "fav-storage",
    }
  )
);
