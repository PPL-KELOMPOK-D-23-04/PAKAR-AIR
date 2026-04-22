<script setup>
import { ref } from 'vue'
import { useAnalysisStore } from '@/stores/analysisStore'

import UploadCard from '@/components/analysis/UploadCard.vue'
import ManualFormCard from '@/components/analysis/ManualFormCard.vue'

const store = useAnalysisStore()
const loading = ref(false)

const handleSubmit = () => {
  if (!store.image) return
  if (Object.keys(store.manualData).length === 0) return

  loading.value = true

  setTimeout(() => {
    loading.value = false
  }, 1000)
}
</script>

<template>
  <div class="analysis-wrapper">

    <div class="header">
      <h1>Analisis Baru</h1>
      <p>Upload foto air dan lengkapi informasi untuk analisis kualitas air.</p>
    </div>

    <UploadCard />
    <ManualFormCard />

    <div class="action">
      <button 
        class="primary"
        @click="handleSubmit"
        :disabled="!store.image || loading"
      >
        {{ loading ? 'Memproses...' : 'Proses Analisis' }}
      </button>

      <button class="secondary">
        Batal
      </button>
    </div>

  </div>
</template>

<style scoped>
.analysis-wrapper {
  max-width: 1000px;
  margin: auto;
  padding: 24px;
}

.header h1 {
  font-size: 28px;
  font-weight: 700;
}

.header p {
  color: #6b7280;
  margin-bottom: 24px;
}

.action {
  display: flex;
  gap: 12px;
  margin-top: 20px;
}

.primary {
  flex: 1;
  padding: 14px;
  border-radius: 8px;
  border: none;
  background: #3b82f6;
  color: white;
  font-weight: 600;
}

.secondary {
  width: 120px;
  border-radius: 8px;
  border: 1px solid #d1d5db;
  background: white;
}
</style>