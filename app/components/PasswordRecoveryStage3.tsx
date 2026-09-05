import { Link } from 'react-router';
import Header from './Header';
import Footer from './Footer';
import { useState, useEffect } from 'react';

export default function Stage3() {
  const [active, setActive] = useState(false);
  const [timer, setTimer] = useState(0);

  useEffect(() => {
    let interval: number | undefined;
    if (active && timer > 0) {
      interval = window.setInterval(() => setTimer((prev) => prev - 1), 1000);
    } else if (timer === 0 && active) {
      setActive(false);
    }
    return () => clearInterval(interval);
  }, [active, timer]);

  const handleClick = () => {
    if (!active) {
      setActive(true);
      setTimer(60);
    }
  };

  return (
    <div
      className="min-h-screen bg-green-50 flex flex-col items-center justify-center font-sans 
                    md:bg-[url('/icons/bg-desktop.png')] bg-[url('/icons/bg-mobile.png')] bg-cover bg-center"
    >
      <Header />
      <main
        className="relative bg-[#B7D8A3] rounded-xl shadow-lg p-4 sm:p-6 md:p-8 
                      w-75 max-w-[850px] min-h-[420px] text-center flex flex-col justify-center items-center overflow-
                      md:w-170
                      lg:w-full"
      >
        <img
          src="/icons/waves.png"
          alt="Waves"
          className="absolute bottom-0 left-0 right-0 w-full object-cover opacity-90 z-0"
        />
        <div className="relative z-10 w-full flex flex-col items-center px-2 sm:px-4 md:px-8">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-gray-800 mb-4 sm:mb-6">
            Відновлення паролю
          </h2>

          <h5 className="text-lg sm:text-xl md:text-xl font-semibold text-gray-800 mb-4 sm:mb-6">
            Введіть код з листа
          </h5>

          <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-6 w-full">
            {[...Array(6)].map((_, i) => (
              <input
                key={i}
                type="text"
                inputMode="numeric"
                maxLength={1}
                placeholder="_"
                onChange={(e: any) => {
                  // keep only digits
                  if (!/^\d$/.test(e.target.value)) {
                    e.target.value = '';
                    return;
                  }
                  // auto tab to next input
                  const next = e.target.nextElementSibling;
                  if (next) next.focus();
                }}
                onKeyDown={(e: any) => {
                  // backspace → go to previous input
                  if (e.key === 'Backspace' && !e.target.value) {
                    const prev = e.target.previousElementSibling;
                    if (prev) prev.focus();
                  }
                }}
                className="w-8 xs:w-12 sm:w-16 md:w-20 h-12 xs:h-14 sm:h-20 md:h-24 text-black text-center text-xl xs:text-2xl sm:text-4xl md:text-5xl font-semibold border-2 border-[#262424] rounded-lg 
        focus:outline-none focus:ring-2 focus:ring-[#262424] focus:border-[#262424] bg-white shadow-sm transition duration-150"
              />
            ))}
          </div>

          <div className="flex flex-col gap-3 sm:gap-4 w-full items-center">
            <button className="w-64 sm:w-64 md:w-80 lg:w-[500px] py-3 bg-[#477628] text-white font-semibold rounded-lg shadow-md hover:bg-green-600 transition cursor-pointer">
              Підтвердити
            </button>

            <button
              onClick={handleClick}
              disabled={active}
              className={`w-64 sm:w-64 md:w-80 lg:w-[500px] py-3 text-white font-semibold rounded-lg shadow-md transition 
                         ${active ? 'bg-green-700 cursor-not-allowed' : 'bg-[#72A850] hover:bg-green-700 cursor-pointer'}`}
            >
              {active ? (
                `Надіслати код повторно через ${timer} с`
              ) : (
                <>
                  Надіслати код повторно{' '}
                  <img
                    src="/icons/redo.png"
                    alt="redo"
                    className="inline-block w-4 h-4 ml-1"
                  />
                </>
              )}
            </button>
          </div>
        </div>

        <div className="absolute bottom-4 left-4 flex items-center text-[#355C27] hover:text-[#27481F] transition">
          <img src="/icons/back.png" alt="Назад" className="w-4 h-4 mr-2" />
          <Link to="/register" className="text-sm font-medium text-gray-800">
            Назад
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}
