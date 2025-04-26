export async function fetchProductById(id: string) {
    const res = await fetch(`https://fakestoreapi.com/products/${id}`);
    if (!res.ok) throw new Error('Failed to fetch product');
    return res.json();
}

export async function fetchCategories() {
    const res = await fetch('https://fakestoreapi.com/products/categories');
    if (!res.ok) throw new Error('Failed to fetch categories');
    return res.json();
}

export async function fetchProducts({
                                        sortBy = "newest",
                                        limit = 8,
                                        page = 1,
                                        category = "all"
                                    }: {
    sortBy?: "asc" | "desc" | "popular" | "newest";
    limit?: number;
    page?: number;
    category?: string;
}) {
    let url = `https://fakestoreapi.com/products`;

    if (category !== "all") {
        url += `?category=${category}`;
    }

    if (sortBy === "asc" || sortBy === "desc") {
        url += `?sort=${sortBy}`;
    }

    const res = await fetch(url);
    if (!res.ok) throw new Error("Failed to fetch products");

    const data = await res.json();

    const start = (page - 1) * limit;
    const end = start + limit;
    const paginated = data.slice(start, end);

    if (sortBy === "popular") {
        paginated.sort((a: any, b: any) => b.rating.rate - a.rating.rate);
    } else if (sortBy === "newest") {
        paginated.sort((a: any, b: any) => b.id - a.id);
    }

    return {
        data: paginated,
        total: data.length,
    };
}
