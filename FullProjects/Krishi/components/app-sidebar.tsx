"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard,
  ShoppingBasket,
  FileText,
  Users,
  MapPin,
  MessageSquare,
  Package,
  BarChart3,
  Star,
  Bell,
  User,
  Settings,
  Leaf,
  Building2,
  TrendingUp,
  ClipboardList,
  Shield,
  FileBarChart,
  Search,
  Sprout,
} from "lucide-react"

import { cn } from "@/lib/utils"
import { useAppStore, type UserRole } from "@/lib/store"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

interface NavItem {
  title: string
  href: string
  icon: React.ElementType
  badge?: number
}

const sellerNavItems: NavItem[] = [
  { title: "Dashboard", href: "/seller", icon: LayoutDashboard },
  { title: "Browse Crops", href: "/seller/browse", icon: Search },
  { title: "My Offers", href: "/seller/offers", icon: FileText },
  { title: "Preferred Farmers", href: "/seller/farmers", icon: Users },
  { title: "Map View", href: "/seller/map", icon: MapPin },
  { title: "Chat", href: "/seller/chat", icon: MessageSquare, badge: 3 },
  { title: "Orders", href: "/seller/orders", icon: Package },
  { title: "Analytics", href: "/seller/analytics", icon: BarChart3 },
  { title: "Reviews", href: "/seller/reviews", icon: Star },
]

const farmerNavItems: NavItem[] = [
  { title: "Dashboard", href: "/farmer", icon: LayoutDashboard },
  { title: "My Crops", href: "/farmer/crops", icon: Sprout },
  { title: "Active Listings", href: "/farmer/listings", icon: FileText },
  { title: "Orders", href: "/farmer/orders", icon: Package },
  { title: "Buyers", href: "/farmer/buyers", icon: Users },
  { title: "Map View", href: "/farmer/map", icon: MapPin },
  { title: "Chat", href: "/farmer/chat", icon: MessageSquare, badge: 2 },
  { title: "Analytics", href: "/farmer/analytics", icon: BarChart3 },
  { title: "Reviews", href: "/farmer/reviews", icon: Star },
]

const governmentNavItems: NavItem[] = [
  { title: "Dashboard", href: "/government", icon: LayoutDashboard },
  { title: "Farmers Data", href: "/government/farmers", icon: Users },
  { title: "Sellers Data", href: "/government/sellers", icon: Building2 },
  { title: "Procurement", href: "/government/procurement", icon: ClipboardList },
  { title: "Market Analysis", href: "/government/market", icon: TrendingUp },
  { title: "Map Analytics", href: "/government/map", icon: MapPin },
  { title: "Reports", href: "/government/reports", icon: FileBarChart },
  { title: "Control Panel", href: "/government/control", icon: Shield },
]

const secondaryNavItems: NavItem[] = [
  { title: "Notifications", href: "#notifications", icon: Bell, badge: 5 },
  { title: "Profile", href: "#profile", icon: User },
  { title: "Settings", href: "#settings", icon: Settings },
]

const navItemsByRole: Record<UserRole, NavItem[]> = {
  seller: sellerNavItems,
  farmer: farmerNavItems,
  government: governmentNavItems,
}

const roleLabels: Record<UserRole, { label: string; icon: React.ElementType }> = {
  seller: { label: "Seller Dashboard", icon: ShoppingBasket },
  farmer: { label: "Farmer Dashboard", icon: Leaf },
  government: { label: "Government Portal", icon: Building2 },
}

export function AppSidebar() {
  const pathname = usePathname()
  const { role, user, notifications } = useAppStore()
  const navItems = navItemsByRole[role]
  const roleInfo = roleLabels[role]
  const unreadCount = notifications.filter(n => !n.read).length

  return (
    <Sidebar collapsible="icon" className="border-r-0">
      <SidebarHeader className="border-b border-sidebar-border pb-4">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href={`/${role}`} className="flex items-center gap-3">
                <div className="flex size-10 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                  <Leaf className="size-5" />
                </div>
                <div className="flex flex-col gap-0.5 leading-none">
                  <span className="font-semibold text-base">Smart Agri</span>
                  <span className="text-xs text-sidebar-foreground/70">Connect</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="flex items-center gap-2">
            <roleInfo.icon className="size-3.5" />
            {roleInfo.label}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => {
                const isActive = pathname === item.href || 
                  (item.href !== `/${role}` && pathname.startsWith(item.href))
                return (
                  <SidebarMenuItem key={item.href}>
                    <SidebarMenuButton
                      asChild
                      isActive={isActive}
                      tooltip={item.title}
                    >
                      <Link href={item.href} className="relative">
                        <item.icon className="size-4" />
                        <span>{item.title}</span>
                        {item.badge && (
                          <Badge 
                            variant="default" 
                            className="ml-auto size-5 justify-center rounded-full p-0 text-[10px] bg-primary"
                          >
                            {item.badge}
                          </Badge>
                        )}
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Settings</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {secondaryNavItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild tooltip={item.title}>
                    <Link href={item.href} className="relative">
                      <item.icon className="size-4" />
                      <span>{item.title}</span>
                      {item.title === "Notifications" && unreadCount > 0 && (
                        <Badge 
                          variant="default" 
                          className="ml-auto size-5 justify-center rounded-full p-0 text-[10px] bg-primary"
                        >
                          {unreadCount}
                        </Badge>
                      )}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-sidebar-border pt-4">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" className="cursor-default">
              <Avatar className="size-8">
                <AvatarFallback className="bg-primary/20 text-primary text-sm">
                  {user?.name?.charAt(0) || "U"}
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col gap-0.5 leading-none">
                <span className="font-medium text-sm">{user?.name || "Guest"}</span>
                <span className="text-xs text-sidebar-foreground/70 capitalize">{role}</span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
