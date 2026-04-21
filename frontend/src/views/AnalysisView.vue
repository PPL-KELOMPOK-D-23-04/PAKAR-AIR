<script setup>
import { ref } from 'vue'
import ImageUploader from '@/components/analysis/ImageUploader.vue'
import ManualDataForm from '@/components/analysis/ManualDataForm.vue'
import PredictionResult from '@/components/analysis/PredictionResult.vue'
import { useAnalysisStore } from '@/stores/analysisStore'
import { analyzeWater } from '@/api/analysis'

const store = useAnalysisStore()
const loading = ref(false)

const handleSubmit = async () => {
  if (!store.image) return
  if (Object.keys(store.manualData).length === 0) return

  loading.value = true

  try {
    const formData = new FormData()

    formData.append('file', store.image)

    Object.keys(store.manualData).forEach((key) => {
      formData.append(key, store.manualData[key])
    })

    const res = await analyzeWater(formData)

    store.setResult({
      category: res.data.category,
      confidence: res.data.confidence,
      explanation: res.data.explanation,
      recommendation: res.data.recommendation
    })

  } catch (err) {
    console.error(err)
  } finally {
    loading.value = false
  }
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