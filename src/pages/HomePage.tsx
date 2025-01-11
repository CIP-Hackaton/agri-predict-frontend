import { Play } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface HomePageProps {
  onStartTour: () => void;
  userName: string;
}

const HomePage = ({ onStartTour, userName }: HomePageProps) => {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold mb-2">Bienvenido {userName}</h1>
            <p className="text-gray-600">
              Somos AgriPredict, tu asistente inteligente para optimizar tus cultivos
            </p>
          </div>
          <button
            onClick={onStartTour}
            className="flex-shrink-0 flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors w-full sm:w-auto justify-center"
          >
            <Play size={20} />
            <span>Iniciar tour</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <button 
          onClick={() => navigate('/dashboard/predict')}
          className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow group"
        >
          <h3 className="text-lg font-semibold text-green-600 mb-2">Nueva Predicción</h3>
          <p className="text-gray-600">Inicia una nueva predicción para tu cultivo</p>
        </button>

        <button 
          onClick={() => navigate('/dashboard/predictions')}
          className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow"
        >
          <h3 className="text-lg font-semibold text-green-600 mb-2">Ver Predicciones</h3>
          <p className="text-gray-600">Revisa tus predicciones anteriores</p>
        </button>

        <button 
          onClick={() => navigate('/dashboard/averigua')}
          className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow"
        >
          <h3 className="text-lg font-semibold text-green-600 mb-2">Conoce más</h3>
          <p className="text-gray-600">Aprende sobre las plantas y cultivos</p>
        </button>
      </div>
    </div>
  );
};

export default HomePage;