import { defineStore } from 'pinia'

export const useAnalysisStore = defineStore('analysis', {
  state: () => ({
    image: null,
    manualData: {}
  }),

  actions: {
    setImage(file) {
      this.image = file
    },

    setManualData(data) {
      this.manualData = data
    }
  }
})