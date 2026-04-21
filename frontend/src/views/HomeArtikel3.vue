<template>
  <div class="artikel-container">
    <div class="artikel-header">
      <span class="badge ai">Panduan Pengguna AI</span>
      <h1>Memahami Hasil PAKAR-AIR: Kategori & Confidence Score</h1>
      <div class="meta-info">
        <span>📅 Dipublikasikan: 15 Maret 2026</span>
        <span>⏱️ Durasi baca: 5 menit</span>
      </div>
    </div>

    <div class="artikel-konten">
      <p class="lead">
        <strong>Selamat!</strong> Anda telah melakukan analisis. Mari pahami arti hasil yang ditampilkan.
      </p>

      <h2>🎯 Tiga Kategori Kualitas Air</h2>
      <div class="kategori-grid">
        <div class="kategori-card aman">
          <div class="icon">✅</div>
          <h3>Aman</h3>
          <p>Air memenuhi standar fisik. Cocok untuk rumah tangga setelah direbus.</p>
          <div class="tindakan">Tindakan: Gunakan seperti biasa, rebus untuk konsumsi.</div>
        </div>
        <div class="kategori-card perlu">
          <div class="icon">⚠️</div>
          <h3>Perlu Perlakuan</h3>
          <p>Terdeteksi kekeruhan atau bau ringan.</p>
          <div class="tindakan">Tindakan: Saring, endapkan, atau rebus 15 menit.</div>
        </div>
        <div class="kategori-card tercemar">
          <div class="icon">❌</div>
          <h3>Berpotensi Tercemar</h3>
          <p>Indikasi kuat kontaminan berbahaya.</p>
          <div class="tindakan">Tindakan: JANGAN digunakan. Uji lab diperlukan.</div>
        </div>
      </div>

      <h2>📊 Memahami Confidence Score</h2>
      <p>Confidence score adalah angka 0-100% yang menunjukkan seberapa yakin model AI terhadap prediksinya.</p>

      <div class="confidence-meter">
        <div class="confidence-bar">
          <div class="bar tinggi" style="width: 40%">80-100%</div>
          <div class="bar sedang" style="width: 35%">60-79%</div>
          <div class="bar rendah" style="width: 25%">0-59%</div>
        </div>
        <div class="legend">
          <span><span class="dot tinggi"></span> Tinggi: Bisa diandalkan</span>
          <span><span class="dot sedang"></span> Sedang: Ulang dengan foto lebih baik</span>
          <span><span class="dot rendah"></span> Rendah: Input kurang, ulangi analisis</span>
        </div>
      </div>

      <div class="info-box">
        <strong>💡 Tips Meningkatkan Confidence Score:</strong>
        <ul>
          <li>Gunakan foto dengan pencahayaan alami (siang hari)</li>
          <li>Letakkan air di wadah bening dengan latar putih</li>
          <li>Isi semua data manual dengan jujur</li>
        </ul>
      </div>

      <h2>📝 Contoh Hasil Analisis</h2>
      <div class="contoh">
        <div class="contoh-card">
          <div class="contoh-header">Skenario 1: Air Sumur</div>
          <div class="contoh-body">
            <p>Input: Air jernih, tidak berbau</p>
            <p>Output: <span class="tag-aman">Aman</span> (Confidence: 94%)</p>
          </div>
        </div>
        <div class="contoh-card">
          <div class="contoh-header">Skenario 2: Air Sungai</div>
          <div class="contoh-body">
            <p>Input: Air keruh, bau amis</p>
            <p>Output: <span class="tag-tercemar">Tercemar</span> (Confidence: 87%)</p>
          </div>
        </div>
      </div>

      <div class="warning-box">
        <strong>⚠️ Batasan PAKAR-AIR:</strong>
        <ul>
          <li>Ini adalah alat skrining awal, BUKAN pengganti uji laboratorium</li>
          <li>Jika confidence score rendah atau kategori "Tercemar", WAJIB konfirmasi ke lab</li>
        </ul>
      </div>
    </div>

    <div class="artikel-footer">
      <button @click="$router.back()" class="btn-kembali">← Kembali</button>
      <button @click="cobaAnalisis" class="btn-coba">Coba Analisis →</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ArtikelInterpretasi',
  methods: {
    cobaAnalisis() { this.$router.push('/analisis'); }
  }
};
</script>

<style scoped>
.artikel-container {
  max-width: 950px;
  margin: 0 auto;
  padding: 2rem 1.5rem;
}
.badge.ai { background: #e0e7ff; color: #3730a3; }
.kategori-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1rem;
  margin: 1.5rem 0;
}
.kategori-card {
  padding: 1.2rem;
  border-radius: 16px;
  background: #f8fafc;
  border-top: 4px solid;
}
.kategori-card.aman { border-top-color: #22c55e; }
.kategori-card.perlu { border-top-color: #f59e0b; }
.kategori-card.tercemar { border-top-color: #ef4444; }
.icon { font-size: 2rem; margin-bottom: 0.5rem; }
.confidence-meter {
  background: #f1f5f9;
  padding: 1rem;
  border-radius: 12px;
}
.confidence-bar {
  display: flex;
  height: 40px;
  border-radius: 8px;
  overflow: hidden;
  margin-bottom: 1rem;
}
.bar {
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: bold;
  font-size: 0.8rem;
}
.bar.tinggi { background: #22c55e; }
.bar.sedang { background: #f59e0b; }
.bar.rendah { background: #ef4444; }
.legend {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  font-size: 0.8rem;
}
.dot {
  display: inline-block;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  margin-right: 5px;
}
.dot.tinggi { background: #22c55e; }
.dot.sedang { background: #f59e0b; }
.dot.rendah { background: #ef4444; }
.contoh {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin: 1rem 0;
}
.contoh-card {
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  overflow: hidden;
}
.contoh-header {
  background: #f1f5f9;
  padding: 0.75rem 1rem;
  font-weight: bold;
}
.contoh-body { padding: 1rem; }
.tag-aman {
  background: #dcfce7;
  color: #166534;
  padding: 0.2rem 0.5rem;
  border-radius: 20px;
}
.tag-tercemar {
  background: #fee2e2;
  color: #991b1b;
  padding: 0.2rem 0.5rem;
  border-radius: 20px;
}
.info-box {
  background: #e8f4f8;
  padding: 1rem;
  border-radius: 12px;
  margin: 1rem 0;
}
.warning-box {
  background: #fee2e2;
  padding: 1rem;
  border-radius: 12px;
  margin: 1rem 0;
}
.artikel-footer {
  margin-top: 2rem;
  padding-top: 1.5rem;
  border-top: 1px solid #e2e8f0;
  display: flex;
  justify-content: space-between;
}
.btn-kembali {
  background: none;
  border: 1px solid #cbd5e1;
  padding: 0.7rem 1.5rem;
  border-radius: 40px;
  cursor: pointer;
}
.btn-coba {
  background: #3730a3;
  border: none;
  padding: 0.7rem 1.5rem;
  border-radius: 40px;
  color: white;
  cursor: pointer;
}
</style>