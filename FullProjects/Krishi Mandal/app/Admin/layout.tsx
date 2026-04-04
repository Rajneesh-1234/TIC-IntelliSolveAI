"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard,
  Users,
  CreditCard,
  FileText,
  BarChart3,
  Settings
} from "lucide-react"
import { ThemeProvider } from "@/components/theme-provider" // ✅ import karo

const menuItems = [
  { name: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
  { name: "Users", href: "/admin/users", icon: Users },
  { name: "Subscriptions", href: "/admin/subscriptions", icon: CreditCard },
  { name: "Transactions", href: "/admin/transactions", icon: CreditCard },
  { name: "Reports", href: "/admin/reports", icon: FileText },
  { name: "Analytics", href: "/admin/analytics", icon: BarChart3 },
  { name: "Settings", href: "/admin/settings", icon: Settings },
]

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  return (
    <ThemeProvider attribute="class">  {/* ✅ YAHAN LAGAO */}
      
      <div className="flex h-screen bg-gray-100 dark:bg-gray-900">

        {/* Sidebar */}
        <aside className="w-64 bg-white dark:bg-gray-800 shadow-lg flex flex-col">
          
          <div className="p-5 border-b dark:border-gray-700">
            <h2 className="text-xl font-bold text-green-600">Agri Admin</h2>
          </div>

          <nav className="flex-1 p-4 space-y-2">
            {menuItems.map((item) => {
              const isActive = pathname === item.href
              const Icon = item.icon

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-all
                    ${isActive 
                      ? "bg-green-100 dark:bg-green-900 text-green-600"
                      : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                    }`}
                >
                  <Icon size={18} />
                  {item.name}
                </Link>
              )
            })}
          </nav>

          <div className="p-4 border-t text-sm text-gray-500 dark:text-gray-400 dark:border-gray-700">
            © 2026 Smart Agri
          </div>
        </aside>

        {/* Main */}
        <div className="flex-1 flex flex-col">

          {/* Navbar */}
          <header className="bg-white dark:bg-gray-800 px-6 py-3 shadow flex justify-between items-center">
            <input
              placeholder="Search..."
              className="border px-4 py-2 rounded-lg w-64 
              focus:outline-none focus:ring-2 focus:ring-green-400
              dark:bg-gray-700 dark:text-white dark:border-gray-600"
            />
            <div className="font-medium dark:text-white">Admin 👤</div>
          </header>

          {/* Content */}
          <main className="p-6 overflow-y-auto text-gray-900 dark:text-gray-100">
            {children}
          </main>

        </div>
      </div>

    </ThemeProvider>
  )
}

