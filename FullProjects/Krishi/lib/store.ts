"use client"

import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type UserRole = 'farmer' | 'seller' | 'government'

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
  type: 'info' | 'success' | 'warning' | 'error'
  read: boolean
  createdAt: Date
}

interface AppState {
  user: User | null
  role: UserRole
  notifications: Notification[]
  sidebarOpen: boolean
  setUser: (user: User | null) => void
  setRole: (role: UserRole) => void
  addNotification: (notification: Omit<Notification, 'id' | 'createdAt' | 'read'>) => void
  markNotificationRead: (id: string) => void
  clearNotifications: () => void
  toggleSidebar: () => void
  setSidebarOpen: (open: boolean) => void
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      user: {
        id: '1',
        name: 'Demo User',
        email: 'demo@smartagri.com',
        role: 'seller',
        avatar: undefined,
        location: 'Maharashtra, India',
      },
      role: 'seller',
      notifications: [
        {
          id: '1',
          title: 'New Crop Listed',
          message: 'A farmer near you listed fresh tomatoes',
          type: 'info',
          read: false,
          createdAt: new Date(),
        },
        {
          id: '2',
          title: 'Price Alert',
          message: 'Wheat prices dropped by 5% in your region',
          type: 'warning',
          read: false,
          createdAt: new Date(),
        },
        {
          id: '3',
          title: 'Order Completed',
          message: 'Your order #1234 has been delivered',
          type: 'success',
          read: true,
          createdAt: new Date(),
        },
      ],
      sidebarOpen: true,
      setUser: (user) => set({ user }),
      setRole: (role) => set({ role, user: { id: '1', name: 'Demo User', email: 'demo@smartagri.com', role, location: 'Maharashtra, India' } }),
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
      toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
      setSidebarOpen: (open) => set({ sidebarOpen: open }),
    }),
    {
      name: 'smart-agri-store',
      partialize: (state) => ({ role: state.role }),
    }
  )
)
