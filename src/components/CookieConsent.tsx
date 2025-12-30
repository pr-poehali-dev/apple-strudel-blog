import { useState, useEffect } from 'react';
import { X } from 'lucide-react';

export default function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookieConsent');
    if (!consent) {
      setIsVisible(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookieConsent', 'accepted');
    setIsVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem('cookieConsent', 'declined');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t-2 border-orange-500 shadow-2xl z-50 animate-in slide-in-from-bottom duration-500">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex-1">
            <h3 className="text-lg font-bold text-gray-900 mb-2">
              🍪 Мы используем файлы cookie
            </h3>
            <p className="text-sm text-gray-600">
              Этот сайт использует cookie для улучшения вашего опыта, персонализации контента и анализа трафика. 
              Продолжая использовать сайт, вы соглашаетесь с использованием cookie.
            </p>
          </div>
          
          <div className="flex items-center gap-3">
            <button
              onClick={handleDecline}
              className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Отклонить
            </button>
            <button
              onClick={handleAccept}
              className="px-6 py-2 text-sm font-medium text-white bg-orange-500 rounded-lg hover:bg-orange-600 transition-colors"
            >
              Принять
            </button>
          </div>

          <button
            onClick={handleDecline}
            className="absolute top-4 right-4 md:relative md:top-0 md:right-0 text-gray-400 hover:text-gray-600 transition-colors"
            aria-label="Закрыть"
          >
            <X size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}
