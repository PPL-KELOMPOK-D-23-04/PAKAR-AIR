<template>
  <div class="article-page">
    <div class="article-container">
      
      <!-- ========== HEADER ARTIKEL ========== -->
      <div class="article-header">
        <div class="header-meta">
          <span class="category-tag ai">Panduan Pengguna AI</span>
          <span class="reading-time">15 Maret 2026 · 6 menit membaca</span>
        </div>
        <h1 class="article-title">Memahami Hasil PAKAR-AIR: Panduan Lengkap Interpretasi Kategori, Confidence Score, dan Rekomendasi</h1>
        <div class="author-credit">
          <span class="author">Tim Pakar PAKAR-AIR</span>
          <span class="separator">—</span>
          <span class="source">Sumber: Dokumentasi Teknis PAKAR-AIR v1.0</span>
        </div>
      </div>

      <!-- ========== COVER GAMBAR ========== -->
      <div class="cover-container">
        <img 
          :src="coverImage" 
          alt="Ilustrasi hasil analisis PAKAR-AIR" 
          class="cover-image"
          @error="handleImageError"
        >
        <p class="cover-caption">
          PAKAR-AIR memberikan hasil analisis air dalam tiga kategori dengan tingkat kepercayaan (confidence score) | Ilustrasi: PAKAR-AIR
        </p>
      </div>

      <!-- ========== KONTEN ARTIKEL ========== -->
      <div class="article-body">
        
        <!-- Lead -->
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

        <!-- Bagian 1: Tiga Kategori -->
        <h2 class="section-title">1. Tiga Kategori Kualitas Air</h2>
        <p>
          Berdasarkan parameter yang dianalisis (warna, kekeruhan, bau, sumber air, kondisi lingkungan, 
          serta fitur visual dari citra air), PAKAR-AIR mengklasifikasikan kualitas air ke dalam 
          <strong>tiga kategori utama</strong>. Berikut penjelasan detail setiap kategori beserta tindakan yang direkomendasikan:
        </p>

        <div class="kategori-grid">
          <div class="kategori-card aman">
            <div class="kategori-header">A</div>
            <div class="kategori-title">Aman</div>
            <div class="kategori-badge">Rekomendasi: Dapat Digunakan</div>
            <p>Air memenuhi standar fisik dan parameter umum yang ditetapkan oleh Peraturan Menteri Kesehatan RI No. 492/Menkes/Per/IV/2010.</p>
            <div class="kategori-detail">
              <strong>Karakteristik:</strong>
              <ul>
                <li>Tidak berwarna atau sangat jernih</li>
                <li>Tidak berbau</li>
                <li>Tidak berasa</li>
                <li>Tidak ada partikel tersuspensi yang terlihat</li>
              </ul>
            </div>
            <div class="kategori-action">Tindakan: Rebus hingga mendidih sebelum dikonsumsi.</div>
          </div>

          <div class="kategori-card perlu">
            <div class="kategori-header">P</div>
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
            <div class="kategori-action">Tindakan: Saring dengan kain bersih, endapkan 2-4 jam, rebus 15 menit.</div>
          </div>

          <div class="kategori-card tercemar">
            <div class="kategori-header">T</div>
            <div class="kategori-title">Berpotensi Tercemar</div>
            <div class="kategori-badge">Rekomendasi: Jangan Digunakan</div>
            <p>Indikasi kuat adanya kontaminan berbahaya (bakteri patogen, logam berat, limbah kimia, dll).</p>
            <div class="kategori-detail">
              <strong>Karakteristik:</strong>
              <ul>
                <li>Keruh pekat, berwarna (coklat, merah, kehitaman)</li>
                <li>Bau menyengat (telur busuk, minyak, kimia)</li>
                <li>Berada di lingkungan berisiko tinggi (dekat industri, timbunan sampah)</li>
              </ul>
            </div>
            <div class="kategori-action">Tindakan: JANGAN gunakan. Segera lakukan uji laboratorium.</div>
          </div>
        </div>

        <!-- Bagian 2: Confidence Score -->
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
              <div><strong>Tinggi (80-100%)</strong> — Prediksi sangat kuat, hasil dapat diandalkan untuk pengambilan keputusan. Data input Anda berkualitas baik.</div>
            </div>
            <div class="legend-item">
              <div class="dot medium"></div>
              <div><strong>Sedang (60-79%)</strong> — Prediksi cukup yakin, namun disarankan untuk mengulang analisis dengan foto yang lebih jelas dan data yang lebih lengkap.</div>
            </div>
            <div class="legend-item">
              <div class="dot low"></div>
              <div><strong>Rendah (0-59%)</strong> — Kualitas input tidak memadai. Hasil prediksi tidak dapat diandalkan. Ulangi analisis dengan pencahayaan yang lebih baik, foto yang lebih tajam, dan data yang lengkap.</div>
            </div>
          </div>
        </div>

        <div class="info-box-tips">
          <div class="tips-icon">i</div>
          <div class="tips-content">
            <strong>Tips Meningkatkan Confidence Score</strong>
            <ul>
              <li><strong>Pencahayaan:</strong> Gunakan cahaya alami yang cukup (pukul 10.00 - 14.00). Hindari bayangan dan silau.</li>
              <li><strong>Wadah sampel:</strong> Gunakan gelas atau wadah bening (kaca atau plastik transparan) yang bersih.</li>
              <li><strong>Latar belakang:</strong> Letakkan wadah di atas kertas putih bersih untuk kontras yang optimal.</li>
              <li><strong>Posisi kamera:</strong> Foto dari jarak 20-30 cm, pastikan fokus tajam dan seluruh sampel air terlihat.</li>
              <li><strong>Data manual:</strong> Isi seluruh field dengan jujur dan teliti (pilih warna, bau, sumber air, kondisi lingkungan yang paling sesuai).</li>
              <li><strong>Hindari filter:</strong> Jangan gunakan filter kamera atau efek editing pada foto air.</li>
              <li><strong>Ulangi analisis:</strong> Jika confidence score rendah, lakukan analisis ulang dengan memperbaiki kualitas foto dan kelengkapan data.</li>
            </ul>
          </div>
        </div>

        <!-- Bagian 3: Rekomendasi -->
        <h2 class="section-title">3. Memahami Rekomendasi Penggunaan</h2>
        <p>
          Berdasarkan kombinasi kategori kualitas air dan confidence score, PAKAR-AIR akan memberikan 
          rekomendasi spesifik yang dapat Anda ikuti. Berikut panduan interpretasi rekomendasi:
        </p>

        <div class="recommendation-grid">
          <div class="rekom-card">
            <div class="rekom-icon">M</div>
            <div class="rekom-content">
              <strong>Untuk Air Minum dan Memasak</strong>
              <p>Jika kategori <strong>Aman</strong> dengan confidence score >80%: Air siap digunakan setelah direbus.<br>
              Jika confidence score 60-80%: Rebus lebih lama (15-20 menit) atau gunakan filter tambahan.<br>
              Jika confidence score <60% atau kategori lain: Jangan gunakan untuk konsumsi.</p>
            </div>
          </div>
          <div class="rekom-card">
            <div class="rekom-icon">M</div>
            <div class="rekom-content">
              <strong>Untuk Mandi dan Mencuci</strong>
              <p>Kategori <strong>Aman</strong> atau <strong>Perlu Perlakuan</strong>: Dapat digunakan. Untuk kategori Perlu Perlakuan, disarankan untuk menghindari kontak dengan mata dan luka terbuka.<br>
              Kategori <strong>Tercemar</strong>: Jangan digunakan untuk mandi atau mencuci pakaian.</p>
            </div>
          </div>
          <div class="rekom-card">
            <div class="rekom-icon">T</div>
            <div class="rekom-content">
              <strong>Untuk Irigasi Tanaman</strong>
              <p>Kategori <strong>Aman</strong> dan <strong>Perlu Perlakuan</strong>: Aman untuk tanaman non-pangan. Untuk tanaman pangan (sayur, buah), gunakan air dengan kategori Aman.<br>
              Kategori <strong>Tercemar</strong>: Jangan gunakan untuk irigasi tanaman yang akan dikonsumsi.</p>
            </div>
          </div>
        </div>

        <!-- Bagian 4: Contoh Kasus -->
        <h2 class="section-title">4. Contoh Kasus Analisis</h2>
        <p>
          Berikut adalah beberapa skenario contoh hasil analisis menggunakan PAKAR-AIR untuk membantu 
          Anda memahami bagaimana membaca dan menginterpretasikan output sistem:
        </p>

        <div class="examples-list">
          <div class="example-item">
            <div class="example-header">Skenario 1: Air Sumur di Daerah Pemukiman (Hasil Optimal)</div>
            <div class="example-body">
              <p><strong>Data Input:</strong> Foto air jernih, tidak berbau, sumber sumur, lingkungan pemukiman.</p>
              <p><strong>Output PAKAR-AIR:</strong></p>
              <ul>
                <li>Kategori: <span class="badge aman-badge">Aman</span></li>
                <li>Confidence Score: 94% (Tinggi)</li>
                <li>Rekomendasi: Air layak digunakan. Rebus sebelum minum.</li>
              </ul>
              <p class="interpretasi">Interpretasi: Sangat baik. Data input berkualitas tinggi. Air aman digunakan dengan catatan direbus terlebih dahulu.</p>
            </div>
          </div>

          <div class="example-item">
            <div class="example-header">Skenario 2: Air Sungai di Dekat Kawasan Industri (Hasil Peringatan)</div>
            <div class="example-body">
              <p><strong>Data Input:</strong> Foto keruh kecoklatan, bau amis, sumber sungai, lingkungan industri.</p>
              <p><strong>Output PAKAR-AIR:</strong></p>
              <ul>
                <li>Kategori: <span class="badge tercemar-badge">Berpotensi Tercemar</span></li>
                <li>Confidence Score: 87% (Tinggi)</li>
                <li>Rekomendasi: JANGAN gunakan air ini. Segera uji laboratorium.</li>
              </ul>
              <p class="interpretasi">Interpretasi: Peringatan serius. Model AI sangat yakin bahwa air ini tercemar. Harus segera ditindaklanjuti dengan uji lab.</p>
            </div>
          </div>

          <div class="example-item">
            <div class="example-header">Skenario 3: Kualitas Input Kurang Baik (Hasil Tidak Optimal)</div>
            <div class="example-body">
              <p><strong>Data Input:</strong> Foto gelap buram, data manual tidak diisi.</p>
              <p><strong>Output PAKAR-AIR:</strong></p>
              <ul>
                <li>Kategori: Tidak dapat ditentukan</li>
                <li>Confidence Score: 42% (Rendah)</li>
                <li>Rekomendasi: Ulangi analisis dengan foto yang lebih jelas dan data lengkap.</li>
              </ul>
              <p class="interpretasi">Interpretasi: Hasil tidak dapat diandalkan. Perbaiki kualitas input dan ulangi analisis.</p>
            </div>
          </div>

          <div class="example-item">
            <div class="example-header">Skenario 4: Air PDAM di Perkotaan (Ambang Batas)</div>
            <div class="example-body">
              <p><strong>Data Input:</strong> Foto air jernih, bau kaporit ringan, sumber PDAM, lingkungan perkotaan.</p>
              <p><strong>Output PAKAR-AIR:</strong></p>
              <ul>
                <li>Kategori: <span class="badge perlu-badge">Perlu Perlakuan</span></li>
                <li>Confidence Score: 76% (Sedang)</li>
                <li>Rekomendasi: Endapkan 30 menit atau gunakan filter karbon aktif untuk menghilangkan bau kaporit.</li>
              </ul>
              <p class="interpretasi">Interpretasi: Air PDAM umumnya memenuhi standar, namun kadar klorin tinggi. Perlakuan sederhana sudah cukup.</p>
            </div>
          </div>
        </div>

        <!-- Bagian 5: Batasan Sistem -->
        <h2 class="section-title">5. Batasan PAKAR-AIR (Harus Dipahami)</h2>
        <p>
          Sebagai pengguna PAKAR-AIR, penting untuk memahami keterbatasan sistem agar tidak 
          terjadi kesalahan interpretasi atau pengambilan keputusan yang keliru:
        </p>

        <div class="limitation-box">
          <div class="limitation-icon">!</div>
          <div class="limitation-content">
            <strong>Batasan Fundamental PAKAR-AIR</strong>
            <ul>
              <li><strong>Bukan pengganti uji laboratorium:</strong> PAKAR-AIR adalah alat skrining awal (screening tool), BUKAN pengganti uji laboratorium bersertifikasi. Untuk keperluan medis, legal, atau komersial, WAJIB menggunakan uji laboratorium standar.</li>
              <li><strong>Parameter terbatas:</strong> Parameter yang dianalisis terbatas pada aspek visual (dari foto) dan data manual yang diinput pengguna. Sistem tidak mendeteksi virus, logam berat kadar sangat rendah, pestisida, atau kontaminan mikroba spesifik secara langsung.</li>
              <li><strong>Ketergantungan pada kualitas input:</strong> Akurasi prediksi sangat bergantung pada kualitas foto dan kelengkapan data manual yang Anda berikan. Foto buram, gelap, atau data tidak lengkap akan menghasilkan confidence score rendah.</li>
              <li><strong>Estimasi, bukan diagnosis:</strong> Hasil PAKAR-AIR adalah estimasi awal berdasarkan dataset yang digunakan untuk melatih model AI. Selalu konfirmasi dengan uji laboratorium jika hasil menunjukkan indikasi pencemaran.</li>
            </ul>
          </div>
        </div>

        <p>
          Jika confidence score berada di bawah 60% atau kategori menunjukkan "Berpotensi Tercemar", 
          <strong>WAJIB melakukan konfirmasi ke laboratorium kesehatan lingkungan terdekat</strong> 
          (Balai Teknis Kesehatan Lingkungan atau Laboratorium Kesehatan Daerah).
        </p>

        <!-- Bagian 6: FAQ -->
        <h2 class="section-title">6. Pertanyaan yang Sering Diajukan (FAQ)</h2>

        <div class="faq-list">
          <div class="faq-item">
            <div class="faq-question">Apakah PAKAR-AIR bisa menggantikan tes laboratorium untuk air minum?</div>
            <div class="faq-answer">Tidak. PAKAR-AIR adalah alat bantu skrining awal. Untuk keperluan medis, legal, atau komersial, Anda tetap WAJIB menggunakan uji laboratorium standar yang terakreditasi. PAKAR-AIR membantu Anda mengetahui kapan perlu melakukan uji lab lebih lanjut.</div>
          </div>
          <div class="faq-item">
            <div class="faq-question">Seberapa akurat PAKAR-AIR dibandingkan uji laboratorium?</div>
            <div class="faq-answer">PAKAR-AIR memiliki tingkat akurasi sekitar 85-90% untuk deteksi kontaminasi tingkat menengah hingga berat berdasarkan parameter visual. Namun, akurasinya tidak dapat menyamai uji laboratorium yang menggunakan peralatan canggih dengan metode standar.</div>
          </div>
          <div class="faq-item">
            <div class="faq-question">Mengapa confidence score saya rendah padahal air terlihat bersih?</div>
            <div class="faq-answer">Confidence score rendah biasanya disebabkan oleh kualitas foto yang kurang baik: pencahayaan kurang (foto gelap), gambar buram (kurang fokus), latar belakang tidak kontras, atau ada bayangan. Data manual yang tidak lengkap juga menurunkan confidence score.</div>
          </div>
          <div class="faq-item">
            <div class="faq-question">Apakah data analisis saya aman dan disimpan?</div>
            <div class="faq-answer">Ya. Semua data analisis Anda disimpan secara aman untuk keperluan riwayat analisis. Data hanya dapat diakses oleh akun Anda sendiri. PAKAR-AIR mematuhi prinsip perlindungan data pribadi dan tidak membagikan data ke pihak ketiga.</div>
          </div>
          <div class="faq-item">
            <div class="faq-question">Bisakah saya mengekspor hasil analisis untuk dokumentasi?</div>
            <div class="faq-answer">Ya, Anda dapat mengekspor hasil analisis dari halaman Riwayat Analisis dalam format PDF atau CSV. Fitur ini berguna untuk dokumentasi pribadi, laporan, atau sebagai lampiran saat berkonsultasi dengan tenaga kesehatan.</div>
          </div>
        </div>

        <!-- Referensi -->
        <div class="reference-section">
          <h3>Referensi</h3>
          <ul>
            <li>Dokumentasi Teknis PAKAR-AIR (Pendeteksi Kualitas Air Berbasis Artificial Intelligence) v1.0</li>
            <li>Peraturan Menteri Kesehatan Republik Indonesia No. 492/Menkes/Per/IV/2010 tentang Persyaratan Kualitas Air Minum</li>
            <li>World Health Organization (WHO) — Guidelines for Drinking-water Quality, 4th Edition</li>
            <li>United Nations Sustainable Development Goal 6: Clean Water and Sanitation — Progress Report 2024</li>
            <li>ISO 5667 Series — Water Quality Sampling Guidelines</li>
          </ul>
        </div>

        <!-- Penutup -->
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
      coverImagePath: require('@/assets/images/cover-ai-analisis.jpg')
    };
  },
  computed: {
    coverImage() {
      return this.coverImagePath;
    }
  },
  methods: {
    handleImageError() {
      this.coverImagePath = 'https://placehold.co/860x450/e8e2d8/8b7355?text=Cover+Hasil+Analisis+AI';
    },
    goBack() {
      this.$router.push('/edukasi');
    },
    goToAnalysis() {
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

.article-page {
  background: #f5f2ed;
  min-height: 100vh;
  padding: 40px 24px;
  font-family: 'Inter', -apple-system, 'Segoe UI', 'Roboto', 'Georgia', serif;
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
  letter-spacing: -0.4px;
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

/* ========== COVER ========== */
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
  color: #3a5a4a;
  margin: 40px 0 20px 0;
  padding-bottom: 10px;
  border-bottom: 1px solid #e0d6cc;
}

/* Kategori Grid */
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

.kategori-header {
  width: 40px;
  height: 40px;
  background: rgba(0,0,0,0.05);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  font-weight: bold;
  margin: 0 auto 12px auto;
}

.kategori-title {
  font-size: 18px;
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
  font-size: 11px;
  text-align: left;
  margin: 12px 0;
  padding: 8px;
  background: rgba(0,0,0,0.02);
  border-radius: 8px;
}

.kategori-detail ul {
  margin: 5px 0 0 16px;
  padding: 0;
}

.kategori-detail li {
  font-size: 11px;
  margin-bottom: 2px;
}

.kategori-action {
  font-size: 11px;
  background: rgba(0,0,0,0.03);
  padding: 8px;
  border-radius: 8px;
  margin-top: 8px;
}

/* Confidence */
.confidence-container {
  background: #f8f6f2;
  padding: 20px;
  border-radius: 14px;
  margin: 24px 0;
}

.confidence-bar {
  display: flex;
  height: 44px;
  border-radius: 10px;
  overflow: hidden;
  margin-bottom: 18px;
}

.bar {
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: bold;
  font-size: 13px;
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

/* Info Box Tips */
.info-box-tips {
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

.tips-content ul {
  margin: 10px 0 0 18px;
}

.tips-content li {
  margin-bottom: 6px;
  font-size: 13px;
}

/* Recommendation Grid */
.recommendation-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
  margin: 20px 0;
}

.rekom-card {
  background: #f8f6f2;
  padding: 16px;
  border-radius: 12px;
  display: flex;
  gap: 12px;
}

.rekom-icon {
  width: 32px;
  height: 32px;
  background: #6a9a6a;
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  flex-shrink: 0;
}

.rekom-content strong {
  display: block;
  margin-bottom: 6px;
  color: #4a6a4a;
}

.rekom-content p {
  margin: 0;
  font-size: 12px;
  line-height: 1.5;
}

/* Examples */
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
  padding-top: 6px;
  border-top: 1px dashed #e0d6cc;
}

/* Badges */
.badge {
  padding: 2px 10px;
  border-radius: 20px;
  font-size: 11px;
  font-weight: 500;
}

.aman-badge { background: #d4e5d4; color: #3d6b3d; }
.perlu-badge { background: #f0e5c8; color: #a5832e; }
.tercemar-badge { background: #f0d6d6; color: #b85c5c; }

/* Limitation Box */
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
  margin-bottom: 10px;
  font-size: 14px;
  line-height: 1.55;
}

/* FAQ */
.faq-list {
  margin: 20px 0;
}

.faq-item {
  margin-bottom: 18px;
  padding-bottom: 14px;
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
  line-height: 1.65;
  color: #5a6a5a;
  font-style: italic;
}

.hashtag {
  font-size: 12px;
  color: #b0a090;
  text-align: center;
  margin-top: 12px;
  font-style: normal;
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
  background: #4a6a4a;
  border: none;
  color: white;
}

.btn-primary:hover {
  background: #2c4a2e;
}

/* Responsive */
@media (max-width: 700px) {
  .article-header, .cover-container, .article-body, .article-footer {
    padding-left: 24px;
    padding-right: 24px;
  }
  
  .article-title {
    font-size: 24px;
  }
  
  .header-meta {
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
  }
  
  .kategori-grid, .recommendation-grid {
    grid-template-columns: 1fr;
  }
  
  .article-footer {
    flex-direction: column;
  }
}
</style>