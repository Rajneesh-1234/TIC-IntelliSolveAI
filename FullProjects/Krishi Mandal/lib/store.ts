"use client"

import { create } from "zustand"
import { persist } from "zustand/middleware"

export type UserRole = "farmer" | "seller" | "government" | "admin"

export interface User {
  id: string
  name: string
  email: string
  role: UserRole
  avatar?: string
  location?: string
}

export interface Notification {
  id: string
  title: string
  message: string
  type: "info" | "success" | "warning" | "error"
  read: boolean
  createdAt: Date
}

interface AppState {
  user: User | null
  role: UserRole
  isAuthenticated: boolean
  notifications: Notification[]
  sidebarOpen: boolean

  setUser: (user: User | null) => void
  setRole: (role: UserRole) => void
  setIsAuthenticated: (auth: boolean) => void
  loginAsAdmin: () => void   // ✅ NEW
  logout: () => void

  addNotification: (
    notification: Omit<Notification, "id" | "createdAt" | "read">
  ) => void
  markNotificationRead: (id: string) => void
  clearNotifications: () => void

  toggleSidebar: () => void
  setSidebarOpen: (open: boolean) => void
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      user: null,

      role: "seller",
      isAuthenticated: false,

      // ✅ ADMIN LOGIN FUNCTION
      loginAsAdmin: () =>
        set({
          role: "admin",
          isAuthenticated: true,
          user: {
            id: "999",
            name: "Admin User",
            email: "admin@smartagri.com",
            role: "admin",
            location: "India",
          },
        }),

      notifications: [],

      sidebarOpen: true,

      setUser: (user) => set({ user }),

      setRole: (role) =>
        set({
          role,
          user: {
            id: "1",
            name: "Demo User",
            email: "demo@smartagri.com",
            role,
            location: "India",
          },
        }),

      setIsAuthenticated: (auth) => set({ isAuthenticated: auth }),

      logout: () =>
        set({
          user: null,
          isAuthenticated: false,
          role: "seller",
        }),

      addNotification: (notification) =>
        set((state) => ({
          notifications: [
            {
              ...notification,
              id: Math.random().toString(36).slice(2),
              createdAt: new Date(),
              read: false,
            },
            ...state.notifications,
          ],
        })),

      markNotificationRead: (id) =>
        set((state) => ({
          notifications: state.notifications.map((n) =>
            n.id === id ? { ...n, read: true } : n
          ),
        })),

      clearNotifications: () => set({ notifications: [] }),

      toggleSidebar: () =>
        set((state) => ({
          sidebarOpen: !state.sidebarOpen,
        })),

      setSidebarOpen: (open) => set({ sidebarOpen: open }),
    }),
    {
      name: "smart-agri-store",
      partialize: (state) => ({
        role: state.role,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
)