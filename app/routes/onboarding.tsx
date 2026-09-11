import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Download, Monitor, Smartphone, ArrowRight, Camera, ArrowLeft } from "lucide-react";

type SupportedOS = "windows" | "linux" | null;

interface ProfileData {
  name: string;
  username: string;
  email: string;
  bio: string;
  avatar: string | null;
}

const OnboardingPage: React.FC = () => {
  const navigate = useNavigate();
  
  const [step, setStep] = useState<number>(1);
  const [detectedOS, setDetectedOS] = useState<SupportedOS>(null);

  const [profile, setProfile] = useState<ProfileData>({
    name: "",
    username: "",
    email: "",
    bio: "",
    avatar: null,
  });

  useEffect(() => {
    const userAgent = window.navigator.userAgent.toLowerCase();

    if (userAgent.includes("win")) {
      setDetectedOS("windows");
    } else if (userAgent.includes("linux") && !userAgent.includes("android")) {
      setDetectedOS("linux");
    } else {
      setDetectedOS(null);
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (name === "bio" && value.length > 70) return; 
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProfile((prev) => ({ ...prev, avatar: imageUrl }));
    }
  };

  const handleDownload = (osName: string) => {
    alert(`Завантаження застосунку для ${osName} незабаром буде доступне!`);
  };

  const handleContinue = () => {
    // Збереження даних профілю акаунту перед переходом
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-app-bg-alt text-brand-950 font-sans selection:bg-brand-800 selection:text-white flex items-center justify-center p-4 md:p-8 bg-cover bg-center bg-no-repeat bg-[url('/bg-mobile.png')] md:bg-[url('/bg.png')]">
      <div className="max-w-xl w-full bg-white border border-brand-50 rounded-3xl p-8 md:p-12 shadow-xl flex flex-col items-center text-center space-y-6 relative overflow-hidden">
        
        <div className="flex justify-center items-center">
          <div
            className="w-[180px] h-[50px] bg-contain bg-no-repeat bg-center"
            style={{ backgroundImage: 'url("/icons/LOGO.png")' }}
            aria-label="Лелека"
          />
        </div>

        <div className="flex items-center justify-center gap-2 w-full max-w-xs my-2">
          <div
            className={`h-2 flex-1 rounded-full transition-all duration-300 ${
              step >= 1 ? "bg-brand-800" : "bg-brand-50"
            }`}
          />
          <div
            className={`h-2 flex-1 rounded-full transition-all duration-300 ${
              step >= 2 ? "bg-brand-800" : "bg-brand-50"
            }`}
          />
        </div>

        {step === 1 && (
          <div className="w-full space-y-6 text-left">
            <div className="text-center space-y-1">
              <h1 className="text-2xl md:text-3xl font-black text-brand-950 tracking-tight">
                Профіль
              </h1>
              <p className="text-brand-700 text-sm md:text-base">
                Заповніть інформацію про себе, щоб друзям було простіше вас знайти
              </p>
            </div>

            <div className="flex flex-col md:flex-row items-center gap-6 pt-2">
              <label className="relative group cursor-pointer flex-shrink-0">
                <div className="w-28 h-28 md:w-32 md:h-32 rounded-full bg-brand-50 border-2 border-dashed border-brand-800/30 flex items-center justify-center overflow-hidden transition-all group-hover:border-brand-800">
                  {profile.avatar ? (
                    <img
                      src={profile.avatar}
                      alt="Аватар"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="flex flex-col items-center text-brand-700 group-hover:text-brand-800">
                      <Camera className="w-8 h-8 mb-1" />
                    </div>
                  )}
                </div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleAvatarChange}
                  className="hidden"
                />
              </label>

              <div className="w-full space-y-3">
                <div>
                  <label className="block text-xs font-bold text-brand-950 mb-1">
                    Ім'я
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={profile.name}
                    onChange={handleChange}
                    placeholder="Введіть ваше ім'я"
                    className="w-full px-4 py-2.5 rounded-xl border border-brand-50 bg-brand-50/30 text-brand-950 text-sm focus:outline-none focus:ring-2 focus:ring-brand-800 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-brand-950 mb-1">
                    Username
                  </label>
                  <input
                    type="text"
                    name="username"
                    value={profile.username}
                    onChange={handleChange}
                    placeholder="@username"
                    className="w-full px-4 py-2.5 rounded-xl border border-brand-50 bg-brand-50/30 text-brand-950 text-sm focus:outline-none focus:ring-2 focus:ring-brand-800 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-brand-950 mb-1">
                    Пошта
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={profile.email}
                    onChange={handleChange}
                    placeholder="example@mail.com"
                    className="w-full px-4 py-2.5 rounded-xl border border-brand-50 bg-brand-50/30 text-brand-950 text-sm focus:outline-none focus:ring-2 focus:ring-brand-800 transition-all"
                  />
                </div>
              </div>
            </div>

            <div className="relative">
              <label className="block text-xs font-bold text-brand-950 mb-1">
                Про себе
              </label>
              <textarea
                name="bio"
                rows={3}
                value={profile.bio}
                onChange={handleChange}
                placeholder="Розкажіть дещо про себе..."
                className={`w-full px-4 py-2.5 rounded-xl border bg-brand-50/30 text-brand-950 text-sm focus:outline-none focus:ring-2 transition-all resize-none ${
                  profile.bio.length > 0
                    ? "border-black focus:ring-black"
                    : "border-brand-50 focus:ring-brand-800"
                }`}
              />
              <span className="absolute bottom-2.5 right-3 text-[10px] text-brand-700 font-medium">
                {profile.bio.length}/70 символів
              </span>
            </div>

            <div className="pt-2">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="w-full py-4 px-8 rounded-2xl font-extrabold text-lg bg-brand-800 text-white hover:bg-brand-900 shadow-xl transition-all active:scale-95 cursor-pointer flex items-center justify-center gap-2"
              >
                <span>Далі</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}

        {step === 2 && (
          <>
            <div className="space-y-3">
              <h1 className="text-3xl md:text-4xl font-black text-brand-950 tracking-tight">
                Ласкаво просимо до <span className="text-brand-800">Лелеки</span>
              </h1>
              <p className="text-brand-700 text-base md:text-lg leading-relaxed max-w-md mx-auto">
                Твій затишний простір для безпечного та миттєвого спілкування готовий.
              </p>
            </div>

            {detectedOS ? (
              <div className="w-full bg-brand-50/80 border border-brand-50 rounded-2xl p-5 md:p-6 space-y-4 text-center">
                <div className="flex justify-center items-center gap-2.5 text-brand-950 font-bold text-base md:text-lg">
                  <Monitor className="w-5 h-5 text-brand-800" />
                  <span>Застосунок для вашого ПК</span>
                </div>

                <p className="text-xs md:text-sm text-brand-700 leading-relaxed">
                  Ви використовуєте <strong className="text-brand-950 capitalize">{detectedOS}</strong>. Завантажте настільний застосунок для швидшого доступу та зручних сповіщень.
                </p>

                <div className="flex justify-center pt-1">
                  <button
                    type="button"
                    onClick={() => handleDownload(detectedOS === "windows" ? "Windows" : "Linux")}
                    className="bg-brand-800 text-white px-6 py-3.5 rounded-xl font-bold text-sm hover:bg-brand-900 shadow-md transition-all active:scale-95 cursor-pointer flex items-center justify-center gap-2.5"
                  >
                    <Download className="w-4 h-4" />
                    <span>Завантажити для {detectedOS === "windows" ? "Windows" : "Linux"}</span>
                  </button>
                </div>
              </div>
            ) : (
              <div className="w-full bg-brand-50/50 border border-brand-50 rounded-2xl p-5 md:p-6 space-y-2 text-center">
                <div className="flex justify-center items-center gap-2 text-brand-950 font-bold text-sm md:text-base">
                  <Smartphone className="w-4 h-4 text-brand-800" />
                  <span>Застосунок у розробці</span>
                </div>
                <p className="text-xs md:text-sm text-brand-700 leading-relaxed">
                  Застосунок для вашої операційної системи зараз перебуває у розробці та з'явиться незабаром.
                </p>
              </div>
            )}

            <div className="w-full pt-1 flex flex-col md:flex-row gap-3">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="py-4 px-6 rounded-2xl font-bold text-base border border-brand-50 text-brand-700 hover:bg-brand-50/50 transition-all active:scale-95 cursor-pointer flex items-center justify-center gap-2"
              >
                <ArrowLeft className="w-5 h-5" />
                <span>Назад</span>
              </button>

              <button
                type="button"
                onClick={handleContinue}
                className={`flex-1 py-4 px-8 rounded-2xl font-extrabold text-lg transition-all active:scale-95 cursor-pointer shadow-lg flex items-center justify-center gap-2 ${
                  detectedOS
                    ? "border-2 border-brand-800 bg-transparent text-brand-800 hover:bg-brand-50"
                    : "bg-brand-800 text-white hover:bg-brand-900 shadow-xl"
                }`}
              >
                <span>{detectedOS ? "Продовжити у браузері" : "Перейти до чатів"}</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </>
        )}

      </div>
    </div>
  );
};

export default OnboardingPage;