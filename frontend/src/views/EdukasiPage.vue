<template>
  <div class="edukasi-page">
    
    <!-- HERO HEADER - Bagian atas halaman -->
    <div class="hero-header">
      <div class="hero-overlay"></div>
      <div class="hero-content">
        <div class="hero-badge">PUSAT EDUKASI</div>
        <h1>Pelajari Lebih Dalam Tentang<br>Kualitas Air Bersih</h1>
        <p>Temukan artikel informatif tentang parameter air bersih, dampak pencemaran,<br>dan cara menggunakan PAKAR-AIR dengan maksimal.</p>
      </div>
    </div>

    <!-- SECTION ARTIKEL -->
    <div class="articles-section">
      <div class="container">
        <div class="section-title">
          <h2>Artikel Edukasi</h2>
          <div class="title-line"></div>
          <p>Kumpulan artikel untuk meningkatkan kesadaran Anda tentang kualitas air</p>
        </div>

        <div class="articles-grid">
          
          <!-- CARD ARTIKEL 1: Parameter Fisik Air -->
          <div class="article-card" @click="goToArtikel('fisik')">
            <div class="card-image">
              <img :src="getImageUrl('cover-air-bersih.jpg')" alt="Air Bersih">
              <span class="card-category">Panduan Visual</span>
            </div>
            <div class="card-content">
              <h3>Parameter Fisik Air Layak Konsumsi</h3>
              <p>Kenali ciri-ciri air bersih dari warna, bau, dan rasa. Panduan lengkap untuk identifikasi awal kualitas air secara mandiri.</p>
              <div class="card-meta">
                <span class="date">12 Maret 2026</span>
                <span class="read">Baca Selengkapnya →</span>
              </div>
            </div>
          </div>

          <!-- CARD ARTIKEL 2: Dampak Pencemaran Air -->
          <div class="article-card" @click="goToArtikel('kesehatan')">
            <div class="card-image">
              <img :src="getImageUrl('cover-pencemaran.jpg')" alt="Pencemaran Air">
              <span class="card-category kesehatan">Kesehatan</span>
            </div>
            <div class="card-content">
              <h3>Dampak Pencemaran Air bagi Kesehatan</h3>
              <p>Dari diare hingga gagal ginjal — pelajari risiko kesehatan akibat air tercemar dan cara mencegahnya sejak dini.</p>
              <div class="card-meta">
                <span class="date">10 Maret 2026</span>
                <span class="read">Baca Selengkapnya →</span>
              </div>
            </div>
          </div>

          <!-- CARD ARTIKEL 3: Interpretasi Hasil PAKAR-AIR -->
          <div class="article-card" @click="goToArtikel('interpretasi')">
            <div class="card-image">
              <img :src="getImageUrl('cover-ai-analisis.jpg')" alt="Analisis AI">
              <span class="card-category ai">Panduan AI</span>
            </div>
            <div class="card-content">
              <h3>Memahami Hasil Analisis PAKAR-AIR</h3>
              <p>Panduan lengkap membaca kategori kualitas air, confidence score, dan rekomendasi dari sistem AI kami.</p>
              <div class="card-meta">
                <span class="date">8 Maret 2026</span>
                <span class="read">Baca Selengkapnya →</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>

    <!-- STATISTIK SINGKAT -->
    <div class="stats-section">
      <div class="container">
        <div class="stats-grid">
          <div class="stat-item">
            <div class="stat-number">3+</div>
            <div class="stat-label">Artikel Edukasi</div>
          </div>
          <div class="stat-item">
            <div class="stat-number">1000+</div>
            <div class="stat-label">Pembaca Setia</div>
          </div>
          <div class="stat-item">
            <div class="stat-number">24/7</div>
            <div class="stat-label">Akses Gratis</div>
          </div>
          <div class="stat-item">
            <div class="stat-number">SDG 6</div>
            <div class="stat-label">Mendukung Air Bersih</div>
          </div>
        </div>
      </div>
    </div>

    <!-- CTA SECTION -->
    <div class="cta-section">
      <div class="container">
        <div class="cta-content">
          <h3>Siap Mengecek Kualitas Air Anda?</h3>
          <p>Gunakan PAKAR-AIR sekarang dan dapatkan estimasi awal kualitas air secara instan</p>
          <button class="cta-button" @click="goToAnalisis">Mulai Analisis →</button>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: 'EdukasiPage',
  methods: {
    getImageUrl(imageName) {
      // Fungsi untuk mengambil gambar dari folder assets/images
      try {
        return require(`@/assets/images/${imageName}`);
      } catch (e) {
        // Jika gambar tidak ditemukan, pakai placeholder
        return `https://placehold.co/600x400/e8e2d8/8b7355?text=${imageName.replace('.jpg', '')}`;
      }
    },
    goToArtikel(artikel) {
      if (artikel === 'fisik') {
        this.$router.push('/edukasi/fisik');
      } else if (artikel === 'kesehatan') {
        this.$router.push('/edukasi/kesehatan');
      } else if (artikel === 'interpretasi') {
        this.$router.push('/edukasi/interpretasi');
      }
    },
    goToAnalisis() {
      this.$router.push('/analisis');
    }
  }
};
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.edukasi-page {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  background: #faf8f5;
}

/* ========== HERO HEADER ========== */
.hero-header {
  background: linear-gradient(135deg, #2c5f2d 0%, #4a7c4a 100%);
  height: 400px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: white;
}

.hero-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0,0,0,0.2);
}

.hero-content {
  position: relative;
  z-index: 2;
  padding: 20px;
}

.hero-badge {
  background: rgba(255,255,255,0.2);
  display: inline-block;
  padding: 6px 16px;
  border-radius: 40px;
  font-size: 12px;
  letter-spacing: 1px;
  margin-bottom: 20px;
}

.hero-header h1 {
  font-size: 42px;
  font-weight: 700;
  margin-bottom: 16px;
  line-height: 1.2;
}

.hero-header p {
  font-size: 16px;
  opacity: 0.9;
}

/* ========== SECTION ARTIKEL ========== */
.articles-section {
  padding: 60px 0;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
}

.section-title {
  text-align: center;
  margin-bottom: 48px;
}

.section-title h2 {
  font-size: 32px;
  color: #2c3e2f;
  margin-bottom: 12px;
}

.title-line {
  width: 60px;
  height: 3px;
  background: #c9a87b;
  margin: 0 auto 16px auto;
}

.section-title p {
  color: #7a8a7a;
  font-size: 15px;
}

/* ========== GRID ARTIKEL ========== */
.articles-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 32px;
}

.article-card {
  background: white;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0,0,0,0.05);
  cursor: pointer;
  transition: all 0.3s ease;
}

.article-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 12px 30px rgba(0,0,0,0.1);
}

.card-image {
  position: relative;
  height: 220px;
  overflow: hidden;
}

.card-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.article-card:hover .card-image img {
  transform: scale(1.05);
}

.card-category {
  position: absolute;
  bottom: 12px;
  left: 12px;
  background: #6b8c6b;
  color: white;
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 11px;
  font-weight: 500;
}

.card-category.kesehatan {
  background: #b85c5c;
}

.card-category.ai {
  background: #4a6a6a;
}

.card-content {
  padding: 20px;
}

.card-content h3 {
  font-size: 18px;
  color: #2c3e2f;
  margin-bottom: 10px;
  line-height: 1.4;
}

.card-content p {
  font-size: 14px;
  color: #6a7a8a;
  line-height: 1.6;
  margin-bottom: 16px;
}

.card-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.date {
  font-size: 12px;
  color: #a8b3c0;
}

.read {
  font-size: 13px;
  color: #c9a87b;
  font-weight: 500;
}

/* ========== STATISTIK ========== */
.stats-section {
  background: #2c3e2f;
  padding: 50px 0;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 32px;
  text-align: center;
}

.stat-number {
  font-size: 36px;
  font-weight: 700;
  color: #c9a87b;
  margin-bottom: 8px;
}

.stat-label {
  font-size: 14px;
  color: rgba(255,255,255,0.7);
}

/* ========== CTA SECTION ========== */
.cta-section {
  padding: 60px 0;
  background: #f5f0e8;
  text-align: center;
}

.cta-content h3 {
  font-size: 28px;
  color: #2c3e2f;
  margin-bottom: 12px;
}

.cta-content p {
  color: #6a7a8a;
  margin-bottom: 24px;
}

.cta-button {
  background: #6b8c6b;
  color: white;
  border: none;
  padding: 12px 32px;
  border-radius: 40px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.3s;
}

.cta-button:hover {
  background: #4a6a4a;
}

/* ========== RESPONSIVE ========== */
@media (max-width: 768px) {
  .hero-header {
    height: 300px;
  }
  
  .hero-header h1 {
    font-size: 28px;
  }
  
  .section-title h2 {
    font-size: 24px;
  }
  
  .articles-grid {
    gap: 20px;
  }
  
  .stats-grid {
    gap: 20px;
  }
  
  .stat-number {
    font-size: 28px;
  }
}
</style>