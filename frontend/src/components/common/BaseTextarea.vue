<template>
  <div class="form-group" :class="{ 'has-error': error }">
    <label v-if="label" :for="id" class="form-label">
      {{ label }}
      <span v-if="required" class="required-mark">*</span>
    </label>
    
    <div class="textarea-wrapper">
      <textarea
        :id="id"
        :value="modelValue"
        :placeholder="placeholder"
        :disabled="disabled"
        :rows="rows"
        @input="$emit('update:modelValue', $event.target.value)"
        @blur="$emit('blur', $event)"
        class="form-textarea"
        :class="{ 'error-input': error }"
        v-bind="$attrs"
      ></textarea>
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
  rows: {
    type: [Number, String],
    default: 3
  },
  placeholder: {
    type: String,
    default: ''
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

const id = computed(() => `textarea-${Math.random().toString(36).substring(2, 9)}`)
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

.textarea-wrapper {
  position: relative;
  width: 100%;
}

.form-textarea {
  width: 100%;
  padding: 10px 12px;
  font-size: var(--font-size-md);
  color: var(--color-text-primary);
  background-color: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  transition: all var(--transition-fast);
  resize: vertical;
  min-height: 80px;
  font-family: inherit;
}

.form-textarea:hover:not(:disabled) {
  border-color: var(--color-border-strong);
}

.form-textarea:focus {
  outline: none;
  border-color: var(--color-primary);
  box-shadow: 0 0 0 3px color-mix(in srgb, var(--color-primary) 20%, transparent);
}

.form-textarea:disabled {
  background-color: var(--color-bg);
  color: var(--color-text-muted);
  cursor: not-allowed;
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
