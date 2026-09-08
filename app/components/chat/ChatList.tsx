import React from "react";
import type { ChatItem, ExtendedMessage } from "~/types";

interface ChatListProps {
  items: ChatItem[];
  messages: Record<string, ExtendedMessage[]>;
  onSelectChat: (chat: ChatItem) => void;
  selectedChatId?: string;
}

export const ChatList: React.FC<ChatListProps> = ({
  items,
  messages,
  onSelectChat,
  selectedChatId,
}) => {
  const getLastMessage = (chatId: string) => {
    const chatMsgs = messages[chatId];
    return chatMsgs && chatMsgs.length > 0 ? chatMsgs[chatMsgs.length - 1] : null;
  };

  return (
    <div className="w-full h-full overflow-y-auto bg-white flex flex-col py-2">
      <div className="flex flex-col px-3 gap-1">
        {items.map((it) => {
          const lastMsg = getLastMessage(it.id);
          const isOnline = it.status === "В мережі";
          const isSelected = selectedChatId === it.id;

          return (
            <div
              key={it.id}
              onClick={() => onSelectChat(it)}
              className={`w-full py-3 px-3 flex items-center justify-between cursor-pointer transition rounded-2xl ${isSelected ? "bg-[#E9F0DE] shadow-sm" : "hover:bg-gray-50/80"
                }`}
            >
              <div className="flex items-center gap-3.5 min-w-0 flex-1 mr-3">
                <div className="relative shrink-0">
                  <div className="w-12 h-12 rounded-full bg-[#D4E0B3] flex items-center justify-center font-bold text-gray-800 text-base">
                    {it.name[0]}
                  </div>
                  {isOnline && (
                    <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 rounded-full ring-2 ring-white" />
                  )}
                </div>

                <div className="flex flex-col min-w-0 flex-1">
                  <h3 className="font-semibold text-gray-900 text-base leading-tight truncate">
                    {it.name}
                  </h3>
                  <p className="text-xs text-gray-500 truncate mt-1">
                    {lastMsg ? lastMsg.text : "Немає повідомлень"}
                  </p>
                </div>
              </div>

              <div className="shrink-0 text-right self-start pt-0.5">
                <span className="text-[11px] text-gray-400 font-medium">
                  {lastMsg?.time || it.date || "10:24"}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};