<template>
  <DashboardLayout>
    <div class="history-view">

      <!-- Page Header -->
      <div class="page-header">
        <div class="page-header__left">
          <h1 class="page-header__title">Riwayat Analisis</h1>
          <p class="page-header__desc">Daftar hasil analisis kualitas air yang telah Anda lakukan sebelumnya.</p>
        </div>
        <div class="page-header__right" v-if="!loading && !error">
          <span class="total-badge">{{ totalItems }} Analisis</span>
          <button class="btn-export" @click="showExportModal = true" :disabled="totalItems === 0">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="none"
              viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round"
                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Ekspor
          </button>
        </div>
      </div>

      <!-- Export Modal -->
      <ExportModal
        v-if="showExportModal"
        :total-items="totalItems"
        :active-filters="{ search: searchQuery, category: filterCategory, date: filterDate }"
        @close="showExportModal = false"
      />

      <!-- Filter Bar -->
      <div class="filter-bar">
        <!-- Search -->
        <!-- NOTE: Search hanya bekerja untuk data water_source yang tersimpan di backend.
             Label fallback "Analisis #N" adalah label frontend saja dan tidak bisa dicari. -->
        <div class="filter-item filter-item--search">
          <svg class="filter-icon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
          </svg>
          <input
            v-model="searchQuery"
            type="text"
            class="filter-input"
            placeholder="Cari riwayat analisis..."
            @input="handleFilter"
          />
        </div>

        <!-- Kategori -->
        <div class="filter-item">
          <select v-model="filterCategory" class="filter-select" @change="handleFilter">
            <option value="">Semua Kategori</option>
            <option value="layak">✅ Layak</option>
            <option value="tidak_layak">❌ Tidak Layak</option>
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
          class="btn-reset"
          @click="resetFilter"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
          Reset
        </button>
      </div>

      <!-- Loading State -->
      <div v-if="loading" class="state-box">
        <div class="spinner"></div>
        <p class="state-text">Memuat riwayat...</p>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="state-box state-box--error">
        <div class="state-icon">⚠️</div>
        <p class="state-text">{{ error }}</p>
        <button @click="fetchHistory" class="btn btn--secondary">Coba Lagi</button>
      </div>

      <!-- Empty State -->
      <div v-else-if="history.length === 0" class="state-box">
        <div class="state-icon">📊</div>
        <h3 class="state-title">
          {{ searchQuery || filterCategory || filterDate ? 'Tidak Ada Hasil' : 'Belum Ada Riwayat' }}
        </h3>
        <p class="state-text">
          {{ searchQuery || filterCategory || filterDate
            ? 'Coba ubah filter pencarian Anda.'
            : 'Anda belum pernah melakukan analisis kualitas air.' }}
        </p>
        <router-link v-if="!searchQuery && !filterCategory && !filterDate" to="/analysis" class="btn btn--primary">
          Mulai Analisis Pertama
        </router-link>
        <button v-else @click="resetFilter" class="btn btn--secondary">Reset Filter</button>
      </div>

      <!-- History List -->
      <div v-else class="history-list">
        <div
          v-for="(item, index) in history"
          :key="item.id"
          class="history-card"
          :class="item.category === 'layak' ? 'history-card--layak' : 'history-card--tidak'"
          @click="viewDetail(item.id)"
        >
          <!-- Nomor urut -->
          <div class="history-card__number">
            {{ totalItems - (currentPage - 1) * 10 - index }}
          </div>

          <!-- Image -->
          <div class="history-card__image">
            <img v-if="item.image_path" :src="item.image_path" alt="Sampel air" />
            <div v-else class="no-image">
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
          </div>

          <!-- Info -->
          <div class="history-card__info">
            <div class="history-card__top">
              <h3 class="history-card__title">
                {{ item.original_filename || `Analisis #${totalItems - (currentPage - 1) * 10 - index}` }}
              </h3>
              <span class="status-badge" :class="'status--' + item.category">
                {{ item.category === 'layak' ? '✅ Layak' : '❌ Tidak Layak' }}
              </span>
            </div>

            <!-- Meta info -->
            <div class="history-card__meta">
              <span class="meta-item">
                <svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                {{ formatDate(item.created_at) }}
              </span>
              <span v-if="item.water_color" class="meta-item">🎨 {{ item.water_color }}</span>
              <span v-if="item.ph" class="meta-item">⚗️ pH {{ item.ph }}</span>
            </div>

            <!-- Confidence bar -->
            <div v-if="item.confidence != null" class="confidence-row">
              <span class="confidence-label">Kepercayaan model</span>
              <div class="confidence-track">
                <div
                  class="confidence-fill"
                  :class="item.category === 'layak' ? 'confidence-fill--layak' : 'confidence-fill--tidak'"
                  :style="{ width: (item.confidence * 100).toFixed(0) + '%' }"
                ></div>
              </div>
              <span class="confidence-value">{{ (item.confidence * 100).toFixed(0) }}%</span>
            </div>
          </div>

          <!-- Arrow -->
          <div class="history-card__action">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>

        <!-- Pagination -->
        <div v-if="totalPages > 1" class="pagination">
          <button :disabled="currentPage === 1" @click="currentPage--" class="btn btn--secondary pagination-btn">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
            </svg>
            Prev
          </button>
          <div class="pagination-pages">
            <span
              v-for="page in totalPages"
              :key="page"
              class="pagination-dot"
              :class="{ active: page === currentPage }"
              @click="currentPage = page"
            ></span>
          </div>
          <button :disabled="currentPage === totalPages" @click="currentPage++" class="btn btn--secondary pagination-btn">
            Next
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

    </div>
  </DashboardLayout>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import DashboardLayout from '@/layouts/DashboardLayout.vue'
import ExportModal from '@/components/analysis/ExportModal.vue'
import { getAnalysisHistory } from '@/api/analysis'

const router = useRouter()
const history = ref([])
const loading = ref(true)
const error = ref(null)
const currentPage = ref(1)
const totalPages = ref(1)
const totalItems = ref(0)
const showExportModal = ref(false)

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
    totalItems.value = data.total ?? data.items.length
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
  router.push(`/history/${id}`)
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
  gap: 20px;
}

/* ── Header ── */
.page-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 12px;
}
.page-header__title { font-size: 22px; font-weight: 700; color: #1a202c; margin-bottom: 4px; }
.page-header__desc { font-size: 14px; color: #64748b; }
.page-header__right {
  display: flex;
  align-items: center;
  gap: 10px;
}
.btn-export {
  display: inline-flex; align-items: center; gap: 6px;
  padding: 7px 14px;
  font-size: 13px; font-weight: 600;
  border-radius: 8px; cursor: pointer;
  background: #fff; color: #3b82f6;
  border: 1.5px solid #93c5fd;
  transition: background 0.15s, border-color 0.15s;
}
.btn-export:hover:not(:disabled) { background: #eff6ff; border-color: #3b82f6; }
.btn-export:disabled { opacity: 0.4; cursor: not-allowed; }
.total-badge {
  background: #eff6ff; color: #3b82f6;
  font-size: 12px; font-weight: 700;
  padding: 4px 12px; border-radius: 20px;
  border: 1px solid #bfdbfe;
}

/* ── Filter Bar ── */
.filter-bar {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 10px;
  background: #fff;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  padding: 12px 16px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.04);
}
.filter-item { display: flex; align-items: center; position: relative; }
.filter-item--search { flex: 1; min-width: 180px; }
.filter-icon { position: absolute; left: 10px; color: #94a3b8; pointer-events: none; }
.filter-input {
  width: 100%; padding: 8px 12px 8px 34px;
  border: 1.5px solid #e2e8f0; border-radius: 8px;
  font-size: 13px; color: #1a202c; background: #f8fafc;
  transition: border-color 0.2s, box-shadow 0.2s; outline: none;
}
.filter-input:focus { border-color: #3b82f6; box-shadow: 0 0 0 3px rgba(59,130,246,0.1); background: #fff; }
.filter-input--date { padding-left: 12px; cursor: pointer; }
.filter-select {
  padding: 8px 32px 8px 12px;
  border: 1.5px solid #e2e8f0; border-radius: 8px;
  font-size: 13px; color: #1a202c; background: #f8fafc;
  appearance: none; -webkit-appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' fill='none' viewBox='0 0 24 24' stroke='%2394a3b8'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'/%3E%3C/svg%3E");
  background-repeat: no-repeat; background-position: right 10px center;
  cursor: pointer; outline: none; transition: border-color 0.2s;
}
.filter-select:focus { border-color: #3b82f6; box-shadow: 0 0 0 3px rgba(59,130,246,0.1); }
.btn-reset {
  display: flex; align-items: center; gap: 5px;
  padding: 8px 14px; font-size: 13px; font-weight: 600;
  border-radius: 8px; cursor: pointer;
  background: #fef2f2; color: #ef4444;
  border: 1.5px solid #fca5a5; transition: background 0.2s;
}
.btn-reset:hover { background: #fee2e2; }

/* ── State boxes ── */
.state-box {
  display: flex; flex-direction: column;
  align-items: center; justify-content: center;
  padding: 60px 20px; text-align: center;
  background: #fff; border-radius: 16px;
  border: 1.5px dashed #cbd5e1;
}
.state-box--error { border-color: #fca5a5; background: #fff5f5; }
.state-icon { font-size: 48px; margin-bottom: 16px; }
.state-title { font-size: 18px; font-weight: 600; color: #1a202c; margin-bottom: 8px; }
.state-text { font-size: 14px; color: #64748b; margin-bottom: 20px; }

.spinner {
  width: 32px; height: 32px;
  border: 3px solid #f3f3f3;
  border-top: 3px solid #3b82f6;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
  margin-bottom: 12px;
}
@keyframes spin { to { transform: rotate(360deg); } }

/* ── Buttons ── */
.btn {
  padding: 8px 18px; font-size: 14px; font-weight: 600;
  border-radius: 8px; cursor: pointer; border: 1px solid transparent;
  display: inline-flex; align-items: center; gap: 6px; text-decoration: none;
}
.btn--primary { background: #3b82f6; color: #fff; }
.btn--primary:hover { background: #2563eb; }
.btn--secondary { background: #fff; border-color: #e2e8f0; color: #64748b; }
.btn--secondary:hover { background: #f8fafc; }
.btn--secondary:disabled { opacity: 0.4; cursor: not-allowed; }

/* ── History List ── */
.history-list { display: flex; flex-direction: column; gap: 10px; }

.history-card {
  display: flex; align-items: center;
  background: #fff;
  border: 1.5px solid #e2e8f0;
  border-left: 4px solid #e2e8f0;
  border-radius: 14px; padding: 14px 16px;
  gap: 14px; cursor: pointer;
  transition: border-color 0.2s, transform 0.15s, box-shadow 0.2s;
}
.history-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(0,0,0,0.07);
}
.history-card--layak { border-left-color: #22c55e; }
.history-card--layak:hover { border-color: #86efac; border-left-color: #22c55e; }
.history-card--tidak { border-left-color: #ef4444; }
.history-card--tidak:hover { border-color: #fca5a5; border-left-color: #ef4444; }

/* Nomor urut */
.history-card__number {
  width: 28px; height: 28px; flex-shrink: 0;
  display: flex; align-items: center; justify-content: center;
  background: #f1f5f9; border-radius: 50%;
  font-size: 11px; font-weight: 700; color: #94a3b8;
}

.history-card__image {
  width: 68px; height: 68px;
  border-radius: 10px; overflow: hidden;
  background: #f1f5f9; flex-shrink: 0;
  display: flex; align-items: center; justify-content: center;
}
.history-card__image img { width: 100%; height: 100%; object-fit: cover; }
.no-image { color: #cbd5e1; }

.history-card__info { flex: 1; min-width: 0; }
.history-card__top {
  display: flex; align-items: flex-start;
  justify-content: space-between; margin-bottom: 5px; flex-wrap: wrap; gap: 6px;
}
.history-card__title {
  font-size: 14px; font-weight: 700; color: #1a202c;
  white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
  max-width: 240px;
}
.status-badge {
  font-size: 11px; font-weight: 700;
  padding: 3px 10px; border-radius: 20px; white-space: nowrap;
}
.status--layak { background: #dcfce7; color: #16a34a; }
.status--tidak_layak { background: #fee2e2; color: #dc2626; }

.history-card__meta {
  display: flex; flex-wrap: wrap; gap: 8px;
  font-size: 11px; color: #94a3b8; margin-bottom: 8px;
}
.meta-item { display: flex; align-items: center; gap: 3px; }

/* Confidence bar */
.confidence-row {
  display: flex; align-items: center; gap: 8px;
}
.confidence-label { font-size: 10px; color: #94a3b8; white-space: nowrap; }
.confidence-track {
  flex: 1; height: 5px; background: #f1f5f9;
  border-radius: 99px; overflow: hidden;
}
.confidence-fill {
  height: 100%; border-radius: 99px;
  transition: width 0.4s ease;
}
.confidence-fill--layak { background: linear-gradient(90deg, #86efac, #22c55e); }
.confidence-fill--tidak { background: linear-gradient(90deg, #fca5a5, #ef4444); }
.confidence-value { font-size: 11px; font-weight: 700; color: #475569; white-space: nowrap; }

.history-card__action { color: #cbd5e1; flex-shrink: 0; }
.history-card:hover .history-card__action { color: #94a3b8; }

/* ── Pagination ── */
.pagination {
  display: flex; align-items: center;
  justify-content: center; gap: 16px; margin-top: 16px;
}
.pagination-btn { font-size: 13px; padding: 7px 14px; }
.pagination-pages { display: flex; gap: 6px; align-items: center; }
.pagination-dot {
  width: 8px; height: 8px; border-radius: 50%;
  background: #e2e8f0; cursor: pointer; transition: background 0.2s, transform 0.2s;
}
.pagination-dot.active { background: #3b82f6; transform: scale(1.3); }
</style>