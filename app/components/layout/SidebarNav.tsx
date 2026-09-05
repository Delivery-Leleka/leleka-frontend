import React from "react";
import { MessageSquareText as ChatIcon, User, Folders, SettingsIcon, Edit3, X } from "lucide-react";
import { MY_PROFILE } from "~/components/chat/mockData";

interface SidebarNavProps {
  isOpen?: boolean;
  onClose?: () => void;
  onSelectHome: () => void;
  myProfilePop: boolean;
  setMyProfilePop: (val: boolean) => void;
  onNavigate: (path: string) => void;
}

export const SidebarNav: React.FC<SidebarNavProps> = ({
  isOpen = false,
  onClose,
  onSelectHome,
  myProfilePop,
  setMyProfilePop,
  onNavigate,
}) => {
  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden transition-opacity duration-300"
          onClick={onClose}
        />
      )}

      <aside
        className={`
          fixed md:relative top-0 left-0 h-full w-[280px] md:w-[100px] bg-brand-100 
          flex flex-col justify-between items-center pt-6 md:pt-[34px] pb-8 shrink-0 z-50 
          transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        `}
      >
        <div className="w-full px-6 flex items-center justify-between md:justify-center">
          <img
            src="/logo.svg"
            alt="Logo"
            className="w-[89px] h-[59px] cursor-pointer object-contain"
            onClick={() => {
              onSelectHome();
              onClose?.();
            }}
          />
          <button
            onClick={onClose}
            className="md:hidden p-2 text-brand-800 hover:bg-brand-200/50 rounded-xl transition cursor-pointer"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="flex flex-col items-center gap-4 md:gap-[55px] w-full px-4">
          <button
            onClick={() => {
              onSelectHome();
              onClose?.();
            }}
            className="w-full md:w-10 h-12 md:h-10 text-brand-800 hover:bg-brand-200/50 md:hover:bg-transparent rounded-xl md:rounded-none transition flex items-center justify-start md:justify-center px-4 md:px-0 gap-4 cursor-pointer"
            title="Чати"
          >
            <ChatIcon className="w-6 h-6 md:w-10 md:h-10 shrink-0" />
            <span className="font-medium text-base md:hidden">Чати</span>
          </button>

          <button
            onClick={() => {
              onNavigate("/contacts");
              onClose?.();
            }}
            className="w-full md:w-10 h-12 md:h-10 text-brand-800 hover:bg-brand-200/50 md:hover:bg-transparent rounded-xl md:rounded-none transition flex items-center justify-start md:justify-center px-4 md:px-0 gap-4 cursor-pointer"
            title="Контакти"
          >
            <User className="w-6 h-6 md:w-10 md:h-10 shrink-0" />
            <span className="font-medium text-base md:hidden">Контакти</span>
          </button>

          <button
            onClick={() => {
              onNavigate("/privateFolder");
              onClose?.();
            }}
            className="w-full md:w-10 h-12 md:h-10 text-brand-800 hover:bg-brand-200/50 md:hover:bg-transparent rounded-xl md:rounded-none transition flex items-center justify-start md:justify-center px-4 md:px-0 gap-4 cursor-pointer"
            title="Приватна папка"
          >
            <Folders className="w-6 h-6 md:w-10 md:h-10 shrink-0" />
            <span className="font-medium text-base md:hidden">Приватна папка</span>
          </button>
        </div>

        <div className="flex flex-col items-center gap-4 md:gap-[35px] relative w-full px-4 md:px-0">
          <button
            onClick={() => {
              onNavigate("/settings");
              onClose?.();
            }}
            className="w-full md:w-10 h-12 md:h-10 text-brand-800 hover:bg-brand-200/50 md:hover:bg-transparent rounded-xl md:rounded-none transition flex items-center justify-start md:justify-center px-4 md:px-0 gap-4 cursor-pointer"
            title="Налаштування"
          >
            <SettingsIcon className="w-6 h-6 md:w-10 md:h-10 shrink-0" />
            <span className="font-medium text-base md:hidden">Налаштування</span>
          </button>

          <button
            onClick={() => setMyProfilePop(!myProfilePop)}
            className="w-12 h-12 rounded-full bg-white text-brand-800 font-bold flex items-center justify-center shadow-sm hover:scale-105 transition border border-brand-50 cursor-pointer shrink-0"
            title="Мій профіль"
          >
            {MY_PROFILE.avatar}
          </button>

          {myProfilePop && (
            <>
              <div className="fixed inset-0 z-30" onClick={() => setMyProfilePop(false)} />
              <div className="absolute bottom-16 md:bottom-0 left-4 md:left-[110px] w-64 md:w-72 bg-white border border-brand-50 rounded-2xl shadow-xl z-40 p-4">
                <div className="flex items-center gap-3 pb-3 border-b border-gray-100">
                  <div className="w-12 h-12 rounded-full bg-brand-850 text-white font-bold text-lg flex items-center justify-center shrink-0">
                    {MY_PROFILE.avatar}
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-bold text-brand-950 text-sm truncate">{MY_PROFILE.name}</h3>
                    <p className="text-xs text-brand-600 font-medium truncate">{MY_PROFILE.username}</p>
                  </div>
                </div>
                <p className="text-xs text-brand-700 my-3 leading-relaxed bg-brand-50/50 p-2.5 rounded-xl border border-brand-50">
                  {MY_PROFILE.bio}
                </p>
                <button
                  onClick={() => {
                    setMyProfilePop(false);
                    onNavigate("/myProfile");
                    onClose?.();
                  }}
                  className="w-full py-2 bg-brand-850 text-white rounded-xl text-xs font-medium hover:bg-brand-950 transition flex items-center justify-center gap-1.5 shadow-sm cursor-pointer"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  <span>Редагувати профіль</span>
                </button>
              </div>
            </>
          )}
        </div>
      </aside>
    </>
  );
};