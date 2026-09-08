import React from "react";
import { Pin, Lock, Archive, Ban, Trash2 } from "lucide-react";

interface ChatOptionsMenuProps {
  isOpen: boolean;
  onDeleteClick: () => void;
}

export const ChatOptionsMenu: React.FC<ChatOptionsMenuProps> = ({
  isOpen,
  onDeleteClick,
}) => {
  if (!isOpen) return null;

  return (
    <div className="absolute top-16 right-8 w-60 bg-white border border-brand-50 rounded-2xl shadow-xl z-50 py-2">
      <ul className="flex flex-col text-sm text-brand-950 font-medium">
        <li className="flex items-center gap-3 px-4 py-2.5 hover:bg-brand-50/60 cursor-pointer transition-colors">
          <Pin className="w-4 h-4 text-brand-700" />
          <span>Закріпити чат</span>
        </li>
        <li className="flex items-center gap-3 px-4 py-2.5 hover:bg-brand-50/60 cursor-pointer transition-colors">
          <Lock className="w-4 h-4 text-brand-700" />
          <span>Перенести в закриту папку</span>
        </li>
        <li className="flex items-center gap-3 px-4 py-2.5 hover:bg-brand-50/60 cursor-pointer transition-colors">
          <Archive className="w-4 h-4 text-brand-700" />
          <span>Архівувати</span>
        </li>
        <li className="flex items-center gap-3 px-4 py-2.5 hover:bg-brand-50/60 cursor-pointer transition-colors">
          <Ban className="w-4 h-4 text-brand-700" />
          <span>Заблокувати</span>
        </li>
        <li
          onClick={onDeleteClick}
          className="flex items-center gap-3 px-4 py-2.5 text-danger-primary hover:bg-danger-primary/10 cursor-pointer transition-colors"
        >
          <Trash2 className="w-4 h-4 text-danger-primary" />
          <span>Видалити чат</span>
        </li>
      </ul>
    </div>
  );
};