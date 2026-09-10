'use client';

import React from 'react';
import { TopNavbar } from './TopNavbar';

interface PortalLayoutProps {
  children: React.ReactNode;
  forcedRole?: 'learner' | 'trainer' | 'government';
}

export const PortalLayout: React.FC<PortalLayoutProps> = ({ children, forcedRole }) => {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      {/* Top Navbar on EVERY Page - Strict ZERO Sidebar layout */}
      <TopNavbar forcedRole={forcedRole} />

      {/* Main Spacious Centered Content Container */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {children}
      </main>
    </div>
  );
};
