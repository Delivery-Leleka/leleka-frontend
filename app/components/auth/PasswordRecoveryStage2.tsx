import { useState } from "react";
import type { Stage2 } from "~/types";

interface Props {
  onNext: (email?: string) => void;
  onBack: () => void;
}

export default function PasswordRecoveryStage2({ onNext, onBack }: Props) {
  const [email, setEmail] = useState<Stage2["email"]>("");

  return (
    <main
      className="
        relative z-20 bg-[#B7D8A3] rounded-xl shadow-lg 
        flex flex-col justify-center items-center
        w-full max-w-[850px] min-h-[420px]
        p-5 md:w-150 text-center
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
            w-full h-10 px-3 sm:px-4 
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
          type="button"
          className="
            bg-[#3F6D2F] hover:bg-[#355C27] 
            w-full sm:w-auto mt-10 m-auto
            text-white font-medium py-3 px-4 rounded-md 
            transition flex items-center justify-center gap-2 cursor-pointer
          "
          onClick={() => onNext(email)}
        >
          Надіслати код
          <img src="/icons/email.png" alt="Email" className="w-5 h-5" />
        </button>
      </div>

      <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center gap-3">
        <button
          type="button"
          onClick={onBack}
          className="flex items-center text-[#355C27] hover:text-[#27481F] transition text-sm sm:text-base font-medium cursor-pointer"
        >
          <img src="/icons/back.png" alt="Назад" className="w-4 h-4 mr-2" />
          Назад
        </button>
      </div>
    </main>
  );
}