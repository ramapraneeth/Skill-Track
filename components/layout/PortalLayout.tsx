'use client';

import React, { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { PortalTopbar } from './PortalTopbar';
import { PortalSidebar } from './PortalSidebar';

interface PortalLayoutProps {
  children: React.ReactNode;
  forcedRole?: 'learner' | 'trainer' | 'government';
}

export const PortalLayout: React.FC<PortalLayoutProps> = ({ children, forcedRole }) => {
  const router = useRouter();
  const pathname = usePathname() || '';
  const [user, setUser] = useState<{ fullName: string; role: 'learner' | 'trainer' | 'government' } | null>(() => {
    if (forcedRole === 'trainer') return { fullName: 'Prof. Rajesh Nair', role: 'trainer' };
    if (forcedRole === 'government') return { fullName: 'Dr. Rajiv Kumar, IAS', role: 'government' };
    return { fullName: 'Arjun Patel', role: 'learner' };
  });

  useEffect(() => {
    const saved = localStorage.getItem('skilltrack_user');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        let normalizedRole: 'learner' | 'trainer' | 'government' = forcedRole || 'learner';
        if (parsed.role === 'trainer' || parsed.role === 'provider') normalizedRole = 'trainer';
        else if (parsed.role === 'government' || parsed.role === 'admin') normalizedRole = 'government';
        else if (forcedRole) normalizedRole = forcedRole;
        else normalizedRole = 'learner';

        setUser({ fullName: parsed.fullName || 'Authorized User', role: normalizedRole });
        return;
      } catch {}
    }

    if (forcedRole) {
      if (forcedRole === 'trainer') setUser({ fullName: 'Prof. Rajesh Nair', role: 'trainer' });
      else if (forcedRole === 'government') setUser({ fullName: 'Dr. Rajiv Kumar, IAS', role: 'government' });
      else setUser({ fullName: 'Arjun Patel', role: 'learner' });
    } else {
      if (pathname.startsWith('/trainer')) {
        setUser({ fullName: 'Prof. Rajesh Nair', role: 'trainer' });
      } else if (pathname.startsWith('/government')) {
        setUser({ fullName: 'Dr. Rajiv Kumar, IAS', role: 'government' });
      } else {
        setUser({ fullName: 'Arjun Patel', role: 'learner' });
      }
    }
  }, [pathname, forcedRole]);

  const handleLogout = () => {
    localStorage.removeItem('skilltrack_token');
    localStorage.removeItem('skilltrack_user');
    localStorage.removeItem('skilltrack_role');
    router.push('/login');
  };

  const detectedRole: 'learner' | 'trainer' | 'government' = forcedRole
    ? forcedRole
    : pathname.startsWith('/trainer')
    ? 'trainer'
    : pathname.startsWith('/government')
    ? 'government'
    : 'learner';

  const activeRole = user?.role || detectedRole;

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors">
      <PortalTopbar user={user} onLogout={handleLogout} />
      <div className="flex-1 flex max-w-7xl w-full mx-auto">
        <PortalSidebar currentRole={activeRole} onLogout={handleLogout} />
        <main className="flex-1 p-4 md:p-6 lg:p-8 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
};
