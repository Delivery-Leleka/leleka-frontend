import { useState, useRef } from "react";
import type { ChatItem, Message } from "~/types";
import { useNavigate } from "react-router";

export default function LelekaChat() {
    const [query, setQuery] = useState("");
    const [selected, setSelected] = useState<ChatItem | null>(null);

    const [menuOpen, setMenuOpen] = useState(false);
    const [dotsOpen, setDotsOpen] = useState(false);
    const navigate = useNavigate();
    const [logoutModal, setLogoutModal] = useState(false);

    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const msgRef = useRef<HTMLInputElement | null>(null);
    const [profileOpen, setProfileOpen] = useState(false);
    const [mobileView, setMobileView] = useState<"chats" | "chat" | "profile">("chats");
    const [items] = useState<ChatItem[]>([
        { id: "1", name: "Лелека", sub: "Привіт, як справи?", date: "сьогодні", status: "В мережі" },
        { id: "2", name: "Лелека", sub: "Пішли гуляти?", date: "вчора", status: "В мережі" },
        { id: "3", name: "Лелека", sub: "Домашку зробив?", date: "2 дні тому", status: "Оффлайн" },
        { id: "4", name: "Лелека", sub: "Лише що онлайн", date: "5 хв тому", status: "В мережі" },
        { id: "5", name: "Лелека", sub: "Переглянь фото", date: "3 год тому", status: "В мережі" },
        { id: "6", name: "Лелека", sub: "Потім напишу", date: "1 тиждень тому", status: "Оффлайн" },
    ]);

    const [messages, setMessages] = useState<Record<string, Message[]>>({
        "1": [
            { id: "m1", text: "Привіт, як справи?", fromMe: false, time: "15:55" },
            { id: "m2", text: "Все добре!", fromMe: true, time: "16:29" },
        ],
    });

    function openChat(item: ChatItem) {
        setSelected(item);
        setDotsOpen(false);
        setMobileView("chat");
    }
    const goTo = (path: string) => {
        navigate(path);
        setMenuOpen(false);
    };

    function sendMessage() {
        if (!selected || !msgRef.current) return;
        const text = msgRef.current.value.trim();
        if (!text) return;

        const newMsg: Message = {
            id: Date.now().toString(),
            text,
            fromMe: true,
            time: new Date().toLocaleTimeString().slice(0, 5),
        };

        setMessages(prev => ({
            ...prev,
            [selected.id]: [...(prev[selected.id] || []), newMsg],
        }));

        msgRef.current.value = "";
    }

    const filtered = items.filter(it =>
        it.name.toLowerCase().includes(query.toLowerCase())
    );

    return (
        <div className="min-h-screen flex flex-col bg-green-50">

            <header className="w-full h-16 bg-[#A1C78F] border-b border-black flex items-center justify-between px-4 relative">

                <div className={`flex items-center gap-3 ${mobileView !== "chats" ? "hidden md:flex" : ""}`}>

                    <img
                        src="/icons/menu.png"
                        className="w-6 cursor-pointer"
                        onClick={() => setMenuOpen(!menuOpen)}
                    />

                    <div className="flex items-center bg-white rounded-md h-9 px-3 w-[260px] border border-black">
                        <img src="/icons/search.png" className="w-4 opacity-60 mr-2" />
                        <input
                            className="flex-1 outline-none text-black"
                            placeholder="Пошук..."
                            value={query}
                            onChange={e => setQuery(e.target.value)}
                        />
                    </div>
                </div>

                {mobileView !== "chats" && (
                    <img
                        src="/icons/back.png"
                        className="w-7 md:hidden cursor-pointer"
                        onClick={() => {
                            setMobileView("chats");
                            setSelected(null);
                        }}
                    />
                )}


                {selected && (
                    <div
                        className={`flex items-center gap-3 cursor-pointer ${mobileView === "chats" ? "hidden md:flex" : "flex"}`}
                        onClick={() => setProfileOpen(true)}
                    >
                        <img src="/icons/stork.png" className="w-10" />
                        <div>
                            <p className="font-bold">{selected.name}</p>
                            <p className="text-sm">{selected.status}</p>
                        </div>
                    </div>
                )}

                {selected && (
                    <img
                        src="/icons/More-one.png"
                        className="w-6 cursor-pointer"
                        onClick={() => setDotsOpen(!dotsOpen)}
                    />
                )}
            </header>


            <div className="flex flex-1 relative">
                <div
                    className={`
                        bg-[#A1C78F] border-r border-black overflow-y-auto
                        md:w-[320px]
                        ${mobileView === "chats" ? "w-full" : "hidden md:block"}
                    `}
                >
                    {filtered.map(it => (
                        <div
                            key={it.id}
                            onClick={() => openChat(it)}
                            className="px-4 py-4 flex items-center gap-3 cursor-pointer border-b border-black hover:bg-[#95BD82]"
                        >
                            <img src="/icons/stork.png" className="w-12 h-12 bg-white border border-black rounded-full p-1" />
                            <div className="flex-1">
                                <p className="font-bold">{it.name}</p>
                                <p className="text-sm">{it.sub}</p>
                            </div>
                            <p className="text-xs">{it.date}</p>
                        </div>
                    ))}
                </div>


                <div
                    className={`
                        flex flex-col flex-1 bg-[#F7F5E9] border-black w-[100vw]
                        ${mobileView === "chat" ? "flex" : "hidden md:flex"}
                    `}
                >
                    {!selected ? (
                        <div className="flex items-center justify-center h-full text-gray-500">
                            Виберіть чат
                        </div>
                    ) : (
                        <>
                            <div className="flex-1 p-6 overflow-y-auto flex flex-col gap-3 w-full">
                                {messages[selected.id]?.map(m => (
                                    <div
                                        key={m.id}
                                        className={`
                                            max-w-[60%] px-4 py-2 rounded-xl shadow text-sm text-[#294A2B]
                                            ${m.fromMe ? "self-end bg-[#C7E2AE]" : "self-start bg-[#A1C78F]"}
                                        `}
                                    >
                                        <p>{m.text}</p>
                                        <p className="text-xs opacity-70 mt-1 text-right">{m.time}</p>
                                    </div>
                                ))}
                            </div>

                            <div className="w-full p-3 bg-[#A1C78F] border-t border-black flex items-center gap-3">
                                <button
                                    onClick={() => fileInputRef.current?.click()}
                                    className="w-10 h-10 border border-black rounded-xl flex items-center justify-center"
                                >
                                    <img src="/icons/menu-dots.png" className="w-5" />
                                </button>

                                <input
                                    ref={msgRef}
                                    className="flex-1 px-4 py-2 bg-white border border-black rounded-xl w-[50vw]"
                                    placeholder="Повідомлення..."
                                />

                                <button
                                    onClick={sendMessage}
                                    className="w-10 h-10 border border-black rounded-xl flex items-center justify-center"
                                >
                                    <img src="/icons/send.png" className="w-5" />
                                </button>

                                <input type="file" ref={fileInputRef} className="hidden" />
                            </div>
                        </>
                    )}
                </div>
                <div
                    className={`
                        fixed top-0 right-0 h-full w-[320px] bg-[#AECF98]
                        border-l border-black shadow-xl z-[999]
                        transform transition-transform duration-300
                        ${profileOpen ? "translate-x-0" : "translate-x-full"}
                    `}
                >
                    <div className="p-6 flex flex-col items-center text-center">
                        <img
                            src="/icons/stork.png"
                            className="w-[250px] h-[250px] object-cover rounded-xl"
                        />
                        <h2 className="mt-4 text-2xl font-bold">{selected?.name}</h2>
                        <p className="text-gray-600">@leleka_user</p>
                        <p className="mt-2 text-sm text-gray-700">
                            {selected?.status === "В мережі"
                                ? "Зараз в мережі"
                                : `Був(-ла) в мережі: ${selected?.date}`
                            }
                        </p>
                        <p className="mt-4 text-gray-800 text-sm leading-5">
                            Привіт! Це мій профіль у Лелеці.
                            Люблю слухати музику, гуляти і знайомитись з новими людьми 🤍
                        </p>
                        <button
                            onClick={() => setProfileOpen(false)}
                            className="mt-6 px-6 py-2 bg-[#477628] rounded-lg"
                        >
                            Написати
                        </button>
                    </div>
                </div>
            </div>

            <div
                className={`absolute top-16 left-0 w-56 bg-[#B5D7A5] border border-black rounded-b-xl overflow-hidden transition-all duration-300 z-50
                    ${menuOpen ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0"}`}
            >
                <ul className="flex flex-col text-black select-none">
                    <li onClick={() => goTo("/myProfile")} className="menu-item"><img src="/icons/profile.png" /> Профіль</li>
                    <li onClick={() => goTo("/contacts")} className="menu-item"><img src="/icons/phone.png" /> Контакти</li>
                    <li onClick={() => goTo("/createGroup")} className="menu-item"><img src="/icons/add-group.png" /> Створити групу</li>
                    <li onClick={() => goTo("/privateFolder")} className="menu-item"><img src="/icons/folder.png" /> Приватна папка</li>
                    <li onClick={() => goTo("/archive")} className="menu-item"><img src="/icons/archive.png" /> Архів</li>
                    <li onClick={() => goTo("/settings")} className="menu-item"><img src="/icons/settings.png" /> Налаштування</li>
                    <li className="menu-item"><img src="/icons/theme.png" /> Світла/темна тема</li>
                    <li onClick={() => setLogoutModal(true)} className="px-4 py-3 text-red-600 hover:bg-[#A4C894] border-b border-black">
                        <img src="/icons/logout.png" /> Вийти
                    </li>
                </ul>
            </div>
            {selected && (
                <div
                    className={`
                        absolute top-16 right-4 w-56 bg-[#B5D7A5] border border-black rounded-xl z-50 transition-all duration-200
                        ${dotsOpen ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"}
                    `}
                >
                    <ul className="flex flex-col text-sm text-black">
                        <li className="menu-item flex justify-between"><span>Додати до контактів</span><img src="/icons/Add-one.png" className="w-4" /></li>
                        <li className="menu-item flex justify-between"><span>Додати до групи</span><img src="/icons/Add-one.png" className="w-4" /></li>
                        <li className="menu-item flex justify-between"><span>Поділитись контактом</span><img src="/icons/Share-two.png" className="w-4" /></li>
                        <li className="menu-item flex justify-between"><span>Засекретити</span><img src="/icons/Preview-close-one.png" className="w-4" /></li>
                        <li className="menu-item flex justify-between"><span>Заблокувати</span><img src="/icons/Forbid.png" className="w-4" /></li>
                        <li className="menu-item flex justify-between text-red-600"><span>Видалити акаунт</span><img src="/icons/Delete-five.png" className="w-4" /></li>
                    </ul>
                </div>
            )}
            {logoutModal && (
                <div className="fixed inset-0 flex justify-center items-center z-[999] pointer-events-none">
                    <div className="pointer-events-auto">
                        <div className="bg-[#B8D8A5] w-80 sm:w-96 rounded-2xl p-6 shadow-xl relative">
                            <button
                                onClick={() => setLogoutModal(false)}
                                className="absolute top-3 right-3 text-xl text-black hover:scale-110"
                            >
                                ✕
                            </button>

                            <p className="text-center text-lg sm:text-xl font-semibold text-black mb-6">
                                Ви дійсно хочете вийти з акаунту?
                            </p>

                            <button
                                onClick={() => {
                                    console.log("USER LOGGED OUT");
                                    navigate("/login");
                                }}
                                className="w-full py-2 bg-red-300 hover:bg-red-400 text-white font-semibold rounded-lg flex items-center justify-center gap-2 border border-black"
                            >
                                <img
                                    src="/icons/logout-arrow.png"
                                    className="w-4 h-4"
                                    alt="exit"
                                />
                                Вийти
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
