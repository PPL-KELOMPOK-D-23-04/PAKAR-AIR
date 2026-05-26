<template>
  <div class="notification-page">

    <h1>🔔 Notifikasi</h1>

    <div class="notification-list">

      <div
        v-for="notif in notifications"
        :key="notif.id"
        class="notification-card"
      >

        <h3>{{ notif.title }}</h3>

        <p>{{ notif.message }}</p>

        <small>{{ notif.time }}</small>

        <button
          v-if="!notif.read"
          @click="markAsRead(notif.id)"
        >
          Tandai Dibaca
        </button>

      </div>

    </div>

  </div>
</template>

<script setup>
import { ref } from 'vue'

const notifications = ref([
  {
    id: 1,
    title: 'Analisis Air',
    message: 'Hasil analisis air berhasil dibuat',
    time: 'Baru saja',
    read: false
  },

  {
    id: 2,
    title: 'Berita Terbaru',
    message: 'Teknologi air terbaru telah ditambahkan',
    time: '10 menit lalu',
    read: false
  }
])

const markAsRead = (id) => {

  const notif = notifications.value.find(
    item => item.id === id
  )

  if (notif) {
    notif.read = true
  }
}
</script>

<style scoped>

.notification-page {
  padding: 24px;
}

.notification-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.notification-card {
  background: white;
  padding: 20px;
  border-radius: 12px;
  border: 1px solid #ddd;
}

button {
  margin-top: 10px;
  padding: 10px;
  border: none;
  border-radius: 8px;
  background: #0ea5e9;
  color: white;
  cursor: pointer;
}

</style>