<template>
  <div class="upload-card">
    <div class="upload-card__header">
      <div class="upload-card__icon-box">
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18"
          fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
          <rect x="3" y="3" width="18" height="18" rx="2"/>
          <path stroke-linecap="round" stroke-linejoin="round" d="M3 15l5-5 4 4 3-3 6 6"/>
        </svg>
      </div>
      <div>
        <p class="upload-card__title">Upload Foto Air</p>
        <p class="upload-card__sub">Unggah foto sampel air yang akan dianalisis.</p>
      </div>
    </div>

    <ImageUploader @file-selected="onFileSelected" />

    <p v-if="uploadError" class="upload-card__error">{{ uploadError }}</p>

    <div v-if="fileName" class="upload-card__filename">
      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14"
        fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
        <path stroke-linecap="round" stroke-linejoin="round"
          d="M9 12l2 2 4-4M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
      </svg>
      <span>{{ fileName }}</span>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import ImageUploader from './ImageUploader.vue'
import { useFileUpload } from '../../composables/useFileUpload'
import { useAnalysisStore } from '../../stores/analysisStore'

const store = useAnalysisStore()
const { file, error: uploadError, handleFile } = useFileUpload()

const fileName = computed(() => file.value?.name ?? null)

function onFileSelected(selectedFile) {
  const valid = handleFile(selectedFile)
  if (valid) store.setImage(file.value)
}
</script>

<style scoped>
.upload-card {
  background: #fff;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  padding: 20px 24px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.upload-card__header {
  display: flex;
  align-items: flex-start;
  gap: 12px;
}
.upload-card__icon-box {
  width: 36px;
  height: 36px;
  border: 1px solid #ccc;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  color: #666;
}
.upload-card__title {
  font-size: 14px;
  font-weight: 600;
  color: #222;
  margin: 0 0 2px;
}
.upload-card__sub {
  font-size: 12px;
  color: #888;
  margin: 0;
}
.upload-card__error {
  font-size: 12px;
  color: #555;
  background: #f5f5f5;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 6px 10px;
  margin: 0;
}
.upload-card__filename {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  color: #444;
}
</style>