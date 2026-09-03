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
    <form 
      onSubmit={onSend} 
      className="w-full px-8 py-4 bg-white border-t border-gray-100 flex items-center justify-between shrink-0"
    >
      <div className="w-full flex items-center gap-3 bg-app-bg border-[1.5px] border-border-input rounded-[15px] px-4 py-2 focus-within:border-brand-800 transition">
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="p-2 text-brand-800 hover:bg-brand-50 rounded-lg transition shrink-0 cursor-pointer"
          title="Прикріпити файл"
        >
          <Paperclip className="w-6 h-6" />
        </button>

        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          className="flex-1 bg-transparent text-[18px] text-brand-950 outline-none placeholder:text-placeholder py-1"
          placeholder="Повідомлення..."
        />
        <button
          type="submit"
          disabled={!inputText.trim()}
          className="p-2.5 bg-brand-800 text-white rounded-[10px] hover:bg-brand-900 disabled:opacity-40 disabled:hover:bg-brand-800 transition shrink-0 flex items-center justify-center shadow-sm cursor-pointer disabled:cursor-not-allowed"
          title="Надіслати"
        >
          <Send className="w-5 h-5" />
        </button>

        <input type="file" ref={fileInputRef} className="hidden" />
      </div>
    </form>
  );
};