import { PortalLayout } from '@/components/layout/PortalLayout';

export default function GovernmentLayout({ children }: { children: React.ReactNode }) {
  return <PortalLayout forcedRole="government">{children}</PortalLayout>;
}
