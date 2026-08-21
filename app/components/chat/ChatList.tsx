import React from "react";
import type { ChatItem, ExtendedMessage } from "~/types";

interface ChatListProps {
  items: ChatItem[];
  messages: Record<string, ExtendedMessage[]>;
  onSelectChat: (chat: ChatItem) => void;
}

export const ChatList: React.FC<ChatListProps> = ({ items, messages, onSelectChat }) => {
  const getLastMessage = (chatId: string) => {
    const chatMsgs = messages[chatId];
    return chatMsgs && chatMsgs.length > 0 ? chatMsgs[chatMsgs.length - 1] : null;
  };

  return (
    <div className="w-full h-full overflow-y-auto p-6 bg-[#F8F9FA]">
      <div className="max-w-4xl mx-auto space-y-2">
        {items.map((it) => {
          const lastMsg = getLastMessage(it.id);
          return (
            <div
              key={it.id}
              onClick={() => onSelectChat(it)}
              className="flex items-center justify-between p-4 bg-white rounded-2xl shadow-sm hover:shadow-md transition cursor-pointer border border-gray-100"
            >
              <div className="flex items-center gap-4 flex-1 mr-4">
                <div className="relative shrink-0">
                  <div className="w-14 h-14 rounded-full bg-[#E8EDE0] flex items-center justify-center font-bold text-xl text-[#3A4D28]">
                    {it.name[0]}
                  </div>
                  {it.status === "В мережі" && (
                    <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 rounded-full border-2 border-white" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-gray-900 text-base">{it.name}</p>
                  {lastMsg ? (
                    <div className="flex items-center gap-1.5 text-sm text-gray-500 truncate mt-0.5">
                      {lastMsg.fromMe && (
                        <span className={`text-xs font-semibold ${lastMsg.read ? "text-[#3A4D28]" : "text-gray-400"}`}>
                          {lastMsg.read ? "✓✓" : "✓"}
                        </span>
                      )}
                      <span className="truncate">{lastMsg.text}</span>
                    </div>
                  ) : (
                    <p className="text-sm text-gray-400 italic">Немає повідомлень</p>
                  )}
                </div>
              </div>
              <span className="text-xs text-gray-400 font-medium shrink-0">
                {lastMsg ? lastMsg.time : it.date}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};