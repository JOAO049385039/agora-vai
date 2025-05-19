
import { useState } from 'react';

export default function ProductsPage() {
  const [view, setView] = useState<'grid' | 'list'>('grid');
  const [search, setSearch] = useState('');
  const products = [
    { id: 1, name: 'Perfume Elegance', price: 29.9, category: 'Perfume', family: 'Feminino' },
    { id: 2, name: 'Creme Hidratante Marsala', price: 15.5, category: 'Corpo', family: 'Unissex' },
    { id: 3, name: 'Shampoo Rosé Deluxe', price: 18.0, category: 'Cabelo', family: 'Feminino' }
  ];

  const filteredProducts = products.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));

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
          <div key={product.id} className="border p-4 rounded shadow hover:shadow-lg transition">
            <h2 className="text-lg font-bold">{product.name}</h2>
            <p className="text-sm text-gray-500">{product.category} - {product.family}</p>
            <p className="text-pink-700 font-semibold mt-2">€{(product.price * 1.23).toFixed(2)} IVA incl.</p>
          </div>
        ))}
      </div>
    </div>
  );
}
