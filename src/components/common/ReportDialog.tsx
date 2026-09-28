import React, { useState } from 'react';
import { AlertTriangle, X } from 'lucide-react';
import { useApp } from '../../lib/store';

interface ReportDialogProps {
  targetType: 'post' | 'comment' | 'user' | 'community' | 'project';
  targetId: string;
  isOpen: boolean;
  onClose: () => void;
}

export const ReportDialog: React.FC<ReportDialogProps> = ({
  targetType,
  targetId,
  isOpen,
  onClose,
}) => {
  const { submitReport } = useApp();
  const [reason, setReason] = useState('Spam or commercial selling without permission');
  const [details, setDetails] = useState('');

  if (!isOpen) return null;

  const reasons = [
    'Spam or commercial selling without permission',
    'Harassment, hate speech, or personal attacks',
    'Misinformation or misleading claims',
    'Paid-application / recruitment scam',
    'Violates community guidelines',
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitReport(targetType, targetId, reason, details);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-6 border border-slate-100 animate-in zoom-in-95 duration-150">
        <div className="flex items-start justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-red-50 text-red-600 flex items-center justify-center shrink-0">
              <AlertTriangle className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-[#182230]">
                Report this {targetType}
              </h3>
              <p className="text-xs text-slate-500">Confidential moderation review</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Select the primary reason
            </label>
            <div className="space-y-1.5">
              {reasons.map((r) => (
                <label
                  key={r}
                  className={`flex items-center gap-2.5 p-2.5 rounded-xl border text-xs cursor-pointer transition-colors ${
                    reason === r
                      ? 'border-[#145DA0] bg-blue-50/50 text-[#145DA0] font-medium'
                      : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                  }`}
                >
                  <input
                    type="radio"
                    name="report-reason"
                    value={r}
                    checked={reason === r}
                    onChange={(e) => setReason(e.target.value)}
                    className="accent-[#145DA0]"
                  />
                  <span>{r}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Additional context (optional)
            </label>
            <textarea
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              placeholder="Provide any additional details for community moderators..."
              rows={3}
              className="w-full bg-[#F7F9FC] border border-slate-200 rounded-xl p-3 text-xs text-[#182230] focus:outline-none focus:ring-2 focus:ring-[#145DA0] focus:bg-white resize-none"
            />
          </div>

          <div className="flex items-center justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-3.5 py-2 text-xs font-medium text-slate-600 hover:text-slate-800 rounded-xl hover:bg-slate-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-xs font-semibold bg-red-600 text-white rounded-xl hover:bg-red-700 transition-colors shadow-xs"
            >
              Submit Report
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
