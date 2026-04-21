<script setup>
import ImageUploader from '@/components/analysis/ImageUploader.vue'
import ManualDataForm from '@/components/analysis/ManualDataForm.vue'
import { useAnalysisStore } from '@/stores/analysisStore'

const store = useAnalysisStore()

const handleSubmit = () => {
  console.log('IMAGE:', store.image)
  console.log('DATA:', store.manualData)
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