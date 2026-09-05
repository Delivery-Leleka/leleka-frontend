import { Link, useNavigate } from 'react-router';
import { useState } from 'react';

export default function ProfilePage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [logoutModal, setLogoutModal] = useState(false);

  const navigate = useNavigate();
  const goTo = (path: string) => {
    navigate(path);
    setMenuOpen(false);
  };

  return (
    <div className="overflow-hidden min-h-screen flex flex-col justify-between items-center font-sans bg-green-50 md:bg-[url('/icons/bg-new.png')] bg-[url('/icons/bg-new-mobile.png')] bg-cover bg-center bg-no-repeat">
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
            ${menuOpen ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0'}
          `}
        >
          <ul className="flex flex-col text-black select-none">
            <li onClick={() => goTo('/profile')} className="menu-item">
              <img src="/icons/profile.png" className="w-5" /> Профіль
            </li>
            <li onClick={() => goTo('/contacts')} className="menu-item">
              <img src="/icons/phone.png" className="w-5" /> Контакти
            </li>
            <li onClick={() => goTo('/create-group')} className="menu-item">
              <img src="/icons/add-group.png" className="w-5" /> Створити групу
            </li>
            <li onClick={() => goTo('/private-folder')} className="menu-item">
              <img src="/icons/folder.png" className="w-5" /> Приватна папка
            </li>
            <li onClick={() => goTo('/archive')} className="menu-item">
              <img src="/icons/archive.png" className="w-5" /> Архів
            </li>
            <li onClick={() => goTo('/settings')} className="menu-item">
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

      <main className="flex justify-center items-start py-12 sm:py-16 px-4 w-full">
        <div className="w-full max-w-[820px] bg-[#BADB9B] rounded-xl relative pt-10 overflow-hidden h-[570px]">
          <h2 className="text-xl sm:text-2xl font-bold text-center mb-8 text-[#16321F]">
            Налаштування
          </h2>

          <Link to="/changePass">
            <div className="settings-item pr-20 hover:bg-[#F2EFE6]">
              <h3 className="text-[#262424] font-semibold">Змінити пароль</h3>
              <img src="/icons/lapa1.png" alt="" />
            </div>
          </Link>

          <Link to="/emailChange1">
            <div className="settings-item pr-6 hover:bg-[#F2EFE6]">
              <h3 className="text-[#262424] font-semibold">Змінити пошту</h3>
              <img src="/icons/lapa5.png" alt="" />
            </div>
          </Link>

          <Link to="#">
            <div className="settings-item pr-20 hover:bg-[#72A850]">
              <h3 className="text-[#262424] font-semibold">
                Загальні налаштування
              </h3>
              <img src="/icons/lapa2.png" alt="" />
            </div>
          </Link>

          <Link to="/privacy">
            <div className="settings-item pr-6 hover:bg-[#477628]">
              <h3 className="text-[#262424] font-semibold">
                Приватність і безпека
              </h3>
              <img src="/icons/lapa3.png" alt="" />
            </div>
          </Link>

          <Link to="#">
            <div className="group settings-item pr-20 hover:bg-[#477628]">
              <h3 className="text-[#262424] font-semibold">
                Зв'язатись з нами
              </h3>
              <img
                src="/icons/lapa4.png"
                alt=""
                className="block group-hover:hidden"
              />
              <img
                src="/icons/lapa4_2.png"
                alt=""
                className="hidden group-hover:block"
              />
            </div>
          </Link>
        </div>
      </main>

      <footer className="w-full h-20 sm:h-24 bg-[#C7E2AE]"></footer>
    </div>
  );
}
