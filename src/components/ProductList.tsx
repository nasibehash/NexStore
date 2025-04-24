'use client';

import {useState} from 'react';

import ProductCard from './ProductCard';

import {Product} from '@/types/product.type';

export default function ProductList({products}: { products: Product[] }) {
    const [searchQuery, setSearchQuery] = useState('');

    const filteredProducts = products.filter((product: Product) => {
        return product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            product.description.toLowerCase().includes(searchQuery.toLowerCase());
    });

    return (
        <>
            <input
                type="text"
                className="w-full p-2 border rounded mb-4"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
            />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {filteredProducts.map((product) => (
                    <ProductCard key={product.id} product={product}/>
                ))}
            </div>
            {filteredProducts.length === 0 && (
                <p className="text-center text-gray-500 col-span-full mt-8">Not found!</p>
            )}
        </>
    );
}
