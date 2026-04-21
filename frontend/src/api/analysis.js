import axios from './axios'

export const analyzeWater = (formData) => {
  return axios.post('/analysis', formData)
}