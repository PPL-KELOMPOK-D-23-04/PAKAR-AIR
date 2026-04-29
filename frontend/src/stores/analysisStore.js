import { defineStore } from 'pinia'

export const useAnalysisStore = defineStore('analysis', {
  state: () => ({
    /** @type {File|null} */
    image: null,

    /** 9 parameter RF — disimpan lowercase, di-map ke PascalCase saat kirim ke API */
    manualData: {
      ph: null,
      hardness: null,
      solids: null,
      chloramines: null,
      sulfate: null,
      conductivity: null,
      organic_carbon: null,
      trihalomethanes: null,
      turbidity: null,
    },

    /**
     * Hasil dari fusion pipeline:
     * { category, confidence, explanation, recommendation }
     * @type {null|Object}
     */
    result: null,
  }),

  actions: {
    setImage(file) {
      this.image = file
    },

    setManualData(data) {
      this.manualData = { ...this.manualData, ...data }
    },

    setResult(result) {
      this.result = result
    },

    // FIX: tambahkan resetResult agar useAnalysis bisa clear result tanpa reset semua field
    resetResult() {
      this.result = null
    },

    reset() {
      this.image = null
      this.manualData = {
        ph: null,
        hardness: null,
        solids: null,
        chloramines: null,
        sulfate: null,
        conductivity: null,
        organic_carbon: null,
        trihalomethanes: null,
        turbidity: null,
      }
      this.result = null
    },
  },
})