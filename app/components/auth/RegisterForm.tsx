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
import { GreenWaves } from '../general/GreenWaves';

export function RegisterForm() {
  const navigate = useNavigate();

  const [username, setUsername] = useState<Register['name']>('');
  const [email, setEmail] = useState<Register['email']>('');
  const [password, setPassword] = useState<Register['password']>('');
  const [confirm, setConfirm] = useState<Register['confirmedPass']>('');

  const [fieldPasswordError, setFieldPasswordError] =
    useState<ValidationError | null>(null);
  const [fieldConfirmError, setFieldConfirmError] = useState('');
  const [popupMessage, setPopupMessage] = useState<ValidationError | null>(
    null
  );

  const [submitting, setSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
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
      setPopupMessage({
        msg: 'Паролі не співпадають',
        icon: '/icons/error.png',
      });
    } else {
      setFieldConfirmError('');
      setPopupMessage(errObj);
    }
  };

  const handleConfirmChange = (v: string) => {
    setConfirm(v);
    if (password && v !== password) {
      setFieldConfirmError('Паролі не співпадають');
      setPopupMessage({
        msg: 'Паролі не співпадають',
        icon: '/icons/error.png',
      });
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
      setPopupMessage({
        msg: 'Некоректна або непідтримувана пошта',
        icon: '/icons/error.png',
      });
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
      const res = await axiosBackend.post('/auth/register', {
        username,
        password,
        email,
      });

      if (res.data?.success) {
        setPopupMessage({
          msg: 'Реєстрація успішна! Вітаємо в Поштову Лелеку!',
          icon: '/icons/sucess-icons8.png',
        });
        setTimeout(() => navigate('/onboarding'), 1500);
      } else if (
        res.data?.message === 'Користувач із таким логіном або email уже існує'
      ) {
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
      {popupMessage && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 px-6 py-3 rounded-lg shadow-md flex items-center gap-3 z-50 animate-slideDown bg-red-300 border border-gray-300">
          <img src={popupMessage.icon} alt="!" className="w-5 h-5" />
          <span className="font-medium text-[#262424]">{popupMessage.msg}</span>
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="relative overflow-hidden bg-[var(--color-brand-50)] rounded-2xl w-[95%] md:w-[85%] lg:w-[850px] shadow-xl animate-fadeIn pb-4"
      >
        <GreenWaves className="z-0" />

        <div className="relative z-10 p-8 space-y-5 w-full">
          <h2 className="font-raleway font-bold text-3xl text-[var(--color-brand-deep)] text-center mb-6">
            Створити акаунт
          </h2>

          <div className="space-y-1">
            <label className="font-raleway font-bold text-[var(--color-brand-deep)] text-lg">
              Введіть ім'я
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              autoComplete="name"
              className="mt-1 border-2 border-[var(--color-brand-deep)] rounded-xl bg-white text-[var(--text-color-primary)] w-full h-11 px-4 transition-all duration-200 focus:outline-none"
            />
          </div>

          <div className="space-y-1">
            <label className="font-raleway font-bold text-[var(--color-brand-deep)] text-lg">
              Введіть пошту
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => handleEmailChange(e.target.value)}
              autoComplete="email"
              className="mt-1 border-2 border-[var(--color-brand-deep)] rounded-xl bg-white text-[var(--text-color-primary)] w-full h-11 px-4 transition-all duration-200 focus:outline-none"
            />
          </div>

          <div className="space-y-1">
            <label className="font-raleway font-bold text-[var(--color-brand-deep)] text-lg">
              Введіть пароль
            </label>
            <div className="relative mt-1">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => handlePasswordChange(e.target.value)}
                autoComplete="new-password"
                className={`w-full h-11 px-4 pr-12 rounded-xl transition duration-200 focus:outline-none border-2 appearance-none ${
                  fieldPasswordError
                    ? 'bg-red-100 border-red-500'
                    : 'bg-white border-[var(--color-brand-deep)] text-[var(--text-color-primary)]'
                }`}
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center justify-center focus:outline-none"
              >
                <img
                  src={
                    showPassword
                      ? '/icons/Preview-close.png'
                      : '/icons/Preview-open.png'
                  }
                  alt="toggle password"
                  className="w-5 h-5 select-none opacity-70 hover:opacity-100"
                />
              </button>
            </div>
            <p className="text-xs text-[var(--color-brand-700)] mt-1 font-medium">
              Пароль повинен містити понад 8 символів, зокрема літери, цифри та
              спецсимволи
            </p>
          </div>

          <div className="space-y-1">
            <label className="font-raleway font-bold text-[var(--color-brand-deep)] text-lg">
              Введіть пароль ще раз
            </label>
            <div className="relative mt-1">
              <input
                type={showConfirm ? 'text' : 'password'}
                value={confirm}
                onChange={(e) => handleConfirmChange(e.target.value)}
                autoComplete="off"
                className={`w-full h-11 px-4 pr-12 rounded-xl transition duration-200 focus:outline-none border-2 appearance-none ${
                  fieldConfirmError
                    ? 'bg-red-100 border-red-500'
                    : 'bg-white border-[var(--color-brand-deep)] text-[var(--text-color-primary)]'
                }`}
              />
              <button
                type="button"
                onClick={() => setShowConfirm((prev) => !prev)}
                className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center justify-center focus:outline-none"
              >
                <img
                  src={
                    showConfirm
                      ? '/icons/Preview-close.png'
                      : '/icons/Preview-open.png'
                  }
                  alt="toggle confirm password"
                  className="w-5 h-5 select-none opacity-70 hover:opacity-100"
                />
              </button>
            </div>
          </div>

          <div className="w-full flex justify-center py-2">
            <div className="w-full max-w-[320px] flex justify-center">
              <Turnstile
                siteKey="0x4AAAAAAB9zgN9DPpLoR9NG"
                onSuccess={() => setCapthaOK(true)}
                options={{ theme: 'light', size: 'flexible' }}
                style={{
                  transform: 'scale(0.85)',
                  transformOrigin: 'top center',
                }}
              />
            </div>
          </div>

          <div className="pt-2 space-y-3">
            <div className="flex flex-wrap justify-between items-center gap-4">
              <button
                type="button"
                className="flex items-center justify-center border-2 border-[var(--color-brand-deep)] bg-[var(--color-brand-500)] hover:bg-[var(--color-brand-600)] text-[var(--color-brand-deep)] hover:text-white px-5 py-2.5 rounded-xl font-bold shadow-sm transition-all duration-200 active:scale-95 gap-3"
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
                    : 'bg-[var(--color-brand-950)] hover:bg-[var(--color-brand-deep)] text-white active:scale-95'
                }`}
              >
                {submitting ? 'Завантаження...' : 'Створити'}
              </button>
            </div>

            <div>
              <Link
                to="/login"
                className="inline-block font-semibold text-[var(--color-brand-deep)] opacity-90 hover:opacity-100 hover:scale-[1.02] transition-all"
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
