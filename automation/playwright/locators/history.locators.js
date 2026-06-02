/**
 * PAKAR-AIR — History Locators
 * Source: HistoryView.vue
 */
const HistoryLocators = {
  view: '.history-view',
  title: '.workspace-title',
  description: '.workspace-desc',
  badgeTotal: '.badge-total',
  exportButton: '.btn-export',

  // Toolbar
  toolbar: '.toolbar',
  searchInput: '#history-search',
  categorySelect: '.toolbar-select',
  dateInput: '#history-date',
  clearFilterButton: '.btn-clear-filter',

  // List
  historyList: '.history-list',
  historyRow: '.history-row',
  rowTitle: '.row-title',
  rowStatusBadge: '.status-badge',
  rowMeta: '.row-meta',
  rowImage: '.row-image',
  rowChevron: '.row-chevron',

  // Pagination
  pagination: '.pagination',
  pageButton: '.page-btn',
  pageNumber: '.page-num',
  pageNumberActive: '.page-num--active',

  // States
  loadingSpinner: '.spinner',
  emptyState: '.state-container',

  // Export Modal
  exportModal: '.export-modal',
};

module.exports = { HistoryLocators };
