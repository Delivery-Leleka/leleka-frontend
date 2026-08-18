import { useNavigate } from "react-router-dom";

const Four04 = () => {
  const navigate = useNavigate();
  return (
    <div className="overflow-hidden min-h-screen flex flex-col justify-between items-center font-sans bg-green-50 md:bg-[url('/icons/bg-new.png')] bg-[url('/icons/bg-new-mobile.png')] bg-cover bg-center bg-no-repeat">
      <header className="relative w-full h-16 bg-[#C7E2AE] flex items-center justify-between px-4 sm:px-6 md:px-8">
        <div className="flex items-center bg-white rounded-md h-8 px-3 flex-1 max-w-[40vw] border border-black mx-6 md:max-w-[800px] md:ml-100">
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
      </header>

      <main className="justify-center items-start py-12 sm:py-16 px-4 md:w-[60vw] w-[90vw]">
        <div>
          <h2 className="text-9xl text-[#294A2B] font-bold">404</h2>
        </div>
        <br></br>
        <div>
          <span className="md:text-5xl text-[#477628] font-bold text-3xl">
            Йой, щось пішло не так...
            <br></br>
            Але лелека вже летить на допомогу!
          </span>
        </div>
        <div className="flex justify-center mt-25">
          <button className="bg-[#477628] w-140 h-12 rounded-lg text-xl font-semibold" onClick={() => navigate('/onboarding')}>Повернутись до чатів</button>
        </div>
      </main>
      <footer className="w-full h-24 bg-[#C7E2AE]"></footer>
    </div>
  );
};

export default Four04;
