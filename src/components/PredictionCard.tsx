import { Link } from 'react-router-dom';

interface PredictionCardProps {
  prediction: PredictionItem;
}

interface PredictionItem {
  id: number;
  name: string;
  date: string;
}

export const PredictionCard = ({ prediction }: PredictionCardProps) => (
  <Link
      to={`/dashboard/predictions/${prediction.id}`}
      className="block p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-100"
  >
      <h3 className="text-lg font-semibold text-gray-800 mb-2">{prediction.name}</h3>
      <div className="space-y-1 text-sm text-gray-600">
      <p className="text-green-600 mt-2">Fecha de cálculo: {prediction.date}</p>
      </div>
  </Link>
);