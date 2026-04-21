<script setup>
import ImageUploader from '@/components/analysis/ImageUploader.vue'
import ManualDataForm from '@/components/analysis/ManualDataForm.vue'
import { useAnalysisStore } from '@/stores/analysisStore'

const store = useAnalysisStore()

const handleSubmit = () => {
  if (!store.image) {
    alert('Upload gambar dulu')
    return
  }

  if (Object.keys(store.manualData).length === 0) {
    alert('Isi data dulu')
    return
  }

  console.log('READY TO ANALYZE')
}

</script>

<template>
  <div>
    <h1>Analisis Kualitas Air</h1>

    <ImageUploader />
    <ManualDataForm />

    <button @click="handleSubmit">Analisis</button>
  </div>
</template>