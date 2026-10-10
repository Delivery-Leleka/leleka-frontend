import React, { useState } from 'react';

interface PasswordInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  hasError?: boolean;
}

export function PasswordInput({ label, hasError, className = '', ...props }: PasswordInputProps) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="space-y-1">
      <label className="font-raleway font-bold text-brand-deep text-lg">
        {label}
      </label>
      <div className="relative mt-1">
        <input
          {...props}
          type={showPassword ? 'text' : 'password'}
          className={`w-full h-11 px-4 pr-12 rounded-xl transition duration-200 focus:outline-none border-2 appearance-none ${
            hasError ? 'bg-white border-red-500' : 'bg-white border-brand-deep text-primary'
          } ${className}`}
        />
        <button
          type="button"
          onClick={() => setShowPassword((prev) => !prev)}
          className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center justify-center focus:outline-none"
        >
          <img
            src={showPassword ? '/icons/Preview-close.png' : '/icons/Preview-open.png'}
            alt="toggle password"
            className="w-5 h-5 select-none opacity-70 hover:opacity-100"
          />
        </button>
      </div>
    </div>
  );
}