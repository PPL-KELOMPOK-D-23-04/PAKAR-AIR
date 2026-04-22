<template>
  <div class="landing-page">
    <!-- NAVBAR / HEADER -->
    <nav class="navbar">
      <div class="nav-container">
        <div class="logo">
          <span class="logo-icon">💧</span>
          <span class="logo-text">PAKAR-AIR</span>
        </div>
        <div class="nav-links">
          <router-link to="/" class="nav-link">Beranda</router-link>
          <router-link to="/edukasi" class="nav-link">Edukasi</router-link>
          <router-link to="/profile" class="nav-link">Profil</router-link>
          <router-link to="/login" class="nav-link login-btn">Masuk</router-link>
          <router-link to="/register" class="nav-link register-btn">Daftar</router-link>
        </div>
      </div>
    </nav>

    <!-- HERO SECTION -->
    <section class="hero">
      <div class="hero-container">
        <div class="hero-content">
          <h1 class="hero-title">
            Cek Kualitas Air dengan <span class="highlight">AI</span>
          </h1>
          <p class="hero-description">
            Deteksi kualitas air secara cepat dan akurat menggunakan teknologi 
            Artificial Intelligence untuk kesehatan yang lebih baik.
          </p>
          <router-link to="/dashboard" class="cta-button">
            Mulai Analisis →
          </router-link>
        </div>
        <div class="hero-image">
          <img src="https://images.unsplash.com/photo-1548839140-29a749e1cf4d?w=500" alt="Air Bersih">
        </div>
      </div>
    </section>

    <!-- CARA MENGGUNAKAN SECTION -->
    <section class="how-to-use">
      <div class="container">
        <h2 class="section-title">Cara Menggunakan</h2>
        <p class="section-subtitle">
          Tiga langkah mudah untuk menganalisis kualitas air Anda
        </p>
        
        <div class="steps-grid">
          <div class="step-card">
            <div class="step-number">1</div>
            <div class="step-icon">📸</div>
            <h3>Unggah Foto Air</h3>
            <p>Ambil foto air yang ingin dianalisis dan unggah ke sistem</p>
          </div>
          
          <div class="step-card">
            <div class="step-number">2</div>
            <div class="step-icon">📝</div>
            <h3>Isi Data Manual</h3>
            <p>Lengkapi informasi seperti warna, bau, dan sumber air</p>
          </div>
          
          <div class="step-card">
            <div class="step-number">3</div>
            <div class="step-icon">🤖</div>
            <h3>Dapatkan Hasil</h3>
            <p>Sistem AI akan menganalisis dan memberikan rekomendasi</p>
          </div>
        </div>
      </div>
    </section>

    <!-- ARTIKEL EDUKASI SECTION (Menampilkan 3 Artikel) -->
    <section class="articles-section">
      <div class="container">
        <h2 class="section-title">📚 Artikel Edukasi</h2>
        <p class="section-subtitle">
          Pelajari lebih lanjut tentang kualitas air
        </p>
        
        <div class="articles-grid">
          <!-- Artikel 1 -->
          <div class="article-card" @click="goToArtikel('/artikel')">
            <div class="article-image">
              <img src="https://images.unsplash.com/photo-1548839140-29a749e1cf4d?w=400" alt="Parameter Air">
            </div>
            <div class="article-content">
              <span class="article-category">Edukasi Dasar</span>
              <h3>Parameter Kualitas Air yang Perlu Diketahui</h3>
              <p>Pelajari berbagai parameter fisika, kimia, dan biologi air...</p>
              <span class="read-more">Baca selengkapnya →</span>
            </div>
          </div>

          <!-- Artikel 2 -->
          <div class="article-card" @click="goToArtikel('/artikel2')">
            <div class="article-image">
              <img src="https://images.unsplash.com/photo-1564424224827-cd24b8915874?w=400" alt="Pencemaran Air">
            </div>
            <div class="article-content">
              <span class="article-category">Kesehatan & Lingkungan</span>
              <h3>Dampak Pencemaran Air bagi Kesehatan</h3>
              <p>Ketahui bahaya pencemaran air dan dampaknya...</p>
              <span class="read-more">Baca selengkapnya →</span>
            </div>
          </div>

          <!-- Artikel 3 -->
          <div class="article-card" @click="goToArtikel('/artikel3')">
            <div class="article-image">
              <img src="https://images.unsplash.com/photo-1625314887424-9f1900b1a621?w=400" alt="Teknologi Air">
            </div>
            <div class="article-content">
              <span class="article-category">Teknologi & Inovasi</span>
              <h3>Teknologi Pengolahan Air Bersih</h3>
              <p>Berbagai teknologi modern dan tradisional...</p>
              <span class="read-more">Baca selengkapnya →</span>
            </div>
          </div>
        </div>

        <div class="see-all-wrapper">
          <router-link to="/edukasi" class="see-all-btn">
            Lihat Semua Artikel →
          </router-link>
        </div>
      </div>
    </section>

    <!-- CTA SECTION -->
    <section class="cta-section">
      <div class="cta-container">
        <h2>Siap Cek Kualitas Air Anda?</h2>
        <p>Mulai analisis sekarang dan dapatkan rekomendasi dari AI</p>
        <router-link to="/dashboard" class="cta-button white">
          Mulai Analisis Gratis
        </router-link>
      </div>
    </section>

    <!-- FOOTER -->
    <footer class="footer">
      <div class="footer-container">
        <div class="footer-logo">
          <span class="logo-icon">💧</span>
          <span>PAKAR-AIR</span>
          <p>Pendeteksi Kualitas Air Berbasis AI</p>
        </div>
        <div class="footer-links">
          <div class="footer-column">
            <h4>Menu</h4>
            <router-link to="/">Beranda</router-link>
            <router-link to="/edukasi">Edukasi</router-link>
            <router-link to="/dashboard">Analisis</router-link>
          </div>
          <div class="footer-column">
            <h4>Akun</h4>
            <router-link to="/login">Masuk</router-link>
            <router-link to="/register">Daftar</router-link>
            <router-link to="/profile">Profil</router-link>
          </div>
          <div class="footer-column">
            <h4>Edukasi</h4>
            <router-link to="/artikel">Parameter Air</router-link>
            <router-link to="/artikel2">Pencemaran Air</router-link>
            <router-link to="/artikel3">Teknologi Air</router-link>
          </div>
        </div>
      </div>
      <div class="footer-bottom">
        <p>&copy; 2026 PAKAR-AIR. All rights reserved.</p>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const goToArtikel = (route) => {
  router.push(route)
}
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.landing-page {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  overflow-x: hidden;
}

/* ========== NAVBAR ========== */
.navbar {
  position: fixed;
  top: 0;
  width: 100%;
  background: white;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  z-index: 1000;
}

.nav-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1.5rem;
  font-weight: bold;
  color: #1a73e8;
}

.logo-icon {
  font-size: 1.8rem;
}

.nav-links {
  display: flex;
  gap: 1.5rem;
  align-items: center;
}

.nav-link {
  text-decoration: none;
  color: #333;
  font-weight: 500;
  transition: color 0.2s;
}

.nav-link:hover {
  color: #1a73e8;
}

.login-btn {
  padding: 0.5rem 1rem;
  background: transparent;
  border: 1px solid #1a73e8;
  border-radius: 8px;
  color: #1a73e8;
}

.register-btn {
  padding: 0.5rem 1rem;
  background: #1a73e8;
  border-radius: 8px;
  color: white;
}

.register-btn:hover {
  background: #1557b0;
  color: white;
}

/* ========== HERO SECTION ========== */
.hero {
  padding: 120px 2rem 60px;
  background: linear-gradient(135deg, #e8f4fd 0%, #d4eaf7 100%);
}

.hero-container {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  gap: 3rem;
  flex-wrap: wrap;
}

.hero-content {
  flex: 1;
}

.hero-title {
  font-size: 3rem;
  color: #1a1a2e;
  margin-bottom: 1rem;
}

.highlight {
  color: #1a73e8;
}

.hero-description {
  font-size: 1.1rem;
  color: #555;
  line-height: 1.6;
  margin-bottom: 2rem;
}

.cta-button {
  display: inline-block;
  padding: 1rem 2rem;
  background: #1a73e8;
  color: white;
  text-decoration: none;
  border-radius: 12px;
  font-weight: 600;
  transition: background 0.2s;
}

.cta-button:hover {
  background: #1557b0;
}

.hero-image {
  flex: 1;
}

.hero-image img {
  width: 100%;
  border-radius: 24px;
  box-shadow: 0 20px 40px rgba(0,0,0,0.1);
}

/* ========== HOW TO USE SECTION ========== */
.how-to-use {
  padding: 60px 2rem;
  background: white;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
}

.section-title {
  text-align: center;
  font-size: 2.2rem;
  color: #1a1a2e;
  margin-bottom: 1rem;
}

.section-subtitle {
  text-align: center;
  color: #666;
  margin-bottom: 3rem;
}

.steps-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
}

.step-card {
  text-align: center;
  padding: 2rem;
  background: #f8f9fa;
  border-radius: 16px;
  transition: transform 0.2s;
  position: relative;
}

.step-card:hover {
  transform: translateY(-5px);
}

.step-number {
  position: absolute;
  top: -15px;
  left: -15px;
  width: 40px;
  height: 40px;
  background: #1a73e8;
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 1.2rem;
}

.step-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.step-card h3 {
  margin-bottom: 0.5rem;
  color: #1a1a2e;
}

.step-card p {
  color: #666;
}

/* ========== ARTICLES SECTION ========== */
.articles-section {
  padding: 60px 2rem;
  background: #f0f4f8;
}

.articles-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 2rem;
  margin-bottom: 2rem;
}

.article-card {
  background: white;
  border-radius: 16px;
  overflow: hidden;
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
}

.article-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 24px rgba(0,0,0,0.15);
}

.article-image {
  height: 200px;
  overflow: hidden;
}

.article-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s;
}

.article-card:hover .article-image img {
  transform: scale(1.05);
}

.article-content {
  padding: 1.5rem;
}

.article-category {
  display: inline-block;
  padding: 0.25rem 0.75rem;
  background: #e8f4fd;
  color: #1a73e8;
  border-radius: 20px;
  font-size: 0.75rem;
  margin-bottom: 0.75rem;
}

.article-content h3 {
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
  color: #1a1a2e;
}

.article-content p {
  color: #666;
  font-size: 0.9rem;
  line-height: 1.5;
  margin-bottom: 1rem;
}

.read-more {
  color: #1a73e8;
  font-size: 0.85rem;
  font-weight: 500;
}

.see-all-wrapper {
  text-align: center;
}

.see-all-btn {
  display: inline-block;
  padding: 0.75rem 1.5rem;
  background: transparent;
  border: 2px solid #1a73e8;
  color: #1a73e8;
  text-decoration: none;
  border-radius: 12px;
  font-weight: 600;
  transition: all 0.2s;
}

.see-all-btn:hover {
  background: #1a73e8;
  color: white;
}

/* ========== CTA SECTION ========== */
.cta-section {
  padding: 60px 2rem;
  background: linear-gradient(135deg, #1a73e8 0%, #0d8abc 100%);
  text-align: center;
  color: white;
}

.cta-container h2 {
  font-size: 2rem;
  margin-bottom: 1rem;
}

.cta-container p {
  margin-bottom: 2rem;
  opacity: 0.95;
}

.cta-button.white {
  background: white;
  color: #1a73e8;
}

.cta-button.white:hover {
  background: #f0f0f0;
}

/* ========== FOOTER ========== */
.footer {
  background: #1a1a2e;
  color: white;
  padding: 40px 2rem 20px;
}

.footer-container {
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-bottom: 2rem;
}

.footer-logo span {
  font-size: 1.5rem;
  font-weight: bold;
}

.footer-logo p {
  margin-top: 0.5rem;
  color: #aaa;
  font-size: 0.85rem;
}

.footer-column h4 {
  margin-bottom: 1rem;
  color: white;
}

.footer-column a {
  display: block;
  color: #aaa;
  text-decoration: none;
  margin-bottom: 0.5rem;
  transition: color 0.2s;
}

.footer-column a:hover {
  color: #1a73e8;
}

.footer-bottom {
  text-align: center;
  padding-top: 1.5rem;
  border-top: 1px solid #333;
  color: #aaa;
  font-size: 0.8rem;
}

/* ========== RESPONSIVE ========== */
@media (max-width: 768px) {
  .nav-container {
    flex-direction: column;
    gap: 1rem;
  }
  
  .hero-title {
    font-size: 2rem;
  }
  
  .hero-container {
    flex-direction: column;
    text-align: center;
  }
  
  .steps-grid, .articles-grid {
    grid-template-columns: 1fr;
  }
}
</style>