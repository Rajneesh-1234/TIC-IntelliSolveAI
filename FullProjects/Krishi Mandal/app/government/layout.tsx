import { DashboardLayout } from "@/components/dashboard-layout"

export default function GovernmentLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <DashboardLayout>{children}</DashboardLayout>
}
