import Header from '../layout/Header';
import type { NewPass } from '~/types';
import { useState, useEffect } from 'react';
import Footer from '../layout/Footer';
import axiosBackend from '~/api/axios';
import { useNavigate } from 'react-router-dom';

export default function NewPass() {
  const [newPass, setPass] = useState<NewPass['newPassword']>('');
  const [conPass, setCon] = useState<NewPass['confirmedPass']>('');
  const [showNewPass, setShowNewPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (newPass.trim().length < 8) {
      setError('Пароль має містити щонайменше 8 символів');
      return;
    }

    if (!/[A-Z]/.test(newPass) || !/[0-9]/.test(newPass)) {
      setError('Цей пароль не виглядає надійним');
      return;
    }

    if (newPass !== conPass) {
      setError('Паролі не співпадають');
      return;
    }

    setError('');
    // логіка беку
    try {
      const response = await axiosBackend.post('/newPass', {
        password: encodeURIComponent(newPass),
      });
      navigate('/login');
    } catch (err) {
      console.error(err);
      setError('Помилка реєстрації');
    }
  };

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => setError(''), 3000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  return (
    <div className="min-h-screen bg-green-50 flex flex-col font-sans md:bg-[url('/icons/bg-desktop.png')] bg-[url('/icons/bg-mobile.png')]">
      <Header />

      {error && (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 bg-red-300 text-red-900 px-6 py-3 rounded-lg shadow-md flex items-center gap-2 z-50 animate-slideDown">
          <img src="/icons/error2.png" alt="Error" className="w-5 h-5" />
          <span className="font-medium">{error}</span>
        </div>
      )}

      <main className="grow flex items-center justify-center py-10 relative">
        <div className="relative bg-[#B7D8A3] rounded-xl shadow-lg p-8 w-[850px] max-w-[95%] text-center overflow-hidden">
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
                            ? 'border-red-500 bg-red-100 animate-shake'
                            : 'border-[#557B4E]'
                        }`}
                  type={showNewPass ? 'text' : 'password'}
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
                        ? '/icons/Preview-close.png'
                        : '/icons/Preview-open.png'
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
                        ? 'border-red-500 bg-red-100 animate-shake'
                        : 'border-[#557B4E]'
                    }`}
                  type={showConfirmPass ? 'text' : 'password'}
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
                        ? '/icons/Preview-close.png'
                        : '/icons/Preview-open.png'
                    }
                    alt="toggle password"
                    className="w-5 h-5 select-none"
                  />
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="bg-[#4b6b3d] hover:bg-[#3d5832] text-white text-center font-semibold w-full py-3 rounded-md shadow-md transition-all duration-200 active:scale-95 mt-6"
            >
              Створити
            </button>
          </form>

          <div className="absolute bottom-0 left-0 right-0 z-10 pointer-events-none">
            <img
              src="/icons/waves.png"
              alt="Waves"
              className="w-full object-cover opacity-90"
            />
          </div>
        </div>
      </main>

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
