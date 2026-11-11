import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import type { ProfileData } from '../types/onboarding';
import { useDetectedOS } from '../hooks/useDetectedOS';
import { ProfileStep } from '../components/onboarding/ProfileStep';
import { DownloadStep } from '../components/onboarding/DownloadStep';
import Cropper from 'react-easy-crop';

const OnboardingPage: React.FC = () => {
  const navigate = useNavigate();
  const detectedOS = useDetectedOS();

  const [step, setStep] = useState<number>(1);
  const [profile, setProfile] = useState<ProfileData>({
    name: '',
    username: '',
    email: '',
    bio: '',
    avatar: null,
  });
  const [editingSrc, setEditingSrc] = useState<string | null>(null);

  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !file.type.startsWith('image/')) {
      return;
    }
    setEditingSrc(URL.createObjectURL(file));
    e.target.value = '';
  };

  const handleDownload = (platform: string, format: string) => {
    alert(`Завантаження (${platform} - ${format}) незабаром буде доступне!`);
  };

  const handleContinue = () => {
    // API запит збереження профілю
    navigate('/');
  };

  const onCropComplete = (croppedArea: any, croppedAreaPixels: any) => {
    console.log(croppedArea, croppedAreaPixels);
  };

  return (
    <>
      {editingSrc && (
        <div className="fixed inset-0 z-1000 flex items-center justify-center bg-black/50 p-4">
          <div className="relative h-90 w-full max-w-6xl overflow-hidden rounded-xl bg-white shadow-2xl">
            <Cropper
              image={editingSrc}
              crop={crop}
              zoom={zoom}
              aspect={1 / 1}
              onCropChange={setCrop}
              onCropComplete={onCropComplete}
              onZoomChange={setZoom}
              cropShape="round"
            />
          </div>
        </div>
      )}
      <div className="flex min-h-screen items-center justify-center bg-app-bg-alt bg-[url('/bg-mobile.png')] bg-cover bg-center bg-no-repeat p-4 font-sans text-brand-950 selection:bg-brand-800 selection:text-white md:bg-[url('/bg.png')] md:p-8">
        <div className="relative flex w-full max-w-2xl flex-col items-center space-y-6 overflow-hidden rounded-3xl border border-brand-50 bg-white p-6 text-center shadow-xl transition-all md:p-10">
          <div className="flex items-center justify-center">
            <div
              className="h-12.5 w-45 bg-contain bg-center bg-no-repeat"
              style={{ backgroundImage: 'url("/icons/LOGO.png")' }}
              aria-label="Лелека"
            />
          </div>

          <div className="my-1 flex w-full max-w-xs items-center justify-center gap-2">
            <div
              className={`h-2 flex-1 rounded-full transition-all duration-300 ${
                step >= 1 ? 'bg-brand-800' : 'bg-brand-50'
              }`}
            />
            <div
              className={`h-2 flex-1 rounded-full transition-all duration-300 ${
                step >= 2 ? 'bg-brand-800' : 'bg-brand-50'
              }`}
            />
          </div>

          {step === 1 && (
            <ProfileStep
              profile={profile}
              onChange={handleChange}
              onAvatarChange={handleAvatarChange}
              onNext={() => setStep(2)}
            />
          )}

          {step === 2 && (
            <DownloadStep
              detectedOS={detectedOS}
              onBack={() => setStep(1)}
              onContinue={handleContinue}
              onDownload={handleDownload}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default OnboardingPage;
