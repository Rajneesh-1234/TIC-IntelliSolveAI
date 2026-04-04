import { DashboardLayout } from "@/components/dashboard-layout"

export default function FarmerLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <DashboardLayout>{children}</DashboardLayout>
}
