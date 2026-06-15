# 📘 PAKAR-AIR — API Documentation
**Last Updated:** 11 Juni 2026

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
- [6. Notifications](#6-notifications)
- [7. AI Chatbot (Admin Only)](#7-ai-chatbot)
- [8. Export Data](#8-export-data)
- [9. Frontend Integration Guide](#9-frontend-integration-guide)

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
  "refresh_token": "eyJhbG...",
  "token_type": "bearer",
  "user_id": "uuid-string",
  "email": "user@example.com",
  "full_name": "Nama Lengkap",
  "is_admin": false
}
```
> **Frontend:** Simpan `access_token` di `sessionStorage` (key: `pakar_air_token`). Gunakan untuk semua request berikutnya.

### POST `/api/auth/logout`
Logout dan invalidate session server-side.

### POST `/api/auth/refresh`
Refresh access token menggunakan refresh token.
**Request Body:** `{ "refresh_token": "eyJhbG..." }`

---

## 2. Users

### GET `/api/users/profile`
Ambil data profil user yang login.

### PUT `/api/users/profile`
Update profil (nama, username).
**Request Body (JSON):**
```json
{
  "full_name": "Nama Baru",
  "username": "username_baru"
}
```

### POST `/api/users/profile/avatar`
Upload foto profil ke Supabase Storage.
**Request:** `multipart/form-data` (Field: `file`)
**Allowed:** PNG, JPG, JPEG, WEBP, BMP. Max 10MB.

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

---

## 3. Analysis

### POST `/api/analysis`
Submit analisis air (Upload Gambar + Data Kimia).

**Request:** `multipart/form-data`
| Field       | Type   | Keterangan                           |
|-------------|--------|--------------------------------------|
| image       | File   | Foto air (PNG/JPG/WEBP/BMP)         |
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
Daftar riwayat analisis user (Paginated + Filterable).

**Query Params:**
| Param | Type | Default | Deskripsi |
|---|---|---|---|
| `page` | int | 1 | Halaman |
| `per_page` | int | 10 | Item per halaman |
| `category` | string | null | Filter: `layak` / `tidak_layak` |
| `date` | string | null | Filter tanggal: `YYYY-MM-DD` |
| `search` | string | null | Cari filename |

**Response:**
```json
{
  "items": [
    {
      "id": "uuid",
      "status": "completed",
      "category": "layak",
      "confidence": 0.82,
      "image_path": "https://xyz.supabase.co/storage/v1/object/public/analyses/...",
      "created_at": "..."
    }
  ],
  "total": 10,
  "page": 1,
  "per_page": 10,
  "total_pages": 1
}
```

---

## 5. Admin

### GET `/api/admin/dashboard/stats`
Statistik dashboard admin (total users, analyses, trends).

### GET `/api/admin/users`
List semua user. **Query Params:** `skip`, `limit`.

### PUT `/api/admin/users/{user_id}/status`
Aktifkan/nonaktifkan user. **Query Params:** `is_active` (boolean).

### DELETE `/api/admin/users/{user_id}`
Hapus user beserta seluruh data terkait.

### GET `/api/admin/analysis/stats`
Statistik analisis detail (tren bulanan, rata-rata confidence).

### GET `/api/admin/reports`
Data laporan filterable. **Query Params:** `date_from`, `date_to`, `category`.

### GET `/api/admin/reports/export`
Ekspor laporan sebagai CSV.

---

## 6. Notifications

### GET `/api/notifications`
List semua notifikasi user (newest first).

### PUT `/api/notifications/{notification_id}/read`
Tandai notifikasi sebagai sudah dibaca.

### GET `/api/notifications/unread-count`
Hitung jumlah notifikasi belum dibaca. Response: `{ "count": 3 }`.

---

## 7. AI Chatbot (Admin Only)

Endpoint untuk fitur asisten AI Gemini (Hanya untuk Role Admin).

### POST `/api/admin/chatbot/sessions`
Membuat sesi chat baru.

### GET `/api/admin/chatbot/sessions`
Daftar semua sesi chat milik admin tersebut.

### GET `/api/admin/chatbot/sessions/{session_id}`
Detail sesi chat beserta semua pesan.

### DELETE `/api/admin/chatbot/sessions/{session_id}`
Hapus sesi chat dan semua pesannya.

### POST `/api/admin/chatbot/sessions/{session_id}/messages`
Kirim pesan ke AI.
**Request Body:** `{"message": "Isi pesan Anda"}` (max 4000 chars)
**Response:** `{"user_message": {...}, "ai_message": {...}}`

---

## 8. Export Data

### GET `/api/analysis/export/csv`
Export riwayat analisis user sebagai CSV. **Query Params:** sama dengan history filter.

### GET `/api/analysis/export/{analysis_id}/detail`
Ambil data lengkap untuk ekspor PDF (digunakan oleh frontend PDF generator).

---

## 9. Frontend Integration Guide

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
  const token = sessionStorage.getItem('pakar_air_token') 
    || sessionStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
```

> **Catatan:** Token disimpan di `sessionStorage` (bukan `localStorage`) untuk keamanan — token akan otomatis terhapus saat tab/browser ditutup.

---
