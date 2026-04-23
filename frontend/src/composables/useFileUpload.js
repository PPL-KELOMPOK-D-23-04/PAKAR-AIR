import { ref } from 'vue'

export function useFileUpload() {
  const file = ref(null)
  const previewUrl = ref(null)

  const handleFileChange = (e) => {
    const selected = e.target.files[0]
    if (!selected) return

    file.value = selected
    previewUrl.value = URL.createObjectURL(selected)
  }

  return {
    file,
    previewUrl,
    handleFileChange
  }
}