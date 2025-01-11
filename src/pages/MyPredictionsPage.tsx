import { useEffect, useState } from 'react';
import { PredictionCard } from '../components/PredictionCard';
import { getPredictions } from '../api/predictions';


export default function MyPredictionsPage() {

  const [predictions, setPredictions] = useState<any>([]);


  const fetchPredictions = async () => {
    try {
      const predictions = await getPredictions();
      setPredictions(predictions);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchPredictions();
  }, []);



  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">Mis predicciones previas</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {predictions.map((prediction: { id: number; name: string; date: string }) => (
          <PredictionCard key={prediction.id} prediction={prediction} />
        ))}
      </div>
    </div>
  );
}