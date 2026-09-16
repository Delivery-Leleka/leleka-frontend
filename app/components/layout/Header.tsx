import { Globe, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router';

const Header = () => {
  const navigate = useNavigate();
  const [currentLang, setCurrentLang] = useState<'UA' | 'EN'>('UA');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);

  const toggleLanguage = () => {
    setCurrentLang((prev) => (prev === 'UA' ? 'EN' : 'UA'));
  };

  return (
    <>
      <header className="sticky top-0 z-50 bg-app-bg-alt/90 backdrop-blur-md border-b border-brand-50 px-4 md:px-12 py-2.5 md:py-4 flex items-center justify-between transition-all">
        <div className="flex items-center gap-2">
          <button
            type="button"
            aria-label="На головну"
            className="w-[120px] md:w-[160px] h-[32px] md:h-[45px] bg-contain bg-no-repeat bg-left transition-transform hover:scale-105 cursor-pointer border-none bg-transparent"
            style={{ backgroundImage: 'url("/icons/LOGO.png")' }}
            onClick={() => navigate('/')}
          />
        </div>

        <nav className="hidden md:flex gap-8 font-medium text-brand-700 text-sm tracking-wide">
          <a href="/#about" className="hover:text-brand-950 transition-colors">
            Про нас
          </a>
          <a
            href="/#benefits"
            className="hover:text-brand-950 transition-colors"
          >
            Переваги
          </a>
          <a href="/#apps" className="hover:text-brand-950 transition-colors">
            Застосунки
          </a>
          <a href="/#faq" className="hover:text-brand-950 transition-colors">
            Часті запитання
          </a>
          <a
            href="/#contacts"
            className="hover:text-brand-950 transition-colors"
          >
            Контакти
          </a>
        </nav>

        <div className="flex items-center gap-2 md:gap-3">
          <button
            type="button"
            onClick={toggleLanguage}
            className="flex items-center gap-1.5 px-2.5 py-1 md:py-1.5 rounded-lg border border-brand-100 bg-white/80 hover:bg-white text-brand-800 text-xs md:text-sm font-semibold transition-all shadow-xs cursor-pointer active:scale-95"
            aria-label="Змінити мову"
          >
            <Globe className="w-4 h-4" />
            <span className="tracking-wide">{currentLang}</span>
          </button>

          <button
            type="button"
            onClick={() => navigate('/register')}
            className="bg-brand-800 text-white px-3.5 md:px-5 py-1.5 md:py-2.5 rounded-lg md:rounded-xl text-xs md:text-sm font-bold hover:bg-brand-900 shadow-sm hover:shadow-md transition-all active:scale-95 cursor-pointer"
          >
            Створити акаунт
          </button>

          <button
            type="button"
            aria-label="Переключити меню"
            onClick={() => setIsMobileMenuOpen((prev) => !prev)}
            className="md:hidden p-1.5 text-brand-800 cursor-pointer rounded-lg hover:bg-brand-50"
          >
            {isMobileMenuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>
      </header>

      {isMobileMenuOpen && (
        <nav className="md:hidden bg-app-bg-alt border-b border-brand-50 px-6 py-4 flex flex-col gap-4 text-center font-medium text-brand-700">
          <a href="/#about" onClick={() => setIsMobileMenuOpen(false)}>
            Про нас
          </a>
          <a href="/#benefits" onClick={() => setIsMobileMenuOpen(false)}>
            Переваги
          </a>
          <a href="/#apps" onClick={() => setIsMobileMenuOpen(false)}>
            Застосунки
          </a>
          <a href="/#faq" onClick={() => setIsMobileMenuOpen(false)}>
            Часті запитання
          </a>
          <a href="/#contacts" onClick={() => setIsMobileMenuOpen(false)}>
            Контакти
          </a>
        </nav>
      )}
    </>
  );
};

export default Header;
