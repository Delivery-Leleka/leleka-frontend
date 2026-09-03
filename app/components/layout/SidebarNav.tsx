import React from "react";
import { MessageSquareText as ChatIcon, User, Folders, SettingsIcon, Edit3 } from "lucide-react";
import { MY_PROFILE } from "~/components/chat/mockData";

interface SidebarNavProps {
  onSelectHome: () => void;
  myProfilePop: boolean;
  setMyProfilePop: (val: boolean) => void;
  onNavigate: (path: string) => void;
}

export const SidebarNav: React.FC<SidebarNavProps> = ({
  onSelectHome,
  myProfilePop,
  setMyProfilePop,
  onNavigate,
}) => {
  return (
    <nav className="w-[100px] h-full bg-brand-100 flex flex-col justify-between items-center pt-[34px] pb-8 shrink-0 z-20 relative">
      <img
        src="/logo.svg"
        alt="Logo"
        className="w-[89px] h-[59px] cursor-pointer object-contain"
        onClick={onSelectHome}
      />
      <div className="flex flex-col items-center gap-[55px]">
        <button 
          onClick={onSelectHome} 
          className="text-brand-800 hover:opacity-80 transition flex items-center justify-center w-10 h-10 cursor-pointer" 
          title="Чати"
        >
          <ChatIcon className="w-10 h-10" />
        </button>
        <button 
          onClick={() => onNavigate("/contacts")} 
          className="text-brand-800 hover:opacity-80 transition flex items-center justify-center w-10 h-10 cursor-pointer" 
          title="Контакти"
        >
          <User className="w-10 h-10" />
        </button>
        <button 
          onClick={() => onNavigate("/privateFolder")} 
          className="text-brand-800 hover:opacity-80 transition flex items-center justify-center w-10 h-10 cursor-pointer" 
          title="Приватна папка"
        >
          <Folders className="w-10 h-10" />
        </button>
      </div>
      <div className="flex flex-col items-center gap-[35px] relative">
        <button 
          onClick={() => onNavigate("/settings")} 
          className="text-brand-800 hover:opacity-80 transition flex items-center justify-center w-10 h-10 cursor-pointer" 
          title="Налаштування"
        >
          <SettingsIcon className="w-10 h-10" />
        </button>
        <button
          onClick={() => setMyProfilePop(!myProfilePop)}
          className="w-12 h-12 rounded-full bg-white text-brand-800 font-bold flex items-center justify-center shadow-sm hover:scale-105 transition border border-brand-50 cursor-pointer"
          title="Мій профіль"
        >
          {MY_PROFILE.avatar}
        </button>
        {myProfilePop && (
          <>
            <div className="fixed inset-0 z-30" onClick={() => setMyProfilePop(false)} />
            <div className="absolute bottom-0 left-[110px] w-72 bg-white border border-brand-50 rounded-2xl shadow-xl z-40 p-4">
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
    </nav>
  );
};