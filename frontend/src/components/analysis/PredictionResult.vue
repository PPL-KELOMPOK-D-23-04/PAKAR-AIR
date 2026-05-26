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
        <ConfidenceGauge :value="analysisResult.confidence" :category="analysisResult.category" />
      </div>

      <!-- Explanation -->
      <div class="result-section">
        <p class="result-section__label">Penjelasan Analisis</p>
        <p class="result-section__text">{{ analysisResult.explanation }}</p>
      </div>

      <!-- Recommendation -->
      <div class="result-section result-section--recommendation" :class="recClass">
        <p class="result-section__label">Rekomendasi Tindak Lanjut</p>
        <p class="result-section__text">{{ analysisResult.recommendation }}</p>
      </div>

      <!-- Export Actions -->
      <div class="export-bar">
        <span class="export-bar__label">Simpan hasil ini:</span>
        <button class="btn-export-pdf" @click="exportPDF">
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="none"
            viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round"
              d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
          Ekspor PDF
        </button>
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

// Shortcut ke data hasil (mendukung objek utuh atau objek hasil saja)
const analysisResult = computed(() => props.result?.result || props.result || {})

const isLayak = computed(() => analysisResult.value?.category === 'layak')

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

function exportPDF() {
  const r = analysisResult.value
  const now = new Date().toLocaleDateString('id-ID', {
    day: 'numeric', month: 'long', year: 'numeric',
    hour: '2-digit', minute: '2-digit'
  })
  const isLayakVal = r?.category === 'layak'
  const confidencePercent = r?.confidence != null
    ? (r.confidence * 100).toFixed(1) + '%'
    : 'N/A'

  const printWindow = window.open('', '_blank', 'width=860,height=700')
  printWindow.document.write(`
    <!DOCTYPE html>
    <html lang="id">
    <head>
      <meta charset="UTF-8">
      <title>Hasil Analisis - PAKAR-AIR</title>
      <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: 'Segoe UI', Arial, sans-serif; color: #1a202c; padding: 36px; font-size: 13px; }
        .header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 28px; border-bottom: 2px solid #3b82f6; padding-bottom: 16px; }
        .header h1 { font-size: 20px; font-weight: 700; color: #1e40af; }
        .header p { font-size: 12px; color: #64748b; margin-top: 4px; }
        .header-right { text-align: right; font-size: 11px; color: #64748b; }
        .header-right strong { display: block; font-size: 13px; color: #1a202c; }
        .result-banner {
          padding: 16px 20px; border-radius: 10px; margin-bottom: 24px;
          display: flex; align-items: center; gap: 14px;
          background: ${isLayakVal ? '#f0fdf4' : '#fef2f2'};
          border: 1.5px solid ${isLayakVal ? '#bbf7d0' : '#fecaca'};
        }
        .result-icon { font-size: 32px; }
        .result-title { font-size: 18px; font-weight: 700; color: ${isLayakVal ? '#15803d' : '#dc2626'}; }
        .result-sub { font-size: 12px; color: #64748b; margin-top: 3px; }
        .section { margin-bottom: 20px; }
        .section-title { font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.6px; color: #64748b; margin-bottom: 8px; border-bottom: 1px solid #e2e8f0; padding-bottom: 6px; }
        .info-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; }
        .info-item { background: #f8fafc; border-radius: 8px; padding: 10px 14px; }
        .info-label { font-size: 11px; color: #94a3b8; margin-bottom: 3px; }
        .info-value { font-size: 13px; font-weight: 600; color: #1a202c; }
        .text-block { background: #f8fafc; border-radius: 8px; padding: 12px 14px; line-height: 1.7; color: #374151; }
        .footer { margin-top: 28px; text-align: center; font-size: 10px; color: #94a3b8; border-top: 1px solid #e2e8f0; padding-top: 12px; }
        @media print { body { padding: 20px; } }
      </style>
    </head>
    <body>
      <div class="header">
        <div>
          <h1>💧 PAKAR-AIR</h1>
          <p>Laporan Hasil Analisis Kualitas Air</p>
        </div>
        <div class="header-right">
          <strong>Dicetak pada</strong>${now}
        </div>
      </div>

      <div class="result-banner">
        <div class="result-icon">${isLayakVal ? '✅' : '❌'}</div>
        <div>
          <div class="result-title">${isLayakVal ? 'Layak Digunakan' : 'Tidak Layak Digunakan'}</div>
          <div class="result-sub">Tingkat kepercayaan model: <strong>${confidencePercent}</strong></div>
        </div>
      </div>

      <div class="section">
        <div class="section-title">Ringkasan Model</div>
        <div class="info-grid">
          <div class="info-item">
            <div class="info-label">Hasil Deep Learning (Citra)</div>
            <div class="info-value">${r?.dl_category ?? 'N/A'} ${r?.dl_confidence != null ? '(' + (r.dl_confidence * 100).toFixed(1) + '%)' : ''}</div>
          </div>
          <div class="info-item">
            <div class="info-label">Hasil Machine Learning (Parameter)</div>
            <div class="info-value">${r?.ml_category ?? 'N/A'} ${r?.ml_confidence != null ? '(' + (r.ml_confidence * 100).toFixed(1) + '%)' : ''}</div>
          </div>
        </div>
      </div>

      <div class="section">
        <div class="section-title">Penjelasan Analisis</div>
        <div class="text-block">${r?.explanation ?? 'Tidak ada penjelasan.'}</div>
      </div>

      <div class="section">
        <div class="section-title">Rekomendasi Tindak Lanjut</div>
        <div class="text-block">${r?.recommendation ?? 'Tidak ada rekomendasi.'}</div>
      </div>

      <div class="footer">Dokumen ini digenerate oleh sistem PAKAR-AIR • ${now}</div>
      <script>window.onload = function(){ window.print(); }<\/script>
    </body>
    </html>
  `)
  printWindow.document.close()
}
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
.export-bar {
  display: flex; align-items: center; gap: 10px;
  padding: 14px 24px;
  border-top: 1px solid #e2e8f0;
  background: #f8fafc;
}
.export-bar__label { font-size: 12px; color: #94a3b8; flex: 1; }
.btn-export-pdf {
  display: inline-flex; align-items: center; gap: 6px;
  padding: 7px 16px; font-size: 13px; font-weight: 600;
  border-radius: 8px; cursor: pointer;
  background: #fff; color: #dc2626;
  border: 1.5px solid #fca5a5;
  transition: background 0.15s, border-color 0.15s;
}
.btn-export-pdf:hover { background: #fef2f2; border-color: #ef4444; }
</style>