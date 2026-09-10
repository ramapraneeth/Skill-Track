'use client';

import React from 'react';
import { TopNavbar } from './TopNavbar';

interface PortalLayoutProps {
  children: React.ReactNode;
  forcedRole?: 'learner' | 'trainer' | 'government';
}

export const PortalLayout: React.FC<PortalLayoutProps> = ({ children, forcedRole }) => {
  return (
    <div className="min-h-screen flex flex-col bg-[#F5F9FD] text-[#0B2D4F]">
      {/* Top Navbar on EVERY Page - Strict ZERO Sidebar layout */}
      <TopNavbar forcedRole={forcedRole} />

      {/* Main Full-Width Content Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8">
        {children}
      </main>
    </div>
  );
};
