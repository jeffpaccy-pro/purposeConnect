import React from 'react';
import { Users, MapPin, ArrowRight, Check } from 'lucide-react';
import { Community } from '../../types/database';
import { useApp } from '../../lib/store';

interface CommunityCardProps {
  community: Community;
}

export const CommunityCard: React.FC<CommunityCardProps> = ({ community }) => {
  const { navigate, joinCommunity, leaveCommunity } = useApp();

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-xs hover:border-slate-300 transition-all flex flex-col justify-between group">
      <div>
        <div className="h-28 w-full relative bg-slate-100 overflow-hidden">
          <img
            src={
              community.cover_image_url ||
              'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=800&q=80'
            }
            alt={community.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent" />
          <div className="absolute bottom-2.5 left-3.5 right-3.5 flex items-center justify-between text-white text-xs">
            <span className="font-semibold px-2 py-0.5 rounded-md bg-black/40 backdrop-blur-xs">
              {community.category}
            </span>
            {community.location && (
              <span className="flex items-center gap-1 text-[11px] drop-shadow-xs">
                <MapPin className="w-3 h-3" />
                {community.location}
              </span>
            )}
          </div>
        </div>

        <div className="p-4">
          <button
            onClick={() => navigate(`/communities/${community.slug}`)}
            className="font-bold text-base text-[#182230] group-hover:text-[#145DA0] transition-colors text-left block"
          >
            {community.name}
          </button>
          <p className="mt-1 text-xs text-slate-500 line-clamp-2 leading-relaxed">
            {community.description}
          </p>
        </div>
      </div>

      <div className="px-4 pb-4 pt-2 border-t border-slate-100 flex items-center justify-between">
        <div className="flex items-center gap-1.5 text-xs text-slate-400 font-medium">
          <Users className="w-3.5 h-3.5" />
          <span>{community.member_count || 120} members</span>
        </div>

        <div className="flex items-center gap-2">
          {community.is_joined ? (
            <button
              onClick={() => leaveCommunity(community.id)}
              className="flex items-center gap-1 px-3 py-1.5 rounded-xl border border-emerald-300 bg-emerald-50 text-[#16A34A] text-xs font-semibold hover:bg-emerald-100 transition-colors"
            >
              <Check className="w-3.5 h-3.5" />
              <span>Joined</span>
            </button>
          ) : (
            <button
              onClick={() => joinCommunity(community.id)}
              className="px-3.5 py-1.5 rounded-xl bg-[#145DA0] hover:bg-[#0f487e] text-white text-xs font-semibold transition-colors shadow-2xs"
            >
              Join
            </button>
          )}

          <button
            onClick={() => navigate(`/communities/${community.slug}`)}
            className="p-1.5 text-slate-400 hover:text-[#145DA0] rounded-lg hover:bg-slate-100 transition-colors"
            aria-label="View community details"
          >
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
