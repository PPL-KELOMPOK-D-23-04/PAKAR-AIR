/**
 * PAKAR-AIR — Notification Tests
 */
const { test, expect } = require('@playwright/test');
const { NotificationPage } = require('../../pages/NotificationPage');
const { loginViaUI } = require('../../helpers/auth.helper');
const { USERS } = require('../../data/users.data');

test.beforeEach(async ({ page }) => { await loginViaUI(page, USERS.validUser); });

test.describe('Notification', () => {

  test('NOT-POS-001: View notifications page', async ({ page }) => {
    const notifPage = new NotificationPage(page);
    await notifPage.navigate();
    expect(page.url()).toContain('/notifications');
  });

  test('NOT-POS-002: Mark notification as read', async ({ page }) => {
    const notifPage = new NotificationPage(page);
    await notifPage.navigate();
    const unreadBefore = await notifPage.getUnreadCount();
    if (unreadBefore > 0) {
      await notifPage.markAsRead(0);
      await page.waitForTimeout(500);
      // Business outcome: unread badge disappears or count decreases
      const unreadAfter = await notifPage.getUnreadCount();
      expect(unreadAfter).toBeLessThan(unreadBefore);
      // Also ensure the unread dot is gone from that card
      const hasUnreadDot = await page.locator('.notification-card').nth(0).locator('.unread-dot').isVisible();
      expect(hasUnreadDot).toBeFalsy();
    }
  });

  test('NOT-POS-003: Empty state jika tidak ada notifikasi', async ({ page }) => {
    // Karena notifikasi saat ini di-hardcode di NotificationView.vue,
    // kita tidak bisa mensimulasikan empty state secara langsung tanpa mengubah logic frontend.
    // Skip test untuk sekarang, tapi struktur business outcome disiapkan.
    test.skip();
    const notifPage = new NotificationPage(page);
    await notifPage.navigate();
    // Verifikasi business outcome
    const emptyState = page.locator('.empty-state');
    await expect(emptyState).toBeVisible();
    await expect(emptyState).toContainText('Tidak Ada Notifikasi');
  });

  test('NOT-POS-004: Unread indicator visible', async ({ page }) => {
    const notifPage = new NotificationPage(page);
    await notifPage.navigate();
    const count = await notifPage.getNotificationCount();
    if (count > 0) {
      const title = await notifPage.getNotificationTitle(0);
      expect(title).toBeTruthy();
      // Business outcome: user dapat melihat notifikasi yang belum dibaca
      const className = await page.locator('.notification-card').nth(0).getAttribute('class');
      expect(className).toContain('unread');
    }
  });
});
