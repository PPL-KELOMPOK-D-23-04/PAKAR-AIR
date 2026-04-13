<template>
  <div class="min-h-screen font-sans text-slate-800 bg-white">
    <nav class="flex items-center justify-between px-8 py-6 bg-gradient-to-r from-[#1a365d] to-[#2d4a77] text-white">
      <div class="flex items-center gap-2 font-bold text-xl tracking-tight">
        <div class="w-8 h-8 bg-white rounded-full flex items-center justify-center">
          <span class="text-[#1a365d]">💧</span>
        </div>
        PAKAR-AIR
      </div>
      <div class="space-x-6 flex items-center">
        <a href="#" class="hover:text-blue-200 transition">Masuk</a>
        <button class="bg-white text-[#1a365d] px-6 py-2 rounded-lg font-semibold hover:bg-blue-50 transition">
          Daftar
        </button>
      </div>
    </nav>

    <header class="relative bg-gradient-to-b from-[#2d4a77] to-[#1a365d] pt-24 pb-40 text-center text-white px-4">
      <h1 class="text-4xl md:text-5xl font-bold mb-6">Cek Kualitas Air dengan AI</h1>
      <p class="max-w-2xl mx-auto text-lg opacity-90 mb-10">
        Deteksi kualitas air secara cepat dan akurat menggunakan teknologi Artificial Intelligence untuk kesehatan yang lebih baik.
      </p>
      <button class="bg-white text-[#1a365d] px-8 py-4 rounded-full font-bold shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all flex items-center gap-2 mx-auto">
        Mulai Analisis <span class="text-xl">→</span>
      </button>
    </header>

    <section class="max-w-6xl mx-auto px-4 -mt-20 relative z-10">
      <div class="text-center mb-16">
        <h2 class="text-3xl font-bold mb-2">Cara Menggunakan</h2>
        <p class="text-slate-500">Tiga langkah mudah untuk menganalisis kualitas air Anda</p>
      </div>

      <div class="grid md:grid-cols-3 gap-8">
        <div v-for="(step, index) in steps" :key="index" 
             class="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition text-center group">
          <div class="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-blue-600 group-hover:text-white transition-colors">
            <component :is="step.icon" class="w-8 h-8" />
          </div>
          <div class="inline-block px-3 py-1 bg-slate-100 rounded-full text-xs font-bold text-slate-500 mb-4">
            {{ index + 1 }}
          </div>
          <h3 class="text-xl font-bold mb-3">{{ step.title }}</h3>
          <p class="text-slate-500 text-sm leading-relaxed">{{ step.desc }}</p>
        </div>
      </div>
    </section>

    <section class="max-w-4xl mx-auto px-4 my-32">
      <div class="bg-white rounded-3xl p-12 shadow-[0_20px_50px_rgba(8,112,184,0.1)] border border-blue-50 text-center relative overflow-hidden">
        <div class="relative z-10">
          <h2 class="text-3xl font-bold mb-4">Siap Memulai?</h2>
          <p class="text-slate-500 mb-8">Daftar sekarang dan dapatkan analisis kualitas air gratis</p>
          <button class="bg-blue-600 text-white px-10 py-4 rounded-xl font-bold hover:bg-blue-700 transition shadow-lg shadow-blue-200">
            Daftar Gratis Sekarang
          </button>
        </div>
        <div class="absolute -bottom-10 -right-10 w-40 h-40 bg-blue-50 rounded-full opacity-50"></div>
      </div>
    </section>

    <footer class="py-12 border-t border-slate-100 text-center text-slate-400 text-sm">
      © 2026 PAKAR-AIR. Semua hak dilindungi.
    </footer>
  </div>
</template>

<script setup>
import { UploadIcon, BeakerIcon, CheckCircleIcon } from 'lucide-vue-next'

const steps = [
  {
    title: 'Upload Foto Air',
    desc: 'Ambil foto sampel air yang ingin dianalisis langsung dari smartphone Anda.',
    icon: UploadIcon
  },
  {
    title: 'Isi Data Pendukung',
    desc: 'Lengkapi informasi warna, bau, dan sumber air untuk hasil lebih akurat.',
    icon: BeakerIcon
  },
  {
    title: 'Dapatkan Hasil',
    desc: 'Sistem AI akan menganalisis dan memberikan rekomendasi kesehatan segera.',
    icon: CheckCircleIcon
  }
]
</script>