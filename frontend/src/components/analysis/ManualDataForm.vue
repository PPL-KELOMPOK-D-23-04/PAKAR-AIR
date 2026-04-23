<template>
  <div class="form-card">
    <div class="form-card__header">
      <div class="form-card__icon-box">
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18"
          fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
          <rect x="3" y="3" width="18" height="18" rx="2"/>
          <path stroke-linecap="round" stroke-linejoin="round" d="M3 15l5-5 4 4 3-3 6 6"/>
        </svg>
      </div>
      <div>
        <p class="form-card__title">Informasi Air</p>
        <p class="form-card__sub">Lengkapi parameter kimia air untuk membantu proses analisis.</p>
      </div>
    </div>

    <div class="form-grid">
      <div v-for="field in fields" :key="field.key" class="form-group">
        <label class="form-label">{{ field.label }} <span class="req">*</span></label>
        <input
          class="form-input"
          type="number"
          :placeholder="field.placeholder"
          :step="field.step || 'any'"
          v-model.number="local[field.key]"
          @input="sync"
        />
        <span class="form-hint">{{ field.unit }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive } from 'vue'
import { useAnalysisStore } from '../../stores/analysisStore'

const store = useAnalysisStore()

const fields = [
  { key: 'ph',              label: 'pH',               unit: '0 – 14',        placeholder: 'Contoh: 7.0' },
  { key: 'hardness',        label: 'Hardness',          unit: 'mg/L',          placeholder: 'Contoh: 204.89' },
  { key: 'solids',          label: 'Solids',            unit: 'ppm',           placeholder: 'Contoh: 20791.31' },
  { key: 'chloramines',     label: 'Chloramines',       unit: 'ppm',           placeholder: 'Contoh: 7.30' },
  { key: 'sulfate',         label: 'Sulfate',           unit: 'mg/L',          placeholder: 'Contoh: 368.51' },
  { key: 'conductivity',    label: 'Conductivity',      unit: 'μS/cm',         placeholder: 'Contoh: 564.31' },
  { key: 'organic_carbon',  label: 'Organic Carbon',    unit: 'ppm',           placeholder: 'Contoh: 10.37' },
  { key: 'trihalomethanes', label: 'Trihalomethanes',   unit: 'μg/L',          placeholder: 'Contoh: 86.99' },
  { key: 'turbidity',       label: 'Turbidity',         unit: 'NTU',           placeholder: 'Contoh: 2.96' },
]

const local = reactive({
  ph:              store.manualData.ph,
  hardness:        store.manualData.hardness,
  solids:          store.manualData.solids,
  chloramines:     store.manualData.chloramines,
  sulfate:         store.manualData.sulfate,
  conductivity:    store.manualData.conductivity,
  organic_carbon:  store.manualData.organic_carbon,
  trihalomethanes: store.manualData.trihalomethanes,
  turbidity:       store.manualData.turbidity,
})

function sync() {
  store.setManualData({ ...local })
}
</script>

<style scoped>
.form-card {
  background: #fff;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  padding: 20px 24px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}
.form-card__header {
  display: flex;
  align-items: flex-start;
  gap: 12px;
}
.form-card__icon-box {
  width: 36px;
  height: 36px;
  border: 1px solid #ccc;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  color: #666;
}
.form-card__title {
  font-size: 14px;
  font-weight: 600;
  color: #222;
  margin: 0 0 2px;
}
.form-card__sub {
  font-size: 12px;
  color: #888;
  margin: 0;
}
.form-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px 24px;
}
.form-group {
  display: flex;
  flex-direction: column;
  gap: 4px;
}
.form-label {
  font-size: 13px;
  font-weight: 500;
  color: #333;
}
.req {
  color: #666;
}
.form-input {
  width: 100%;
  padding: 9px 12px;
  font-size: 13px;
  color: #333;
  background: #fff;
  border: 1px solid #ccc;
  border-radius: 4px;
  outline: none;
  box-sizing: border-box;
  transition: border-color 0.15s;
}
.form-input:focus {
  border-color: #888;
}
.form-input::-webkit-inner-spin-button,
.form-input::-webkit-outer-spin-button {
  opacity: 0.5;
}
.form-hint {
  font-size: 11px;
  color: #aaa;
}
</style>