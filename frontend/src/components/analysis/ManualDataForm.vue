<script setup>
import { reactive, watch } from 'vue'
import { useAnalysisStore } from '@/stores/analysisStore'

const store = useAnalysisStore()

const form = reactive({
  warna: '',
  bau: '',
  sumber: '',
  ph: '',
  suhu: ''
})

watch(form, () => {
  store.setManualData(form)
}, { deep: true })
</script>

<template>
  <div>
    <h3>Input Data Manual</h3>

    <input v-model="form.warna" placeholder="Warna" />
    <input v-model="form.bau" placeholder="Bau" />
    <input v-model="form.sumber" placeholder="Sumber" />
    <input v-model="form.ph" placeholder="pH" />
    <input v-model="form.suhu" placeholder="Suhu" />
  </div>
</template>