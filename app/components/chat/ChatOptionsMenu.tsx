import React from 'react';
import {
  UserPlus,
  Pencil,
  Users,
  Share2,
  Ban,
  Trash2,
  EyeClosed,
} from 'lucide-react';

interface ChatOptionsMenuProps {
  isOpen: boolean;
  onClose: () => void;
  isContact?: boolean;
  isBlocked?: boolean;
  onAddContact?: () => void;
  onEditContact?: () => void;
  onAddToGroup?: () => void;
  onSecretChat?: () => void;
  onShareContact?: () => void;
  onBlockClick: () => void;
  onDeleteClick: () => void;
}

export const ChatOptionsMenu: React.FC<ChatOptionsMenuProps> = ({
  isOpen,
  onClose,
  isContact = false,
  isBlocked = false,
  onAddContact,
  onEditContact,
  onAddToGroup,
  onSecretChat,
  onShareContact,
  onBlockClick,
  onDeleteClick,
}) => {
  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 z-40" onClick={onClose} />
      <div className="absolute top-full right-0 mt-2 w-64 bg-white border border-gray-100 rounded-2xl shadow-xl z-50 py-2">
        <ul className="flex flex-col text-sm text-[#222222] font-medium">
          {isContact ? (
            <li
              onClick={onEditContact}
              className="flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50 cursor-pointer transition-colors"
            >
              <Pencil className="w-4 h-4 text-gray-600" />
              <span>Змінити</span>
            </li>
          ) : (
            <li
              onClick={onAddContact}
              className="flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50 cursor-pointer transition-colors"
            >
              <UserPlus className="w-4 h-4 text-gray-600" />
              <span>Додати до контактів</span>
            </li>
          )}

          <li
            onClick={onAddToGroup}
            className="flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50 cursor-pointer transition-colors"
          >
            <Users className="w-4 h-4 text-gray-600" />
            <span>Додати до групи</span>
          </li>

          <li
            onClick={onSecretChat}
            className="flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50 cursor-pointer transition-colors"
          >
            <EyeClosed className="w-4 h-4 text-gray-600" />
            <span>Засекретити</span>
          </li>

          <li
            onClick={onShareContact}
            className="flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50 cursor-pointer transition-colors"
          >
            <Share2 className="w-4 h-4 text-gray-600" />
            <span>Поділитись контактом</span>
          </li>

          <li
            onClick={onBlockClick}
            className="flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50 cursor-pointer transition-colors"
          >
            <Ban className="w-4 h-4 text-gray-600" />
            <span>{isBlocked ? 'Розблокувати' : 'Заблокувати'}</span>
          </li>

          <li
            onClick={onDeleteClick}
            className="flex items-center gap-3 px-4 py-2.5 text-[#E55353] hover:bg-red-50 cursor-pointer transition-colors"
          >
            <Trash2 className="w-4 h-4 text-[#E55353]" />
            <span>Видалити</span>
          </li>
        </ul>
      </div>
    </>
  );
};