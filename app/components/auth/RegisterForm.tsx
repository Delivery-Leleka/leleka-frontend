import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router';
import { Turnstile } from '@marsidev/react-turnstile';
import axiosBackend from '~/api/axios';
import type { Register } from '~/types';
import {
  validateEmailDomain,
  validatePasswordDetailed,
  type ValidationError,
} from '~/constants/auth';
import { GreenWaves } from './GreenWaves';
import { PasswordInput } from './PasswordInput';
import { PopupNotification } from './PopupNotification';

export function RegisterForm() {
  const navigate = useNavigate();

  const [username, setUsername] = useState<Register['name']>('');
  const [email, setEmail] = useState<Register['email']>('');
  const [password, setPassword] = useState<Register['password']>('');
  const [confirm, setConfirm] = useState<Register['confirmedPass']>('');

  const [fieldPasswordError, setFieldPasswordError] = useState<ValidationError | null>(null);
  const [fieldConfirmError, setFieldConfirmError] = useState('');
  const [popupMessage, setPopupMessage] = useState<ValidationError | null>(null);

  const [submitting, setSubmitting] = useState(false);
  const [capthaOK, setCapthaOK] = useState(false);
  const [isEmailValid, setIsEmailValid] = useState(false);

  useEffect(() => {
    if (popupMessage?.icon === '/icons/sucess-icons8.png') {
      const timer = setTimeout(() => setPopupMessage(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [popupMessage]);

  const handlePasswordChange = (v: string) => {
    setPassword(v);
    const errObj = validatePasswordDetailed(v, capthaOK);
    setFieldPasswordError(errObj);

    if (confirm && v !== confirm) {
      setFieldConfirmError('Паролі не співпадають');
      setPopupMessage({ msg: 'Паролі не співпадають', icon: '/icons/error.png' });
    } else {
      setFieldConfirmError('');
      setPopupMessage(errObj);
    }
  };

  const handleConfirmChange = (v: string) => {
    setConfirm(v);
    if (password && v !== password) {
      setFieldConfirmError('Паролі не співпадають');
      setPopupMessage({ msg: 'Паролі не співпадають', icon: '/icons/error.png' });
    } else {
      setFieldConfirmError('');
      setPopupMessage(validatePasswordDetailed(password, capthaOK));
    }
  };

  const handleEmailChange = (v: string) => {
    setEmail(v);
    setIsEmailValid(validateEmailDomain(v));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitting) return;

    if (!validateEmailDomain(email)) {
      setPopupMessage({ msg: 'Некоректна або непідтримувана пошта', icon: '/icons/error.png' });
      return;
    }

    const pwdMsg = validatePasswordDetailed(password, capthaOK);
    const confMsg = password !== confirm ? 'Паролі не співпадають' : '';

    setFieldPasswordError(pwdMsg);
    setFieldConfirmError(confMsg);

    if (pwdMsg || confMsg) {
      setPopupMessage(pwdMsg || { msg: confMsg, icon: '/icons/error.png' });
      return;
    }

    setPopupMessage(null);
    setSubmitting(true);

    try {
      const res = await axiosBackend.post('/auth/register', { username, password, email });

      if (res.data?.success) {
        setPopupMessage({
          msg: 'Реєстрація успішна! Вітаємо в Поштову Лелеку!',
          icon: '/icons/sucess-icons8.png',
        });
        setTimeout(() => navigate('/onboarding'), 1500);
      } else if (res.data?.message === 'Користувач із таким логіном або email уже існує') {
        setPopupMessage({ msg: 'Аккаунт уже існує', icon: '/icons/error.png' });
        setTimeout(() => navigate('/login'), 2000);
      } else {
        setPopupMessage({
          msg: 'Помилка реєстрації! Повна помилка в консолі.',
          icon: '/icons/error.png',
        });
      }

      setUsername('');
      setEmail('');
      setPassword('');
      setConfirm('');
    } catch (err) {
      console.error(`Помилка: ${err}`);
      setPopupMessage({
        msg: 'Помилка зʼєднання з сервером! Повний лог в консолі.',
        icon: '/icons/error.png',
      });
    } finally {
      setSubmitting(false);
    }
  };

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
            Створити акаунт
          </h2>

          <div className="space-y-1">
            <label className="font-raleway font-bold text-brand-deep text-lg">Введіть ім'я</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              autoComplete="name"
              className="mt-1 border-2 border-brand-deep rounded-xl bg-white text-primary w-full h-11 px-4 transition-all duration-200 focus:outline-none"
            />
          </div>

          <div className="space-y-1">
            <label className="font-raleway font-bold text-brand-deep text-lg">Введіть пошту</label>
            <input
              type="email"
              value={email}
              onChange={(e) => handleEmailChange(e.target.value)}
              autoComplete="email"
              className="mt-1 border-2 border-brand-deep rounded-xl bg-white text-primary w-full h-11 px-4 transition-all duration-200 focus:outline-none"
            />
          </div>

          <div>
            <PasswordInput
              label="Введіть пароль"
              value={password}
              onChange={(e) => handlePasswordChange(e.target.value)}
              autoComplete="new-password"
              hasError={Boolean(fieldPasswordError)}
            />
            <p className="text-xs text-brand-700 mt-1 font-medium">
              Пароль повинен містити понад 8 символів, зокрема літери, цифри та спецсимволи
            </p>
          </div>

          <PasswordInput
            label="Введіть пароль ще раз"
            value={confirm}
            onChange={(e) => handleConfirmChange(e.target.value)}
            autoComplete="off"
            hasError={Boolean(fieldConfirmError)}
          />

          <div className="w-full flex justify-center py-2">
            <div className="w-full max-w-[320px] flex justify-center">
              <Turnstile
                siteKey="0x4AAAAAAB9zgN9DPpLoR9NG"
                onSuccess={() => setCapthaOK(true)}
                options={{ theme: 'light', size: 'flexible' }}
                style={{ transform: 'scale(0.85)', transformOrigin: 'top center' }}
              />
            </div>
          </div>

          <div className="pt-2 space-y-3">
            <div className="flex flex-wrap justify-between items-center gap-4">
              <button
                type="button"
                className="flex items-center justify-center border-2 border-brand-deep bg-brand-500 hover:bg-brand-600 text-brand-deep hover:text-white px-5 py-2.5 rounded-xl font-bold shadow-sm transition-all duration-200 active:scale-95 gap-3"
              >
                <span>Зареєструватися через Google</span>
                <img src="/icons/google.png" className="w-5 h-5" alt="Google" />
              </button>

              <button
                type="submit"
                disabled={submitting || !isEmailValid}
                className={`px-8 py-2.5 rounded-xl font-bold shadow-md transition-all duration-200 ${
                  submitting || !isEmailValid
                    ? 'bg-gray-400 text-white cursor-not-allowed'
                    : 'bg-brand-950 hover:bg-brand-deep text-white active:scale-95'
                }`}
              >
                {submitting ? 'Завантаження...' : 'Створити'}
              </button>
            </div>

            <div>
              <Link
                to="/login"
                className="inline-block font-semibold text-brand-deep opacity-90 hover:opacity-100 hover:scale-[1.02] transition-all"
              >
                Вже є акаунт?
              </Link>
            </div>
          </div>
        </div>
      </form>
    </>
  );
}