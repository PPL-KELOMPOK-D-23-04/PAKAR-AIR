<template>
  <BaseCard padding="md">
    <template #header>
      <div class="header-content">
        <div class="header-icon-wrap">
          <ClipboardList size="20" />
        </div>
        <div>
          <h3 class="card-title">Parameter Kimia Air</h3>
          <p class="card-subtitle">Isi 9 parameter kimia air untuk analisis Random Forest.</p>
        </div>
      </div>
    </template>

    <!-- Grid -->
    <div class="form-grid">
      <div v-for="field in fields" :key="field.key" class="form-group">
        <label :for="'field-' + field.key" class="form-label">
          {{ field.label }}
          <span class="form-label__unit">{{ field.unit }}</span>
          <span class="form-label__req" aria-hidden="true">*</span>
        </label>
        <div class="input-wrapper">
          <input
            :id="'field-' + field.key"
            class="form-input"
            type="number"
            :placeholder="field.placeholder"
            step="any"
            min="0"
            v-model.number="store.manualData[field.key]"
          />
        </div>
      </div>
    </div>
  </BaseCard>
</template>

<script setup>
import { reactive } from 'vue'
import BaseCard from '../common/BaseCard.vue'
import { ClipboardList } from 'lucide-vue-next'
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
</script>

<style scoped>
/* Header */
.header-content {
  display: flex;
  align-items: flex-start;
  gap: 16px;
}

.header-icon-wrap {
  width: 40px;
  height: 40px;
  border: 1px solid var(--color-border-strong);
  border-radius: var(--radius-md);
  background: var(--color-bg);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  color: var(--color-text-secondary);
}

.card-title {
  font-size: var(--font-size-md);
  font-weight: 600;
  color: var(--color-text-primary);
  margin: 0 0 4px 0;
}

.card-subtitle {
  font-size: var(--font-size-sm);
  color: var(--color-text-muted);
  margin: 0;
}

/* Grid */
.form-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px 24px;
}

@media (max-width: 768px) {
  .form-grid {
    grid-template-columns: 1fr;
  }
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.form-label {
  font-size: var(--font-size-sm);
  font-weight: 500;
  color: var(--color-text-primary);
  display: flex;
  align-items: center;
}

.form-label__unit {
  font-size: var(--font-size-xs);
  font-weight: 500;
  color: var(--color-text-muted-light);
  margin-left: 4px;
}

.form-label__req {
  color: var(--color-danger);
  font-size: var(--font-size-xs);
  margin-left: 4px;
}

.input-wrapper {
  position: relative;
  width: 100%;
}

.form-input {
  width: 100%;
  padding: 10px 12px;
  font-size: var(--font-size-md);
  color: var(--color-text-primary);
  background-color: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  transition: all var(--transition-fast);
}

.form-input:hover:not(:disabled) {
  border-color: var(--color-border-strong);
}

.form-input:focus {
  outline: none;
  border-color: var(--color-primary);
  box-shadow: 0 0 0 3px color-mix(in srgb, var(--color-primary) 20%, transparent);
}
</style>
