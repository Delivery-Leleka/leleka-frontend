import React from "react";
import { Camera, ArrowRight } from "lucide-react";
import type { ProfileData } from "../../types/onboarding";

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
  const isValid =
    profile.name.trim() !== "" &&
    profile.username.trim() !== "" &&
    profile.email.trim() !== "" &&
    profile.bio.trim() !== "";

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
            onChange={onAvatarChange}
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
              onChange={onChange}
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
              onChange={onChange}
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
              onChange={onChange}
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
          onChange={onChange}
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
          disabled={!isValid}
          onClick={onNext}
          className={`w-full py-4 px-8 rounded-2xl font-extrabold text-lg flex items-center justify-center gap-2 transition-all ${
            isValid
              ? "bg-brand-800 text-white hover:bg-brand-900 shadow-xl active:scale-95 cursor-pointer"
              : "bg-gray-200 text-gray-400 cursor-not-allowed shadow-none"
          }`}
        >
          <span>Далі</span>
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};