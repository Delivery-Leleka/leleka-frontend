import React, { useRef } from "react";
import { Send, Paperclip } from "lucide-react";

interface MessageInputProps {
  inputText: string;
  setInputText: (val: string) => void;
  onSend: (e?: React.FormEvent) => void;
}

export const MessageInput: React.FC<MessageInputProps> = ({
  inputText,
  setInputText,
  onSend,
}) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  return (
    <form onSubmit={onSend} className="w-full p-4 bg-white border-t border-gray-200">
      <div className="max-w-4xl mx-auto flex items-center gap-3">
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="p-2.5 text-gray-500 hover:bg-gray-100 rounded-xl transition"
        >
          <Paperclip className="w-5 h-5" />
        </button>
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          className="flex-1 px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm outline-none focus:border-[#3A4D28]"
          placeholder="Повідомлення..."
        />
        <button
          type="submit"
          className="p-2.5 bg-[#3A4D28] text-white rounded-xl hover:bg-[#2E3E1F] transition shrink-0"
        >
          <Send className="w-5 h-5" />
        </button>
        <input type="file" ref={fileInputRef} className="hidden" />
      </div>
    </form>
  );
};