import { ref } from 'vue'

const ALLOWED_TYPES = ['image/jpeg', 'image/jpg', 'image/png']
const MAX_SIZE_BYTES = 5 * 1024 * 1024

export function useFileUpload() {
  const file = ref(null)
  const error = ref('')

  function handleFile(selectedFile) {
    error.value = ''

    if (!selectedFile) {
      error.value = 'Tidak ada file yang dipilih.'
      return false
    }

    if (!ALLOWED_TYPES.includes(selectedFile.type)) {
      error.value = 'Format tidak didukung. Gunakan JPG, JPEG, atau PNG.'
      return false
    }

    if (selectedFile.size > MAX_SIZE_BYTES) {
      error.value = 'Ukuran file melebihi 5MB.'
      return false
    }

    file.value = selectedFile
    return true
  }

  function clearFile() {
    file.value = null
    error.value = ''
  }

  return { file, error, handleFile, clearFile }
}