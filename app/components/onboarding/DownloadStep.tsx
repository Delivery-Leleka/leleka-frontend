import React, { useState } from "react";
import { Download, ArrowRight, ArrowLeft, Globe, ChevronDown, ChevronUp } from "lucide-react";
import { DOWNLOAD_DATA } from "../../constants/downloads";
import type { SupportedOS } from "../../types/onboarding";

interface DownloadStepProps {
  detectedOS: SupportedOS;
  onBack: () => void;
  onContinue: () => void;
  onDownload: (platform: string, format: string) => void;
}

export const DownloadStep: React.FC<DownloadStepProps> = ({
  detectedOS,
  onBack,
  onContinue,
  onDownload,
}) => {
  const [showAllPlatforms, setShowAllPlatforms] = useState<boolean>(false);
  const currentPlatformInfo = DOWNLOAD_DATA[detectedOS];

  return (
    <div className="w-full space-y-6">
      <div className="space-y-2">
        <h1 className="text-2xl md:text-3xl font-black text-brand-950 tracking-tight">
          Ласкаво просимо до <span className="text-brand-800">Лелеки</span>
        </h1>
        <p className="text-brand-700 text-sm md:text-base leading-relaxed max-w-md mx-auto">
          Оберіть зручний варіант для роботи або переходьте одразу у веб-версію.
        </p>
      </div>

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
                onClick={() => onDownload(currentPlatformInfo.title, option.label)}
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

      <div className="w-full">
        <button
          type="button"
          onClick={() => setShowAllPlatforms((prev) => !prev)}
          className="w-full py-2.5 px-4 rounded-xl border border-brand-50 text-xs md:text-sm font-semibold text-brand-700 hover:text-brand-950 hover:bg-brand-50/50 transition-all flex items-center justify-between cursor-pointer"
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
                          onClick={() => onDownload(platform.title, option.label)}
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

      <div className="w-full pt-2 flex flex-col md:flex-row gap-3">
        <button
          type="button"
          onClick={onBack}
          className="py-3.5 px-6 rounded-2xl font-bold text-sm border border-brand-50 text-brand-700 hover:bg-brand-50/50 transition-all active:scale-95 cursor-pointer flex items-center justify-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Назад</span>
        </button>

        <button
          type="button"
          onClick={onContinue}
          className="flex-1 py-3.5 px-8 rounded-2xl font-extrabold text-base bg-brand-800 text-white hover:bg-brand-900 transition-all active:scale-95 cursor-pointer shadow-lg flex items-center justify-center gap-2"
        >
          <Globe className="w-4 h-4" />
          <span>Продовжити у браузері</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};