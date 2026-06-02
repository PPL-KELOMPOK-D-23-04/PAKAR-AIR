/**
 * PAKAR-AIR — Profile Locators
 * Source: ProfileView.vue
 */
const ProfileLocators = {
  view: '.profile-view',

  // Sidebar Navigation
  navProfile: '.nav-item:nth-child(1)',
  navSecurity: '.nav-item:nth-child(2)',
  navNotifications: '.nav-item:nth-child(3)',
  navActive: '.nav-item.active',

  // Profile Tab
  avatarWrapper: '.avatar-wrapper',
  avatarImage: '.profile-image',
  avatarUploadInput: '.hidden-input',
  uploadOverlay: '.upload-overlay',
  nameInput: '#profile-name',
  emailInput: '#profile-email',
  saveProfileButton: '.btn-save',

  // Security Tab
  oldPasswordInput: '#profile-old-password',
  newPasswordInput: '#profile-new-password',
  confirmPasswordInput: '#profile-confirm-password',
  updatePasswordButton: '.btn-save',

  // Notification Tab
  notificationItems: '.notification-item',
  toggleSwitch: '.toggle-switch input',

  // Toast
  toast: '.toast-message',
  toastSuccess: '.toast-success',
  toastError: '.toast-error',
  toastText: '.toast-text',
};

module.exports = { ProfileLocators };
