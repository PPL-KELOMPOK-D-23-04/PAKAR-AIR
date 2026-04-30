<template>
  <div class="article-wrapper">
    <div class="article-container">
      
      <!-- HEADER -->
      <div class="article-header">
        <div class="header-meta">
          <span class="category">Panduan Visual</span>
          <span class="date">12 Maret 2026 · 4 menit membaca</span>
        </div>
        <h1 class="article-title">Parameter Fisik Air Layak Konsumsi: Panduan Mengenali Air Bersih Secara Mandiri</h1>
        <div class="author-line">
          <span>Tim Pakar PAKAR-AIR</span>
          <span class="separator">|</span>
          <span>Sumber: Kementerian Kesehatan RI & WHO</span>
        </div>
      </div>

      <!-- COVER GAMBAR -->
      <div class="cover-section">
        <img :src="coverImage" alt="Air Bersih" class="cover-image">
        <p class="cover-caption">Kriteria utama air layak konsumsi: tidak berwarna, tidak berbau, dan tidak berasa | Ilustrasi: PAKAR-AIR</p>
      </div>

      <!-- KONTEN ARTIKEL -->
      <div class="article-content">
        
        <p class="lead">
          <strong>Jakarta, PAKAR-AIR</strong> — Berdasarkan Peraturan Menteri Kesehatan Republik Indonesia 
          Nomor 492/Menkes/Per/IV/2010 tentang Persyaratan Kualitas Air Minum, air yang layak dikonsumsi 
          secara fisik harus memenuhi tiga kriteria utama: <strong>tidak berwarna, tidak berbau, dan tidak berasa</strong>. 
          Ketiga parameter ini menjadi garis depan dalam penilaian awal kualitas air.
        </p>

        <h2>1. Parameter Warna Air</h2>
        <p>
          Air bersih yang layak konsumsi secara visual harus <strong>jernih dan tidak berwarna</strong>. 
          Berikut adalah panduan interpretasi warna air yang mungkin Anda temui:
        </p>
        <ul>
          <li><strong>Kekuningan atau kecoklatan</strong> — Menandakan adanya zat besi (Fe), mangan (Mn), atau bahan organik dari gambut. Air ini umumnya masih dapat diolah melalui filtrasi.</li>
          <li><strong>Kehijauan</strong> — Indikasi keberadaan ganggang (alga) yang biasanya dipicu oleh paparan sinar matahari berlebih atau kandungan fosfat tinggi.</li>
          <li><strong>Keruh keputihan seperti susu</strong> — Dapat disebabkan oleh udara terperangkap (aman dan akan hilang) atau partikel lumpur koloid (membutuhkan pengendapan).</li>
          <li><strong>Merah atau kecoklatan pekat</strong> — Kemungkinan besar terkontaminasi limbah industri atau korosi pipa besi berkarat. Segera hentikan penggunaan.</li>
        </ul>

        <div class="info-card">
          <strong>Catatan PAKAR-AIR</strong>
          <p>Saat mengunggah foto air untuk dianalisis, pastikan pencahayaan cukup dan gunakan latar belakang putih bersih. Ini akan membantu sistem AI menganalisis warna air dengan lebih akurat.</p>
        </div>

        <h2>2. Parameter Bau Air</h2>
        <p>
          Air bersih yang sehat <strong>tidak memiliki bau apapun</strong>. Bau pada air hampir selalu 
          mengindikasikan adanya kontaminasi. Berikut panduan identifikasi bau air:
        </p>
        <ul>
          <li><strong>Bau telur busuk (H₂S)</strong> — Disebabkan oleh bakteri anaerob dan dekomposisi limbah organik. <span class="text-danger">Tingkat bahaya: Tinggi</span></li>
          <li><strong>Bau amis atau pesing</strong> — Disebabkan oleh bahan organik terurai atau kotoran hewan. <span class="text-warning">Tingkat bahaya: Sedang</span></li>
          <li><strong>Bau kaporit atau klorin</strong> — Disebabkan oleh proses desinfeksi PDAM berlebih. <span class="text-safe">Tingkat bahaya: Rendah (aman setelah diangin-anginkan)</span></li>
          <li><strong>Bau minyak atau bensin</strong> — Disebabkan oleh cemaran limbah industri atau bahan bakar. <span class="text-danger">Tingkat bahaya: Tinggi</span></li>
        </ul>

        <h2>3. Parameter Rasa Air</h2>
        <div class="warning-card">
          <strong>Peringatan Penting</strong>
          <p>Jangan pernah mencicipi air yang mencurigakan atau berasal dari sumber yang tidak terjamin kebersihannya.</p>
        </div>
        <ul>
          <li><strong>Rasa asam</strong> — Kemungkinan kontaminasi limbah kimia industri atau asam mineral.</li>
          <li><strong>Rasa pahit atau seperti logam</strong> — Indikasi keberadaan logam berat seperti timbal (plumbum), tembaga, atau seng.</li>
          <li><strong>Rasa asin</strong> — Intrusi air laut (di daerah pesisir) atau salinitas tinggi dari lapisan tanah.</li>
          <li><strong>Rasa manis tidak wajar</strong> — Bisa menandakan senyawa organik tertentu atau glikol dari limbah industri.</li>
        </ul>

        <h2>Kesimpulan</h2>
        <p>
          Dengan memahami ketiga parameter fisik ini, Anda dapat melakukan skrining awal terhadap 
          kualitas air yang digunakan. Untuk analisis yang lebih mendalam dan terintegrasi, 
          PAKAR-AIR hadir sebagai solusi teknologi yang memanfaatkan kecerdasan buatan untuk 
          membantu identifikasi kualitas air secara lebih komprehensif.
        </p>

        <div class="reference-box">
          <strong>Referensi</strong>
          <ul>
            <li>Peraturan Menteri Kesehatan RI No. 492/Menkes/Per/IV/2010</li>
            <li>World Health Organization (WHO) — Guidelines for Drinking-water Quality, 4th Edition</li>
            <li>United Nations Sustainable Development Goal 6: Clean Water and Sanitation</li>
          </ul>
        </div>

        <p class="closing-note">
          <strong>Pesan PAKAR-AIR</strong> — Kesehatan Anda dimulai dari air yang Anda konsumsi. 
          Lakukan skrining rutin dan jadilah bagian dari solusi untuk menciptakan akses air bersih bagi semua.
        </p>

      </div>

      <!-- FOOTER TOMBOL -->
      <div class="article-footer">
        <button class="btn-back" @click="goBack">← Kembali ke Halaman Edukasi</button>
        <button class="btn-primary" @click="goToAnalisis">Mulai Analisis Air →</button>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  name: 'HomeArticle',
  computed: {
    coverImage() {
      try {
        return require('@/assets/images/cover-air-bersih.jpg');
      } catch (e) {
        return '';
      }
    }
  },
  methods: {
    goBack() {
      this.$router.push('/edukasi');
    },
    goToAnalisis() {
      this.$router.push('/dashboard');
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

.article-wrapper {
  background: #f7f5f0;
  min-height: 100vh;
  padding: 40px 20px;
  font-family: 'Georgia', 'Times New Roman', 'Inter', -apple-system, 'Segoe UI', Roboto, serif;
}

.article-container {
  max-width: 860px;
  margin: 0 auto;
  background: #ffffff;
  border-radius: 16px;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.04);
  overflow: hidden;
}

/* HEADER */
.article-header {
  padding: 40px 48px 0 48px;
}

.header-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  font-size: 13px;
  font-weight: 500;
  letter-spacing: 0.5px;
}

.category {
  background: #e8e2d8;
  color: #5c4a3a;
  padding: 4px 14px;
  border-radius: 30px;
  font-size: 12px;
}

.date {
  color: #9a8a7a;
}

.article-title {
  font-size: 32px;
  line-height: 1.3;
  font-weight: 600;
  color: #2c4a2e;
  margin-bottom: 16px;
  letter-spacing: -0.3px;
}

.author-line {
  font-size: 13px;
  color: #7a8a7a;
  border-top: 1px solid #ece4d8;
  padding-top: 16px;
}

.separator {
  margin: 0 10px;
  color: #c0b0a0;
}

/* COVER GAMBAR */
.cover-section {
  padding: 30px 48px 0 48px;
}

.cover-image {
  width: 100%;
  border-radius: 12px;
  object-fit: cover;
}

.cover-caption {
  font-size: 11px;
  color: #b0a090;
  text-align: center;
  margin-top: 10px;
  font-style: italic;
}

/* KONTEN */
.article-content {
  padding: 20px 48px 40px 48px;
}

.lead {
  font-size: 17px;
  line-height: 1.65;
  color: #4a5a4a;
  margin-bottom: 28px;
  border-left: 3px solid #c9b08a;
  padding-left: 20px;
  font-style: normal;
}

h2 {
  font-size: 22px;
  font-weight: 600;
  color: #2c4a2e;
  margin: 32px 0 16px 0;
  padding-bottom: 8px;
  border-bottom: 1px solid #e0d8ce;
}

p {
  font-size: 16px;
  line-height: 1.7;
  color: #3a4a3c;
  margin-bottom: 16px;
}

ul {
  margin: 12px 0 20px 28px;
}

li {
  font-size: 15px;
  line-height: 1.65;
  color: #4a5a4a;
  margin-bottom: 10px;
}

.text-danger { color: #c46a4a; font-weight: 500; }
.text-warning { color: #c9a06a; font-weight: 500; }
.text-safe { color: #6a9a6a; font-weight: 500; }

.info-card {
  background: #f4f0ea;
  padding: 16px 20px;
  border-radius: 12px;
  margin: 24px 0;
  border-left: 3px solid #6a9a6a;
}

.info-card strong {
  display: block;
  margin-bottom: 6px;
  color: #2c4a2e;
  font-size: 14px;
}

.info-card p {
  margin: 0;
  font-size: 14px;
}

.warning-card {
  background: #fef6e8;
  padding: 14px 18px;
  border-radius: 12px;
  margin: 20px 0;
  border-left: 3px solid #d4a06a;
}

.warning-card strong {
  display: block;
  margin-bottom: 6px;
  color: #a06a3a;
  font-size: 14px;
}

.warning-card p {
  margin: 0;
  font-size: 14px;
}

.reference-box {
  background: #f4f0ea;
  padding: 16px 20px;
  border-radius: 12px;
  margin: 32px 0 24px 0;
}

.reference-box strong {
  display: block;
  font-size: 13px;
  color: #6a5a4a;
  margin-bottom: 8px;
}

.reference-box ul {
  margin: 0 0 0 18px;
}

.reference-box li {
  font-size: 12px;
  color: #7a8a7a;
  margin-bottom: 4px;
}

.closing-note {
  background: #faf6f0;
  padding: 18px 22px;
  border-radius: 12px;
  margin-top: 32px;
  font-size: 15px;
  line-height: 1.6;
  color: #5a6a5a;
  font-style: italic;
}

/* FOOTER */
.article-footer {
  padding: 20px 48px 40px 48px;
  border-top: 1px solid #ece4d8;
  display: flex;
  justify-content: space-between;
  gap: 16px;
  background: #fefcf9;
}

.btn-back, .btn-primary {
  padding: 10px 24px;
  border-radius: 40px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  font-family: inherit;
  transition: all 0.2s;
}

.btn-back {
  background: transparent;
  border: 1px solid #d0c4b4;
  color: #6a5a4a;
}

.btn-back:hover {
  background: #f0ece4;
  border-color: #b8a88a;
}

.btn-primary {
  background: #6a8a6a;
  border: none;
  color: white;
}

.btn-primary:hover {
  background: #4a6a4a;
}

/* RESPONSIF */
@media (max-width: 680px) {
  .article-header, .cover-section, .article-content, .article-footer {
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
  
  .article-footer {
    flex-direction: column;
  }
  
  .btn-back, .btn-primary {
    text-align: center;
  }
}
</style>