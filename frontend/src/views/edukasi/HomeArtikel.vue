<template>
  <DashboardLayout>
    <div class="article-page">

      <!-- READING PROGRESS BAR -->
      <div class="progress-bar" :style="{ width: readProgress + '%' }"></div>

      <div class="article-layout">

        <!-- MAIN -->
        <div class="article-main">

          <!-- BACK -->
          <button class="back-btn" @click="goBack">
            <span class="back-icon">←</span>
            Kembali ke Edukasi
          </button>

          <!-- META -->
          <div class="meta">
            <span class="tag tag--dasar">{{ article.category }}</span>
            <span class="dot">·</span>
            <span class="time">{{ article.readTime }}</span>
            <span class="dot">·</span>
            <span class="date">Diperbarui 2 Mei 2025</span>
          </div>

          <!-- TITLE -->
          <h1 class="title">{{ article.title }}</h1>

          <p class="subtitle">
            Kualitas air yang buruk menjadi penyebab lebih dari <strong>485.000 kematian</strong> setiap tahun akibat diare 
            menurut WHO. Dengan mengenali tanda-tanda fisik sederhana, Anda bisa melindungi keluarga 
            dari risiko kontaminasi sebelum air dikonsumsi.
          </p>

          <!-- AUTHOR CARD -->
          <div class="author-card">
            <div class="author-avatar">AT</div>
            <div class="author-info">
              <p class="author-name">Tim Ahli Kualitas Air</p>
              <p class="author-desc">Disusun bersama Balai Besar Teknik Kesehatan Lingkungan dan Pengendalian Penyakit</p>
            </div>
          </div>

          <!-- TOC MOBILE -->
          <div class="toc-mobile">
            <button class="toc-toggle" @click="tocOpen = !tocOpen">
              <span>📋 Daftar Isi</span>
              <span>{{ tocOpen ? '▲' : '▼' }}</span>
            </button>
            <ul v-if="tocOpen" class="toc-list">
              <li v-for="item in tocItems" :key="item.id">
                <a :href="'#' + item.id" @click="tocOpen = false">{{ item.label }}</a>
              </li>
            </ul>
          </div>

          <!-- CONTENT -->
          <div class="content">

            <!-- INTRO HIGHLIGHT BOX -->
            <div class="intro-box">
              <div class="intro-icon">🔬</div>
              <div>
                <p class="intro-title">Apa yang Akan Anda Pelajari</p>
                <p class="intro-text">
                  Panduan ini membahas 5 indikator fisik air yang bisa Anda periksa sendiri di rumah — 
                  tanpa peralatan laboratorium. Cocok untuk sumber air sumur, PDAM, maupun air kemasan.
                </p>
              </div>
            </div>

            <!-- SECTION 1 -->
            <section id="warna">
              <div class="section-number">01</div>
              <h2>Periksa Warna Air</h2>

              <p>
                Air bersih yang layak konsumsi harus jernih dan tidak berwarna. Perubahan warna sekecil 
                apapun bisa menjadi sinyal dini adanya kontaminan. Pemeriksaan visual paling akurat 
                dilakukan pada pagi hari menggunakan gelas bening di bawah cahaya alami.
              </p>

              <div class="color-grid">
                <div class="color-card color-card--yellow">
                  <span class="color-swatch" style="background: #d4a017;"></span>
                  <div>
                    <p class="color-label">Kuning / Kecoklatan</p>
                    <p class="color-desc">Kandungan zat besi (Fe) atau mangan (Mn) melebihi ambang batas. Umumnya dari pipa berkarat atau sumur dangkal.</p>
                  </div>
                </div>
                <div class="color-card color-card--green">
                  <span class="color-swatch" style="background: #4caf50;"></span>
                  <div>
                    <p class="color-label">Kehijauan / Biru-hijau</p>
                    <p class="color-desc">Indikasi pertumbuhan alga (algae bloom). Sering ditemukan pada penampungan air terbuka yang terkena sinar matahari langsung.</p>
                  </div>
                </div>
                <div class="color-card color-card--gray">
                  <span class="color-swatch" style="background: #90a4ae;"></span>
                  <div>
                    <p class="color-label">Keruh / Abu-abu</p>
                    <p class="color-desc">Partikel lumpur, tanah liat, atau koloid tersuspensi. Bisa terjadi setelah hujan deras atau guncangan fisik pada sumber air.</p>
                  </div>
                </div>
                <div class="color-card color-card--red">
                  <span class="color-swatch" style="background: #e53935;"></span>
                  <div>
                    <p class="color-label">Kemerahan / Oranye</p>
                    <p class="color-desc">Kontaminasi logam berat atau limbah industri. Segera hentikan penggunaan dan laporkan ke dinas setempat.</p>
                  </div>
                </div>
              </div>

              <div class="tip-box">
                <span class="tip-icon">💡</span>
                <div>
                  <p class="tip-title">Tips Pemeriksaan</p>
                  <p>Isi gelas bening setinggi 15 cm lalu angkat setinggi mata di depan jendela. Amati dari samping dan atas. Foto dengan ponsel bisa membantu dokumentasi perubahan warna dari waktu ke waktu.</p>
                </div>
              </div>

              <div class="image-container">
                <img src="https://images.unsplash.com/photo-1604908176997-431c9b42d8f2?w=800&auto=format&fit=crop" alt="Pemeriksaan warna air" />
                <p class="image-caption">Gunakan gelas transparan untuk memeriksa kejernihan air di bawah cahaya alami</p>
              </div>
            </section>

            <!-- SECTION 2 -->
            <section id="bau">
              <div class="section-number">02</div>
              <h2>Cek Bau Air</h2>

              <p>
                Indra penciuman adalah detektor kontaminasi yang sangat sensitif. Air yang sehat sama sekali 
                tidak berbau. Cara paling efektif adalah mengisi wadah kecil, tutup sebentar, 
                lalu buka dan cium langsung — mirip cara pakar wine mencium aroma.
              </p>

              <div class="smell-list">
                <div class="smell-item">
                  <div class="smell-badge smell-badge--danger">🥚 Telur Busuk</div>
                  <div class="smell-detail">
                    <p class="smell-cause">Penyebab: <strong>Hidrogen Sulfida (H₂S)</strong></p>
                    <p>Terbentuk dari aktivitas bakteri anaerob di dalam sumur atau pipa. Konsentrasi tinggi berbahaya bagi sistem pernapasan. Bau tercium bahkan pada konsentrasi sangat rendah (0,5 ppb).</p>
                  </div>
                </div>
                <div class="smell-item">
                  <div class="smell-badge smell-badge--warn">🐟 Amis / Tanah</div>
                  <div class="smell-detail">
                    <p class="smell-cause">Penyebab: <strong>Bahan Organik & Geosmin</strong></p>
                    <p>Geosmin adalah senyawa yang diproduksi alga biru-hijau (cyanobacteria). Meski tidak selalu berbahaya, kadar tinggi menandakan eutrofikasi sumber air.</p>
                  </div>
                </div>
                <div class="smell-item">
                  <div class="smell-badge smell-badge--ok">🧪 Klorin / Pemutih</div>
                  <div class="smell-detail">
                    <p class="smell-cause">Penyebab: <strong>Disinfeksi Klorin (PDAM)</strong></p>
                    <p>Bau klorin ringan adalah tanda air PDAM telah didesinfeksi — umumnya aman. Namun bau sangat menyengat bisa menandakan kadar berlebih yang perlu diperiksa.</p>
                  </div>
                </div>
                <div class="smell-item">
                  <div class="smell-badge smell-badge--danger">⛽ Minyak / Bensin</div>
                  <div class="smell-detail">
                    <p class="smell-cause">Penyebab: <strong>Kontaminasi Petroleum / BTEX</strong></p>
                    <p>Indikasi serius pencemaran industri atau kebocoran tangki BBM bawah tanah. Senyawa benzena bersifat karsinogenik. Jangan gunakan air ini dalam kondisi apapun.</p>
                  </div>
                </div>
              </div>

              <div class="warning-box">
                <span>⚠️</span>
                <p><strong>Peringatan:</strong> Hindari menghirup langsung dalam jumlah besar jika curiga terdapat bau H₂S atau minyak. Gunakan kipas angin untuk ventilasi ruangan terlebih dahulu.</p>
              </div>
            </section>

            <!-- SECTION 3 -->
            <section id="rasa">
              <div class="section-number">03</div>
              <h2>Rasa Air</h2>

              <p>
                Rasa merupakan indikator terakhir yang boleh diuji — dan <em>hanya</em> jika air secara visual 
                jernih, tidak berbau, dan Anda relatif yakin sumbernya bersih. Jangan pernah mencicipi 
                air yang menunjukkan tanda mencurigakan dari dua indikator sebelumnya.
              </p>

              <div class="taste-table">
                <div class="taste-header">
                  <span>Rasa</span>
                  <span>Kemungkinan Penyebab</span>
                  <span>Risiko</span>
                </div>
                <div class="taste-row">
                  <span class="taste-name">Asam / Sepat</span>
                  <span>pH rendah, limbah kimia asam, senyawa organik terlarut</span>
                  <span class="risk risk--high">Tinggi</span>
                </div>
                <div class="taste-row">
                  <span class="taste-name">Pahit / Logam</span>
                  <span>Logam berat (Pb, Cu, Zn), pipa tembaga lama, baterai</span>
                  <span class="risk risk--high">Tinggi</span>
                </div>
                <div class="taste-row">
                  <span class="taste-name">Asin / Payau</span>
                  <span>Intrusi air laut (wilayah pesisir), kandungan NaCl tinggi</span>
                  <span class="risk risk--med">Sedang</span>
                </div>
                <div class="taste-row">
                  <span class="taste-name">Manis Berlebih</span>
                  <span>Kontaminasi pestisida atau bahan kimia organik sintetis</span>
                  <span class="risk risk--high">Tinggi</span>
                </div>
                <div class="taste-row">
                  <span class="taste-name">Tawar Normal</span>
                  <span>—</span>
                  <span class="risk risk--low">Aman*</span>
                </div>
              </div>

              <p class="table-note">*Catatan: Rasa tawar tidak menjamin air bebas bakteri atau virus. Uji laboratorium tetap diperlukan untuk konfirmasi.</p>
            </section>

            <!-- SECTION 4 -->
            <section id="endapan">
              <div class="section-number">04</div>
              <h2>Endapan & Partikel</h2>

              <p>
                Diamkan segelas air selama 10–15 menit tanpa digoyang. Perhatikan apakah terbentuk 
                endapan di dasar gelas atau partikel melayang di tengah cairan.
              </p>

              <div class="sediment-grid">
                <div class="sediment-card">
                  <div class="sediment-icon">🟤</div>
                  <p class="sediment-title">Endapan Merah-Coklat</p>
                  <p class="sediment-desc">Oksida besi (karat). Umum pada sumur dalam atau rumah dengan pipa besi tua. Pengaruhi rasa dan dapat mewarnai pakaian saat dicuci.</p>
                </div>
                <div class="sediment-card">
                  <div class="sediment-icon">⬜</div>
                  <p class="sediment-title">Endapan Putih</p>
                  <p class="sediment-desc">Kalsium dan magnesium karbonat (air sadah/hard water). Tidak berbahaya secara langsung, namun merusak peralatan rumah tangga.</p>
                </div>
                <div class="sediment-card">
                  <div class="sediment-icon">🟡</div>
                  <p class="sediment-title">Partikel Melayang</p>
                  <p class="sediment-desc">Lumpur koloid atau bahan organik. Menandakan filtrasi yang tidak memadai. Air tidak boleh langsung dikonsumsi.</p>
                </div>
                <div class="sediment-card">
                  <div class="sediment-icon">🟢</div>
                  <p class="sediment-title">Lapisan Berminyak</p>
                  <p class="sediment-desc">Lapisan pelangi di permukaan menandakan kontaminasi hidrokarbon atau aktivitas bakteri besi. Segera uji lanjutan diperlukan.</p>
                </div>
              </div>

              <div class="highlight-box">
                <p>
                  <strong>Uji Sederhana di Rumah:</strong> Isi botol kaca bening, kocok kuat, lalu amati selama 5 menit. 
                  Air bersih akan kembali jernih dengan cepat. Jika keruh lebih dari 1 menit, 
                  ada partikel tersuspensi yang perlu ditangani.
                </p>
              </div>
            </section>

            <!-- SECTION 5 -->
            <section id="waspada">
              <div class="section-number">05</div>
              <h2>Kapan Harus Waspada?</h2>

              <p>
                Tindakan pencegahan harus segera diambil jika menemukan kombinasi dua atau lebih 
                indikator berikut. Semakin banyak tanda yang muncul, semakin tinggi risiko kontaminasi.
              </p>

              <div class="alert-checklist">
                <div class="alert-item" v-for="alert in alertItems" :key="alert.text">
                  <span class="alert-icon">{{ alert.icon }}</span>
                  <div>
                    <p class="alert-title">{{ alert.title }}</p>
                    <p class="alert-desc">{{ alert.desc }}</p>
                  </div>
                </div>
              </div>

              <div class="action-box">
                <p class="action-title">🚫 Tindakan yang Harus Dilakukan</p>
                <ol class="action-steps">
                  <li>Hentikan penggunaan air untuk minum dan memasak</li>
                  <li>Beralih ke air kemasan tersertifikasi BPOM sementara waktu</li>
                  <li>Ambil sampel air (± 500 ml dalam botol steril) untuk uji laboratorium</li>
                  <li>Laporkan ke PDAM atau Dinas Kesehatan setempat jika sumber adalah air publik</li>
                  <li>Pertimbangkan pemasangan filter dengan sertifikasi NSF/ANSI</li>
                </ol>
              </div>
            </section>

            <!-- SUMMARY SECTION -->
            <section id="ringkasan" class="summary-section">
              <h2>Ringkasan: Standar Air Layak Pakai</h2>

              <div class="summary-grid">
                <div class="summary-item summary-item--good">
                  <p class="summary-label">✅ Air Layak</p>
                  <ul>
                    <li>Jernih & tidak berwarna</li>
                    <li>Tidak berbau sama sekali</li>
                    <li>Rasa tawar/netral</li>
                    <li>Tidak ada endapan</li>
                  </ul>
                </div>
                <div class="summary-item summary-item--bad">
                  <p class="summary-label">🚫 Air Tidak Layak</p>
                  <ul>
                    <li>Berwarna (kuning, hijau, merah)</li>
                    <li>Berbau busuk, amis, atau kimia</li>
                    <li>Rasa asam, pahit, atau asin</li>
                    <li>Ada endapan atau partikel</li>
                  </ul>
                </div>
              </div>

              <div class="disclaimer">
                <p>
                  ⚕️ <strong>Penting:</strong> Pemeriksaan fisik ini bersifat indikatif, bukan pengganti uji laboratorium. 
                  Bakteri patogen seperti <em>E. coli</em> dan virus tidak dapat dideteksi secara visual. 
                  Lakukan uji laboratorium setidaknya sekali per tahun untuk sumber air mandiri.
                </p>
              </div>
            </section>

          </div>

          <!-- FOOTER -->
          <div class="article-footer">
            <div class="footer-left">
              <button class="btn-back" @click="goBack">← Kembali</button>
            </div>
            <div class="footer-right">
              <button class="btn-share">🔗 Bagikan</button>
              <button class="btn-primary">Mulai Analisis Air →</button>
            </div>
          </div>

        </div>

        <!-- SIDEBAR -->
        <aside class="article-sidebar">

          <!-- TOC -->
          <div class="toc-card">
            <p class="toc-title">Daftar Isi</p>
            <ul class="toc-links">
              <li v-for="item in tocItems" :key="item.id">
                <a :href="'#' + item.id" :class="{ active: activeSection === item.id }">
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

          <!-- INFO CARD -->
          <div class="info-card">
            <p class="info-card-title">⚗️ Uji Lebih Lanjut</p>
            <p class="info-card-text">Pemeriksaan fisik hanya langkah awal. Gunakan fitur Analisis Air kami untuk panduan uji kimia dan biologi.</p>
            <button class="btn-cta" @click="$router.push('/analysis')">Mulai Analisis →</button>
          </div>

          <!-- RELATED -->
          <div class="related-card">
            <p class="related-title">Artikel Terkait</p>
            <div class="related-list">
              <a href="#" class="related-item">
                <span>🧪</span>
                <span>Cara Menggunakan Test Kit pH Air di Rumah</span>
              </a>
              <a href="#" class="related-item">
                <span>🚿</span>
                <span>Memilih Filter Air yang Tepat untuk Kebutuhan Keluarga</span>
              </a>
              <a href="#" class="related-item">
                <span>📊</span>
                <span>Standar Baku Mutu Air Minum Menurut Permenkes 2023</span>
              </a>
            </div>
          </div>

        </aside>

      </div>

    </div>
  </DashboardLayout>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import DashboardLayout from '@/layouts/DashboardLayout.vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const readProgress = ref(0)
const activeSection = ref('')
const tocOpen = ref(false)

const article = {
  title: 'Cara Mengecek Kualitas Air Secara Sederhana',
  category: 'Dasar-Dasar',
  readTime: '8 menit baca'
}

const tocItems = [
  { id: 'warna',    num: '01', label: 'Periksa Warna Air' },
  { id: 'bau',      num: '02', label: 'Cek Bau Air' },
  { id: 'rasa',     num: '03', label: 'Rasa Air' },
  { id: 'endapan',  num: '04', label: 'Endapan & Partikel' },
  { id: 'waspada',  num: '05', label: 'Kapan Harus Waspada?' },
  { id: 'ringkasan',num: '—',  label: 'Ringkasan' },
]

const alertItems = [
  { icon: '🎨', title: 'Perubahan Warna Drastis',   desc: 'Warna berubah tiba-tiba meskipun sumber air sama. Terutama jika menjadi lebih gelap atau merah.' },
  { icon: '👃', title: 'Bau Menyengat',              desc: 'Terutama bau telur busuk, minyak, atau kimia yang tidak biasa.' },
  { icon: '👅', title: 'Rasa Tidak Normal',           desc: 'Terasa asam, pahit, atau ada sensasi menggigit di lidah.' },
  { icon: '🤲', title: 'Iritasi Kulit & Mata',       desc: 'Terasa gatal, perih, atau kemerahan setelah mandi menggunakan air tersebut.' },
  { icon: '🤢', title: 'Gejala Setelah Minum',       desc: 'Mual, diare, atau muntah yang korelasinya dengan konsumsi air.' },
]

function goBack() {
  router.push('/edukasi')
}

function handleScroll() {
  const doc = document.documentElement
  const scrolled = doc.scrollTop
  const total = doc.scrollHeight - doc.clientHeight
  readProgress.value = total > 0 ? (scrolled / total) * 100 : 0

  for (const item of tocItems) {
    const el = document.getElementById(item.id)
    if (el) {
      const rect = el.getBoundingClientRect()
      if (rect.top <= 120) activeSection.value = item.id
    }
  }
}

onMounted(() => window.addEventListener('scroll', handleScroll))
onUnmounted(() => window.removeEventListener('scroll', handleScroll))
</script>

<style scoped>
/* ===================== */
/* PROGRESS BAR          */
/* ===================== */
.progress-bar {
  position: fixed;
  top: 0;
  left: 0;
  height: 3px;
  background: linear-gradient(90deg, #0ea5e9, #38bdf8);
  z-index: 100;
  transition: width 0.1s linear;
}

/* ===================== */
/* PAGE WRAPPER          */
/* ===================== */
.article-page {
  padding: 32px 24px 80px;
  background: #f9fafb;
  min-height: 100vh;
}

/* ===================== */
/* LAYOUT                */
/* ===================== */
.article-layout {
  max-width: 1140px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 280px;
  gap: 48px;
  align-items: start;
}

.article-main {
  max-width: 740px;
}

/* ===================== */
/* BACK BUTTON           */
/* ===================== */
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
.back-icon { font-size: 16px; }

/* ===================== */
/* META                  */
/* ===================== */
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
  background: #e0f2fe;
  color: #0369a1;
  padding: 3px 10px;
  border-radius: 99px;
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.3px;
}
.dot { color: #d1d5db; }

/* ===================== */
/* TITLE                 */
/* ===================== */
.title {
  font-size: 32px;
  font-weight: 800;
  color: #111827;
  line-height: 1.25;
  letter-spacing: -0.5px;
  margin: 0 0 16px;
}
.subtitle {
  font-size: 16px;
  color: #4b5563;
  line-height: 1.7;
  margin: 0 0 24px;
}

/* ===================== */
/* AUTHOR CARD           */
/* ===================== */
.author-card {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 14px 16px;
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  margin-bottom: 28px;
}
.author-avatar {
  width: 42px;
  height: 42px;
  border-radius: 50%;
  background: #dbeafe;
  color: #1d4ed8;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 13px;
  font-weight: 700;
  flex-shrink: 0;
}
.author-name { font-size: 14px; font-weight: 600; color: #111827; margin: 0 0 2px; }
.author-desc { font-size: 12px; color: #6b7280; margin: 0; }

/* ===================== */
/* TOC MOBILE            */
/* ===================== */
.toc-mobile {
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  margin-bottom: 36px;
  overflow: hidden;
}
.toc-toggle {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 14px 16px;
  font-size: 14px;
  font-weight: 600;
  color: #374151;
  background: none;
  border: none;
  cursor: pointer;
}
.toc-list {
  list-style: none;
  padding: 4px 16px 12px;
  margin: 0;
}
.toc-list li a {
  display: block;
  padding: 6px 0;
  font-size: 14px;
  color: #4b5563;
  text-decoration: none;
}
.toc-list li a:hover { color: #0ea5e9; }

/* ===================== */
/* CONTENT               */
/* ===================== */
.content {
  display: flex;
  flex-direction: column;
  gap: 56px;
}

/* ===================== */
/* INTRO BOX             */
/* ===================== */
.intro-box {
  display: flex;
  gap: 16px;
  background: #eff6ff;
  border: 1px solid #bfdbfe;
  border-radius: 14px;
  padding: 20px;
}
.intro-icon { font-size: 28px; flex-shrink: 0; }
.intro-title { font-size: 14px; font-weight: 700; color: #1d4ed8; margin: 0 0 6px; }
.intro-text { font-size: 14px; color: #374151; line-height: 1.6; margin: 0; }

/* ===================== */
/* SECTIONS              */
/* ===================== */
section { scroll-margin-top: 80px; }

.section-number {
  font-size: 11px;
  font-weight: 800;
  letter-spacing: 2px;
  color: #9ca3af;
  text-transform: uppercase;
  margin-bottom: 6px;
}

section h2 {
  font-size: 22px;
  font-weight: 700;
  color: #111827;
  margin: 0 0 14px;
}

section p {
  font-size: 15px;
  color: #374151;
  line-height: 1.75;
  margin: 0 0 20px;
}

/* ===================== */
/* COLOR GRID            */
/* ===================== */
.color-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
  margin-bottom: 20px;
}
.color-card {
  display: flex;
  gap: 12px;
  align-items: flex-start;
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  padding: 14px;
}
.color-swatch {
  width: 16px;
  height: 16px;
  border-radius: 50%;
  flex-shrink: 0;
  margin-top: 2px;
}
.color-label { font-size: 13px; font-weight: 700; color: #111827; margin: 0 0 4px; }
.color-desc  { font-size: 12px; color: #6b7280; line-height: 1.5; margin: 0; }

/* ===================== */
/* TIP BOX               */
/* ===================== */
.tip-box {
  display: flex;
  gap: 12px;
  background: #f0fdf4;
  border: 1px solid #bbf7d0;
  border-left: 4px solid #22c55e;
  border-radius: 10px;
  padding: 16px;
  margin-bottom: 20px;
}
.tip-icon { font-size: 20px; flex-shrink: 0; }
.tip-title { font-size: 13px; font-weight: 700; color: #166534; margin: 0 0 4px; }
.tip-box p { font-size: 14px; color: #374151; margin: 0; }

/* ===================== */
/* IMAGE                 */
/* ===================== */
.image-container {
  border-radius: 14px;
  overflow: hidden;
}
.image-container img {
  width: 100%;
  height: 260px;
  object-fit: cover;
  display: block;
}
.image-caption {
  font-size: 12px;
  color: #6b7280;
  text-align: center;
  padding: 10px;
  background: #f9fafb;
  margin: 0;
}

/* ===================== */
/* SMELL LIST            */
/* ===================== */
.smell-list { display: flex; flex-direction: column; gap: 12px; margin-bottom: 20px; }
.smell-item {
  display: flex;
  gap: 14px;
  align-items: flex-start;
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  padding: 16px;
}
.smell-badge {
  font-size: 12px;
  font-weight: 700;
  padding: 4px 10px;
  border-radius: 8px;
  white-space: nowrap;
  flex-shrink: 0;
}
.smell-badge--danger { background: #fee2e2; color: #b91c1c; }
.smell-badge--warn   { background: #fef3c7; color: #92400e; }
.smell-badge--ok     { background: #d1fae5; color: #065f46; }
.smell-cause { font-size: 12px; font-weight: 700; color: #374151; margin: 0 0 4px; }
.smell-detail p:last-child { font-size: 13px; color: #6b7280; line-height: 1.6; margin: 0; }

/* ===================== */
/* WARNING BOX           */
/* ===================== */
.warning-box {
  display: flex;
  gap: 12px;
  background: #fff7ed;
  border: 1px solid #fed7aa;
  border-left: 4px solid #f97316;
  border-radius: 10px;
  padding: 16px;
}
.warning-box span { font-size: 20px; flex-shrink: 0; }
.warning-box p { font-size: 14px; color: #374151; margin: 0; line-height: 1.6; }

/* ===================== */
/* TASTE TABLE           */
/* ===================== */
.taste-table {
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  overflow: hidden;
  margin-bottom: 10px;
}
.taste-header {
  display: grid;
  grid-template-columns: 160px 1fr 80px;
  padding: 10px 16px;
  background: #f9fafb;
  font-size: 12px;
  font-weight: 700;
  color: #6b7280;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  border-bottom: 1px solid #e5e7eb;
}
.taste-row {
  display: grid;
  grid-template-columns: 160px 1fr 80px;
  padding: 12px 16px;
  font-size: 13px;
  color: #374151;
  border-bottom: 1px solid #f3f4f6;
  align-items: center;
}
.taste-row:last-child { border-bottom: none; }
.taste-name { font-weight: 600; color: #111827; }
.risk { font-size: 11px; font-weight: 700; padding: 3px 8px; border-radius: 6px; text-align: center; }
.risk--high { background: #fee2e2; color: #b91c1c; }
.risk--med  { background: #fef3c7; color: #92400e; }
.risk--low  { background: #d1fae5; color: #065f46; }
.table-note { font-size: 12px; color: #9ca3af; }

/* ===================== */
/* SEDIMENT GRID         */
/* ===================== */
.sediment-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
  margin-bottom: 20px;
}
.sediment-card {
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  padding: 16px;
  text-align: center;
}
.sediment-icon { font-size: 28px; display: block; margin-bottom: 8px; }
.sediment-title { font-size: 13px; font-weight: 700; color: #111827; margin: 0 0 6px; }
.sediment-desc  { font-size: 12px; color: #6b7280; line-height: 1.6; margin: 0; }

/* ===================== */
/* HIGHLIGHT BOX         */
/* ===================== */
.highlight-box {
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-left: 4px solid #94a3b8;
  border-radius: 10px;
  padding: 16px;
}
.highlight-box p { font-size: 14px; color: #374151; line-height: 1.6; margin: 0; }

/* ===================== */
/* ALERT CHECKLIST       */
/* ===================== */
.alert-checklist { display: flex; flex-direction: column; gap: 10px; margin-bottom: 24px; }
.alert-item {
  display: flex;
  gap: 14px;
  align-items: flex-start;
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  padding: 14px 16px;
}
.alert-icon { font-size: 20px; flex-shrink: 0; }
.alert-title { font-size: 14px; font-weight: 700; color: #111827; margin: 0 0 3px; }
.alert-desc  { font-size: 13px; color: #6b7280; margin: 0; line-height: 1.5; }

/* ===================== */
/* ACTION BOX            */
/* ===================== */
.action-box {
  background: #fff1f2;
  border: 1px solid #fecdd3;
  border-radius: 14px;
  padding: 20px 24px;
}
.action-title { font-size: 15px; font-weight: 700; color: #be123c; margin: 0 0 14px; }
.action-steps { margin: 0; padding-left: 20px; }
.action-steps li { font-size: 14px; color: #374151; line-height: 1.7; padding: 2px 0; }

/* ===================== */
/* SUMMARY               */
/* ===================== */
.summary-section h2 { font-size: 20px; }
.summary-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 20px; }
.summary-item {
  border-radius: 14px;
  padding: 20px;
}
.summary-item--good { background: #f0fdf4; border: 1px solid #bbf7d0; }
.summary-item--bad  { background: #fff1f2; border: 1px solid #fecdd3; }
.summary-label { font-size: 14px; font-weight: 700; margin: 0 0 12px; color: #111827; }
.summary-item ul { margin: 0; padding-left: 18px; }
.summary-item li { font-size: 13px; color: #374151; line-height: 1.8; }
.disclaimer {
  background: #fffbeb;
  border: 1px solid #fde68a;
  border-radius: 12px;
  padding: 16px;
  font-size: 13px;
  color: #374151;
  line-height: 1.65;
}
.disclaimer p { margin: 0; }

/* ===================== */
/* ARTICLE FOOTER        */
/* ===================== */
.article-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 48px;
  padding-top: 24px;
  border-top: 1px solid #e5e7eb;
  gap: 12px;
  flex-wrap: wrap;
}
.footer-right { display: flex; gap: 10px; }
.btn-back {
  background: none;
  border: 1px solid #e5e7eb;
  color: #374151;
  padding: 10px 18px;
  border-radius: 10px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
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
  transition: all 0.2s;
}
.btn-share:hover { background: #f3f4f6; }
.btn-primary {
  background: #0ea5e9;
  color: white;
  border: none;
  padding: 10px 22px;
  border-radius: 10px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;
}
.btn-primary:hover { background: #0284c7; }

/* ===================== */
/* SIDEBAR               */
/* ===================== */
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
  border-radius: 14px;
  padding: 18px;
}
.toc-title { font-size: 11px; font-weight: 800; letter-spacing: 1.5px; text-transform: uppercase; color: #9ca3af; margin: 0 0 12px; }
.toc-links { list-style: none; margin: 0 0 14px; padding: 0; }
.toc-links li a {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 7px 0;
  font-size: 13px;
  color: #6b7280;
  text-decoration: none;
  border-radius: 6px;
  transition: color 0.2s;
}
.toc-links li a:hover { color: #111827; }
.toc-links li a.active { color: #0ea5e9; font-weight: 600; }
.toc-num { font-size: 11px; color: #d1d5db; font-weight: 600; width: 22px; }
.toc-progress { height: 4px; background: #f3f4f6; border-radius: 99px; overflow: hidden; }
.toc-progress-fill { height: 100%; background: #0ea5e9; border-radius: 99px; transition: width 0.2s; }
.toc-progress-label { font-size: 11px; color: #9ca3af; margin: 6px 0 0; text-align: right; }

.info-card {
  background: #0f172a;
  border-radius: 14px;
  padding: 18px;
  color: white;
}
.info-card-title { font-size: 14px; font-weight: 700; margin: 0 0 8px; }
.info-card-text  { font-size: 13px; color: #94a3b8; line-height: 1.6; margin: 0 0 14px; }
.btn-cta {
  background: #0ea5e9;
  color: white;
  border: none;
  padding: 9px 16px;
  border-radius: 9px;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  width: 100%;
  transition: background 0.2s;
}
.btn-cta:hover { background: #0284c7; }

.related-card {
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 14px;
  padding: 18px;
}
.related-title { font-size: 11px; font-weight: 800; letter-spacing: 1.5px; text-transform: uppercase; color: #9ca3af; margin: 0 0 12px; }
.related-list { display: flex; flex-direction: column; gap: 8px; }
.related-item {
  display: flex;
  align-items: flex-start;
  gap: 8px;
  font-size: 13px;
  color: #374151;
  text-decoration: none;
  line-height: 1.5;
  transition: color 0.2s;
}
.related-item:hover { color: #0ea5e9; }
.related-item span:first-child { flex-shrink: 0; font-size: 16px; }

/* ===================== */
/* RESPONSIVE            */
/* ===================== */
@media (max-width: 960px) {
  .article-layout {
    grid-template-columns: 1fr;
  }
  .article-sidebar {
    display: none;
  }
  .color-grid,
  .sediment-grid,
  .summary-grid {
    grid-template-columns: 1fr;
  }
  .taste-header,
  .taste-row {
    grid-template-columns: 120px 1fr 70px;
  }
}

@media (max-width: 600px) {
  .title { font-size: 24px; }
  .article-page { padding: 20px 16px 60px; }
  .taste-header,
  .taste-row {
    grid-template-columns: 1fr;
    gap: 4px;
  }
  .taste-header { display: none; }
}
</style>