export async function fetchProducts() {
  const res = await fetch('https://fakestoreapi.com/products', {cache: 'no-store'});
  if (!res.ok) throw new Error('Failed to fetch products');
  return res.json();
}

export async function fetchProductById(id: string) {
  const res = await fetch(`https://fakestoreapi.com/products/${id}`, {cache: 'no-store'});
  if (!res.ok) throw new Error('Failed to fetch product');
  return res.json();
}