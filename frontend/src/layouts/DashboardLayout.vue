<script setup>
</script>

<template>
  <div class="dashboard">

    <!-- SIDEBAR -->
    <aside class="sidebar">
      <div class="sidebar__logo">PAKAR-AIR</div>

      <nav class="sidebar__menu">
        <router-link to="/analysis" class="sidebar__item">
          Analisis Baru
        </router-link>
      </nav>
    </aside>

    <!-- RIGHT AREA -->
    <div class="dashboard__right">

      <!-- TOPBAR -->
      <header class="topbar">
        <div class="topbar__title">Analisis</div>
        <div class="topbar__user">Kelompok D</div>
      </header>

      <!-- CONTENT -->
      <main class="content">
        <router-view />
      </main>

    </div>

  </div>
</template>

<style scoped>

/* ROOT */
.dashboard {
  display: flex;
  height: 100vh;
  overflow: hidden;
  background: #f3f6fb;
}

/* SIDEBAR */
.sidebar {
  width: 240px;
  background: #ffffff;
  border-right: 1px solid #e0e0e0;
  padding: 20px;
  flex-shrink: 0;

  display: flex;
  flex-direction: column;
}

.sidebar__logo {
  font-size: 16px;
  font-weight: 600;
  color: #1a1a1a;
  margin-bottom: 24px;
}

/* MENU */
.sidebar__menu {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.sidebar__item {
  padding: 10px 12px;
  border-radius: 4px;
  text-decoration: none;
  font-size: 14px;
  color: #555;
  transition: background 0.15s, color 0.15s;
}

.sidebar__item:hover {
  background: #f5f5f5;
}

.sidebar__item.router-link-active {
  background: #eaeaea;
  color: #1a1a1a;
  font-weight: 500;
}

/* RIGHT AREA */
.dashboard__right {
  flex: 1;
  display: flex;
  flex-direction: column;
  height: 100vh;
}

/* TOPBAR */
.topbar {
  height: 60px;
  background: #ffffff;
  border-bottom: 1px solid #e0e0e0;

  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 24px;

  position: sticky;
  top: 0;
  z-index: 100;
}

.topbar__title {
  font-size: 16px;
  font-weight: 600;
  color: #1a1a1a;
}

.topbar__user {
  font-size: 13px;
  color: #888;
}

/* CONTENT */
.content {
  flex: 1;
  overflow-y: auto;
  padding: 24px;
}

</style>