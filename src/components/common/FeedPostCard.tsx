import React, { useState } from 'react';
import {
  MessageCircle,
  Bookmark,
  Share2,
  HelpCircle,
  MoreHorizontal,
  Clock,
  Sparkles,
  Send,
  Flag,
  UserX,
} from 'lucide-react';
import { Post, Profile } from '../../types/database';
import { useApp } from '../../lib/store';
import { MeaningfulReactionBar } from './MeaningfulReactionBar';
import { WhyThisPostDialog } from './WhyThisPostDialog';
import { ReportDialog } from './ReportDialog';
import { BlockUserDialog } from './BlockUserDialog';

interface FeedPostCardProps {
  post: Post;
}

export const FeedPostCard: React.FC<FeedPostCardProps> = ({ post }) => {
  const {
    allUsers,
    communities,
    toggleReaction,
    toggleSavePost,
    addComment,
    addToast,
    navigate,
    currentUser,
  } = useApp();

  const [isWhyOpen, setIsWhyOpen] = useState(false);
  const [isReportOpen, setIsReportOpen] = useState(false);
  const [isBlockOpen, setIsBlockOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [commentText, setCommentText] = useState('');

  const author: Profile =
    allUsers.find((u) => u.id === post.author_id) || {
      id: post.author_id,
      username: 'member',
      full_name: 'Community Member',
      avatar_url: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=256&h=256&q=80',
      onboarding_completed: true,
      message_privacy: 'community',
      profile_visibility: 'public',
      created_at: '',
      updated_at: '',
    };

  const community = communities.find((c) => c.id === post.community_id);

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.origin + `/home#${post.id}`);
    addToast('Post link copied to clipboard');
  };

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    addComment(post.id, commentText);
    setCommentText('');
  };

  return (
    <article className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs hover:border-slate-300/80 transition-all">
      {/* Header: Author & Context */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate(`/profile/${author.username}`)}
            className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#145DA0] rounded-full shrink-0"
          >
            <img
              src={author.avatar_url || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=256&h=256&q=80'}
              alt={author.full_name}
              className="w-10 h-10 rounded-full object-cover border border-slate-200"
              referrerPolicy="no-referrer"
            />
          </button>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <button
                onClick={() => navigate(`/profile/${author.username}`)}
                className="font-bold text-sm text-[#182230] hover:text-[#145DA0] transition-colors leading-none"
              >
                {author.full_name}
              </button>
              {community && (
                <>
                  <span className="text-slate-300 text-xs">in</span>
                  <button
                    onClick={() => navigate(`/communities/${community.slug}`)}
                    className="text-xs font-semibold text-[#145DA0] hover:underline leading-none"
                  >
                    {community.name}
                  </button>
                </>
              )}
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-400 mt-1">
              <span>@{author.username}</span>
              <span aria-hidden="true">·</span>
              <span>
                {new Date(post.created_at).toLocaleDateString([], {
                  month: 'short',
                  day: 'numeric',
                })}
              </span>
            </div>
          </div>
        </div>

        {/* Top Right: Badges & Menu */}
        <div className="flex items-center gap-2">
          {post.post_type === 'help_request' && (
            <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-amber-800 bg-amber-50 border border-amber-200/80 px-2 py-0.5 rounded-lg">
              <Clock className="w-3 h-3 text-[#F59E0B]" />
              <span>Help Request {post.urgency === 'urgent' ? '· Urgent' : ''}</span>
            </span>
          )}

          {post.post_type === 'resource' && (
            <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#145DA0] bg-blue-50 border border-blue-200/80 px-2 py-0.5 rounded-lg">
              <Sparkles className="w-3 h-3" />
              <span>Resource</span>
            </span>
          )}

          <div className="relative">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition-colors"
              aria-label="Post options"
            >
              <MoreHorizontal className="w-4 h-4" />
            </button>

            {isMenuOpen && (
              <div className="absolute right-0 mt-1 w-44 bg-white border border-slate-200 rounded-xl shadow-lg py-1 z-30 animate-in fade-in">
                <button
                  onClick={() => {
                    setIsWhyOpen(true);
                    setIsMenuOpen(false);
                  }}
                  className="w-full text-left px-3 py-1.5 text-xs text-slate-700 hover:bg-slate-50 flex items-center gap-2"
                >
                  <HelpCircle className="w-3.5 h-3.5 text-slate-400" />
                  <span>Why am I seeing this?</span>
                </button>
                <button
                  onClick={() => {
                    setIsReportOpen(true);
                    setIsMenuOpen(false);
                  }}
                  className="w-full text-left px-3 py-1.5 text-xs text-red-600 hover:bg-red-50 flex items-center gap-2"
                >
                  <Flag className="w-3.5 h-3.5" />
                  <span>Report post</span>
                </button>
                {author.id !== currentUser?.id && (
                  <button
                    onClick={() => {
                      setIsBlockOpen(true);
                      setIsMenuOpen(false);
                    }}
                    className="w-full text-left px-3 py-1.5 text-xs text-slate-700 hover:bg-slate-50 flex items-center gap-2"
                  >
                    <UserX className="w-3.5 h-3.5 text-slate-400" />
                    <span>Block @{author.username}</span>
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Post Body Content */}
      <div className="mt-3.5 text-slate-800 text-sm leading-relaxed whitespace-pre-line">
        {post.body}
      </div>

      {/* Tags */}
      {post.tags && post.tags.length > 0 && (
        <div className="flex flex-wrap items-center gap-2 mt-3 text-xs text-slate-500">
          {post.tags.map((tag, idx) => (
            <span key={idx} className="hover:text-[#145DA0] transition-colors">
              #{tag}
            </span>
          ))}
        </div>
      )}

      {/* Meaningful Reactions Row */}
      <div className="mt-4 pt-3 border-t border-slate-100">
        <MeaningfulReactionBar
          reactions={post.reactions}
          userReactions={post.user_reactions}
          onToggle={(type) => toggleReaction(post.id, type)}
        />
      </div>

      {/* Footer Utility Actions */}
      <div className="mt-3 pt-2.5 flex items-center justify-between text-xs text-slate-500">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowComments(!showComments)}
            className="flex items-center gap-1.5 px-2 py-1 rounded-lg hover:bg-slate-100 hover:text-slate-800 transition-colors"
          >
            <MessageCircle className="w-4 h-4 text-slate-400" />
            <span>
              {post.comments_count > 0 ? `${post.comments_count} responses` : 'Respond'}
            </span>
          </button>

          <button
            onClick={() => toggleSavePost(post.id)}
            className={`flex items-center gap-1.5 px-2 py-1 rounded-lg transition-colors ${
              post.is_saved
                ? 'text-[#145DA0] font-semibold bg-blue-50'
                : 'hover:bg-slate-100 hover:text-slate-800'
            }`}
          >
            <Bookmark className={`w-4 h-4 ${post.is_saved ? 'fill-current' : 'text-slate-400'}`} />
            <span>{post.is_saved ? 'Saved' : 'Save'}</span>
          </button>

          <button
            onClick={handleShare}
            className="flex items-center gap-1.5 px-2 py-1 rounded-lg hover:bg-slate-100 hover:text-slate-800 transition-colors"
          >
            <Share2 className="w-4 h-4 text-slate-400" />
            <span>Share</span>
          </button>
        </div>

        {/* "Why am I seeing this?" Button */}
        <button
          onClick={() => setIsWhyOpen(true)}
          className="flex items-center gap-1 text-[11px] text-[#145DA0] hover:text-[#0f487e] font-medium hover:underline p-1 rounded-md"
        >
          <HelpCircle className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Why this post?</span>
        </button>
      </div>

      {/* Collapsible Comment Section */}
      {showComments && (
        <div className="mt-3 pt-3 border-t border-slate-100 space-y-3">
          <form onSubmit={handleCommentSubmit} className="flex gap-2">
            <input
              type="text"
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              placeholder="Contribute constructive feedback or resources..."
              className="flex-1 bg-[#F7F9FC] border border-slate-200 rounded-xl px-3.5 py-1.5 text-xs text-[#182230] focus:ring-2 focus:ring-[#145DA0] focus:bg-white focus:outline-none"
            />
            <button
              type="submit"
              disabled={!commentText.trim()}
              className="px-3 py-1.5 bg-[#145DA0] hover:bg-[#0f487e] disabled:opacity-50 text-white rounded-xl text-xs font-semibold flex items-center gap-1"
            >
              <Send className="w-3 h-3" />
              <span>Reply</span>
            </button>
          </form>

          {post.comments_count > 0 && (
            <div className="bg-slate-50/70 rounded-xl p-3 text-xs text-slate-600 space-y-2">
              <div className="flex items-center justify-between text-slate-400 text-[11px]">
                <span>Recent peer response</span>
                <span>Today</span>
              </div>
              <p className="text-slate-800">
                “Great question! For the Flexbox overflow issue, make sure your parent container has `overflow-hidden` and the main section has `flex-1 overflow-y-auto min-w-0`.”
              </p>
            </div>
          )}
        </div>
      )}

      {/* Modals */}
      <WhyThisPostDialog post={post} isOpen={isWhyOpen} onClose={() => setIsWhyOpen(false)} />
      <ReportDialog
        targetType="post"
        targetId={post.id}
        isOpen={isReportOpen}
        onClose={() => setIsReportOpen(false)}
      />
      {author.id !== currentUser?.id && (
        <BlockUserDialog
          userToBlock={author}
          isOpen={isBlockOpen}
          onClose={() => setIsBlockOpen(false)}
        />
      )}
    </article>
  );
};
