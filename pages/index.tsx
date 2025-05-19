
import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center flex-col p-8 text-center">
      <h1 className="text-4xl font-bold mb-4 text-pink-700">Bem-vindo à Divino Encanto 💖</h1>
      <p className="mb-6 text-gray-600">Explore nossos produtos de beleza e perfumaria!</p>
      <Link href="/products" legacyBehavior>
        <a className="px-6 py-3 bg-pink-600 text-white rounded-lg shadow hover:bg-pink-700 transition">
          Ir para Produtos
        </a>
      </Link>
    </div>
  );
}
