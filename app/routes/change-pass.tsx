import { useState } from "react";
import { useNavigate } from "react-router";
import Stage1ChangePassword from "~/components/auth/PasswordChange1";
import Stage2ChangePassword from "~/components/auth/PasswordChange2";
import axiosBackend from "~/api/axios";

export default function ChangePass() {
    const [step, setStep] = useState<1 | 2>(1);
    const navigate = useNavigate();

    const handleConfirmPassword = async (newPassword: string) => {
        try {
            await axiosBackend.post("/change-password", {
                password: encodeURIComponent(newPassword),
            });

            console.log("Пароль успішно змінено");
            navigate("/profile");
        } catch (err) {
            console.error("Помилка під час зміни пароля:", err);
        }
    };

    return (
        <>
            {step === 1 && (
                <Stage1ChangePassword onNext={() => setStep(2)} />
            )}

            {step === 2 && (
                <Stage2ChangePassword
                    onBack={() => setStep(1)}
                    onConfirm={handleConfirmPassword}
                />
            )}
        </>
    );
}