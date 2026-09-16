import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DOWNLOAD_DATA } from '../constants/downloads';
import type { SupportedOS, PlatformDownloads } from '../types/onboarding';
import Footer from '~/components/layout/Footer';
import Header from '~/components/layout/Header';

const AppsPage: React.FC = () => {
  const [currentLang, setCurrentLang] = useState<'UA' | 'EN'>('UA');
  const navigate = useNavigate();

  const toggleLanguage = () => {
    setCurrentLang((prev) => (prev === 'UA' ? 'EN' : 'UA'));
  };

  const platforms = Object.entries(DOWNLOAD_DATA) as [
    SupportedOS,
    PlatformDownloads,
  ][];

  const platformReqs: Record<string, React.ReactNode> = {
    // TODO: для цього треба буде білдити на github actions (a.k.a CI)
    Linux: <p>
      - glibc 2.35 або новіша (Ubuntu 22.04+, Debian 12+, Fedora 36+, RHEL 9+)
      <br />
      - 4 ГБ ОЗУ
      <br />
      - 300 МБ сховища
    </p>,
    Windows: <p>
      - Windows 10 або пізніша
      <br />
      - 4 ГБ ОЗУ
      <br />
      - 300 Мб сховища
    </p>,
    "Веб версія": <p>
      - Chrome/Chromium (включаючи Chromium-based: Brave, Opera, Vivaldi тд.) 111 або новіший
      <br />
      - Firefox 114 або новіший
      <br />
      - Safari 16.4 або новіший
    </p>
  }

  return (
    <div className="min-h-screen bg-app-bg-alt text-brand-950 font-sans selection:bg-brand-800 selection:text-white overflow-x-hidden flex flex-col justify-between">
      <Header />
      <section className="px-6 md:px-12 py-10 md:py-14 max-w-7xl mx-auto text-center space-y-3">
        <h1 className="text-4xl md:text-6xl font-black text-brand-950 tracking-tight flex justify-center items-center gap-3">
          <img
            src="/icons/lapa1.png"
            alt=""
            className="w-8 h-8 md:w-12 md:h-12 object-contain"
            aria-hidden="true"
          />
          Завантажити Лелеку
        </h1>
        <p className="text-brand-700 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
          Обирай зручну версію для свого пристрою. Синхронізація та безпека на
          всіх платформах.
        </p>
      </section>

      <main className="px-6 md:px-12 pb-16 max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {platforms.map(([osKey, platform]) => {
            const Icon = platform.icon;
            const isWeb = osKey === 'unknown';

            return (
              <div
                key={osKey}
                className="bg-white border border-brand-50 hover:border-brand-800 rounded-3xl p-6 md:p-8 flex flex-col justify-between shadow-sm hover:shadow-xl transition-all duration-300"
              >
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-brand-50 flex items-center justify-center text-brand-800 shrink-0">
                      <Icon className="w-7 h-7" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-extrabold text-brand-950">
                        {platform.title}
                      </h2>
                      <p className="text-xs text-brand-700 font-medium">
                        {isWeb ? 'Для платформ, там де нема додатку' : ''}
                      </p>
                    </div>
                  </div>

                  <div className="bg-brand-50/40 p-3 rounded-2xl border border-brand-50/80 text-xs text-brand-700 space-y-1">
                    <p className="font-semibold text-brand-900">
                      Системні вимоги:
                    </p>
                    <p className="leading-normal">
                      {platformReqs[platform.title] ?? <p>Невідома платформа</p>}
                    </p>
                  </div>

                  {isWeb ? (
                    <div className="space-y-4 pt-2">
                      <p className="text-brand-700 text-sm leading-relaxed">
                        Не бажаєте нічого встановлювати? Ви можете користуватися
                        Лелекою прямо зараз у своєму браузері.
                      </p>
                      <button
                        type="button"
                        onClick={() => navigate('/login')}
                        className="w-full bg-brand-800 text-white py-3.5 px-6 rounded-2xl font-extrabold text-base hover:bg-brand-900 shadow-md transition-all active:scale-95 cursor-pointer flex items-center justify-center gap-2 border-none"
                      >
                        <span>Відкрити у браузері</span>
                        <span>➔</span>
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-3 pt-2">
                      {platform.options.map((option, idx) => {
                        const isAvailable = option.status === 'available';

                        return (
                          <div
                            key={idx}
                            className={`p-3.5 rounded-2xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                              isAvailable
                                ? 'bg-brand-50/50 border-brand-50 hover:border-brand-800/40'
                                : 'bg-gray-50/80 border-gray-100 opacity-75'
                            }`}
                          >
                            <div className="space-y-0.5 min-w-0">
                              <div className="flex items-center gap-2 flex-wrap">
                                <span className="font-bold text-sm text-brand-950">
                                  {option.label}
                                </span>
                                <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-white border border-brand-100 text-brand-800 shrink-0">
                                  {option.format}
                                </span>
                              </div>
                              {option.arch && (
                                <p className="text-xs text-brand-700 truncate">
                                  {option.arch}
                                </p>
                              )}
                            </div>

                            {isAvailable ? (
                              <div className="flex flex-col sm:flex-col gap-2 shrink-0 w-full sm:w-auto pt-2 sm:pt-0">
                                <button
                                  type="button"
                                  onClick={() =>
                                    alert(`Завантаження: ${option.label} x64`)
                                  }
                                  className="w-full sm:w-auto bg-brand-800 hover:bg-brand-900 text-white px-3.5 py-2 rounded-xl text-xs font-bold transition-all shadow-xs active:scale-95 cursor-pointer border-none text-center"
                                >
                                  Завантажити x64
                                </button>
                                <button
                                  type="button"
                                  onClick={() =>
                                    alert(
                                      `Завантаження: ${option.label} ARM 64`
                                    )
                                  }
                                  className="w-full sm:w-auto bg-brand-800 hover:bg-brand-900 text-white px-3.5 py-2 rounded-xl text-xs font-bold transition-all shadow-xs active:scale-95 cursor-pointer border-none text-center"
                                >
                                  Завантажити ARM 64
                                </button>
                              </div>
                            ) : (
                              <span className="self-start sm:self-center shrink-0 text-[11px] font-bold px-2.5 py-1 rounded-lg bg-amber-50 border border-amber-200 text-amber-800">
                                Скоро
                              </span>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default AppsPage;