<template>
  <div class="article-page">
    <div class="article-container">
      <!-- HEADER -->
      <header class="article-header">
        <div class="article-meta">
          <span class="article-category ai">Panduan Pengguna AI</span>
          <span class="article-date">15 Maret 2026 · 5 menit membaca</span>
        </div>
        <h1 class="article-title">Memahami Hasil PAKAR-AIR: Panduan Interpretasi Kategori dan Confidence Score</h1>
        <div class="article-byline">
          <span class="author">Tim Pakar PAKAR-AIR</span>
          <span class="separator">•</span>
          <span class="source">Sumber: Dokumentasi Teknis PAKAR-AIR v1.0</span>
        </div>
      </header>

      <!-- GAMBAR -->
      <figure class="article-figure">
        <img src="https://placehold.co/900x500/6b8c6b/ffffff?text=Hasil+Analisis+PAKAR-AIR" alt="Hasil analisis PAKAR-AIR" class="hero-image">
        <figcaption class="image-caption">PAKAR-AIR memberikan hasil dalam tiga kategori dengan tingkat kepercayaan | Ilustrasi: PAKAR-AIR</figcaption>
      </figure>

      <!-- KONTEN -->
      <div class="article-content">
        <p class="lead">
          <strong>Jakarta, PAKAR-AIR</strong> — Setelah Anda melakukan analisis kualitas air menggunakan 
          PAKAR-AIR, sistem akan menampilkan hasil prediksi yang terdiri dari kategori kualitas air, 
          tingkat kepercayaan (confidence score), dan rekomendasi penggunaan. Berikut panduan lengkapnya.
        </p>

        <h2>Tiga Kategori Kualitas Air</h2>
        <div class="kategori-grid">
          <div class="kategori-card aman">
            <div class="kategori-icon">✅</div>
            <h3>Aman</h3>
            <p>Air memenuhi standar fisik dan parameter umum.</p>
            <div class="kategori-action">Cocok untuk mandi, cuci, masak setelah direbus.</div>
          </div>
          <div class="kategori-card perlu">
            <div class="kategori-icon">⚠️</div>
            <h3>Perlu Perlakuan</h3>
            <p>Terdeteksi kekeruhan atau bau ringan.</p>
            <div class="kategori-action">Saring, endapkan, atau rebus 15 menit sebelum digunakan.</div>
          </div>
          <div class="kategori-card tercemar">
            <div class="kategori-icon">❌</div>
            <h3>Berpotensi Tercemar</h3>
            <p>Indikasi kuat kontaminan berbahaya.</p>
            <div class="kategori-action">JANGAN digunakan. Segera lakukan uji laboratorium.</div>
          </div>
        </div>

        <h2>Memahami Confidence Score</h2>
        <p>
          <strong>Confidence score</strong> adalah angka 0-100% yang menunjukkan <strong>seberapa yakin model AI</strong> 
          terhadap prediksinya. Angka ini dihitung dari kualitas data input Anda (foto yang jelas, 
          data manual yang lengkap).
        </p>

        <div class="confidence-container">
          <div class="confidence-bar">
            <div class="bar-segment high" style="width: 40%">80-100%</div>
            <div class="bar-segment medium" style="width: 35%">60-79%</div>
            <div class="bar-segment low" style="width: 25%">0-59%</div>
          </div>
          <div class="confidence-legend">
            <span><span class="legend-dot high"></span> Tinggi (80-100%) — Prediksi sangat kuat, dapat diandalkan</span>
            <span><span class="legend-dot medium"></span> Sedang (60-79%) — Cukup yakin, ulang dengan foto lebih baik</span>
            <span><span class="legend-dot low"></span> Rendah (0-59%) — Kualitas input kurang, ulangi analisis</span>
          </div>
        </div>

        <div class="info-card tip">
          <div class="info-icon">💡</div>
          <div class="info-content">
            <strong>Tips Meningkatkan Confidence Score</strong>
            <ul>
              <li>Gunakan foto dengan pencahayaan alami yang cukup (siang hari)</li>
              <li>Letakkan air dalam wadah bening dengan latar belakang putih</li>
              <li>Isi semua data manual dengan jujur dan teliti</li>
              <li>Hindari foto yang buram, terlalu gelap, atau terkena bayangan</li>
            </ul>
          </div>
        </div>

        <h2>Contoh Hasil Analisis</h2>
        <div class="example-list">
          <div class="example-item">
            <div class="example-header">Skenario 1: Air Sumur Warga</div>
            <div class="example-body">
              <p><strong>Input:</strong> Foto air jernih, data: tidak berbau, sumber sumur, lingkungan pemukiman.</p>
              <p><strong>Output PAKAR-AIR:</strong></p>
              <ul>
                <li>Kategori: <span class="badge-safe">Aman</span></li>
                <li>Confidence Score: 94%</li>
                <li>Rekomendasi: Air layak digunakan. Rebus sebelum minum.</li>
              </ul>
            </div>
          </div>
          <div class="example-item">
            <div class="example-header">Skenario 2: Air Sungai Dekat Pabrik</div>
            <div class="example-body">
              <p><strong>Input:</strong> Foto agak keruh, data: bau amis, sumber sungai, lingkungan industri.</p>
              <p><strong>Output PAKAR-AIR:</strong></p>
              <ul>
                <li>Kategori: <span class="badge-danger">Berpotensi Tercemar</span></li>
                <li>Confidence Score: 87%</li>
                <li>Rekomendasi: JANGAN digunakan. Uji laboratorium diperlukan.</li>
              </ul>
            </div>
          </div>
          <div class="example-item">
            <div class="example-header">Skenario 3: Foto Kurang Jelas</div>
            <div class="example-body">
              <p><strong>Input:</strong> Foto gelap, data manual tidak lengkap.</p>
              <p><strong>Output PAKAR-AIR:</strong></p>
              <ul>
                <li>Kategori: Tidak dapat ditentukan</li>
                <li>Confidence Score: 42% (Rendah)</li>
                <li>Rekomendasi: Ulangi analisis dengan foto yang lebih jelas dan data lengkap.</li>
              </ul>
            </div>
          </div>
        </div>

        <div class="warning-card">
          <div class="warning-icon">⚠️</div>
          <div class="warning-content">
            <strong>Batasan PAKAR-AIR (Harus Dipahami)</strong>
            <ul>
              <li>PAKAR-AIR adalah <strong>alat skrining awal (screening tool)</strong>, BUKAN pengganti uji laboratorium bersertifikasi.</li>
              <li>Parameter yang dianalisis terbatas pada aspek visual dan data manual.</li>
              <li>Jika confidence score di bawah 60% atau kategori "Tercemar", <strong>WAJIB</strong> melakukan konfirmasi ke laboratorium.</li>
              <li>Keputusan akhir penggunaan air sepenuhnya ada di tangan pengguna.</li>
            </ul>
          </div>
        </div>

        <div class="faq-section">
          <h3>❓ Pertanyaan Umum</h3>
          <div class="faq-item">
            <div class="faq-question">Apakah PAKAR-AIR bisa menggantikan tes laboratorium?</div>
            <div class="faq-answer">Tidak. PAKAR-AIR hanya memberikan estimasi awal berbasis AI. Untuk keperluan medis atau legal, tetap harus menggunakan uji laboratorium standar.</div>
          </div>
          <div class="faq-item">
            <div class="faq-question">Kenapa confidence score saya rendah padahal air terlihat bersih?</div>
            <div class="faq-answer">Kemungkinan karena foto kurang jelas, pencahayaan buruk, atau data manual tidak lengkap. Coba ulang dengan foto lebih baik dan isi semua parameter.</div>
          </div>
          <div class="faq-item">
            <div class="faq-question">Apakah data analisis saya aman?</div>
            <div class="faq-answer">Ya, data Anda disimpan untuk riwayat analisis dan hanya bisa diakses oleh akun Anda. PAKAR-AIR mematuhi prinsip privasi data.</div>
          </div>
        </div>

        <div class="reference-card">
          <h4>📚 Referensi</h4>
          <ul>
            <li>Dokumentasi Teknis PAKAR-AIR v1.0</li>
            <li>Peraturan Menteri Kesehatan RI No. 492/Menkes/Per/IV/2010</li>
            <li>WHO — Guidelines for Drinking-water Quality</li>
          </ul>
        </div>

        <p class="closing-note">
          PAKAR-AIR hadir untuk membantu Anda mendapatkan informasi awal tentang kualitas air 
          secara cepat dan mudah. Gunakan hasil analisis sebagai panduan, dan jangan ragu untuk 
          berkonsultasi dengan tenaga kesehatan atau laboratorium jika diperlukan.
        </p>
      </div>

      <!-- FOOTER -->
      <footer class="article-footer">
        <button @click="$router.back()" class="btn-outline">← Kembali ke Edukasi</button>
        <button @click="cobaAnalisis" class="btn-primary ai-btn">Coba Analisis Sekarang →</button>
      </footer>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ArtikelInterpretasi',
  methods: {
    cobaAnalisis() {
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

.article-page {
  background: #faf8f5;
  min-height: 100vh;
  padding: 2rem 1rem;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

.article-container {
  max-width: 860px;
  margin: 0 auto;
  background: #ffffff;
  border-radius: 24px;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.04);
  overflow: hidden;
}

.article-header {
  padding: 2.5rem 2.8rem 1rem 2.8rem;
}

.article-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.2rem;
  font-size: 0.8rem;
}

.article-category {
  background: #f0ebe3;
  color: #8b7355;
  padding: 0.2rem 0.8rem;
  border-radius: 20px;
  font-weight: 500;
}

.article-category.ai {
  background: #e8eef0;
  color: #4a6a6a;
}

.article-date {
  color: #9aa6b5;
}

.article-title {
  font-size: 2rem;
  line-height: 1.3;
  font-weight: 600;
  color: #3a5a4a;
  margin-bottom: 1rem;
  letter-spacing: -0.3px;
}

.article-byline {
  font-size: 0.8rem;
  color: #7c8b9c;
  border-top: 1px solid #edebe6;
  padding-top: 1rem;
}

.separator {
  margin: 0 0.5rem;
}

.article-figure {
  margin: 1.5rem 2.8rem;
}

.hero-image {
  width: 100%;
  border-radius: 16px;
  object-fit: cover;
}

.image-caption {
  font-size: 0.7rem;
  color: #a8b3c0;
  text-align: center;
  margin-top: 0.6rem;
}

.article-content {
  padding: 0 2.8rem 2rem 2.8rem;
}

.lead {
  font-size: 1.1rem;
  line-height: 1.6;
  color: #4b5c6e;
  margin-bottom: 1.5rem;
  border-left: 3px solid #c9a87b;
  padding-left: 1.2rem;
}

p {
  font-size: 1rem;
  line-height: 1.7;
  color: #3a4a5c;
  margin-bottom: 1.2rem;
}

h2 {
  font-size: 1.4rem;
  font-weight: 600;
  color: #3a5a4a;
  margin: 2rem 0 1rem 0;
  border-bottom: 2px solid #e8e2d8;
  padding-bottom: 0.3rem;
}

h3 {
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.kategori-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.2rem;
  margin: 1.5rem 0;
}

.kategori-card {
  background: #f8f6f2;
  padding: 1.2rem;
  border-radius: 16px;
  text-align: center;
  border-top: 3px solid;
}

.kategori-card.aman { border-top-color: #6b8c6b; }
.kategori-card.perlu { border-top-color: #d4a373; }
.kategori-card.tercemar { border-top-color: #b85c5c; }

.kategori-icon {
  font-size: 2rem;
  margin-bottom: 0.5rem;
}

.kategori-card h3 {
  color: #4a5a4a;
  margin-bottom: 0.5rem;
}

.kategori-card p {
  font-size: 0.9rem;
  margin-bottom: 0.8rem;
}

.kategori-action {
  font-size: 0.8rem;
  background: rgba(0,0,0,0.04);
  padding: 0.5rem;
  border-radius: 8px;
  color: #6a7a6a;
}

.confidence-container {
  background: #f8f6f2;
  padding: 1.2rem;
  border-radius: 16px;
  margin: 1rem 0;
}

.confidence-bar {
  display: flex;
  height: 40px;
  border-radius: 8px;
  overflow: hidden;
  margin-bottom: 1rem;
}

.bar-segment {
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: bold;
  font-size: 0.7rem;
}

.bar-segment.high { background: #6b8c6b; }
.bar-segment.medium { background: #d4a373; }
.bar-segment.low { background: #b85c5c; }

.confidence-legend {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  font-size: 0.7rem;
}

.legend-dot {
  display: inline-block;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  margin-right: 4px;
}

.legend-dot.high { background: #6b8c6b; }
.legend-dot.medium { background: #d4a373; }