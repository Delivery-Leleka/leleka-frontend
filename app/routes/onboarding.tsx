import React, { useState, lazy, Suspense, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import type { ProfileData } from '../types/onboarding';
import { useDetectedOS } from '../hooks/useDetectedOS';
import { ProfileStep } from '../components/onboarding/ProfileStep';
import { DownloadStep } from '../components/onboarding/DownloadStep';

import { ClientOnly } from '~/components/shared/ClientOnly';

const FilerobotImageEditor = lazy(() => import('react-filerobot-image-editor'));

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

  const [toolsEnums, setToolsEnums] = useState<Pick<
    typeof import('react-filerobot-image-editor'),
    'TABS' | 'TOOLS'
  > | null>(null);

  useEffect(() => {
    import('react-filerobot-image-editor').then((mod) => {
      setToolsEnums({ TABS: mod.TABS, TOOLS: mod.TOOLS });
    });
  }, []);

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

  const handleEditorSave = (editedImg: { imageBase64?: string }) => {
    const avatar = editedImg.imageBase64;

    if (avatar) {
      setProfile((prev) => ({
        ...prev,
        avatar,
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
      {editingSrc && toolsEnums && (
        <div className="fixed inset-0 z-1000 flex items-center justify-center bg-black/50 p-4">
          <div className="h-[95vh] max-h-225 w-full max-w-6xl overflow-hidden rounded-xl bg-white shadow-2xl">
            <ClientOnly>
              {() => (
                <Suspense fallback={null}>
                  <FilerobotImageEditor
                    source={editingSrc}
                    onSave={handleEditorSave}
                    onClose={handleEditorClose}
                    defaultTabId={toolsEnums.TABS.ADJUST}
                    defaultToolId={toolsEnums.TOOLS.CROP}
                    tabsIds={[
                      toolsEnums.TABS.ADJUST,
                      toolsEnums.TABS.FILTERS,
                      toolsEnums.TABS.FINETUNE,
                      toolsEnums.TABS.ANNOTATE,
                    ]}
                    savingPixelRatio={1}
                    previewPixelRatio={1}
                    Crop={{ ratio: 1 }}
                    defaultSavedImageName="do not change this settings"
                    defaultSavedImageType="png"
                    defaultSavedImageQuality={1}
                  />
                </Suspense>
              )}
            </ClientOnly>
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
