'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { GovTechHeader } from './GovTechHeader';
import { Sidebar } from './Sidebar';
import { UserRole } from '@/types/auth';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const router = useRouter();
  const [user, setUser] = useState<{ fullName: string; role: string } | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem('skilltrack_user');
    if (saved) {
      try {
        setUser(JSON.parse(saved));
      } catch {}
    } else {
      // Default demo session for viewing if not authenticated
      setUser({
        fullName: 'Dr. Rajiv Kumar',
        role: 'government',
      });
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('skilltrack_token');
    localStorage.removeItem('skilltrack_user');
    localStorage.removeItem('skilltrack_role');
    router.push('/');
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC]">
      <GovTechHeader user={user} onLogout={handleLogout} />
      <div className="flex-1 flex max-w-7xl w-full mx-auto">
        <Sidebar role={(user?.role as UserRole) || 'government'} onLogout={handleLogout} />
        <main className="flex-1 p-6 md:p-8 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
};
