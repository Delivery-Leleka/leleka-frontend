import { useState } from 'react';
import { useNavigate } from 'react-router';
import Footer from '../layout/Footer';

interface Props {
  onNext: (newEmail: string) => void;
  onBack: () => void;
}

export default function Stage2ChangeEmail({ onNext, onBack }: Props) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [logoutModal, setLogoutModal] = useState(false);
  const [newEmail, setNewEmail] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const goTo = (path: string) => {
    navigate(path);
    setMenuOpen(false);
  };

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const validate = () => {
    let err = '';

    if (!newEmail.trim()) {
      err = 'Поле не може бути порожнім';
    } else if (!validateEmail(newEmail.trim())) {
      err = 'Вкажіть коректну пошту (наприклад: name@example.com)';
    }

    setError(err);
    return err === '';
  };

  const handleSubmit = () => {
    if (!validate()) return;
    onNext(newEmail.trim());
  };

  const isInvalid = !newEmail.trim();

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

        <div className="flex items-center bg-white rounded-md h-8 px-3 flex-1 max-w-[40vw] border border-black mx-6 md:max-w-[450px]">
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
            <li onClick={() => goTo('/myProfile')} className="menu-item">
              <img src="/icons/profile.png" className="w-5" /> Профіль
            </li>
            <li onClick={() => goTo('/contacts')} className="menu-item">
              <img src="/icons/phone.png" className="w-5" /> Контакти
            </li>
            <li onClick={() => goTo('/createGroup')} className="menu-item">
              <img src="/icons/add-group.png" className="w-5" /> Створити групу
            </li>
            <li onClick={() => goTo('/privateFolder')} className="menu-item">
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

      <div className="flex-1 flex justify-center items-center px-4 py-6 md:py-10">
        <main
          className="
            relative z-10 bg-[#B7D8A3] rounded-xl shadow-lg
            flex flex-col justify-center items-center
            w-full max-w-[850px] min-h-[420px]
            px-5 py-6 sm:px-6 sm:py-8 md:px-8 md:py-10
            text-center overflow-hidden
          "
        >
          <h2 className="text-2xl sm:text-3xl font-semibold text-gray-800 mb-6">
            Змінити пошту
          </h2>

          <div className="flex-1 flex items-center justify-center relative z-20 w-full">
            <div className="w-full max-w-[800px] text-left">
              <h4 className="text-gray-800 text-sm sm:text-base">
                Вкажіть нову електронну пошту
              </h4>

              <div className="relative w-full mt-3">
                <input
                  type="email"
                  placeholder="example@mail.com"
                  className={`
                    border-2 rounded-lg
                    bg-white text-gray-800 font-medium
                    w-full h-10 px-3 sm:px-4
                    transition-all duration-300
                    focus:outline-none
                    ${error ? 'border-red-500' : 'border-gray-300'}
                  `}
                  value={newEmail}
                  onChange={(e) => {
                    setNewEmail(e.target.value);
                    if (error) setError('');
                  }}
                />
              </div>

              {error && <p className="text-red-600 text-sm mt-1">{error}</p>}
            </div>
          </div>

          <button
            type="button"
            onClick={onBack}
            className="
              absolute bottom-4 left-4 z-20 
              flex items-center text-[#355C27] hover:text-[#27481F] 
              text-sm font-medium transition cursor-pointer
            "
          >
            <img src="/icons/back.png" alt="Назад" className="w-4 h-4 mr-2" />
            Назад
          </button>

          <button
            type="button"
            disabled={isInvalid}
            onClick={handleSubmit}
            className={`
              absolute bottom-4 right-4
              text-white font-medium py-3 px-6 rounded-md 
              flex items-center gap-2 transition z-20 cursor-pointer
              ${isInvalid ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#3F6D2F] hover:bg-[#355C27]'}
            `}
          >
            Далі
            <img
              src="/icons/Arrow-right.png"
              alt="Right-Arrow"
              className="w-5 h-5"
            />
          </button>

          <div className="absolute bottom-0 left-0 right-0 overflow-hidden rounded-b-xl z-0 pointer-events-none">
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
