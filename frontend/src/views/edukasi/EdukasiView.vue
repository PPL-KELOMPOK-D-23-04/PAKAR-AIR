<template>
  <div class="edukasi-container">
    <!-- HERO SECTION -->
    <div class="hero-section">
      <h1 class="hero-title">📚 Edukasi Kualitas Air</h1>
      <p class="hero-subtitle">
          <span class="search-icon">🔍</span>
        Pelajari tentang kualitas air, pencemaran, dan teknologi pengolahan air 
        bersama PAKAR-AIR
      </p>
      
      <!-- SEARCH BAR (Integrasi dengan SearchBar) -->
      <div class="search-wrapper">
        <input 
          v-model="searchQuery" 
          type="text"
          placeholder="Cari artikel... (contoh: parameter, pencemaran, teknologi)"
          class="search-input"
          @input="handleSearch"
        />
        <button v-if="searchQuery" @click="clearSearch" class="clear-search">✖</button>
      </div>
    </div>

    <!-- FILTER KATEGORI -->
    <div class="filter-section">
      <span class="filter-label">Filter kategori:</span>
      <button 
        v-for="cat in categories" 
        :key="cat"
        @click="selectedCategory = cat"
        :class="['filter-chip', { active: selectedCategory === cat }]"
      >
        {{ cat }}
      </button>
      <button 
        @click="selectedCategory = 'Semua'"
        :class="['filter-chip', { active: selectedCategory === 'Semua' }]"
      >
        Semua
      </button>
    </div>

    <!-- HASIL PENCARIAN & FILTER -->
    <div class="result-info" v-if="searchQuery || selectedCategory !== 'Semua'">
      <span>🔍 Menampilkan {{ filteredArticles.length }} dari {{ articles.length }} artikel</span>
      <button @click="resetFilters" class="reset-filters">Reset Filter</button>
    </div>

    <!-- DAFTAR ARTIKEL (Integrasi Artikel 1,2,3) -->
    <div v-if="filteredArticles.length === 0" class="empty-state">
      <span class="empty-icon">😢</span>
      <h3>Tidak ada artikel yang ditemukan</h3>
      <p>Coba cari dengan kata kunci lain</p>
      <button @click="resetFilters" class="empty-btn">Lihat Semua Artikel</button>
    </div>

    <div v-else class="articles-grid">
      <div 
        v-for="article in filteredArticles" 
        :key="article.id"
        class="article-card"
        @click="goToArticle(article.route)"
      >
        <div class="card-image">
          <img :src="article.image" :alt="article.title">
          <span class="card-category">{{ article.category }}</span>
        </div>
        <div class="card-content">
          <h3>{{ article.title }}</h3>
          <p>{{ article.excerpt }}</p>
          <div class="card-meta">
            <span>📅 {{ article.date }}</span>
            <span>⏱️ {{ article.readTime }}</span>
          </div>
          <div class="read-more">Baca selengkapnya →</div>
        </div>
      </div>
    </div>

    <!-- STATISTIK EDUKASI -->
    <div class="stats-section">
      <div class="stat-card">
        <span class="stat-number">3+</span>
        <span class="stat-label">Artikel Edukasi</span>
      </div>
      <div class="stat-card">
        <span class="stat-number">100%</span>
        <span class="stat-label">Gratis</span>
      </div>
      <div class="stat-card">
        <span class="stat-number">24/7</span>
        <span class="stat-label">Akses</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// ========== DATA ARTIKEL ==========
const articles = ref([
  {
    id: 1,
    title: 'Parameter Kualitas Air yang Perlu Diketahui',
    excerpt: 'Pelajari berbagai parameter fisika, kimia, dan biologi untuk menentukan kualitas air bersih. Lengkap dengan standar baku mutu air.',
    category: 'Edukasi Dasar',
    date: '22 April 2026',
    readTime: '5 menit',
    image: 'https://images.unsplash.com/photo-1548839140-29a749e1cf4d?w=400',
    route: '/artikel',
    keywords: ['parameter', 'kualitas air', 'fisika', 'kimia', 'biologi', 'pH', 'kekeruhan', 'standar']
  },
  {
    id: 2,
    title: 'Dampak Pencemaran Air bagi Kesehatan dan Lingkungan',
    excerpt: 'Ketahui bahaya pencemaran air dari limbah industri, rumah tangga, dan pertanian. Serta dampaknya terhadap kesehatan dan ekosistem.',
    category: 'Kesehatan & Lingkungan',
    date: '22 April 2026',
    readTime: '6 menit',
    image: 'https://images.unsplash.com/photo-1564424224827-cd24b8915874?w=400',
    route: '/artikel2',
    keywords: ['pencemaran', 'limbah', 'kesehatan', 'penyakit', 'diare', 'lingkungan', 'ekosistem', 'industri']
  },
  {
    id: 3,
    title: 'Teknologi Pengolahan Air Bersih dan Penerapannya di Indonesia',
    excerpt: 'Berbagai teknologi modern dan tradisional untuk mengolah air menjadi layak konsumsi. Dilengkapi rekomendasi untuk kebutuhan Anda.',
    category: 'Teknologi & Inovasi',
    date: '22 April 2026',
    readTime: '7 menit',
    image: 'https://images.unsplash.com/photo-1625314887424-9f1900b1a621?w=400',
    route: '/artikel3',
    keywords: ['teknologi', 'pengolahan air', 'RO', 'filtrasi', 'SODIS', 'UV', 'IPAL', 'alat']
  }
])

// ========== STATE ==========
const searchQuery = ref('')
const selectedCategory = ref('Semua')

const categories = ['Edukasi Dasar', 'Kesehatan & Lingkungan', 'Teknologi & Inovasi']

// ========== COMPUTED: Filter Artikel ==========
const filteredArticles = computed(() => {
  let result = articles.value

  // Filter berdasarkan kategori
  if (selectedCategory.value !== 'Semua') {
    result = result.filter(article => article.category === selectedCategory.value)
  }

  // Filter berdasarkan pencarian (judul, excerpt, keywords)
  if (searchQuery.value.trim()) {
    const query = searchQuery.value.toLowerCase()
    result = result.filter(article => 
      article.title.toLowerCase().includes(query) ||
      article.excerpt.toLowerCase().includes(query) ||
      article.keywords.some(keyword => keyword.toLowerCase().includes(query))
    )
  }

  return result
})

// ========== METHODS ==========
const handleSearch = () => {
  // Auto-trigger dari computed
}

const clearSearch = () => {
  searchQuery.value = ''
}

const resetFilters = () => {
  searchQuery.value = ''
  selectedCategory.value = 'Semua'
}

const goToArticle = (route) => {
  router.push(route)
}
</script>

<style scoped src="@/assets/styles/pages/edukasi.css"></style>