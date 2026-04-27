<template>
  <div class="upload-card">
    <!-- Header -->
    <div class="card-header">
      <div class="card-header__icon">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
          fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8">
          <path stroke-linecap="round" stroke-linejoin="round"
            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14
               m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
        </svg>
      </div>
      <div>
        <p class="card-header__title">Upload Foto Air</p>
        <p class="card-header__sub">Unggah foto sampel air yang akan dianalisis.</p>
      </div>
    </div>

    <!-- Uploader or Preview -->
    <div v-if="previewUrl" class="preview">
      <img :src="previewUrl" alt="Preview foto air" class="preview__img" />
      <div class="preview__info">
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14"
          fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round"
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
        </svg>
        <span class="preview__filename">{{ fileName }}</span>
        <button class="preview__change" @click.stop="handleChange">Ganti</button>
      </div>
    </div>

    <ImageUploader v-else @file-selected="onFileSelected" />

    <!-- Validation Error -->
    <p v-if="uploadError" class="upload-card__error">
      <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13"
        fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
        <path stroke-linecap="round" stroke-linejoin="round"
          d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
      </svg>
      {{ uploadError }}
    </p>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import ImageUploader from './ImageUploader.vue'
import { useFileUpload } from '../../composables/useFileUpload'
import { useAnalysisStore } from '../../stores/analysisStore'

const store = useAnalysisStore()
const { file, previewUrl, error: uploadError, handleFile, clearFile } = useFileUpload()

const fileName = computed(() => file.value?.name ?? null)

function onFileSelected(selectedFile) {
  const valid = handleFile(selectedFile)
  if (valid) store.setImage(file.value)
}

function handleChange() {
  clearFile()
  store.setImage(null)
}
</script>

<style scoped>
.upload-card {
  background: #ffffff;
  border: 1px solid var(--color-border, #e2e8f0);
  border-radius: 8px;
  padding: 20px 24px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  box-shadow: var(--shadow-card, 0 1px 3px rgba(0,0,0,.06));
}

/* Header */
.card-header {
  display: flex;
  align-items: flex-start;
  gap: 12px;
}

.card-header__icon {
  width: 34px;
  height: 34px;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  color: #64748b;
}

.card-header__title {
  font-size: 14px;
  font-weight: 600;
  color: #1a202c;
  margin-bottom: 2px;
}

.card-header__sub {
  font-size: 12px;
  color: #94a3b8;
}

/* Preview */
.preview {
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  overflow: hidden;
}

.preview__img {
  width: 100%;
  max-height: 220px;
  object-fit: cover;
  display: block;
}

.preview__info {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 12px;
  background: #f8fafc;
  border-top: 1px solid #e2e8f0;
  color: #475569;
}

.preview__filename {
  font-size: 12px;
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.preview__change {
  font-size: 12px;
  color: #3b82f6;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  flex-shrink: 0;
}

.preview__change:hover {
  text-decoration: underline;
}

/* Error */
.upload-card__error {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  color: #991b1b;
  background: #fef2f2;
  border: 1px solid #fecaca;
  border-radius: 4px;
  padding: 8px 12px;
}
</style>