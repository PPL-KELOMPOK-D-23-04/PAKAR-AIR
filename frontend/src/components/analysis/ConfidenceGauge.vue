<template>
  <div class="gauge">
    <div class="gauge__track">
      <div
        class="gauge__fill"
        :style="{ width: percent + '%' }"
        :class="gaugeClass"
      />
    </div>
    <span class="gauge__label">{{ percent }}%</span>
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
  if (props.category === 'layak') return 'gauge__fill--success'
  if (props.category === 'tidak_layak') return 'gauge__fill--danger'
  return ''
})
</script>

<style scoped>
.gauge {
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
}

.gauge__track {
  flex: 1;
  height: 8px;
  background: #e2e8f0;
  border-radius: 4px;
  overflow: hidden;
}

.gauge__fill {
  height: 100%;
  background: #64748b;
  border-radius: 4px;
  transition: width 0.5s ease;
}

.gauge__fill--success {
  background: #22c55e;
}

.gauge__fill--danger {
  background: #ef4444;
}

.gauge__label {
  font-size: 13px;
  font-weight: 600;
  color: #475569;
  min-width: 40px;
  text-align: right;
  white-space: nowrap;
}
</style>