import Link from 'next/link';
import { Product } from '@/types/product.type';

export default function ProductCard({product}: { product: Product }) {
  return (
    <div className="border rounded-lg p-4 shadow-sm hover:shadow-md transition">
      <Link href={`/product/${product.id}`}>
        <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden">
          <img
            src={product.image}
            alt={product.title}
            className="object-contain h-40 w-full"
          />
        </div>
        <h3 className="mt-2 font-semibold text-sm line-clamp-2">{product.title}</h3>
        <p className="text-gray-700 font-bold mt-1">${product.price}</p>
      </Link>
    </div>
  );
}
