<script setup>
defineProps({
  result: Object
})
</script>

<template>
  <div class="result-card" v-if="result">
    <h2>Hasil Analisis</h2>

    <p>
      Status:
      <strong :class="result.category === 'Layak' ? 'good' : 'bad'">
        {{ result.category }}
      </strong>
    </p>

    <p>Confidence: {{ result.confidence }}%</p>

    <div>
      <h3>Rekomendasi:</h3>
      <p>{{ result.recommendation }}</p>
    </div>
  </div>
</template>