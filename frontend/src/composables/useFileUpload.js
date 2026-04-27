import { ref } from 'vue'

// PKD20TPA-3: Validation constants — DO NOT change
const ALLOWED_TYPES = ['image/jpeg', 'image/jpg', 'image/png']
const MAX_SIZE_BYTES = 5 * 1024 * 1024 // 5 MB

export function useFileUpload() {
  const file = ref(null)
  const previewUrl = ref(null)
  const error = ref('')

  function handleFile(selectedFile) {
    error.value = ''
    previewUrl.value = null

    if (!selectedFile) {
      error.value = 'Tidak ada file yang dipilih.'
      return false
    }

    // PKD20TPA-3: format validation
    if (!ALLOWED_TYPES.includes(selectedFile.type)) {
      error.value = 'Format tidak didukung. Gunakan JPG, JPEG, atau PNG.'
      return false
    }

    // PKD20TPA-3: size validation
    if (selectedFile.size > MAX_SIZE_BYTES) {
      error.value = 'Ukuran file melebihi batas maksimum 5MB.'
      return false
    }

    file.value = selectedFile

    // Generate preview URL using FileReader (no extra dependencies)
    const reader = new FileReader()
    reader.onload = (e) => {
      previewUrl.value = e.target.result
    }
    reader.readAsDataURL(selectedFile)

    return true
  }

  function clearFile() {
    file.value = null
    previewUrl.value = null
    error.value = ''
  }

  return { file, previewUrl, error, handleFile, clearFile }
}