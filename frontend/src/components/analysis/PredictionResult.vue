<template>
  <div class="result-card" :class="resultClass">
    <!-- Header -->
    <div class="result-card__header">
      <div class="result-card__header-left">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
          fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8">
          <path v-if="isLayak" stroke-linecap="round" stroke-linejoin="round"
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
          <path v-else stroke-linecap="round" stroke-linejoin="round"
            d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"/>
        </svg>
        <p class="result-card__title">Hasil Analisis Kualitas Air</p>
      </div>
      <span class="result-badge" :class="badgeClass">{{ categoryLabel }}</span>
    </div>

    <hr class="result-divider" />

    <!-- Body -->
    <div class="result-body">

      <!-- Confidence -->
      <div class="result-section">
        <p class="result-section__label">Tingkat Kepercayaan Model</p>
        <ConfidenceGauge :value="result.confidence" :category="result.category" />
      </div>

      <!-- Explanation -->
      <div class="result-section">
        <p class="result-section__label">Penjelasan Analisis</p>
        <p class="result-section__text">{{ result.explanation }}</p>
      </div>

      <!-- Recommendation -->
      <div class="result-section result-section--recommendation" :class="recClass">
        <p class="result-section__label">Rekomendasi Tindak Lanjut</p>
        <p class="result-section__text">{{ result.recommendation }}</p>
      </div>

    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import ConfidenceGauge from './ConfidenceGauge.vue'

const props = defineProps({
  result: {
    type: Object,
    required: true,
  },
})

// FIX: gunakan strict equality, bukan .includes('layak')
// "tidak_layak".includes('layak') === true → bug: air tidak layak ikut dianggap layak
const isLayak = computed(() => props.result?.category === 'layak')

const resultClass = computed(() =>
  isLayak.value ? 'result-card--success' : 'result-card--danger'
)

const badgeClass = computed(() =>
  isLayak.value ? 'result-badge--success' : 'result-badge--danger'
)

const recClass = computed(() =>
  isLayak.value ? 'result-section--rec-success' : 'result-section--rec-danger'
)

const categoryLabel = computed(() =>
  isLayak.value ? '✓ Layak Digunakan' : '✗ Tidak Layak Digunakan'
)
</script>

<style scoped>
/* Card base */
.result-card {
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 1px 3px rgba(0,0,0,.06);
}

.result-card--success { border-color: #bbf7d0; }
.result-card--danger  { border-color: #fecaca; }

/* Header */
.result-card__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 24px;
  gap: 12px;
}

.result-card--success .result-card__header { background: #f0fdf4; }
.result-card--danger  .result-card__header { background: #fef2f2; }

.result-card__header-left {
  display: flex;
  align-items: center;
  gap: 8px;
}

.result-card--success .result-card__header-left svg { color: #16a34a; }
.result-card--danger  .result-card__header-left svg { color: #dc2626; }

.result-card__title {
  font-size: 14px;
  font-weight: 600;
  color: #1a202c;
}

/* Badge */
.result-badge {
  font-size: 12px;
  font-weight: 700;
  padding: 4px 12px;
  border-radius: 20px;
  white-space: nowrap;
}

.result-badge--success {
  background: #dcfce7;
  color: #15803d;
  border: 1px solid #bbf7d0;
}

.result-badge--danger {
  background: #fee2e2;
  color: #b91c1c;
  border: 1px solid #fecaca;
}

/* Divider */
.result-divider {
  border: none;
  border-top: 1px solid #f1f5f9;
  margin: 0;
}

/* Body */
.result-body {
  padding: 20px 24px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

/* Section */
.result-section {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.result-section__label {
  font-size: 12px;
  font-weight: 700;
  color: #64748b;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.result-section__text {
  font-size: 13px;
  color: #374151;
  line-height: 1.65;
}

/* Recommendation block */
.result-section--recommendation {
  padding: 14px 16px;
  border-radius: 6px;
  border: 1px solid #e2e8f0;
  background: #f8fafc;
}

.result-section--rec-success {
  background: #f0fdf4;
  border-color: #bbf7d0;
}

.result-section--rec-danger {
  background: #fef2f2;
  border-color: #fecaca;
}

.result-section--rec-success .result-section__label { color: #15803d; }
.result-section--rec-danger  .result-section__label { color: #b91c1c; }
</style>