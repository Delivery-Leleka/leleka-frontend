import { Link } from 'react-router';

interface Props {
  onNext: () => void;
}

export default function PasswordRecoveryStage1({ onNext }: Props) {
  return (
    <main
      className="
        relative z-10 bg-[#B7D8A3] rounded-xl shadow-lg
        w-full max-w-[850px] min-h-[420px]       
        p-5 md:w-150 flex flex-col justify-center items-center text-center
      "
    >
      <h2 className="text-2xl sm:text-3xl font-semibold text-gray-800 mb-6">
        Відновлення паролю
      </h2>

      <div className="absolute bottom-0 left-0 right-0 overflow-hidden rounded-b-xl pointer-events-none">
        <img
          src="/icons/waves.png"
          alt="Waves"
          className="w-full object-cover opacity-90"
        />
      </div>

      <button
        type="button"
        className="
          relative z-10 
          w-[95%] sm:w-[70%]
          bg-[#3F6D2F] hover:bg-[#355C27] 
          text-white text-sm md:text-lg
          py-3 px-4 rounded-md 
          transition flex items-center justify-center gap-2 cursor-pointer
        "
        onClick={onNext}
      >
        Надіслати код на пошту
        <img src="/icons/email.png" alt="Email" className="w-5 h-5" />
      </button>

      <div className="absolute bottom-4 left-4 flex items-center text-[#355C27] hover:text-[#27481F] transition">
        <img src="/icons/back.png" alt="Назад" className="w-4 h-4 mr-2" />
        <Link to="/login" className="text-sm font-medium text-gray-800">
          Назад
        </Link>
      </div>
    </main>
  );
}
