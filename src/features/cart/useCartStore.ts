import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type Product = {
  id: number;
  title: string;
  price: number;
  image: string;
  quantity: number;
};

type CartStore = {
  items: Product[];
  addToCart: (product: Omit<Product, 'quantity'>) => void;
  getItemCount: () => number;
  removeFromCart: (id: number) => void;
  clearCart: () => void;
  totalItems: () => number;
  totalPrice: () => number;
};

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      addToCart: (product) => {
        const existing = get().items.find((p) => p.id === product.id);
        if (existing) {
          set({
            items: get().items.map((p) =>
              p.id === product.id ? {...p, quantity: p.quantity + 1} : p
            ),
          });
        } else {
          set({
            items: [...get().items, {...product, quantity: 1}],
          });
        }
      },
      getItemCount: () => get().items.length,
      removeFromCart: (id) => {
        set({items: get().items.filter((p) => p.id !== id)});
      },
      clearCart: () => set({items: []}),
      totalItems: () =>
        get().items.reduce((acc, item) => acc + item.quantity, 0),
      totalPrice: () =>
        get().items.reduce((acc, item) => acc + item.quantity * item.price, 0),
    }),
    {
      name: 'cart-storage',
    }
  )
);
