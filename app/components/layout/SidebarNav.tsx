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
    <nav className="w-[80px] h-full bg-[#ECF1DE] flex flex-col justify-between items-center py-6 shrink-0 z-20 border-r border-gray-200 relative">
      <img
        src="/logo.svg"
        alt="Logo"
        className="w-[50px] h-auto cursor-pointer"
        onClick={onSelectHome}
      />

      <div className="flex flex-col items-center gap-8">
        <button onClick={onSelectHome} className="text-[#3F4935] hover:text-[#2E3E1F] transition" title="Чати">
          <ChatIcon className="w-6 h-6" />
        </button>
        <button onClick={() => onNavigate("/contacts")} className="text-[#8B9380] hover:text-[#3F4935] transition" title="Контакти">
          <User className="w-6 h-6" />
        </button>
        <button onClick={() => onNavigate("/privateFolder")} className="text-[#8B9380] hover:text-[#3F4935] transition" title="Приватна папка">
          <Folders className="w-6 h-6" />
        </button>
      </div>

      <div className="flex flex-col items-center gap-6 relative">
        <button onClick={() => onNavigate("/settings")} className="text-[#8B9380] hover:text-[#3F4935] transition" title="Налаштування">
          <SettingsIcon className="w-6 h-6" />
        </button>

        <button
          onClick={() => setMyProfilePop(!myProfilePop)}
          className="w-10 h-10 rounded-full bg-[#3A4D28] text-white font-bold flex items-center justify-center border-2 border-white shadow-md hover:scale-105 transition"
          title="Мій профіль"
        >
          {MY_PROFILE.avatar}
        </button>

        {myProfilePop && (
          <>
            <div className="fixed inset-0 z-30" onClick={() => setMyProfilePop(false)} />
            <div className="absolute bottom-0 left-16 w-72 bg-white border border-gray-200 rounded-2xl shadow-xl z-40 p-4">
              <div className="flex items-center gap-3 pb-3 border-b border-gray-100">
                <div className="w-12 h-12 rounded-full bg-[#3A4D28] text-white font-bold text-lg flex items-center justify-center shrink-0">
                  {MY_PROFILE.avatar}
                </div>
                <div className="min-w-0">
                  <h3 className="font-bold text-gray-900 text-sm truncate">{MY_PROFILE.name}</h3>
                  <p className="text-xs text-green-600 font-medium truncate">{MY_PROFILE.username}</p>
                </div>
              </div>
              <p className="text-xs text-gray-600 my-3 leading-relaxed bg-gray-50 p-2.5 rounded-xl border border-gray-100">
                {MY_PROFILE.bio}
              </p>
              <button
                onClick={() => {
                  setMyProfilePop(false);
                  onNavigate("/myProfile");
                }}
                className="w-full py-2 bg-[#3A4D28] text-white rounded-xl text-xs font-medium hover:bg-[#2E3E1F] transition flex items-center justify-center gap-1.5 shadow-sm"
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