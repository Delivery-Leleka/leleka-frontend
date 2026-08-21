import { useState, useRef } from "react";
import type { ChatItem, Message } from "~/types";
import { useNavigate } from "react-router";
import {
  MessageSquareText as ChatIcon,
  User,
  Folders,
  SettingsIcon,
  Search,
  Plus,
  SlidersHorizontal,
  ArrowLeft,
  Send,
  Paperclip,
  Pin,
  Lock,
  Archive,
  Ban,
  Trash2,
  Edit3,
} from "lucide-react";

interface ExtendedMessage extends Message {
  read?: boolean;
}

export default function LelekaChat() {
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<ChatItem | null>(null);

  const [dotsOpen, setDotsOpen] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [logoutModal, setLogoutModal] = useState(false);
  const [myProfilePop, setMyProfilePop] = useState(false);

  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const msgRef = useRef<HTMLInputElement | null>(null);
  const [profileOpen, setProfileOpen] = useState(false);

  const myUserData = {
    name: "Олександр Шевченко",
    username: "@oleksandr_dev",
    bio: "Frontend Developer | Кава, кодинг та якісний UX 🚀",
    avatar: "О",
  };

  const [items, setItems] = useState<ChatItem[]>([
    {
      id: "1",
      name: "Кум Тарас 🌾",
      sub: "",
      date: "15:30",
      status: "В мережі",
    },
    { id: "2", name: "Мама 🧦", sub: "", date: "14:15", status: "В мережі" },
    {
      id: "3",
      name: "Тімлід Сергій 💻",
      sub: "",
      date: "12:05",
      status: "Оффлайн",
    },
    {
      id: "4",
      name: "Нова Пошта 📦",
      sub: "",
      date: "Вчора",
      status: "В мережі",
    },
    {
      id: "5",
      name: "Кіт Василь 🐈",
      sub: "",
      date: "Вчора",
      status: "В мережі",
    },
  ]);

  const [messages, setMessages] = useState<Record<string, ExtendedMessage[]>>({
    "1": [
      {
        id: "m1",
        text: "Здорово! Ти де? Тут сало з часником пропадає!",
        fromMe: false,
        time: "15:20",
      },
      {
        id: "m2",
        text: "Вже виїжджаю! Хліб брати?",
        fromMe: true,
        time: "15:22",
        read: true,
      },
      {
        id: "m3",
        text: "Бери два! І цибулю зелену!",
        fromMe: false,
        time: "15:30",
      },
    ],
    "2": [
      {
        id: "m1",
        text: "Сину, надворі +18, а ти без шапки пішов?",
        fromMe: false,
        time: "14:00",
      },
      {
        id: "m2",
        text: "Мам, на вулиці спека, яка шапка) ",
        fromMe: true,
        time: "14:10",
        read: true,
      },
      {
        id: "m3",
        text: "Вітер підступний! І меш капці вдягни!",
        fromMe: false,
        time: "14:15",
      },
    ],
    "3": [
      {
        id: "m1",
        text: "Там невелика правка по проекту на 5 хвилин...",
        fromMe: false,
        time: "11:50",
      },
      {
        id: "m2",
        text: "Знову весь сайт переписувати? 😅",
        fromMe: true,
        time: "12:00",
        read: true,
      },
      {
        id: "m3",
        text: "Ну майже, зате дизайн гарний буде))",
        fromMe: false,
        time: "12:05",
      },
    ],
    "4": [
      {
        id: "m1",
        text: "Ваша посилка 20450098321 прибула у відділення!",
        fromMe: false,
        time: "10:00",
      },
      {
        id: "m2",
        text: "Дякую, увечері заберу",
        fromMe: true,
        time: "10:15",
        read: false,
      },
    ],
    "5": [
      { id: "m1", text: "Мяу.", fromMe: false, time: "08:00" },
      {
        id: "m2",
        text: "Васю, я тобі 5 хвилин тому насипав повну миску!",
        fromMe: true,
        time: "08:02",
        read: true,
      },
      {
        id: "m3",
        text: "Та то не той корм, насип смачний 😾",
        fromMe: false,
        time: "08:05",
      },
    ],
  });

  function openChat(item: ChatItem) {
    setSelected(item);
    setDotsOpen(false);
  }

  const goTo = (path: string) => {
    navigate(path);
  };

  function sendMessage() {
    if (!selected || !msgRef.current) return;
    const text = msgRef.current.value.trim();
    if (!text) return;

    const newMsg: ExtendedMessage = {
      id: Date.now().toString(),
      text,
      fromMe: true,
      time: new Date().toLocaleTimeString().slice(0, 5),
      read: false,
    };

    setMessages((prev) => ({
      ...prev,
      [selected.id]: [...(prev[selected.id] || []), newMsg],
    }));

    msgRef.current.value = "";
  }

  function handleDeleteChat() {
    if (!selected) return;
    setItems((prev) => prev.filter((item) => item.id !== selected.id));
    setSelected(null);
    setDeleteModal(false);
  }

  const filtered = items.filter((it) =>
    it.name.toLowerCase().includes(query.toLowerCase()),
  );

  const getLastMessage = (chatId: string) => {
    const chatMsgs = messages[chatId];
    if (!chatMsgs || chatMsgs.length === 0) return null;
    return chatMsgs[chatMsgs.length - 1];
  };

  return (
    <div className="flex h-screen w-full bg-[#F8F9FA] overflow-hidden relative">
      <nav className="w-[80px] h-full bg-[#ECF1DE] flex flex-col justify-between items-center py-6 shrink-0 z-20 border-r border-gray-200 relative">
        <div className="flex justify-center">
          <img
            src="./logo.svg"
            alt="Logo"
            className="w-[50px] h-auto cursor-pointer"
            onClick={() => setSelected(null)}
          />
        </div>

        <div className="flex flex-col items-center gap-8">
          <button
            onClick={() => setSelected(null)}
            className={`transition ${!selected ? "text-[#3F4935]" : "text-[#8B9380] hover:text-[#3F4935]"}`}
            title="Чати"
          >
            <ChatIcon className="w-6 h-6" />
          </button>

          <button
            onClick={() => goTo("/contacts")}
            className="text-[#8B9380] hover:text-[#3F4935] transition"
            title="Контакти"
          >
            <User className="w-6 h-6" />
          </button>

          <button
            onClick={() => goTo("/privateFolder")}
            className="text-[#8B9380] hover:text-[#3F4935] transition"
            title="Приватна папка"
          >
            <Folders className="w-6 h-6" />
          </button>
        </div>

        <div className="flex flex-col items-center gap-6 relative">
          <button
            onClick={() => goTo("/settings")}
            className="text-[#8B9380] hover:text-[#3F4935] transition"
            title="Налаштування"
          >
            <SettingsIcon className="w-6 h-6" />
          </button>

          <button
            onClick={() => setMyProfilePop(!myProfilePop)}
            className="w-10 h-10 rounded-full bg-[#3A4D28] text-white font-bold flex items-center justify-center border-2 border-white shadow-md hover:scale-105 transition"
            title="Мій профіль"
          >
            {myUserData.avatar}
          </button>

          {myProfilePop && (
            <>
              <div
                className="fixed inset-0 z-30"
                onClick={() => setMyProfilePop(false)}
              />

              <div className="absolute bottom-0 left-16 w-72 bg-white border border-gray-200 rounded-2xl shadow-xl z-40 p-4 transition-all duration-200">
                <div className="flex items-center gap-3 pb-3 border-b border-gray-100">
                  <div className="w-12 h-12 rounded-full bg-[#3A4D28] text-white font-bold text-lg flex items-center justify-center shrink-0">
                    {myUserData.avatar}
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-bold text-gray-900 text-sm truncate">
                      {myUserData.name}
                    </h3>
                    <p className="text-xs text-green-600 font-medium truncate">
                      {myUserData.username}
                    </p>
                  </div>
                </div>

                <p className="text-xs text-gray-600 my-3 leading-relaxed bg-gray-50 p-2.5 rounded-xl border border-gray-100">
                  {myUserData.bio}
                </p>

                <button
                  onClick={() => {
                    setMyProfilePop(false);
                    goTo("/myProfile");
                  }}
                  className="w-full py-2 bg-[#3A4D28] text-white rounded-xl text-xs font-medium hover:bg-[#2E3E1F] transition flex items-center justify-center gap-1.5 shadow-sm"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  <span>Редагувати профіль</span>
                </button>
              </div>
            </>
          )}
        </div>
      </nav>

      <div className="flex-1 flex flex-col h-full overflow-hidden">
        <header className="h-[80px] w-full px-12 flex items-center justify-between bg-white border-b border-gray-200 z-10 shrink-0">
          <div className="flex items-center gap-3">
            {selected ? (
              <>
                <button
                  onClick={() => setSelected(null)}
                  className="p-2 hover:bg-gray-200 rounded-xl transition"
                >
                  <ArrowLeft className="w-5 h-5 text-gray-700" />
                </button>

                <div
                  onClick={() => setProfileOpen(true)}
                  className="flex items-center gap-3 cursor-pointer hover:opacity-80 transition"
                >
                  <div className="w-10 h-10 rounded-full bg-[#E8EDE0] flex items-center justify-center font-bold text-[#3A4D28]">
                    {selected.name[0]}
                  </div>
                  <div>
                    <h2 className="font-bold text-gray-900 leading-tight">
                      {selected.name}
                    </h2>
                    <span className="text-xs text-green-600 font-medium">
                      {selected.status}
                    </span>
                  </div>
                </div>
              </>
            ) : (
              <h1 className="text-[28px] font-bold text-black tracking-tight">
                Чати
              </h1>
            )}
          </div>

          {!selected && (
            <div className="relative w-full max-w-[480px]">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Пошук контактів..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-white border border-gray-300 rounded-md text-sm outline-none placeholder:text-gray-400 focus:border-[#425235] transition"
              />
            </div>
          )}

          <div className="flex items-center gap-3">
            {!selected ? (
              <button
                onClick={() => goTo("/contacts")}
                className="flex items-center gap-2.5 px-6 py-2.5 bg-[#425235] text-white rounded-xl text-sm font-medium hover:bg-[#344229] transition shadow-sm"
              >
                <span>Додати контакт</span>
                <Plus className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={() => setDotsOpen(!dotsOpen)}
                className="p-2.5 border border-purple-200 rounded-xl text-purple-600 hover:bg-purple-50 transition"
              >
                <SlidersHorizontal className="w-5 h-5" />
              </button>
            )}
          </div>
        </header>

        <div className="flex-1 flex overflow-hidden relative">
          {!selected ? (
            <div className="w-full h-full overflow-y-auto p-6 bg-[#F8F9FA]">
              <div className="max-w-4xl mx-auto space-y-2">
                {filtered.map((it) => {
                  const lastMsg = getLastMessage(it.id);

                  return (
                    <div
                      key={it.id}
                      onClick={() => openChat(it)}
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
                          <p className="font-bold text-gray-900 text-base">
                            {it.name}
                          </p>

                          {lastMsg ? (
                            <div className="flex items-center gap-1.5 text-sm text-gray-500 truncate mt-0.5">
                              {lastMsg.fromMe && (
                                <span
                                  className={`text-xs font-semibold ${lastMsg.read ? "text-[#3A4D28]" : "text-gray-400"}`}
                                >
                                  {lastMsg.read ? "✓✓" : "✓"}
                                </span>
                              )}
                              <span className="truncate">{lastMsg.text}</span>
                            </div>
                          ) : (
                            <p className="text-sm text-gray-400 italic">
                              Немає повідомлень
                            </p>
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
          ) : (
            <div className="flex-1 flex flex-col bg-[#F7F5E9] h-full">
              <div className="flex-1 p-6 overflow-y-auto flex flex-col gap-3 max-w-4xl w-full mx-auto">
                {messages[selected.id]?.map((m) => (
                  <div
                    key={m.id}
                    className={`
                                            max-w-[75%] sm:max-w-[55%] px-4 py-2.5 rounded-2xl shadow-sm text-sm
                                            ${
                                              m.fromMe
                                                ? "self-end bg-[#C7E2AE] text-[#1E3316] rounded-br-none"
                                                : "self-start bg-white text-gray-800 rounded-bl-none"
                                            }
                                        `}
                  >
                    <p className="leading-relaxed">{m.text}</p>

                    <div className="flex items-center justify-end gap-1 mt-1 text-[11px] opacity-70">
                      <span>{m.time}</span>
                      {m.fromMe && (
                        <span
                          className={`font-semibold ${m.read ? "text-[#2E401F]" : "text-[#1E3316]/50"}`}
                        >
                          {m.read ? "✓✓" : "✓"}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="w-full p-4 bg-white border-t border-gray-200">
                <div className="max-w-4xl mx-auto flex items-center gap-3">
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="p-2.5 text-gray-500 hover:bg-gray-100 rounded-xl transition"
                  >
                    <Paperclip className="w-5 h-5" />
                  </button>

                  <input
                    ref={msgRef}
                    onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                    className="flex-1 px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm outline-none focus:border-[#3A4D28]"
                    placeholder="Повідомлення..."
                  />

                  <button
                    onClick={sendMessage}
                    className="p-2.5 bg-[#3A4D28] text-white rounded-xl hover:bg-[#2E3E1F] transition shrink-0"
                  >
                    <Send className="w-5 h-5" />
                  </button>

                  <input type="file" ref={fileInputRef} className="hidden" />
                </div>
              </div>
            </div>
          )}

          <div
            className={`
                            fixed top-0 right-0 h-full w-[320px] bg-white border-l border-gray-200 shadow-2xl z-[999]
                            transform transition-transform duration-300 p-6 flex flex-col items-center text-center
                            ${profileOpen ? "translate-x-0" : "translate-x-full"}
                        `}
          >
            <button
              onClick={() => setProfileOpen(false)}
              className="self-end text-gray-400 hover:text-gray-700 font-bold"
            >
              ✕
            </button>
            <div className="w-32 h-32 rounded-full bg-[#E8EDE0] my-4 flex items-center justify-center text-4xl font-bold text-[#3A4D28]">
              {selected?.name[0] || "U"}
            </div>
            <h2 className="text-xl font-bold text-gray-900">
              {selected?.name}
            </h2>
            <p className="text-gray-500 text-sm">@leleka_user</p>
            <p className="mt-2 text-xs text-green-600 font-medium">
              {selected?.status === "В мережі"
                ? "Зараз в мережі"
                : `Був(-ла): ${selected?.date}`}
            </p>
            <button
              onClick={() => setProfileOpen(false)}
              className="mt-auto w-full py-2.5 bg-[#3A4D28] text-white rounded-xl font-medium hover:bg-[#2E3E1F] transition"
            >
              Написати
            </button>
          </div>
        </div>
      </div>

      {selected && (
        <div
          className={`
                        absolute top-16 right-8 w-60 bg-white border border-gray-200 rounded-2xl shadow-xl z-50 transition-all duration-200 py-2
                        ${dotsOpen ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"}
                    `}
        >
          <ul className="flex flex-col text-sm text-gray-700">
            <li className="flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50 cursor-pointer">
              <Pin className="w-4 h-4 text-gray-500" />
              <span>Закріпити чат</span>
            </li>
            <li className="flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50 cursor-pointer">
              <Lock className="w-4 h-4 text-gray-500" />
              <span>Перенести в закриту папку</span>
            </li>
            <li className="flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50 cursor-pointer">
              <Archive className="w-4 h-4 text-gray-500" />
              <span>Архівувати</span>
            </li>
            <li className="flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50 cursor-pointer">
              <Ban className="w-4 h-4 text-gray-500" />
              <span>Заблокувати</span>
            </li>
            <li
              onClick={() => {
                setDotsOpen(false);
                setDeleteModal(true);
              }}
              className="flex items-center gap-3 px-4 py-2.5 text-red-500 hover:bg-red-50 cursor-pointer"
            >
              <Trash2 className="w-4 h-4 text-red-500" />
              <span>Видалити чат</span>
            </li>
          </ul>
        </div>
      )}

      {deleteModal && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex justify-center items-center z-[999]">
          <div className="bg-white w-[340px] rounded-2xl p-6 shadow-2xl flex flex-col items-center text-center">
            <h3 className="font-bold text-gray-900 text-lg mb-2">
              Дійсно хочете видалити цей чат?
            </h3>
            <p className="text-sm text-gray-500 mb-6">
              Цю дію не можна буде скасувати.
            </p>

            <div className="flex gap-4 w-full">
              <button
                onClick={() => setDeleteModal(false)}
                className="flex-1 py-2 border border-[#8BAA70] text-[#5C7843] rounded-lg font-medium hover:bg-green-50 transition"
              >
                Назад
              </button>
              <button
                onClick={handleDeleteChat}
                className="flex-1 py-2 bg-[#C83727] text-white rounded-lg font-medium hover:bg-[#A82B1D] transition"
              >
                Видалити
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

