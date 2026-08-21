import React from "react";
import { Search, Plus, SlidersHorizontal, ArrowLeft } from "lucide-react";
import type { ChatItem } from "~/types";

interface ChatHeaderProps {
  selected: ChatItem | null;
  query: string;
  onQueryChange: (val: string) => void;
  onBack: () => void;
  onOpenProfile: () => void;
  onNavigateContacts: () => void;
  onToggleMenu: () => void;
}

export const ChatHeader: React.FC<ChatHeaderProps> = ({
  selected,
  query,
  onQueryChange,
  onBack,
  onOpenProfile,
  onNavigateContacts,
  onToggleMenu,
}) => {
  return (
    <header className="h-[120px] w-full px-8 flex items-center justify-between bg-white border-b border-gray-100 z-10 shrink-0">
      <div className="flex items-center gap-4">
        {selected ? (
          <>
            <button onClick={onBack} className="p-2 hover:bg-gray-100 rounded-xl transition">
              <ArrowLeft className="w-6 h-6 text-gray-700" />
            </button>
            <div onClick={onOpenProfile} className="flex items-center gap-3 cursor-pointer hover:opacity-80 transition">
              <div className="w-12 h-12 rounded-full bg-[#E8EDE0] flex items-center justify-center font-bold text-[#3A4D28]">
                {selected.name[0]}
              </div>
              <div>
                <h2 className="font-bold text-gray-900 text-lg leading-tight">{selected.name}</h2>
                <span className="text-xs text-green-600 font-medium">{selected.status}</span>
              </div>
            </div>
          </>
        ) : (
          <h1 className="text-[32px] font-semibold text-black tracking-tight">Чати</h1>
        )}
      </div>

      {!selected && (
        <div className="relative w-[505px] h-[58px]">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 w-[30px] h-[30px] flex items-center justify-center pointer-events-none">
            <Search className="w-[30px] h-[30px] text-gray-700" />
          </div>
          <input
            type="text"
            placeholder="Пошук контактів..."
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
            className="w-full h-full pl-[58px] pr-4 bg-white border-[1.5px] border-[#D9D9D9] rounded-[10px] text-[18px] text-black outline-none placeholder:text-[#999994] focus:border-[#425731] transition"
          />
        </div>
      )}

      <div className="flex items-center gap-3">
        {!selected ? (
          <button
            onClick={onNavigateContacts}
            className="h-[58px] px-6 flex items-center gap-2.5 bg-[#425731] text-white rounded-[10px] text-base font-medium hover:bg-[#344229] transition shadow-sm"
          >
            <span>Додати контакт</span>
            <Plus className="w-5 h-5" />
          </button>
        ) : (
          <button
            onClick={onToggleMenu}
            className="p-3 border border-[#425731] rounded-xl text-[#425731] hover:bg-[#ECF1DE]/40 transition"
          >
            <SlidersHorizontal className="w-6 h-6" />
          </button>
        )}
      </div>
    </header>
  );
};