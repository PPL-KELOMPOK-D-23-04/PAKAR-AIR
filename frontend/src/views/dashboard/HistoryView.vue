<template>
  <DashboardLayout>
    <div class="history-view">
      <!-- Page Header -->
      <div class="page-header">
        <h1 class="page-header__title">Riwayat Analisis</h1>
        <p class="page-header__desc">
          Daftar hasil analisis kualitas air yang telah Anda lakukan sebelumnya.
        </p>
      </div>

      <!-- Filter Bar -->
      <div class="filter-bar">
        <!-- Search -->
        <div class="filter-item filter-item--search">
          <svg class="filter-icon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
          </svg>
          <input
            v-model="searchQuery"
            type="text"
            class="filter-input"
            placeholder="Cari sumber air..."
            @input="handleFilter"
          />
        </div>

        <!-- Kategori -->
        <div class="filter-item">
          <select v-model="filterCategory" class="filter-select" @change="handleFilter">
            <option value="">Semua Kategori</option>
            <option value="layak">Layak</option>
            <option value="tidak_layak">Tidak Layak</option>
          </select>
        </div>

        <!-- Tanggal -->
        <div class="filter-item">
          <input
            v-model="filterDate"
            type="date"
            class="filter-input filter-input--date"
            @change="handleFilter"
          />
        </div>

        <!-- Reset -->
        <button
          v-if="searchQuery || filterCategory || filterDate"
          class="btn btn--secondary filter-reset"
          @click="resetFilter"
        >
          Reset
        </button>
      </div>

      <!-- Loading State -->
      <div v-if="loading" class="loading-state">
        <div class="spinner"></div>
        <p>Memuat riwayat...</p>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="error-state">
        <p>{{ error }}</p>
        <button @click="fetchHistory" class="btn btn--secondary">Coba Lagi</button>
      </div>

      <!-- Empty State -->
      <div v-else-if="history.length === 0" class="empty-state">
        <div class="empty-icon">📊</div>
        <h3>Belum Ada Riwayat</h3>
        <p>Anda belum pernah melakukan analisis kualitas air.</p>
        <router-link to="/analysis" class="btn btn--primary">Mulai Analisis Pertama</router-link>
      </div>

      <!-- History List -->
      <div v-else class="history-list">
        <div v-for="item in history" :key="item.id" class="history-card" @click="viewDetail(item.id)">
          <div class="history-card__image">
            <img v-if="item.image_path" :src="item.image_path" alt="Sampel air" />
            <div v-else class="no-image">No Image</div>
          </div>
          <div class="history-card__info">
            <div class="history-card__top">
              <span class="history-card__date">{{ formatDate(item.created_at) }}</span>
              <span class="status-badge" :class="'status--' + item.category">
                {{ item.category === 'layak' ? 'Layak' : 'Tidak Layak' }}
              </span>
            </div>
            <h3 class="history-card__title">{{ item.water_source || 'Sumber Tidak Diketahui' }}</h3>
            <p class="history-card__desc">Warna: {{ item.water_color || '-' }}</p>
          </div>
          <div class="history-card__action">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>

        <!-- Pagination (Simple) -->
        <div v-if="totalPages > 1" class="pagination">
          <button :disabled="currentPage === 1" @click="currentPage--" class="btn btn--secondary">Prev</button>
          <span>Halaman {{ currentPage }} dari {{ totalPages }}</span>
          <button :disabled="currentPage === totalPages" @click="currentPage++" class="btn btn--secondary">Next</button>
        </div>
      </div>
    </div>
  </DashboardLayout>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import DashboardLayout from '@/layouts/DashboardLayout.vue'
import { getAnalysisHistory } from '@/api/analysis'

const router = useRouter()
const history = ref([])
const loading = ref(true)
const error = ref(null)
const currentPage = ref(1)
const totalPages = ref(1)

// Filter state
const searchQuery = ref('')
const filterCategory = ref('')
const filterDate = ref('')

async function fetchHistory() {
  loading.value = true
  error.value = null
  try {
    const data = await getAnalysisHistory(currentPage.value, {
      search: searchQuery.value || undefined,
      category: filterCategory.value || undefined,
      date: filterDate.value || undefined,
    })
    history.value = data.items
    totalPages.value = data.total_pages
  } catch (err) {
    error.value = 'Gagal memuat riwayat analisis. Silakan coba lagi.'
    console.error(err)
  } finally {
    loading.value = false
  }
}

function handleFilter() {
  currentPage.value = 1
  fetchHistory()
}

function resetFilter() {
  searchQuery.value = ''
  filterCategory.value = ''
  filterDate.value = ''
  handleFilter()
}

function viewDetail(id) {
  // logic to view detail, maybe navigate to result page?
  // for now just stay here or alert
  console.log('View detail:', id)
}

function formatDate(dateStr) {
  const d = new Date(dateStr)
  return d.toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

watch(currentPage, fetchHistory)

onMounted(fetchHistory)
</script>

<style scoped>
.history-view {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.page-header { margin-bottom: 8px; }
.page-header__title { font-size: 22px; font-weight: 700; color: #1a202c; margin-bottom: 4px; }
.page-header__desc { font-size: 14px; color: #64748b; }

.history-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.history-card {
  display: flex;
  align-items: center;
  background: #fff;
  border: 1px solid #e2e8f0;
  border-radius: 10px;
  padding: 12px;
  gap: 16px;
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;
}

.history-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0,0,0,0.05);
}

.history-card__image {
  width: 80px;
  height: 80px;
  border-radius: 8px;
  overflow: hidden;
  background: #f1f5f9;
  flex-shrink: 0;
}

.history-card__image img { width: 100%; height: 100%; object-fit: cover; }
.no-image { display: flex; align-items: center; justify-content: center; height: 100%; font-size: 10px; color: #94a3b8; }

.history-card__info { flex: 1; min-width: 0; }
.history-card__top { display: flex; align-items: center; justify-content: space-between; margin-bottom: 4px; }
.history-card__date { font-size: 12px; color: #94a3b8; }

.status-badge {
  font-size: 10px;
  font-weight: 700;
  padding: 2px 8px;
  border-radius: 12px;
  text-transform: uppercase;
}
.status--layak { background: #dcfce7; color: #16a34a; }
.status--tidak_layak { background: #fee2e2; color: #dc2626; }

.history-card__title { font-size: 15px; font-weight: 600; color: #1a202c; margin-bottom: 2px; }
.history-card__desc { font-size: 13px; color: #64748b; }

.history-card__action { color: #cbd5e1; }

.pagination {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  margin-top: 20px;
  font-size: 14px;
}

.loading-state, .empty-state, .error-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px 20px;
  text-align: center;
  background: #fff;
  border-radius: 12px;
  border: 1px dashed #cbd5e1;
}

.empty-icon { font-size: 48px; margin-bottom: 16px; }
.empty-state h3 { font-size: 18px; font-weight: 600; color: #1a202c; margin-bottom: 8px; }
.empty-state p { font-size: 14px; color: #64748b; margin-bottom: 20px; }

.spinner {
  width: 30px;
  height: 30px;
  border: 3px solid #f3f3f3;
  border-top: 3px solid #3b82f6;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 12px;
}

@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }

.btn {
  padding: 8px 16px;
  font-size: 14px;
  font-weight: 600;
  border-radius: 6px;
  cursor: pointer;
  border: 1px solid transparent;
}
.btn--primary { background: #3b82f6; color: #fff; text-decoration: none; }
.btn--secondary { background: #fff; border-color: #e2e8f0; color: #64748b; }
.btn--secondary:disabled { opacity: 0.5; cursor: not-allowed; }

/* ===== Filter Bar ===== */
.filter-bar {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 10px;
  background: #fff;
  border: 1px solid #e2e8f0;
  border-radius: 10px;
  padding: 12px 16px;
}

.filter-item {
  display: flex;
  align-items: center;
  position: relative;
}

.filter-item--search {
  flex: 1;
  min-width: 180px;
}

.filter-icon {
  position: absolute;
  left: 10px;
  color: #94a3b8;
  pointer-events: none;
  flex-shrink: 0;
}

.filter-input {
  width: 100%;
  padding: 8px 12px 8px 34px;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  font-size: 13px;
  color: #1a202c;
  background: #f8fafc;
  transition: border-color 0.2s, box-shadow 0.2s;
  outline: none;
}

.filter-input:focus {
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  background: #fff;
}

.filter-input--date {
  padding-left: 12px;
  cursor: pointer;
}

.filter-select {
  padding: 8px 32px 8px 12px;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  font-size: 13px;
  color: #1a202c;
  background: #f8fafc;
  appearance: none;
  -webkit-appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' fill='none' viewBox='0 0 24 24' stroke='%2394a3b8'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 10px center;
  cursor: pointer;
  outline: none;
  transition: border-color 0.2s, box-shadow 0.2s;
}

.filter-select:focus {
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  background-color: #fff;
}

.filter-reset {
  font-size: 13px;
  padding: 8px 14px;
  white-space: nowrap;
  color: #ef4444;
  border-color: #fca5a5;
}

.filter-reset:hover {
  background: #fef2f2;
}
</style>
