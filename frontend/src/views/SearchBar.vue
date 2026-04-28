<template>
  <div class="search-container">
    <div class="search-header">
      <router-link to="/edukasi" class="back-btn">
        ← Kembali ke Edukasi
      </router-link>
      <h1 class="search-title">🔍 Cari Artikel Edukasi</h1>
    </div>

    <!-- FORM PENCARIAN -->
    <div class="search-box">
      <div class="search-input-wrapper">
        <span class="search-icon">🔍</span>
        <input 
          v-model="searchQuery" 
          type="text"
          placeholder="Cari artikel tentang kualitas air, pencemaran, teknologi..."
          @input="handleSearch"
          class="search-input"
        />
        <button v-if="searchQuery" @click="clearSearch" class="clear-btn">✖</button>
      </div>
      
      <div class="filter-section">
        <span class="filter-label">Filter kategori:</span>
        <button 
          v-for="cat in categories" 
          :key="cat"
          @click="selectedCategory = cat"
          :class="['filter-btn', { active: selectedCategory === cat }]"
        >
          {{ cat }}
        </button>
        <button 
          @click="selectedCategory = 'Semua'"
          :class="['filter-btn', { active: selectedCategory === 'Semua' }]"
        >
          Semua
        </button>
      </div>
    </div>

    <!-- HASIL PENCARIAN -->
    <div class="search-stats" v-if="searchQuery || selectedCategory !== 'Semua'">
      Menampilkan {{ filteredArticles.length }} dari {{ articles.length }} artikel
    </div>

    <div v-if="filteredArticles.length === 0" class="no-results">
      <span class="no-results-icon">😢</span>
      <h3>Tidak ada artikel yang ditemukan</h3>
      <p>Coba dengan kata kunci lain atau lihat semua artikel</p>
      <button @click="resetSearch" class="reset-btn">Lihat Semua Artikel</button>
    </div>

    <div v-else class="results-grid">
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
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// DATA ARTIKEL
const articles = ref([
  {
    id: 1,
    title: 'Parameter Kualitas Air yang Perlu Diketahui',
    excerpt: 'Pelajari berbagai parameter fisika, kimia, dan biologi untuk menentukan kualitas air bersih.',
    category: 'Edukasi Dasar',
    date: '22 April 2026',
    readTime: '5 menit',
    image: 'https://images.unsplash.com/photo-1548839140-29a749e1cf4d?w=400',
    route: '/artikel',
    keywords: ['parameter', 'kualitas air', 'fisika', 'kimia', 'biologi', 'pH', 'kekeruhan']
  },
  {
    id: 2,
    title: 'Dampak Pencemaran Air bagi Kesehatan dan Lingkungan',
    excerpt: 'Ketahui bahaya pencemaran air dan dampaknya terhadap kesehatan manusia dan ekosistem.',
    category: 'Kesehatan & Lingkungan',
    date: '22 April 2026',
    readTime: '6 menit',
    image: 'https://images.unsplash.com/photo-1564424224827-cd24b8915874?w=400',
    route: '/artikel2',
    keywords: ['pencemaran', 'limbah', 'kesehatan', 'penyakit', 'diare', 'lingkungan', 'ekosistem']
  },
  {
    id: 3,
    title: 'Teknologi Pengolahan Air Bersih dan Penerapannya di Indonesia',
    excerpt: 'Berbagai teknologi modern dan tradisional untuk mengolah air menjadi layak konsumsi.',
    category: 'Teknologi & Inovasi',
    date: '22 April 2026',
    readTime: '7 menit',
    image: 'https://images.unsplash.com/photo-1625314887424-9f1900b1a621?w=400',
    route: '/artikel3',
    keywords: ['teknologi', 'pengolahan air', 'RO', 'filtrasi', 'SODIS', 'UV', 'IPAL']
  }
])

// STATE
const searchQuery = ref('')
const selectedCategory = ref('Semua')

const categories = ['Edukasi Dasar', 'Kesehatan & Lingkungan', 'Teknologi & Inovasi']

// FUNGSI PENCARIAN & FILTER
const filteredArticles = computed(() => {
  let result = articles.value

  // Filter berdasarkan kategori
  if (selectedCategory.value !== 'Semua') {
    result = result.filter(article => article.category === selectedCategory.value)
  }

  // Filter berdasarkan kata kunci pencarian
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

// HANDLER
const handleSearch = () => {
  // Auto-trigger dari computed
}

const clearSearch = () => {
  searchQuery.value = ''
}

const resetSearch = () => {
  searchQuery.value = ''
  selectedCategory.value = 'Semua'
}

const goToArticle = (route) => {
  router.push(route)
}
</script>

<style scoped>
.search-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  font-family: 'Segoe UI', sans-serif;
}

.search-header {
  margin-bottom: 2rem;
}

.back-btn {
  display: inline-block;
  color: #3498db;
  text-decoration: none;
  margin-bottom: 1rem;
  font-weight: 500;
}

.search-title {
  font-size: 2rem;
  color: #2c3e50;
}

.search-box {
  background: white;
  border-radius: 16px;
  padding: 1.5rem;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  margin-bottom: 2rem;
}

.search-input-wrapper {
  position: relative;
  margin-bottom: 1.5rem;
}

.search-icon {
  position: absolute;
  left: 15px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 1.2rem;
}

.search-input {
  width: 100%;
  padding: 1rem 1rem 1rem 3rem;
  font-size: 1rem;
  border: 2px solid #e0e0e0;
  border-radius: 12px;
  transition: all 0.2s;
}

.search-input:focus {
  outline: none;
  border-color: #3498db;
}

.clear-btn {
  position: absolute;
  right: 15px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  font-size: 1rem;
  cursor: pointer;
  color: #95a5a6;
}

.filter-section {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  align-items: center;
}

.filter-label {
  font-weight: 500;
  color: #2c3e50;
}

.filter-btn {
  padding: 0.5rem 1rem;
  background: #f8f9fa;
  border: 1px solid #ddd;
  border-radius: 20px;
  cursor: pointer;
  transition: all 0.2s;
}

.filter-btn:hover {
  background: #e8f4fd;
}

.filter-btn.active {
  background: #3498db;
  color: white;
  border-color: #3498db;
}

.search-stats {
  margin-bottom: 1rem;
  color: #7f8c8d;
  font-size: 0.9rem;
}

.no-results {
  text-align: center;
  padding: 3rem;
  background: #f8f9fa;
  border-radius: 16px;
}

.no-results-icon {
  font-size: 4rem;
  display: block;
  margin-bottom: 1rem;
}

.reset-btn {
  margin-top: 1rem;
  padding: 0.75rem 1.5rem;
  background: #3498db;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
}

.results-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, min
  