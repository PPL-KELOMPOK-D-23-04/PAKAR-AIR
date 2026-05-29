<template>
  <div class="prediction-card" :class="themeClass">
    
    <!-- Hero Status Section -->
    <div class="prediction-hero">
      <div class="hero-left">
        <div class="hero-icon-wrap" :class="iconBgClass">
          <CheckCircle v-if="isLayak" size="28" class="hero-icon" />
          <AlertTriangle v-else size="28" class="hero-icon" />
        </div>
        <div class="hero-text">
          <p class="hero-subtitle">Hasil Analisis Kualitas Air</p>
          <h2 class="hero-title">{{ isLayak ? 'Layak Digunakan' : 'Tidak Layak Digunakan' }}</h2>
        </div>
      </div>
      <div class="hero-right">
        <button class="btn-export" @click="exportPDF">
          <Download size="16" />
          <span>Ekspor PDF</span>
        </button>
      </div>
    </div>

    <!-- Main Content Grid -->
    <div class="prediction-grid">
      
      <!-- Left Column: Confidence Gauge -->
      <div class="grid-col col-metrics">
        <div class="content-block">
          <h3 class="block-title">Akurasi Prediksi</h3>
          <div class="gauge-container">
            <ConfidenceGauge :value="analysisResult.confidence" :category="analysisResult.category" />
          </div>
          <p class="block-desc">Tingkat kepercayaan sistem (confidence score) terhadap hasil prediksi berdasarkan parameter yang diinput.</p>
        </div>
      </div>

      <!-- Right Column: Details -->
      <div class="grid-col col-details">
        <div class="content-block">
          <h3 class="block-title flex-title">
            <Info size="16" class="title-icon" />
            Penjelasan Analisis
          </h3>
          <p class="block-text">{{ analysisResult.explanation || 'Tidak ada penjelasan detail yang tersedia.' }}</p>
        </div>

        <div class="content-block recommendation-block" :class="recBgClass">
          <h3 class="block-title flex-title">
            <Lightbulb size="16" class="title-icon" />
            Rekomendasi Tindak Lanjut
          </h3>
          <p class="block-text">{{ analysisResult.recommendation || 'Tidak ada rekomendasi khusus.' }}</p>
        </div>
      </div>
      
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import ConfidenceGauge from './ConfidenceGauge.vue'
import { CheckCircle, AlertTriangle, Download, Info, Lightbulb } from 'lucide-vue-next'

const props = defineProps({
  result: {
    type: Object,
    required: true,
  },
})

// Shortcut ke data hasil
const analysisResult = computed(() => props.result?.result || props.result || {})
const isLayak = computed(() => analysisResult.value?.category === 'layak')

// Styling Themes
const themeClass = computed(() => isLayak.value ? 'theme-success' : 'theme-danger')
const iconBgClass = computed(() => isLayak.value ? 'bg-success-subtle text-success' : 'bg-danger-subtle text-danger')
const recBgClass = computed(() => isLayak.value ? 'rec-success' : 'rec-danger')

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
/* Main Card Container */
.prediction-card {
  background: var(--color-surface);
  border-radius: var(--radius-xl);
  border: 1px solid var(--color-border);
  box-shadow: var(--shadow-md);
  overflow: hidden;
  transition: all 0.3s ease;
}

.theme-success { border-top: 4px solid var(--color-success); }
.theme-danger { border-top: 4px solid var(--color-danger); }

/* Hero Section */
.prediction-hero {
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 24px;
  background: var(--color-bg);
  border-bottom: 1px solid var(--color-border-light);
}

@media (min-width: 640px) {
  .prediction-hero {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 32px 40px;
  }
}

.hero-left {
  display: flex;
  align-items: center;
  gap: 16px;
}

.hero-icon-wrap {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 56px;
  height: 56px;
  border-radius: 50%;
  flex-shrink: 0;
}

.bg-success-subtle { background: color-mix(in srgb, var(--color-success) 12%, transparent); }
.bg-danger-subtle { background: color-mix(in srgb, var(--color-danger) 12%, transparent); }
.text-success { color: var(--color-success); }
.text-danger { color: var(--color-danger); }

.hero-text {
  display: flex;
  flex-direction: column;
}

.hero-subtitle {
  font-size: var(--font-size-sm);
  color: var(--color-text-muted);
  text-transform: uppercase;
  letter-spacing: 0.5px;
  font-weight: 600;
  margin: 0 0 4px 0;
}

.hero-title {
  font-size: var(--font-size-2xl);
  font-weight: 800;
  color: var(--color-text-primary);
  margin: 0;
  line-height: 1.2;
  letter-spacing: -0.02em;
}

.hero-right {
  display: flex;
  align-items: center;
}

.btn-export {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 18px;
  font-size: var(--font-size-sm);
  font-weight: 600;
  color: var(--color-text-secondary);
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: var(--shadow-sm);
}

.btn-export:hover {
  background: var(--color-bg);
  border-color: var(--color-text-muted);
  color: var(--color-text-primary);
  transform: translateY(-1px);
}

/* Grid Content */
.prediction-grid {
  display: grid;
  grid-template-columns: 1fr;
  background: var(--color-surface);
}

@media (min-width: 820px) {
  .prediction-grid {
    grid-template-columns: 320px 1fr;
  }
}

.grid-col {
  padding: 24px;
}

@media (min-width: 820px) {
  .grid-col {
    padding: 32px 40px;
  }
}

.col-metrics {
  border-bottom: 1px solid var(--color-border-light);
}

@media (min-width: 820px) {
  .col-metrics {
    border-bottom: none;
    border-right: 1px solid var(--color-border-light);
  }
}

/* Typography & Blocks */
.content-block {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 24px;
}

.content-block:last-child {
  margin-bottom: 0;
}

.block-title {
  font-size: var(--font-size-sm);
  font-weight: 700;
  color: var(--color-text-primary);
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin: 0;
}

.flex-title {
  display: flex;
  align-items: center;
  gap: 8px;
}

.title-icon {
  color: var(--color-text-muted);
}

.block-desc {
  font-size: var(--font-size-xs);
  color: var(--color-text-muted);
  line-height: 1.5;
  margin: 0;
}

.block-text {
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
  line-height: 1.6;
  margin: 0;
}

.gauge-container {
  padding: 16px 0;
}

/* Recommendation Highlight */
.recommendation-block {
  padding: 20px;
  border-radius: var(--radius-lg);
  border-left: 4px solid;
}

.rec-success {
  background: color-mix(in srgb, var(--color-success) 4%, var(--color-surface));
  border-color: var(--color-success);
}

.rec-danger {
  background: color-mix(in srgb, var(--color-danger) 4%, var(--color-surface));
  border-color: var(--color-danger);
}

.rec-success .block-title { color: color-mix(in srgb, var(--color-success) 80%, black); }
.rec-danger .block-title { color: color-mix(in srgb, var(--color-danger) 80%, black); }
.rec-success .title-icon { color: var(--color-success); }
.rec-danger .title-icon { color: var(--color-danger); }
</style>
