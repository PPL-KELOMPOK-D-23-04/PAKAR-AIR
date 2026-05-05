<template>
  <div class="notifications-page">
    <!-- Header -->
    <div class="page-header">
      <h1 class="page-title">Notifikasi</h1>
      <button v-if="unreadTotal > 0" class="mark-all" @click="markAllAsRead">
        Tandai semua telah dibaca
      </button>
    </div>

    <!-- Loading -->
    <div v-if="loading" class="state-loading">
      <div class="spinner"></div>
      <p>Memuat notifikasi...</p>
    </div>

    <!-- Kosong -->
    <div v-else-if="allNotifications.length === 0" class="state-empty">
      <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="#cbd5e1" stroke-width="1">
        <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
        <path d="M13.73 21a2 2 0 0 1-3.46 0" />
      </svg>
      <p class="empty-title">Belum ada notifikasi</p>
      <p class="empty-desc">Notifikasi akan muncul saat ada aktivitas baru di PAKAR-AIR</p>
    </div>

    <!-- Daftar Notifikasi -->
    <div v-else class="notifications-list">
      <div
        v-for="item in allNotifications"
        :key="item.id"
        :class="['notification-card', { 'is-unread': !item.is_read }]"
      >
        <div class="card-indicator" :class="`indicator-${item.type}`"></div>
        <div class="card-content">
          <div class="card-header">
            <span class="card-title">{{ item.title }}</span>
            <span class="card-date">{{ formatFullDate(item.created_at) }}</span>
          </div>
          <p class="card-message">{{ item.message }}</p>
          <button v-if="item.action_link" class="card-button" @click="goTo(item.action_link)">
            {{ getButtonText(item.type) }}
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const loading = ref(false)
const allNotifications = ref([])

// ============ MOCK DATA (HAPUS setelah connect API) ============
const mockAllNotifications = [
  {
    id: 1,
    title: 'Analisis Selesai',
    message: 'Hasil analisis kualitas air dari sumber Sumur telah tersedia. Kualitas air terdeteksi dalam kategori Aman dengan confidence score 94%.',
    type: 'hasil_analisis',
    is_read: false,
    created_at: new Date().toISOString(),
    action_link: '/history/1'
  },
  {
    id: 2,
    title: 'Artikel Edukasi Baru',
    message: 'Parameter kualitas air yang perlu Anda ketahui untuk keluarga sehat. Artikel ini membahas pH, TDS, kekeruhan, dan kandungan bakteri.',
    type: 'edukasi',
    is_read: false,
    created_at: new Date(Date.now() - 3600000).toISOString(),
    action_link: '/edukasi/parameter-air'
  },
  {
    id: 3,
    title: 'Mulai Analisis Pertama Anda',
    message: 'Belum pernah cek kualitas air? Lakukan analisis sekarang gratis dan dapatkan rekomendasi penggunaan air yang aman.',
    type: 'pengingat',
    is_read: true,
    created_at: new Date(Date.now() - 86400000).toISOString(),
    action_link: '/analysis'
  },
  {
    id: 4,
    title: 'Profil Diperbarui',
    message: 'Informasi akun Anda berhasil diubah. Jika bukan Anda yang melakukannya, segera hubungi dukungan.',
    type: 'profil',
    is_read: true,
    created_at: new Date(Date.now() - 172800000).toISOString(),
    action_link: '/profile'
  },
  {
    id: 5,
    title: 'Peringatan dari Admin',
    message: 'Akun Anda akan dinonaktifkan jika tidak melakukan verifikasi email dalam 3 hari ke depan.',
    type: 'admin_action',
    is_read: false,
    created_at: new Date(Date.now() - 300000).toISOString(),
    action_link: '/support'
  }
]

const unreadTotal = computed(() => {
  return allNotifications.value.filter(n => !n.is_read).length
})

// Fetch data (ganti dengan API real)
const fetchNotifications = async () => {
  loading.value = true
  
  // TODO: Ganti dengan API call
  // try {
  //   const res = await fetch('/api/notifications/user/' + userId)
  //   allNotifications.value = await res.json()
  // } catch (error) {
  //   allNotifications.value = mockAllNotifications
  // }
  
  // SEMENTARA pakai mock
  setTimeout(() => {
    allNotifications.value = mockAllNotifications
    loading.value = false
  }, 500)
}

const markAllAsRead = async () => {
  // TODO: Panggil API
  allNotifications.value.forEach(n => {
    n.is_read = true
  })
}

const goTo = (link) => {
  router.push(link)
}

const formatFullDate = (timestamp) => {
  const date = new Date(timestamp)
  return date.toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

const getButtonText = (type) => {
  const buttons = {
    hasil_analisis: 'Lihat hasil analisis',
    edukasi: 'Baca artikel',
    pengingat: 'Mulai analisis',
    profil: 'Lihat profil',
    admin_action: 'Hubungi dukungan'
  }
  return buttons[type] || 'Lihat detail'
}

onMounted(() => {
  fetchNotifications()
})
</script>

<style scoped>
.notifications-page {
  max-width: 800px;
  margin: 0 auto;
  padding: 32px 24px;
}

/* Header */
.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 28px;
}

.page-title {
  font-size: 24px;
  font-weight: 600;
  color: #0f172a;
  letter-spacing: -0.3px;
}

.mark-all {
  background: transparent;
  border: none;
  font-size: 13px;
  font-weight: 500;
  color: #2c7da0;
  cursor: pointer;
  padding: 6px 14px;
  border-radius: 30px;
  transition: background 0.2s;
}

.mark-all:hover {
  background-color: #f1f5f9;
}

/* States */
.state-loading, .state-empty {
  text-align: center;
  padding: 64px 24px;
  background: white;
  border-radius: 24px;
  border: 1px solid #eef2f5;
}

.spinner {
  width: 40px;
  height: 40px;
  margin: 0 auto 16px;
  border: 2px solid #e2e8f0;
  border-top-color: #2c7da0;
  border-radius: 50%;
  animation: spin 0.6s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.empty-title {
  font-size: 16px;
  font-weight: 500;
  color: #475569;
  margin-top: 16px;
}

.empty-desc {
  font-size: 13px;
  color: #94a3b8;
  margin-top: 6px;
}

/* List Notifikasi */
.notifications-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.notification-card {
  display: flex;
  gap: 16px;
  background: white;
  border-radius: 18px;
  padding: 18px 20px;
  border: 1px solid #edf2f7;
  transition: all 0.2s ease;
}

.notification-card:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.04);
}

.notification-card.is-unread {
  border-left: 3px solid #2c7da0;
  background-color: #fafdff;
}

.card-indicator {
  width: 4px;
  border-radius: 4px;
  flex-shrink: 0;
}

.indicator-hasil_analisis { background: #10b981; width: 4px; }
.indicator-edukasi { background: #3b82f6; width: 4px; }
.indicator-pengingat { background: #f59e0b; width: 4px; }
.indicator-profil { background: #8b5cf6; width: 4px; }
.indicator-admin_action { background: #ef4444; width: 4px; }

.card-content {
  flex: 1;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin-bottom: 8px;
  flex-wrap: wrap;
  gap: 8px;
}

.card-title {
  font-weight: 600;
  font-size: 15px;
  color: #0f172a;
}

.card-date {
  font-size: 11px;
  color: #94a3b8;
}

.card-message {
  font-size: 13px;
  color: #475569;
  margin-bottom: 12px;
  line-height: 1.5;
}

.card-button {
  background: none;
  border: none;
  font-size: 12px;
  font-weight: 500;
  color: #2c7da0;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 0;
  transition: gap 0.2s, color 0.2s;
}

.card-button:hover {
  gap: 10px;
  color: #1b5a7a;
}

/* Responsive */
@media (max-width: 600px) {
  .notifications-page {
    padding: 20px 16px;
  }
  .page-title {
    font-size: 20px;
  }
  .notification-card {
    padding: 14px 16px;
  }
  .card-title {
    font-size: 14px;
  }
  .card-message {
    font-size: 12px;
  }
}
</style>