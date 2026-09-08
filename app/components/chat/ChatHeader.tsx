import React, { useState } from "react";
import { Search, Plus, SlidersHorizontal, ArrowLeft, Menu, X, MoreVertical } from "lucide-react";
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
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);

  return (
    <header className="h-16 md:h-[100px] w-full px-4 md:px-6 flex items-center justify-between bg-white border-b border-gray-100 z-10 shrink-0 relative transition-all">
      {!selected && isMobileSearchOpen ? (
        <div className="flex items-center w-full gap-2 md:hidden">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
            <input
              type="text"
              autoFocus
              placeholder="Пошук..."
              value={query}
              onChange={(e) => onQueryChange(e.target.value)}
              className="w-full h-10 pl-10 pr-4 bg-gray-50 border border-gray-200 rounded-lg text-sm text-black outline-none focus:border-brand-800"
            />
          </div>
          <button
            onClick={() => setIsMobileSearchOpen(false)}
            className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg cursor-pointer"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
      ) : (
        <>
          <div className="flex items-center gap-3">
            {!selected && (
              <button
                onClick={onToggleMenu}
                className="p-2 -ml-2 text-gray-700 hover:bg-gray-100 rounded-lg md:hidden cursor-pointer"
              >
                <Menu className="w-6 h-6" />
              </button>
            )}

            {selected ? (
              <>
                <button
                  onClick={onBack}
                  className="p-1.5 md:p-2 hover:bg-gray-100 rounded-xl transition cursor-pointer md:hidden"
                >
                  <ArrowLeft className="w-5 h-5 text-gray-700" />
                </button>
                <div
                  onClick={onOpenProfile}
                  className="flex items-center gap-3 cursor-pointer hover:opacity-80 transition"
                >
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-[#D4E0B3] flex items-center justify-center font-bold text-gray-800 text-base">
                    {selected.name[0]}
                  </div>
                  <div>
                    <h2 className="font-bold text-gray-900 text-base md:text-lg leading-tight">
                      {selected.name}
                    </h2>
                    <span className="text-xs text-green-600 font-medium">
                      {selected.status}
                    </span>
                  </div>
                </div>
              </>
            ) : (
              <h1 className="text-xl md:text-[28px] font-bold text-black tracking-tight">
                Чати
              </h1>
            )}
          </div>

          {!selected && (
            <div className="hidden lg:block relative w-[280px] xl:w-[360px] h-[48px]">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Пошук контактів..."
                value={query}
                onChange={(e) => onQueryChange(e.target.value)}
                className="w-full h-full pl-12 pr-4 bg-white border border-gray-200 rounded-xl text-base text-black outline-none placeholder:text-gray-400 focus:border-brand-800 transition"
              />
            </div>
          )}

          <div className="flex items-center gap-2 md:gap-3">
            {!selected ? (
              <>
                <button
                  onClick={() => setIsMobileSearchOpen(true)}
                  className="p-2 text-gray-700 hover:bg-gray-100 rounded-lg lg:hidden cursor-pointer"
                >
                  <Search className="w-6 h-6" />
                </button>

                <button
                  onClick={() => alert("Лайт версія")}
                  className="hidden xl:flex h-[48px] px-4 items-center justify-center gap-2 bg-[#3A5A40] text-white rounded-xl text-sm font-medium hover:bg-[#344E41] transition cursor-pointer"
                >
                  <span>Увімкнути лайт версію</span>
                  <Plus className="w-4 h-4" />
                </button>

                <button
                  onClick={onNavigateContacts}
                  className="h-10 px-3 md:h-[48px] md:px-5 flex items-center justify-center gap-2 bg-[#3A5A40] text-white rounded-xl text-sm font-medium hover:bg-[#344E41] transition cursor-pointer shadow-sm"
                >
                  <span className="hidden sm:inline">Додати контакт</span>
                  <Plus className="w-5 h-5" />
                </button>

                <button
                  onClick={() => alert("Фільтри")}
                  className="p-2.5 border border-gray-200 text-gray-700 rounded-xl hover:bg-gray-50 transition cursor-pointer"
                >
                  <SlidersHorizontal className="w-5 h-5" />
                </button>
              </>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => alert("Пошук в чаті")}
                  className="p-2.5 text-gray-600 hover:bg-gray-100 rounded-xl transition cursor-pointer"
                >
                  <Search className="w-5 h-5" />
                </button>
                <button
                  onClick={() => alert("Додати до чату")}
                  className="p-2.5 text-gray-600 hover:bg-gray-100 rounded-xl transition cursor-pointer"
                >
                  <Plus className="w-5 h-5" />
                </button>
                <button
                  onClick={onToggleMenu}
                  className="p-2.5 text-gray-600 hover:bg-gray-100 rounded-xl transition cursor-pointer"
                >
                  <MoreVertical className="w-5 h-5" />
                </button>
              </div>
            )}
          </div>
        </>
      )}
    </header>
  );
};