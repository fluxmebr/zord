import { AppShell } from '@/components/layout/app-shell'
export default function AuditLayout({ children }: { children: React.ReactNode }) {
  return <AppShell workspaceName="Default Workspace" userName="Analyst" userRole="ANALYST" alertCount={3}>{children}</AppShell>
}
