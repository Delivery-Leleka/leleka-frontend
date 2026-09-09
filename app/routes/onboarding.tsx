import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Download, Monitor, Smartphone, ArrowRight } from "lucide-react";

type SupportedOS = "windows" | "linux" | null;

const OnboardingPage: React.FC = () => {
  const navigate = useNavigate();
  const [detectedOS, setDetectedOS] = useState<SupportedOS>(null);

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

  const handleDownload = (osName: string) => {
    alert(`Завантаження застосунку для ${osName} незабаром буде доступне!`);
  };

  const handleContinue = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-app-bg-alt text-brand-950 font-sans selection:bg-brand-800 selection:text-white flex items-center justify-center p-4 md:p-8">
      <div className="max-w-xl w-full bg-white border border-brand-50 rounded-3xl p-8 md:p-12 shadow-xl flex flex-col items-center text-center space-y-6 relative overflow-hidden">
        
        <div className="flex justify-center items-center">
          <div
            className="w-[180px] h-[50px] bg-contain bg-no-repeat bg-center"
            style={{ backgroundImage: 'url("/icons/LOGO.png")' }}
            aria-label="Лелека"
          />
        </div>

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

        <div className="w-full pt-1">
          <button
            type="button"
            onClick={handleContinue}
            className={`w-full py-4 px-8 rounded-2xl font-extrabold text-lg transition-all active:scale-95 cursor-pointer shadow-lg flex items-center justify-center gap-2 ${
              detectedOS
                ? "border-2 border-brand-800 bg-transparent text-brand-800 hover:bg-brand-50"
                : "bg-brand-800 text-white hover:bg-brand-900 shadow-xl"
            }`}
          >
            <span>{detectedOS ? "Продовжити у браузері" : "Перейти до чатів"}</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>

      </div>
    </div>
  );
};

export default OnboardingPage;