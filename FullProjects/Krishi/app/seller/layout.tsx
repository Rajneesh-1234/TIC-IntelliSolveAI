import { DashboardLayout } from "@/components/dashboard-layout"

export default function SellerLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <DashboardLayout>{children}</DashboardLayout>
}
