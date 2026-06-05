<template>
  <DashboardLayout>
    <div class="notification-page">

      <!-- PAGE HEADER -->
      <div class="page-header">
        <div class="header-left">
          <div class="header-label">
            <span class="label-line"></span>
            <span class="label-text">Aktivitas</span>
          </div>
          <h1 class="page-title">Notifikasi</h1>
          <p class="page-subtitle">Pembaruan aktivitas dan informasi terbaru Anda.</p>
        </div>
        <div class="header-right">
          <div class="notif-count-badge" v-if="unreadCount > 0">
            <span class="count-number">{{ unreadCount }}</span>
            <span class="count-label">belum dibaca</span>
          </div>
          <button 
            v-if="unreadCount > 0"
            class="btn-mark-all"
            @click="markAllAsRead"
          >
            <CheckCheck size="15" />
            Tandai Semua Dibaca
          </button>
        </div>
      </div>

      <!-- FILTER TABS -->
      <div class="filter-tabs">
        <button 
          v-for="tab in tabs"
          :key="tab.key"
          class="tab-btn"
          :class="{ 'tab-btn--active': activeTab === tab.key }"
          @click="activeTab = tab.key"
        >
          {{ tab.label }}
          <span class="tab-count" v-if="tab.count > 0">{{ tab.count }}</span>
        </button>
      </div>

      <!-- EMPTY STATE -->
      <div v-if="filteredNotifications.length === 0" class="empty-state">
        <div class="empty-visual">
          <div class="empty-ring empty-ring--1"></div>
          <div class="empty-ring empty-ring--2"></div>
          <Bell class="empty-icon-svg" size="32" />
        </div>
        <h3 class="empty-title">Semua Sudah Terbaca</h3>
        <p class="empty-desc">Tidak ada notifikasi baru untuk ditampilkan saat ini.</p>
      </div>

      <!-- NOTIFICATION LIST (Redesigned) -->
      <div v-else class="notification-list-container">
        <TransitionGroup name="notif" tag="div" class="notification-list">
          <div
            v-for="(notif, index) in filteredNotifications"
            :key="notif.id"
            class="notification-item"
            :class="[
              `notification-item--${notif.type}`,
              { 'notification-item--unread': !notif.read }
            ]"
            :style="{ animationDelay: `${index * 40}ms` }"
          >
            <!-- Icon -->
            <div class="notif-icon-wrap" :class="`icon-wrap--${notif.type}`">
              <component :is="getIcon(notif.type)" size="20" />
            </div>

            <!-- Content -->
            <div class="notif-content">
              <div class="notif-header">
                <h3 class="notif-title">
                  {{ notif.title }}
                  <span v-if="!notif.read" class="unread-dot"></span>
                </h3>
                <div class="notif-header-right">
                  <span class="notif-time">{{ notif.time }}</span>
                  <button class="btn-dismiss-ghost" @click="dismiss(notif.id)" aria-label="Hapus Notifikasi">
                    <X size="16" />
                  </button>
                </div>
              </div>

              <p class="notif-message">{{ notif.message }}</p>

              <div class="notif-actions" v-if="notif.actionLabel || !notif.read">
                <button 
                  v-if="notif.actionLabel"
                  class="btn-action-primary"
                  @click="handleAction(notif)"
                >
                  {{ notif.actionLabel }}
                </button>
                <button 
                  v-if="!notif.read"
                  class="btn-action-secondary"
                  @click="markAsRead(notif.id)"
                >
                  Tandai Dibaca
                </button>
              </div>
            </div>
          </div>
        </TransitionGroup>
      </div>

    </div>
  </DashboardLayout>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import DashboardLayout from '@/layouts/DashboardLayout.vue'
import { 
  Bell, CheckCheck, X, CheckCircle, BookOpen, AlertTriangle, Zap, Info
} from 'lucide-vue-next'

// ─── DATA ─────────────────────────────────────────────────
const notifications = ref([
  {
    id: 1,
    type: 'success',
    title: 'Analisis Air Selesai',
    message: 'Hasil analisis air Anda telah berhasil diproses. Parameter pH 7.2, TDS 145 ppm — air dinyatakan layak digunakan.',
    time: 'Baru saja',
    read: false,
    actionLabel: 'Lihat Hasil'
  },
  {
    id: 2,
    type: 'info',
    title: 'Artikel Baru Tersedia',
    message: 'Artikel baru tentang teknologi pengolahan air terkini telah ditambahkan ke modul Edukasi PAKAR-AIR.',
    time: '2 jam yang lalu',
    read: false,
    actionLabel: 'Baca Artikel'
  },
  {
    id: 3,
    type: 'warning',
    title: 'Kadar TDS Mendekati Batas',
    message: 'Pengukuran terakhir menunjukkan kadar TDS 480 ppm, mendekati ambang batas 500 ppm. Pertimbangkan pemeriksaan lanjutan.',
    time: '5 jam yang lalu',
    read: false,
    actionLabel: 'Periksa Data'
  },
  {
    id: 4,
    type: 'update',
    title: 'Pembaruan Sistem',
    message: 'PAKAR-AIR telah diperbarui ke versi 2.4.1. Performa analisis ditingkatkan 30% lebih cepat.',
    time: 'Kemarin, 14:30',
    read: true,
    actionLabel: null
  }
])

// ─── STATE ────────────────────────────────────────────────
const router = useRouter()
const activeTab = ref('all')

// ─── COMPUTED ─────────────────────────────────────────────
const unreadCount = computed(() => notifications.value.filter(n => !n.read).length)

const tabs = computed(() => [
  { key: 'all',    label: 'Semua',    count: notifications.value.length },
  { key: 'unread', label: 'Belum Dibaca', count: unreadCount.value },
])

const filteredNotifications = computed(() => {
  if (activeTab.value === 'unread') return notifications.value.filter(n => !n.read)
  return notifications.value
})

// ─── HELPERS ──────────────────────────────────────────────
const getIcon = (type) => ({
  success: CheckCircle,
  info:    BookOpen,
  warning: AlertTriangle,
  update:  Zap,
}[type] || Info)

// ─── METHODS ──────────────────────────────────────────────
const markAsRead = (id) => {
  const n = notifications.value.find(n => n.id === id)
  if (n) n.read = true
}

const markAllAsRead = () => {
  notifications.value.forEach(n => n.read = true)
}

const dismiss = (id) => {
  notifications.value = notifications.value.filter(n => n.id !== id)
}

const handleAction = (notif) => {
  markAsRead(notif.id)
  
  if (notif.type === 'success' || notif.type === 'warning') {
    router.push('/history')
  } else if (notif.type === 'info') {
    router.push('/edukasi')
  }
}
</script>

<style scoped>
/* ─── PAGE ─────────────────────────────────────────────── */
.notification-page {
  /* Full layout page as requested */
  width: 100%;
  max-width: 100%;
  display: flex;
  flex-direction: column;
  animation: fadeSlideIn 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

@keyframes fadeSlideIn {
  from { opacity: 0; transform: translateY(12px); }
  to   { opacity: 1; transform: translateY(0); }
}

/* ─── HEADER ───────────────────────────────────────────── */
.page-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: 32px;
  gap: 20px;
  flex-wrap: wrap;
}

.header-left {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.header-label {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 2px;
}

.label-line {
  display: block;
  width: 24px;
  height: 2px;
  background: var(--color-primary);
  border-radius: 2px;
}

.label-text {
  font-size: 0.6875rem;
  font-weight: 800;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: var(--color-primary);
}

.page-title {
  font-size: 2rem;
  font-weight: 800;
  color: var(--color-text-primary);
  letter-spacing: -0.03em;
  margin: 0;
  line-height: 1.1;
}

.page-subtitle {
  font-size: 0.9375rem;
  color: var(--color-text-muted);
  margin: 0;
  margin-top: 2px;
}

.header-right {
  display: flex;
  align-items: center;
  gap: 12px;
  height: 42px; /* Force uniform height in this zone */
}

.notif-count-badge {
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0 16px;
  gap: 8px;
  background: color-mix(in srgb, var(--color-primary) 8%, transparent);
  border: 1px solid color-mix(in srgb, var(--color-primary) 15%, transparent);
  border-radius: var(--radius-lg);
  height: 100%;
}

.count-number {
  font-size: 1.125rem;
  font-weight: 800;
  color: var(--color-primary);
  letter-spacing: -0.01em;
  line-height: 1;
}

.count-label {
  font-size: 0.75rem;
  font-weight: 700;
  color: var(--color-primary);
  opacity: 0.9;
  letter-spacing: 0.03em;
  text-transform: uppercase;
  margin-top: 0;
}

.btn-mark-all {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 0 18px;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  font-size: 0.8125rem;
  font-weight: 600;
  color: var(--color-text-secondary);
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 2px 4px rgba(0,0,0,0.02);
  height: 100%;
}

.btn-mark-all:hover {
  background: var(--color-bg);
  border-color: var(--color-border-strong);
  color: var(--color-text-primary);
  box-shadow: 0 4px 12px rgba(0,0,0,0.04);
}

/* ─── FILTER TABS ──────────────────────────────────────── */
.filter-tabs {
  display: flex;
  gap: 4px;
  margin-bottom: 24px;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  padding: 4px;
  width: fit-content;
}

.tab-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 20px;
  background: transparent;
  border: none;
  border-radius: calc(var(--radius-lg) - 3px);
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--color-text-muted);
  cursor: pointer;
  transition: all 0.2s ease;
}

.tab-btn:hover { color: var(--color-text-primary); }

.tab-btn--active {
  background: var(--color-primary);
  color: white;
  font-weight: 600;
  box-shadow: 0 4px 12px color-mix(in srgb, var(--color-primary) 30%, transparent);
}

.tab-count {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 20px;
  height: 20px;
  padding: 0 6px;
  border-radius: 10px;
  font-size: 0.6875rem;
  font-weight: 700;
  background: rgba(255,255,255,0.25);
  color: inherit;
}

.tab-btn:not(.tab-btn--active) .tab-count {
  background: color-mix(in srgb, var(--color-primary) 12%, transparent);
  color: var(--color-primary);
}

/* ─── NOTIFICATION LIST (Redesigned) ───────────────────── */
.notification-list-container {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-xl);
  box-shadow: 0 8px 32px -12px rgba(0,0,0,0.06);
  overflow: hidden;
}

.notification-list {
  display: flex;
  flex-direction: column;
}

/* Transitions */
.notif-enter-active,
.notif-leave-active {
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}
.notif-enter-from {
  opacity: 0;
  transform: translateX(-16px);
}
.notif-leave-to {
  opacity: 0;
  transform: translateX(16px);
  max-height: 0;
  padding-top: 0;
  padding-bottom: 0;
  border-bottom-width: 0;
}

.notification-item {
  display: flex;
  gap: 20px;
  padding: 24px 32px;
  background: transparent;
  border-bottom: 1px solid var(--color-border-light);
  transition: background 0.25s ease;
  position: relative;
  opacity: 0;
  animation: item-entrance 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

.notification-item:last-child {
  border-bottom: none;
}

@keyframes item-entrance {
  from { opacity: 0; transform: translateY(8px); }
  to   { opacity: 1; transform: translateY(0); }
}

.notification-item:hover {
  background: var(--color-bg);
}

.notification-item--unread {
  background: color-mix(in srgb, var(--color-primary) 2%, transparent);
}

.notification-item--unread:hover {
  background: color-mix(in srgb, var(--color-primary) 4%, transparent);
}

/* Icon */
.notif-icon-wrap {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  margin-top: 2px;
}

.icon-wrap--success {
  background: color-mix(in srgb, var(--color-success) 12%, transparent);
  color: var(--color-success);
}
.icon-wrap--info {
  background: color-mix(in srgb, var(--color-info) 12%, transparent);
  color: var(--color-info);
}
.icon-wrap--warning {
  background: color-mix(in srgb, var(--color-warning) 12%, transparent);
  color: var(--color-warning);
}
.icon-wrap--update {
  background: color-mix(in srgb, var(--color-primary) 12%, transparent);
  color: var(--color-primary);
}

/* Content */
.notif-content {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.notif-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 8px;
}

.notif-header-right {
  display: flex;
  align-items: center;
  gap: 16px;
}

.notif-title {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 1.0625rem;
  font-weight: 700;
  color: var(--color-text-primary);
  margin: 0;
  letter-spacing: -0.015em;
  line-height: 1.3;
}

.unread-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--color-primary);
  box-shadow: 0 0 0 3px color-mix(in srgb, var(--color-primary) 15%, transparent);
}

.notif-time {
  font-size: 0.8125rem;
  color: var(--color-text-muted);
  font-weight: 500;
}

.notif-message {
  font-size: 0.9375rem;
  color: var(--color-text-secondary);
  line-height: 1.65;
  margin: 0 0 16px 0;
  max-width: 1000px;
}

/* Actions */
.notif-actions {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-top: 4px;
}

.btn-action-primary, .btn-action-secondary {
  padding: 8px 18px;
  border-radius: var(--radius-md);
  font-size: 0.8125rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  letter-spacing: 0.01em;
}

.btn-action-primary {
  background: var(--color-primary);
  color: white;
  border: none;
}
.btn-action-primary:hover {
  filter: brightness(1.1);
  box-shadow: 0 4px 12px color-mix(in srgb, var(--color-primary) 30%, transparent);
}

.btn-action-secondary {
  background: transparent;
  color: var(--color-text-secondary);
  border: 1px solid var(--color-border);
}
.btn-action-secondary:hover {
  background: var(--color-bg);
  color: var(--color-text-primary);
  border-color: var(--color-border-strong);
}

.btn-dismiss-ghost {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: transparent;
  border: none;
  color: var(--color-text-muted);
  cursor: pointer;
  transition: all 0.2s ease;
  opacity: 0.5;
}

.notification-item:hover .btn-dismiss-ghost {
  opacity: 1;
}

.btn-dismiss-ghost:hover {
  background: color-mix(in srgb, var(--color-danger) 10%, transparent);
  color: var(--color-danger);
}

/* ─── EMPTY STATE ──────────────────────────────────────── */
.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 80px 24px;
  text-align: center;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-xl);
}

.empty-visual {
  position: relative;
  width: 80px;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 24px;
}

.empty-ring {
  position: absolute;
  border-radius: 50%;
  border: 1.5px solid;
}

.empty-ring--1 {
  width: 60px; height: 60px;
  border-color: color-mix(in srgb, var(--color-primary) 20%, transparent);
  animation: ring-pulse 2.5s ease-in-out infinite;
}

.empty-ring--2 {
  width: 80px; height: 80px;
  border-color: color-mix(in srgb, var(--color-primary) 10%, transparent);
  animation: ring-pulse 2.5s ease-in-out 0.4s infinite;
}

@keyframes ring-pulse {
  0%, 100% { transform: scale(1); opacity: 1; }
  50%       { transform: scale(1.08); opacity: 0.5; }
}

.empty-icon-svg {
  color: var(--color-text-muted);
  position: relative;
  z-index: 1;
}

.empty-title {
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--color-text-primary);
  margin: 0 0 8px 0;
  letter-spacing: -0.01em;
}

.empty-desc {
  font-size: 0.9375rem;
  color: var(--color-text-muted);
  margin: 0;
  line-height: 1.6;
}
</style>