import { useEffect, useState } from 'react';
import { Search } from 'lucide-react';
import Pagination from '../components/Pagination';
import PotatoDetailModal from '../components/PotatoDetailModal'
import { getPotatoes } from '../api/potatoes';
import { PotatoVariety } from '../types/potato';


export default function SearchPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedVariety, setSelectedVariety] = useState<PotatoVariety | null>(null);
  const [potatoVarieties, setPotatoVarieties] = useState<PotatoVariety[]>([]);
  const itemsPerPage = 30;

  const getPotatoesData = async () => {
    try {
      const response = await getPotatoes();
      setPotatoVarieties(response);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getPotatoesData();
  }, []);

  const filteredVarieties = potatoVarieties.filter(variety =>
    variety.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    variety.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredVarieties.length / itemsPerPage);
  const currentVarieties = filteredVarieties.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <h2 className="text-2xl font-bold text-gray-800">Conoce más sobre nuestras papas</h2>
        <div className="relative w-full sm:w-64">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Buscar variedades..."
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentVarieties.map((variety) => (
          <div key={variety.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
            <img
              src={variety.url_photo}
              alt={variety.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">{variety.name}</h3>
              <p className="text-gray-600 mb-4">{variety.description}</p>
              <button 
                onClick={() => setSelectedVariety(variety)}
                className="mt-4 w-full bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition-colors"
              >
                Ver más detalles
              </button>
            </div>
          </div>
        ))}
      </div>

      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      )}

      <PotatoDetailModal
        variety={selectedVariety}
        onClose={() => setSelectedVariety(null)}
      />
    </div>
  );
}