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

<style scoped>
.edukasi-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background: #f0f4f8;
  min-height: 100vh;
}

/* ========== HERO SECTION ========== */
.hero-section {
  background: linear-gradient(135deg, #1a73e8 0%, #0d8abc 100%);
  border-radius: 24px;
  padding: 3rem 2rem;
  text-align: center;
  margin-bottom: 2rem;
  color: white;
}

.hero-title {
  font-size: 2.5rem;
  margin-bottom: 1rem;
}

.hero-subtitle {
  font-size: 1.1rem;
  opacity: 0.95;
  max-width: 600px;
  margin: 0 auto 2rem auto;
  line-height: 1.6;
}

/* ========== SEARCH BAR ========== */
.search-wrapper {
  position: relative;
  max-width: 500px;
  margin: 0 auto;
}

.search-input {
  width: 100%;
  padding: 1rem 1rem 1rem 1.2rem;
  font-size: 1rem;
  border: none;
  border-radius: 50px;
  outline: none;
  color: #333;
}

.search-input::placeholder {
  color: #999;
}

.clear-search {
  position: absolute;
  right: 15px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  font-size: 1rem;
  cursor: pointer;
  color: #999;
}

/* ========== FILTER SECTION ========== */
.filter-section {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  align-items: center;
  margin-bottom: 1.5rem;
  background: white;
  padding: 1rem;
  border-radius: 50px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);
}

.filter-label {
  font-weight: 600;
  color: #2c3e50;
  margin-right: 0.5rem;
}

.filter-chip {
  padding: 0.5rem 1.2rem;
  background: #f0f2f5;
  border: none;
  border-radius: 50px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: all 0.2s;
}

.filter-chip:hover {
  background: #e0e4e8;
}

.filter-chip.active {
  background: #1a73e8;
  color: white;
}

/* ========== RESULT INFO ========== */
.result-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  padding: 0.5rem 0;
  color: #666;
  font-size: 0.9rem;
}

.reset-filters {
  background: none;
  border: none;
  color: #1a73e8;
  cursor: pointer;
  font-size: 0.9rem;
}

/* ========== ARTICLES GRID ========== */
.articles-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.article-card {
  background: white;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;
}

.article-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0,0,0,0.15);
}

.card-image {
  position: relative;
  height: 180px;
  overflow: hidden;
}

.card-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s;
}

.article-card:hover .card-image img {
  transform: scale(1.05);
}

.card-category {
  position: absolute;
  top: 12px;
  right: 12px;
  background: rgba(0,0,0,0.7);
  color: white;
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 0.75rem;
}

.card-content {
  padding: 1.2rem;
}

.card-content h3 {
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
  color: #2c3e50;
}

.card-content p {
  color: #666;
  font-size: 0.9rem;
  line-height: 1.5;
  margin-bottom: 1rem;
}

.card-meta {
  display: flex;
  gap: 1rem;
  font-size: 0.75rem;
  color: #999;
  margin-bottom: 0.75rem;
}

.read-more {
  color: #1a73e8;
  font-size: 0.85rem;
  font-weight: 500;
}

/* ========== EMPTY STATE ========== */
.empty-state {
  text-align: center;
  padding: 4rem;
  background: white;
  border-radius: 24px;
}

.empty-icon {
  font-size: 4rem;
  display: block;
  margin-bottom: 1rem;
}

.empty-state h3 {
  color: #2c3e50;
  margin-bottom: 0.5rem;
}

.empty-state p {
  color: #666;
  margin-bottom: 1.5rem;
}

.empty-btn {
  padding: 0.75rem 1.5rem;
  background: #1a73e8;
  color: white;
  border: none;
  border-radius: 50px;
  cursor: pointer;
}

/* ========== STATS SECTION ========== */
.stats-section {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  margin-top: 2rem;
  text-align: center;
}

.stat-card {
  background: white;
  padding: 1.5rem;
  border-radius: 16px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);
}

.stat-number {
  display: block;
  font-size: 1.8rem;
  font-weight: bold;
  color: #1a73e8;
}

.stat-label {
  font-size: 0.9rem;
  color: #666;
}

/* ========== RESPONSIVE ========== */
@media (max-width: 768px) {
  .edukasi-container {
    padding: 1rem;
  }
  
  .hero-title {
    font-size: 1.8rem;
  }
  
  .articles-grid {
    grid-template-columns: 1fr;
  }
  
  .stats-section {
    grid-template-columns: 1fr;
  }
  
  .filter-section {
    border-radius: 16px;
    flex-wrap: wrap;
  }
}
</style>