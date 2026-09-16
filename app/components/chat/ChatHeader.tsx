import React, { useState } from 'react';
import {
  Search,
  Plus,
  SlidersHorizontal,
  ArrowLeft,
  Menu,
  X,
} from 'lucide-react';
import type { ChatItem } from '~/types';

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
    <header className="h-16 md:h-[120px] w-full px-4 md:px-8 flex items-center justify-between bg-white border-b border-gray-100 z-10 shrink-0 relative transition-all">
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
          <div className="flex items-center gap-2 md:gap-4">
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
                  className="p-1.5 md:p-2 hover:bg-gray-100 rounded-xl transition cursor-pointer"
                >
                  <ArrowLeft className="w-5 h-5 md:w-6 md:h-6 text-gray-700" />
                </button>
                <div
                  onClick={onOpenProfile}
                  className="flex items-center gap-2.5 md:gap-3 cursor-pointer hover:opacity-80 transition"
                >
                  <div className="w-9 h-9 md:w-12 md:h-12 rounded-full bg-brand-100 flex items-center justify-center font-bold text-brand-850 text-sm md:text-base">
                    {selected.name[0]}
                  </div>
                  <div>
                    <h2 className="font-bold text-gray-900 text-base md:text-lg leading-tight truncate max-w-[140px] sm:max-w-[200px] md:max-w-none">
                      {selected.name}
                    </h2>
                    <span className="text-[11px] md:text-xs text-green-600 font-medium">
                      {selected.status}
                    </span>
                  </div>
                </div>
              </>
            ) : (
              <h1 className="text-xl md:text-[32px] font-semibold text-black tracking-tight font-title">
                Чати
              </h1>
            )}
          </div>

          {!selected && (
            <div className="hidden md:block relative w-[320px] lg:w-[505px] h-[58px]">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 w-[30px] h-[30px] flex items-center justify-center pointer-events-none">
                <Search className="w-[30px] h-[30px] text-gray-700" />
              </div>
              <input
                type="text"
                placeholder="Пошук контактів..."
                value={query}
                onChange={(e) => onQueryChange(e.target.value)}
                className="w-full h-full pl-[58px] pr-4 bg-white border-[1.5px] border-border-input rounded-[10px] text-[18px] text-black outline-none placeholder:text-placeholder focus:border-brand-800 transition"
              />
            </div>
          )}

          <div className="flex items-center gap-1 md:gap-3">
            {!selected ? (
              <>
                <button
                  onClick={() => setIsMobileSearchOpen(true)}
                  className="p-2 text-gray-700 hover:bg-gray-100 rounded-lg md:hidden cursor-pointer"
                >
                  <Search className="w-6 h-6" />
                </button>

                <button
                  onClick={onNavigateContacts}
                  className="h-10 px-3 md:h-[58px] md:px-6 flex items-center justify-center gap-2.5 bg-brand-800 text-white rounded-lg md:rounded-[10px] text-sm md:text-base font-medium hover:bg-brand-900 transition shadow-sm cursor-pointer"
                >
                  <span className="hidden md:inline">Додати контакт</span>
                  <Plus className="w-5 h-5" />
                </button>
              </>
            ) : (
              <button
                onClick={onToggleMenu}
                className="p-2 md:p-3 border border-brand-800 rounded-lg md:rounded-xl text-brand-800 hover:bg-brand-50 transition cursor-pointer"
              >
                <SlidersHorizontal className="w-5 h-5 md:w-6 md:h-6" />
              </button>
            )}
          </div>
        </>
      )}
    </header>
  );
};
