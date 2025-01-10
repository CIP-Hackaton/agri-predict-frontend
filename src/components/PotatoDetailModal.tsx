import { X } from 'lucide-react';
import { PotatoVariety } from '../types/potato';

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
                src={variety.url_photo}
                alt={variety.name}
                className="w-full h-64 object-cover rounded-lg"
              />
              <h3 className="text-lg font-semibold mt-4 mb-2">Descripción</h3>
              <p className="text-gray-800">{variety.description}</p>
            </div>

            <div className="space-y-6">
                <div>
                <h3 className="text-lg font-semibold mb-2">Características</h3>
                <dl className="grid grid-cols-2 gap-4">
                  {Object.entries(variety.characteristics).map(([key, value]) => (
                  <div key={key}>
                    <dt className="text-sm font-medium text-gray-500">{key}</dt>
                    <dd className="text-gray-900">{value as string}</dd>
                  </div>
                  ))}
                </dl>
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}