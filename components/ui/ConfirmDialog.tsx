import React from 'react';
import { AlertTriangle, X } from 'lucide-react';

interface ConfirmDialogProps {
  isOpen: boolean;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  type?: 'danger' | 'warning' | 'primary';
  onConfirm: () => void;
  onCancel: () => void;
}

export const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
  isOpen,
  title,
  message,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  type = 'primary',
  onConfirm,
  onCancel,
}) => {
  if (!isOpen) return null;

  const btnColors = {
    danger: 'bg-rose-600 hover:bg-rose-700 text-white',
    warning: 'bg-amber-600 hover:bg-amber-700 text-white',
    primary: 'bg-[#0B3B60] hover:bg-[#002541] text-white',
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in duration-150">
      <div className="bg-white border border-[#CBD5E1] rounded-lg shadow-2xl max-w-md w-full p-5 space-y-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2 text-[#0F172A]">
            <div className="w-8 h-8 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center shrink-0">
              <AlertTriangle className="w-4 h-4" />
            </div>
            <h3 className="font-bold text-base">{title}</h3>
          </div>
          <button onClick={onCancel} className="text-[#94A3B8] hover:text-[#0F172A] p-1">
            <X className="w-4 h-4" />
          </button>
        </div>

        <p className="text-xs text-[#475569] leading-relaxed">{message}</p>

        <div className="flex items-center justify-end gap-2.5 pt-2 border-t border-[#E2E8F0]">
          <button
            onClick={onCancel}
            className="px-4 py-2 rounded text-xs font-semibold border border-[#CBD5E1] text-[#334155] hover:bg-[#F1F5F9] transition-colors"
          >
            {cancelText}
          </button>
          <button
            onClick={onConfirm}
            className={`px-4 py-2 rounded text-xs font-bold transition-colors ${btnColors[type]}`}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};
