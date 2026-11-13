import React from 'react';

interface DeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export const DeleteModal: React.FC<DeleteModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-[999] p-4">
      <div className="bg-white rounded-2xl p-8 max-w-md w-full text-center shadow-xl animate-in fade-in zoom-in-95 duration-150">
        <h3 className="text-xl font-bold text-black mb-8 leading-snug">
          Дійсно хочете видалити цей чат?
        </h3>

        <div className="flex items-center justify-center gap-6">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 py-2.5 px-4 border border-[#5E8A42] text-[#5E8A42] rounded-lg text-base font-normal hover:bg-[#5E8A42]/10 active:bg-[#5E8A42]/20 transition cursor-pointer"
          >
            Ні
          </button>
          <button
            type="button"
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className="flex-1 py-2.5 px-4 border border-[#C84B42] text-[#C84B42] rounded-lg text-base font-normal hover:bg-[#C84B42]/10 active:bg-[#C84B42]/20 transition cursor-pointer"
          >
            Так
          </button>
        </div>
      </div>
    </div>
  );
};