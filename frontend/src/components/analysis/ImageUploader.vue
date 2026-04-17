<script setup>
import { useFileUpload } from '@/composables/useFileUpload'
import { useAnalysisStore } from '@/stores/analysisStore'

const store = useAnalysisStore()
const { previewUrl, handleFileChange } = useFileUpload()

const onChange = (e) => {
  handleFileChange(e)
  store.setImage(e.target.files[0])
}
</script>

<template>
  <div>
    <h3>Upload Citra Air</h3>

    <input type="file" @change="onChange" />

    <img v-if="previewUrl" :src="previewUrl" width="200" />
  </div>
</template>