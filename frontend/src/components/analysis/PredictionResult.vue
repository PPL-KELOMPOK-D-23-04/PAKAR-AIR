<template>
  <div class="result-card">
    <div class="result-card__header">
      <p class="result-card__title">Hasil Analisis</p>
      <p class="result-card__sub">Hasil deteksi kualitas air berdasarkan data yang diinput.</p>
    </div>

    <div class="result-card__body">

      <!-- Category -->
      <div class="result-row">
        <span class="result-key">Kategori Kualitas</span>
        <span class="result-badge">{{ result.category }}</span>
      </div>

      <!-- Confidence -->
      <div class="result-col">
        <span class="result-key">Tingkat Kepercayaan</span>
        <ConfidenceGauge :value="result.confidence" />
      </div>

      <!-- Recommendation -->
      <div class="result-col">
        <span class="result-key">Rekomendasi</span>
        <p class="result-text">{{ result.recommendation }}</p>
      </div>

      <hr class="result-divider" />

      <!-- Explanation -->
      <div class="result-col">
        <span class="result-key">Penjelasan Model</span>
        <p class="result-text">{{ result.explanation }}</p>
      </div>

    </div>
  </div>
</template>

<script setup>
import ConfidenceGauge from './ConfidenceGauge.vue'

defineProps({
  result: { type: Object, required: true },
})
</script>

<style scoped>
.result-card {
  background: #fff;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  padding: 20px 24px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.result-card__header {
  border-bottom: 1px solid #ebebeb;
  padding-bottom: 12px;
}
.result-card__title {
  font-size: 14px;
  font-weight: 600;
  color: #222;
  margin: 0 0 4px;
}
.result-card__sub {
  font-size: 12px;
  color: #888;
  margin: 0;
}
.result-card__body {
  display: flex;
  flex-direction: column;
  gap: 14px;
}
.result-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}
.result-col {
  display: flex;
  flex-direction: column;
  gap: 6px;
}
.result-key {
  font-size: 13px;
  font-weight: 500;
  color: #444;
}
.result-badge {
  background: #f0f0f0;
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 3px 10px;
  font-size: 13px;
  font-weight: 600;
  color: #222;
}
.result-text {
  font-size: 13px;
  color: #555;
  margin: 0;
  line-height: 1.6;
}
.result-divider {
  border: none;
  border-top: 1px solid #ebebeb;
  margin: 0;
}
</style>