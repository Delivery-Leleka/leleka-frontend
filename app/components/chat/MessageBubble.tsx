import React from "react";
import type { ExtendedMessage } from "~/types";
import { Check, CheckCheck } from "lucide-react";

interface MessageBubbleProps {
  msg: ExtendedMessage;
}

export const MessageBubble: React.FC<MessageBubbleProps> = ({ msg }) => {
  return (
    <div
      className={`max-w-[70%] sm:max-w-[50%] px-5 py-3 rounded-[20px] shadow-sm text-[16px] leading-relaxed transition-all ${msg.fromMe
          ? "self-end bg-[#ECF1DE] text-[#294A2B] rounded-br-[4px]"
          : "self-start bg-[#FCFBFA] text-black border border-gray-100 rounded-bl-[4px]"
        }`}
    >
      <p className="break-words">{msg.text}</p>
      <div
        className={`flex items-center justify-end gap-1.5 mt-1 text-[13px] font-medium ${msg.fromMe ? "text-[#477628]" : "text-[#999994]"
          }`}
      >
        <span>{msg.time}</span>
        {msg.fromMe && (
          <span className={`text-[14px] font-bold ${msg.read ? "text-[#477628]" : "text-[#999994]"}`}>
            {msg.read ? <CheckCheck size={16} /> : <Check size={16} />}
          </span>
        )}
      </div>
    </div>
  );
};