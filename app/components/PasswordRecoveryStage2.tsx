import { Link, useNavigate } from 'react-router';
import Header from './Header';
import Footer from './Footer';
import { useState } from 'react';
import type { Stage2 } from '../types/Types';

export default function Stage2Recover() {
  const [email, setEmail] = useState<Stage2['email']>('');
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-green-50 flex flex-col items-center justify-center font-sans md:bg-[url('/icons/bg-desktop.png')] bg-[url('/icons/bg-mobile.png')] bg-cover bg-center">
      <Header />

      <main
        className="
        relative z-20 bg-[#B7D8A3] rounded-xl shadow-lg 
        flex flex-col justify-center items-center
        w-90% max-w-[850px] min-h-[420px]

        p-5
        md:w-150
        lg:w-full

        text-center
        "
      >
        <h2 className="text-2xl sm:text-3xl font-semibold text-gray-800 mb-4 sm:mb-6">
          Відновлення паролю
        </h2>

        <div className="absolute bottom-0 left-0 right-0 overflow-hidden rounded-b-xl pointer-events-none">
          <img
            src="/icons/waves.png"
            alt="Waves"
            className="w-full object-cover opacity-90"
          />
        </div>

        <div className="relative z-10 w-full text-left mt-2 sm:mt-4">
          <h4 className="text-gray-800 text-sm sm:text-base font-semibold">
            Пошта вказана вірно?
          </h4>

          <h4 className="text-gray-800 text-sm sm:text-base mt-5 font-semibold">
            Якщо ні, укажіть правильну
          </h4>

          <input
            className="
              border-2 border-[--input-border-color] rounded-lg 
              bg-white text-primary font-bold
              w-full h-10 
              px-3 sm:px-4 
              transition-all duration-300 
              focus:outline-none focus:ring-0
              focus:scale-100 sm:focus:scale-[1.02]
              mt-3
            "
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button
            className="
              bg-[#3F6D2F] hover:bg-[#355C27] 
              w-full sm:w-auto
              mt-10 m-auto
              text-white font-medium 
              py-3 px-4 rounded-md 
              transition flex items-center justify-center gap-2 cursor-pointer
            "
            onClick={() => navigate('/passRecover3')}
          >
            Надіслати код
            <img src="/icons/email.png" alt="Email" className="w-5 h-5" />
          </button>
        </div>

        <div
          className="
            absolute bottom-4 left-4 right-4 
            flex justify-between items-center
            flex-col sm:flex-row
            gap-3
          "
        >
          <div className="flex items-center text-[#355C27] hover:text-[#27481F] transition sm:self-start">
            <img src="/icons/back.png" alt="Назад" className="w-4 h-4 mr-2" />
            <Link
              to="/passRecover"
              className="text-sm sm:text-base font-medium"
            >
              Назад
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
