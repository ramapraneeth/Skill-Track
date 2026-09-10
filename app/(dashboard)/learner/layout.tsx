import { PortalLayout } from '@/components/layout/PortalLayout';

export default function LearnerLayout({ children }: { children: React.ReactNode }) {
  return <PortalLayout forcedRole="learner">{children}</PortalLayout>;
}
