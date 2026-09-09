'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function DefaultDashboardRedirect() {
  const router = useRouter();

  useEffect(() => {
    const role = localStorage.getItem('skilltrack_role');
    if (role === 'learner') router.replace('/learner/dashboard');
    else if (role === 'provider') router.replace('/provider/dashboard');
    else router.replace('/government/dashboard');
  }, [router]);

  return (
    <div className="p-8 text-center text-xs text-[#627D98]">
      Navigating to your authorized institutional dashboard...
    </div>
  );
}
