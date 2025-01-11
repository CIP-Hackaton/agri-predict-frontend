import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Share2 } from 'lucide-react';
import ShareModal from '../components/ShareModal';
import { getPredictionById } from '../api/predictions';

type ViewMode = 'farmer' | 'scientist';

type Prediction = {
  id: string;
  details: {
    name: string;
    Fecha: string;
    Departamento: string;
    Provincia: string;
    Distrito: string;
    mode: string;
  };
  campesino_response: {
    Variety: string;
    Norma_Diferencia: number;
    characteristics: {
      "Tizón tardío": string;
      "Materia Seca": number;
      "Periodo de crecimiento en altura": string;
      "Color predominante de la pulpa": string;
      "Forma de los ojos": string;
    };
    url_photo: string;
    description: string;
    name: string;
    norm: number;
  }[];
  p_characteristics: {
    "Tizón tardío": string;
    "Materia Seca": number;
    "Periodo de crecimiento en altura": string;
    "Color predominante de la pulpa": string;
    "Forma de los ojos": string;
  };
  owner: string;
  created_at: string;
  allowed_user: string[];
  updated_at: string;
};

export default function PredictionDetailPage() {
  const [viewMode, setViewMode] = useState<ViewMode>('farmer');
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [prediction, setPrediction] = useState<Prediction | null>(null);

  useEffect(() => {
    const fetchPrediction = async () => {
      try {
        const id = window.location.pathname.split('/').pop() || '';
        const prediction = await getPredictionById(id);
        setPrediction(prediction);
        console.log(prediction);
      } catch (error) {
        console.error(error);
      }
    };

    fetchPrediction();
  }, []);

  const handleShare = (emails: string[]) => {
    console.log('Sharing with:', emails);
    // Implement sharing logic here
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center gap-4">
          <Link to="/dashboard/predictions" className="text-gray-600 hover:text-gray-800">
            <ArrowLeft size={24} />
          </Link>
          <h2 className="text-2xl font-bold text-gray-800">
            Predicción '{prediction?.details.name}'
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
        {prediction?.details.mode === 'automatic' && (
          <div className="bg-green-50 p-4 rounded-lg mb-4">
            <p className="text-gray-600">La siguiente predicción se llevó a cabo con los siguientes datos.</p>
            <div className="text-gray-600">
              <p className="inline-block bg-white-50 text-green-700 px-2 py-1 rounded-full text-sm mr-2">Departamento: {prediction.details.Departamento}</p>
              <p className="inline-block bg-green-50 text-green-700 px-2 py-1 rounded-full text-sm mr-2">Provincia: {prediction.details.Provincia}</p>
              <p className="inline-block bg-green-50 text-green-700 px-2 py-1 rounded-full text-sm mr-2">Distrito: {prediction.details.Distrito}</p>
              <p className="inline-block bg-green-50 text-green-700 px-2 py-1 rounded-full text-sm mr-2">Fecha: {prediction.details.Fecha}</p>
            </div>
          </div>
        )}
        <div className="flex flex-wrap gap-2 mb-6">
          <button
            onClick={() => setViewMode('farmer')}
            className={`flex-1 sm:flex-none px-4 py-2 rounded-lg transition-colors ${
              viewMode === 'farmer'
                ? 'bg-green-500 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            Soy agricultor
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
          <>
          <p className="text-gray-600"></p>
          <div className="space-y-8">
            {prediction?.campesino_response && prediction.campesino_response.map((response, index) => (
              <div key={index} className="space-y-4">
          <h3 className="text-xl font-semibold">Puesto {index + 1}</h3>
          <div className="space-y-2 flex-shrink-0 justify-center items-center">
            <p className="text-gray-600"><strong>Variedad:</strong> {response.Variety}</p>
            <p className="text-gray-600"><strong>Descripción:</strong> {response.description}</p>
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <div className="flex-1 space-y-2">
                {response.characteristics && Object.entries(response.characteristics || {}).map(([key, value]) => (
            <p key={key} className="text-gray-600">
              <strong>{key}:</strong> {value}
            </p>
                ))}
              </div>
            </div>
            <div className="">
                <img src={response.url_photo} alt={`Foto de ${response.name}`} className="w-64 h-64 object-cover rounded-lg" />
              </div>
          </div>
              </div>
            ))}
          </div>
          </>
        ) : (
          <div className="space-y-8">
            <h3 className="text-3xl font-semibold">Vista de Investigador</h3>
            <p className="text-gray-600">Con estas características aseguramos un buen rendimiento en el campo y una excelente aceptación en el mercado
              
            </p>
            <h3 className="font-semibold text-xl">Características de la papa ideal</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {prediction?.p_characteristics && Object.entries(prediction.p_characteristics).map(([key, value]) => (
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
              <div className="h-64 bg-white rounded border border-gray-200"></div>
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
