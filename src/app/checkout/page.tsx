'use client';

import { useRouter } from 'next/navigation';
import { useCartStore } from '@/features/cart/useCartStore';

export default function CheckoutPage() {
  const {items, totalItems, totalPrice, clearCart} = useCartStore();
  const router = useRouter();

  const handleConfirm = () => {
    clearCart();
    alert('سفارش شما با موفقیت ثبت شد ✅');
    router.push('/');
  };

  if (items.length === 0) {
    return (
      <div className="text-center py-20">
        <h2 className="text-xl font-semibold">سبد خریدت خالیه</h2>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">تأیید نهایی سفارش</h1>
      <ul className="space-y-3 mb-6">
        {items.map((item) => (
          <li key={item.id} className="flex justify-between">
            <span>
              {item.quantity} × {item.title}
            </span>
            <span>{(item.quantity * item.price).toLocaleString()} تومان</span>
          </li>
        ))}
      </ul>

      <div className="flex justify-between font-bold mb-4">
        <span>جمع کل:</span>
        <span>{totalPrice().toLocaleString()} تومان</span>
      </div>

      <button
        onClick={handleConfirm}
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
      >
        تأیید و پرداخت
      </button>
    </div>
  );
}
