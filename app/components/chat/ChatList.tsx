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
    <div className="w-full h-full overflow-y-auto px-[60px] py-[30px] bg-[#FCFBFA]">
      <div className="flex flex-col gap-[20px]">
        {items.map((it) => {
          const lastMsg = getLastMessage(it.id);
          const isOnline = it.status === "В мережі";

          return (
            <div
              key={it.id}
              onClick={() => onSelectChat(it)}
              className="w-full h-[100px] px-6 bg-[#FCFBFA] rounded-[20px] shadow-sm hover:shadow-md transition cursor-pointer flex items-center justify-between border border-gray-100/50"
            >
              <div className="flex items-center gap-5 flex-1 min-w-0 mr-4">
                <div className="relative shrink-0">
                  <div className="w-[65px] h-[65px] rounded-full bg-[#ECF1DE] flex items-center justify-center font-bold text-2xl text-[#294A2B]">
                    {it.name[0]}
                  </div>
                  {isOnline && (
                    <span className="absolute bottom-1 right-0 w-3 h-3 bg-[#477628] rounded-full ring-2 ring-[#FCFBFA]" />
                  )}
                </div>

                <div className="flex flex-col gap-1 min-w-0">
                  <h3 className="text-[22px] font-bold text-[#294A2B] leading-tight truncate">
                    {it.name}
                  </h3>

                  {lastMsg ? (
                    <div className="flex items-center gap-1.5 text-[18px] text-gray-500 truncate">
                      {lastMsg.fromMe && (
                        <span className={`text-sm font-semibold ${lastMsg.read ? "text-[#477628]" : "text-gray-400"}`}>
                          {lastMsg.read ? `${<CheckCheck />}` : `${<Check />}`}
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
                  <span className="text-[18px] font-medium text-[#477628]">В мережі</span>
                ) : (
                  <span className={`text-sm font-semibold ${lastMsg.read ? "text-[#477628]" : "text-gray-400"}`}>
                    {lastMsg.read ? <CheckCheck size={16} /> : <Check size={16} />}
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};