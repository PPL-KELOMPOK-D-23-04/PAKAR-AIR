<script setup>
import ManualDataForm from './ManualDataForm.vue'
</script>

<template>
  <div class="card">
    <h2>Informasi Air</h2>
    <p class="desc">Lengkapi informasi berikut untuk membantu proses analisis.</p>

    <ManualDataForm />
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
</style>