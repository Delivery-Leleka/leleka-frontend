import React from 'react';
import { X } from 'lucide-react';
import type { ChatItem } from '~/types';

interface UserProfileDrawerProps {
  isOpen: boolean;
  selectedUser: ChatItem | null;
  onClose: () => void;
}

export const UserProfileDrawer: React.FC<UserProfileDrawerProps> = ({
  isOpen,
  selectedUser,
  onClose,
}) => {
  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-[998] transition-opacity"
          onClick={onClose}
        />
      )}

      <div
        className={`fixed top-0 right-0 h-full w-full sm:w-[360px] bg-white border-l border-brand-50 shadow-2xl z-[999] transform transition-transform duration-300 p-6 flex flex-col items-stretch text-left ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <button
          onClick={onClose}
          className="self-end text-brand-700 hover:text-brand-950 p-1 cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex justify-center my-4">
          <div className="w-36 h-36 rounded-full bg-brand-100 flex items-center justify-center text-4xl font-bold text-brand-850 shrink-0 overflow-hidden">
            {selectedUser?.avatar ? (
              <img
                src={selectedUser.avatar}
                alt={selectedUser.name}
                className="w-full h-full object-cover"
              />
            ) : (
              selectedUser?.name?.[0] || 'U'
            )}
          </div>
        </div>

        <h2 className="text-2xl font-bold text-[#2C4121]">
          {selectedUser?.name || 'Лелека'}
        </h2>

        <p className="text-xs text-[#52793E] font-medium mt-1">
          {selectedUser?.status === 'В мережі' || !selectedUser?.status
            ? 'В мережі'
            : `Був(-ла): ${selectedUser?.date}`}
        </p>

        <p className="text-[#333333] text-base font-semibold mt-2">
          @{selectedUser?.username || 'user'}
        </p>

        <div className="mt-3 p-3 border border-[#E2EAD8] rounded-xl text-sm min-h-[90px] text-[#2C4121]">
          <span className="font-semibold block mb-1">Біо:</span>
          <span className="text-[#555555]">{selectedUser?.bio || ''}</span>
        </div>

        <div className="mt-8 flex justify-center">
          <button
            onClick={onClose}
            className="px-8 py-2.5 bg-[#3B522B] hover:bg-[#2C4121] text-white rounded-lg font-medium transition cursor-pointer text-sm"
          >
            Написати
          </button>
        </div>
      </div>
    </>
  );
};
