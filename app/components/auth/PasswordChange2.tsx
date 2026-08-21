import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import Footer from "../layout/Footer";
import type { NewPass } from "~/types";

interface Props {
  onBack: () => void;
  onConfirm: (newPassword: string) => void;
}

export default function Stage2ChangePassword({ onBack, onConfirm }: Props) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [logoutModal, setLogoutModal] = useState(false);
  const [newPass, setPass] = useState<NewPass["newPassword"]>("");
  const [conPass, setCon] = useState<NewPass["confirmedPass"]>("");
  const [showNewPass, setShowNewPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const goTo = (path: string) => {
    navigate(path);
    setMenuOpen(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (newPass.trim().length < 8) {
      setError("Пароль має містити щонайменше 8 символів");
      return;
    }

    if (!/[A-Z]/.test(newPass) || !/[0-9]/.test(newPass)) {
      setError("Цей пароль не виглядає надійним");
      return;
    }

    if (newPass !== conPass) {
      setError("Паролі не співпадають");
      return;
    }

    setError("");
    onConfirm(newPass);
  };

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => setError(""), 3000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  const isInvalid = !newPass.trim() || !conPass.trim();

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

      {error && (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 bg-red-300 text-red-900 px-6 py-3 rounded-lg shadow-md flex items-center gap-2 z-50 animate-slideDown">
          <img src="/icons/error2.png" alt="Error" className="w-5 h-5" />
          <span className="font-medium">{error}</span>
        </div>
      )}

      <div className="flex-1 flex justify-center items-center px-4 py-6 md:py-10">
        <main className="relative bg-[#B7D8A3] rounded-xl shadow-lg p-8 w-[850px] max-w-[95%] text-center overflow-hidden">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">
            Новий пароль
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6 relative z-20">
            <div className="text-left">
              <h5 className="font-semibold text-[#2f2f2f] mb-2">
                Введіть пароль
              </h5>

              <div className="relative">
                <input
                  className={`border-2 rounded-lg w-full h-10 px-4 pr-12 bg-white text-[#2f2f2f] 
                        focus:outline-none transition-all duration-300 focus:scale-[1.02] ${
                          error && newPass.trim().length < 8
                            ? "border-red-500 bg-red-100 animate-shake"
                            : "border-[#557B4E]"
                        }`}
                  type={showNewPass ? "text" : "password"}
                  value={newPass}
                  onChange={(e) => setPass(e.target.value)}
                />

                <button
                  type="button"
                  onClick={() => setShowNewPass(!showNewPass)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 focus:outline-none"
                >
                  <img
                    src={
                      showNewPass
                        ? "/icons/Preview-close.png"
                        : "/icons/Preview-open.png"
                    }
                    alt="toggle password"
                    className="w-5 h-5 select-none"
                  />
                </button>
              </div>
            </div>

            <div className="text-left">
              <h5 className="font-semibold text-[#2f2f2f] mb-2">
                Повторіть пароль
              </h5>

              <div className="relative">
                <input
                  className={`border-2 rounded-lg w-full h-10 px-4 pr-12 bg-white text-[#2f2f2f]
                    focus:outline-none transition-all duration-300 focus:scale-[1.02] ${
                      error && newPass !== conPass
                        ? "border-red-500 bg-red-100 animate-shake"
                        : "border-[#557B4E]"
                    }`}
                  type={showConfirmPass ? "text" : "password"}
                  value={conPass}
                  onChange={(e) => setCon(e.target.value)}
                />

                <button
                  type="button"
                  onClick={() => setShowConfirmPass(!showConfirmPass)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 focus:outline-none"
                >
                  <img
                    src={
                      showConfirmPass
                        ? "/icons/Preview-close.png"
                        : "/icons/Preview-open.png"
                    }
                    alt="toggle password"
                    className="w-5 h-5 select-none"
                  />
                </button>
              </div>
            </div>

            <div className="flex justify-between items-center pt-4">
              <button
                type="button"
                onClick={onBack}
                className="bg-[#3F6D2F] hover:bg-[#355C27] text-white font-medium py-3 px-6 rounded-md transition flex items-center justify-center gap-2 cursor-pointer"
              >
                <img src="/icons/back.png" alt="Назад" className="w-5 h-5" />
                Назад
              </button>

              <button
                type="submit"
                disabled={isInvalid}
                className={`font-medium py-3 px-6 rounded-md transition flex items-center justify-center gap-2 cursor-pointer ${
                  isInvalid
                    ? "bg-gray-400 cursor-not-allowed text-white"
                    : "bg-[#3F6D2F] hover:bg-[#355C27] text-white"
                }`}
              >
                Створити
                <img
                  src="/icons/Arrow-right.png"
                  alt="Створити"
                  className="w-5 h-5"
                />
              </button>
            </div>
          </form>

          <div className="absolute bottom-0 left-0 right-0 z-10 pointer-events-none">
            <img
              src="/icons/waves.png"
              alt="Waves"
              className="w-full object-cover opacity-90"
            />
          </div>
        </main>
      </div>

      <Footer />

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