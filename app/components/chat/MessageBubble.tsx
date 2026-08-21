import React from "react";
import type { ExtendedMessage } from "~/types";

interface MessageBubbleProps {
  msg: ExtendedMessage;
}

export const MessageBubble: React.FC<MessageBubbleProps> = ({ msg }) => {
  return (
    <div
      className={`max-w-[75%] sm:max-w-[55%] px-4 py-2.5 rounded-2xl shadow-sm text-sm ${
        msg.fromMe
          ? "self-end bg-[#C7E2AE] text-[#1E3316] rounded-br-none"
          : "self-start bg-white text-gray-800 rounded-bl-none"
      }`}
    >
      <p className="leading-relaxed">{msg.text}</p>
      <div className="flex items-center justify-end gap-1 mt-1 text-[11px] opacity-70">
        <span>{msg.time}</span>
        {msg.fromMe && (
          <span className={`font-semibold ${msg.read ? "text-[#2E401F]" : "text-[#1E3316]/50"}`}>
            {msg.read ? "✓✓" : "✓"}
          </span>
        )}
      </div>
    </div>
  );
};