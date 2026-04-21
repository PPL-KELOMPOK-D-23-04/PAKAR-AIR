<template>
  <div class="search-filter-container">
    <!-- Search Bar -->
    <div class="search-wrapper">
      <div class="search-icon">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
        </svg>
      </div>
      <input 
        type="text" 
        v-model="searchQuery"
        placeholder="Cari berdasarkan tanggal, sumber air, atau status..."
        class="search-input"
        @input="handleSearch"
      />
      <button 
        v-if="searchQuery" 
        @click="clearSearch" 
        class="clear-button"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
          <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" stroke-width="2"/>
        </svg>
      </button>
    </div>

    <!-- Filter Dropdown -->
    <div class="filter-wrapper">
      <button @click="toggleFilter" class="filter-button">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
          <path d="M4 6H20M6 12H18M10 18H14" stroke="currentColor" stroke-width="2"/>
        </svg>
        Filter
        <span v-if="activeFilterCount > 0" class="filter-badge">{{ activeFilterCount }}</span>
      </button>

      <!-- Filter Dropdown Menu -->
      <div v-if="showFilter" class="filter-dropdown">
        <div class="filter-section">
          <label class="filter-label">Status Kualitas</label>
          <div class="filter-options">
            <label v-for="status in filterOptions.status" :key="status.value" class="filter-checkbox">
              <input type="checkbox" :value="status.value" v-model="selectedFilters.status">
              <span :class="['status-badge', status.class]">{{ status.label }}</span>
            </label>
          </div>
        </div>
        <div class="filter-section">
          <label class="filter-label">Sumber Air</label>
          <div class="filter-options">
            <label v-for="source in filterOptions.sumberAir" :key="source" class="filter-checkbox">
              <input type="checkbox" :value="source" v-model="selectedFilters.sumberAir">
              <span>{{ source }}</span>
            </label>
          </div>
        </div>
        <div class="filter-actions">
          <button @click="applyFilters" class="apply-btn">Terapkan</button>
          <button @click="resetFilters" class="reset-btn">Reset</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SearchFilterBar",
  data() {
    return {
      searchQuery: "",
      showFilter: false,
      selectedFilters: {
        status: [],
        sumberAir: []
      },
      filterOptions: {
        status: [
          { value: "aman", label: "Aman", class: "status-aman" },
          { value: "perlu_perlakuan", label: "Perlu Perlakuan", class: "status-perlu" },
          { value: "tercemar", label: "Berpotensi Tercemar", class: "status-tercemar" }
        ],
        sumberAir: ["Sumur", "Sungai", "PDAM", "Danau", "Air Hujan"]
      }
    };
  },
  computed: {
    activeFilterCount() {
      return this.selectedFilters.status.length + this.selectedFilters.sumberAir.length;
    }
  },
  methods: {
    handleSearch() {
      this.$emit("search", {
        query: this.searchQuery,
        filters: this.selectedFilters
      });
    },
    clearSearch() {
      this.searchQuery = "";
      this.handleSearch();
    },
    toggleFilter() {
      this.showFilter = !this.showFilter;
    },
    applyFilters() {
      this.showFilter = false;
      this.handleSearch();
    },
    resetFilters() {
      this.selectedFilters = {
        status: [],
        sumberAir: []
      };
      this.applyFilters();
    }
  }
};
</script>

<style scoped>
.search-filter-container {
  display: flex;
  gap: 16px;
  align-items: center;
  flex-wrap: wrap;
  margin-bottom: 24px;
}

/* Search Wrapper */
.search-wrapper {
  flex: 1;
  position: relative;
  display: flex;
  align-items: center;
}

.search-icon {
  position: absolute;
  left: 16px;
  color: #94a3b8;
  display: flex;
  align-items: center;
  pointer-events: none;
}

.search-input {
  width: 100%;
  padding: 12px 40px 12px 48px;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  font-size: 14px;
  background: white;
  transition: all 0.2s ease;
}

.search-input:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.clear-button {
  position: absolute;
  right: 12px;
  background: none;
  border: none;
  color: #94a3b8;
  cursor: pointer;
  padding: 4px;
  display: flex;
  align-items: center;
  border-radius: 999px;
  transition: all 0.2s;
}

.clear-button:hover {
  color: #64748b;
  background: #f1f5f9;
}

/* Filter Button */
.filter-wrapper {
  position: relative;
}

.filter-button {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 18px;
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  font-size: 14px;
  font-weight: 500;
  color: #334155;
  cursor: pointer;
  transition: all 0.2s;
}

.filter-button:hover {
  background: #f8fafc;
  border-color: #cbd5e1;
}

.filter-badge {
  background: #3b82f6;
  color: white;
  font-size: 11px;
  border-radius: 999px;
  padding: 2px 7px;
  margin-left: 4px;
}

/* Filter Dropdown */
.filter-dropdown {
  position: absolute;
  top: calc(100% + 8px);
  right: 0;
  width: 320px;
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 16px;
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1);
  padding: 16px;
  z-index: 50;
}

.filter-section {
  margin-bottom: 20px;
}

.filter-section:last-child {
  margin-bottom: 0;
}

.filter-label {
  font-size: 13px;
  font-weight: 600;
  color: #475569;
  display: block;
  margin-bottom: 12px;
}

.filter-options {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.filter-checkbox {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
  color: #334155;
  cursor: pointer;
}

.filter-checkbox input {
  margin: 0;
  cursor: pointer;
}

.status-badge {
  padding: 4px 10px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 500;
}

.status-aman {
  background: #dcfce7;
  color: #166534;
}

.status-perlu {
  background: #fef9c3;
  color: #854d0e;
}

.status-tercemar {
  background: #fee2e2;
  color: #991b1b;
}

.filter-actions {
  display: flex;
  gap: 12px;
  margin-top: 16px;
  padding-top: 16px;
  border-top: 1px solid #f1f5f9;
}

.apply-btn {
  flex: 1;
  background: #3b82f6;
  color: white;
  border: none;
  padding: 8px 12px;
  border-radius: 8px;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
}

.reset-btn {
  flex: 1;
  background: #f1f5f9;
  color: #475569;
  border: none;
  padding: 8px 12px;
  border-radius: 8px;
  font-size: 13px;
  cursor: pointer;
}

/* Responsive */
@media (max-width: 640px) {
  .search-filter-container {
    flex-direction: column;
  }
  
  .search-wrapper {
    width: 100%;
  }
  
  .filter-wrapper {
    width: 100%;
  }
  
  .filter-button {
    width: 100%;
    justify-content: center;
  }
  
  .filter-dropdown {
    width: 100%;
    right: auto;
    left: 0;
  }
}
</style>