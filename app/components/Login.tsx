import React, { useState, useEffect } from 'react';
import axiosBackend from '../axios';
import { useNavigate } from 'react-router-dom';
import { setUser } from '../userFuncs';

function LoginPage() {
  const [email, setEmail] = useState<string>('');
  const [pass, setPass] = useState<string>('');
  const [showPass, setShowPass] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [submitting, setSubmitting] = useState<boolean>(false);
  const navigate = useNavigate();
  const ERROR_ICON = '/icons/error.png';

  /* ---------------- INPUT HANDLERS ---------------- */
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);

    if (process.env.NODE_ENV == 'development') {
      console.log(`DL [DEV_DEBUG]: Email - ${email}`);
    }
  };

  const handlePassChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPass(e.target.value);

    if (process.env.NODE_ENV == 'development') {
      console.log(`DL [DEV_DEBUG]: Password (!!!!) - ${pass}`);
    }
  };
  /* ---------------- SUBMIT ---------------- */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitting) return;

    setError('');
    setSubmitting(true);

    try {
      // console.log(email)
      // console.log(pass)
      const res = await axiosBackend.post('/auth/login', {
        email,
        pass,
      });
      const data = res.data;
      if (process.env.NODE_ENV == 'development') {
        console.log(data);
      }

      if (data.success) {
        if (data.two_factor_status) {
          // TODO: 2FA!!!!
        } else {
          setError('Вхід успішний!');
          setUser(data.user);
          navigate('/onboarding');
        }
      }
    } catch (err: any) {
      console.error(err);
      const msg = err?.response?.data?.message;
      console.log(msg);

      switch (msg) {
        case 'wrong-email':
          setError('Неправильна пошта');
          break;
        case 'wrong-password':
          setError('Неправильний пароль');
          break;
        case 'attempts-left':
          setError('Залишилось 2 спроби');
          break;
        case 'limit-exceeded':
          setError('Ліміт спроб вичерпано, спробуйте через 10 хвилин');
          break;
        default:
          setError('Помилка входу');
      }
    } finally {
      setSubmitting(false);
    }
  };

  /* ---------------- ERROR AUTO-HIDE ---------------- */
  useEffect(() => {
    if (!error) return;
    const t = setTimeout(() => setError(''), 3000);
    return () => clearTimeout(t);
  }, [error]);

  /* ---------------- DEBUG (SAFE) ---------------- */

  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      console.log('EMAIL STATE:', email);
      console.log('PASS STATE:', pass);
    }
  }, [email, pass]);

  /* ---------------- RENDER ---------------- */
  return (
    <div className="min-h-screen flex flex-col justify-between items-center font-sans md:bg-[url('/icons/bg-desktop.png')] bg-[url('/icons/bg-mobile.png')] bg-cover bg-center bg-no-repeat bg-green-50">
      <header className="w-full bg-primary text-primary text-center content-center md:h-16 sm:h-14 font-title text-3xl">
        <h1>Поштовий Лелека</h1>
      </header>

      {error && (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 bg-red-300 text-red-900 px-6 py-3 rounded-lg shadow-md flex items-center gap-2 z-50 animate-slideDown">
          <img src={ERROR_ICON} alt="Error" className="w-5 h-5" />
          <span className="font-medium">{error}</span>
        </div>
      )}

      <main className="grow w-full flex justify-center items-center">
        <form
          onSubmit={handleSubmit}
          className="
              relative overflow-hidden
              bg-primary mx-auto my-8 rounded-xl
              w-[92%] sm:w-[85%] md:w-[85%] lg:w-[900px]
              shadow-lg transition-all duration-300 animate-fadeIn
            "
        >
          <div className="absolute bottom-0 left-0 right-0 overflow-hidden rounded-b-xl pointer-events-none select-none">
            <img
              src="/icons/waves.png"
              alt="Waves"
              className="w-full object-cover opacity-90"
              draggable="false"
            />
          </div>

          <div className="relative z-10 p-5 sm:p-6 md:p-8 space-y-6 w-full">
            <h2 className="font-raleway font-bold text-xl sm:text-2xl text-primary text-center mb-6">
              Увійти в акаунт
            </h2>

            <div className="flex flex-col gap-6">
              <div className="space-y-2">
                <h5 className="font-raleway font-semibold text-primary text-lg">
                  Введіть пошту
                </h5>
                <input
                  className={`border-2 rounded-lg w-full h-10 px-4 transition-all duration-300 ${
                    error === 'Неправильна пошта'
                      ? 'bg-red-200 border-red-500 animate-shake'
                      : 'bg-white border-[--input-border-color] text-primary focus:scale-[1.02]'
                  }`}
                  type="text"
                  value={email}
                  onChange={handleEmailChange}
                  autoComplete="email"
                />
              </div>
              <div className="relative">
                <h5 className="font-raleway font-semibold text-primary text-lg pb-0.5">
                  Введіть пароль
                </h5>
                <input
                  type={showPass ? 'text' : 'password'}
                  value={pass}
                  onChange={handlePassChange}
                  autoComplete="current-password"
                  className={`border-2 rounded-lg w-full h-10 px-4 pr-12 transition-all duration-300 ${
                    [
                      'Неправильний пароль',
                      'Залишилось 2 спроби',
                      'Ліміт спроб вичерпано, спробуйте через 10 хвилин',
                    ].includes(error)
                      ? 'bg-red-200 border-red-500 animate-shake'
                      : 'bg-white border-[--input-border-color] text-primary focus:scale-[1.02]'
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPass((prev) => !prev)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 focus:outline-none"
                >
                  <img
                    src={
                      showPass
                        ? '/icons/Preview-close.png'
                        : '/icons/Preview-open.png'
                    }
                    alt="toggle password"
                    className="w-5 h-5 select-none mt-8"
                  />
                </button>
              </div>
            </div>

            <div className="justify-center text-center">
              <a
                href="/passRecover"
                className="text-[#9E463B] underline transition"
              >
                Забули пароль?
              </a>
            </div>

            <div className="flex flex-col sm:flex-row sm:justify-between items-center gap-4 mt-8">
              <button
                type="button"
                className="w-full sm:w-auto flex items-center justify-center bg-[#9cc68a] hover:bg-[#88b274] text-[#2f2f2f] px-4 py-2 rounded-md font-semibold border border-[#294a2b] transition-all duration-200 active:scale-95 gap-2 cursor-pointer"
              >
                <span>Увійти через Google</span>
                <img src="/icons/google.png" alt="Google" className="w-6 h-6" />
              </button>

              <button
                type="submit"
                disabled={submitting}
                onSubmit={() => navigate('/onboarding')}
                className="w-full sm:w-auto bg-[#4b6b3d] hover:bg-[#3d5832] text-white font-semibold px-6 py-2 rounded-md shadow-md transition-all duration-200 active:scale-95 cursor-pointer disabled:opacity-60"
              >
                {submitting ? 'Завантаження...' : 'Увійти'}
              </button>
            </div>

            <a href="/register" className="text-gray-800 underline transition">
              Не маєте акаунта?
            </a>
          </div>
        </form>
      </main>

      <footer className="w-full bg-primary py-6 text-center">
        <div className="h-24"></div>
      </footer>

      <style>{`
        @keyframes slideDown {
          0% { opacity: 0; transform: translateY(-10px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-slideDown { animation: slideDown 0.4s ease-out; }

        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.98); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-fadeIn { animation: fadeIn 0.5s ease-out; }

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

export default LoginPage;
