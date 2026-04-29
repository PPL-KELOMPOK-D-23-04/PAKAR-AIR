<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=yes">
    <title>PAKAR-AIR | Edukasi Kualitas Air - Vue App</title>
    <!-- Google Fonts & Font Awesome Icons -->
    <link href="https://fonts.googleapis.com/css2?family=Inter:opsz,wght@14..32,300;14..32,400;14..32,500;14..32,600;14..32,700;14..32,800&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
    <!-- Vue 3 Global CDN -->
    <script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            background: linear-gradient(145deg, #d4eef7 0%, #c2e3f0 100%);
            font-family: 'Inter', sans-serif;
            padding: 24px 20px;
            min-height: 100vh;
        }

        /* App Container */
        #app {
            max-width: 1400px;
            margin: 0 auto;
        }

        /* Main Card Aplikasi */
        .app-card {
            background: #ffffff;
            border-radius: 2rem;
            box-shadow: 0 25px 45px -12px rgba(0, 48, 73, 0.3);
            overflow: hidden;
            transition: all 0.2s ease;
        }

        /* Layout Dashboard + Sidebar */
        .dashboard-layout {
            display: flex;
            flex-direction: row;
            flex-wrap: wrap;
        }

        /* SIDEBAR KIRI */
        .sidebar {
            width: 280px;
            background: #ffffff;
            border-right: 1px solid #e2edf2;
            padding: 2rem 1.5rem;
            flex-shrink: 0;
        }

        .logo-area {
            display: flex;
            align-items: baseline;
            gap: 10px;
            margin-bottom: 2.5rem;
            border-bottom: 2px solid #0f67b3;
            display: inline-flex;
            padding-bottom: 8px;
        }

        .logo-area h1 {
            font-size: 1.9rem;
            font-weight: 800;
            background: linear-gradient(135deg, #0a5c8e, #0496c7);
            -webkit-background-clip: text;
            background-clip: text;
            color: transparent;
            letter-spacing: -0.5px;
        }

        .logo-area .badge {
            font-size: 0.75rem;
            background: #e2f0f5;
            padding: 2px 10px;
            border-radius: 40px;
            font-weight: 600;
            color: #0a5c8e;
        }

        .nav-menu {
            display: flex;
            flex-direction: column;
            gap: 0.5rem;
        }

        .nav-item {
            display: flex;
            align-items: center;
            gap: 14px;
            padding: 12px 18px;
            border-radius: 18px;
            font-weight: 500;
            font-size: 1rem;
            color: #2c5a74;
            transition: all 0.2s ease;
            cursor: pointer;
        }

        .nav-item i {
            width: 24px;
            font-size: 1.25rem;
            color: #5aa9c9;
        }

        .nav-item.active {
            background: #eef7fc;
            color: #0b6e9e;
            font-weight: 600;
            box-shadow: 0 2px 6px rgba(0, 0, 0, 0.02);
        }

        .nav-item.active i {
            color: #0f80b5;
        }

        .nav-item:not(.active):hover {
            background: #f2f9fe;
            color: #0a5f8a;
        }

        /* KONTEN UTAMA */
        .main-content {
            flex: 1;
            background: #fefefe;
            padding: 2rem 2.2rem;
        }

        /* Edukasi Header */
        .edukasi-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            flex-wrap: wrap;
            gap: 1rem;
            margin-bottom: 2rem;
        }

        .edukasi-header h2 {
            font-size: 1.8rem;
            font-weight: 700;
            color: #0a3b4e;
            letter-spacing: -0.3px;
            position: relative;
        }

        .edukasi-header h2:after {
            content: '';
            position: absolute;
            bottom: -8px;
            left: 0;
            width: 50px;
            height: 3px;
            background: #0f67b3;
            border-radius: 4px;
        }

        /* Search Bar */
        .search-wrapper {
            display: flex;
            align-items: center;
            background: white;
            border: 1px solid #cde3ec;
            border-radius: 60px;
            padding: 6px 16px;
            gap: 8px;
            box-shadow: 0 1px 3px rgba(0,0,0,0.02);
            transition: 0.2s;
        }
        .search-wrapper:focus-within {
            border-color: #0f80b5;
            box-shadow: 0 2px 8px rgba(11, 110, 158, 0.1);
        }
        .search-wrapper i {
            color: #7fadc9;
            font-size: 1rem;
        }
        .search-wrapper input {
            border: none;
            padding: 10px 0;
            font-size: 0.9rem;
            width: 200px;
            outline: none;
            background: transparent;
            font-family: 'Inter', sans-serif;
        }
        .search-wrapper input::placeholder {
            color: #aac6d8;
            font-weight: 400;
        }

        /* Grid Artikel Edukasi */
        .artikel-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
            gap: 1.8rem;
            margin-bottom: 3rem;
        }

        .artikel-card {
            background: #ffffff;
            border-radius: 1.5rem;
            border: 1px solid #e6f0f5;
            transition: all 0.25s ease;
            overflow: hidden;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.02);
        }

        .artikel-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 20px 25px -12px rgba(0, 79, 112, 0.15);
            border-color: #cbe6f2;
        }

        .card-content {
            padding: 1.6rem 1.5rem 1.8rem;
        }

        .artikel-date {
            font-size: 0.75rem;
            font-weight: 500;
            color: #5f9dc0;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            margin-bottom: 0.8rem;
            display: flex;
            align-items: center;
            gap: 6px;
        }

        .artikel-date i {
            font-size: 0.7rem;
        }

        .artikel-title {
            font-size: 1.35rem;
            font-weight: 700;
            color: #0f3e54;
            line-height: 1.3;
            margin-bottom: 0.75rem;
        }

        .artikel-excerpt {
            color: #3f6e88;
            line-height: 1.5;
            font-size: 0.9rem;
            margin-bottom: 1.5rem;
        }

        .btn-read {
            display: inline-flex;
            align-items: center;
            gap: 8px;
            background: none;
            border: none;
            color: #0f80b5;
            font-weight: 600;
            font-size: 0.85rem;
            cursor: pointer;
            padding: 6px 0;
            transition: gap 0.2s;
            font-family: 'Inter', sans-serif;
        }

        .btn-read i {
            font-size: 0.75rem;
            transition: transform 0.2s;
        }

        .btn-read:hover {
            gap: 12px;
            color: #0b5e86;
        }
        .btn-read:hover i {
            transform: translateX(3px);
        }

        /* Section Info Tambahan (Kategori & Tips) */
        .info-section {
            display: flex;
            flex-wrap: wrap;
            gap: 1.8rem;
            margin-top: 1rem;
            border-top: 1px solid #e2edf2;
            padding-top: 2rem;
        }

        .info-card {
            flex: 1;
            background: #f9fefc;
            border-radius: 1.5rem;
            padding: 1.5rem;
            border: 1px solid #e0f0f7;
            transition: all 0.2s;
        }

        .info-card h3 {
            font-size: 1.25rem;
            font-weight: 700;
            color: #125d82;
            margin-bottom: 0.8rem;
            display: flex;
            align-items: center;
            gap: 10px;
        }

        .info-card h3 i {
            font-size: 1.3rem;
            color: #1f8cad;
        }

        .info-card p {
            color: #2f647e;
            line-height: 1.5;
            font-size: 0.9rem;
            margin-bottom: 1.2rem;
        }

        .info-link {
            background: none;
            border: none;
            color: #0f80b5;
            font-weight: 600;
            font-size: 0.85rem;
            display: inline-flex;
            align-items: center;
            gap: 6px;
            cursor: pointer;
            padding: 0;
            font-family: 'Inter', sans-serif;
        }

        /* Modal Popup (simulasi baca artikel) */
        .modal-overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(8, 38, 54, 0.7);
            backdrop-filter: blur(4px);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 1000;
            padding: 20px;
        }
        .modal-container {
            background: white;
            max-width: 500px;
            width: 100%;
            border-radius: 2rem;
            padding: 2rem;
            box-shadow: 0 30px 40px rgba(0,0,0,0.2);
            position: relative;
            animation: fadeSlideUp 0.2s ease;
        }
        @keyframes fadeSlideUp {
            from {
                opacity: 0;
                transform: translateY(20px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        .modal-container h3 {
            font-size: 1.6rem;
            margin-bottom: 0.8rem;
            color: #0a3b4e;
        }
        .modal-container p {
            color: #2c5a74;
            line-height: 1.5;
            margin: 1rem 0;
        }
        .close-modal {
            background: #eef2f5;
            border: none;
            padding: 8px 18px;
            border-radius: 40px;
            font-weight: 600;
            cursor: pointer;
            margin-top: 1rem;
            color: #0f67b3;
        }

        /* Responsive */
        @media (max-width: 780px) {
            .sidebar {
                width: 100%;
                border-right: none;
                border-bottom: 1px solid #e2edf2;
                padding: 1rem 1.5rem;
            }
            .nav-menu {
                flex-direction: row;
                flex-wrap: wrap;
            }
            .main-content {
                padding: 1.5rem;
            }
            .edukasi-header {
                flex-direction: column;
                align-items: flex-start;
            }
            .search-wrapper input {
                width: 160px;
            }
        }
        @media (max-width: 550px) {
            .artikel-grid {
                grid-template-columns: 1fr;
            }
            .info-section {
                flex-direction: column;
            }
        }
        .no-results {
            text-align: center;
            padding: 2rem;
            background: #f8fafc;
            border-radius: 1.5rem;
            color: #5f9dc0;
        }
        footer {
            font-size: 0.7rem;
            text-align: center;
            padding: 1rem;
            background: #fefefe;
            border-top: 1px solid #e2edf2;
            color: #6f9bbb;
        }
    </style>
</head>
<body>
<div id="app">
    <div class="app-card">
        <div class="dashboard-layout">
            <!-- Sidebar dengan menu navigasi -->
            <div class="sidebar">
                <div class="logo-area">
                    <h1>PAKAR-AIR</h1>
                    <span class="badge">Deteksi Kualitas Air</span>
                </div>
                <div class="nav-menu">
                    <div 
                        v-for="menu in menuItems" 
                        :key="menu.key"
                        class="nav-item"
                        :class="{ active: activeMenu === menu.key }"
                        @click="activeMenu = menu.key"
                    >
                        <i :class="menu.icon"></i>
                        <span>{{ menu.label }}</span>
                    </div>
                </div>
            </div>

            <!-- Area Konten Dinamis berdasarkan menu aktif -->
            <div class="main-content">
                <!-- KONTEN EDUKASI (halaman sesuai gambar) -->
                <div v-if="activeMenu === 'edukasi'">
                    <div class="edukasi-header">
                        <h2>Edukasi</h2>
                        <div class="search-wrapper">
                            <i class="fas fa-search"></i>
                            <input 
                                type="text" 
                                placeholder="Cari artikel..." 
                                v-model="searchQuery"
                            >
                        </div>
                    </div>

                    <!-- Daftar Artikel -->
                    <div class="artikel-grid" v-if="filteredArticles.length">
                        <div v-for="artikel in filteredArticles" :key="artikel.id" class="artikel-card">
                            <div class="card-content">
                                <div class="artikel-date">
                                    <i class="far fa-calendar-alt"></i> {{ artikel.date }}
                                </div>
                                <div class="artikel-title">{{ artikel.title }}</div>
                                <div class="artikel-excerpt">{{ artikel.excerpt }}</div>
                                <button class="btn-read" @click="openArticle(artikel)">
                                    Baca Selengkapnya <i class="fas fa-arrow-right"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div v-else class="no-results">
                        <i class="fas fa-water" style="font-size: 2rem; opacity: 0.5; margin-bottom: 10px; display: block;"></i>
                        Tidak ditemukan artikel dengan kata "{{ searchQuery }}"
                    </div>

                    <!-- Bagian Memahami Kategori & Tips (sesuai wireframe) -->
                    <div class="info-section">
                        <div class="info-card">
                            <h3><i class="fas fa-chart-line"></i> Memahami Kategori Kualitas Air</h3>
                            <p>Pelajari perbedaan antara air aman, perlu perhatian, dan tercemar. Kenali parameter pH, kekeruhan, dan kadar zat kimia.</p>
                            <button class="info-link" @click="openInfoModal('kategori')">
                                Baca Selengkapnya <i class="fas fa-chevron-right"></i>
                            </button>
                        </div>
                        <div class="info-card">
                            <h3><i class="fas fa-home"></i> Tips Menjaga Kualitas Air di Rumah</h3>
                            <p>Langkah-langkah praktis untuk memastikan air di rumah tetap bersih, mulai dari filter sederhana hingga pengecekan rutin.</p>
                            <button class="info-link" @click="openInfoModal('tips')">
                                Baca Selengkapnya <i class="fas fa-chevron-right"></i>
                            </button>
                        </div>
                    </div>
                </div>

                <!-- Halaman Analisis Baru (placeholder) -->
                <div v-if="activeMenu === 'analisisBaru'" style="padding: 1rem 0;">
                    <h2 style="color: #0a3b4e; margin-bottom: 1rem;"><i class="fas fa-flask"></i> Analisis Baru</h2>
                    <div style="background: #f0f9ff; border-radius: 1.5rem; padding: 2rem; text-align: center;">
                        <i class="fas fa-microscope" style="font-size: 3rem; color: #0f80b5;"></i>
                        <p style="margin-top: 1rem; color: #2c5a74;">Fitur analisis kualitas air akan segera hadir. Masukkan parameter sampel air untuk mendeteksi tingkat keamanan.</p>
                        <button style="margin-top: 1rem; background: #0f80b5; border: none; padding: 10px 24px; border-radius: 40px; color: white; font-weight: 600;">Mulai Analisis</button>
                    </div>
                </div>

                <!-- Halaman Riwayat -->
                <div v-if="activeMenu === 'riwayat'" style="padding: 1rem 0;">
                    <h2 style="color: #0a3b4e;"><i class="fas fa-history"></i> Riwayat Pengecekan</h2>
                    <div style="background: #f8fafc; border-radius: 1.2rem; margin-top: 1.5rem; padding: 2rem; text-align: center;">
                        <i class="fas fa-tint" style="font-size: 2.5rem; color: #8fc1df;"></i>
                        <p style="margin-top: 12px;">Belum ada riwayat analisis. Lakukan analisis baru untuk melihat data sebelumnya.</p>
                    </div>
                </div>

                <!-- Halaman Profil -->
                <div v-if="activeMenu === 'profil'" style="padding: 1rem 0;">
                    <h2 style="color: #0a3b4e;"><i class="fas fa-user-circle"></i> Profil Pengguna</h2>
                    <div style="background: #ffffff; border-radius: 1.5rem; border:1px solid #e0f0f7; padding: 2rem; margin-top: 1rem;">
                        <div style="display: flex; align-items: center; gap: 1rem; flex-wrap: wrap;">
                            <i class="fas fa-user-astronaut" style="font-size: 4rem; color: #0f80b5;"></i>
                            <div>
                                <h3 style="font-size: 1.4rem;">Pengguna PAKAR-AIR</h3>
                                <p style="color:#3f6e88">Deteksi kualitas air cerdas dan edukatif</p>
                            </div>
                        </div>
                        <hr style="margin: 1.5rem 0; border-color:#e2edf2;">
                        <p><i class="fas fa-envelope"></i> email@contoh.com</p>
                        <p><i class="fas fa-phone-alt"></i> +62 812 3456 7890</p>
                        <button style="margin-top: 1rem; background: #eef2f5; border: none; padding: 8px 20px; border-radius: 40px;">Edit Profil</button>
                    </div>
                </div>
            </div>
        </div>
        <footer>
            <i class="fas fa-water"></i> PAKAR-AIR · Sistem Deteksi & Edukasi Kualitas Air
        </footer>
    </div>

    <!-- Modal untuk baca artikel / info tambahan -->
    <div v-if="modalVisible" class="modal-overlay" @click.self="closeModal">
        <div class="modal-container">
            <h3>{{ modalTitle }}</h3>
            <p>{{ modalContent }}</p>
            <button class="close-modal" @click="closeModal">Tutup</button>
        </div>
    </div>
</div>

<script>
    const { createApp, ref, computed } = Vue;

    createApp({
        setup() {
            // Data menu navigasi
            const menuItems = [
                { key: 'edukasi', label: 'Edukasi', icon: 'fas fa-graduation-cap' },
                { key: 'analisisBaru', label: 'Analisis Baru', icon: 'fas fa-vial' },
                { key: 'riwayat', label: 'Riwayat', icon: 'fas fa-clock' },
                { key: 'profil', label: 'Profil', icon: 'fas fa-user' }
            ];
            const activeMenu = ref('edukasi');  // default sesuai gambar (Edukasi)

            // Data artikel edukasi (sesuai dengan deskripsi gambar)
            const articles = ref([
                {
                    id: 1,
                    date: '2025-03-15',
                    title: 'Cara Mengecek Kualitas Air Secara Sederhana',
                    excerpt: 'Pelajari cara dasar mengecek kualitas air di rumah tanpa alat khusus. Dengan indra penglihatan dan penciuman.',
                    fullContent: 'Air yang baik harus jernih, tidak berbau, dan tidak berasa. Anda bisa menguji dengan wadah bening, melihat kekeruhan, serta mencium bau amis atau klorin berlebih. Cara sederhana lainnya adalah dengan merendam kapas atau kain putih bersih untuk melihat residu.'
                },
                {
                    id: 2,
                    date: '2025-03-10',
                    title: 'Memahami Kategori Kualitas Air: Aman, Perhatian, Tercemar',
                    excerpt: 'Kenali parameter penting seperti pH, TDS, dan kekeruhan untuk menentukan status air Anda.',
                    fullContent: 'Air aman: pH 6.5-8.5, TDS < 600, jernih. Perlu perhatian: keruh ringan, pH sedikit asam/basa. Tercemar: bau menyengat, perubahan warna, TDS tinggi. Segera konsultasikan jika air tercemar.'
                },
                {
                    id: 3,
                    date: '2025-03-05',
                    title: 'Tips Menjaga Kualitas Air di Rumah',
                    excerpt: 'Langkah-langkah praktis untuk memastikan air di rumah tetap bersih dan layak konsumsi.',
                    fullContent: '1. Bersihkan tandon air secara rutin setiap 3 bulan. 2. Gunakan saringan sederhana dari kain katun. 3. Pastikan saluran pipa tidak bocor. 4. Rebus air minimal 5 menit sebelum minum. 5. Uji parameter kekeruhan secara berkala.'
                }
            ]);

            const searchQuery = ref('');

            // Filter artikel berdasarkan search
            const filteredArticles = computed(() => {
                if (!searchQuery.value.trim()) return articles.value;
                const query = searchQuery.value.toLowerCase();
                return articles.value.filter(art => 
                    art.title.toLowerCase().includes(query) || 
                    art.excerpt.toLowerCase().includes(query)
                );
            });

            // Modal state
            const modalVisible = ref(false);
            const modalTitle = ref('');
            const modalContent = ref('');

            // Fungsi buka artikel (baca selengkapnya)
            function openArticle(artikel) {
                modalTitle.value = artikel.title;
                modalContent.value = artikel.fullContent;
                modalVisible.value = true;
            }

            // Fungsi buka info kategori / tips (sesuai dengan section "Memahami Kategori" dan "Tips")
            function openInfoModal(type) {
                if (type === 'kategori') {
                    modalTitle.value = 'Memahami Kategori Kualitas Air';
                    modalContent.value = 'Air dikategorikan menjadi: 1) Air Aman: pH normal, jernih, tidak berasa. 2) Perlu Perhatian: sedikit keruh, bau ringan. 3) Tercemar: beracun, perubahan warna signifikan, bau menyengat. Selalu lakukan uji sederhana sebelum konsumsi.';
                } else if (type === 'tips') {
                    modalTitle.value = 'Tips Menjaga Kualitas Air di Rumah';
                    modalContent.value = '✅ Bersihkan penampungan air setiap 3 bulan. ✅ Gunakan filter keramik atau karbon aktif. ✅ Hindari mencampur limbah rumah tangga ke saluran air bersih. ✅ Lakukan pengecekan pH dengan strip indikator sederhana. ✅ Pastikan sirkulasi udara di sekitar tandon air tetap baik.';
                }
            }

            function closeModal() {
                modalVisible.value = false;
            }

            return {
                menuItems,
                activeMenu,
                articles,
                searchQuery,
                filteredArticles,
                modalVisible,
                modalTitle,
                modalContent,
                openArticle,
                openInfoModal,
                closeModal
            };
        }
    }).mount('#app');
</script>
</body>
</html>