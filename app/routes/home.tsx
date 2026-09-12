import { Globe, Laptop, Smartphone } from 'lucide-react';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '~/components/layout/Footer';
import Header from '~/components/layout/Header';

interface FaqItem {
  q: string;
  a: string;
}

const faqItems: FaqItem[] = [
  {
    q: 'Лелека дійсно безкоштовна? У чому підвох?',
    a: "Жодного підвоху! Ми не продаємо ваші дані, не крутимо рекламу та не нав'язуємо преміум-підписки. Месенджер створювався для вільного спілкування, а не для викачування грошей.",
  },
  {
    q: 'Що потрібно для реєстрації?',
    a: 'Для створення акаунту потрібна тільки ваша електронна пошта — на неї ми надішлемо лист для підтвердження. Номер телефону вказувати не потрібно.',
  },
  {
    q: 'Чи читаєте ви мої чати? Наскільки це безпечно?',
    a: 'Ні, ми не маємо доступу до ваших листувань. Усі дані захищені сучасним шифруванням (HTTPS/TLS) і зберігаються на надійних серверах.',
  },
  {
    q: 'Як працює «Приватна папка»?',
    a: 'Це спеціальний розділ-сейф для найважливіших або секретних чатів. Доступ до неї відкривається лише після введення твого особистого PIN-коду.',
  },
  {
    q: 'Чи можу я видаляти або редагувати свої повідомлення?',
    a: 'Звісно! Ти маєш повний контроль над своїми повідомленнями. Їх можна редагувати або видаляти для всіх учасників бесіди без жодних часових лімітів.',
  },
  {
    q: "Чи працює Лелека за слабкого інтернет-з'єднання?",
    a: 'Так! При низькій якості інтернету ви можете скористатися лайт-версію. У цьому режимі не завантажуються медіа файли, стікери та анімації, що значно зменшує трафік.',
  },
];

const LandingPage: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const [currentLang, setCurrentLang] = useState<'UA' | 'EN'>('UA');
  const navigate = useNavigate();

  const toggleFaq = (index: number) => {
    setOpenFaq((prev) => (prev === index ? null : index));
  };

  const toggleLanguage = () => {
    setCurrentLang((prev) => (prev === 'UA' ? 'EN' : 'UA'));
  };

  return (
    <div className="min-h-screen bg-app-bg-alt text-brand-950 font-sans selection:bg-brand-800 selection:text-white overflow-x-hidden">
      <Header />

      {isMobileMenuOpen && (
        <nav className="md:hidden bg-app-bg-alt border-b border-brand-50 px-6 py-4 flex flex-col gap-4 text-center font-medium text-brand-700">
          <a href="#about" onClick={() => setIsMobileMenuOpen(false)}>
            Про нас
          </a>
          <a href="#benefits" onClick={() => setIsMobileMenuOpen(false)}>
            Переваги
          </a>
          <a href="#apps" onClick={() => setIsMobileMenuOpen(false)}>
            Застосунки
          </a>
          <a href="#faq" onClick={() => setIsMobileMenuOpen(false)}>
            Часті запитання
          </a>
          <a href="#contacts" onClick={() => setIsMobileMenuOpen(false)}>
            Контакти
          </a>
        </nav>
      )}

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
            alt="Лелека — логотип месенджера"
            className="max-w-full h-auto object-contain"
          />
        </div>
      </section>

      <section className="bg-brand-50 border-y border-brand-50 py-10 px-6 md:px-12">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="space-y-1">
            <p className="text-3xl md:text-4xl font-black text-brand-800">
              100%
            </p>
            <p className="text-xs md:text-sm font-semibold text-brand-700">
              Безкоштовно назавжди
            </p>
          </div>
          <div className="space-y-1">
            <p className="text-3xl md:text-4xl font-black text-brand-800">
              0.03 сек
            </p>
            <p className="text-xs md:text-sm font-semibold text-brand-700">
              Миттєвий відгук
            </p>
          </div>
          <div className="space-y-1">
            <p className="text-3xl md:text-4xl font-black text-brand-800">0%</p>
            <p className="text-xs md:text-sm font-semibold text-brand-700">
              Реклами та спаму
            </p>
          </div>
          <div className="space-y-1">
            <p className="text-3xl md:text-4xl font-black text-brand-800">
              Lite режим
            </p>
            <p className="text-xs md:text-sm font-semibold text-brand-700">
              Для слабкого зв'язку
            </p>
          </div>
        </div>
      </section>

      <section id="about" className="mx-6 md:mx-auto my-16 max-w-7xl">
        <div className="bg-brand-50/80 border border-brand-50 rounded-3xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-10 shadow-sm">
          <div className="w-full md:w-2/3 space-y-5">
            <h2 className="text-3xl md:text-4xl font-extrabold flex items-center gap-3 text-brand-950">
              <img
                src="/icons/lapa1.png"
                alt=""
                className="w-8 h-8 object-contain"
                aria-hidden="true"
              />{' '}
              Про нас
            </h2>
            <p className="text-2xl font-bold leading-relaxed text-brand-950">
              Лелека — український месенджер для швидкого, безпечного та
              зручного спілкування.
            </p>
            <p className="text-brand-700 text-lg max-w-2xl">
              Створено з думкою про людей. Ми об'єднуємо сучасні технології
              шифрування та простий інтерфейс, щоб ви могли залишатися на
              зв'язку з найважливішими людьми.
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
          />{' '}
          Переваги
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4">
          {[
            {
              title: 'Зручність',
              desc: 'лайтовий інтерфейс',
              icon: '/icons/ui.png',
            },
            {
              title: 'Швидкість',
              desc: (
                <>
                  миттєве повідомлення
                  <br />
                  (0,03 сек)
                </>
              ),
              icon: '/icons/speed.png',
            },
            {
              title: 'Безпечність',
              desc: 'використовуємо HTTPS',
              icon: '/icons/lock.png',
            },
            {
              title: 'Кастомізація',
              desc: 'твій стиль – твої правила',
              icon: '/icons/custom.png',
            },
            {
              title: 'Приватна папка',
              desc: 'максимальна секретність',
              icon: '/icons/folder2.png',
            },
          ].map((item, idx) => (
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

      <section id="apps" className="px-6 md:px-12 py-12 max-w-7xl mx-auto">
        <div className="bg-white border border-brand-50 rounded-3xl p-8 md:p-12 shadow-sm flex flex-col lg:flex-row items-center justify-between gap-10">
          <div className="w-full lg:w-1/2 space-y-6">
            <h2 className="text-3xl md:text-4xl font-extrabold flex items-center gap-3 text-brand-950">
              <img
                src="/icons/lapa1.png"
                alt=""
                className="w-8 h-8 object-contain"
                aria-hidden="true"
              />{' '}
              Застосунки
            </h2>

            <p className="text-2xl font-bold leading-snug text-brand-950">
              Обирай зручний формат для свого пристрою
            </p>

            <p className="text-brand-700 text-base md:text-lg leading-relaxed">
              Створено для зручності людей. Лелека працює на смартфонах,
              планшетах і комп'ютерах, щоб ви не втрачали зв'язок ні на мить.
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
                  Версії для iOS та Android. Завжди у твочій кишені.
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
                  Версії для Windows, macOS та Linux для зручної роботи.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="faq" className="px-6 md:px-12 py-20 max-w-3xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-black text-center mb-12 text-brand-950">
          Часті запитання
        </h2>
        <div className="space-y-4">
          {faqItems.map((item, index) => {
            const isOpen = openFaq === index;
            return (
              <div
                key={index}
                onClick={() => toggleFaq(index)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) =>
                  (e.key === 'Enter' || e.key === ' ') && toggleFaq(index)
                }
                className="border border-brand-50 bg-white rounded-2xl overflow-hidden cursor-pointer shadow-sm hover:border-brand-800 hover:shadow-md transition-all duration-300"
              >
                <div className="p-6 flex justify-between items-center gap-4">
                  <h3 className="font-bold text-lg text-brand-950">{item.q}</h3>
                  <div
                    className={`w-11 h-11 shrink-0 rounded-full border border-brand-50 flex items-center justify-center text-lg font-bold shadow-sm transition-all duration-300 ${isOpen ? 'bg-brand-800 text-white rotate-180 border-brand-800' : 'bg-brand-50 text-brand-800 hover:bg-brand-50'}`}
                  >
                    ↓
                  </div>
                </div>
                <div
                  className={`grid transition-all duration-300 ease-in-out ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}
                >
                  <div className="overflow-hidden">
                    <p className="px-6 pb-6 text-brand-700 text-base leading-relaxed border-t border-app-bg-alt pt-4">
                      {item.a}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

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
            />{' '}
            Контакти
          </h2>
          <p className="text-xl font-bold max-w-md text-brand-950">
            Залишилися питання? Маєш ідею чи хочеш залишити відгук? — наша пошта
            завжди відкрита для тебе )
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
};

export default LandingPage;
