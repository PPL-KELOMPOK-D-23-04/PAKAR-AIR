<template>
  <DashboardLayout>
    <div class="article-page">

      <!-- PROGRESS -->
      <div class="progress-bar" :style="{ width: readProgress + '%' }"></div>

      <div class="article-layout">

        <!-- MAIN -->
        <div class="article-main">

          <div class="article-container">

            <!-- ========== HEADER ========== -->
            <div class="article-header">
              <button class="back-btn" @click="goBack">← Kembali ke Edukasi</button>
              <div class="header-meta">
                <span class="category-tag">Panduan Pengguna AI</span>
                <span class="reading-time">15 Maret 2026 · 8 menit membaca</span>
              </div>
              <h1 class="article-title">
                Memahami Hasil Analisis PAKAR-AIR: Panduan Lengkap Interpretasi Kualitas Air
              </h1>
              <div class="author-credit">
                <div class="author-avatar">PA</div>
                <div>
                  <p class="author-name">Tim Pakar PAKAR-AIR</p>
                  <p class="author-sub">Sumber: Dokumentasi Teknis PAKAR-AIR v1.0 · Terverifikasi Kemenkes RI</p>
                </div>
              </div>
            </div>

            <!-- ========== COVER ========== -->
            <div class="cover-container">
              <img
                src="https://images.unsplash.com/photo-1581093806997-124204d9fa9d?w=900&auto=format&fit=crop"
                alt="Analisis kualitas air PAKAR-AIR"
                class="cover-image"
                @error="$event.target.src='https://placehold.co/860x420/1e3a2f/a7f3d0?text=Analisis+PAKAR-AIR'"
              />
              <p class="cover-caption">
                PAKAR-AIR menganalisis kualitas air melalui kombinasi visi komputer dan data manual — memberikan hasil dalam hitungan detik | Ilustrasi: PAKAR-AIR
              </p>
            </div>

            <!-- ========== BODY ========== -->
            <div class="article-body">

        <!-- Lead -->
        <p class="lead-paragraph">
          Setelah Anda melakukan analisis kualitas air menggunakan PAKAR-AIR, sistem akan menampilkan hasil prediksi yang terdiri dari <strong>tiga komponen utama</strong>: kategori kualitas air, tingkat kepercayaan (confidence score), dan rekomendasi penggunaan. Panduan ini akan membantu Anda memahami setiap komponen tersebut, sehingga Anda dapat mengambil keputusan yang tepat dan terukur.
        </p>

        <p>
          PAKAR-AIR (<em>Pendeteksi Kualitas Air Berbasis Artificial Intelligence dan Rekognisi Citra</em>) dirancang sebagai <strong>alat bantu keputusan (decision support system)</strong> yang menggabungkan analisis citra visual air dengan data parameter manual yang Anda inputkan. Sistem ini memberi gambaran awal yang cepat dan terjangkau — sebelum Anda memutuskan apakah perlu uji laboratorium lebih lanjut.
        </p>

        <!-- ========== BAGIAN 1 ========== -->
        <div class="section-anchor" id="kategori"></div>
        <h2 class="section-title">
          <span class="section-num">01</span>
          Tiga Kategori Kualitas Air
        </h2>
        <p>
          Berdasarkan kombinasi data citra visual dan parameter manual (warna, bau, sumber air, kondisi lingkungan sekitar), PAKAR-AIR mengklasifikasikan kualitas air ke dalam <strong>tiga kategori</strong> berikut:
        </p>

        <div class="kategori-grid">

          <!-- AMAN -->
          <div class="kategori-card aman">
            <div class="kategori-header">
              <div class="kategori-icon aman-icon">✓</div>
              <div>
                <p class="kategori-label">Kategori A</p>
                <h3 class="kategori-title">Aman</h3>
              </div>
            </div>
            <p class="kategori-desc">
              Air memenuhi standar fisik dan parameter umum Permenkes RI No. 2 Tahun 2023. Tidak terdeteksi indikasi kontaminan visual yang signifikan.
            </p>
            <div class="kategori-ciri">
              <p class="ciri-label">Ciri-ciri terdeteksi:</p>
              <ul>
                <li>Jernih, tidak berwarna sama sekali</li>
                <li>Tidak berbau (atau bau klorin sangat ringan pada air PDAM)</li>
                <li>Tidak ada partikel atau endapan yang terlihat</li>
                <li>Sumber dari jaringan terpercaya (PDAM/sumur terlindungi)</li>
              </ul>
            </div>
            <div class="kategori-action aman-action">
              <strong>Tindakan yang disarankan:</strong> Rebus hingga mendidih 1 menit sebelum dikonsumsi. Lakukan uji lab rutin tiap 6 bulan untuk konfirmasi.
            </div>
          </div>

          <!-- PERLU PERLAKUAN -->
          <div class="kategori-card perlu">
            <div class="kategori-header">
              <div class="kategori-icon perlu-icon">!</div>
              <div>
                <p class="kategori-label">Kategori P</p>
                <h3 class="kategori-title">Perlu Perlakuan</h3>
              </div>
            </div>
            <p class="kategori-desc">
              Terdeteksi indikasi awal penurunan kualitas. Air tidak layak dikonsumsi langsung, namun masih dapat digunakan setelah melalui proses pengolahan yang tepat.
            </p>
            <div class="kategori-ciri">
              <p class="ciri-label">Ciri-ciri terdeteksi:</p>
              <ul>
                <li>Sedikit keruh atau berwarna kekuningan/kehijauan ringan</li>
                <li>Bau amis, tanah, atau klorin menyengat</li>
                <li>Ada partikel tersuspensi yang mulai terlihat</li>
                <li>Sumber dari sumur terbuka atau penampungan lama</li>
              </ul>
            </div>
            <div class="kategori-action perlu-action">
              <strong>Tindakan yang disarankan:</strong> Saring menggunakan filter sedimen → endapkan 2–4 jam → rebus 15 menit. Pertimbangkan instalasi filter karbon aktif permanen.
            </div>
          </div>

          <!-- TERCEMAR -->
          <div class="kategori-card tercemar">
            <div class="kategori-header">
              <div class="kategori-icon tercemar-icon">✕</div>
              <div>
                <p class="kategori-label">Kategori T</p>
                <h3 class="kategori-title">Berpotensi Tercemar</h3>
              </div>
            </div>
            <p class="kategori-desc">
              Terdeteksi indikasi kuat adanya kontaminan berbahaya — baik biologis (bakteri patogen) maupun kimiawi (logam berat, hidrokarbon). Penggunaan air sangat tidak disarankan.
            </p>
            <div class="kategori-ciri">
              <p class="ciri-label">Ciri-ciri terdeteksi:</p>
              <ul>
                <li>Keruh pekat, berwarna coklat, merah, atau kehitaman</li>
                <li>Bau menyengat: telur busuk (H₂S), minyak, atau kimia</li>
                <li>Sumber dekat kawasan industri, tempat pembuangan, atau pertanian intensif</li>
                <li>Riwayat banjir atau pencemaran terlapor di area tersebut</li>
              </ul>
            </div>
            <div class="kategori-action tercemar-action">
              <strong>Tindakan yang disarankan:</strong> JANGAN digunakan dalam kondisi apapun. Segera lakukan uji laboratorium terakreditasi. Laporkan ke Dinas Kesehatan setempat.
            </div>
          </div>

        </div>

        <!-- ========== BAGIAN 2 ========== -->
        <div class="section-anchor" id="confidence"></div>
        <h2 class="section-title">
          <span class="section-num">02</span>
          Memahami Confidence Score
        </h2>
        <p>
          <strong>Confidence score</strong> adalah angka 0–100% yang menunjukkan seberapa yakin model AI PAKAR-AIR terhadap prediksi yang dihasilkan. Ini bukan penilaian kualitas air itu sendiri, melainkan <em>ukuran keandalan data input</em> yang Anda berikan. Semakin baik kualitas foto dan kelengkapan data, semakin tinggi confidence score.
        </p>

        <div class="confidence-visual">
          <div class="conf-scale">
            <div class="conf-band high">
              <span class="conf-range">80–100%</span>
              <span class="conf-label">Tinggi</span>
            </div>
            <div class="conf-band medium">
              <span class="conf-range">60–79%</span>
              <span class="conf-label">Sedang</span>
            </div>
            <div class="conf-band low">
              <span class="conf-range">0–59%</span>
              <span class="conf-label">Rendah</span>
            </div>
          </div>
          <div class="conf-descriptions">
            <div class="conf-desc-item">
              <div class="conf-dot high-dot"></div>
              <div>
                <p class="conf-desc-title">Tinggi (80–100%) — Hasil Dapat Diandalkan</p>
                <p class="conf-desc-text">Foto berkualitas baik, data manual lengkap dan konsisten dengan data visual. Prediksi sangat kuat dan dapat dijadikan dasar keputusan segera. Tetap disarankan uji lab untuk konfirmasi akhir.</p>
              </div>
            </div>
            <div class="conf-desc-item">
              <div class="conf-dot medium-dot"></div>
              <div>
                <p class="conf-desc-title">Sedang (60–79%) — Hasil Cukup Andal</p>
                <p class="conf-desc-text">Ada ketidakkonsistenan kecil antara data visual dan manual, atau kualitas foto kurang optimal. Disarankan mengulang analisis dengan foto yang lebih baik sebelum mengambil keputusan penting.</p>
              </div>
            </div>
            <div class="conf-desc-item">
              <div class="conf-dot low-dot"></div>
              <div>
                <p class="conf-desc-title">Rendah (0–59%) — Hasil Tidak Dapat Diandalkan</p>
                <p class="conf-desc-text">Kualitas input tidak memadai untuk menghasilkan prediksi yang bermakna. Jangan ambil keputusan berdasarkan hasil ini. Ulangi analisis dengan memperbaiki semua faktor input terlebih dahulu.</p>
              </div>
            </div>
          </div>
        </div>

        <div class="tips-box">
          <div class="tips-icon-wrap">💡</div>
          <div>
            <p class="tips-title">Tips Meningkatkan Confidence Score</p>
            <ul class="tips-list">
              <li>Foto di bawah cahaya alami, pukul 10.00–14.00 — hindari flash dan bayangan langsung</li>
              <li>Gunakan gelas bening dengan latar belakang putih bersih atau putih polos</li>
              <li>Pastikan foto tajam (tidak buram) dan air mengisi minimal 2/3 frame foto</li>
              <li>Isi <em>semua</em> data manual dengan jujur — jangan menebak jika tidak tahu</li>
              <li>Matikan filter atau efek kamera; gunakan mode foto standar tanpa enhancement</li>
              <li>Ambil 3 foto dari sudut berbeda dan pilih yang paling terang dan tajam</li>
            </ul>
          </div>
        </div>

        <!-- ========== BAGIAN 3 ========== -->
        <div class="section-anchor" id="contoh"></div>
        <h2 class="section-title">
          <span class="section-num">03</span>
          Contoh Hasil Analisis Nyata
        </h2>
        <p>
          Berikut empat skenario konkret yang menggambarkan bagaimana PAKAR-AIR memproses input dan menghasilkan output. Gunakan ini sebagai referensi untuk membandingkan dengan situasi Anda.
        </p>

        <div class="examples-grid">

          <div class="example-card">
            <div class="example-num">Skenario 1</div>
            <div class="example-title">Air Sumur Rumah Tangga di Pemukiman</div>
            <div class="example-input">
              <p class="input-label">Data Input:</p>
              <p>Foto jernih tanpa warna, tidak berbau, sumber sumur gali terlindungi, jarak >10 m dari septic tank, tidak ada riwayat banjir.</p>
            </div>
            <div class="example-result">
              <div class="result-row">
                <span>Kategori</span>
                <span class="badge-aman">✓ Aman</span>
              </div>
              <div class="result-row">
                <span>Confidence Score</span>
                <span class="score high-score">94%</span>
              </div>
              <div class="result-row">
                <span>Rekomendasi</span>
                <span>Rebus sebelum minum. Uji lab 6 bulan sekali.</span>
              </div>
            </div>
            <p class="example-note">✅ Input berkualitas tinggi, hasil sangat dapat diandalkan.</p>
          </div>

          <div class="example-card">
            <div class="example-num">Skenario 2</div>
            <div class="example-title">Air Sungai di Kawasan Industri Pengolahan</div>
            <div class="example-input">
              <p class="input-label">Data Input:</p>
              <p>Foto keruh kecoklatan pekat, bau amis bercampur minyak, sumber sungai, dekat pabrik tekstil, riwayat pembuangan limbah terlapor.</p>
            </div>
            <div class="example-result">
              <div class="result-row">
                <span>Kategori</span>
                <span class="badge-tercemar">✕ Berpotensi Tercemar</span>
              </div>
              <div class="result-row">
                <span>Confidence Score</span>
                <span class="score high-score">91%</span>
              </div>
              <div class="result-row">
                <span>Rekomendasi</span>
                <span>JANGAN digunakan. Segera uji laboratorium dan laporkan ke BPLHD.</span>
              </div>
            </div>
            <p class="example-note">⚠️ Peringatan serius dengan confidence tinggi — tindak lanjut wajib.</p>
          </div>

          <div class="example-card">
            <div class="example-num">Skenario 3</div>
            <div class="example-title">Air PDAM Perkotaan dengan Bau Klorin</div>
            <div class="example-input">
              <p class="input-label">Data Input:</p>
              <p>Foto jernih, bau kaporit cukup kuat, sumber PDAM, pipa jaringan berusia ±15 tahun, tidak ada gejala kesehatan pada pengguna.</p>
            </div>
            <div class="example-result">
              <div class="result-row">
                <span>Kategori</span>
                <span class="badge-perlu">! Perlu Perlakuan</span>
              </div>
              <div class="result-row">
                <span>Confidence Score</span>
                <span class="score medium-score">78%</span>
              </div>
              <div class="result-row">
                <span>Rekomendasi</span>
                <span>Endapkan 30 menit atau pasang filter karbon aktif untuk hilangkan klorin.</span>
              </div>
            </div>
            <p class="example-note">ℹ️ Air PDAM umumnya aman, namun kadar klorin tinggi perlu ditangani.</p>
          </div>

          <div class="example-card">
            <div class="example-num">Skenario 4</div>
            <div class="example-title">Input Foto Buram & Data Manual Kosong</div>
            <div class="example-input">
              <p class="input-label">Data Input:</p>
              <p>Foto sangat gelap dan buram, data manual tidak diisi, sumber tidak diketahui, kondisi lingkungan tidak dipilih.</p>
            </div>
            <div class="example-result">
              <div class="result-row">
                <span>Kategori</span>
                <span class="badge-nd">— Tidak Dapat Ditentukan</span>
              </div>
              <div class="result-row">
                <span>Confidence Score</span>
                <span class="score low-score">38%</span>
              </div>
              <div class="result-row">
                <span>Rekomendasi</span>
                <span>Ulangi analisis. Perbaiki kualitas foto dan lengkapi data manual.</span>
              </div>
            </div>
            <p class="example-note">🔄 Hasil tidak dapat diandalkan. Input harus diperbaiki sebelum keputusan diambil.</p>
          </div>

        </div>

        <!-- ========== BAGIAN 4 ========== -->
        <div class="section-anchor" id="batasan"></div>
        <h2 class="section-title">
          <span class="section-num">04</span>
          Batasan Sistem yang Wajib Dipahami
        </h2>
        <p>
          PAKAR-AIR adalah alat yang powerful — namun setiap alat memiliki batas kemampuannya. Memahami batasan ini mencegah Anda dari kesalahan interpretasi yang berpotensi berbahaya.
        </p>

        <div class="limitation-grid">
          <div class="limit-item">
            <div class="limit-icon">🔬</div>
            <p class="limit-title">Bukan Pengganti Uji Laboratorium</p>
            <p class="limit-desc">PAKAR-AIR adalah alat skrining awal (screening tool). Untuk keperluan medis, legal, komersial, atau konfirmasi akhir, <strong>uji laboratorium terakreditasi KAN tetap wajib</strong>.</p>
          </div>
          <div class="limit-item">
            <div class="limit-icon">🦠</div>
            <p class="limit-title">Tidak Mendeteksi Patogen Secara Langsung</p>
            <p class="limit-desc">Bakteri E. coli, virus, protozoa, dan kontaminan biologis lainnya <strong>tidak dapat dideteksi secara visual</strong>. Air yang jernih dan skor confidence tinggi tidak menjamin bebas patogen.</p>
          </div>
          <div class="limit-item">
            <div class="limit-icon">⚗️</div>
            <p class="limit-title">Keterbatasan Deteksi Kimia</p>
            <p class="limit-desc">Logam berat kadar sangat rendah (arsenik <50 µg/L, timbal <10 µg/L), pestisida, dan senyawa PFAS tidak dapat dideteksi dari analisis citra. Deteksi hanya berdasarkan indikator visual tidak langsung.</p>
          </div>
          <div class="limit-item">
            <div class="limit-icon">📸</div>
            <p class="limit-title">Sangat Bergantung pada Kualitas Input</p>
            <p class="limit-desc">Akurasi model AI langsung proporsional dengan kualitas foto dan kelengkapan data manual. Input buruk menghasilkan output yang tidak dapat diandalkan meskipun modelnya akurat.</p>
          </div>
        </div>

        <div class="mandatory-box">
          <span class="mandatory-icon">!</span>
          <div>
            <p class="mandatory-title">Kapan WAJIB Melakukan Uji Laboratorium?</p>
            <ul class="mandatory-list">
              <li>Confidence score di bawah 60% — hasil tidak dapat diandalkan</li>
              <li>Kategori menunjukkan "Berpotensi Tercemar" — konfirmasi laboratorium wajib</li>
              <li>Ada anggota keluarga yang sakit diare, mual, atau gejala lain setelah konsumsi air</li>
              <li>Sumber air berada dekat kawasan industri, pertambangan, atau area pertanian intensif</li>
              <li>Terjadi banjir atau guncangan seismik yang berpotensi merusak infrastruktur air</li>
              <li>Sumur tidak pernah diuji laboratorium dalam >12 bulan terakhir</li>
            </ul>
          </div>
        </div>

        <!-- ========== BAGIAN 5 ========== -->
        <div class="section-anchor" id="faq"></div>
        <h2 class="section-title">
          <span class="section-num">05</span>
          Pertanyaan yang Sering Diajukan (FAQ)
        </h2>

        <div class="faq-list">
          <div v-for="(item, i) in faqItems" :key="i" class="faq-item" :class="{ open: openFaq === i }">
            <button class="faq-question" @click="openFaq = openFaq === i ? null : i">
              <span>{{ item.q }}</span>
              <span class="faq-chevron">{{ openFaq === i ? '▲' : '▼' }}</span>
            </button>
            <div v-if="openFaq === i" class="faq-answer">
              {{ item.a }}
            </div>
          </div>
        </div>

        <!-- ========== REFERENSI ========== -->
        <div class="reference-section">
          <p class="ref-title">📚 Referensi & Landasan Ilmiah</p>
          <ul class="ref-list">
            <li>Dokumentasi Teknis PAKAR-AIR v1.0 — Tim Pengembang PAKAR-AIR (2026)</li>
            <li>Peraturan Menteri Kesehatan RI No. 2 Tahun 2023 tentang Persyaratan Teknis Kualitas Air Minum</li>
            <li>WHO — Guidelines for Drinking-water Quality, 4th Edition with 1st and 2nd Addenda (2022)</li>
            <li>SNI 6989.11:2019 — Air dan Air Limbah: Cara Uji Derajat Keasaman (pH)</li>
            <li>UNICEF & WHO — Progress on Household Drinking Water, Sanitation and Hygiene 2000–2022</li>
            <li>UN SDG 6: Ensure availability and sustainable management of water and sanitation for all</li>
          </ul>
        </div>

        <!-- ========== PENUTUP ========== -->
        <div class="closing-box">
          <p class="closing-title">💬 Pesan dari Tim PAKAR-AIR</p>
          <p class="closing-text">
            Kami merancang PAKAR-AIR atas dasar satu keyakinan: setiap orang berhak mengetahui apa yang mereka minum. Panduan ini hadir agar Anda bisa menjadi pengguna yang cerdas — memahami kemampuan dan batas sistem, serta tahu kapan harus mengambil langkah lebih lanjut. Bersama, kita bisa membangun budaya pemantauan air mandiri yang lebih kuat di Indonesia.
          </p>
          <p class="closing-hash">#AirBersihUntukSemua &nbsp;·&nbsp; #SDG6 &nbsp;·&nbsp; #PAKARAIR &nbsp;·&nbsp; #AIuntukLingkungan</p>
        </div>
        </div> <!-- /.article-body -->

            <!-- ========== FOOTER ========== -->
            <div class="article-footer">
              <button class="btn-back" @click="goBack">← Kembali ke Edukasi</button>
              <div class="footer-right">
                <button class="btn-share">🔗 Bagikan Artikel</button>
                <button class="btn-primary" @click="goToAnalysis">Coba Analisis Sekarang →</button>
              </div>
            </div>

          </div> <!-- /.article-container -->

        </div> <!-- /.article-main -->

        <!-- SIDEBAR -->
        <aside class="article-sidebar">
          <div class="toc-card">
            <p class="toc-title">Daftar Isi</p>
            <ul class="toc-links">
              <li v-for="item in tocItems" :key="item.id">
                <a href="#" @click.prevent="scrollTo(item.id)" :class="{ active: activeSection === item.id }">
                  <span class="toc-num">{{ item.num }}</span>
                  {{ item.label }}
                </a>
              </li>
            </ul>
            <div class="toc-progress">
              <div class="toc-progress-fill" :style="{ width: readProgress + '%' }"></div>
            </div>
            <p class="toc-progress-label">{{ Math.round(readProgress) }}% selesai dibaca</p>
          </div>

          <div class="info-card">
            <p class="info-card-title">⚗️ Tentang Analisis</p>
            <p class="info-card-text">PAKAR-AIR memberikan rekomendasi awal. Untuk konfirmasi, lakukan uji laboratorium terakreditasi.</p>
            <button class="btn-cta" @click="goToAnalysis">Mulai Analisis →</button>
          </div>

          <div class="related-card">
            <p class="related-title">Artikel Terkait</p>
            <div class="related-list">
              <a href="#" class="related-item">🧪 Cara Membaca Hasil Test Kit</a>
              <a href="#" class="related-item">📊 Standar Kualitas Air (Permenkes)</a>
              <a href="#" class="related-item">🚰 Tips Menjaga Sumur dan Sumber Air</a>
            </div>
          </div>
        </aside>

      </div> <!-- /.article-layout -->

    </div> <!-- /.article-page -->
  </DashboardLayout>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import DashboardLayout from '@/layouts/DashboardLayout.vue'

const router = useRouter()
const readProgress = ref(0)
const openFaq = ref(null)
const tocItems = [
  { id: 'kategori', num: '01', label: 'Tiga Kategori' },
  { id: 'confidence', num: '02', label: 'Confidence Score' },
  { id: 'contoh', num: '03', label: 'Contoh Hasil' },
  { id: 'batasan', num: '04', label: 'Batasan Sistem' },
  { id: 'faq', num: '05', label: 'FAQ' },
]
const activeSection = ref('')

/* ===== FAQ DATA ===== */
const faqItems = [
  {
    q: 'Apakah PAKAR-AIR bisa menggantikan tes laboratorium?',
    a: 'Tidak. PAKAR-AIR adalah alat skrining awal berbasis AI yang dirancang untuk memberikan gambaran cepat dan terjangkau. Untuk keperluan medis, legal, komersial, atau sebagai dasar keputusan kritis (misalnya air minum bayi), uji laboratorium terakreditasi KAN tetap merupakan standar wajib yang tidak dapat digantikan.'
  },
  {
    q: 'Seberapa akurat PAKAR-AIR dalam mendeteksi kontaminasi?',
    a: 'Pada kondisi input optimal (foto berkualitas tinggi, data manual lengkap), PAKAR-AIR mencapai akurasi sekitar 85–90% untuk deteksi kontaminasi visual tingkat menengah hingga berat. Akurasi menurun signifikan untuk kontaminan yang tidak memiliki indikator visual (bakteri, arsenik kadar rendah, pestisida). Confidence score adalah panduan terbaik untuk menilai keandalan hasil spesifik Anda.'
  },
  {
    q: 'Mengapa confidence score saya rendah padahal air terlihat jernih?',
    a: 'Confidence score rendah hampir selalu disebabkan oleh kualitas input yang tidak memadai, bukan karena kondisi air. Penyebab umum: foto terlalu gelap atau buram, latar belakang tidak kontras, bayangan pada gelas, efek kamera aktif, atau data manual tidak diisi. Perbaiki semua faktor ini dan lakukan analisis ulang.'
  },
  {
    q: 'Bagaimana jika kategori menunjukkan "Aman" tapi saya masih ragu?',
    a: 'Kepercayaan Anda terhadap sumber air adalah faktor penting yang tidak dapat sepenuhnya direpresentasikan oleh sistem AI. Jika ada keraguan — khususnya jika ada perubahan mendadak pada lingkungan sekitar sumber air, atau ada anggota keluarga yang sakit — selalu prioritaskan uji laboratorium. PAKAR-AIR memberikan panduan awal, namun keputusan akhir ada di tangan Anda.'
  },
  {
    q: 'Apakah data foto dan analisis saya tersimpan dengan aman?',
    a: 'Ya. Semua data analisis disimpan terenkripsi di server PAKAR-AIR dan hanya dapat diakses oleh akun Anda sendiri. Data tidak dibagikan ke pihak ketiga tanpa persetujuan eksplisit Anda. Riwayat analisis dapat Anda gunakan untuk memantau tren kualitas air dari waktu ke waktu.'
  },
  {
    q: 'Berapa kali saya harus melakukan analisis untuk satu sumber air?',
    a: 'Untuk pemantauan rutin, kami merekomendasikan analisis PAKAR-AIR setiap bulan — terutama saat musim hujan atau setelah kejadian cuaca ekstrem. Untuk sumur pribadi, kombinasikan dengan uji laboratorium setiap 6 bulan untuk parameter biologis dan 12 bulan untuk parameter kimia.'
  },
  {
    q: 'Apa yang harus dilakukan jika hasil analisis menunjukkan "Berpotensi Tercemar"?',
    a: 'Hentikan semua penggunaan air untuk minum dan memasak segera. Beralih ke air kemasan tersertifikasi BPOM. Ambil sampel 500 ml ke laboratorium kesehatan lingkungan terdekat (BBTKLPP atau Labkesda). Jika sumber adalah air publik/PDAM, laporkan ke Dinas Kesehatan atau hubungi hotline Kemenkes 1500-567.'
  }
]

/* ===== SCROLL HANDLER ===== */
function handleScroll() {
  const doc = document.documentElement
  const total = doc.scrollHeight - doc.clientHeight
  readProgress.value = total > 0 ? (doc.scrollTop / total) * 100 : 0

  for (const item of tocItems) {
    const el = document.getElementById(item.id)
    if (el) {
      const rect = el.getBoundingClientRect()
      if (rect.top <= 120) activeSection.value = item.id
    }
  }
}

function scrollTo(id) {
  const el = document.getElementById(id)
  if (el) window.scrollTo({ top: el.offsetTop - 80, behavior: 'smooth' })
}

function goBack() {
  router.push('/edukasi')
}

function goToAnalysis() {
  router.push('/analysis')
}

onMounted(() => window.addEventListener('scroll', handleScroll))
onUnmounted(() => window.removeEventListener('scroll', handleScroll))
</script>

<style scoped>
/* ======================== */
/* PROGRESS                 */
/* ======================== */
.progress-bar {
  position: fixed;
  top: 0;
  left: 0;
  height: 3px;
  background: linear-gradient(90deg, #0f766e, #34d399);
  z-index: 100;
  transition: width 0.1s linear;
}

/* ======================== */
/* PAGE                     */
/* ======================== */
.article-page {
  background: #f5f7f5;
  min-height: 100vh;
  padding: 40px 24px 80px;
}

.article-container {
  max-width: 900px;
  margin: 0 auto;
  background: #ffffff;
  border-radius: 24px;
  box-shadow: 0 4px 40px rgba(0, 0, 0, 0.06);
  overflow: hidden;
}

/* Layout grid to match HomeArtikel */
.article-layout {
  max-width: 1140px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 280px;
  gap: 40px;
  align-items: start;
}
.article-main { }
.article-sidebar { position: sticky; top: 80px; }

/* ======================== */
/* HEADER                   */
/* ======================== */
.article-header {
  padding: 44px 52px 0;
}

.back-btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
  color: #6b7280;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  margin-bottom: 24px;
  transition: color 0.2s;
}
.back-btn:hover { color: #111827; }

.header-meta {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 20px;
  flex-wrap: wrap;
}

.category-tag {
  background: #d1fae5;
  color: #065f46;
  padding: 4px 12px;
  border-radius: 99px;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.3px;
}

.reading-time {
  font-size: 13px;
  color: #9ca3af;
}

.article-title {
  font-size: 32px;
  font-weight: 800;
  color: #111827;
  line-height: 1.25;
  letter-spacing: -0.5px;
  margin: 0 0 24px;
}

.author-credit {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 14px 0;
  border-top: 1px solid #e5e7eb;
}

.author-avatar {
  width: 42px;
  height: 42px;
  border-radius: 50%;
  background: #d1fae5;
  color: #065f46;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 13px;
  font-weight: 800;
  flex-shrink: 0;
}

.author-name { font-size: 14px; font-weight: 700; color: #111827; margin: 0 0 2px; }
.author-sub  { font-size: 12px; color: #9ca3af; margin: 0; }

/* ======================== */
/* COVER                    */
/* ======================== */
.cover-container {
  padding: 28px 52px 0;
}

.cover-image {
  width: 100%;
  height: 380px;
  object-fit: cover;
  border-radius: 16px;
  display: block;
}

.cover-caption {
  font-size: 12px;
  color: #9ca3af;
  text-align: center;
  margin: 10px 0 0;
  font-style: italic;
}

/* ======================== */
/* BODY                     */
/* ======================== */
.article-body {
  padding: 36px 52px 56px;
  display: flex;
  flex-direction: column;
  gap: 0;
}

.lead-paragraph {
  font-size: 17px;
  line-height: 1.7;
  color: #374151;
  border-left: 4px solid #10b981;
  padding-left: 20px;
  margin-bottom: 24px;
}

.article-body > p {
  font-size: 15px;
  line-height: 1.75;
  color: #4b5563;
  margin-bottom: 20px;
}

/* ======================== */
/* SECTION ANCHOR & TITLE   */
/* ======================== */
.section-anchor { scroll-margin-top: 80px; }

.section-title {
  font-size: 22px;
  font-weight: 800;
  color: #111827;
  margin: 48px 0 18px;
  padding-bottom: 12px;
  border-bottom: 2px solid #e5e7eb;
  display: flex;
  align-items: center;
  gap: 12px;
}

.section-num {
  font-size: 11px;
  font-weight: 800;
  letter-spacing: 2px;
  color: #10b981;
  background: #d1fae5;
  padding: 3px 8px;
  border-radius: 6px;
}

/* ======================== */
/* KATEGORI GRID            */
/* ======================== */
.kategori-grid {
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin: 24px 0;
}

.kategori-card {
  border-radius: 16px;
  border: 1px solid #e5e7eb;
  padding: 22px;
  background: #fafafa;
}

.kategori-header {
  display: flex;
  align-items: flex-start;
  gap: 14px;
  margin-bottom: 12px;
}

.kategori-icon {
  width: 44px;
  height: 44px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  font-weight: 900;
  flex-shrink: 0;
}

.aman-icon     { background: #d1fae5; color: #065f46; }
.perlu-icon    { background: #fef3c7; color: #92400e; }
.tercemar-icon { background: #fee2e2; color: #b91c1c; }

.kategori-label { font-size: 11px; font-weight: 700; letter-spacing: 1px; color: #9ca3af; text-transform: uppercase; margin: 0 0 2px; }
.kategori-title { font-size: 20px; font-weight: 800; margin: 0; }

.aman .kategori-title     { color: #065f46; }
.perlu .kategori-title    { color: #92400e; }
.tercemar .kategori-title { color: #b91c1c; }

.kategori-desc {
  font-size: 14px;
  color: #4b5563;
  line-height: 1.65;
  margin: 0 0 16px;
}

.kategori-ciri {
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 10px;
  padding: 14px;
  margin-bottom: 14px;
}

.ciri-label {
  font-size: 12px;
  font-weight: 700;
  color: #6b7280;
  margin: 0 0 8px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.kategori-ciri ul {
  margin: 0;
  padding-left: 18px;
}

.kategori-ciri li {
  font-size: 13px;
  color: #374151;
  line-height: 1.7;
  padding: 1px 0;
}

.kategori-action {
  border-radius: 10px;
  padding: 12px 14px;
  font-size: 13px;
  line-height: 1.6;
}

.aman-action     { background: #d1fae5; color: #064e3b; }
.perlu-action    { background: #fef3c7; color: #78350f; }
.tercemar-action { background: #fee2e2; color: #7f1d1d; }

/* ======================== */
/* CONFIDENCE               */
/* ======================== */
.confidence-visual {
  display: flex;
  gap: 20px;
  align-items: stretch;
  margin: 24px 0;
  background: #f9fafb;
  border: 1px solid #e5e7eb;
  border-radius: 16px;
  overflow: hidden;
}

.conf-scale {
  display: flex;
  flex-direction: column;
  width: 100px;
  flex-shrink: 0;
}

.conf-band {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 12px 8px;
  text-align: center;
}

.conf-band.high   { background: #10b981; }
.conf-band.medium { background: #f59e0b; }
.conf-band.low    { background: #ef4444; }

.conf-range {
  font-size: 12px;
  font-weight: 800;
  color: white;
}

.conf-label {
  font-size: 10px;
  color: rgba(255,255,255,0.8);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.conf-descriptions {
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.conf-desc-item {
  display: flex;
  gap: 12px;
  align-items: flex-start;
}

.conf-dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  margin-top: 4px;
  flex-shrink: 0;
}
.high-dot   { background: #10b981; }
.medium-dot { background: #f59e0b; }
.low-dot    { background: #ef4444; }

.conf-desc-title { font-size: 13px; font-weight: 700; color: #111827; margin: 0 0 4px; }
.conf-desc-text  { font-size: 13px; color: #6b7280; line-height: 1.6; margin: 0; }

/* ======================== */
/* TIPS BOX                 */
/* ======================== */
.tips-box {
  display: flex;
  gap: 16px;
  background: #ecfdf5;
  border: 1px solid #a7f3d0;
  border-left: 4px solid #10b981;
  border-radius: 14px;
  padding: 20px;
  margin: 24px 0;
}

.tips-icon-wrap { font-size: 24px; flex-shrink: 0; }
.tips-title { font-size: 14px; font-weight: 700; color: #065f46; margin: 0 0 10px; }

.tips-list {
  margin: 0;
  padding-left: 18px;
  display: flex;
  flex-direction: column;
  gap: 6px;
}
.tips-list li { font-size: 13px; color: #374151; line-height: 1.6; }

/* ======================== */
/* EXAMPLES GRID            */
/* ======================== */
.examples-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  margin: 24px 0;
}

.example-card {
  border: 1px solid #e5e7eb;
  border-radius: 14px;
  overflow: hidden;
  background: white;
}

.example-num {
  background: #f3f4f6;
  padding: 8px 14px;
  font-size: 11px;
  font-weight: 700;
  color: #9ca3af;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.example-title {
  padding: 12px 14px 8px;
  font-size: 14px;
  font-weight: 700;
  color: #111827;
  line-height: 1.4;
}

.example-input {
  padding: 0 14px 12px;
}

.input-label {
  font-size: 11px;
  font-weight: 700;
  color: #9ca3af;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin: 0 0 4px;
}

.example-input p:last-child {
  font-size: 12px;
  color: #6b7280;
  line-height: 1.55;
  margin: 0;
}

.example-result {
  border-top: 1px solid #f3f4f6;
  padding: 12px 14px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.result-row {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 8px;
  font-size: 12px;
  color: #6b7280;
}

.result-row span:first-child {
  flex-shrink: 0;
  font-weight: 600;
  color: #9ca3af;
}

.badge-aman     { background: #d1fae5; color: #065f46; padding: 2px 8px; border-radius: 6px; font-size: 11px; font-weight: 700; white-space: nowrap; }
.badge-perlu    { background: #fef3c7; color: #92400e; padding: 2px 8px; border-radius: 6px; font-size: 11px; font-weight: 700; white-space: nowrap; }
.badge-tercemar { background: #fee2e2; color: #b91c1c; padding: 2px 8px; border-radius: 6px; font-size: 11px; font-weight: 700; white-space: nowrap; }
.badge-nd       { background: #f3f4f6; color: #6b7280; padding: 2px 8px; border-radius: 6px; font-size: 11px; font-weight: 700; white-space: nowrap; }

.score { font-size: 13px; font-weight: 800; }
.high-score   { color: #10b981; }
.medium-score { color: #f59e0b; }
.low-score    { color: #ef4444; }

.example-note {
  padding: 10px 14px;
  font-size: 12px;
  color: #6b7280;
  font-style: italic;
  border-top: 1px dashed #e5e7eb;
  margin: 0;
}

/* ======================== */
/* LIMITATION GRID          */
/* ======================== */
.limitation-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 14px;
  margin: 24px 0;
}

.limit-item {
  background: #f9fafb;
  border: 1px solid #e5e7eb;
  border-radius: 14px;
  padding: 18px;
}

.limit-icon   { font-size: 24px; margin-bottom: 10px; display: block; }
.limit-title  { font-size: 14px; font-weight: 700; color: #111827; margin: 0 0 8px; }
.limit-desc   { font-size: 13px; color: #6b7280; line-height: 1.6; margin: 0; }

.mandatory-box {
  display: flex;
  gap: 16px;
  background: #fff7ed;
  border: 1px solid #fed7aa;
  border-left: 4px solid #f97316;
  border-radius: 14px;
  padding: 20px;
  margin: 20px 0 0;
}

.mandatory-icon {
  width: 28px;
  height: 28px;
  background: #f97316;
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 900;
  font-size: 16px;
  flex-shrink: 0;
}

.mandatory-title { font-size: 14px; font-weight: 700; color: #9a3412; margin: 0 0 10px; }

.mandatory-list {
  margin: 0;
  padding-left: 18px;
  display: flex;
  flex-direction: column;
  gap: 6px;
}
.mandatory-list li { font-size: 13px; color: #374151; line-height: 1.6; }

/* ======================== */
/* FAQ                      */
/* ======================== */
.faq-list {
  display: flex;
  flex-direction: column;
  gap: 0;
  margin: 24px 0;
  border: 1px solid #e5e7eb;
  border-radius: 14px;
  overflow: hidden;
}

.faq-item {
  border-bottom: 1px solid #e5e7eb;
}
.faq-item:last-child { border-bottom: none; }
.faq-item.open { background: #f9fafb; }

.faq-question {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  padding: 16px 20px;
  font-size: 14px;
  font-weight: 600;
  color: #111827;
  text-align: left;
  background: none;
  border: none;
  cursor: pointer;
  transition: background 0.15s;
}
.faq-question:hover { background: #f3f4f6; }

.faq-chevron { font-size: 11px; color: #9ca3af; flex-shrink: 0; }

.faq-answer {
  padding: 0 20px 18px;
  font-size: 14px;
  color: #4b5563;
  line-height: 1.7;
}

/* ======================== */
/* REFERENCE                */
/* ======================== */
.reference-section {
  background: #f9fafb;
  border: 1px solid #e5e7eb;
  border-radius: 14px;
  padding: 20px;
  margin: 40px 0 0;
}

.ref-title {
  font-size: 13px;
  font-weight: 700;
  color: #374151;
  margin: 0 0 12px;
}

.ref-list {
  margin: 0;
  padding-left: 18px;
  display: flex;
  flex-direction: column;
  gap: 6px;
}
.ref-list li { font-size: 12px; color: #6b7280; line-height: 1.55; }

/* ======================== */
/* CLOSING                  */
/* ======================== */
.closing-box {
  background: linear-gradient(135deg, #ecfdf5 0%, #f0fdf4 100%);
  border: 1px solid #a7f3d0;
  border-radius: 16px;
  padding: 28px;
  margin: 28px 0 0;
}

.closing-title { font-size: 16px; font-weight: 700; color: #065f46; margin: 0 0 12px; }
.closing-text  { font-size: 15px; color: #374151; line-height: 1.75; margin: 0 0 16px; }
.closing-hash  { font-size: 12px; color: #6b7280; margin: 0; text-align: center; }

/* ======================== */
/* FOOTER                   */
/* ======================== */
.article-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 52px 44px;
  border-top: 1px solid #e5e7eb;
  gap: 12px;
  flex-wrap: wrap;
  background: #fafafa;
}

.footer-right { display: flex; gap: 10px; }

.btn-back {
  background: none;
  border: 1px solid #e5e7eb;
  color: #374151;
  padding: 10px 20px;
  border-radius: 10px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.2s;
}
.btn-back:hover { background: #f3f4f6; }

.btn-share {
  background: none;
  border: 1px solid #e5e7eb;
  color: #374151;
  padding: 10px 18px;
  border-radius: 10px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.2s;
}
.btn-share:hover { background: #f3f4f6; }

.btn-primary {
  background: #10b981;
  color: white;
  border: none;
  padding: 10px 22px;
  border-radius: 10px;
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;
  transition: background 0.2s;
}
.btn-primary:hover { background: #059669; }

/* ======================== */
/* RESPONSIVE               */
/* ======================== */
@media (max-width: 900px) {
  .article-header,
  .cover-container,
  .article-body,
  .article-footer {
    padding-left: 24px;
    padding-right: 24px;
  }

  .article-title { font-size: 24px; }

  .examples-grid,
  .limitation-grid {
    grid-template-columns: 1fr;
  }

  .confidence-visual {
    flex-direction: column;
  }

  .conf-scale {
    flex-direction: row;
    width: 100%;
    height: 48px;
  }

  .conf-band { flex-direction: row; gap: 8px; }

  .cover-image { height: 220px; }

  .article-footer {
    flex-direction: column;
    align-items: stretch;
  }
  .footer-right { flex-direction: column; }
}

@media (max-width: 600px) {
  .article-page { padding: 20px 12px 60px; }
  .article-title { font-size: 20px; }
  .header-meta { flex-direction: column; align-items: flex-start; gap: 6px; }
}
</style>