<template>
  <div
    class="uploader"
    :class="{ 'uploader--drag': isDragging }"
    @dragenter.prevent="isDragging = true"
    @dragleave.prevent="isDragging = false"
    @dragover.prevent
    @drop.prevent="onDrop"
    @click="triggerInput"
    role="button"
    tabindex="0"
    @keydown.enter="triggerInput"
    @keydown.space.prevent="triggerInput"
    aria-label="Upload foto air"
  >
    <input
      ref="inputRef"
      type="file"
      accept=".jpg,.jpeg,.png,image/jpeg,image/png"
      class="uploader__input"
      @change="onFileChange"
    />

    <div class="uploader__body">
      <svg class="uploader__icon" xmlns="http://www.w3.org/2000/svg"
        width="36" height="36" fill="none" viewBox="0 0 24 24"
        stroke="currentColor" stroke-width="1.5">
        <path stroke-linecap="round" stroke-linejoin="round"
          d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5
             m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
      </svg>
      <p class="uploader__label">Klik untuk upload atau drag &amp; drop</p>
      <p class="uploader__hint">PNG, JPG, JPEG &nbsp;·&nbsp; Maks. 5MB</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const emit = defineEmits(['file-selected'])
const inputRef = ref(null)
const isDragging = ref(false)

function triggerInput() {
  inputRef.value?.click()
}

function onFileChange(e) {
  const f = e.target.files?.[0]
  if (f) emit('file-selected', f)
  e.target.value = '' // allow re-selecting same file
}

function onDrop(e) {
  isDragging.value = false
  const f = e.dataTransfer.files?.[0]
  if (f) emit('file-selected', f)
}
</script>

<style scoped>
.uploader {
  border: 1.5px dashed #cbd5e1;
  border-radius: 6px;
  padding: 40px 24px;
  cursor: pointer;
  text-align: center;
  background: #f8fafc;
  transition: border-color 0.15s, background 0.15s;
  user-select: none;
  outline: none;
}

.uploader:hover,
.uploader:focus-visible {
  border-color: #94a3b8;
  background: #f1f5f9;
}

.uploader--drag {
  border-color: #3b82f6;
  background: #eff6ff;
}

.uploader__input {
  display: none;
}

.uploader__body {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  pointer-events: none;
}

.uploader__icon {
  color: #94a3b8;
}

.uploader__label {
  font-size: 14px;
  color: #475569;
  font-weight: 500;
}

.uploader__hint {
  font-size: 12px;
  color: #94a3b8;
}
</style>