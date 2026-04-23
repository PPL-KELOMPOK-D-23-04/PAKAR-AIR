import { defineStore } from 'pinia'

export const useAnalysisStore = defineStore('analysis', {
  state: () => ({
    image: null,
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