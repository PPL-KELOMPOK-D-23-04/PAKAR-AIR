<template>
  <DashboardLayout>
    <PageHeader 
      title="Dashboard" 
      :subtitle="'Selamat datang, ' + userName" 
    />
    
    <!-- Row 1: 4 StatCard -->
    <div class="dashboard-grid-4 section-gap">
      <StatCard 
        label="Total Analisis" 
        :value="stats.total" 
        :icon="FlaskConical" 
        iconColor="var(--color-primary)" 
        :loading="loading" 
      />
      <StatCard 
        label="Akurasi Rata-rata" 
        :value="stats.accuracy" 
        :icon="Target" 
        iconColor="var(--color-accent)" 
        :trend="{ direction: 'up', value: '+2%', label: 'bulan ini' }"
        :loading="loading" 
      />
      <StatCard 
        label="Analisis Bulan Ini" 
        :value="stats.monthly" 
        :icon="Calendar" 
        iconColor="var(--color-warning-text)" 
        :loading="loading" 
      />
      <StatCard 
        label="Status Terakhir" 
        :value="stats.lastStatus" 
        :icon="Activity" 
        :iconColor="lastStatusColor" 
        :loading="loading" 
      />
    </div>
    
    <!-- Row 2: Konten utama -->
    <div class="dashboard-grid-3">
      <!-- Col span 2: Recent Analysis -->
      <div class="col-span-2">
        <BaseCard padding="lg" class="h-full">
          <SectionHeader title="Analisis Terbaru">
            <template #action>
              <router-link to="/history" class="btn btn--ghost text-sm">Lihat Semua →</router-link>
            </template>
          </SectionHeader>
          
          <div v-if="loading" class="py-8 text-center text-gray-500">Memuat data...</div>
          
          <EmptyState 
            v-else-if="recentAnalyses.length === 0" 
            :icon="Clipboard" 
            title="Belum Ada Analisis" 
            description="Anda belum melakukan analisis kualitas air apapun. Mulai analisis pertama Anda sekarang." 
            actionLabel="Mulai Analisis" 
            actionTo="/analysis" 
          />
          
          <div v-else class="recent-list">
            <div v-for="item in recentAnalyses" :key="item.id" class="recent-item">
              <div class="item-icon" :class="item.category">
                <Droplet size="20" />
              </div>
              <div class="item-content">
                <div class="item-header">
                  <span class="item-title">Analisis #{{ String(item.id).substring(0,6) }}</span>
                  <span class="item-date">{{ formatDate(item.created_at) }}</span>
                </div>
                <div class="item-details">
                  <span class="badge" :class="item.category">{{ formatCategory(item.category) }}</span>
                  <span class="confidence">Akurasi: {{ Math.round(item.confidence * 100) }}%</span>
                </div>
              </div>
            </div>
          </div>
        </BaseCard>
      </div>
      
      <!-- Col span 1: Quick Actions + Rekomendasi -->
      <div class="col-span-1 flex-col-gap">
        <BaseCard padding="md">
          <SectionHeader title="Aksi Cepat" />
          <div class="quick-actions">
            <router-link to="/analysis" class="btn btn--primary action-btn mb-2">
              <FlaskConical size="16" /> Analisis Baru
            </router-link>
            <router-link to="/history" class="btn btn--secondary action-btn">
              <History size="16" /> Lihat Riwayat
            </router-link>
          </div>
        </BaseCard>
        
        <BaseCard padding="md" class="flex-grow">
          <SectionHeader title="Insight" />
          <EmptyState 
            v-if="recentAnalyses.length === 0" 
            :icon="Lightbulb" 
            title="Belum Ada Insight" 
            description="Lakukan analisis untuk mendapatkan rekomendasi sistem." 
          />
          <div v-else class="insight-content">
            <div class="insight-icon-wrap">
              <Info size="24" class="insight-icon" />
            </div>
            <p class="insight-text">
              Kualitas air terakhir Anda menunjukkan status <strong>{{ formatCategory(stats.lastStatus) }}</strong>. 
              {{ getInsightRecommendation(stats.lastStatus) }}
            </p>
          </div>
        </BaseCard>
      </div>
    </div>
  </DashboardLayout>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/authStore'
import DashboardLayout from '@/layouts/DashboardLayout.vue'
import PageHeader from '@/components/common/PageHeader.vue'
import StatCard from '@/components/common/StatCard.vue'
import BaseCard from '@/components/common/BaseCard.vue'
import SectionHeader from '@/components/common/SectionHeader.vue'
import EmptyState from '@/components/common/EmptyState.vue'
import { 
  FlaskConical, 
  Target, 
  Calendar, 
  Activity, 
  Clipboard, 
  Droplet, 
  History, 
  Lightbulb, 
  Info 
} from 'lucide-vue-next'

const router = useRouter()
const authStore = useAuthStore()

const userName = computed(() => {
  return authStore.user?.name || 'Pengguna'
})

const loading = ref(true)
const recentAnalyses = ref([])

const stats = ref({
  total: '—',
  accuracy: '—',
  monthly: '—',
  lastStatus: '—'
})

const lastStatusColor = computed(() => {
  const status = stats.value.lastStatus?.toLowerCase() || ''
  if (status.includes('layak') && !status.includes('tidak')) return 'var(--color-success)'
  if (status.includes('tidak_layak')) return 'var(--color-warning)'
  if (status.includes('tercemar')) return 'var(--color-danger)'
  return 'var(--color-primary)'
})

async function fetchDashboardData() {
  loading.value = true
  try {
    const res = await axios.get('/api/analysis/history', {
      params: { page: 1, per_page: 5 }
    })
    
    const items = res.data.items || []
    recentAnalyses.value = items
    
    // Calculate stats
    stats.value.total = res.data.total || items.length
    
    if (items.length > 0) {
      // Fake accuracy for demo, in real app comes from API
      const avgConf = items.reduce((acc, curr) => acc + curr.confidence, 0) / items.length
      stats.value.accuracy = Math.round(avgConf * 100) + '%'
      
      // Monthly count
      const currentMonth = new Date().getMonth()
      stats.value.monthly = items.filter(i => new Date(i.created_at).getMonth() === currentMonth).length
      
      // Last status
      stats.value.lastStatus = items[0].category
    } else {
      stats.value.total = '0'
      stats.value.accuracy = '0%'
      stats.value.monthly = '0'
      stats.value.lastStatus = 'Belum Ada'
    }
  } catch (error) {
    console.error('Failed to fetch dashboard data:', error)
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchDashboardData()
})

function formatDate(dateString) {
  if (!dateString) return ''
  const date = new Date(dateString)
  return new Intl.DateTimeFormat('id-ID', { 
    day: 'numeric', 
    month: 'short', 
    year: 'numeric' 
  }).format(date)
}

function formatCategory(category) {
  if (!category || category === '—' || category === 'Belum Ada') return category
  const map = {
    'layak': 'Aman (Layak)',
    'tidak_layak': 'Perlu Perlakuan',
    'tercemar': 'Tercemar'
  }
  return map[category] || category.replace('_', ' ')
}

function getInsightRecommendation(category) {
  const status = category?.toLowerCase() || ''
  if (status.includes('layak') && !status.includes('tidak')) {
    return 'Kondisi air Anda sangat baik. Terus jaga kebersihan sumber air Anda.'
  }
  if (status.includes('tidak_layak') || status.includes('perlakuan')) {
    return 'Disarankan untuk melakukan filtrasi atau perebusan sebelum konsumsi.'
  }
  if (status.includes('tercemar')) {
    return 'Peringatan: JANGAN konsumsi air ini. Segera hubungi lab terdekat untuk pengujian.'
  }
  return 'Lakukan analisis secara rutin untuk memantau kualitas air.'
}
</script>

<style scoped>
.dashboard-grid-4 {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
}

.dashboard-grid-3 {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
}

.col-span-2 {
  grid-column: span 2;
}

.col-span-1 {
  grid-column: span 1;
}

.flex-col-gap {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.flex-grow {
  flex-grow: 1;
}

.section-gap { margin-bottom: var(--section-gap, 32px); }
.mb-2 { margin-bottom: 8px; }
.text-sm { font-size: var(--font-size-sm); }
.text-gray-500 { color: var(--color-text-muted); }
.py-8 { padding-top: 32px; padding-bottom: 32px; }
.text-center { text-align: center; }
.h-full { height: 100%; }

/* Recent List */
.recent-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.recent-item {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 16px;
  border: 1px solid var(--color-border-light);
  border-radius: var(--radius-md);
  transition: all var(--transition-fast);
}

.recent-item:hover {
  background-color: var(--color-bg);
  border-color: var(--color-border);
}

.item-icon {
  width: 48px;
  height: 48px;
  border-radius: var(--radius-md);
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--color-bg);
  color: var(--color-text-secondary);
}

.item-icon.layak { background-color: color-mix(in srgb, var(--color-success) 15%, transparent); color: var(--color-success); }
.item-icon.tidak_layak { background-color: color-mix(in srgb, var(--color-warning) 15%, transparent); color: var(--color-warning); }
.item-icon.tercemar { background-color: color-mix(in srgb, var(--color-danger) 15%, transparent); color: var(--color-danger); }

.item-content {
  flex: 1;
}

.item-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}

.item-title {
  font-weight: 600;
  color: var(--color-text-primary);
}

.item-date {
  font-size: var(--font-size-xs);
  color: var(--color-text-muted);
}

.item-details {
  display: flex;
  align-items: center;
  gap: 12px;
}

.badge {
  padding: 4px 8px;
  border-radius: var(--radius-sm);
  font-size: var(--font-size-xs);
  font-weight: 600;
  background-color: var(--color-bg);
  color: var(--color-text-secondary);
}

.badge.layak { background-color: color-mix(in srgb, var(--color-success) 15%, transparent); color: var(--color-success-text); }
.badge.tidak_layak { background-color: color-mix(in srgb, var(--color-warning) 15%, transparent); color: var(--color-warning-text); }
.badge.tercemar { background-color: color-mix(in srgb, var(--color-danger) 15%, transparent); color: var(--color-danger-text); }

.confidence {
  font-size: var(--font-size-xs);
  color: var(--color-text-secondary);
}

/* Quick Actions */
.quick-actions {
  display: flex;
  flex-direction: column;
}

.action-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  width: 100%;
}

/* Insight */
.insight-content {
  padding: 16px;
  background-color: color-mix(in srgb, var(--color-primary) 5%, transparent);
  border: 1px solid color-mix(in srgb, var(--color-primary) 20%, transparent);
  border-radius: var(--radius-md);
  display: flex;
  gap: 16px;
}

.insight-icon-wrap {
  color: var(--color-primary);
  flex-shrink: 0;
}

.insight-text {
  font-size: var(--font-size-sm);
  line-height: 1.5;
  color: var(--color-text-secondary);
  margin: 0;
}

.insight-text strong {
  color: var(--color-text-primary);
}

@media (max-width: 1024px) {
  .dashboard-grid-4 {
    grid-template-columns: repeat(2, 1fr);
  }
  .dashboard-grid-3 {
    grid-template-columns: 1fr;
  }
  .col-span-2, .col-span-1 {
    grid-column: span 1;
  }
}

@media (max-width: 640px) {
  .dashboard-grid-4 {
    grid-template-columns: 1fr;
  }
}
</style>
