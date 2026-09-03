import React from "react";
import { X } from "lucide-react";
import type { ChatItem } from "~/types";

interface UserProfileDrawerProps {
  isOpen: boolean;
  selectedUser: ChatItem | null;
  onClose: () => void;
}

export const UserProfileDrawer: React.FC<UserProfileDrawerProps> = ({ isOpen, selectedUser, onClose }) => {
  return (
    <div
      className={`fixed top-0 right-0 h-full w-[320px] bg-white border-l border-brand-50 shadow-2xl z-[999] transform transition-transform duration-300 p-6 flex flex-col items-center text-center ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <button onClick={onClose} className="self-end text-brand-700 hover:text-brand-950 font-bold p-1 cursor-pointer">
        <X className="w-5 h-5" />
      </button>
      <div className="w-32 h-32 rounded-full bg-brand-100 my-4 flex items-center justify-center text-4xl font-bold text-brand-850">
        {selectedUser?.name[0] || "U"}
      </div>
      <h2 className="text-xl font-bold text-brand-950">{selectedUser?.name}</h2>
      <p className="text-brand-700 text-sm">@leleka_user</p>
      <p className="mt-2 text-xs text-brand-600 font-medium">
        {selectedUser?.status === "В мережі" ? "Зараз в мережі" : `Був(-ла): ${selectedUser?.date}`}
      </p>
      <button
        onClick={onClose}
        className="mt-auto w-full py-2.5 bg-brand-850 text-white rounded-xl font-medium hover:bg-brand-950 transition cursor-pointer"
      >
        Написати
      </button>
    </div>
  );
};