import React, { useEffect, useMemo, useState } from "react";
import type { Register } from "../types";
import axiosBackend from "~/api/axios";
import { Turnstile } from "@marsidev/react-turnstile";
import { useNavigate } from "react-router";

export default function RegisterPage() {
  const [username, setUsername] = useState<Register["name"]>("");
  const [email, setEmail] = useState<Register["email"]>("");
  const [password, setPassword] = useState<Register["password"]>("");
  const [confirm, setConfirm] = useState<Register["confirmedPass"]>("");
  const navigate = useNavigate();

  const [fieldPasswordError, setFieldPasswordError] = useState<{ msg: string; icon: string } | null>(null);
  const [fieldConfirmError, setFieldConfirmError] = useState("");
  const [popupMessage, setPopupMessage] = useState<{ msg: string; icon: string } | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [capthaOK, setCapthaOK] = useState(false);
  const [isEmailValid, setIsEmailValid] = useState(false);


  const validatePasswordDetailed = (v: string) => {
    if (!v) return null;
    if (/\s/.test(v) || /[%=+\\/]/.test(v))
      return { msg: "Один із символів не є доступним", icon: "/icons/Vector.png" };
    if (/[^\u0000-\u007F]/.test(v))
      return { msg: "Пароль має містити латинські літери", icon: "/icons/Auto-line-height.png" };
    const allowed = /^[A-Za-z0-9!@#$^&*()_\-{}\[\]|:;"'<>,.?~]+$/;
    if (!allowed.test(v)) return { msg: "Використовуйте лише латинські літери", icon: "/icons/Auto-line-height.png" };
    if (v.length < 8) return { msg: "Занадто короткий пароль", icon: "/icons/Auto-width.png" };
    if (!/[A-Za-z]/.test(v)) return { msg: "Пароль має містити латинські літери", icon: "/icons/Auto-line-height.png" };
    if (!/[0-9!@#$^&*()_\-{}\[\]|:;"'<>,.?~]/.test(v))
      return { msg: "Додайте цифри та/або спец. символи", icon: "/icons/Plus-cross.png" };
    if (/^[A-Za-z0-9]+$/.test(v)) return { msg: "Додайте цифри та/або спец. символи", icon: "/icons/error2.png" };
    if (!capthaOK && process.env.NODE_ENV !== "development")
      return { msg: "Будь ласка, підтвердіть, що ви не робот", icon: "/icons/error2.png" };
    return null;
  };

  const handlePasswordChange = (v: string) => {
    setPassword(v);
    const obj = validatePasswordDetailed(v);
    setFieldPasswordError(obj);

    if (confirm && v !== confirm) {
      setFieldConfirmError("Паролі не співпадають");
      setPopupMessage({ msg: "Паролі не співпадають", icon: "/icons/error.png" });
    } else {
      setFieldConfirmError("");
      setPopupMessage(obj);
    }
  };

  const handleConfirmChange = (v: string) => {
    setConfirm(v);
    if (password && v !== password) {
      setFieldConfirmError("Паролі не співпадають");
      setPopupMessage({ msg: "Паролі не співпадають", icon: "/icons/error.png" });
    } else {
      setFieldConfirmError("");
      setPopupMessage(validatePasswordDetailed(password));
    }
  };
  const allowedDomains = [
    "gmail.com",
    "ukr.net",
    "i.ua",
    "meta.ua",
    "icloud.com",
    "outlook.com",
    "hotmail.com",
    "yahoo.com",
    "proton.me",
  ];

  const validateEmailDomain = (email: string) => {
    const domain = email.split("@")[1]?.toLowerCase();
    return allowedDomains.includes(domain);
  };

  const handleEmailChange = (v: string) => {
    setEmail(v);
    setIsEmailValid(validateEmailDomain(v));
  };
  useEffect(() => {
    if (popupMessage?.icon === "/icons/sucess-icons8.png") {
      const t = setTimeout(() => setPopupMessage(null), 5000);
      return () => clearTimeout(t);
    }
  }, [popupMessage]);

  const handleSubmit = async (e: React.FormEvent) => {
    if (!validateEmailDomain(email)) {
      setPopupMessage({ msg: "Некоректна або непідтримувана пошта", icon: "/icons/error.png" });
      return;
    }

    e.preventDefault();
    if (submitting) return;

    const pwdMsg = validatePasswordDetailed(password);
    const confMsg = password !== confirm ? "Паролі не співпадають" : "";

    setFieldPasswordError(pwdMsg);
    setFieldConfirmError(confMsg);

    if (pwdMsg || confMsg) {
      setPopupMessage(pwdMsg || { msg: confMsg, icon: "/icons/error.png" });
      return;
    }

    setPopupMessage(null);
    setSubmitting(true);

    try {
      const res = await axiosBackend.post("/auth/register", JSON.stringify({ username, password, email }));
      const resJson = await res.data;

      if (resJson.success) {
        setPopupMessage({ msg: "Реєстрація успішна! Вітаємо в Поштову Лелеку!", icon: "/icons/sucess-icons8.png" });
      } else if (resJson.message === "Користувач із таким логіном або email уже існує") {
        setPopupMessage({ msg: "Аккаунт уже існує", icon: "/icons/error.png" });
        setTimeout(() => navigate("/login"), 2000);
      } else {
        console.error(`Помилка: ${resJson.message}`);
        setPopupMessage({ msg: "Помилка реєстрації! Повна помилка в консолі.", icon: "/icons/error.png" });
      }

      setUsername(""); setEmail(""); setPassword(""); setConfirm("");
    } catch (err) {
      console.error(`Помилка: ${err}`);
      setPopupMessage({ msg: "Помилка зʼєдання з сервером! Повний лог в консолі.", icon: "/icons/error.png" });
    } finally {
      setSubmitting(false);
    }
  };

  const handlerSetCapthaOK = () => setCapthaOK(true);

  return (
    <div className="min-h-screen flex flex-col justify-between items-center font-sans bg-green-50 md:bg-[url('/icons/bg-desktop.png')] bg-[url('/icons/bg-mobile.png')] bg-cover bg-center bg-no-repeat">
      <header className="w-full bg-primary text-primary text-center md:h-16 sm:h-14 font-title text-3xl flex items-center justify-center">
        <h1>Поштовий Лелека</h1>
      </header>

      {popupMessage && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 px-6 py-3 rounded-lg shadow-md flex items-center gap-3 z-50 animate-slideDown bg-red-300 border border-gray-300">
          <img src={popupMessage.icon} alt="!" className="w-5 h-5" />
          <span className="font-medium">{popupMessage.msg}</span>
        </div>
      )}

      <main className="grow w-full flex justify-center items-center py-8">
        <form onSubmit={handleSubmit} className="relative overflow-hidden bg-primary rounded-xl w-[95%] md:w-[85%] lg:w-[900px] shadow-lg animate-fadeIn">
          <div className="absolute bottom-0 left-0 right-0 overflow-hidden rounded-b-xl pointer-events-none">
            <img src="/icons/waves.png" alt="Waves" className="w-full object-cover opacity-90" />
          </div>

          <div className="relative z-10 p-8 space-y-6 w-full">
            <h2 className="font-raleway font-bold text-2xl text-primary text-center mb-4">Створити акаунт</h2>

            {/* ім'я */}
            <div>
              <label className="font-raleway font-semibold text-primary text-lg">Введіть ім'я</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                autoComplete="name"
                className="mt-2 border-2 border-[--input-border-color] rounded-lg bg-white text-primary w-full h-10 px-4 transition-all duration-200 focus:scale-[1.02] focus:outline-none"
              />
            </div>

            {/* пошта */}
            <div>
              <label className="font-raleway font-semibold text-primary text-lg">Введіть пошту</label>
              <input
                type="email"
                value={email}
                onChange={(e) => handleEmailChange(e.target.value)}
                autoComplete="email"
                className="mt-2 border-2 border-[--input-border-color] rounded-lg bg-white text-primary w-full h-10 px-4 transition-all duration-200 focus:scale-[1.02] focus:outline-none"
              />
            </div>

            {/* пароль */}
            <div>
              <label className="font-raleway font-semibold text-primary text-lg">Введіть пароль</label>
              <div className="relative mt-2">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => handlePasswordChange(e.target.value)}
                  autoComplete="new-password"
                  style={{ WebkitAppearance: 'none', MozAppearance: 'none', appearance: 'none' }}
                  className={`w-full h-10 px-4 pr-12 rounded-md transition duration-200 focus:outline-none border-2 ${fieldPasswordError
                    ? "bg-[#efadad] border-red-500"
                    : "bg-white border-[--input-border-color] text-primary focus:scale-[1.02]"
                    }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center justify-center focus:outline-none"
                >
                  <img
                    src={showPassword ? "/icons/Preview-close.png" : "/icons/Preview-open.png"}
                    alt="toggle password"
                    className="w-5 h-5 select-none"
                  />
                </button>
              </div>
              <span className="text-xs text-[#477628]">Пароль повинен містити понад 8 символів, зокрема літери, цифри та спецсимволи</span>
            </div>

            {/* підтвердження */}
            <div>
              <label className="font-raleway font-semibold text-primary text-lg">Введіть пароль ще раз</label>
              <div className="relative mt-2">
                <input
                  type={showConfirm ? "text" : "password"}
                  value={confirm}
                  onChange={(e) => handleConfirmChange(e.target.value)}
                  autoComplete="off"
                  style={{ WebkitAppearance: 'none', MozAppearance: 'none', appearance: 'none' }}
                  className={`w-full h-10 px-4 pr-12 rounded-md transition duration-200 focus:outline-none border-2 ${fieldConfirmError
                    ? "bg-red-100 border-red-500"
                    : "bg-white border-[--input-border-color] text-primary focus:scale-[1.02]"
                    }`}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm(!showConfirm)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center justify-center focus:outline-none"
                >
                  <img
                    src={showConfirm ? "/icons/Preview-close.png" : "/icons/Preview-open.png"}
                    alt="toggle confirm password"
                    className="w-5 h-5 select-none"
                  />
                </button>
              </div>
            </div>

            <div className="w-full flex justify-center">
              <div className="w-full max-w-[320px] flex justify-center">
                <Turnstile
                  siteKey="0x4AAAAAAB9zgN9DPpLoR9NG"
                  onSuccess={handlerSetCapthaOK}
                  options={{
                    theme: "light",
                    size: "flexible",
                  }}
                  style={{
                    transform: "scale(0.7) translateX(-6%)",
                    transformOrigin: "top center",
                  }}
                />
              </div>
            </div>


            {/* кнопки */}
            <div className="flex flex-wrap justify-between items-center gap-4 mt-6">
              <button type="button" className="flex items-center justify-center bg-[#9cc68a] hover:bg-[#88b274] text-[#2f2f2f] px-4 py-2 rounded-md font-semibold border border-[#294a2b] transition-all duration-200 active:scale-95 gap-2">
                <span>Зареєструватися через Google</span>
                <img src="/icons/google.png" className="w-6 h-6" />
              </button>

              <button
                type="submit"
                disabled={submitting || !isEmailValid}
                className={`px-6 py-2 rounded-md font-semibold shadow-md transition-all duration-200 ${submitting || !isEmailValid
                    ? "bg-gray-400 text-white cursor-not-allowed"
                    : "bg-[#4b6b3d] hover:bg-[#3d5832] text-white"
                  }`}
              >
                {submitting ? "Завантаження..." : "Створити"}
              </button>

            </div>

            <a href="/login" className="block text-center mt-4 text-gray-800 hover:underline">Вже є акаунт?</a>
          </div>
        </form>
      </main>

      <footer className="w-full bg-primary py-6 text-center">
      </footer>

      <style>{`
        @keyframes slideDown {0% {opacity:0; transform:translateY(-10px);}100% {opacity:1; transform:translateY(0);}}
        .animate-slideDown {animation: slideDown 0.36s ease-out;}
        @keyframes fadeIn {from {opacity:0; transform:scale(0.985);} to {opacity:1; transform:scale(1);}}
        .animate-fadeIn {animation: fadeIn 0.45s ease-out;}
      `}</style>
    </div>
  );
}
