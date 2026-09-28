import React from 'react';
import {
  FileText,
  HelpCircle,
  Calendar,
  FolderPlus,
  Briefcase,
  X,
  ArrowRight,
} from 'lucide-react';
import { useApp } from '../../lib/store';

interface CreateActionSheetProps {
  onOpenCreatePost: () => void;
  onOpenAskHelp: () => void;
}

export const CreateActionSheet: React.FC<CreateActionSheetProps> = ({
  onOpenCreatePost,
  onOpenAskHelp,
}) => {
  const { isCreateSheetOpen, setIsCreateSheetOpen, navigate } = useApp();

  if (!isCreateSheetOpen) return null;

  const actions = [
    {
      title: 'Create post',
      description: 'Share a learning resource, update, or insight with your community.',
      icon: FileText,
      color: 'bg-blue-50 text-[#145DA0]',
      action: () => {
        setIsCreateSheetOpen(false);
        onOpenCreatePost();
      },
    },
    {
      title: 'Ask for help',
      description: 'Request peer debugging, study advice, or guidance with urgency level.',
      icon: HelpCircle,
      color: 'bg-amber-50 text-[#F59E0B]',
      action: () => {
        setIsCreateSheetOpen(false);
        onOpenAskHelp();
      },
    },
    {
      title: 'Create event',
      description: 'Organize an online study pod, live code review, or in-person workshop.',
      icon: Calendar,
      color: 'bg-emerald-50 text-[#16A34A]',
      action: () => {
        setIsCreateSheetOpen(false);
        navigate('/events/new');
      },
    },
    {
      title: 'Start a project',
      description: 'Assemble collaborators, define tasks, and build an open tool or app.',
      icon: FolderPlus,
      color: 'bg-purple-50 text-purple-700',
      action: () => {
        setIsCreateSheetOpen(false);
        navigate('/projects/new');
      },
    },
    {
      title: 'Share an opportunity',
      description: 'Post an internship, mentorship opening, freelance brief, or gig.',
      icon: Briefcase,
      color: 'bg-teal-50 text-[#0B7A75]',
      action: () => {
        setIsCreateSheetOpen(false);
        navigate('/opportunities/new');
      },
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-slate-900/40 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        className="w-full max-w-lg bg-white rounded-t-3xl sm:rounded-3xl shadow-2xl p-6 border border-slate-100 animate-in slide-in-from-bottom duration-250 max-h-[90vh] overflow-y-auto"
        role="dialog"
        aria-modal="true"
        aria-labelledby="action-sheet-title"
      >
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div>
            <h2 id="action-sheet-title" className="text-lg font-bold text-[#182230]">
              Take purposeful action
            </h2>
            <p className="text-xs text-slate-500">
              Turn useful conversations into real collaboration and opportunity.
            </p>
          </div>
          <button
            onClick={() => setIsCreateSheetOpen(false)}
            className="p-1.5 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex flex-col gap-2.5 mt-4">
          {actions.map((act) => {
            const Icon = act.icon;
            return (
              <button
                key={act.title}
                onClick={act.action}
                className="w-full flex items-center justify-between p-3.5 rounded-2xl border border-slate-100 hover:border-slate-200 hover:bg-slate-50 transition-all text-left group"
              >
                <div className="flex items-center gap-3.5">
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${act.color}`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm text-[#182230] group-hover:text-[#145DA0] transition-colors">
                      {act.title}
                    </h3>
                    <p className="text-xs text-slate-500 leading-snug line-clamp-1">
                      {act.description}
                    </p>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-[#145DA0] group-hover:translate-x-0.5 transition-all shrink-0 ml-2" />
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
