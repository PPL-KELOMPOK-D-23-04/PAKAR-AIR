# PAKAR-AIR Automation Testing (SpeedPlay Engine)

Dokumentasi ini menjelaskan arsitektur pengujian UI dan E2E untuk proyek PAKAR-AIR.

## 1. Arsitektur Automation
Sistem pengujian PAKAR-AIR dibangun menggunakan **SpeedPlay Runtime Engine v1.0**, sebuah sistem automasi berbasis Playwright yang memiliki kapabilitas *export* langsung ke format `.side` (Selenium IDE).

### 1.1. Direktori Struktur
- `automation/playwright/tests/`: Tempat semua skenario (`*.spec.js`) ditulis.
- `automation/playwright/pages/`: Page Object Model (POM) untuk abstraksi fungsional UI.
- `automation/playwright/locators/`: CSS Selector statis dan *semantic* dipisahkan dari POM.
- `automation/playwright/helpers/`: Kumpulan fungsi pembantu (_File, Wait, Auth, DB_).
- `automation/parser/`: Mesin SpeedPlay Runtime yang merubah laporan eksekusi Playwright (`results.json`) menjadi format AST Universal dan file Selenium IDE.

## 2. Test Isolation & Auth Strategy
Untuk menghindari masalah Limitasi Rate API dari infrastruktur *Cloud* (Supabase):
- Pengujian **TIDAK** melakukan login UI secara terus menerus (berulang) pada `beforeEach`.
- Menggunakan `storageState` di mana sesi autentikasi (*sessionStorage token*) disimpan ke dalam direktori tersembunyi lokal `.auth/` pada awal pengujian.
- Keuntungan: Stabil, Cepat, dan sesuai representasi aslinya di _Production_.

## 3. Database Reset Strategy
Automation PAKAR-AIR berjalan pada *Live Environment*. Oleh karena itu, *Test Cases* bersifat **Self-Healing**:
- Segala perubahan persisten (contoh: Ubah Password) harus dikembalikan ke *value* aslinya di bagian penutup tes.
- Tidak disarankan menanam skrip SQL `TRUNCATE` melalui client-side karena melanggar aspek *security*.

## 4. Eksekusi Pengujian
Menjalankan tes secara keseluruhan:
```bash
cd automation
npm run test
```

Mengekspor laporan hasil tes ke format Selenium IDE (`.side`):
```bash
npm run parse:single
```
File hasil ekspor dapat ditemukan di folder `automation/output/`.
