import React from "react";
import { Pin, Lock, Archive, Share2, Trash2, Edit2, Copy } from "lucide-react";

interface ChatOptionsMenuProps {
  isOpen: boolean;
  onDeleteClick: () => void;
  onClose: () => void;
}

export const ChatOptionsMenu: React.FC<ChatOptionsMenuProps> = ({
  isOpen,
  onDeleteClick,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 z-40" onClick={onClose} />
      <div className="absolute top-16 right-4 w-56 bg-white border border-gray-100 rounded-2xl shadow-2xl z-50 py-2">
        <ul className="flex flex-col text-sm text-gray-800 font-medium">
          <li onClick={onClose} className="flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50 cursor-pointer transition">
            <Copy className="w-4 h-4 text-gray-600" />
            <span>Копіювати</span>
          </li>
          <li onClick={onClose} className="flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50 cursor-pointer transition">
            <Pin className="w-4 h-4 text-gray-600" />
            <span>Закріпити</span>
          </li>
          <li onClick={onClose} className="flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50 cursor-pointer transition">
            <Edit2 className="w-4 h-4 text-gray-600" />
            <span>Редагувати</span>
          </li>
          <li onClick={onClose} className="flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50 cursor-pointer transition">
            <Archive className="w-4 h-4 text-gray-600" />
            <span>Архівувати</span>
          </li>
          <li onClick={onClose} className="flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50 cursor-pointer transition">
            <Share2 className="w-4 h-4 text-gray-600" />
            <span>Переслати</span>
          </li>
          <li
            onClick={() => {
              onClose();
              onDeleteClick();
            }}
            className="flex items-center gap-3 px-4 py-2.5 text-red-600 hover:bg-red-50 cursor-pointer transition border-t border-gray-100 mt-1 pt-2.5"
          >
            <Trash2 className="w-4 h-4 text-red-600" />
            <span>Видалити</span>
          </li>
        </ul>
      </div>
    </>
  );
};