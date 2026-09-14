import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router';
import axiosBackend from '~/api/axios';
import { setUser } from '~/api/userFuncs';
import type { ValidationError } from '~/constants/auth';
import { GreenWaves } from './GreenWaves';
import { PasswordInput } from './PasswordInput';
import { PopupNotification } from './PopupNotification';

export function LoginForm() {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [popupMessage, setPopupMessage] = useState<ValidationError | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  /* ---------------- INPUT HANDLERS ---------------- */
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    if (process.env.NODE_ENV === 'development') {
      console.log(`DL [DEV_DEBUG]: Email - ${e.target.value}`);
    }
  };

  const handlePassChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPass(e.target.value);
    if (process.env.NODE_ENV === 'development') {
      console.log(`DL [DEV_DEBUG]: Password - ${e.target.value}`);
    }
  };

  /* ---------------- SUBMIT ---------------- */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitting) return;

    setPopupMessage(null);
    setSubmitting(true);

    try {
      const res = await axiosBackend.post('/auth/login', { email, pass });
      const data = res.data;

      if (process.env.NODE_ENV === 'development') {
        console.log(data);
      }

      if (data.success) {
        if (data.two_factor_status) {
          // TODO: 2FA handling
        } else {
          setUser(data.user);
          setPopupMessage({
            msg: 'Успішний вхід! Ласкаво просимо!',
            icon: '/icons/sucess-icons8.png',
          });
          setTimeout(() => navigate('/'), 1500);
        }
      }
    } catch (err: any) {
      console.error(err);
      const msg = err?.response?.data?.message;
      let errorText = 'Помилка входу';

      switch (msg) {
        case 'wrong-email':
          errorText = 'Неправильна пошта';
          break;
        case 'wrong-password':
          errorText = 'Неправильний пароль';
          break;
        case 'attempts-left':
          errorText = 'Залишилось 2 спроби';
          break;
        case 'limit-exceeded':
          errorText = 'Ліміт спроб вичерпано, спробуйте через 10 хвилин';
          break;
      }

      setPopupMessage({
        msg: errorText,
        icon: '/icons/error.png',
      });
    } finally {
      setSubmitting(false);
    }
  };

  /* ---------------- AUTO-HIDE POPUP ---------------- */
  useEffect(() => {
    if (!popupMessage) return;

    const hideDelay = popupMessage.icon === '/icons/sucess-icons8.png' ? 5000 : 3000;
    const timer = setTimeout(() => setPopupMessage(null), hideDelay);

    return () => clearTimeout(timer);
  }, [popupMessage]);

  const isPasswordError = [
    'Неправильний пароль',
    'Залишилось 2 спроби',
    'Ліміт спроб вичерпано, спробуйте через 10 хвилин',
  ].includes(popupMessage?.msg || '');

  return (
    <>
      <PopupNotification message={popupMessage} />

      <form
        onSubmit={handleSubmit}
        className="relative overflow-hidden bg-brand-50 rounded-2xl w-[95%] md:w-[85%] lg:w-[850px] shadow-xl animate-fadeIn pb-4"
      >
        <GreenWaves className="z-0" />

        <div className="relative z-10 p-8 space-y-5 w-full">
          <h2 className="font-raleway font-bold text-3xl text-brand-deep text-center mb-6">
            Увійти в акаунт
          </h2>

          <div className="space-y-1">
            <label className="font-raleway font-bold text-brand-deep text-lg">
              Введіть пошту
            </label>
            <input
              type="text"
              value={email}
              onChange={handleEmailChange}
              autoComplete="email"
              className={`mt-1 border-2 rounded-xl text-primary w-full h-11 px-4 transition-all duration-200 focus:outline-none ${
                popupMessage?.msg === 'Неправильна пошта'
                  ? 'bg-white border-red-500 animate-shake'
                  : 'bg-white border-brand-deep'
              }`}
            />
          </div>

          <div className="space-y-1">
            <PasswordInput
              label="Введіть пароль"
              value={pass}
              onChange={handlePassChange}
              autoComplete="current-password"
              hasError={isPasswordError}
              className={isPasswordError ? 'animate-shake' : ''}
            />
            <div className="pt-1">
              <Link
                to="/passRecover"
                className="inline-block text-sm font-semibold text-brand-deep opacity-90 hover:opacity-100 underline transition-all"
              >
                Забули пароль?
              </Link>
            </div>
          </div>

          <div className="pt-2 space-y-3">
            <div className="flex flex-wrap justify-between items-center gap-4">
              <button
                type="button"
                className="flex items-center justify-center border-2 border-brand-deep bg-brand-500 hover:bg-brand-600 text-brand-deep hover:text-white px-5 py-2.5 rounded-xl font-bold shadow-sm transition-all duration-200 active:scale-95 gap-3"
              >
                <span>Увійти через Google</span>
                <img src="/icons/google.png" className="w-5 h-5" alt="Google" />
              </button>

              <button
                type="submit"
                disabled={submitting}
                className="px-8 py-2.5 rounded-xl font-bold shadow-md transition-all duration-200 bg-brand-950 hover:bg-brand-deep text-white active:scale-95 disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                {submitting ? 'Завантаження...' : 'Увійти'}
              </button>
            </div>

            <div>
              <Link
                to="/register"
                className="inline-block font-semibold text-brand-deep opacity-90 hover:opacity-100 hover:scale-[1.02] transition-all"
              >
                Не маєте акаунта?
              </Link>
            </div>
          </div>
        </div>
      </form>
    </>
  );
}