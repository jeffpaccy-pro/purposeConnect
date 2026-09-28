import React from 'react';
import { ThumbsUp, BookOpen, Bookmark, ShieldCheck, HelpCircle } from 'lucide-react';
import { ReactionType } from '../../types/database';

interface MeaningfulReactionBarProps {
  reactions: Record<ReactionType, number>;
  userReactions: ReactionType[];
  onToggle: (type: ReactionType) => void;
}

export const MeaningfulReactionBar: React.FC<MeaningfulReactionBarProps> = ({
  reactions,
  userReactions,
  onToggle,
}) => {
  const reactionConfig: {
    type: ReactionType;
    label: string;
    icon: React.ComponentType<{ className?: string }>;
    activeColor: string;
    activeBg: string;
  }[] = [
    {
      type: 'helpful',
      label: 'Helpful',
      icon: ThumbsUp,
      activeColor: 'text-[#16A34A]',
      activeBg: 'bg-emerald-50 border-emerald-200',
    },
    {
      type: 'learned',
      label: 'I learned this',
      icon: BookOpen,
      activeColor: 'text-[#145DA0]',
      activeBg: 'bg-blue-50 border-blue-200',
    },
    {
      type: 'interested',
      label: 'Interested',
      icon: Bookmark,
      activeColor: 'text-[#F59E0B]',
      activeBg: 'bg-amber-50 border-amber-200',
    },
    {
      type: 'trusted',
      label: 'Trusted source',
      icon: ShieldCheck,
      activeColor: 'text-[#0B7A75]',
      activeBg: 'bg-teal-50 border-teal-200',
    },
    {
      type: 'needs_checking',
      label: 'Needs checking',
      icon: HelpCircle,
      activeColor: 'text-amber-700',
      activeBg: 'bg-amber-100/50 border-amber-300',
    },
  ];

  return (
    <div className="flex flex-wrap items-center gap-1.5 pt-2">
      {reactionConfig.map(({ type, label, icon: Icon, activeColor, activeBg }) => {
        const count = reactions[type] || 0;
        const isActive = userReactions.includes(type);

        return (
          <button
            key={type}
            onClick={() => onToggle(type)}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg border text-xs font-medium transition-all ${
              isActive
                ? `${activeBg} ${activeColor} border-current shadow-2xs`
                : 'border-slate-200/80 bg-white hover:bg-slate-50 text-slate-600'
            }`}
            title={`React with "${label}"`}
          >
            <Icon className={`w-3.5 h-3.5 ${isActive ? activeColor : 'text-slate-400'}`} />
            <span>{label}</span>
            {count > 0 && (
              <span className={`text-[11px] font-mono tabular-nums ${isActive ? activeColor : 'text-slate-400'}`}>
                {count}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
};
