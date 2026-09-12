import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import type { ValidationError } from '~/constants/auth';

interface PopupNotificationProps {
  message: ValidationError | null;
  onClose?: () => void;
}

export function PopupNotification({ message, onClose }: PopupNotificationProps) {
  const [activeMessage, setActiveMessage] = useState<ValidationError | null>(message);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    if (message) {
      setActiveMessage(message);
      // Невеликий шарнір для спрацювання CSS-анімації
      const timer = setTimeout(() => setAnimate(true), 20);
      return () => clearTimeout(timer);
    } else {
      setAnimate(false);
      // Після завершення анімації приховування повністю прибираємо з DOM
      const timer = setTimeout(() => setActiveMessage(null), 200);
      return () => clearTimeout(timer);
    }
  }, [message]);

  const handleClose = () => {
    setAnimate(false);
    setTimeout(() => {
      setActiveMessage(null);
      onClose?.();
    }, 200);
  };

  if (!activeMessage) return null;

  const isSuccess = activeMessage.icon === '/icons/sucess-icons8.png';

  return (
    <div
      className={`fixed top-12 left-1/2 -translate-x-1/2 px-5 py-2.5 rounded-xl shadow-lg flex items-center justify-between gap-3 z-50 transition-all duration-200 ease-out min-w-[280px] max-w-[90vw] text-white font-semibold ${
        animate ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'
      } ${isSuccess ? 'bg-[#2D6A4F]' : 'bg-[#C83727]'}`}
    >
      <div className="flex items-center gap-3">
        <span className="text-sm md:text-base font-raleway">{activeMessage.msg}</span>
        <img
          src={activeMessage.icon}
          alt="icon"
          className="w-5 h-5 object-contain brightness-0 invert"
        />
      </div>

      <button
        type="button"
        onClick={handleClose}
        className="ml-2 text-white/80 hover:text-white transition-colors focus:outline-none cursor-pointer"
        aria-label="Закрити"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}