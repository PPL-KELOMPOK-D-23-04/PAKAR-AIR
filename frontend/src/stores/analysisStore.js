import { defineStore } from 'pinia'

export const useAnalysisStore = defineStore('analysis', {
  state: () => ({
    image: null,
    manualData: {},
    result: null
  }),

  actions: {
    setImage(file) {
      this.image = file
    },

    setManualData(data) {
      this.manualData = data
    },

    setResult(data) {
      this.result = data
    }
  }
})