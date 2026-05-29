<template>
  <div class="form-group" :class="{ 'has-error': error }">
    <label v-if="label" :for="id" class="form-label">
      {{ label }}
      <span v-if="required" class="required-mark">*</span>
    </label>
    
    <div class="select-wrapper">
      <select
        :id="id"
        :value="modelValue"
        :disabled="disabled"
        @change="$emit('update:modelValue', $event.target.value)"
        @blur="$emit('blur', $event)"
        class="form-select"
        :class="{ 'error-input': error, 'is-placeholder': !modelValue }"
        v-bind="$attrs"
      >
        <option value="" disabled selected v-if="placeholder">{{ placeholder }}</option>
        <option v-for="option in normalizedOptions" :key="option.value" :value="option.value">
          {{ option.label }}
        </option>
      </select>
      <div class="select-icon">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg>
      </div>
    </div>
    
    <p v-if="error" class="error-text">{{ error }}</p>
    <p v-else-if="helperText" class="helper-text">{{ helperText }}</p>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  modelValue: {
    type: [String, Number],
    default: ''
  },
  label: {
    type: String,
    default: ''
  },
  options: {
    type: Array,
    required: true,
    // Can be ['Option 1', 'Option 2'] or [{ label: 'Opt 1', value: 'opt1' }]
  },
  placeholder: {
    type: String,
    default: 'Pilih opsi...'
  },
  helperText: {
    type: String,
    default: ''
  },
  error: {
    type: String,
    default: ''
  },
  required: {
    type: Boolean,
    default: false
  },
  disabled: {
    type: Boolean,
    default: false
  }
})

defineEmits(['update:modelValue', 'blur'])

const id = computed(() => `select-${Math.random().toString(36).substring(2, 9)}`)

const normalizedOptions = computed(() => {
  return props.options.map(opt => {
    if (typeof opt === 'object' && opt !== null) {
      return {
        label: opt.label || opt.name || opt.text,
        value: opt.value !== undefined ? opt.value : opt.id
      }
    }
    return { label: String(opt), value: String(opt) }
  })
})
</script>

<style scoped>
.form-group {
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin-bottom: 16px;
}

.form-label {
  font-size: var(--font-size-sm);
  font-weight: 500;
  color: var(--color-text-primary);
}

.required-mark {
  color: var(--color-danger);
  margin-left: 2px;
}

.select-wrapper {
  position: relative;
  width: 100%;
}

.form-select {
  width: 100%;
  padding: 10px 36px 10px 12px;
  font-size: var(--font-size-md);
  color: var(--color-text-primary);
  background-color: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  appearance: none;
  transition: all var(--transition-fast);
  cursor: pointer;
}

.form-select.is-placeholder {
  color: var(--color-text-muted);
}

.form-select:hover:not(:disabled) {
  border-color: var(--color-border-strong);
}

.form-select:focus {
  outline: none;
  border-color: var(--color-primary);
  box-shadow: 0 0 0 3px color-mix(in srgb, var(--color-primary) 20%, transparent);
}

.form-select:disabled {
  background-color: var(--color-bg);
  color: var(--color-text-muted);
  cursor: not-allowed;
}

.select-icon {
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  pointer-events: none;
  color: var(--color-text-secondary);
  display: flex;
}

.error-input {
  border-color: var(--color-danger) !important;
}

.error-input:focus {
  box-shadow: 0 0 0 3px color-mix(in srgb, var(--color-danger) 20%, transparent) !important;
}

.error-text {
  font-size: var(--font-size-xs);
  color: var(--color-danger);
  margin: 0;
}

.helper-text {
  font-size: var(--font-size-xs);
  color: var(--color-text-muted);
  margin: 0;
}
</style>
