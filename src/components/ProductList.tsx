'use client';

import {useState} from 'react';
import {useQuery} from '@tanstack/react-query';

import ProductCard from './ProductCard';
import Input from './Input';

import {Product} from '@/types/product.type';
import {fetchCategories} from "@/lib/api";

export default function ProductList({products}: { products: Product[] }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [category, setCategory] = useState('all');
    const [sortOrder, setSortOrder] = useState('default');

    // const {data: products = [],isLoading} = useQuery({
    //     queryKey: ['products'],
    //     queryFn: fetchCategories,
    // });

    const {data: categories = []} = useQuery({
        queryKey: ['categories'],
        queryFn: fetchCategories,
    })
    const filteredProducts = products.filter((product: Product) => {
        const matchesQuery = product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            product.description.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = category === 'all' || product.category === category;
        return matchesQuery && matchesCategory;
    });

    const sortedProducts = [...filteredProducts].sort((a, b) => {
        if (sortOrder === 'asc') return a.price - b.price;
        if (sortOrder === 'desc') return b.price - a.price;
        if (sortOrder === 'popular') return b.rating.rate - a.rating.rate;
        if (sortOrder === 'newest') return b.id - a.id;
        return 0
    });


    return (
        <>
            <Input
                type="text"
                className="w-full p-2 border rounded mb-4"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div className="flex mb-4 gap-6">
                <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="px-4 py-2 border rounded"
                >
                    <option value="all">All</option>
                    {categories.map((category: string) => (
                        <option key={category} value={category}>{category}</option>
                    ))}
                </select>
                <select
                    value={sortOrder}
                    onChange={(e) => setSortOrder(e.target.value)}
                    className="px-4 py-2 border rounded">
                    <option value="newest">Newest</option>
                    <option value="asc">Lowest</option>
                    <option value="desc">Highest</option>
                    <option value="popular">Popular</option>
                </select>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {sortedProducts.map((product) => (
                    <ProductCard key={product.id} product={product}/>
                ))}
            </div>
            {filteredProducts.length === 0 && (
                <p className="text-center text-gray-500 col-span-full mt-8">Not found!</p>
            )}
        </>
    );
}
