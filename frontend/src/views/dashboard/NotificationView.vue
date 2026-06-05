<<<<<<< HEAD
﻿<template>
  <DashboardLayout>
    <div class="notification-page">
      <div class="page-header">
        <h1 class="page-title">Notifikasi</h1>
        <p class="page-subtitle">Pembaruan aktivitas dan informasi terbaru Anda.</p>
      </div>

      <div class="notification-list">
        <div v-if="notifications.length === 0" class="empty-state">
          <div class="empty-icon">??</div>
          <h3>Tidak Ada Notifikasi</h3>
          <p>Anda belum memiliki notifikasi baru saat ini.</p>
        </div>

        <div
          v-else
          v-for="notif in notifications"
          :key="notif.id"
          class="notification-card"
          :class="{ 'notification-card--unread': !notif.read }"
        >
          <div class="notification-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div class="notification-content">
            <div class="notification-header">
              <h3 class="notification-title">{{ notif.title }}</h3>
              <span class="notification-time">{{ notif.time }}</span>
            </div>
            <p class="notification-desc">{{ notif.message }}</p>
            <div v-if="!notif.read" class="notification-actions">
              <button class="btn btn--secondary btn--sm" @click="markAsRead(notif.id)">
                Tandai Dibaca
              </button>
            </div>
          </div>
          <div v-if="!notif.read" class="unread-dot"></div>
        </div>
      </div>
=======
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

>>>>>>> 94642f67206f872f05a9a345f263228187656abd
    </div>
  </DashboardLayout>
</template>

<script setup>
<<<<<<< HEAD
import { ref } from 'vue'
import DashboardLayout from '@/layouts/DashboardLayout.vue'

const notifications = ref([
  {
    id: 1,
    title: 'Analisis Air Selesai',
    message: 'Hasil analisis air Anda telah berhasil diproses. Air dinyatakan layak digunakan.',
    time: 'Baru saja',
    read: false
  },
  {
    id: 2,
    title: 'Pembaruan Artikel',
    message: 'Artikel baru tentang teknologi pengolahan air telah ditambahkan ke modul Edukasi.',
    time: '2 jam yang lalu',
    read: false
  }
])

const markAsRead = (id) => {
  const notif = notifications.value.find(item => item.id === id)
  if (notif) {
    notif.read = true
  }
=======
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
>>>>>>> 94642f67206f872f05a9a345f263228187656abd
}
</script>

<style scoped>
.page-header {
  margin-bottom: var(--page-gap);
}
.page-title {
  font-size: var(--font-size-xl);
  font-weight: 700;
  color: var(--color-text-primary);
  margin-bottom: 4px;
}
.page-subtitle {
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
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
<<<<<<< HEAD
  gap: var(--card-gap);
  max-width: 800px;
=======
  gap: 16px;
  margin-top: 20px;
>>>>>>> 94642f67206f872f05a9a345f263228187656abd
}

.notification-card {
  display: flex;
  gap: 16px;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  padding: 20px;
<<<<<<< HEAD
  box-shadow: var(--shadow-sm);
  position: relative;
  transition: all var(--transition-fast);
}

.notification-card--unread {
  background: var(--color-bg);
  border-color: var(--color-info-border);
=======
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
>>>>>>> 94642f67206f872f05a9a345f263228187656abd
}

.notification-icon {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: var(--color-info-bg);
  color: var(--color-info-text);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.notification-content {
  flex: 1;
}

.notification-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 6px;
}

.notification-title {
  font-size: var(--font-size-base);
  font-weight: 600;
  color: var(--color-text-primary);
}

.notification-time {
  font-size: var(--font-size-xs);
  color: var(--color-text-muted-light);
  white-space: nowrap;
}

.notification-desc {
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
  line-height: 1.5;
  margin-bottom: 12px;
}

.notification-actions {
  display: flex;
  gap: 8px;
}

.btn--sm {
  padding: 6px 12px;
  font-size: var(--font-size-xs);
}

.unread-dot {
  position: absolute;
  top: 20px;
  right: 20px;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--color-accent);
}

.empty-state {
  text-align: center;
  padding: 64px 20px;
  background: var(--color-surface);
  border: 1px dashed var(--color-border-strong);
  border-radius: var(--radius-lg);
}
.empty-icon {
  font-size: 32px;
  margin-bottom: 12px;
}
.empty-state h3 {
  font-size: var(--font-size-md);
  color: var(--color-text-primary);
  margin-bottom: 8px;
}
.empty-state p {
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
}
</style>
