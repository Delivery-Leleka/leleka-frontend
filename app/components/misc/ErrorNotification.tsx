import type { ReactNode } from "react";

interface ErrorNotificationProps {
    children: ReactNode;
}

const ErrorNotification = ({children}: ErrorNotificationProps) => {
    return <div className="fixed top-24 left-1/2 -translate-x-1/2 bg-[#C23424] text-white px-6 py-3 rounded-lg shadow-md flex items-center
         justify-between w-[90%] sm:w-2/5 z-50 animate-slideDown">
          {children}
        </div>
}
 
export default ErrorNotification;