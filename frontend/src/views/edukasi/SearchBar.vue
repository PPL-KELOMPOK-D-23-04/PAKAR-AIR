<template>
  <DashboardLayout>
    <div class="search-page">
      <div class="page-header">
        <router-link to="/edukasi" class="btn-ghost">
          ? Kembali ke Edukasi
        </router-link>
        <h1 class="page-title">Cari Artikel Edukasi</h1>
        <p class="page-subtitle">Temukan panduan, artikel, dan inovasi terbaru seputar kualitas air.</p>
      </div>

      <!-- FORM PENCARIAN -->
      <div class="search-box">
        <div class="search-input-wrapper">
          <svg class="search-icon" xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input 
            v-model="searchQuery" 
            type="text"
            placeholder="Cari artikel tentang kualitas air, pencemaran, teknologi..."
            class="form-input search-input"
          />
          <button v-if="searchQuery" @click="clearSearch" class="clear-btn">?</button>
        </div>
        
        <div class="filter-section">
          <span class="filter-label">Filter kategori:</span>
          <button 
            @click="selectedCategory = 'Semua'"
            :class="['filter-badge', { active: selectedCategory === 'Semua' }]"
          >
            Semua
          </button>
          <button 
            v-for="cat in categories" 
            :key="cat"
            @click="selectedCategory = cat"
            :class="['filter-badge', { active: selectedCategory === cat }]"
          >
            {{ cat }}
          </button>
        </div>
      </div>

      <!-- HASIL PENCARIAN -->
      <div class="search-stats" v-if="searchQuery || selectedCategory !== 'Semua'">
        Menampilkan {{ filteredArticles.length }} dari {{ articles.length }} artikel
      </div>

      <div v-if="filteredArticles.length === 0" class="empty-state">
        <div class="empty-icon">??</div>
        <h3>Tidak ada artikel yang ditemukan</h3>
        <p>Coba dengan kata kunci lain atau lihat semua artikel</p>
        <button @click="resetSearch" class="btn btn--secondary mt-4">Lihat Semua Artikel</button>
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
            <h3 class="card-title">{{ article.title }}</h3>
            <p class="card-excerpt">{{ article.excerpt }}</p>
            <div class="card-meta">
              <span>?? {{ article.date }}</span>
              <span>?? {{ article.readTime }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </DashboardLayout>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import DashboardLayout from '@/layouts/DashboardLayout.vue'

const router = useRouter()

// DATA ARTIKEL
const articles = ref([
  {
    id: 1,
    title: 'Parameter Fisik Air Layak Konsumsi',
    excerpt: 'Panduan Mengenali Air Bersih Secara Mandiri berdasarkan warna, bau, dan rasa.',
    category: 'Panduan Visual',
    date: '12 Maret 2026',
    readTime: '4 menit',
    image: 'https://images.unsplash.com/photo-1548839140-29a749e1cf4d?w=400',
    route: '/artikel',
    keywords: ['parameter', 'kualitas air', 'fisika', 'warna', 'bau', 'rasa']
  },
  {
    id: 2,
    title: 'Dampak Pencemaran Air bagi Kesehatan',
    excerpt: 'Ancaman Tersembunyi yang Mengintai Setiap Hari dan cara pencegahannya.',
    category: 'Kesehatan & Lingkungan',
    date: '10 Maret 2026',
    readTime: '8 menit',
    image: 'https://images.unsplash.com/photo-1564424224827-cd24b8915874?w=400',
    route: '/artikel2',
    keywords: ['pencemaran', 'limbah', 'kesehatan', 'penyakit', 'diare', 'lingkungan']
  },
  {
    id: 3,
    title: 'Memahami Hasil Analisis PAKAR-AIR',
    excerpt: 'Panduan Lengkap Interpretasi Kualitas Air menggunakan kecerdasan buatan.',
    category: 'Panduan Pengguna AI',
    date: '15 Maret 2026',
    readTime: '6 menit',
    image: 'https://images.unsplash.com/photo-1625314887424-9f1900b1a621?w=400',
    route: '/artikel3',
    keywords: ['teknologi', 'pengolahan air', 'ai', 'interpretasi', 'confidence', 'skor']
  }
])

const searchQuery = ref('')
const selectedCategory = ref('Semua')
const categories = ['Panduan Visual', 'Kesehatan & Lingkungan', 'Panduan Pengguna AI']

const filteredArticles = computed(() => {
  let result = articles.value
  if (selectedCategory.value !== 'Semua') {
    result = result.filter(a => a.category === selectedCategory.value)
  }
  if (searchQuery.value.trim()) {
    const query = searchQuery.value.toLowerCase()
    result = result.filter(a => 
      a.title.toLowerCase().includes(query) ||
      a.excerpt.toLowerCase().includes(query) ||
      a.keywords.some(k => k.toLowerCase().includes(query))
    )
  }
  return result
})

const clearSearch = () => { searchQuery.value = '' }
const resetSearch = () => { searchQuery.value = ''; selectedCategory.value = 'Semua' }
const goToArticle = (route) => { router.push(route) }
</script>

<style scoped>
.search-page {
  display: flex;
  flex-direction: column;
  gap: var(--section-gap);
  padding: 12px 0;
}

.page-header {
  margin-bottom: 8px;
}
.btn-ghost {
  display: inline-block;
  color: var(--color-accent);
  text-decoration: none;
  font-weight: 600;
  margin-bottom: 16px;
  font-size: var(--font-size-sm);
}
.page-title {
  font-size: var(--font-size-2xl);
  font-weight: 700;
  color: var(--color-text-primary);
  margin-bottom: 8px;
  letter-spacing: -0.02em;
}
.page-subtitle {
  font-size: var(--font-size-md);
  color: var(--color-text-secondary);
}

.search-box {
  background: var(--color-surface);
  border-radius: var(--radius-lg);
  padding: 24px;
  border: 1px solid var(--color-border);
  box-shadow: var(--shadow-sm);
}

.search-input-wrapper {
  position: relative;
  margin-bottom: 24px;
}
.search-icon {
  position: absolute;
  left: 16px;
  top: 50%;
  transform: translateY(-50%);
  color: var(--color-text-muted);
}
.search-input {
  padding-left: 48px;
  padding-right: 48px;
}
.clear-btn {
  position: absolute;
  right: 16px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: var(--color-text-muted-light);
  cursor: pointer;
}

.filter-section {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  align-items: center;
}
.filter-label {
  font-size: var(--font-size-sm);
  font-weight: 600;
  color: var(--color-text-secondary);
  margin-right: 8px;
}
.filter-badge {
  padding: 6px 16px;
  background: var(--color-bg);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-xl);
  font-size: var(--font-size-sm);
  font-weight: 500;
  color: var(--color-text-secondary);
  cursor: pointer;
  transition: all var(--transition-fast);
}
.filter-badge:hover {
  background: var(--color-border-light);
}
.filter-badge.active {
  background: var(--color-primary);
  color: var(--color-surface);
  border-color: var(--color-primary);
}

.search-stats {
  font-size: var(--font-size-sm);
  color: var(--color-text-muted);
}

.empty-state {
  text-align: center;
  padding: 64px 20px;
  background: var(--color-surface);
  border: 1px dashed var(--color-border-strong);
  border-radius: var(--radius-lg);
}
.empty-icon {
  font-size: 40px;
  margin-bottom: 16px;
}
.empty-state h3 {
  font-size: var(--font-size-lg);
  color: var(--color-text-primary);
  margin-bottom: 8px;
}
.empty-state p {
  color: var(--color-text-secondary);
}

.results-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: var(--card-gap);
}

.article-card {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  overflow: hidden;
  cursor: pointer;
  transition: all var(--transition-fast);
  box-shadow: var(--shadow-sm);
  display: flex;
  flex-direction: column;
}
.article-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-md);
}

.card-image {
  position: relative;
  height: 200px;
}
.card-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.card-category {
  position: absolute;
  top: 16px;
  left: 16px;
  background: rgba(15, 23, 42, 0.8);
  color: white;
  padding: 4px 12px;
  border-radius: var(--radius-sm);
  font-size: var(--font-size-xs);
  font-weight: 600;
  backdrop-filter: blur(4px);
}

.card-content {
  padding: 24px;
  display: flex;
  flex-direction: column;
  flex: 1;
}
.card-title {
  font-size: var(--font-size-lg);
  font-weight: 700;
  color: var(--color-text-primary);
  margin-bottom: 12px;
  line-height: 1.4;
}
.card-excerpt {
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
  line-height: 1.6;
  margin-bottom: 24px;
  flex: 1;
}
.card-meta {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: var(--font-size-xs);
  color: var(--color-text-muted-light);
  border-top: 1px solid var(--color-border-light);
  padding-top: 16px;
}
</style>
