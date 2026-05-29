<template>
  <DashboardLayout>
    <div class="edukasi-view">
      
      <!-- HERO SECTION (High-End Card Based) -->
      <BaseCard class="hero-card" padding="none">
        <div class="hero-inner">
          <div class="hero-content">
            <h1 class="hero-title">Pusat Edukasi PAKAR-AIR</h1>
            <p class="hero-desc">
              Tingkatkan pemahaman Anda tentang kualitas air, standar kesehatan, dan 
              teknologi sanitasi modern untuk melindungi keluarga dan lingkungan.
            </p>
          </div>
          <div class="hero-visual">
            <div class="glass-orb orb-1"></div>
            <div class="glass-orb orb-2"></div>
            <img src="https://images.unsplash.com/photo-1548839140-29a749e1cf4d?w=800&q=80" alt="Edukasi Air" class="hero-image" loading="lazy">
          </div>
        </div>
      </BaseCard>
      
      <div class="search-filter-container">
        <!-- SEARCH BAR -->
        <div class="search-wrapper">
          <div class="search-input-group">
            <Search class="search-icon" size="20" />
            <input 
              v-model="searchQuery" 
              type="text"
              placeholder="Cari artikel edukasi..."
              class="search-input"
            />
            <button v-if="searchQuery" @click="clearSearch" class="clear-btn" aria-label="Clear search">
              <X size="16" />
            </button>
          </div>
        </div>

        <!-- FILTER CHIPS -->
        <div class="filter-section">
          <button 
            @click="selectedCategory = 'Semua'"
            class="filter-chip"
            :class="{ active: selectedCategory === 'Semua' }"
          >
            Semua Topik
          </button>
          <button 
            v-for="cat in categories" 
            :key="cat"
            @click="selectedCategory = cat"
            class="filter-chip"
            :class="{ active: selectedCategory === cat }"
          >
            {{ cat }}
          </button>
        </div>
      </div>

      <!-- RESULTS INFO -->
      <div class="result-meta" v-if="searchQuery || selectedCategory !== 'Semua'">
        <p class="result-text">
          Menampilkan <strong>{{ filteredArticles.length }}</strong> artikel 
          <span v-if="searchQuery">untuk "{{ searchQuery }}"</span>
        </p>
        <button @click="resetFilters" class="btn-text" v-if="filteredArticles.length > 0">Reset Filter</button>
      </div>

      <!-- EMPTY STATE -->
      <EmptyState 
        v-if="filteredArticles.length === 0"
        :icon="FileText"
        title="Artikel Tidak Ditemukan"
        description="Maaf, tidak ada artikel edukasi yang sesuai dengan pencarian atau filter Anda."
        actionLabel="Reset Pencarian"
        @action="resetFilters"
      />

      <!-- ARTICLES GRID -->
      <div v-else class="articles-grid">
        <BaseCard 
          v-for="article in filteredArticles" 
          :key="article.id"
          class="article-card"
          padding="none"
          @click="goToArticle(article.route)"
        >
          <div class="article-image-wrap">
            <img :src="article.image" :alt="article.title" class="article-image" loading="lazy">
            <div class="article-badge">{{ article.category }}</div>
          </div>
          <div class="article-content">
            <h3 class="article-title">{{ article.title }}</h3>
            <p class="article-excerpt">{{ article.excerpt }}</p>
            <div class="article-meta">
              <div class="meta-item">
                <Calendar size="14" />
                <span>{{ article.date }}</span>
              </div>
              <div class="meta-item">
                <Clock size="14" />
                <span>{{ article.readTime }}</span>
              </div>
            </div>
            <div class="article-action">
              Baca Artikel
              <ChevronRight size="16" class="action-icon" />
            </div>
          </div>
        </BaseCard>
      </div>

      <!-- STATS SECTION -->
      <div class="stats-section">
        <BaseCard class="stat-card" padding="lg">
          <div class="stat-icon-wrap bg-primary-subtle">
            <BookOpen size="24" class="text-primary" />
          </div>
          <div class="stat-info">
            <span class="stat-value">Edukasi Dasar</span>
            <span class="stat-desc">Pemahaman parameter fundamental air.</span>
          </div>
        </BaseCard>
        <BaseCard class="stat-card" padding="lg">
          <div class="stat-icon-wrap bg-success-subtle">
            <Layers size="24" class="text-success" />
          </div>
          <div class="stat-info">
            <span class="stat-value">Dampak Lingkungan</span>
            <span class="stat-desc">Analisis bahaya pencemaran ekosistem.</span>
          </div>
        </BaseCard>
        <BaseCard class="stat-card" padding="lg">
          <div class="stat-icon-wrap bg-info-subtle">
            <Award size="24" class="text-info" />
          </div>
          <div class="stat-info">
            <span class="stat-value">Teknologi Modern</span>
            <span class="stat-desc">Inovasi filter dan pengolahan terbaru.</span>
          </div>
        </BaseCard>
      </div>

    </div>
  </DashboardLayout>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import DashboardLayout from '@/layouts/DashboardLayout.vue'
import BaseCard from '@/components/common/BaseCard.vue'
import EmptyState from '@/components/common/EmptyState.vue'
import { Search, X, Calendar, Clock, ChevronRight, FileText, BookOpen, Layers, Award } from 'lucide-vue-next'

const router = useRouter()

// DATA ARTIKEL
const articles = ref([
  {
    id: 1,
    title: 'Parameter Kualitas Air yang Perlu Diketahui',
    excerpt: 'Pelajari berbagai parameter fisika, kimia, dan biologi untuk menentukan kualitas air bersih. Lengkap dengan standar baku mutu air.',
    category: 'Edukasi Dasar',
    date: '22 Apr 2026',
    readTime: '5 mnt baca',
    image: 'https://images.unsplash.com/photo-1548839140-29a749e1cf4d?w=800&q=80',
    route: '/artikel',
    keywords: ['parameter', 'kualitas air', 'fisika', 'kimia', 'biologi', 'pH', 'kekeruhan', 'standar']
  },
  {
    id: 2,
    title: 'Dampak Pencemaran Air bagi Kesehatan dan Lingkungan',
    excerpt: 'Ketahui bahaya pencemaran air dari limbah industri, rumah tangga, dan pertanian. Serta dampaknya terhadap kesehatan dan ekosistem.',
    category: 'Kesehatan & Lingkungan',
    date: '22 Apr 2026',
    readTime: '6 mnt baca',
    image: 'https://images.unsplash.com/photo-1564424224827-cd24b8915874?w=800&q=80',
    route: '/artikel2',
    keywords: ['pencemaran', 'limbah', 'kesehatan', 'penyakit', 'diare', 'lingkungan', 'ekosistem', 'industri']
  },
  {
    id: 3,
    title: 'Teknologi Pengolahan Air Bersih dan Penerapannya di Indonesia',
    excerpt: 'Berbagai teknologi modern dan tradisional untuk mengolah air menjadi layak konsumsi. Dilengkapi rekomendasi untuk kebutuhan Anda.',
    category: 'Teknologi & Inovasi',
    date: '22 Apr 2026',
    readTime: '7 mnt baca',
    image: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=800&q=80', // Valid Unsplash ID
    route: '/artikel3',
    keywords: ['teknologi', 'pengolahan air', 'RO', 'filtrasi', 'SODIS', 'UV', 'IPAL', 'alat']
  }
])

// STATE
const searchQuery = ref('')
const selectedCategory = ref('Semua')
const categories = ['Edukasi Dasar', 'Kesehatan & Lingkungan', 'Teknologi & Inovasi']

// COMPUTED
const filteredArticles = computed(() => {
  let result = articles.value

  if (selectedCategory.value !== 'Semua') {
    result = result.filter(article => article.category === selectedCategory.value)
  }

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

// METHODS
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
.edukasi-view {
  display: flex;
  flex-direction: column;
  min-height: 100%;
}

/* High-End Hero Card */
.hero-card {
  margin-bottom: 32px;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  overflow: hidden;
  border-radius: var(--radius-xl);
}

.hero-inner {
  display: flex;
  flex-direction: column;
}

@media (min-width: 900px) {
  .hero-inner {
    flex-direction: row;
    align-items: stretch;
  }
}

.hero-content {
  padding: 48px;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.hero-title {
  font-size: var(--font-size-3xl);
  font-weight: 800;
  color: var(--color-text-primary);
  margin: 0 0 16px 0;
  line-height: 1.2;
  letter-spacing: -0.02em;
}

.hero-desc {
  font-size: 1.125rem;
  color: var(--color-text-secondary);
  line-height: 1.6;
  margin: 0;
  max-width: 500px;
}

.hero-visual {
  position: relative;
  flex: 1;
  min-height: 240px;
  background: color-mix(in srgb, var(--color-primary) 5%, transparent);
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}

@media (min-width: 900px) {
  .hero-visual { min-height: 100%; }
}

.hero-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  position: absolute;
  z-index: 2;
  mask-image: linear-gradient(to right, transparent, black 20%);
  -webkit-mask-image: linear-gradient(to right, transparent, black 20%);
}

@media (max-width: 899px) {
  .hero-image {
    mask-image: linear-gradient(to bottom, transparent, black 20%);
    -webkit-mask-image: linear-gradient(to bottom, transparent, black 20%);
  }
}

/* Glass Orbs for background decoration */
.glass-orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(40px);
  z-index: 1;
}
.orb-1 {
  width: 200px; height: 200px;
  background: color-mix(in srgb, var(--color-primary) 40%, transparent);
  top: -50px; left: -50px;
}
.orb-2 {
  width: 250px; height: 250px;
  background: color-mix(in srgb, var(--color-info) 30%, transparent);
  bottom: -80px; right: 20px;
}

/* Search & Filter */
.search-filter-container {
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-bottom: 24px;
}

@media (min-width: 768px) {
  .search-filter-container {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
}

.search-wrapper {
  width: 100%;
  max-width: 400px;
}

.search-input-group {
  position: relative;
  display: flex;
  align-items: center;
}

.search-icon {
  position: absolute;
  left: 16px;
  color: var(--color-text-muted);
}

.search-input {
  width: 100%;
  padding: 14px 16px 14px 48px;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  font-size: var(--font-size-base);
  color: var(--color-text-primary);
  transition: all 0.2s ease;
  box-shadow: var(--shadow-sm);
}

.search-input:focus {
  outline: none;
  border-color: var(--color-primary);
  box-shadow: 0 0 0 3px color-mix(in srgb, var(--color-primary) 15%, transparent);
}

.clear-btn {
  position: absolute;
  right: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  border: none;
  background: var(--color-bg);
  color: var(--color-text-muted);
  cursor: pointer;
  transition: all 0.2s;
}

.clear-btn:hover {
  background: var(--color-border);
  color: var(--color-text-primary);
}

.filter-section {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.filter-chip {
  padding: 8px 16px;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: 20px;
  font-size: var(--font-size-sm);
  font-weight: 500;
  color: var(--color-text-secondary);
  cursor: pointer;
  transition: all 0.2s ease;
}

.filter-chip:hover {
  background: var(--color-bg);
  border-color: var(--color-border-strong);
}

.filter-chip.active {
  background: var(--color-primary);
  color: white;
  border-color: var(--color-primary);
  box-shadow: var(--shadow-sm);
}

/* Result Meta */
.result-meta {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 24px;
}

.result-text {
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
  margin: 0;
}

.result-text strong {
  color: var(--color-text-primary);
}

.btn-text {
  background: none;
  border: none;
  color: var(--color-primary);
  font-size: var(--font-size-sm);
  font-weight: 600;
  cursor: pointer;
}

.btn-text:hover {
  text-decoration: underline;
}

/* Articles Grid */
.articles-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 24px;
  margin-bottom: 48px;
}

@media (min-width: 640px) {
  .articles-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1024px) {
  .articles-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

.article-card {
  display: flex;
  flex-direction: column;
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  overflow: hidden;
  border: 1px solid var(--color-border);
}

.article-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-lg);
  border-color: color-mix(in srgb, var(--color-primary) 30%, transparent);
}

.article-image-wrap {
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 9;
  overflow: hidden;
  background: var(--color-bg);
  border-bottom: 1px solid var(--color-border-light);
}

.article-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.article-card:hover .article-image {
  transform: scale(1.05);
}

.article-badge {
  position: absolute;
  top: 12px;
  right: 12px;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(4px);
  color: var(--color-text-primary);
  padding: 4px 12px;
  border-radius: var(--radius-md);
  font-size: var(--font-size-xs);
  font-weight: 700;
  box-shadow: var(--shadow-sm);
}

.article-content {
  display: flex;
  flex-direction: column;
  padding: 24px;
  flex: 1;
}

.article-title {
  font-size: var(--font-size-lg);
  font-weight: 700;
  color: var(--color-text-primary);
  margin: 0 0 8px 0;
  line-height: 1.3;
}

.article-excerpt {
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
  line-height: 1.6;
  margin: 0 0 20px 0;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  flex: 1;
}

.article-meta {
  display: flex;
  align-items: center;
  gap: 16px;
  padding-bottom: 16px;
  border-bottom: 1px solid var(--color-border-light);
  margin-bottom: 16px;
}

.meta-item {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: var(--font-size-xs);
  font-weight: 500;
  color: var(--color-text-muted);
}

.article-action {
  display: flex;
  align-items: center;
  gap: 4px;
  color: var(--color-primary);
  font-size: var(--font-size-sm);
  font-weight: 600;
  transition: gap 0.2s;
}

.article-card:hover .article-action {
  gap: 8px;
}

/* Stats Section */
.stats-section {
  display: grid;
  grid-template-columns: 1fr;
  gap: 20px;
  margin-top: auto;
}

@media (min-width: 768px) {
  .stats-section {
    grid-template-columns: repeat(3, 1fr);
  }
}

.stat-card {
  display: flex;
  align-items: center;
  gap: 16px;
  border: 1px solid var(--color-border);
}

.stat-icon-wrap {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  border-radius: var(--radius-md);
  flex-shrink: 0;
}

.bg-primary-subtle { background: color-mix(in srgb, var(--color-primary) 12%, transparent); }
.bg-success-subtle { background: color-mix(in srgb, var(--color-success) 12%, transparent); }
.bg-info-subtle { background: color-mix(in srgb, var(--color-info) 12%, transparent); }
.text-primary { color: var(--color-primary); }
.text-success { color: var(--color-success); }
.text-info { color: var(--color-info); }

.stat-info {
  display: flex;
  flex-direction: column;
}

.stat-value {
  font-size: var(--font-size-base);
  font-weight: 700;
  color: var(--color-text-primary);
  margin-bottom: 2px;
}

.stat-desc {
  font-size: var(--font-size-xs);
  color: var(--color-text-muted);
}
</style>