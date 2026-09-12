import { Laptop, Smartphone } from 'lucide-react';
import { useNavigate } from 'react-router';
import FaqAccordion from '~/components/home/FaqAccordion';
import Footer from '~/components/layout/Footer';
import Header from '~/components/layout/Header';
import { BENEFITS, STATS } from '~/constants/homeData';

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-app-bg-alt text-brand-950 font-sans selection:bg-brand-800 selection:text-white overflow-x-hidden">
      <Header />

      {/* Hero Section */}
      <section className="relative px-6 md:px-12 py-16 md:py-28 max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12 overflow-hidden">
        <div className="w-full md:w-1/2 space-y-6 z-10">
          <h1 className="text-4xl md:text-6xl font-black leading-tight text-brand-950 tracking-tight">
            Свобода спілкування <br />
            <span className="text-brand-800">у кожному повідомленні</span>
          </h1>
          <p className="text-brand-700 text-lg leading-relaxed max-w-lg">
            Затишний простір для швидкого спілкування з близькими без реклами,
            обмежень та зайвого шуму.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md pt-4">
            <button
              type="button"
              onClick={() => navigate('/register')}
              className="bg-brand-800 text-white py-4 px-8 rounded-2xl font-extrabold text-lg hover:bg-brand-900 shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-1 active:scale-95 text-center cursor-pointer"
            >
              Зареєструватися безкоштовно
            </button>
            <button
              type="button"
              onClick={() => navigate('/login')}
              className="border-2 border-brand-800 bg-transparent text-brand-800 py-4 px-8 rounded-2xl font-extrabold text-lg hover:bg-brand-50 transition-all active:scale-95 text-center cursor-pointer"
            >
              Увійти
            </button>
          </div>
        </div>
        <div className="w-full md:w-1/2 flex items-center justify-center relative">
          <img
            src="/leleka.png"
            alt="Лелека"
            className="max-w-full h-auto object-contain"
          />
        </div>
      </section>

      {/* Stats */}
      <section className="bg-brand-50 border-y border-brand-50 py-10 px-6 md:px-12">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {STATS.map((stat, idx) => (
            <div key={idx} className="space-y-1">
              <p className="text-3xl md:text-4xl font-black text-brand-800">
                {stat.value}
              </p>
              <p className="text-xs md:text-sm font-semibold text-brand-700">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* About */}
      <section id="about" className="mx-6 md:mx-auto my-16 max-w-7xl">
        <div className="bg-brand-50/80 border border-brand-50 rounded-3xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-10 shadow-sm">
          <div className="w-full md:w-2/3 space-y-5">
            <h2 className="text-3xl md:text-4xl font-extrabold flex items-center gap-3 text-brand-950">
              <img
                src="/icons/lapa1.png"
                alt=""
                className="w-8 h-8 object-contain"
                aria-hidden="true"
              />
              Про нас
            </h2>
            <p className="text-2xl font-bold leading-relaxed text-brand-950">
              Лелека — український месенджер для швидкого, безпечного та
              зручного спілкування.
            </p>
            <p className="text-brand-700 text-lg max-w-2xl">
              Створено з думкою про людей. Ми об'єднуємо сучасні технології
              шифрування та простий інтерфейс.
            </p>
          </div>
          <div className="w-full md:w-1/3 flex justify-center">
            <button
              type="button"
              onClick={() => navigate('/register')}
              className="bg-brand-800 text-white px-10 py-5 rounded-2xl font-extrabold text-xl hover:bg-brand-900 transition-all shadow-xl hover:scale-105 active:scale-95 cursor-pointer"
            >
              Спробувати зараз ➔
            </button>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section
        id="benefits"
        className="px-6 md:px-12 py-16 max-w-7xl mx-auto text-center"
      >
        <h2 className="text-3xl md:text-4xl font-extrabold mb-12 flex justify-center items-center gap-3 text-brand-950">
          <img
            src="/icons/lapa1.png"
            alt=""
            className="w-8 h-8 object-contain"
            aria-hidden="true"
          />
          Переваги
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4">
          {BENEFITS.map((item, idx) => (
            <div
              key={idx}
              className="border border-brand-50 bg-white p-6 rounded-2xl flex flex-col items-center justify-center space-y-3 hover:shadow-xl hover:border-brand-800 hover:-translate-y-1 transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-xl bg-brand-50 flex items-center justify-center">
                <img
                  src={item.icon}
                  alt=""
                  className="w-6 h-6 object-contain"
                  aria-hidden="true"
                />
              </div>
              <h3 className="font-bold text-lg text-brand-950">{item.title}</h3>
              <p className="text-xs text-brand-700">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Apps Section */}
      <section id="apps" className="px-6 md:px-12 py-12 max-w-7xl mx-auto">
        <div className="bg-white border border-brand-50 rounded-3xl p-8 md:p-12 shadow-sm flex flex-col lg:flex-row items-center justify-between gap-10">
          <div className="w-full lg:w-1/2 space-y-6">
            <h2 className="text-3xl md:text-4xl font-extrabold flex items-center gap-3 text-brand-950">
              <img
                src="/icons/lapa1.png"
                alt=""
                className="w-8 h-8 object-contain"
                aria-hidden="true"
              />
              Застосунки
            </h2>
            <p className="text-2xl font-bold leading-snug text-brand-950">
              Обирай зручний формат для свого пристрою
            </p>
            <p className="text-brand-700 text-base md:text-lg leading-relaxed">
              Лелека працює на смартфонах, планшетах і комп'ютерах.
            </p>
            <div className="pt-2">
              <button
                type="button"
                onClick={() => navigate('/apps')}
                className="bg-brand-800 text-white px-8 py-4 rounded-2xl font-extrabold text-lg hover:bg-brand-900 transition-all shadow-md hover:shadow-xl hover:scale-105 active:scale-95 cursor-pointer inline-flex items-center gap-3"
              >
                <span>Усі застосунки</span>
                <span className="text-xl">➔</span>
              </button>
            </div>
          </div>

          <div className="w-full lg:w-1/2 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-brand-50/60 border border-brand-50 p-6 rounded-2xl flex flex-col justify-between">
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-xl bg-white border border-brand-50 flex items-center justify-center text-brand-800 shadow-xs">
                  <Smartphone />
                </div>
                <h3 className="text-xl font-bold text-brand-950">Смартфони</h3>
                <p className="text-brand-700 text-xs leading-relaxed">
                  Версії для iOS та Android.
                </p>
              </div>
            </div>
            <div className="bg-brand-50/60 border border-brand-50 p-6 rounded-2xl flex flex-col justify-between">
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-xl bg-white border border-brand-50 flex items-center justify-center text-brand-800 shadow-xs">
                  <Laptop />
                </div>
                <h3 className="text-xl font-bold text-brand-950">Комп'ютери</h3>
                <p className="text-brand-700 text-xs leading-relaxed">
                  Версії для Windows, macOS та Linux.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Component */}
      <FaqAccordion />

      {/* Contacts */}
      <section
        id="contacts"
        className="px-6 md:px-12 py-16 max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-10"
      >
        <div className="w-full md:w-1/2 space-y-4">
          <h2 className="text-3xl md:text-4xl font-extrabold flex items-center gap-3 text-brand-950">
            <img
              src="/icons/lapa1.png"
              alt=""
              className="w-8 h-8 object-contain"
              aria-hidden="true"
            />
            Контакти
          </h2>
          <p className="text-xl font-bold max-w-md text-brand-950">
            Залишилися питання? Наша пошта завжди відкрита для тебе )
          </p>
          <p className="text-xl font-bold text-brand-800">
            Чекаємо на твій меседж!
          </p>
        </div>

        <div className="w-full md:w-1/2 relative group">
          <div
            className="relative rounded-[40px] overflow-hidden shadow-2xl border border-brand-50 min-h-[260px] flex items-center justify-center bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage:
                'linear-gradient(to bottom right, rgba(243, 244, 246, 0.45), rgba(220, 252, 231, 0.40)), url("/icons/lotus-contact.png")',
            }}
          >
            <div className="relative z-10 p-6 text-center">
              <a
                href="mailto:deliveryleleka@gmail.com"
                className="inline-block bg-brand-800 text-white px-8 py-4 rounded-xl font-extrabold text-lg md:text-xl hover:bg-brand-900 hover:scale-105 transition-all shadow-xl"
              >
                Написати нам
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
