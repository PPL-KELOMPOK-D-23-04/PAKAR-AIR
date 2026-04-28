# 📘 PAKAR-AIR — API Documentation
**Last Updated:** 25 April 2026

Dokumentasi endpoint backend untuk **Frontend Developer**.

- **Base URL:** `http://localhost:8000`
- **Swagger UI:** `http://localhost:8000/docs`
- **Auth:** Supabase JWT — kirim token di header `Authorization: Bearer <token>`
- **Storage:** Menggunakan **Supabase Storage**. Gambar diakses via Public URL langsung (tidak perlu prefix server).

---

## 📋 Daftar Isi

- [1. Auth](#1-auth)
- [2. Users (Profile)](#2-users)
- [3. Analysis (AI Pipeline)](#3-analysis)
- [4. History (Riwayat)](#4-history)
- [5. Admin (Manajemen & Kontrol)](#5-admin)
- [6. Notifications (PBI-08)](#6-notifications)
- [7. Export Data](#7-export-data)
- [8. Frontend Integration Guide](#8-frontend-integration-guide)

---

## 1. Auth

### POST `/api/auth/register`
Registrasi pengguna baru. 
**Request Body (JSON):**
```json
{
  "email": "user@example.com",
  "password": "password123",
  "full_name": "Nama Lengkap",
  "username": "username123"
}
```

### POST `/api/auth/login`
**Response `200`:**
```json
{
  "access_token": "eyJhbG...",
  "token_type": "bearer",
  "user": { ... }
}
```
> **Frontend:** Simpan `access_token` di `localStorage` atau `Pinia/Vuex`. Gunakan untuk semua request berikutnya.

---

## 2. Users

### GET `/api/users/profile`
Ambil data profil user yang login.

### POST `/api/users/change-password`
Ganti password user.
**Request Body (JSON):**
```json
{
  "new_password": "passwordBaru123"
}
```

### DELETE `/api/users/me`
Hapus akun user secara permanen dari database sistem.

### POST `/api/users/profile/avatar`
Update foto profil ke Cloud Storage.
**Request:** `multipart/form-data` (Field: `file`)

---

## 3. Analysis

### POST `/api/analysis`
Submit analisis air (Upload Gambar + Data Kimia).

**Request:** `multipart/form-data`
| Field       | Type   | Keterangan                           |
|-------------|--------|--------------------------------------|
| image       | File   | Foto air (PNG/JPG)                   |
| manual_data | String | **JSON String** dari data parameter  |

**Format `manual_data` (Harus dikirim sebagai JSON String):**
```json
{
  "ph": 7.2,
  "Hardness": 200,
  "Solids": 20000,
  "Chloramines": 7,
  "Sulfate": 350,
  "Conductivity": 450,
  "Organic_carbon": 10,
  "Trihalomethanes": 70,
  "Turbidity": 3.5
}
```

**Response `200`:**
```json
{
  "analysis_id": "uuid-string",
  "status": "completed",
  "message": "Analisis berhasil diselesaikan"
}
```

### GET `/api/analysis/{analysis_id}`
Ambil hasil deteksi YOLO (Visual) dan Random Forest (Kimia).
**Penting:** `result.dl_detections` berisi koordinat kotak untuk digambar di atas gambar asli oleh Frontend.

---

## 4. History

### GET `/api/analysis/history`
Daftar riwayat analisis user (Paginated).

**Query Params:** `page` (default 1), `per_page` (default 10).

**Response:**
```json
{
  "items": [
    {
      "id": "uuid",
      "status": "completed",
      "category": "layak",
      "image_path": "https://xyz.supabase.co/storage/v1/object/public/analyses/...",
      "created_at": "..."
    }
  ],
  "total": 10,
  "total_pages": 1
}
```

---

## 5. Frontend Integration Guide

### A. Mengirim Data Multipart (Upload)
Karena kita mengirim File + JSON secara bersamaan, gunakan `FormData`.

```javascript
// Contoh di Vue.js / Axios
const submitAnalysis = async (imageFile, chemicalData) => {
  const formData = new FormData();
  formData.append('image', imageFile);
  
  // PENTING: Data manual harus di-stringify!
  formData.append('manual_data', JSON.stringify(chemicalData));

  const res = await axios.post('/api/analysis', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });
  return res.data;
}
```

### B. Menampilkan Hasil Visual
Hasil deteksi YOLO berupa koordinat. Jangan menggambar kotak di backend. Simpan gambar asli, lalu gambar kotak di atasnya menggunakan `<canvas>` atau absolut CSS di frontend.

### C. Menangani Token (Auth)
Gunakan interceptor Axios untuk menyisipkan token secara otomatis:
```javascript
axios.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
```

---

