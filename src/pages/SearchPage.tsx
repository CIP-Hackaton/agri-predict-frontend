import React, { useState } from 'react';
import { Search, X } from 'lucide-react';
import Pagination from '../components/Pagination';
import PotatoDetailModal from '../components/PotatoDetailModal';

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

// Mock data - replace with real API data later
const potatoVarieties: PotatoVariety[] = [
  {
    id: 1,
    name: 'Papa Amarilla',
    description: 'Variedad nativa del Perú, conocida por su sabor y textura cremosa. Ideal para purés y guisos tradicionales.',
    characteristics: ['Piel amarilla', 'Pulpa cremosa', 'Ideal para purés', 'Alta en almidón'],
    imageUrl: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&q=80&w=500',
    scientificName: 'Solanum goniocalyx',
    origin: 'Andes peruanos',
    cultivationTime: '4-5 meses',
    idealConditions: {
      temperature: '10-20°C',
      soil: 'Franco arenoso, bien drenado',
      altitude: '2000-3800 msnm',
      rainfall: '700-1000 mm/año'
    },
    nutritionalInfo: {
      calories: '85 kcal/100g',
      protein: '2.0g/100g',
      carbs: '19.0g/100g',
      fiber: '1.8g/100g'
    },
    commonUses: [
      'Puré de papa',
      'Causa rellena',
      'Guisos tradicionales',
      'Papa a la huancaína'
    ],
    diseases: [
      {
        name: 'Tizón tardío',
        description: 'Enfermedad fungosa que afecta hojas y tubérculos',
        prevention: 'Rotación de cultivos y fungicidas preventivos'
      },
      {
        name: 'Rizoctoniasis',
        description: 'Afecta los brotes y tubérculos jóvenes',
        prevention: 'Semilla certificada y tratamiento de semillas'
      }
    ]
  },
  {
    id: 2,
    name: 'Papa Huayro',
    description: 'Papa nativa de color rojizo, excelente para guisos y sopas. Reconocida por su alto contenido de materia seca.',
    characteristics: ['Piel rojiza', 'Pulpa blanca', 'Resistente a heladas', 'Alto contenido de almidón'],
    imageUrl: 'https://images.unsplash.com/photo-1590165482129-1b8b27698780?auto=format&fit=crop&q=80&w=500',
    scientificName: 'Solanum x chaucha',
    origin: 'Sierra central del Perú',
    cultivationTime: '5-6 meses',
    idealConditions: {
      temperature: '8-16°C',
      soil: 'Franco arcilloso',
      altitude: '2500-4000 msnm',
      rainfall: '800-1200 mm/año'
    },
    nutritionalInfo: {
      calories: '90 kcal/100g',
      protein: '2.3g/100g',
      carbs: '20.5g/100g',
      fiber: '2.0g/100g'
    },
    commonUses: [
      'Sopas',
      'Guisos',
      'Sancochada',
      'Pachamanca'
    ],
    diseases: [
      {
        name: 'Verruga',
        description: 'Enfermedad que causa protuberancias en tubérculos',
        prevention: 'Uso de variedades resistentes y rotación de cultivos'
      },
      {
        name: 'Marchitez bacteriana',
        description: 'Bacteria que causa marchitamiento de la planta',
        prevention: 'Semilla certificada y buen drenaje del suelo'
      }
    ]
  }
];

export default function SearchPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedVariety, setSelectedVariety] = useState<PotatoVariety | null>(null);
  const itemsPerPage = 6;

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
              src={variety.imageUrl}
              alt={variety.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">{variety.name}</h3>
              <p className="text-gray-600 mb-4">{variety.description}</p>
              <div className="space-y-2">
                {variety.characteristics.map((char, index) => (
                  <span
                    key={index}
                    className="inline-block bg-green-50 text-green-700 px-2 py-1 rounded-full text-sm mr-2"
                  >
                    {char}
                  </span>
                ))}
              </div>
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