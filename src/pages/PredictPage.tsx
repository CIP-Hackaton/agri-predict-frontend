import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { departments, provinces, districts, clasificaciones } from '../data/locations';
import { createPrediction } from '../api/predictions';

type PredictionMode = 'automatic' | 'manual';

interface FormData {
  name: string;
  department: string;
  province: string;
  district: string;
  date: string;
  mode: PredictionMode;
  // Manual prediction fields
  temp_max?: number;
  temp_min?: number;
  humidity?: number;
  rainfall?: number;
  nevada?: number;
  clasi?: number;
  erosion?: number;
}

const PredictPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData>({
    name: '',
    department: '',
    province: '',
    district: '',
    date: '',
    mode: 'automatic'
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [availableProvinces, setAvailableProvinces] = useState<string[]>([]);
  const [availableDistricts, setAvailableDistricts] = useState<string[]>([]);

  useEffect(() => {
    if (formData.department && provinces[formData.department]) {
      setAvailableProvinces(provinces[formData.department]);
      setFormData(prev => ({ ...prev, province: '', district: '' }));
    } else {
      setAvailableProvinces([]);
    }
  }, [formData.department]);

  useEffect(() => {
    if (formData.province && districts[formData.province]) {
      setAvailableDistricts(districts[formData.province]);
      setFormData(prev => ({ ...prev, district: '' }));
    } else {
      setAvailableDistricts([]);
    }
  }, [formData.province]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const response = await createPrediction(formData);
      navigate(`/dashboard/predictions/${response.id}`);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Error al crear la predicción');
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-2xl font-bold mb-4">Nueva predicción</h2>
        <p className="text-gray-600 mb-6">
          Por favor ingrese todos los datos correspondientes al lugar de su sembrío
        </p>
        
        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nombre del cultivo
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
                required
              />
            </div>
            
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Tipo de predicción
              </label>
              <select
                name="mode"
                value={formData.mode}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
                required
              >
                <option value="automatic">Automática</option>
                <option value="manual">Manual</option>
              </select>
            </div>
          </div>

          {
              formData.mode === 'automatic' && (
          
            <div className="flex flex-col md:flex-row gap-6">
              
              
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Departamento
                </label>
                <select
                  name="department"
                  value={formData.department}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  required
                >
                  <option value="">Seleccionar departamento</option>
                  {departments.map(dept => (
                    <option key={dept} value={dept}>{dept}</option>
                  ))}
                </select>
              </div>
              
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Provincia
                </label>
                <select
                  name="province"
                  value={formData.province}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  required
                  disabled={!formData.department}
                >
                  <option value="">Seleccionar provincia</option>
                  {availableProvinces.map(prov => (
                    <option key={prov} value={prov}>{prov}</option>
                  ))}
                </select>
              </div>
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Distrito
                </label>
                <select
                  name="district"
                  value={formData.district}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  required
                  disabled={!formData.province}
                >
                  <option value="">Seleccionar distrito</option>
                  {availableDistricts.map(dist => (
                    <option key={dist} value={dist}>{dist}</option>
                  ))}
                </select>
              </div>
            </div>
              )
          }
          
          <div className="flex flex-col md:flex-row gap-6">
            
            
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Fecha de inicio
              </label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
                required
              />
            </div>
          </div>

          {formData.mode === 'manual' && (
            <div className="space-y-6 border-t pt-6">
              <h3 className="text-lg font-medium text-gray-900">Características climatológicas</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Temperatura Máxima (°C)
                  </label>
                  <input
                    type="number"
                    name="temp_max"
                    value={formData.temp_max || ''}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="Ej: 20"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Temperatura Mínima (°C)
                  </label>
                  <input
                    type="number"
                    name="temp_min"
                    value={formData.temp_min || ''}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="Ej: 10"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Presencia de Tizón (%)
                  </label>
                  <input
                    type="number"
                    name="humidity"
                    value={formData.humidity || ''}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="Ej: 65"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Precipitación (mm)
                  </label>
                  <input
                    type="number"
                    name="rainfall"
                    value={formData.rainfall || ''}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="Ej: 50"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Nevada (cm)
                  </label>
                  <input
                    type="number"
                    name="nevada"
                    value={formData.nevada || ''}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="Ej: 6.5"
                    step="0.1"
                    required
                  />
                </div>

                <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Clasificación Climática
              </label>
              <select
                name="clasi"
                value={formData.clasi}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
                required
              >
                <option value="">Seleccionar clasificación climática</option>
                {clasificaciones.map(clasification => (
                  <option key={clasification} value={clasification}>{clasification}</option>
                ))}
              </select>
            </div>


                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Erosión promedio (mm)
                  </label>
                  <input
                    type="number"
                    name="erosion"
                    value={formData.erosion || ''}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="Ej: 2500"
                    required
                  />
                </div>
              </div>
            </div>
          )}
          
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Calculando...' : 'Calcular'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default PredictPage;