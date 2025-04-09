'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useCartStore } from '@/features/cart/useCartStore';

export default function CartPage() {
  const {
    items,
    removeFromCart,
    clearCart,
    totalItems,
    totalPrice,
  } = useCartStore();

  if (items.length === 0)
    return (
      <div className="text-center py-20">
        <h2 className="text-xl font-semibold">Your shopping cart is empty.🛒</h2>
        <Link href="/" className="text-blue-600 underline mt-4 block">
          Return to the store
        </Link>
      </div>
    );

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">🛒 Cart</h1>

      <ul className="space-y-6">
        {items.map((item) => (
          <li
            key={item.id}
            className="flex items-center justify-between border-b pb-4"
          >
            <div className="flex items-center gap-4">
              <Image
                src={item.image}
                alt={item.title}
                width={60}
                height={60}
                className="object-contain"
              />
              <div>
                <h3 className="font-semibold">{item.title}</h3>
                <p className="text-sm text-gray-500">
                  {item.quantity} × {item.price.toLocaleString()} Toman
                </p>
              </div>
            </div>
            <button
              className="text-red-500 hover:text-red-700"
              onClick={() => removeFromCart(item.id)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>

      <div className="mt-8 flex justify-between items-center">
        <div>
          <p>Total number: {totalItems()} piece</p>
          <p className="font-bold">
            Total: {totalPrice().toLocaleString()} Tomans
          </p>
        </div>
        <div className="flex gap-3">
          <button
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
            onClick={clearCart}
          >
            Empty basket
          </button>
          <Link
            href="/checkout"
            className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition"
          >
            Order registration
          </Link>
        </div>
      </div>
    </div>
  );
}
