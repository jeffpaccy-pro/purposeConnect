import React, { useState } from 'react';
import { Send, MessageSquare, ShieldCheck, User } from 'lucide-react';
import { useApp } from '../lib/store';
import { Conversation, Profile } from '../types/database';

export const Messages: React.FC = () => {
  const {
    conversations,
    activeConversation,
    setActiveConversation,
    sendMessage,
    currentUser,
    allUsers,
    navigate,
  } = useApp();

  const [inputMessage, setInputMessage] = useState('');

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim() || !activeConversation) return;
    sendMessage(activeConversation.id, inputMessage.trim());
    setInputMessage('');
  };

  const otherUser: Profile | undefined = activeConversation?.other_user;

  return (
    <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs overflow-hidden flex flex-col md:flex-row h-[calc(100vh-8rem)] min-h-[500px]">
      {/* Left List of Conversations */}
      <div className="w-full md:w-80 border-r border-slate-200/80 flex flex-col h-full bg-[#F7F9FC]/60">
        <div className="p-4 border-b border-slate-200/80 bg-white">
          <div className="flex items-center justify-between">
            <h1 className="font-bold text-base text-[#182230] flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-[#145DA0]" />
              <span>Direct Messages</span>
            </h1>
            <span className="text-[11px] font-semibold text-slate-400">
              {conversations.length} chats
            </span>
          </div>
          <p className="text-[11px] text-slate-500 mt-1">
            Privacy-first messaging. No cold-outreach spam.
          </p>
        </div>

        <div className="flex-1 overflow-y-auto divide-y divide-slate-100">
          {conversations.length === 0 ? (
            <div className="p-8 text-center text-xs text-slate-400">
              No active conversations yet. Visit someone&apos;s profile to connect.
            </div>
          ) : (
            conversations.map((conv) => {
              const isActive = activeConversation?.id === conv.id;
              const target = conv.other_user || allUsers[0];
              return (
                <button
                  key={conv.id}
                  onClick={() => setActiveConversation(conv)}
                  className={`w-full p-4 flex items-center gap-3 text-left transition-colors ${
                    isActive ? 'bg-white border-l-4 border-l-[#145DA0] shadow-xs' : 'hover:bg-white/80'
                  }`}
                >
                  <img
                    src={target.avatar_url}
                    alt={target.full_name}
                    className="w-10 h-10 rounded-full object-cover shrink-0 border border-slate-200"
                    referrerPolicy="no-referrer"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="font-bold text-xs text-[#182230] truncate">{target.full_name}</p>
                      <span className="text-[10px] text-slate-400">
                        {conv.last_message
                          ? new Date(conv.last_message.created_at).toLocaleTimeString([], {
                              hour: '2-digit',
                              minute: '2-digit',
                            })
                          : ''}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500 truncate mt-0.5">
                      {conv.last_message ? conv.last_message.body : 'Start conversation...'}
                    </p>
                  </div>
                </button>
              );
            })
          )}
        </div>
      </div>

      {/* Right Chat Panel */}
      <div className="flex-1 flex flex-col h-full bg-white">
        {activeConversation && otherUser ? (
          <>
            {/* Chat Header */}
            <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-white z-10">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => navigate(`/profile/${otherUser.username}`)}
                  className="rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#145DA0]"
                >
                  <img
                    src={otherUser.avatar_url}
                    alt={otherUser.full_name}
                    className="w-9 h-9 rounded-full object-cover border border-slate-200"
                    referrerPolicy="no-referrer"
                  />
                </button>
                <div>
                  <button
                    onClick={() => navigate(`/profile/${otherUser.username}`)}
                    className="font-bold text-xs sm:text-sm text-[#182230] hover:text-[#145DA0] transition-colors block text-left"
                  >
                    {otherUser.full_name}
                  </button>
                  <p className="text-[11px] text-slate-400">@{otherUser.username} · {otherUser.location || 'Rwanda'}</p>
                </div>
              </div>

              <button
                onClick={() => navigate(`/profile/${otherUser.username}`)}
                className="text-xs font-semibold text-[#145DA0] hover:underline flex items-center gap-1"
              >
                <User className="w-3.5 h-3.5" />
                <span>View Profile</span>
              </button>
            </div>

            {/* Messages Scroll View */}
            <div className="flex-1 p-6 overflow-y-auto space-y-4 bg-[#F7F9FC]/30">
              {/* Privacy Notice Pill */}
              <div className="max-w-md mx-auto text-center p-2.5 rounded-xl bg-slate-100/70 text-[11px] text-slate-500 flex items-center justify-center gap-1.5 border border-slate-200/60">
                <ShieldCheck className="w-3.5 h-3.5 text-[#16A34A]" />
                <span>End-to-end purpose alignment. Messages are strictly private.</span>
              </div>

              {/* Sample Dialog Exchange */}
              <div className="flex flex-col gap-3">
                <div className="flex items-end gap-2 max-w-[80%] self-start">
                  <img
                    src={otherUser.avatar_url}
                    alt={otherUser.full_name}
                    className="w-7 h-7 rounded-full object-cover shrink-0 mb-1"
                    referrerPolicy="no-referrer"
                  />
                  <div className="bg-white border border-slate-200/80 rounded-2xl rounded-bl-xs p-3 text-xs text-slate-800 shadow-2xs">
                    <p>
                      Hello! Thanks for reaching out. Are you planning to join the Python study session this afternoon?
                    </p>
                    <span className="text-[9px] text-slate-400 mt-1 block">10:14 AM</span>
                  </div>
                </div>

                <div className="flex items-end gap-2 max-w-[80%] self-end">
                  <div className="bg-[#145DA0] text-white rounded-2xl rounded-br-xs p-3 text-xs shadow-2xs">
                    <p>
                      Yes! I am reviewing the Git workbook now and have a couple of questions about the CSV parser logic.
                    </p>
                    <span className="text-[9px] text-blue-200 mt-1 block text-right">10:18 AM</span>
                  </div>
                </div>

                {activeConversation.last_message && (
                  <div className="flex items-end gap-2 max-w-[80%] self-start">
                    <img
                      src={otherUser.avatar_url}
                      alt={otherUser.full_name}
                      className="w-7 h-7 rounded-full object-cover shrink-0 mb-1"
                      referrerPolicy="no-referrer"
                    />
                    <div className="bg-white border border-slate-200/80 rounded-2xl rounded-bl-xs p-3 text-xs text-slate-800 shadow-2xs">
                      <p>{activeConversation.last_message.body}</p>
                      <span className="text-[9px] text-slate-400 mt-1 block">Just now</span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Message Input Composer */}
            <form onSubmit={handleSend} className="p-3 border-t border-slate-100 flex items-center gap-2 bg-white">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder={`Message ${otherUser.full_name.split(' ')[0]}...`}
                className="flex-1 bg-[#F7F9FC] border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-[#182230] focus:ring-2 focus:ring-[#145DA0] focus:bg-white focus:outline-none transition-all"
              />
              <button
                type="submit"
                disabled={!inputMessage.trim()}
                className="p-2.5 bg-[#145DA0] hover:bg-[#0f487e] disabled:opacity-40 text-white rounded-xl shadow-xs transition-colors shrink-0"
                aria-label="Send message"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center p-8 text-center text-slate-400">
            <MessageSquare className="w-10 h-10 text-slate-300 mb-2" />
            <p className="font-bold text-sm text-[#182230]">Select a conversation</p>
            <p className="text-xs text-slate-500 mt-1 max-w-xs">
              Choose someone from the list on the left to start sending purposeful messages.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
