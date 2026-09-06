import { useState } from "react";
import { useNavigate } from "react-router";
import Stage1 from "~/components/auth/PasswordRecoveryStage1";
import Stage2 from "~/components/auth/PasswordRecoveryStage2";
import Stage3 from "~/components/auth/PasswordRecoveryStage3";

export default function PassRecoverRoute() {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  return (
    <div className="min-h-[calc(100vh-160px)] flex items-center justify-center p-4 bg-green-50 md:bg-[url('/icons/bg-desktop.png')] bg-[url('/icons/bg-mobile.png')] bg-cover bg-center">
      {step === 1 && (
        <Stage1 onNext={() => setStep(2)} />
      )}

      {step === 2 && (
        <Stage2
          onNext={(userEmail) => {
            if (userEmail) setEmail(userEmail);
            setStep(3);
          }}
          onBack={() => setStep(1)}
        />
      )}

      {step === 3 && (
        <Stage3
          onBack={() => setStep(2)}
          onConfirm={(code) => {
            // ТУТ МАЄ БУТИ АПІ ЗАПИТ!!!!!!
            console.log("Підтверджено:", { email, code });
            navigate("/login");
          }}
        />
      )}
    </div>
  );
}