import { useState, useRef, type InputEvent, type ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout } from './layouts/layout';
import Waves from '../../public/icons/waves.png';
import Background from '../../public/bg.png';
import { CaseSensitive, CircleAlert, MoveHorizontal } from 'lucide-react';
import ErrorNotification from '~/components/misc/ErrorNotification';

export default function ProfilePage() {
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    email: '',
    about: '',
    avatar: '/icons/add-image.png',
  });
  const [formErrors, setFormErrors] = useState({
    username: '',
    email: '',
    other: '',
  });

  const fileInput = useRef<HTMLInputElement | null>(null);

  const navigate = useNavigate();

  const setInputValue = (name: string, value: string) => {
    setFormData((data) => ({
      ...data,
      [name]: value,
    }));
  };

  const setFieldError = (field: keyof typeof formErrors, message: string) => {
    setFormErrors((errors) => ({
      ...errors,
      [field]: message,
    }));
  };

  const clearFieldError = (field: keyof typeof formErrors) => {
    setFieldError(field, '');
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const target = e.target as HTMLInputElement | HTMLTextAreaElement;
    setInputValue(target.name, target.value);
  };

  const handlePhotoPick = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const imageUrl = URL.createObjectURL(file);
    setFormData((data) => ({
      ...data,
      avatar: imageUrl,
    }));
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
    setInputValue('email', v);

    if (!validateEmail(v)) {
      setFieldError('email', 'Некоректна або непідтримувана пошта');
    } else {
      clearFieldError('email');
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
    setInputValue('username', v);

    const local = validateNickname(v);
    if (local) {
      setFieldError('username', local);
      return;
    }

    const taken = await checkTaken(v);

    if (taken) {
      setFieldError('username', 'Цей нік вже використовується');
    } else {
      clearFieldError('username');
    }
  };

  const getErrorIcon = (msg: string) => {
    switch (msg) {
      case 'Можна використовувати лише латинські літери, цифри та _':
        return <CaseSensitive className="sm:w-6 sm:h-6" />;

      case 'Нікнейм занадто короткий':
        return <MoveHorizontal className="sm:w-6 sm:h-6" />;

      default:
        return <CircleAlert className="sm:w-6 sm:h-6" />;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const nickError = validateNickname(formData.username);
    if (nickError) {
      setFieldError('username', nickError);
      return;
    }

    const taken = await checkTaken(formData.username);
    if (taken) {
      setFieldError('username', 'Цей нік вже використовується');
      return;
    }

    const isEmailValid = validateEmail(formData.email);
    if (!isEmailValid) {
      setFieldError('email', 'Некоректна або непідтримувана пошта');
      return;
    }

    setFormErrors({ username: '', email: '', other: '' });

    try {
      console.log('SAVE PROFILE', formData);

      // МИРОСЛАВ запит на бек :)
    } catch (err) {
      setFieldError('other', 'Виникла помилка під час збереження');
    }
  };

  const formStyle = {
    backgroundImage: `url(${Waves})`,
  };

  const bgStyle = {
    backgroundImage: `url(${Background})`,
  };

  const visibleError =
    formErrors.username || formErrors.email || formErrors.other;

  return (
    <Layout
      title="Профіль"
      onNavigateContacts={() => navigate('/contacts')}
      style={bgStyle}
    >
      {visibleError && (
        <ErrorNotification>
          <span className="font-medium">{visibleError}</span>
          {getErrorIcon(visibleError)}
        </ErrorNotification>
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
              <div className="flex gap-4 justify-between items-center w-full">
                <div
                  className="w-32 h-32 sm:w-60 sm:h-60 rounded-full bg-[#E5E5E5] flex items-center justify-center cursor-pointer relative group overflow-hidden"
                  onClick={() => fileInput.current?.click()}
                >
                  <img
                    src={formData.avatar}
                    className="w-full h-full object-cover rounded-full transition-all duration-200 sm:group-hover:brightness-60"
                    alt="avatar"
                  />
                  <div className="absolute inset-0 bg-transparent text-black text-sm sm:text-base font-semibold hidden md:group-hover:block transition-opacity duration-200">
                    <div className="-bottom-3/5 relative text-center">
                      <button className="bg-[#f2efe6] py-0.5 rounded w-1/2">
                        Змінити
                      </button>
                      <p className="text-xs text-[#F2EFE6] mt-1 font-normal">
                        (Не більше 1 МБ)
                      </p>
                    </div>
                  </div>
                </div>

                <div 
                onClick={() => fileInput.current?.click()} 
                className="md:hidden -bottom-3/5 text-black relative text-center">
                  <button className="bg-white shadow-md py-0.5 rounded px-4">
                    Змінити
                  </button>
                  <p className="text-xs font-normal">(Не більше 1 МБ)</p>
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
                <label htmlFor="name" className="font-semibold text-[#16321F]">
                  Імʼя
                </label>
                <input
                  className="w-full h-9 border-gray-500 rounded-md px-2 sm:px-3 mt-1 transition-all duration-300
                 bg-white text-black focus:scale-[1.02]"
                  name="name"
                  onChange={handleChange}
                  value={formData.name}
                />
              </div>

              <div className="space-y-2">
                <label className="font-semibold text-[#16321F]">
                  Ім'я користувача
                </label>

                <input
                  name="username"
                  value={formData.username}
                  onChange={(e) => handleNickname(e.target.value)}
                  className={`
                     rounded-md w-full h-9 px-3 transition-all duration-300 bg-white focus:scale-[1.02] text-black
                    ${
                      formErrors.username
                        ? 'bg-red-200 border-red-500 animate-shake'
                        : 'bg-white border-[--input-border-color] text-primary '
                    }
                    `}
                />
              </div>

              <div>
                <label htmlFor="email" className="font-semibold text-[#16321F]">
                  Пошта
                </label>
                <input
                  name="email"
                  value={formData.email}
                  onChange={(e) => handleEmailChange(e.target.value)}
                  className={`
                    rounded-md w-full h-9 px-3 transition-all duration-300 bg-white text-black
                    ${
                      formErrors.email
                        ? 'bg-red-200 border-red-500 animate-shake'
                        : 'border-gray-500 focus:scale-[1.02]'
                    }
                  `}
                />
              </div>

              <div className="relative flex flex-col h-full">
                <label htmlFor="about" className="font-semibold text-[#16321F]">
                  Про себе
                </label>
                <textarea
                  name="about"
                  maxLength={70}
                  value={formData.about}
                  onChange={handleChange}
                  className="w-full h-24 focus:scale-[1.02] transition-all border-gray-500 rounded-md px-2 sm:px-3 py-2 mt-1 resize-none bg-white text-black"
                />
                <span className="absolute bottom-2 right-3 text-[10px] text-gray-600 pointer-events-none">
                  {70 - formData.about.length} символів
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
  );
}
