# 📘 PAKAR-AIR — API Documentation

Dokumentasi endpoint backend untuk **Frontend Developer**.

- **Base URL:** `http://localhost:5000`
- **Swagger UI:** `http://localhost:5000/docs`
- **ReDoc:** `http://localhost:5000/redoc`
- **Auth:** Supabase JWT — kirim token di header `Authorization: Bearer <token>`

---

## 📋 Daftar Isi

- [1. Auth](#1-auth)
- [2. Users](#2-users)
- [3. Analysis](#3-analysis)
- [4. History](#4-history)
- [5. Notifications](#5-notifications)
- [6. Education](#6-education)
- [7. Admin](#7-admin)

---

## 1. Auth

### POST `/api/auth/register`

Registrasi pengguna baru (KF-01). **Tanpa auth.**

**Request Body (JSON):**
```json
{
  "email": "user@example.com",
  "password": "min6chars",
  "full_name": "Nama Lengkap",
  "username": "username123"
}
```

**Response `200`:**
```json
{
  "message": "Registration successful"
}
```

**Errors:** `400` jika email/username sudah terdaftar atau data tidak valid.

---

### POST `/api/auth/login`

Login pengguna (KF-02). **Tanpa auth.**

**Request Body (JSON):**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response `200`:**
```json
{
  "access_token": "eyJhbGciO...",
  "refresh_token": "v1.MjE4...",
  "token_type": "bearer",
  "user_id": "uuid-string",
  "email": "user@example.com",
  "full_name": "Nama Lengkap",
  "is_admin": false
}
```

**Errors:** `401` jika email/password salah.

> **Frontend:** Simpan `access_token` dan `refresh_token`. Set header `Authorization: Bearer <access_token>` untuk semua request yang butuh auth.

---

### POST `/api/auth/logout`

Logout (KF-02). **Auth required.**

**Response `200`:**
```json
{
  "message": "Logged out successfully"
}
```

> **Frontend:** Hapus token dari localStorage/state setelah logout.

---

### POST `/api/auth/refresh`

Refresh access token menggunakan refresh token. **Tanpa auth header.**

**Request Body (JSON):**
```json
{
  "refresh_token": "v1.MjE4..."
}
```

**Response `200`:** Sama seperti login response.

**Errors:** `401` jika refresh token sudah expired atau invalid.

---

## 2. Users

> Semua endpoint di sini memerlukan **Auth (Bearer token)**.

### GET `/api/users/profile`

Ambil profil user yang sedang login (KF-08).

**Response `200`:**
```json
{
  "id": "uuid-string",
  "full_name": "Nama Lengkap",
  "username": "username123",
  "avatar_url": "uploads/avatar.jpg",
  "is_admin": false,
  "is_active": true,
  "created_at": "2025-01-01T00:00:00Z",
  "updated_at": "2025-01-01T00:00:00Z"
}
```

---

### PUT `/api/users/profile`

Update profil user yang sedang login (KF-08).

**Request Body (JSON):** (semua field opsional)
```json
{
  "full_name": "Nama Baru",
  "username": "username_baru"
}
```

**Response `200`:** Objek profil yang sudah diupdate (struktur sama dengan GET).

**Errors:** `409` jika username sudah dipakai user lain.

---

### POST `/api/users/profile/avatar`

Upload foto profil (KF-08).

**Request:** `multipart/form-data`
| Field | Type   | Keterangan                             |
|-------|--------|----------------------------------------|
| file  | File   | Gambar (PNG/JPG/JPEG/WEBP, max 10 MB)  |

**Contoh Axios:**
```javascript
const formData = new FormData();
formData.append('file', fileInput.files[0]);
await axios.post('/api/users/profile/avatar', formData, {
  headers: { 'Content-Type': 'multipart/form-data' }
});
```

**Response `200`:** Objek profil yang sudah diupdate.

---

## 3. Analysis

> Semua endpoint memerlukan **Auth (Bearer token)**.

### POST `/api/analysis`

Submit analisis baru — upload citra air + isi form data manual (KF-03, KF-04, KF-05).

**Request:** `multipart/form-data`
| Field       | Type   | Keterangan                           |
|-------------|--------|--------------------------------------|
| image       | File   | Foto/citra air (PNG/JPG/WEBP)        |
| manual_data | String | **JSON string** berisi data manual   |

**Format `manual_data` (JSON string):**
```json
{
  "ph": 7.08,
  "Hardness": 204.89,
  "Solids": 20791.32,
  "Chloramines": 7.30,
  "Sulfate": 368.52,
  "Conductivity": 564.31,
  "Organic_carbon": 10.38,
  "Trihalomethanes": 86.99,
  "Turbidity": 2.96,
}
```

**Nilai valid:**
| Field            | Type  | Keterangan                           |
|------------------|-------|--------------------------------------|
| `ph`             | Float | Nilai pH air (0 - 14)                |
| `Hardness`       | Float | Kapasitas air untuk sabun (mg/L)     |
| `Solids`         | Float | Total padatan terlarut (ppm)         |
| `Chloramines`    | Float | Jumlah kloramin (ppm)                |
| `Sulfate`        | Float | Jumlah sulfat terlarut (mg/L)        |
| `Conductivity`   | Float | Konduktivitas listrik air (μS/cm)    |
| `Organic_carbon` | Float | Jumlah karbon organik (ppm)          |
| `Trihalomethanes`| Float | Jumlah Trihalomethanes (μg/L)        |
| `Turbidity`      | Float | Ukuran kejernihan air (NTU)          |

**Contoh Axios:**
```javascript
const formData = new FormData();
formData.append('image', fileInput.files[0]);
formData.append('manual_data', JSON.stringify({
  ph: 7.08,
  Hardness: 204.89,
  Solids: 20791.32,
  Chloramines: 7.30,
  Sulfate: 368.52,
  Conductivity: 564.31,
  Organic_carbon: 10.38,
  Trihalomethanes: 86.99,
  Turbidity: 2.96
}));

const response = await axios.post('/api/analysis', formData, {
  headers: { 'Content-Type': 'multipart/form-data' }
});
```

**Response `200`:**
```json
{
  "analysis_id": "uuid-string",
  "status": "completed",
  "message": "Analisis berhasil diselesaikan"
}
```

---

### GET `/api/analysis/{analysis_id}`

Ambil detail hasil analisis lengkap (KF-06).

**Response `200`:**
```json
{
  "id": "uuid-string",
  "user_id": "uuid-string",
  "status": "completed",
  "created_at": "2025-01-01T00:00:00",
  "image_input": {
    "image_path": "uploads/20250101_120000_abc12345.jpg",
    "original_filename": "foto_air.jpg"
  },
  "manual_input": {
    "ph": 7.08,
    "Hardness": 204.89,
    "Solids": 20791.32,
    "Chloramines": 7.30,
    "Sulfate": 368.52,
    "Conductivity": 564.31,
    "Organic_carbon": 10.38,
    "Trihalomethanes": 86.99,
    "Turbidity": 2.96
  },
  "result": {
    "id": "uuid-string",
    "category": "tidak_layak",
    "confidence": 0.87,
    "dl_category": "tidak_layak",
    "dl_confidence": 0.82,
    "dl_detections": [
      {"label": "floater", "confidence": 0.89}
    ],
    "ml_category": "tidak_layak",
    "ml_confidence": 0.91,
    "ml_feature_importance": {
      "ph": 0.12,
      "Hardness": 0.11,
      "Solids": 0.15,
      "Chloramines": 0.09,
      "Sulfate": 0.14,
      "Conductivity": 0.10,
      "Organic_carbon": 0.08,
      "Trihalomethanes": 0.09,
      "Turbidity": 0.12
    },
    "explanation": "Analisis citra: terdeteksi air_keruh (89%), sampah (75%). ...",
    "recommendation": "Air ini TIDAK LAYAK digunakan secara langsung. ..."
  }
}
```

> **Catatan:** `result` bisa `null` jika status masih `pending` atau `processing`.

---

## 4. History

> **Auth required.**

### GET `/api/history`

Daftar riwayat analisis user dengan pagination (KF-07).

**Query Parameters:**
| Param    | Type | Default | Keterangan           |
|----------|------|---------|----------------------|
| page     | int  | 1       | Nomor halaman        |
| per_page | int  | 10      | Item per halaman (max 50) |

**Response `200`:**
```json
{
  "items": [
    {
      "id": "uuid",
      "status": "completed",
      "created_at": "2025-01-01T12:00:00Z",
      "category": "layak",
      "confidence": 0.85,
      "image_path": "uploads/foto.jpg",
      "water_color": "jernih",
      "water_source": "PDAM"
    }
  ],
  "total": 25,
  "page": 1,
  "per_page": 10,
  "total_pages": 3
}
```

---

## 5. Notifications

> **Auth required.**

### GET `/api/notifications`

Daftar semua notifikasi user (KF-13).

**Response `200`:**
```json
{
  "items": [
    {
      "id": "uuid",
      "analysis_id": "uuid-or-null",
      "title": "Hasil Analisis Selesai",
      "message": "Analisis air Anda selesai. Hasil: ❌ Tidak Layak (confidence: 87%)",
      "type": "analysis_complete",
      "is_read": false,
      "created_at": "2025-01-01T12:05:00Z"
    }
  ],
  "total": 5
}
```

---

### PUT `/api/notifications/{notification_id}/read`

Tandai notifikasi sudah dibaca (KF-13).

**Response `200`:** Objek notifikasi yang sudah di-update (`is_read: true`).

---

### GET `/api/notifications/unread-count`

Jumlah notifikasi yang belum dibaca (KF-13).

**Response `200`:**
```json
{
  "count": 3
}
```

---

## 6. Education

> **Tanpa auth** — endpoint publik.
> Artikel di-hardcode di backend, tidak disimpan di database.

### GET `/api/education/articles`

Daftar artikel edukasi (KF-14).

**Query Parameters:**
| Param    | Type   | Keterangan |
|----------|--------|------------|
| category | string | Opsional. Filter: `parameter`, `tips`, `interpretasi` |

**Response `200`:**
```json
{
  "items": [
    {
      "id": "a1000001-0000-0000-0000-000000000001",
      "title": "Apa Itu pH Air dan Mengapa Penting?",
      "slug": "apa-itu-ph-air",
      "category": "parameter",
      "thumbnail_url": null
    },
    {
      "id": "a1000001-0000-0000-0000-000000000004",
      "title": "Sumber Air dan Risiko Kontaminasi",
      "slug": "sumber-air-risiko-kontaminasi",
      "category": "tips",
      "thumbnail_url": null
    }
  ],
  "total": 6
}
```

**Artikel yang tersedia:**
| ID (suffix) | Judul | Kategori |
|-------------|-------|----------|
| `...001` | Apa Itu pH Air dan Mengapa Penting? | parameter |
| `...002` | Mengenal Warna Air dan Artinya | parameter |
| `...003` | Bau Air: Tanda Bahaya yang Sering Diabaikan | parameter |
| `...004` | Sumber Air dan Risiko Kontaminasi | tips |
| `...005` | Cara Sederhana Menjernihkan Air di Rumah | tips |
| `...006` | Memahami Hasil Analisis PAKAR-AIR | interpretasi |

---

### GET `/api/education/articles/{article_id}`

Detail lengkap artikel termasuk konten Markdown (KF-14).

**Response `200`:**
```json
{
  "id": "a1000001-0000-0000-0000-000000000001",
  "title": "Apa Itu pH Air dan Mengapa Penting?",
  "slug": "apa-itu-ph-air",
  "category": "parameter",
  "thumbnail_url": null,
  "content": "pH adalah ukuran tingkat keasaman atau kebasaan air..."
}
```

---

## 7. Admin

> Semua endpoint memerlukan **Auth + is_admin = true**.  
> Response `403` jika user bukan admin.

### GET `/api/admin/dashboard/stats`

Statistik dashboard gabungan (KF-09 + KF-11).

**Response `200`:**
```json
{
  "users": {
    "total": 150,
    "active": 142,
    "new_this_week": 8
  },
  "analyses": {
    "total": 500,
    "completed": 480,
    "this_week": 35
  },
  "results": {
    "layak": 300,
    "tidak_layak": 180
  }
}
```

---

### GET `/api/admin/users`

Daftar semua user (KF-10).

**Query Parameters:** `skip` (default: 0), `limit` (default: 100)

**Response `200`:** Array objek profil.

---

### PUT `/api/admin/users/{user_id}/status`

Aktifkan/nonaktifkan akun user (KF-10).

**Query Parameters:**
| Param     | Type | Keterangan            |
|-----------|------|-----------------------|
| is_active | bool | `true` atau `false`   |

**Response `200`:**
```json
{
  "message": "User deactivated",
  "user_id": "uuid"
}
```

---

### DELETE `/api/admin/users/{user_id}`

Hapus user beserta seluruh datanya (KF-10). **Cascade delete.**

**Response `200`:**
```json
{
  "message": "User deleted",
  "user_id": "uuid"
}
```

---

### GET `/api/admin/analysis/stats`

Statistik analisis detail: tren bulanan + rata-rata confidence (KF-11).

**Response `200`:**
```json
{
  "monthly_trend": [
    {"month": "2025-01", "count": 45},
    {"month": "2025-02", "count": 62}
  ],
  "average_confidence": 0.782
}
```

---

### GET `/api/admin/reports`

Data laporan bisa difilter (KF-12).

**Query Parameters:**
| Param     | Type   | Keterangan                    |
|-----------|--------|-------------------------------|
| date_from | string | Format `YYYY-MM-DD` (opsional) |
| date_to   | string | Format `YYYY-MM-DD` (opsional) |
| category  | string | `layak` atau `tidak_layak` (opsional) |

**Response `200`:**
```json
{
  "items": [
    {
      "analysis_id": "uuid",
      "user": "Nama User",
      "username": "username123",
      "status": "completed",
      "category": "tidak_layak",
      "confidence": 0.87,
      "created_at": "2025-01-15T10:30:00"
    }
  ],
  "total": 25
}
```

---

### GET `/api/admin/reports/export`

Export laporan sebagai file CSV (KF-12). Parameter filter sama dengan `/reports`.

**Response:** File CSV download (`Content-Type: text/csv`).

**Contoh Axios:**
```javascript
const response = await axios.get('/api/admin/reports/export', {
  params: { date_from: '2025-01-01', category: 'tidak_layak' },
  responseType: 'blob'
});
const url = window.URL.createObjectURL(new Blob([response.data]));
const link = document.createElement('a');
link.href = url;
link.download = 'pakar_air_report.csv';
link.click();
```

---

## 🔧 Setup Axios di Frontend

Contoh konfigurasi `axios.js` yang direkomendasikan:

```javascript
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000',
  headers: { 'Content-Type': 'application/json' }
});

// Auto-attach JWT token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auto-refresh on 401
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      const refreshToken = localStorage.getItem('refresh_token');
      if (refreshToken) {
        try {
          const { data } = await axios.post('/api/auth/refresh', {
            refresh_token: refreshToken
          });
          localStorage.setItem('access_token', data.access_token);
          localStorage.setItem('refresh_token', data.refresh_token);
          error.config.headers.Authorization = `Bearer ${data.access_token}`;
          return api(error.config);
        } catch {
          localStorage.clear();
          window.location.href = '/login';
        }
      }
    }
    return Promise.reject(error);
  }
);

export default api;
```

---

## 📌 Status Codes

| Code | Arti                              |
|------|-----------------------------------|
| 200  | Sukses                            |
| 400  | Request body tidak valid          |
| 401  | Tidak terautentikasi (token expired/invalid) |
| 403  | Akses ditolak (bukan admin, atau akun nonaktif) |
| 404  | Resource tidak ditemukan          |
| 409  | Konflik (username sudah ada)      |
| 500  | Server error (analisis gagal, dll) |

---

## 🗂 File Statis

Gambar yang diupload bisa diakses di:
```
GET http://localhost:5000/uploads/{filename}
```

Contoh: `http://localhost:5000/uploads/20250101_120000_abc12345.jpg`
