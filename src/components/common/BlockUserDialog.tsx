import React from 'react';
import { UserX, X } from 'lucide-react';
import { Profile } from '../../types/database';
import { useApp } from '../../lib/store';

interface BlockUserDialogProps {
  userToBlock: Profile;
  isOpen: boolean;
  onClose: () => void;
}

export const BlockUserDialog: React.FC<BlockUserDialogProps> = ({
  userToBlock,
  isOpen,
  onClose,
}) => {
  const { blockUser } = useApp();

  if (!isOpen) return null;

  const handleConfirm = () => {
    blockUser(userToBlock.id);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="w-full max-w-sm bg-white rounded-2xl shadow-xl p-6 border border-slate-100 animate-in zoom-in-95 duration-150">
        <div className="flex items-start justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-slate-100 text-slate-700 flex items-center justify-center shrink-0">
              <UserX className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-[#182230]">
                Block {userToBlock.full_name}?
              </h3>
              <p className="text-xs text-slate-500">@{userToBlock.username}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="mt-4 text-xs text-slate-600 space-y-2">
          <p>When you block this person:</p>
          <ul className="list-disc pl-4 space-y-1 text-slate-500">
            <li>They cannot send you direct messages.</li>
            <li>Their posts will be hidden from your feed.</li>
            <li>They won&apos;t be notified that you blocked them.</li>
          </ul>
        </div>

        <div className="mt-5 flex items-center justify-end gap-2">
          <button
            onClick={onClose}
            className="px-3.5 py-2 text-xs font-medium text-slate-600 hover:text-slate-800 rounded-xl hover:bg-slate-100"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            className="px-4 py-2 text-xs font-semibold bg-slate-900 text-white rounded-xl hover:bg-slate-800 transition-colors shadow-xs"
          >
            Block User
          </button>
        </div>
      </div>
    </div>
  );
};
