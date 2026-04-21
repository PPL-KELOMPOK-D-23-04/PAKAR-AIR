<script setup>
import { ref } from 'vue'
import ImageUploader from '@/components/analysis/ImageUploader.vue'
import ManualDataForm from '@/components/analysis/ManualDataForm.vue'
import PredictionResult from '@/components/analysis/PredictionResult.vue'
import { useAnalysisStore } from '@/stores/analysisStore'

const store = useAnalysisStore()
const loading = ref(false)

const handleSubmit = () => {
  if (!store.image) return
  if (Object.keys(store.manualData).length === 0) return

  loading.value = true

  // nanti di sini langsung diganti API (tanpa dummy sekarang)

  loading.value = false
}
</script>

<template>
  <div class="analysis-container">
    <h1>Analisis Kualitas Air</h1>

    <div class="analysis-content">
      <div class="left">
        <ImageUploader />
      </div>

      <div class="right">
        <ManualDataForm />
      </div>
    </div>

    <button 
      @click="handleSubmit"
      :disabled="!store.image || loading"
    >
      {{ loading ? 'Memproses...' : 'Analisis' }}
    </button>

    <!-- tetap siap nampung hasil -->
    <PredictionResult :result="store.result" />
  </div>
</template>

<style scoped>
.analysis-container {
  padding: 20px;
}

.analysis-content {
  display: flex;
  gap: 20px;
}

.left, .right {
  flex: 1;
}
</style>