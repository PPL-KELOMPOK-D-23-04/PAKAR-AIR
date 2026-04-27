import { defineStore } from 'pinia'

export const useAnalysisStore = defineStore('analysis', {
  state: () => ({
    /** @type {File|null} */
    image: null,

    /** 9 RF numeric parameters (stored in lowercase, mapped to backend casing in API layer) */
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
     * Result from fusion pipeline (fuse_results in fusion.py):
     * { category, confidence, explanation, recommendation }
     * @type {null|{ category: string, confidence: number, explanation: string, recommendation: string }}
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