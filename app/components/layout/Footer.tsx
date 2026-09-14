import { useNavigate } from 'react-router';

const Footer = () => {
  const navigate = useNavigate();
  return (
    <footer className="border-t border-brand-50 bg-brand-50 px-6 md:px-12 py-8 flex flex-col md:flex-row justify-between items-center gap-6">
      <div
        className="w-[150px] h-[40px] bg-contain bg-no-repeat bg-center cursor-pointer"
        style={{ backgroundImage: 'url("/icons/LOGO.png")' }}
        onClick={() => navigate('/')}
        aria-hidden="true"
      />
      <nav className="flex flex-wrap justify-center gap-6 font-semibold text-brand-700 text-sm">
        <a href="/#about" className="hover:text-brand-950 transition-colors">
          Про нас
        </a>
        <a href="/#benefits" className="hover:text-brand-950 transition-colors">
          Переваги
        </a>
        <a href="/#apps" className="hover:text-brand-950 transition-colors">
          Застосунки
        </a>
        <a href="/#faq" className="hover:text-brand-950 transition-colors">
          Часті запитання
        </a>
        <a href="/#contacts" className="hover:text-brand-950 transition-colors">
          Контакти
        </a>
      </nav>
    </footer>
  );
};

export default Footer;
