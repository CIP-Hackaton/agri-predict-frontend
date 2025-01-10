import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Sprout, Menu, X } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

const images = [
  'https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&q=80&w=1470',
  'https://images.unsplash.com/photo-1590165482129-1b8b27698780?auto=format&fit=crop&q=80&w=1470',
  'https://cdn.www.gob.pe/uploads/document/file/3159716/Foto%201%20%286%29.jpg.jpg',
];

const teamMembers = [
  {
    name: 'Enrique Arbues Perez Villegas',
    role: 'Est. Ciencia de la Computación',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=400',
    description: 'Especialista en cultivos andinos con más de 10 años de experiencia.',
  },
  {
    name: 'Sergio Pezo',
    role: 'Est. Ciencia de la Computación',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=400',
    description: 'Experto en machine learning aplicado a agricultura de precisión.',
  },
  {
    name: 'Ana Torres',
    role: 'Desarrolladora',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=400',
    description: 'Especialista en desarrollo de software para soluciones agrícolas.',
  },
];

export default function LandingPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Fixed Header */}
      <header className="fixed w-full z-50 bg-white/95 backdrop-blur-sm shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sprout className="h-8 w-8 text-green-500" />
            <span className="text-xl font-bold">AgriPredict</span>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-4">
            <a href="#about" className="text-gray-600 hover:text-gray-900">Quiénes Somos</a>
            <Link
              to="/login"
              className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors"
            >
              Iniciar sesión
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-16 left-0 right-0 bg-white border-t border-gray-100 shadow-lg">
            <div className="px-4 py-2 space-y-2">
              <a
                href="#about"
                className="block px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-lg"
                onClick={() => setIsMenuOpen(false)}
              >
                Quiénes Somos
              </a>
              <Link
                to="/login"
                className="block px-4 py-2 text-center bg-green-500 text-white rounded-lg hover:bg-green-600"
                onClick={() => setIsMenuOpen(false)}
              >
                Iniciar sesión
              </Link>
            </div>
          </div>
        )}
      </header>

      <main className="flex-1 flex flex-col pt-16">
        <div className="relative h-[calc(100vh-4rem)]">
          <Swiper
            modules={[Autoplay, Navigation]}
            navigation
            autoplay={{ delay: 5000 }}
            loop={true}
            className="h-full"
          >
            {images.map((image, index) => (
              <SwiperSlide key={index}>
                <div className="relative h-full">
                  <img
                    src={image}
                    alt={`Slide ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                    <div className="text-center text-white px-4">
                      <h1 className="text-4xl md:text-6xl font-bold mb-4">
                        Bienvenido a AgriPredict
                      </h1>
                      <p className="text-xl md:text-2xl mb-8">
                        Optimiza tus cultivos con inteligencia artificial
                      </p>
                      <Link
                        to="/register"
                        className="bg-green-500 text-white px-6 py-3 rounded-lg text-lg hover:bg-green-600 transition-colors inline-block"
                      >
                        Comenzar ahora
                      </Link>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-8">¿Cómo funciona?</h2>
            <div className="aspect-w-16 aspect-h-9 rounded-xl overflow-hidden shadow-lg">
              <iframe
                src="https://www.youtube.com/embed/your-video-id"
                title="Tutorial AgriPredict"
                className="w-full h-[500px]"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
            <div className="text-center mt-8">
              <Link
                to="/register"
                className="bg-green-500 text-white px-6 py-3 rounded-lg text-lg hover:bg-green-600 transition-colors inline-block"
              >
                Empieza tu prueba gratuita
              </Link>
            </div>
          </div>
        </section>

        <section id="about" className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-12">Quiénes Somos</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {teamMembers.map((member, index) => (
                <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-64 object-cover"
                  />
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-2">{member.name}</h3>
                    <p className="text-green-600 mb-4">{member.role}</p>
                    <p className="text-gray-600">{member.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}