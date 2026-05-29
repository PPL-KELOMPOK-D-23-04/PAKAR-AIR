<template>
  <div class="empty-state">
    <div class="empty-icon-wrapper">
      <component :is="icon" :size="48" class="empty-icon" />
    </div>
    <h3 class="empty-title">{{ title }}</h3>
    <p class="empty-description">{{ description }}</p>
    
    <div class="empty-action" v-if="actionLabel">
      <router-link v-if="actionTo" :to="actionTo" class="btn btn--primary">
        {{ actionLabel }}
      </router-link>
      <button v-else class="btn btn--primary" @click="$emit('action')">
        {{ actionLabel }}
      </button>
    </div>
  </div>
</template>

<script setup>
defineProps({
  icon: {
    type: [Object, Function],
    required: true
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  actionLabel: {
    type: String,
    default: ''
  },
  actionTo: {
    type: String,
    default: ''
  }
})

defineEmits(['action'])
</script>

<style scoped>
.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 48px 24px;
  background: var(--color-surface);
  border: 1px dashed var(--color-border-strong);
  border-radius: var(--radius-lg);
  min-height: 240px;
}

.empty-icon-wrapper {
  color: var(--color-text-muted-light);
  margin-bottom: 16px;
  background: var(--color-bg);
  padding: 16px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.empty-icon {
  stroke-width: 1.5;
}

.empty-title {
  font-size: var(--font-size-lg);
  font-weight: 600;
  color: var(--color-text-primary);
  margin: 0 0 8px 0;
}

.empty-description {
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
  max-width: 400px;
  margin: 0 0 24px 0;
  line-height: 1.5;
}

.empty-action {
  display: flex;
  justify-content: center;
}
</style>
