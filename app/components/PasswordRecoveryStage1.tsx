import { Link } from "react-router";
import Header from "./Header";
import Footer from "./Footer";
import { useNavigate } from "react-router-dom";

export default function Stage1() {
  const navigate = useNavigate();

  const stage2 = () => {
    navigate("/passRecover2");
  };
  return (
    <div className="min-h-screen bg-green-50 flex flex-col items-center justify-center font-sans md:bg-[url('/icons/bg-desktop.png')] bg-[url('/icons/bg-mobile.png')] bg-cover bg-center">
      <Header />

      <main
        className="
        relative z-10 bg-[#B7D8A3] rounded-xl shadow-lg
        w-100% max-w-[850px]
        min-h-[420px]       
        
        p-5
        md:w-150
        lg:w-full
        flex flex-col justify-center items-center text-center
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
          className="
            relative z-10 
            w-[95%] sm:w-[70%]
            bg-[#3F6D2F] hover:bg-[#355C27] 
            text-white text-sm md:text-lg
            py-3 px-4 rounded-md 
            transition flex items-center justify-center gap-2 cursor-pointer
          "
          onClick={stage2}
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

      <Footer />
    </div>
  );
}
