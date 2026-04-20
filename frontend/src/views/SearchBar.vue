<template>
  <div class="riwayat-page">
    <SearchFilterBar 
      @search="handleSearchAndFilter"
    />
    
    <!-- Tabel Riwayat -->
    <div class="table-container">
      <table class="riwayat-table">
        <thead>
          <tr>
            <th>Tanggal</th>
            <th>Sumber Air</th>
            <th>Warna</th>
            <th>Bau</th>
            <th>Status</th>
            <th>Confidence</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in filteredData" :key="item.id">
            <td>{{ item.tanggal }}</td>
            <td>{{ item.sumberAir }}</td>
            <td>{{ item.warna }}</td>
            <td>{{ item.bau }}</td>
            <td><span :class="['status-badge', getStatusClass(item.status)]">{{ item.status }}</span></td>
            <td>{{ item.confidence }}%</td>
          </tr>
          <tr v-if="filteredData.length === 0">
            <td colspan="6" class="no-data">Tidak ada data yang ditemukan</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import SearchFilterBar from "@/components/SearchFilterBar.vue";

export default {
  components: { SearchFilterBar },
  data() {
    return {
      riwayatData: [
        { id: 1, tanggal: "2026-03-15", sumberAir: "Sumur", warna: "Bening", bau: "Tidak Berbau", status: "Aman", confidence: 94 },
        { id: 2, tanggal: "2026-03-10", sumberAir: "Sungai", warna: "Keruh", bau: "Berbau", status: "Berpotensi Tercemar", confidence: 87 },
        // ... data lainnya
      ],
      filteredData: []
    };
  },
  mounted() {
    this.filteredData = [...this.riwayatData];
  },
  methods: {
    handleSearchAndFilter({ query, filters }) {
      let result = [...this.riwayatData];
      
      // Filter berdasarkan teks pencarian
      if (query) {
        const lowerQuery = query.toLowerCase();
        result = result.filter(item => 
          item.tanggal.includes(lowerQuery) ||
          item.sumberAir.toLowerCase().includes(lowerQuery) ||
          item.status.toLowerCase().includes(lowerQuery)
        );
      }
      
      // Filter berdasarkan status
      if (filters.status.length > 0) {
        result = result.filter(item => 
          filters.status.some(s => item.status.toLowerCase().includes(s))
        );
      }
      
      // Filter berdasarkan sumber air
      if (filters.sumberAir.length > 0) {
        result = result.filter(item => 
          filters.sumberAir.includes(item.sumberAir)
        );
      }
      
      this.filteredData = result;
    },
    getStatusClass(status) {
      const map = {
        "Aman": "status-aman",
        "Perlu Perlakuan": "status-perlu",
        "Berpotensi Tercemar": "status-tercemar"
      };
      return map[status] || "";
    }
  }
};
</script>