<template>
  <div class="page-header">
    <div class="header-content">
      <div class="header-breadcrumbs" v-if="breadcrumbs && breadcrumbs.length">
        <template v-for="(crumb, index) in breadcrumbs" :key="index">
          <router-link :to="crumb.to" class="crumb-link">{{ crumb.label }}</router-link>
          <ChevronRight v-if="index < breadcrumbs.length - 1" class="crumb-separator" :size="14" />
        </template>
      </div>
      
      <div class="header-title-container">
        <h1 class="header-title">{{ title }}</h1>
        <p v-if="subtitle" class="header-subtitle">{{ subtitle }}</p>
      </div>
    </div>
    
    <div class="header-actions" v-if="$slots.actions">
      <slot name="actions"></slot>
    </div>
  </div>
</template>

<script setup>
import { ChevronRight } from 'lucide-vue-next'

defineProps({
  title: {
    type: String,
    required: true
  },
  subtitle: {
    type: String,
    default: ''
  },
  breadcrumbs: {
    type: Array,
    default: () => []
  }
})
</script>

<style scoped>
.page-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: var(--section-gap);
  padding-bottom: 16px;
  border-bottom: 1px solid var(--color-border);
}

.header-breadcrumbs {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
  font-size: var(--font-size-sm);
}

.crumb-link {
  color: var(--color-text-secondary);
  text-decoration: none;
  font-weight: 500;
  transition: color var(--transition-fast);
}

.crumb-link:hover {
  color: var(--color-primary);
}

.crumb-separator {
  color: var(--color-text-muted-light);
}

.header-title {
  font-size: var(--font-size-2xl);
  font-weight: 700;
  color: var(--color-text-primary);
  margin: 0 0 4px 0;
  letter-spacing: -0.02em;
}

.header-subtitle {
  font-size: var(--font-size-md);
  color: var(--color-text-secondary);
  margin: 0;
}

.header-actions {
  display: flex;
  gap: 12px;
  align-items: center;
}

@media (max-width: 768px) {
  .page-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
  }
  
  .header-actions {
    width: 100%;
    justify-content: flex-start;
  }
}
</style>
