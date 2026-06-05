<template>
  <DashboardLayout>
    <div class="history-view">

      <!-- Precision Header -->
      <header class="workspace-header">
        <div class="header-left">
          <p class="header-eyebrow">PakarAir — Rekaman Kualitas</p>
          <h1 class="workspace-title">Riwayat Analisis</h1>
          <p class="workspace-desc">Daftar hasil analisis kualitas air yang telah Anda lakukan sebelumnya.</p>
        </div>
        <div v-if="!loading && !error" class="header-right">
          <span class="count-pill">{{ totalItems }} ANALISIS</span>
          <button class="btn-export" @click="showExportModal = true" :disabled="totalItems === 0">
            <ArrowDownToLine size="12" />
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

        <!-- Toolbar -->
        <div class="toolbar">
          <div class="toolbar-search">
            <Search size="13" class="toolbar-search-icon" />
            <input
              id="history-search"
              v-model="searchQuery"
              type="text"
              class="toolbar-input"
              placeholder="Cari sumber air..."
              @input="handleFilter"
            />
          </div>
          <div class="toolbar-divider" />
          <div class="toolbar-select-wrap">
            <select v-model="filterCategory" class="toolbar-select" @change="handleFilter">
              <option value="">Semua Kategori</option>
              <option value="layak">Layak Digunakan</option>
              <option value="tidak_layak">Tidak Layak</option>
            </select>
            <ChevronDown size="11" class="toolbar-select-icon" />
          </div>
          <div class="toolbar-divider" />
          <div class="toolbar-date-wrap">
            <input
              id="history-date"
              v-model="filterDate"
              type="date"
              class="toolbar-input date-input"
              @change="handleFilter"
            />
          </div>
          <button
            v-if="searchQuery || filterCategory || filterDate"
            class="toolbar-clear"
            @click="resetFilter"
            title="Reset Filter"
          >
            <X size="13" />
          </button>
        </div>

        <!-- Loading State -->
        <div v-if="loading" class="state-container">
          <div class="spinner"></div>
          <p class="state-label">Memuat riwayat analisis...</p>
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
          :description="searchQuery || filterCategory || filterDate
            ? 'Coba sesuaikan kata kunci atau filter pencarian Anda.'
            : 'Anda belum pernah melakukan analisis kualitas air di platform ini.'"
          :actionLabel="searchQuery || filterCategory || filterDate ? 'Reset Filter' : 'Mulai Analisis'"
          :actionTo="!searchQuery && !filterCategory && !filterDate ? '/analysis' : undefined"
          @action="searchQuery || filterCategory || filterDate ? resetFilter() : undefined"
        />

        <!-- Table -->
        <div v-else class="ledger">

          <!-- Column header -->
          <div class="ledger-head">
            <div class="th th-num">#</div>
            <div class="th th-img"></div>
            <div class="th th-source">Sumber</div>
            <div class="th th-status">Status</div>
            <div class="th th-ph">pH</div>
            <div class="th th-conf">Akurasi</div>
            <div class="th th-arr"></div>
          </div>

          <!-- Month section groups -->
          <template v-for="(group, month) in groupedHistory" :key="month">
            <div class="section-rule">
              <span>{{ month }}</span>
              <span>{{ group.length }} Entri</span>
            </div>
            <div
              v-for="(item, index) in group"
              :key="item.id"
              class="ledger-row"
              :class="'row-' + item.category"
              @click="viewDetail(item.id)"
            >
              <div class="col-num">{{ formatRowNumber(item, index) }}</div>

              <div class="col-img">
                <img v-if="item.image_path" :src="item.image_path" alt="Sampel air" />
                <Droplet v-else size="16" class="img-placeholder" />
              </div>

              <div class="col-source">
                <span class="source-name">{{ item.water_source || `Analisis #${String(item.id).substring(0, 8)}` }}</span>
                <span class="source-date"><Calendar size="10" /> {{ formatDate(item.created_at) }}</span>
              </div>

              <div class="col-status">
                <span class="status-badge" :class="'status-' + item.category">
                  <span class="status-dot"></span>
                  {{ item.category === 'layak' ? 'Layak' : 'Tidak Layak' }}
                </span>
              </div>

              <div class="col-ph">
                <strong v-if="item.ph">{{ item.ph }}</strong>
                <span v-else class="ph-empty">—</span>
                <span class="ph-label">pH</span>
              </div>

              <div class="col-conf">
                <template v-if="item.confidence != null">
                  <div class="conf-bar">
                    <div
                      class="conf-fill"
                      :class="'fill-' + item.category"
                      :style="{ width: (item.confidence * 100).toFixed(0) + '%' }"
                    />
                  </div>
                  <span class="conf-pct">{{ (item.confidence * 100).toFixed(0) }}%</span>
                </template>
                <span v-else class="ph-empty">—</span>
              </div>

              <div class="col-arr">
                <ChevronRight size="14" class="arrow-icon" />
              </div>
            </div>
          </template>

          <!-- Pagination -->
          <div v-if="totalPages > 1" class="pagination">
            <span class="page-info">HALAMAN {{ currentPage }} DARI {{ totalPages }} · {{ totalItems }} ENTRI</span>
            <div class="page-controls">
              <button :disabled="currentPage === 1" @click="currentPage--" class="page-btn">
                <ChevronLeft size="14" />
              </button>
              <template v-for="page in paginationRange" :key="page">
                <span v-if="page === '...'" class="page-ellipsis">···</span>
                <span
                  v-else
                  class="page-num"
                  :class="{ 'page-num--active': page === currentPage }"
                  @click="currentPage = page"
                >{{ page }}</span>
              </template>
              <button :disabled="currentPage === totalPages" @click="currentPage++" class="page-btn">
                <ChevronRight size="14" />
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  </DashboardLayout>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import DashboardLayout from '@/layouts/DashboardLayout.vue'
import EmptyState from '@/components/common/EmptyState.vue'
import ExportModal from '@/components/analysis/ExportModal.vue'
import { getAnalysisHistory } from '@/api/analysis'
import {
  Search, X, ArrowDownToLine, AlertCircle, FileX,
  Droplet, Calendar, ChevronRight, ChevronLeft, ChevronDown
} from 'lucide-vue-next'

const router = useRouter()
const history = ref([])
const loading = ref(true)
const error = ref(null)
const currentPage = ref(1)
const totalPages = ref(1)
const totalItems = ref(0)
const showExportModal = ref(false)

const searchQuery = ref('')
const filterCategory = ref('')
const filterDate = ref('')

// Group rows by month heading
const groupedHistory = computed(() => {
  const groups = {}
  history.value.forEach(item => {
    const d = new Date(item.created_at)
    const key = d.toLocaleDateString('id-ID', { month: 'long', year: 'numeric' })
    if (!groups[key]) groups[key] = []
    groups[key].push(item)
  })
  return groups
})

// Smart pagination range with ellipsis
const paginationRange = computed(() => {
  const total = totalPages.value
  const current = currentPage.value
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1)
  const pages = [1]
  if (current > 3) pages.push('...')
  for (let p = Math.max(2, current - 1); p <= Math.min(total - 1, current + 1); p++) pages.push(p)
  if (current < total - 2) pages.push('...')
  pages.push(total)
  return pages
})

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
    day: '2-digit', month: 'short', year: 'numeric'
  }) + ' · ' + d.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })
}

function formatRowNumber(item, index) {
  const n = totalItems.value - (currentPage.value - 1) * 10 - index
  return String(n).padStart(2, '0')
}

watch(currentPage, fetchHistory)
onMounted(fetchHistory)
</script>

<style scoped>
/* ============================================================
   IMPORTS
   ============================================================ */
@import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500;600&display=swap');

/* ============================================================
   LOCAL TOKENS
   ============================================================ */
.history-view {
  --mono: 'IBM Plex Mono', ui-monospace, monospace;
  --h-rule: var(--color-border);
  --h-rule-light: var(--color-border-light);
  --h-good: var(--color-success);
  --h-good-bg: color-mix(in srgb, var(--color-success) 8%, transparent);
  --h-bad: var(--color-danger);
  --h-bad-bg: color-mix(in srgb, var(--color-danger) 8%, transparent);

  display: flex;
  flex-direction: column;
  min-height: 100%;
  gap: 24px;
}

/* ============================================================
   HEADER
   ============================================================ */
.workspace-header {
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding-bottom: 20px;
  border-bottom: 1px solid var(--color-text-primary);
}

@media (min-width: 768px) {
  .workspace-header {
    flex-direction: row;
    align-items: flex-end;
    justify-content: space-between;
  }
}

.header-eyebrow {
  font-family: var(--mono);
  font-size: 10px;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--color-text-muted);
  margin: 0 0 6px;
}

.workspace-title {
  font-family: var(--mono);
  font-size: var(--font-size-xl);
  font-weight: 600;
  color: var(--color-text-primary);
  letter-spacing: -0.02em;
  line-height: 1;
  margin: 0 0 6px;
}

.workspace-desc {
  font-size: var(--font-size-sm);
  color: var(--color-text-muted);
  margin: 0;
}

.header-right {
  display: flex;
  align-items: center;
  gap: 10px;
  flex-shrink: 0;
}

.count-pill {
  font-family: var(--mono);
  font-size: 10px;
  font-weight: 500;
  letter-spacing: 0.08em;
  color: var(--color-text-secondary);
  border: 1px solid var(--h-rule);
  padding: 0 14px;
  height: 34px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 2px;
  background: var(--color-neutral-bg);
}

.btn-export {
  font-family: var(--mono);
  font-size: 11px;
  font-weight: 500;
  letter-spacing: 0.06em;
  padding: 0 16px;
  height: 34px;
  border: 1px solid var(--color-text-primary);
  background: var(--color-text-primary);
  color: var(--color-surface);
  border-radius: 2px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 7px;
  transition: opacity 0.15s;
}

.btn-export:hover:not(:disabled) {
  opacity: 0.8;
}

.btn-export:disabled {
  opacity: 0.35;
  cursor: not-allowed;
}

/* ============================================================
   WORKSPACE CONTENT
   ============================================================ */
.workspace-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

/* ============================================================
   TOOLBAR
   ============================================================ */
.toolbar {
  display: flex;
  align-items: stretch;
  height: 38px;
  background: var(--color-surface);
  border: 1px solid var(--h-rule);
  border-radius: 2px;
  overflow: hidden;
}

.toolbar-search {
  flex: 1;
  display: flex;
  align-items: center;
  min-width: 0;
}

.toolbar-search-icon {
  color: var(--color-text-muted);
  margin: 0 8px 0 12px;
  flex-shrink: 0;
}

.toolbar-input {
  flex: 1;
  height: 100%;
  border: none;
  background: transparent;
  font-family: var(--mono);
  font-size: 12px;
  color: var(--color-text-primary);
  outline: none;
  padding: 0;
}

.toolbar-input::placeholder {
  color: var(--color-text-muted-light);
}

.toolbar-divider {
  width: 1px;
  background: var(--h-rule);
  flex-shrink: 0;
}

.toolbar-select-wrap {
  position: relative;
  display: flex;
  align-items: center;
  flex-shrink: 0;
}

.toolbar-select {
  height: 100%;
  border: none;
  background: transparent;
  font-family: var(--mono);
  font-size: 12px;
  color: var(--color-text-secondary);
  outline: none;
  cursor: pointer;
  appearance: none;
  padding: 0 30px 0 14px;
}

.toolbar-select-icon {
  position: absolute;
  right: 10px;
  color: var(--color-text-muted);
  pointer-events: none;
}

.toolbar-date-wrap {
  display: flex;
  align-items: center;
  flex-shrink: 0;
}

.date-input {
  padding: 0 14px;
  width: 150px;
  color: var(--color-text-secondary);
}

.toolbar-clear {
  background: transparent;
  border: none;
  border-left: 1px solid var(--h-rule);
  padding: 0 12px;
  color: var(--color-text-muted);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: color 0.15s, background 0.15s;
}

.toolbar-clear:hover {
  color: var(--h-bad);
  background: var(--h-bad-bg);
}

/* ============================================================
   LEDGER
   ============================================================ */
.ledger {
  background: var(--color-surface);
  border: 1px solid var(--h-rule);
  border-radius: 2px;
  overflow: hidden;
}

/* Column header */
.ledger-head {
  display: grid;
  grid-template-columns: 32px 46px 1fr 110px 56px 72px 32px;
  padding: 0 16px;
  border-bottom: 1px solid var(--color-text-primary);
  background: var(--color-neutral-bg);
}

.th {
  font-family: var(--mono);
  font-size: 9px;
  font-weight: 500;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--color-text-muted);
  padding: 8px 0;
}

.th-ph,
.th-conf,
.th-arr { text-align: right; }

/* Section separator */
.section-rule {
  padding: 6px 16px;
  background: var(--color-neutral-bg);
  border-bottom: 1px solid var(--h-rule-light);
  display: flex;
  justify-content: space-between;
  font-family: var(--mono);
  font-size: 9px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--color-text-muted);
}

/* Row */
.ledger-row {
  display: grid;
  grid-template-columns: 32px 46px 1fr 110px 56px 72px 32px;
  align-items: center;
  padding: 0 16px;
  min-height: 58px;
  border-bottom: 1px solid var(--h-rule-light);
  cursor: pointer;
  position: relative;
  transition: background 0.12s;
}

.ledger-row:last-of-type {
  border-bottom: none;
}

.ledger-row:hover {
  background: color-mix(in srgb, var(--color-neutral-bg) 60%, var(--color-surface));
}

/* Left accent bar */
.ledger-row::before {
  content: '';
  position: absolute;
  left: 0; top: 0; bottom: 0;
  width: 2px;
}

.row-layak::before     { background: var(--h-good); }
.row-tidak_layak::before { background: var(--h-bad); }

/* Columns */
.col-num {
  font-family: var(--mono);
  font-size: 10px;
  font-weight: 500;
  color: var(--color-text-muted);
  padding-right: 8px;
}

.col-img {
  width: 38px;
  height: 38px;
  border-radius: 2px;
  border: 1px solid var(--h-rule-light);
  background: var(--color-neutral-bg);
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}

.col-img img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.img-placeholder {
  color: var(--color-text-muted-light);
}

.col-source {
  display: flex;
  flex-direction: column;
  gap: 3px;
  padding: 12px 8px;
  min-width: 0;
}

.source-name {
  font-size: var(--font-size-sm);
  font-weight: 500;
  color: var(--color-text-primary);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.source-date {
  font-family: var(--mono);
  font-size: 10px;
  color: var(--color-text-muted);
  display: flex;
  align-items: center;
  gap: 4px;
}

.col-status {
  display: flex;
  align-items: center;
}

.status-badge {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  font-family: var(--mono);
  font-size: 10px;
  font-weight: 500;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  padding: 3px 8px;
  border-radius: 2px;
  white-space: nowrap;
}

.status-dot {
  width: 5px;
  height: 5px;
  border-radius: 50%;
  flex-shrink: 0;
}

.status-layak {
  background: var(--h-good-bg);
  color: color-mix(in srgb, var(--h-good) 90%, black);
}

.status-layak .status-dot { background: var(--h-good); }

.status-tidak_layak {
  background: var(--h-bad-bg);
  color: color-mix(in srgb, var(--h-bad) 90%, black);
}

.status-tidak_layak .status-dot { background: var(--h-bad); }

.col-ph {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 2px;
}

.col-ph strong {
  font-family: var(--mono);
  font-size: 13px;
  font-weight: 500;
  color: var(--color-text-primary);
  line-height: 1;
}

.ph-label {
  font-family: var(--mono);
  font-size: 9px;
  letter-spacing: 0.06em;
  color: var(--color-text-muted);
}

.ph-empty {
  font-family: var(--mono);
  font-size: 12px;
  color: var(--color-text-muted-light);
}

.col-conf {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 4px;
}

.conf-bar {
  width: 44px;
  height: 3px;
  background: var(--h-rule-light);
  border-radius: 0;
  overflow: hidden;
}

.conf-fill {
  height: 100%;
  transition: width 0.4s ease;
}

.fill-layak      { background: var(--h-good); }
.fill-tidak_layak { background: var(--h-bad); }

.conf-pct {
  font-family: var(--mono);
  font-size: 10px;
  font-weight: 500;
  color: var(--color-text-secondary);
}

.col-arr {
  display: flex;
  justify-content: flex-end;
}

.arrow-icon {
  color: var(--color-text-muted-light);
  transition: transform 0.15s, color 0.15s;
}

.ledger-row:hover .arrow-icon {
  color: var(--color-text-secondary);
  transform: translateX(2px);
}

/* ============================================================
   PAGINATION
   ============================================================ */
.pagination {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 16px;
  border-top: 1px solid var(--h-rule-light);
  background: var(--color-neutral-bg);
}

.page-info {
  font-family: var(--mono);
  font-size: 10px;
  letter-spacing: 0.08em;
  color: var(--color-text-muted);
}

.page-controls {
  display: flex;
  align-items: center;
  gap: 4px;
}

.page-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  border: 1px solid var(--h-rule);
  background: var(--color-surface);
  border-radius: 2px;
  color: var(--color-text-secondary);
  cursor: pointer;
  transition: border-color 0.15s, color 0.15s;
}

.page-btn:hover:not(:disabled) {
  border-color: var(--color-text-primary);
  color: var(--color-text-primary);
}

.page-btn:disabled {
  opacity: 0.35;
  cursor: not-allowed;
}

.page-num {
  font-family: var(--mono);
  font-size: 11px;
  font-weight: 500;
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 2px;
  cursor: pointer;
  color: var(--color-text-secondary);
  transition: background 0.12s, color 0.12s;
}

.page-num:hover:not(.page-num--active) {
  background: var(--h-rule-light);
}

.page-num--active {
  background: var(--color-text-primary);
  color: var(--color-surface);
}

.page-ellipsis {
  font-family: var(--mono);
  font-size: 11px;
  color: var(--color-text-muted);
  padding: 0 4px;
  user-select: none;
}

/* ============================================================
   LOADING / STATES
   ============================================================ */
.state-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 80px 20px;
  border: 1px solid var(--h-rule-light);
  border-radius: 2px;
  background: var(--color-surface);
}

.spinner {
  width: 20px;
  height: 20px;
  border: 1.5px solid var(--h-rule);
  border-top-color: var(--color-text-primary);
  border-radius: 50%;
  animation: spin 0.7s linear infinite;
  margin-bottom: 12px;
}

.state-label {
  font-family: var(--mono);
  font-size: 11px;
  letter-spacing: 0.06em;
  color: var(--color-text-muted);
  margin: 0;
}

@keyframes spin { to { transform: rotate(360deg); } }
</style>