<template>
  <div class="default-layout">
    <!-- Navbar -->
    <nav class="navbar" :class="{ 'navbar-scrolled': isScrolled }">
      <div class="navbar-container">
        <!-- Logo -->
        <router-link to="/" class="navbar-logo">
          <div class="logo-icon">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
              <path d="M2 12L5 9M22 12L19 9M12 2L9 5M12 22L9 19M5 9L2 12M19 9L22 12M9 5L12 2M19 19L22 16M5 15L2 12M22 12L19 15M12 2L15 5M12 22L15 19M9 19L5 15M15 5L19 9" />
              <circle cx="12" cy="12" r="3" />
            </svg>
          </div>
          <div class="logo-text">
            <span class="logo-main">PAKAR-AIR</span>
            <span class="logo-sub">Pendeteksi Kualitas Air</span>
          </div>
        </router-link>

        <!-- Desktop Navigation -->
        <div class="navbar-menu desktop-menu">
          <router-link to="/" class="nav-link" exact-active-class="active">Beranda</router-link>
          <router-link to="/education" class="nav-link" active-class="active">Edukasi</router-link>
          <a href="#fitur" class="nav-link" @click.prevent="scrollToSection('fitur')">Fitur</a>
          <a href="#tentang" class="nav-link" @click.prevent="scrollToSection('tentang')">Tentang</a>
        </div>

        <!-- Auth Buttons -->
        <div class="navbar-auth">
          <template v-if="!isLoggedIn">
            <router-link to="/login" class="btn-login">Masuk</router-link>
            <router-link to="/register" class="btn-register">Daftar Gratis</router-link>
          </template>
          <template v-else>
            <router-link to="/dashboard" class="btn-dashboard">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2h-5v-8H7v8H5a2 2 0 0 1-2-2z" />
              </svg>
              Dashboard
            </router-link>
            <div class="user-avatar" @click="goToProfile">
              <img v-if="userAvatar" :src="userAvatar" :alt="userName" />
              <span v-else>{{ userInitial }}</span>
            </div>
          </template>
        </div>

        <!-- Mobile Menu Button -->
        <button class="mobile-menu-btn" @click="toggleMobileMenu">
          <svg v-if="!mobileMenuOpen" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
          <svg v-else width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      </div>

      <!-- Mobile Menu -->
      <transition name="mobile-menu">
        <div v-if="mobileMenuOpen" class="mobile-menu">
          <router-link to="/" class="mobile-nav-link" @click="closeMobileMenu">Beranda</router-link>
          <router-link to="/education" class="mobile-nav-link" @click="closeMobileMenu">Edukasi</router-link>
          <a href="#fitur" class="mobile-nav-link" @click.prevent="scrollToSection('fitur'); closeMobileMenu()">Fitur</a>
          <a href="#tentang" class="mobile-nav-link" @click.prevent="scrollToSection('tentang'); closeMobileMenu()">Tentang</a>
          <hr class="mobile-divider" />
          <template v-if="!isLoggedIn">
            <router-link to="/login" class="mobile-nav-link mobile-login" @click="closeMobileMenu">Masuk</router-link>
            <router-link to="/register" class="mobile-nav-link mobile-register" @click="closeMobileMenu">Daftar Gratis</router-link>
          </template>
          <template v-else>
            <router-link to="/dashboard" class="mobile-nav-link" @click="closeMobileMenu">Dashboard</router-link>
            <router-link to="/profile" class="mobile-nav-link" @click="closeMobileMenu">Profil Saya</router-link>
            <button class="mobile-nav-link mobile-logout" @click="handleLogout">Keluar</button>
          </template>
        </div>
      </transition>
    </nav>

    <!-- Main Content -->
    <main class="main-content">
      <slot />
    </main>

    <!-- Footer -->
    <footer class="footer">
      <div class="footer-container">
        <div class="footer-grid">
          <!-- Logo & Description -->
          <div class="footer-section">
            <div class="footer-logo">
              <span class="footer-logo-main">PAKAR-AIR</span>
              <span class="footer-logo-sub">Pendeteksi Kualitas Air</span>
            </div>
            <p class="footer-desc">
              Solusi cerdas untuk mendeteksi kualitas air menggunakan Artificial Intelligence.
              Bantu masyarakat mengetahui kondisi air secara cepat dan akurat.
            </p>
          </div>

          <!-- Quick Links -->
          <div class="footer-section">
            <h4>Tautan Cepat</h4>
            <ul>
              <li><router-link to="/">Beranda</router-link></li>
              <li><router-link to="/education">Edukasi</router-link></li>
              <li><a href="#fitur" @click.prevent="scrollToSection('fitur')">Fitur</a></li>
              <li><a href="#tentang" @click.prevent="scrollToSection('tentang')">Tentang</a></li>
            </ul>
          </div>

          <!-- Support -->
          <div class="footer-section">
            <h4>Dukungan</h4>
            <ul>
              <li><a href="#">FAQ</a></li>
              <li><a href="#">Kebijakan Privasi</a></li>
              <li><a href="#">Syarat & Ketentuan</a></li>
              <li><a href="#">Hubungi Kami</a></li>
            </ul>
          </div>

          <!-- Contact -->
          <div class="footer-section">
            <h4>Kontak</h4>
            <ul class="contact-list">
              <li>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
                support@pakar-air.id
              </li>
              <li>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.362 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.338 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
                (021) 1234-5678
              </li>
              <li>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                Jakarta, Indonesia
              </li>
            </ul>
          </div>
        </div>

        <div class="footer-bottom">
          <p>&copy; 2026 PAKAR-AIR. Seluruh hak cipta dilindungi.</p>
          <div class="social-links">
            <a href="#" class="social-link">FB</a>
            <a href="#" class="social-link">IG</a>
            <a href="#" class="social-link">TW</a>
            <a href="#" class="social-link">LI</a>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/authStore'
import { useProfileStore } from '@/stores/profileStore'

const router = useRouter()
const authStore = useAuthStore()
const profileStore = useProfileStore()

// State
const mobileMenuOpen = ref(false)
const isScrolled = ref(false)

// Computed
const isLoggedIn = computed(() => {
  const token = localStorage.getItem('token') || localStorage.getItem('pakar_air_token')
  return !!token
})

const userData = computed(() => {
  try {
    return JSON.parse(localStorage.getItem('pakar_air_user') || '{}')
  } catch {
    return {}
  }
})

const userName = computed(() => {
  return userData.value?.full_name || userData.value?.fullname || userData.value?.nama || 'Pengguna'
})

const userInitial = computed(() => {
  return userName.value.charAt(0).toUpperCase()
})

const userAvatar = computed(() => {
  return profileStore.profile?.avatar_url || null
})

// Methods
const toggleMobileMenu = () => {
  mobileMenuOpen.value = !mobileMenuOpen.value
  if (mobileMenuOpen.value) {
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = ''
  }
}

const closeMobileMenu = () => {
  mobileMenuOpen.value = false
  document.body.style.overflow = ''
}

const scrollToSection = (sectionId) => {
  closeMobileMenu()
  const element = document.getElementById(sectionId)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth', block: 'start' })
  } else {
    // Jika di halaman lain, arahkan ke beranda dulu
    if (router.currentRoute.value.path !== '/') {
      router.push('/').then(() => {
        setTimeout(() => {
          const el = document.getElementById(sectionId)
          if (el) el.scrollIntoView({ behavior: 'smooth' })
        }, 100)
      })
    }
  }
}

const goToProfile = () => {
  router.push('/profile')
}

const handleLogout = async () => {
  localStorage.removeItem('token')
  localStorage.removeItem('pakar_air_token')
  localStorage.removeItem('pakar_air_refresh_token')
  localStorage.removeItem('pakar_air_user')
  localStorage.removeItem('user')
  
  if (authStore.logout) {
    authStore.logout()
  }
  
  closeMobileMenu()
  router.push('/')
}

// Scroll handler
const handleScroll = () => {
  isScrolled.value = window.scrollY > 20
}

// Load profile for avatar
const loadProfile = async () => {
  const userId = userData.value?.user_id || userData.value?.id
  if (isLoggedIn.value && userId && !profileStore.profile) {
    try {
      await profileStore.fetchProfile(userId)
    } catch (err) {
      console.error('Gagal load profile:', err)
    }
  }
}

// Lifecycle
onMounted(() => {
  window.addEventListener('scroll', handleScroll)
  loadProfile()
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
  document.body.style.overflow = ''
})
</script>

<style scoped>
/* ============================================ */
/* DEFAULT LAYOUT - PAKAR-AIR ELEGANT STYLE    */
/* ============================================ */

.default-layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: #ffffff;
}

/* ========== NAVBAR ========== */
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  background: transparent;
  transition: all 0.3s ease;
  padding: 16px 0;
}

.navbar-scrolled {
  background: rgba(255, 255, 255, 0.98);
  backdrop-filter: blur(10px);
  box-shadow: 0 2px 20px rgba(0, 0, 0, 0.05);
  padding: 12px 0;
}

.navbar-container {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 32px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

/* Logo */
.navbar-logo {
  display: flex;
  align-items: center;
  gap: 10px;
  text-decoration: none;
}

.logo-icon {
  width: 40px;
  height: 40px;
  background: linear-gradient(135deg, #2c7da0 0%, #1e4a6e 100%);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
}

.logo-text {
  display: flex;
  flex-direction: column;
}

.logo-main {
  font-size: 18px;
  font-weight: 700;
  color: #0f172a;
  letter-spacing: -0.3px;
}

.logo-sub {
  font-size: 10px;
  color: #64748b;
  letter-spacing: 0.5px;
}

.navbar-scrolled .logo-main {
  color: #0f172a;
}

/* Desktop Menu */
.navbar-menu {
  display: flex;
  gap: 32px;
}

.nav-link {
  text-decoration: none;
  font-size: 14px;
  font-weight: 500;
  color: #475569;
  transition: color 0.2s;
  position: relative;
}

.nav-link:hover,
.nav-link.active {
  color: #2c7da0;
}

.nav-link.active::after {
  content: '';
  position: absolute;
  bottom: -8px;
  left: 0;
  right: 0;
  height: 2px;
  background: #2c7da0;
  border-radius: 2px;
}

/* Auth Buttons */
.navbar-auth {
  display: flex;
  align-items: center;
  gap: 12px;
}

.btn-login {
  padding: 8px 20px;
  font-size: 14px;
  font-weight: 500;
  color: #2c7da0;
  text-decoration: none;
  border-radius: 40px;
  transition: all 0.2s;
}

.btn-login:hover {
  background: #f1f5f9;
}

.btn-register {
  padding: 8px 20px;
  font-size: 14px;
  font-weight: 500;
  background: #2c7da0;
  color: white;
  text-decoration: none;
  border-radius: 40px;
  transition: all 0.2s;
}

.btn-register:hover {
  background: #1b5a7a;
  transform: translateY(-1px);
}

.btn-dashboard {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 20px;
  font-size: 14px;
  font-weight: 500;
  background: #eef2ff;
  color: #2c7da0;
  text-decoration: none;
  border-radius: 40px;
  transition: all 0.2s;
}

.btn-dashboard:hover {
  background: #e0e7ff;
}

.user-avatar {
  width: 38px;
  height: 38px;
  border-radius: 50%;
  background: linear-gradient(135deg, #2c7da0 0%, #1e4a6e 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: white;
  font-weight: 600;
  font-size: 14px;
  overflow: hidden;
  transition: transform 0.2s;
}

.user-avatar:hover {
  transform: scale(1.05);
}

.user-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* Mobile Menu Button */
.mobile-menu-btn {
  display: none;
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px;
  color: #0f172a;
}

/* Mobile Menu */
.mobile-menu {
  position: fixed;
  top: 72px;
  left: 0;
  right: 0;
  bottom: 0;
  background: white;
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  z-index: 999;
  overflow-y: auto;
}

.mobile-nav-link {
  padding: 14px 16px;
  font-size: 16px;
  font-weight: 500;
  color: #475569;
  text-decoration: none;
  border-radius: 12px;
  transition: background 0.2s;
}

.mobile-nav-link:hover,
.mobile-nav-link.router-link-active {
  background: #f1f5f9;
  color: #2c7da0;
}

.mobile-divider {
  margin: 16px 0;
  border: none;
  border-top: 1px solid #eef2f5;
}

.mobile-login {
  color: #2c7da0;
}

.mobile-register {
  background: #2c7da0;
  color: white;
  text-align: center;
}

.mobile-register:hover {
  background: #1b5a7a;
  color: white;
}

.mobile-logout {
  color: #dc2626;
  text-align: left;
  background: none;
  border: none;
  cursor: pointer;
}

/* ========== MAIN CONTENT ========== */
.main-content {
  flex: 1;
  margin-top: 80px;
}

/* ========== FOOTER ========== */
.footer {
  background: #0f172a;
  color: #94a3b8;
  padding: 48px 0 24px;
  margin-top: auto;
}

.footer-container {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 32px;
}

.footer-grid {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1.5fr;
  gap: 48px;
  margin-bottom: 48px;
}

.footer-logo {
  margin-bottom: 16px;
}

.footer-logo-main {
  font-size: 20px;
  font-weight: 700;
  color: white;
  display: block;
}

.footer-logo-sub {
  font-size: 11px;
  color: #64748b;
}

.footer-desc {
  font-size: 13px;
  line-height: 1.6;
  color: #94a3b8;
}

.footer-section h4 {
  font-size: 14px;
  font-weight: 600;
  color: white;
  margin-bottom: 20px;
}

.footer-section ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.footer-section ul li {
  margin-bottom: 12px;
}

.footer-section ul li a {
  font-size: 13px;
  color: #94a3b8;
  text-decoration: none;
  transition: color 0.2s;
}

.footer-section ul li a:hover {
  color: #2c7da0;
}

.contact-list li {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 13px;
  color: #94a3b8;
}

.contact-list svg {
  flex-shrink: 0;
}

.footer-bottom {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 24px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  font-size: 12px;
}

.social-links {
  display: flex;
  gap: 16px;
}

.social-link {
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 50%;
  font-size: 12px;
  font-weight: 500;
  color: #94a3b8;
  text-decoration: none;
  transition: all 0.2s;
}

.social-link:hover {
  background: #2c7da0;
  color: white;
}

/* Animations */
.mobile-menu-enter-active,
.mobile-menu-leave-active {
  transition: all 0.3s ease;
}

.mobile-menu-enter-from,
.mobile-menu-leave-to {
  opacity: 0;
  transform: translateX(100%);
}

/* Responsive */
@media (max-width: 900px) {
  .desktop-menu {
    display: none;
  }
  
  .mobile-menu-btn {
    display: block;
  }
  
  .navbar-auth {
    display: none;
  }
  
  .footer-grid {
    grid-template-columns: 1fr;
    gap: 32px;
  }
  
  .footer-bottom {
    flex-direction: column;
    gap: 16px;
    text-align: center;
  }
}

@media (max-width: 640px) {
  .navbar-container {
    padding: 0 20px;
  }
  
  .logo-main {
    font-size: 16px;
  }
  
  .logo-sub {
    font-size: 9px;
  }
  
  .logo-icon {
    width: 34px;
    height: 34px;
  }
}
</style>