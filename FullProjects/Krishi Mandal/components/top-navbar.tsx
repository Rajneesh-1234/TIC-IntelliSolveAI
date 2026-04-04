"use client"

import * as React from "react"
import { Bell, Moon, Search, Sun, MessageCircle } from "lucide-react"

import { cn } from "@/lib/utils"
import { useAppStore } from "@/lib/store"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { useTheme } from "next-themes"
import GoogleTranslate from "./GoogleTranslate"

export function TopNavbar() {
  const { theme, setTheme } = useTheme()
  const { notifications, markNotificationRead } = useAppStore()
  const unreadNotifications = notifications.filter(n => !n.read)

  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <header className="sticky top-0 z-40 flex h-16 items-center gap-4 border-b bg-background/95 backdrop-blur px-4 md:px-6">
      
      <SidebarTrigger className="-ml-1" />
      <Separator orientation="vertical" className="h-6" />

      {/* Search */}
      <div className="relative flex-1 max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search crops, farmers, orders..."
          className="pl-10 bg-muted/50 border-0 focus-visible:ring-1"
        />
      </div>

      <div className="flex items-center gap-2 ml-auto">
        
          {/* 🌐 Google Translate (ADD HERE) */}
<div className="mr-2">
  <div className="flex items-center gap-2 bg-muted/70 backdrop-blur border rounded-full px-4 py-1 h-9 shadow-sm hover:bg-muted transition">
    🌐
    <GoogleTranslate />
  </div>
</div>
        {/* Theme Toggle */}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="size-9"
        >
          {mounted && theme === "dark" ? (
            <Sun className="size-4" />
          ) : (
            <Moon className="size-4" />
          )}
          <span className="sr-only">Toggle theme</span>
        </Button>

        {/* Chat */}
        <Button variant="ghost" size="icon" className="size-9 relative">
          <MessageCircle className="size-4" />
          <Badge className="absolute -top-1 -right-1 size-4 p-0 text-[10px] justify-center">
            3
          </Badge>
        </Button>

        {/* Notifications */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="size-9 relative">
              <Bell className="size-4" />
              {unreadNotifications.length > 0 && (
                <Badge className="absolute -top-1 -right-1 size-4 p-0 text-[10px] justify-center">
                  {unreadNotifications.length}
                </Badge>
              )}
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end" className="w-80">
            <DropdownMenuLabel className="flex items-center justify-between">
              Notifications
              {unreadNotifications.length > 0 && (
                <Badge variant="secondary" className="text-xs">
                  {unreadNotifications.length} new
                </Badge>
              )}
            </DropdownMenuLabel>

            <DropdownMenuSeparator />

            {notifications.slice(0, 5).map((notification) => (
              <DropdownMenuItem
                key={notification.id}
                className={cn(
                  "flex flex-col items-start gap-1 p-3 cursor-pointer",
                  !notification.read && "bg-muted/50"
                )}
                onClick={() => markNotificationRead(notification.id)}
              >
                <div className="flex items-center gap-2 w-full">
                  <span className={cn(
                    "size-2 rounded-full",
                    notification.type === 'info' && "bg-secondary",
                    notification.type === 'success' && "bg-primary",
                    notification.type === 'warning' && "bg-yellow-500",
                    notification.type === 'error' && "bg-destructive"
                  )} />
                  <span className="font-medium text-sm">{notification.title}</span>

                  {!notification.read && (
                    <span className="ml-auto size-1.5 rounded-full bg-primary" />
                  )}
                </div>

                <span className="text-xs text-muted-foreground pl-4">
                  {notification.message}
                </span>
              </DropdownMenuItem>
            ))}

            {notifications.length === 0 && (
              <div className="p-4 text-center text-sm text-muted-foreground">
                No notifications
              </div>
            )}

          </DropdownMenuContent>
        </DropdownMenu>

      </div>
    </header>
  )
}