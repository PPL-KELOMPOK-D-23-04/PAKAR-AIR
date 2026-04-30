<template>
  <div class="article-page">
    <div class="article-container">
      
      <!-- ========== HEADER ARTIKEL ========== -->
      <div class="article-header">
        <div class="header-meta">
          <span class="category-tag ai">Panduan Pengguna AI</span>
          <span class="reading-time">15 Maret 2026 · 6 menit membaca</span>
        </div>
        <h1 class="article-title">Memahami Hasil Analisis PAKAR-AIR: Panduan Lengkap Interpretasi Kualitas Air</h1>
        <div class="author-credit">
          <span class="author">Tim Pakar PAKAR-AIR</span>
          <span class="separator">|</span>
          <span class="source">Sumber: Dokumentasi Teknis PAKAR-AIR v1.0</span>
        </div>
      </div>

      <!-- ========== COVER GAMBAR ========== -->
      <div class="cover-container">
        <img 
          :src="coverImage" 
          alt="Hasil Analisis PAKAR-AIR" 
          class="cover-image"
          @error="setPlaceholder"
        >
        <p class="cover-caption">
          PAKAR-AIR memberikan hasil analisis air dalam tiga kategori dengan tingkat kepercayaan (confidence score) | Ilustrasi: PAKAR-AIR
        </p>
      </div>

      <!-- ========== KONTEN ARTIKEL ========== -->
      <div class="article-body">
        
        <!-- Lead / Pembuka -->
        <p class="lead-paragraph">
          <strong>Jakarta, PAKAR-AIR</strong> — Setelah Anda melakukan analisis kualitas air menggunakan 
          PAKAR-AIR, sistem akan menampilkan hasil prediksi yang terdiri dari <strong>tiga komponen utama</strong>: 
          kategori kualitas air, tingkat kepercayaan (confidence score), dan rekomendasi penggunaan. 
          Panduan ini akan membantu Anda memahami setiap komponen tersebut secara mendalam, sehingga 
          Anda dapat mengambil keputusan yang tepat berdasarkan hasil analisis.
        </p>

        <p>
          PAKAR-AIR (Pendeteksi Kualitas Air Berbasis Artificial Intelligence dan Rekognisi Citra) 
          adalah sistem yang dirancang untuk memberikan estimasi awal kualitas air melalui kombinasi 
          analisis citra air dan data manual yang Anda inputkan. Sebagai <strong>alat bantu (decision support system)</strong>, 
          PAKAR-AIR membantu Anda mendapatkan gambaran awal tentang kualitas air secara cepat, mudah, 
          dan terjangkau — sebelum memutuskan untuk melakukan uji laboratorium lebih lanjut jika diperlukan.
        </p>

        <!-- ========== BAGIAN 1: TIGA KATEGORI ========== -->
        <h2 class="section-title">1. Tiga Kategori Kualitas Air</h2>
        <p>
          Berdasarkan parameter yang dianalisis (warna, kekeruhan, bau, sumber air, kondisi lingkungan, 
          serta fitur visual dari citra air), PAKAR-AIR mengklasifikasikan kualitas air ke dalam 
          <strong>tiga kategori utama</strong>. Berikut penjelasan detail setiap kategori:
        </p>

        <div class="kategori-grid">
          <!-- Kategori Aman -->
          <div class="kategori-card aman">
            <div class="kategori-icon">A</div>
            <div class="kategori-title">Aman</div>
            <div class="kategori-badge">Rekomendasi: Dapat Digunakan</div>
            <p>Air memenuhi standar fisik dan parameter umum yang ditetapkan oleh Peraturan Menteri Kesehatan RI.</p>
            <div class="kategori-detail">
              <strong>Karakteristik:</strong>
              <ul>
                <li>Tidak berwarna atau sangat jernih</li>
                <li>Tidak berbau</li>
                <li>Tidak berasa</li>
                <li>Tidak ada partikel tersuspensi</li>
              </ul>
            </div>
            <div class="kategori-action">Tindakan: Rebus hingga mendidih sebelum dikonsumsi.</div>
          </div>

          <!-- Kategori Perlu Perlakuan -->
          <div class="kategori-card perlu">
            <div class="kategori-icon">P</div>
            <div class="kategori-title">Perlu Perlakuan</div>
            <div class="kategori-badge">Rekomendasi: Harus Diolah</div>
            <p>Terdeteksi adanya kekeruhan, bau ringan, warna mencurigakan, atau indikasi awal kontaminasi.</p>
            <div class="kategori-detail">
              <strong>Karakteristik:</strong>
              <ul>
                <li>Sedikit keruh atau berwarna (kekuningan/kehijauan)</li>
                <li>Bau amis atau tanah (tidak menyengat)</li>
                <li>Mungkin mengandung partikel tersuspensi</li>
              </ul>
            </div>
            <div class="kategori-action">Tindakan: Saring, endapkan 2-4 jam, rebus 15 menit.</div>
          </div>

          <!-- Kategori Tercemar -->
          <div class="kategori-card tercemar">
            <div class="kategori-icon">T</div>
            <div class="kategori-title">Berpotensi Tercemar</div>
            <div class="kategori-badge">Rekomendasi: Jangan Digunakan</div>
            <p>Indikasi kuat adanya kontaminan berbahaya (bakteri patogen, logam berat, limbah kimia).</p>
            <div class="kategori-detail">
              <strong>Karakteristik:</strong>
              <ul>
                <li>Keruh pekat, berwarna (coklat, merah, kehitaman)</li>
                <li>Bau menyengat (telur busuk, minyak, kimia)</li>
                <li>Dari lingkungan berisiko tinggi (dekat industri)</li>
              </ul>
            </div>
            <div class="kategori-action">Tindakan: JANGAN digunakan. Segera uji laboratorium.</div>
          </div>
        </div>

        <!-- ========== BAGIAN 2: CONFIDENCE SCORE ========== -->
        <h2 class="section-title">2. Memahami Confidence Score (Tingkat Kepercayaan)</h2>
        <p>
          <strong>Confidence score</strong> adalah angka antara 0-100% yang menunjukkan seberapa yakin model AI 
          PAKAR-AIR terhadap prediksi yang dihasilkan. Angka ini dihitung berdasarkan <strong>kualitas dan kelengkapan data input</strong> 
          yang Anda berikan, meliputi:
        </p>
        <ul class="styled-list">
          <li>Kualitas foto air (pencahayaan, ketajaman, latar belakang, kontras)</li>
          <li>Kelengkapan data manual (warna, bau, sumber air, kondisi lingkungan)</li>
          <li>Kesesuaian antara data visual dan data manual yang diinput</li>
        </ul>

        <div class="confidence-container">
          <div class="confidence-bar">
            <div class="bar high" style="width: 40%">80 - 100%</div>
            <div class="bar medium" style="width: 35%">60 - 79%</div>
            <div class="bar low" style="width: 25%">0 - 59%</div>
          </div>
          <div class="confidence-legend">
            <div class="legend-item">
              <div class="dot high"></div>
              <div><strong>Tinggi (80-100%)</strong> — Prediksi sangat kuat, hasil dapat diandalkan untuk pengambilan keputusan.</div>
            </div>
            <div class="legend-item">
              <div class="dot medium"></div>
              <div><strong>Sedang (60-79%)</strong> — Prediksi cukup yakin, disarankan mengulang analisis dengan foto yang lebih baik.</div>
            </div>
            <div class="legend-item">
              <div class="dot low"></div>
              <div><strong>Rendah (0-59%)</strong> — Kualitas input tidak memadai. Ulangi analisis dengan pencahayaan lebih baik.</div>
            </div>
          </div>
        </div>

        <div class="info-tips">
          <div class="tips-icon">i</div>
          <div class="tips-content">
            <strong>Tips Meningkatkan Confidence Score</strong>
            <ul>
              <li>Gunakan foto dengan pencahayaan alami yang cukup (pukul 10.00 - 14.00)</li>
              <li>Letakkan sampel air dalam wadah bening dengan latar belakang putih bersih</li>
              <li>Pastikan foto tidak buram, tidak terlalu gelap, dan tidak terkena bayangan</li>
              <li>Isi seluruh data manual dengan jujur dan teliti</li>
              <li>Jangan gunakan filter atau efek kamera saat memotret sampel air</li>
            </ul>
          </div>
        </div>

        <!-- ========== BAGIAN 3: CONTOH KASUS ========== -->
        <h2 class="section-title">3. Contoh Hasil Analisis</h2>
        <p>
          Berikut adalah beberapa skenario contoh hasil analisis menggunakan PAKAR-AIR untuk membantu 
          Anda memahami output sistem:
        </p>

        <div class="examples-list">
          <div class="example-item">
            <div class="example-header">📋 Skenario 1: Air Sumur di Daerah Pemukiman</div>
            <div class="example-body">
              <p><strong>Data Input:</strong> Foto air jernih, tidak berbau, sumber sumur, lingkungan pemukiman.</p>
              <p><strong>Output PAKAR-AIR:</strong></p>
              <ul>
                <li>Kategori: <span class="badge aman-badge">Aman</span></li>
                <li>Confidence Score: 94% (Tinggi)</li>
                <li>Rekomendasi: Air layak digunakan. Rebus sebelum minum.</li>
              </ul>
              <p class="interpretasi">Interpretasi: Sangat baik. Data input berkualitas tinggi. Air aman digunakan.</p>
            </div>
          </div>

          <div class="example-item">
            <div class="example-header">📋 Skenario 2: Air Sungai di Dekat Kawasan Industri</div>
            <div class="example-body">
              <p><strong>Data Input:</strong> Foto keruh kecoklatan, bau amis, sumber sungai, lingkungan industri.</p>
              <p><strong>Output PAKAR-AIR:</strong></p>
              <ul>
                <li>Kategori: <span class="badge tercemar-badge">Berpotensi Tercemar</span></li>
                <li>Confidence Score: 87% (Tinggi)</li>
                <li>Rekomendasi: JANGAN digunakan. Segera uji laboratorium.</li>
              </ul>
              <p class="interpretasi">Interpretasi: Peringatan serius. Harus segera ditindaklanjuti dengan uji lab.</p>
            </div>
          </div>

          <div class="example-item">
            <div class="example-header">📋 Skenario 3: Kualitas Input Kurang Baik</div>
            <div class="example-body">
              <p><strong>Data Input:</strong> Foto gelap buram, data manual tidak diisi.</p>
              <p><strong>Output PAKAR-AIR:</strong></p>
              <ul>
                <li>Kategori: Tidak dapat ditentukan</li>
                <li>Confidence Score: 42% (Rendah)</li>
                <li>Rekomendasi: Ulangi analisis dengan foto yang lebih jelas dan data lengkap.</li>
              </ul>
              <p class="interpretasi">Interpretasi: Hasil tidak dapat diandalkan. Perbaiki kualitas input.</p>
            </div>
          </div>

          <div class="example-item">
            <div class="example-header">📋 Skenario 4: Air PDAM di Perkotaan</div>
            <div class="example-body">
              <p><strong>Data Input:</strong> Foto air jernih, bau kaporit ringan, sumber PDAM.</p>
              <p><strong>Output PAKAR-AIR:</strong></p>
              <ul>
                <li>Kategori: <span class="badge perlu-badge">Perlu Perlakuan</span></li>
                <li>Confidence Score: 76% (Sedang)</li>
                <li>Rekomendasi: Endapkan 30 menit atau gunakan filter karbon aktif.</li>
              </ul>
              <p class="interpretasi">Interpretasi: Air PDAM umumnya memenuhi standar, kadar klorin tinggi.</p>
            </div>
          </div>
        </div>

        <!-- ========== BAGIAN 4: BATASAN SISTEM ========== -->
        <h2 class="section-title">4. Batasan PAKAR-AIR (Harus Dipahami)</h2>
        <p>
          Sebagai pengguna PAKAR-AIR, penting untuk memahami keterbatasan sistem agar tidak 
          terjadi kesalahan interpretasi:
        </p>

        <div class="limitation-box">
          <div class="limitation-icon">!</div>
          <div class="limitation-content">
            <strong>Batasan Fundamental PAKAR-AIR</strong>
            <ul>
              <li><strong>Bukan pengganti uji laboratorium:</strong> PAKAR-AIR adalah alat skrining awal (screening tool), BUKAN pengganti uji laboratorium bersertifikasi.</li>
              <li><strong>Parameter terbatas:</strong> Sistem tidak mendeteksi virus, logam berat kadar sangat rendah, pestisida, atau kontaminan mikroba spesifik secara langsung.</li>
              <li><strong>Ketergantungan pada kualitas input:</strong> Akurasi prediksi sangat bergantung pada kualitas foto dan kelengkapan data manual.</li>
              <li><strong>Estimasi, bukan diagnosis:</strong> Hasil PAKAR-AIR adalah estimasi awal berdasarkan dataset pelatihan model AI.</li>
            </ul>
          </div>
        </div>

        <p>
          Jika confidence score berada di bawah 60% atau kategori menunjukkan "Berpotensi Tercemar", 
          <strong>WAJIB melakukan konfirmasi ke laboratorium kesehatan lingkungan terdekat</strong> 
          (Balai Teknis Kesehatan Lingkungan atau Laboratorium Kesehatan Daerah).
        </p>

        <!-- ========== BAGIAN 5: FAQ ========== -->
        <h2 class="section-title">5. Pertanyaan yang Sering Diajukan (FAQ)</h2>

        <div class="faq-list">
          <div class="faq-item">
            <div class="faq-question">Apakah PAKAR-AIR bisa menggantikan tes laboratorium?</div>
            <div class="faq-answer">Tidak. PAKAR-AIR adalah alat skrining awal. Untuk keperluan medis, legal, atau komersial, Anda tetap WAJIB menggunakan uji laboratorium standar yang terakreditasi.</div>
          </div>
          <div class="faq-item">
            <div class="faq-question">Seberapa akurat PAKAR-AIR?</div>
            <div class="faq-answer">PAKAR-AIR memiliki tingkat akurasi sekitar 85-90% untuk deteksi kontaminasi tingkat menengah hingga berat berdasarkan parameter visual.</div>
          </div>
          <div class="faq-item">
            <div class="faq-question">Mengapa confidence score saya rendah padahal air terlihat bersih?</div>
            <div class="faq-answer">Confidence score rendah biasanya disebabkan oleh kualitas foto yang kurang baik: pencahayaan kurang, gambar buram, latar belakang tidak kontras, atau data manual tidak lengkap.</div>
          </div>
          <div class="faq-item">
            <div class="faq-question">Apakah data analisis saya aman?</div>
            <div class="faq-answer">Ya. Semua data analisis Anda disimpan secara aman untuk keperluan riwayat analisis. Data hanya dapat diakses oleh akun Anda sendiri.</div>
          </div>
        </div>

        <!-- ========== REFERENSI ========== -->
        <div class="reference-section">
          <h3>Referensi</h3>
          <ul>
            <li>Dokumentasi Teknis PAKAR-AIR (Pendeteksi Kualitas Air Berbasis Artificial Intelligence) v1.0</li>
            <li>Peraturan Menteri Kesehatan RI No. 492/Menkes/Per/IV/2010 tentang Persyaratan Kualitas Air Minum</li>
            <li>World Health Organization (WHO) — Guidelines for Drinking-water Quality, 4th Edition</li>
            <li>United Nations Sustainable Development Goal 6: Clean Water and Sanitation</li>
          </ul>
        </div>

        <!-- ========== PENUTUP ========== -->
        <div class="closing-statement">
          <p>
            <strong>Pesan PAKAR-AIR</strong><br>
            Kami berharap panduan ini membantu Anda memahami hasil analisis air dengan lebih baik. 
            PAKAR-AIR hadir untuk memberdayakan masyarakat dalam memantau kualitas air secara mandiri. 
            Dengan pengetahuan yang tepat, Anda dapat melindungi diri, keluarga, dan lingkungan dari 
            risiko yang terkait dengan air tercemar.
          </p>
          <p class="hashtag">#AirBersihUntukSemua #SDG6 #PAKARAIR #AIuntukLingkungan</p>
        </div>

      </div>

      <!-- ========== FOOTER TOMBOL ========== -->
      <div class="article-footer">
        <button class="btn-outline" @click="goBack">← Kembali ke Halaman Edukasi</button>
        <button class="btn-primary" @click="goToAnalysis">Coba Analisis Sekarang →</button>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  name: 'HomeArticle3',
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
      return 'https://placehold.co/860x450/4a6a8a/ffffff?text=Analisis+PAKAR-AIR'
    }
  },
  mounted() {
    // Mencoba load gambar dari berbagai kemungkinan path
    const possiblePaths = [
      '@/assets/images/cover-ai-analisis.jpg',
      '../assets/images/cover-ai-analisis.jpg',
      './assets/images/cover-ai-analisis.jpg',
      '@/assets/images/cover-ai-analisis.png',
      '../assets/images/cover-ai-analisis.png'
    ]
    
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
    setPlaceholder() {
      this.coverImagePath = 'https://placehold.co/860x450/4a6a8a/ffffff?text=Hasil+Analisis+PAKAR-AIR'
    },
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

/* ========== HEADER ========== */
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

.category-tag.ai {
  background: #e0e8e0;
  color: #4a6a5a;
}

.reading-time {
  color: #9a8e82;
}

.article-title {
  font-size: 34px;
  line-height: 1.3;
  font-weight: 600;
  color: #3a5a4a;
  margin-bottom: 18px;
  letter-spacing: -0.3px;
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

/* ========== COVER GAMBAR ========== */
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

/* ========== KONTEN ========== */
.article-body {
  padding: 24px 52px 48px 52px;
}

.lead-paragraph {
  font-size: 17px;
  line-height: 1.65;
  color: #4a5a4a;
  margin-bottom: 28px;
  border-left: 3px solid #6a9a6a;
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
  color: #3a5a4a;
  margin: 40px 0 20px 0;
  padding-bottom: 10px;
  border-bottom: 2px solid #e0d6cc;
}

/* ========== KATEGORI GRID (3 KATEGORI) ========== */
.kategori-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  margin: 24px 0;
}

.kategori-card {
  background: #f8f6f2;
  border-radius: 16px;
  padding: 20px;
  text-align: center;
  border-top: 3px solid;
}

.kategori-card.aman { border-top-color: #6a9a6a; }
.kategori-card.perlu { border-top-color: #d4a06a; }
.kategori-card.tercemar { border-top-color: #c46a4a; }

.kategori-icon {
  width: 48px;
  height: 48px;
  background: rgba(0,0,0,0.05);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  font-weight: bold;
  margin: 0 auto 12px auto;
}

.kategori-title {
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 8px;
}

.aman .kategori-title { color: #4a6a4a; }
.perlu .kategori-title { color: #c9a06a; }
.tercemar .kategori-title { color: #c46a4a; }

.kategori-badge {
  font-size: 11px;
  background: rgba(0,0,0,0.05);
  padding: 4px 8px;
  border-radius: 20px;
  display: inline-block;
  margin-bottom: 12px;
}

.kategori-card p {
  font-size: 13px;
  margin-bottom: 12px;
  color: #6a7a6a;
}

.kategori-detail {
  font-size: 12px;
  text-align: left;
  margin: 12px 0;
  padding: 10px;
  background: rgba(0,0,0,0.02);
  border-radius: 10px;
}

.kategori-detail ul {
  margin: 6px 0 0 18px;
  padding: 0;
}

.kategori-detail li {
  font-size: 11px;
  margin-bottom: 4px;
}

.kategori-action {
  font-size: 12px;
  background: rgba(0,0,0,0.03);
  padding: 10px;
  border-radius: 8px;
  margin-top: 10px;
  font-weight: 500;
}

/* ========== CONFIDENCE SCORE ========== */
.confidence-container {
  background: #f8f6f2;
  padding: 24px;
  border-radius: 16px;
  margin: 24px 0;
}

.confidence-bar {
  display: flex;
  height: 48px;
  border-radius: 10px;
  overflow: hidden;
  margin-bottom: 20px;
}

.bar {
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: bold;
  font-size: 14px;
}

.bar.high { background: #6a9a6a; }
.bar.medium { background: #d4a06a; }
.bar.low { background: #c46a4a; }

.confidence-legend {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.legend-item {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  font-size: 13px;
  line-height: 1.4;
}

.dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  margin-top: 3px;
  flex-shrink: 0;
}

.dot.high { background: #6a9a6a; }
.dot.medium { background: #d4a06a; }
.dot.low { background: #c46a4a; }

/* ========== INFO TIPS ========== */
.info-tips {
  background: #e8f0e8;
  padding: 20px;
  border-radius: 14px;
  margin: 24px 0;
  display: flex;
  gap: 16px;
}

.tips-icon {
  width: 32px;
  height: 32px;
  background: #4a6a4a;
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  flex-shrink: 0;
}

.tips-content strong {
  display: block;
  margin-bottom: 8px;
  color: #2c4a2e;
}

.tips-content ul {
  margin: 0;
  padding-left: 18px;
}

.tips-content li {
  margin-bottom: 6px;
  font-size: 13px;
}

/* ========== CONTOH KASUS ========== */
.examples-list {
  margin: 20px 0;
}

.example-item {
  border: 1px solid #e0d6cc;
  border-radius: 12px;
  margin-bottom: 16px;
  overflow: hidden;
}

.example-header {
  background: #f0ece4;
  padding: 12px 16px;
  font-weight: 600;
  color: #5a4a3a;
}

.example-body {
  padding: 16px;
}

.example-body p {
  font-size: 13px;
  margin-bottom: 8px;
}

.example-body ul {
  margin: 6px 0 8px 20px;
}

.example-body li {
  font-size: 13px;
  margin-bottom: 4px;
}

.interpretasi {
  font-size: 12px;
  color: #6a7a6a;
  font-style: italic;
  margin-top: 8px;
  padding-top: 8px;
  border-top: 1px dashed #e0d6cc;
}

/* ========== BADGES ========== */
.badge {
  padding: 2px 10px;
  border-radius: 20px;
  font-size: 11px;
  font-weight: 500;
}

.aman-badge { background: #d4e5d4; color: #3d6b3d; }
.perlu-badge { background: #f0e5c8; color: #a5832e; }
.tercemar-badge { background: #f0d6d6; color: #b85c5c; }

/* ========== LIMITATION BOX ========== */
.limitation-box {
  background: #fef6e8;
  border-left: 4px solid #d4a06a;
  padding: 18px 22px;
  border-radius: 14px;
  margin: 24px 0;
  display: flex;
  gap: 16px;
}

.limitation-icon {
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

.limitation-content ul {
  margin: 10px 0 0 18px;
}

.limitation-content li {
  margin-bottom: 8px;
  font-size: 14px;
  line-height: 1.5;
}

/* ========== FAQ ========== */
.faq-list {
  margin: 20px 0;
}

.faq-item {
  margin-bottom: 20px;
  padding-bottom: 16px;
  border-bottom: 1px solid #e0d6cc;
}

.faq-question {
  font-weight: 600;
  font-size: 15px;
  color: #4a6a4a;
  margin-bottom: 8px;
}

.faq-answer {
  font-size: 14px;
  color: #7a8a7a;
  line-height: 1.55;
}

/* ========== REFERENSI ========== */
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

/* ========== PENUTUP ========== */
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

.hashtag {
  font-size: 12px;
  color: #b0a090;
  text-align: center;
  margin-top: 12px;
  font-style: normal;
}

/* ========== FOOTER ========== */
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
  background: #4a6a4a;
  border: none;
  color: white;
}

.btn-primary:hover {
  background: #2c4a2e;
}

/* ========== RESPONSIF ========== */
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
  
  .kategori-grid {
    grid-template-columns: 1fr;
    gap: 16px;
  }
  
  .confidence-bar {
    flex-direction: column;
    height: auto;
  }
  
  .bar {
    padding: 8px;
  }
  
  .info-tips {
    flex-direction: column;
  }
  
  .article-footer {
    flex-direction: column;
  }
}
</style>