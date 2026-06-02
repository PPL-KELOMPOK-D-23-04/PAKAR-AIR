/**
 * PAKAR-AIR — Admin Locators
 * Source: AdminDashboard.vue, AdminUsers.vue, AdminReports.vue, AdminChatbot.vue
 */
const AdminLocators = {
  // Dashboard
  dashboard: '.admin-dashboard',
  pageTitle: '.page-title',
  pageSubtitle: '.page-subtitle',
  manageUsersButton: '.btn-manage',
  statsGrid: '.stats-grid',
  statCard: '.stat-card',
  statValue: '.stat-value',
  statLabel: '.stat-label',
  quickActions: '.quick-actions',
  actionCard: '.action-card',
  actionTitle: '.action-title',
  errorBanner: '.error-banner',

  // Skeleton loading
  statSkeleton: '.stat-skeleton',

  // Navigation links (within admin layout)
  navUsers: 'a[href="/admin/users"]',
  navReports: 'a[href="/admin/reports"]',
  navChatbot: 'a[href="/admin/chatbot"]',
};

module.exports = { AdminLocators };
