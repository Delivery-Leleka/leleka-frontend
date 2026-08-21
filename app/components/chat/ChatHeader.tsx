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
    <header className="h-[80px] w-full px-12 flex items-center justify-between bg-white border-b border-gray-200 z-10 shrink-0">
      <div className="flex items-center gap-3">
        {selected ? (
          <>
            <button onClick={onBack} className="p-2 hover:bg-gray-200 rounded-xl transition">
              <ArrowLeft className="w-5 h-5 text-gray-700" />
            </button>
            <div onClick={onOpenProfile} className="flex items-center gap-3 cursor-pointer hover:opacity-80 transition">
              <div className="w-10 h-10 rounded-full bg-[#E8EDE0] flex items-center justify-center font-bold text-[#3A4D28]">
                {selected.name[0]}
              </div>
              <div>
                <h2 className="font-bold text-gray-900 leading-tight">{selected.name}</h2>
                <span className="text-xs text-green-600 font-medium">{selected.status}</span>
              </div>
            </div>
          </>
        ) : (
          <h1 className="text-[28px] font-bold text-black tracking-tight">Чати</h1>
        )}
      </div>

      {!selected && (
        <div className="relative w-full max-w-[480px]">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Пошук контактів..."
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-white border border-gray-300 rounded-md text-sm outline-none placeholder:text-gray-400 focus:border-[#425235] transition"
          />
        </div>
      )}

      <div className="flex items-center gap-3">
        {!selected ? (
          <button
            onClick={onNavigateContacts}
            className="flex items-center gap-2.5 px-6 py-2.5 bg-[#425235] text-white rounded-xl text-sm font-medium hover:bg-[#344229] transition shadow-sm"
          >
            <span>Додати контакт</span>
            <Plus className="w-4 h-4" />
          </button>
        ) : (
          <button
            onClick={onToggleMenu}
            className="p-2.5 border border-purple-200 rounded-xl text-purple-600 hover:bg-purple-50 transition"
          >
            <SlidersHorizontal className="w-5 h-5" />
          </button>
        )}
      </div>
    </header>
  );
};