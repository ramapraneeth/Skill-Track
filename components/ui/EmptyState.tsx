import React from 'react';
import { LucideIcon, Inbox } from 'lucide-react';

import Link from 'next/link';

interface EmptyStateAction {
  label: string;
  href?: string;
  onClick?: () => void;
}

interface EmptyStateProps {
  title: string;
  description: string;
  icon?: LucideIcon | React.ComponentType<{ className?: string }> | string | React.ReactNode;
  action?: React.ReactNode | EmptyStateAction;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title,
  description,
  icon,
  action,
}) => {
  const renderIcon = () => {
    if (!icon) return <Inbox className="w-6 h-6" />;
    if (typeof icon === 'string') {
      return <span className="text-2xl leading-none">{icon}</span>;
    }
    if (React.isValidElement(icon)) {
      return icon;
    }
    const IconComp = icon as React.ComponentType<{ className?: string }>;
    return <IconComp className="w-6 h-6" />;
  };

  const renderAction = () => {
    if (!action) return null;
    if (React.isValidElement(action)) return action;
    if (typeof action === 'object' && 'label' in action) {
      const act = action as EmptyStateAction;
      if (act.href) {
        return (
          <Link
            href={act.href}
            className="inline-flex items-center justify-center px-4 py-2 text-xs font-semibold text-white bg-[#0B3B60] hover:bg-[#082a47] rounded-md shadow-xs transition-colors"
          >
            {act.label}
          </Link>
        );
      }
      if (act.onClick) {
        return (
          <button
            onClick={act.onClick}
            className="inline-flex items-center justify-center px-4 py-2 text-xs font-semibold text-white bg-[#0B3B60] hover:bg-[#082a47] rounded-md shadow-xs transition-colors"
          >
            {act.label}
          </button>
        );
      }
    }
    return null;
  };

  return (
    <div className="bg-white border border-[#CBD5E1] rounded-lg p-10 text-center flex flex-col items-center justify-center space-y-3 shadow-xs">
      <div className="w-12 h-12 rounded-full bg-[#F1F5F9] text-[#64748B] flex items-center justify-center">
        {renderIcon()}
      </div>
      <h3 className="text-base font-bold text-[#1E293B]">{title}</h3>
      <p className="text-xs text-[#64748B] max-w-sm">{description}</p>
      {action && <div className="pt-2">{renderAction()}</div>}
    </div>
  );
};

