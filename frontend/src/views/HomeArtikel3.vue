<template>
  <div class="page">
    <div class="container">
      
      <!-- HEADER -->
      <div class="header">
        <div class="meta">
          <span class="kategori">Panduan Pengguna AI</span>
          <span class="tanggal">15 Maret 2026 · 6 menit membaca</span>
        </div>
        <h1>Memahami Hasil PAKAR-AIR: Panduan Lengkap Kategori, Confidence Score, dan Rekomendasi</h1>
        <div class="penulis">
          Tim Pakar PAKAR-AIR | Sumber: Dokumentasi Teknis PAKAR-AIR v1.0
        </div>
      </div>

      <!-- GAMBAR -->
      <div class="gambar">
        <img src="https://placehold.co/900x450/6b8c6b/ffffff?text=Hasil+Analisis+PAKAR-AIR" alt="Hasil analisis PAKAR-AIR">
        <p class="caption">PAKAR-AIR memberikan hasil analisis dalam tiga kategori dengan tingkat kepercayaan</p>
      </div>

      <!-- KONTEN UTAMA -->
      <div class="konten">
        
        <!-- Lead -->
        <p class="lead">
          <strong>Jakarta, PAKAR-AIR</strong> — Setelah Anda melakukan analisis kualitas air menggunakan 
          PAKAR-AIR, sistem akan menampilkan hasil prediksi yang terdiri dari tiga komponen utama: 
          <strong>kategori kualitas air, tingkat kepercayaan (confidence score), dan rekomendasi penggunaan</strong>. 
          Panduan ini akan membantu Anda memahami setiap komponen tersebut secara mendalam.
        </p>

        <p>
          PAKAR-AIR (Pendeteksi Kualitas Air Berbasis Artificial Intelligence dan Rekognisi Citra) 
          adalah sistem yang dirancang untuk memberikan estimasi awal kualitas air melalui kombinasi 
          analisis citra air dan data manual yang Anda inputkan. Sebagai alat bantu (decision support system), 
          PAKAR-AIR membantu Anda mendapatkan gambaran awal tentang kualitas air secara cepat, mudah, 
          dan terjangkau.
        </p>

        <!-- Bagian 1: Tiga Kategori -->
        <h2>1. Tiga Kategori Kualitas Air</h2>
        <p>
          Berdasarkan parameter yang dianalisis (warna, kekeruhan, bau, sumber air, kondisi lingkungan, 
          serta fitur visual dari citra air), PAKAR-AIR mengklasifikasikan kualitas air ke dalam 
          <strong>tiga kategori utama</strong>:
        </p>

        <div class="grid-tiga-kategori">
          <div class="kategori-card aman">
            <div class="kategori-icon">A</div>
            <div class="kategori-judul">Aman</div>
            <div class="kategori-badge">Rekomendasi: Dapat Digunakan</div>
            <div class="kategori-deskripsi">
              Air memenuhi standar fisik dan parameter umum yang ditetapkan oleh Peraturan Menteri 
              Kesehatan RI No. 492/Menkes/Per/IV/2010.
            </div>
            <div class="kategori-karakteristik">
              <strong>Karakteristik:</strong>
              <ul>
                <li>Tidak berwarna atau sangat jernih</li>
                <li>Tidak berbau</li>
                <li>Tidak berasa</li>
                <li>Tidak ada partikel tersuspensi</li>
              </ul>
            </div>
            <div class="kategori-tindakan">
              <strong>Tindakan:</strong> Rebus hingga mendidih sebelum dikonsumsi.
            </div>
          </div>

          <div class="kategori-card perlu">
            <div class="kategori-icon">P</div>
            <div class="kategori-judul">Perlu Perlakuan</div>
            <div class="kategori-badge">Rekomendasi: Harus Diolah</div>
            <div class="kategori-deskripsi">
              Terdeteksi adanya kekeruhan, bau ringan, warna mencurigakan, atau indikasi awal kontaminasi.
            </div>
            <div class="kategori-karakteristik">
              <strong>Karakteristik:</strong>
              <ul>
                <li>Sedikit keruh atau berwarna (kekuningan/kehijauan)</li>
                <li>Bau amis atau tanah (tidak menyengat)</li>
                <li>Mungkin mengandung partikel tersuspensi</li>
              </ul>
            </div>
            <div class="kategori-tindakan">
              <strong>Tindakan:</strong> Saring dengan kain, endapkan 2-4 jam, rebus 15 menit.
            </div>
          </div>

          <div class="kategori-card tercemar">
            <div class="kategori-icon">T</div>
            <div class="kategori-judul">Berpotensi Tercemar</div>
            <div class="kategori-badge">Rekomendasi: JANGAN Digunakan</div>
            <div class="kategori-deskripsi">
              Indikasi kuat adanya kontaminan berbahaya (bakteri patogen, logam berat, limbah kimia).
            </div>
            <div class="kategori-karakteristik">
              <strong>Karakteristik:</strong>
              <ul>
                <li>Keruh pekat, berwarna (coklat, merah, kehitaman)</li>
                <li>Bau menyengat (telur busuk, minyak, kimia)</li>
                <li>Dari lingkungan berisiko tinggi (dekat industri)</li>
              </ul>
            </div>
            <div class="kategori-tindakan">
              <strong>Tindakan:</strong> JANGAN digunakan. Segera uji laboratorium.
            </div>
          </div>
        </div>

        <!-- Bagian 2: Confidence Score -->
        <h2>2. Memahami Confidence Score (Tingkat Kepercayaan)</h2>
        <p>
          <strong>Confidence score</strong> adalah angka antara 0-100% yang menunjukkan seberapa yakin model AI 
          PAKAR-AIR terhadap prediksi yang dihasilkan. Angka ini dihitung berdasarkan <strong>kualitas dan kelengkapan data input</strong> 
          yang Anda berikan, meliputi:
        </p>
        <ul>
          <li>Kualitas foto air (pencahayaan, ketajaman, latar belakang)</li>
          <li>Kelengkapan data manual (warna, bau, sumber air, kondisi lingkungan)</li>
          <li>Kesesuaian antara data visual dan data manual</li>
        </ul>

        <div class="confidence-box">
          <div class="confidence-bar">
            <div class="bar tinggi" style="width: 40%">80 - 100%</div>
            <div class="bar sedang" style="width: 35%">60 - 79%</div>
            <div class="bar rendah" style="width: 25%">0 - 59%</div>
          </div>
          <div class="confidence-legend">
            <div class="legend-item">
              <span class="dot tinggi"></span>
              <span><strong>Tinggi (80-100%)</strong> — Prediksi sangat kuat, dapat diandalkan untuk pengambilan keputusan.</span>
            </div>
            <div class="legend-item">
              <span class="dot sedang"></span>
              <span><strong>Sedang (60-79%)</strong> — Prediksi cukup yakin, disarankan mengulang analisis dengan foto yang lebih baik.</span>
            </div>
            <div class="legend-item">
              <span class="dot rendah"></span>
              <span><strong>Rendah (0-59%)</strong> — Kualitas input tidak memadai. Ulangi analisis dengan pencahayaan lebih baik.</span>
            </div>
          </div>
        </div>

        <div class="kotak-tips">
          <span class="tips-icon">!</span>
          <div>
            <strong>Tips Meningkatkan Confidence Score</strong>
            <ul>
              <li>Gunakan foto dengan pencahayaan alami yang cukup (pukul 10.00 - 14.00)</li>
              <li>Letakkan sampel air dalam wadah bening (gelas kaca) dengan latar belakang putih bersih</li>
              <li>Pastikan foto tidak buram, tidak terlalu gelap, dan tidak terkena bayangan</li>
              <li>Isi seluruh data manual dengan jujur dan teliti (warna, bau, sumber air, kondisi lingkungan)</li>
              <li>Jangan gunakan filter atau efek kamera saat memotret sampel air</li>
            </ul>
          </div>
        </div>

        <!-- Bagian 3: Contoh Kasus -->
        <h2>3. Contoh Hasil Analisis</h2>
        <p>
          Berikut adalah beberapa skenario contoh hasil analisis menggunakan PAKAR-AIR:
        </p>

        <div class="contoh-list">
          <div class="contoh-item">
            <div class="contoh-judul">Skenario 1: Air Sumur di Daerah Pemukiman</div>
            <div class="contoh-isi">
              <p><strong>Data Input:</strong> Foto air jernih, tidak berbau, sumber sumur, lingkungan pemukiman.</p>
              <p><strong>Output PAKAR-AIR:</strong></p>
              <ul>
                <li>Kategori: <span class="badge aman-badge">Aman</span></li>
                <li>Confidence Score: 94% (Tinggi)</li>
                <li>Rekomendasi: Air layak digunakan. Rebus sebelum minum.</li>
              </ul>
              <p class="contoh-note">Interpretasi: Sangat baik. Data input berkualitas tinggi. Air aman digunakan.</p>
            </div>
          </div>

          <div class="contoh-item">
            <div class="contoh-judul">Skenario 2: Air Sungai di Dekat Kawasan Industri</div>
            <div class="contoh-isi">
              <p><strong>Data Input:</strong> Foto keruh kecoklatan, bau amis, sumber sungai, lingkungan industri.</p>
              <p><strong>Output PAKAR-AIR:</strong></p>
              <ul>
                <li>Kategori: <span class="badge tercemar-badge">Berpotensi Tercemar</span></li>
                <li>Confidence Score: 87% (Tinggi)</li>
                <li>Rekomendasi: JANGAN digunakan. Segera uji laboratorium.</li>
              </ul>
              <p class="contoh-note">Interpretasi: Peringatan serius. Harus segera ditindaklanjuti dengan uji lab.</p>
            </div>
          </div>

          <div class="contoh-item">
            <div class="contoh-judul">Skenario 3: Kualitas Input Kurang Baik</div>
            <div class="contoh-isi">
              <p><strong>Data Input:</strong> Foto gelap buram, data manual tidak diisi.</p>
              <p><strong>Output PAKAR-AIR:</strong></p>
              <ul>
                <li>Kategori: Tidak dapat ditentukan</li>
                <li>Confidence Score: 42% (Rendah)</li>
                <li>Rekomendasi: Ulangi analisis dengan foto yang lebih jelas dan data lengkap.</li>
              </ul>
              <p class="contoh-note">Interpretasi: Hasil tidak dapat diandalkan. Perbaiki kualitas input.</p>
            </div>
          </div>

          <div class="contoh-item">
            <div class="contoh-judul">Skenario 4: Air PDAM di Perkotaan</div>
            <div class="contoh-isi">
              <p><strong>Data Input:</strong> Foto air jernih, bau kaporit ringan, sumber PDAM.</p>
              <p><strong>Output PAKAR-AIR:</strong></p>
              <ul>
                <li>Kategori: <span class="badge perlu-badge">Perlu Perlakuan</span></li>
                <li>Confidence Score: 76% (Sedang)</li>
                <li>Rekomendasi: Endapkan 30 menit atau gunakan filter karbon aktif.</li>
              </ul>
              <p class="contoh-note">Interpretasi: Air PDAM umumnya memenuhi standar, kadar klorin tinggi.</p>
            </div>
          </div>
        </div>

        <!-- Bagian 4: Batasan Sistem -->
        <h2>4. Batasan PAKAR-AIR (Harus Dipahami)</h2>
        <p>
          Sebagai pengguna PAKAR-AIR, penting untuk memahami keterbatasan sistem agar tidak terjadi 
          kesalahan interpretasi:
        </p>

        <div class="kotak-batasan">
          <span class="batasan-icon">!</span>
          <div>
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

        <!-- Bagian 5: FAQ -->
        <h2>5. Pertanyaan yang Sering Diajukan (FAQ)</h2>

        <div class="faq-list">
          <div class="faq-item">
            <div class="faq-pertanyaan">Apakah PAKAR-AIR bisa menggantikan tes laboratorium?</div>
            <div class="faq-jawaban">Tidak. PAKAR-AIR adalah alat bantu skrining awal. Untuk keperluan medis, legal, atau komersial, Anda tetap WAJIB menggunakan uji laboratorium standar yang terakreditasi.</div>
          </div>
          <div class="faq-item">
            <div class="faq-pertanyaan">Seberapa akurat PAKAR-AIR?</div>
            <div class="faq-jawaban">PAKAR-AIR memiliki tingkat akurasi sekitar 85-90% untuk deteksi kontaminasi tingkat menengah hingga berat berdasarkan parameter visual. Namun, akurasinya tidak dapat menyamai uji laboratorium.</div>
          </div>
          <div class="faq-item">
            <div class="faq-pertanyaan">Mengapa confidence score saya rendah padahal air terlihat bersih?</div>
            <div class="faq-jawaban">Confidence score rendah biasanya disebabkan oleh kualitas foto yang kurang baik: pencahayaan kurang, gambar buram, latar belakang tidak kontras, atau data manual tidak lengkap.</div>
          </div>
          <div class="faq-item">
            <div class="faq-pertanyaan">Apakah data analisis saya aman dan disimpan?</div>
            <div class="faq-jawaban">Ya. Semua data analisis Anda disimpan secara aman untuk keperluan riwayat analisis. Data hanya dapat diakses oleh akun Anda sendiri dan tidak dibagikan ke pihak ketiga.</div>
          </div>
          <div class="faq-item">
            <div class="faq-pertanyaan">Bisakah saya mengekspor hasil analisis?</div>
            <div class="faq-jawaban">Ya, Anda dapat mengekspor hasil analisis dari halaman Riwayat Analisis dalam format PDF atau CSV untuk dokumentasi pribadi.</div>
          </div>
        </div>

        <!-- Referensi -->
        <div class="referensi">
          <strong>Referensi</strong><br>
          Dokumentasi Teknis PAKAR-AIR (Pendeteksi Kualitas Air Berbasis Artificial Intelligence) v1.0<br>
          Peraturan Menteri Kesehatan RI No. 492/Menkes/Per/IV/2010 tentang Persyaratan Kualitas Air Minum<br>
          World Health Organization (WHO) — Guidelines for Drinking-water Quality, 4th Edition<br>
          United Nations Sustainable Development Goal 6: Clean Water and Sanitation
        </div>

        <p class="penutup">
          <strong>Pesan PAKAR-AIR:</strong> Kami berharap panduan ini membantu Anda memahami hasil analisis 
          air dengan lebih baik. PAKAR-AIR hadir untuk memberdayakan masyarakat dalam memantau kualitas air 
          secara mandiri. Dengan pengetahuan yang tepat, Anda dapat melindungi diri, keluarga, dan lingkungan 
          dari risiko yang terkait dengan air tercemar.
        </p>

      </div>

      <!-- FOOTER TOMBOL -->
      <div class="footer">
        <button class="btn-kembali" @click="kembali">← Kembali ke Halaman Edukasi</button>
        <button class="btn-analisis" @click="analisis">Coba Analisis Sekarang →</button>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  name: 'ArtikelInterpretasi',
  methods: {
    kembali() {
      this.$router.back();
    },
    analisis() {
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

.page {
  background: #f5f3ef;
  min-height: 100vh;
  padding: 40px 20px;
  font-family: 'Inter', -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
  line-height: 1.5;
}

.container {
  max-width: 880px;
  margin: 0 auto;
  background: #ffffff;
  border-radius: 20px;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.04);
  overflow: hidden;
}

/* Header */
.header {
  padding: 32px 36px 0 36px;
}

.meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
  font-size: 13px;
}

.kategori {
  background: #e8eef0;
  color: #4a6a6a;
  padding: 4px 12px;
  border-radius: 20px;
  font-weight: 500;
}

.tanggal {
  color: #9aa6b5;
}

h1 {
  font-size: 28px;
  line-height: 1.3;
  font-weight: 600;
  color: #3a5a4a;
  margin-bottom: 12px;
}

.penulis {
  font-size: 12px;
  color: #7c8b9c;
  border-top: 1px solid #edebe6;
  padding-top: 14px;
}

/* Gambar */
.gambar {
  padding: 24px 36px 0 36px;
}

.gambar img {
  width: 100%;
  border-radius: 14px;
}

.caption {
  font-size: 11px;
  color: #a8b3c0;
  text-align: center;
  margin-top: 8px;
}

/* Konten */
.konten {
  padding: 16px 36px 32px 36px;
}

.lead {
  font-size: 16px;
  line-height: 1.6;
  color: #4b5c6e;
  margin-bottom: 20px;
  border-left: 3px solid #c9a87b;
  padding-left: 18px;
}

p {
  font-size: 15px;
  line-height: 1.7;
  color: #3a4a5c;
  margin-bottom: 16px;
}

ul {
  margin: 12px 0 16px 30px;
}

li {
  margin-bottom: 8px;
  font-size: 14px;
  line-height: 1.6;
  color: #4a5a6a;
}

h2 {
  font-size: 22px;
  font-weight: 600;
  color: #3a5a4a;
  margin: 32px 0 16px 0;
  padding-bottom: 6px;
  border-bottom: 2px solid #e8e2d8;
}

/* Grid tiga kategori */
.grid-tiga-kategori {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  margin: 20px 0;
}

.kategori-card {
  background: #f8f6f2;
  border-radius: 16px;
  padding: 18px;
  border-top: 3px solid;
}

.kategori-card.aman { border-top-color: #6b8c6b; }
.kategori-card.perlu { border-top-color: #d4a373; }
.kategori-card.tercemar { border-top-color: #b85c5c; }

.kategori-icon {
  width: 40px;
  height: 40px;
  background: rgba(0,0,0,0.05);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 12px;
}

.kategori-judul {
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 8px;
}

.aman .kategori-judul { color: #4a6a4a; }
.perlu .kategori-judul { color: #b87c4a; }
.tercemar .kategori-judul { color: #b85c5c; }

.kategori-badge {
  font-size: 11px;
  background: rgba(0,0,0,0.05);
  padding: 4px 8px;
  border-radius: 20px;
  display: inline-block;
  margin-bottom: 12px;
}

.kategori-deskripsi {
  font-size: 13px;
  line-height: 1.55;
  color: #5a6a7a;
  margin-bottom: 12px;
}

.kategori-karakteristik {
  font-size: 12px;
  margin: 10px 0;
}

.kategori-karakteristik ul {
  margin: 6px 0 0 18px;
}

.kategori-karakteristik li {
  font-size: 11px;
  margin-bottom: 4px;
}

.kategori-tindakan {
  background: rgba(0,0,0,0.03);
  padding: 10px;
  border-radius: 10px;
  font-size: 12px;
  margin-top: 10px;
}

/* Confidence Box */
.confidence-box {
  background: #f8f6f2;
  padding: 20px;
  border-radius: 16px;
  margin: 20px 0;
}

.confidence-bar {
  display: flex;
  height: 40px;
  border-radius: 10px;
  overflow: hidden;
  margin-bottom: 16px;
}

.bar {
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: bold;
  font-size: 13px;
}

.bar.tinggi { background: #6b8c6b; }
.bar.sedang { background: #d4a373; }
.bar.rendah { background: #b85c5c; }

.confidence-legend {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.legend-item {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  font-size: 13px;
}

.dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  margin-top: 3px;
  flex-shrink: 0;
}

.dot.tinggi { background: #6b8c6b; }
.dot.sedang { background: #d4a373; }
.dot.rendah { background: #b85c5c; }

/* Kotak tips */
.kotak-tips {
  background: #e8f4f8;
  border-left: 4px solid #6b8c6b;
  padding: 16px;
  border-radius: 12px;
  margin: 20px 0;
  display: flex;
  gap: 12px;
}

.tips-icon {
  background: #6b8c6b;
  color: white;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  flex-shrink: 0;
}

.kotak-tips ul {
  margin: 8px 0 0 18px;
}

/* Contoh */
.contoh-list {
  margin: 16px 0;
}

.contoh-item {
  border: 1px solid #e8e2d8;
  border-radius: 12px;
  margin-bottom: 16px;
  overflow: hidden;
}

.contoh-judul {
  background: #f6f3ef;
  padding: 12px 16px;
  font-weight: 600;
  font-size: 14px;
  color: #5c4a3a;
}

.contoh-isi {
  padding: 14px 16px;
}

.contoh-isi p {
  margin-bottom: 8px;
  font-size: 13px;
}

.contoh-isi ul {
  margin: 6px 0 6px 20px;
}

.contoh-isi li {
  font-size: 13px;
  margin-bottom: 4px;
}

.contoh-note {
  font-size: 12px;
  color: #7a8a8a;
  margin-top: 8px;
  font-style: italic;
}

.badge {
  padding: 2px 10px;
  border-radius: 20px;
  font-size: 11px;
  font-weight: 500;
}

.aman-badge { background: #d4e5d4; color: #3d6b3d; }
.perlu-badge { background: #f0e5c8; color: #a5832e; }
.tercemar-badge { background: #f0d6d6; color: #b85c5c; }

/* Kotak batasan */
.kotak-batasan {
  background: #fef6f0;
  border-left: 4px solid #d4a373;
  padding: 16px;
  border-radius: 12px;
  margin: 20px 0;
  display: flex;
  gap: 12px;
}

.batasan-icon {
  background: #d4a373;
  color: white;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  flex-shrink: 0;
}

.kotak-batasan ul {
  margin: 8px 0 0 18px;
}

/* FAQ */
.faq-list {
  margin: 16px 0;
}

.faq-item {
  margin-bottom: 16px;
  padding-bottom: 12px;
  border-bottom: 1px solid #ece6df;
}

.faq-pertanyaan {
  font-weight: 600;
  font-size: 14px;
  color: #4a6a4a;
  margin-bottom: 6px;
}

.faq-jawaban {
  font-size: 13px;
  color: #6a7a8a;
  line-height: 1.55;
}

/* Referensi */
.referensi {
  background: #f8f6f2;
  padding: 16px 20px;
  border-radius: 12px;
  font-size: 11px;
  line-height: 1.6;
  color: #7a8a7a;
  margin: 24px 0 16px 0;
}

.referensi strong {
  font-size: 12px;
  color: #8b7355;
  display: block;
  margin-bottom: 8px;
}

/* Penutup */
.penutup {
  font-style: italic;
  background: #faf7f2;
  padding: 16px 20px;
  border-radius: 12px;
  font-size: 14px;
  line-height: 1.6;
  color: #6a7a6a;
  margin-top: 20px;
}

/* Footer */
.footer {
  padding: 16px 36px 32px 36px;
  border-top: 1px solid #ece6df;
  display: flex;
  justify-content: space-between;
  gap: 16px;
  background: #fefcf9;
}

.btn-kembali, .btn-analisis {
  padding: 10px 24px;
  border-radius: 40px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  font-family: inherit;
  transition: all 0.2s;
}

.btn-kembali {
  background: transparent;
  border: 1px solid #d4cbbc;
  color: #8b7355;
}

.btn-kembali:hover {
  background: #f5f0e8;
}

.btn-analisis {
  background: #6b8c6b;
  border: none;
  color: white;
}

.btn-analisis:hover {
  background: #4d6b4d;
}

/* Responsif */
@media (max-width: 700px) {
  .header, .gambar, .konten, .footer {
    padding-left: 20px;
    padding-right: 20px;
  }
  
  h1 {
    font-size: 22px;
  }
  
  .grid-tiga-kategori {
    grid-template-columns: 1fr;
  }
  
  .meta {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }
  
  .footer {
    flex-direction: column;
  }
  
  .btn-kembali, .btn-analisis {
    text-align: center;
  }
  
  .confidence-bar {
    flex-direction: column;
    height: auto;
  }
  
  .bar {
    padding: 6px;
  }
}
</style>