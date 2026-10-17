import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout } from './layouts/layout';
import Waves from '../../public/icons/waves.png';
import Background from '../../public/bg.png';
import { CaseSensitive, CircleAlert, MoveHorizontal } from 'lucide-react';

export default function ProfilePage() {
  const [about, setAbout] = useState('');
  const [photo, setPhoto] = useState('/icons/add-image.png');
  const [menuOpen, setMenuOpen] = useState(false);
  const [nickname, setNickname] = useState('');
  const [error, setError] = useState('');
  const [logoutModal, setLogoutModal] = useState(false);
  const [email, setEmail] = useState('');

  const fileInput = useRef<HTMLInputElement | null>(null);
  const navigate = useNavigate();

  const handlePhotoPick = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const imageUrl = URL.createObjectURL(file);
    setPhoto(imageUrl);
  };

  const goTo = (path: string) => {
    navigate(path);
    setMenuOpen(false);
  };

  const allowedDomains = [
    'gmail.com',
    'ukr.net',
    'i.ua',
    'meta.ua',
    'icloud.com',
    'outlook.com',
    'hotmail.com',
    'yahoo.com',
    'proton.me',
  ];

  const validateEmail = (email: string) => {
    if (!email) return false;

    // без пробілів
    if (/\s/.test(email)) return false;

    const parts = email.split('@');
    if (parts.length !== 2) return false;

    const [local, domain] = parts;

    if (!local || local.length < 2) return false;

    return allowedDomains.includes(domain.toLowerCase());
  };

  const handleEmailChange = (v: string) => {
    setEmail(v);

    if (!validateEmail(v)) {
      setError('Некоректна або непідтримувана пошта');
    } else {
      setError('');
    }
  };

  const validateNickname = (v: string) => {
    const regex = /^[A-Za-z0-9_]+$/;

    if (!v) return 'Поле не може бути порожнім';

    if (!regex.test(v))
      return 'Можна використовувати лише латинські літери, цифри та _';

    if (v.length < 3) return 'Нікнейм занадто короткий';

    return '';
  };

  const checkTaken = async (v: string) => {
    const taken = ['delured', 'admin', 'mod']; //МИРОСЛАВ ЗАМІНИШ НА ЗАПИТ

    return taken.includes(v.toLowerCase());
  };

  const handleNickname = async (v: string) => {
    setNickname(v);

    const local = validateNickname(v);
    if (local) {
      setError(local);
      return;
    }

    const taken = await checkTaken(v);

    if (taken) {
      setError('Цей нік вже використовується');
    } else {
      setError('');
    }
  };

  const getErrorIcon = (msg: string) => {
    switch (msg) {
      case 'Можна використовувати лише латинські літери, цифри та _':
        return <CaseSensitive className='sm:w-6 sm:h-6'/>

      case 'Нікнейм занадто короткий':
        return <MoveHorizontal className='sm:w-6 sm:h-6'/>;

      default:
        return <CircleAlert className='sm:w-6 sm:h-6'/>;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const nickError = validateNickname(nickname);
    if (nickError) {
      setError(nickError);
      return;
    }

    const taken = await checkTaken(nickname);
    if (taken) {
      setError('Цей нік вже використовується');
      return;
    }

    if (!validateEmail(email)) {
      setError('Некоректна або непідтримувана пошта');
      return;
    }

    setError('');

    try {
      console.log('SAVE PROFILE', {
        nickname,
        email,
        about,
      });

      // МИРОСЛАВ запит на бек :)
    } catch (err) {
      setError('Помилка збереження');
    }
  };

  const formStyle = {
    backgroundImage: `url(${Waves})`,
  };

  const bgStyle = {
    backgroundImage: `url(${Background})`,
  };

  return <Layout
          title="Профіль"
          onNavigateContacts={() => navigate('/contacts')}
          style={bgStyle}
        >
          {error && (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 bg-[#C23424] text-white px-6 py-3 rounded-lg shadow-md flex items-center
         justify-between w-[90%] sm:w-2/5 z-50 animate-slideDown">
          <span className="font-medium">{error}</span>
          {getErrorIcon(error)}
        </div>
      )}

      <main className="flex justify-center items-start py-12 sm:py-16 px-4 w-full">
        <form
          onSubmit={handleSubmit}
          style={formStyle}
          className="w-full bg-brand-50 max-w-[900px] bg-no-repeat bg-bottom rounded-xl p-6 sm:p-10 relative overflow-hidden"
        >
          <h2 className="text-xl sm:text-2xl font-bold text-center mb-6 sm:mb-8 text-[#16321F]">
            Профіль
          </h2>

          <div className="flex flex-col md:flex-row gap-6 md:gap-10 relative z-10">
            <div className="flex relative sm:-top-20 items-center gap-4 justify-center md:justify-start">
              <div className='flex gap-4 justify-between items-center w-full'>
                <div
                  className="w-32 h-32 sm:w-60 sm:h-60 rounded-full bg-[#E5E5E5] flex items-center justify-center cursor-pointer relative group overflow-hidden"
                  onClick={() => fileInput.current?.click()}
                >
                  <img
                    src={photo}
                    className="w-full h-full object-cover rounded-full transition-all duration-200 sm:group-hover:brightness-60"
                    alt="avatar"
                  />
                  <div className="absolute inset-0 bg-transparent text-black text-sm sm:text-base font-semibold hidden md:group-hover:block transition-opacity duration-200">
                    <div className='-bottom-3/5 relative text-center'>
                      <button className='bg-[#f2efe6] py-0.5 rounded w-1/2'>Змінити</button>
                      <p className="text-xs text-[#F2EFE6] mt-1 font-normal">
                        (Не більше 1 МБ)
                      </p>
                    </div>
                  </div>
                </div>

                <div className='md:hidden -bottom-3/5 text-black relative text-center'>
                  <button className='bg-white shadow-md py-0.5 rounded px-4'>Змінити</button>
                  <p className="text-xs font-normal">
                    (Не більше 1 МБ)
                  </p>
                </div>
              </div>

              <input
                type="file"
                accept="image/*"
                ref={fileInput}
                className="hidden"
                onChange={handlePhotoPick}
              />
            </div>

            <div className="flex flex-col flex-1 gap-4 sm:gap-5">
              <div>
                <label className="font-semibold text-[#16321F]">Імʼя</label>
                <input className="w-full h-9 border-gray-500 rounded-md px-2 sm:px-3 mt-1 transition-all duration-300
                 bg-white text-black focus:scale-[1.02]" />
              </div>

              <div className="space-y-2">
                <label className="font-semibold text-[#16321F]">Ім'я користувача</label>

                <input
                  value={nickname}
                  onChange={(e) => handleNickname(e.target.value)}
                  className={`
                     rounded-md w-full h-9 px-3 transition-all duration-300 bg-white focus:scale-[1.02] text-black
                    ${
                      error &&
                      [
                        'Можна використовувати лише латинські літери, цифри та _',
                        'Цей нік вже використовується',
                        'Нікнейм занадто короткий',
                        'Поле не може бути порожнім',
                      ].includes(error)
                        ? 'bg-red-200 border-red-500 animate-shake'
                        : 'bg-white border-[--input-border-color] text-primary '
                    }
                    `}
                />
              </div>

              <div>
                <label className="font-semibold text-[#16321F]">Пошта</label>
                <input
                  value={email}
                  onChange={(e) => handleEmailChange(e.target.value)}
                  className={`
                    rounded-md w-full h-9 px-3 transition-all duration-300 bg-white text-black
                    ${
                      error === 'Некоректна або непідтримувана пошта'
                        ? 'bg-red-200 border-red-500 animate-shake'
                        : 'border-gray-500 focus:scale-[1.02]'
                    }
                  `}
                />
              </div>

              <div className="relative flex flex-col h-full">
                <label className="font-semibold text-[#16321F]">Про себе</label>
                <textarea
                  maxLength={70}
                  value={about}
                  onChange={(e) => setAbout(e.target.value)}
                  className="w-full h-24 focus:scale-[1.02] transition-all border-gray-500 rounded-md px-2 sm:px-3 py-2 mt-1 resize-none bg-white text-black"
                />
                <span className="absolute bottom-2 right-3 text-[10px] text-gray-600 pointer-events-none">
                  {70 - about.length} символів
                </span>
              </div>
              <button
                type="submit"
                className="self-end mt-6 px-6 py-2 cursor-pointer bg-[#4b6b3d] hover:bg-[#3d5832] text-white font-semibold rounded-md transition-all duration-200 active:scale-95"
              >
                Зберегти
              </button>
            </div>
          </div>
        </form>
      </main>
        </Layout>
    
}
