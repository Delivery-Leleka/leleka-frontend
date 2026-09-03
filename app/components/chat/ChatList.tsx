import { Check, CheckCheck } from "lucide-react";
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
    <div className="w-full h-full overflow-y-auto px-[60px] py-[30px] bg-app-bg">
      <div className="flex flex-col gap-[20px]">
        {items.map((it) => {
          const lastMsg = getLastMessage(it.id);
          const isOnline = it.status === "В мережі";

          return (
            <div
              key={it.id}
              onClick={() => onSelectChat(it)}
              className="w-full h-[100px] px-6 bg-app-bg rounded-[20px] shadow-sm hover:shadow-md transition cursor-pointer flex items-center justify-between border border-gray-100/50"
            >
              <div className="flex items-center gap-5 flex-1 min-w-0 mr-4">
                <div className="relative shrink-0">
                  <div className="w-[65px] h-[65px] rounded-full bg-brand-50 flex items-center justify-center font-bold text-2xl text-brand-deep">
                    {it.name[0]}
                  </div>
                  {isOnline && (
                    <span className="absolute bottom-1 right-0 w-3 h-3 bg-brand-600 rounded-full ring-2 ring-app-bg" />
                  )}
                </div>

                <div className="flex flex-col gap-1 min-w-0">
                  <h3 className="text-[22px] font-bold text-brand-deep leading-tight truncate">
                    {it.name}
                  </h3>

                  {lastMsg ? (
                    <div className="flex items-center gap-1.5 text-[18px] text-gray-500 truncate">
                      {lastMsg.fromMe && (
                        <span className={`inline-flex items-center ${lastMsg.read ? "text-brand-600" : "text-gray-400"}`}>
                          {lastMsg.read ? <CheckCheck className="w-4 h-4" /> : <Check className="w-4 h-4" />}
                        </span>
                      )}
                      <span className="truncate">{lastMsg.text}</span>
                    </div>
                  ) : (
                    <p className="text-[18px] text-gray-400 italic">Немає повідомлень</p>
                  )}
                </div>
              </div>

              <div className="shrink-0 text-right">
                {isOnline ? (
                  <span className="text-[18px] font-medium text-brand-600">В мережі</span>
                ) : lastMsg ? (
                  <span className={`inline-flex items-center ${lastMsg.read ? "text-brand-600" : "text-gray-400"}`}>
                    {lastMsg.read ? <CheckCheck size={18} /> : <Check size={18} />}
                  </span>
                ) : null}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};