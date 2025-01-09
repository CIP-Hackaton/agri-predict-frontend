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
    imageUrl: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&q=80&w=500',
    stages: [
      {
        name: 'Papa 1',
        description: 'Descripción de papa, lorem ipsum',
        date: '2024-03-15',
        recommendations: [
          'Característica 1: Texto sobre cada punto tal',
          'Característica 2: Texto sobre cada punto tal',
        ],
      },
      // Add more stages...
    ],
    scientificData: {
      characteristics: ['Característica 1', 'Característica 2', 'Característica 3'],
      graphData: {/* Add graph data here */},
      comparison: [
        { characteristic: 'Característica 1', ideal: '90%', real: '85%', difference: '-5%' },
        // Add more comparison data...
      ],
    },
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
            <div className="aspect-w-16 aspect-h-9 mb-6">
              <img
                src={prediction.imageUrl}
                alt={prediction.name}
                className="rounded-lg object-cover w-full h-64"
              />
            </div>
            <p className="text-gray-600">
              Los pasos que mejor se ajusta a usted es:
            </p>
            {prediction.stages.map((stage, index) => (
              <div key={index} className="space-y-4">
                <h3 className="text-xl font-semibold">
                  {index + 1}. {stage.name}
                </h3>
                <p className="text-gray-600">{stage.description}</p>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="font-medium mb-2">Fecha de la papa</p>
                  <p className="text-gray-600">{stage.date}</p>
                </div>
                <div className="space-y-2">
                  <p className="text-gray-600">El sistema priorizó las siguientes características:</p>
                  {stage.recommendations.map((rec, idx) => (
                    <p key={idx} className="text-gray-600 ml-4">• {rec}</p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-8">
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

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {prediction.scientificData.characteristics.map((char, index) => (
                <div key={index} className="p-4 bg-gray-50 rounded-lg">
                  <p className="font-medium">{char}</p>
                </div>
              ))}
            </div>
            
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-medium mb-4">Gráfica visual</h4>
              <div className="h-64 bg-white rounded border border-gray-200">
                {/* Add graph visualization here */}
              </div>
            </div>

            <div>
              <h4 className="font-medium mb-4">Comparar</h4>
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
                      {prediction.scientificData.comparison.map((item, index) => (
                        <tr key={index}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {item.characteristic}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {item.ideal}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {item.real}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {item.difference}
                          </td>
                        </tr>
                      ))}
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