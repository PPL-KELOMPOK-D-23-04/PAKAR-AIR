<template>
  <div class="artikel-container">
    <div class="artikel-header">
      <span class="badge kesehatan">Kesehatan & Lingkungan</span>
      <h1>Dampak Pencemaran Air: Dari Diare hingga Gagal Ginjal</h1>
      <div class="meta-info">
        <span>📅 Dipublikasikan: 12 Maret 2026</span>
        <span>⏱️ Durasi baca: 6 menit</span>
      </div>
    </div>

    <div class="artikel-gambar">
      <img src="https://placehold.co/800x400/e25c5c/white?text=Dampak+Pencemaran+Air" alt="Dampak pencemaran air">
    </div>

    <div class="artikel-konten">
      <p class="lead">
        <strong>Fakta WHO:</strong> Sekitar 80% penyakit di negara berkembang terkait kualitas air buruk. 
        Setiap tahun, lebih dari 3,4 juta orang meninggal akibat penyakit yang ditularkan melalui air.
      </p>

      <h2>🔬 Klasifikasi Pencemar Air</h2>
      <div class="grid-2">
        <div class="card-pencemar"><h3>🦠 Biologis</h3><p>E.coli, Salmonella, Hepatitis A, Giardia</p></div>
        <div class="card-pencemar"><h3>⚗️ Kimiawi</h3><p>Timbal, Merkuri, Pestisida, Nitrat</p></div>
        <div class="card-pencemar"><h3>🏭 Fisik</h3><p>Lumpur, Mikroplastik, Sedimen</p></div>
        <div class="card-pencemar"><h3>☢️ Radioaktif</h3><p>Uranium, Radon</p></div>
      </div>

      <h2>📋 Penyakit Akut (Jangka Pendek)</h2>
      <table class="tabel-penyakit">
        <thead>
          <tr><th>Penyakit</th><th>Penyebab</th><th>Gejala</th><th>Rentan</th></tr>
        </thead>
        <tbody>
          <tr><td>Diare / Kolera</td><td>Vibrio cholerae</td><td>Dehidrasi parah, muntah</td><td>Balita, lansia</td></tr>
          <tr><td>Demam Tifoid</td><td>Salmonella typhi</td><td>Demam tinggi, sakit perut</td><td>Semua usia</td></tr>
          <tr><td>Hepatitis A</td><td>Virus HAV</td><td>Kuning, lemas, urine gelap</td><td>Anak-anak</td></tr>
        </tbody>
      </table>

      <div class="info-box red">
        <strong>⚠️ Data Darurat:</strong> Setiap hari, lebih dari 800 anak di bawah 5 tahun meninggal akibat diare terkait air kotor.
      </div>

      <h2>🧠 Penyakit Kronis (Jangka Panjang)</h2>
      <ul>
        <li><strong>Gagal Ginjal Kronis:</strong> Logam berat terakumulasi di ginjal</li>
        <li><strong>Gangguan Perkembangan Saraf:</strong> Timbal menurunkan IQ anak</li>
        <li><strong>Kanker:</strong> Arsenik dalam air tanah menyebabkan kanker kulit</li>
        <li><strong>Gangguan Hormon:</strong> Pestisida menyebabkan infertilitas</li>
      </ul>

      <div class="stats-box">
        <h3>📊 Statistik Pencemaran Air di Indonesia</h3>
        <ul>
          <li>🔴 70% sungai di Jawa tercemar berat</li>
          <li>🔴 1 dari 3 sumur warga mengandung E.coli</li>
          <li>🔴 Biaya pengobatan: Rp 15 triliun/tahun</li>
        </ul>
      </div>

      <h2>🛡️ Tindakan Pencegahan</h2>
      <ol>
        <li>Skrining rutin dengan PAKAR-AIR setiap 3 bulan</li>
        <li>Rebus air hingga mendidih minimal 10 menit</li>
        <li>Gunakan filter air keramik atau karbon aktif</li>
        <li>Lindungi sumber air dari limbah rumah tangga</li>
      </ol>
    </div>

    <div class="artikel-footer">
      <button @click="$router.back()" class="btn-kembali">← Kembali</button>
      <button @click="cekAir" class="btn-cek">Cek Kualitas Air →</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ArtikelKesehatan',
  methods: {
    cekAir() { this.$router.push('/analisis'); }
  }
};
</script>

<style scoped>
.artikel-container {
  max-width: 1000px;
  margin: 0 auto;
  padding: 2rem 1.5rem;
  background: #fefefe;
}
.badge.kesehatan { background: #fee2e2; color: #b91c1c; }
.artikel-header h1 { font-size: 2rem; color: #7f1a1a; }
.lead {
  font-size: 1.2rem;
  background: #fef3c7;
  padding: 1rem;
  border-radius: 12px;
  border-left: 4px solid #f59e0b;
}
.grid-2 {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin: 1.5rem 0;
}
.card-pencemar {
  background: #f8fafc;
  padding: 1rem;
  border-radius: 12px;
  border: 1px solid #e2e8f0;
}
.card-pencemar h3 { margin: 0 0 0.5rem 0; }
.tabel-penyakit {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.9rem;
}
.tabel-penyakit th, .tabel-penyakit td {
  border: 1px solid #ddd;
  padding: 0.6rem;
  text-align: left;
}
.tabel-penyakit th { background: #7f1a1a; color: white; }
.info-box.red {
  background: #fee2e2;
  border-left: 4px solid #dc2626;
  padding: 1rem;
  margin: 1.5rem 0;
}
.stats-box {
  background: #1e293b;
  color: white;
  padding: 1.2rem;
  border-radius: 16px;
  margin: 1.5rem 0;
}
.stats-box h3 { color: #facc15; margin-top: 0; }
.artikel-footer {
  margin-top: 2rem;
  padding-top: 1.5rem;
  border-top: 1px solid #e2e8f0;
  display: flex;
  gap: 1rem;
  justify-content: space-between;
}
.btn-kembali {
  background: none;
  border: 1px solid #cbd5e1;
  padding: 0.7rem 1.5rem;
  border-radius: 40px;
  cursor: pointer;
}
.btn-cek {
  background: #b91c1c;
  border: none;
  padding: 0.7rem 1.5rem;
  border-radius: 40px;
  color: white;
  cursor: pointer;
}
</style>