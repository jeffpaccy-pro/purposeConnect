import React, { useState } from 'react';
import { Briefcase, MapPin, Clock, Bookmark, Send, Globe, CheckCircle2 } from 'lucide-react';
import { OpportunityItem } from '../../types/database';
import { useApp } from '../../lib/store';

interface OpportunityCardProps {
  opportunity: OpportunityItem;
}

export const OpportunityCard: React.FC<OpportunityCardProps> = ({ opportunity }) => {
  const { toggleSaveOpportunity, addToast, communities } = useApp();
  const [hasApplied, setHasApplied] = useState(false);
  const community = communities.find((c) => c.id === opportunity.community_id);

  const typeLabels: Record<string, { label: string; color: string }> = {
    internship: { label: 'Paid Internship', color: 'bg-emerald-50 text-[#16A34A] border-emerald-200' },
    mentorship: { label: 'Mentorship Pod', color: 'bg-blue-50 text-[#145DA0] border-blue-200' },
    collaboration: { label: 'Collaboration', color: 'bg-amber-50 text-amber-800 border-amber-200' },
    job: { label: 'Full/Part-Time Job', color: 'bg-teal-50 text-[#0B7A75] border-teal-200' },
    service: { label: 'Local Service', color: 'bg-slate-100 text-slate-800 border-slate-200' },
    volunteer: { label: 'Volunteer', color: 'bg-purple-50 text-purple-700 border-purple-200' },
  };

  const badge = typeLabels[opportunity.opportunity_type] || {
    label: opportunity.opportunity_type,
    color: 'bg-slate-100 text-slate-700 border-slate-200',
  };

  const handleApply = () => {
    setHasApplied(true);
    addToast(`Application / introduction sent for: ${opportunity.title}`, 'success');
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs hover:border-slate-300 transition-all flex flex-col justify-between">
      <div>
        <div className="flex items-start justify-between gap-3">
          <span className={`text-[11px] font-semibold border px-2.5 py-0.5 rounded-lg ${badge.color}`}>
            {badge.label}
          </span>
          <button
            onClick={() => toggleSaveOpportunity(opportunity.id)}
            className={`p-1.5 rounded-lg hover:bg-slate-100 transition-colors ${
              opportunity.is_saved ? 'text-[#145DA0]' : 'text-slate-400'
            }`}
            aria-label={opportunity.is_saved ? 'Unsave opportunity' : 'Save opportunity'}
          >
            <Bookmark className={`w-4 h-4 ${opportunity.is_saved ? 'fill-current' : ''}`} />
          </button>
        </div>

        <h3 className="mt-3 font-bold text-base text-[#182230] leading-snug">
          {opportunity.title}
        </h3>

        <p className="mt-2 text-xs text-slate-600 leading-relaxed line-clamp-3">
          {opportunity.description}
        </p>

        {/* Required skills */}
        {opportunity.required_skills && opportunity.required_skills.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1.5">
            {opportunity.required_skills.map((skill, idx) => (
              <span
                key={idx}
                className="text-[11px] font-medium bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md"
              >
                {skill}
              </span>
            ))}
          </div>
        )}

        <div className="mt-3.5 flex items-center gap-3 text-xs text-slate-500 flex-wrap">
          {opportunity.is_remote ? (
            <span className="flex items-center gap-1 text-[#0B7A75] font-medium">
              <Globe className="w-3.5 h-3.5" />
              <span>Remote / Flexible</span>
            </span>
          ) : (
            <span className="flex items-center gap-1 text-slate-600">
              <MapPin className="w-3.5 h-3.5 text-slate-400" />
              <span>{opportunity.location || 'Local'}</span>
            </span>
          )}

          {opportunity.deadline && (
            <span className="flex items-center gap-1 text-slate-500">
              <Clock className="w-3.5 h-3.5 text-slate-400" />
              <span>
                Due {new Date(opportunity.deadline).toLocaleDateString([], { month: 'short', day: 'numeric' })}
              </span>
            </span>
          )}
        </div>
      </div>

      <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
        <span className="text-[11px] text-slate-400 font-medium">
          {community ? `In ${community.name}` : 'Verified community post'}
        </span>

        {hasApplied ? (
          <span className="flex items-center gap-1 text-xs font-semibold text-[#16A34A] bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-200">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Applied</span>
          </span>
        ) : (
          <button
            onClick={handleApply}
            className="flex items-center gap-1.5 px-4 py-1.5 bg-[#145DA0] hover:bg-[#0f487e] text-white text-xs font-semibold rounded-xl shadow-xs transition-colors"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Apply / Connect</span>
          </button>
        )}
      </div>
    </div>
  );
};
