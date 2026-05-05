import { defineStore } from 'pinia'
import { ref } from 'vue'
import axios from 'axios'

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:8000/api'

export const useProfileStore = defineStore('profile', () => {
  const profile = ref(null)
  const loading = ref(false)
  const error = ref(null)

  // Ambil data profil
  const fetchProfile = async (userId) => {
    loading.value = true
    error.value = null
    try {
      const response = await axios.get(`${API_BASE}/profile/${userId}`)
      profile.value = response.data
      return response.data
    } catch (err) {
      error.value = err.response?.data?.detail || 'Gagal mengambil data profil'
      throw err
    } finally {
      loading.value = false
    }
  }

  // Update profil (nama, username, email)
  const updateProfile = async (userId, data) => {
    loading.value = true
    error.value = null
    try {
      const response = await axios.put(`${API_BASE}/profile/${userId}`, data)
      if (profile.value) {
        profile.value.fullname = data.fullname || profile.value.fullname
        profile.value.username = data.username || profile.value.username
        profile.value.email = data.email || profile.value.email
      }
      return response.data
    } catch (err) {
      error.value = err.response?.data?.detail || 'Gagal memperbarui profil'
      throw err
    } finally {
      loading.value = false
    }
  }

  // Upload foto profil
  const updateAvatar = async (userId, file) => {
    loading.value = true
    error.value = null
    try {
      const formData = new FormData()
      formData.append('file', file)
      const response = await axios.post(`${API_BASE}/profile/${userId}/avatar`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })
      if (profile.value) {
        profile.value.avatar_url = response.data.avatar_url
      }
      return response.data
    } catch (err) {
      error.value = err.response?.data?.detail || 'Gagal mengupload foto'
      throw err
    } finally {
      loading.value = false
    }
  }

  // Hapus foto profil
  const deleteAvatar = async (userId) => {
    loading.value = true
    error.value = null
    try {
      await axios.delete(`${API_BASE}/profile/${userId}/avatar`)
      if (profile.value) {
        profile.value.avatar_url = null
      }
      return { message: 'Foto profil berhasil dihapus' }
    } catch (err) {
      error.value = err.response?.data?.detail || 'Gagal menghapus foto'
      throw err
    } finally {
      loading.value = false
    }
  }

  // Ganti password
  const updatePassword = async (userId, data) => {
    loading.value = true
    error.value = null
    try {
      const response = await axios.put(`${API_BASE}/profile/${userId}/password`, data)
      return response.data
    } catch (err) {
      error.value = err.response?.data?.detail || 'Gagal memperbarui password'
      throw err
    } finally {
      loading.value = false
    }
  }

  return {
    profile,
    loading,
    error,
    fetchProfile,
    updateProfile,
    updateAvatar,
    deleteAvatar,
    updatePassword
  }
})