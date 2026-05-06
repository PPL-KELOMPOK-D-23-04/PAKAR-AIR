<template>
  <DashboardLayout>
    <div class="edukasi">

      <!-- HEADER -->
      <div class="header">
        <h1>Edukasi</h1>
        <p>Pelajari lebih lanjut tentang kualitas air dan cara memeriksanya</p>
      </div>

      <!-- SEARCH + FILTER -->
      <div class="topbar">

        <div class="search">
          <input 
            v-model="searchQuery"
            placeholder="Cari artikel, topik, atau kata kunci..."
          />
        </div>

        <button class="filter-btn">
          Filter
        </button>

      </div>

      <!-- CATEGORY -->
      <div class="category">
        <button
          v-for="cat in ['Semua', ...categories]"
          :key="cat"
          @click="selectedCategory = cat"
          :class="['chip', { active: selectedCategory === cat }]"
        >
          {{ cat }}
        </button>
      </div>

      <!-- GRID -->
      <div class="grid">

        <div
          v-for="article in filteredArticles"
          :key="article.id"
          class="card"
          @click="goToArticle(article.route)"
        >
          <!-- IMAGE -->
          <div class="card-img">
            <img :src="article.image" />
          </div>

          <!-- BODY -->
          <div class="card-body">

            <div class="card-meta">
              <span class="tag">{{ article.category }}</span>
              <span class="date">{{ article.date }}</span>
            </div>

            <h3>{{ article.title }}</h3>
            <p>{{ article.excerpt }}</p>

            <div class="card-footer">
              <span>{{ article.readTime }}</span>
              <span class="link">Baca Selengkapnya →</span>
            </div>

          </div>
        </div>

      </div>

    </div>
  </DashboardLayout>
</template>

<script setup>
import DashboardLayout from '@/layouts/DashboardLayout.vue'
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const searchQuery = ref('')
const selectedCategory = ref('Semua')

const categories = [
  'Dasar-Dasar',
  'Tips & Trik',
  'Keamanan Air',
  'Perawatan',
  'Teknologi'
]

const articles = ref([
  {
    id: 1,
    title: 'Cara Mengecek Kualitas Air Secara Sederhana',
    excerpt: 'Pelajari cara dasar mengecek kualitas air di rumah.',
    category: 'Dasar-Dasar',
    date: '15 Mar 2025',
    readTime: '5 menit baca',
    image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400',
    route: '/artikel'
  },
  {
    id: 2,
    title: 'Memahami Kategori Kualitas Air',
    excerpt: 'Perbedaan air aman, perlu perhatian, dan tercemar.',
    category: 'Keamanan Air',
    date: '10 Mar 2025',
    readTime: '7 menit baca',
    image: 'https://images.unsplash.com/photo-1501004318641-b39e6451bec6?w=400',
    route: '/artikel2'
  },
  {
    id: 3,
    title: 'Tips Menjaga Kualitas Air di Rumah',
    excerpt: 'Langkah praktis menjaga air tetap bersih.',
    category: 'Tips & Trik',
    date: '5 Mar 2025',
    readTime: '6 menit baca',
    image: 'https://images.unsplash.com/photo-1625314887424-9f1900b1a621?w=400',
    route: '/artikel3'
  }
])

const filteredArticles = computed(() => {
  let result = articles.value

  if (selectedCategory.value !== 'Semua') {
    result = result.filter(a => a.category === selectedCategory.value)
  }

  if (searchQuery.value) {
    const q = searchQuery.value.toLowerCase()
    result = result.filter(a =>
      a.title.toLowerCase().includes(q) ||
      a.excerpt.toLowerCase().includes(q)
    )
  }

  return result
})

function goToArticle(route) {
  router.push(route)
}
</script>

<style scoped>

/* ROOT */
.edukasi {
  max-width: 1100px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

/* HEADER */
.header h1 {
  font-size: 28px;
  font-weight: 700;
}

.header p {
  color: #6b7280;
  font-size: 14px;
}

/* TOPBAR */
.topbar {
  display: flex;
  gap: 12px;
}

.search {
  flex: 1;
}

.search input {
  width: 100%;
  padding: 12px 14px;
  border-radius: 12px;
  border: 1px solid #e5e7eb;
}

.filter-btn {
  padding: 12px 18px;
  border-radius: 12px;
  border: 1px solid #e5e7eb;
  background: white;
}

/* CATEGORY */
.category {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.chip {
  padding: 8px 14px;
  border-radius: 20px;
  border: 1px solid #e5e7eb;
  font-size: 13px;
}

.chip.active {
  background: #2563eb;
  color: white;
}

/* GRID */
.grid {
  display: grid;
  grid-template-columns: repeat(3,1fr);
  gap: 18px;
}

/* CARD */
.card {
  border-radius: 16px;
  overflow: hidden;
  background: white;
  border: 1px solid #e5e7eb;
  transition: all 0.2s ease;
  cursor: pointer;
}

.card:hover {
  transform: translateY(-4px);
}

/* IMAGE */
.card-img img {
  width: 100%;
  height: 150px;
  object-fit: cover;
}

/* BODY */
.card-body {
  padding: 14px;
}

.card-meta {
  display: flex;
  justify-content: space-between;
  font-size: 12px;
}

.tag {
  background: #e0edff;
  padding: 4px 8px;
  border-radius: 8px;
}

.card h3 {
  font-size: 15px;
  margin: 8px 0;
}

.card p {
  font-size: 13px;
  color: #6b7280;
}

.card-footer {
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
  font-size: 12px;
}

.link {
  color: #2563eb;
}

</style>