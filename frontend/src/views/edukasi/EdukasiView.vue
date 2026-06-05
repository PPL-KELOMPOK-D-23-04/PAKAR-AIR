<template>
  <DashboardLayout>
    <div class="edukasi-view">
      
      <!-- HERO SECTION -->
      <BaseCard class="hero-card" padding="none">
        <div class="hero-inner">
          <div class="hero-content">
            <div class="hero-eyebrow">
              <span class="eyebrow-dot"></span>
              Pusat Pengetahuan
            </div>
            <h1 class="hero-title">Edukasi <br><span class="hero-title-accent">PAKAR-AIR</span></h1>
            <p class="hero-desc">
              Tingkatkan pemahaman Anda tentang kualitas air, standar kesehatan, dan 
              teknologi sanitasi modern untuk melindungi keluarga dan lingkungan.
            </p>
            <div class="hero-pills">
              <span class="hero-pill">💧 Kualitas Air</span>
              <span class="hero-pill">🔬 Teknologi</span>
              <span class="hero-pill">♻️ Lingkungan</span>
            </div>
          </div>
          <div class="hero-visual">
            <div class="glass-orb orb-1"></div>
            <div class="glass-orb orb-2"></div>
            <img 
              src="https://images.unsplash.com/photo-1614027164847-1b28cfe1df60?w=900&q=85&auto=format&fit=crop" 
              alt="Edukasi Air Bersih" 
              class="hero-image" 
              loading="lazy"
            >
            <div class="hero-image-overlay"></div>
          </div>
        </div>
      </BaseCard>
      
      <div class="search-filter-container">
        <!-- SEARCH BAR -->
        <div class="search-wrapper">
          <div class="search-input-group">
            <Search class="search-icon" size="18" />
            <input 
              v-model="searchQuery" 
              type="text"
              placeholder="Cari artikel edukasi..."
              class="search-input"
            />
            <button v-if="searchQuery" @click="clearSearch" class="clear-btn" aria-label="Clear search">
              <X size="14" />
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
          v-for="(article, index) in filteredArticles" 
          :key="article.id"
          class="article-card"
          padding="lg"
          @click="goToArticle(article.route)"
        >
          <div class="article-header">
            <div class="article-badge" :class="`badge--${article.categoryKey}`">
              <span class="badge-dot"></span>
              {{ article.category }}
            </div>
            <div class="article-time">
              <Clock size="12" />
              {{ article.readTime }}
            </div>
          </div>

          <h3 class="article-title">{{ article.title }}</h3>
          <p class="article-excerpt">{{ article.excerpt }}</p>
          
          <div class="article-footer">
            <div class="article-date">
              <Calendar size="12" />
              <span>{{ article.date }}</span>
            </div>
            <div class="article-action">
              Baca Selengkapnya
              <span class="action-arrow">
                <ChevronRight size="14" />
              </span>
            </div>
          </div>
        </BaseCard>
      </div>

      <!-- STATS SECTION -->
      <div class="stats-section">
        <div class="stat-card">
          <div class="stat-icon-wrap bg-primary-subtle">
            <BookOpen size="24" class="text-primary" />
          </div>
          <div class="stat-info">
            <span class="stat-value">Edukasi Dasar</span>
            <span class="stat-desc">Pemahaman parameter fundamental air.</span>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-icon-wrap bg-success-subtle">
            <Layers size="24" class="text-success" />
          </div>
          <div class="stat-info">
            <span class="stat-value">Dampak Lingkungan</span>
            <span class="stat-desc">Analisis bahaya pencemaran ekosistem.</span>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-icon-wrap bg-info-subtle">
            <Award size="24" class="text-info" />
          </div>
          <div class="stat-info">
            <span class="stat-value">Teknologi Modern</span>
            <span class="stat-desc">Inovasi filter dan pengolahan terbaru.</span>
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
import BaseCard from '@/components/common/BaseCard.vue'
import EmptyState from '@/components/common/EmptyState.vue'
import { Search, X, Calendar, Clock, ChevronRight, FileText, BookOpen, Layers, Award } from 'lucide-vue-next'

const router = useRouter()

// DATA ARTIKEL - Gambar dari Unsplash (query spesifik, format modern)
const articles = ref([
  {
    id: 1,
    title: 'Parameter Kualitas Air yang Perlu Diketahui',
    excerpt: 'Pelajari berbagai parameter fisika, kimia, dan biologi untuk menentukan kualitas air bersih. Lengkap dengan standar baku mutu air Indonesia.',
    category: 'Edukasi Dasar',
    categoryKey: 'edukasi',
    date: '22 Apr 2026',
    readTime: '5 mnt baca',
    // Water testing / laboratory water quality
    image: 'https://images.unsplash.com/photo-1628191013085-990d39ec1571?w=700&q=85&auto=format&fit=crop',
    route: '/artikel',
    keywords: ['parameter', 'kualitas air', 'fisika', 'kimia', 'biologi', 'pH', 'kekeruhan', 'standar']
  },
  {
    id: 2,
    title: 'Dampak Pencemaran Air bagi Kesehatan dan Lingkungan',
    excerpt: 'Ketahui bahaya pencemaran air dari limbah industri, rumah tangga, dan pertanian. Serta dampaknya terhadap kesehatan dan ekosistem.',
    category: 'Kesehatan & Lingkungan',
    categoryKey: 'kesehatan',
    date: '22 Apr 2026',
    readTime: '6 mnt baca',
    // Industrial water pollution / river contamination
    image: 'https://images.unsplash.com/photo-1611273426858-450d8e3c9fce?w=700&q=85&auto=format&fit=crop',
    route: '/artikel2',
    keywords: ['pencemaran', 'limbah', 'kesehatan', 'penyakit', 'diare', 'lingkungan', 'ekosistem', 'industri']
  },
  {
    id: 3,
    title: 'Teknologi Pengolahan Air Bersih dan Penerapannya di Indonesia',
    excerpt: 'Berbagai teknologi modern dan tradisional untuk mengolah air menjadi layak konsumsi. Dilengkapi rekomendasi untuk kebutuhan rumah tangga dan industri.',
    category: 'Teknologi & Inovasi',
    categoryKey: 'teknologi',
    date: '22 Apr 2026',
    readTime: '7 mnt baca',
    // Water treatment / filtration technology
    image: 'https://images.unsplash.com/photo-1581244277943-fe4a9c777189?w=700&q=85&auto=format&fit=crop',
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
const clearSearch = () => { searchQuery.value = '' }
const resetFilters = () => { searchQuery.value = ''; selectedCategory.value = 'Semua' }
const goToArticle = (route) => { router.push(route) }
</script>

<style scoped>
.edukasi-view {
  display: flex;
  flex-direction: column;
  min-height: 100%;
}

/* ─── HERO ─────────────────────────────────────────────── */
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
  .hero-inner { flex-direction: row; align-items: stretch; }
}

.hero-content {
  padding: 48px;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 0;
}

.hero-eyebrow {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: var(--font-size-xs);
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--color-primary);
  margin-bottom: 16px;
}

.eyebrow-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--color-primary);
  display: inline-block;
}

.hero-title {
  font-size: var(--font-size-3xl);
  font-weight: 800;
  color: var(--color-text-primary);
  margin: 0 0 16px 0;
  line-height: 1.15;
  letter-spacing: -0.03em;
}

.hero-title-accent {
  color: var(--color-primary);
}

.hero-desc {
  font-size: 1.0625rem;
  color: var(--color-text-secondary);
  line-height: 1.65;
  margin: 0 0 24px 0;
  max-width: 480px;
}

.hero-pills {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.hero-pill {
  padding: 6px 14px;
  background: color-mix(in srgb, var(--color-primary) 8%, transparent);
  border: 1px solid color-mix(in srgb, var(--color-primary) 20%, transparent);
  border-radius: 20px;
  font-size: var(--font-size-xs);
  font-weight: 600;
  color: var(--color-primary);
}

.hero-visual {
  position: relative;
  flex: 1;
  min-height: 260px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  background: color-mix(in srgb, var(--color-primary) 6%, transparent);
}

@media (min-width: 900px) { .hero-visual { min-height: 100%; } }

.hero-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  position: absolute;
  z-index: 2;
  mask-image: linear-gradient(to right, transparent 0%, black 28%);
  -webkit-mask-image: linear-gradient(to right, transparent 0%, black 28%);
  transition: transform 0.6s ease;
}

.hero-card:hover .hero-image {
  transform: scale(1.03);
}

@media (max-width: 899px) {
  .hero-image {
    mask-image: linear-gradient(to bottom, transparent 0%, black 28%);
    -webkit-mask-image: linear-gradient(to bottom, transparent 0%, black 28%);
  }
}

.hero-image-overlay {
  position: absolute;
  inset: 0;
  z-index: 3;
  background: linear-gradient(135deg, 
    color-mix(in srgb, var(--color-primary) 12%, transparent) 0%, 
    transparent 60%
  );
  pointer-events: none;
}

.glass-orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(50px);
  z-index: 1;
}
.orb-1 {
  width: 220px; height: 220px;
  background: color-mix(in srgb, var(--color-primary) 35%, transparent);
  top: -60px; left: -60px;
}
.orb-2 {
  width: 280px; height: 280px;
  background: color-mix(in srgb, var(--color-info) 25%, transparent);
  bottom: -90px; right: 10px;
}

/* ─── SEARCH & FILTER ──────────────────────────────────── */
.search-filter-container {
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-bottom: 24px;
}

@media (min-width: 768px) {
  .search-filter-container {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
}

.search-wrapper { width: 100%; max-width: 380px; }

.search-input-group {
  position: relative;
  display: flex;
  align-items: center;
}

.search-icon {
  position: absolute;
  left: 14px;
  color: var(--color-text-muted);
  pointer-events: none;
}

.search-input {
  width: 100%;
  padding: 12px 14px 12px 44px;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  font-size: var(--font-size-sm);
  color: var(--color-text-primary);
  transition: all 0.2s ease;
  box-shadow: var(--shadow-sm);
}

.search-input:focus {
  outline: none;
  border-color: var(--color-primary);
  box-shadow: 0 0 0 3px color-mix(in srgb, var(--color-primary) 15%, transparent);
}

.search-input::placeholder { color: var(--color-text-muted); }

.clear-btn {
  position: absolute;
  right: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 26px;
  height: 26px;
  border-radius: 50%;
  border: none;
  background: var(--color-bg);
  color: var(--color-text-muted);
  cursor: pointer;
  transition: all 0.15s;
}

.clear-btn:hover { background: var(--color-border); color: var(--color-text-primary); }

.filter-section { display: flex; flex-wrap: wrap; gap: 8px; }

.filter-chip {
  padding: 7px 16px;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: 20px;
  font-size: var(--font-size-xs);
  font-weight: 600;
  color: var(--color-text-secondary);
  cursor: pointer;
  transition: all 0.2s ease;
  letter-spacing: 0.01em;
}

.filter-chip:hover { background: var(--color-bg); border-color: var(--color-border-strong); }

.filter-chip.active {
  background: var(--color-primary);
  color: white;
  border-color: var(--color-primary);
  box-shadow: 0 2px 8px color-mix(in srgb, var(--color-primary) 35%, transparent);
}

/* ─── RESULT META ──────────────────────────────────────── */
.result-meta {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 24px;
}

.result-text { font-size: var(--font-size-sm); color: var(--color-text-secondary); margin: 0; }
.result-text strong { color: var(--color-text-primary); }

.btn-text {
  background: none;
  border: none;
  color: var(--color-primary);
  font-size: var(--font-size-sm);
  font-weight: 600;
  cursor: pointer;
}
.btn-text:hover { text-decoration: underline; }

/* ─── ARTICLES GRID ────────────────────────────────────── */
.articles-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 24px;
  margin-bottom: 48px;
}

@media (min-width: 640px) { .articles-grid { grid-template-columns: repeat(2, 1fr); } }
@media (min-width: 1024px) { .articles-grid { grid-template-columns: repeat(3, 1fr); } }

.article-card {
  display: flex;
  flex-direction: column;
  cursor: pointer;
  transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.3s ease;
  overflow: hidden;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-xl);
  background: var(--color-surface);
  position: relative;
  z-index: 1;
}

.article-card::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, color-mix(in srgb, var(--color-primary) 3%, transparent) 0%, transparent 100%);
  opacity: 0;
  transition: opacity 0.3s ease;
  z-index: -1;
  pointer-events: none;
}

.article-card:hover {
  transform: translateY(-6px);
  box-shadow: 
    0 16px 40px color-mix(in srgb, var(--color-primary) 12%, transparent),
    0 4px 12px rgba(0,0,0,0.04);
  border-color: color-mix(in srgb, var(--color-primary) 25%, transparent);
}

.article-card:hover::before {
  opacity: 1;
}

/* Header (Badge & Time) */
.article-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
}

.article-badge {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.03em;
}

.badge--edukasi {
  background: color-mix(in srgb, var(--color-primary) 10%, transparent);
  color: var(--color-primary);
}

.badge--kesehatan {
  background: color-mix(in srgb, var(--color-success) 10%, transparent);
  color: var(--color-success);
}

.badge--teknologi {
  background: color-mix(in srgb, var(--color-info) 10%, transparent);
  color: var(--color-info);
}

.badge-dot {
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: currentColor;
  flex-shrink: 0;
}

.article-time {
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 12px;
  font-weight: 500;
  color: var(--color-text-muted);
}

/* Typography */
.article-title {
  font-size: 1.125rem;
  font-weight: 700;
  color: var(--color-text-primary);
  margin: 0 0 12px 0;
  line-height: 1.4;
  letter-spacing: -0.01em;
  transition: color 0.2s;
}

.article-card:hover .article-title {
  color: var(--color-primary);
}

.article-excerpt {
  font-size: 0.9375rem;
  color: var(--color-text-secondary);
  line-height: 1.65;
  margin: 0 0 24px 0;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  flex: 1;
}

/* Footer */
.article-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 14px;
  border-top: 1px solid var(--color-border-light);
  margin-top: auto;
}

.article-date {
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: var(--font-size-xs);
  color: var(--color-text-muted);
  font-weight: 500;
}

.article-action {
  display: flex;
  align-items: center;
  gap: 4px;
  color: var(--color-primary);
  font-size: var(--font-size-xs);
  font-weight: 700;
  letter-spacing: 0.01em;
}

.action-arrow {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 22px;
  height: 22px;
  border-radius: 50%;
  background: color-mix(in srgb, var(--color-primary) 10%, transparent);
  transition: background 0.2s, transform 0.2s;
}

.article-card:hover .action-arrow {
  background: color-mix(in srgb, var(--color-primary) 18%, transparent);
  transform: translateX(3px);
}

/* ─── STATS SECTION ────────────────────────────────────── */
.stats-section {
  display: grid;
  grid-template-columns: 1fr;
  gap: 16px;
  margin-top: auto;
}

@media (min-width: 768px) { .stats-section { grid-template-columns: repeat(3, 1fr); } }

.stat-card {
  display: flex;
  align-items: center;
  gap: 18px;
  padding: 22px 24px;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-xl);
  background: var(--color-surface);
  transition: transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease;
}

.stat-card:hover {
  transform: translateY(-3px);
  border-color: color-mix(in srgb, var(--color-primary) 30%, transparent);
  box-shadow: 0 12px 24px -8px rgba(0, 0, 0, 0.08);
}

.stat-icon-wrap {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 54px;
  height: 54px;
  border-radius: var(--radius-lg);
  flex-shrink: 0;
  transition: transform 0.25s ease;
}

.stat-card:hover .stat-icon-wrap {
  transform: scale(1.05);
}

.bg-primary-subtle { background: color-mix(in srgb, var(--color-primary) 12%, transparent); }
.bg-success-subtle { background: color-mix(in srgb, var(--color-success) 12%, transparent); }
.bg-info-subtle    { background: color-mix(in srgb, var(--color-info) 12%, transparent); }
.text-primary { color: var(--color-primary); }
.text-success { color: var(--color-success); }
.text-info    { color: var(--color-info); }

.stat-info { display: flex; flex-direction: column; gap: 4px; }

.stat-value {
  font-size: 1rem;
  font-weight: 700;
  color: var(--color-text-primary);
  letter-spacing: -0.01em;
}

.stat-desc {
  font-size: 0.875rem;
  color: var(--color-text-secondary);
  line-height: 1.45;
}
</style>