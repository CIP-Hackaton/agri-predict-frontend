import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Share2 } from 'lucide-react';
import ShareModal from '../components/ShareModal';

type ViewMode = 'farmer' | 'scientist';

export default function PredictionDetailPage() {
  const [viewMode, setViewMode] = useState<ViewMode>('farmer');
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [selectedVariety, setSelectedVariety] = useState('');

  // Mock data - replace with real data later
  const prediction = {
    id: 1,
    name: 'Papa Amarilla',
    campesino_response: [
      {
        id: 1,
        name: 'Papa Amarilla',
        description: 'Papa amarilla de la región de Cusco',
        characteristics: { 
          "Tizón tardío":"Resistente","Materia Seca":0.22,"Periodo de crecimiento en altura":"Media","Color predominante de la pulpa":"Crema","Forma de los ojos":"Poco profundos"
        },
        url_photo: 'https://images.unsplash.com/photo'
      },
      {
        id: 2,
        name: 'Papa Huayro',
        description: 'Papa amarilla de la región de Cusco',
        characteristics: { 
          "Tizón tardío":"Resistente","Materia Seca":0.22,"Periodo de crecimiento en altura":"Media","Color predominante de la pulpa":"Crema","Forma de los ojos":"Poco profundos"
        },
        url_photo: 'https://images.unsplash.com/photo'
      }
    ],
    p_characteristics:{
      "Tizón tardío":"Resistente","Materia Seca":0.22,"Periodo de crecimiento en altura":"Media","Color predominante de la pulpa":"Crema","Forma de los ojos":"Poco profundos"
    }
  };

  const varieties = [
    { id: '1', name: 'Papa Huayro' },
    { id: '2', name: 'Papa Peruanita' },
    { id: '3', name: 'Papa Canchan' },
  ];

  const handleShare = (emails: string[]) => {
    console.log('Sharing with:', emails);
    // Implement sharing logic here
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center gap-4">
          <Link to="/my-predictions" className="text-gray-600 hover:text-gray-800">
            <ArrowLeft size={24} />
          </Link>
          <h2 className="text-2xl font-bold text-gray-800">
            Predicción '{prediction.name}'
          </h2>
        </div>
        
        <button
          onClick={() => setIsShareModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
        >
          <Share2 size={20} />
          <span>Compartir</span>
        </button>
      </div>

      <div className="bg-white rounded-lg p-4 shadow-sm">
        <div className="flex flex-wrap gap-2 mb-6">
          <button
            onClick={() => setViewMode('farmer')}
            className={`flex-1 sm:flex-none px-4 py-2 rounded-lg transition-colors ${
              viewMode === 'farmer'
                ? 'bg-green-500 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            Soy campesino
          </button>
          <button
            onClick={() => setViewMode('scientist')}
            className={`flex-1 sm:flex-none px-4 py-2 rounded-lg transition-colors ${
              viewMode === 'scientist'
                ? 'bg-green-500 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            Soy científico
          </button>
        </div>

        {viewMode === 'farmer' ? (
          <div className="space-y-8">
            {prediction.campesino_response.map((response) => (
              <div key={response.id} className="space-y-4">
                <div className="aspect-w-16 aspect-h-9 mb-6">
                  <img
                    src={response.url_photo}
                    alt={response.name}
                    className="rounded-lg object-cover w-full h-64"
                  />
                </div>
                <h3 className="text-xl font-semibold">{response.name}</h3>
                <p className="text-gray-600">{response.description}</p>
                <div className="space-y-2">
                  {Object.entries(response.characteristics).map(([key, value]) => (
                    <p key={key} className="text-gray-600">
                      <strong>{key}:</strong> {value}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-8">


            <h3 className="text-3xl font-semibold">Vista de Investigador</h3>

            <p className="text-gray-600"> Con estas características garantizamos un máximo rendimiento</p>

            <h3 className="font-semibold text-xl">Características de la papa ideal</h3>            

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {Object.entries(prediction.p_characteristics).map(([key, value]) => (
              <div key={key} className="relative p-4 bg-green-100 rounded-lg">
                <p className="font-medium text-xl">{key}</p>
                <p className="text-sm text-gray-700">{value}</p>
                <span className="absolute top-2 right-2 text-green-500">
                <i className="fas fa-info-circle"></i>
                </span>
              </div>
              ))}
            </div>
            
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-medium mb-4">Gráfica visual</h4>
              <div className="h-64 bg-white rounded border border-gray-200">
                {/* Add graph visualization here */}
              </div>
            </div>

            <div className="p-4">
              <h4 className="font-medium mb-4">Comparar</h4>
              <div className="w-full">
              <label className="block text-sm font-medium text-gray-700 mb-2">
              Comparar con:
              </label>
              <select
              value={selectedVariety}
              onChange={(e) => setSelectedVariety(e.target.value)}
              className="w-full md:w-64 pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-green-500 focus:border-green-500 rounded-md"
              >
              <option value="">Seleccionar variedad</option>
              {varieties.map((variety) => (
                <option key={variety.id} value={variety.id}>
                {variety.name}
                </option>
              ))}
              </select>
            </div>

              <div className="overflow-x-auto">
                <div className="inline-block min-w-full align-middle">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead>
                      <tr className="bg-gray-50">
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Característica
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Papa ideal
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Papa referencial
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Diferencia
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {/* Add comparison data here */}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <ShareModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        onShare={handleShare}
      />
    </div>
  );
}