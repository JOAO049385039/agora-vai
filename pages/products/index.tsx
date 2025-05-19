
import { useState, useEffect } from 'react';

const PRODUCTS = [
  { id: 1, name: 'Perfume Elegance', price: 29.9, category: 'Perfume', family: 'Feminino' },
  { id: 2, name: 'Creme Hidratante Marsala', price: 15.5, category: 'Corpo', family: 'Unissex' },
  { id: 3, name: 'Shampoo Rosé Deluxe', price: 18.0, category: 'Cabelo', family: 'Feminino' }
];

export default function ProductsPage() {
  const [view, setView] = useState<'grid' | 'list'>('grid');
  const [search, setSearch] = useState('');
  const [wishlist, setWishlist] = useState<number[]>([]);
  const [compare, setCompare] = useState<number[]>([]);

  const toggleWishlist = (id: number) => {
    setWishlist(prev => prev.includes(id) ? prev.filter(p => p !== id) : [...prev, id]);
  };

  const toggleCompare = (id: number) => {
    setCompare(prev => prev.includes(id) ? prev.filter(p => p !== id) : [...prev, id]);
  };

  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
    localStorage.setItem('compare', JSON.stringify(compare));
  }, [wishlist, compare]);

  const filteredProducts = PRODUCTS.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <input
          className="border p-2 rounded w-full max-w-sm"
          type="text"
          placeholder="Buscar produtos..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <div className="ml-4">
          <button className="mr-2" onClick={() => setView('grid')}>Grade</button>
          <button onClick={() => setView('list')}>Lista</button>
        </div>
      </div>

      <div className={view === 'grid' ? 'grid grid-cols-1 md:grid-cols-3 gap-4' : 'space-y-4'}>
        {filteredProducts.map((product) => (
          <div key={product.id} className="border p-4 rounded shadow hover:shadow-lg transition relative">
            <h2 className="text-lg font-bold">{product.name}</h2>
            <p className="text-sm text-gray-500">{product.category} - {product.family}</p>
            <p className="text-pink-700 font-semibold mt-2">€{(product.price * 1.23).toFixed(2)} IVA incl.</p>
            <div className="mt-3 flex gap-2">
              <button
                className={`px-2 py-1 text-sm rounded ${wishlist.includes(product.id) ? 'bg-red-100' : 'bg-gray-100'}`}
                onClick={() => toggleWishlist(product.id)}
              >
                {wishlist.includes(product.id) ? '❤️ Favorito' : '🤍 Favoritar'}
              </button>
              <button
                className={`px-2 py-1 text-sm rounded ${compare.includes(product.id) ? 'bg-blue-100' : 'bg-gray-100'}`}
                onClick={() => toggleCompare(product.id)}
              >
                {compare.includes(product.id) ? 'Comparando' : 'Comparar'}
              </button>
            </div>
          </div>
        ))}
      </div>

      {compare.length > 0 && (
        <div className="mt-8 p-4 border-t">
          <h3 className="text-xl font-semibold mb-2">🔍 Comparando produtos</h3>
          <ul className="list-disc pl-4">
            {PRODUCTS.filter(p => compare.includes(p.id)).map(p => (
              <li key={p.id}>{p.name} - €{(p.price * 1.23).toFixed(2)}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
