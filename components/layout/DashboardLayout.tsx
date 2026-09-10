'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { GovTechHeader } from './GovTechHeader';
import { Sidebar } from './Sidebar';
import { UserRole } from '@/types/auth';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const router = useRouter();
  const pathname = usePathname();
  const [user, setUser] = useState<{ fullName: string; role: string } | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem('skilltrack_user');
    if (saved) {
      try {
        setUser(JSON.parse(saved));
        return;
      } catch {}
    }

    // Contextual fallback based on path
    if (pathname.includes('/student/')) {
      setUser({ fullName: 'Rahul Sharma', role: 'student' });
    } else if (pathname.includes('/trainer/')) {
      setUser({ fullName: 'Prof. Rajesh Nair', role: 'trainer' });
    } else {
      setUser({ fullName: 'Dr. Rajiv Kumar', role: 'government' });
    }
  }, [pathname]);

  const handleLogout = () => {
    localStorage.removeItem('skilltrack_token');
    localStorage.removeItem('skilltrack_user');
    localStorage.removeItem('skilltrack_role');
    router.push('/');
  };

  const detectedRole = (user?.role as UserRole) || (pathname.includes('/student/') ? 'student' : pathname.includes('/trainer/') ? 'trainer' : 'government');

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC]">
      <GovTechHeader user={user} onLogout={handleLogout} />
      <div className="flex-1 flex max-w-7xl w-full mx-auto">
        <Sidebar role={detectedRole} onLogout={handleLogout} />
        <main className="flex-1 p-4 md:p-6 lg:p-8 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
};
