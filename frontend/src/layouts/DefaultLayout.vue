<template>
  <div class="layout">
    <header class="navbar">
      <div class="logo">PAKAR-AIR</div>
      
      <div class="nav-right">
        <!-- 🔔 TAMBAHKAN INI -->
        <NotificationBell />
        
        <!-- Profile dropdown etc -->
        <div class="user-menu">...</div>
      </div>
    </header>
    
    <main>
      <router-view />
    </main>
  </div>
</template>

<script setup>
// 🔔 IMPORT KOMPONEN NOTIFIKASI
import NotificationBell from '@/components/NotificationBell.vue'
</script>