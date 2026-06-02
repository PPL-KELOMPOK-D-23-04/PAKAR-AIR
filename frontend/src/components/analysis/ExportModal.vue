<template>
  <!-- Overlay -->
  <div class="modal-overlay" @click.self="$emit('close')">
    <div class="modal-box">

      <!-- Header -->
      <div class="modal-header">
        <div class="modal-header__left">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none"
            viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round"
              d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
          <span>Ekspor Riwayat Analisis</span>
        </div>
        <button class="modal-close" @click="$emit('close')" aria-label="Tutup">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none"
            viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <!-- Body -->
      <div class="modal-body">
        <p class="modal-desc">
          Pilih format file untuk mengekspor
          <strong>{{ totalItems }} data</strong> riwayat analisis Anda.
          Filter aktif akan ikut diterapkan.
        </p>

        <!-- Format options -->
        <div class="format-grid">
          <!-- CSV -->
          <button
            class="format-card"
            :class="{ 'format-card--active': selectedFormat === 'csv' }"
            @click="selectedFormat = 'csv'"
          >
            <div class="format-icon format-icon--csv">
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="none"
                viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
                <path stroke-linecap="round" stroke-linejoin="round"
                  d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <div class="format-info">
              <strong class="format-name">CSV</strong>
              <span class="format-desc">Spreadsheet (Excel, Google Sheets)</span>
            </div>
            <div class="format-check" v-if="selectedFormat === 'csv'">✓</div>
          </button>

          <!-- PDF -->
          <button
            class="format-card"
            :class="{ 'format-card--active': selectedFormat === 'pdf' }"
            @click="selectedFormat = 'pdf'"
          >
            <div class="format-icon format-icon--pdf">
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="none"
                viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
                <path stroke-linecap="round" stroke-linejoin="round"
                  d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
            </div>
            <div class="format-info">
              <strong class="format-name">PDF</strong>
              <span class="format-desc">Dokumen siap cetak</span>
            </div>
            <div class="format-check" v-if="selectedFormat === 'pdf'">✓</div>
          </button>
        </div>

        <!-- Error -->
        <div v-if="errorMsg" class="export-error">
          ⚠️ {{ errorMsg }}
        </div>
      </div>

      <!-- Footer -->
      <div class="modal-footer">
        <button class="btn btn--secondary" @click="$emit('close')">Batal</button>
        <button
          class="btn btn--primary"
          :disabled="!selectedFormat || loading"
          @click="handleExport"
        >
          <svg v-if="loading" class="btn-spin" xmlns="http://www.w3.org/2000/svg"
            width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
            <path stroke-linecap="round" stroke-linejoin="round"
              d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          {{ loading ? 'Mengekspor...' : `Ekspor ${selectedFormat.toUpperCase()}` }}
        </button>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
//import { exportHistoryCSV } from '@/api/analysis'

const props = defineProps({
  totalItems: { type: Number, default: 0 },
  activeFilters: { type: Object, default: () => ({}) },
})

const emit = defineEmits(['close'])

const selectedFormat = ref('csv')
const loading = ref(false)
const errorMsg = ref('')

async function handleExport() {
  if (!selectedFormat.value) return
  errorMsg.value = ''
  loading.value = true

  try {
    if (selectedFormat.value === 'csv') {
      // await exportHistoryCSV(props.activeFilters)
      emit('close')
    } else if (selectedFormat.value === 'pdf') {
      exportPDF()
      emit('close')
    }
  } catch (err) {
    errorMsg.value = 'Gagal mengekspor. Silakan coba lagi.'
    console.error(err)
  } finally {
    loading.value = false
  }
}

function exportPDF() {
  // Ambil data tabel dari DOM riwayat yang sudah dirender
  const printWindow = window.open('', '_blank', 'width=900,height=700')
  const now = new Date().toLocaleDateString('id-ID', {
    day: 'numeric', month: 'long', year: 'numeric',
    hour: '2-digit', minute: '2-digit'
  })

  // Kumpulkan data dari history cards yang ada di halaman
  const cards = document.querySelectorAll('.history-card')
  let tableRows = ''

  if (cards.length === 0) {
    tableRows = '<tr><td colspan="5" style="text-align:center;color:#64748b;">Tidak ada data untuk diekspor</td></tr>'
  } else {
    cards.forEach((card, idx) => {
      const title = card.querySelector('.history-card__title')?.innerText || '-'
      const date = card.querySelector('.history-card__date')?.innerText?.trim() || '-'
      const badge = card.querySelector('.status-badge')?.innerText?.trim() || '-'
      const isLayak = badge.includes('Layak') && !badge.includes('Tidak')
      const meta = card.querySelectorAll('.history-card__meta span')
      const color = meta[0]?.innerText || '-'
      const ph = meta[1]?.innerText || '-'

      tableRows += `
        <tr>
          <td style="text-align:center;">${idx + 1}</td>
          <td>${date}</td>
          <td>${title}</td>
          <td>${color} | ${ph}</td>
          <td style="text-align:center;">
            <span style="
              display:inline-block;padding:2px 10px;border-radius:12px;font-size:11px;font-weight:700;
              background:${isLayak ? '#dcfce7' : '#fee2e2'};
              color:${isLayak ? '#16a34a' : '#dc2626'};
            ">${badge}</span>
          </td>
        </tr>`
    })
  }

  printWindow.document.write(`
    <!DOCTYPE html>
    <html lang="id">
    <head>
      <meta charset="UTF-8">
      <title>Riwayat Analisis - PAKAR-AIR</title>
      <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: 'Segoe UI', Arial, sans-serif; color: #1a202c; padding: 32px; }
        .header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 24px; border-bottom: 2px solid #3b82f6; padding-bottom: 16px; }
        .header-left h1 { font-size: 20px; font-weight: 700; color: #1e40af; }
        .header-left p { font-size: 12px; color: #64748b; margin-top: 4px; }
        .header-right { text-align: right; font-size: 11px; color: #64748b; }
        .header-right strong { display: block; font-size: 13px; color: #1a202c; }
        table { width: 100%; border-collapse: collapse; margin-top: 8px; font-size: 12px; }
        thead tr { background: #eff6ff; }
        th { padding: 10px 12px; text-align: left; font-weight: 700; color: #1e40af; border-bottom: 2px solid #bfdbfe; font-size: 11px; text-transform: uppercase; letter-spacing: 0.5px; }
        td { padding: 9px 12px; border-bottom: 1px solid #e2e8f0; vertical-align: middle; }
        tr:hover td { background: #f8fafc; }
        .footer { margin-top: 20px; text-align: center; font-size: 10px; color: #94a3b8; border-top: 1px solid #e2e8f0; padding-top: 12px; }
        @media print { body { padding: 16px; } }
      </style>
    </head>
    <body>
      <div class="header">
        <div class="header-left">
          <h1>💧 PAKAR-AIR</h1>
          <p>Laporan Riwayat Analisis Kualitas Air</p>
        </div>
        <div class="header-right">
          <strong>Dicetak pada</strong>
          ${now}
        </div>
      </div>
      <table>
        <thead>
          <tr>
            <th style="width:40px;">No</th>
            <th>Tanggal</th>
            <th>Sumber Air</th>
            <th>Info</th>
            <th style="width:100px;">Hasil</th>
          </tr>
        </thead>
        <tbody>${tableRows}</tbody>
      </table>
      <div class="footer">Dokumen ini digenerate oleh sistem PAKAR-AIR • ${now}</div>
      <script>window.onload = function(){ window.print(); }<\/script>
    </body>
    </html>
  `)
  printWindow.document.close()
}
</script>

<style scoped>
.modal-overlay {
  position: fixed; inset: 0;
  background: rgba(0, 0, 0, 0.45);
  display: flex; align-items: center; justify-content: center;
  z-index: 1000;
  animation: fadeIn 0.15s ease;
}
@keyframes fadeIn { from { opacity: 0 } to { opacity: 1 } }

.modal-box {
  background: #fff;
  border-radius: 16px;
  width: 100%; max-width: 440px;
  box-shadow: 0 20px 60px rgba(0,0,0,0.18);
  animation: slideUp 0.2s ease;
}
@keyframes slideUp { from { transform: translateY(16px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }

.modal-header {
  display: flex; align-items: center; justify-content: space-between;
  padding: 18px 20px 14px;
  border-bottom: 1px solid #e2e8f0;
}
.modal-header__left {
  display: flex; align-items: center; gap: 8px;
  font-size: 15px; font-weight: 700; color: #1a202c;
}
.modal-close {
  width: 28px; height: 28px;
  border-radius: 6px; border: none;
  background: #f1f5f9; color: #64748b;
  cursor: pointer; display: flex; align-items: center; justify-content: center;
  transition: background 0.15s;
}
.modal-close:hover { background: #e2e8f0; }

.modal-body { padding: 20px; }

.modal-desc {
  font-size: 13px; color: #64748b;
  line-height: 1.6; margin-bottom: 18px;
}

.format-grid { display: flex; flex-direction: column; gap: 10px; }

.format-card {
  display: flex; align-items: center; gap: 14px;
  padding: 14px 16px;
  border: 2px solid #e2e8f0;
  border-radius: 12px;
  background: #fff;
  cursor: pointer;
  text-align: left;
  transition: border-color 0.15s, background 0.15s, transform 0.1s;
  width: 100%;
}
.format-card:hover { border-color: #93c5fd; background: #f8fafc; }
.format-card--active {
  border-color: #3b82f6;
  background: #eff6ff;
}
.format-card:active { transform: scale(0.99); }

.format-icon {
  width: 48px; height: 48px;
  border-radius: 10px;
  display: flex; align-items: center; justify-content: center;
  flex-shrink: 0;
}
.format-icon--csv { background: #dcfce7; color: #16a34a; }
.format-icon--pdf { background: #fee2e2; color: #dc2626; }

.format-info { flex: 1; }
.format-name { display: block; font-size: 14px; font-weight: 700; color: #1a202c; margin-bottom: 2px; }
.format-desc { font-size: 12px; color: #64748b; }

.format-check {
  width: 22px; height: 22px;
  border-radius: 50%;
  background: #3b82f6;
  color: #fff;
  display: flex; align-items: center; justify-content: center;
  font-size: 12px; font-weight: 700;
  flex-shrink: 0;
}

.export-error {
  margin-top: 12px;
  padding: 10px 14px;
  background: #fef2f2; color: #dc2626;
  border: 1px solid #fca5a5;
  border-radius: 8px; font-size: 13px;
}

.modal-footer {
  display: flex; justify-content: flex-end; gap: 10px;
  padding: 14px 20px 18px;
  border-top: 1px solid #e2e8f0;
}

.btn {
  padding: 9px 20px; font-size: 13px; font-weight: 600;
  border-radius: 8px; cursor: pointer; border: 1px solid transparent;
  display: inline-flex; align-items: center; gap: 6px;
  transition: background 0.15s;
}
.btn--primary { background: #3b82f6; color: #fff; border-color: #3b82f6; }
.btn--primary:hover:not(:disabled) { background: #2563eb; }
.btn--primary:disabled { opacity: 0.55; cursor: not-allowed; }
.btn--secondary { background: #fff; border-color: #e2e8f0; color: #64748b; }
.btn--secondary:hover { background: #f8fafc; }

.btn-spin {
  animation: spin 0.8s linear infinite;
}
@keyframes spin { to { transform: rotate(360deg); } }
</style>
