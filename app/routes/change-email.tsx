import { useState } from 'react';
import { useNavigate } from 'react-router';
import Stage1ChangeEmail from '~/components/auth/EmailChange1';
import Stage2ChangeEmail from '~/components/auth/EmailChange2';
import axiosBackend from '~/api/axios';

export default function ChangeEmailRoute() {
  const [step, setStep] = useState<1 | 2>(1);
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleFinish = async (newEmail: string) => {
    try {
      await axiosBackend.post('/change-email', {
        password: encodeURIComponent(password),
        email: newEmail,
      });
      navigate('/myProfile');
    } catch (err) {
      console.error('Помилка під час зміни пошти:', err);
    }
  };

  return (
    <>
      {step === 1 && (
        <Stage1ChangeEmail
          onNext={(currentPassword) => {
            setPassword(currentPassword);
            setStep(2);
          }}
        />
      )}

      {step === 2 && (
        <Stage2ChangeEmail onNext={handleFinish} onBack={() => setStep(1)} />
      )}
    </>
  );
}
