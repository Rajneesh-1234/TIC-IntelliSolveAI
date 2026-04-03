"use client"

import * as React from "react"
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { TopNavbar } from "@/components/top-navbar"
import { Button } from "@/components/ui/button"
import { MessageCircle } from "lucide-react"

interface DashboardLayoutProps {
  children: React.ReactNode
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <TopNavbar />
        <main className="flex-1 overflow-auto">
          <div className="container mx-auto p-4 md:p-6 lg:p-8 max-w-7xl">
            {children}
          </div>
        </main>
        
        {/* Floating Chat Button */}
        <Button
          size="lg"
          className="fixed bottom-6 right-6 size-14 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 z-50"
        >
          <MessageCircle className="size-6" />
          <span className="sr-only">Open Chat</span>
        </Button>
      </SidebarInset>
    </SidebarProvider>
  )
}
