'use client';

import {useState} from 'react';
import {useQuery} from '@tanstack/react-query';

import ProductCard from './ProductCard';
import Input from './Input';

import {Product} from '@/types/product.type';
import {fetchCategories, fetchProducts} from "@/lib/api";

export default function ProductList() {
    const [searchTerm, setSearchTerm] = useState('');
    const [category, setCategory] = useState('all');
    const [sortBy, setSortBy] = useState("newest");
    const [page, setPage] = useState(1);

    const {data, isLoading} = useQuery({
        queryKey: ["products", sortBy, page, category],
        queryFn: () => fetchProducts({sortBy: sortBy as any, page, category}),
    });

    const {data: categories = []} = useQuery({
        queryKey: ['categories'],
        queryFn: fetchCategories,
    })

    const products = data?.data || [];
    const total = data?.total || 0;
    const totalPages = Math.ceil(total / 8);

    const filtered = products.filter((product: Product) => {
            return product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                product.description.toLowerCase().includes(searchTerm.toLowerCase());
        }
    );

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
                    onChange={(e) => {
                        setCategory(e.target.value);
                        setPage(1);
                    }}
                    className="px-4 py-2 border rounded"
                >
                    <option value="all">All</option>
                    {categories.map((category: string) => (
                        <option key={category} value={category}>{category}</option>
                    ))}
                </select>
                <select
                    value={sortBy}
                    onChange={(e) => {
                        setSortBy(e.target.value);
                        setPage(1);
                    }}
                    className="px-4 py-2 border rounded">
                    <option value="newest">Newest</option>
                    <option value="desc">Lowest</option>
                    <option value="asc">Highest</option>
                    <option value="popular">Popular</option>
                </select>
            </div>

            {isLoading ? (
                <p>Loading...</p>
            ) : (
                <>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {filtered.map((product: Product) => (
                            <ProductCard key={product.id} product={product}/>
                        ))}
                    </div>

                    <div className="flex justify-center mt-6 gap-2">
                        {Array.from({length: totalPages}, (_, i) => (
                            <button
                                key={i}
                                onClick={() => setPage(i + 1)}
                                className={`px-3 py-1 rounded border ${
                                    page === i + 1 ? "bg-blue-600 text-white" : "bg-white"
                                }`}
                            >
                                {i + 1}
                            </button>
                        ))}
                    </div>
                </>
            )}
        </>
    );
}
