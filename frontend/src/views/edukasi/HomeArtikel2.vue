<template>
  <DashboardLayout>
    <div class="article-page">

      <!-- PROGRESS -->
      <div class="progress-bar" :style="{ width: readProgress + '%' }"></div>

      <div class="article-layout">

        <!-- MAIN -->
        <div class="article-main">

          <!-- BACK -->
          <button class="back-btn" @click="goBack">
            ← Kembali ke Edukasi
          </button>

          <!-- META -->
          <div class="meta">
            <span class="tag">{{ article.category }}</span>
            <span>·</span>
            <span>{{ article.readTime }}</span>
            <span>·</span>
            <span>{{ article.updated }}</span>
          </div>

          <!-- TITLE -->
          <h1 class="title">{{ article.title }}</h1>

          <p class="subtitle">{{ article.subtitle }}</p>

          <!-- AUTHOR -->
          <div class="author-card">
            <div class="avatar">PA</div>
            <div>
              <p class="name">Tim Pakar PAKAR-AIR</p>
              <p class="desc">Berdasarkan WHO, Kemenkes RI & UNICEF 2023</p>
            </div>
          </div>

          <!-- CONTENT -->
          <div class="content">
            <template v-for="(block, i) in article.content" :key="i">

              <!-- SECTION -->
              <section v-if="block.type === 'section'" :id="block.id">
                <h2>{{ block.title }}</h2>
              </section>

              <!-- PARAGRAPH -->
              <p v-if="block.type === 'text'">{{ block.text }}</p>

              <!-- LIST -->
              <ul v-if="block.type === 'list'">
                <li v-for="(item, j) in block.items" :key="j">{{ item }}</li>
              </ul>

              <!-- INFO -->
              <div v-if="block.type === 'info'" class="info">
                {{ block.text }}
              </div>

              <!-- WARNING -->
              <div v-if="block.type === 'warning'" class="warning">
                {{ block.text }}
              </div>

              <!-- IMAGE -->
              <img v-if="block.type === 'image'" :src="block.src" :alt="block.alt || ''" />

            </template>
          </div>

          <!-- FOOTER -->
          <div class="footer">
            <button class="btn-secondary" @click="goBack">Kembali</button>
            <button class="btn-primary" @click="goToAnalysis">Mulai Analisis →</button>
          </div>

        </div>

        <!-- SIDEBAR -->
        <aside class="article-sidebar">
          <div class="toc-card">
            <p class="toc-title">Daftar Isi</p>
            <a
              v-for="sec in sections"
              :key="sec.id"
              :href="'#' + sec.id"
              :class="{ active: activeSection === sec.id }"
              @click.prevent="scrollTo(sec.id)"
            >
              {{ sec.title }}
            </a>
            <div class="progress-mini">
              <div :style="{ width: readProgress + '%' }"></div>
            </div>
            <p class="progress-text">{{ Math.round(readProgress) }}% dibaca</p>
          </div>
        </aside>

      </div>
    </div>
  </DashboardLayout>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import DashboardLayout from '@/layouts/DashboardLayout.vue'
import { useRouter } from 'vue-router'

const router = useRouter()

/* ================= DATA ================= */
const article = ref({
  title: 'Ancaman Tersembunyi di Setiap Tegukan',
  category: 'Kesehatan & Lingkungan',
  readTime: '10 menit baca',
  updated: '10 Maret 2026',
  subtitle:
    'Air tercemar menyebabkan lebih dari 2 juta kematian setiap tahun, namun ancamannya sering tidak kasat mata. Pelajari jenis-jenis kontaminan, dampaknya terhadap kesehatan, dan cara melindungi diri Anda.',

  content: [

    // ──────────────── SECTION 1 ────────────────
    { type: 'section', id: 'realita', title: 'Realita Air di Sekitar Kita' },
    {
      type: 'text',
      text: 'Menurut laporan UNICEF dan WHO tahun 2023, sekitar 2,2 miliar orang di seluruh dunia masih tidak memiliki akses terhadap air minum yang aman. Di Indonesia sendiri, survei Kementerian Kesehatan menunjukkan bahwa lebih dari 70% sumber air sumur di kawasan perkotaan padat mengandung bakteri coliform melebihi ambang batas yang ditetapkan Permenkes No. 2 Tahun 2023.'
    },
    {
      type: 'info',
      text: '🌍 Fakta WHO 2023: Penyakit diare akibat air tercemar merenggut nyawa lebih dari 485.000 jiwa setiap tahun — setara dengan satu kematian setiap 65 detik. Sebagian besar korban adalah anak di bawah usia 5 tahun.'
    },
    {
      type: 'text',
      text: 'Yang membuat situasi ini semakin mengkhawatirkan adalah sifat kontaminan itu sendiri: sebagian besar tidak berwarna, tidak berbau, dan tidak berasa. Air yang tampak jernih sempurna bisa saja mengandung arsenik, timbal, atau bakteri E. coli dalam konsentrasi yang membahayakan jiwa.'
    },

    // ──────────────── SECTION 2 ────────────────
    { type: 'section', id: 'jenis', title: 'Jenis-Jenis Pencemar Air' },
    {
      type: 'text',
      text: 'Para ilmuwan lingkungan mengelompokkan pencemar air menjadi tiga kategori utama berdasarkan sifat dan mekanisme dampaknya. Memahami ketiga kategori ini adalah langkah pertama untuk mengenali risiko di sekitar Anda.'
    },
    {
      type: 'list',
      items: [
        '🦠 Biologis — Bakteri patogen (E. coli, Salmonella, Vibrio cholerae), virus (Hepatitis A, Norovirus), dan protozoa (Giardia, Cryptosporidium). Ini adalah penyebab paling umum penyakit bawaan air di negara berkembang.',
        '⚗️ Kimia — Logam berat (timbal/Pb, arsenik/As, merkuri/Hg, kadmium/Cd), nitrat dari pupuk pertanian, pestisida organoklorin, dan senyawa PFAS ("forever chemicals"). Bersifat akumulatif dalam tubuh dan tidak terurai secara alami.',
        '🪨 Fisik — Partikel tersuspensi (lumpur, tanah liat, koloid), kekeruhan (turbidity), warna, bau, rasa, suhu berlebih, dan radioaktivitas dari aktivitas pertambangan atau industri nuklir.'
      ]
    },
    {
      type: 'warning',
      text: '⚠️ Pencemar kimia bersifat kumulatif: paparan kecil yang terus-menerus selama bertahun-tahun bisa menyebabkan kerusakan organ permanen. Timbal bahkan dalam dosis serendah 5 µg/dL dapat menurunkan IQ anak secara permanen — dan tidak ada ambang batas aman yang dikenal untuk arsenik.'
    },

    // ──────────────── SECTION 3 ────────────────
    { type: 'section', id: 'sumber', title: 'Dari Mana Kontaminan Berasal?' },
    {
      type: 'text',
      text: 'Kontaminasi air jarang terjadi dari satu sumber tunggal. Dalam kebanyakan kasus, ia merupakan hasil akumulasi dari berbagai titik pencemaran yang saling berinteraksi. Memahami jalur masuk kontaminan membantu kita menentukan langkah mitigasi yang tepat.'
    },
    {
      type: 'list',
      items: [
        '🏭 Limbah Industri — Pabrik tekstil, elektroplating, dan pertambangan membuang logam berat langsung ke badan air. Di beberapa kawasan industri Jawa Barat, kadar kromium hexavalen di sungai terdekat mencapai 40× batas aman.',
        '🌾 Limpasan Pertanian — Pupuk nitrogen dan fosfor yang tidak terserap tanaman hanyut ke sungai dan akuifer, memicu ledakan alga (algal bloom) dan kontaminasi nitrat pada air tanah dangkal.',
        '🚽 Sanitasi Buruk — Jarak antara septic tank dan sumur yang kurang dari 10 meter (standar SNI) menyebabkan infiltrasi bakteri feses ke dalam air tanah — kondisi yang sangat umum di kawasan padat penduduk.',
        '🔧 Infrastruktur Pipa Tua — Pipa PDAM berusia >30 tahun dapat melepaskan partikel timbal dan besi ke dalam air bersih yang sudah diolah. Air "bersih" di IPAM bisa terkontaminasi kembali sebelum mencapai keran Anda.',
        '🌧️ Perubahan Iklim — Curah hujan ekstrem mempercepat limpasan permukaan, membawa sedimen, pupuk, dan patogen langsung ke sumber air tanpa sempat disaring secara alami oleh lapisan tanah.'
      ]
    },

    // ──────────────── SECTION 4 ────────────────
    { type: 'section', id: 'penyakit', title: 'Dampak Kesehatan yang Perlu Diwaspadai' },
    {
      type: 'text',
      text: 'Dampak kesehatan dari air tercemar terbagi menjadi dua kelompok: akut (muncul dalam jam atau hari) dan kronis (berkembang selama bulan hingga dekade). Kedua jenis ini sama-sama berbahaya, namun dampak kronis sering luput dari perhatian karena tidak terasa langsung.'
    },
    {
      type: 'info',
      text: '📋 Penyakit Akut dari Kontaminan Biologis: Kolera (Vibrio cholerae) — dehidrasi parah dalam hitungan jam; Tifoid (Salmonella typhi) — demam tinggi, perforasi usus; Hepatitis A — kerusakan hati akut; Disentri Amuba — luka berdarah pada usus besar; Gastroenteritis Norovirus — muntah massal, sangat menular.'
    },
    {
      type: 'list',
      items: [
        '🔴 Arsenik (As) kronis — keratosis kulit, kanker kandung kemih, paru, dan ginjal. Paparan >10 µg/L selama >5 tahun meningkatkan risiko kanker hingga 3×.',
        '🔴 Timbal (Pb) — kerusakan neurokognitif ireversibel pada anak, hipertensi, dan penyakit ginjal kronis pada orang dewasa. Tidak ada dosis aman yang diketahui ilmu pengetahuan.',
        '🟡 Nitrat berlebih — methemoglobinemia ("blue baby syndrome") pada bayi <6 bulan; potensi karsinogenik pada paparan panjang orang dewasa.',
        '🟡 Fluoride berlebih (>1,5 mg/L) — fluorosis gigi dan tulang, kelainan sendi pada paparan jangka panjang.',
        '🟠 PFAS ("forever chemicals") — gangguan sistem imun, tiroid, dan kesuburan. Tidak terurai di lingkungan maupun dalam tubuh manusia.'
      ]
    },
    {
      type: 'warning',
      text: '⚠️ Kelompok Paling Rentan: Ibu hamil, janin, bayi di bawah 1 tahun, lansia >65 tahun, dan individu dengan kondisi imunokompromais (penderita HIV, pasien kemoterapi) menghadapi risiko komplikasi hingga 10× lebih tinggi dari rata-rata populasi.'
    },

    // ──────────────── SECTION 5 ────────────────
    { type: 'section', id: 'deteksi', title: 'Cara Mendeteksi Air Tercemar' },
    {
      type: 'text',
      text: 'Deteksi kontaminan memerlukan pendekatan berlapis — mulai dari inspeksi visual sederhana yang bisa dilakukan siapa saja, hingga uji laboratorium terakreditasi. Tidak ada metode tunggal yang mampu mendeteksi semua jenis pencemar sekaligus.'
    },
    {
      type: 'list',
      items: [
        '👁️ Inspeksi Visual — Periksa warna (harus jernih), kekeruhan, endapan, dan lapisan berminyak di permukaan. Lakukan di bawah cahaya alami menggunakan gelas bening. Dokumentasikan dengan foto untuk memantau perubahan dari waktu ke waktu.',
        '👃 Uji Organoleptik — Deteksi bau: telur busuk (H₂S), amis (organik/alga), kimia/bensin (hidrokarbon), atau klorin berlebih. Tutup gelas selama 30 detik lalu buka dan cium langsung.',
        '🧪 Test Kit Rumahan — Tersedia di toko online; mampu mendeteksi pH, klorin, nitrat, besi, dan kekeruhan. Akurasi ±85%, cocok untuk pemantauan rutin. Harga berkisar Rp 50.000–200.000 per kit.',
        '🔬 Uji Laboratorium Terakreditasi — Standar emas untuk konfirmasi. Wajib untuk mendeteksi logam berat, bakteri patogen, dan senyawa organik berbahaya. Biaya Rp 300.000–1.500.000 tergantung parameter yang diuji.',
        '📱 Aplikasi & Sensor IoT — Teknologi terbaru memungkinkan pemantauan real-time parameter fisik-kimia (pH, TDS, turbidity, suhu) menggunakan probe yang terhubung ke smartphone.'
      ]
    },
    {
      type: 'info',
      text: '💡 Tips Pengambilan Sampel: Gunakan botol kaca atau plastik PE steril 500 ml. Biarkan air mengalir 2–3 menit sebelum mengambil sampel (untuk membilas pipa). Kirim ke laboratorium dalam ≤6 jam untuk parameter biologis. Minta sertifikat akreditasi KAN dari laboratorium pilihan Anda.'
    },

    // ──────────────── SECTION 6 ────────────────
    { type: 'section', id: 'pencegahan', title: 'Strategi Pencegahan & Perlindungan' },
    {
      type: 'text',
      text: 'Pencegahan kontaminasi air adalah tanggung jawab bersama antara individu, komunitas, dan pemerintah. Pada level rumah tangga, ada serangkaian tindakan konkret yang dapat Anda ambil hari ini untuk mengurangi paparan secara signifikan.'
    },
    {
      type: 'list',
      items: [
        '🔥 Rebus Air dengan Benar — Didihkan penuh (100°C) selama minimal 1 menit; di ketinggian >2.000 m dpl, tambah menjadi 3 menit. Membunuh 99,99% bakteri dan virus patogen. Catatan: tidak efektif untuk logam berat dan senyawa kimia.',
        '🚰 Pasang Filter Berlapis — Sistem terbaik menggabungkan: (1) pre-filter sedimen 5 mikron, (2) karbon aktif granular untuk kimia organik & klorin, (3) membran RO atau UF untuk logam berat & bakteri, (4) UV untuk sterilisasi akhir. Pastikan tersertifikasi NSF/ANSI 42, 53, atau 58.',
        '📏 Jarak Aman Sumur — Pertahankan jarak minimal 10 m antara sumur dan septic tank, 15 m dari kandang hewan, dan 50 m dari sumber pencemar industri. Lindungi dinding sumur dengan cincin beton sedalam ≥3 m.',
        '🧴 Disinfeksi Darurat — Jika filter tidak tersedia: tambahkan 2 tetes larutan klorin 5% per liter air, aduk, diamkan 30 menit. Atau gunakan tablet Aquatabs (NaDCC) sesuai dosis. Efektif terhadap patogen biologis.',
        '🏡 Jaga Lingkungan Sumber Air — Tidak membuang sampah, detergen, atau oli bekas di sekitar sumur. Tanam tanaman penyerap polutan (vetiver, bambu) sebagai barrier alami di sekitar sumber air.',
        '📋 Uji Rutin Berkala — Jadwalkan uji laboratorium setiap 6 bulan untuk parameter biologis dan tahunan untuk parameter kimia. Simpan rekam jejak hasil uji sebagai referensi tren kualitas air dari waktu ke waktu.'
      ]
    },
    {
      type: 'warning',
      text: '🚫 Mitos yang Harus Dihindari: (1) "Air dari gunung pasti bersih" — bisa mengandung fluoride alami berlebih atau tercemar aktivitas hulu. (2) "Air yang sudah lama mengendap jadi bersih" — bakteri justru berkembang biak. (3) "Direbus sudah cukup untuk semua kontaminan" — merebus tidak menghilangkan logam berat, arsenik, atau nitrat.'
    },

    // ──────────────── SECTION 7 ────────────────
    { type: 'section', id: 'tindakan', title: 'Protokol Darurat Jika Air Sudah Tercemar' },
    {
      type: 'text',
      text: 'Jika Anda menduga air sudah terkontaminasi — berdasarkan hasil uji, perubahan mendadak, atau laporan dari tetangga — berikut protokol yang harus diikuti secara berurutan tanpa penundaan:'
    },
    {
      type: 'list',
      items: [
        '1️⃣ Hentikan konsumsi segera — termasuk untuk memasak, membuat susu formula bayi, dan menyikat gigi. Beralih ke air kemasan tersertifikasi BPOM sementara waktu.',
        '2️⃣ Ambil sampel sebelum membersihkan — kumpulkan 2× 500 ml air dalam botol steril berbeda untuk uji biologis dan kimia. Label dengan tanggal, waktu, dan titik pengambilan.',
        '3️⃣ Laporkan ke otoritas terkait — hubungi PDAM (untuk air perpipaan), Dinas Kesehatan setempat, atau BPLHD untuk pencemaran yang melibatkan industri. Catat nama petugas dan nomor laporan.',
        '4️⃣ Identifikasi sumber masalah — periksa apakah ada pembangunan baru, kebocoran tangki, atau hujan lebat baru-baru ini yang bisa menjadi pemicu.',
        '5️⃣ Edukasi anggota rumah tangga — pastikan semua anggota keluarga, termasuk anak-anak dan asisten rumah tangga, mengetahui bahwa air tidak aman digunakan sementara waktu.'
      ]
    },
    {
      type: 'info',
      text: '📞 Kontak Penting: Hotline Kemenkes: 1500-567 | BPOM: 1500-533 | PDAM (variatif per daerah) | Pusat Pengendalian Penyakit (P2P) Dinkes setempat. Simpan nomor-nomor ini di ponsel Anda sekarang — saat keadaan darurat, Anda tidak punya waktu untuk mencari.'
    }
  ]
})

/* ================= COMPUTED ================= */
const sections = computed(() =>
  article.value.content.filter(b => b.type === 'section')
)

/* ================= STATE ================= */
const readProgress = ref(0)
const activeSection = ref('')

/* ================= METHODS ================= */
function goBack() {
  router.push('/edukasi')
}

function goToAnalysis() {
  router.push('/analysis')
}

function scrollTo(id) {
  const el = document.getElementById(id)
  if (el) {
    window.scrollTo({ top: el.offsetTop - 80, behavior: 'smooth' })
  }
}

function handleScroll() {
  const doc = document.documentElement
  readProgress.value = (doc.scrollTop / (doc.scrollHeight - doc.clientHeight)) * 100

  for (const sec of sections.value) {
    const el = document.getElementById(sec.id)
    if (el && el.getBoundingClientRect().top < 120) {
      activeSection.value = sec.id
    }
  }
}

/* ================= LIFECYCLE ================= */
onMounted(() => window.addEventListener('scroll', handleScroll))
onUnmounted(() => window.removeEventListener('scroll', handleScroll))
</script>

<style scoped>
/* ===== LAYOUT ===== */
.article-page {
  background: #f9fafb;
  padding: 32px;
}

.article-layout {
  display: grid;
  grid-template-columns: 1fr 260px;
  gap: 40px;
  max-width: 1100px;
  margin: auto;
}

/* ===== BACK ===== */
.back-btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 14px;
  color: #6b7280;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  margin-bottom: 24px;
  transition: color 0.2s;
}
.back-btn:hover { color: #111827; }

/* ===== META ===== */
.meta {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  color: #6b7280;
  margin-bottom: 16px;
  flex-wrap: wrap;
}
.tag {
  background: #dcfce7;
  color: #166534;
  padding: 3px 10px;
  border-radius: 99px;
  font-size: 12px;
  font-weight: 600;
}

/* ===== TITLE ===== */
.title {
  font-size: 32px;
  font-weight: 800;
  color: #111827;
  line-height: 1.25;
  letter-spacing: -0.5px;
  margin: 0 0 14px;
}

.subtitle {
  font-size: 16px;
  color: #4b5563;
  line-height: 1.7;
  margin-bottom: 20px;
}

/* ===== AUTHOR ===== */
.author-card {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 14px 16px;
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  margin-bottom: 32px;
}
.avatar {
  width: 42px;
  height: 42px;
  border-radius: 50%;
  background: #dcfce7;
  color: #166534;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 13px;
  font-weight: 700;
  flex-shrink: 0;
}
.name { font-size: 14px; font-weight: 600; color: #111827; margin: 0 0 2px; }
.desc { font-size: 12px; color: #6b7280; margin: 0; }

/* ===== CONTENT ===== */
.content {
  display: flex;
  flex-direction: column;
  gap: 18px;
}

section {
  scroll-margin-top: 80px;
}

section h2 {
  font-size: 22px;
  font-weight: 700;
  color: #111827;
  margin: 24px 0 0;
  padding-bottom: 8px;
  border-bottom: 2px solid #e5e7eb;
}

.content p {
  font-size: 15px;
  color: #374151;
  line-height: 1.75;
  margin: 0;
}

.content ul {
  padding-left: 20px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.content li {
  font-size: 14px;
  color: #374151;
  line-height: 1.7;
}

/* ===== BLOCKS ===== */
.info {
  background: #eff6ff;
  border: 1px solid #bfdbfe;
  border-left: 4px solid #3b82f6;
  padding: 14px 16px;
  border-radius: 10px;
  font-size: 14px;
  color: #1e40af;
  line-height: 1.65;
}

.warning {
  background: #fff7ed;
  border: 1px solid #fed7aa;
  border-left: 4px solid #f97316;
  padding: 14px 16px;
  border-radius: 10px;
  font-size: 14px;
  color: #9a3412;
  line-height: 1.65;
}

/* ===== SIDEBAR ===== */
.article-sidebar {
  position: sticky;
  top: 80px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.toc-card {
  background: white;
  border: 1px solid #e5e7eb;
  padding: 18px;
  border-radius: 14px;
}

.toc-title {
  font-size: 11px;
  font-weight: 800;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  color: #9ca3af;
  margin: 0 0 12px;
}

.toc-card a {
  display: block;
  padding: 6px 0;
  font-size: 13px;
  color: #6b7280;
  text-decoration: none;
  border-radius: 6px;
  transition: color 0.2s;
}

.toc-card a:hover { color: #111827; }
.toc-card a.active { color: #16a34a; font-weight: 600; }

/* ===== PROGRESS ===== */
.progress-bar {
  position: fixed;
  top: 0;
  left: 0;
  height: 3px;
  background: linear-gradient(90deg, #16a34a, #4ade80);
  z-index: 100;
  transition: width 0.1s linear;
}

.progress-mini {
  height: 4px;
  background: #e5e7eb;
  border-radius: 99px;
  margin-top: 12px;
  overflow: hidden;
}

.progress-mini div {
  height: 100%;
  background: #16a34a;
  border-radius: 99px;
  transition: width 0.2s;
}

.progress-text {
  font-size: 11px;
  color: #9ca3af;
  margin: 6px 0 0;
  text-align: right;
}

/* ===== FOOTER ===== */
.footer {
  display: flex;
  justify-content: space-between;
  margin-top: 48px;
  padding-top: 24px;
  border-top: 1px solid #e5e7eb;
  gap: 12px;
}

.btn-primary {
  background: #16a34a;
  color: white;
  border: none;
  padding: 10px 22px;
  border-radius: 10px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;
}
.btn-primary:hover { background: #15803d; }

.btn-secondary {
  border: 1px solid #e5e7eb;
  background: none;
  color: #374151;
  padding: 10px 20px;
  border-radius: 10px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.2s;
}
.btn-secondary:hover { background: #f3f4f6; }

/* ===== RESPONSIVE ===== */
@media (max-width: 900px) {
  .article-layout {
    grid-template-columns: 1fr;
  }
  .article-sidebar {
    display: none;
  }
  .article-page {
    padding: 20px 16px;
  }
  .title {
    font-size: 24px;
  }
}
</style>