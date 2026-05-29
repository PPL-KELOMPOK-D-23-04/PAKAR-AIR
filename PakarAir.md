# 📘 PAKAR-AIR — System Documentation

**Version:** 1.0.0
**Last Updated:** 29 Mei 2026
**Classification:** Internal — Development Team Only

> **Single Source of Truth** untuk seluruh pengembangan sistem PAKAR-AIR.
> Dokumen ini menjadi acuan implementasi frontend, backend, AI pipeline, UI/UX consistency, coding standard, dan onboarding developer baru.

---

## Daftar Isi

- [Bagian 1 — Project Overview](#bagian-1--project-overview)
- [Bagian 2 — System Architecture](#bagian-2--system-architecture)
- [Bagian 3 — Folder Structure](#bagian-3--folder-structure)
- [Bagian 4 — Frontend Design System](#bagian-4--frontend-design-system)
- [Bagian 5 — Component Standard](#bagian-5--component-standard)
- [Bagian 6 — API Documentation](#bagian-6--api-documentation)
- [Bagian 7 — Database Documentation](#bagian-7--database-documentation)
- [Bagian 8 — Backend Development Standard](#bagian-8--backend-development-standard)
- [Bagian 9 — Authentication & Authorization](#bagian-9--authentication--authorization)
- [Bagian 10 — QA & Testing Standard](#bagian-10--qa--testing-standard)
- [Bagian 11 — Deployment Documentation](#bagian-11--deployment-documentation)
- [Bagian 12 — Coding Standard](#bagian-12--coding-standard)
- [Bagian 13 — Future Scalability](#bagian-13--future-scalability)

---

# BAGIAN 1 — PROJECT OVERVIEW

## 1.1 Identitas Project

| Atribut | Nilai |
|---|---|
| **Nama Project** | PAKAR-AIR (Sistem Pakar Klasifikasi Sanitasi Air) |
| **Versi** | 1.0.0 |
| **Mata Kuliah** | Pengembangan Perangkat Lunak (PPL) — Semester 6 |
| **Kelompok** | D-23-04 |
| **Repository** | `PPL-KELOMPOK-D-23-04/PAKAR-AIR` |

## 1.2 Tujuan Project

PAKAR-AIR adalah sistem pakar berbasis web yang menggabungkan **Deep Learning (YOLOv8)** dan **Machine Learning (Random Forest)** untuk mengklasifikasikan kualitas sanitasi air secara real-time. Sistem menerima input berupa **citra/foto air** dan **9 parameter kimia**, kemudian menghasilkan prediksi apakah air tersebut **layak** atau **tidak layak** digunakan.

## 1.3 Business Objective

1. Menyediakan alat bantu asesmen kualitas air yang cepat, akurat, dan mudah diakses oleh masyarakat umum.
2. Menggabungkan analisis visual (Deep Learning) dan analisis numerik (Machine Learning) dalam satu pipeline fusi untuk meningkatkan akurasi prediksi.
3. Memberikan penjelasan dan rekomendasi tindak lanjut yang actionable kepada pengguna.
4. Menyediakan dashboard admin untuk monitoring, manajemen pengguna, pelaporan, dan asisten AI berbasis Gemini.

## 1.4 Target User

| Peran | Deskripsi |
|---|---|
| **Pengguna Umum (User)** | Masyarakat, petugas lapangan, atau peneliti yang ingin menguji kualitas air secara cepat melalui upload foto dan input parameter kimia. |
| **Administrator (Admin)** | Pengelola sistem yang memonitor seluruh analisis, mengelola pengguna, mengakses laporan statistik, dan menggunakan AI Chatbot Gemini untuk analisis lanjutan. |

## 1.5 Scope Aplikasi

Sistem ini mencakup:

- Registrasi dan autentikasi pengguna via Supabase Auth.
- Upload foto air dan input 9 parameter kimia.
- Analisis otomatis menggunakan pipeline DL + ML + Fusion.
- Visualisasi hasil analisis dengan confidence gauge, penjelasan, dan rekomendasi.
- Riwayat analisis dengan filter, pencarian, dan ekspor CSV/PDF.
- Notifikasi hasil analisis.
- Modul edukasi kualitas air.
- Panel admin: dashboard statistik, manajemen pengguna, laporan, dan AI Chatbot.

## 1.6 Fitur Utama

| Kode | Fitur | Deskripsi |
|---|---|---|
| KF-01 | Registrasi | Pendaftaran akun pengguna baru |
| KF-02 | Login/Logout | Autentikasi dan manajemen sesi |
| KF-03 | Upload Citra Air | Upload foto sampel air (PNG/JPG/WEBP) |
| KF-04 | Input Parameter Kimia | Input 9 parameter: pH, Hardness, Solids, Chloramines, Sulfate, Conductivity, Organic Carbon, Trihalomethanes, Turbidity |
| KF-05 | Analisis AI | Pipeline DL (YOLO) + ML (Random Forest) + Fusion |
| KF-06 | Hasil Analisis | Prediksi layak/tidak layak + confidence + penjelasan + rekomendasi |
| KF-07 | Riwayat Analisis | Daftar riwayat dengan filter, search, paginasi |
| KF-08 | Profil & Akun | Update profil, ganti password, upload avatar, hapus akun |
| KF-09 | Admin Dashboard | Statistik pengguna, analisis, dan tren |
| KF-10 | Manajemen Pengguna | CRUD user, aktivasi/deaktivasi akun |
| KF-11 | Statistik Analisis | Tren bulanan, rata-rata confidence, distribusi kategori |
| KF-12 | Laporan Admin | Laporan filterable + ekspor CSV |
| KF-13 | Notifikasi | Notifikasi otomatis setelah analisis selesai |
| KF-14 | Edukasi | Modul artikel edukasi kualitas air |
| KF-15 | AI Chatbot | Asisten AI Gemini untuk admin (analisis data lanjutan) |
| KF-16 | Ekspor PDF | Ekspor hasil analisis tunggal ke PDF |
| KF-17 | Ekspor CSV | Ekspor riwayat analisis ke CSV |

## 1.7 Modul Utama

```
┌─────────────────────────────────────────────────────────────┐
│                      PAKAR-AIR SYSTEM                       │
├──────────────┬──────────────┬──────────────┬────────────────┤
│  Auth Module │ Analysis Mod │ Admin Module │ Education Mod  │
│  ─────────── │ ──────────── │ ──────────── │ ────────────── │
│  Register    │ Upload Image │ Dashboard    │ Artikel        │
│  Login       │ Manual Input │ User Mgmt    │ Edukasi Air    │
│  Logout      │ AI Pipeline  │ Reports      │                │
│  Profile     │ History      │ AI Chatbot   │                │
│  Password    │ Export       │ Export CSV   │                │
│  Avatar      │ Notification │              │                │
└──────────────┴──────────────┴──────────────┴────────────────┘
```

## 1.8 Teknologi yang Digunakan

### Frontend

| Teknologi | Versi | Fungsi |
|---|---|---|
| Vue.js | 3.5.31 | Reactive UI framework |
| Vite | 8.0.10 | Build tool & dev server |
| Pinia | 3.0.4 | State management |
| Vue Router | 5.0.4 | Client-side routing |
| Axios | 1.15.0 | HTTP client |
| Tailwind CSS | 4.2.2 | Utility CSS framework |
| Lucide Vue Next | 1.0.0 | Icon library |
| Supabase JS | 2.103.0 | Supabase client (storage) |

### Backend

| Teknologi | Versi | Fungsi |
|---|---|---|
| Python | 3.10+ | Runtime bahasa pemrograman |
| FastAPI | latest | Web framework (async) |
| Uvicorn | latest | ASGI server |
| SQLAlchemy | latest | ORM database |
| Pydantic | latest | Data validation & schemas |
| Supabase | latest | Auth + Storage cloud |
| PostgreSQL | 15+ | Database (via Supabase) |

### AI / ML

| Teknologi | Fungsi |
|---|---|
| Ultralytics (YOLOv8) | Object detection — floating trash pada citra air |
| Scikit-learn (Random Forest) | Klasifikasi potabilitas berdasarkan 9 parameter kimia |
| Pandas | Manipulasi data tabular |
| Pillow (PIL) | Image processing dan validasi |
| Google GenAI (Gemini) | AI Chatbot untuk admin |

### Infrastructure

| Teknologi | Fungsi |
|---|---|
| Supabase | Auth, Database (PostgreSQL), Storage (S3-compatible) |
| Vite Dev Server | Frontend development (port 5173) |
| Uvicorn | Backend development (port 8000) |
| Node.js 20.19+ / 22.12+ | Frontend runtime |

## 1.9 Arsitektur Sistem — Diagram High-Level

```
┌────────────────────────────────────────────────────────────────────┐
│                         CLIENT (Browser)                           │
│  ┌──────────────────────────────────────────────────────────────┐  │
│  │  Vue 3 + Pinia + Vue Router + Tailwind CSS + Vanilla CSS    │  │
│  │  ────────────────────────────────────────────────────────    │  │
│  │  Pages: Landing | Login | Register | Dashboard | Analysis   │  │
│  │         History | Profile | Notifications | Education       │  │
│  │         Admin Dashboard | Admin Users | Admin Reports       │  │
│  │         Admin Chatbot                                       │  │
│  └──────────────┬───────────────────────────────────────────────┘  │
│                 │  Axios HTTP (REST API)                           │
│                 │  Authorization: Bearer <JWT>                     │
└─────────────────┼──────────────────────────────────────────────────┘
                  │
                  ▼
┌─────────────────┴──────────────────────────────────────────────────┐
│                    BACKEND (FastAPI + Uvicorn)                      │
│  ┌──────────────────────────────────────────────────────────────┐  │
│  │  API Layer (Routers)                                         │  │
│  │  /api/auth/* │ /api/users/* │ /api/analysis/*               │  │
│  │  /api/notifications/* │ /api/admin/* │ /api/admin/chatbot/* │  │
│  ├──────────────────────────────────────────────────────────────┤  │
│  │  Service Layer                                               │  │
│  │  auth_service │ analysis_service │ ml_service                │  │
│  │  notification_service │ report_service │ chatbot_service     │  │
│  │  user_service                                                │  │
│  ├──────────────────────────────────────────────────────────────┤  │
│  │  ML/DL Layer                                                 │  │
│  │  yolo_detector.py │ rf_classifier.py │ fusion.py             │  │
│  │  preprocessor.py                                             │  │
│  ├──────────────────────────────────────────────────────────────┤  │
│  │  Data Layer (SQLAlchemy ORM)                                 │  │
│  │  models.py → Profile, Analysis, ImageInput, ManualInput,     │  │
│  │              AnalysisResult, Notification, ChatSession,      │  │
│  │              ChatMessage                                     │  │
│  └──────────────┬───────────────────────────────────────────────┘  │
│                 │                                                   │
└─────────────────┼───────────────────────────────────────────────────┘
                  │
                  ▼
┌─────────────────┴──────────────────────────────────────────────────┐
│                    SUPABASE (Cloud Platform)                        │
│  ┌────────────────┐  ┌────────────────┐  ┌─────────────────────┐  │
│  │  Auth Service   │  │  PostgreSQL DB │  │  Storage (S3)       │  │
│  │  JWT tokens     │  │  8 tables      │  │  Buckets: analyses, │  │
│  │  User mgmt      │  │  RLS policies  │  │           avatars   │  │
│  └────────────────┘  └────────────────┘  └─────────────────────┘  │
└────────────────────────────────────────────────────────────────────┘
```

---

# BAGIAN 2 — SYSTEM ARCHITECTURE

## 2.1 Frontend Architecture

### 2.1.1 Framework

- **Vue.js 3** dengan **Composition API** (`<script setup>` syntax).
- **Vite 8** sebagai build tool dengan HMR (Hot Module Replacement).
- **Tailwind CSS 4** digunakan sebagai utility framework, namun komponen utama menggunakan **vanilla CSS dengan CSS Variables** untuk kontrol penuh.

### 2.1.2 State Management

- **Pinia 3** dengan Options API style (`defineStore` + `state/getters/actions`).
- Dua store utama:
  - `authStore` — mengelola token, user session, login/logout.
  - `analysisStore` — mengelola state image, manualData (9 parameter), dan result.
- Token disimpan di `sessionStorage` dengan key:
  - `pakar_air_token` (primary)
  - `token` (fallback)
  - `pakar_air_refresh_token`
  - `pakar_air_user` (JSON string user object)

### 2.1.3 Routing

- **Vue Router 5** dengan `createWebHistory` (HTML5 History Mode).
- Route guards:
  - `requiresAuth` — redirect ke `/login` jika tidak ada token.
  - `requiresAdmin` — redirect ke `/dashboard` jika bukan admin.
  - `guestOnly` — redirect ke dashboard jika sudah login.
- Lazy loading via `() => import(...)` untuk semua halaman kecuali `LandingPage`, `AnalysisView`, `ProfileView`, `NotificationView`.

### 2.1.4 Layout Architecture

Tiga layout utama:

| Layout | File | Digunakan Oleh |
|---|---|---|
| `DefaultLayout` | `layouts/DefaultLayout.vue` | Landing Page |
| `DashboardLayout` | `layouts/DashboardLayout.vue` | Dashboard, Analysis, History, Profile, Notifications, Education |
| `AdminLayout` | `layouts/AdminLayout.vue` | Admin Dashboard, Admin Users, Admin Reports, Admin Chatbot |

**DashboardLayout** struktur:
```
┌──────────┬───────────────────────────────────────────┐
│          │  Topbar (56px, sticky)                     │
│ Sidebar  │  ┌─────────────────┐ ┌─────────────────┐ │
│ (220px)  │  │ Breadcrumb      │ │ Notif + Profile │ │
│ fixed    │  └─────────────────┘ └─────────────────┘ │
│          ├───────────────────────────────────────────┤
│          │  Content Area (scrollable, padding 28px)   │
│          │  ┌─────────────────────────────────────┐  │
│          │  │  <slot> / <router-view>             │  │
│          │  └─────────────────────────────────────┘  │
└──────────┴───────────────────────────────────────────┘
```

### 2.1.5 Component Architecture

```
components/
└── analysis/
    ├── UploadCard.vue          — Kartu upload foto air (drag-drop + preview)
    ├── ImageUploader.vue       — Komponen drag-drop area
    ├── ManualDataForm.vue      — Form 9 parameter kimia (grid 2 kolom)
    ├── PredictionResult.vue    — Kartu hasil prediksi (badge + confidence + explanation)
    ├── ConfidenceGauge.vue     — Visual gauge tingkat kepercayaan model
    ├── DetectionOverlay.vue    — Overlay bounding box YOLO di atas gambar
    └── ExportModal.vue         — Modal ekspor PDF/CSV
```

### 2.1.6 Reusable Composables

| Composable | File | Fungsi |
|---|---|---|
| `useAnalysis` | `composables/useAnalysis.js` | Orchestrator submit analisis: validasi → submit → retry fetch result → set store |
| `useFileUpload` | `composables/useFileUpload.js` | Validasi tipe dan ukuran file, generate preview URL |

### 2.1.7 API Layer (Frontend)

| File | Fungsi |
|---|---|
| `api/axios.js` | Axios instance dengan base URL, token interceptor, 401 auto-logout |
| `api/analysis.js` | `submitAnalysis`, `getAnalysisResult`, `exportHistoryCSV`, `getAnalysisExportDetail`, `getAnalysisHistory` |
| `api/chatbot.js` | CRUD sesi chat, kirim pesan ke AI |

### 2.1.8 Page Structure

| Route | Page | Layout | Auth |
|---|---|---|---|
| `/` | `LandingPage.vue` | DefaultLayout | Public |
| `/login` | `LoginPage.vue` | — (standalone) | Guest Only |
| `/register` | `RegisterPage.vue` | — (standalone) | Guest Only |
| `/dashboard` | `DashboardPage.vue` | DashboardLayout | Required |
| `/analysis` | `AnalysisView.vue` | DashboardLayout | Required |
| `/history` | `HistoryView.vue` | DashboardLayout | Required |
| `/education` | `EdukasiView.vue` | DashboardLayout | Public |
| `/artikel` | `HomeArtikel.vue` | — | Public |
| `/artikel2` | `HomeArtikel2.vue` | — | Public |
| `/artikel3` | `HomeArtikel3.vue` | — | Public |
| `/profile` | `ProfileView.vue` | DashboardLayout | Required |
| `/notifications` | `NotificationView.vue` | DashboardLayout | Required |
| `/admin` | `AdminDashboard.vue` | AdminLayout | Admin |
| `/admin/users` | `AdminUsers.vue` | AdminLayout | Admin |
| `/admin/reports` | `AdminReports.vue` | AdminLayout | Admin |
| `/admin/chatbot` | `AdminChatbot.vue` | AdminLayout | Admin |

---

## 2.2 Backend Architecture

### 2.2.1 Framework

- **FastAPI** — asynchronous Python web framework.
- **Uvicorn** — ASGI server (development mode dengan `--reload`).
- Entry point: `server/run.py` → `app.main:app`.
- Swagger UI: `http://localhost:8000/docs`
- ReDoc: `http://localhost:8000/redoc`

### 2.2.2 API Layer (Routers)

| Router | Prefix | Tag | Deskripsi |
|---|---|---|---|
| `auth.py` | `/api/auth` | Auth | Register, Login, Logout, Refresh |
| `users.py` | `/api/users` | Users | Profile CRUD, Password, Avatar |
| `analysis.py` | `/api/analysis` | Analysis | Submit, History, Detail, Export |
| `notifications.py` | `/api/notifications` | Notifications | List, Mark Read, Unread Count |
| `admin.py` | `/api/admin` | Admin | Dashboard Stats, User Mgmt, Reports |
| `chatbot.py` | `/api/admin/chatbot` | Chatbot | Sessions CRUD, Send Message |

### 2.2.3 Service Layer

| Service | File | Tanggung Jawab |
|---|---|---|
| `auth_service` | `services/auth_service.py` | Register/Login/Logout via Supabase Auth, profile fallback creation |
| `analysis_service` | `services/analysis_service.py` | Orchestrate: create analysis → run pipeline → save result → create notification |
| `ml_service` | `services/ml_service.py` | Wrap YOLO + RF + Fusion, handle missing model fallback |
| `notification_service` | `services/notification_service.py` | CRUD notifikasi |
| `report_service` | `services/report_service.py` | Dashboard stats, analysis stats, report data, CSV export |
| `user_service` | `services/user_service.py` | Update profile, change password, delete account |
| `chatbot_service` | `services/chatbot_service.py` | CRUD sesi chat, integrasi Google Gemini AI |
| `chatbot_tools` | `services/chatbot_tools.py` | Tool definitions untuk Gemini function calling |

### 2.2.4 Data Layer (ORM)

- **SQLAlchemy** ORM dengan `declarative_base()`.
- Database: **PostgreSQL** (hosted di Supabase).
- Session management: `SessionLocal` via `get_db()` dependency.
- Connection string: `DATABASE_URL` dari `.env`.

### 2.2.5 Authentication Layer

- **Supabase Auth** mengelola JWT token generation dan user management.
- Backend memverifikasi token via `supabase.auth.get_user(token)`.
- Dependency injection:
  - `get_current_user` — verifikasi token, ambil profile dari DB, cek `is_active`.
  - `get_admin_user` — extends `get_current_user`, cek `is_admin`.

### 2.2.6 Utility Layer

| Utility | File | Fungsi |
|---|---|---|
| `db.py` | `utils/db.py` | SQLAlchemy engine & session factory |
| `supabase.py` | `utils/supabase.py` | Supabase client singleton |
| `file_handler.py` | `utils/file_handler.py` | Upload file ke Supabase Storage, validasi tipe & ukuran |
| `helpers.py` | `utils/helpers.py` | Pagination helper untuk SQLAlchemy query |

---

## 2.3 AI Layer

### 2.3.1 Pipeline Overview

```
Input                          Processing                      Output
───────────────────────────────────────────────────────────────────────
                              ┌──────────────────┐
Foto Air (PNG/JPG) ──────────►│  YOLOv8 Detector │──► DL Result
                              │  (water_yolo.pt) │    ├─ category
                              └──────────────────┘    ├─ confidence
                                                      └─ detections[]
                                        │
                                        ▼
                              ┌──────────────────┐
                              │   Fusion Layer   │──► Final Result
                              │ DL×0.4 + ML×0.6  │    ├─ category
                              │ Threshold: 0.5   │    ├─ confidence
                              └──────────────────┘    ├─ explanation
                                        ▲             └─ recommendation
                                        │
                              ┌──────────────────┐
9 Parameter Kimia ───────────►│  Random Forest   │──► ML Result
                              │  (rf_model.pkl)  │    ├─ category
                              │  + scaler.pkl    │    ├─ confidence
                              └──────────────────┘    └─ feature_importance{}
```

### 2.3.2 Deep Learning — YOLOv8 Object Detection

| Aspek | Detail |
|---|---|
| **Model** | YOLOv8n (Nano) — `water_yolo.pt` |
| **Input** | Citra air (PNG/JPG), di-resize ke max 640×640 |
| **Output** | Bounding box detections, confidence scores |
| **Classes** | Class 0: `floater` (sampah terapung) — negative indicator |
| **Scoring** | Jika ada deteksi negatif: `score = 1 - avg_negative_confidence`. Jika tidak ada deteksi: `score = 0.5` (neutral) |
| **Path** | `ML_DL/saved_models/water_yolo.pt` |

### 2.3.3 Machine Learning — Random Forest Classifier

| Aspek | Detail |
|---|---|
| **Model** | Random Forest — `random_forest_model.pkl` |
| **Scaler** | StandardScaler — `scaler.pkl` |
| **Input** | 9 features: `[ph, Hardness, Solids, Chloramines, Sulfate, Conductivity, Organic_carbon, Trihalomethanes, Turbidity]` |
| **Output** | `0` = tidak_layak, `1` = layak |
| **Confidence** | `max(predict_proba)` |
| **Feature Importance** | Extracted dari `model.feature_importances_` |
| **Path** | `ML_DL/saved_models/random_forest_model.pkl`, `ML_DL/saved_models/scaler.pkl` |

### 2.3.4 Fusion Layer

| Aspek | Detail |
|---|---|
| **Formula** | `Final Score = DL_score × 0.4 + ML_score × 0.6` |
| **DL Weight** | 0.4 (40%) |
| **ML Weight** | 0.6 (60%) |
| **Threshold** | `score > 0.5` → **LAYAK**, `score ≤ 0.5` → **TIDAK LAYAK** |
| **Category to Score** | `layak` → confidence value, `tidak_layak` → `1.0 - confidence` |
| **Null Handling** | Jika salah satu model null → score `0.5` (neutral) |

### 2.3.5 Data Validation Flow

```
User Input → Frontend Validation → API Parsing → Preprocessor → Model Inference
     │              │                    │              │
     │    ┌─────────┘                    │              │
     │    │ Cek semua field terisi       │              │
     │    │ Cek angka valid              │              │
     │    │ Cek pH 0-14                  │              │
     │    │ Cek non-negatif              │              │
     │    │ Cek gambar ada               │              │
     │    └──────────────────────────────┤              │
     │                                   │              │
     │              JSON.parse(manual_data)             │
     │              Validasi file extension              │
     │              Validasi file size ≤ 10MB            │
     │                                   │              │
     │                         validate_manual_data()   │
     │                         validate_image()          │
     │                         resize_image(max=640)     │
     └───────────────────────────────────────────────────┘
```

### 2.3.6 Request-Response Flow (Analisis Lengkap)

```
1. User klik "Proses Analisis"
   └─► useAnalysis.submit()
       ├─► validateData() — cek image + 9 field
       ├─► store.resetResult()
       ├─► submitAnalysis(manualData, image)
       │   ├─► FormData: image file + JSON.stringify(mappedData)
       │   ├─► POST /api/analysis (multipart/form-data)
       │   │   ├─► upload_to_supabase() — simpan gambar ke bucket
       │   │   ├─► create_analysis() — simpan record + inputs ke DB
       │   │   ├─► run_analysis()
       │   │   │   ├─► status → "processing"
       │   │   │   ├─► run_full_inference(image_path, manual_data)
       │   │   │   │   ├─► predict_image() → DL result
       │   │   │   │   ├─► predict_manual() → ML result
       │   │   │   │   └─► fuse_results() → Final result
       │   │   │   ├─► Save AnalysisResult ke DB
       │   │   │   ├─► status → "completed"
       │   │   │   └─► create_notification()
       │   │   └─► Return { analysis_id, status, message }
       │   └─► Return analysis_id
       ├─► fetchResultWithRetry(analysisId, maxAttempts=5)
       │   └─► GET /api/analysis/{id} (retry setiap 1.5s)
       │       └─► Return full result object
       └─► store.setResult(result)
           └─► UI berubah ke PredictionResult view
```

---

# BAGIAN 3 — FOLDER STRUCTURE

## 3.1 Root Structure

```
PAKAR-AIR/
├── .git/                       # Git repository data
├── .gitignore                  # Git ignore rules
├── README.md                   # Project README
├── PakarAir.md                 # Dokumentasi ini (Single Source of Truth)
├── docs/                       # Dokumentasi tambahan
│   ├── API_DOCUMENTATION.md    # Dokumentasi endpoint API
│   ├── model_spec.md           # Spesifikasi model ML/DL
│   └── progress_report.md      # Laporan progres pengembangan
├── frontend/                   # Vue.js frontend application
├── server/                     # FastAPI backend application
└── notebook/                   # Jupyter notebook untuk training model
```

## 3.2 Frontend Structure

```
frontend/
├── .editorconfig               # Editor configuration (indent, charset)
├── .gitattributes              # Git line ending rules
├── .gitignore                  # Frontend-specific ignore rules
├── .oxlintrc.json              # OxLint configuration
├── .prettierrc.json            # Prettier code formatter config
├── .vscode/                    # VS Code workspace settings
├── eslint.config.js            # ESLint flat config
├── index.html                  # HTML entry point (SPA)
├── jsconfig.json               # JavaScript path alias (@/)
├── package.json                # NPM dependencies & scripts
├── package-lock.json           # Locked dependency tree
├── vite.config.js              # Vite build + dev server config
├── public/                     # Static assets (served as-is)
└── src/
    ├── App.vue                 # Root Vue component
    ├── main.js                 # Application entry point + Axios interceptors
    ├── api/                    # API client modules
    │   ├── axios.js            # Axios instance + interceptors
    │   ├── analysis.js         # Analysis API calls
    │   └── chatbot.js          # Chatbot API calls
    ├── assets/
    │   └── styles/
    │       ├── main.css        # Global CSS variables + resets + base styles
    │       └── pages/
    │           ├── analysis.css    # Styles untuk AnalysisView
    │           ├── chatbot.css     # Styles untuk AdminChatbot
    │           ├── dashboard.css   # Styles untuk DashboardPage + AdminDashboard
    │           ├── edukasi.css     # Styles untuk halaman edukasi
    │           ├── landing.css     # Styles untuk LandingPage
    │           ├── login.css       # Styles untuk LoginPage + RegisterPage
    │           └── profile.css     # Styles untuk ProfileView
    ├── components/             # Reusable Vue components
    │   └── analysis/
    │       ├── ConfidenceGauge.vue     # Gauge visual confidence
    │       ├── DetectionOverlay.vue    # YOLO bounding box overlay
    │       ├── ExportModal.vue         # Modal export PDF/CSV
    │       ├── ImageUploader.vue       # Drag-drop upload area
    │       ├── ManualDataForm.vue      # Form 9 parameter kimia
    │       ├── PredictionResult.vue    # Kartu hasil prediksi
    │       └── UploadCard.vue          # Wrapper upload dengan preview
    ├── composables/            # Vue composable functions
    │   ├── useAnalysis.js      # Submit + validate + retry logic
    │   └── useFileUpload.js    # File validation + preview
    ├── layouts/                # Page layout wrappers
    │   ├── AdminLayout.vue     # Layout admin panel (sidebar + topbar)
    │   ├── DashboardLayout.vue # Layout user dashboard (sidebar + topbar)
    │   └── DefaultLayout.vue   # Layout minimal (slot only)
    ├── router/
    │   └── index.js            # Route definitions + navigation guards
    ├── stores/                 # Pinia state stores
    │   ├── analysisStore.js    # State: image, manualData, result
    │   ├── authStore.js        # State: user, token, login/logout
    │   └── counter.js          # Unused boilerplate (can be removed)
    └── views/                  # Page-level components
        ├── RegisterPage.vue    # (Duplicate? Also in auth/)
        ├── admin/
        │   ├── AdminChatbot.vue    # AI Chatbot interface
        │   ├── AdminDashboard.vue  # Admin statistics dashboard
        │   ├── AdminReports.vue    # Admin filterable reports
        │   └── AdminUsers.vue      # Admin user management
        ├── auth/
        │   ├── LoginPage.vue       # Login form
        │   └── RegisterPage.vue    # Registration form
        ├── dashboard/
        │   ├── AnalysisView.vue    # Upload + Input + Result page
        │   ├── DashboardPage.vue   # Main user dashboard
        │   ├── HistoryView.vue     # Analysis history list
        │   ├── NotificationView.vue # Notifications page
        │   └── ProfileView.vue     # User profile page
        ├── edukasi/
        │   ├── EdukasiView.vue     # Education hub page
        │   ├── HomeArtikel.vue     # Artikel 1
        │   ├── HomeArtikel2.vue    # Artikel 2
        │   ├── HomeArtikel3.vue    # Artikel 3
        │   ├── SearchBar.vue       # Search component untuk edukasi
        │   └── WireFrameEdukasiAir.vue # Wireframe halaman edukasi
        └── public/
            └── LandingPage.vue     # Public landing page
```

## 3.3 Backend Structure

```
server/
├── .env.example                # Template environment variables
├── package.json                # Node.js dependencies (Express/Multer — legacy)
├── package-lock.json           # Locked Node.js dependencies
├── requirements.txt            # Python dependencies
├── run.py                      # Application entry point (uvicorn runner)
├── app/
│   ├── __init__.py             # Package init
│   ├── main.py                 # FastAPI app instance + middleware + routers
│   ├── config.py               # Settings (Pydantic BaseSettings from .env)
│   ├── api/                    # API route handlers (controllers)
│   │   ├── __init__.py
│   │   ├── deps.py             # Dependency injection: get_current_user, get_admin_user
│   │   ├── auth.py             # POST register, login, logout, refresh
│   │   ├── users.py            # GET/PUT profile, POST avatar, POST change-password, DELETE me
│   │   ├── analysis.py         # POST analysis, GET history, GET detail, GET export
│   │   ├── notifications.py    # GET list, PUT mark-read, GET unread-count
│   │   ├── admin.py            # GET stats, GET/PUT/DELETE users, GET reports, GET export
│   │   └── chatbot.py          # POST/GET/DELETE sessions, POST messages
│   ├── models/                 # SQLAlchemy ORM models
│   │   ├── __init__.py         # Model imports
│   │   └── models.py           # Profile, Analysis, ImageInput, ManualInput, AnalysisResult,
│   │                           #   Notification, ChatSession, ChatMessage
│   ├── schemas/                # Pydantic request/response schemas
│   │   ├── __init__.py
│   │   ├── auth_schema.py      # RegisterRequest, LoginRequest, TokenResponse, etc.
│   │   ├── user.py             # ProfileBase, ProfileUpdate, ProfileResponse, PasswordChange
│   │   ├── analysis_schema.py  # ManualInputData, AnalysisResultResponse, HistoryResponse, etc.
│   │   ├── notification_schema.py # NotificationResponse, NotificationListResponse
│   │   └── chatbot_schema.py   # ChatMessageRequest, ChatSessionResponse, ChatBotResponse
│   ├── services/               # Business logic layer
│   │   ├── __init__.py
│   │   ├── auth_service.py     # Supabase Auth wrapper
│   │   ├── analysis_service.py # Analysis pipeline orchestrator
│   │   ├── ml_service.py       # ML/DL inference wrapper
│   │   ├── notification_service.py # Notification CRUD
│   │   ├── report_service.py   # Dashboard & report statistics
│   │   ├── user_service.py     # Profile update, avatar, delete
│   │   ├── chatbot_service.py  # Gemini AI chat integration
│   │   └── chatbot_tools.py    # Gemini function calling tools
│   └── utils/                  # Shared utilities
│       ├── __init__.py
│       ├── db.py               # SQLAlchemy engine + SessionLocal
│       ├── supabase.py         # Supabase client singleton
│       ├── file_handler.py     # File upload to Supabase Storage
│       └── helpers.py          # Pagination helper
├── database/
│   ├── schema.sql              # Main database schema (6 tables + RLS + triggers)
│   ├── schema_chatbot.sql      # Chatbot schema (2 tables + RLS + triggers)
│   ├── migrate.py              # Database migration script
│   └── seed.py                 # Database seeder
└── ML_DL/                      # Machine Learning / Deep Learning modules
    ├── __init__.py
    ├── yolo_detector.py        # YOLOv8 inference wrapper
    ├── rf_classifier.py        # Random Forest inference wrapper
    ├── fusion.py               # Fusion layer (DL×0.4 + ML×0.6)
    ├── preprocessor.py         # Image validation, resize, manual data validation
    └── saved_models/           # Trained model files (not in git)
        ├── water_yolo.pt       # YOLOv8 model weights
        ├── random_forest_model.pkl  # Random Forest model
        └── scaler.pkl          # StandardScaler for RF
```

## 3.4 Notebook Structure

```
notebook/
├── .gitignore                  # Ignore large model/dataset files
├── ML.ipynb                    # Jupyter notebook for model training
├── data.yaml                   # YOLO dataset configuration
├── predict.py                  # Standalone prediction script
├── prepare_dataset.py          # Dataset preparation utility
├── save_model.py               # Model saving utility
├── split_train_val.py          # Train/validation split utility
├── train.py                    # Model training script
├── train.txt                   # Training data file list
├── val.txt                     # Validation data file list
├── test.txt                    # Test data file list
└── voc_label.py                # VOC label conversion utility
```

---

# BAGIAN 4 — FRONTEND DESIGN SYSTEM

## 4.1 Design Philosophy

PAKAR-AIR mengadopsi karakter desain **Dashboard SaaS Modern** yang menggabungkan elemen **Enterprise Clean UI**, **Medical/Scientific Application**, dan **Minimalist Premium Design**.

### Prinsip Visual Utama

1. **Clarity First** — Setiap elemen harus langsung dipahami tanpa penjelasan tambahan. Gunakan label yang jelas, hierarki visual yang kuat, dan whitespace yang cukup.
2. **Scientific Precision** — Karena aplikasi ini berkaitan dengan analisis kualitas air, tampilan harus memancarkan kesan ilmiah dan profesional. Gunakan data-driven visuals, badge kategori yang tegas, dan representasi numerik yang presisi.
3. **Card-Based Architecture** — Seluruh konten dikelompokkan dalam card-card terstruktur. Setiap card memiliki header, body, dan optional footer. Tidak ada konten yang "mengambang" tanpa container.
4. **Consistent Density** — Elemen UI menggunakan ukuran compact (font 12-14px, padding 8-24px) agar information density tinggi namun tetap readable.
5. **Progressive Disclosure** — Informasi ditampilkan secara bertahap: ringkasan dulu, detail di bawah. Gunakan section divider dan collapsible panels.
6. **Responsive First** — Semua layout harus berfungsi sempurna dari mobile 320px hingga desktop ultrawide 1920px.

---

## 4.2 Layout System

### 4.2.1 Dimensi Utama

| Token | Nilai | Deskripsi |
|---|---|---|
| `--sidebar-width` | `220px` | Lebar sidebar tetap (DashboardLayout) |
| `--sidebar-width-collapsed` | `72px` | Lebar sidebar collapsed (AdminLayout) |
| `--topbar-height` | `56px` | Tinggi topbar sticky |
| `--content-max-width` | `1100px` | Lebar maksimum konten utama |
| `--content-padding` | `28px` | Padding area konten |
| `--page-gap` | `16px` | Gap antar section utama |
| `--card-gap` | `16px` | Gap antar kartu dalam grid |
| `--section-gap` | `24px` | Gap antar section besar |

### 4.2.2 Grid System

| Grid | Columns | Gap | Digunakan |
|---|---|---|---|
| Stats Grid | `repeat(3, 1fr)` | `1rem (16px)` | Dashboard stat cards |
| Steps Grid | `repeat(3, 1fr)` | `1rem (16px)` | Dashboard step cards |
| Form Grid | `1fr 1fr` | `16px 24px` (row × column) | ManualDataForm parameter input |
| Admin Grid | `repeat(4, 1fr)` | `1rem` | Admin stat cards |

### 4.2.3 Breakpoint Behavior

| Breakpoint | Grid Behavior |
|---|---|
| `≤ 768px` | Stats Grid → 1 kolom, Steps Grid → 1 kolom, CTA Visual hidden |
| `> 768px` | Layout penuh dengan sidebar |

---

## 4.3 Color System

### 4.3.1 Core Colors

| Token | HEX | RGB | Penggunaan |
|---|---|---|---|
| `--color-bg` | `#f3f6fb` | `243, 246, 251` | Background utama aplikasi |
| `--color-surface` | `#ffffff` | `255, 255, 255` | Surface kartu, sidebar, topbar |
| `--color-border` | `#e2e8f0` | `226, 232, 240` | Border utama kartu dan divider |
| `--color-border-light` | `#eef0f4` | `238, 240, 244` | Border subtle/secondary |

### 4.3.2 Text Colors

| Token | HEX | Penggunaan |
|---|---|---|
| `--color-text-primary` | `#1a202c` | Heading, judul, teks utama |
| `--color-text-secondary` | `#4a5568` | Body text, deskripsi |
| `--color-text-muted` | `#a0aec0` | Label subtle, placeholder, metadata |
| Text Dark | `#0f172a` | Heading emphasis, stat value |
| Text Slate | `#374151` | Body text alternatif |
| Text Slate Light | `#475569` | Text terttiary |
| Text Muted Light | `#64748b` | Subtitle, breadcrumb, sub-label |
| Text Muted Lightest | `#94a3b8` | Placeholder, unit label, timestamp |
| Text Breadcrumb | `#718096` | Breadcrumb inactive item |

### 4.3.3 Brand / Accent Colors

| Token | HEX | Penggunaan |
|---|---|---|
| `--color-accent` | `#3b82f6` | Link, icon aktif, CTA gradient start |
| `--color-accent-hover` | `#2563eb` | Hover state link dan button |
| Primary Button BG | `#1e40af` | Primary action button |
| Primary Button Hover | `#1d3a9e` | Primary button hover state |
| Active Nav | `#93c5fd` | Active sidebar item (AdminLayout) |
| Active Nav BG | `rgba(59, 130, 246, 0.2)` | Active nav item background |
| Logo Gradient Start | `#3b82f6` | Logo icon gradient start |
| Logo Gradient End | `#06b6d4` | Logo icon gradient end |

### 4.3.4 Semantic Colors

| Kategori | Background | Border | Text | Badge BG |
|---|---|---|---|---|
| **Success** | `#f0fdf4` | `#bbf7d0` | `#166534` | `#dcfce7` |
| **Danger** | `#fef2f2` | `#fecaca` | `#991b1b` | `#fee2e2` |
| **Warning** | `#fffbeb` | `#fde68a` | `#92400e` | `#fef3c7` |
| **Info** | `#eff6ff` | `#bfdbfe` | `#1e40af` | `#dbeafe` |
| **Neutral** | `#f1f5f9` | `#e2e8f0` | `#475569` | `#f1f5f9` |

### 4.3.5 Sidebar Colors (AdminLayout)

| Elemen | Warna |
|---|---|
| Background Gradient | `linear-gradient(180deg, #0f172a 0%, #1e3a5f 100%)` |
| Text Default | `rgba(255, 255, 255, 0.55)` |
| Text Hover | `#ffffff` |
| Text Active | `#93c5fd` |
| Border | `rgba(255, 255, 255, 0.08)` |
| Logout BG | `rgba(239, 68, 68, 0.12)` |
| Logout Text | `#fca5a5` |

---

## 4.4 Typography System

### 4.4.1 Font Family

```css
--font-sans: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
```

**Inter** adalah primary font. Harus di-load via Google Fonts atau self-hosted. Fallback ke system fonts.

### 4.4.2 Type Scale

| Level | Size | Weight | Line Height | Letter Spacing | Penggunaan |
|---|---|---|---|---|---|
| **H1 / Page Title** | `22px` | `700` | `1.3` | `0` | Judul halaman utama |
| **H2 / Section Title** | `20px` (`--font-size-xl`) | `700` | `1.3` | `-0.3px` | CTA title, section besar |
| **H3 / Card Title** | `16px` (`--font-size-lg`) | `700` | `1.3` | `0` | Stat value, step title |
| **H4 / Sub-Section** | `14px` (`--font-size-md`) | `600` | `1.3` | `0` | Card header title, input label |
| **Body** | `13px` (`--font-size-base`) | `400` | `1.6` | `0` | Body text, paragraf, deskripsi |
| **Small** | `12px` (`--font-size-sm`) | `400-500` | `1.5` | `0` | Subtitle, card sub-header, metadata |
| **XS / Label** | `11px` (`--font-size-xs`) | `400-700` | `1.4` | `0.5-0.6px` | Unit label, section label (uppercase), timestamp |
| **Button Text** | `13px` | `600` | `1` | `0` | Button labels |
| **Badge Text** | `12px` | `700` | `1` | `0` | Status badges |
| **Nav Item** | `13px` | `500` | `1` | `0` | Sidebar navigation items |
| **Stat Value** | `24px` (`--font-size-2xl`) / `1.5rem` | `800` | `1.2` | `0` | Dashboard stat angka besar |

### 4.4.3 Typography Rules

1. Semua heading menggunakan `font-weight: 600` minimum, dengan `color: var(--color-text-primary)`.
2. Body text menggunakan `line-height: 1.6` untuk readability optimal.
3. Label uppercase menggunakan `text-transform: uppercase` + `letter-spacing: 0.5px` + `font-weight: 700`.
4. Tidak ada font size di bawah `11px` di manapun dalam aplikasi.
5. Anti-aliasing: `-webkit-font-smoothing: antialiased` diterapkan pada `body`.

---

## 4.5 Card Design Rules

### 4.5.1 Base Card

| Property | Value |
|---|---|
| Background | `#ffffff` |
| Border | `1px solid #e2e8f0` |
| Border Radius | `8px` |
| Box Shadow | `0 1px 3px rgba(0, 0, 0, 0.06), 0 1px 2px rgba(0, 0, 0, 0.04)` |
| Padding | `20px 24px` |
| Gap (internal) | `16px - 20px` |

### 4.5.2 Card Hierarchy

| Tipe | Radius | Shadow | Padding | Hover | Penggunaan |
|---|---|---|---|---|---|
| **Upload Card** | `8px` | `--shadow-card` | `20px 24px` | None | UploadCard.vue — upload foto air |
| **Form Card** | `8px` | `--shadow-card` | `20px 24px` | None | ManualDataForm.vue — input parameter |
| **Result Card** | `8px` | `--shadow-card` | `0` (header 16px 24px, body 20px 24px) | None | PredictionResult.vue — hasil analisis |
| **Stat Card** | `16px` | `0 1px 3px rgba(0,0,0,0.04)` | `1.25rem 1.5rem` | Shadow `0 8px 20px rgba(0,0,0,0.08)` + translateY(-2px) | Dashboard stat cards |
| **Step Card** | `16px` | `0 1px 3px rgba(0,0,0,0.04)` | `1.5rem` | Shadow `0 8px 20px rgba(0,0,0,0.08)` + translateY(-2px) | Dashboard how-it-works |
| **CTA Card** | `24px` | `0 20px 40px rgba(15, 23, 42, 0.25)` | `2.5rem` | None (always prominent) | Dashboard hero CTA |
| **Action Bar Card** | `8px` | `0 1px 3px rgba(0,0,0,0.06)` | `16px 20px` | None | Analysis action buttons container |
| **Modal Card** | `20px` | `0 25px 50px rgba(0, 0, 0, 0.3)` | `2.5rem 2rem` | None | Confirmation modals |

### 4.5.3 Card Header Pattern

Setiap card yang memiliki header menggunakan pola berikut:

```
┌────────────────────────────────────────────┐
│ [Icon Box 34×34] Title Text                │
│                  Subtitle / Description     │
├────────────────────────────────────────────┤
│ Card Body Content                           │
└────────────────────────────────────────────┘
```

- **Icon Box**: `34px × 34px`, `border: 1px solid #e2e8f0`, `border-radius: 6px`, centered icon (`16px`), `color: #64748b`.
- **Title**: `14px`, `font-weight: 600`, `color: #1a202c`.
- **Subtitle**: `12px`, `color: #94a3b8`.
- **Gap between icon and text**: `12px`.

### 4.5.4 Card Transition

```css
transition: box-shadow 0.2s, transform 0.2s;
```

Hanya diterapkan pada card interaktif (stat card, step card). Card form dan card hasil tidak memiliki hover effect.

---

## 4.6 Form Design Rules

### 4.6.1 Input Style

| Property | Value |
|---|---|
| Width | `100%` |
| Padding | `8px 11px` |
| Font Size | `13px` |
| Color | `#1a202c` |
| Background | `#ffffff` |
| Border | `1px solid #cbd5e1` |
| Border Radius | `5px` |
| Box Sizing | `border-box` |
| Transition | `border-color 0.15s, box-shadow 0.15s` |
| Number Spinner | Hidden (`-moz-appearance: textfield`, `-webkit-appearance: none`) |

### 4.6.2 Input States

| State | Border | Shadow | Other |
|---|---|---|---|
| **Default** | `1px solid #cbd5e1` | None | — |
| **Focus** | `1px solid #3b82f6` | `0 0 0 3px rgba(59, 130, 246, 0.1)` | — |
| **Error** | `1px solid #fecaca` | `0 0 0 3px rgba(239, 68, 68, 0.1)` | Background `#fef2f2` |
| **Success** | `1px solid #bbf7d0` | `0 0 0 3px rgba(34, 197, 94, 0.1)` | Background `#f0fdf4` |
| **Disabled** | `1px solid #e2e8f0` | None | Background `#f8fafc`, `opacity: 0.6`, `cursor: not-allowed` |
| **Placeholder** | — | — | Color `#cbd5e1` |

### 4.6.3 Label Style

| Property | Value |
|---|---|
| Font Size | `12px` |
| Font Weight | `600` |
| Color | `#374151` |
| Display | `flex` |
| Alignment | `baseline` |
| Gap | `4px` |

- Unit label (contoh: `mg/L`): `11px`, `font-weight: 400`, `color: #94a3b8`.
- Required asterisk (`*`): `11px`, `color: #ef4444`, `margin-left: auto`.

### 4.6.4 Form Group

- Direction: `flex-direction: column`.
- Gap: `5px` antara label dan input.
- Grid: `2 kolom` untuk parameter form, `1 kolom` pada mobile.

### 4.6.5 Select Style

Mengikuti input style dengan tambahan:
- Custom dropdown arrow via SVG background-image.
- `padding-right: 32px` untuk ruang arrow.
- `-webkit-appearance: none`.

### 4.6.6 Textarea Style

Mengikuti input style dengan tambahan:
- `min-height: 100px`.
- `resize: vertical`.
- `line-height: 1.5`.

### 4.6.7 Validation Behavior

1. Validasi dilakukan client-side di `useAnalysis.js` sebelum submit.
2. Error ditampilkan sebagai **Error Banner** di level page (bukan per-field).
3. Validasi rules:
   - Semua 9 field wajib diisi (tidak boleh null/undefined/empty).
   - Semua field harus berupa angka valid.
   - `ph` harus antara `0` dan `14`.
   - Semua field harus non-negatif (`≥ 0`).
   - Gambar wajib di-upload.

---

## 4.7 Button Design Rules

### 4.7.1 Base Button

```css
display: inline-flex;
align-items: center;
justify-content: center;
gap: 7px;
font-size: 13px;
font-weight: 600;
border-radius: 6px;
border: 1px solid transparent;
cursor: pointer;
transition: background 0.15s, border-color 0.15s, opacity 0.15s, box-shadow 0.15s;
```

### 4.7.2 Primary Button

| Property | Value |
|---|---|
| Height | Auto (padding-based) |
| Padding | `10px 22px` |
| Background | `#1e40af` |
| Color | `#ffffff` |
| Border | `1px solid #1e40af` |
| Flex | `flex: 1` (expand di action bar) |
| **Hover** | Background `#1d3a9e`, `box-shadow: 0 2px 6px rgba(30, 64, 175, 0.3)` |
| **Active** | Background `#1e3a8a`, `box-shadow: none` |
| **Disabled** | `opacity: 0.55`, `cursor: not-allowed` |

### 4.7.3 Secondary Button

| Property | Value |
|---|---|
| Padding | `10px 22px` |
| Background | `#ffffff` |
| Color | `#374151` |
| Border | `1px solid #d1d5db` |
| Min Width | `110px` |
| **Hover** | Background `#f9fafb`, border `#9ca3af` |
| **Active** | Background `#f1f5f9` |
| **Disabled** | `opacity: 0.55`, `cursor: not-allowed` |

### 4.7.4 Ghost Button

| Property | Value |
|---|---|
| Padding | `10px 22px` |
| Background | `transparent` |
| Color | `#475569` |
| Border | `1px solid transparent` |
| **Hover** | Background `#f8fafc` |
| **Active** | Background `#f1f5f9` |
| **Disabled** | `opacity: 0.55`, `cursor: not-allowed` |

### 4.7.5 Danger Button

| Property | Value |
|---|---|
| Padding | `0.75rem` |
| Background | `linear-gradient(135deg, #ef4444, #dc2626)` |
| Color | `#ffffff` |
| Border | `none` |
| Border Radius | `10px` |
| **Hover** | `opacity: 0.9` |
| **Disabled** | `opacity: 0.6`, `cursor: not-allowed` |

### 4.7.6 CTA Button (Dashboard)

| Property | Value |
|---|---|
| Padding | `0.875rem 1.75rem` |
| Background | `linear-gradient(135deg, #3b82f6, #2563eb)` |
| Color | `#ffffff` |
| Border Radius | `12px` |
| Font Weight | `700` |
| Box Shadow | `0 8px 20px rgba(59, 130, 246, 0.4)` |
| **Hover** | `transform: translateY(-2px)`, `box-shadow: 0 12px 28px rgba(59, 130, 246, 0.5)` |

### 4.7.7 Icon Button

| Property | Value |
|---|---|
| Size | `34px × 34px` |
| Border Radius | `50%` (circle) |
| Border | `1px solid #e2e8f0` |
| Background | `#ffffff` |
| Color | `#718096` |
| **Hover** | Background `#f7fafc` |

### 4.7.8 Export PDF Button

| Property | Value |
|---|---|
| Padding | `7px 16px` |
| Background | `#ffffff` |
| Color | `#dc2626` |
| Border | `1.5px solid #fca5a5` |
| Border Radius | `8px` |
| **Hover** | Background `#fef2f2`, border `#ef4444` |

---

## 4.8 Table Design Rules

### 4.8.1 Header Style

| Property | Value |
|---|---|
| Background | `#f8fafc` |
| Font Size | `11px` |
| Font Weight | `700` |
| Color | `#64748b` |
| Text Transform | `uppercase` |
| Letter Spacing | `0.5px` |
| Padding | `10px 16px` |
| Border Bottom | `1px solid #e2e8f0` |

### 4.8.2 Row Style

| Property | Value |
|---|---|
| Background | `#ffffff` |
| Font Size | `13px` |
| Color | `#374151` |
| Padding | `12px 16px` |
| Border Bottom | `1px solid #f1f5f9` |
| Vertical Align | `middle` |

### 4.8.3 Hover State

```css
tr:hover {
  background: #f8fafc;
}
```

### 4.8.4 Empty State

- Centered container, `padding: 48px 24px`.
- Emoji icon (`📋`) sebagai visual, `font-size: 3rem`.
- Title: `16px`, `font-weight: 600`, `color: #1a202c`.
- Description: `13px`, `color: #64748b`.
- Optional CTA button: Primary button style.

### 4.8.5 Loading State

- Skeleton loader rows (3-5 baris).
- Background `#f1f5f9` dengan `animation: shimmer 1.5s infinite`.
- Border radius `4px`.
- Height per row: `16px`.

### 4.8.6 Pagination Style

- Container: `display: flex`, `justify-content: space-between`, `align-items: center`.
- Page info text: `13px`, `color: #64748b`.
- Page buttons: `34px × 34px`, border `1px solid #e2e8f0`, radius `6px`.
- Active page: background `#1e40af`, color `#ffffff`.
- Hover: background `#f1f5f9`.

---

## 4.9 Dashboard Rules

### 4.9.1 Dashboard Header (CTA Card)

- Full-width gradient card: `linear-gradient(135deg, #0f172a, #1e3a5f)`.
- Border radius: `24px`.
- Padding: `2.5rem`.
- Box shadow: `0 20px 40px rgba(15, 23, 42, 0.25)`.
- Layout: `flex`, space-between, icon illustration di kanan.
- Badge: pill shape (`50px` radius), `rgba(59, 130, 246, 0.25)` bg, `#93c5fd` text.
- Title: `1.5rem`, `800` weight, `#ffffff`.
- Description: `0.9rem`, `rgba(255,255,255,0.6)`.
- CTA Button: gradient blue, `12px` radius, glow shadow.

### 4.9.2 Statistics Section

- Grid: `3 columns` (desktop), `1 column` (mobile).
- Margin bottom: `1.5rem`.
- Stat card structure:
  ```
  ┌───────────────────────────┐
  │ [Icon 44×44]  Value       │
  │               Label       │
  └───────────────────────────┘
  ```
- Icon wrap: `2.75rem × 2.75rem`, `border-radius: 12px`, colored background.
- Value: `1.5rem`, `800` weight, `#0f172a`.
- Label: `0.8rem`, `500` weight, `#64748b`.

### 4.9.3 Steps Section (How It Works)

- Grid: `3 columns` (desktop), `1 column` (mobile).
- Card centered, `padding: 1.5rem`.
- Step number: `1.75rem × 1.75rem`, `#eff6ff` bg, `#2563eb` color, `8px` radius.
- Icon wrap: `3rem × 3rem`, gradient `#eff6ff → #dbeafe`, `14px` radius.
- Title: `0.95rem`, `700` weight.
- Description: `0.8rem`, `#64748b`, `line-height: 1.5`.

### 4.9.4 Charts Section

- Gunakan card standard (`border-radius: 16px`).
- Chart harus responsif, mengisi container.
- Warna chart mengikuti brand colors: `#3b82f6`, `#06b6d4`, `#10b981`, `#ef4444`.

### 4.9.5 Activity Section

- List-based layout dalam card.
- Setiap item: `padding: 12px 0`, `border-bottom: 1px solid #f1f5f9`.
- Badge kategori (layak/tidak layak) inline.

---

## 4.10 Analysis Page Rules

### 4.10.1 Page Header

| Property | Value |
|---|---|
| Title Font Size | `22px` |
| Title Font Weight | `700` |
| Title Color | `#1a202c` |
| Title Margin Bottom | `4px` |
| Description Font Size | `13px` |
| Description Color | `#94a3b8` |
| Section Margin Bottom | `4px` |

Judul berubah secara dinamis:
- State input: **"Analisis Baru"**
- State result: **"Hasil Identifikasi"**

### 4.10.2 Upload Section

**Layout**: Single card, full width.

**Card Structure**:
```
┌────────────────────────────────────────────────┐
│ [📷 Icon Box]  Upload Foto Air                 │
│                Unggah foto sampel air...        │
├────────────────────────────────────────────────┤
│  ┌──────────────────────────────────────────┐  │
│  │         Drag & Drop Zone                 │  │
│  │   [Upload Icon]                          │  │
│  │   Drag file / Klik untuk upload          │  │
│  │   PNG, JPG, WEBP — max 10MB             │  │
│  └──────────────────────────────────────────┘  │
└────────────────────────────────────────────────┘
```

**Drag Drop State**:
- Default: `border: 2px dashed #cbd5e1`, `background: #f8fafc`.
- Dragging Over: `border-color: #3b82f6`, `background: #eff6ff`.

**Upload Success State**:
```
┌────────────────────────────────────────────────┐
│  [Image Preview — max-height 220px]            │
│  ┌──────────────────────────────────────────┐  │
│  │ ✓ filename.jpg               [Ganti]    │  │
│  └──────────────────────────────────────────┘  │
└────────────────────────────────────────────────┘
```
- Preview: `object-fit: cover`, `max-height: 220px`.
- Info bar: `background: #f8fafc`, `border-top: 1px solid #e2e8f0`, `padding: 8px 12px`.
- Filename: `12px`, `color: #475569`, truncated with `text-overflow: ellipsis`.
- "Ganti" link: `12px`, `color: #3b82f6`, hover `text-decoration: underline`.

### 4.10.3 Manual Input Section

**Grid**: `2 kolom` pada desktop, `1 kolom` pada mobile (`≤ 768px`).
**Gap**: `16px` (row) × `24px` (column).

**9 Parameter Fields**:

| Field Key | Label | Unit | Placeholder |
|---|---|---|---|
| `ph` | pH | (0–14) | Contoh: 7.0 |
| `hardness` | Hardness | mg/L | Contoh: 204.89 |
| `solids` | Solids | ppm | Contoh: 20791.31 |
| `chloramines` | Chloramines | ppm | Contoh: 7.30 |
| `sulfate` | Sulfate | mg/L | Contoh: 368.51 |
| `conductivity` | Conductivity | μS/cm | Contoh: 564.31 |
| `organic_carbon` | Organic Carbon | ppm | Contoh: 10.37 |
| `trihalomethanes` | Trihalomethanes | μg/L | Contoh: 86.99 |
| `turbidity` | Turbidity | NTU | Contoh: 2.96 |

**Input Rules**:
- `type="number"`, `step="any"`, `min="0"`.
- Number spinner hidden.
- `v-model.number` untuk auto-coerce ke Number.

### 4.10.4 Error Banner

| Property | Value |
|---|---|
| Display | `flex`, `align-items: center` |
| Gap | `8px` |
| Background | `#fef2f2` |
| Border | `1px solid #fecaca` |
| Border Radius | `6px` |
| Padding | `10px 14px` |
| Font Size | `13px` |
| Color | `#991b1b` |
| Icon | SVG `14px`, `stroke: currentColor` |
| Icon Placement | Left-aligned, inline with text |

### 4.10.5 Action Bar

| Property | Value |
|---|---|
| Display | `flex` |
| Gap | `12px` |
| Padding | `16px 20px` |
| Background | `#ffffff` |
| Border | `1px solid #e2e8f0` |
| Border Radius | `8px` |
| Shadow | `0 1px 3px rgba(0,0,0,.06)` |

**Button Hierarchy**:
- Primary button (`flex: 1`) — "Proses Analisis" / "Analisis Baru"
- Secondary button (`min-width: 110px`) — "Batal" / "Kembali ke Dashboard"

**Loading State**: Primary button icon diganti spinner animation (`spin 0.8s linear infinite`), text berubah ke "Memproses Analisis..."

**Mobile Behavior**: Pada `≤ 480px`, action bar berubah ke `flex-direction: column`, button full-width.

### 4.10.6 Result Section

**Layout**: Single column, stacked sections.

**Card Grouping**:
```
┌─────────────────────────────────────────────────────┐
│ [Success/Danger Header — colored background]        │
│  ┌─────────────────────────┐ ┌───────────────────┐ │
│  │ ✓/✗ Icon  Title         │ │ Badge: Layak /    │ │
│  │                         │ │ Tidak Layak       │ │
│  └─────────────────────────┘ └───────────────────┘ │
├─────────────────────────────────────────────────────┤
│ [Confidence Section]                                │
│  Label: TINGKAT KEPERCAYAAN MODEL                   │
│  ConfidenceGauge component                          │
├─────────────────────────────────────────────────────┤
│ [Explanation Section]                               │
│  Label: PENJELASAN ANALISIS                         │
│  Body text with analysis details                    │
├─────────────────────────────────────────────────────┤
│ [Recommendation Section — colored bg]               │
│  Label: REKOMENDASI TINDAK LANJUT                   │
│  Body text with actionable recommendations          │
├─────────────────────────────────────────────────────┤
│ [Export Bar]                                        │
│  "Simpan hasil ini:" [Ekspor PDF]                   │
└─────────────────────────────────────────────────────┘
```

**Prediction Visualization**:
- Success header: `background: #f0fdf4`, border `#bbf7d0`.
- Danger header: `background: #fef2f2`, border `#fecaca`.
- Badge: `12px`, `700` weight, pill shape (`20px` radius), `4px 12px` padding.
  - Success: `bg: #dcfce7`, `color: #15803d`, `border: 1px solid #bbf7d0`.
  - Danger: `bg: #fee2e2`, `color: #b91c1c`, `border: 1px solid #fecaca`.

**Section Label**: `12px`, `700` weight, `#64748b`, `uppercase`, `letter-spacing: 0.5px`.

**Summary Block**: Body text `13px`, `#374151`, `line-height: 1.65`.

**Recommendation Block**:
- Container: `padding: 14px 16px`, `border-radius: 6px`, `border: 1px solid`.
- Success: `bg: #f0fdf4`, `border: #bbf7d0`, label `#15803d`.
- Danger: `bg: #fef2f2`, `border: #fecaca`, label `#b91c1c`.

---

## 4.11 Responsive Rules

### 4.11.1 Breakpoints

| Category | Width | Device |
|---|---|---|
| **Mobile XS** | `320px` | iPhone SE, small Android |
| **Mobile S** | `375px` | iPhone 12/13 mini |
| **Mobile M** | `390px` | iPhone 14/15 |
| **Mobile L** | `414px` | iPhone 14 Plus, large Android |
| **Tablet** | `768px` | iPad Mini, small tablets |
| **Tablet L** | `820px` | iPad Air |
| **Tablet XL** | `1024px` | iPad Pro 11" |
| **Desktop** | `1280px` | Laptop standar |
| **Desktop L** | `1440px` | Desktop monitor |
| **Desktop XL** | `1920px` | Full HD monitor |

### 4.11.2 Behavior per Breakpoint

**Mobile (320px – 767px)**:
- Sidebar: Hidden, diganti hamburger menu overlay.
- Main content: `margin-left: 0`, `padding: 1rem`.
- Stats grid: `1 kolom`.
- Steps grid: `1 kolom`.
- Form grid: `1 kolom`.
- CTA visual (water orb): Hidden (`display: none`).
- Topbar: `padding: 1rem`, user email hidden.
- Action bar: `flex-direction: column`, button full-width.

**Tablet (768px – 1023px)**:
- Sidebar: Collapsed (`72px`, icon-only) atau full (`220px`).
- Stats grid: `2 kolom`.
- Steps grid: `2 kolom`.
- Form grid: `2 kolom`.
- Topbar: User email visible.

**Desktop (1024px – 1919px)**:
- Sidebar: Full width (`220px` / `240px`).
- Content max-width: `1100px`.
- Stats grid: `3 kolom`.
- Steps grid: `3 kolom`.
- Form grid: `2 kolom`.

**Desktop XL (1920px+)**:
- Content tetap di `max-width: 1100px` untuk readability.
- Centering horizontal dengan side whitespace.

### 4.11.3 CSS Breakpoint Implementation

```css
/* Mobile → Tablet transition */
@media (max-width: 768px) {
  .stats-grid { grid-template-columns: 1fr; }
  .steps-grid { grid-template-columns: 1fr; }
  .cta-card { flex-direction: column; }
  .cta-visual { display: none; }
  .main-content { padding: 1rem; }
  .topbar { padding: 1rem; }
  .user-email { display: none; }
}
```

---

## 4.12 Animation Rules

### 4.12.1 Hover Animations

| Element | Duration | Easing | Properties |
|---|---|---|---|
| Button | `0.15s` | `ease` | `background`, `border-color`, `opacity`, `box-shadow` |
| Card (interactive) | `0.2s` | `ease` | `box-shadow`, `transform` |
| Sidebar nav item | `0.12s` | `ease` | `background`, `color` |
| Sidebar nav item | `0.2s` | `ease` | `background`, `color` |
| Link | `0.15s` | `ease` | `color`, `text-decoration` |
| CTA Button | `0.2s` | `ease` | `transform`, `box-shadow` |

### 4.12.2 Loading Animation

**Spinner**:
```css
@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
/* Usage: animation: spin 0.8s linear infinite; (button)
         animation: spin 0.7s linear infinite; (small spinner) */
```

**Button Spinner**: Inline SVG icon, `15px × 15px`, `animation: spin 0.8s linear infinite`.

**Small Spinner**: `0.875rem × 0.875rem`, border `2px`, `animation: spin 0.7s linear infinite`.

### 4.12.3 Skeleton Loader

```css
@keyframes shimmer {
  0% { background-position: -200px 0; }
  100% { background-position: calc(200px + 100%) 0; }
}

.skeleton {
  background: linear-gradient(90deg, #f1f5f9 25%, #e2e8f0 50%, #f1f5f9 75%);
  background-size: 200px 100%;
  animation: shimmer 1.5s ease-in-out infinite;
  border-radius: 4px;
}
```

### 4.12.4 Page Transition

Tidak menggunakan route-level transition bawaan. Konten langsung diganti tanpa animasi transisi antar halaman untuk menjaga kecepatan.

### 4.12.5 Card Transition (Stat Cards)

```css
.stat-card:hover {
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08);
  transform: translateY(-2px);
}
/* transition: box-shadow 0.2s, transform 0.2s; */
```

### 4.12.6 Modal Transition

```css
/* Enter */
.modal-fade-enter-active,
.modal-fade-leave-active { transition: opacity 0.25s; }

.modal-fade-enter-from,
.modal-fade-leave-to { opacity: 0; }

/* Scale */
.modal-fade-enter-from .modal-card { transform: scale(0.9); }
.modal-fade-leave-to .modal-card { transform: scale(0.9); }
.modal-fade-enter-active .modal-card,
.modal-fade-leave-active .modal-card { transition: transform 0.25s; }
```

### 4.12.7 Water Orb Animation (Dashboard)

```css
@keyframes pulse-orb {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.08); }
}
/* Duration: 3s, easing: ease-in-out, infinite */

@keyframes expand-ring {
  0% { opacity: 0.5; transform: scale(0.9); }
  100% { opacity: 0; transform: scale(1.15); }
}
/* Duration: 3s, easing: ease-out, infinite, staggered delays: 0s, 0.5s, 1s */
```

---

## 4.13 Accessibility Rules

### 4.13.1 Contrast Ratio

- Text primary (`#1a202c`) on background (`#f3f6fb`): **15.1:1** — exceeds WCAG AAA.
- Text secondary (`#4a5568`) on white (`#ffffff`): **7.4:1** — exceeds WCAG AA.
- Text muted (`#94a3b8`) on white: **3.0:1** — meets AA for large text only. Used only for supplementary info.
- Success text (`#166534`) on success bg (`#f0fdf4`): **7.0:1** — meets WCAG AA.
- Danger text (`#991b1b`) on danger bg (`#fef2f2`): **7.8:1** — meets WCAG AA.
- White (`#ffffff`) on primary button (`#1e40af`): **8.1:1** — exceeds WCAG AAA.

### 4.13.2 Keyboard Navigation

- Semua interactive element (button, link, input) harus focusable via Tab.
- Sidebar nav items menggunakan `<router-link>` (native `<a>`).
- Buttons menggunakan native `<button>` element.
- Form inputs menggunakan native `<input>` dan `<label>` dengan `for` attribute.

### 4.13.3 Focus Ring

```css
:focus-visible {
  outline: 2px solid var(--color-accent); /* #3b82f6 */
  outline-offset: 2px;
}
```

- Diterapkan secara global via `main.css`.
- Menggunakan `:focus-visible` (bukan `:focus`) agar ring hanya muncul saat navigasi keyboard.

### 4.13.4 Screen Reader Support

- Error banner menggunakan `role="alert"` untuk auto-announce.
- Sidebar logout button menggunakan semantic `<button>`.
- Notification bell menggunakan `aria-label="Notifikasi"`.
- Required field asterisk menggunakan `aria-hidden="true"`.
- Form label menggunakan `<label>` dengan `for` attribute yang cocok.

### 4.13.5 Semantic HTML

- `<header>` untuk topbar.
- `<nav>` untuk sidebar navigation.
- `<main>` untuk content area.
- `<aside>` untuk sidebar.
- `<section>` untuk grouping konten.
- `<article>` untuk konten edukasi/artikel.

---

# BAGIAN 5 — COMPONENT STANDARD

## 5.1 Naming Convention

### 5.1.1 File Naming

| Tipe | Format | Contoh |
|---|---|---|
| Page View | `PascalCase + View/Page.vue` | `AnalysisView.vue`, `DashboardPage.vue` |
| Layout | `PascalCase + Layout.vue` | `DashboardLayout.vue` |
| Component | `PascalCase.vue` | `UploadCard.vue`, `ManualDataForm.vue` |
| Composable | `camelCase.js` | `useAnalysis.js`, `useFileUpload.js` |
| Store | `camelCase + Store.js` | `analysisStore.js`, `authStore.js` |
| API Module | `camelCase.js` | `analysis.js`, `axios.js` |
| CSS Page | `kebab-case.css` | `analysis.css`, `dashboard.css` |

### 5.1.2 CSS Class Naming

Menggunakan **BEM-inspired** naming:

```
.block                    → .upload-card
.block__element           → .card-header__title
.block__element--modifier → .btn--primary, .result-card--success
```

### 5.1.3 Component Instance Naming

- Template: `PascalCase` — `<UploadCard />`, `<ManualDataForm />`.
- Import: `PascalCase` — `import UploadCard from './UploadCard.vue'`.

## 5.2 Component Structure

Setiap Single File Component (SFC) mengikuti urutan:

```vue
<template>
  <!-- 1. Template — HTML structure -->
</template>

<script setup>
// 2. Script — Composition API with <script setup>
// Import order:
//   a. Vue core (ref, computed, reactive, etc.)
//   b. Vue Router
//   c. Components
//   d. Composables
//   e. Stores
//   f. API modules

// Definition order:
//   a. Props & Emits
//   b. Store instances
//   c. Refs & Reactive state
//   d. Computed properties
//   e. Functions / Methods
//   f. Lifecycle hooks (onMounted, etc.)
</script>

<style scoped>
/* 3. Scoped styles — Component-specific CSS */
</style>
```

## 5.3 Reusability Rules

1. **Komponen generik** (ConfidenceGauge, ImageUploader) tidak boleh mengakses store secara langsung. Gunakan props dan emits.
2. **Komponen domain** (UploadCard, ManualDataForm, PredictionResult) boleh mengakses store secara langsung jika merupakan single-purpose component.
3. **Composable** digunakan untuk logic yang di-share antar komponen (validasi, API call, file handling).
4. **Style** harus `scoped` untuk mencegah CSS leak. Global styles hanya di `main.css`.

## 5.4 Props Rules

```javascript
// Contoh implementasi props
const props = defineProps({
  result: {
    type: Object,
    required: true,
  },
  value: {
    type: Number,
    default: 0,
    validator: (v) => v >= 0 && v <= 1,
  },
  category: {
    type: String,
    default: 'layak',
    validator: (v) => ['layak', 'tidak_layak'].includes(v),
  },
})
```

**Rules**:
1. Selalu gunakan `defineProps()` dengan type declaration.
2. Gunakan `required: true` untuk props wajib.
3. Sediakan `default` untuk props opsional.
4. Gunakan `validator` untuk constrained values.

## 5.5 Event Rules

```javascript
// Contoh emits
const emit = defineEmits(['file-selected', 'update:modelValue'])

// Usage
emit('file-selected', file)
```

**Rules**:
1. Selalu deklarasikan emits dengan `defineEmits()`.
2. Event naming: `kebab-case` — `file-selected`, bukan `fileSelected`.
3. Untuk v-model: gunakan `update:modelValue` convention.

## 5.6 State Rules

1. **Local state** (hanya dipakai satu komponen): gunakan `ref()` atau `reactive()`.
2. **Shared state** (dipakai lintas komponen): gunakan Pinia store.
3. **Derived state**: gunakan `computed()`.
4. **Side effects**: gunakan `watch()` atau `watchEffect()`.
5. Jangan mutasi props secara langsung. Gunakan local copy (`reactive({ ...store.manualData })`) dan sync ke store.

## 5.7 Contoh Implementasi Komponen

```vue
<!-- components/analysis/ConfidenceGauge.vue -->
<template>
  <div class="gauge">
    <div class="gauge__fill" :style="fillStyle"></div>
    <span class="gauge__value">{{ displayValue }}</span>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  value: {
    type: Number,
    required: true,
    validator: (v) => v >= 0 && v <= 1,
  },
  category: {
    type: String,
    default: 'layak',
  },
})

const displayValue = computed(() =>
  props.value != null ? `${(props.value * 100).toFixed(1)}%` : 'N/A'
)

const fillStyle = computed(() => ({
  width: `${(props.value || 0) * 100}%`,
  background: props.category === 'layak' ? '#16a34a' : '#dc2626',
}))
</script>

<style scoped>
.gauge {
  position: relative;
  height: 8px;
  background: #e2e8f0;
  border-radius: 4px;
  overflow: hidden;
}
.gauge__fill {
  height: 100%;
  border-radius: 4px;
  transition: width 0.6s ease;
}
.gauge__value {
  position: absolute;
  right: 0;
  top: -20px;
  font-size: 13px;
  font-weight: 700;
}
</style>
```

---

# BAGIAN 6 — API DOCUMENTATION

**Base URL:** `http://localhost:8000`
**Swagger UI:** `http://localhost:8000/docs`
**Auth:** Supabase JWT — `Authorization: Bearer <token>`
**Content-Type:** `application/json` (kecuali upload: `multipart/form-data`)

---

## 6.1 Auth Endpoints

### POST `/api/auth/register`

**Deskripsi:** Registrasi pengguna baru.

**Request Body (JSON):**
```json
{
  "email": "user@example.com",
  "password": "password123",
  "full_name": "Nama Lengkap",
  "username": "username123"
}
```

**Validation Rules:**
- `email`: required, valid email format.
- `password`: required, min 6 characters.
- `full_name`: required, min 1 character, max 100 characters.
- `username`: required, min 3 characters, max 50 characters, unique.

**Response `200`:**
```json
{ "message": "Registration successful" }
```

**Error Responses:**
- `400`: Email sudah terdaftar / username sudah dipakai.
- `400`: Validasi input gagal.

---

### POST `/api/auth/login`

**Deskripsi:** Login dan dapatkan JWT token.

**Request Body (JSON):**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Validation Rules:**
- `email`: required.
- `password`: required.

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

**Error Responses:**
- `401`: Email/password salah.
- `403`: Akun dinonaktifkan oleh admin.
- `403`: Akun telah dihapus.

---

### POST `/api/auth/logout`

**Deskripsi:** Logout (invalidate session server-side).
**Headers:** `Authorization: Bearer <token>`

**Response `200`:**
```json
{ "message": "Logged out successfully" }
```

---

### POST `/api/auth/refresh`

**Deskripsi:** Refresh access token.

**Request Body (JSON):**
```json
{ "refresh_token": "eyJhbG..." }
```

**Response `200`:** Sama dengan login response.

**Error Responses:**
- `401`: Refresh token expired/invalid.
- `403`: Akun dinonaktifkan.

---

## 6.2 Users Endpoints

### GET `/api/users/profile`

**Deskripsi:** Ambil profil user yang login.
**Headers:** `Authorization: Bearer <token>`

**Response `200`:**
```json
{
  "id": "uuid",
  "full_name": "Nama Lengkap",
  "username": "username",
  "avatar_url": "https://...",
  "is_admin": false,
  "is_active": true,
  "created_at": "2026-01-01T00:00:00Z",
  "updated_at": "2026-01-01T00:00:00Z"
}
```

---

### PUT `/api/users/profile`

**Deskripsi:** Update profil (nama, username).

**Request Body (JSON):**
```json
{
  "full_name": "Nama Baru",
  "username": "username_baru"
}
```

**Validation Rules:**
- `full_name`: optional, string.
- `username`: optional, string, unique.
- `avatar_url`: optional, string URL.

**Response `200`:** ProfileResponse object.

---

### POST `/api/users/profile/avatar`

**Deskripsi:** Upload foto profil ke Supabase Storage.
**Request:** `multipart/form-data`, field: `file`.

**Validation Rules:**
- Allowed extensions: `png`, `jpg`, `jpeg`, `webp`, `bmp`.
- Max size: `10 MB`.

**Response `200`:** ProfileResponse object (dengan `avatar_url` ter-update).

---

### POST `/api/users/change-password`

**Deskripsi:** Ganti password.

**Request Body (JSON):**
```json
{ "new_password": "passwordBaru123" }
```

**Response `200`:**
```json
{ "message": "Password changed" }
```

---

### DELETE `/api/users/me`

**Deskripsi:** Hapus akun user secara permanen.

**Response `200`:**
```json
{ "message": "Account deleted" }
```

---

## 6.3 Analysis Endpoints

### POST `/api/analysis`

**Deskripsi:** Submit analisis air (upload gambar + data kimia → run AI pipeline).
**Request:** `multipart/form-data`

| Field | Type | Keterangan |
|---|---|---|
| `image` | File | Foto air (PNG/JPG/WEBP/BMP) |
| `manual_data` | String | JSON String dari 9 parameter kimia |

**Format `manual_data`:**
```json
{
  "ph": 7.2,
  "Hardness": 200.0,
  "Solids": 20000.0,
  "Chloramines": 7.0,
  "Sulfate": 350.0,
  "Conductivity": 450.0,
  "Organic_carbon": 10.0,
  "Trihalomethanes": 70.0,
  "Turbidity": 3.5
}
```

**Validation Rules:**
- `image`: required, allowed extensions (png/jpg/jpeg/webp/bmp), max 10MB.
- `manual_data`: required, valid JSON string.
- `ph`: float, 0 ≤ ph ≤ 14.
- Semua parameter lain: float, required.

**Response `200`:**
```json
{
  "analysis_id": "uuid-string",
  "status": "completed",
  "message": "Analisis berhasil diselesaikan"
}
```

**Error Responses:**
- `400`: JSON manual_data invalid.
- `400`: File type not allowed.
- `401`: Token invalid.
- `500`: Analysis pipeline failed.

---

### GET `/api/analysis/{analysis_id}`

**Deskripsi:** Ambil detail lengkap hasil analisis.

**Response `200`:**
```json
{
  "id": "uuid",
  "user_id": "uuid",
  "status": "completed",
  "created_at": "2026-01-01T00:00:00Z",
  "image_input": {
    "image_path": "https://...",
    "original_filename": "water_sample.jpg"
  },
  "manual_input": {
    "ph": 7.2,
    "Hardness": 200.0
  },
  "result": {
    "id": "uuid",
    "category": "layak",
    "confidence": 0.8234,
    "dl_category": "layak",
    "dl_confidence": 0.75,
    "dl_detections": [
      { "label": "floater", "confidence": 0.25, "bbox": [10, 20, 100, 200] }
    ],
    "ml_category": "layak",
    "ml_confidence": 0.87,
    "ml_feature_importance": {
      "ph": 0.25,
      "Turbidity": 0.18
    },
    "explanation": "Analisis citra: ...",
    "recommendation": "Air ini layak digunakan..."
  }
}
```

---

### GET `/api/analysis/history`

**Deskripsi:** Daftar riwayat analisis user (paginated + filterable).

**Query Params:**

| Param | Type | Default | Deskripsi |
|---|---|---|---|
| `page` | int | 1 | Halaman |
| `per_page` | int | 10 | Item per halaman |
| `category` | string | null | Filter: `layak` / `tidak_layak` |
| `date` | string | null | Filter tanggal: `YYYY-MM-DD` |
| `search` | string | null | Cari filename |

**Response `200`:**
```json
{
  "items": [
    {
      "id": "uuid",
      "status": "completed",
      "created_at": "2026-01-01T00:00:00Z",
      "category": "layak",
      "confidence": 0.82,
      "image_path": "https://...",
      "ph": 7.2,
      "Turbidity": 3.5
    }
  ],
  "total": 25,
  "page": 1,
  "per_page": 10,
  "total_pages": 3
}
```

---

### GET `/api/analysis/export/csv`

**Deskripsi:** Export riwayat analisis user sebagai CSV.
**Query Params:** Sama dengan `/history` (tanpa pagination).
**Response:** `text/csv` file download.

---

### GET `/api/analysis/export/{analysis_id}/detail`

**Deskripsi:** Ambil data lengkap untuk ekspor PDF.
**Response `200`:** JSON object dengan data user, input, dan result.

---

## 6.4 Notifications Endpoints

### GET `/api/notifications`

**Deskripsi:** List semua notifikasi user (newest first).

**Response `200`:**
```json
{
  "items": [
    {
      "id": "uuid",
      "analysis_id": "uuid",
      "title": "Hasil Analisis Selesai",
      "message": "Analisis air Anda selesai. Hasil: ✅ Layak (confidence: 82%)",
      "type": "analysis_complete",
      "is_read": false,
      "created_at": "2026-01-01T00:00:00Z"
    }
  ],
  "total": 5
}
```

---

### PUT `/api/notifications/{notification_id}/read`

**Deskripsi:** Tandai notifikasi sebagai sudah dibaca.
**Response `200`:** NotificationResponse object.

---

### GET `/api/notifications/unread-count`

**Deskripsi:** Hitung jumlah notifikasi belum dibaca.
**Response `200`:**
```json
{ "count": 3 }
```

---

## 6.5 Admin Endpoints

### GET `/api/admin/dashboard/stats`

**Deskripsi:** Statistik dashboard admin.
**Auth:** Admin only.
**Response `200`:** Combined dashboard statistics object.

---

### GET `/api/admin/users`

**Deskripsi:** List semua user.
**Query Params:** `skip` (default 0), `limit` (default 100, max 500).
**Response `200`:** Array of ProfileResponse.

---

### PUT `/api/admin/users/{user_id}/status`

**Deskripsi:** Aktifkan/nonaktifkan user.
**Query Params:** `is_active` (boolean, required).
**Response `200`:** `{ "message": "User activated/deactivated", "user_id": "uuid" }`

---

### DELETE `/api/admin/users/{user_id}`

**Deskripsi:** Hapus user (cascade ke semua data terkait).
**Response `200`:** `{ "message": "User deleted", "user_id": "uuid" }`

---

### GET `/api/admin/analysis/stats`

**Deskripsi:** Statistik analisis detail (tren bulanan, rata-rata confidence).
**Response `200`:** Analysis statistics object.

---

### GET `/api/admin/reports`

**Deskripsi:** Data laporan filterable.
**Query Params:** `date_from` (YYYY-MM-DD), `date_to` (YYYY-MM-DD), `category` (layak/tidak_layak).
**Response `200`:** `{ "items": [...], "total": 10 }`

---

### GET `/api/admin/reports/export`

**Deskripsi:** Ekspor laporan sebagai CSV.
**Response:** `text/csv` file download.

---

## 6.6 Chatbot Endpoints (Admin Only)

### POST `/api/admin/chatbot/sessions`

**Deskripsi:** Buat sesi chat baru.
**Request Body:** `{ "title": "Chat Baru" }` (optional).
**Response `201`:** ChatSessionResponse.

### GET `/api/admin/chatbot/sessions`

**Deskripsi:** List semua sesi chat milik admin (newest first).
**Response `200`:** Array of ChatSessionResponse.

### GET `/api/admin/chatbot/sessions/{session_id}`

**Deskripsi:** Detail sesi chat beserta semua pesan.
**Response `200`:** ChatSessionWithMessages (includes messages array).

### DELETE `/api/admin/chatbot/sessions/{session_id}`

**Deskripsi:** Hapus sesi chat dan semua pesannya.
**Response `200`:** `{ "message": "Session deleted", "session_id": "uuid" }`

### POST `/api/admin/chatbot/sessions/{session_id}/messages`

**Deskripsi:** Kirim pesan ke AI Gemini dan dapatkan respons.
**Request Body:** `{ "message": "Isi pesan Anda" }`
**Validation:** `message` min 1 char, max 4000 chars.

**Response `200`:**
```json
{
  "user_message": {
    "id": "uuid",
    "session_id": "uuid",
    "role": "user",
    "content": "Isi pesan",
    "created_at": "2026-01-01T00:00:00Z"
  },
  "ai_message": {
    "id": "uuid",
    "session_id": "uuid",
    "role": "assistant",
    "content": "Respons AI...",
    "created_at": "2026-01-01T00:00:00Z"
  }
}
```

**Error Responses:**
- `404`: Session not found.
- `502`: AI service error (Gemini unavailable).

---

# BAGIAN 7 — DATABASE DOCUMENTATION

## 7.1 Database Overview

- **Engine:** PostgreSQL 15+ (hosted via Supabase).
- **ORM:** SQLAlchemy (declarative base).
- **UUID Generation:** `uuid_generate_v4()` (database-side) / `gen_random_uuid()`.
- **Timezone:** Semua `timestamptz` (timezone-aware).
- **RLS:** Row Level Security aktif di semua tabel.

## 7.2 Entity Relationship Diagram (ERD)

```
┌──────────────────┐       ┌──────────────────┐
│   auth.users     │       │    profiles       │
│ (Supabase Auth)  │       │ ────────────────  │
│                  │  1:1  │ id (PK, FK→auth) │
│ id (PK)         ├───────►│ full_name         │
│ email           │       │ username (UNIQUE) │
│ ...             │       │ avatar_url        │
└──────────────────┘       │ is_admin          │
                           │ is_active         │
                           │ created_at        │
                           │ updated_at        │
                           └────────┬──────────┘
                                    │ 1:N
                      ┌─────────────┼─────────────────┐
                      │             │                  │
                      ▼             ▼                  ▼
            ┌──────────────┐ ┌──────────────┐  ┌──────────────┐
            │  analyses    │ │notifications │  │chat_sessions │
            │ ──────────── │ │ ──────────── │  │ ──────────── │
            │ id (PK)      │ │ id (PK)      │  │ id (PK)      │
            │ user_id (FK) │ │ user_id (FK) │  │ user_id (FK) │
            │ status (ENUM)│ │ analysis_id  │  │ title        │
            │ created_at   │ │ title        │  │ is_active    │
            └──────┬───────┘ │ message      │  │ created_at   │
                   │         │ type         │  │ updated_at   │
         ┌─────────┼────┐    │ is_read      │  └──────┬───────┘
         │         │    │    │ created_at   │         │ 1:N
         ▼         ▼    ▼    └──────────────┘         ▼
  ┌────────────┐ ┌────────────┐ ┌────────────────┐ ┌──────────────┐
  │image_inputs│ │manual_input│ │analysis_results│ │chat_messages │
  │ ────────── │ │ ────────── │ │ ────────────── │ │ ──────────── │
  │ id (PK)    │ │ id (PK)    │ │ id (PK)        │ │ id (PK)      │
  │ analysis_id│ │ analysis_id│ │ analysis_id    │ │ session_id   │
  │ image_path │ │ data_json  │ │ category       │ │ role         │
  │ orig_fname │ │ created_at │ │ confidence     │ │ content      │
  │ created_at │ └────────────┘ │ dl_category    │ │ created_at   │
  └────────────┘                │ dl_confidence  │ └──────────────┘
                                │ dl_detections  │
                                │ ml_category    │
                                │ ml_confidence  │
                                │ ml_feat_imp    │
                                │ explanation    │
                                │ recommendation │
                                │ raw_output     │
                                │ created_at     │
                                └────────────────┘
```

## 7.3 Table Documentation

### 7.3.1 `profiles`

| Column | Type | Constraints | Default | Description |
|---|---|---|---|---|
| `id` | `uuid` | PK, FK → auth.users ON DELETE CASCADE | — | Supabase Auth user ID |
| `full_name` | `text` | NOT NULL | — | Nama lengkap user |
| `username` | `text` | UNIQUE, NOT NULL | — | Username unik |
| `avatar_url` | `text` | NULLABLE | NULL | URL foto profil (Supabase Storage) |
| `is_admin` | `boolean` | — | `false` | Flag administrator |
| `is_active` | `boolean` | — | `true` | Flag akun aktif |
| `created_at` | `timestamptz` | — | `now()` | Waktu dibuat |
| `updated_at` | `timestamptz` | — | `now()` | Waktu terakhir diupdate (auto via trigger) |

### 7.3.2 `analyses`

| Column | Type | Constraints | Default | Description |
|---|---|---|---|---|
| `id` | `uuid` | PK | `uuid_generate_v4()` | Analysis unique ID |
| `user_id` | `uuid` | FK → profiles(id) ON DELETE CASCADE | — | Pemilik analisis |
| `status` | `analysis_status` (ENUM) | — | `'pending'` | Status: pending / processing / completed / failed |
| `created_at` | `timestamptz` | — | `now()` | Waktu dibuat |

### 7.3.3 `image_inputs`

| Column | Type | Constraints | Default | Description |
|---|---|---|---|---|
| `id` | `uuid` | PK | `uuid_generate_v4()` | Image input ID |
| `analysis_id` | `uuid` | FK → analyses(id) ON DELETE CASCADE | — | Ref ke analisis |
| `image_path` | `text` | NOT NULL | — | Public URL gambar di Supabase Storage |
| `original_filename` | `text` | NULLABLE | NULL | Nama file asli upload |
| `created_at` | `timestamptz` | — | `now()` | Waktu upload |

### 7.3.4 `manual_inputs`

| Column | Type | Constraints | Default | Description |
|---|---|---|---|---|
| `id` | `uuid` | PK | `uuid_generate_v4()` | Manual input ID |
| `analysis_id` | `uuid` | FK → analyses(id) ON DELETE CASCADE | — | Ref ke analisis |
| `data_json` | `jsonb` | NULLABLE | NULL | JSON 9 parameter kimia |
| `created_at` | `timestamptz` | — | `now()` | Waktu input |

### 7.3.5 `analysis_results`

| Column | Type | Constraints | Default | Description |
|---|---|---|---|---|
| `id` | `uuid` | PK | `uuid_generate_v4()` | Result ID |
| `analysis_id` | `uuid` | FK → analyses(id) ON DELETE CASCADE | — | Ref ke analisis |
| `category` | `text` | — | — | Hasil final: `layak` / `tidak_layak` |
| `confidence` | `float` | — | — | Confidence score final (0.0 – 1.0) |
| `dl_category` | `text` | — | — | Hasil Deep Learning |
| `dl_confidence` | `float` | — | — | Confidence DL |
| `dl_detections` | `jsonb` | — | — | Array deteksi YOLO `[{label, confidence, bbox}]` |
| `ml_category` | `text` | — | — | Hasil Machine Learning |
| `ml_confidence` | `float` | — | — | Confidence ML |
| `ml_feature_importance` | `jsonb` | — | — | Feature importance `{feature: weight}` |
| `explanation` | `text` | — | — | Penjelasan analisis |
| `recommendation` | `text` | — | — | Rekomendasi tindak lanjut |
| `raw_output` | `jsonb` | — | — | Raw output lengkap (untuk debugging) |
| `created_at` | `timestamptz` | — | `now()` | Waktu result |

### 7.3.6 `notifications`

| Column | Type | Constraints | Default | Description |
|---|---|---|---|---|
| `id` | `uuid` | PK | `uuid_generate_v4()` | Notification ID |
| `user_id` | `uuid` | FK → profiles(id) ON DELETE CASCADE | — | Penerima |
| `analysis_id` | `uuid` | FK → analyses(id) ON DELETE SET NULL, NULLABLE | NULL | Ref analisis terkait |
| `title` | `text` | NOT NULL | — | Judul notifikasi |
| `message` | `text` | NOT NULL | — | Isi notifikasi |
| `type` | `text` | — | `'info'` | Tipe: `analysis_complete` / `system` / `info` |
| `is_read` | `boolean` | — | `false` | Status sudah dibaca |
| `created_at` | `timestamptz` | — | `now()` | Waktu dibuat |

### 7.3.7 `chat_sessions`

| Column | Type | Constraints | Default | Description |
|---|---|---|---|---|
| `id` | `uuid` | PK | `uuid_generate_v4()` | Session ID |
| `user_id` | `uuid` | FK → profiles(id) ON DELETE CASCADE, NOT NULL | — | Admin pemilik sesi |
| `title` | `text` | — | `'Chat Baru'` | Judul sesi (max 200) |
| `is_active` | `boolean` | — | `true` | Status aktif |
| `created_at` | `timestamptz` | — | `now()` | Waktu dibuat |
| `updated_at` | `timestamptz` | — | `now()` | Waktu update (auto trigger) |

### 7.3.8 `chat_messages`

| Column | Type | Constraints | Default | Description |
|---|---|---|---|---|
| `id` | `uuid` | PK | `uuid_generate_v4()` | Message ID |
| `session_id` | `uuid` | FK → chat_sessions(id) ON DELETE CASCADE, NOT NULL | — | Ref ke sesi |
| `role` | `text` | NOT NULL, CHECK IN ('user', 'assistant') | — | Pengirim: user / assistant |
| `content` | `text` | NOT NULL | — | Isi pesan |
| `created_at` | `timestamptz` | — | `now()` | Waktu dikirim |

## 7.4 Indexing

| Table | Index | Columns | Type |
|---|---|---|---|
| `chat_sessions` | `idx_chat_sessions_user_id` | `user_id` | B-tree |
| `chat_messages` | `idx_chat_messages_session_id` | `session_id` | B-tree |
| `chat_messages` | `idx_chat_messages_created_at` | `created_at` | B-tree |
| `profiles` | (automatic PK) | `id` | B-tree |
| `profiles` | (automatic UNIQUE) | `username` | B-tree |
| `analyses` | (automatic PK) | `id` | B-tree |

## 7.5 Row Level Security (RLS)

| Table | Policy | Condition |
|---|---|---|
| `profiles` | Users view own profile | `auth.uid() = id` (SELECT) |
| `profiles` | Users update own profile | `auth.uid() = id` (UPDATE) |
| `analyses` | Users view own analyses | `auth.uid() = user_id` (SELECT) |
| `analyses` | Users create own analyses | `auth.uid() = user_id` (INSERT) |
| `chat_sessions` | Users view own sessions | `auth.uid() = user_id` (SELECT) |
| `chat_sessions` | Users create own sessions | `auth.uid() = user_id` (INSERT) |
| `chat_sessions` | Users delete own sessions | `auth.uid() = user_id` (DELETE) |
| `chat_messages` | Users view own messages | `session_id IN (SELECT id FROM chat_sessions WHERE user_id = auth.uid())` |
| `chat_messages` | Users create in own sessions | Same subquery check (INSERT) |

## 7.6 Triggers

| Trigger | Table | Event | Function | Description |
|---|---|---|---|---|
| `on_profiles_updated` | `profiles` | BEFORE UPDATE | `handle_updated_at()` | Auto-set `updated_at = now()` |
| `on_auth_user_created` | `auth.users` | AFTER INSERT | `handle_new_user()` | Auto-create profile row dari Supabase Auth metadata |
| `on_chat_sessions_updated` | `chat_sessions` | BEFORE UPDATE | `handle_updated_at()` | Auto-set `updated_at = now()` |

## 7.7 Naming Convention (Database)

| Entity | Convention | Contoh |
|---|---|---|
| Table | `snake_case`, plural | `analyses`, `image_inputs` |
| Column | `snake_case` | `user_id`, `created_at`, `is_admin` |
| Foreign Key | `table_singular_id` | `user_id`, `analysis_id`, `session_id` |
| Index | `idx_table_column` | `idx_chat_sessions_user_id` |
| Enum | `snake_case` | `analysis_status` |
| Trigger | `on_table_event` | `on_profiles_updated` |
| Function | `handle_action()` | `handle_updated_at()`, `handle_new_user()` |

---

# BAGIAN 8 — BACKEND DEVELOPMENT STANDARD

## 8.1 Controller (Router) Rules

1. Router file di `app/api/`, satu file per domain: `auth.py`, `users.py`, `analysis.py`.
2. Setiap router menggunakan `APIRouter()` dan di-mount di `main.py` dengan prefix.
3. Route handler harus `async def` dan thin — hanya menerima input, memanggil service, dan mengembalikan response.
4. Validasi input dilakukan via Pydantic schema di parameter atau di service layer.
5. Dependency Injection menggunakan `Depends()` untuk: `get_db`, `get_supabase`, `get_current_user`, `get_admin_user`.
6. Setiap endpoint harus memiliki docstring yang menyebutkan kode fitur (KF-xx).
7. Response model harus di-deklarasikan via `response_model=` parameter.

```python
# Pattern
@router.post("", response_model=AnalysisSubmitResponse)
async def submit_analysis(
    image: UploadFile = File(...),
    manual_data: str = Form(...),
    current_user: Profile = Depends(get_current_user),
    db: Session = Depends(get_db),
    supabase: Client = Depends(get_supabase),
):
    """KF-03 + KF-04 + KF-05: Submit analysis."""
    result = service.do_something(...)
    return AnalysisSubmitResponse(...)
```

## 8.2 Service Rules

1. Service file di `app/services/`, satu file per domain.
2. Service berisi business logic murni — tidak boleh mengakses HTTP request/response.
3. Service menerima parameter primitif atau model object (bukan FastAPI types).
4. Service melempar `HTTPException` untuk error yang harus dikembalikan ke client.
5. Service mengembalikan ORM model atau dict, bukan Pydantic schema.

## 8.3 Repository Rules

Project ini menggunakan **inline query** di service layer (bukan repository pattern terpisah). Semua query SQLAlchemy ditulis langsung di service function.

```python
# Pattern (di service)
analysis = db.query(Analysis).filter(
    Analysis.id == analysis_id,
    Analysis.user_id == user_id
).first()
```

Jika project berkembang ke skala yang lebih besar, migrate ke repository pattern terpisah.

## 8.4 Validation Rules

1. **Request validation**: Gunakan Pydantic `BaseModel` dengan `Field()` constraints.
2. **Business validation**: Di service layer, raise `HTTPException` jika logic constraint dilanggar.
3. **Data validation**: Di `preprocessor.py` untuk input ML/DL.

```python
# Pydantic validation
class ManualInputData(BaseModel):
    ph: float = Field(7.0, ge=0, le=14, description="Derajat keasaman")
    Hardness: float = Field(..., description="Tingkat kesadahan air")
```

## 8.5 Error Handling Rules

1. **HTTP Errors**: Gunakan `HTTPException` dengan status code yang tepat.
2. **Service Errors**: Catch exceptions di service, wrap dengan `HTTPException`.
3. **ML Errors**: Catch di `ml_service.py`, log warning, gunakan placeholder result jika model file missing.
4. **External Service Errors**: Catch Supabase/Gemini errors, return friendly message.

```python
# Status code mapping
400 — Bad Request (invalid input, bad JSON)
401 — Unauthorized (invalid/expired token)
403 — Forbidden (inactive account, not admin)
404 — Not Found (resource doesn't exist)
500 — Internal Server Error (pipeline failure)
502 — Bad Gateway (AI service error)
```

## 8.6 Logging Rules

1. Gunakan `logging.getLogger(__name__)` di setiap module.
2. Log level:
   - `logger.error()` — unrecoverable errors (model failure, DB error).
   - `logger.warning()` — recoverable issues (model file missing, using placeholder).
   - `logger.info()` — significant events (analysis completed, user registered).
   - `logger.debug()` — verbose debug info.
3. Format: `{timestamp} - {module} - {level} - {message}`.

## 8.7 Security Rules

1. **CORS**: Currently `allow_origins=["*"]`. Ganti dengan frontend domain di production.
2. **Token**: Supabase JWT, verified server-side pada setiap request.
3. **RLS**: Row Level Security aktif untuk semua tabel.
4. **File Upload**: Validasi extension dan size sebelum upload.
5. **SQL Injection**: Dicegah oleh SQLAlchemy ORM (parameterized queries).
6. **XSS**: Dicegah oleh Vue.js template escaping.
7. **Input Sanitization**: Pydantic schema validation pada semua endpoint.
8. **Secret Management**: Semua secrets di `.env` file (tidak di-commit ke git).

---

# BAGIAN 9 — AUTHENTICATION & AUTHORIZATION

## 9.1 Login Flow

```
┌──────────────┐     ┌──────────────────┐     ┌────────────────┐
│   Frontend   │     │    Backend API   │     │  Supabase Auth │
│  LoginPage   │     │   /api/auth      │     │                │
└──────┬───────┘     └────────┬─────────┘     └───────┬────────┘
       │                      │                        │
       │  POST /api/auth/login│                        │
       │  { email, password } │                        │
       │─────────────────────►│                        │
       │                      │  sign_in_with_password │
       │                      │───────────────────────►│
       │                      │                        │
       │                      │  { session, user }     │
       │                      │◄───────────────────────│
       │                      │                        │
       │                      │  Query profiles table  │
       │                      │  Check is_active       │
       │                      │  Check is_admin        │
       │                      │                        │
       │  { access_token,     │                        │
       │    refresh_token,    │                        │
       │    user_id, email,   │                        │
       │    full_name,        │                        │
       │    is_admin }        │                        │
       │◄─────────────────────│                        │
       │                      │                        │
       │  Store to            │                        │
       │  sessionStorage:     │                        │
       │  - pakar_air_token   │                        │
       │  - pakar_air_user    │                        │
       │  - pakar_air_refresh │                        │
       │                      │                        │
       │  Redirect to:        │                        │
       │  isAdmin ? /admin    │                        │
       │         : /dashboard │                        │
       │                      │                        │
```

## 9.2 Session Flow

1. Token disimpan di `sessionStorage` (bukan `localStorage`) — lebih aman, cleared saat tab/browser ditutup.
2. Setiap request HTTP (Axios) menyertakan `Authorization: Bearer <token>` via interceptor.
3. Jika backend mengembalikan `401`, interceptor otomatis:
   - Clear semua session storage keys.
   - Redirect ke `/login`.

## 9.3 JWT Flow

```
                Token Lifecycle
                ─────────────────
1. Login  → access_token (short-lived, ~1 jam)
            refresh_token (long-lived, ~7 hari)

2. Request → access_token dikirim di header
             Backend verify via supabase.auth.get_user(token)

3. Expired → POST /api/auth/refresh
              { refresh_token: "..." }
              → New access_token + refresh_token

4. Logout  → POST /api/auth/logout
              Backend: supabase.auth.sign_out(token)
              Frontend: clear sessionStorage
```

## 9.4 Middleware Flow

```
Request → HTTPBearer → get_current_user()
                       ├─► supabase.auth.get_user(token)
                       │   └─► Verify JWT signature + expiry
                       ├─► db.query(Profile).filter(id == user.id)
                       │   └─► Get local profile
                       ├─► Check profile exists
                       │   └─► 404 if not found
                       ├─► Check profile.is_active
                       │   └─► 403 if inactive
                       └─► Return Profile object

         → get_admin_user()
           ├─► get_current_user() (above)
           └─► Check profile.is_admin
               └─► 403 if not admin
```

## 9.5 Role Permission Matrix

| Resource | User | Admin |
|---|---|---|
| POST `/api/auth/register` | ✅ Public | ✅ Public |
| POST `/api/auth/login` | ✅ Public | ✅ Public |
| GET `/api/users/profile` | ✅ Own only | ✅ Own only |
| PUT `/api/users/profile` | ✅ Own only | ✅ Own only |
| POST `/api/analysis` | ✅ | ✅ |
| GET `/api/analysis/{id}` | ✅ Own only | ✅ Own only |
| GET `/api/analysis/history` | ✅ Own only | ✅ Own only |
| GET `/api/notifications` | ✅ Own only | ✅ Own only |
| GET `/api/admin/*` | ❌ 403 | ✅ |
| GET `/api/admin/users` | ❌ 403 | ✅ All users |
| PUT `/api/admin/users/{id}/status` | ❌ 403 | ✅ |
| DELETE `/api/admin/users/{id}` | ❌ 403 | ✅ |
| POST `/api/admin/chatbot/*` | ❌ 403 | ✅ Own sessions |

---

# BAGIAN 10 — QA & TESTING STANDARD

## 10.1 Unit Testing

### Frontend

- **Framework:** Vitest (recommended, compatible dengan Vite).
- **Scope:** Composables (`useAnalysis`, `useFileUpload`), stores (`analysisStore`, `authStore`), utility functions.
- **Naming:** `[module].test.js` — contoh: `useAnalysis.test.js`.
- **Coverage Target:** ≥ 80% untuk composables dan stores.

### Backend

- **Framework:** pytest.
- **Scope:** Service functions, ML/DL pipeline, fusion logic, validation functions.
- **Naming:** `test_[module].py` — contoh: `test_analysis_service.py`.
- **Coverage Target:** ≥ 80% untuk service layer dan ML_DL layer.

## 10.2 Integration Testing

- **Backend:** Test endpoint → service → DB flow menggunakan pytest + httpx `AsyncClient`.
- **Database:** Gunakan test database terpisah atau SQLite in-memory untuk testing.
- **Supabase:** Mock `supabase` client untuk testing tanpa koneksi real.

## 10.3 API Testing

- **Tool:** Swagger UI (`/docs`) untuk manual testing selama development.
- **Automated:** pytest dengan httpx test client.
- **Checklist:**
  - Setiap endpoint ditest dengan valid input → expected 200.
  - Setiap endpoint ditest dengan invalid input → expected 4xx.
  - Auth endpoints ditest tanpa token → expected 401.
  - Admin endpoints ditest dengan user biasa → expected 403.

## 10.4 Frontend Testing

- **Component Testing:** Vitest + Vue Test Utils.
- **Scope:** Render komponen, interaksi form, emitted events.
- **Visual Testing:** Manual atau Chromatic/Storybook untuk snapshot UI.

## 10.5 E2E Testing

- **Framework:** Playwright atau Cypress (pilih satu).
- **Scope:** Full user journey:
  1. Register → Login → Submit Analysis → View Result → View History → Logout.
  2. Admin Login → View Dashboard → Manage Users → View Reports.

## 10.6 QA Checklist

### Pre-Release Checklist

- [ ] Semua endpoint mengembalikan response sesuai schema.
- [ ] Login/Register flow berjalan end-to-end.
- [ ] Upload gambar + submit analysis → result ditampilkan.
- [ ] History dengan filter dan pagination berfungsi.
- [ ] Export CSV dan PDF menghasilkan file yang valid.
- [ ] Notifikasi muncul setelah analisis selesai.
- [ ] Admin dashboard menampilkan statistik akurat.
- [ ] User management (activate/deactivate/delete) berfungsi.
- [ ] AI Chatbot menerima pesan dan merespons.
- [ ] Responsive layout berfungsi di mobile, tablet, desktop.
- [ ] Error handling menampilkan pesan yang user-friendly.
- [ ] 401 auto-logout berfungsi.
- [ ] Navigation guard mencegah akses unauthorized.
- [ ] Profil user (update nama, username, avatar) berfungsi.
- [ ] Accessibility: keyboard navigation, focus ring, aria labels.

---

# BAGIAN 11 — DEPLOYMENT DOCUMENTATION

## 11.1 Environment Variables

### Backend (`.env`)

| Variable | Deskripsi | Contoh |
|---|---|---|
| `DATABASE_URL` | PostgreSQL connection string | `postgresql://user:pass@host:5432/pakar_air` |
| `SUPABASE_URL` | Supabase project URL | `https://xxxxx.supabase.co` |
| `SUPABASE_KEY` | Supabase anon/public key | `eyJhbGci...` |
| `GEMINI_API_KEY` | Google Gemini API key | `AIzaSy...` |
| `SECRET_KEY` | JWT secret key (backup) | Random 32+ char string |
| `ALGORITHM` | JWT algorithm | `HS256` |
| `ACCESS_TOKEN_EXPIRE_MINUTES` | Token expiry | `30` |
| `UPLOAD_FOLDER` | Local upload folder | `uploads` |

### Frontend (`.env`)

| Variable | Deskripsi | Contoh |
|---|---|---|
| `VITE_API_BASE_URL` | Backend API base URL | `http://localhost:8000` |

## 11.2 Development Setup

### Prerequisites
- Node.js `≥ 20.19.0` atau `≥ 22.12.0`.
- Python `≥ 3.10`.
- PostgreSQL `≥ 15` (atau Supabase account).

### Frontend

```bash
cd frontend
npm install
npm run dev          # Start dev server at :5173
```

### Backend

```bash
cd server
pip install -r requirements.txt
cp .env.example .env  # Fill in values
python run.py         # Start server at :8000
```

### Vite Proxy

Frontend dev server (`localhost:5173`) memproxy request `/api` dan `/uploads` ke backend (`localhost:8000`):

```javascript
// vite.config.js
server: {
  proxy: {
    '/api': { target: 'http://localhost:8000', changeOrigin: true },
    '/uploads': { target: 'http://localhost:8000', changeOrigin: true },
  }
}
```

## 11.3 Staging Environment

1. Deploy backend ke cloud VM (GCP/AWS/DigitalOcean).
2. Gunakan Supabase project terpisah untuk staging.
3. Frontend di-build ke static files: `npm run build`.
4. Serve static files via Nginx reverse proxy.

## 11.4 Production Environment

### Backend Deployment

```bash
# 1. Build & start
cd server
pip install -r requirements.txt
uvicorn app.main:app --host 0.0.0.0 --port 8000 --workers 4
```

### Frontend Build

```bash
cd frontend
npm run build        # Output ke dist/
npm run preview      # Preview production build
```

### Docker (Recommended)

**Backend Dockerfile:**
```dockerfile
FROM python:3.10-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY . .
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000", "--workers", "4"]
```

**Frontend Dockerfile:**
```dockerfile
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
```

### Nginx Configuration

```nginx
server {
    listen 80;
    server_name pakar-air.example.com;

    # Frontend (static files)
    location / {
        root /usr/share/nginx/html;
        try_files $uri $uri/ /index.html;
    }

    # Backend API proxy
    location /api/ {
        proxy_pass http://backend:8000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    # File uploads proxy
    location /uploads/ {
        proxy_pass http://backend:8000;
    }
}
```

### CI/CD Pipeline

```yaml
# GitHub Actions example
name: Deploy
on:
  push:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Backend tests
        run: |
          cd server
          pip install -r requirements.txt
          pytest
      - name: Frontend lint
        run: |
          cd frontend
          npm ci
          npm run lint

  deploy:
    needs: test
    runs-on: ubuntu-latest
    steps:
      - name: Deploy to server
        run: |
          # SSH deploy or Docker push
```

---

# BAGIAN 12 — CODING STANDARD

## 12.1 Frontend — Vue Rules

### 12.1.1 Vue Component Rules

1. Selalu gunakan `<script setup>` syntax (Composition API).
2. Satu komponen per file, nama file = nama komponen.
3. Template terlebih dahulu, script di tengah, style di akhir.
4. Gunakan `scoped` styles kecuali untuk global overrides.
5. Jangan gunakan `this` — tidak tersedia di `<script setup>`.

### 12.1.2 Composition API Rules

1. Gunakan `ref()` untuk primitif, `reactive()` untuk objek complex.
2. Gunakan `computed()` untuk derived state.
3. Jangan destructure reactive objects — gunakan `toRefs()` jika perlu.
4. Composables di-prefix dengan `use` — `useAnalysis`, `useFileUpload`.
5. Composables mengembalikan object `{ loading, error, submit }`.

### 12.1.3 Pinia Rules

1. Store menggunakan Options API style: `defineStore('name', { state, getters, actions })`.
2. Nama store: `use[Domain]Store` — `useAuthStore`, `useAnalysisStore`.
3. Store ID: lowercase domain — `'auth'`, `'analysis'`.
4. State harus di-reset di action dedicated (`reset()`).
5. Jangan melakukan API call di store — gunakan composable atau API module.

### 12.1.4 CSS Rules

1. **Global variables** di `main.css` — warna, font, spacing, shadow.
2. **Page-level styles** di `assets/styles/pages/[page].css`, di-link via `<style scoped src="...">`.
3. **Component-level styles** sebagai `<style scoped>` inline.
4. Gunakan CSS Variables untuk theming consistency.
5. Naming: BEM-inspired (`block__element--modifier`).
6. Tidak ada `!important` kecuali benar-benar diperlukan.
7. Transition/animation durasi harus konsisten (lihat Animation Rules).

### 12.1.5 Naming Rules

| Entity | Convention | Contoh |
|---|---|---|
| Component file | PascalCase | `ManualDataForm.vue` |
| Component tag | PascalCase | `<ManualDataForm />` |
| Props | camelCase | `:isLoading`, `:modelValue` |
| Events | kebab-case | `@file-selected`, `@update:model-value` |
| CSS class | kebab-case (BEM) | `.form-card`, `.card-header__title` |
| CSS variable | kebab-case | `--color-accent`, `--font-size-base` |
| JS variable | camelCase | `analysisStore`, `submitError` |
| JS constant | UPPER_SNAKE_CASE | `MAX_FILE_SIZE`, `API_BASE` |
| Store | camelCase + Store | `useAuthStore` |
| Composable | use + PascalCase | `useAnalysis` |
| Route name | kebab-case | `admin-dashboard`, `analysis` |

## 12.2 Backend — Python Rules

### 12.2.1 Folder Rules

1. Satu module per concern: `api/`, `services/`, `models/`, `schemas/`, `utils/`.
2. Setiap module punya `__init__.py`.
3. ML/DL code terpisah di `ML_DL/` (bukan di dalam `app/`).

### 12.2.2 Service Rules

1. Service function menerima parameter explicit (bukan kwargs wildcard).
2. Type hints wajib pada parameter dan return type.
3. Docstring wajib pada setiap fungsi publik.
4. Nama fungsi: `verb_noun` — `create_analysis`, `run_analysis`, `get_user_history`.

### 12.2.3 Controller (API) Rules

1. Endpoint handler selalu `async def`.
2. Satu file per domain router.
3. Dokumentasi endpoint via docstring (otomatis muncul di Swagger).
4. Response model di-deklarasikan via `response_model=`.

### 12.2.4 Database Rules

1. Model class: PascalCase singular — `Analysis`, `Profile`, `Notification`.
2. Tabel name: snake_case plural — `analyses`, `profiles`, `notifications`.
3. Semua UUID as primary key.
4. Semua timestamp dengan timezone: `DateTime(timezone=True)`.
5. Cascade delete pada foreign key child relationships.
6. Relationship `back_populates` wajib untuk bidirectional references.

### 12.2.5 Python Style

1. Formatter: Black (recommended) atau autopep8.
2. Linter: Ruff atau Flake8.
3. Type checker: mypy (optional).
4. Import order: stdlib → third-party → local, dengan blank line antar group.
5. String: f-strings preferred.
6. Max line length: 100 characters.

---

# BAGIAN 13 — FUTURE SCALABILITY

## 13.1 Modularization Strategy

### Current State
- Monorepo: `frontend/` dan `server/` dalam satu repository.
- Backend: single FastAPI app dengan in-process ML inference.

### Target State
1. **Pisahkan ML/DL inference** ke service terpisah (gRPC atau REST microservice) agar:
   - Bisa di-scale independen (GPU instances untuk inference).
   - Model update tanpa deploy ulang backend utama.
2. **Pisahkan Chatbot service** ke module terpisah karena dependency ke Gemini API berbeda dari core analysis.
3. **Buat shared library** untuk schema, constants, dan utility yang dipakai frontend dan backend.

## 13.2 Microservice Preparation

```
                      ┌───────────────┐
                      │   API Gateway │
                      │   (Nginx)     │
                      └───────┬───────┘
              ┌───────────────┼───────────────┐
              ▼               ▼               ▼
      ┌───────────────┐ ┌──────────┐  ┌──────────────┐
      │ Auth Service  │ │ Analysis │  │ AI Chatbot   │
      │ (Supabase)    │ │ Service  │  │ Service      │
      └───────────────┘ └─────┬────┘  └──────────────┘
                              │
                    ┌─────────┼─────────┐
                    ▼                   ▼
            ┌──────────────┐    ┌──────────────┐
            │ ML Inference │    │ DL Inference │
            │ (RF, CPU)    │    │ (YOLO, GPU)  │
            └──────────────┘    └──────────────┘
```

### Langkah Migrasi:
1. Wrap `ml_service.py` sebagai REST microservice (FastAPI terpisah).
2. Deploy YOLO inference di container dengan GPU (NVIDIA Container Toolkit).
3. Gunakan message queue (Redis/RabbitMQ) untuk async inference jika latensi tinggi.
4. API Gateway routing via Nginx upstream groups.

## 13.3 Performance Optimization

| Area | Optimasi | Prioritas |
|---|---|---|
| **Frontend** | Lazy load semua route components | ✅ Sudah diterapkan |
| **Frontend** | Image lazy loading di History page | Medium |
| **Frontend** | Virtual scrolling untuk list panjang | Medium |
| **Backend** | Connection pooling SQLAlchemy | High |
| **Backend** | Redis cache untuk dashboard stats | Medium |
| **Backend** | Async ML inference (background task) | High |
| **Database** | Index pada `analyses.user_id` dan `analyses.created_at` | High |
| **Database** | Materialized view untuk report aggregation | Low |
| **ML/DL** | Model caching (load once, reuse) | High |
| **ML/DL** | Batch inference support | Low |
| **Storage** | CDN untuk gambar dari Supabase Storage | Medium |

## 13.4 Security Hardening

| Area | Tindakan | Status |
|---|---|---|
| **CORS** | Ganti `allow_origins=["*"]` dengan domain spesifik | Pending |
| **Rate Limiting** | Implementasi rate limiter (slowapi) pada auth endpoints | Pending |
| **Input Sanitization** | Sanitize file names sebelum upload | ✅ Done (UUID rename) |
| **HTTPS** | SSL/TLS via Let's Encrypt + Nginx | Pending |
| **Secrets Rotation** | Rotate Supabase keys dan Gemini API key secara berkala | Pending |
| **Audit Logging** | Log semua admin actions (user delete, status change) | Pending |
| **CSP Headers** | Content Security Policy headers | Pending |
| **Dependency Audit** | `npm audit` dan `pip-audit` di CI pipeline | Pending |

## 13.5 Monitoring Strategy

| Tool | Fungsi | Prioritas |
|---|---|---|
| **Sentry** | Error tracking frontend + backend | High |
| **Prometheus + Grafana** | Metrics: request latency, error rate, ML inference time | Medium |
| **Supabase Dashboard** | Database monitoring, storage usage, auth metrics | ✅ Available |
| **Uptime Robot** | Endpoint availability monitoring | Medium |
| **Structured Logging** | JSON structured logs untuk backend (ELK Stack ready) | Medium |

### Key Metrics to Monitor

1. **API Latency**: P50, P95, P99 response time per endpoint.
2. **ML Inference Time**: Waktu YOLO + RF + Fusion per request.
3. **Error Rate**: Persentase request yang gagal per endpoint.
4. **Active Users**: DAU/MAU dari auth logs.
5. **Analysis Volume**: Jumlah analisis per hari/minggu/bulan.
6. **Storage Usage**: Supabase Storage consumption.
7. **Model Accuracy**: Tracking prediction accuracy (jika ada feedback loop).

---

## Changelog

| Tanggal | Versi | Penulis | Perubahan |
|---|---|---|---|
| 2026-05-29 | 1.0.0 | AI Agent (Antigravity) | Initial documentation — full system documentation |

---

> **📌 Catatan:** Dokumen ini adalah **living document**. Update secara berkala setiap kali ada perubahan arsitektur, penambahan fitur, atau perubahan standar. Setiap developer dan AI agent wajib merujuk ke dokumen ini sebelum memulai implementasi.
