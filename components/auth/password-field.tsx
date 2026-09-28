import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

interface PasswordFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label: string;
  error?: string;
  showRequirements?: boolean;
  value?: string;
}

export const PasswordField: React.FC<PasswordFieldProps> = ({
  id,
  label,
  error,
  showRequirements = false,
  value = '',
  className = '',
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="space-y-1.5">
      <label htmlFor={id} className="block text-xs font-semibold text-[#182230]">
        {label}
      </label>

      <div className="relative">
        <input
          {...props}
          id={id}
          type={showPassword ? 'text' : 'password'}
          value={value}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${id}-error` : undefined}
          className={`w-full bg-[#FFFFFF] border rounded-xl pl-3.5 pr-10 py-2.5 text-xs sm:text-sm text-[#182230] placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#145DA0] focus:border-transparent transition-all ${
            error ? 'border-red-400 focus:ring-red-400' : 'border-slate-200 hover:border-slate-300'
          } ${className}`}
        />

        <button
          type="button"
          onClick={() => setShowPassword((prev) => !prev)}
          className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1.5 text-slate-400 hover:text-slate-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#145DA0] rounded-lg transition-colors"
          aria-label={showPassword ? 'Hide password' : 'Show password'}
        >
          {showPassword ? (
            <EyeOff className="w-4 h-4" aria-hidden="true" />
          ) : (
            <Eye className="w-4 h-4" aria-hidden="true" />
          )}
        </button>
      </div>

      {error && (
        <p id={`${id}-error`} className="text-xs text-red-600 font-medium pt-0.5">
          {error}
        </p>
      )}
    </div>
  );
};
