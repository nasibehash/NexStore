export const dynamic = "force-dynamic";

import { fetchProductById } from '@/lib/api';
import Image from 'next/image';
import AddToCartButton from '@/components/AddToCartButton';

export default async function ProductDetailPage({ params }: { params: { id: string } }) {
  const product = await fetchProductById(params.id);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-6">
        <div className="md:w-1/2">
          <Image
            src={product.image}
            alt={product.title}
            width={400}
            height={400}
            className="object-contain w-full h-auto"
          />
        </div>
        <div className="md:w-1/2">
          <h2 className="text-2xl font-bold mb-2">{product.title}</h2>
          <p className="text-gray-600 mb-4">{product.description}</p>
          <p className="text-xl font-semibold text-green-600 mb-6">
            ${product.price}
          </p>
          <AddToCartButton product={product} />
        </div>
      </div>
    </div>
  );
}
