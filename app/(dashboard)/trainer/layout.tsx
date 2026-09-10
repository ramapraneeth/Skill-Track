import { PortalLayout } from '@/components/layout/PortalLayout';

export default function TrainerLayout({ children }: { children: React.ReactNode }) {
  return <PortalLayout forcedRole="trainer">{children}</PortalLayout>;
}
