# PAKAR-AIR Automation Subsystem
**SpeedPlay Runtime Engine**

---

## 1. Project Overview

Sub-sistem otomasi ini dibangun khusus untuk proyek **PAKAR-AIR**. Sub-sistem ini tidak sekadar menggunakan perangkat lunak otomasi standar, melainkan menggunakan fondasi kustom yang kami sebut **SpeedPlay Runtime Engine**. 

SpeedPlay Runtime Engine dirancang sebagai *framework* eksekusi yang transparan. Peran teknologi yang kami gunakan:
* **Playwright**: Digunakan sebagai *execution engine* utama untuk menjalankan pengujian web modern yang stabil, asinkron, dan tangguh.
* **Runtime Reporter**: Komponen kustom kami yang mencegat (*intercept*) langkah-langkah Playwright secara *real-time* ketika tes sedang berjalan.
* **AST (Abstract Syntax Tree)**: Struktur data logis yang mendeskripsikan ulang aksi UI (klik, isi, navigasi) ke dalam representasi kode netral.
* **Universal JSON**: Hasil transformasi AST yang menjadi *Single Source of Truth* (SSOT) agar instruksi yang sama bisa dimengerti oleh ekosistem pengujian manapun.
* **Selenium IDE**: Target ekspor akhir yang ditujukan bagi tim QA/Bisnis yang lebih nyaman menggunakan *record-and-playback* tanpa menulis kode.

Pipeline ini dibangun untuk mencegah pekerjaan ganda. Pengembang hanya perlu menulis tes satu kali dalam Playwright (JavaScript), dan secara otomatis sistem akan mendokumentasikannya menjadi *Universal JSON* dan mengekspornya menjadi format *Selenium IDE* tanpa perlu di-*record* ulang.

---

## 2. Architecture Overview

Alur kerja SpeedPlay Runtime Engine berjalan secara otomatis di latar belakang (*seamless*):

```text
Playwright Test 
  → Runtime Reporter 
  → Raw Action Collector 
  → AST Builder 
  → AST Validator 
  → Transformer 
  → Universal JSON 
  → Selenium IDE Exporter 
  → .side file
```

**Penjelasan Layer:**
1. **Playwright Test**: Eksekusi kode *test script* aktual.
2. **Runtime Reporter**: *Lifecycle hook* yang menangkap `onStepBegin` dan `onStepEnd`.
3. **Raw Action Collector**: Mengekstrak locator dan argumen dari fungsi Playwright (seperti `fill` atau `click`).
4. **AST Builder**: Menyusun aksi mentah menjadi struktur pohon (*tree*) yang hierarkis.
5. **AST Validator**: Memastikan AST memiliki sintaksis dan properti yang wajib (seperti tidak ada null locator).
6. **Transformer & Universal JSON**: Mengubah format AST murni menjadi spesifikasi JSON portabel yang rapi per modul.
7. **Selenium IDE Exporter**: Membaca Universal JSON dan membangun format `.side` yang valid.

---

## 3. Prerequisites

Sebelum menjalankan sub-sistem otomasi, pastikan lingkungan kerja Anda memenuhi syarat berikut:
* **Node.js**: Versi 18 atau lebih baru.
* **Package Manager**: npm (bawaan Node.js).
* **Browser Dependencies**: Modul bawaan dari Playwright Chromium.
* **Server Aplikasi (Lokal)**: 
  * Backend API (FastAPI) harus berjalan.
  * Database (PostgreSQL/Supabase) harus dapat diakses.
  * Frontend Web (Vue.js/Vite) harus berjalan.
* **Environment Variables**: Konfigurasi kredensial (seperti email dan sandi user percobaan) terpusat pada file test atau `.env`.

---

## 4. Installation Setup

Ikuti langkah-langkah setup dari nol berikut ini:

1. **Clone dan Buka Project**
   ```bash
   git clone <repo-url>
   cd PAKAR-AIR
   ```
2. **Masuk ke Direktori Automation**
   ```bash
   cd automation
   ```
3. **Install Dependencies**
   ```bash
   npm install
   npx playwright install chromium
   ```
4. **Siapkan Server Aplikasi (di terminal terpisah)**
   * Terminal 1 (Backend): `cd ../server && python run.py` (Berjalan di `localhost:8000`)
   * Terminal 2 (Frontend): `cd ../frontend && npm run dev` (Berjalan di `localhost:5173`)
5. **Cek Konektivitas**
   Pastikan web aplikasi terbuka normal di browser secara manual sebelum melakukan otomasi.

---

## 5. Folder Structure

Struktur direktori di dalam `automation/` sangat ketat dan diorganisasi berdasarkan fungsi:

* **`playwright/`**: Berisi seluruh logika pengujian berbasis Microsoft Playwright.
  * **`tests/`**: Kumpulan *Test Suite* (`*.spec.js`) yang dipecah per modul (auth, analysis, dll).
  * **`pages/`**: Kelas-kelas *Page Object Model* (POM) untuk membungkus logika halaman web.
  * **`locators/`**: Variabel *CSS Selectors* terpusat (contoh: `.btn-login`).
  * **`helpers/`**: Fungsi pendukung (*helper*), seperti *login via API* atau mekanisme *caching* sesi.
* **`parser/`**: Inti dari Runtime Reporter. Menangkap fungsi Playwright saat berjalan.
* **`ast/`**: *Engine* pembuat (*Builder*) dan pemeriksa (*Validator*) Abstract Syntax Tree.
* **`schemas/`**: Menyimpan definisi JSON Schema baku untuk Universal JSON.
* **`exporters/`**: Modul penerjemah dari Universal JSON menuju format eksternal (Selenium `.side`).
* **`docs/`**: Direktori untuk mendokumentasikan spesifikasi QA (*Test Document*) dan arsitektur mesin.
* **`output/`**: (Auto-Generated) Tempat bermuaranya hasil eksekusi (JSON, HTML Reports, dan file Selenium).
* **`test-data/`**: Direktori penyimpanan aset-aset pengujian seperti file gambar PDF, atau JSON statis.

---

## 6. Available Scripts

Berbagai *script* otomatis telah disediakan dalam `package.json`:

| Script | Fungsi | Kapan Dipakai | Output / Efek |
|---|---|---|---|
| `npm run test` | Menjalankan seluruh 115 skenario tes secara paralel (Headless). | Kebutuhan validasi penuh sebelum integrasi/PR. | HTML Report, Traces, Universal JSON |
| `npm run test:headed` | Menjalankan tes dalam mode visual (Browser terbuka). | Keperluan proses *debugging* UI. | Sama seperti di atas (visual terlihat) |
| `npm run test:auth` | Menjalankan khusus direktori tes `/auth/`. | Memperbaiki atau mengetes fitur autentikasi saja. | Hasil *pass/fail* di terminal |
| `npm run test:analysis` | Menjalankan khusus direktori tes `/analysis/`. | Saat modifikasi form atau *upload file*. | Hasil *pass/fail* di terminal |
| `npm run pipeline` | Menjalankan test penuh dilanjutkan otomatis ke tahap *export*. | Pipeline CI/CD atau tahap *Final Delivery*. | Report, Universal JSON, dan `.side` File |
| `npm run export:master` | Melakukan ekspor 1 file Selenium gabungan. | Saat ingin memberikan 1 file ke tim QA. | `output/selenium/pakar-air-master.side` |
| `npm run export:modules` | Melakukan ekspor Selenium terpecah per modul. | Memisahkan file `.side` menjadi lebih modular. | `output/selenium/*.side` |
| `npm run export:all` | Menjalankan ekspor master dan modular sekaligus. | Saat ingin men-generate semua format Selenium. | Semua `.side` file |
| `npm run clean` | Membersihkan paksa semua folder `/output` dan rekam jejak screenshot lawas. | Ketika terjadi penumpukan *cache* / *false negative*. | Direktori menjadi bersih |

---

## 7. Running Automation Tests

Otomasi dijalankan menggunakan Playwright *test runner*.

**Menjalankan Seluruh Modul:**
```bash
npm run test
```
*Script* ini akan memunculkan status `✓` (PASS) atau `✘` (FAIL) untuk tiap *test case*. 

**Menjalankan Mode UI (Melihat Browser):**
```bash
npm run test:headed
```

**Menjalankan Pipeline Penyeluruh (Test + Export Automatis):**
```bash
npm run pipeline
```

**Lokasi Hasil:**
Apabila tes gagal, laporan akan tersimpan di `output/reports/html/`. Anda dapat membukanya dengan:
```bash
npm run report
```

---

## 8. Output Generated

SpeedPlay Runtime Engine bekerja mengumpulkan dan mendistribusikan data ke dalam struktur `output/`:

* **`output/json/`**: Berisi sekumpulan file Universal JSON (contoh: `auth.json`, `analysis.json`). File ini dibuat oleh *Transformer* secara otomatis sesaat setelah sebuah file *spec* Playwright selesai dieksekusi (via hook `onTestEnd`). Jangan memodifikasi file ini secara manual.
* **`output/selenium/`**: Berisi file-file eksport Selenium IDE (`.side`). Terbuat setelah Anda mengeksekusi *script export*.
* **`output/reports/`**: Berisi *HTML Report* bawaan dari Playwright untuk melihat *Trace Viewer* (rekaman interaksi UI dan *network*) serta *screenshot* error.
* **`screenshots/`**: Screenshot UI per tes (jika diaktifkan pada konfigurasi).

Anda boleh menghapus file-file ini (atau menjalankan `npm run clean`) kapan saja sebelum menjalankan `npm run test` ulang.

---

## 9. Selenium Export

Pipeline kami mendukung dua mode ekspor ke format *Selenium IDE*:

### Modular Export (`npm run export:modules`)
* **Kegunaan**: Mengekstrak Universal JSON dan memecahnya berdasarkan modul-modul independen (misal: `auth.side`, `analysis.side`, `history.side`).
* **Kapan Dipakai**: Ketika tim QA fungsional hanya ingin memfokuskan pengujian pada 1 modul spesifik tanpa memuat skenario yang berat.

### Master Export (`npm run export:master`)
* **Kegunaan**: Menggabungkan seluruh JSON dari semua modul tes menjadi satu kesatuan *Master Project File* tunggal (`pakar-air-master.side`).
* **Kapan Dipakai**: Ketika mengemas serah-terima (*handover*) Final Delivery. QA dapat mengimpor 1 file ke Selenium IDE untuk langsung mendapatkan 100+ skenario sekaligus.

**Cara Import ke Selenium IDE:**
1. Pasang plugin peramban Selenium IDE di Chrome/Edge.
2. Klik "Open an existing project".
3. Arahkan dan unggah file berakhiran `.side` dari folder `output/selenium/`.

---

## 10. Adding New Test Cases

Jika Anda sebagai developer perlu menambah fungsionalitas pengujian:

1. **Lokasi File**: Buat atau edit file berekstensi `.spec.js` yang berada di dalam `playwright/tests/`.
2. **Page Objects**: Gunakan *Class* turunan `BasePage` di folder `pages/` (misal: `LoginPage.js`). Jangan menulis interaksi mentah (seperti `page.click('css')`) secara langsung di *file test* agar kode *maintainable*.
3. **Pemisahan Locator**: Daftarkan *CSS Selector* di `playwright/locators/`.
4. **Prefix ID**: Wajib tambahkan standar prefix pengujian di nama *test* (contoh: `Auth — Login › AUTH-POS-001: Pengguna berhasil login...`).
5. **Generasi Otomatis**: Setelah tes selesai dibuat, cukup jalankan `npm run test`. Tidak perlu mengkonfigurasi AST/Parser secara manual, arsitektur *hook* Runtime Reporter akan otomatis menangkap langkah tes Anda menjadi `Universal JSON` lalu `.side`.

---

## 11. Troubleshooting

Berikut masalah umum dan penyelesaiannya secara praktis:

| Gejala | Kemungkinan Penyebab | Solusi Singkat |
|---|---|---|
| **Tes Timeout (Error 60s/15s)** | Backend FastAPI tersumbat atau tidak berjalan. | Pastikan `python run.py` berjalan normal. Hubungkan dan verifikasi `localhost:8000/health`. Cek apakan ada model ML/DL yang mem-*block event loop*. |
| **Gagal Login (Error `toBeTruthy null`)** | Database direset atau akun percobaan dihapus. | Pastikan `userpakarair@gmail.com` dan `adminpakarair@gmail.com` terdapat di *database* Supabase. |
| **`ECONNREFUSED` saat load halaman** | Frontend Vite tidak aktif. | Cek terminal `npm run dev` pada *port* 5173. Sesuaikan dengan `baseURL` di `playwright.config.js`. |
| **Parser/AST Error** | Ada skrip kustom menggunakan *locator* yang tidak valid (contoh *pseudo-class* kompleks Playwright). | Sederhanakan *locator* menggunakan selektor CSS baku agar AST Builder mengenali tag DOM (*tag, id, class*). |
| **Gagal Ekspor Selenium** | File `output/json/` tidak lengkap / modul terhapus. | Jalankan `npm run test` dari awal agar seluruh *Universal JSON* ter-generate sebelum mengekspor. |
| **Browser Tidak Muncul** | Menjalankan tes dalam mode asali (Headless). | Eksekusi `npm run test:headed`. |

---

## 12. Best Practices

Untuk merawat infrastruktur otomasi ini:
* **Gunakan Selector Stabil**: Jangan menggunakan struktur selektor rapuh (seperti `div > span:nth-child(2)`). Tambahkan HTML class spesifik (seperti `.btn-login-submit`).
* **Gunakan Single Source of Truth untuk Kredensial**: Jaga informasi *credential data* test berada di `users.data.js`, jangan lakukan *hard-code* email atau *password* secara sembarangan di banyak file.
* **Test Independence**: Tiap *test* (kecuali *journey/e2e*) dilarang bergantung pada state *test* sebelumnya. Reset state secara proaktif.

---

## 13. Limitations / Known Issues

Batasan teknis yang perlu dimaklumi dari arsitektur saat ini:
* **Drag-and-Drop Limitations**: Fungsi simulasi file menggunakan `page.setInputFiles` diterjemahkan secara khusus oleh parser, namun Selenium IDE mungkin membutuhkan adaptasi manual/plugin *upload file* jika dijalankan melalui rekam IDE murni.
* **Backend State Mutation Mocks**: Segala proses pengkondisian atau pembuatan rute API tiruan (*Mocks/Stubbing API*) tidak akan terekspor menuju Selenium IDE karena format *.side* berfokus pada interaksi antarmuka murni. Ekspor hanya berlaku bagi fungsional E2E sebenarnya.

---

## 14. Final Summary

Otomasi proyek **PAKAR-AIR** mengadopsi standar kontrol-mutu setingkat *Enterprise*. Sub-sistem ini telah menghadirkan:
* **SpeedPlay Runtime Engine** mumpuni untuk menangkap aksi asinkron UI web modern secara senyap.
* **Automated Data Translation** memproduksi `Universal JSON` dan `Selenium IDE Export` murni dari satu basis-kode *Playwright*.
* **115 Test Cases** yang meliputi *Auth, History, Analysis, Profile, Notification, Education*, hingga skenario admin komprehensif.

README ini berfungsi sebagai pusat referensi definitif bagi para **QA, Developer, Reviewer,** dan **Penguji**, yang siap digunakan dalam jangka panjang selama siklus *maintenance* proyek PAKAR-AIR.