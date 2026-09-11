import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { ProfileData } from '../types/onboarding';
import { useDetectedOS } from '../hooks/useDetectedOS';
import { ProfileStep } from '../components/onboarding/ProfileStep';
import { DownloadStep } from '../components/onboarding/DownloadStep';
import FilerobotImageEditor, {
  TABS,
  TOOLS,
} from 'react-filerobot-image-editor';

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

  // const handleEditorSave = (editedImg: { imageB64?: string }) => {
  //   if (editedImg.imageB64) {
  //     setProfile((prev) => ({ ...prev, avatar: editedImg.imageB64 }));
  //   }

  //   if (editingSrc) URL.revokeObjectURL(editingSrc);

  //   setEditingSrc(null);
  // };
  const handleEditorSave = (editedImg: { imageBase64?: string }) => {
    if (editedImg.imageBase64) {
      setProfile((prev) => ({
        ...prev,
        avatar: editedImg.imageBase64,
      }));
    }

    if (editingSrc) {
      URL.revokeObjectURL(editingSrc);
    }

    setEditingSrc(null);
  };

  const handleEditorClose = () => {
    if (editingSrc) URL.revokeObjectURL(editingSrc);
    setEditingSrc(null);
  };

  const handleDownload = (platform: string, format: string) => {
    alert(`Завантаження (${platform} - ${format}) незабаром буде доступне!`);
  };

  const handleContinue = () => {
    // API запит збереження профілю
    navigate('/');
  };

  return (
    <>
      {editingSrc && (
        <div className="fixed inset-0 z-1000 flex items-center justify-center bg-black/50 p-4">
          <div className="h-[95vh] max-h-[900px] w-full max-w-6xl overflow-hidden rounded-xl bg-white shadow-2xl">
            <FilerobotImageEditor
              source={editingSrc}
              onSave={handleEditorSave}
              onClose={handleEditorClose}
              defaultTabId={TABS.ADJUST}
              defaultToolId={TOOLS.CROP}
              defaultSavedImageName='DO_NOT_CHANGE_THIS_SETTINGS'
              defaultSavedImageType="png"
              defaultSavedImageQuality={1}
            />
          </div>
        </div>
      )}

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
