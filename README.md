# 💧 PAKAR-AIR — Sistem Pakar Klasifikasi Sanitasi Air

![Production Ready](https://img.shields.io/badge/Status-PRODUCTION_READY-success?style=for-the-badge)
![Coverage](https://img.shields.io/badge/Coverage-%3E95%25-brightgreen?style=for-the-badge)
![E2E Tests](https://img.shields.io/badge/E2E_Tests-115_Passing-success?style=for-the-badge)

Arsitektur berikut merupakan struktur final yang tervalidasi. Sistem telah diaudit dan diperkeras (Hardened) di semua layer (UI, Backend, AI, dan Automation).

**PAKAR-AIR** adalah aplikasi web berbasis SaaS untuk mengklasifikasikan kualitas sanitasi air, apakah air tersebut **layak digunakan** atau **tidak layak**. Sistem ini menggabungkan **Deep Learning (YOLOv8)** untuk analisis citra air dan **Machine Learning (Random Forest)** untuk analisis data manual, menghasilkan prediksi akhir yang komprehensif.

---

## 📋 Daftar Isi

- [Fitur Utama](#-fitur-utama)
- [Tech Stack](#-tech-stack)
- [Arsitektur Sistem](#-arsitektur-sistem)
- [Struktur Proyek](#-struktur-proyek)
- [Alur Kerja Analisis](#-alur-kerja-analisis)
- [Database Schema](#-database-schema)
- [API Endpoints](#-api-endpoints)
- [Halaman & Routing](#-halaman--routing)
- [Panduan Instalasi](#-panduan-instalasi)
- [Automation & Testing](#-automation--testing)

---

## ✨ Fitur Utama

| Kode | Fitur | Deskripsi |
|------|-------|-----------|
| KF-01 | Registrasi Pengguna | Form registrasi (nama, username, password) dengan validasi |
| KF-02 | Login & Logout | Autentikasi JWT, redirect ke dashboard |
| KF-03 | Unggah Citra Air | Upload foto air untuk dianalisis oleh YOLO |
| KF-04 | Input Data Manual | Form parameter kimia: pH, Hardness, Solids, Chloramines, Sulfate, Conductivity, Organic carbon, Trihalomethanes, Turbidity |
| KF-05 | Analisis & Prediksi | Gabungan DL (YOLO) + ML (Random Forest) → klasifikasi akhir |
| KF-06 | Tampilan Hasil | Kategori, confidence score, penjelasan DL+ML, rekomendasi |
| KF-07 | Riwayat Analisis | Histori semua analisis per user |
| KF-08 | Manajemen Profil | Edit nama, username, password, foto profil |
| KF-09 | Dashboard Admin – Pengguna | Statistik & grafik pertumbuhan pengguna |
| KF-10 | Manajemen Pengguna (Admin) | Aktivasi/deaktivasi/hapus akun |
| KF-11 | Dashboard Admin – Analisis | Statistik analisis, distribusi hasil, tren |
| KF-12 | Laporan Analisis (Admin) | Filter & export data (CSV/PDF) |
| KF-13 | Notifikasi | Pemberitahuan hasil analisis |
| KF-14 | Edukasi Kualitas Air | Artikel & panduan kualitas air |
| KF-15 | AI Chatbot (Admin) | Asisten AI (Gemini) untuk monitoring & analisis data real-time |

---

## 🛠 Tech Stack

| Layer | Teknologi |
|-------|-----------|
| **Frontend** | Vue 3 + Vite, Pinia (state), Vue Router, Axios |
| **Backend** | FastAPI (Python), python-jose (JWT), SQLAlchemy, Pydantic |
| **Deep Learning** | YOLOv8 (Ultralytics) — deteksi objek pada citra air |
| **Machine Learning** | Random Forest (scikit-learn) — klasifikasi data manual |
| **AI Chatbot** | Google Gemini 2.0/2.5 Flash — asisten monitoring berbasis data |
| **Database** | Supabase (PostgreSQL) |
| **File Storage** | Supabase Storage (gambar upload) |
| **Deployment** | Docker + Nginx + Uvicorn |

---

## 🏗 Arsitektur Sistem

```
┌─────────────────────────────────────────────────────────┐
│                      BROWSER                            │
│  ┌───────────────────────────────────────────────────┐  │
│  │              Vue 3 + Vite (SPA)                   │  │
│  │  ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐ ┌────────┐ │  │
│  │  │Login │ │Dash  │ │Anal. │ │Hist. │ │Edukasi │ │  │
│  │  │Reg.  │ │board │ │Page  │ │Page  │ │Page    │ │  │
│  │  └──────┘ └──────┘ └──────┘ └──────┘ └────────┘ │  │
│  │  ┌──────┐ ┌──────────────────────────────────────┐│  │
│  │  │Profil│ │       Admin Panel                    ││  │
│  │  └──────┘ └──────────────────────────────────────┘│  │
│  └───────────────────┬───────────────────────────────┘  │
└──────────────────────┼──────────────────────────────────┘
                       │ HTTP (REST API + JWT)
┌──────────────────────┼──────────────────────────────────┐
│                FASTAPI BACKEND                          │
│  ┌───────────────────┴───────────────────────────────┐  │
│  │              API Gateway (APIRouter)              │  │
│  │  ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐ ┌────────┐ │  │
│  │  │Auth  │ │User  │ │Analy.│ │Admin │ │Edu/    │ │  │
│  │  │API   │ │API   │ │API   │ │API   │ │Notif   │ │  │
│  │  └──┬───┘ └──┬───┘ └──┬───┘ └──┬───┘ └────┬───┘ │  │
│  └─────┼────────┼────────┼────────┼───────────┼─────┘  │
│        │        │        │        │           │         │
│  ┌─────┴────────┴────────┴────────┴───────────┴─────┐  │
│  │              Service Layer                       │  │
│  └──────────────────────┬───────────────────────────┘  │
│                         │                               │
│  ┌──────────────────────┴───────────────────────────┐  │
│  │            ML/DL Inference Engine                │  │
│  │  ┌─────────────────┐  ┌─────────────────┐       │  │
│  │  │  YOLO v8 (.pt)  │  │ Random Forest   │       │  │
│  │  │  Deteksi Objek  │  │ (.pkl)          │       │  │
│  │  │  pada Citra Air  │  │ Klasifikasi    │       │  │
│  │  └────────┬────────┘  └────────┬────────┘       │  │
│  │           └────────┬───────────┘                 │  │
│  │              ┌─────┴─────┐                       │  │
│  │              │  FUSION   │                       │  │
│  │              │ DL×0.4 +  │                       │  │
│  │              │ ML×0.6    │                       │  │
│  │              └─────┬─────┘                       │  │
│  │                    │                              │  │
│  │         ┌──────────┴──────────┐                  │  │
│  │         │ ✅ Layak / ❌ Tidak │                  │  │
│  │         └─────────────────────┘                  │  │
│  └──────────────────────────────────────────────────┘  │
│                         │                               │
│  ┌──────────────────────┴───────────────────────────┐  │
│  │              Data Layer                          │  │
│  │  ┌──────────────┐          ┌─────────────────┐  │  │
│  │  │  Supabase    │          │  Supabase       │  │  │
│  │  │  (PostgreSQL)│          │  Storage        │  │  │
│  │  │  Users,      │          │  (Uploaded       │  │  │
│  │  │  Analysis,   │          │   Images)       │  │  │
│  │  │  Results,    │          │                  │  │  │
│  │  │  Notif, Edu  │          │                  │  │  │
│  │  └──────────────┘          └─────────────────┘  │  │
│  └──────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────┘
```

---

## 📁 Struktur Proyek

```
PROYEK_PAKAR-AIR/
│
├── frontend/                        # 🖥️ FRONTEND (Vue 3 + Vite)
│   ├── public/
│   │   └── favicon.ico
│   ├── src/
│   │   ├── api/                     # API client modules
│   │   │   ├── axios.js             #   Axios instance + JWT interceptor
│   │   │   ├── auth.js              #   Login, register, logout calls
│   │   │   ├── analysis.js          #   Upload & analysis calls
│   │   │   ├── user.js              #   Profile management calls
│   │   │   ├── admin.js             #   Admin-only API calls
│   │   │   ├── education.js         #   Education articles calls
│   │   │   └── notification.js      #   Notification calls
│   │   │
│   │   ├── assets/                  # Static assets
│   │   │   ├── styles/
│   │   │   │   ├── main.css         #   Global styles + design tokens
│   │   │   │   ├── variables.css    #   CSS custom properties
│   │   │   │   └── animations.css   #   Micro-animations
│   │   │   └── images/
│   │   │
│   │   ├── components/              # Reusable components
│   │   │   ├── common/              #   Shared UI (Navbar, Button, Modal, etc.)
│   │   │   ├── analysis/            #   ImageUploader, ManualDataForm, 
│   │   │   │                        #   PredictionResult, ConfidenceGauge
│   │   │   ├── dashboard/           #   StatsCard, RecentAnalysis
│   │   │   ├── admin/               #   UserTable, Charts
│   │   │   └── education/           #   ArticleCard, ArticleDetail
│   │   │
│   │   ├── composables/             # Vue composition functions
│   │   │   ├── useAuth.js           #   Auth logic
│   │   │   ├── useNotification.js   #   Toast management
│   │   │   ├── useAnalysis.js       #   Analysis flow
│   │   │   └── useFileUpload.js     #   File upload + preview
│   │   │
│   │   ├── layouts/                 # Page layout wrappers
│   │   │   ├── DefaultLayout.vue    #   Landing page layout
│   │   │   ├── AuthLayout.vue       #   Login/Register layout
│   │   │   ├── DashboardLayout.vue  #   User dashboard (sidebar)
│   │   │   └── AdminLayout.vue      #   Admin panel layout
│   │   │
│   │   ├── router/
│   │   │   ├── index.js             #   Route definitions
│   │   │   └── guards.js            #   Auth navigation guards
│   │   │
│   │   ├── stores/                  # Pinia state management
│   │   │   ├── authStore.js         #   Auth state
│   │   │   ├── analysisStore.js     #   Analysis state
│   │   │   ├── notificationStore.js #   Notifications
│   │   │   └── adminStore.js        #   Admin state
│   │   │
│   │   ├── views/                   # Page components
│   │   │   ├── LandingPage.vue      #   Homepage / landing
│   │   │   ├── LoginView.vue        #   KF-02
│   │   │   ├── RegisterView.vue     #   KF-01
│   │   │   ├── DashboardView.vue    #   User dashboard
│   │   │   ├── AnalysisView.vue     #   KF-03, 04, 05, 06
│   │   │   ├── HistoryView.vue      #   KF-07
│   │   │   ├── EducationView.vue    #   KF-14
│   │   │   ├── ProfileView.vue      #   KF-08
│   │   │   ├── admin/
│   │   │   │   ├── AdminDashboard.vue   # KF-09, 11
│   │   │   │   ├── AdminUsers.vue       # KF-10
│   │   │   │   └── AdminReports.vue     # KF-12
│   │   │   └── NotFoundView.vue
│   │   │
│   │   ├── utils/                   # Helper functions
│   │   │   ├── validators.js
│   │   │   ├── formatters.js
│   │   │   └── constants.js
│   │   │
│   │   ├── App.vue
│   │   └── main.js
│   │
│   ├── index.html
│   ├── vite.config.js
│   ├── package.json
│   └── .env
│
├── server/                          # ⚙️ BACKEND (FastAPI + Python)
│   ├── app/
│   │   ├── __init__.py              # App initialization
│   │   ├── main.py                  # FastAPI app factory
│   │   ├── config.py                # Configuration (dev/prod)
│   │   ├── dependencies.py          # Dependency injection (auth, db)
│   │   │
│   │   ├── api/                     # API Routers (routes)
│   │   │   ├── __init__.py
│   │   │   ├── auth.py              #   /api/auth/*
│   │   │   ├── users.py             #   /api/users/*
│   │   │   ├── analysis.py          #   /api/analysis/*
│   │   │   ├── history.py           #   /api/history/*
│   │   │   ├── admin.py             #   /api/admin/*
│   │   │   ├── education.py         #   /api/education/*
│   │   │   └── notifications.py     #   /api/notifications/*
│   │   │
│   │   ├── models/                  # SQLAlchemy models
│   │   │   ├── __init__.py
│   │   │   ├── user.py              #   User model
│   │   │   ├── analysis.py          #   Analysis + AnalysisResult
│   │   │   ├── notification.py      #   Notification model
│   │   │   └── education.py         #   EducationArticle model
│   │   │
│   │   ├── services/                # Business logic layer
│   │   │   ├── __init__.py
│   │   │   ├── auth_service.py
│   │   │   ├── user_service.py
│   │   │   ├── analysis_service.py  #   Orchestrates DL + ML
│   │   │   ├── ml_service.py        #   Wrapper for ML inference
│   │   │   ├── notification_service.py
│   │   │   ├── report_service.py    #   CSV/PDF export
│   │   │   └── education_service.py
│   │   │
│   │   ├── schemas/                 # Pydantic schemas (validation)
│   │   │   ├── __init__.py
│   │   │   ├── auth_schema.py
│   │   │   ├── analysis_schema.py
│   │   │   ├── user_schema.py
│   │   │   └── education_schema.py
│   │   │
│   │   └── utils/                   # Helpers
│   │       ├── __init__.py
│   │       ├── file_handler.py      #   Image upload/storage
│   │       ├── validators.py
│   │       └── helpers.py
│   │
│   ├── ML_DL/                       # 🤖 ML/DL INFERENCE ENGINE
│   │   ├── __init__.py
│   │   ├── yolo_detector.py         #   YOLOv8 inference wrapper
│   │   ├── rf_classifier.py         #   Random Forest inference wrapper
│   │   ├── fusion.py                #   Combine DL + ML → final result
│   │   ├── preprocessor.py          #   Image & data preprocessing
│   │   │
│   │   └── saved_models/            #   Pre-trained model files
│   │       ├── water_yolo.pt        #     YOLOv8 model
│   │       ├── random_forest_model.pkl #  Random Forest model
│   │       └── scaler.pkl           #     Standard scaler for features
│   │
│   ├── migrations/                  # Alembic DB migrations
│   ├── uploads/                     # Uploaded images storage
│   ├── requirements.txt
│   ├── run.py                       # Uvicorn entry point
│   └── .env
│
├── docs/                            # 📖 DOKUMENTASI
│   └── ARCHITECTURE.md              # Dokumen arsitektur (file ini)
│
├── docker-compose.yml               # Multi-container setup
├── .env.example                     # Template environment variables
├── .gitignore
└── README.md                        # Overview proyek (file ini)
```

---

## 🔬 Alur Kerja Analisis

### Langkah-langkah Proses Analisis

```
   USER                          FASTAPI                      ML/DL ENGINE
    │                               │                              │
    │  1. Upload gambar +           │                              │
    │     isi form manual           │                              │
    │ ─────────────────────────────>│                              │
    │                               │  2. Validasi input           │
    │                               │  3. Simpan gambar ke disk    │
    │                               │  4. Simpan data ke DB        │
    │                               │     (tabel: ANALYSIS)        │
    │                               │                              │
    │                               │  5. Kirim ke ML Engine       │
    │                               │ ────────────────────────────>│
    │                               │                              │
    │                               │         6a. YOLO Inference   │
    │                               │         ┌──────────────────┐ │
    │                               │         │ Input: gambar    │ │
    │                               │         │ Output:          │ │
    │                               │         │ - air_keruh 89%  │ │
    │                               │         │ - sampah 75%     │ │
    │                               │         │ → tidak_layak    │ │
    │                               │         └──────────────────┘ │
    │                               │                              │
    │                               │         6b. RF Inference     │
    │                               │         ┌──────────────────┐ │
    │                               │         │ Input: kimia data│ │
    │                               │         │ Output:          │ │
    │                               │         │ → tidak_layak    │ │
    │                               │         │   (conf: 91%)    │ │
    │                               │         └──────────────────┘ │
    │                               │                              │
    │                               │         7. FUSION            │
    │                               │         ┌──────────────────┐ │
    │                               │         │ DL×0.4 + ML×0.6  │ │
    │                               │         │ = Final Score     │ │
    │                               │         │ → TIDAK LAYAK    │ │
    │                               │         │   (conf: 87%)    │ │
    │                               │         └──────────────────┘ │
    │                               │ <────────────────────────────│
    │                               │                              │
    │                               │  8. Simpan hasil ke DB       │
    │                               │     (tabel: ANALYSIS_RESULT) │
    │                               │  9. Buat notifikasi          │
    │                               │                              │
    │  10. Tampilkan hasil          │                              │
    │ <─────────────────────────────│                              │
    │                               │                              │
    │  ┌────────────────────────┐   │                              │
    │  │ Hasil: ❌ Tidak Layak  │   │                              │
    │  │ Confidence: 87%        │   │                              │
    │  │                        │   │                              │
    │  │ DL: floater terdeteksi │   │                              │
    │  │ ML: pH 3.5, Turbidity  │   │                              │
    │  │     tinggi             │   │                              │
    │  │                        │   │                              │
    │  │ Rekomendasi: Jangan    │   │                              │
    │  │ konsumsi langsung...   │   │                              │
    │  └────────────────────────┘   │                              │
```

### Detail Model

#### 🔍 Deep Learning — YOLOv8 (Object Detection)

YOLO mendeteksi kondisi visual air dari gambar yang diunggah:

| Class | Label | Pengaruh | Deskripsi |
|-------|-------|----------|-----------|
| 0 | `floater` | ❌ Negatif | Sampah/objek terapung terdeteksi |

**File model**: `server/ML_DL/saved_models/water_yolo.pt`

#### 🌲 Machine Learning — Random Forest (Classification)

RF mengklasifikasi berdasarkan data manual yang diisi user:

| Fitur | Deskripsi | Tipe |
|-------|-----------|------|
| ph | Derajat keasaman (0-14) | Numeric |
| Hardness | Tingkat kesadahan air | Numeric |
| Solids | Total padatan terlarut (TDS) | Numeric |
| Chloramines | Kandungan kloramin | Numeric |
| Sulfate | Kandungan sulfat | Numeric |
| Conductivity | Daya hantar listrik | Numeric |
| Organic carbon | Kandungan karbon organik | Numeric |
| Trihalomethanes| Kandungan trihalometana | Numeric |
| Turbidity | Tingkat kekeruhan | Numeric |

**File model**: `server/ML_DL/saved_models/random_forest_model.pkl`

#### ⚡ Fusion Layer — Penggabungan Hasil

```
Final Score = (DL Score × 0.4) + (ML Score × 0.6)

Jika Final Score > 0.5 → ✅ LAYAK DIGUNAKAN
Jika Final Score ≤ 0.5 → ❌ TIDAK LAYAK DIGUNAKAN
```

> **Mengapa ML lebih berat (60%)?**
> Karena data manual langsung dari observasi user (warna, bau, sumber) cenderung lebih reliable dibanding analisis gambar yang bisa terpengaruh cahaya, sudut kamera, atau kualitas foto.

---

## 💾 Database

Proyek ini menggunakan **Supabase** (PostgreSQL) sebagai database utama dan **Supabase Storage** untuk menyimpan gambar yang diunggah. Database terdiri dari 5 tabel utama:

- **users** — Data pengguna (profil, role, status aktif)
- **analyses** — Data analisis yang disubmit (gambar, parameter manual, status)
- **analysis_results** — Hasil prediksi DL+ML (kategori, confidence, deteksi, penjelasan)
- **notifications** — Notifikasi ke pengguna
- **education_articles** — Artikel edukasi kualitas air

```
users ──────┐
            │ 1:N
            ├──── analyses ──── analysis_results (1:1)
            │ 1:N
            └──── notifications
                       │
            analyses ──┘ (FK)

education_articles (standalone)
```

---

## 🔌 API Endpoints

### Auth (`/api/auth`)
| Method | Endpoint | Deskripsi | Auth |
|--------|----------|-----------|------|
| POST | `/api/auth/register` | Registrasi akun baru | ❌ |
| POST | `/api/auth/login` | Login, dapat JWT token | ❌ |
| POST | `/api/auth/logout` | Logout, invalidate token | ✅ |
| POST | `/api/auth/refresh` | Refresh access token | ✅ |

### User (`/api/users`)
| Method | Endpoint | Deskripsi | Auth |
|--------|----------|-----------|------|
| GET | `/api/users/profile` | Ambil data profil | ✅ User |
| PUT | `/api/users/profile` | Update profil | ✅ User |
| POST | `/api/users/profile/avatar` | Upload foto profil | ✅ User |

### Analysis (`/api/analysis`)
| Method | Endpoint | Deskripsi | Auth |
|--------|----------|-----------|------|
| POST | `/api/analysis` | Submit analisis baru (gambar + form) | ✅ User |
| GET | `/api/analysis/:id` | Ambil hasil analisis | ✅ User |

### History (`/api/analysis/history`)
| Method | Endpoint | Deskripsi | Auth |
|--------|----------|-----------|------|
| GET | `/api/analysis/history` | Daftar riwayat analisis user | ✅ User |
| | `?page=1&per_page=10` | Pagination support | |

### Notifications (`/api/notifications`)
| Method | Endpoint | Deskripsi | Auth |
|--------|----------|-----------|------|
| GET | `/api/notifications` | Daftar notifikasi | ✅ User |
| PUT | `/api/notifications/:id/read` | Tandai sudah dibaca | ✅ User |
| GET | `/api/notifications/unread-count` | Jumlah belum dibaca | ✅ User |

### Education (`/api/education`)
| Method | Endpoint | Deskripsi | Auth |
|--------|----------|-----------|------|
| GET | `/api/education/articles` | Daftar artikel edukasi | ❌ |
| GET | `/api/education/articles/:id` | Detail artikel | ❌ |

### Admin (`/api/admin`)
| Method | Endpoint | Deskripsi | Auth |
|--------|----------|-----------|------|
| GET | `/api/admin/dashboard/stats` | Statistik dashboard | ✅ Admin |
| GET | `/api/admin/users` | Daftar semua user | ✅ Admin |
| PUT | `/api/admin/users/:id/status` | Aktifkan/nonaktifkan user | ✅ Admin |
| DELETE | `/api/admin/users/:id` | Hapus user | ✅ Admin |
| GET | `/api/admin/analysis/stats` | Statistik analisis | ✅ Admin |
| GET | `/api/admin/reports` | Data laporan (filterable) | ✅ Admin |
| GET | `/api/admin/reports/export` | Export CSV/PDF | ✅ Admin |
| POST | `/api/admin/chatbot/sessions` | Buat sesi chat baru | ✅ Admin |
| GET | `/api/admin/chatbot/sessions` | Daftar semua sesi chat | ✅ Admin |
| DELETE | `/api/admin/chatbot/sessions/:id` | Hapus sesi chat | ✅ Admin |
| POST | `/api/admin/chatbot/sessions/:id/messages` | Kirim pesan ke AI Chatbot | ✅ Admin |
| GET | `/api/admin/chatbot/sessions/:id/messages` | Ambil riwayat pesan sesi | ✅ Admin |

---

## 🗺 Halaman & Routing

| Path | Halaman | Guard | Layout | Fungsi (KF) |
|------|---------|-------|--------|-------------|
| `/` | Landing Page | Publik | Default | Homepage |
| `/login` | Login | Guest only | Auth | KF-02 |
| `/register` | Register | Guest only | Auth | KF-01 |
| `/dashboard` | Dashboard User | Auth required | Dashboard | Overview |
| `/analysis` | Analisis Air | Auth required | Dashboard | KF-03,04,05,06 |
| `/history` | Riwayat Analisis | Auth required | Dashboard | KF-07 |
| `/education` | Edukasi | Publik | Default | KF-14 |
| `/profile` | Profil | Auth required | Dashboard | KF-08 |
| `/admin` | Admin Dashboard | Admin only | Admin | KF-09, KF-11 |
| `/admin/users` | Kelola User | Admin only | Admin | KF-10 |
| `/admin/reports` | Laporan | Admin only | Admin | KF-12 |
| `/admin/chatbot` | AI Chatbot | Admin only | Admin | KF-15 |

### Layout System

```
DefaultLayout      → Navbar + Content + Footer (untuk halaman publik)
AuthLayout         → Minimal layout (hanya form, tanpa navbar)
DashboardLayout    → Sidebar + Topbar + Content (untuk user login)
AdminLayout        → Admin Sidebar + Topbar + Content (untuk admin)
```

---

## 🚀 Panduan Instalasi

### Prerequisites
- Node.js 18+
- Python 3.10+
- Akun Supabase (https://supabase.com)

### 1. Clone Repository
```bash
git clone <repo-url>
cd PROYEK_PAKAR-AIR
```

### 2. Setup Frontend
```bash
cd frontend
npm install
npm run dev          # → http://localhost:5173
```

### 3. Setup Backend
```bash
cd server
python -m venv venv
venv\Scripts\activate          # Windows
# source venv/bin/activate     # Linux/Mac
pip install -r requirements.txt
python run.py                  # → http://localhost:8000
```

### 5. Setup Environment (.env)
Pastikan file `.env` di folder `server` sudah berisi:
```env
DATABASE_URL=your_supabase_db_url
SUPABASE_URL=your_supabase_url
SUPABASE_KEY=your_supabase_key
GEMINI_API_KEY=your_google_gemini_api_key
```

### 4. Tambahkan Model Files
Letakkan file model yang sudah di-training ke:
```
server/ML_DL/saved_models/
├── water_yolo.pt         # YOLOv8 trained model
├── random_forest_model.pkl # Random Forest model
└── scaler.pkl            # Standard Scaler
```

---

## 📄 Lisensi

Proyek Perangkat Lunak — Semester 6

---

> **Catatan:** File model `.pt` dan `.pkl` perlu di-training terpisah sebelum fitur analisis bisa digunakan. Tanpa model files, halaman analisis tetap bisa diakses namun tidak akan menghasilkan prediksi.

---

## 🤖 Automation & Testing

Repositori ini ditenagai oleh **SpeedPlay Runtime Engine v1.0**, sistem E2E Automation berbasis Playwright yang mendukung Export Modular & Master Selenium IDE (`.side`).

- **Coverage:** >95% (100% Feature Coverage - 17 dari 17 fitur teruji).
- **Skenario:** 115 Skenario Playwright divalidasi.
- **Status:** Bebas _Flakiness_, Bebas _Timeout_, dan **No Known Critical Bugs**.
- **Format:** Selenium IDE terjamin bebas distorsi *Parser* maupun *AST Error*.

Untuk detail pengujian selengkapnya, baca dokumentasi di: [`docs/testing-pakar-air.md`](docs/testing-pakar-air.md)
