<template>
  <div class="artikel-container">
    <div class="artikel-header">
      <h1>Cara Mengecek Kualitas Air Secara Sederhana</h1>
      <p class="tanggal">2025-03-15</p>
    </div>
    <div class="artikel-content">
      <img src="/assets/edukasi/cek-air-sederhana.jpg" alt="Cek Air Sederhana" class="artikel-gambar" />
      <p>
        Tidak semua orang memiliki akses ke laboratorium untuk menguji kualitas air. Namun, ada beberapa cara sederhana yang bisa Anda lakukan di rumah untuk mendeteksi apakah air layak digunakan atau tidak.
      </p>
      <h2>1. Uji Indra Penglihatan (Visual)</h2>
      <p>
        Tuang air ke dalam gelas bening dan lihat kejernihannya. Air yang baik seharusnya tidak berwarna, tidak keruh, dan tidak mengandung partikel seperti pasir atau karat. Jika air tampak kekuningan atau kecoklatan, bisa jadi mengandung zat besi atau tanah liat.
      </p>
      <h2>2. Uji Bau</h2>
      <p>
        Air bersih tidak berbau. Jika air berbau seperti telur busuk (H₂S), kemungkinan mengandung bakteri anaerob. Bau kaporit menandakan sisa klorin yang terlalu tinggi, sementara bau amis atau apek bisa berasal dari bahan organik yang membusuk.
      </p>
      <h2>3. Uji Rasa (Hati-hati)</h2>
      <p>
        Hanya lakukan jika air tampak jernih dan tidak berbau. Air yang baik seharusnya tidak terasa asin, pahit, atau logam. Rasa logam menandakan kandungan mineral berat seperti besi atau mangan.
      </p>
      <h2>4. Uji Sabun</h2>
      <p>
        Kocok air dengan sedikit sabun cair. Jika sabun tidak berbusa atau hanya sedikit busa, air tersebut mungkin mengandung kesadahan tinggi (kalsium/magnesium). Air sadah kurang baik untuk mencuci dan dapat merusak pipa.
      </p>
      <h2>5. Uji Endapan</h2>
      <p>
        Diamkan air dalam wadah bening selama 24 jam. Jika terdapat endapan di dasar, berarti air mengandung lumpur atau partikel tersuspensi yang seharusnya tidak ada dalam air bersih.
      </p>
      <div class="peringatan">
        <strong>⚠️ Peringatan:</strong> Metode sederhana ini hanya untuk deteksi awal. Untuk kepastian, terutama jika air digunakan untuk minum atau memasak, tetap lakukan pengujian laboratorium secara berkala.
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomeArtikel'
}
</script>

<style scoped>
.artikel-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}
.artikel-header h1 {
  color: #2c3e50;
  border-left: 5px solid #3498db;
  padding-left: 15px;
}
.tanggal {
  color: #7f8c8d;
  font-size: 0.9em;
}
.artikel-gambar {
  width: 100%;
  max-height: 400px;
  object-fit: cover;
  border-radius: 10px;
  margin: 20px 0;
}
h2 {
  color: #2980b9;
  margin-top: 25px;
}
.peringatan {
  background-color: #fcf8e3;
  border-left: 5px solid #f39c12;
  padding: 15px;
  margin-top: 30px;
  border-radius: 8px;
}
</style>