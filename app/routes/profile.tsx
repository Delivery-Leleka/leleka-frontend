import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

export default function ProfilePage() {
  const [about, setAbout] = useState('');
  const [photo, setPhoto] = useState('/icons/add-image.png');
  const [menuOpen, setMenuOpen] = useState(false);
  const [nickname, setNickname] = useState('');
  const [error, setError] = useState('');
  const [logoutModal, setLogoutModal] = useState(false);
  const [email, setEmail] = useState('');

  const fileInput = useRef<HTMLInputElement | null>(null);
  const navigate = useNavigate();

  const handlePhotoPick = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const imageUrl = URL.createObjectURL(file);
    setPhoto(imageUrl);
  };

  const goTo = (path: string) => {
    navigate(path);
    setMenuOpen(false);
  };

  const allowedDomains = [
    'gmail.com',
    'ukr.net',
    'i.ua',
    'meta.ua',
    'icloud.com',
    'outlook.com',
    'hotmail.com',
    'yahoo.com',
    'proton.me',
  ];

  const validateEmail = (email: string) => {
    if (!email) return false;

    // без пробілів
    if (/\s/.test(email)) return false;

    const parts = email.split('@');
    if (parts.length !== 2) return false;

    const [local, domain] = parts;

    if (!local || local.length < 2) return false;

    return allowedDomains.includes(domain.toLowerCase());
  };

  const handleEmailChange = (v: string) => {
    setEmail(v);

    if (!validateEmail(v)) {
      setError('Некоректна або непідтримувана пошта');
    } else {
      setError('');
    }
  };

  const validateNickname = (v: string) => {
    const regex = /^[A-Za-z0-9_]+$/;

    if (!v) return 'Поле не може бути порожнім';

    if (!regex.test(v))
      return 'Можна використовувати лише латинські літери, цифри та _';

    if (v.length < 3) return 'Нікнейм занадто короткий';

    return '';
  };

  const checkTaken = async (v: string) => {
    const taken = ['delured', 'admin', 'mod']; //МИРОСЛАВ ЗАМІНИШ НА ЗАПИТ

    return taken.includes(v.toLowerCase());
  };

  const handleNickname = async (v: string) => {
    setNickname(v);

    const local = validateNickname(v);
    if (local) {
      setError(local);
      return;
    }

    const taken = await checkTaken(v);

    if (taken) {
      setError('Цей нік вже використовується');
    } else {
      setError('');
    }
  };

  const getErrorIcon = (msg: string) => {
    switch (msg) {
      case 'Можна використовувати лише латинські літери, цифри та _':
        return '/icons/Auto-line-height.png';

      case 'Нікнейм занадто короткий':
        return '/icons/Auto-width.png';

      default:
        return '/icons/error.png';
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const nickError = validateNickname(nickname);
    if (nickError) {
      setError(nickError);
      return;
    }

    const taken = await checkTaken(nickname);
    if (taken) {
      setError('Цей нік вже використовується');
      return;
    }

    if (!validateEmail(email)) {
      setError('Некоректна або непідтримувана пошта');
      return;
    }

    setError('');

    try {
      console.log('SAVE PROFILE', {
        nickname,
        email,
        about,
      });

      // МИРОСЛАВ запит на бек :)
    } catch (err) {
      setError('Помилка збереження');
    }
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

      {error && (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 bg-red-300 text-red-900 px-6 py-3 rounded-lg shadow-md flex items-center gap-2 z-50 animate-slideDown">
          <img src={getErrorIcon(error)} alt="Error" className="w-5 h-5" />
          <span className="font-medium">{error}</span>
        </div>
      )}

      <main className="flex justify-center items-start py-12 sm:py-16 px-4 w-full">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-[900px] bg-[#BADB9B] rounded-xl p-6 sm:p-10 relative overflow-hidden"
        >
          <h2 className="text-xl sm:text-2xl font-bold text-center mb-6 sm:mb-8 text-[#16321F]">
            Профіль
          </h2>

          <div className="flex flex-col md:flex-row gap-6 md:gap-10 relative z-10">
            <div className="flex justify-center md:justify-start">
              <div
                className="w-40 h-40 sm:w-60 sm:h-60 rounded-full bg-[#E5E5E5] flex items-center justify-center cursor-pointer relative group overflow-hidden"
                onClick={() => fileInput.current?.click()}
              >
                <img
                  src={photo}
                  className="w-full h-full object-cover rounded-full transition-all duration-200 group-hover:brightness-50"
                  alt="avatar"
                />

                <div className="absolute inset-0 flex flex-col items-center justify-center bg-white text-black text-sm sm:text-base font-semibold opacity-0 group-hover:opacity-50 transition-opacity duration-200">
                  <span>Змінити</span>
                  <span className="text-[10px] sm:text-xs mt-1 font-normal opacity-70">
                    Не більше 1 МБ
                  </span>
                </div>
              </div>

              <input
                type="file"
                accept="image/*"
                ref={fileInput}
                className="hidden"
                onChange={handlePhotoPick}
              />
            </div>

            <div className="flex flex-col flex-1 gap-4 sm:gap-5">
              <div>
                <label className="font-semibold text-[#16321F]">Імʼя</label>
                <input className="w-full h-9 border border-gray-500 rounded-md px-2 sm:px-3 mt-1 bg-white text-black" />
              </div>

              <div className="space-y-2">
                <label className="font-semibold text-[#16321F]">Username</label>

                <input
                  value={nickname}
                  onChange={(e) => handleNickname(e.target.value)}
                  className={`
                    border-2 rounded-md w-full h-9 px-3 transition-all duration-300 bg-white text-black
                    ${
                      error &&
                      [
                        'Можна використовувати лише латинські літери, цифри та _',
                        'Цей нік вже використовується',
                        'Нікнейм занадто короткий',
                        'Поле не може бути порожнім',
                      ].includes(error)
                        ? 'bg-red-200 border-red-500 animate-shake'
                        : 'bg-white border-[--input-border-color] text-primary focus:scale-[1.02]'
                    }
                    `}
                />
              </div>

              <div>
                <label className="font-semibold text-[#16321F]">Пошта</label>
                <input
                  value={email}
                  onChange={(e) => handleEmailChange(e.target.value)}
                  className={`
                    border-2 rounded-md w-full h-9 px-3 transition-all duration-300 bg-white text-black
                    ${
                      error === 'Некоректна або непідтримувана пошта'
                        ? 'bg-red-200 border-red-500 animate-shake'
                        : 'border-gray-500 focus:scale-[1.02]'
                    }
                  `}
                />
              </div>

              <div className="relative flex flex-col h-full">
                <label className="font-semibold text-[#16321F]">Про себе</label>
                <textarea
                  maxLength={70}
                  value={about}
                  onChange={(e) => setAbout(e.target.value)}
                  className="w-full h-24 border border-gray-500 rounded-md px-2 sm:px-3 py-2 mt-1 resize-none bg-white text-black"
                />
                <span className="absolute bottom-2 right-3 text-[10px] text-gray-600 pointer-events-none">
                  {70 - about.length} символів
                </span>
              </div>
              <button
                type="submit"
                className="self-end mt-6 px-6 py-2 bg-[#4b6b3d] hover:bg-[#3d5832] text-white font-semibold rounded-md transition-all duration-200 active:scale-95"
              >
                Зберегти
              </button>
            </div>
          </div>
        </form>
      </main>

      <footer className="w-full h-20 sm:h-24 bg-[#C7E2AE]"></footer>

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
                  console.log('USER LOGGED OUT');
                  navigate('/login');
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
      <style>{`
        @keyframes slideDown {
        0% { opacity: 0; transform: translateY(-10px); }
        100% { opacity: 1; transform: translateY(0); }
    }
        .animate-slideDown { animation: slideDown 0.4s ease-out; }

        @keyframes shake {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-4px); }
        50% { transform: translateX(4px); }
        75% { transform: translateX(-2px); }
    }
        .animate-shake { animation: shake 0.3s ease-in-out; }
`}</style>
    </div>
  );
}
