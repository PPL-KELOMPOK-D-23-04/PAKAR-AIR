<template>
  <div class="confidence-gauge">
    <div class="gauge-header">
      <div class="gauge-title-group">
        <span class="gauge-title">Akurasi Prediksi</span>
        <span class="gauge-desc">Kepercayaan sistem terhadap hasil analisis ini.</span>
      </div>
      <span class="gauge-value" :class="labelClass">{{ percent }}%</span>
    </div>
    
    <div class="gauge-track">
      <div 
        class="gauge-fill" 
        :class="gaugeClass"
        :style="{ width: percent + '%' }"
      ></div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  value: { type: Number, default: 0 },
  category: { type: String, default: '' },
})

const percent = computed(() => {
  const v = props.value > 1 ? props.value : props.value * 100
  return Math.round(Math.min(100, Math.max(0, v)))
})

const gaugeClass = computed(() => {
  if (props.category === 'layak') return 'bg-success'
  if (props.category === 'tidak_layak') return 'bg-warning'
  if (props.category === 'tercemar') return 'bg-danger'
  return 'bg-primary'
})

const labelClass = computed(() => {
  if (props.category === 'layak') return 'text-success'
  if (props.category === 'tidak_layak') return 'text-warning'
  if (props.category === 'tercemar') return 'text-danger'
  return 'text-primary'
})
</script>

<style scoped>
.confidence-gauge {
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 100%;
}

.gauge-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

.gauge-title-group {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.gauge-title {
  font-family: var(--font-sans);
  font-size: 14px;
  font-weight: 600;
  color: var(--color-text-primary);
}

.gauge-desc {
  font-family: var(--font-sans);
  font-size: 12px;
  color: var(--color-text-secondary);
}

.gauge-value {
  font-family: var(--font-mono);
  font-size: 18px;
  font-weight: 700;
  line-height: 1.2;
}

.gauge-track {
  width: 100%;
  height: 8px;
  background: var(--color-border-light);
  border-radius: 2px;
  overflow: hidden;
}

.gauge-fill {
  height: 100%;
  border-radius: 2px;
  transition: width 1s cubic-bezier(0.25, 0.8, 0.25, 1);
}

/* Strict Solid Colors for Corporate Look */
.bg-success { background-color: var(--color-success); }
.bg-warning { background-color: var(--color-warning); }
.bg-danger { background-color: var(--color-danger); }
.bg-primary { background-color: var(--color-primary); }

.text-success { color: var(--color-success); }
.text-warning { color: color-mix(in srgb, var(--color-warning) 80%, black); }
.text-danger { color: var(--color-danger); }
.text-primary { color: var(--color-primary); }
</style>