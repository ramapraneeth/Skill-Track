import React from 'react';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  badge?: string;
  breadcrumbs?: { label: string; href?: string }[];
  actions?: React.ReactNode;
}

export const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  subtitle,
  badge,
  breadcrumbs,
  actions,
}) => {
  return (
    <div className="bg-white border border-[#CBD5E1] rounded-lg p-5 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div>
        {breadcrumbs && breadcrumbs.length > 0 && (
          <nav className="flex items-center gap-1.5 text-xs text-[#64748B] mb-1.5">
            {breadcrumbs.map((b, idx) => (
              <React.Fragment key={idx}>
                {idx > 0 && <ChevronRight className="w-3.5 h-3.5" />}
                {b.href ? (
                  <Link href={b.href} className="hover:text-[#0B3B60] transition-colors">
                    {b.label}
                  </Link>
                ) : (
                  <span className="font-semibold text-[#1E293B]">{b.label}</span>
                )}
              </React.Fragment>
            ))}
          </nav>
        )}

        <div className="flex items-center gap-2.5 flex-wrap">
          <h1 className="text-xl font-bold text-[#0F172A] tracking-tight">{title}</h1>
          {badge && (
            <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-[#E0F2FE] text-[#0369A1] border border-[#BAE6FD] uppercase tracking-wider">
              {badge}
            </span>
          )}
        </div>

        {subtitle && <p className="text-xs text-[#64748B] mt-1 max-w-3xl leading-relaxed">{subtitle}</p>}
      </div>

      {actions && <div className="flex items-center gap-2.5 shrink-0 flex-wrap">{actions}</div>}
    </div>
  );
};
