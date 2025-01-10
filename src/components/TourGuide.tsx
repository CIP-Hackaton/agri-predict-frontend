import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { X } from 'lucide-react';

interface TourStep {
  target: string;
  title: string;
  content: string;
  position: 'top' | 'bottom' | 'left' | 'right';
  route?: string;
}

const tourSteps: TourStep[] = [
  {
    target: '[data-tour="sidebar"]',
    title: 'Navegación Principal',
    content: 'Aquí encontrarás todas las secciones principales de la aplicación.',
    position: 'right',
  },
  {
    target: '[data-tour="predict"]',
    title: 'Crear Predicciones',
    content: 'Inicia nuevas predicciones para tus cultivos desde aquí.',
    position: 'right',
    route: '/dashboard/predict',
  },
  {
    target: '[data-tour="my-predictions"]',
    title: 'Mis Predicciones',
    content: 'Revisa el historial de tus predicciones anteriores.',
    position: 'right',
    route: '/dashboard/predictions',
  },
  {
    target: '[data-tour="search"]',
    title: 'Averigua',
    content: 'Explora información sobre nuestras las variedades de papas que usamos.',
    position: 'right',
    route: '/dashboard/averigua',
  },
  {
    target: '[data-tour="profile"]',
    title: 'Tu Perfil',
    content: 'Gestiona tu perfil y configuración desde aquí.',
    position: 'bottom',
  },
];

interface TourGuideProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function TourGuide({ isOpen, onClose }: TourGuideProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const tooltipRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen) {
      setCurrentStep(0);
      positionTooltip();
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      positionTooltip();
    }
  }, [currentStep]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (tooltipRef.current && !tooltipRef.current.contains(event.target as Node)) {
        handleClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const positionTooltip = () => {
    const step = tourSteps[currentStep];
    const element = document.querySelector(step.target);
    
    if (element) {
      const rect = element.getBoundingClientRect();
      let top = 0;
      let left = 0;

      switch (step.position) {
        case 'top':
          top = rect.top - 120;
          left = rect.left + (rect.width / 2) - 150;
          break;
        case 'bottom':
          top = rect.bottom + 20;
          left = rect.left + (rect.width / 2) - 150;
          break;
        case 'left':
          top = rect.top + (rect.height / 2) - 60;
          left = rect.left - 320;
          break;
        case 'right':
          top = rect.top + (rect.height / 2) - 60;
          left = rect.right + 20;
          break;
      }

      // Ensure tooltip stays within viewport
      const viewportWidth = window.innerWidth;
      const tooltipWidth = 300; // Width of the tooltip
      const margin = 20; // Minimum margin from viewport edge

      // Adjust horizontal position if needed
      if (left + tooltipWidth + margin > viewportWidth) {
        left = viewportWidth - tooltipWidth - margin;
      }
      if (left < margin) {
        left = margin;
      }

      setPosition({ top, left });
      element.classList.add('ring-2', 'ring-green-500', 'ring-offset-2');
    }
  };

  const handleNext = () => {
    const currentElement = document.querySelector(tourSteps[currentStep].target);
    if (currentElement) {
      currentElement.classList.remove('ring-2', 'ring-green-500', 'ring-offset-2');
    }

    if (currentStep < tourSteps.length - 1) {
      const nextStep = tourSteps[currentStep + 1];
      if (nextStep.route) {
        navigate(nextStep.route);
      }
      setCurrentStep(currentStep + 1);
    } else {
      handleFinish();
    }
  };

  const handleFinish = () => {
    const currentElement = document.querySelector(tourSteps[currentStep].target);
    if (currentElement) {
      currentElement.classList.remove('ring-2', 'ring-green-500', 'ring-offset-2');
    }
    navigate('/dashboard');
    onClose();
  };

  const handleClose = () => {
    const currentElement = document.querySelector(tourSteps[currentStep].target);
    if (currentElement) {
      currentElement.classList.remove('ring-2', 'ring-green-500', 'ring-offset-2');
    }
    navigate('/dashboard');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 z-40" />
      <div
        ref={tooltipRef}
        className="fixed z-50 bg-white rounded-lg shadow-lg p-4 w-[300px]"
        style={{
          top: `${position.top}px`,
          left: `${position.left}px`,
        }}
      >
        <button
          onClick={handleClose}
          className="absolute top-2 right-2 p-1 hover:bg-gray-100 rounded-full"
        >
          <X className="h-4 w-4" />
        </button>
        
        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-2">{tourSteps[currentStep].title}</h3>
          <p className="text-gray-600">{tourSteps[currentStep].content}</p>
        </div>
        
        <div className="flex justify-between items-center">
          <div className="flex gap-1">
            {tourSteps.map((_, index) => (
              <div
                key={index}
                className={`h-2 w-2 rounded-full ${
                  index === currentStep ? 'bg-green-500' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
          <button
            onClick={handleNext}
            className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
          >
            {currentStep === tourSteps.length - 1 ? 'Finalizar' : 'Siguiente'}
          </button>
        </div>
      </div>
    </>
  );
}