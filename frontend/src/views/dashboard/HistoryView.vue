<template>
  <DashboardLayout>
    <div class="history-view">
      <!-- High-End Page Header -->
      <header class="workspace-header">
        <div class="workspace-header__main">
          <h1 class="workspace-title">Riwayat Analisis</h1>
          <p class="workspace-desc">Daftar hasil analisis kualitas air yang telah Anda lakukan sebelumnya.</p>
        </div>
        <div v-if="!loading && !error" class="workspace-header__actions">
          <span class="badge-total">{{ totalItems }} Analisis</span>
          <button class="btn btn--secondary btn-export" @click="showExportModal = true" :disabled="totalItems === 0">
            <Download size="14" class="mr-2" />
            Ekspor Laporan
          </button>
        </div>
      </header>

      <!-- Export Modal -->
      <ExportModal
        v-if="showExportModal"
        :total-items="totalItems"
        :active-filters="{ search: searchQuery, category: filterCategory, date: filterDate }"
        @close="showExportModal = false"
      />

      <div class="workspace-content">
        <!-- Sleek Unified Filter Toolbar -->
        <div class="toolbar">
          <div class="toolbar-search">
            <Search size="16" class="toolbar-icon" />
            <input
              v-model="searchQuery"
              type="text"
              class="toolbar-input"
              placeholder="Cari sumber air..."
              @input="handleFilter"
            />
          </div>
          <div class="toolbar-filters">
            <div class="toolbar-select-wrap">
              <select v-model="filterCategory" class="toolbar-select" @change="handleFilter">
                <option value="">Semua Kategori</option>
                <option value="layak">Layak Digunakan</option>
                <option value="tidak_layak">Tidak Layak</option>
              </select>
              <ChevronDown size="14" class="toolbar-select-icon" />
            </div>
            <div class="toolbar-date-wrap">
              <input
                v-model="filterDate"
                type="date"
                class="toolbar-input date-input"
                @change="handleFilter"
              />
            </div>
            <button
              v-if="searchQuery || filterCategory || filterDate"
              class="btn-clear-filter"
              @click="resetFilter"
              title="Reset Filter"
            >
              <X size="14" />
            </button>
          </div>
        </div>

        <!-- Loading State -->
        <div v-if="loading" class="state-container">
          <div class="spinner"></div>
          <p class="state-text">Memuat riwayat analisis...</p>
        </div>

        <!-- Error State -->
        <EmptyState
          v-else-if="error"
          :icon="AlertCircle"
          title="Gagal Memuat Data"
          :description="error"
          actionLabel="Coba Lagi"
          @action="fetchHistory"
        />

        <!-- Empty State -->
        <EmptyState
          v-else-if="history.length === 0"
          :icon="FileX"
          :title="searchQuery || filterCategory || filterDate ? 'Tidak Ada Hasil' : 'Belum Ada Riwayat'"
          :description="searchQuery || filterCategory || filterDate ? 'Coba sesuaikan kata kunci atau filter pencarian Anda.' : 'Anda belum pernah melakukan analisis kualitas air di platform ini.'"
          :actionLabel="searchQuery || filterCategory || filterDate ? 'Reset Filter' : 'Mulai Analisis'"
          :actionTo="!searchQuery && !filterCategory && !filterDate ? '/analysis' : undefined"
          @action="searchQuery || filterCategory || filterDate ? resetFilter() : undefined"
        />

        <!-- Premium List -->
        <div v-else class="history-list">
          <div
            v-for="(item, index) in history"
            :key="item.id"
            class="history-row"
            @click="viewDetail(item.id)"
          >
            <!-- Status Indicator Line -->
            <div class="row-indicator" :class="'indicator-' + item.category"></div>

            <div class="row-number">
              {{ totalItems - (currentPage - 1) * 10 - index }}
            </div>

            <div class="row-image">
              <img v-if="item.image_path" :src="item.image_path" alt="Sampel air" />
              <div v-else class="no-image">
                <Droplet size="20" />
              </div>
            </div>

            <div class="row-main">
              <div class="row-header">
                <h3 class="row-title">
                  {{ item.water_source || `Analisis #${String(item.id).substring(0, 8)}` }}
                </h3>
                <span class="status-badge" :class="'status-' + item.category">
                  <div class="status-dot"></div>
                  {{ item.category === 'layak' ? 'Layak' : 'Tidak Layak' }}
                </span>
              </div>
              <div class="row-meta">
                <span class="meta-data"><Calendar size="12" /> {{ formatDate(item.created_at) }}</span>
                <span v-if="item.ph" class="meta-data meta-data--divider"><FlaskConical size="12" /> pH {{ item.ph }}</span>
                <div v-if="item.confidence != null" class="meta-data meta-data--divider row-confidence">
                  <span>Akurasi:</span>
                  <div class="mini-track">
                    <div class="mini-fill" :class="'bg-' + item.category" :style="{ width: (item.confidence * 100).toFixed(0) + '%' }"></div>
                  </div>
                  <strong>{{ (item.confidence * 100).toFixed(0) }}%</strong>
                </div>
              </div>
            </div>

            <div class="row-chevron">
              <ChevronRight size="18" />
            </div>
          </div>

          <!-- Pagination -->
          <div v-if="totalPages > 1" class="pagination">
            <button :disabled="currentPage === 1" @click="currentPage--" class="page-btn">
              <ChevronLeft size="16" />
            </button>
            <div class="page-numbers">
              <span
                v-for="page in totalPages"
                :key="page"
                class="page-num"
                :class="{ 'page-num--active': page === currentPage }"
                @click="currentPage = page"
              >
                {{ page }}
              </span>
            </div>
            <button :disabled="currentPage === totalPages" @click="currentPage++" class="page-btn">
              <ChevronRight size="16" />
            </button>
          </div>
        </div>
      </div>
    </div>
  </DashboardLayout>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import DashboardLayout from '@/layouts/DashboardLayout.vue'
import EmptyState from '@/components/common/EmptyState.vue'
import ExportModal from '@/components/analysis/ExportModal.vue'
import { getAnalysisHistory } from '@/api/analysis'
import { Search, X, Download, AlertCircle, FileX, Droplet, Calendar, FlaskConical, ChevronRight, ChevronLeft, ChevronDown } from 'lucide-vue-next'

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
  router.push(`/dashboard/history/${id}`)
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
  min-height: 100%;
}

/* Workspace Header (Matching AnalysisView) */
.workspace-header {
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding-bottom: 24px;
  margin-bottom: 24px;
  border-bottom: 1px solid var(--color-border-light);
}

@media (min-width: 768px) {
  .workspace-header {
    flex-direction: row;
    align-items: flex-end;
    justify-content: space-between;
  }
}

.workspace-title {
  font-size: var(--font-size-xl);
  font-weight: 700;
  color: var(--color-text-primary);
  margin: 0 0 6px 0;
  letter-spacing: -0.02em;
}

.workspace-desc {
  font-size: var(--font-size-sm);
  color: var(--color-text-muted);
  margin: 0;
}

.workspace-header__actions {
  display: flex;
  align-items: center;
  gap: 12px;
}

.badge-total {
  font-size: var(--font-size-xs);
  font-weight: 600;
  color: var(--color-text-secondary);
  background: var(--color-neutral-bg);
  padding: 4px 10px;
  border-radius: var(--radius-full);
  border: 1px solid var(--color-border);
}

.btn-export {
  box-shadow: var(--shadow-sm);
}

.mr-2 { margin-right: 6px; }

/* Workspace Content */
.workspace-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

/* Unified Sleek Toolbar */
.toolbar {
  display: flex;
  flex-direction: column;
  gap: 1px;
  background: var(--color-border-light);
  border: 1px solid var(--color-border-light);
  border-radius: var(--radius-lg);
  overflow: hidden;
}

@media (min-width: 768px) {
  .toolbar {
    flex-direction: row;
    align-items: stretch;
  }
}

.toolbar-search {
  flex: 1;
  position: relative;
  display: flex;
  align-items: center;
  background: var(--color-surface);
}

.toolbar-filters {
  display: flex;
  background: var(--color-surface);
  gap: 1px;
  background: var(--color-border-light);
}

.toolbar-icon {
  position: absolute;
  left: 14px;
  color: var(--color-text-muted);
  pointer-events: none;
}

.toolbar-input {
  width: 100%;
  padding: 10px 14px 10px 38px;
  border: none;
  background: transparent;
  font-size: var(--font-size-sm);
  color: var(--color-text-primary);
  outline: none;
}

.toolbar-input::placeholder {
  color: var(--color-text-muted-light);
}

.toolbar-select-wrap {
  position: relative;
  display: flex;
  align-items: center;
  background: var(--color-surface);
}

.toolbar-select {
  padding: 10px 36px 10px 16px;
  border: none;
  background: transparent;
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
  outline: none;
  cursor: pointer;
  appearance: none;
}

.toolbar-select-icon {
  position: absolute;
  right: 12px;
  color: var(--color-text-muted);
  pointer-events: none;
}

.toolbar-date-wrap {
  display: flex;
  align-items: center;
  background: var(--color-surface);
}

.date-input {
  padding: 10px 16px;
  color: var(--color-text-secondary);
}

.btn-clear-filter {
  background: var(--color-surface);
  border: none;
  padding: 0 16px;
  color: var(--color-text-muted);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: color 0.2s, background 0.2s;
}

.btn-clear-filter:hover {
  color: var(--color-danger);
  background: color-mix(in srgb, var(--color-danger) 5%, var(--color-surface));
}

/* Premium List Layout */
.history-list {
  display: flex;
  flex-direction: column;
  background: var(--color-surface);
  border: 1px solid var(--color-border-light);
  border-radius: var(--radius-lg);
  overflow: hidden;
  box-shadow: var(--shadow-sm);
}

.history-row {
  display: flex;
  align-items: center;
  padding: 16px;
  gap: 16px;
  border-bottom: 1px solid var(--color-border-light);
  background: var(--color-surface);
  cursor: pointer;
  position: relative;
  transition: background 0.2s;
}

.history-row:last-child {
  border-bottom: none;
}

.history-row:hover {
  background: color-mix(in srgb, var(--color-neutral-bg) 50%, var(--color-surface));
}

.row-indicator {
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 3px;
  transition: width 0.2s;
}

.history-row:hover .row-indicator {
  width: 4px;
}

.indicator-layak { background-color: var(--color-success); }
.indicator-tidak_layak { background-color: var(--color-danger); }
.indicator-tercemar { background-color: var(--color-danger); }

.row-number {
  font-size: var(--font-size-xs);
  font-weight: 600;
  color: var(--color-text-muted-light);
  width: 24px;
  text-align: right;
  flex-shrink: 0;
}

.row-image {
  width: 48px;
  height: 48px;
  border-radius: var(--radius-sm);
  background: var(--color-neutral-bg);
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-text-muted-light);
  border: 1px solid var(--color-border-light);
  flex-shrink: 0;
}

.row-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.row-main {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.row-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}

.row-title {
  font-size: var(--font-size-sm);
  font-weight: 600;
  color: var(--color-text-primary);
  margin: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.status-badge {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 4px 10px;
  border-radius: var(--radius-full);
  font-size: 11px;
  font-weight: 600;
  white-space: nowrap;
}

.status-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
}

.status-layak { 
  background: color-mix(in srgb, var(--color-success) 10%, transparent); 
  color: color-mix(in srgb, var(--color-success) 80%, black);
}
.status-layak .status-dot { background: var(--color-success); }

.status-tidak_layak, .status-tercemar { 
  background: color-mix(in srgb, var(--color-danger) 10%, transparent); 
  color: color-mix(in srgb, var(--color-danger) 80%, black);
}
.status-tidak_layak .status-dot, .status-tercemar .status-dot { background: var(--color-danger); }

.row-meta {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 10px;
  font-size: 12px;
  color: var(--color-text-muted);
}

.meta-data {
  display: flex;
  align-items: center;
  gap: 4px;
}

.meta-data--divider::before {
  content: "•";
  color: var(--color-border);
  margin-right: 10px;
}

.row-confidence {
  display: flex;
  align-items: center;
  gap: 6px;
}

.mini-track {
  width: 40px;
  height: 4px;
  background: var(--color-border-light);
  border-radius: var(--radius-full);
  overflow: hidden;
}

.mini-fill {
  height: 100%;
  border-radius: var(--radius-full);
}

.bg-layak { background-color: var(--color-success); }
.bg-tidak_layak, .bg-tercemar { background-color: var(--color-danger); }

.row-chevron {
  color: var(--color-text-muted-light);
  transition: transform 0.2s, color 0.2s;
}

.history-row:hover .row-chevron {
  color: var(--color-text-secondary);
  transform: translateX(2px);
}

/* Elegant Pagination */
.pagination {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 16px;
  border-top: 1px solid var(--color-border-light);
  background: var(--color-bg);
}

.page-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border: 1px solid var(--color-border);
  background: var(--color-surface);
  border-radius: var(--radius-sm);
  color: var(--color-text-secondary);
  cursor: pointer;
  transition: all 0.2s;
}

.page-btn:hover:not(:disabled) {
  border-color: var(--color-text-muted);
  color: var(--color-text-primary);
}

.page-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  background: var(--color-neutral-bg);
}

.page-numbers {
  display: flex;
  gap: 4px;
}

.page-num {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: var(--radius-sm);
  font-size: var(--font-size-sm);
  font-weight: 500;
  color: var(--color-text-secondary);
  cursor: pointer;
  transition: all 0.2s;
}

.page-num:hover:not(.page-num--active) {
  background: var(--color-neutral-bg);
}

.page-num--active {
  background: var(--color-text-primary);
  color: var(--color-surface);
}

/* States */
.state-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 80px 20px;
  background: var(--color-surface);
  border: 1px dashed var(--color-border);
  border-radius: var(--radius-lg);
}

.spinner {
  width: 24px;
  height: 24px;
  border: 2px solid var(--color-border);
  border-top-color: var(--color-primary);
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
  margin-bottom: 12px;
}

.state-text {
  font-size: var(--font-size-sm);
  color: var(--color-text-muted);
  margin: 0;
}

@keyframes spin { to { transform: rotate(360deg); } }
</style>