import { Link } from 'react-router-dom';

// Mock data - replace with real data later
const predictions = [
  {
    id: 1,
    name: 'Papa Amarilla',
    department: 'Cusco',
    province: 'Anta',
    district: 'Limatambo',
    date: '2024-03-15',
  },
  // Add more mock predictions...
];

const PredictionCard = ({ prediction }) => (
  <Link
    to={`/dashboard/predictions/${prediction.id}`}
    className="block p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-100"
  >
    <h3 className="text-lg font-semibold text-gray-800 mb-2">{prediction.name}</h3>
    <div className="space-y-1 text-sm text-gray-600">
      <p>{prediction.department}, {prediction.province}</p>
      <p>{prediction.district}</p>
      <p className="text-green-600 mt-2">Fecha de cálculo: {prediction.date}</p>
    </div>
  </Link>
);

export default function MyPredictionsPage() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">Mis predicciones previas</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {predictions.map((prediction) => (
          <PredictionCard key={prediction.id} prediction={prediction} />
        ))}
      </div>
    </div>
  );
}