import { useState } from "react";
import { useNavigate } from "react-router";

export default function ContactsPage() {
    const [accessGranted, setAccessGranted] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [sortOpen, setSortOpen] = useState(false);
    const navigate = useNavigate();

    const [menuOpen, setMenuOpen] = useState(false);
    const [logoutModal, setLogoutModal] = useState(false);

    const contacts = [
        { name: "Лелека", status: "В мережі" },
        { name: "Лелека", status: "В мережі" },
        { name: "Лелека", status: "16:58" },
        { name: "Лелека", status: "19:40" },
        { name: "Лелека", status: "Місяць тому о 12:40" },
        { name: "Лелека", status: "12.04 о 01:55" },
    ];

    const goTo = (path: string) => {
        navigate(path);
        setMenuOpen(false);
    };

    const allowAccess = () => {
        setModalOpen(false);
        setTimeout(() => setAccessGranted(true), 120);
    };

    const denyAccess = () => setModalOpen(false);

    return (
        <div className="min-h-screen flex flex-col font-sans bg-green-50 md:bg-[url('/icons/bg-new.png')] bg-[url('/icons/bg-new-mobile.png')]">

            <header className="w-full h-16 bg-[#C7E2AE] flex items-center justify-between border-b border-black px-4 sm:px-8 relative shadow-sm">

                <div className="flex items-center gap-4 flex-1 max-w-[420px]">
                    <img
                        src="/icons/menu.png"
                        className="w-6 cursor-pointer"
                        onClick={() => setMenuOpen(!menuOpen)}
                    />

                    <div className="flex items-center bg-white rounded-md h-8 px-3 flex-1 border border-black">
                        <img src="/icons/search.png" className="w-4 mr-2 opacity-60" />
                        <input
                            placeholder="Контакт не знайдено"
                            className="flex-1 outline-none text-black text-sm"
                        />
                    </div>
                </div>

                <div className="absolute left-1/2 -translate-x-1/2 flex items-center gap-2 select-none pointer-events-none">
                    <h1 className="text-xl font-bold text-black">Контакти</h1>
                    <img src="/icons/bird-center.png" className="w-6" />
                </div>

                {/* RIGHT */}
                <div
                    className={`flex items-center gap-4 transition-all duration-300 ${
                        accessGranted ? "opacity-100" : "opacity-0 pointer-events-none"
                    }`}
                >
                    <button className="bg-[#72A850] border border-black px-4 py-1.5 rounded-md flex items-center gap-2 hover:bg-[#5f8d43] transition">
                        Додати контакт
                        <img src="/icons/plus.png" className="w-4" />
                    </button>

          <div className="relative">
            <img
              src="/icons/filter.png"
              className="w-7 cursor-pointer"
              onClick={() => setSortOpen(!sortOpen)}
            />

                        {sortOpen && (
                            <div className="absolute right-0 mt-2 bg-[#C7E2AE] border border-black rounded-md w-32 text-black shadow-md z-50 animate-fadeIn">
                                <button className="block w-full text-left px-3 py-2 hover:bg-[#b6d39b] border-b border-black">
                                    За алфавітом
                                </button>
                                <button className="block w-full text-left px-3 py-2 hover:bg-[#b6d39b]">
                                    За активністю
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                <div
                    className={`absolute top-16 left-0 w-56 bg-[#B5D7A5] border border-black rounded-b-xl overflow-hidden transition-all duration-300 z-50 
                    ${menuOpen ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0"}
                `}
                >
                    <ul className="flex flex-col text-black select-none">
                        <li onClick={() => goTo("/myProfile")} className="menu-item">
                            <img src="/icons/profile.png" className="w-5" /> Профіль
                        </li>
                        <li onClick={() => goTo("/contacts")} className="menu-item">
                            <img src="/icons/phone.png" className="w-5" /> Контакти
                        </li>
                        <li onClick={() => goTo("/createGroup")} className="menu-item">
                            <img src="/icons/add-group.png" className="w-5" /> Створити групу
                        </li>
                        <li onClick={() => goTo("/privateFolder")} className="menu-item">
                            <img src="/icons/folder.png" className="w-5" /> Приватна папка
                        </li>
                        <li onClick={() => goTo("/archive")} className="menu-item">
                            <img src="/icons/archive.png" className="w-5" /> Архів
                        </li>
                        <li onClick={() => goTo("/settings")} className="menu-item">
                            <img src="/icons/settings.png" className="w-5" /> Налаштування
                        </li>
                        <li className="menu-item">
                            <img src="/icons/theme.png" className="w-5" /> Світла/темна тема
                        </li>
                        <li
                            onClick={() => setLogoutModal(true)}
                            className="px-4 py-3 flex items-center gap-2 cursor-pointer text-red-600 hover:bg-[#A4C894] border-b border-black"
                        >
                            <img src="/icons/logout.png" className="w-5" /> Вийти з акаунту
                        </li>
                    </ul>
                </div>
            </header>

            {/* MAIN */}
            <main className="flex-1 flex flex-col items-center px-4 pt-8">

                {!accessGranted && (
                    <div className="flex-1 flex flex-col items-center justify-center gap-4 w-full animate-fadeIn">
                        <h2 className="text-green-700 text-2xl select-none">
                            У вас ще немає контактів
                        </h2>

                        <button
                            onClick={() => setModalOpen(true)}
                            className="bg-[#72A850] text-black mt-5 px-6 py-2 rounded-md hover:bg-[#5f8d43] transition flex items-center gap-2"
                        >
                            Додати контакт
                            <img src="/icons/plus.png" className="w-4" />
                        </button>
                    </div>
                )}

                {accessGranted && (
                    <div className="w-full max-w-[900px] flex flex-col gap-4 animate-slideUp pb-8">
                        {contacts.map((c, i) => (
                            <div
                                key={i}
                                className="w-full bg-[#B5D7A5] border border-black rounded-xl py-3 px-4 flex items-center gap-4 shadow-[0_3px_6px_rgba(0,0,0,0.25)] hover:scale-[1.01] transition"
                            >
                                <img
                                    src="/icons/stork.png"
                                    className="w-14 h-14 rounded-full bg-white border border-black p-1"
                                />

                <div>
                  <p className="font-bold text-black text-lg">{c.name}</p>
                  <p className="text-black text-sm opacity-80">{c.status}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

            {/* FOOTER */}
            <footer className="w-full h-24 bg-[#C7E2AE]"></footer>

            {/* ACCESS MODAL */}
            {modalOpen && (
                <div className="fixed inset-0 flex justify-center items-center bg-black/30 z-50">
                    <div className="bg-[#B7D8A3] w-[90%] max-w-[420px] rounded-xl shadow-xl py-8 px-6 text-center border border-[#8EB784] animate-scaleIn relative">

                        <button onClick={() => setModalOpen(false)} className="absolute top-3 right-3">
                            <img src="/icons/close.png" className="w-5" />
                        </button>

            <p className="text-lg text-[#16321F] font-semibold select-none">
              Надати доступ до телефонної книги?
            </p>

            <div className="flex justify-between sm:justify-center sm:gap-6 mt-8">
              <button
                onClick={denyAccess}
                className="bg-[#E59B9B] hover:bg-[#d38484] text-white px-5 py-2 rounded-md transition"
              >
                Не дозволяти
              </button>

              <button
                onClick={allowAccess}
                className="bg-[#72A850] hover:bg-[#5f8d43] text-white px-6 py-2 rounded-md transition"
              >
                Надати
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
