<template>
  <div class="confidence-gauge">
    <div class="gauge-header">
      <span class="gauge-title">Akurasi Prediksi</span>
      <span class="gauge-value" :class="labelClass">{{ percent }}%</span>
    </div>
    <div class="gauge-track">
      <div 
        class="gauge-fill" 
        :class="gaugeClass"
        :style="{ width: percent + '%' }"
      >
        <div class="gauge-glow" :class="glowClass"></div>
      </div>
    </div>
    <div class="gauge-footer">
      <span class="gauge-desc">Kepercayaan sistem terhadap hasil analisis ini.</span>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  value: { type: Number, default: 0 },
  category: { type: String, default: '' },
})

// Accept 0–1 or 0–100
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

const glowClass = computed(() => {
  if (props.category === 'layak') return 'glow-success'
  if (props.category === 'tidak_layak') return 'glow-warning'
  if (props.category === 'tercemar') return 'glow-danger'
  return 'glow-primary'
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
  gap: 8px;
  width: 100%;
}

.gauge-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
}

.gauge-title {
  font-size: var(--font-size-sm);
  font-weight: 600;
  color: var(--color-text-primary);
}

.gauge-value {
  font-size: var(--font-size-lg);
  font-weight: 700;
  line-height: 1;
}

.gauge-track {
  width: 100%;
  height: 10px;
  background: var(--color-border-light);
  border-radius: var(--radius-full);
  overflow: hidden;
  position: relative;
  box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.05);
}

.gauge-fill {
  height: 100%;
  border-radius: var(--radius-full);
  transition: width 1s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
}

/* Base Colors */
.bg-success { background-color: var(--color-success); }
.bg-warning { background-color: var(--color-warning); }
.bg-danger { background-color: var(--color-danger); }
.bg-primary { background-color: var(--color-primary); }

.text-success { color: var(--color-success-text); }
.text-warning { color: var(--color-warning-text); }
.text-danger { color: var(--color-danger-text); }
.text-primary { color: var(--color-primary); }

/* Glow Effects */
.gauge-glow {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  opacity: 0.3;
  animation: pulse 2s ease-in-out infinite alternate;
}

.glow-success { background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.6), transparent); }
.glow-warning { background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.6), transparent); }
.glow-danger { background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.6), transparent); }
.glow-primary { background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.6), transparent); }

.gauge-footer {
  display: flex;
  justify-content: space-between;
}

.gauge-desc {
  font-size: var(--font-size-xs);
  color: var(--color-text-muted);
}

@keyframes pulse {
  0% { opacity: 0.2; transform: translateX(-100%); }
  100% { opacity: 0.5; transform: translateX(100%); }
}
</style>