<template>
  <div class="article-page">
    <div class="article-container">
      
      <!-- HEADER ARTIKEL -->
      <div class="article-header">
        <div class="header-meta">
          <span class="category-tag health">Kesehatan & Lingkungan</span>
          <span class="reading-time">10 Maret 2026 · 8 menit membaca</span>
        </div>
        <h1 class="article-title">Dampak Pencemaran Air bagi Kesehatan: Ancaman Tersembunyi yang Mengintai Setiap Hari</h1>
        <div class="author-credit">
          <span class="author">Tim Pakar PAKAR-AIR</span>
          <span class="separator">|</span>
          <span class="source">Sumber: World Health Organization & Kementerian Kesehatan RI</span>
        </div>
      </div>

      <!-- COVER GAMBAR (DIPERBAIKI) -->
      <div class="cover-container">
        <img 
          :src="coverImage" 
          alt="Ilustrasi pencemaran air" 
          class="cover-image"
        >
        <p class="cover-caption">
          Pencemaran air dapat menyebabkan berbagai penyakit serius, mulai dari diare akut hingga kanker | Ilustrasi: PAKAR-AIR
        </p>
      </div>

      <!-- KONTEN ARTIKEL -->
      <div class="article-body">
        
        <p class="lead-paragraph">
          <strong>Jakarta, PAKAR-AIR</strong> — Organisasi Kesehatan Dunia (WHO) melaporkan bahwa 
          sekitar <strong>80% penyakit di negara berkembang</strong> berkaitan erat dengan kualitas air yang buruk. 
          Setiap tahun, lebih dari <strong>3,4 juta orang meninggal</strong> akibat penyakit yang ditularkan melalui 
          air yang tercemar, dan sebagian besar korban adalah anak-anak di bawah usia 5 tahun.
        </p>

        <p>
          Pencemaran air bukan sekadar masalah lingkungan — ini adalah <strong>darurat kesehatan masyarakat</strong> 
          yang membutuhkan perhatian serius dari semua pihak. Berbagai kontaminan dalam air, mulai dari 
          bakteri patogen hingga logam berat beracun, dapat menyebabkan penyakit akut yang muncul dalam 
          hitungan jam, maupun penyakit kronis yang baru terdeteksi setelah bertahun-tahun.
        </p>

        <h2 class="section-title">1. Klasifikasi Pencemar Air</h2>
        <div class="card-grid">
          <div class="info-card-compact">
            <div class="card-icon">B</div>
            <div class="card-title">Pencemar Biologis</div>
            <div class="card-desc">
              <strong>Sumber:</strong> Kotoran manusia, hewan, limbah rumah tangga<br>
              <strong>Jenis:</strong> Bakteri E.coli, Salmonella typhi, Vibrio cholerae<br>
              <strong>Dampak:</strong> Diare, kolera, tifoid, hepatitis A
            </div>
          </div>
          <div class="info-card-compact">
            <div class="card-icon">K</div>
            <div class="card-title">Pencemar Kimiawi</div>
            <div class="card-desc">
              <strong>Sumber:</strong> Limbah industri, pertanian, rumah tangga<br>
              <strong>Jenis:</strong> Logam berat (timbal, merkuri), pestisida<br>
              <strong>Dampak:</strong> Gagal ginjal, kanker, gangguan saraf
            </div>
          </div>
          <div class="info-card-compact">
            <div class="card-icon">F</div>
            <div class="card-title">Pencemar Fisik</div>
            <div class="card-desc">
              <strong>Sumber:</strong> Erosi tanah, limbah konstruksi, sampah plastik<br>
              <strong>Jenis:</strong> Lumpur, sedimen, mikroplastik<br>
              <strong>Dampak:</strong> Gangguan pencernaan, iritasi saluran cerna
            </div>
          </div>
          <div class="info-card-compact">
            <div class="card-icon">R</div>
            <div class="card-title">Pencemar Radioaktif</div>
            <div class="card-desc">
              <strong>Sumber:</strong> Limbah industri nuklir, pertambangan<br>
              <strong>Jenis:</strong> Radium, Uranium, Radon<br>
              <strong>Dampak:</strong> Kanker, kerusakan sumsum tulang
            </div>
          </div>
        </div>

        <h2 class="section-title">2. Penyakit Akut (Jangka Pendek)</h2>
        <div class="disease-table">
          <div class="disease-header">
            <div class="col-disease">Penyakit</div>
            <div class="col-cause">Penyebab</div>
            <div class="col-symptom">Gejala Utama</div>
          </div>
          <div class="disease-row">
            <div class="col-disease"><strong>Diare / Kolera</strong></div>
            <div class="col-cause">Vibrio cholerae</div>
            <div class="col-symptom">Dehidrasi parah, muntah, BAB >3x/hari</div>
          </div>
          <div class="disease-row">
            <div class="col-disease"><strong>Demam Tifoid</strong></div>
            <div class="col-cause">Salmonella typhi</div>
            <div class="col-symptom">Demam tinggi hingga 40°C, sakit perut</div>
          </div>
          <div class="disease-row">
            <div class="col-disease"><strong>Hepatitis A</strong></div>
            <div class="col-cause">Virus HAV</div>
            <div class="col-symptom">Kulit menguning, lemas, urine gelap</div>
          </div>
          <div class="disease-row">
            <div class="col-disease"><strong>Leptospirosis</strong></div>
            <div class="col-cause">Bakteri Leptospira</div>
            <div class="col-symptom">Demam tinggi, nyeri otot betis, mata merah</div>
          </div>
        </div>

        <div class="alert-box">
          <div class="alert-icon">!</div>
          <div class="alert-content">
            <strong>Data Darurat WHO</strong>
            <p>Setiap hari, lebih dari <strong>800 anak di bawah 5 tahun</strong> meninggal akibat diare yang 
            terkait dengan air kotor dan sanitasi buruk. Kematian ini sebenarnya dapat dicegah.</p>
          </div>
        </div>

        <h2 class="section-title">3. Penyakit Kronis (Jangka Panjang)</h2>
        <div class="chronic-list">
          <div class="chronic-item">
            <div class="chronic-number">1</div>
            <div class="chronic-content">
              <strong>Gagal Ginjal Kronis</strong>
              <p>Logam berat seperti kadmium, timbal, dan merkuri terakumulasi di ginjal. Pasien cuci darah di Indonesia meningkat 10 kali lipat dalam satu dekade.</p>
            </div>
          </div>
          <div class="chronic-item">
            <div class="chronic-number">2</div>
            <div class="chronic-content">
              <strong>Gangguan Saraf pada Anak</strong>
              <p>Paparan timbal menurunkan IQ, menyebabkan ADHD, dan gangguan perilaku permanen. Kerusakan ini tidak dapat dipulihkan.</p>
            </div>
          </div>
          <div class="chronic-item">
            <div class="chronic-number">3</div>
            <div class="chronic-content">
              <strong>Kanker</strong>
              <p>Arsenik dalam air tanah menyebabkan kanker kulit, paru-paru, dan kandung kemih setelah konsumsi 5-15 tahun.</p>
            </div>
          </div>
          <div class="chronic-item">
            <div class="chronic-number">4</div>
            <div class="chronic-content">
              <strong>Gangguan Hormon & Reproduksi</strong>
              <p>Pestisida dan mikroplastik menyebabkan infertilitas, pubertas dini, dan kelainan janin.</p>
            </div>
          </div>
        </div>

        <h2 class="section-title">4. Fakta Pencemaran Air di Indonesia</h2>
        <div class="stats-grid">
          <div class="stat-card">
            <div class="stat-number">70%</div>
            <div class="stat-label">sungai di Jawa tercemar berat</div>
          </div>
          <div class="stat-card">
            <div class="stat-number">1/3</div>
            <div class="stat-label">sumur warga mengandung E.coli</div>
          </div>
          <div class="stat-card">
            <div class="stat-number">Rp 15 T</div>
            <div class="stat-label">biaya pengobatan per tahun</div>
          </div>
          <div class="stat-card">
            <div class="stat-number">54%</div>
            <div class="stat-label">akses air minum tak memenuhi syarat</div>
          </div>
        </div>

        <h2 class="section-title">5. Tindakan Pencegahan</h2>
        <div class="prevention-list">
          <div class="prevention-item">
            <div class="prevention-number">1</div>
            <div class="prevention-content">
              <strong>Skrining rutin dengan PAKAR-AIR</strong>
              <p>Lakukan analisis awal setiap 3 bulan, terutama jika sumber air dekat industri.</p>
            </div>
          </div>
          <div class="prevention-item">
            <div class="prevention-number">2</div>
            <div class="prevention-content">
              <strong>Rebus air hingga mendidih</strong>
              <p>Rebus minimal 10 menit untuk membunuh bakteri dan virus.</p>
            </div>
          </div>
          <div class="prevention-item">
            <div class="prevention-number">3</div>
            <div class="prevention-content">
              <strong>Gunakan filter air</strong>
              <p>Filter keramik atau karbon aktif dapat menyaring partikel dan sebagian logam.</p>
            </div>
          </div>
          <div class="prevention-item">
            <div class="prevention-number">4</div>
            <div class="prevention-content">
              <strong>Lindungi sumber air</strong>
              <p>Jangan buang sampah ke sungai. Pastikan septic tank kedap air.</p>
            </div>
          </div>
          <div class="prevention-item">
            <div class="prevention-number">5</div>
            <div class="prevention-content">
              <strong>Uji laboratorium</strong>
              <p>Jika PAKAR-AIR menunjukkan "Tercemar", segera uji lab.</p>
            </div>
          </div>
        </div>

        <div class="reference-section">
          <h3>Referensi</h3>
          <ul>
            <li>World Health Organization (WHO) — Guidelines for Drinking-water Quality</li>
            <li>Kementerian Kesehatan RI — Profil Kesehatan Indonesia 2024</li>
            <li>United Nations — Sustainable Development Goal 6: Clean Water and Sanitation</li>
          </ul>
        </div>

        <div class="closing-statement">
          <p><strong>Pesan PAKAR-AIR</strong></p>
          <p>Air bersih adalah hak setiap orang. Lakukan skrining rutin, terapkan pencegahan, dan lindungi keluarga dari risiko penyakit yang dapat dicegah.</p>
        </div>

      </div>

      <!-- FOOTER TOMBOL -->
      <div class="article-footer">
        <button class="btn-outline" @click="goBack">← Kembali ke Edukasi</button>
        <button class="btn-primary" @click="goToAnalysis">Cek Kualitas Air →</button>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  name: 'HomeArticle2',
  data() {
    return {
      coverImagePath: ''
    }
  },
  computed: {
    coverImage() {
      if (this.coverImagePath) {
        return this.coverImagePath
      }
      // Fallback ke placeholder jika gambar tidak ditemukan
      return 'https://placehold.co/860x450/e0d6cc/8b7355?text=Pencemaran+Air'
    }
  },
  mounted() {
    // Mencoba load gambar dari berbagai kemungkinan path
    const possiblePaths = [
      '@/assets/images/cover-pencemaran.jpg',
      '../assets/images/cover-pencemaran.jpg',
      './assets/images/cover-pencemaran.jpg'
    ]
    
    // Coba satu per satu
    for (const path of possiblePaths) {
      try {
        const imgPath = require(path)
        this.coverImagePath = imgPath
        break
      } catch (e) {
        // Lanjut ke path berikutnya
      }
    }
  },
  methods: {
    goBack() {
      this.$router.push('/edukasi')
    },
    goToAnalysis() {
      this.$router.push('/dashboard')
    }
  }
}
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.article-page {
  background: #f5f2ed;
  min-height: 100vh;
  padding: 40px 24px;
  font-family: 'Inter', -apple-system, 'Segoe UI', Roboto, sans-serif;
}

.article-container {
  max-width: 880px;
  margin: 0 auto;
  background: #ffffff;
  border-radius: 20px;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.05);
  overflow: hidden;
}

/* HEADER */
.article-header {
  padding: 44px 52px 0 52px;
}

.header-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  font-size: 13px;
  font-weight: 500;
}

.category-tag {
  background: #eae4da;
  color: #6b5a4a;
  padding: 5px 14px;
  border-radius: 30px;
  font-size: 12px;
}

.category-tag.health {
  background: #f0e0d8;
  color: #a06a5a;
}

.reading-time {
  color: #9a8e82;
}

.article-title {
  font-size: 34px;
  line-height: 1.3;
  font-weight: 600;
  color: #5a3a3a;
  margin-bottom: 18px;
}

.author-credit {
  font-size: 13px;
  color: #7e8c7e;
  border-top: 1px solid #e8e0d6;
  padding-top: 18px;
}

.separator {
  margin: 0 10px;
  color: #c0b4a4;
}

/* COVER */
.cover-container {
  padding: 30px 52px 0 52px;
}

.cover-image {
  width: 100%;
  border-radius: 16px;
  object-fit: cover;
}

.cover-caption {
  font-size: 12px;
  color: #a89888;
  text-align: center;
  margin-top: 12px;
  font-style: italic;
}

/* KONTEN */
.article-body {
  padding: 24px 52px 48px 52px;
}

.lead-paragraph {
  font-size: 17px;
  line-height: 1.65;
  color: #4a5a4a;
  margin-bottom: 28px;
  border-left: 3px solid #b8a88a;
  padding-left: 22px;
}

.article-body p {
  font-size: 16px;
  line-height: 1.7;
  color: #3a4a3c;
  margin-bottom: 18px;
}

.section-title {
  font-size: 24px;
  font-weight: 600;
  color: #5a3a3a;
  margin: 40px 0 20px 0;
  padding-bottom: 10px;
  border-bottom: 1px solid #e0d6cc;
}

/* Card Grid */
.card-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
  margin: 20px 0;
}

.info-card-compact {
  background: #f8f6f2;
  padding: 16px;
  border-radius: 12px;
  border: 1px solid #e0d6cc;
}

.card-icon {
  width: 32px;
  height: 32px;
  background: #4a6a4a;
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  margin-bottom: 12px;
}

.card-title {
  font-weight: 600;
  font-size: 15px;
  color: #5a3a3a;
  margin-bottom: 8px;
}

.card-desc {
  font-size: 12px;
  line-height: 1.5;
  color: #6a7a6a;
}

/* Disease Table */
.disease-table {
  margin: 20px 0;
  border: 1px solid #e0d6cc;
  border-radius: 12px;
  overflow: hidden;
}

.disease-header {
  display: flex;
  background: #e8e0d6;
  font-weight: 600;
  font-size: 13px;
}

.disease-row {
  display: flex;
  border-bottom: 1px solid #e0d6cc;
}

.disease-row:last-child {
  border-bottom: none;
}

.col-disease, .col-cause, .col-symptom {
  padding: 12px;
  font-size: 13px;
  line-height: 1.5;
}

.col-disease { width: 25%; background: #f8f6f2; font-weight: 500; }
.col-cause { width: 35%; }
.col-symptom { width: 40%; }

/* Alert Box */
.alert-box {
  background: #fef6e8;
  border-left: 4px solid #d4a06a;
  padding: 18px 22px;
  border-radius: 14px;
  margin: 28px 0;
  display: flex;
  gap: 16px;
}

.alert-icon {
  width: 28px;
  height: 28px;
  background: #d4a06a;
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  flex-shrink: 0;
}

.alert-content strong {
  display: block;
  margin-bottom: 6px;
  color: #a06a3a;
}

.alert-content p {
  margin: 0;
  font-size: 14px;
}

/* Chronic List */
.chronic-list {
  margin: 20px 0;
}

.chronic-item {
  display: flex;
  gap: 16px;
  margin-bottom: 20px;
  padding-bottom: 16px;
  border-bottom: 1px solid #e0d6cc;
}

.chronic-number {
  width: 32px;
  height: 32px;
  background: #d4a06a;
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  flex-shrink: 0;
}

.chronic-content strong {
  display: block;
  margin-bottom: 6px;
  color: #5a3a3a;
}

.chronic-content p {
  margin: 0;
  font-size: 14px;
  line-height: 1.55;
}

/* Stats Grid */
.stats-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
  margin: 24px 0;
}

.stat-card {
  background: #f8f6f2;
  padding: 16px;
  border-radius: 12px;
  text-align: center;
}

.stat-number {
  font-size: 28px;
  font-weight: 700;
  color: #d4a06a;
  margin-bottom: 8px;
}

.stat-label {
  font-size: 12px;
  color: #6a7a6a;
}

/* Prevention List */
.prevention-list {
  margin: 20px 0;
}

.prevention-item {
  display: flex;
  gap: 14px;
  margin-bottom: 12px;
  padding: 12px;
  background: #f8f6f2;
  border-radius: 12px;
}

.prevention-number {
  width: 30px;
  height: 30px;
  background: #6a9a6a;
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  flex-shrink: 0;
}

.prevention-content strong {
  display: block;
  margin-bottom: 4px;
  color: #4a6a4a;
}

.prevention-content p {
  margin: 0;
  font-size: 13px;
}

/* Reference */
.reference-section {
  background: #f8f6f2;
  padding: 20px 24px;
  border-radius: 14px;
  margin: 36px 0 24px 0;
}

.reference-section h3 {
  font-size: 15px;
  font-weight: 600;
  color: #6b5a4a;
  margin-bottom: 12px;
}

.reference-section ul {
  margin: 0;
  padding-left: 20px;
}

.reference-section li {
  font-size: 12px;
  color: #7e8c7e;
  margin-bottom: 6px;
}

/* Closing */
.closing-statement {
  background: #faf6f0;
  padding: 24px 28px;
  border-radius: 14px;
  margin-top: 32px;
}

.closing-statement p {
  margin-bottom: 12px;
  font-size: 15px;
  line-height: 1.6;
  color: #5a6a5a;
}

/* Footer */
.article-footer {
  padding: 20px 52px 44px 52px;
  border-top: 1px solid #e8e0d6;
  display: flex;
  justify-content: space-between;
  gap: 20px;
  background: #fefcf9;
}

.btn-outline, .btn-primary {
  padding: 12px 28px;
  border-radius: 40px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  font-family: inherit;
  transition: all 0.2s;
}

.btn-outline {
  background: transparent;
  border: 1px solid #d0c0b0;
  color: #6b5a4a;
}

.btn-outline:hover {
  background: #f0ece4;
}

.btn-primary {
  background: #a06a5a;
  border: none;
  color: white;
}

.btn-primary:hover {
  background: #8a5a4a;
}

/* Responsive */
@media (max-width: 700px) {
  .article-header, .cover-container, .article-body, .article-footer {
    padding-left: 20px;
    padding-right: 20px;
  }
  
  .article-title {
    font-size: 24px;
  }
  
  .header-meta {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }
  
  .card-grid, .stats-grid {
    grid-template-columns: 1fr;
  }
  
  .disease-header, .disease-row {
    flex-direction: column;
  }
  
  .col-disease, .col-cause, .col-symptom {
    width: 100%;
  }
  
  .article-footer {
    flex-direction: column;
  }
}
</style>
