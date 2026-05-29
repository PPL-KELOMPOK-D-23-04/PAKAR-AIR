<template>
  <BaseCard padding="md">
    <template #header>
      <div class="header-content">
        <div class="header-icon-wrap">
          <UploadCloud size="20" />
        </div>
        <div>
          <h3 class="card-title">Upload Foto Air</h3>
          <p class="card-subtitle">Unggah foto sampel air yang akan dianalisis.</p>
        </div>
      </div>
    </template>

    <!-- Uploader or Preview -->
    <div v-if="previewUrl" class="preview-container">
      <img :src="previewUrl" alt="Preview foto air" class="preview-image" />
      <div class="preview-footer">
        <div class="filename-wrap">
          <FileText size="16" class="icon-muted" />
          <span class="preview-filename">{{ fileName }}</span>
        </div>
        <button class="btn-change" @click.stop="handleChange">Ganti</button>
      </div>
    </div>

    <ImageUploader v-else @file-selected="onFileSelected" />

    <!-- Validation Error -->
    <div v-if="uploadError" class="error-alert">
      <AlertTriangle size="16" />
      <span>{{ uploadError }}</span>
    </div>
  </BaseCard>
</template>

<script setup>
import { computed } from 'vue'
import BaseCard from '../common/BaseCard.vue'
import ImageUploader from './ImageUploader.vue'
import { UploadCloud, FileText, AlertTriangle } from 'lucide-vue-next'
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
/* Header */
.header-content {
  display: flex;
  align-items: flex-start;
  gap: 16px;
}

.header-icon-wrap {
  width: 40px;
  height: 40px;
  border: 1px solid var(--color-border-strong);
  border-radius: var(--radius-md);
  background: var(--color-bg);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  color: var(--color-text-secondary);
}

.card-title {
  font-size: var(--font-size-md);
  font-weight: 600;
  color: var(--color-text-primary);
  margin: 0 0 4px 0;
}

.card-subtitle {
  font-size: var(--font-size-sm);
  color: var(--color-text-muted);
  margin: 0;
}

/* Preview */
.preview-container {
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  overflow: hidden;
  margin-top: 16px;
}

.preview-image {
  width: 100%;
  max-height: 220px;
  object-fit: cover;
  display: block;
}

.preview-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 12px 16px;
  background: var(--color-bg);
  border-top: 1px solid var(--color-border);
}

.filename-wrap {
  display: flex;
  align-items: center;
  gap: 8px;
  overflow: hidden;
}

.icon-muted {
  color: var(--color-text-muted-light);
  flex-shrink: 0;
}

.preview-filename {
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.btn-change {
  font-size: var(--font-size-sm);
  font-weight: 500;
  color: var(--color-primary);
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  flex-shrink: 0;
  transition: color var(--transition-fast);
}

.btn-change:hover {
  color: color-mix(in srgb, var(--color-primary) 80%, black);
  text-decoration: underline;
}

/* Error Alert */
.error-alert {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 16px;
  font-size: var(--font-size-sm);
  color: var(--color-danger-text);
  background: var(--color-danger-bg);
  border: 1px solid var(--color-danger-border);
  border-radius: var(--radius-sm);
  padding: 12px;
}
</style>