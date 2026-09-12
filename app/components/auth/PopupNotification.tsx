import type { ValidationError } from '~/constants/auth';

interface PopupNotificationProps {
  message: ValidationError | null;
}

export function PopupNotification({ message }: PopupNotificationProps) {
  if (!message) return null;

  return (
    <div className="fixed top-20 left-1/2 -translate-x-1/2 px-6 py-3 rounded-lg shadow-md flex items-center gap-3 z-50 animate-slideDown bg-red-300 border border-gray-300">
      <img src={message.icon} alt="!" className="w-5 h-5" />
      <span className="font-medium text-[#262424]">{message.msg}</span>
    </div>
  );
}