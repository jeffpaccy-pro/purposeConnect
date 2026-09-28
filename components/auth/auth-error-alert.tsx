import React from 'react';
import { AlertCircle, CheckCircle2 } from 'lucide-react';

interface AuthAlertProps {
  type?: 'error' | 'success';
  message?: string | null;
  className?: string;
}

export const AuthAlert: React.FC<AuthAlertProps> = ({
  type = 'error',
  message,
  className = '',
}) => {
  if (!message) return null;

  const isError = type === 'error';

  return (
    <div
      role="alert"
      aria-live="polite"
      className={`flex items-start gap-2.5 p-3.5 rounded-xl text-xs font-medium border animate-in fade-in duration-150 ${
        isError
          ? 'bg-red-50/90 border-red-200 text-red-800'
          : 'bg-emerald-50/90 border-emerald-200 text-emerald-800'
      } ${className}`}
    >
      {isError ? (
        <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" aria-hidden="true" />
      ) : (
        <CheckCircle2 className="w-4 h-4 text-[#16A34A] shrink-0 mt-0.5" aria-hidden="true" />
      )}
      <span className="leading-relaxed flex-1">{message}</span>
    </div>
  );
};
