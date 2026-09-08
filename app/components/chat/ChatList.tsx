import React, { useState } from "react";
import { Check, CheckCheck } from "lucide-react";
import type { ChatItem, ExtendedMessage } from "~/types";

interface ChatListProps {
  items: ChatItem[];
  messages: Record<string, ExtendedMessage[]>;
  onSelectChat: (chat: ChatItem) => void;
}

const TABS = [
  { id: "all", label: "Усі" },
  { id: "personal", label: "Особисті" },
  { id: "groups", label: "Групи" },
  { id: "archive", label: "Архів" },
];

export const ChatList: React.FC<ChatListProps> = ({ items, messages, onSelectChat }) => {
  const [activeTab, setActiveTab] = useState("all");

  const getLastMessage = (chatId: string) => {
    const chatMsgs = messages[chatId];
    return chatMsgs && chatMsgs.length > 0 ? chatMsgs[chatMsgs.length - 1] : null;
  };

  return (
    <div className="w-full h-full overflow-y-auto bg-white flex flex-col">
      <div className="flex items-center gap-2 px-4 py-2 overflow-x-auto no-scrollbar shrink-0">
        {TABS.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-1.5 rounded-xl text-sm font-medium transition whitespace-nowrap cursor-pointer border ${
                isActive
                  ? "bg-[#C2CE9C] text-gray-800 border-transparent"
                  : "bg-white text-gray-500 border-gray-200 hover:bg-gray-50"
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      <div className="flex flex-col px-4 pt-2">
        {items.map((it) => {
          const lastMsg = getLastMessage(it.id);
          const isOnline = it.status === "В мережі";

          return (
            <div
              key={it.id}
              onClick={() => onSelectChat(it)}
              className="w-full py-3 flex items-center justify-between cursor-pointer hover:bg-gray-50/80 transition rounded-xl px-2"
            >
              <div className="flex items-center gap-3.5 min-w-0 flex-1 mr-3">
                <div className="relative shrink-0">
                  <div className="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center font-bold text-gray-600 text-base">
                    {it.name[0]}
                  </div>
                  {isOnline && (
                    <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-600 rounded-full ring-2 ring-white" />
                  )}
                </div>

                <div className="flex flex-col min-w-0 flex-1">
                  <div className="flex items-center gap-1.5">
                    <h3 className="font-semibold text-gray-900 text-base leading-tight truncate">
                      {it.name}
                    </h3>
                  </div>

                  <div className="flex items-center gap-1 text-xs text-gray-500 truncate mt-0.5">
                    {lastMsg?.fromMe && (
                      <span className={lastMsg.read ? "text-green-600" : "text-gray-400"}>
                        {lastMsg.read ? <CheckCheck size={14} /> : <Check size={14} />}
                      </span>
                    )}
                    <span className="truncate">
                      {lastMsg ? lastMsg.text : "Немає повідомлень"}
                    </span>
                  </div>
                </div>
              </div>

              <div className="shrink-0 text-right self-start pt-1">
                <span className="text-xs text-gray-400">
                  {lastMsg?.time || "10:24"}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};