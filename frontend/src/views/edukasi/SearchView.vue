<template>
  <div class="search-container">
    <div class="search-header">
      <router-link to="/education" class="back-button">
        ← Kembali ke Edukasi
      </router-link>
      <h1>Cari Artikel Edukasi</h1>
      <div class="search-box">
        <input
          v-model="searchTerm"
          type="text"
          placeholder="Cari artikel tentang kualitas air, pencemaran, teknologi..."
          class="search-input"
          autofocus
        />
      </div>
    </div>

    <div v-if="searchTerm" class="search-results">
      <p class="result-count">
        Menampilkan <strong>{{ filteredArticles.length }}</strong> hasil untuk 
        <strong>"{{ searchTerm }}"</strong>
      </p>

      <div v-if="filteredArticles.length === 0" class="no-results">
        <div class="no-results-icon">🔍</div>
        <h3>Tidak ada artikel yang ditemukan</h3>
        <p>Coba dengan kata kunci lain</p>
        <router-link to="/education" class="reset-link">Lihat Semua Artikel</router-link>
      </div>

      <div v-else class="articles-grid">
        <div
          v-for="article in filteredArticles"
          :key="article.id"
          class="article-card"
          @click="goToArticle(article.route)"
        >
          <div class="card-category">{{ article.category }}</div>
          <h3 class="card-title">{{ article.title }}</h3>
          <p class="card-excerpt">{{ article.excerpt }}</p>
          <div class="card-meta">
            <span>📅 {{ article.date }}</span>
            <span>⏱️ {{ article.readTime }}</span>
          </div>
          <div class="read-more">Baca selengkapnya →</div>
        </div>
      </div>
    </div>

    <div v-else class="empty-state">
      <div class="empty-icon">🔍</div>
      <h3>Mulai Mencari</h3>
      <p>Masukkan kata kunci untuk mencari artikel edukasi</p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const searchTerm = ref('')

const articles = [
  {
    id: 1,
    title: 'Parameter Kualitas Air yang Perlu Diketahui',
    excerpt: 'Pelajari berbagai parameter fisika, kimia, dan biologi untuk menentukan kualitas air bersih. Lengkap dengan standar baku mutu air.',
    category: 'Edukasi Dasar',
    date: '22 April 2026',
    readTime: '5 menit',
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
    route: '/artikel3',
    keywords: ['teknologi', 'pengolahan air', 'RO', 'filtrasi', 'SODIS', 'UV', 'IPAL', 'alat']
  }
]

const filteredArticles = computed(() => {
  if (!searchTerm.value.trim()) return []
  const query = searchTerm.value.toLowerCase()
  return articles.filter(article =>
    article.title.toLowerCase().includes(query) ||
    article.excerpt.toLowerCase().includes(query) ||
    article.keywords.some(keyword => keyword.toLowerCase().includes(query))
  )
})

const goToArticle = (route) => {
  router.push(route)
}
</script>

<style scoped>
.search-container {
  max-width: 1000px;
  margin: 0 auto;
  padding: 40px 24px;
  min-height: calc(100vh - 200px);
}

.search-header {
  text-align: center;
  margin-bottom: 40px;
}

.back-button {
  display: inline-block;
  color: #2c7da0;
  text-decoration: none;
  margin-bottom: 20px;
  font-size: 14px;
}

.back-button:hover {
  text-decoration: underline;
}

.search-header h1 {
  font-size: 32px;
  font-weight: 700;
  color: #0f172a;
  margin-bottom: 24px;
}

.search-box {
  max-width: 600px;
  margin: 0 auto;
}

.search-input {
  width: 100%;
  padding: 14px 20px;
  font-size: 16px;
  border: 2px solid #e2e8f0;
  border-radius: 50px;
  outline: none;
  transition: all 0.2s;
}

.search-input:focus {
  border-color: #2c7da0;
  box-shadow: 0 0 0 3px rgba(44, 125, 160, 0.1);
}

.result-count {
  margin-bottom: 24px;
  padding-bottom: 12px;
  border-bottom: 1px solid #eef2f5;
  color: #64748b;
}

.articles-grid {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.article-card {
  background: white;
  padding: 24px;
  border-radius: 20px;
  border: 1px solid #eef2f5;
  cursor: pointer;
  transition: all 0.2s;
}

.article-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.06);
  border-color: #2c7da0;
}

.card-category {
  display: inline-block;
  font-size: 11px;
  font-weight: 600;
  padding: 4px 12px;
  background: #eef2ff;
  color: #2c7da0;
  border-radius: 30px;
  margin-bottom: 12px;
}

.card-title {
  font-size: 18px;
  font-weight: 600;
  color: #0f172a;
  margin-bottom: 8px;
}

.card-excerpt {
  font-size: 14px;
  color: #475569;
  line-height: 1.5;
  margin-bottom: 12px;
}

.card-meta {
  display: flex;
  gap: 16px;
  font-size: 12px;
  color: #94a3b8;
  margin-bottom: 12px;
}

.read-more {
  color: #2c7da0;
  font-size: 13px;
  font-weight: 500;
}

.no-results, .empty-state {
  text-align: center;
  padding: 60px 20px;
}

.no-results-icon, .empty-icon {
  font-size: 64px;
  margin-bottom: 20px;
}

.no-results h3, .empty-state h3 {
  font-size: 20px;
  color: #0f172a;
  margin-bottom: 8px;
}

.no-results p, .empty-state p {
  color: #64748b;
}

.reset-link {
  display: inline-block;
  margin-top: 20px;
  padding: 10px 24px;
  background: #2c7da0;
  color: white;
  text-decoration: none;
  border-radius: 40px;
  font-size: 14px;
}

.reset-link:hover {
  background: #1b5a7a;
}
</style>