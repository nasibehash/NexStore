import ProductList from '@/components/ProductList';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { fetchProducts } from '@/lib/api';

export default async function HomePage() {
  const products = await fetchProducts();

  return (
    <div className="min-h-screen flex flex-col">
      <Header/>
      <main className="flex-grow container mx-auto px-4 py-6">
        <h1 className="text-3xl font-bold mb-4">Suggested products</h1>
        <ProductList products={products}/>
      </main>
      <Footer/>
    </div>
  );
}
