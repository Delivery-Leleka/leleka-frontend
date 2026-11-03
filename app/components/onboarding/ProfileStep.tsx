import React from "react";
import { Camera, ArrowRight } from "lucide-react";
import type { ProfileData } from "../../types/onboarding";
import { GreenWaves } from "../general/GreenWaves";

interface ProfileStepProps {
  profile: ProfileData;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onAvatarChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onNext: () => void;
}

export const ProfileStep: React.FC<ProfileStepProps> = ({
  profile,
  onChange,
  onAvatarChange,
  onNext,
}) => {
  return (
    <div className="w-full space-y-6 text-left">
      <div className="text-center space-y-1">
        <h1 className="text-2xl md:text-3xl font-black text-brand-950 tracking-tight">
          Профіль
        </h1>
        <p className="text-brand-700 text-sm md:text-base">
          Заповніть інформацію про себе, щоб друзям було простіше вас знайти
        </p>
      </div>

      <div className="relative z-10 flex items-center gap-4 pt-2">
        <label className="relative group cursor-pointer flex-shrink-0">
          <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-brand-50 border-2 border-dashed border-brand-800/30 flex items-center justify-center overflow-hidden transition-all group-hover:border-brand-800">
            {profile.avatar ? (
              <img
                src={profile.avatar}
                alt="Аватар"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="flex flex-col items-center text-brand-700 group-hover:text-brand-800">
                <Camera className="w-6 h-6" />
              </div>
            )}
          </div>
          <input
            type="file"
            accept="image/*"
            onChange={onAvatarChange}
            className="hidden"
          />
        </label>

        <div className="relative flex-1 pb-5">
          <div className="flex items-center justify-between mb-1">
            <label className="block text-xs font-bold text-brand-950">
              Про себе
            </label>
            <span className="text-[10px] text-brand-700 font-medium">
              (необов'язково)
            </span>
          </div>
          <textarea
            name="bio"
            rows={2}
            maxLength={70}
            value={profile.bio || ""}
            onChange={onChange}
            placeholder="Розкажіть дещо про себе..."
            className="w-full px-3 py-2 rounded-xl border border-brand-200 bg-brand-50/30 text-brand-950 text-sm focus:outline-none focus:ring-2 focus:ring-brand-800 focus:border-transparent transition-all resize-none"
          />
          <span className="absolute bottom-0 right-1 text-[10px] text-brand-950 font-bold bg-white/80 px-1.5 py-0.5 rounded-md shadow-xs">
            {(profile.bio || "").length}/70 символів
          </span>
        </div>
      </div>

      <div className="relative z-10 pt-2">
        <button
          type="button"
          onClick={onNext}
          className="w-full py-4 px-8 rounded-2xl font-extrabold text-lg flex items-center justify-center gap-2 transition-all bg-brand-800 text-white hover:bg-brand-900 shadow-xl active:scale-95 cursor-pointer"
        >
          <span>Далі</span>
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>

      <GreenWaves />
    </div>
  );
};