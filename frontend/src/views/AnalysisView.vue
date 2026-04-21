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

  setTimeout(() => {
    console.log(store.image, store.manualData)
    loading.value = false
  }, 1000)
}
</script>

<template>
  <div class="analysis-page">
    <h1 class="title">Analisis Baru</h1>
    <p class="subtitle">Upload foto air dan lengkapi informasi untuk analisis</p>

    <div class="card upload-card">
      <h2>Upload Foto Air</h2>
      <ImageUploader />
    </div>

    <div class="card form-card">
      <h2>Informasi Air</h2>
      <ManualDataForm />
    </div>

    <button 
      class="analyze-btn"
      @click="handleSubmit"
      :disabled="!store.image || loading"
    >
      {{ loading ? 'Memproses...' : 'Proses Analisis' }}
    </button>

    <PredictionResult v-if="store.result" :result="store.result" />
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