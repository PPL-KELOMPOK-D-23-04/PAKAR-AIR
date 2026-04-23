<template>
  <div class="min-h-screen font-sans text-slate-800 bg-white">

    <!-- ════════════════════════════════════════════════════════
         NAVBAR
    ════════════════════════════════════════════════════════ -->
    <nav class="sticky top-0 z-50 flex items-center justify-between px-12 py-4 bg-white/90 backdrop-blur-md border-b border-slate-100">
      <!-- Logo -->
      <div class="flex items-center gap-3 font-extrabold text-lg tracking-tight text-[#1a365d]">
        <div class="w-9 h-9 bg-gradient-to-br from-[#1a365d] to-[#3b7dd8] rounded-xl flex items-center justify-center shadow-md">
          <svg class="w-5 h-5 fill-white" viewBox="0 0 24 24">
            <path d="M12 2C6 9 4 13 4 16a8 8 0 0016 0c0-3-2-7-8-14z"/>
          </svg>
        </div>
        PAKAR-AIR
      </div>

      <!-- Nav Links -->
      <div class="flex items-center gap-6">
        <a href="#cara-kerja" class="text-sm text-slate-500 hover:text-slate-800 font-medium transition">Cara Kerja</a>
        <a href="#keunggulan" class="text-sm text-slate-500 hover:text-slate-800 font-medium transition">Keunggulan</a>

        <template v-if="authStore.isLoggedIn">
          <RouterLink
            to="/dashboard"
            class="text-sm text-slate-500 hover:text-slate-800 font-medium transition"
          >
            Dashboard
          </RouterLink>
          <button
            id="btn-logout-nav"
            :disabled="authStore.isLoading"
            class="bg-red-50 text-red-600 border border-red-200 text-sm font-semibold px-5 py-2.5 rounded-xl hover:bg-red-100 transition flex items-center gap-2 disabled:opacity-60"
            @click="handleLogout"
          >
            <LogOutIcon class="w-4 h-4" />
            {{ authStore.isLoading ? 'Keluar...' : 'Keluar' }}
          </button>
        </template>

        <template v-else>
          <RouterLink
            to="/login"
            id="btn-login-nav"
            class="text-sm text-slate-500 hover:text-slate-800 font-medium transition"
          >
            Masuk
          </RouterLink>
          <RouterLink
            to="/login"
            class="bg-[#1a365d] text-white text-sm font-semibold px-5 py-2.5 rounded-xl hover:bg-[#2d4a77] transition shadow-sm"
          >
            Mulai Gratis
          </RouterLink>
        </template>
      </div>
    </nav>

    <!-- ════════════════════════════════════════════════════════
         HERO
    ════════════════════════════════════════════════════════ -->
    <header class="bg-gradient-to-br from-[#0f2444] via-[#1a365d] to-[#1e4976] px-12 pt-24 pb-20 text-center relative overflow-hidden">
      <!-- Glow -->
      <div class="absolute inset-0 flex items-start justify-center pointer-events-none">
        <div class="w-[700px] h-[700px] -mt-32 rounded-full bg-[#3b7dd8] opacity-10 blur-3xl"></div>
      </div>
      <!-- Decorative dots -->
      <div class="absolute top-10 left-10 w-24 h-24 rounded-full border border-white/5 pointer-events-none"></div>
      <div class="absolute bottom-10 right-10 w-40 h-40 rounded-full border border-white/5 pointer-events-none"></div>

      <div class="relative z-10">
        <!-- Badge -->
        <div class="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-[#a8c8f0] text-xs font-semibold px-4 py-1.5 rounded-full mb-7 tracking-wide">
          <span class="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></span>
          AI-Powered Water Quality Analysis
        </div>

        <!-- Headline -->
        <h1 class="text-5xl md:text-6xl font-extrabold text-white leading-tight tracking-tight mb-5">
          Cek Kualitas Air<br>
          dengan <span class="text-blue-400">Teknologi AI</span>
        </h1>
        <p class="text-white/70 text-lg max-w-xl mx-auto leading-relaxed mb-10">
          Deteksi kualitas air secara cepat dan akurat. Cukup foto, isi data, dan dapatkan rekomendasi kesehatan dalam hitungan detik.
        </p>

        <!-- CTAs -->
        <div class="flex gap-4 justify-center flex-wrap">
          <RouterLink
            :to="authStore.isLoggedIn ? '/dashboard' : '/login'"
            id="btn-hero-cta"
            class="bg-[#3b82f6] text-white font-extrabold px-10 py-4 rounded-2xl text-base flex items-center gap-2 hover:bg-[#2563eb] transition-all hover:-translate-y-0.5 tracking-tight shadow-lg shadow-blue-500/30"
          >
            Mulai Analisis
            <ArrowRightIcon class="w-4 h-4" />
          </RouterLink>
          <a
            href="#cara-kerja"
            class="bg-transparent border border-white/40 text-white font-semibold px-10 py-4 rounded-2xl text-base hover:bg-white/10 transition flex items-center gap-2"
          >
            Pelajari Lebih Lanjut
            <ChevronDownIcon class="w-4 h-4" />
          </a>
        </div>

        <!-- Stats -->
        <div class="flex justify-center gap-16 mt-16 pt-10 border-t border-white/10">
          <div v-for="stat in stats" :key="stat.label" class="text-center">
            <div class="text-3xl font-extrabold text-white tracking-tight">{{ stat.value }}</div>
            <div class="text-xs text-white/50 mt-1">{{ stat.label }}</div>
          </div>
        </div>
      </div>
    </header>

    <!-- ════════════════════════════════════════════════════════
         HOW IT WORKS
    ════════════════════════════════════════════════════════ -->
    <section id="cara-kerja" class="max-w-5xl mx-auto px-12 py-20">
      <div class="mb-4 text-xs font-bold uppercase tracking-widest text-blue-600">Cara Menggunakan</div>
      <h2 class="text-4xl font-extrabold tracking-tight mb-3">3 Langkah Mudah</h2>
      <p class="text-slate-500 text-base leading-relaxed max-w-md">
        Analisis kualitas air Anda tanpa perlu alat lab. Cukup smartphone dan beberapa menit waktu.
      </p>

      <div class="grid md:grid-cols-3 gap-6 mt-12">
        <div
          v-for="(step, index) in steps"
          :key="index"
          class="relative border-2 border-slate-100 hover:border-blue-400 rounded-3xl p-8 transition-all hover:-translate-y-1 group overflow-hidden cursor-default"
        >
          <!-- Background number -->
          <span class="absolute top-0 right-4 text-8xl font-extrabold text-slate-100 leading-none select-none group-hover:text-blue-50 transition-colors">
            {{ String(index + 1).padStart(2, '0') }}
          </span>

          <div class="w-12 h-12 bg-blue-50 group-hover:bg-blue-100 rounded-2xl flex items-center justify-center mb-5 transition-colors">
            <component :is="step.icon" class="w-6 h-6 text-blue-500" />
          </div>
          <h3 class="text-lg font-bold mb-2 text-slate-800">{{ step.title }}</h3>
          <p class="text-sm text-slate-500 leading-relaxed">{{ step.desc }}</p>
        </div>
      </div>
    </section>

    <!-- ════════════════════════════════════════════════════════
         FEATURES
    ════════════════════════════════════════════════════════ -->
    <section id="keunggulan" class="bg-slate-50 py-20">
      <div class="max-w-5xl mx-auto px-12">
        <div class="mb-4 text-xs font-bold uppercase tracking-widest text-blue-600">Keunggulan</div>
        <h2 class="text-4xl font-extrabold tracking-tight mb-3">Kenapa Pilih PAKAR-AIR?</h2>
        <p class="text-slate-500 text-base leading-relaxed max-w-md mb-12">
          Teknologi terdepan untuk memastikan air yang Anda gunakan aman dan berkualitas.
        </p>

        <div class="grid md:grid-cols-2 gap-4">
          <div
            v-for="feature in features"
            :key="feature.title"
            class="bg-white border border-slate-100 hover:border-blue-200 hover:shadow-md rounded-2xl p-6 flex items-start gap-4 transition-all group"
          >
            <div class="w-11 h-11 bg-blue-50 group-hover:bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors">
              <component :is="feature.icon" class="w-5 h-5 text-blue-500" />
            </div>
            <div>
              <h4 class="font-bold text-slate-800 mb-1">{{ feature.title }}</h4>
              <p class="text-sm text-slate-500 leading-relaxed">{{ feature.desc }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ════════════════════════════════════════════════════════
         CTA
    ════════════════════════════════════════════════════════ -->
    <section class="max-w-5xl mx-auto px-12 py-20">
      <div class="bg-gradient-to-br from-[#1a365d] to-[#2d5fa3] rounded-3xl px-12 py-20 text-center relative overflow-hidden">
        <!-- Decorative circles -->
        <div class="absolute -bottom-10 -right-10 w-52 h-52 bg-white/5 rounded-full pointer-events-none"></div>
        <div class="absolute -top-10 -left-10 w-40 h-40 bg-white/5 rounded-full pointer-events-none"></div>

        <div class="relative z-10">
          <div class="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-blue-200 text-xs font-semibold px-4 py-1.5 rounded-full mb-6 tracking-wide">
            <span class="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></span>
            Siap untuk memulai?
          </div>
          <h2 class="text-4xl font-extrabold text-white tracking-tight mb-3">
            Mulai Cek Air Anda Sekarang
          </h2>
          <p class="text-white/60 mb-8">Gratis untuk percobaan pertama. Tidak perlu kartu kredit.</p>
          <RouterLink
            :to="authStore.isLoggedIn ? '/dashboard' : '/login'"
            id="btn-cta-bottom"
            class="inline-block bg-white text-[#1a365d] font-extrabold px-12 py-4 rounded-2xl text-base tracking-tight hover:shadow-2xl transition-all hover:-translate-y-0.5"
          >
            {{ authStore.isLoggedIn ? 'Ke Dashboard' : 'Daftar Gratis Sekarang' }}
          </RouterLink>
        </div>
      </div>
    </section>

    <!-- ════════════════════════════════════════════════════════
         FOOTER
    ════════════════════════════════════════════════════════ -->
    <footer class="border-t border-slate-100 px-12 py-8 flex justify-between items-center text-slate-400 text-sm flex-wrap gap-4">
      <div class="flex items-center gap-2">
        <div class="w-6 h-6 bg-gradient-to-br from-[#1a365d] to-[#3b7dd8] rounded-lg flex items-center justify-center">
          <svg class="w-3.5 h-3.5 fill-white" viewBox="0 0 24 24">
            <path d="M12 2C6 9 4 13 4 16a8 8 0 0016 0c0-3-2-7-8-14z"/>
          </svg>
        </div>
        <p>© 2026 PAKAR-AIR. Semua hak dilindungi.</p>
      </div>
      <div class="flex gap-6">
        <a href="#" class="hover:text-slate-600 transition">Kebijakan Privasi</a>
        <a href="#" class="hover:text-slate-600 transition">Syarat Penggunaan</a>
        <a href="#" class="hover:text-slate-600 transition">Kontak</a>
      </div>
    </footer>

  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import {
  UploadIcon,
  ClipboardListIcon,
  CheckCircleIcon,
  ZapIcon,
  ShieldCheckIcon,
  MonitorIcon,
  BarChart2Icon,
  LogOutIcon,
  ArrowRightIcon,
  ChevronDownIcon,
} from 'lucide-vue-next'
import { useAuthStore } from '@/stores/authStore'

const router = useRouter()
const authStore = useAuthStore()

async function handleLogout() {
  await authStore.logout()
  router.push('/')
}

const stats = [
  { value: '98%',   label: 'Akurasi Deteksi' },
  { value: '<5 dtk', label: 'Waktu Analisis' },
  { value: '10K+',  label: 'Sampel Dianalisis' },
]

const steps = [
  {
    title: 'Upload Foto Air',
    desc: 'Ambil foto sampel air yang ingin dianalisis langsung dari smartphone atau kamera Anda.',
    icon: UploadIcon,
  },
  {
    title: 'Isi Data Pendukung',
    desc: 'Lengkapi informasi warna, bau, dan sumber air untuk hasil analisis yang lebih akurat.',
    icon: ClipboardListIcon,
  },
  {
    title: 'Dapatkan Hasil',
    desc: 'Sistem AI kami menganalisis dan memberikan rekomendasi kesehatan secara instan.',
    icon: CheckCircleIcon,
  },
]

const features = [
  {
    title: 'Analisis Instan',
    desc: 'Hasil dalam hitungan detik menggunakan model YOLO dan Random Forest yang terlatih khusus.',
    icon: ZapIcon,
  },
  {
    title: 'Akurasi Tinggi',
    desc: 'Dilatih dengan ribuan data sampel air untuk memastikan deteksi yang presisi dan terpercaya.',
    icon: ShieldCheckIcon,
  },
  {
    title: 'Mudah Digunakan',
    desc: 'Antarmuka yang intuitif — tidak perlu keahlian khusus. Siapa saja bisa menggunakannya.',
    icon: MonitorIcon,
  },
  {
    title: 'Laporan Lengkap',
    desc: 'Dapatkan laporan detail dengan parameter kualitas air, tingkat risiko, dan saran tindak lanjut.',
    icon: BarChart2Icon,
  },
]
</script>