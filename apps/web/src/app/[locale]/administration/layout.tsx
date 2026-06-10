import { AppShell } from '@/components/layout/app-shell'
export default function AdministrationLayout({ children }: { children: React.ReactNode }) {
  return <AppShell workspaceName="Default Workspace" userName="Admin" userRole="TENANT_ADMIN" alertCount={3}>{children}</AppShell>
}
