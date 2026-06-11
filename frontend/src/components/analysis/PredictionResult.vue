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

    <!-- Uploaded Image Section -->
    <div v-if="imageUrl" class="image-section">
      <div class="image-section__header">
        <ImageIcon size="16" class="image-section__icon" />
        <h3 class="image-section__title">Citra Sampel Air</h3>
      </div>
      <div class="image-section__frame">
        <img
          :src="imageUrl"
          alt="Citra sampel air yang diunggah"
          class="image-section__img"
          crossorigin="anonymous"
          ref="sampleImageEl"
          @load="onImageLoaded"
        />
      </div>
      <p class="image-section__caption">Foto sampel air yang digunakan untuk analisis citra (Deep Learning).</p>
    </div>

    <!-- Main Content Grid -->
    <div class="prediction-grid">
      
      <!-- Left Column: Confidence Gauge -->
      <div class="grid-col col-metrics">
        <div class="content-block">
          <div class="gauge-container">
            <ConfidenceGauge :value="analysisResult.confidence" :category="analysisResult.category" />
          </div>
        </div>
      </div>

      <!-- Right Column: Details -->
      <div class="grid-col col-details">
        <div class="content-block">
          <h3 class="block-title flex-title">
            <Info size="16" class="title-icon" />
            Penjelasan Analisis
          </h3>
          <div v-if="parsedExplanation" class="expl-stack">
            <div v-for="(item, i) in parsedExplanation" :key="i" class="expl-item">
              <div class="expl-icon-wrapper">
                <ImageIcon v-if="item.icon === 'ImageIcon'" size="14" />
                <Activity v-if="item.icon === 'Activity'" size="14" />
                <CheckCircle v-if="item.icon === 'CheckCircle'" size="14" />
              </div>
              <div class="expl-text">
                <span class="expl-label">{{ item.title }}</span>
                <span class="expl-value">{{ item.value }}</span>
              </div>
            </div>
          </div>
          <p v-else class="block-text">{{ analysisResult.explanation || 'Tidak ada penjelasan detail yang tersedia.' }}</p>
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
import { computed, ref } from 'vue'
import ConfidenceGauge from './ConfidenceGauge.vue'
import { CheckCircle, AlertTriangle, Download, Info, Lightbulb, ImageIcon, Activity } from 'lucide-vue-next'

const props = defineProps({
  result: {
    type: Object,
    required: true,
  },
})

// Shortcut ke data hasil
const analysisResult = computed(() => props.result?.result || props.result || {})
const isLayak = computed(() => analysisResult.value?.category === 'layak')

// Image URL from the API response
const imageUrl = computed(() => {
  // The full API response has image_input.image_path
  if (props.result?.image_input?.image_path) return props.result.image_input.image_path
  // Fallback: might be at top level
  if (props.result?.image_path) return props.result.image_path
  return null
})

// Format explanation text into a structured array
const parsedExplanation = computed(() => {
  const text = analysisResult.value?.explanation || ''
  if (!text) return null
  
  const items = []
  
  // Extract DL
  const dlMatch = text.match(/Analisis [Cc]itra.*?:(.*?)(\n|Analisis data manual:|• Analisis Parameter)/s);
  if (dlMatch) {
    items.push({
      title: 'Analisis Citra (Deep Learning)',
      value: dlMatch[1].trim().replace(/^[\.•]\s*|\.*$/g, ''),
      icon: 'ImageIcon'
    })
  }

  // Extract ML
  const mlMatch = text.match(/Analisis (?:data manual|Parameter).*?:(.*?)(\n|Hasil akhir|• Kesimpulan)/s);
  if (mlMatch) {
    items.push({
      title: 'Analisis Parameter (Machine Learning)',
      value: mlMatch[1].trim().replace(/^[\.•]\s*|\.*$/g, ''),
      icon: 'Activity'
    })
  }

  // Extract Conclusion
  const finalMatch = text.match(/(?:Hasil akhir|Kesimpulan Akhir).*?:(.*?)$/s);
  if (finalMatch) {
    items.push({
      title: 'Kesimpulan Akhir',
      value: finalMatch[1].trim().replace(/^[\.•]\s*|\.*$/g, ''),
      icon: 'CheckCircle'
    })
  }

  return items.length > 0 ? items : null
})

// For PDF export: store base64 version of the image
const sampleImageEl = ref(null)
const imageBase64 = ref(null)

function onImageLoaded() {
  try {
    const img = sampleImageEl.value
    if (!img) return
    const canvas = document.createElement('canvas')
    canvas.width = img.naturalWidth
    canvas.height = img.naturalHeight
    const ctx = canvas.getContext('2d')
    ctx.drawImage(img, 0, 0)
    imageBase64.value = canvas.toDataURL('image/jpeg', 0.85)
  } catch (e) {
    // CORS may block this; fall back to URL
    console.warn('Could not convert image to base64 for PDF:', e)
    imageBase64.value = null
  }
}

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

  // Build image HTML for the PDF
  const imgSrc = imageBase64.value || imageUrl.value
  const imageHtml = imgSrc ? `
      <div class="section">
        <div class="section-title">Citra Sampel Air</div>
        <div class="image-frame">
          <img src="${imgSrc}" alt="Citra sampel air" />
        </div>
        <p class="image-caption">Foto sampel air yang dianalisis oleh model Deep Learning.</p>
      </div>
  ` : ''

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
        .text-block { background: #f8fafc; border-radius: 8px; padding: 12px 14px; line-height: 1.7; color: #374151; white-space: pre-wrap; }
        .image-frame { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 10px; padding: 12px; text-align: center; }
        .image-frame img { max-width: 100%; max-height: 320px; border-radius: 8px; object-fit: contain; }
        .image-caption { font-size: 11px; color: #94a3b8; margin-top: 8px; text-align: center; }
        .footer { margin-top: 28px; text-align: center; font-size: 10px; color: #94a3b8; border-top: 1px solid #e2e8f0; padding-top: 12px; }
        @media print { body { padding: 20px; } .image-frame img { max-height: 280px; } }
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

      ${imageHtml}

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
        <div class="text-block">${
          parsedExplanation.value 
          ? parsedExplanation.value.map(item => `<strong>${item.title}:</strong> ${item.value}`).join('<br><br>')
          : (r?.explanation ?? 'Tidak ada penjelasan.')
        }</div>
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
  border-radius: 2px;
  border: 1px solid var(--color-border);
  box-shadow: var(--shadow-sm);
  overflow: hidden;
}

.theme-success { border-top: 4px solid var(--color-success); }
.theme-danger { border-top: 4px solid var(--color-danger); }

/* Hero Section */
.prediction-hero {
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 32px;
  background: var(--color-surface);
  border-bottom: 1px solid var(--color-border-light);
  position: relative;
  overflow: hidden;
}

@media (min-width: 640px) {
  .prediction-hero {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 40px 48px;
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
  border-radius: 2px;
  flex-shrink: 0;
}

.bg-success-subtle { 
  background: color-mix(in srgb, var(--color-success) 12%, transparent); 
}
.bg-danger-subtle { 
  background: color-mix(in srgb, var(--color-danger) 12%, transparent); 
}
.text-success { color: var(--color-success); }
.text-danger { color: var(--color-danger); }

.hero-text {
  display: flex;
  flex-direction: column;
}

.hero-subtitle {
  font-family: var(--font-mono);
  font-size: 11px;
  color: var(--color-text-muted);
  text-transform: uppercase;
  letter-spacing: 0.12em;
  font-weight: 600;
  margin: 0 0 6px 0;
}

.hero-title {
  font-family: var(--font-sans);
  font-size: 24px;
  font-weight: 700;
  color: var(--color-text-primary);
  margin: 0;
  line-height: 1.2;
}

.hero-right {
  display: flex;
  align-items: center;
}

.btn-export {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 10px 20px;
  font-family: var(--font-mono);
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.05em;
  color: var(--color-text-secondary);
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.btn-export:hover {
  background: var(--color-bg);
  border-color: var(--color-text-muted);
  color: var(--color-text-primary);
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
}

/* Grid Content */
.prediction-grid {
  display: grid;
  grid-template-columns: 1fr;
}

@media (min-width: 820px) {
  .prediction-grid {
    grid-template-columns: 360px 1fr;
  }
}

.grid-col {
  padding: 32px;
}

@media (min-width: 820px) {
  .grid-col {
    padding: 40px 48px;
  }
}

.col-metrics {
  background: var(--color-surface);
  border-bottom: 1px solid var(--color-border-light);
}

@media (min-width: 820px) {
  .col-metrics {
    border-bottom: none;
    border-right: 1px solid var(--color-border-light);
  }
}

.col-details {
  background: var(--color-bg);
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
  font-family: var(--font-mono);
  font-size: 11px;
  font-weight: 700;
  color: var(--color-text-primary);
  text-transform: uppercase;
  letter-spacing: 0.08em;
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
  font-family: var(--font-sans);
  font-size: 13px;
  color: var(--color-text-muted);
  line-height: 1.5;
  margin: 0;
}

.block-text {
  font-family: var(--font-sans);
  font-size: 14px;
  color: var(--color-text-secondary);
  line-height: 1.6;
  margin: 0;
  white-space: pre-wrap;
}

.gauge-container {
  padding: 16px 0;
}

/* Explanation Stack */
.expl-stack {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-top: 8px;
}

.expl-item {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 12px 16px;
  background: var(--color-surface);
  border-radius: 2px;
  border: 1px solid var(--color-border);
}

.expl-icon-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  border-radius: 2px;
  background: var(--color-bg);
  border: 1px solid var(--color-border-light);
  color: var(--color-text-muted);
  flex-shrink: 0;
}

.expl-text {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.expl-label {
  font-family: var(--font-mono);
  font-size: 10px;
  font-weight: 700;
  color: var(--color-text-muted);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.expl-value {
  font-family: var(--font-sans);
  font-size: 13px;
  font-weight: 500;
  color: var(--color-text-primary);
  line-height: 1.4;
}

/* Recommendation Highlight */
.recommendation-block {
  padding: 16px 20px;
  border-radius: 2px;
  border-left: 3px solid;
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

/* Uploaded Image Section */
.image-section {
  padding: 32px;
  border-bottom: 1px solid var(--color-border-light);
  background: var(--color-surface);
}

@media (min-width: 640px) {
  .image-section {
    padding: 40px 48px;
  }
}

.image-section__header {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 16px;
}

.image-section__icon {
  color: var(--color-text-muted);
}

.image-section__title {
  font-family: var(--font-mono);
  font-size: 11px;
  font-weight: 700;
  color: var(--color-text-primary);
  text-transform: uppercase;
  letter-spacing: 0.08em;
  margin: 0;
}

.image-section__frame {
  background: var(--color-neutral-bg);
  border: 1px solid var(--h-rule-light);
  border-radius: 2px;
  padding: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  transition: border-color 0.2s ease;
}

.image-section__frame:hover {
  border-color: var(--color-text-muted);
}

.image-section__img {
  max-width: 100%;
  max-height: 360px;
  border-radius: 2px;
  object-fit: contain;
  display: block;
}

.image-section__caption {
  font-family: var(--font-sans);
  font-size: 12px;
  color: var(--color-text-muted);
  margin: 10px 0 0 0;
  text-align: center;
  line-height: 1.4;
}
</style>
