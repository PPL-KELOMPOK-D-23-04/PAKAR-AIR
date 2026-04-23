<template>
  <div
    class="uploader"
    :class="{ 'uploader--drag': isDragging }"
    @dragenter.prevent="isDragging = true"
    @dragleave.prevent="isDragging = false"
    @dragover.prevent
    @drop.prevent="onDrop"
    @click="triggerInput"
  >
    <input
      ref="inputRef"
      type="file"
      accept=".jpg,.jpeg,.png,image/jpeg,image/png"
      class="uploader__input"
      @change="onFileChange"
    />
    <div class="uploader__body">
      <svg class="uploader__icon" xmlns="http://www.w3.org/2000/svg" width="40" height="40"
        fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
        <path stroke-linecap="round" stroke-linejoin="round"
          d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5
             m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
      </svg>
      <p class="uploader__label">Klik untuk upload atau drag &amp; drop</p>
      <p class="uploader__hint">PNG, JPG, JPEG (Maks. 5MB)</p>
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
  // reset so same file can be re-selected
  e.target.value = ''
}

function onDrop(e) {
  isDragging.value = false
  const f = e.dataTransfer.files?.[0]
  if (f) emit('file-selected', f)
}
</script>

<style scoped>
.uploader {
  border: 1.5px dashed #b0b0b0;
  border-radius: 4px;
  padding: 48px 24px;
  cursor: pointer;
  text-align: center;
  background: #fafafa;
  transition: border-color 0.15s, background 0.15s;
  user-select: none;
}
.uploader--drag,
.uploader:hover {
  border-color: #666;
  background: #f0f0f0;
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
  color: #888;
}
.uploader__label {
  font-size: 14px;
  color: #444;
  margin: 0;
}
.uploader__hint {
  font-size: 12px;
  color: #999;
  margin: 0;
}
</style>