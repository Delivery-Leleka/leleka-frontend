import React from "react";
import type { ExtendedMessage } from "~/types";
import { Check, CheckCheck } from "lucide-react";

interface MessageBubbleProps {
  msg: ExtendedMessage;
}

export const MessageBubble: React.FC<MessageBubbleProps> = ({ msg }) => {
  return (
    <div
      className={`max-w-[85%] sm:max-w-[65%] md:max-w-[50%] px-3.5 py-2 rounded-[18px] shadow-sm text-[15px] leading-snug transition-all ${
        msg.fromMe
          ? "self-end bg-brand-50 text-brand-deep rounded-br-[4px]"
          : "self-start bg-app-bg text-brand-950 border border-gray-100 rounded-bl-[4px]"
      }`}
    >
      <p className="break-words">{msg.text}</p>
      <div
        className={`flex items-center justify-end gap-1 mt-0.5 text-[11px] font-medium ${
          msg.fromMe ? "text-brand-600" : "text-placeholder"
        }`}
      >
        <span>{msg.time}</span>
        {msg.fromMe && (
          <span className={msg.read ? "text-brand-600" : "text-placeholder"}>
            {msg.read ? <CheckCheck size={14} /> : <Check size={14} />}
          </span>
        )}
      </div>
    </div>
  );
};