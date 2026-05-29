<template>
  <div 
    class="base-card"
    :class="[
      `padding-${padding}`,
      `shadow-${shadow}`,
      { 'has-border': border }
    ]"
  >
    <div v-if="$slots.header || title" class="card-header">
      <slot name="header">
        <h3 v-if="title" class="card-title">{{ title }}</h3>
      </slot>
    </div>
    
    <div class="card-body">
      <slot></slot>
    </div>
    
    <div v-if="$slots.footer" class="card-footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    default: ''
  },
  padding: {
    type: String,
    default: 'md',
    validator: (value) => ['none', 'sm', 'md', 'lg'].includes(value)
  },
  shadow: {
    type: String,
    default: 'sm',
    validator: (value) => ['none', 'sm', 'md'].includes(value)
  },
  border: {
    type: Boolean,
    default: true
  }
})
</script>

<style scoped>
.base-card {
  background: var(--color-surface);
  border-radius: var(--radius-lg);
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

/* Borders */
.base-card.has-border {
  border: 1px solid var(--color-border);
}

/* Shadows */
.base-card.shadow-none {
  box-shadow: none;
}
.base-card.shadow-sm {
  box-shadow: var(--shadow-sm);
}
.base-card.shadow-md {
  box-shadow: var(--shadow-md);
}

/* Padding */
.card-header,
.card-body,
.card-footer {
  padding-left: var(--card-padding-x, 24px);
  padding-right: var(--card-padding-x, 24px);
}

.base-card.padding-none .card-header,
.base-card.padding-none .card-body,
.base-card.padding-none .card-footer {
  padding: 0;
}

.base-card.padding-sm .card-header,
.base-card.padding-sm .card-body,
.base-card.padding-sm .card-footer {
  padding-left: 16px;
  padding-right: 16px;
}
.base-card.padding-sm .card-header { padding-top: 16px; padding-bottom: 12px; }
.base-card.padding-sm .card-body { padding-top: 16px; padding-bottom: 16px; }
.base-card.padding-sm .card-footer { padding-top: 12px; padding-bottom: 16px; }

.base-card.padding-md .card-header { padding-top: 20px; padding-bottom: 16px; }
.base-card.padding-md .card-body { padding-top: 20px; padding-bottom: 20px; }
.base-card.padding-md .card-footer { padding-top: 16px; padding-bottom: 20px; }

.base-card.padding-lg .card-header { padding-top: 24px; padding-bottom: 20px; }
.base-card.padding-lg .card-body { padding-top: 24px; padding-bottom: 24px; }
.base-card.padding-lg .card-footer { padding-top: 20px; padding-bottom: 24px; }

/* Structural */
.card-header {
  border-bottom: 1px solid var(--color-border-light);
}

.card-title {
  font-size: var(--font-size-lg);
  font-weight: 600;
  color: var(--color-text-primary);
  margin: 0;
}

.card-body {
  flex: 1;
}

.card-footer {
  border-top: 1px solid var(--color-border-light);
  background: var(--color-bg);
}
</style>
