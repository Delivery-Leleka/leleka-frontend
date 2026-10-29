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
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-[999]">
      <div className="bg-white w-[360px] rounded-2xl p-6 shadow-2xl flex flex-col items-center text-center animate-in fade-in zoom-in-95 duration-150">
        <h3 className="font-bold text-[#111111] text-base mb-6 px-2 leading-snug">
          Дійсно хочете видалити цей чат?
        </h3>

        <div className="flex gap-4 w-full justify-center px-2">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 py-2 border border-[#7A9A60] text-[#7A9A60] rounded-lg font-medium hover:bg-[#7A9A60]/10 transition cursor-pointer"
          >
            Ні
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="flex-1 py-2 border border-[#D96B64] text-[#D96B64] rounded-lg font-medium hover:bg-[#D96B64]/10 transition cursor-pointer"
          >
            Так
          </button>
        </div>
      </div>
    </div>
  );
};
