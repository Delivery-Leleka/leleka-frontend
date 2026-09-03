import React from "react";

interface DeleteModalProps {
  onClose: () => void;
  onDelete: () => void;
}

export const DeleteModal: React.FC<DeleteModalProps> = ({ onClose, onDelete }) => {
  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex justify-center items-center z-[999]">
      <div className="bg-white w-[340px] rounded-2xl p-6 shadow-2xl flex flex-col items-center text-center">
        <h3 className="font-bold text-gray-900 text-lg mb-2">Дійсно хочете видалити цей чат?</h3>
        <p className="text-sm text-gray-500 mb-6">Цю дію не можна буде скасувати.</p>
        <div className="flex gap-4 w-full">
          <button
            onClick={onClose}
            className="flex-1 py-2 border border-[var(--color-brand-500)] text-[var(--color-brand-700)] rounded-lg font-medium hover:bg-green-50 transition"
          >
            Назад
          </button>
          <button
            onClick={onDelete}
            className="flex-1 py-2 bg-[var(--color-danger-primary)] text-white rounded-lg font-medium hover:bg-[var(--color-danger-hover)] transition"
          >
            Видалити
          </button>
        </div>
      </div>
    </div>
  );
};