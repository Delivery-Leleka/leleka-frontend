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
    <div className="absolute top-16 right-8 w-60 bg-white border border-gray-200 rounded-2xl shadow-xl z-50 py-2">
      <ul className="flex flex-col text-sm text-gray-700">
        <li className="flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50 cursor-pointer">
          <Pin className="w-4 h-4 text-gray-500" />
          <span>Закріпити чат</span>
        </li>
        <li className="flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50 cursor-pointer">
          <Lock className="w-4 h-4 text-gray-500" />
          <span>Перенести в закриту папку</span>
        </li>
        <li className="flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50 cursor-pointer">
          <Archive className="w-4 h-4 text-gray-500" />
          <span>Архівувати</span>
        </li>
        <li className="flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50 cursor-pointer">
          <Ban className="w-4 h-4 text-gray-500" />
          <span>Заблокувати</span>
        </li>
        <li
          onClick={onDeleteClick}
          className="flex items-center gap-3 px-4 py-2.5 text-red-500 hover:bg-red-50 cursor-pointer"
        >
          <Trash2 className="w-4 h-4 text-red-500" />
          <span>Видалити чат</span>
        </li>
      </ul>
    </div>
  );
};