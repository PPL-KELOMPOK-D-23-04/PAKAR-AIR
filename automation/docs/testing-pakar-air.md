# PAKAR-AIR MASTER TEST SCENARIO

This document is the SINGLE SOURCE OF TRUTH for all automated testing scenarios.

Functional

Test Case 1

Negative

Test Scenario:
Pengguna gagal mengakses halaman yang dilindungi tanpa autentikasi

Pre Condition:
* Pengguna telah membuka aplikasi web
* Koneksi ke backend server aktif

Step:
1. Buka menu "Dashboard"
2. Buka menu "Buat Analisis"
3. Buka menu "Riwayat Analisis"
4. Buka menu "Profil"
5. Buka menu "Notifikasi"

Expected Result:
Pengguna gagal memproses instruksi sehingga sistem memunculkan pesan peringatan yang sesuai karena mengakses halaman yang dilindungi tanpa autentikasi.

==================================================

Functional

Test Case 2

Negative

Test Scenario:
Pengguna gagal mengakses halaman admin karena login sebagai pengguna biasa

Pre Condition:
* Pengguna telah membuka aplikasi web
* Koneksi ke backend server aktif

Step:
1. Buka menu "Beranda"
2. Buka menu "Dashboard"
3. Buka menu "Dashboard Admin"

Expected Result:
Pengguna gagal memproses instruksi sehingga sistem memunculkan pesan peringatan yang sesuai karena mengakses halaman admin karena login sebagai pengguna biasa.

==================================================

Functional

Test Case 3

Negative

Test Scenario:
Pengguna gagal mengakses halaman masuk karena sudah dalam keadaan masuk

Pre Condition:
* Pengguna telah membuka aplikasi web
* Koneksi ke backend server aktif

Step:
1. Buka menu "Beranda"
2. Buka menu "Dashboard"
3. Buka menu "Masuk"

Expected Result:
Pengguna gagal memproses instruksi sehingga sistem memunculkan pesan peringatan yang sesuai karena mengakses halaman masuk karena sudah dalam keadaan masuk.

==================================================

Functional

Test Case 4

Positive

Test Scenario:
Pengguna berhasil menghapus sesi dan token setelah proses keluar

Pre Condition:
* Pengguna telah membuka aplikasi web
* Koneksi ke backend server aktif

Step:
1. Buka menu "Beranda"
2. Buka menu "Dashboard"

Expected Result:
Pengguna berhasil memproses skenario sehingga menghapus sesi dan token setelah proses keluar dan menampilkan informasi hasil bisnis yang sesuai.

==================================================

Functional

Test Case 5

Negative

Test Scenario:
Pengguna gagal mengakses halaman manajemen admin dengan akun biasa

Pre Condition:
* Pengguna telah membuka aplikasi web
* Koneksi ke backend server aktif

Step:
1. Buka menu "Beranda"
2. Buka menu "Dashboard"
3. Buka menu "Dashboard Admin"
4. Buka menu "Kelola Pengguna"
5. Buka menu "Laporan Analisis"
6. Buka menu "Chatbot Analytics"

Expected Result:
Pengguna gagal memproses instruksi sehingga sistem memunculkan pesan peringatan yang sesuai karena mengakses halaman manajemen admin dengan akun biasa.

==================================================

Functional

Test Case 6

Positive

Test Scenario:
Pengguna gagal memasukkan input berbahaya melalui form pencarian

Pre Condition:
* Pengguna telah membuka aplikasi web
* Koneksi ke backend server aktif

Step:
1. Buka menu "Beranda"
2. Buka menu "Dashboard"
3. Buka menu "Riwayat Analisis"
4. Isi field "Toolbar Pencarian" dengan "<script>alert(1)</script>"

Expected Result:
Pengguna berhasil memproses skenario sehingga pengguna gagal memasukkan input berbahaya melalui form pencarian dan menampilkan informasi hasil bisnis yang sesuai.

==================================================

Functional

Test Case 7

Positive

Test Scenario:
Pengguna admin berhasil melakukan navigasi lengkap pada seluruh halaman manajemen

Pre Condition:
* Pengguna telah membuka aplikasi web
* Koneksi ke backend server aktif

Step:
1. Buka menu "Masuk"
2. Isi field "Email" dengan "adminpakarair@gmail.com"
3. Isi field "Password" dengan "password123"
4. Klik tombol "Login"
5. screenshot pada "Elemen"
6. Buka menu "Kelola Pengguna"
7. screenshot pada "Elemen"
8. Buka menu "Laporan Analisis"
9. screenshot pada "Elemen"
10. Buka menu "Chatbot Analytics"
11. screenshot pada "Elemen"
12. Buka menu "Dashboard Admin"
13. screenshot pada "Elemen"

Expected Result:
Pengguna berhasil memproses skenario sehingga pengguna admin berhasil melakukan navigasi lengkap pada seluruh halaman manajemen dan menampilkan informasi hasil bisnis yang sesuai.

==================================================

Functional

Test Case 8

Positive

Test Scenario:
Pengguna admin berhasil memuat halaman dashboard utama dengan sukses

Pre Condition:
* Pengguna telah membuka aplikasi web
* Koneksi ke backend server aktif

Step:
1. Buka menu "Masuk"
2. Isi field "Email" dengan "adminpakarair@gmail.com"
3. Isi field "Password" dengan "password123"
4. Klik tombol "Login"
5. Buka menu "Dashboard Admin"

Expected Result:
Pengguna berhasil memproses skenario sehingga pengguna admin berhasil memuat halaman dashboard utama dengan sukses dan menampilkan informasi hasil bisnis yang sesuai.

==================================================

Functional

Test Case 9

Positive

Test Scenario:
Pengguna admin berhasil melakukan navigasi ke halaman Kelola Pengguna

Pre Condition:
* Pengguna telah membuka aplikasi web
* Koneksi ke backend server aktif

Step:
1. Buka menu "Beranda"
2. Buka menu "Dashboard"
3. Buka menu "Dashboard Admin"
4. Klik tombol "Btn Manage"

Expected Result:
Pengguna berhasil memproses skenario sehingga pengguna admin berhasil melakukan navigasi ke halaman kelola pengguna dan menampilkan informasi hasil bisnis yang sesuai.

==================================================

Functional

Test Case 10

Negative

Test Scenario:
Pengguna biasa gagal mengakses dashboard admin dan dialihkan ke dashboard utama

Pre Condition:
* Pengguna telah membuka aplikasi web
* Koneksi ke backend server aktif

Step:
1. Buka menu "Masuk"
2. Isi field "Email" dengan "userpakarair@gmail.com"
3. Isi field "Password" dengan "password123"
4. Klik tombol "Login"
5. Buka menu "Dashboard Admin"

Expected Result:
Pengguna gagal memproses instruksi sehingga sistem memunculkan pesan peringatan yang sesuai karena pengguna biasa gagal mengakses dashboard admin dan dialihkan ke dashboard utama.

==================================================

Functional

Test Case 11

Negative

Test Scenario:
Pengguna gagal mengakses dashboard admin tanpa autentikasi login

Pre Condition:
* Pengguna telah membuka aplikasi web
* Koneksi ke backend server aktif

Step:
1. Buka menu "Dashboard Admin"

Expected Result:
Pengguna gagal memproses instruksi sehingga sistem memunculkan pesan peringatan yang sesuai karena mengakses dashboard admin tanpa autentikasi login.

==================================================

Functional

Test Case 12

Positive

Test Scenario:
Pengguna admin berhasil melihat daftar pengguna terdaftar pada halaman Kelola Pengguna

Pre Condition:
* Pengguna telah membuka aplikasi web
* Koneksi ke backend server aktif

Step:
1. Buka menu "Beranda"
2. Buka menu "Dashboard"
3. Buka menu "Kelola Pengguna"

Expected Result:
Pengguna berhasil memproses skenario sehingga pengguna admin berhasil melihat daftar pengguna terdaftar pada halaman kelola pengguna dan menampilkan informasi hasil bisnis yang sesuai.

==================================================

Functional

Test Case 13

Positive

Test Scenario:
Pengguna admin berhasil memuat halaman Laporan Analisis tanpa kendala

Pre Condition:
* Pengguna telah membuka aplikasi web
* Koneksi ke backend server aktif

Step:
1. Buka menu "Beranda"
2. Buka menu "Dashboard"
3. Buka menu "Laporan Analisis"

Expected Result:
Pengguna berhasil memproses skenario sehingga pengguna admin berhasil memuat halaman laporan analisis tanpa kendala dan menampilkan informasi hasil bisnis yang sesuai.

==================================================

Functional

Test Case 14

Positive

Test Scenario:
Pengguna admin berhasil memuat antarmuka Chatbot Analytics

Pre Condition:
* Pengguna telah membuka aplikasi web
* Koneksi ke backend server aktif

Step:
1. Buka menu "Beranda"
2. Buka menu "Dashboard"
3. Buka menu "Chatbot Analytics"

Expected Result:
Pengguna berhasil memproses skenario sehingga pengguna admin berhasil memuat antarmuka chatbot analytics dan menampilkan informasi hasil bisnis yang sesuai.

==================================================

Functional

Test Case 15

Positive

Test Scenario:
Pengguna admin berhasil menavigasi ke halaman laporan melalui pintasan aksi cepat

Pre Condition:
* Pengguna telah membuka aplikasi web
* Koneksi ke backend server aktif

Step:
1. Buka menu "Beranda"
2. Buka menu "Dashboard"
3. Buka menu "Dashboard Admin"
4. Klik tombol "a[href="/admin/reports"]"

Expected Result:
Pengguna berhasil memproses skenario sehingga pengguna admin berhasil menavigasi ke halaman laporan melalui pintasan aksi cepat dan menampilkan informasi hasil bisnis yang sesuai.

==================================================

Functional

Test Case 16

Positive

Test Scenario:
Pengguna berhasil melihat halaman edukasi dan daftar artikel

Pre Condition:
* Pengguna telah membuka aplikasi web
* Koneksi ke backend server aktif

Step:
1. Buka menu "/education"
2. Klik tombol "Article Card"

Expected Result:
Pengguna berhasil memproses skenario sehingga melihat halaman edukasi dan daftar artikel dan menampilkan informasi hasil bisnis yang sesuai.

==================================================

Functional

Test Case 17

Negative

Test Scenario:
Pengguna gagal menemukan artikel saat mencari kata kunci tidak valid

Pre Condition:
* Pengguna telah membuka aplikasi web
* Koneksi ke backend server aktif

Step:
1. Buka menu "/education"
2. Isi field "Search Input" dengan "zzzzz999nonexistent"

Expected Result:
Pengguna gagal memproses instruksi sehingga sistem memunculkan pesan peringatan yang sesuai karena menemukan artikel saat mencari kata kunci tidak valid.

==================================================

Functional

Test Case 18

Positive

Test Scenario:
Pengguna berhasil mengekspor riwayat analisis ke format PDF

Pre Condition:
* Pengguna telah membuka aplikasi web
* Koneksi ke backend server aktif

Step:
1. Buka menu "Riwayat Analisis"
2. Klik tombol "Btn Export"
3. Klik tombol "Format Card"

Expected Result:
Pengguna berhasil memproses skenario sehingga mengekspor riwayat analisis ke format pdf dan menampilkan informasi hasil bisnis yang sesuai.

==================================================

Functional

Test Case 19

Negative

Test Scenario:
Pengguna gagal mengekspor PDF saat data tidak tersedia

Pre Condition:
* Pengguna telah membuka aplikasi web
* Koneksi ke backend server aktif

Step:
1. Buka menu "Riwayat Analisis"
2. Isi field "Search Input" dengan "zzzzzzzzz_empty_data_123"

Expected Result:
Pengguna gagal memproses instruksi sehingga sistem memunculkan pesan peringatan yang sesuai karena mengekspor pdf saat data tidak tersedia.

==================================================

Functional

Test Case 20

Positive

Test Scenario:
Pengguna berhasil login menggunakan kredensial valid hingga diarahkan ke dashboard

Pre Condition:
* Pengguna telah membuka aplikasi web
* Koneksi ke backend server aktif

Step:
1. Buka menu "Masuk"
2. Isi field "Email" dengan "userpakarair@gmail.com"
3. Isi field "Password" dengan "password123"
4. Klik tombol "Login"

Expected Result:
Pengguna berhasil memproses skenario sehingga login menggunakan kredensial valid hingga diarahkan ke dashboard dan menampilkan informasi hasil bisnis yang sesuai.

==================================================

Functional

Test Case 21

Positive

Test Scenario:
Pengguna berhasil login menggunakan akun admin hingga diarahkan ke dasbor admin

Pre Condition:
* Pengguna telah membuka aplikasi web
* Koneksi ke backend server aktif

Step:
1. Buka menu "Masuk"
2. Isi field "Email" dengan "adminpakarair@gmail.com"
3. Isi field "Password" dengan "password123"
4. Klik tombol "Login"

Expected Result:
Pengguna berhasil memproses skenario sehingga login menggunakan akun admin hingga diarahkan ke dasbor admin dan menampilkan informasi hasil bisnis yang sesuai.

==================================================

Functional

Test Case 22

Negative

Test Scenario:
Pengguna gagal login karena email dan password kosong

Pre Condition:
* Pengguna telah membuka aplikasi web
* Koneksi ke backend server aktif

Step:
1. Buka menu "Masuk"
2. Klik tombol "Login"

Expected Result:
Pengguna gagal memproses instruksi sehingga sistem memunculkan pesan peringatan yang sesuai karena login karena email dan password kosong.

==================================================

Functional

Test Case 23

Negative

Test Scenario:
Pengguna gagal login karena email tidak terdaftar di sistem

Pre Condition:
* Pengguna telah membuka aplikasi web
* Koneksi ke backend server aktif

Step:
1. Buka menu "Masuk"
2. Isi field "Email" dengan "nonexistent@fake.com"
3. Isi field "Password" dengan "WrongPassword!"
4. Klik tombol "Login"

Expected Result:
Pengguna gagal memproses instruksi sehingga sistem memunculkan pesan peringatan yang sesuai karena login karena email tidak terdaftar di sistem.

==================================================

Functional

Test Case 24

Negative

Test Scenario:
Pengguna gagal login karena memasukkan password yang salah

Pre Condition:
* Pengguna telah membuka aplikasi web
* Koneksi ke backend server aktif

Step:
1. Buka menu "Masuk"
2. Isi field "Email" dengan "userpakarair@gmail.com"
3. Isi field "Password" dengan "WrongPassword!"
4. Klik tombol "Login"

Expected Result:
Pengguna gagal memproses instruksi sehingga sistem memunculkan pesan peringatan yang sesuai karena login karena memasukkan password yang salah.

==================================================

Functional

Test Case 25

Negative

Test Scenario:
Pengguna gagal login karena format email tidak sesuai standar (EP)

Pre Condition:
* Pengguna telah membuka aplikasi web
* Koneksi ke backend server aktif

Step:
1. Buka menu "Masuk"
2. Isi field "Email" dengan "no-at-sign"
3. Isi field "Password" dengan "Test@12345"
4. Klik tombol "Login"

Expected Result:
Pengguna gagal memproses instruksi sehingga sistem memunculkan pesan peringatan yang sesuai karena login karena format email tidak sesuai standar (ep).

==================================================

Functional

Test Case 26

Positive

Test Scenario:
Pengguna berhasil memasukkan email yang valid (EP)

Pre Condition:
* Pengguna telah membuka aplikasi web
* Koneksi ke backend server aktif

Step:
1. Buka menu "Masuk"
2. Isi field "Email" dengan "valid@email.com"
3. Isi field "Password" dengan "Test@12345"
4. Klik tombol "Login"

Expected Result:
Pengguna berhasil memproses skenario sehingga memasukkan email yang valid (ep) dan menampilkan informasi hasil bisnis yang sesuai.

==================================================

Functional

Test Case 27

Negative

Test Scenario:
Pengguna gagal login karena email null (EP)

Pre Condition:
* Pengguna telah membuka aplikasi web
* Koneksi ke backend server aktif

Step:
1. Buka menu "Masuk"
2. Isi field "Password" dengan "Test@12345"
3. Klik tombol "Login"

Expected Result:
Pengguna gagal memproses instruksi sehingga sistem memunculkan pesan peringatan yang sesuai karena login karena email null (ep).

==================================================

Functional

Test Case 28

Negative

Test Scenario:
Pengguna gagal login karena email tidak memiliki domain (EP)

Pre Condition:
* Pengguna telah membuka aplikasi web
* Koneksi ke backend server aktif

Step:
1. Buka menu "Masuk"
2. Isi field "Email" dengan "invalidemailaddress"
3. Isi field "Password" dengan "Test@12345"
4. Klik tombol "Login"

Expected Result:
Pengguna gagal memproses instruksi sehingga sistem memunculkan pesan peringatan yang sesuai karena login karena email tidak memiliki domain (ep).

==================================================

Functional

Test Case 29

Positive

Test Scenario:
Pengguna berhasil keluar dari aplikasi secara aman

Pre Condition:
* Pengguna telah membuka aplikasi web
* Koneksi ke backend server aktif

Step:
1. Buka menu "Beranda"
2. Buka menu "Dashboard"

Expected Result:
Pengguna berhasil memproses skenario sehingga keluar dari aplikasi secara aman dan menampilkan informasi hasil bisnis yang sesuai.

==================================================

Functional

Test Case 30

Positive

Test Scenario:
Pengguna gagal mengakses dashboard setelah proses keluar selesai

Pre Condition:
* Pengguna telah membuka aplikasi web
* Koneksi ke backend server aktif

Step:
1. Buka menu "Beranda"
2. Buka menu "Dashboard"
3. Buka menu "Dashboard"

Expected Result:
Pengguna berhasil memproses skenario sehingga pengguna gagal mengakses dashboard setelah proses keluar selesai dan menampilkan informasi hasil bisnis yang sesuai.

==================================================

Functional

Test Case 31

Negative

Test Scenario:
Pengguna berhasil menyelesaikan siklus masuk dan keluar aplikasi

Pre Condition:
* Pengguna telah membuka aplikasi web
* Koneksi ke backend server aktif

Step:
1. Buka menu "Beranda"
2. Buka menu "Dashboard"

Expected Result:
Pengguna gagal memproses instruksi sehingga sistem memunculkan pesan peringatan yang sesuai karena pengguna berhasil menyelesaikan siklus masuk dan keluar aplikasi.

==================================================

Functional

Test Case 32

Positive

Test Scenario:
Pengguna berhasil membuka halaman notifikasi aplikasi

Pre Condition:
* Pengguna telah membuka aplikasi web
* Koneksi ke backend server aktif

Step:
1. Buka menu "Beranda"
2. Buka menu "Dashboard"
3. Buka menu "Notifikasi"

Expected Result:
Pengguna berhasil memproses skenario sehingga membuka halaman notifikasi aplikasi dan menampilkan informasi hasil bisnis yang sesuai.

==================================================

Functional

Test Case 33

Positive

Test Scenario:
Pengguna berhasil menandai notifikasi masuk sebagai telah dibaca

Pre Condition:
* Pengguna telah membuka aplikasi web
* Koneksi ke backend server aktif

Step:
1. Buka menu "Beranda"
2. Buka menu "Dashboard"
3. Buka menu "Notifikasi"
4. Klik tombol "Notification Card  Unread')first()locator('btn  Sm"

Expected Result:
Pengguna berhasil memproses skenario sehingga menandai notifikasi masuk sebagai telah dibaca dan menampilkan informasi hasil bisnis yang sesuai.

==================================================

Functional

Test Case 34

Positive

Test Scenario:
Pengguna berhasil melihat status kosong saat tidak terdapat notifikasi

Pre Condition:
* Pengguna telah membuka aplikasi web
* Koneksi ke backend server aktif

Step:
1. Buka menu "Beranda"
2. Buka menu "Dashboard"

Expected Result:
Pengguna berhasil memproses skenario sehingga melihat status kosong saat tidak terdapat notifikasi dan menampilkan informasi hasil bisnis yang sesuai.

==================================================

Functional

Test Case 35

Positive

Test Scenario:
Pengguna berhasil melihat indikator visual pada notifikasi yang belum dibaca

Pre Condition:
* Pengguna telah membuka aplikasi web
* Koneksi ke backend server aktif

Step:
1. Buka menu "Beranda"
2. Buka menu "Dashboard"
3. Buka menu "Notifikasi"

Expected Result:
Pengguna berhasil memproses skenario sehingga melihat indikator visual pada notifikasi yang belum dibaca dan menampilkan informasi hasil bisnis yang sesuai.

==================================================

Functional

Test Case 36

Positive

Test Scenario:
Pengguna berhasil mengisi seluruh parameter analisis kualitas air secara lengkap

Pre Condition:
* Pengguna telah membuka aplikasi web
* Koneksi ke backend server aktif

Step:
1. Buka menu "Masuk"
2. Isi field "Email" dengan "userpakarair@gmail.com"
3. Isi field "Password" dengan "password123"
4. Klik tombol "Login"

Expected Result:
Pengguna berhasil melihat hasil prediksi kualitas air (Prediction Result) secara detail beserta kategorinya tanpa terdapat error.

==================================================

Equivalence Partitioning (EP)

Test Case 37

Positive

Test Scenario:
Pengguna berhasil memasukkan nilai derajat keasaman (pH) yang valid

Pre Condition:
* Pengguna telah membuka aplikasi web
* Koneksi ke backend server aktif

Step:
1. Buka menu "Beranda"
2. Buka menu "Dashboard"
3. Buka menu "Buat Analisis"
4. Isi field "pH" dengan "7"

Expected Result:
Pengguna berhasil melihat hasil prediksi kualitas air (Prediction Result) secara detail beserta kategorinya tanpa terdapat error.

==================================================

Equivalence Partitioning (EP)

Test Case 38

Negative

Test Scenario:
Pengguna gagal memasukkan nilai derajat keasaman (pH) negatif yang tidak valid

Pre Condition:
* Pengguna telah membuka aplikasi web
* Koneksi ke backend server aktif

Step:
1. Buka menu "Beranda"
2. Buka menu "Dashboard"
3. Buka menu "Buat Analisis"
4. Isi field "pH" dengan "-1"

Expected Result:
Pengguna gagal memproses instruksi sehingga sistem memunculkan pesan peringatan yang sesuai karena memasukkan nilai derajat keasaman (ph) negatif yang tidak valid.

==================================================

Boundary Value Analysis (BVA)

Test Case 39

Positive

Test Scenario:
Pengguna berhasil memasukkan nilai derajat keasaman (pH) pada batas bawah ekstrem

Pre Condition:
* Pengguna telah membuka aplikasi web
* Koneksi ke backend server aktif

Step:
1. Buka menu "Beranda"
2. Buka menu "Dashboard"
3. Buka menu "Buat Analisis"
4. Isi field "pH" dengan "0"

Expected Result:
Pengguna berhasil melihat hasil prediksi kualitas air (Prediction Result) secara detail beserta kategorinya tanpa terdapat error.

==================================================

Boundary Value Analysis (BVA)

Test Case 40

Positive

Test Scenario:
Pengguna berhasil memasukkan nilai derajat keasaman (pH) pada batas atas ekstrem

Pre Condition:
* Pengguna telah membuka aplikasi web
* Koneksi ke backend server aktif

Step:
1. Buka menu "Beranda"
2. Buka menu "Dashboard"
3. Buka menu "Buat Analisis"
4. Isi field "pH" dengan "14"

Expected Result:
Pengguna berhasil melihat hasil prediksi kualitas air (Prediction Result) secara detail beserta kategorinya tanpa terdapat error.

==================================================

Boundary Value Analysis (BVA)

Test Case 41

Positive

Test Scenario:
Pengguna gagal memasukkan nilai derajat keasaman (pH) yang melampaui batas atas maksimal

Pre Condition:
* Pengguna telah membuka aplikasi web
* Koneksi ke backend server aktif

Step:
1. Buka menu "Beranda"
2. Buka menu "Dashboard"
3. Buka menu "Buat Analisis"
4. Isi field "pH" dengan "14.01"

Expected Result:
Pengguna berhasil melihat hasil prediksi kualitas air (Prediction Result) secara detail beserta kategorinya tanpa terdapat error.

==================================================

Functional

Test Case 42

Negative

Test Scenario:
Pengguna gagal memasukkan karakter teks pada formulir analisis parameter kimia

Pre Condition:
* Pengguna telah membuka aplikasi web
* Koneksi ke backend server aktif

Step:
1. Buka menu "Beranda"
2. Buka menu "Dashboard"
3. Buka menu "Buat Analisis"
4. Isi field "pH" dengan "abc"

Expected Result:
Pengguna gagal memproses instruksi sehingga sistem memunculkan pesan peringatan yang sesuai karena memasukkan karakter teks pada formulir analisis parameter kimia.

==================================================

Equivalence Partitioning (EP)

Test Case 43

Positive

Test Scenario:
Pengguna berhasil memasukkan nilai tingkat kekerasan air (Hardness) yang valid

Pre Condition:
* Pengguna telah membuka aplikasi web
* Koneksi ke backend server aktif

Step:
1. Buka menu "Beranda"
2. Buka menu "Dashboard"
3. Buka menu "Buat Analisis"
4. Isi field "Hardness" dengan "200"

Expected Result:
Pengguna berhasil melihat hasil prediksi kualitas air (Prediction Result) secara detail beserta kategorinya tanpa terdapat error.

==================================================

Equivalence Partitioning (EP)

Test Case 44

Negative

Test Scenario:
Pengguna gagal memasukkan nilai kekerasan air (Hardness) negatif yang tidak valid

Pre Condition:
* Pengguna telah membuka aplikasi web
* Koneksi ke backend server aktif

Step:
1. Buka menu "Beranda"
2. Buka menu "Dashboard"
3. Buka menu "Buat Analisis"
4. Isi field "Hardness" dengan "-5"

Expected Result:
Pengguna gagal memproses instruksi sehingga sistem memunculkan pesan peringatan yang sesuai karena memasukkan nilai kekerasan air (hardness) negatif yang tidak valid.

==================================================

Equivalence Partitioning (EP)

Test Case 45

Positive

Test Scenario:
Pengguna berhasil memasukkan nilai zat padat terlarut (Solids) yang valid

Pre Condition:
* Pengguna telah membuka aplikasi web
* Koneksi ke backend server aktif

Step:
1. Buka menu "Beranda"
2. Buka menu "Dashboard"
3. Buka menu "Buat Analisis"
4. Isi field "Solids" dengan "20000"

Expected Result:
Pengguna berhasil melihat hasil prediksi kualitas air (Prediction Result) secara detail beserta kategorinya tanpa terdapat error.

==================================================

Equivalence Partitioning (EP)

Test Case 46

Negative

Test Scenario:
Pengguna gagal memasukkan nilai zat padat terlarut (Solids) negatif yang tidak valid

Pre Condition:
* Pengguna telah membuka aplikasi web
* Koneksi ke backend server aktif

Step:
1. Buka menu "Beranda"
2. Buka menu "Dashboard"
3. Buka menu "Buat Analisis"
4. Isi field "Solids" dengan "-10"

Expected Result:
Pengguna gagal memproses instruksi sehingga sistem memunculkan pesan peringatan yang sesuai karena memasukkan nilai zat padat terlarut (solids) negatif yang tidak valid.

==================================================

Equivalence Partitioning (EP)

Test Case 47

Positive

Test Scenario:
Pengguna berhasil memasukkan nilai kloramin (Chloramines) yang valid

Pre Condition:
* Pengguna telah membuka aplikasi web
* Koneksi ke backend server aktif

Step:
1. Buka menu "Beranda"
2. Buka menu "Dashboard"
3. Buka menu "Buat Analisis"
4. Isi field "Chloramines" dengan "7.5"

Expected Result:
Pengguna berhasil melihat hasil prediksi kualitas air (Prediction Result) secara detail beserta kategorinya tanpa terdapat error.

==================================================

Equivalence Partitioning (EP)

Test Case 48

Negative

Test Scenario:
Pengguna gagal memasukkan nilai kloramin (Chloramines) negatif yang tidak valid

Pre Condition:
* Pengguna telah membuka aplikasi web
* Koneksi ke backend server aktif

Step:
1. Buka menu "Beranda"
2. Buka menu "Dashboard"
3. Buka menu "Buat Analisis"
4. Isi field "Chloramines" dengan "-1"

Expected Result:
Pengguna gagal memproses instruksi sehingga sistem memunculkan pesan peringatan yang sesuai karena memasukkan nilai kloramin (chloramines) negatif yang tidak valid.

==================================================

Equivalence Partitioning (EP)

Test Case 49

Positive

Test Scenario:
Pengguna berhasil memasukkan nilai sulfat (Sulfate) yang valid

Pre Condition:
* Pengguna telah membuka aplikasi web
* Koneksi ke backend server aktif

Step:
1. Buka menu "Beranda"
2. Buka menu "Dashboard"
3. Buka menu "Buat Analisis"
4. Isi field "Sulfate" dengan "300"

Expected Result:
Pengguna berhasil melihat hasil prediksi kualitas air (Prediction Result) secara detail beserta kategorinya tanpa terdapat error.

==================================================

Equivalence Partitioning (EP)

Test Case 50

Negative

Test Scenario:
Pengguna gagal memasukkan nilai sulfat (Sulfate) negatif yang tidak valid

Pre Condition:
* Pengguna telah membuka aplikasi web
* Koneksi ke backend server aktif

Step:
1. Buka menu "Beranda"
2. Buka menu "Dashboard"
3. Buka menu "Buat Analisis"
4. Isi field "Sulfate" dengan "-20"

Expected Result:
Pengguna gagal memproses instruksi sehingga sistem memunculkan pesan peringatan yang sesuai karena memasukkan nilai sulfat (sulfate) negatif yang tidak valid.

==================================================

Equivalence Partitioning (EP)

Test Case 51

Positive

Test Scenario:
Pengguna berhasil memasukkan nilai daya hantar listrik (Conductivity) yang valid

Pre Condition:
* Pengguna telah membuka aplikasi web
* Koneksi ke backend server aktif

Step:
1. Buka menu "Beranda"
2. Buka menu "Dashboard"
3. Buka menu "Buat Analisis"
4. Isi field "Conductivity" dengan "400"

Expected Result:
Pengguna berhasil melihat hasil prediksi kualitas air (Prediction Result) secara detail beserta kategorinya tanpa terdapat error.

==================================================

Equivalence Partitioning (EP)

Test Case 52

Negative

Test Scenario:
Pengguna gagal memasukkan nilai daya hantar listrik (Conductivity) negatif yang tidak valid

Pre Condition:
* Pengguna telah membuka aplikasi web
* Koneksi ke backend server aktif

Step:
1. Buka menu "Beranda"
2. Buka menu "Dashboard"
3. Buka menu "Buat Analisis"
4. Isi field "Conductivity" dengan "-2"

Expected Result:
Pengguna gagal memproses instruksi sehingga sistem memunculkan pesan peringatan yang sesuai karena memasukkan nilai daya hantar listrik (conductivity) negatif yang tidak valid.

==================================================

Equivalence Partitioning (EP)

Test Case 53

Positive

Test Scenario:
Pengguna berhasil memasukkan nilai karbon organik (Organic Carbon) yang valid

Pre Condition:
* Pengguna telah membuka aplikasi web
* Koneksi ke backend server aktif

Step:
1. Buka menu "Beranda"
2. Buka menu "Dashboard"
3. Buka menu "Buat Analisis"
4. Isi field "Organic Carbon" dengan "12"

Expected Result:
Pengguna berhasil melihat hasil prediksi kualitas air (Prediction Result) secara detail beserta kategorinya tanpa terdapat error.

==================================================

Equivalence Partitioning (EP)

Test Case 54

Negative

Test Scenario:
Pengguna gagal memasukkan nilai karbon organik (Organic Carbon) negatif yang tidak valid

Pre Condition:
* Pengguna telah membuka aplikasi web
* Koneksi ke backend server aktif

Step:
1. Buka menu "Beranda"
2. Buka menu "Dashboard"
3. Buka menu "Buat Analisis"
4. Isi field "Organic Carbon" dengan "-1"

Expected Result:
Pengguna gagal memproses instruksi sehingga sistem memunculkan pesan peringatan yang sesuai karena memasukkan nilai karbon organik (organic carbon) negatif yang tidak valid.

==================================================

Equivalence Partitioning (EP)

Test Case 55

Positive

Test Scenario:
Pengguna berhasil memasukkan nilai trihalometana (Trihalomethanes) yang valid

Pre Condition:
* Pengguna telah membuka aplikasi web
* Koneksi ke backend server aktif

Step:
1. Buka menu "Beranda"
2. Buka menu "Dashboard"
3. Buka menu "Buat Analisis"
4. Isi field "Trihalomethanes" dengan "70"

Expected Result:
Pengguna berhasil melihat hasil prediksi kualitas air (Prediction Result) secara detail beserta kategorinya tanpa terdapat error.

==================================================

Equivalence Partitioning (EP)

Test Case 56

Negative

Test Scenario:
Pengguna gagal memasukkan nilai trihalometana (Trihalomethanes) negatif yang tidak valid

Pre Condition:
* Pengguna telah membuka aplikasi web
* Koneksi ke backend server aktif

Step:
1. Buka menu "Beranda"
2. Buka menu "Dashboard"
3. Buka menu "Buat Analisis"
4. Isi field "Trihalomethanes" dengan "-5"

Expected Result:
Pengguna gagal memproses instruksi sehingga sistem memunculkan pesan peringatan yang sesuai karena memasukkan nilai trihalometana (trihalomethanes) negatif yang tidak valid.

==================================================

Equivalence Partitioning (EP)

Test Case 57

Positive

Test Scenario:
Pengguna berhasil memasukkan nilai kekeruhan air (Turbidity) yang valid

Pre Condition:
* Pengguna telah membuka aplikasi web
* Koneksi ke backend server aktif

Step:
1. Buka menu "Beranda"
2. Buka menu "Dashboard"
3. Buka menu "Buat Analisis"
4. Isi field "Turbidity" dengan "4"

Expected Result:
Pengguna berhasil melihat hasil prediksi kualitas air (Prediction Result) secara detail beserta kategorinya tanpa terdapat error.

==================================================

Equivalence Partitioning (EP)

Test Case 58

Negative

Test Scenario:
Pengguna gagal memasukkan nilai kekeruhan air (Turbidity) negatif yang tidak valid

Pre Condition:
* Pengguna telah membuka aplikasi web
* Koneksi ke backend server aktif

Step:
1. Buka menu "Beranda"
2. Buka menu "Dashboard"
3. Buka menu "Buat Analisis"
4. Isi field "Turbidity" dengan "-1"

Expected Result:
Pengguna gagal memproses instruksi sehingga sistem memunculkan pesan peringatan yang sesuai karena memasukkan nilai kekeruhan air (turbidity) negatif yang tidak valid.

==================================================

Boundary Value Analysis (BVA)

Test Case 59

Positive

Test Scenario:
Pengguna gagal memasukkan nilai derajat keasaman (pH) yang kurang dari batas bawah minimal

Pre Condition:
* Pengguna telah membuka aplikasi web
* Koneksi ke backend server aktif

Step:
1. Buka menu "Beranda"
2. Buka menu "Dashboard"
3. Buka menu "Buat Analisis"
4. Isi field "pH" dengan "-0.01"

Expected Result:
Pengguna berhasil melihat hasil prediksi kualitas air (Prediction Result) secara detail beserta kategorinya tanpa terdapat error.

==================================================

Functional

Test Case 60

Positive

Test Scenario:
Pengguna berhasil mendaftar menggunakan data registrasi yang valid lengkap

Pre Condition:
* Pengguna telah membuka aplikasi web
* Koneksi ke backend server aktif

Step:
1. Buka menu "Daftar"
2. Isi field "Full_name" dengan "Test User 1780315290637"
3. Isi field "Username" dengan "user_1780315290637"
4. Isi field "Email" dengan "testuser_1780315290637@pakar-air.com"
5. Isi field "Password" dengan "Test@12345"
6. Klik tombol "Submit"

Expected Result:
Pengguna berhasil memproses skenario sehingga mendaftar menggunakan data registrasi yang valid lengkap dan menampilkan informasi hasil bisnis yang sesuai.

==================================================

Functional

Test Case 61

Negative

Test Scenario:
Pengguna gagal mendaftar karena semua field wajib dikosongkan

Pre Condition:
* Pengguna telah membuka aplikasi web
* Koneksi ke backend server aktif

Step:
1. Buka menu "Daftar"
2. Klik tombol "Submit"

Expected Result:
Pengguna gagal memproses instruksi sehingga sistem memunculkan pesan peringatan yang sesuai karena mendaftar karena semua field wajib dikosongkan.

==================================================

Functional

Test Case 62

Negative

Test Scenario:
Pengguna gagal mendaftar karena nama lengkap dikosongkan

Pre Condition:
* Pengguna telah membuka aplikasi web
* Koneksi ke backend server aktif

Step:
1. Buka menu "Daftar"
2. Isi field "Username" dengan "user_1780315296819"
3. Isi field "Email" dengan "testuser_1780315296819@pakar-air.com"
4. Isi field "Password" dengan "Test@12345"
5. Klik tombol "Submit"

Expected Result:
Pengguna gagal memproses instruksi sehingga sistem memunculkan pesan peringatan yang sesuai karena mendaftar karena nama lengkap dikosongkan.

==================================================

Functional

Test Case 63

Negative

Test Scenario:
Pengguna gagal mendaftar karena username dikosongkan

Pre Condition:
* Pengguna telah membuka aplikasi web
* Koneksi ke backend server aktif

Step:
1. Buka menu "Daftar"
2. Isi field "Full_name" dengan "Test User"
3. Isi field "Email" dengan "test@test.com"
4. Isi field "Password" dengan "Test@12345"
5. Klik tombol "Submit"

Expected Result:
Pengguna gagal memproses instruksi sehingga sistem memunculkan pesan peringatan yang sesuai karena mendaftar karena username dikosongkan.

==================================================

Functional

Test Case 64

Negative

Test Scenario:
Pengguna gagal mendaftar karena username kurang dari batas minimum (BVA)

Pre Condition:
* Pengguna telah membuka aplikasi web
* Koneksi ke backend server aktif

Step:
1. Buka menu "Daftar"
2. Isi field "Full_name" dengan "Test User"
3. Isi field "Username" dengan "ab"
4. Isi field "Email" dengan "test@test.com"
5. Isi field "Password" dengan "Test@12345"
6. Klik tombol "Submit"

Expected Result:
Pengguna gagal memproses instruksi sehingga sistem memunculkan pesan peringatan yang sesuai karena mendaftar karena username kurang dari batas minimum (bva).

==================================================

Functional

Test Case 65

Negative

Test Scenario:
Pengguna gagal mendaftar karena memasukkan email dengan format yang tidak valid

Pre Condition:
* Pengguna telah membuka aplikasi web
* Koneksi ke backend server aktif

Step:
1. Buka menu "Daftar"
2. Isi field "Full_name" dengan "Test User"
3. Isi field "Username" dengan "testuser"
4. Isi field "Email" dengan "invalid-email"
5. Isi field "Password" dengan "Test@12345"
6. Klik tombol "Submit"

Expected Result:
Pengguna gagal memproses instruksi sehingga sistem memunculkan pesan peringatan yang sesuai karena mendaftar karena memasukkan email dengan format yang tidak valid.

==================================================

Functional

Test Case 66

Negative

Test Scenario:
Pengguna gagal mendaftar karena password kurang dari batas minimum (BVA)

Pre Condition:
* Pengguna telah membuka aplikasi web
* Koneksi ke backend server aktif

Step:
1. Buka menu "Daftar"
2. Isi field "Full_name" dengan "Test User"
3. Isi field "Username" dengan "testuser"
4. Isi field "Email" dengan "test@test.com"
5. Isi field "Password" dengan "12345"
6. Klik tombol "Submit"

Expected Result:
Pengguna gagal memproses instruksi sehingga sistem memunculkan pesan peringatan yang sesuai karena mendaftar karena password kurang dari batas minimum (bva).

==================================================

Functional

Test Case 67

Positive

Test Scenario:
Pengguna berhasil mendaftar dengan username tepat di batas minimum (BVA)

Pre Condition:
* Pengguna telah membuka aplikasi web
* Koneksi ke backend server aktif

Step:
1. Buka menu "Daftar"
2. Isi field "Full_name" dengan "Test User"
3. Isi field "Username" dengan "usr"
4. Isi field "Email" dengan "testuser_1780315309533@pakar-air.com"
5. Isi field "Password" dengan "Test@12345"
6. Klik tombol "Submit"

Expected Result:
Pengguna berhasil memproses skenario sehingga mendaftar dengan username tepat di batas minimum (bva) dan menampilkan informasi hasil bisnis yang sesuai.

==================================================

Functional

Test Case 68

Positive

Test Scenario:
Pengguna berhasil mendaftar dengan password tepat di batas minimum (BVA)

Pre Condition:
* Pengguna telah membuka aplikasi web
* Koneksi ke backend server aktif

Step:
1. Buka menu "Daftar"
2. Isi field "Full_name" dengan "Test User"
3. Isi field "Username" dengan "user_1780315314930"
4. Isi field "Email" dengan "testuser_1780315314930@pakar-air.com"
5. Isi field "Password" dengan "123456"
6. Klik tombol "Submit"

Expected Result:
Pengguna berhasil memproses skenario sehingga mendaftar dengan password tepat di batas minimum (bva) dan menampilkan informasi hasil bisnis yang sesuai.

==================================================

Functional

Test Case 69

Negative

Test Scenario:
Pengguna gagal mendaftar karena username melebihi batas maksimum (BVA)

Pre Condition:
* Pengguna telah membuka aplikasi web
* Koneksi ke backend server aktif

Step:
1. Buka menu "Daftar"
2. Isi field "Full_name" dengan "Test User"
3. Isi field "Username" dengan "thisusernameiswaytoolong"
4. Isi field "Email" dengan "test@test.com"
5. Isi field "Password" dengan "Test@12345"
6. Klik tombol "Submit"

Expected Result:
Pengguna gagal memproses instruksi sehingga sistem memunculkan pesan peringatan yang sesuai karena mendaftar karena username melebihi batas maksimum (bva).

==================================================

Functional

Test Case 70

Negative

Test Scenario:
Pengguna gagal mendaftar karena email sudah terdaftar di sistem

Pre Condition:
* Pengguna telah membuka aplikasi web
* Koneksi ke backend server aktif

Step:
1. Buka menu "Daftar"
2. Isi field "Full_name" dengan "Test User"
3. Isi field "Username" dengan "testuser2"
4. Isi field "Email" dengan "user@pakarair.com"
5. Isi field "Password" dengan "Test@12345"
6. Klik tombol "Submit"

Expected Result:
Pengguna gagal memproses instruksi sehingga sistem memunculkan pesan peringatan yang sesuai karena mendaftar karena email sudah terdaftar di sistem.

==================================================

Functional

Test Case 71

Positive

Test Scenario:
Pengguna berhasil mendaftar dengan username tepat di batas maksimum (BVA)

Pre Condition:
* Pengguna telah membuka aplikasi web
* Koneksi ke backend server aktif

Step:
1. Buka menu "Daftar"
2. Isi field "Full_name" dengan "Test User"
3. Isi field "Username" dengan "abcdefghijklmnopqrst"
4. Isi field "Email" dengan "testuser_1780315331992@pakar-air.com"
5. Isi field "Password" dengan "Test@12345"
6. Klik tombol "Submit"

Expected Result:
Pengguna berhasil memproses skenario sehingga mendaftar dengan username tepat di batas maksimum (bva) dan menampilkan informasi hasil bisnis yang sesuai.

==================================================

Functional

Test Case 72

Positive

Test Scenario:
Pengguna berhasil mendaftar dengan password tepat di batas maksimum (BVA)

Pre Condition:
* Pengguna telah membuka aplikasi web
* Koneksi ke backend server aktif

Step:
1. Buka menu "Daftar"
2. Isi field "Full_name" dengan "Test User"
3. Isi field "Username" dengan "user_1780315338538"
4. Isi field "Email" dengan "testuser_1780315338538@pakar-air.com"
5. Isi field "Password" dengan "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"
6. Klik tombol "Submit"

Expected Result:
Pengguna berhasil memproses skenario sehingga mendaftar dengan password tepat di batas maksimum (bva) dan menampilkan informasi hasil bisnis yang sesuai.

==================================================

Functional

Test Case 73

Positive

Test Scenario:
Pengguna berhasil melihat daftar riwayat analisis

Pre Condition:
* Pengguna telah membuka aplikasi web
* Koneksi ke backend server aktif

Step:
1. Buka menu "Beranda"
2. Buka menu "Dashboard"
3. Buka menu "Riwayat Analisis"

Expected Result:
Pengguna berhasil memproses skenario sehingga melihat daftar riwayat analisis dan menampilkan informasi hasil bisnis yang sesuai.

==================================================

Functional

Test Case 74

Positive

Test Scenario:
Pengguna berhasil mencari riwayat analisis berdasarkan kata kunci yang valid

Pre Condition:
* Pengguna telah membuka aplikasi web
* Koneksi ke backend server aktif

Step:
1. Buka menu "Beranda"
2. Buka menu "Dashboard"
3. Buka menu "Riwayat Analisis"
4. Isi field "input[type="text"].toolbar-input" dengan "a"

Expected Result:
Pengguna berhasil memproses skenario sehingga mencari riwayat analisis berdasarkan kata kunci yang valid dan menampilkan informasi hasil bisnis yang sesuai.

==================================================

Functional

Test Case 75

Positive

Test Scenario:
Pengguna berhasil memfilter riwayat analisis berdasarkan kategori

Pre Condition:
* Pengguna telah membuka aplikasi web
* Koneksi ke backend server aktif

Step:
1. Buka menu "Beranda"
2. Buka menu "Dashboard"
3. Buka menu "Riwayat Analisis"
4. Pilih opsi "" pada dropdown "Toolbar Select"

Expected Result:
Pengguna berhasil memproses skenario sehingga memfilter riwayat analisis berdasarkan kategori dan menampilkan informasi hasil bisnis yang sesuai.

==================================================

Functional

Test Case 76

Positive

Test Scenario:
Pengguna berhasil memfilter riwayat analisis berdasarkan rentang tanggal

Pre Condition:
* Pengguna telah membuka aplikasi web
* Koneksi ke backend server aktif

Step:
1. Buka menu "Beranda"
2. Buka menu "Dashboard"
3. Buka menu "Riwayat Analisis"
4. Isi field "input[type="date"].toolbar-input" dengan "2026-05-29"

Expected Result:
Pengguna berhasil memproses skenario sehingga memfilter riwayat analisis berdasarkan rentang tanggal dan menampilkan informasi hasil bisnis yang sesuai.

==================================================

Functional

Test Case 77

Positive

Test Scenario:
Pengguna berhasil melakukan navigasi pagination pada riwayat analisis

Pre Condition:
* Pengguna telah membuka aplikasi web
* Koneksi ke backend server aktif

Step:
1. Buka menu "Beranda"
2. Buka menu "Dashboard"
3. Buka menu "Riwayat Analisis"

Expected Result:
Pengguna berhasil memproses skenario sehingga melakukan navigasi pagination pada riwayat analisis dan menampilkan informasi hasil bisnis yang sesuai.

==================================================

Functional

Test Case 78

Positive

Test Scenario:
Pengguna berhasil mengekspor riwayat analisis ke format eksternal

Pre Condition:
* Pengguna telah membuka aplikasi web
* Koneksi ke backend server aktif

Step:
1. Buka menu "Beranda"
2. Buka menu "Dashboard"
3. Buka menu "Riwayat Analisis"

Expected Result:
Pengguna berhasil memproses skenario sehingga mengekspor riwayat analisis ke format eksternal dan menampilkan informasi hasil bisnis yang sesuai.

==================================================

Functional

Test Case 79

Positive

Test Scenario:
Pengguna berhasil membuka detail riwayat prediksi kualitas air

Pre Condition:
* Pengguna telah membuka aplikasi web
* Koneksi ke backend server aktif

Step:
1. Buka menu "Beranda"
2. Buka menu "Dashboard"
3. Buka menu "Riwayat Analisis"

Expected Result:
Pengguna berhasil memproses skenario sehingga membuka detail riwayat prediksi kualitas air dan menampilkan informasi hasil bisnis yang sesuai.

==================================================

Functional

Test Case 80

Negative

Test Scenario:
Pengguna gagal menemukan riwayat analisis karena kata kunci pencarian tidak valid

Pre Condition:
* Pengguna telah membuka aplikasi web
* Koneksi ke backend server aktif

Step:
1. Buka menu "Beranda"
2. Buka menu "Dashboard"
3. Buka menu "Riwayat Analisis"
4. Isi field "input[type="text"].toolbar-input" dengan "zzzzz999nonexistent"

Expected Result:
Pengguna gagal memproses instruksi sehingga sistem memunculkan pesan peringatan yang sesuai karena menemukan riwayat analisis karena kata kunci pencarian tidak valid.

==================================================

Functional

Test Case 81

Negative

Test Scenario:
Pengguna gagal memfilter riwayat analisis karena kombinasi filter tidak menghasilkan data

Pre Condition:
* Pengguna telah membuka aplikasi web
* Koneksi ke backend server aktif

Step:
1. Buka menu "Beranda"
2. Buka menu "Dashboard"
3. Buka menu "Riwayat Analisis"
4. Pilih opsi "" pada dropdown "Toolbar Select"
5. Isi field "input[type="date"].toolbar-input" dengan "2000-01-01"

Expected Result:
Pengguna gagal memproses instruksi sehingga sistem memunculkan pesan peringatan yang sesuai karena memfilter riwayat analisis karena kombinasi filter tidak menghasilkan data.

==================================================

Functional

Test Case 82

Positive

Test Scenario:
Pengguna berhasil menghapus filter aktif sehingga data riwayat kembali normal

Pre Condition:
* Pengguna telah membuka aplikasi web
* Koneksi ke backend server aktif

Step:
1. Buka menu "Beranda"
2. Buka menu "Dashboard"
3. Buka menu "Riwayat Analisis"
4. Isi field "input[type="text"].toolbar-input" dengan "test"
5. Pilih opsi "" pada dropdown "Toolbar Select"
6. Klik tombol "Btn Clear Filter"

Expected Result:
Pengguna berhasil memproses skenario sehingga menghapus filter aktif sehingga data riwayat kembali normal dan menampilkan informasi hasil bisnis yang sesuai.

==================================================

Functional

Test Case 83

Positive

Test Scenario:
Pengguna berhasil melakukan analisis kualitas air hingga hasil prediksi ditampilkan

Pre Condition:
* Pengguna telah membuka aplikasi web
* Koneksi ke backend server aktif

Step:
1. Buka menu "Beranda"
2. Buka menu "Dashboard"
3. Buka menu "Buat Analisis"
4. Isi field "pH" dengan "7"
5. Isi field "Hardness" dengan "204.89"
6. Isi field "Solids" dengan "20791.31"
7. Isi field "Chloramines" dengan "7.3"
8. Isi field "Sulfate" dengan "368.51"
9. Isi field "Conductivity" dengan "564.31"
10. Isi field "Organic Carbon" dengan "10.37"
11. Isi field "Trihalomethanes" dengan "86.99"
12. Isi field "Turbidity" dengan "2.96"
13. Klik tombol "Btn Process"

Expected Result:
Pengguna berhasil melihat hasil prediksi kualitas air (Prediction Result) secara detail beserta kategorinya tanpa terdapat error.

==================================================

Functional

Test Case 84

Negative

Test Scenario:
Pengguna gagal melakukan analisis kualitas air karena tidak mengunggah file gambar

Pre Condition:
* Pengguna telah membuka aplikasi web
* Koneksi ke backend server aktif

Step:
1. Buka menu "Beranda"
2. Buka menu "Dashboard"
3. Buka menu "Buat Analisis"
4. Isi field "pH" dengan "7"
5. Isi field "Hardness" dengan "204.89"
6. Isi field "Solids" dengan "20791.31"
7. Isi field "Chloramines" dengan "7.3"
8. Isi field "Sulfate" dengan "368.51"
9. Isi field "Conductivity" dengan "564.31"
10. Isi field "Organic Carbon" dengan "10.37"
11. Isi field "Trihalomethanes" dengan "86.99"
12. Isi field "Turbidity" dengan "2.96"
13. Klik tombol "Btn Process"

Expected Result:
Pengguna gagal memproses instruksi sehingga sistem memunculkan pesan peringatan yang sesuai karena melakukan analisis kualitas air karena tidak mengunggah file gambar.

==================================================

Functional

Test Case 85

Positive

Test Scenario:
Pengguna berhasil mereset form analisis ke kondisi kosong

Pre Condition:
* Pengguna telah membuka aplikasi web
* Koneksi ke backend server aktif

Step:
1. Buka menu "Beranda"
2. Buka menu "Dashboard"
3. Buka menu "Buat Analisis"
4. Isi field "pH" dengan "7"
5. Isi field "Hardness" dengan "204.89"
6. Isi field "Solids" dengan "20791.31"
7. Isi field "Chloramines" dengan "7.3"
8. Isi field "Sulfate" dengan "368.51"
9. Isi field "Conductivity" dengan "564.31"
10. Isi field "Organic Carbon" dengan "10.37"
11. Isi field "Trihalomethanes" dengan "86.99"
12. Isi field "Turbidity" dengan "2.96"
13. Klik tombol "button.btn--secondary"

Expected Result:
Pengguna berhasil melihat hasil prediksi kualitas air (Prediction Result) secara detail beserta kategorinya tanpa terdapat error.

==================================================

Functional

Test Case 86

Negative

Test Scenario:
Pengguna gagal melakukan analisis karena parameter wajib dikosongkan

Pre Condition:
* Pengguna telah membuka aplikasi web
* Koneksi ke backend server aktif

Step:
1. Buka menu "Beranda"
2. Buka menu "Dashboard"
3. Buka menu "Buat Analisis"
4. Klik tombol "Btn Process"

Expected Result:
Pengguna gagal memproses instruksi sehingga sistem memunculkan pesan peringatan yang sesuai karena melakukan analisis karena parameter wajib dikosongkan.

==================================================

Functional

Test Case 87

Negative

Test Scenario:
Pengguna gagal melakukan analisis karena parameter tidak diisi lengkap

Pre Condition:
* Pengguna telah membuka aplikasi web
* Koneksi ke backend server aktif

Step:
1. Buka menu "Beranda"
2. Buka menu "Dashboard"
3. Buka menu "Buat Analisis"
4. Isi field "pH" dengan "7"
5. Klik tombol "Btn Process"

Expected Result:
Pengguna gagal memproses instruksi sehingga sistem memunculkan pesan peringatan yang sesuai karena melakukan analisis karena parameter tidak diisi lengkap.

==================================================

Functional

Test Case 88

Positive

Test Scenario:
Pengguna berhasil melihat detail Prediction Result secara mendalam

Pre Condition:
* Pengguna telah membuka aplikasi web
* Koneksi ke backend server aktif

Step:
1. Buka menu "Beranda"
2. Buka menu "Dashboard"
3. Buka menu "Buat Analisis"
4. Isi field "pH" dengan "7"
5. Isi field "Hardness" dengan "204.89"
6. Isi field "Solids" dengan "20791.31"
7. Isi field "Chloramines" dengan "7.3"
8. Isi field "Sulfate" dengan "368.51"
9. Isi field "Conductivity" dengan "564.31"
10. Isi field "Organic Carbon" dengan "10.37"
11. Isi field "Trihalomethanes" dengan "86.99"
12. Isi field "Turbidity" dengan "2.96"
13. Klik tombol "Btn Process"

Expected Result:
Pengguna berhasil melihat hasil prediksi kualitas air (Prediction Result) secara detail beserta kategorinya tanpa terdapat error.

==================================================

Functional

Test Case 89

Positive

Test Scenario:
Pengguna berhasil kembali ke dasbor setelah melihat hasil analisis

Pre Condition:
* Pengguna telah membuka aplikasi web
* Koneksi ke backend server aktif

Step:
1. Buka menu "Beranda"
2. Buka menu "Dashboard"
3. Buka menu "Buat Analisis"
4. Isi field "pH" dengan "7"
5. Isi field "Hardness" dengan "204.89"
6. Isi field "Solids" dengan "20791.31"
7. Isi field "Chloramines" dengan "7.3"
8. Isi field "Sulfate" dengan "368.51"
9. Isi field "Conductivity" dengan "564.31"
10. Isi field "Organic Carbon" dengan "10.37"
11. Isi field "Trihalomethanes" dengan "86.99"
12. Isi field "Turbidity" dengan "2.96"
13. Klik tombol "Btn Process"
14. Klik tombol "a[href="/dashboard"], a[href="/"]"

Expected Result:
Pengguna berhasil melihat hasil prediksi kualitas air (Prediction Result) secara detail beserta kategorinya tanpa terdapat error.

==================================================

Functional

Test Case 90

Positive

Test Scenario:
Pengguna berhasil membuka dan melihat halaman profil pribadi

Pre Condition:
* Pengguna telah membuka aplikasi web
* Koneksi ke backend server aktif

Step:
1. Buka menu "Beranda"
2. Buka menu "Dashboard"
3. Buka menu "Profil"

Expected Result:
Pengguna berhasil memproses skenario sehingga membuka dan melihat halaman profil pribadi dan menampilkan informasi hasil bisnis yang sesuai.

==================================================

Functional

Test Case 91

Positive

Test Scenario:
Pengguna berhasil memperbarui nama lengkap pada profil

Pre Condition:
* Pengguna telah membuka aplikasi web
* Koneksi ke backend server aktif

Step:
1. Buka menu "Beranda"
2. Buka menu "Dashboard"
3. Buka menu "Profil"
4. Isi field "Teks" dengan "Updated Name Test"
5. Klik tombol "Btn Save"

Expected Result:
Pengguna berhasil memproses skenario sehingga memperbarui nama lengkap pada profil dan menampilkan informasi hasil bisnis yang sesuai.

==================================================

Functional

Test Case 92

Negative

Test Scenario:
Pengguna gagal memperbarui profil saat nama pengguna terlalu pendek

Pre Condition:
* Pengguna telah membuka aplikasi web
* Koneksi ke backend server aktif

Step:
1. Buka menu "Beranda"
2. Buka menu "Dashboard"
3. Buka menu "Profil"
4. Isi field "Teks" dengan "ab"
5. Klik tombol "Btn Save"

Expected Result:
Pengguna gagal memproses instruksi sehingga sistem memunculkan pesan peringatan yang sesuai karena memperbarui profil saat nama pengguna terlalu pendek.

==================================================

Functional

Test Case 93

Positive

Test Scenario:
Pengguna berhasil bernavigasi melalui opsi-opsi pada halaman pengaturan profil

Pre Condition:
* Pengguna telah membuka aplikasi web
* Koneksi ke backend server aktif

Step:
1. Buka menu "Beranda"
2. Buka menu "Dashboard"
3. Buka menu "Profil"
4. Klik tombol "Nav Item:nth Child(2)"

Expected Result:
Pengguna berhasil memproses skenario sehingga bernavigasi melalui opsi-opsi pada halaman pengaturan profil dan menampilkan informasi hasil bisnis yang sesuai.

==================================================

Functional

Test Case 94

Negative

Test Scenario:
Pengguna gagal mengganti kata sandi saat kata sandi lama tidak diisi

Pre Condition:
* Pengguna telah membuka aplikasi web
* Koneksi ke backend server aktif

Step:
1. Buka menu "Beranda"
2. Buka menu "Dashboard"
3. Buka menu "Profil"
4. Klik tombol "Nav Item:nth Child(2)"
5. Isi field "Masukkan kata sandi saat ini" dengan ""
6. Isi field "Minimal 8 karakter" dengan "NewPass@123"
7. Isi field "Ketik ulang kata sandi baru" dengan "NewPass@123"
8. Klik tombol "Btn Save"

Expected Result:
Pengguna gagal memproses instruksi sehingga sistem memunculkan pesan peringatan yang sesuai karena mengganti kata sandi saat kata sandi lama tidak diisi.

==================================================

Functional

Test Case 95

Negative

Test Scenario:
Pengguna gagal mengganti kata sandi saat kata sandi konfirmasi tidak sesuai

Pre Condition:
* Pengguna telah membuka aplikasi web
* Koneksi ke backend server aktif

Step:
1. Buka menu "Beranda"
2. Buka menu "Dashboard"
3. Buka menu "Profil"
4. Klik tombol "Nav Item:nth Child(2)"
5. Isi field "Masukkan kata sandi saat ini" dengan "password123"
6. Isi field "Minimal 8 karakter" dengan "NewPass@123"
7. Isi field "Ketik ulang kata sandi baru" dengan "DifferentPass"
8. Klik tombol "Btn Save"

Expected Result:
Pengguna gagal memproses instruksi sehingga sistem memunculkan pesan peringatan yang sesuai karena mengganti kata sandi saat kata sandi konfirmasi tidak sesuai.

==================================================

Functional

Test Case 96

Positive

Test Scenario:
Pengguna berhasil memperbarui foto profil menggunakan berkas gambar yang sah

Pre Condition:
* Pengguna telah membuka aplikasi web
* Koneksi ke backend server aktif

Step:
1. Buka menu "Beranda"
2. Buka menu "Dashboard"
3. Buka menu "Profil"

Expected Result:
Pengguna berhasil memproses skenario sehingga memperbarui foto profil menggunakan berkas gambar yang sah dan menampilkan informasi hasil bisnis yang sesuai.

==================================================

Functional

Test Case 97

Positive

Test Scenario:
Pengguna berhasil memperbarui kata sandi dengan keamanan yang memenuhi syarat

Pre Condition:
* Pengguna telah membuka aplikasi web
* Koneksi ke backend server aktif

Step:
1. Buka menu "Beranda"
2. Buka menu "Dashboard"
3. Buka menu "Profil"
4. Klik tombol "Nav Item:nth Child(2)"
5. Isi field "Masukkan kata sandi saat ini" dengan "password123"
6. Isi field "Minimal 8 karakter" dengan "NewValidPass!23"
7. Isi field "Ketik ulang kata sandi baru" dengan "NewValidPass!23"
8. Klik tombol "Btn Save"
9. Klik tombol "Nav Item:nth Child(2)"
10. Isi field "Masukkan kata sandi saat ini" dengan "NewValidPass!23"
11. Isi field "Minimal 8 karakter" dengan "password123"
12. Isi field "Ketik ulang kata sandi baru" dengan "password123"
13. Klik tombol "Btn Save"

Expected Result:
Pengguna berhasil memproses skenario sehingga memperbarui kata sandi dengan keamanan yang memenuhi syarat dan menampilkan informasi hasil bisnis yang sesuai.

==================================================

Functional

Test Case 98

Positive

Test Scenario:
Pengguna berhasil mengubah preferensi notifikasi pada akun

Pre Condition:
* Pengguna telah membuka aplikasi web
* Koneksi ke backend server aktif

Step:
1. Buka menu "Beranda"
2. Buka menu "Dashboard"
3. Buka menu "Profil"
4. Klik tombol "Nav Item:nth Child(3)"
5. Klik tombol "Notification Item:nth Child(1) Slider"
6. Klik tombol "text=Simpan Preferensi"

Expected Result:
Pengguna berhasil memproses skenario sehingga mengubah preferensi notifikasi pada akun dan menampilkan informasi hasil bisnis yang sesuai.

==================================================

Functional

Test Case 99

Negative

Test Scenario:
Pengguna gagal mengunggah foto profil yang melampaui batas ukuran maksimal

Pre Condition:
* Pengguna telah membuka aplikasi web
* Koneksi ke backend server aktif

Step:
1. Buka menu "Beranda"
2. Buka menu "Dashboard"
3. Buka menu "Profil"

Expected Result:
Pengguna gagal memproses instruksi sehingga sistem memunculkan pesan peringatan yang sesuai karena mengunggah foto profil yang melampaui batas ukuran maksimal.

==================================================

Functional

Test Case 100

Negative

Test Scenario:
Pengguna gagal mengunggah foto profil yang tidak berformat gambar yang sah

Pre Condition:
* Pengguna telah membuka aplikasi web
* Koneksi ke backend server aktif

Step:
1. Buka menu "Beranda"
2. Buka menu "Dashboard"
3. Buka menu "Profil"

Expected Result:
Pengguna gagal memproses instruksi sehingga sistem memunculkan pesan peringatan yang sesuai karena mengunggah foto profil yang tidak berformat gambar yang sah.

==================================================

Functional

Test Case 101

Negative

Test Scenario:
Pengguna gagal mengganti kata sandi saat kata sandi baru terlalu pendek

Pre Condition:
* Pengguna telah membuka aplikasi web
* Koneksi ke backend server aktif

Step:
1. Buka menu "Beranda"
2. Buka menu "Dashboard"
3. Buka menu "Profil"
4. Klik tombol "Nav Item:nth Child(2)"
5. Isi field "Masukkan kata sandi saat ini" dengan "password123"
6. Isi field "Minimal 8 karakter" dengan "1234567"
7. Isi field "Ketik ulang kata sandi baru" dengan "1234567"
8. Klik tombol "Btn Save"

Expected Result:
Pengguna gagal memproses instruksi sehingga sistem memunculkan pesan peringatan yang sesuai karena mengganti kata sandi saat kata sandi baru terlalu pendek.

==================================================

Functional

Test Case 102

Negative

Test Scenario:
Pengguna gagal memperbarui profil saat nama pengguna dikosongkan

Pre Condition:
* Pengguna telah membuka aplikasi web
* Koneksi ke backend server aktif

Step:
1. Buka menu "Beranda"
2. Buka menu "Dashboard"
3. Buka menu "Profil"
4. Isi field "Teks" dengan ""
5. Klik tombol "Btn Save"

Expected Result:
Pengguna gagal memproses instruksi sehingga sistem memunculkan pesan peringatan yang sesuai karena memperbarui profil saat nama pengguna dikosongkan.

==================================================

Boundary Value Analysis (BVA)

Test Case 103

Positive

Test Scenario:
Pengguna berhasil memperbarui profil menggunakan nama dengan panjang minimal

Pre Condition:
* Pengguna telah membuka aplikasi web
* Koneksi ke backend server aktif

Step:
1. Buka menu "Beranda"
2. Buka menu "Dashboard"
3. Buka menu "Profil"
4. Isi field "Teks" dengan "Ani"
5. Klik tombol "Btn Save"

Expected Result:
Pengguna berhasil memproses skenario sehingga memperbarui profil menggunakan nama dengan panjang minimal dan menampilkan informasi hasil bisnis yang sesuai.

==================================================

Boundary Value Analysis (BVA)

Test Case 104

Positive

Test Scenario:
Pengguna berhasil memperbarui kata sandi baru dengan panjang minimal

Pre Condition:
* Pengguna telah membuka aplikasi web
* Koneksi ke backend server aktif

Step:
1. Buka menu "Beranda"
2. Buka menu "Dashboard"
3. Buka menu "Profil"
4. Klik tombol "Nav Item:nth Child(2)"
5. Isi field "Masukkan kata sandi saat ini" dengan "password123"
6. Isi field "Minimal 8 karakter" dengan "12345678"
7. Isi field "Ketik ulang kata sandi baru" dengan "12345678"
8. Klik tombol "Btn Save"
9. Klik tombol "Nav Item:nth Child(2)"
10. Isi field "Masukkan kata sandi saat ini" dengan "12345678"
11. Isi field "Minimal 8 karakter" dengan "password123"
12. Isi field "Ketik ulang kata sandi baru" dengan "password123"
13. Klik tombol "Btn Save"

Expected Result:
Pengguna berhasil memproses skenario sehingga memperbarui kata sandi baru dengan panjang minimal dan menampilkan informasi hasil bisnis yang sesuai.

==================================================

Functional

Test Case 105

Positive

Test Scenario:
Pengguna berhasil mengunggah berkas gambar pendukung dan melihat pratinjau hasil

Pre Condition:
* Pengguna telah membuka aplikasi web
* Koneksi ke backend server aktif

Step:
1. Buka menu "Beranda"
2. Buka menu "Dashboard"
3. Buka menu "Buat Analisis"

Expected Result:
Pengguna berhasil melihat hasil prediksi kualitas air (Prediction Result) secara detail beserta kategorinya tanpa terdapat error.

==================================================

Functional

Test Case 106

Positive

Test Scenario:
Pengguna berhasil mengubah berkas gambar pendukung dan melihat pratinjau yang baru

Pre Condition:
* Pengguna telah membuka aplikasi web
* Koneksi ke backend server aktif

Step:
1. Buka menu "Beranda"
2. Buka menu "Dashboard"
3. Buka menu "Buat Analisis"
4. Klik tombol "Btn Change"

Expected Result:
Pengguna berhasil melihat hasil prediksi kualitas air (Prediction Result) secara detail beserta kategorinya tanpa terdapat error.

==================================================

Functional

Test Case 107

Negative

Test Scenario:
Pengguna gagal mengunggah dokumen analisis yang tidak berformat gambar

Pre Condition:
* Pengguna telah membuka aplikasi web
* Koneksi ke backend server aktif

Step:
1. Buka menu "Beranda"
2. Buka menu "Dashboard"
3. Buka menu "Buat Analisis"

Expected Result:
Pengguna gagal memproses instruksi sehingga sistem memunculkan pesan peringatan yang sesuai karena mengunggah dokumen analisis yang tidak berformat gambar.

==================================================

Functional

Test Case 108

Negative

Test Scenario:
Pengguna gagal mengunggah berkas gambar analisis yang melampaui batas ukuran maksimal

Pre Condition:
* Pengguna telah membuka aplikasi web
* Koneksi ke backend server aktif

Step:
1. Buka menu "Beranda"
2. Buka menu "Dashboard"
3. Buka menu "Buat Analisis"

Expected Result:
Pengguna gagal memproses instruksi sehingga sistem memunculkan pesan peringatan yang sesuai karena mengunggah berkas gambar analisis yang melampaui batas ukuran maksimal.

==================================================

Boundary Value Analysis (BVA)

Test Case 109

Positive

Test Scenario:
Pengguna berhasil mengunggah berkas gambar analisis pada batas ukuran maksimal yang diizinkan

Pre Condition:
* Pengguna telah membuka aplikasi web
* Koneksi ke backend server aktif

Step:
1. Buka menu "Beranda"
2. Buka menu "Dashboard"
3. Buka menu "Buat Analisis"

Expected Result:
Pengguna berhasil melihat hasil prediksi kualitas air (Prediction Result) secara detail beserta kategorinya tanpa terdapat error.

==================================================

Functional

Test Case 110

Positive

Test Scenario:
Pengguna berhasil mengunggah berkas format gambar portabel (PNG) dan melihat pratinjau

Pre Condition:
* Pengguna telah membuka aplikasi web
* Koneksi ke backend server aktif

Step:
1. Buka menu "Beranda"
2. Buka menu "Dashboard"
3. Buka menu "Buat Analisis"

Expected Result:
Pengguna berhasil melihat hasil prediksi kualitas air (Prediction Result) secara detail beserta kategorinya tanpa terdapat error.

==================================================

Functional

Test Case 111

Positive

Test Scenario:
Pengguna berhasil mengunggah berkas gambar melalui mekanisme tarik dan lepas (drag-and-drop)

Pre Condition:
* Pengguna telah membuka aplikasi web
* Koneksi ke backend server aktif

Step:
1. Buka menu "Beranda"
2. Buka menu "Dashboard"
3. Buka menu "Buat Analisis"

Expected Result:
Pengguna berhasil melihat hasil prediksi kualitas air (Prediction Result) secara detail beserta kategorinya tanpa terdapat error.

==================================================

Functional

Test Case 112

Negative

Test Scenario:
Pengguna gagal mengunggah berkas gambar pendukung yang rusak (corrupt)

Pre Condition:
* Pengguna telah membuka aplikasi web
* Koneksi ke backend server aktif

Step:
1. Buka menu "Beranda"
2. Buka menu "Dashboard"
3. Buka menu "Buat Analisis"

Expected Result:
Pengguna gagal memproses instruksi sehingga sistem memunculkan pesan peringatan yang sesuai karena mengunggah berkas gambar pendukung yang rusak (corrupt).

==================================================

Boundary Value Analysis (BVA)

Test Case 113

Positive

Test Scenario:
Pengguna berhasil mengunggah berkas gambar analisis dengan ukuran sangat kecil (minimal)

Pre Condition:
* Pengguna telah membuka aplikasi web
* Koneksi ke backend server aktif

Step:
1. Buka menu "Beranda"
2. Buka menu "Dashboard"
3. Buka menu "Buat Analisis"

Expected Result:
Pengguna berhasil melihat hasil prediksi kualitas air (Prediction Result) secara detail beserta kategorinya tanpa terdapat error.

==================================================

Boundary Value Analysis (BVA)

Test Case 114

Negative

Test Scenario:
Pengguna gagal mengunggah berkas analisis yang sedikit melampaui batas maksimal

Pre Condition:
* Pengguna telah membuka aplikasi web
* Koneksi ke backend server aktif

Step:
1. Buka menu "Beranda"
2. Buka menu "Dashboard"
3. Buka menu "Buat Analisis"

Expected Result:
Pengguna gagal memproses instruksi sehingga sistem memunculkan pesan peringatan yang sesuai karena mengunggah berkas analisis yang sedikit melampaui batas maksimal.

==================================================

Functional

Test Case 115

Positive

Test Scenario:
Pengguna berhasil mensimulasikan penggunaan aplikasi dari tahap pendaftaran hingga keluar

Pre Condition:
* Pengguna telah membuka aplikasi web
* Koneksi ke backend server aktif

Step:
1. Buka menu "Daftar"
2. Isi field "Full_name" dengan "Test User 1780315301782"
3. Isi field "Username" dengan "user_1780315301782"
4. Isi field "Email" dengan "testuser_1780315301782@pakar-air.com"
5. Isi field "Password" dengan "Test@12345"
6. Klik tombol "Submit"
7. Isi field "Email" dengan "testuser_1780315301782@pakar-air.com"
8. Isi field "Password" dengan "Test@12345"
9. Klik tombol "Login"
10. Buka menu "Buat Analisis"
11. Isi field "pH" dengan "7"
12. Isi field "Hardness" dengan "204.89"
13. Isi field "Solids" dengan "20791.31"
14. Isi field "Chloramines" dengan "7.3"
15. Isi field "Sulfate" dengan "368.51"
16. Isi field "Conductivity" dengan "564.31"
17. Isi field "Organic Carbon" dengan "10.37"
18. Isi field "Trihalomethanes" dengan "86.99"
19. Isi field "Turbidity" dengan "2.96"
20. Klik tombol "Btn Process"
21. Buka menu "Riwayat Analisis"
22. Buka menu "Dashboard"
23. screenshot pada "Elemen"

Expected Result:
Pengguna berhasil memproses skenario sehingga mensimulasikan penggunaan aplikasi dari tahap pendaftaran hingga keluar dan menampilkan informasi hasil bisnis yang sesuai.

==================================================

## MASTER TABLE

Website : PAKAR-AIR
Page : Keseluruhan Aplikasi
Teknik Testing :
* Boundary Value Analysis (BVA)
* Equivalence Partitioning (EP)
* Functional
* End-to-End (E2E)

| Scenario ID | Case ID | Test Scenario | Type | Test Case | Pre Condition | Steps | Steps Description | Expected Result | Status (Passed/Failed) | Feedback |
|---|---|---|---|---|---|---|---|---|---|---|
| SEC-001 | TC-1 | Pengguna gagal mengakses halaman yang dilindungi tanpa autentikasi | Negative | Pengguna gagal mengakses halaman yang dilindungi tanpa autentikasi | Aplikasi Berjalan | Langkah sesuai UI | - | Pengguna gagal memproses instruksi sehingga sistem memunculkan pesan peringatan yang sesuai karena mengakses halaman yang dilindungi tanpa autentikasi. | Passed | * |
| SEC-002 | TC-2 | Pengguna gagal mengakses halaman admin karena login sebagai pengguna biasa | Negative | Pengguna gagal mengakses halaman admin karena login sebagai pengguna biasa | Aplikasi Berjalan | Langkah sesuai UI | - | Pengguna gagal memproses instruksi sehingga sistem memunculkan pesan peringatan yang sesuai karena mengakses halaman admin karena login sebagai pengguna biasa. | Passed | * |
| SEC-003 | TC-3 | Pengguna gagal mengakses halaman masuk karena sudah dalam keadaan masuk | Negative | Pengguna gagal mengakses halaman masuk karena sudah dalam keadaan masuk | Aplikasi Berjalan | Langkah sesuai UI | - | Pengguna gagal memproses instruksi sehingga sistem memunculkan pesan peringatan yang sesuai karena mengakses halaman masuk karena sudah dalam keadaan masuk. | Passed | * |
| SEC-004 | TC-4 | Pengguna berhasil menghapus sesi dan token setelah proses keluar | Positive | Pengguna berhasil menghapus sesi dan token setelah proses keluar | Aplikasi Berjalan | Langkah sesuai UI | - | Pengguna berhasil memproses skenario sehingga menghapus sesi dan token setelah proses keluar dan menampilkan informasi hasil bisnis yang sesuai. | Passed | * |
| ADM-SEC-001 | TC-5 | Pengguna gagal mengakses halaman manajemen admin dengan akun biasa | Negative | Pengguna gagal mengakses halaman manajemen admin dengan akun biasa | Aplikasi Berjalan | Langkah sesuai UI | - | Pengguna gagal memproses instruksi sehingga sistem memunculkan pesan peringatan yang sesuai karena mengakses halaman manajemen admin dengan akun biasa. | Passed | * |
| SEC-006 | TC-6 | Pengguna gagal memasukkan input berbahaya melalui form pencarian | Positive | Pengguna gagal memasukkan input berbahaya melalui form pencarian | Aplikasi Berjalan | Langkah sesuai UI | - | Pengguna berhasil memproses skenario sehingga pengguna gagal memasukkan input berbahaya melalui form pencarian dan menampilkan informasi hasil bisnis yang sesuai. | Passed | * |
| E2E-002 | TC-7 | Pengguna admin berhasil melakukan navigasi lengkap pada seluruh halaman manajemen | Positive | Pengguna admin berhasil melakukan navigasi lengkap pada seluruh halaman manajemen | Aplikasi Berjalan | Langkah sesuai UI | - | Pengguna berhasil memproses skenario sehingga pengguna admin berhasil melakukan navigasi lengkap pada seluruh halaman manajemen dan menampilkan informasi hasil bisnis yang sesuai. | Passed | * |
| Pengguna admin berhasil memuat halaman dashboard utama dengan sukses | TC-8 | Pengguna admin berhasil memuat halaman dashboard utama dengan sukses | Positive | Pengguna admin berhasil memuat halaman dashboard utama dengan sukses | Aplikasi Berjalan | Langkah sesuai UI | - | Pengguna berhasil memproses skenario sehingga pengguna admin berhasil memuat halaman dashboard utama dengan sukses dan menampilkan informasi hasil bisnis yang sesuai. | Passed | * |
| Pengguna admin berhasil melakukan navigasi ke halaman Kelola Pengguna | TC-9 | Pengguna admin berhasil melakukan navigasi ke halaman Kelola Pengguna | Positive | Pengguna admin berhasil melakukan navigasi ke halaman Kelola Pengguna | Aplikasi Berjalan | Langkah sesuai UI | - | Pengguna berhasil memproses skenario sehingga pengguna admin berhasil melakukan navigasi ke halaman kelola pengguna dan menampilkan informasi hasil bisnis yang sesuai. | Passed | * |
| Pengguna biasa gagal mengakses dashboard admin dan dialihkan ke dashboard utama | TC-10 | Pengguna biasa gagal mengakses dashboard admin dan dialihkan ke dashboard utama | Negative | Pengguna biasa gagal mengakses dashboard admin dan dialihkan ke dashboard utama | Aplikasi Berjalan | Langkah sesuai UI | - | Pengguna gagal memproses instruksi sehingga sistem memunculkan pesan peringatan yang sesuai karena pengguna biasa gagal mengakses dashboard admin dan dialihkan ke dashboard utama. | Passed | * |
| Pengguna gagal mengakses dashboard admin tanpa autentikasi login | TC-11 | Pengguna gagal mengakses dashboard admin tanpa autentikasi login | Negative | Pengguna gagal mengakses dashboard admin tanpa autentikasi login | Aplikasi Berjalan | Langkah sesuai UI | - | Pengguna gagal memproses instruksi sehingga sistem memunculkan pesan peringatan yang sesuai karena mengakses dashboard admin tanpa autentikasi login. | Passed | * |
| Pengguna admin berhasil melihat daftar pengguna terdaftar pada halaman Kelola Pengguna | TC-12 | Pengguna admin berhasil melihat daftar pengguna terdaftar pada halaman Kelola Pengguna | Positive | Pengguna admin berhasil melihat daftar pengguna terdaftar pada halaman Kelola Pengguna | Aplikasi Berjalan | Langkah sesuai UI | - | Pengguna berhasil memproses skenario sehingga pengguna admin berhasil melihat daftar pengguna terdaftar pada halaman kelola pengguna dan menampilkan informasi hasil bisnis yang sesuai. | Passed | * |
| Pengguna admin berhasil memuat halaman Laporan Analisis tanpa kendala | TC-13 | Pengguna admin berhasil memuat halaman Laporan Analisis tanpa kendala | Positive | Pengguna admin berhasil memuat halaman Laporan Analisis tanpa kendala | Aplikasi Berjalan | Langkah sesuai UI | - | Pengguna berhasil memproses skenario sehingga pengguna admin berhasil memuat halaman laporan analisis tanpa kendala dan menampilkan informasi hasil bisnis yang sesuai. | Passed | * |
| Pengguna admin berhasil memuat antarmuka Chatbot Analytics | TC-14 | Pengguna admin berhasil memuat antarmuka Chatbot Analytics | Positive | Pengguna admin berhasil memuat antarmuka Chatbot Analytics | Aplikasi Berjalan | Langkah sesuai UI | - | Pengguna berhasil memproses skenario sehingga pengguna admin berhasil memuat antarmuka chatbot analytics dan menampilkan informasi hasil bisnis yang sesuai. | Passed | * |
| Pengguna admin berhasil menavigasi ke halaman laporan melalui pintasan aksi cepat | TC-15 | Pengguna admin berhasil menavigasi ke halaman laporan melalui pintasan aksi cepat | Positive | Pengguna admin berhasil menavigasi ke halaman laporan melalui pintasan aksi cepat | Aplikasi Berjalan | Langkah sesuai UI | - | Pengguna berhasil memproses skenario sehingga pengguna admin berhasil menavigasi ke halaman laporan melalui pintasan aksi cepat dan menampilkan informasi hasil bisnis yang sesuai. | Passed | * |
| EDU-POS-001 | TC-16 | Pengguna berhasil melihat halaman edukasi dan daftar artikel | Positive | Pengguna berhasil melihat halaman edukasi dan daftar artikel | Aplikasi Berjalan | Langkah sesuai UI | - | Pengguna berhasil memproses skenario sehingga melihat halaman edukasi dan daftar artikel dan menampilkan informasi hasil bisnis yang sesuai. | Passed | * |
| EDU-NEG-001 | TC-17 | Pengguna gagal menemukan artikel saat mencari kata kunci tidak valid | Negative | Pengguna gagal menemukan artikel saat mencari kata kunci tidak valid | Aplikasi Berjalan | Langkah sesuai UI | - | Pengguna gagal memproses instruksi sehingga sistem memunculkan pesan peringatan yang sesuai karena menemukan artikel saat mencari kata kunci tidak valid. | Passed | * |
| HIS-POS-009 | TC-18 | Pengguna berhasil mengekspor riwayat analisis ke format PDF | Positive | Pengguna berhasil mengekspor riwayat analisis ke format PDF | Aplikasi Berjalan | Langkah sesuai UI | - | Pengguna berhasil memproses skenario sehingga mengekspor riwayat analisis ke format pdf dan menampilkan informasi hasil bisnis yang sesuai. | Passed | * |
| HIS-NEG-003 | TC-19 | Pengguna gagal mengekspor PDF saat data tidak tersedia | Negative | Pengguna gagal mengekspor PDF saat data tidak tersedia | Aplikasi Berjalan | Langkah sesuai UI | - | Pengguna gagal memproses instruksi sehingga sistem memunculkan pesan peringatan yang sesuai karena mengekspor pdf saat data tidak tersedia. | Passed | * |
| Pengguna berhasil login menggunakan kredensial valid hingga diarahkan ke dashboard | TC-20 | Pengguna berhasil login menggunakan kredensial valid hingga diarahkan ke dashboard | Positive | Pengguna berhasil login menggunakan kredensial valid hingga diarahkan ke dashboard | Aplikasi Berjalan | Langkah sesuai UI | - | Pengguna berhasil memproses skenario sehingga login menggunakan kredensial valid hingga diarahkan ke dashboard dan menampilkan informasi hasil bisnis yang sesuai. | Passed | * |
| Pengguna berhasil login menggunakan akun admin hingga diarahkan ke dasbor admin | TC-21 | Pengguna berhasil login menggunakan akun admin hingga diarahkan ke dasbor admin | Positive | Pengguna berhasil login menggunakan akun admin hingga diarahkan ke dasbor admin | Aplikasi Berjalan | Langkah sesuai UI | - | Pengguna berhasil memproses skenario sehingga login menggunakan akun admin hingga diarahkan ke dasbor admin dan menampilkan informasi hasil bisnis yang sesuai. | Passed | * |
| Pengguna gagal login karena email dan password kosong | TC-22 | Pengguna gagal login karena email dan password kosong | Negative | Pengguna gagal login karena email dan password kosong | Aplikasi Berjalan | Langkah sesuai UI | - | Pengguna gagal memproses instruksi sehingga sistem memunculkan pesan peringatan yang sesuai karena login karena email dan password kosong. | Passed | * |
| Pengguna gagal login karena email tidak terdaftar di sistem | TC-23 | Pengguna gagal login karena email tidak terdaftar di sistem | Negative | Pengguna gagal login karena email tidak terdaftar di sistem | Aplikasi Berjalan | Langkah sesuai UI | - | Pengguna gagal memproses instruksi sehingga sistem memunculkan pesan peringatan yang sesuai karena login karena email tidak terdaftar di sistem. | Passed | * |
| Pengguna gagal login karena memasukkan password yang salah | TC-24 | Pengguna gagal login karena memasukkan password yang salah | Negative | Pengguna gagal login karena memasukkan password yang salah | Aplikasi Berjalan | Langkah sesuai UI | - | Pengguna gagal memproses instruksi sehingga sistem memunculkan pesan peringatan yang sesuai karena login karena memasukkan password yang salah. | Passed | * |
| Pengguna gagal login karena format email tidak sesuai standar (EP) | TC-25 | Pengguna gagal login karena format email tidak sesuai standar (EP) | Negative | Pengguna gagal login karena format email tidak sesuai standar (EP) | Aplikasi Berjalan | Langkah sesuai UI | - | Pengguna gagal memproses instruksi sehingga sistem memunculkan pesan peringatan yang sesuai karena login karena format email tidak sesuai standar (ep). | Passed | * |
| Pengguna berhasil memasukkan email yang valid (EP) | TC-26 | Pengguna berhasil memasukkan email yang valid (EP) | Positive | Pengguna berhasil memasukkan email yang valid (EP) | Aplikasi Berjalan | Langkah sesuai UI | - | Pengguna berhasil memproses skenario sehingga memasukkan email yang valid (ep) dan menampilkan informasi hasil bisnis yang sesuai. | Passed | * |
| Pengguna gagal login karena email null (EP) | TC-27 | Pengguna gagal login karena email null (EP) | Negative | Pengguna gagal login karena email null (EP) | Aplikasi Berjalan | Langkah sesuai UI | - | Pengguna gagal memproses instruksi sehingga sistem memunculkan pesan peringatan yang sesuai karena login karena email null (ep). | Passed | * |
| Pengguna gagal login karena email tidak memiliki domain (EP) | TC-28 | Pengguna gagal login karena email tidak memiliki domain (EP) | Negative | Pengguna gagal login karena email tidak memiliki domain (EP) | Aplikasi Berjalan | Langkah sesuai UI | - | Pengguna gagal memproses instruksi sehingga sistem memunculkan pesan peringatan yang sesuai karena login karena email tidak memiliki domain (ep). | Passed | * |
| AUTH-POS-005 | TC-29 | Pengguna berhasil keluar dari aplikasi secara aman | Positive | Pengguna berhasil keluar dari aplikasi secara aman | Aplikasi Berjalan | Langkah sesuai UI | - | Pengguna berhasil memproses skenario sehingga keluar dari aplikasi secara aman dan menampilkan informasi hasil bisnis yang sesuai. | Passed | * |
| AUTH-POS-006 | TC-30 | Pengguna gagal mengakses dashboard setelah proses keluar selesai | Positive | Pengguna gagal mengakses dashboard setelah proses keluar selesai | Aplikasi Berjalan | Langkah sesuai UI | - | Pengguna berhasil memproses skenario sehingga pengguna gagal mengakses dashboard setelah proses keluar selesai dan menampilkan informasi hasil bisnis yang sesuai. | Passed | * |
| AUTH-INT-001 | TC-31 | Pengguna berhasil menyelesaikan siklus masuk dan keluar aplikasi | Negative | Pengguna berhasil menyelesaikan siklus masuk dan keluar aplikasi | Aplikasi Berjalan | Langkah sesuai UI | - | Pengguna gagal memproses instruksi sehingga sistem memunculkan pesan peringatan yang sesuai karena pengguna berhasil menyelesaikan siklus masuk dan keluar aplikasi. | Passed | * |
| NOT-POS-001 | TC-32 | Pengguna berhasil membuka halaman notifikasi aplikasi | Positive | Pengguna berhasil membuka halaman notifikasi aplikasi | Aplikasi Berjalan | Langkah sesuai UI | - | Pengguna berhasil memproses skenario sehingga membuka halaman notifikasi aplikasi dan menampilkan informasi hasil bisnis yang sesuai. | Passed | * |
| NOT-POS-002 | TC-33 | Pengguna berhasil menandai notifikasi masuk sebagai telah dibaca | Positive | Pengguna berhasil menandai notifikasi masuk sebagai telah dibaca | Aplikasi Berjalan | Langkah sesuai UI | - | Pengguna berhasil memproses skenario sehingga menandai notifikasi masuk sebagai telah dibaca dan menampilkan informasi hasil bisnis yang sesuai. | Passed | * |
| NOT-POS-003 | TC-34 | Pengguna berhasil melihat status kosong saat tidak terdapat notifikasi | Positive | Pengguna berhasil melihat status kosong saat tidak terdapat notifikasi | Aplikasi Berjalan | Langkah sesuai UI | - | Pengguna berhasil memproses skenario sehingga melihat status kosong saat tidak terdapat notifikasi dan menampilkan informasi hasil bisnis yang sesuai. | Passed | * |
| NOT-POS-004 | TC-35 | Pengguna berhasil melihat indikator visual pada notifikasi yang belum dibaca | Positive | Pengguna berhasil melihat indikator visual pada notifikasi yang belum dibaca | Aplikasi Berjalan | Langkah sesuai UI | - | Pengguna berhasil memproses skenario sehingga melihat indikator visual pada notifikasi yang belum dibaca dan menampilkan informasi hasil bisnis yang sesuai. | Passed | * |
| ANA-POS-005 | TC-36 | Pengguna berhasil mengisi seluruh parameter analisis kualitas air secara lengkap | Positive | Pengguna berhasil mengisi seluruh parameter analisis kualitas air secara lengkap | Aplikasi Berjalan | Langkah sesuai UI | - | Pengguna berhasil melihat hasil prediksi kualitas air (Prediction Result) secara detail beserta kategorinya tanpa terdapat error. | Passed | * |
| ANA-EP-001 | TC-37 | Pengguna berhasil memasukkan nilai derajat keasaman (pH) yang valid | Positive | Pengguna berhasil memasukkan nilai derajat keasaman (pH) yang valid | Aplikasi Berjalan | Langkah sesuai UI | - | Pengguna berhasil melihat hasil prediksi kualitas air (Prediction Result) secara detail beserta kategorinya tanpa terdapat error. | Passed | * |
| ANA-EP-002 | TC-38 | Pengguna gagal memasukkan nilai derajat keasaman (pH) negatif yang tidak valid | Negative | Pengguna gagal memasukkan nilai derajat keasaman (pH) negatif yang tidak valid | Aplikasi Berjalan | Langkah sesuai UI | - | Pengguna gagal memproses instruksi sehingga sistem memunculkan pesan peringatan yang sesuai karena memasukkan nilai derajat keasaman (ph) negatif yang tidak valid. | Passed | * |
| ANA-BVA-005 | TC-39 | Pengguna berhasil memasukkan nilai derajat keasaman (pH) pada batas bawah ekstrem | Positive | Pengguna berhasil memasukkan nilai derajat keasaman (pH) pada batas bawah ekstrem | Aplikasi Berjalan | Langkah sesuai UI | - | Pengguna berhasil melihat hasil prediksi kualitas air (Prediction Result) secara detail beserta kategorinya tanpa terdapat error. | Passed | * |
| ANA-BVA-006 | TC-40 | Pengguna berhasil memasukkan nilai derajat keasaman (pH) pada batas atas ekstrem | Positive | Pengguna berhasil memasukkan nilai derajat keasaman (pH) pada batas atas ekstrem | Aplikasi Berjalan | Langkah sesuai UI | - | Pengguna berhasil melihat hasil prediksi kualitas air (Prediction Result) secara detail beserta kategorinya tanpa terdapat error. | Passed | * |
| ANA-BVA-007 | TC-41 | Pengguna gagal memasukkan nilai derajat keasaman (pH) yang melampaui batas atas maksimal | Positive | Pengguna gagal memasukkan nilai derajat keasaman (pH) yang melampaui batas atas maksimal | Aplikasi Berjalan | Langkah sesuai UI | - | Pengguna berhasil melihat hasil prediksi kualitas air (Prediction Result) secara detail beserta kategorinya tanpa terdapat error. | Passed | * |
| ANA-NEG-007 | TC-42 | Pengguna gagal memasukkan karakter teks pada formulir analisis parameter kimia | Negative | Pengguna gagal memasukkan karakter teks pada formulir analisis parameter kimia | Aplikasi Berjalan | Langkah sesuai UI | - | Pengguna gagal memproses instruksi sehingga sistem memunculkan pesan peringatan yang sesuai karena memasukkan karakter teks pada formulir analisis parameter kimia. | Passed | * |
| ANA-EP-003 | TC-43 | Pengguna berhasil memasukkan nilai tingkat kekerasan air (Hardness) yang valid | Positive | Pengguna berhasil memasukkan nilai tingkat kekerasan air (Hardness) yang valid | Aplikasi Berjalan | Langkah sesuai UI | - | Pengguna berhasil melihat hasil prediksi kualitas air (Prediction Result) secara detail beserta kategorinya tanpa terdapat error. | Passed | * |
| ANA-EP-004 | TC-44 | Pengguna gagal memasukkan nilai kekerasan air (Hardness) negatif yang tidak valid | Negative | Pengguna gagal memasukkan nilai kekerasan air (Hardness) negatif yang tidak valid | Aplikasi Berjalan | Langkah sesuai UI | - | Pengguna gagal memproses instruksi sehingga sistem memunculkan pesan peringatan yang sesuai karena memasukkan nilai kekerasan air (hardness) negatif yang tidak valid. | Passed | * |
| ANA-EP-005 | TC-45 | Pengguna berhasil memasukkan nilai zat padat terlarut (Solids) yang valid | Positive | Pengguna berhasil memasukkan nilai zat padat terlarut (Solids) yang valid | Aplikasi Berjalan | Langkah sesuai UI | - | Pengguna berhasil melihat hasil prediksi kualitas air (Prediction Result) secara detail beserta kategorinya tanpa terdapat error. | Passed | * |
| ANA-EP-006 | TC-46 | Pengguna gagal memasukkan nilai zat padat terlarut (Solids) negatif yang tidak valid | Negative | Pengguna gagal memasukkan nilai zat padat terlarut (Solids) negatif yang tidak valid | Aplikasi Berjalan | Langkah sesuai UI | - | Pengguna gagal memproses instruksi sehingga sistem memunculkan pesan peringatan yang sesuai karena memasukkan nilai zat padat terlarut (solids) negatif yang tidak valid. | Passed | * |
| ANA-EP-007 | TC-47 | Pengguna berhasil memasukkan nilai kloramin (Chloramines) yang valid | Positive | Pengguna berhasil memasukkan nilai kloramin (Chloramines) yang valid | Aplikasi Berjalan | Langkah sesuai UI | - | Pengguna berhasil melihat hasil prediksi kualitas air (Prediction Result) secara detail beserta kategorinya tanpa terdapat error. | Passed | * |
| ANA-EP-008 | TC-48 | Pengguna gagal memasukkan nilai kloramin (Chloramines) negatif yang tidak valid | Negative | Pengguna gagal memasukkan nilai kloramin (Chloramines) negatif yang tidak valid | Aplikasi Berjalan | Langkah sesuai UI | - | Pengguna gagal memproses instruksi sehingga sistem memunculkan pesan peringatan yang sesuai karena memasukkan nilai kloramin (chloramines) negatif yang tidak valid. | Passed | * |
| ANA-EP-009 | TC-49 | Pengguna berhasil memasukkan nilai sulfat (Sulfate) yang valid | Positive | Pengguna berhasil memasukkan nilai sulfat (Sulfate) yang valid | Aplikasi Berjalan | Langkah sesuai UI | - | Pengguna berhasil melihat hasil prediksi kualitas air (Prediction Result) secara detail beserta kategorinya tanpa terdapat error. | Passed | * |
| ANA-EP-010 | TC-50 | Pengguna gagal memasukkan nilai sulfat (Sulfate) negatif yang tidak valid | Negative | Pengguna gagal memasukkan nilai sulfat (Sulfate) negatif yang tidak valid | Aplikasi Berjalan | Langkah sesuai UI | - | Pengguna gagal memproses instruksi sehingga sistem memunculkan pesan peringatan yang sesuai karena memasukkan nilai sulfat (sulfate) negatif yang tidak valid. | Passed | * |
| ANA-EP-011 | TC-51 | Pengguna berhasil memasukkan nilai daya hantar listrik (Conductivity) yang valid | Positive | Pengguna berhasil memasukkan nilai daya hantar listrik (Conductivity) yang valid | Aplikasi Berjalan | Langkah sesuai UI | - | Pengguna berhasil melihat hasil prediksi kualitas air (Prediction Result) secara detail beserta kategorinya tanpa terdapat error. | Passed | * |
| ANA-EP-012 | TC-52 | Pengguna gagal memasukkan nilai daya hantar listrik (Conductivity) negatif yang tidak valid | Negative | Pengguna gagal memasukkan nilai daya hantar listrik (Conductivity) negatif yang tidak valid | Aplikasi Berjalan | Langkah sesuai UI | - | Pengguna gagal memproses instruksi sehingga sistem memunculkan pesan peringatan yang sesuai karena memasukkan nilai daya hantar listrik (conductivity) negatif yang tidak valid. | Passed | * |
| ANA-EP-013 | TC-53 | Pengguna berhasil memasukkan nilai karbon organik (Organic Carbon) yang valid | Positive | Pengguna berhasil memasukkan nilai karbon organik (Organic Carbon) yang valid | Aplikasi Berjalan | Langkah sesuai UI | - | Pengguna berhasil melihat hasil prediksi kualitas air (Prediction Result) secara detail beserta kategorinya tanpa terdapat error. | Passed | * |
| ANA-EP-014 | TC-54 | Pengguna gagal memasukkan nilai karbon organik (Organic Carbon) negatif yang tidak valid | Negative | Pengguna gagal memasukkan nilai karbon organik (Organic Carbon) negatif yang tidak valid | Aplikasi Berjalan | Langkah sesuai UI | - | Pengguna gagal memproses instruksi sehingga sistem memunculkan pesan peringatan yang sesuai karena memasukkan nilai karbon organik (organic carbon) negatif yang tidak valid. | Passed | * |
| ANA-EP-015 | TC-55 | Pengguna berhasil memasukkan nilai trihalometana (Trihalomethanes) yang valid | Positive | Pengguna berhasil memasukkan nilai trihalometana (Trihalomethanes) yang valid | Aplikasi Berjalan | Langkah sesuai UI | - | Pengguna berhasil melihat hasil prediksi kualitas air (Prediction Result) secara detail beserta kategorinya tanpa terdapat error. | Passed | * |
| ANA-EP-016 | TC-56 | Pengguna gagal memasukkan nilai trihalometana (Trihalomethanes) negatif yang tidak valid | Negative | Pengguna gagal memasukkan nilai trihalometana (Trihalomethanes) negatif yang tidak valid | Aplikasi Berjalan | Langkah sesuai UI | - | Pengguna gagal memproses instruksi sehingga sistem memunculkan pesan peringatan yang sesuai karena memasukkan nilai trihalometana (trihalomethanes) negatif yang tidak valid. | Passed | * |
| ANA-EP-017 | TC-57 | Pengguna berhasil memasukkan nilai kekeruhan air (Turbidity) yang valid | Positive | Pengguna berhasil memasukkan nilai kekeruhan air (Turbidity) yang valid | Aplikasi Berjalan | Langkah sesuai UI | - | Pengguna berhasil melihat hasil prediksi kualitas air (Prediction Result) secara detail beserta kategorinya tanpa terdapat error. | Passed | * |
| ANA-EP-018 | TC-58 | Pengguna gagal memasukkan nilai kekeruhan air (Turbidity) negatif yang tidak valid | Negative | Pengguna gagal memasukkan nilai kekeruhan air (Turbidity) negatif yang tidak valid | Aplikasi Berjalan | Langkah sesuai UI | - | Pengguna gagal memproses instruksi sehingga sistem memunculkan pesan peringatan yang sesuai karena memasukkan nilai kekeruhan air (turbidity) negatif yang tidak valid. | Passed | * |
| ANA-BVA-004 | TC-59 | Pengguna gagal memasukkan nilai derajat keasaman (pH) yang kurang dari batas bawah minimal | Positive | Pengguna gagal memasukkan nilai derajat keasaman (pH) yang kurang dari batas bawah minimal | Aplikasi Berjalan | Langkah sesuai UI | - | Pengguna berhasil melihat hasil prediksi kualitas air (Prediction Result) secara detail beserta kategorinya tanpa terdapat error. | Passed | * |
| Pengguna berhasil mendaftar menggunakan data registrasi yang valid lengkap | TC-60 | Pengguna berhasil mendaftar menggunakan data registrasi yang valid lengkap | Positive | Pengguna berhasil mendaftar menggunakan data registrasi yang valid lengkap | Aplikasi Berjalan | Langkah sesuai UI | - | Pengguna berhasil memproses skenario sehingga mendaftar menggunakan data registrasi yang valid lengkap dan menampilkan informasi hasil bisnis yang sesuai. | Passed | * |
| Pengguna gagal mendaftar karena semua field wajib dikosongkan | TC-61 | Pengguna gagal mendaftar karena semua field wajib dikosongkan | Negative | Pengguna gagal mendaftar karena semua field wajib dikosongkan | Aplikasi Berjalan | Langkah sesuai UI | - | Pengguna gagal memproses instruksi sehingga sistem memunculkan pesan peringatan yang sesuai karena mendaftar karena semua field wajib dikosongkan. | Passed | * |
| Pengguna gagal mendaftar karena nama lengkap dikosongkan | TC-62 | Pengguna gagal mendaftar karena nama lengkap dikosongkan | Negative | Pengguna gagal mendaftar karena nama lengkap dikosongkan | Aplikasi Berjalan | Langkah sesuai UI | - | Pengguna gagal memproses instruksi sehingga sistem memunculkan pesan peringatan yang sesuai karena mendaftar karena nama lengkap dikosongkan. | Passed | * |
| Pengguna gagal mendaftar karena username dikosongkan | TC-63 | Pengguna gagal mendaftar karena username dikosongkan | Negative | Pengguna gagal mendaftar karena username dikosongkan | Aplikasi Berjalan | Langkah sesuai UI | - | Pengguna gagal memproses instruksi sehingga sistem memunculkan pesan peringatan yang sesuai karena mendaftar karena username dikosongkan. | Passed | * |
| Pengguna gagal mendaftar karena username kurang dari batas minimum (BVA) | TC-64 | Pengguna gagal mendaftar karena username kurang dari batas minimum (BVA) | Negative | Pengguna gagal mendaftar karena username kurang dari batas minimum (BVA) | Aplikasi Berjalan | Langkah sesuai UI | - | Pengguna gagal memproses instruksi sehingga sistem memunculkan pesan peringatan yang sesuai karena mendaftar karena username kurang dari batas minimum (bva). | Passed | * |
| Pengguna gagal mendaftar karena memasukkan email dengan format yang tidak valid | TC-65 | Pengguna gagal mendaftar karena memasukkan email dengan format yang tidak valid | Negative | Pengguna gagal mendaftar karena memasukkan email dengan format yang tidak valid | Aplikasi Berjalan | Langkah sesuai UI | - | Pengguna gagal memproses instruksi sehingga sistem memunculkan pesan peringatan yang sesuai karena mendaftar karena memasukkan email dengan format yang tidak valid. | Passed | * |
| Pengguna gagal mendaftar karena password kurang dari batas minimum (BVA) | TC-66 | Pengguna gagal mendaftar karena password kurang dari batas minimum (BVA) | Negative | Pengguna gagal mendaftar karena password kurang dari batas minimum (BVA) | Aplikasi Berjalan | Langkah sesuai UI | - | Pengguna gagal memproses instruksi sehingga sistem memunculkan pesan peringatan yang sesuai karena mendaftar karena password kurang dari batas minimum (bva). | Passed | * |
| Pengguna berhasil mendaftar dengan username tepat di batas minimum (BVA) | TC-67 | Pengguna berhasil mendaftar dengan username tepat di batas minimum (BVA) | Positive | Pengguna berhasil mendaftar dengan username tepat di batas minimum (BVA) | Aplikasi Berjalan | Langkah sesuai UI | - | Pengguna berhasil memproses skenario sehingga mendaftar dengan username tepat di batas minimum (bva) dan menampilkan informasi hasil bisnis yang sesuai. | Passed | * |
| Pengguna berhasil mendaftar dengan password tepat di batas minimum (BVA) | TC-68 | Pengguna berhasil mendaftar dengan password tepat di batas minimum (BVA) | Positive | Pengguna berhasil mendaftar dengan password tepat di batas minimum (BVA) | Aplikasi Berjalan | Langkah sesuai UI | - | Pengguna berhasil memproses skenario sehingga mendaftar dengan password tepat di batas minimum (bva) dan menampilkan informasi hasil bisnis yang sesuai. | Passed | * |
| Pengguna gagal mendaftar karena username melebihi batas maksimum (BVA) | TC-69 | Pengguna gagal mendaftar karena username melebihi batas maksimum (BVA) | Negative | Pengguna gagal mendaftar karena username melebihi batas maksimum (BVA) | Aplikasi Berjalan | Langkah sesuai UI | - | Pengguna gagal memproses instruksi sehingga sistem memunculkan pesan peringatan yang sesuai karena mendaftar karena username melebihi batas maksimum (bva). | Passed | * |
| Pengguna gagal mendaftar karena email sudah terdaftar di sistem | TC-70 | Pengguna gagal mendaftar karena email sudah terdaftar di sistem | Negative | Pengguna gagal mendaftar karena email sudah terdaftar di sistem | Aplikasi Berjalan | Langkah sesuai UI | - | Pengguna gagal memproses instruksi sehingga sistem memunculkan pesan peringatan yang sesuai karena mendaftar karena email sudah terdaftar di sistem. | Passed | * |
| Pengguna berhasil mendaftar dengan username tepat di batas maksimum (BVA) | TC-71 | Pengguna berhasil mendaftar dengan username tepat di batas maksimum (BVA) | Positive | Pengguna berhasil mendaftar dengan username tepat di batas maksimum (BVA) | Aplikasi Berjalan | Langkah sesuai UI | - | Pengguna berhasil memproses skenario sehingga mendaftar dengan username tepat di batas maksimum (bva) dan menampilkan informasi hasil bisnis yang sesuai. | Passed | * |
| Pengguna berhasil mendaftar dengan password tepat di batas maksimum (BVA) | TC-72 | Pengguna berhasil mendaftar dengan password tepat di batas maksimum (BVA) | Positive | Pengguna berhasil mendaftar dengan password tepat di batas maksimum (BVA) | Aplikasi Berjalan | Langkah sesuai UI | - | Pengguna berhasil memproses skenario sehingga mendaftar dengan password tepat di batas maksimum (bva) dan menampilkan informasi hasil bisnis yang sesuai. | Passed | * |
| Pengguna berhasil melihat daftar riwayat analisis | TC-73 | Pengguna berhasil melihat daftar riwayat analisis | Positive | Pengguna berhasil melihat daftar riwayat analisis | Aplikasi Berjalan | Langkah sesuai UI | - | Pengguna berhasil memproses skenario sehingga melihat daftar riwayat analisis dan menampilkan informasi hasil bisnis yang sesuai. | Passed | * |
| Pengguna berhasil mencari riwayat analisis berdasarkan kata kunci yang valid | TC-74 | Pengguna berhasil mencari riwayat analisis berdasarkan kata kunci yang valid | Positive | Pengguna berhasil mencari riwayat analisis berdasarkan kata kunci yang valid | Aplikasi Berjalan | Langkah sesuai UI | - | Pengguna berhasil memproses skenario sehingga mencari riwayat analisis berdasarkan kata kunci yang valid dan menampilkan informasi hasil bisnis yang sesuai. | Passed | * |
| Pengguna berhasil memfilter riwayat analisis berdasarkan kategori | TC-75 | Pengguna berhasil memfilter riwayat analisis berdasarkan kategori | Positive | Pengguna berhasil memfilter riwayat analisis berdasarkan kategori | Aplikasi Berjalan | Langkah sesuai UI | - | Pengguna berhasil memproses skenario sehingga memfilter riwayat analisis berdasarkan kategori dan menampilkan informasi hasil bisnis yang sesuai. | Passed | * |
| Pengguna berhasil memfilter riwayat analisis berdasarkan rentang tanggal | TC-76 | Pengguna berhasil memfilter riwayat analisis berdasarkan rentang tanggal | Positive | Pengguna berhasil memfilter riwayat analisis berdasarkan rentang tanggal | Aplikasi Berjalan | Langkah sesuai UI | - | Pengguna berhasil memproses skenario sehingga memfilter riwayat analisis berdasarkan rentang tanggal dan menampilkan informasi hasil bisnis yang sesuai. | Passed | * |
| Pengguna berhasil melakukan navigasi pagination pada riwayat analisis | TC-77 | Pengguna berhasil melakukan navigasi pagination pada riwayat analisis | Positive | Pengguna berhasil melakukan navigasi pagination pada riwayat analisis | Aplikasi Berjalan | Langkah sesuai UI | - | Pengguna berhasil memproses skenario sehingga melakukan navigasi pagination pada riwayat analisis dan menampilkan informasi hasil bisnis yang sesuai. | Passed | * |
| Pengguna berhasil mengekspor riwayat analisis ke format eksternal | TC-78 | Pengguna berhasil mengekspor riwayat analisis ke format eksternal | Positive | Pengguna berhasil mengekspor riwayat analisis ke format eksternal | Aplikasi Berjalan | Langkah sesuai UI | - | Pengguna berhasil memproses skenario sehingga mengekspor riwayat analisis ke format eksternal dan menampilkan informasi hasil bisnis yang sesuai. | Passed | * |
| Pengguna berhasil membuka detail riwayat prediksi kualitas air | TC-79 | Pengguna berhasil membuka detail riwayat prediksi kualitas air | Positive | Pengguna berhasil membuka detail riwayat prediksi kualitas air | Aplikasi Berjalan | Langkah sesuai UI | - | Pengguna berhasil memproses skenario sehingga membuka detail riwayat prediksi kualitas air dan menampilkan informasi hasil bisnis yang sesuai. | Passed | * |
| Pengguna gagal menemukan riwayat analisis karena kata kunci pencarian tidak valid | TC-80 | Pengguna gagal menemukan riwayat analisis karena kata kunci pencarian tidak valid | Negative | Pengguna gagal menemukan riwayat analisis karena kata kunci pencarian tidak valid | Aplikasi Berjalan | Langkah sesuai UI | - | Pengguna gagal memproses instruksi sehingga sistem memunculkan pesan peringatan yang sesuai karena menemukan riwayat analisis karena kata kunci pencarian tidak valid. | Passed | * |
| Pengguna gagal memfilter riwayat analisis karena kombinasi filter tidak menghasilkan data | TC-81 | Pengguna gagal memfilter riwayat analisis karena kombinasi filter tidak menghasilkan data | Negative | Pengguna gagal memfilter riwayat analisis karena kombinasi filter tidak menghasilkan data | Aplikasi Berjalan | Langkah sesuai UI | - | Pengguna gagal memproses instruksi sehingga sistem memunculkan pesan peringatan yang sesuai karena memfilter riwayat analisis karena kombinasi filter tidak menghasilkan data. | Passed | * |
| Pengguna berhasil menghapus filter aktif sehingga data riwayat kembali normal | TC-82 | Pengguna berhasil menghapus filter aktif sehingga data riwayat kembali normal | Positive | Pengguna berhasil menghapus filter aktif sehingga data riwayat kembali normal | Aplikasi Berjalan | Langkah sesuai UI | - | Pengguna berhasil memproses skenario sehingga menghapus filter aktif sehingga data riwayat kembali normal dan menampilkan informasi hasil bisnis yang sesuai. | Passed | * |
| Pengguna berhasil melakukan analisis kualitas air hingga hasil prediksi ditampilkan | TC-83 | Pengguna berhasil melakukan analisis kualitas air hingga hasil prediksi ditampilkan | Positive | Pengguna berhasil melakukan analisis kualitas air hingga hasil prediksi ditampilkan | Aplikasi Berjalan | Langkah sesuai UI | - | Pengguna berhasil melihat hasil prediksi kualitas air (Prediction Result) secara detail beserta kategorinya tanpa terdapat error. | Passed | * |
| Pengguna gagal melakukan analisis kualitas air karena tidak mengunggah file gambar | TC-84 | Pengguna gagal melakukan analisis kualitas air karena tidak mengunggah file gambar | Negative | Pengguna gagal melakukan analisis kualitas air karena tidak mengunggah file gambar | Aplikasi Berjalan | Langkah sesuai UI | - | Pengguna gagal memproses instruksi sehingga sistem memunculkan pesan peringatan yang sesuai karena melakukan analisis kualitas air karena tidak mengunggah file gambar. | Passed | * |
| Pengguna berhasil mereset form analisis ke kondisi kosong | TC-85 | Pengguna berhasil mereset form analisis ke kondisi kosong | Positive | Pengguna berhasil mereset form analisis ke kondisi kosong | Aplikasi Berjalan | Langkah sesuai UI | - | Pengguna berhasil melihat hasil prediksi kualitas air (Prediction Result) secara detail beserta kategorinya tanpa terdapat error. | Passed | * |
| Pengguna gagal melakukan analisis karena parameter wajib dikosongkan | TC-86 | Pengguna gagal melakukan analisis karena parameter wajib dikosongkan | Negative | Pengguna gagal melakukan analisis karena parameter wajib dikosongkan | Aplikasi Berjalan | Langkah sesuai UI | - | Pengguna gagal memproses instruksi sehingga sistem memunculkan pesan peringatan yang sesuai karena melakukan analisis karena parameter wajib dikosongkan. | Passed | * |
| Pengguna gagal melakukan analisis karena parameter tidak diisi lengkap | TC-87 | Pengguna gagal melakukan analisis karena parameter tidak diisi lengkap | Negative | Pengguna gagal melakukan analisis karena parameter tidak diisi lengkap | Aplikasi Berjalan | Langkah sesuai UI | - | Pengguna gagal memproses instruksi sehingga sistem memunculkan pesan peringatan yang sesuai karena melakukan analisis karena parameter tidak diisi lengkap. | Passed | * |
| Pengguna berhasil melihat detail Prediction Result secara mendalam | TC-88 | Pengguna berhasil melihat detail Prediction Result secara mendalam | Positive | Pengguna berhasil melihat detail Prediction Result secara mendalam | Aplikasi Berjalan | Langkah sesuai UI | - | Pengguna berhasil melihat hasil prediksi kualitas air (Prediction Result) secara detail beserta kategorinya tanpa terdapat error. | Passed | * |
| Pengguna berhasil kembali ke dasbor setelah melihat hasil analisis | TC-89 | Pengguna berhasil kembali ke dasbor setelah melihat hasil analisis | Positive | Pengguna berhasil kembali ke dasbor setelah melihat hasil analisis | Aplikasi Berjalan | Langkah sesuai UI | - | Pengguna berhasil melihat hasil prediksi kualitas air (Prediction Result) secara detail beserta kategorinya tanpa terdapat error. | Passed | * |
| PRO-POS-001 | TC-90 | Pengguna berhasil membuka dan melihat halaman profil pribadi | Positive | Pengguna berhasil membuka dan melihat halaman profil pribadi | Aplikasi Berjalan | Langkah sesuai UI | - | Pengguna berhasil memproses skenario sehingga membuka dan melihat halaman profil pribadi dan menampilkan informasi hasil bisnis yang sesuai. | Passed | * |
| PRO-POS-002 | TC-91 | Pengguna berhasil memperbarui nama lengkap pada profil | Positive | Pengguna berhasil memperbarui nama lengkap pada profil | Aplikasi Berjalan | Langkah sesuai UI | - | Pengguna berhasil memproses skenario sehingga memperbarui nama lengkap pada profil dan menampilkan informasi hasil bisnis yang sesuai. | Passed | * |
| PRO-NEG-001 | TC-92 | Pengguna gagal memperbarui profil saat nama pengguna terlalu pendek | Negative | Pengguna gagal memperbarui profil saat nama pengguna terlalu pendek | Aplikasi Berjalan | Langkah sesuai UI | - | Pengguna gagal memproses instruksi sehingga sistem memunculkan pesan peringatan yang sesuai karena memperbarui profil saat nama pengguna terlalu pendek. | Passed | * |
| PRO-POS-005 | TC-93 | Pengguna berhasil bernavigasi melalui opsi-opsi pada halaman pengaturan profil | Positive | Pengguna berhasil bernavigasi melalui opsi-opsi pada halaman pengaturan profil | Aplikasi Berjalan | Langkah sesuai UI | - | Pengguna berhasil memproses skenario sehingga bernavigasi melalui opsi-opsi pada halaman pengaturan profil dan menampilkan informasi hasil bisnis yang sesuai. | Passed | * |
| PRO-NEG-004 | TC-94 | Pengguna gagal mengganti kata sandi saat kata sandi lama tidak diisi | Negative | Pengguna gagal mengganti kata sandi saat kata sandi lama tidak diisi | Aplikasi Berjalan | Langkah sesuai UI | - | Pengguna gagal memproses instruksi sehingga sistem memunculkan pesan peringatan yang sesuai karena mengganti kata sandi saat kata sandi lama tidak diisi. | Passed | * |
| PRO-NEG-006 | TC-95 | Pengguna gagal mengganti kata sandi saat kata sandi konfirmasi tidak sesuai | Negative | Pengguna gagal mengganti kata sandi saat kata sandi konfirmasi tidak sesuai | Aplikasi Berjalan | Langkah sesuai UI | - | Pengguna gagal memproses instruksi sehingga sistem memunculkan pesan peringatan yang sesuai karena mengganti kata sandi saat kata sandi konfirmasi tidak sesuai. | Passed | * |
| PRO-POS-003 | TC-96 | Pengguna berhasil memperbarui foto profil menggunakan berkas gambar yang sah | Positive | Pengguna berhasil memperbarui foto profil menggunakan berkas gambar yang sah | Aplikasi Berjalan | Langkah sesuai UI | - | Pengguna berhasil memproses skenario sehingga memperbarui foto profil menggunakan berkas gambar yang sah dan menampilkan informasi hasil bisnis yang sesuai. | Passed | * |
| PRO-POS-004 | TC-97 | Pengguna berhasil memperbarui kata sandi dengan keamanan yang memenuhi syarat | Positive | Pengguna berhasil memperbarui kata sandi dengan keamanan yang memenuhi syarat | Aplikasi Berjalan | Langkah sesuai UI | - | Pengguna berhasil memproses skenario sehingga memperbarui kata sandi dengan keamanan yang memenuhi syarat dan menampilkan informasi hasil bisnis yang sesuai. | Passed | * |
| PRO-POS-006 | TC-98 | Pengguna berhasil mengubah preferensi notifikasi pada akun | Positive | Pengguna berhasil mengubah preferensi notifikasi pada akun | Aplikasi Berjalan | Langkah sesuai UI | - | Pengguna berhasil memproses skenario sehingga mengubah preferensi notifikasi pada akun dan menampilkan informasi hasil bisnis yang sesuai. | Passed | * |
| PRO-NEG-002 | TC-99 | Pengguna gagal mengunggah foto profil yang melampaui batas ukuran maksimal | Negative | Pengguna gagal mengunggah foto profil yang melampaui batas ukuran maksimal | Aplikasi Berjalan | Langkah sesuai UI | - | Pengguna gagal memproses instruksi sehingga sistem memunculkan pesan peringatan yang sesuai karena mengunggah foto profil yang melampaui batas ukuran maksimal. | Passed | * |
| PRO-NEG-003 | TC-100 | Pengguna gagal mengunggah foto profil yang tidak berformat gambar yang sah | Negative | Pengguna gagal mengunggah foto profil yang tidak berformat gambar yang sah | Aplikasi Berjalan | Langkah sesuai UI | - | Pengguna gagal memproses instruksi sehingga sistem memunculkan pesan peringatan yang sesuai karena mengunggah foto profil yang tidak berformat gambar yang sah. | Passed | * |
| PRO-NEG-005 | TC-101 | Pengguna gagal mengganti kata sandi saat kata sandi baru terlalu pendek | Negative | Pengguna gagal mengganti kata sandi saat kata sandi baru terlalu pendek | Aplikasi Berjalan | Langkah sesuai UI | - | Pengguna gagal memproses instruksi sehingga sistem memunculkan pesan peringatan yang sesuai karena mengganti kata sandi saat kata sandi baru terlalu pendek. | Passed | * |
| PRO-NEG-007 | TC-102 | Pengguna gagal memperbarui profil saat nama pengguna dikosongkan | Negative | Pengguna gagal memperbarui profil saat nama pengguna dikosongkan | Aplikasi Berjalan | Langkah sesuai UI | - | Pengguna gagal memproses instruksi sehingga sistem memunculkan pesan peringatan yang sesuai karena memperbarui profil saat nama pengguna dikosongkan. | Passed | * |
| PRO-BVA-001 | TC-103 | Pengguna berhasil memperbarui profil menggunakan nama dengan panjang minimal | Positive | Pengguna berhasil memperbarui profil menggunakan nama dengan panjang minimal | Aplikasi Berjalan | Langkah sesuai UI | - | Pengguna berhasil memproses skenario sehingga memperbarui profil menggunakan nama dengan panjang minimal dan menampilkan informasi hasil bisnis yang sesuai. | Passed | * |
| PRO-BVA-003 | TC-104 | Pengguna berhasil memperbarui kata sandi baru dengan panjang minimal | Positive | Pengguna berhasil memperbarui kata sandi baru dengan panjang minimal | Aplikasi Berjalan | Langkah sesuai UI | - | Pengguna berhasil memproses skenario sehingga memperbarui kata sandi baru dengan panjang minimal dan menampilkan informasi hasil bisnis yang sesuai. | Passed | * |
| ANA-POS-001 | TC-105 | Pengguna berhasil mengunggah berkas gambar pendukung dan melihat pratinjau hasil | Positive | Pengguna berhasil mengunggah berkas gambar pendukung dan melihat pratinjau hasil | Aplikasi Berjalan | Langkah sesuai UI | - | Pengguna berhasil melihat hasil prediksi kualitas air (Prediction Result) secara detail beserta kategorinya tanpa terdapat error. | Passed | * |
| ANA-POS-004 | TC-106 | Pengguna berhasil mengubah berkas gambar pendukung dan melihat pratinjau yang baru | Positive | Pengguna berhasil mengubah berkas gambar pendukung dan melihat pratinjau yang baru | Aplikasi Berjalan | Langkah sesuai UI | - | Pengguna berhasil melihat hasil prediksi kualitas air (Prediction Result) secara detail beserta kategorinya tanpa terdapat error. | Passed | * |
| ANA-NEG-001 | TC-107 | Pengguna gagal mengunggah dokumen analisis yang tidak berformat gambar | Negative | Pengguna gagal mengunggah dokumen analisis yang tidak berformat gambar | Aplikasi Berjalan | Langkah sesuai UI | - | Pengguna gagal memproses instruksi sehingga sistem memunculkan pesan peringatan yang sesuai karena mengunggah dokumen analisis yang tidak berformat gambar. | Passed | * |
| ANA-NEG-002 | TC-108 | Pengguna gagal mengunggah berkas gambar analisis yang melampaui batas ukuran maksimal | Negative | Pengguna gagal mengunggah berkas gambar analisis yang melampaui batas ukuran maksimal | Aplikasi Berjalan | Langkah sesuai UI | - | Pengguna gagal memproses instruksi sehingga sistem memunculkan pesan peringatan yang sesuai karena mengunggah berkas gambar analisis yang melampaui batas ukuran maksimal. | Passed | * |
| ANA-BVA-002 | TC-109 | Pengguna berhasil mengunggah berkas gambar analisis pada batas ukuran maksimal yang diizinkan | Positive | Pengguna berhasil mengunggah berkas gambar analisis pada batas ukuran maksimal yang diizinkan | Aplikasi Berjalan | Langkah sesuai UI | - | Pengguna berhasil melihat hasil prediksi kualitas air (Prediction Result) secara detail beserta kategorinya tanpa terdapat error. | Passed | * |
| ANA-POS-002 | TC-110 | Pengguna berhasil mengunggah berkas format gambar portabel (PNG) dan melihat pratinjau | Positive | Pengguna berhasil mengunggah berkas format gambar portabel (PNG) dan melihat pratinjau | Aplikasi Berjalan | Langkah sesuai UI | - | Pengguna berhasil melihat hasil prediksi kualitas air (Prediction Result) secara detail beserta kategorinya tanpa terdapat error. | Passed | * |
| ANA-POS-003 | TC-111 | Pengguna berhasil mengunggah berkas gambar melalui mekanisme tarik dan lepas (drag-and-drop) | Positive | Pengguna berhasil mengunggah berkas gambar melalui mekanisme tarik dan lepas (drag-and-drop) | Aplikasi Berjalan | Langkah sesuai UI | - | Pengguna berhasil melihat hasil prediksi kualitas air (Prediction Result) secara detail beserta kategorinya tanpa terdapat error. | Passed | * |
| ANA-NEG-003 | TC-112 | Pengguna gagal mengunggah berkas gambar pendukung yang rusak (corrupt) | Negative | Pengguna gagal mengunggah berkas gambar pendukung yang rusak (corrupt) | Aplikasi Berjalan | Langkah sesuai UI | - | Pengguna gagal memproses instruksi sehingga sistem memunculkan pesan peringatan yang sesuai karena mengunggah berkas gambar pendukung yang rusak (corrupt). | Passed | * |
| ANA-BVA-001 | TC-113 | Pengguna berhasil mengunggah berkas gambar analisis dengan ukuran sangat kecil (minimal) | Positive | Pengguna berhasil mengunggah berkas gambar analisis dengan ukuran sangat kecil (minimal) | Aplikasi Berjalan | Langkah sesuai UI | - | Pengguna berhasil melihat hasil prediksi kualitas air (Prediction Result) secara detail beserta kategorinya tanpa terdapat error. | Passed | * |
| ANA-BVA-003 | TC-114 | Pengguna gagal mengunggah berkas analisis yang sedikit melampaui batas maksimal | Negative | Pengguna gagal mengunggah berkas analisis yang sedikit melampaui batas maksimal | Aplikasi Berjalan | Langkah sesuai UI | - | Pengguna gagal memproses instruksi sehingga sistem memunculkan pesan peringatan yang sesuai karena mengunggah berkas analisis yang sedikit melampaui batas maksimal. | Passed | * |
| E2E-001 | TC-115 | Pengguna berhasil mensimulasikan penggunaan aplikasi dari tahap pendaftaran hingga keluar | Positive | Pengguna berhasil mensimulasikan penggunaan aplikasi dari tahap pendaftaran hingga keluar | Aplikasi Berjalan | Langkah sesuai UI | - | Pengguna berhasil memproses skenario sehingga mensimulasikan penggunaan aplikasi dari tahap pendaftaran hingga keluar dan menampilkan informasi hasil bisnis yang sesuai. | Passed | * |

## TEST EXECUTION SUMMARY

* Total Scenario: 115
* Total Test Case: 115
* Positive Count: 49
* Negative Count: 44
* BVA Count: 9
* EP Count: 18
* Passed Count: 115
* Failed Count: 0
* Pending Count: 0

* Coverage Per Module:
  * SEC: 5 cases
  * ADM: 1 cases
  * E2E: 2 cases
  * MISC: 8 cases
  * EDU: 2 cases
  * HIS: 12 cases
  * AUTH: 25 cases
  * NOT: 4 cases
  * ANA: 41 cases
  * PRO: 15 cases
