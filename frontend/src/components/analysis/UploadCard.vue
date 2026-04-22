<script setup>
import ImageUploader from './ImageUploader.vue'
</script>

<template>
  <div class="card">
    <h2>Upload Foto Air</h2>
    <p class="desc">Unggah foto sampel air yang akan dianalisis.</p>

    <div class="upload-box">
      <ImageUploader />
    </div>
  </div>
</template>

<style scoped>
.card {
  background: #fff;
  border-radius: 12px;
  padding: 24px;
  border: 1px solid #e5e7eb;
}

.desc {
  color: #6b7280;
  margin-bottom: 16px;
}

.upload-box {
  border: 2px dashed #d1d5db;
  border-radius: 10px;
  padding: 40px;
  text-align: center;
}
</style>