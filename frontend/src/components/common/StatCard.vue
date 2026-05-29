<template>
  <div class="stat-card base-card">
    <div class="stat-header">
      <h3 class="stat-label">{{ label }}</h3>
      <div class="stat-icon-wrapper" :style="{ color: iconColor, backgroundColor: iconBgColor }">
        <component :is="icon" :size="20" />
      </div>
    </div>
    
    <div class="stat-content">
      <div v-if="loading" class="skeleton-value"></div>
      <div v-else class="stat-value">{{ displayValue }}</div>
      
      <div v-if="trend && !loading" class="stat-trend" :class="trend.direction">
        <TrendingUp v-if="trend.direction === 'up'" :size="16" />
        <TrendingDown v-else-if="trend.direction === 'down'" :size="16" />
        <Minus v-else :size="16" />
        <span class="trend-value">{{ trend.value }}</span>
        <span class="trend-label">{{ trend.label }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { TrendingUp, TrendingDown, Minus } from 'lucide-vue-next'

const props = defineProps({
  icon: {
    type: [Object, Function],
    required: true
  },
  iconColor: {
    type: String,
    default: 'var(--color-primary)'
  },
  label: {
    type: String,
    required: true
  },
  value: {
    type: [String, Number],
    default: null
  },
  trend: {
    type: Object,
    default: null // { direction: 'up'|'down'|'neutral', value: String, label: String }
  },
  loading: {
    type: Boolean,
    default: false
  }
})

const displayValue = computed(() => {
  return (props.value === null || props.value === undefined || props.value === '') ? '—' : props.value
})

const iconBgColor = computed(() => {
  // Simple heuristic to make a light background version of the icon color if it's a hex or css var
  return `color-mix(in srgb, ${props.iconColor} 15%, transparent)`
})
</script>

<style scoped>
.stat-card {
  padding: 24px;
  background: var(--color-surface);
  border-radius: var(--radius-lg);
  border: 1px solid var(--color-border);
  box-shadow: var(--shadow-sm);
  display: flex;
  flex-direction: column;
  gap: 16px;
  transition: all var(--transition-fast);
}

.stat-card:hover {
  box-shadow: var(--shadow-md);
  transform: translateY(-2px);
}

.stat-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

.stat-label {
  font-size: var(--font-size-sm);
  font-weight: 600;
  color: var(--color-text-secondary);
  margin: 0;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.stat-icon-wrapper {
  padding: 10px;
  border-radius: var(--radius-md);
  display: flex;
  align-items: center;
  justify-content: center;
}

.stat-content {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.stat-value {
  font-size: 32px;
  font-weight: 700;
  color: var(--color-text-primary);
  line-height: 1.2;
  letter-spacing: -0.02em;
}

.skeleton-value {
  height: 38px;
  width: 60%;
  background: linear-gradient(90deg, var(--color-border-light) 25%, var(--color-border) 50%, var(--color-border-light) 75%);
  background-size: 200% 100%;
  border-radius: var(--radius-sm);
  animation: pulse 1.5s infinite linear;
}

@keyframes pulse {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}

.stat-trend {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: var(--font-size-xs);
  font-weight: 500;
}

.stat-trend.up {
  color: var(--color-success);
}

.stat-trend.down {
  color: var(--color-danger);
}

.stat-trend.neutral {
  color: var(--color-text-muted);
}

.trend-value {
  font-weight: 700;
}

.trend-label {
  color: var(--color-text-muted-light);
  margin-left: 2px;
  font-weight: 400;
}
</style>
