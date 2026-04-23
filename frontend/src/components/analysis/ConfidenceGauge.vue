<template>
  <div class="gauge">
    <div class="gauge__track">
      <div class="gauge__fill" :style="{ width: percent + '%' }" />
    </div>
    <span class="gauge__label">{{ percent }}%</span>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  value: { type: Number, default: 0 },
})

// Accept either 0–1 or 0–100
const percent = computed(() => {
  const v = props.value > 1 ? props.value : props.value * 100
  return Math.round(Math.min(100, Math.max(0, v)))
})
</script>

<style scoped>
.gauge {
  display: flex;
  align-items: center;
  gap: 10px;
}
.gauge__track {
  flex: 1;
  height: 8px;
  background: #e5e5e5;
  border-radius: 4px;
  overflow: hidden;
}
.gauge__fill {
  height: 100%;
  background: #555;
  border-radius: 4px;
  transition: width 0.4s ease;
}
.gauge__label {
  font-size: 13px;
  color: #444;
  min-width: 38px;
  text-align: right;
  white-space: nowrap;
}
</style>