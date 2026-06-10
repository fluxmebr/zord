import { AppShell } from '@/components/layout/app-shell'
export default function AlertsLayout({ children }: { children: React.ReactNode }) {
  return <AppShell workspaceName="Default Workspace" userName="Analyst" userRole="ANALYST" alertCount={18}>{children}</AppShell>
}
