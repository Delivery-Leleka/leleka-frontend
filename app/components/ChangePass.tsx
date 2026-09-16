import { Link, useNavigate } from "react-router";
import { useState } from "react";
import Footer from "./Footer";

export default function ChangePass() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [logoutModal, setLogoutModal] = useState(false);
    const navigate = useNavigate();

    const goTo = (path: string) => {
        navigate(path);
        setMenuOpen(false);
    };

    return (
        <div className="overflow-hidden min-h-screen flex flex-col font-sans bg-green-50 md:bg-[url('/icons/bg-new.png')] bg-[url('/icons/bg-new-mobile.png')]">

            <header className="relative w-full h-16 bg-[#C7E2AE] flex items-center justify-between px-4 sm:px-6 md:px-8">

    
                <div className="flex items-center gap-3">
                    <button onClick={() => setMenuOpen(!menuOpen)}>
                        <img src="/icons/menu.png" className="w-6 sm:w-7" alt="menu" />
                    </button>
                    <h1 className="text-lg sm:text-xl font-bold select-none text-black">
                        Лелека
                    </h1>
                </div>


                <div className="flex items-center bg-white rounded-md h-8 px-3 flex-1 max-w-[40vw] border border-black mx-6 md:max-w-[450px] ">
                    <img
                        src="/icons/search.png"
                        className="w-4 mr-2 opacity-60"
                        alt="search"
                    />
                    <input
                        type="text"
                        className="flex-1 outline-none text-black text-sm sm:text-base"
                    />
                </div>

                <div className="w-6"></div>

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

            <div className="flex-1 flex justify-center items-center px-4 py-6 md:py-10">
                <main
                className="
                    relative z-10 bg-[#B7D8A3] rounded-xl shadow-lg
                    w-full max-w-full md:max-w-[850px]
                    min-h-[420px]
                    px-5 py-6 sm:px-6 sm:py-8 md:px-8 md:py-10
                    flex flex-col items-center text-center mx-auto
                "
                >

                    <h2 className="text-2xl sm:text-3xl font-semibold text-gray-800 mb-4 sm:mb-6">
                        Змінити пароль
                    </h2>

                    <div className="relative z-10 w-full text-left mt-2 sm:mt-4">
                        <p className="text-gray-800 text-sm sm:text-base">
                            Для зміни пароля вам буде надісланий
                        </p>
                        <p className="text-gray-800 text-sm sm:text-base mt-1">
                            код на пошту, яка вказана у профілі
                        </p>
                    </div>

                    <button
                        className="
                            relative z-10
                            w-[80%] sm:w-[70%]
                            bg-[#3F6D2F] hover:bg-[#355C27]
                            text-white font-medium
                            py-3 px-4 rounded-md
                            transition flex items-center justify-center gap-2 cursor-pointer
                            mt-6
                        "
                    >
                        Надіслати код на пошту
                        <img src="/icons/email.png" alt="" className="w-5 h-5" />
                    </button>

                    <button
                        onClick={() => goTo("/changePass2")}
                        className="
                            absolute bottom-4 right-4
                            bg-[#3F6D2F] hover:bg-[#355C27]
                            text-white font-medium
                            py-3 px-6 rounded-md
                            transition flex items-center justify-center gap-2 cursor-pointer
                            z-20
                        "
                    >
                        Далі
                        <img src="/icons/Arrow-right.png" alt="" className="w-5 h-5" />
                    </button>

                    <div className="absolute bottom-0 left-0 right-0 overflow-hidden rounded-b-xl pointer-events-none">
                        <img
                            src="/icons/waves.png"
                            alt="Waves"
                            className="w-full object-cover opacity-90"
                        />
                    </div>
                </main>
            </div>

            <Footer />
        </div>
    );
}