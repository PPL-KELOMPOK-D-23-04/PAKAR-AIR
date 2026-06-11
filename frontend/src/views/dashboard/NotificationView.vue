<template>
  <DashboardLayout>
    <div class="np">

      <!-- ── HEADER ────────────────────────────────────── -->
      <header class="np__header">
        <div class="np__header-left">
          <p class="np__eyebrow">Aktivitas</p>
          <h1 class="np__title">Notifikasi</h1>
          <p class="np__subtitle">Pembaruan aktivitas dan informasi terbaru Anda.</p>
        </div>
        <div class="np__header-right">
          <div class="np__unread-pill" v-if="unreadCount > 0">
            <span class="np__unread-num">{{ unreadCount }}</span>
            <span>belum dibaca</span>
          </div>
          <button class="np__btn-markall" v-if="unreadCount > 0" @click="markAllAsRead">
            <CheckCheck :size="11" />
            Tandai Semua Dibaca
          </button>
        </div>
      </header>

      <!-- ── CARD ──────────────────────────────────────── -->
      <div class="np__card">

        <!-- Toolbar -->
        <div class="np__toolbar">
          <div class="np__tabs">
            <button
              v-for="tab in tabs"
              :key="tab.key"
              class="np__tab"
              :class="{ 'np__tab--on': activeTab === tab.key }"
              @click="activeTab = tab.key"
            >
              {{ tab.label }}
              <span class="np__tab-count" v-if="tab.count > 0">{{ tab.count }}</span>
            </button>
          </div>
          <span class="np__toolbar-total">{{ filteredNotifications.length }} notifikasi</span>
        </div>

        <!-- Empty -->
        <div v-if="filteredNotifications.length === 0" class="np__empty">
          <div class="np__empty-icon">
            <Bell :size="18" />
          </div>
          <p class="np__empty-title">Tidak ada notifikasi</p>
          <p class="np__empty-sub">Semua notifikasi sudah terbaca.</p>
        </div>

        <!-- List -->
        <TransitionGroup v-else name="nf" tag="div" class="np__list">
          <div
            v-for="(n, i) in filteredNotifications"
            :key="n.id"
            class="np__item"
            :class="[`np__item--${n.type}`, { 'np__item--unread': !n.read }]"
            :style="{ '--i': i }"
          >
            <!-- accent bar -->
            <div class="np__bar" />

            <!-- icon -->
            <div class="np__icon-col">
              <div class="np__icon" :class="`np__icon--${n.type}`">
                <component :is="getIcon(n.type)" :size="14" />
              </div>
            </div>

            <!-- body -->
            <div class="np__body">
              <div class="np__body-top">
                <div class="np__title-row">
                  <span class="np__item-title" :class="{ 'np__item-title--read': n.read }">
                    {{ n.title }}
                  </span>
                  <span class="np__unread-dot" v-if="!n.read" />
                  <span class="np__type-tag" :class="`np__type-tag--${n.type}`">
                    {{ typeLabel(n.type) }}
                  </span>
                  <span class="np__meta-id">ID: {{ n.id.split('-')[0] }}</span>
                  <span class="np__meta-id" v-if="n.analysis_id">Analisis: {{ n.analysis_id.split('-')[0] }}</span>
                </div>
                <span class="np__time">{{ n.time }}</span>
              </div>
              <p class="np__msg" :class="{ 'np__msg--read': n.read }">{{ n.message }}</p>
              <div class="np__actions" v-if="n.actionLabel || !n.read">
                <button v-if="n.actionLabel" class="np__btn-action" @click="handleAction(n)">
                  {{ n.actionLabel }}
                  <ArrowRight :size="10" />
                </button>
                <button v-if="!n.read" class="np__btn-ghost" @click="markAsRead(n.id)">
                  Tandai Dibaca
                </button>
              </div>
            </div>
          </div>
        </TransitionGroup>

      </div>
    </div>
  </DashboardLayout>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import DashboardLayout from '@/layouts/DashboardLayout.vue'
import {
  Bell, CheckCheck, CheckCircle, BookOpen,
  AlertTriangle, Zap, Info, ArrowRight,
} from 'lucide-vue-next'
import { useNotificationStore } from '@/stores/notificationStore'

const router = useRouter()
const notificationStore = useNotificationStore()

onMounted(() => notificationStore.fetchNotifications())

const notifications = computed(() =>
  notificationStore.notifications.map(n => {
    const typeMap = { analysis_complete: 'success' }
    const type = typeMap[n.type] || n.type || 'info'
    return {
      id: n.id,
      analysis_id: n.analysis_id,
      type,
      title: n.title,
      message: n.message,
      time: new Date(n.created_at).toLocaleString('id-ID'),
      read: n.is_read,
      actionLabel:
        type === 'success' ? 'Lihat Hasil' :
        type === 'info'    ? 'Baca Artikel' : null,
    }
  })
)

const activeTab   = ref('all')
const unreadCount = computed(() => notifications.value.filter(n => !n.read).length)

const tabs = computed(() => [
  { key: 'all',    label: 'Semua',        count: notifications.value.length },
  { key: 'unread', label: 'Belum Dibaca', count: unreadCount.value },
])

const filteredNotifications = computed(() =>
  activeTab.value === 'unread'
    ? notifications.value.filter(n => !n.read)
    : notifications.value
)

const getIcon = (type) => ({ success: CheckCircle, info: BookOpen, warning: AlertTriangle, update: Zap }[type] || Info)
const typeLabel = (type) => ({ success: 'Sukses', info: 'Info', warning: 'Peringatan', update: 'Pembaruan' }[type] || 'Info')

const markAsRead    = async (id) => await notificationStore.markAsRead(id)
const markAllAsRead = async () => {
  for (const n of notifications.value.filter(n => !n.read))
    await notificationStore.markAsRead(n.id)
}
const handleAction = (notif) => {
  markAsRead(notif.id)
  if (notif.type === 'success' || notif.type === 'warning') {
    if (notif.analysis_id) router.push(`/dashboard/history/${notif.analysis_id}`)
    else router.push('/history')
  }
  else if (notif.type === 'info') router.push('/edukasi')
}
</script>

<style scoped>


/* ── Base ── */
.np {
  
  --h-rule: var(--color-border);
  --h-rule-2: var(--color-border-light);
  --purple-bg: #f5f3ff;
  --purple-border: #ddd6fe;
  --purple-text: #5b21b6;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0;
  animation: np-in .28s cubic-bezier(.16, 1, .3, 1) both;
}
@keyframes np-in {
  from { opacity: 0; transform: translateY(5px); }
  to   { opacity: 1; transform: translateY(0); }
}

/* ── Header ── */
.np__header {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 16px;
  flex-wrap: wrap;
  padding-bottom: 20px;
  margin-bottom: 24px;
  border-bottom: 1px solid var(--color-text-primary);
}
.np__eyebrow {
  font-family: var(--font-mono);
  font-size: 10px;
  letter-spacing: .16em;
  text-transform: uppercase;
  color: var(--color-text-muted);
  margin: 0 0 6px;
}
.np__title {
  font-family: var(--font-sans);
  font-size: var(--font-size-xl);
  font-weight: 600;
  color: var(--color-text-primary);
  letter-spacing: -.02em;
  line-height: 1;
  margin: 0 0 5px;
}
.np__subtitle {
  font-size: var(--font-size-sm);
  color: var(--color-text-muted);
  margin: 0;
}
.np__header-right {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
}

/* unread pill */
.np__unread-pill {
  display: flex;
  align-items: center;
  gap: 5px;
  padding: 5px 12px;
  border: 1px solid var(--h-rule);
  border-radius: 2px;
  background: var(--color-surface);
  font-family: var(--font-mono);
  font-size: 10px;
  color: var(--color-text-secondary);
  letter-spacing: .04em;
}
.np__unread-num {
  font-weight: 600;
  color: var(--color-text-primary);
}

/* mark-all btn */
.np__btn-markall {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 14px;
  background: var(--color-text-primary);
  color: var(--color-surface);
  border: 1px solid var(--color-text-primary);
  border-radius: 2px;
  font-family: var(--font-mono);
  font-size: 10px;
  font-weight: 500;
  letter-spacing: .06em;
  cursor: pointer;
  transition: opacity .15s;
}
.np__btn-markall:hover { opacity: .8; }

/* ── Card ── */
.np__card {
  display: flex;
  flex-direction: column;
  background: var(--color-surface);
  border: 1px solid var(--h-rule);
  border-radius: 2px;
  overflow: hidden;
}

/* ── Toolbar ── */
.np__toolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 16px;
  border-bottom: 1px solid var(--h-rule);
  background: var(--color-neutral-bg, var(--color-bg));
  flex-shrink: 0;
}
.np__tabs { display: flex; }
.np__tab {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 11px 14px;
  background: transparent;
  border: none;
  border-bottom: 2px solid transparent;
  margin-bottom: -1px;
  font-family: var(--font-mono);
  font-size: 10px;
  font-weight: 500;
  letter-spacing: .08em;
  text-transform: uppercase;
  color: var(--color-text-muted);
  cursor: pointer;
  transition: color .12s;
  white-space: nowrap;
}
.np__tab:hover:not(.np__tab--on) { color: var(--color-text-primary); }
.np__tab--on {
  color: var(--color-accent);
  border-bottom-color: var(--color-accent);
}
.np__tab-count {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 16px;
  height: 15px;
  padding: 0 4px;
  border-radius: 1px;
  font-size: 9px;
  font-weight: 600;
  background: var(--color-info-bg);
  color: var(--color-info-text);
}
.np__tab--on .np__tab-count {
  background: var(--color-accent);
  color: var(--color-surface);
}
.np__toolbar-total {
  font-family: var(--font-mono);
  font-size: 10px;
  color: var(--color-text-muted-light);
  letter-spacing: .06em;
}

/* ── List ── */
.np__list {
  display: flex;
  flex-direction: column;
}

/* ── Item ── */
.np__item {
  display: flex;
  align-items: stretch;
  border-bottom: 1px solid var(--h-rule-2);
  background: var(--color-surface);
  transition: background .1s;
  opacity: 0;
  animation: item-in .3s cubic-bezier(.16, 1, .3, 1) forwards;
  animation-delay: calc(var(--i, 0) * 30ms);
}
.np__item:last-child { border-bottom: none; }
.np__item:hover { background: var(--color-bg); }
.np__item--unread { background: #fafbff; }
.np__item--unread:hover { background: #f5f7ff; }
@keyframes item-in {
  from { opacity: 0; transform: translateY(4px); }
  to   { opacity: 1; transform: translateY(0); }
}

/* accent bar */
.np__bar {
  width: 3px;
  flex-shrink: 0;
  transition: width .15s;
}
.np__item--success .np__bar { background: var(--color-success-text); }
.np__item--info    .np__bar { background: var(--color-accent); }
.np__item--warning .np__bar { background: var(--color-warning-text); }
.np__item--update  .np__bar { background: #7c3aed; }
.np__item:not(.np__item--unread) .np__bar { opacity: .35; }
.np__item:hover .np__bar { width: 4px; }

/* icon col */
.np__icon-col {
  width: 52px;
  flex-shrink: 0;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding: 15px 0;
}
.np__icon {
  width: 30px;
  height: 30px;
  border-radius: 2px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}
.np__icon--success { background: var(--color-success-bg); color: var(--color-success-text); border: 1px solid var(--color-success-border); }
.np__icon--info    { background: var(--color-info-bg);    color: var(--color-info-text);    border: 1px solid var(--color-info-border); }
.np__icon--warning { background: var(--color-warning-bg); color: var(--color-warning-text); border: 1px solid var(--color-warning-border); }
.np__icon--update  { background: var(--purple-bg); color: var(--purple-text); border: 1px solid var(--purple-border); }
.np__item:not(.np__item--unread) .np__icon { opacity: .6; }

/* body */
.np__body {
  flex: 1;
  padding: 14px 18px 14px 4px;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 5px;
}
.np__body-top {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;
}
.np__title-row {
  display: flex;
  align-items: center;
  gap: 7px;
  flex-wrap: wrap;
  flex: 1;
  min-width: 0;
}
.np__item-title {
  font-size: var(--font-size-sm);
  font-weight: 600;
  color: var(--color-text-primary);
  letter-spacing: -.01em;
  line-height: 1.3;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.np__item-title--read {
  font-weight: 500;
  color: var(--color-text-muted);
}
.np__unread-dot {
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: var(--color-accent);
  flex-shrink: 0;
}

/* type tag */
.np__type-tag {
  display: inline-flex;
  align-items: center;
  padding: 2px 7px;
  border-radius: 1px;
  font-family: var(--font-mono);
  font-size: 9px;
  font-weight: 500;
  letter-spacing: .07em;
  text-transform: uppercase;
  flex-shrink: 0;
}
.np__type-tag--success { background: var(--color-success-bg); color: var(--color-success-text); border: 1px solid var(--color-success-border); }
.np__type-tag--info    { background: var(--color-info-bg);    color: var(--color-info-text);    border: 1px solid var(--color-info-border); }
.np__type-tag--warning { background: var(--color-warning-bg); color: var(--color-warning-text); border: 1px solid var(--color-warning-border); }
.np__type-tag--update  { background: var(--purple-bg); color: var(--purple-text); border: 1px solid var(--purple-border); }
.np__item:not(.np__item--unread) .np__type-tag { opacity: .6; }

.np__time {
  font-family: var(--font-mono);
  font-size: 9px;
  color: var(--color-text-muted-light);
  font-weight: 500;
  white-space: nowrap;
  flex-shrink: 0;
  letter-spacing: .03em;
}

.np__meta-id {
  font-family: var(--font-mono);
  font-size: 9px;
  color: var(--color-text-muted-light);
  background: var(--color-bg);
  padding: 1px 4px;
  border-radius: 2px;
  border: 1px solid var(--h-rule-2);
  letter-spacing: .04em;
  margin-left: 4px;
}

.np__msg {
  font-size: 12px;
  color: var(--color-text-secondary);
  line-height: 1.65;
  margin: 0;
}
.np__msg--read { color: var(--color-text-muted); }

/* actions */
.np__actions {
  display: flex;
  align-items: center;
  gap: 6px;
  padding-top: 4px;
}
.np__btn-action {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  height: 24px;
  padding: 0 10px;
  background: var(--color-text-primary);
  color: var(--color-surface);
  border: none;
  border-radius: 2px;
  font-family: var(--font-mono);
  font-size: 10px;
  font-weight: 500;
  letter-spacing: .04em;
  cursor: pointer;
  transition: opacity .15s;
}
.np__btn-action:hover { opacity: .8; }
.np__btn-ghost {
  display: inline-flex;
  align-items: center;
  height: 24px;
  padding: 0 10px;
  background: transparent;
  color: var(--color-text-muted);
  border: 1px solid var(--h-rule);
  border-radius: 2px;
  font-family: var(--font-mono);
  font-size: 10px;
  font-weight: 500;
  letter-spacing: .04em;
  cursor: pointer;
  transition: background .12s, color .12s, border-color .12s;
}
.np__btn-ghost:hover {
  background: var(--color-bg);
  border-color: var(--color-border-strong);
  color: var(--color-text-primary);
}

/* ── Empty ── */
.np__empty {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 64px 24px;
  text-align: center;
  gap: 8px;
}
.np__empty-icon {
  width: 42px;
  height: 42px;
  border-radius: 2px;
  background: var(--color-bg);
  border: 1px solid var(--h-rule);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-text-muted-light);
  margin-bottom: 8px;
}
.np__empty-title {
  font-family: var(--font-mono);
  font-size: var(--font-size-sm);
  font-weight: 500;
  color: var(--color-text-primary);
  margin: 0;
  letter-spacing: .04em;
}
.np__empty-sub {
  font-family: var(--font-mono);
  font-size: 11px;
  color: var(--color-text-muted);
  margin: 0;
}

/* ── Transitions ── */
.nf-enter-active, .nf-leave-active { transition: all .2s cubic-bezier(.16, 1, .3, 1); }
.nf-enter-from { opacity: 0; transform: translateX(-6px); }
.nf-leave-to   { opacity: 0; transform: translateX(6px); }

/* ── Responsive ── */
@media (max-width: 540px) {
  .np__header { flex-direction: column; align-items: flex-start; }
  .np__time { display: none; }
}
</style>