import { defineStore } from 'pinia'
import axios from 'axios'

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000'

export const useNotificationStore = defineStore('notification', {
  state: () => ({
    notifications: [],
    unreadCount: 0,
    isLoading: false,
    error: null,
    pollingInterval: null
  }),

  actions: {
    startPolling(intervalMs = 10000) {
      this.fetchNotifications()
      if (this.pollingInterval) clearInterval(this.pollingInterval)
      this.pollingInterval = setInterval(() => {
        this.fetchNotifications()
      }, intervalMs)
    },

    stopPolling() {
      if (this.pollingInterval) {
        clearInterval(this.pollingInterval)
        this.pollingInterval = null
      }
    },
    async fetchNotifications() {
      this.isLoading = true
      this.error = null
      try {
        const response = await axios.get(`${API_BASE}/api/notifications`)
        this.notifications = response.data.items || []
        await this.fetchUnreadCount()
      } catch (err) {
        this.error = err.response?.data?.detail || err.message
      } finally {
        this.isLoading = false
      }
    },

    async fetchUnreadCount() {
      try {
        const response = await axios.get(`${API_BASE}/api/notifications/unread-count`)
        this.unreadCount = response.data.count || 0
      } catch (err) {
        console.error("Failed to fetch unread count", err)
      }
    },

    async markAsRead(id) {
      try {
        await axios.put(`${API_BASE}/api/notifications/${id}/read`)
        // Update local state without refetching all
        const notif = this.notifications.find(n => n.id === id)
        if (notif && !notif.is_read) {
          notif.is_read = true
          if (this.unreadCount > 0) this.unreadCount--
        }
      } catch (err) {
        console.error("Failed to mark as read", err)
      }
    }
  }
})
