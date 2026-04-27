<template>
  <div class="form-card">
    <!-- Header -->
    <div class="card-header">
      <div class="card-header__icon">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
          fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8">
          <path stroke-linecap="round" stroke-linejoin="round"
            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2
               M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/>
        </svg>
      </div>
      <div>
        <p class="card-header__title">Parameter Kimia Air</p>
        <p class="card-header__sub">Isi 9 parameter kimia air untuk analisis Random Forest.</p>
      </div>
    </div>

    <!-- Grid -->
    <div class="form-grid">
      <div v-for="field in fields" :key="field.key" class="form-group">
        <label :for="'field-' + field.key" class="form-label">
          {{ field.label }}
          <span class="form-label__unit">{{ field.unit }}</span>
          <span class="form-label__req" aria-hidden="true">*</span>
        </label>
        <input
          :id="'field-' + field.key"
          class="form-input"
          type="number"
          :placeholder="field.placeholder"
          step="any"
          min="0"
          v-model.number="local[field.key]"
          @input="sync"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive } from 'vue'
import { useAnalysisStore } from '../../stores/analysisStore'

const store = useAnalysisStore()

const fields = [
  { key: 'ph',              label: 'pH',                unit: '(0–14)',   placeholder: 'Contoh: 7.0' },
  { key: 'hardness',        label: 'Hardness',          unit: 'mg/L',     placeholder: 'Contoh: 204.89' },
  { key: 'solids',          label: 'Solids',            unit: 'ppm',      placeholder: 'Contoh: 20791.31' },
  { key: 'chloramines',     label: 'Chloramines',       unit: 'ppm',      placeholder: 'Contoh: 7.30' },
  { key: 'sulfate',         label: 'Sulfate',           unit: 'mg/L',     placeholder: 'Contoh: 368.51' },
  { key: 'conductivity',    label: 'Conductivity',      unit: 'μS/cm',    placeholder: 'Contoh: 564.31' },
  { key: 'organic_carbon',  label: 'Organic Carbon',    unit: 'ppm',      placeholder: 'Contoh: 10.37' },
  { key: 'trihalomethanes', label: 'Trihalomethanes',   unit: 'μg/L',     placeholder: 'Contoh: 86.99' },
  { key: 'turbidity',       label: 'Turbidity',         unit: 'NTU',      placeholder: 'Contoh: 2.96' },
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
  background: #ffffff;
  border: 1px solid var(--color-border, #e2e8f0);
  border-radius: 8px;
  padding: 20px 24px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  box-shadow: var(--shadow-card, 0 1px 3px rgba(0,0,0,.06));
}

/* Header */
.card-header {
  display: flex;
  align-items: flex-start;
  gap: 12px;
}

.card-header__icon {
  width: 34px;
  height: 34px;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  color: #64748b;
}

.card-header__title {
  font-size: 14px;
  font-weight: 600;
  color: #1a202c;
  margin-bottom: 2px;
}

.card-header__sub {
  font-size: 12px;
  color: #94a3b8;
}

/* Grid */
.form-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px 24px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.form-label {
  font-size: 12px;
  font-weight: 600;
  color: #374151;
  display: flex;
  align-items: baseline;
  gap: 4px;
}

.form-label__unit {
  font-size: 11px;
  font-weight: 400;
  color: #94a3b8;
}

.form-label__req {
  color: #ef4444;
  font-size: 11px;
  margin-left: auto;
}

.form-input {
  width: 100%;
  padding: 8px 11px;
  font-size: 13px;
  color: #1a202c;
  background: #fff;
  border: 1px solid #cbd5e1;
  border-radius: 5px;
  outline: none;
  box-sizing: border-box;
  transition: border-color 0.15s, box-shadow 0.15s;
  -moz-appearance: textfield;
}

.form-input:focus {
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.form-input::placeholder {
  color: #cbd5e1;
}

.form-input::-webkit-outer-spin-button,
.form-input::-webkit-inner-spin-button {
  -webkit-appearance: none;
}
</style>