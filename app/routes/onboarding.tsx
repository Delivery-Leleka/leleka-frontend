import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Download, 
  Monitor, 
  Smartphone, 
  ArrowRight, 
  Camera, 
  ArrowLeft, 
  Apple, 
  Globe, 
  ChevronDown, 
  ChevronUp 
} from "lucide-react";

type SupportedOS = "windows" | "linux" | "mac" | "android" | "ios" | "unknown";

interface ProfileData {
  name: string;
  username: string;
  email: string;
  bio: string;
  avatar: string | null;
}

interface DownloadOption {
  label: string;
  format: string;
  arch?: string;
  status: "available" | "coming_soon";
  note?: string;
}

interface PlatformDownloads {
  title: string;
  icon: React.ElementType;
  options: DownloadOption[];
}

const DOWNLOAD_DATA: Record<SupportedOS, PlatformDownloads> = {
  windows: {
    title: "Windows",
    icon: Monitor,
    options: [
      { label: "EXE Інсталятор", format: ".exe", arch: "x64 / ARM64", status: "available" },
      { label: "Portable версія", format: ".zip / .exe", arch: "x64 / ARM64", status: "available" },
      { label: "MSI Корпоративний", format: ".msi", arch: "x64 / ARM64", status: "available", note: "Для груп. політик" },
      { label: "Microsoft Store", format: "AppX", status: "coming_soon" },
    ],
  },
  linux: {
    title: "Linux",
    icon: Monitor,
    options: [
      { label: "AppImage", format: ".AppImage", arch: "x64 / ARM64", status: "available" },
      { label: "Portable", format: ".tar.gz", arch: "x64 / ARM64", status: "available" },
      { label: "DEB пакет", format: ".deb", arch: "Ubuntu / Debian", status: "coming_soon" },
      { label: "RPM пакет", format: ".rpm", arch: "Fedora / RHEL", status: "coming_soon" },
      { label: "Flatpak", format: "Flathub", status: "coming_soon" },
    ],
  },
  mac: {
    title: "macOS",
    icon: Apple,
    options: [
      { label: "DMG Інсталятор", format: ".dmg", arch: "Universal (Intel / Apple Silicon)", status: "coming_soon", note: "Тестується у CI" },
    ],
  },
  android: {
    title: "Android",
    icon: Smartphone,
    options: [
      { label: "Direct APK", format: ".apk", arch: "ARM64 / v7a", status: "coming_soon" },
      { label: "Google Play Store", format: "Store", status: "coming_soon" },
    ],
  },
  ios: {
    title: "iOS",
    icon: Smartphone,
    options: [
      { label: "Apple App Store", format: "App Store", status: "coming_soon" },
    ],
  },
  unknown: {
    title: "Веб-версія",
    icon: Globe,
    options: [],
  },
};

const OnboardingPage: React.FC = () => {
  const navigate = useNavigate();
  
  const [step, setStep] = useState<number>(1);
  const [detectedOS, setDetectedOS] = useState<SupportedOS>("unknown");
  const [showAllPlatforms, setShowAllPlatforms] = useState<boolean>(false);

  const [profile, setProfile] = useState<ProfileData>({
    name: "",
    username: "",
    email: "",
    bio: "",
    avatar: null,
  });

  useEffect(() => {
    const userAgent = window.navigator.userAgent.toLowerCase();

    if (/iphone|ipad|ipod/.test(userAgent)) {
      setDetectedOS("ios");
    } else if (userAgent.includes("android")) {
      setDetectedOS("android");
    } else if (userAgent.includes("mac")) {
      setDetectedOS("mac");
    } else if (userAgent.includes("win")) {
      setDetectedOS("windows");
    } else if (userAgent.includes("linux")) {
      setDetectedOS("linux");
    } else {
      setDetectedOS("unknown");
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

  const handleDownload = (platform: string, format: string) => {
    alert(`Завантаження (${platform} - ${format}) незабаром буде доступне!`);
  };

  const handleContinue = () => {
    //  тут буде запит на бекенд з відправлянням даних про профіль
    navigate("/");
  };

  const currentPlatformInfo = DOWNLOAD_DATA[detectedOS];

  return (
    <div className="min-h-screen bg-app-bg-alt text-brand-950 font-sans selection:bg-brand-800 selection:text-white flex items-center justify-center p-4 md:p-8 bg-cover bg-center bg-no-repeat bg-[url('/bg-mobile.png')] md:bg-[url('/bg.png')]">
      <div className="max-w-2xl w-full bg-white border border-brand-50 rounded-3xl p-6 md:p-10 shadow-xl flex flex-col items-center text-center space-y-6 relative overflow-hidden transition-all">
        
        <div className="flex justify-center items-center">
          <div
            className="w-[180px] h-[50px] bg-contain bg-no-repeat bg-center"
            style={{ backgroundImage: 'url("/icons/LOGO.png")' }}
            aria-label="Лелека"
          />
        </div>

        <div className="flex items-center justify-center gap-2 w-full max-w-xs my-1">
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
          <div className="w-full space-y-6">
            <div className="space-y-2">
              <h1 className="text-2xl md:text-3xl font-black text-brand-950 tracking-tight">
                Ласкаво просимо до <span className="text-brand-800">Лелеки</span>
              </h1>
              <p className="text-brand-700 text-sm md:text-base leading-relaxed max-w-md mx-auto">
                Оберіть зручний варіант для роботи або переходьте одразу у веб-версію.
              </p>
            </div>

            {/* Визначена ОС користувача */}
            {detectedOS !== "unknown" && (
              <div className="w-full bg-brand-50/40 border border-brand-50 rounded-2xl p-4 md:p-5 text-left space-y-3">
                <div className="flex items-center justify-between border-b border-brand-50/80 pb-3">
                  <div className="flex items-center gap-2.5">
                    <currentPlatformInfo.icon className="w-5 h-5 text-brand-800" />
                    <div>
                      <span className="text-xs text-brand-700 font-medium block">Ваша система:</span>
                      <span className="text-base font-bold text-brand-950">{currentPlatformInfo.title}</span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                  {currentPlatformInfo.options.map((option, idx) => (
                    <button
                      key={idx}
                      type="button"
                      disabled={option.status === "coming_soon"}
                      onClick={() => handleDownload(currentPlatformInfo.title, option.label)}
                      className={`p-3 rounded-xl border text-left flex flex-col justify-between transition-all ${
                        option.status === "available"
                          ? "bg-white border-brand-800/20 hover:border-brand-800 hover:shadow-md cursor-pointer group"
                          : "bg-gray-100 border-gray-200 text-gray-500 cursor-not-allowed"
                      }`}
                    >
                      <div className="flex items-start justify-between w-full gap-2">
                        <span className={`font-bold text-xs md:text-sm ${option.status === "available" ? "text-brand-950 group-hover:text-brand-800" : "text-gray-600"}`}>
                          {option.label}
                        </span>
                        <span className={`text-[10px] font-mono font-semibold px-1.5 py-0.5 rounded ${option.status === "available" ? "bg-brand-50 text-brand-800" : "bg-gray-200 text-gray-600"}`}>
                          {option.format}
                        </span>
                      </div>
                      
                      <div className="mt-2 flex items-center justify-between text-[11px]">
                        {option.status === "available" ? (
                          <>
                            <span className="text-brand-700">{option.arch || ""}</span>
                            <Download className="w-3.5 h-3.5 text-brand-800 group-hover:translate-y-0.5 transition-transform" />
                          </>
                        ) : (
                          <span className="text-gray-500 font-medium">У розробці</span>
                        )}
                      </div>
                      {option.note && (
                        <span className={`text-[10px] italic mt-0.5 ${option.status === "available" ? "text-brand-700" : "text-gray-400"}`}>
                          {option.note}
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Спойлер для інших платформ */}
            <div className="w-full">
              <button
                type="button"
                onClick={() => setShowAllPlatforms((prev) => !prev)}
                className="w-full py-2.5 px-4 rounded-xl border border-brand-50 text-xs md:text-sm font-semibold text-brand-700 hover:text-brand-950 hover:bg-brand-50/50 transition-all flex items-center justify-between"
              >
                <span>{showAllPlatforms ? "Сховати інші платформи" : "Завантажити для інших пристроїв"}</span>
                {showAllPlatforms ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>

              {showAllPlatforms && (
                <div className="mt-4 space-y-4 text-left max-h-[320px] overflow-y-auto pr-1">
                  {(Object.keys(DOWNLOAD_DATA) as SupportedOS[])
                    .filter((os) => os !== "unknown" && os !== detectedOS)
                    .map((osKey) => {
                      const platform = DOWNLOAD_DATA[osKey];
                      const Icon = platform.icon;
                      return (
                        <div key={osKey} className="border border-brand-50 rounded-2xl p-4 bg-white space-y-2.5">
                          <div className="flex items-center gap-2 font-bold text-sm text-brand-950 border-b border-brand-50/60 pb-2">
                            <Icon className="w-4 h-4 text-brand-800" />
                            <span>{platform.title}</span>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            {platform.options.map((option, idx) => (
                              <button
                                key={idx}
                                type="button"
                                disabled={option.status === "coming_soon"}
                                onClick={() => handleDownload(platform.title, option.label)}
                                className={`p-2.5 rounded-xl border text-left flex flex-col justify-between transition-all ${
                                  option.status === "available"
                                    ? "bg-white border-brand-800/20 hover:border-brand-800 hover:shadow-md cursor-pointer group"
                                    : "bg-gray-100 border-gray-200 text-gray-500 cursor-not-allowed"
                                }`}
                              >
                                <div className="flex items-start justify-between w-full gap-2">
                                  <span className={`font-bold text-xs ${option.status === "available" ? "text-brand-950 group-hover:text-brand-800" : "text-gray-600"}`}>
                                    {option.label}
                                  </span>
                                  <span className={`text-[9px] font-mono font-semibold px-1 py-0.5 rounded ${option.status === "available" ? "bg-brand-50 text-brand-800" : "bg-gray-200 text-gray-600"}`}>
                                    {option.format}
                                  </span>
                                </div>
                                <div className="mt-1 flex items-center justify-between text-[10px]">
                                  {option.status === "available" ? (
                                    <>
                                      <span className="text-brand-700">{option.arch || ""}</span>
                                      <Download className="w-3 h-3 text-brand-800" />
                                    </>
                                  ) : (
                                    <span className="text-gray-500 font-medium">У розробці</span>
                                  )}
                                </div>
                              </button>
                            ))}
                          </div>
                        </div>
                      );
                    })}
                </div>
              )}
            </div>

            {/* Навігація */}
            <div className="w-full pt-2 flex flex-col md:flex-row gap-3">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="py-3.5 px-6 rounded-2xl font-bold text-sm border border-brand-50 text-brand-700 hover:bg-brand-50/50 transition-all active:scale-95 cursor-pointer flex items-center justify-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Назад</span>
              </button>

              <button
                type="button"
                onClick={handleContinue}
                className="flex-1 py-3.5 px-8 rounded-2xl font-extrabold text-base bg-brand-800 text-white hover:bg-brand-900 transition-all active:scale-95 cursor-pointer shadow-lg flex items-center justify-center gap-2"
              >
                <Globe className="w-4 h-4" />
                <span>Продовжити у браузері</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default OnboardingPage;