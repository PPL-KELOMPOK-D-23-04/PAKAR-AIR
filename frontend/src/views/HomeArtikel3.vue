<template>
  <div class="article-page">
    <div class="article-container">
      <!-- HEADER - SAMA DENGAN ARTIKEL 1 & 2 -->
      <header class="article-header">
        <div class="article-meta">
          <span class="article-category ai">Panduan Pengguna AI</span>
          <span class="article-date">15 Maret 2026 · 7 menit membaca</span>
        </div>
        <h1 class="article-title">Memahami Hasil PAKAR-AIR: Panduan Lengkap Interpretasi Kategori, Confidence Score, dan Rekomendasi</h1>
        <div class="article-byline">
          <span class="author">Tim Pakar PAKAR-AIR</span>
          <span class="separator">•</span>
          <span class="source">Sumber: Dokumentasi Teknis PAKAR-AIR v1.0 & Standar Kualitas Air Kemenkes RI</span>
        </div>
      </header>

      <!-- GAMBAR HERO -->
      <figure class="article-figure">
        <img src="https://placehold.co/900x500/6b8c6b/ffffff?text=Hasil+Analisis+PAKAR-AIR" alt="Ilustrasi hasil analisis PAKAR-AIR" class="hero-image">
        <figcaption class="image-caption">PAKAR-AIR memberikan hasil analisis dalam tiga kategori dengan tingkat kepercayaan | Ilustrasi: PAKAR-AIR</figcaption>
      </figure>

      <!-- KONTEN UTAMA -->
      <div class="article-content">
        
        <!-- LEAD -->
        <p class="lead">
          <strong>Jakarta, PAKAR-AIR</strong> — Setelah Anda melakukan analisis kualitas air menggunakan 
          PAKAR-AIR, sistem akan menampilkan hasil prediksi yang terdiri dari tiga komponen utama: 
          <strong>kategori kualitas air, tingkat kepercayaan (confidence score), dan rekomendasi penggunaan</strong>. 
          Panduan ini akan membantu Anda memahami setiap komponen tersebut secara mendalam, sehingga 
          Anda dapat mengambil keputusan yang tepat berdasarkan hasil analisis.
        </p>

        <p>
          PAKAR-AIR (Pendeteksi Kualitas Air Berbasis Artificial Intelligence dan Rekognisi Citra) 
          adalah sistem yang dirancang untuk memberikan estimasi awal kualitas air melalui kombinasi 
          analisis citra air dan data manual yang Anda inputkan. Sebagai alat bantu (decision support system), 
          PAKAR-AIR membantu Anda mendapatkan gambaran awal tentang kualitas air secara cepat, mudah, 
          dan terjangkau — sebelum memutuskan untuk melakukan uji laboratorium lebih lanjut jika diperlukan.
        </p>

        <!-- ========== BAGIAN 1: TIGA KATEGORI ========== -->
        <h2>A. Tiga Kategori Kualitas Air</h2>
        <p>
          Berdasarkan parameter yang dianalisis (warna, kekeruhan, bau, sumber air, kondisi lingkungan, 
          serta fitur visual dari citra air), PAKAR-AIR mengklasifikasikan kualitas air ke dalam 
          <strong>tiga kategori utama</strong>. Berikut penjelasan detail setiap kategori beserta tindakan yang direkomendasikan:
        </p>

        <div class="kategori-grid">
          <!-- Kategori 1: AMAN -->
          <div class="kategori-card aman">
            <div class="kategori-icon">✅</div>
            <h3>Aman</h3>
            <div class="kategori-badge">Rekomendasi: Dapat Digunakan</div>
            <p>Air memenuhi standar fisik dan parameter umum yang ditetapkan oleh Peraturan Menteri Kesehatan RI No. 492/Menkes/Per/IV/2010.</p>
            <div class="kategori-detail">
              <strong>Karakteristik:</strong>
              <ul>
                <li>Tidak berwarna atau sangat jernih</li>
                <li>Tidak berbau</li>
                <li>Tidak berasa</li>
                <li>Tidak ada partikel tersuspensi yang terlihat</li>
              </ul>
            </div>
            <div class="kategori-action">
              <strong>📌 Tindakan yang Direkomendasikan:</strong><br>
              Air layak digunakan untuk kebutuhan rumah tangga seperti mandi, mencuci, dan memasak. 
              Namun, untuk konsumsi langsung (minum), tetap <strong>rebus hingga mendidih</strong> minimal 10 menit 
              untuk memastikan sterilitas dari kemungkinan kontaminasi mikroba yang tidak terdeteksi.
            </div>
          </div>

          <!-- Kategori 2: PERLU PERLAKUAN -->
          <div class="kategori-card perlu">
            <div class="kategori-icon">⚠️</div>
            <h3>Perlu Perlakuan</h3>
            <div class="kategori-badge">Rekomendasi: Harus Diolah Terlebih Dahulu</div>
            <p>Terdeteksi adanya kekeruhan, bau ringan, warna yang mencurigakan, atau indikasi awal kontaminasi.</p>
            <div class="kategori-detail">
              <strong>Karakteristik:</strong>
              <ul>
                <li>Sedikit keruh atau berwarna (kekuningan/kehijauan)</li>
                <li>Bau amis atau tanah (tidak menyengat)</li>
                <li>Mungkin mengandung partikel tersuspensi</li>
              </ul>
            </div>
            <div class="kategori-action">
              <strong>📌 Tindakan yang Direkomendasikan:</strong><br>
              Air <strong>masih dapat digunakan</strong> setelah melalui proses pengolahan sederhana:
              <ol>
                <li>Saring dengan kain bersih atau saringan keramik untuk menghilangkan partikel</li>
                <li>Endapkan selama 2-4 jam agar partikel halus mengendap</li>
                <li>Rebus minimal 15 menit untuk memastikan sterilisasi</li>
                <li>Jika memungkinkan, gunakan filter karbon aktif untuk menghilangkan bau dan rasa</li>
              </ol>
            </div>
          </div>

          <!-- Kategori 3: BERPOTENSI TERCEMAR -->
          <div class="kategori-card tercemar">
            <div class="kategori-icon">❌</div>
            <h3>Berpotensi Tercemar</h3>
            <div class="kategori-badge">Rekomendasi: JANGAN Digunakan</div>
            <p>Indikasi kuat adanya kontaminan berbahaya seperti bakteri patogen, logam berat, atau limbah kimia.</p>
            <div class="kategori-detail">
              <strong>Karakteristik:</strong>
              <ul>
                <li>Keruh pekat, berwarna (coklat, merah, kehitaman)</li>
                <li>Bau menyengat (telur busuk, minyak, kimia)</li>
                <li>Berasal dari lingkungan yang berisiko tinggi (dekat industri, timbunan sampah)</li>
              </ul>
            </div>
            <div class="kategori-action">
              <strong>📌 Tindakan yang Direkomendasikan:</strong><br>
              <strong>JANGAN gunakan air ini untuk minum, memasak, mandi, atau mencuci peralatan makan.</strong>
              <ol>
                <li>Cari sumber air alternatif yang lebih aman (air kemasan, air isi ulang terpercaya)</li>
                <li>Segera lakukan uji laboratorium untuk mengetahui jenis kontaminan secara pasti</li>
                <li>Laporkan ke dinas kesehatan atau lingkungan setempat jika sumber air digunakan banyak orang</li>
                <li>Jika terpaksa menggunakan (misal untuk mencuci), gunakan sarung tangan dan hindari kontak langsung</li>
              </ol>
            </div>
          </div>
        </div>

        <!-- ========== BAGIAN 2: CONFIDENCE SCORE ========== -->
        <h2>B. Memahami Confidence Score (Tingkat Kepercayaan)</h2>
        <p>
          <strong>Confidence score</strong> adalah angka antara 0-100% yang menunjukkan seberapa yakin model AI 
          PAKAR-AIR terhadap prediksi yang dihasilkan. Angka ini dihitung berdasarkan <strong>kualitas dan kelengkapan data input</strong> 
          yang Anda berikan, meliputi:
        </p>
        <ul>
          <li>Kualitas foto air (pencahayaan, ketajaman, latar belakang)</li>
          <li>Kelengkapan data manual (warna, bau, sumber air, kondisi lingkungan)</li>
          <li>Kesesuaian antara data visual dan data manual</li>
        </ul>

        <div class="confidence-container">
          <div class="confidence-bar">
            <div class="bar-segment high" style="width: 40%">80 - 100%</div>
            <div class="bar-segment medium" style="width: 35%">60 - 79%</div>
            <div class="bar-segment low" style="width: 25%">0 - 59%</div>
          </div>
          <div class="confidence-legend">
            <div class="legend-item">
              <span class="legend-dot high"></span>
              <span class="legend-text"><strong>Tinggi (80-100%)</strong> — Prediksi sangat kuat. Hasil dapat diandalkan untuk pengambilan keputusan. Data input Anda berkualitas baik.</span>
            </div>
            <div class="legend-item">
              <span class="legend-dot medium"></span>
              <span class="legend-text"><strong>Sedang (60-79%)</strong> — Prediksi cukup yakin, namun disarankan untuk mengulang analisis dengan foto yang lebih jelas dan data yang lebih lengkap untuk hasil yang lebih akurat.</span>
            </div>
            <div class="legend-item">
              <span class="legend-dot low"></span>
              <span class="legend-text"><strong>Rendah (0-59%)</strong> — Kualitas input tidak memadai. Hasil prediksi tidak dapat diandalkan. Ulangi analisis dengan pencahayaan yang lebih baik, foto yang lebih tajam, dan data yang lengkap.</span>
            </div>
          </div>
        </div>

        <div class="info-card tip">
          <div class="info-icon">💡</div>
          <div class="info-content">
            <strong>Tips Meningkatkan Confidence Score</strong>
            <ul>
              <li><strong>Pencahayaan:</strong> Gunakan cahaya alami yang cukup (pukul 10.00 - 14.00). Hindari bayangan dan silau.</li>
              <li><strong>Wadah sampel:</strong> Gunakan gelas atau wadah bening (kaca atau plastik transparan) yang bersih.</li>
              <li><strong>Latar belakang:</strong> Letakkan wadah di atas kertas putih bersih untuk kontras yang optimal.</li>
              <li><strong>Posisi kamera:</strong> Foto dari jarak 20-30 cm, pastikan fokus tajam dan seluruh sampel air terlihat.</li>
              <li><strong>Data manual:</strong> Isi seluruh field dengan jujur dan teliti (pilih warna, bau, sumber air, kondisi lingkungan yang paling sesuai).</li>
              <li><strong>Hindari filter:</strong> Jangan gunakan filter kamera atau efek editing pada foto air.</li>
              <li><strong>Ulangi analisis:</strong> Jika confidence score rendah, lakukan analisis ulang dengan memperbaiki kualitas foto dan kelengkapan data.</li>
            </ul>
          </div>
        </div>

        <!-- ========== BAGIAN 3: REKOMENDASI ========== -->
        <h2>C. Memahami Rekomendasi Penggunaan</h2>
        <p>
          Berdasarkan kombinasi kategori kualitas air dan confidence score, PAKAR-AIR akan memberikan 
          rekomendasi spesifik yang dapat Anda ikuti. Berikut panduan interpretasi rekomendasi:
        </p>

        <div class="recommendation-grid">
          <div class="rekom-card">
            <div class="rekom-icon">🚰</div>
            <div class="rekom-content">
              <strong>Untuk Air Minum dan Memasak</strong>
              <p>Jika kategori <strong>Aman</strong> dengan confidence score >80%: Air siap digunakan setelah direbus.<br>
              Jika confidence score 60-80%: Rebus lebih lama (15-20 menit) atau gunakan filter tambahan.<br>
              Jika confidence score <60% atau kategori lain: Jangan gunakan untuk konsumsi.</p>
            </div>
          </div>
          <div class="rekom-card">
            <div class="rekom-icon">🛁</div>
            <div class="rekom-content">
              <strong>Untuk Mandi dan Mencuci</strong>
              <p>Kategori <strong>Aman</strong> atau <strong>Perlu Perlakuan</strong>: Dapat digunakan. Untuk kategori Perlu Perlakuan, disarankan untuk menghindari kontak dengan mata dan luka terbuka.<br>
              Kategori <strong>Tercemar</strong>: Jangan digunakan untuk mandi atau mencuci pakaian karena partikel kontaminan dapat menempel.</p>
            </div>
          </div>
          <div class="rekom-card">
            <div class="rekom-icon">🌱</div>
            <div class="rekom-content">
              <strong>Untuk Irigasi Tanaman</strong>
              <p>Kategori <strong>Aman</strong> dan <strong>Perlu Perlakuan</strong>: Aman untuk tanaman non-pangan. Untuk tanaman pangan (sayur, buah), gunakan air dengan kategori Aman.<br>
              Kategori <strong>Tercemar</strong>: Jangan gunakan untuk irigasi tanaman yang akan dikonsumsi.</p>
            </div>
          </div>
          <div class="rekom-card">
            <div class="rekom-icon">🐟</div>
            <div class="rekom-content">
              <strong>Untuk Kolam Ikan/Ternak</strong>
              <p>Hanya gunakan air dengan kategori <strong>Aman</strong> dan confidence score >80%. Kontaminan dalam air dapat membunuh ikan dan hewan ternak atau membuat dagingnya tidak layak konsumsi.</p>
            </div>
          </div>
        </div>

        <!-- ========== BAGIAN 4: CONTOH KASUS ========== -->
        <h2>D. Contoh Kasus Analisis</h2>
        <p>
          Berikut adalah beberapa skenario contoh hasil analisis menggunakan PAKAR-AIR untuk membantu 
          Anda memahami bagaimana membaca dan menginterpretasikan output sistem:
        </p>

        <div class="example-list">
          <div class="example-item">
            <div class="example-header">📋 Skenario 1: Air Sumur di Daerah Pemukiman (Hasil Optimal)</div>
            <div class="example-body">
              <p><strong>Data Input:</strong></p>
              <ul>
                <li>Foto: Air tampak jernih, tidak berwarna, latar putih</li>
                <li>Warna: Tidak berwarna / jernih</li>
                <li>Bau: Tidak berbau</li>
                <li>Sumber air: Sumur gali (kedalaman 15 meter)</li>
                <li>Lingkungan: Pemukiman warga, tidak ada pabrik dalam radius 1 km</li>
              </ul>
              <p><strong>Output PAKAR-AIR:</strong></p>
              <ul>
                <li>Kategori: <span class="badge-safe">Aman</span></li>
                <li>Confidence Score: 94% (Tinggi)</li>
                <li>Rekomendasi: Air layak digunakan untuk kebutuhan rumah tangga. Rebus hingga mendidih sebelum dikonsumsi.</li>
              </ul>
              <p class="example-note">✅ Interpretasi: Sangat baik. Data input berkualitas tinggi. Air aman digunakan dengan catatan direbus terlebih dahulu.</p>
            </div>
          </div>

          <div class="example-item">
            <div class="example-header">📋 Skenario 2: Air Sungai di Dekat Kawasan Industri (Hasil Peringatan)</div>
            <div class="example-body">
              <p><strong>Data Input:</strong></p>
              <ul>
                <li>Foto: Air tampak keruh kecoklatan, ada buih di permukaan</li>
                <li>Warna: Coklat muda</li>
                <li>Bau: Bau amis dan sedikit menyengat seperti kimia</li>
                <li>Sumber air: Sungai</li>
                <li>Lingkungan: Sekitar 500 meter dari pabrik tekstil dan industri kecil</li>
              </ul>
              <p><strong>Output PAKAR-AIR:</strong></p>
              <ul>
                <li>Kategori: <span class="badge-danger">Berpotensi Tercemar</span></li>
                <li>Confidence Score: 87% (Tinggi)</li>
                <li>Rekomendasi: JANGAN gunakan air ini untuk keperluan apapun. Segera lakukan uji laboratorium untuk mengetahui jenis kontaminan secara pasti. Laporkan ke dinas lingkungan setempat.</li>
              </ul>
              <p class="example-note">⚠️ Interpretasi: Peringatan serius. Model AI sangat yakin bahwa air ini tercemar. Harus segera ditindaklanjuti dengan uji lab.</p>
            </div>
          </div>

          <div class="example-item">
            <div class="example-header">📋 Skenario 3: Kualitas Input Kurang Baik (Hasil Tidak Optimal)</div>
            <div class="example-body">
              <p><strong>Data Input:</strong></p>
              <ul>
                <li>Foto: Gelap, buram, kurang fokus, terlihat bayangan jari</li>
                <li>Warna: Tidak diisi</li>
                <li>Bau: Tidak diisi</li>
                <li>Sumber air: Tidak diisi</li>
                <li>Lingkungan: Tidak diisi</li>
              </ul>
              <p><strong>Output PAKAR-AIR:</strong></p>
              <ul>
                <li>Kategori: <span class="badge-warning">Tidak Dapat Ditentukan</span></li>
                <li>Confidence Score: 42% (Rendah)</li>
                <li>Rekomendasi: Ulangi analisis dengan foto yang lebih jelas (cahaya cukup, fokus tajam, latar putih) dan lengkapi seluruh data manual yang diminta.</li>
              </ul>
              <p class="example-note">📌 Interpretasi: Hasil tidak dapat diandalkan. Perbaiki kualitas input dan ulangi analisis.</p>
            </div>
          </div>

          <div class="example-item">
            <div class="example-header">📋 Skenario 4: Air PDAM di Perkotaan (Ambang Batas)</div>
            <div class="example-body">
              <p><strong>Data Input:</strong></p>
              <ul>
                <li>Foto: Air tampak jernih</li>
                <li>Warna: Tidak berwarna</li>
                <li>Bau: Bau kaporit ringan</li>
                <li>Sumber air: PDAM</li>
                <li>Lingkungan: Perkotaan, kepadatan tinggi</li>
              </ul>
              <p><strong>Output PAKAR-AIR:</strong></p>
              <ul>
                <li>Kategori: <span class="badge-warning">Perlu Perlakuan</span></li>
                <li>Confidence Score: 76% (Sedang)</li>
                <li>Rekomendasi: Air masih dapat digunakan. Endapkan selama 30 menit atau rebus untuk menghilangkan bau kaporit. Gunakan filter karbon aktif untuk hasil optimal.</li>
              </ul>
              <p class="example-note">📌 Interpretasi: Air PDAM umumnya sudah memenuhi standar, namun bau kaporit menunjukkan kadar klorin yang tinggi. Perlakuan sederhana sudah cukup.</p>
            </div>
          </div>
        </div>

        <!-- ========== BAGIAN 5: BATASAN SISTEM ========== -->
        <h2>E. Batasan PAKAR-AIR (Harus Dipahami)</h2>
        <p>
          Sebagai pengguna PAKAR-AIR, penting untuk memahami keterbatasan sistem agar tidak 
          terjadi kesalahan interpretasi atau pengambilan keputusan yang keliru:
        </p>

        <div class="warning-card">
          <div class="warning-icon">⚠️</div>
          <div class="warning-content">
            <strong>Batasan Fundamental PAKAR-AIR</strong>
            <ul>
              <li><strong>Bukan pengganti uji laboratorium:</strong> PAKAR-AIR adalah <strong>alat skrining awal (screening tool)</strong> yang memberikan estimasi cepat. Untuk keperluan medis, legal, atau konsumsi massal (depot air minum, restoran, industri makanan), <strong>WAJIB melakukan uji laboratorium standar yang terakreditasi</strong>.</li>
              <li><strong>Parameter terbatas:</strong> Parameter yang dianalisis terbatas pada aspek visual (dari foto) dan data manual yang diinput pengguna. Sistem <strong>tidak mendeteksi</strong> virus, logam berat kadar sangat rendah, pestisida, atau kontaminan mikroba spesifik secara langsung.</li>
              <li><strong>Ketergantungan pada kualitas input:</strong> Akurasi prediksi sangat bergantung pada kualitas foto dan kelengkapan data manual yang Anda berikan. Foto buram, gelap, atau data tidak lengkap akan menghasilkan confidence score rendah.</li>
              <li><strong>Estimasi, bukan diagnosis:</strong> Hasil PAKAR-AIR adalah <strong>estimasi awal</strong> berdasarkan dataset yang digunakan untuk melatih model AI. Selalu konfirmasi dengan uji laboratorium jika hasil menunjukkan indikasi pencemaran.</li>
              <li><strong>Tidak terintegrasi dengan sensor fisik:</strong> PAKAR-AIR saat ini hanya berbasis web dan belum mencakup integrasi dengan perangkat sensor fisik untuk pengukuran parameter kimia secara real-time.</li>
            </ul>
          </div>
        </div>

        <p>
          Jika confidence score berada di bawah 60% atau kategori menunjukkan "Berpotensi Tercemar", 
          <strong>WAJIB melakukan konfirmasi ke laboratorium kesehatan lingkungan terdekat</strong> 
          (Balai Teknis Kesehatan Lingkungan, Laboratorium Kesehatan Daerah, atau laboratorium terakreditasi lainnya).
        </p>

        <!-- ========== BAGIAN 6: FAQ ========== -->
        <h2>F. Pertanyaan yang Sering Diajukan (FAQ)</h2>

        <div class="faq-section">
          <div class="faq-item">
            <div class="faq-question">Apakah PAKAR-AIR bisa menggantikan tes laboratorium untuk air minum?</div>
            <div class="faq-answer">Tidak. PAKAR-AIR adalah alat bantu skrining awal. Untuk keperluan medis, legal, atau komersial, Anda tetap WAJIB menggunakan uji laboratorium standar yang terakreditasi. PAKAR-AIR membantu Anda mengetahui kapan perlu melakukan uji lab lebih lanjut.</div>
          </div>

          <div class="faq-item">
            <div class="faq-question">Seberapa akurat PAKAR-AIR dibandingkan uji laboratorium?</div>
            <div class="faq-answer">PAKAR-AIR memiliki tingkat akurasi yang baik untuk parameter visual (warna, kekeruhan, indikasi kontaminasi kasat mata). Namun, akurasinya tidak dapat menyamai uji laboratorium yang menggunakan peralatan canggih (spektrofotometer, PCR, dll.) dengan metode standar. PAKAR-AIR mencapai akurasi sekitar 85-90% untuk deteksi kontaminasi tingkat menengah hingga berat.</div>
          </div>

          <div class="faq-item">
            <div class="faq-question">Mengapa confidence score saya rendah padahal air terlihat bersih?</div>
            <div class="faq-answer">Confidence score rendah biasanya disebabkan oleh kualitas foto yang kurang baik: pencahayaan kurang (foto gelap), gambar buram (kurang fokus), latar belakang tidak kontras, atau ada bayangan/refleksi. Data manual yang tidak lengkap juga menurunkan confidence score. Coba ulangi analisis dengan memperbaiki faktor-faktor tersebut.</div>
          </div>

          <div class="faq-item">
            <div class="faq-question">Apakah data analisis saya aman dan disimpan?</div>
            <div class="faq-answer">Ya. Semua data analisis Anda disimpan secara aman untuk keperluan riwayat analisis. Data hanya dapat diakses oleh akun Anda sendiri (pengguna yang melakukan analisis). PAKAR-AIR mematuhi prinsip perlindungan data pribadi dan tidak membagikan data pengguna kepada pihak ketiga tanpa izin tertulis.</div>
          </div>

          <div class="faq-item">
            <div class="faq-question">Bisakah saya mengekspor hasil analisis untuk dokumentasi?</div>
            <div class="faq-answer">Ya, Anda dapat mengekspor hasil analisis dari halaman Riwayat Analisis dalam format PDF atau CSV. Fitur ini berguna untuk dokumentasi pribadi, laporan, atau sebagai lampiran saat berkonsultasi dengan tenaga kesehatan atau laboratorium.</div>
          </div>

          <div class="faq-item">
            <div class="faq-question">Apakah PAKAR-AIR mendeteksi semua jenis kontaminan air?</div>
            <div class="faq-answer">Tidak. PAKAR-AIR dirancang untuk mendeteksi indikasi kontaminasi berdasarkan parameter visual (warna, kekeruhan, buih, partikel) dan data manual (bau, sumber, lingkungan). Sistem tidak dapat mendeteksi kontaminan yang tidak mengubah tampilan air, seperti kadar logam berat rendah, pestisida dosis kecil, atau virus tertentu. Untuk deteksi kontaminan tersebut, diperlukan uji laboratorium khusus.</div>
          </div>
        </div>

        <!-- ========== BAGIAN 7: REFERENSI ========== -->
        <div class="reference-card">
          <h4>📚 Referensi dan Sumber</h4>
          <ul>
            <li>Dokumentasi Teknis PAKAR-AIR (Pendeteksi Kualitas Air Berbasis Artificial Intelligence) v1.0</li>
            <li>Peraturan Menteri Kesehatan Republik Indonesia No. 492/Menkes/Per/IV/2010 tentang Persyaratan Kualitas Air Minum</li>
            <li>World Health Organization (WHO) — Guidelines for Drinking-water Quality, 4th Edition incorporating the 1st and 2nd addenda (2024)</li>
            <li>United Nations Sustainable Development Goal 6: Clean Water and Sanitation — Progress Report 2025</li>
            <li>American Public Health Association (APHA) — Standard Methods for the Examination of Water and Wastewater, 24th Edition</li>
            <li>ISO 5667 Series — Water Quality Sampling Guidelines</li>
          </ul>
        </div>

        <!-- CLOSING NOTE -->
        <p class="closing-note">
          <strong>Pesan dari Tim PAKAR-AIR:</strong> Kami berharap panduan ini membantu Anda memahami 
          hasil analisis air dengan lebih baik. PAKAR-AIR hadir untuk memberdayakan masyarakat dalam 
          memantau kualitas air secara mandiri. Ingatlah bahwa air bersih adalah fondasi kesehatan. 
          Dengan pengetahuan yang tepat, Anda dapat melindungi diri, keluarga, dan lingkungan dari 
          risiko yang terkait dengan air tercemar.
        </p>
        <p class="closing-note">
          <strong>#AirBersihUntukSemua #SDG6 #PAKARAIR</strong>
        </p>
      </div>

      <!-- FOOTER - SAMA DENGAN ARTIKEL 1 & 2 -->
      <footer class="article-footer">
        <button @click="$router.back()" class="btn-outline">← Kembali ke Halaman Edukasi</button>
        <button @click="cobaAnalisis" class="btn-primary ai-btn">Mulai Analisis Air Sekarang →</button>
      </footer>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ArtikelInterpretasi',
  methods: {
    cobaAnalisis() {
      this.$router.push('/analisis');
    }
  }
};
</script>

<style scoped>
/* ============================================ */
/* STYLE SAMA PERSIS DENGAN ARTIKEL 1 & 2       */
/* Desain: Profesional, Elegan, Warm, Clean     */
/* ============================================ */

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.article-page {
  background: #faf8f5;
  min-height: 100vh;
  padding: 2rem 1rem;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', sans-serif;
}

.article-container {
  max-width: 880px;
  margin: 0 auto;
  background: #ffffff;
  border-radius: 24px;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.04);
  overflow: hidden;
}

/* HEADER */
.article-header {
  padding: 2.5rem 2.8rem 1rem 2.8rem;
}

.article-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.2rem;
  font-size: 0.8rem;
}

.article-category {
  background: #f0ebe3;
  color: #8b7355;
  padding: 0.2rem 0.8rem;
  border-radius: 20px;
  font-weight: 500;
  letter-spacing: 0.3px;
}

.article-category.ai {
  background: #e8eef0;
  color: #4a6a6a;
}

.article-date {
  color: #9aa6b5;
}

.article-title {
  font-size: 1.9rem;
  line-height: 1.35;
  font-weight: 600;
  color: #3a5a4a;
  margin-bottom: 1rem;
  letter-spacing: -0.3px;
}

.article-byline {
  font-size: 0.8rem;
  color: #7c8b9c;
  border-top: 1px solid #edebe6;
  padding-top: 1rem;
}

.separator {
  margin: 0 0.5rem;
}

/* FIGURE & IMAGE */
.article-figure {
  margin: 1.5rem 2.8rem;
}

.hero-image {
  width: 100%;
  border-radius: 16px;
  object-fit: cover;
  background: #e8e4dd;
}

.image-caption {
  font-size: 0.7rem;
  color: #a8b3c0;
  text-align: center;
  margin-top: 0.6rem;
}

/* CONTENT */
.article-content {
  padding: 0 2.8rem 2rem 2.8rem;
}

.lead {
  font-size: 1.05rem;
  line-height: 1.65;
  color: #4b5c6e;
  margin-bottom: 1.5rem;
  border-left: 3px solid #c9a87b;
  padding-left: 1.2rem;
}

p {
  font-size: 1rem;
  line-height: 1.7;
  color: #3a4a5c;
  margin-bottom: 1.2rem;
}

h2 {
  font-size: 1.4rem;
  font-weight: 600;
  color: #3a5a4a;
  margin: 2rem 0 1rem 0;
  padding-bottom: 0.3rem;
  border-bottom: 2px solid #e8e2d8;
}

h3 {
  font-size: 1rem;
  font-weight: 600;
  color: #5a7a5a;
  margin-bottom: 0.5rem;
}

/* KATEGORI GRID (3 kategori) */
.kategori-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 1.2rem;
  margin: 1.5rem 0;
}

.kategori-card {
  background: #f8f6f2;
  padding: 1.2rem;
  border-radius: 16px;
  border-top: 3px solid;
  transition: all 0.2s ease;
}

.kategori-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

.kategori-card.aman { border-top-color: #6b8c6b; }
.kategori-card.perlu { border-top-color: #d4a373; }
.kategori-card.tercemar { border-top-color: #b85c5c; }

.kategori-icon {
  font-size: 2rem;
  margin-bottom: 0.5rem;
}

.kategori-badge {
  font-size: 0.7rem;
  background: rgba(0, 0, 0, 0.05);
  padding: 0.2rem 0.5rem;
  border-radius: 20px;
  display: inline-block;
  margin: 0.5rem 0;
  color: #5a6a7a;
}

.kategori-card p {
  font-size: 0.9rem;
  margin-bottom: 0.8rem;
  color: #5a6a7a;
}

.kategori-detail {
  font-size: 0.85rem;
  margin: 0.8rem 0;
  padding: 0.5rem;
  background: rgba(0, 0, 0, 0.02);
  border-radius: 8px;
}

.kategori-detail ul {
  margin: 0.3rem 0 0 1rem;
  padding: 0;
}

.kategori-detail li {
  font-size: 0.8rem;
  margin-bottom: 0.2rem;
}

.kategori-action {
  font-size: 0.8rem;
  background: rgba(0, 0, 0, 0.03);
  padding: