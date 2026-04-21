<script setup>
import { ref } from 'vue'
import ImageUploader from '@/components/analysis/ImageUploader.vue'
import ManualDataForm from '@/components/analysis/ManualDataForm.vue'
import { useAnalysisStore } from '@/stores/analysisStore'

const store = useAnalysisStore()
const loading = ref(false)

const handleSubmit = () => {
  if (!store.image) {
    alert('Upload gambar dulu')
    return
  }

  if (Object.keys(store.manualData).length === 0) {
    alert('Isi data dulu')
    return
  }

  loading.value = true

  setTimeout(() => {
    console.log('IMAGE:', store.image)
    console.log('DATA:', store.manualData)
    loading.value = false
  }, 1000)
}
</script>

<template>
  <div>
    <h1>Analisis Kualitas Air</h1>

    <ImageUploader />
    <ManualDataForm />

    <button 
      @click="handleSubmit"
      :disabled="!store.image || loading"
    >
      {{ loading ? 'Memproses...' : 'Analisis' }}
    </button>
  </div>
</template>