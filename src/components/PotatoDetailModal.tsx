import { X } from 'lucide-react';

interface PotatoVariety {
  id: number;
  name: string;
  description: string;
  characteristics: string[];
  imageUrl: string;
  scientificName: string;
  origin: string;
  cultivationTime: string;
  idealConditions: {
    temperature: string;
    soil: string;
    altitude: string;
    rainfall: string;
  };
  nutritionalInfo: {
    calories: string;
    protein: string;
    carbs: string;
    fiber: string;
  };
  commonUses: string[];
  diseases: {
    name: string;
    description: string;
    prevention: string;
  }[];
}

interface PotatoDetailModalProps {
  variety: PotatoVariety | null;
  onClose: () => void;
}

export default function PotatoDetailModal({ variety, onClose }: PotatoDetailModalProps) {
  if (!variety) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-2xl font-bold text-gray-800">{variety.name}</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="overflow-y-auto flex-1 p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <img
                src={variety.imageUrl}
                alt={variety.name}
                className="w-full h-64 object-cover rounded-lg"
              />
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-2">Características</h3>
                <dl className="grid grid-cols-2 gap-4">
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Temperatura</dt>
                    <dd className="text-gray-900">{variety.idealConditions.temperature}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Tipo de suelo</dt>
                    <dd className="text-gray-900">{variety.idealConditions.soil}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Altitud</dt>
                    <dd className="text-gray-900">{variety.idealConditions.altitude}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Precipitación</dt>
                    <dd className="text-gray-900">{variety.idealConditions.rainfall}</dd>
                  </div>
                </dl>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2">Información nutricional</h3>
                <dl className="grid grid-cols-2 gap-4">
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Calorías</dt>
                    <dd className="text-gray-900">{variety.nutritionalInfo.calories}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Proteínas</dt>
                    <dd className="text-gray-900">{variety.nutritionalInfo.protein}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Carbohidratos</dt>
                    <dd className="text-gray-900">{variety.nutritionalInfo.carbs}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Fibra</dt>
                    <dd className="text-gray-900">{variety.nutritionalInfo.fiber}</dd>
                  </div>
                </dl>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2">Usos comunes</h3>
                <ul className="list-disc list-inside space-y-1">
                  {variety.commonUses.map((use, index) => (
                    <li key={index} className="text-gray-700">{use}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2">Enfermedades comunes</h3>
                <div className="space-y-4">
                  {variety.diseases.map((disease, index) => (
                    <div key={index} className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-medium text-gray-900 mb-2">{disease.name}</h4>
                      <p className="text-sm text-gray-600 mb-2">{disease.description}</p>
                      <p className="text-sm">
                        <span className="font-medium">Prevención:</span>{' '}
                        {disease.prevention}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}