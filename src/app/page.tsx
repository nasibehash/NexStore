import ProductList from '@/components/ProductList';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default async function HomePage() {

    return (
        <div className="min-h-screen flex flex-col">
            <Header/>
            <main className="flex-grow container mx-auto px-4 py-6">
                <h1 className="text-3xl font-bold mb-4">Suggested products</h1>
                <ProductList/>
            </main>
            <Footer/>
        </div>
    );
}
