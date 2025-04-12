'use client';

import { useCartStore } from '@/features/cart/useCartStore';
import { useRouter } from 'next/navigation';

import { Product } from '@/types/product.type';

export default function AddToCartButton({product}: { product: Product }) {
  const addToCart = useCartStore((state) => state.addToCart);
  const router = useRouter();

  const handleAdd = () => {
    addToCart(product);
    router.push('/');
  };

  return (
    <button
      onClick={handleAdd}
      className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition cursor-pointer"
    >
      Add to cart
    </button>
  );
}
