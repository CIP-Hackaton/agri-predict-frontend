import { useState } from 'react';
import { X, Camera, LogOut } from 'lucide-react';

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogout: () => void;
  user: UserData | null;
}

interface UserData {
  avatarUrl: string;
  name: string;
  email: string;
  role: string;
  created_at: string;
}

export default function ProfileModal({ isOpen, onClose, onLogout, user }: ProfileModalProps) {
  const [isEditing, setIsEditing] = useState(false);

  if (!isOpen || !user) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-md p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-semibold">Mi Perfil</h3>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="space-y-6">
          <div className="flex justify-center">
            <div className="relative">
              <img
                src={user.avatarUrl}
                alt="Profile"
                className="w-24 h-24 rounded-full object-cover"
              />
              <button className="absolute bottom-0 right-0 bg-white rounded-full p-2 shadow-lg hover:bg-gray-50">
                <Camera className="h-5 w-5 text-gray-600" />
              </button>
            </div>
          </div>

          <div className="space-y-4">
            {isEditing ? (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Nombre completo
                  </label>
                  <input
                    type="text"
                    value={user.name}
                    onChange={(e) => {/* Add update logic here */}}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Correo electrónico
                  </label>
                  <input
                    type="email"
                    value={user.email}
                    onChange={(e) => {/* Add update logic here */}}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                  />
                </div>
              </>
            ) : (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Nombre completo</label>
                  <p className="mt-1">{user.name}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Correo electrónico</label>
                  <p className="mt-1">{user.email}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Rol</label>
                  <p className="mt-1">{user.role}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Fecha de registro</label>
                  <p className="mt-1">{user.created_at}</p>
                </div>
              </>
            )}
          </div>

          <div className="flex flex-col gap-3 pt-4">
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="w-full bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition-colors"
            >
              {isEditing ? 'Guardar cambios' : 'Editar información'}
            </button>
            <button
              onClick={onLogout}
              className="w-full flex items-center justify-center gap-2 border border-red-500 text-red-500 py-2 px-4 rounded-md hover:bg-red-50 transition-colors"
            >
              <LogOut className="h-5 w-5" />
              <span>Cerrar sesión</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}