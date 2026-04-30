<template>
  <div class="article-page">
    <div class="article-container">
      
      <!-- ========== HEADER ARTIKEL ========== -->
      <div class="article-header">
        <div class="header-meta">
          <span class="category-tag health">Kesehatan & Lingkungan</span>
          <span class="reading-time">10 Maret 2026 · 8 menit membaca</span>
        </div>
        <h1 class="article-title">Dampak Pencemaran Air bagi Kesehatan: Ancaman Tersembunyi yang Mengintai Setiap Hari</h1>
        <div class="author-credit">
          <span class="author">Tim Pakar PAKAR-AIR</span>
          <span class="separator">—</span>
          <span class="source">Sumber: World Health Organization & Kementerian Kesehatan RI</span>
        </div>
      </div>

      <!-- ========== COVER GAMBAR ========== -->
      <div class="cover-container">
        <img 
          :src="coverImage" 
          alt="Ilustrasi pencemaran air" 
          class="cover-image"
          @error="handleImageError"
        >
        <p class="cover-caption">
          Pencemaran air dapat menyebabkan berbagai penyakit serius, mulai dari diare akut hingga kanker | Ilustrasi: PAKAR-AIR
        </p>
      </div>

      <!-- ========== KONTEN ARTIKEL ========== -->
      <div class="article-body">
        
        <!-- Lead -->
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

        <!-- Bagian 1: Jenis Pencemar Air -->
        <h2 class="section-title">1. Klasifikasi Pencemar Air Berdasarkan Sumber dan Jenisnya</h2>
        <p>
          Memahami jenis-jenis pencemar air adalah langkah awal untuk mengidentifikasi risiko kesehatan 
          yang mungkin ditimbulkan. Berikut adalah empat kategori utama pencemar air:
        </p>

        <div class="card-grid">
          <div class="info-card-compact">
            <div class="card-icon">B</div>
            <div class="card-title">Pencemar Biologis</div>
            <div class="card-desc">
              <strong>Sumber:</strong> Kotoran manusia, hewan, limbah rumah tangga<br>
              <strong>Jenis:</strong> Bakteri E.coli, Salmonella typhi, Vibrio cholerae, Virus Hepatitis A, Parasit Giardia lamblia<br>
              <strong>Dampak:</strong> Diare, kolera, tifoid, hepatitis A, disentri
            </div>
          </div>
          <div class="info-card-compact">
            <div class="card-icon">K</div>
            <div class="card-title">Pencemar Kimiawi</div>
            <div class="card-desc">
              <strong>Sumber:</strong> Limbah industri, pertanian (pupuk, pestisida), limbah rumah tangga<br>
              <strong>Jenis:</strong> Logam berat (timbal, merkuri, kadmium, arsenik), nitrat, pestisida, herbisida<br>
              <strong>Dampak:</strong> Gagal ginjal, kanker, gangguan saraf, gangguan hormon, kerusakan hati
            </div>
          </div>
          <div class="info-card-compact">
            <div class="card-icon">F</div>
            <div class="card-title">Pencemar Fisik</div>
            <div class="card-desc">
              <strong>Sumber:</strong> Erosi tanah, limbah konstruksi, sampah plastik, sedimentasi<br>
              <strong>Jenis:</strong> Lumpur, sedimen, mikroplastik, partikel tersuspensi, serat tekstil<br>
              <strong>Dampak:</strong> Gangguan pencernaan, akumulasi mikroplastik dalam jaringan tubuh, iritasi saluran cerna
            </div>
          </div>
          <div class="info-card-compact">
            <div class="card-icon">R</div>
            <div class="card-title">Pencemar Radioaktif</div>
            <div class="card-desc">
              <strong>Sumber:</strong> Limbah industri nuklir, pertambangan uranium, fasilitas medis, pembangkit listrik tenaga nuklir<br>
              <strong>Jenis:</strong> Radium-226, Uranium-238, Radon-222, Strontium-90<br>
              <strong>Dampak:</strong> Kanker, kerusakan sumsum tulang, cacat lahir, mutasi genetik
            </div>
          </div>
        </div>

        <!-- Bagian 2: Penyakit Akut -->
        <h2 class="section-title">2. Penyakit Akut yang Muncul dalam Hitungan Jam hingga Hari</h2>
        <p>
          Paparan air tercemar dalam waktu singkat dapat menyebabkan penyakit akut yang memerlukan 
          penanganan medis segera. Berikut adalah penyakit-penyakit yang paling sering terjadi di masyarakat:
        </p>

        <div class="disease-table">
          <div class="disease-header">
            <div class="col-disease">Penyakit</div>
            <div class="col-cause">Penyebab</div>
            <div class="col-symptom">Gejala Utama</div>
            <div class="col-risk">Kelompok Rentan</div>
          </div>
          <div class="disease-row">
            <div class="col-disease"><strong>Diare / Kolera</strong></div>
            <div class="col-cause">Vibrio cholerae, E.coli patogen</div>
            <div class="col-symptom">Dehidrasi parah, muntah, BAB lebih dari 3 kali per hari, lemas ekstrem</div>
            <div class="col-risk">Balita, lansia, ibu hamil, imunokompromais</div>
          </div>
          <div class="disease-row">
            <div class="col-disease"><strong>Demam Tifoid (Tipes)</strong></div>
            <div class="col-cause">Salmonella typhi</div>
            <div class="col-symptom">Demam tinggi hingga 40°C, sakit perut, sembelit atau diare, bercak kemerahan di perut</div>
            <div class="col-risk">Semua usia, terutama anak-anak dan remaja</div>
          </div>
          <div class="disease-row">
            <div class="col-disease"><strong>Hepatitis A</strong></div>
            <div class="col-cause">Virus Hepatitis A (HAV)</div>
            <div class="col-symptom">Kulit menguning (jaundice), lemas, mual, urine berwarna gelap seperti teh</div>
            <div class="col-risk">Anak-anak dan remaja, daerah dengan sanitasi buruk</div>
          </div>
          <div class="disease-row">
            <div class="col-disease"><strong>Disentri</strong></div>
            <div class="col-cause">Shigella dysenteriae, Entamoeba histolytica</div>
            <div class="col-symptom">BAB berdarah berlendir, demam tinggi, kram perut hebat, tenesmus</div>
            <div class="col-risk">Daerah dengan sanitasi buruk, daya tahan tubuh lemah</div>
          </div>
          <div class="disease-row">
            <div class="col-disease"><strong>Leptospirosis</strong></div>
            <div class="col-cause">Bakteri Leptospira interrogans (dari urine tikus)</div>
            <div class="col-symptom">Demam tinggi, nyeri otot terutama betis, mata merah, sakit kepala hebat</div>
            <div class="col-risk">Wilayah banjir, petani, peternak, pekerja tambang</div>
          </div>
        </div>

        <div class="alert-box">
          <div class="alert-icon">!</div>
          <div class="alert-content">
            <strong>Data Darurat WHO (2025)</strong>
            <p>Setiap hari, lebih dari <strong>800 anak di bawah usia 5 tahun</strong> meninggal akibat diare yang 
            terkait dengan air kotor, sanitasi buruk, dan kebersihan yang tidak memadai. 
            Ini berarti <strong>satu anak meninggal setiap 2 menit</strong> — kematian yang sebenarnya 
            dapat dicegah dengan akses air bersih dan sanitasi yang layak.</p>
          </div>
        </div>

        <!-- Bagian 3: Penyakit Kronis -->
        <h2 class="section-title">3. Penyakit Kronis yang Muncul Setelah Bertahun-tahun Terpapar</h2>
        <p>
          Yang lebih mengkhawatirkan adalah dampak jangka panjang dari paparan air tercemar. 
          Kontaminan seperti logam berat dan bahan kimia beracun dapat terakumulasi dalam tubuh 
          selama bertahun-tahun sebelum gejala muncul. Pada saat terdiagnosis, kerusakan seringkali 
          sudah parah dan tidak dapat dipulihkan.
        </p>

        <div class="chronic-list">
          <div class="chronic-item">
            <div class="chronic-number">1</div>
            <div class="chronic-content">
              <strong>Gagal Ginjal Kronis</strong>
              <p>Logam berat seperti kadmium (Cd), timbal (Pb), dan merkuri (Hg) masuk ke aliran darah 
              melalui air minum, lalu disaring oleh ginjal. Seiring waktu, logam ini merusak nefron 
              (unit penyaring ginjal) secara perlahan hingga fungsi ginjal menurun drastis di bawah 15%. 
              Pasien cuci darah (hemodialisis) di Indonesia meningkat <strong>10 kali lipat</strong> dalam satu dekade 
              terakhir, dengan biaya pengobatan mencapai Rp 50-100 juta per pasien per tahun.</p>
            </div>
          </div>
          <div class="chronic-item">
            <div class="chronic-number">2</div>
            <div class="chronic-content">
              <strong>Gangguan Perkembangan Saraf pada Anak</strong>
              <p>Paparan timbal (plumbum) dari pipa tua, limbah baterai, atau industri peleburan logam 
              mengganggu pembentukan sinapsis (koneksi antar sel saraf) di otak anak yang sedang berkembang. 
              Kerusakan ini bersifat <strong>ireversibel (tidak dapat dipulihkan)</strong> dan menyebabkan penurunan 
              IQ (rata-rata turun 5-10 poin), hiperaktif (ADHD), gangguan konsentrasi, keterlambatan bicara, 
              dan perilaku agresif. WHO menyatakan <strong>tidak ada ambang batas aman</strong> untuk timbal pada anak-anak.</p>
            </div>
          </div>
          <div class="chronic-item">
            <div class="chronic-number">3</div>
            <div class="chronic-content">
              <strong>Kanker</strong>
              <p>Arsenik (As) dalam air tanah — yang banyak ditemukan di berbagai wilayah Asia, termasuk 
              Indonesia bagian timur — menyebabkan <strong>kanker kulit, paru-paru, dan kandung kemih</strong> setelah 
              konsumsi 5-15 tahun. Paparan pestisida dalam jangka panjang juga terkait dengan  
              <strong>kanker darah (leukemia) pada anak-anak</strong> serta kanker payudara dan prostat pada dewasa. 
              Senyawa Trihalomethane (THM) yang terbentuk dari klorinasi air juga bersifat karsinogenik.</p>
            </div>
          </div>
          <div class="chronic-item">
            <div class="chronic-number">4</div>
            <div class="chronic-content">
              <strong>Gangguan Hormon dan Sistem Reproduksi</strong>
              <p>Pestisida dan mikroplastik mengandung <strong>senyawa pengganggu endokrin (EDC)</strong>. Pada pria, 
              senyawa ini menyebabkan penurunan kualitas sperma (jumlah, motilitas, morfologi), 
              infertilitas (mandul), dan peningkatan risiko kanker testis. Pada wanita, menyebabkan 
              gangguan siklus menstruasi, pubertas dini pada anak perempuan, endometriosis, sindrom ovarium polikistik (PCOS), 
              dan peningkatan risiko keguguran. Pada janin, dapat menyebabkan cacat lahir dan berat badan lahir rendah.</p>
            </div>
          </div>
          <div class="chronic-item">
            <div class="chronic-number">5</div>
            <div class="chronic-content">
              <strong>Gangguan Tiroid dan Metabolisme</strong>
              <p>Perklorat (dari propelan roket dan kembang api) dan nitrat (dari pupuk pertanian) yang 
              mencemari air tanah menghambat penyerapan yodium oleh kelenjar tiroid. Akibatnya, 
              produksi hormon tiroid (T3 dan T4) terganggu, menyebabkan <strong>hipotiroidisme</strong> (kelelahan 
              kronis, kenaikan berat badan, depresi, gangguan memori), gangguan pertumbuhan pada anak, 
              dan pada ibu hamil dapat menyebabkan kerusakan otak janin (kretinisme).</p>
            </div>
          </div>
        </div>

        <!-- Bagian 4: Statistik Indonesia -->
        <h2 class="section-title">4. Fakta Pencemaran Air di Indonesia</h2>
        <p>
          Indonesia menghadapi krisis kualitas air yang serius. Berdasarkan data dari berbagai sumber 
          resmi, kondisi pencemaran air di Indonesia sangat memprihatinkan:
        </p>

        <div class="stats-grid">
          <div class="stat-card">
            <div class="stat-number">70%</div>
            <div class="stat-label">sungai di Jawa tercemar berat</div>
            <div class="stat-source">Sumber: Kementerian LHK, 2025</div>
          </div>
          <div class="stat-card">
            <div class="stat-number">1 dari 3</div>
            <div class="stat-label">sumur warga di perkotaan mengandung E.coli</div>
            <div class="stat-source">Sumber: Kementerian Kesehatan RI, 2024</div>
          </div>
          <div class="stat-card">
            <div class="stat-number">Rp 15 Triliun</div>
            <div class="stat-label">biaya pengobatan penyakit air-borne per tahun</div>
            <div class="stat-source">Sumber: BPJS Kesehatan, 2024</div>
          </div>
          <div class="stat-card">
            <div class="stat-number">54%</div>
            <div class="stat-label">akses air minum rumah tangga tidak memenuhi syarat kesehatan</div>
            <div class="stat-source">Sumber: BPS & Kemenkes RI, 2025</div>
          </div>
          <div class="stat-card">
            <div class="stat-number">89%</div>
            <div class="stat-label">rumah tangga di Jakarta menggunakan air kemasan atau isi ulang</div>
            <div class="stat-source">Sumber: Jakstranas Penyediaan Jaringan Pipa, 2024</div>
          </div>
          <div class="stat-card">
            <div class="stat-number">35%</div>
            <div class="stat-label">air minum isi ulang tidak memenuhi syarat mikrobiologi</div>
            <div class="stat-source">Sumber: Badan POM, 2024</div>
          </div>
        </div>

        <!-- Bagian 5: Tindakan Pencegahan -->
        <h2 class="section-title">5. Tindakan Pencegahan yang Dapat Dilakukan</h2>
        <p>
          Meskipun masalah pencemaran air tampak besar, ada banyak langkah konkret yang dapat 
          Anda lakukan untuk melindungi diri dan keluarga dari risiko kesehatan akibat air tercemar:
        </p>

        <div class="prevention-list">
          <div class="prevention-item">
            <div class="prevention-number">1</div>
            <div class="prevention-content">
              <strong>Skrining rutin dengan PAKAR-AIR</strong>
              <p>Lakukan analisis awal kualitas air setiap 3 bulan, terutama jika sumber air Anda berada 
              di dekat kawasan industri, pertanian intensif, atau pemukiman padat dengan sanitasi buruk. 
              PAKAR-AIR dapat memberikan peringatan dini sebelum dampak kesehatan terjadi.</p>
            </div>
          </div>
          <div class="prevention-item">
            <div class="prevention-number">2</div>
            <div class="prevention-content">
              <strong>Rebus air hingga mendidih</strong>
              <p>Rebus air hingga mendidih selama minimal 10 menit. Ini efektif untuk membunuh bakteri, 
              virus, dan parasit penyebab diare, tifoid, dan kolera. Namun perlu diingat: perebusan 
              <strong>tidak menghilangkan logam berat, pestisida, atau mikroplastik</strong>.</p>
            </div>
          </div>
          <div class="prevention-item">
            <div class="prevention-number">3</div>
            <div class="prevention-content">
              <strong>Gunakan filter air yang tepat</strong>
              <p>Filter keramik atau karbon aktif dapat menyaring partikel, kaporit, dan sebagian logam berat. 
              Untuk kontaminan yang lebih serius seperti arsenik atau logam berat tinggi, pertimbangkan 
              teknologi <strong>reverse osmosis (RO)</strong> atau distilasi. Pastikan filter dibersihkan secara rutin.</p>
            </div>
          </div>
          <div class="prevention-item">
            <div class="prevention-number">4</div>
            <div class="prevention-content">
              <strong>Lindungi sumber air dari pencemaran</strong>
              <p>Jangan buang sampah atau limbah rumah tangga ke sungai, danau, atau sumur. Pastikan septic tank 
              kedap air dan berjarak minimal 10 meter dari sumur. Hindari penggunaan pupuk dan pestisida 
              berlebihan di sekitar sumber air. Buatlah sumur resapan untuk mengurangi limpasan air hujan.</p>
            </div>
          </div>
          <div class="prevention-item">
            <div class="prevention-number">5</div>
            <div class="prevention-content">
              <strong>Lakukan uji laboratorium jika diperlukan</strong>
              <p>Jika hasil PAKAR-AIR menunjukkan kategori <strong>"Berpotensi Tercemar"</strong> atau confidence score rendah, 
              segera bawa sampel air ke laboratorium kesehatan lingkungan atau balai teknis kesehatan 
              lingkungan (BTKL) terdekat untuk uji fisik, kimia, dan mikrobiologi lengkap.</p>
            </div>
          </div>
        </div>

        <!-- Bagian 6: Kesimpulan -->
        <h2 class="section-title">6. Kesimpulan</h2>
        <p>
          Akses terhadap air bersih dan sanitasi yang layak adalah <strong>hak asasi manusia</strong> yang dijamin dalam 
          Sustainable Development Goal 6 (SDG 6). Sayangnya, jutaan orang di Indonesia masih belum 
          menikmati hak ini. Akibatnya, penyakit-penyakit yang sebenarnya dapat dicegah terus merenggut 
          nyawa, terutama anak-anak.
        </p>
        <p>
          <strong>PAKAR-AIR</strong> hadir sebagai solusi teknologi untuk membantu masyarakat melakukan 
          skrining awal kualitas air secara cepat, mudah, dan terjangkau. Dengan mengetahui kualitas air 
          sejak dini, Anda dapat mengambil tindakan pencegahan sebelum dampak kesehatan terjadi.
        </p>
        <p>
          Ingatlah: <strong>setiap tetes air yang Anda gunakan mempengaruhi kesehatan Anda dan keluarga</strong>. 
          Jangan anggap remeh kualitas air di sekitar Anda. Lakukan pengecekan, lakukan pencegahan, 
          dan sebarkan kesadaran ini kepada orang-orang di sekitar Anda.
        </p>

        <!-- Referensi -->
        <div class="reference-section">
          <h3>Referensi</h3>
          <ul>
            <li>World Health Organization (WHO) — Guidelines for Drinking-water Quality, 4th Edition incorporating the 1st and 2nd addenda (2022)</li>
            <li>Kementerian Kesehatan Republik Indonesia — Profil Kesehatan Indonesia Tahun 2024</li>
            <li>Kementerian Lingkungan Hidup dan Kehutanan — Laporan Status Lingkungan Hidup Indonesia (SLHI) 2025</li>
            <li>Badan Pusat Statistik (BPS) — Statistik Lingkungan Hidup Indonesia 2025</li>
            <li>United Nations — Sustainable Development Goal 6: Clean Water and Sanitation, Progress Report 2024</li>
            <li>Jurnal Kesehatan Lingkungan Indonesia, Vol. 23 No. 2 (2024) — "Analisis Kualitas Air Tanah di Wilayah Industri"</li>
            <li>BPJS Kesehatan — Data Klaim Pengobatan Penyakit Berbasis Lingkungan Tahun 2024</li>
          </ul>
        </div>

        <!-- Penutup -->
        <div class="closing-statement">
          <p>
            <strong>Pesan PAKAR-AIR</strong><br>
            Kesehatan Anda dimulai dari air yang Anda konsumsi. Jangan tunggu sampai sakit. 
            Lakukan skrining rutin, terapkan langkah pencegahan, dan jadilah bagian dari solusi 
            untuk menciptakan akses air bersih bagi semua.
          </p>
          <p class="hashtag">#AirBersihUntukSemua #SDG6 #PAKARAIR #KesehatanLingkungan</p>
        </div>

      </div>

      <!-- ========== FOOTER TOMBOL ========== -->
      <div class="article-footer">
        <button class="btn-outline" @click="goBack">← Kembali ke Halaman Edukasi</button>
        <button class="btn-primary" @click="goToAnalysis">Cek Kualitas Air Anda →</button>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  name: 'HomeArticle2',
  data() {
    return {
      coverImagePath: require('@/assets/images/cover-pencemaran.jpg')
    };
  },
  computed: {
    coverImage() {
      return this.coverImagePath;
    }
  },
  methods: {
    handleImageError() {
      this.coverImagePath = 'https://placehold.co/860x450/e8e2d8/8b7355?text=Cover+Pencemaran+Air';
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

.col-disease, .col-cause, .col-symptom, .col-risk {
  padding: 12px;
  font-size: 13px;
  line-height: 1.5;
}

.col-disease { width: 18%; background: #f8f6f2; font-weight: 500; }
.col-cause { width: 22%; }
.col-symptom { width: 35%; }
.col-risk { width: 25%; }

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
  margin-bottom: 6px;
}

.stat-source {
  font-size: 10px;
  color: #b0a090;
}

/* Prevention List */
.prevention-list {
  margin: 20px 0;
}

.prevention-item {
  display: flex;
  gap: 14px;
  margin-bottom: 16px;
  padding: 14px;
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
  margin-bottom: 6px;
  color: #4a6a4a;
}

.prevention-content p {
  margin: 0;
  font-size: 13px;
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
  
  .card-grid, .stats-grid {
    grid-template-columns: 1fr;
  }
  
  .disease-header, .disease-row {
    flex-direction: column;
  }
  
  .col-disease, .col-cause, .col-symptom, .col-risk {
    width: 100%;
  }
  
  .article-footer {
    flex-direction: column;
  }
}
</style>