<template>
  <div class="profile-page">

    <div class="profile-card">

      <h1 class="title">Profil Saya</h1>

      <!-- FOTO PROFILE -->
      <div class="photo-section">

        <img
          :src="previewImage || form.foto"
          class="profile-image"
        />

        <input
          type="file"
          accept="image/png,image/jpeg,image/jpg"
          @change="handleImageUpload"
        />

      </div>

      <!-- FORM PROFILE -->
      <div class="form-section">

        <div class="form-group">
          <label>Nama Lengkap</label>

          <input
            type="text"
            v-model="form.nama"
            placeholder="Masukkan nama"
          />
        </div>

        <div class="form-group">
          <label>Username</label>

          <input
            type="text"
            v-model="form.username"
            placeholder="Masukkan username"
          />
        </div>

        <button
          class="save-btn"
          @click="updateProfile"
        >
          Simpan Perubahan
        </button>

      </div>

      <!-- NOTIFIKASI -->
      <div
        v-if="message"
        class="message"
      >
        {{ message }}
      </div>

    </div>

  </div>
</template>

<script setup>
import { ref } from 'vue'

const previewImage = ref(null)

const message = ref('')

const form = ref({
  nama: 'Pricenza',
  username: 'alexie',
  foto: 'https://ui-avatars.com/api/?name=User'
})


// UPLOAD FOTO
const handleImageUpload = (event) => {

  const file = event.target.files[0]

  if (!file) return

  // VALIDASI TYPE
  const allowedTypes = [
    'image/png',
    'image/jpeg',
    'image/jpg'
  ]

  if (!allowedTypes.includes(file.type)) {
    message.value = 'Format gambar harus PNG/JPG/JPEG'
    return
  }

  // VALIDASI SIZE
  if (file.size > 2 * 1024 * 1024) {
    message.value = 'Ukuran gambar maksimal 2MB'
    return
  }

  const reader = new FileReader()

  reader.onload = (e) => {
    previewImage.value = e.target.result
  }

  reader.readAsDataURL(file)

  message.value = 'Foto berhasil dipilih'
}


// UPDATE PROFILE
const updateProfile = async () => {

  // VALIDASI NAMA
  if (form.value.nama.length < 3) {
    message.value = 'Nama minimal 3 karakter'
    return
  }

  // VALIDASI USERNAME
  if (form.value.username.length < 3) {
    message.value = 'Username minimal 3 karakter'
    return
  }

  // REGEX USERNAME
  const regex = /^[a-zA-Z0-9_]+$/

  if (!regex.test(form.value.username)) {
    message.value =
      'Username hanya boleh huruf, angka, underscore'
    return
  }

  try {

    // SIMULASI API
    console.log('DATA PROFILE:', form.value)

    message.value = 'Profile berhasil diperbarui'

  } catch (error) {

    message.value = 'Terjadi kesalahan'

  }
}
</script>

<style scoped>

.profile-page {
  padding: 24px;
}

.profile-card {
  background: white;
  border-radius: 16px;
  padding: 24px;
}

.title {
  margin-bottom: 24px;
}

.photo-section {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 24px;
}

.profile-image {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  object-fit: cover;
}

.form-section {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.form-group input {
  padding: 12px;
  border-radius: 10px;
  border: 1px solid #ddd;
}

.save-btn {
  padding: 14px;
  border: none;
  border-radius: 10px;
  background: #0ea5e9;
  color: white;
  cursor: pointer;
}

.message {
  margin-top: 20px;
  color: green;
}

</style>