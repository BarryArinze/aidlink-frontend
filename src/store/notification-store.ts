import { create } from 'zustand'

export type NotificationType = 'donation' | 'campaign' | 'system' | 'beneficiary' | 'transaction'

export interface Notification {
  id: string
  type: NotificationType
  title: string
  message: string
  timestamp: Date
  read: boolean
  actionUrl?: string
}

interface NotificationStore {
  notifications: Notification[]
  unreadCount: number
  addNotification: (notification: Omit<Notification, 'id' | 'timestamp' | 'read'>) => void
  markAsRead: (id: string) => void
  markAllAsRead: () => void
  removeNotification: (id: string) => void
  clearAll: () => void
}

export const useNotificationStore = create<NotificationStore>((set) => ({
  notifications: [
    {
      id: '1',
      type: 'donation',
      title: 'Donation Received',
      message: 'You received 500 XLM donation for Emergency Relief Campaign',
      timestamp: new Date(Date.now() - 3600000),
      read: false,
      actionUrl: '/dashboard',
    },
    {
      id: '2',
      type: 'campaign',
      title: 'Campaign Milestone',
      message: 'Medical Supplies Campaign reached 88% of its goal!',
      timestamp: new Date(Date.now() - 86400000),
      read: false,
      actionUrl: '/campaigns/2',
    },
    {
      id: '3',
      type: 'system',
      title: 'System Update',
      message: 'Platform maintenance scheduled for tonight at 2 AM UTC',
      timestamp: new Date(Date.now() - 172800000),
      read: true,
    },
  ],
  unreadCount: 2,
  addNotification: (notification) =>
    set((state) => ({
      notifications: [
        {
          ...notification,
          id: Date.now().toString(),
          timestamp: new Date(),
          read: false,
        },
        ...state.notifications,
      ],
      unreadCount: state.unreadCount + 1,
    })),
  markAsRead: (id) =>
    set((state) => ({
      notifications: state.notifications.map((n) =>
        n.id === id ? { ...n, read: true } : n
      ),
      unreadCount: Math.max(0, state.unreadCount - 1),
    })),
  markAllAsRead: () =>
    set((state) => ({
      notifications: state.notifications.map((n) => ({ ...n, read: true })),
      unreadCount: 0,
    })),
  removeNotification: (id) =>
    set((state) => ({
      notifications: state.notifications.filter((n) => n.id !== id),
      unreadCount: state.notifications.find((n) => n.id === id)?.read
        ? state.unreadCount
        : Math.max(0, state.unreadCount - 1),
    })),
  clearAll: () =>
    set({
      notifications: [],
      unreadCount: 0,
    }),
}))
