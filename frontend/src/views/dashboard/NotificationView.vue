<template>
  <DashboardLayout>
    <div class="notification-page">

      <h1>🔔 Notifikasi</h1>

      <div v-if="notificationStore.isLoading" class="loading-state">
        Memuat notifikasi...
      </div>

      <div v-else-if="notificationStore.error" class="error-state">
        {{ notificationStore.error }}
      </div>

      <div v-else-if="notifications.length === 0" class="empty-state">
        Tidak ada notifikasi saat ini.
      </div>

      <div v-else class="notification-list">

        <div
          v-for="notif in notifications"
          :key="notif.id"
          class="notification-card"
          :class="{ 'unread': !notif.is_read }"
        >
          <div class="notif-header">
            <h3>{{ notif.title }}</h3>
            <span class="badge" v-if="!notif.is_read">Baru</span>
          </div>

          <p>{{ notif.message }}</p>

          <small>{{ formatDate(notif.created_at) }}</small>

          <button
            v-if="!notif.is_read"
            @click="markAsRead(notif.id)"
          >
            Tandai Dibaca
          </button>

        </div>

      </div>

    </div>
  </DashboardLayout>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import DashboardLayout from '@/layouts/DashboardLayout.vue'
import { useNotificationStore } from '@/stores/notificationStore'

const notificationStore = useNotificationStore()

onMounted(() => {
  notificationStore.fetchNotifications()
})

const notifications = computed(() => notificationStore.notifications)

const markAsRead = async (id) => {
  await notificationStore.markAsRead(id)
}

const formatDate = (dateString) => {
  if (!dateString) return ''
  const date = new Date(dateString)
  return new Intl.DateTimeFormat('id-ID', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(date)
}
</script>

<style scoped>

.notification-page {
  padding: 24px;
}

.loading-state, .error-state, .empty-state {
  margin-top: 20px;
  padding: 20px;
  background: white;
  border-radius: 12px;
  text-align: center;
  color: #666;
}

.error-state {
  color: #dc2626;
  background: #fef2f2;
}

.notification-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-top: 20px;
}

.notification-card {
  background: white;
  padding: 20px;
  border-radius: 12px;
  border: 1px solid #ddd;
  transition: all 0.2s;
}

.notification-card.unread {
  background: #f0f9ff;
  border-color: #bae6fd;
}

.notif-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}

.badge {
  background: #0ea5e9;
  color: white;
  font-size: 10px;
  padding: 2px 8px;
  border-radius: 10px;
  font-weight: bold;
}

button {
  margin-top: 10px;
  padding: 8px 12px;
  border: none;
  border-radius: 8px;
  background: #0ea5e9;
  color: white;
  cursor: pointer;
  font-size: 12px;
}

button:hover {
  background: #0284c7;
}

</style>