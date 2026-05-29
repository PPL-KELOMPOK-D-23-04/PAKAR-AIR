<template>
  <DashboardLayout>
    <div class="article-detail-view">
      
      <!-- Back Navigation -->
      <div class="article-top-nav">
        <router-link to="/education" class="back-link">
          <ArrowLeft size="16" />
          <span>Kembali ke Pusat Edukasi</span>
        </router-link>
      </div>

      <div class="article-grid">
        
        <!-- LEFT: MAIN ARTICLE CARD -->
        <div class="article-main-column">
          <BaseCard class="article-card" padding="none">
            
            <div class="article-cover-wrap">
              <img :src="coverImage" alt="Cover Artikel" class="article-cover" loading="lazy">
              <div class="cover-overlay">
                <span class="badge-category">Panduan Pengguna</span>
              </div>
            </div>
            
            <div class="article-content">
              <div class="article-header-meta">
                <div class="meta-left">
                  <h1 class="article-title">Memahami Hasil Analisis PAKAR-AIR: Panduan Lengkap Interpretasi Kualitas Air</h1>
                  <div class="meta-info">
                    <span class="meta-item"><Calendar size="14" /> 15 Maret 2026</span>
                    <span class="meta-divider">•</span>
                    <span class="meta-item"><Clock size="14" /> 6 mnt baca</span>
                    <span class="meta-divider">•</span>
                    <span class="meta-item"><User size="14" /> Tim Pakar PAKAR-AIR</span>
                  </div>
                </div>
              </div>

              <div class="article-body">
                <p class="lead-text">
                  Setelah Anda melakukan analisis kualitas air menggunakan PAKAR-AIR, sistem akan menampilkan hasil prediksi yang terdiri dari <strong>tiga komponen utama</strong>: kategori kualitas air, tingkat kepercayaan (confidence score), dan rekomendasi penggunaan.
                </p>

                <p>
                  PAKAR-AIR dirancang sebagai <strong>alat bantu (decision support system)</strong> untuk memberikan estimasi awal kualitas air secara cepat melalui integrasi Machine Learning.
                </p>

                <h2>1. Tiga Kategori Kualitas Air</h2>
                <p>
                  Berdasarkan visual dan parameter fisik yang diinput, algoritma kami mengklasifikasikan air ke dalam tiga kategori:
                </p>
                <ul class="styled-list">
                  <li><strong>Aman (Layak Digunakan):</strong> <span class="badge badge-success">Tindakan: Rebus sebelum konsumsi</span> — Air jernih, tidak berbau, tidak berwarna.</li>
                  <li><strong>Perlu Perlakuan:</strong> <span class="badge badge-warning">Tindakan: Saring & Endapkan</span> — Terdapat kekeruhan ringan atau bau tanah.</li>
                  <li><strong>Berpotensi Tercemar:</strong> <span class="badge badge-danger">Tindakan: Jangan Digunakan</span> — Indikasi kuat kontaminan. Keruh pekat, bau menyengat (kimia/busuk).</li>
                </ul>

                <div class="info-callout">
                  <div class="callout-icon bg-primary-subtle text-primary">
                    <Info size="20" />
                  </div>
                  <div class="callout-content">
                    <strong>Tips Meningkatkan Confidence Score</strong>
                    <p>Foto air menggunakan wadah kaca transparan dengan latar belakang putih. Pastikan pencahayaan terang dan hindari bayangan yang menutupi kejernihan air.</p>
                  </div>
                </div>

                <h2>2. Memahami Confidence Score</h2>
                <p>
                  <strong>Confidence score</strong> (0-100%) menunjukkan seberapa yakin model AI PAKAR-AIR terhadap prediksi yang dihasilkan. Angka ini dipengaruhi oleh resolusi foto, kejernihan input, dan konsistensi parameter teks yang Anda isi.
                </p>
                <ul class="styled-list">
                  <li><strong>Tinggi (80-100%):</strong> Prediksi sangat kuat, hasil dapat diandalkan.</li>
                  <li><strong>Sedang (60-79%):</strong> Prediksi cukup yakin, disarankan foto ulang.</li>
                  <li><strong>Rendah (0-59%):</strong> Kualitas input buruk. Sistem kesulitan menganalisis tekstur dan warna.</li>
                </ul>

                <h2>3. Batasan Sistem PAKAR-AIR</h2>
                
                <div class="warning-callout">
                  <div class="callout-icon bg-danger-subtle text-danger">
                    <AlertTriangle size="20" />
                  </div>
                  <div class="callout-content">
                    <strong>Bukan Pengganti Uji Lab</strong>
                    <p>PAKAR-AIR adalah alat skrining awal. Sistem AI kami tidak dapat mendeteksi virus mikroskopis, bakteri, atau kandungan kimia transparan. Jika aplikasi menyatakan "Berpotensi Tercemar", pastikan Anda melakukan uji laboratorium sesungguhnya.</p>
                  </div>
                </div>

                <hr class="article-divider" />

                <div class="reference-section">
                  <h3 class="reference-title">Daftar Referensi</h3>
                  <ul class="reference-list">
                    <li>Dokumentasi Teknis Algoritma PAKAR-AIR (v1.0)</li>
                    <li>Peraturan Menteri Kesehatan RI No. 492/Menkes/Per/IV/2010</li>
                  </ul>
                </div>
              </div>
            </div>
          </BaseCard>
        </div>

        <!-- RIGHT: SIDEBAR -->
        <div class="article-sidebar">
          
          <BaseCard class="action-card" padding="lg">
            <div class="action-icon-wrap">
              <Droplet size="24" class="text-primary" />
            </div>
            <h3 class="action-title">Mulai Uji Coba</h3>
            <p class="action-desc">Terapkan pengetahuan Anda dengan melakukan analisis sampel air nyata.</p>
            <button class="btn btn--primary btn--full" @click="goToAnalisis">
              Mulai Analisis
              <ArrowRight size="16" />
            </button>
          </BaseCard>

          <BaseCard padding="md" class="related-card">
            <h3 class="sidebar-title">Artikel Terkait</h3>
            <div class="related-list">
              <div class="related-item" @click="router.push('/artikel')">
                <div class="related-thumb">
                  <img src="https://images.unsplash.com/photo-1548839140-29a749e1cf4d?w=200&q=80" alt="Thumb" loading="lazy">
                </div>
                <div class="related-info">
                  <h4>Parameter Fisik Air Layak Konsumsi</h4>
                  <span class="related-meta">Edukasi Dasar</span>
                </div>
              </div>
              <div class="related-item" @click="router.push('/artikel2')">
                <div class="related-thumb">
                  <img src="https://images.unsplash.com/photo-1564424224827-cd24b8915874?w=200&q=80" alt="Thumb" loading="lazy">
                </div>
                <div class="related-info">
                  <h4>Dampak Pencemaran Air bagi Kesehatan</h4>
                  <span class="related-meta">Kesehatan & Lingkungan</span>
                </div>
              </div>
            </div>
          </BaseCard>

        </div>
      </div>
    </div>
  </DashboardLayout>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import DashboardLayout from '@/layouts/DashboardLayout.vue'
import BaseCard from '@/components/common/BaseCard.vue'
import { ArrowLeft, ArrowRight, Calendar, Clock, User, Info, AlertTriangle, Droplet } from 'lucide-vue-next'

const router = useRouter()

// Fixing the corrupt unsplash ID by using a verified working one
const coverImage = computed(() => {
  return 'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=1200&q=80'
})

function goToAnalisis() {
  router.push('/analysis')
}
</script>

<style scoped>
.article-detail-view {
  display: flex;
  flex-direction: column;
  min-height: 100%;
}

/* Top Nav */
.article-top-nav {
  margin-bottom: 24px;
}

.back-link {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
  text-decoration: none;
  font-weight: 600;
  transition: all 0.2s ease;
  padding: 8px 16px;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-sm);
}

.back-link:hover {
  color: var(--color-primary);
  border-color: var(--color-primary);
  transform: translateX(-4px);
}

/* Grid Layout */
.article-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 24px;
  align-items: start;
}

@media (min-width: 1024px) {
  .article-grid {
    grid-template-columns: 1fr 340px;
  }
}

/* Main Article Card */
.article-card {
  overflow: hidden;
  border-radius: var(--radius-xl);
}

.article-cover-wrap {
  position: relative;
  width: 100%;
  height: 320px;
  background: var(--color-bg);
}

.article-cover {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.cover-overlay {
  position: absolute;
  bottom: 0; left: 0; width: 100%;
  padding: 24px;
  background: linear-gradient(to top, rgba(0,0,0,0.6), transparent);
  display: flex;
  align-items: flex-end;
}

.badge-category {
  background: var(--color-primary);
  color: white;
  padding: 6px 14px;
  border-radius: 20px;
  font-size: var(--font-size-xs);
  font-weight: 700;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  box-shadow: var(--shadow-sm);
}

.article-content {
  padding: 40px;
}

@media (max-width: 768px) {
  .article-content { padding: 24px; }
}

.article-title {
  font-size: var(--font-size-2xl);
  font-weight: 800;
  color: var(--color-text-primary);
  margin: 0 0 16px 0;
  line-height: 1.3;
}

.meta-info {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 12px;
  margin-bottom: 32px;
}

.meta-item {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
  font-weight: 500;
}

.meta-divider {
  color: var(--color-border-strong);
}

.article-body {
  font-size: 1.05rem;
  line-height: 1.8;
  color: var(--color-text-secondary);
}

.article-body h2 {
  font-size: var(--font-size-xl);
  font-weight: 700;
  color: var(--color-text-primary);
  margin: 40px 0 16px 0;
  letter-spacing: -0.01em;
}

.article-body p {
  margin-bottom: 24px;
}

.article-body strong {
  color: var(--color-text-primary);
  font-weight: 700;
}

.lead-text {
  font-size: 1.15rem;
  font-weight: 500;
  color: var(--color-text-primary);
  line-height: 1.7;
}

.styled-list {
  list-style: none;
  padding: 0;
  margin: 0 0 32px 0;
}

.styled-list li {
  position: relative;
  padding-left: 24px;
  margin-bottom: 16px;
}

.styled-list li::before {
  content: "•";
  position: absolute;
  left: 0;
  color: var(--color-primary);
  font-size: 1.5rem;
  line-height: 1;
  top: -2px;
}

/* Callouts */
.info-callout, .warning-callout {
  display: flex;
  gap: 16px;
  padding: 24px;
  border-radius: var(--radius-lg);
  margin: 32px 0;
  border: 1px solid var(--color-border);
}

.info-callout { background: color-mix(in srgb, var(--color-primary) 3%, transparent); }
.warning-callout { background: color-mix(in srgb, var(--color-danger) 3%, transparent); }

.callout-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  flex-shrink: 0;
}

.bg-primary-subtle { background: color-mix(in srgb, var(--color-primary) 12%, transparent); }
.bg-danger-subtle { background: color-mix(in srgb, var(--color-danger) 12%, transparent); }
.text-primary { color: var(--color-primary); }
.text-danger { color: var(--color-danger); }

.callout-content {
  display: flex;
  flex-direction: column;
}

.callout-content strong {
  font-size: var(--font-size-md);
  margin-bottom: 4px;
  color: var(--color-text-primary);
}

.callout-content p {
  margin: 0;
  font-size: var(--font-size-sm);
  line-height: 1.6;
}

/* Badges Inline */
.badge {
  display: inline-block;
  padding: 2px 8px;
  border-radius: 4px;
  font-size: var(--font-size-xs);
  font-weight: 700;
  margin-left: 4px;
}
.badge-danger { background: color-mix(in srgb, var(--color-danger) 10%, transparent); color: var(--color-danger); }
.badge-warning { background: color-mix(in srgb, var(--color-warning) 15%, transparent); color: color-mix(in srgb, var(--color-warning) 80%, black); }
.badge-success { background: color-mix(in srgb, var(--color-success) 10%, transparent); color: var(--color-success); }

/* References */
.article-divider {
  border: none;
  border-top: 1px solid var(--color-border-light);
  margin: 48px 0 32px 0;
}

.reference-section {
  background: var(--color-bg);
  padding: 24px;
  border-radius: var(--radius-md);
}

.reference-title {
  font-size: var(--font-size-sm);
  text-transform: uppercase;
  letter-spacing: 0.5px;
  color: var(--color-text-muted);
  margin: 0 0 12px 0;
  font-weight: 700;
}

.reference-list {
  margin: 0;
  padding-left: 20px;
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
}
.reference-list li { margin-bottom: 8px; }

/* Sidebar */
.article-sidebar {
  display: flex;
  flex-direction: column;
  gap: 24px;
  position: sticky;
  top: 24px;
}

.action-card {
  text-align: center;
  border: 1px solid color-mix(in srgb, var(--color-primary) 20%, transparent);
  background: linear-gradient(180deg, var(--color-surface) 0%, var(--color-bg) 100%);
}

.action-icon-wrap {
  width: 56px;
  height: 56px;
  margin: 0 auto 16px;
  background: color-mix(in srgb, var(--color-primary) 10%, transparent);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.action-title {
  font-size: var(--font-size-md);
  font-weight: 700;
  color: var(--color-text-primary);
  margin: 0 0 8px 0;
}

.action-desc {
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
  margin: 0 0 20px 0;
}

.btn--full {
  width: 100%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.sidebar-title {
  font-size: var(--font-size-md);
  font-weight: 700;
  color: var(--color-text-primary);
  margin: 0 0 16px 0;
  padding-bottom: 12px;
  border-bottom: 1px solid var(--color-border-light);
}

.related-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.related-item {
  display: flex;
  gap: 12px;
  cursor: pointer;
  padding: 8px;
  border-radius: var(--radius-md);
  transition: background 0.2s;
}

.related-item:hover {
  background: var(--color-bg);
}

.related-thumb {
  width: 64px;
  height: 64px;
  border-radius: var(--radius-sm);
  overflow: hidden;
  flex-shrink: 0;
}

.related-thumb img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.related-info {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.related-info h4 {
  font-size: var(--font-size-sm);
  font-weight: 600;
  color: var(--color-text-primary);
  margin: 0 0 4px 0;
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.related-meta {
  font-size: 11px;
  color: var(--color-primary);
  font-weight: 600;
  text-transform: uppercase;
}
</style>
