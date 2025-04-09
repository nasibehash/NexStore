'use client';

import Link from 'next/link';
import { ShoppingCart } from 'lucide-react';
import { useCartStore } from '@/features/cart/useCartStore';

export default function Header() {
  const itemCount = useCartStore((state) => state.getItemCount());

  return (
    <header className="bg-white shadow-md py-4 px-6 flex justify-between items-center">
      <Link href="/" className="text-xl font-bold text-blue-600">
        NexStore
      </Link>

      <Link href="/cart" className="relative">
        <ShoppingCart size={24}/>
        {itemCount > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
            {itemCount}
          </span>
        )}
      </Link>
    </header>
  );
}
