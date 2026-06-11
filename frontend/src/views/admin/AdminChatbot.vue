<template>
  <div class="chatbot-page">

    <!-- ─── Sidebar ─────────────────────────────────────── -->
    <aside class="chat-sidebar">
      <div class="sidebar-top">
        <button class="btn-new-chat" @click="handleNewSession" :disabled="isCreating">
          <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" />
          </svg>
          {{ isCreating ? 'Membuat...' : 'Chat Baru' }}
        </button>
      </div>

      <div class="sidebar-label">Riwayat Chat</div>

      <div class="session-list">
        <div v-if="sessions.length === 0" class="no-sessions">
          Belum ada percakapan
        </div>
        <div
          v-for="session in sessions"
          :key="session.id"
          class="session-item"
          :class="{ active: activeSessionId === session.id }"
          @click="selectSession(session.id)"
        >
          <div class="session-info">
            <div class="session-title">{{ session.title }}</div>
            <div class="session-date">{{ formatDate(session.updated_at) }}</div>
          </div>
          <button
            class="session-del-btn"
            @click.stop="handleDeleteSession(session.id)"
            title="Hapus sesi"
          >
            <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round"
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
      </div>

      <div class="sidebar-footer">
        <span class="sidebar-footer-label">PAKAR-AIR v1.0</span>
        <span class="sidebar-footer-dot"></span>
        <span class="sidebar-footer-label">Gemini AI</span>
      </div>
    </aside>

    <!-- ─── Main ─────────────────────────────────────────── -->
    <div class="chat-main">

      <!-- Header -->
      <div class="chat-header">
        <div class="header-icon-box">
          <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round"
              d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        </div>
        <div class="header-info">
          <div class="header-title">PAKAR-AIR AI Assistant</div>
          <div class="header-status">
            <span class="status-dot" :class="isSending ? 'status-dot--typing' : 'status-dot--online'" />
            {{ isSending ? 'Sedang mengetik...' : 'Online — Gemini AI' }}
          </div>
        </div>
      </div>

      <!-- Error -->
      <div v-if="errorMsg" class="chat-error">
        <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round"
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
        {{ errorMsg }}
        <button @click="errorMsg = ''" class="error-close">✕</button>
      </div>

      <!-- Empty / Welcome state -->
      <div v-if="!activeSessionId" class="chat-empty">
        <div class="empty-logo">
          <svg width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
            <path stroke-linecap="round" stroke-linejoin="round"
              d="M12 3v1m0 16v1M4.22 4.22l.707.707M18.364 18.364l.707.707M1 12h1m20 0h1M4.22 19.78l.707-.707M18.364 5.636l.707-.707M12 7a5 5 0 100 10A5 5 0 0012 7z" />
          </svg>
        </div>
        <p class="empty-title">PAKAR-AIR AI Chatbot</p>
        <p class="empty-desc">
          Asisten AI untuk memahami data kualitas air, laporan analisis, dan rekomendasi sanitasi.
        </p>
        <div class="suggestion-grid">
          <button class="suggestion-chip" @click="quickAsk('Apa itu parameter pH dalam kualitas air?')">
            Apa itu pH?
          </button>
          <button class="suggestion-chip" @click="quickAsk('Jelaskan cara kerja sistem PAKAR-AIR')">
            Cara kerja PAKAR-AIR
          </button>
          <button class="suggestion-chip" @click="quickAsk('Apa standar Turbidity untuk air minum?')">
            Standar Turbidity
          </button>
          <button class="suggestion-chip" @click="quickAsk('Berikan tips menjaga kualitas air bersih')">
            Tips kualitas air
          </button>
        </div>
      </div>

      <template v-else>
        <!-- Messages -->
        <div class="chat-messages" ref="messagesContainer">
          <div
            v-for="msg in messages"
            :key="msg.id"
            class="message"
            :class="'message--' + msg.role"
          >
            <div class="msg-avatar" :class="'msg-avatar--' + msg.role">
              {{ msg.role === 'user' ? userInitial : 'AI' }}
            </div>
            <div class="msg-body">
              <div class="msg-content" v-html="renderMarkdown(msg.content)" />
              <div class="msg-time">{{ formatTime(msg.created_at) }}</div>
            </div>
          </div>

          <!-- Typing Indicator -->
          <div v-if="isSending" class="message message--ai">
            <div class="msg-avatar msg-avatar--ai">AI</div>
            <div class="typing-bubble">
              <span class="typing-dot" />
              <span class="typing-dot" />
              <span class="typing-dot" />
            </div>
          </div>
        </div>

        <!-- Input -->
        <div class="chat-input-area">
          <div class="chat-input-wrap">
            <textarea
              ref="chatInput"
              class="chat-input"
              v-model="inputMessage"
              @keydown.enter.exact.prevent="handleSend"
              placeholder="Ketik pesan Anda..."
              rows="1"
              :disabled="isSending"
              @input="autoResize"
            />
            <button
              class="btn-send"
              @click="handleSend"
              :disabled="!inputMessage.trim() || isSending"
              title="Kirim pesan"
            >
              <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round"
                  d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
              </svg>
            </button>
          </div>
          <p class="input-hint">Enter untuk kirim · Shift+Enter untuk baris baru</p>
        </div>
      </template>

    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, nextTick, watch } from 'vue'
import {
  createSession, getSessions, getSessionMessages,
  sendMessage, deleteSession,
} from '@/api/chatbot'

const sessions        = ref([])
const messages        = ref([])
const activeSessionId = ref(null)
const inputMessage    = ref('')
const isSending       = ref(false)
const isCreating      = ref(false)
const errorMsg        = ref('')
const messagesContainer = ref(null)
const chatInput         = ref(null)

const userInitial = computed(() => {
  try {
    const user = JSON.parse(sessionStorage.getItem('pakar_air_user') || '{}')
    return (user.full_name || user.username || 'A').charAt(0).toUpperCase()
  } catch { return 'A' }
})

onMounted(loadSessions)
watch(messages, () => nextTick(scrollToBottom), { deep: true })

async function loadSessions() {
  try { sessions.value = await getSessions() } catch (err) { console.error(err) }
}

async function handleNewSession() {
  isCreating.value = true
  errorMsg.value = ''
  try {
    const session = await createSession()
    sessions.value.unshift(session)
    activeSessionId.value = session.id
    messages.value = []
  } catch { errorMsg.value = 'Gagal membuat sesi baru.' }
  finally { isCreating.value = false }
}

async function selectSession(id) {
  if (activeSessionId.value === id) return
  activeSessionId.value = id
  errorMsg.value = ''
  try {
    const data = await getSessionMessages(id)
    messages.value = data.messages || []
  } catch {
    errorMsg.value = 'Gagal memuat pesan.'
    messages.value = []
  }
}

async function handleDeleteSession(id) {
  if (!confirm('Hapus sesi ini dan semua pesannya?')) return
  try {
    await deleteSession(id)
    sessions.value = sessions.value.filter(s => s.id !== id)
    if (activeSessionId.value === id) {
      activeSessionId.value = null
      messages.value = []
    }
  } catch { errorMsg.value = 'Gagal menghapus sesi.' }
}

async function handleSend() {
  const text = inputMessage.value.trim()
  if (!text || isSending.value) return
  if (!activeSessionId.value) {
    await handleNewSession()
    if (!activeSessionId.value) return
  }
  isSending.value = true
  errorMsg.value = ''
  inputMessage.value = ''
  resetTextarea()
  try {
    const data = await sendMessage(activeSessionId.value, text)
    messages.value.push(data.user_message)
    messages.value.push(data.ai_message)
    const idx = sessions.value.findIndex(s => s.id === activeSessionId.value)
    if (idx !== -1) {
      if (sessions.value[idx].title === 'Chat Baru')
        sessions.value[idx].title = text.substring(0, 60) + (text.length > 60 ? '...' : '')
      if (idx > 0) {
        const [s] = sessions.value.splice(idx, 1)
        sessions.value.unshift(s)
      }
    }
  } catch (err) {
    errorMsg.value = err.response?.data?.detail || 'Gagal mengirim pesan. Coba lagi.'
  } finally {
    isSending.value = false
    nextTick(() => chatInput.value?.focus())
  }
}

async function quickAsk(q) { inputMessage.value = q; await handleSend() }

function scrollToBottom() {
  if (messagesContainer.value)
    messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight
}

function autoResize(e) {
  const el = e.target
  el.style.height = 'auto'
  el.style.height = Math.min(el.scrollHeight, 120) + 'px'
}

function resetTextarea() {
  nextTick(() => { if (chatInput.value) chatInput.value.style.height = 'auto' })
}

function formatDate(d) {
  if (!d) return ''
  const date = new Date(d)
  const now = new Date()
  const diff = now - date
  if (diff < 86400000) return 'Hari ini'
  if (diff < 172800000) return 'Kemarin'
  return date.toLocaleDateString('id-ID', { day: 'numeric', month: 'short' })
}

function formatTime(d) {
  if (!d) return ''
  return new Date(d).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })
}

function renderMarkdown(text) {
  if (!text) return ''
  let html = text
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/```(\w*)\n([\s\S]*?)```/g, '<pre><code>$2</code></pre>')
    .replace(/`([^`]+)`/g, '<code>$1</code>')
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    .replace(/^[-*] (.+)$/gm, '<li>$1</li>')
    .replace(/^\d+\. (.+)$/gm, '<li>$1</li>')
    .replace(/((<li>.*<\/li>\n?)+)/g, '<ul>$1</ul>')
    .replace(/\n\n/g, '</p><p>')
    .replace(/\n/g, '<br>')
  return `<p>${html}</p>`
}
</script>

<style scoped>


.chatbot-page {
  --h-rule: var(--color-border);
  --h-rule-2: var(--color-border-light);
  --sidebar-w: 240px;
  display: flex;
  height: calc(100vh - var(--topbar-height, 56px) - 56px); /* 56px = 28px padding * 2 */
  overflow: hidden;
  border: 1px solid var(--h-rule);
  border-radius: 2px;
  background: var(--color-surface);
}

/* ═══════════════════════════════════════
   SIDEBAR
═══════════════════════════════════════ */
.chat-sidebar {
  width: var(--sidebar-w);
  flex-shrink: 0;
  border-right: 1px solid var(--h-rule);
  display: flex;
  flex-direction: column;
  background: var(--color-bg);
  overflow: hidden;
}

.sidebar-top {
  padding: 14px 12px 12px;
  border-bottom: 1px solid var(--h-rule);
}

.btn-new-chat {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 7px;
  padding: 8px 14px;
  background: var(--color-text-primary);
  color: var(--color-surface);
  border: none;
  border-radius: 2px;
  font-family: var(--font-mono);
  font-size: 11px;
  font-weight: 500;
  letter-spacing: 0.06em;
  cursor: pointer;
  transition: opacity 0.15s;
}
.btn-new-chat:hover:not(:disabled) { opacity: 0.8; }
.btn-new-chat:disabled { opacity: 0.5; cursor: not-allowed; }

.sidebar-label {
  padding: 12px 14px 6px;
  font-family: var(--font-mono);
  font-size: 9px;
  font-weight: 700;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--color-text-muted-light);
}

.session-list {
  flex: 1;
  overflow-y: auto;
  padding: 4px 0;
}

.no-sessions {
  padding: 20px 14px;
  font-family: var(--font-mono);
  font-size: 10px;
  color: var(--color-text-muted-light);
  text-align: center;
  letter-spacing: 0.04em;
}

.session-item {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 9px 12px;
  cursor: pointer;
  border-left: 3px solid transparent;
  transition: background 0.12s, border-color 0.12s;
  position: relative;
}
.session-item:hover { background: var(--color-border-light); }
.session-item.active {
  background: var(--color-surface);
  border-left-color: var(--color-accent);
}

.session-info { flex: 1; min-width: 0; }
.session-title {
  font-family: var(--font-sans);
  font-size: 11px;
  font-weight: 500;
  color: var(--color-text-primary);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-bottom: 2px;
}
.session-date {
  font-family: var(--font-mono);
  font-size: 9px;
  color: var(--color-text-muted-light);
  letter-spacing: 0.04em;
}

.session-del-btn {
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 22px;
  height: 22px;
  background: none;
  border: none;
  color: var(--color-text-muted-light);
  cursor: pointer;
  border-radius: 2px;
  opacity: 0;
  transition: opacity 0.12s, background 0.12s;
}
.session-item:hover .session-del-btn { opacity: 1; }
.session-del-btn:hover {
  background: var(--color-danger-bg);
  color: var(--color-danger-text);
}

.sidebar-footer {
  padding: 10px 14px;
  border-top: 1px solid var(--h-rule);
  display: flex;
  align-items: center;
  gap: 8px;
}
.sidebar-footer-label {
  font-family: var(--font-mono);
  font-size: 9px;
  letter-spacing: 0.1em;
  color: var(--color-text-muted-light);
}
.sidebar-footer-dot {
  width: 3px;
  height: 3px;
  border-radius: 50%;
  background: var(--color-text-muted-light);
  flex-shrink: 0;
}

/* ═══════════════════════════════════════
   MAIN
═══════════════════════════════════════ */
.chat-main {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  background: var(--color-surface);
}

.chat-header {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 18px;
  border-bottom: 1px solid var(--h-rule);
  background: var(--color-surface);
  flex-shrink: 0;
}
.header-icon-box {
  width: 32px;
  height: 32px;
  border: 1px solid var(--h-rule);
  border-radius: 2px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-text-secondary);
  flex-shrink: 0;
  background: var(--color-bg);
}
.header-title {
  font-family: var(--font-sans);
  font-size: 13px;
  font-weight: 500;
  color: var(--color-text-primary);
  letter-spacing: 0.01em;
  margin-bottom: 2px;
}
.header-status {
  display: flex;
  align-items: center;
  gap: 5px;
  font-family: var(--font-mono);
  font-size: 10px;
  color: var(--color-text-muted);
  letter-spacing: 0.04em;
}
.status-dot {
  width: 5px;
  height: 5px;
  border-radius: 50%;
  flex-shrink: 0;
}
.status-dot--online { background: var(--color-success-text); animation: pulse 2s ease-in-out infinite; }
.status-dot--typing { background: var(--color-accent); animation: pulse 0.8s ease-in-out infinite; }
@keyframes pulse { 0%,100%{opacity:1;}50%{opacity:.3;} }

/* Error */
.chat-error {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 9px 16px;
  background: var(--color-danger-bg);
  border-bottom: 1px solid var(--color-danger-border);
  color: var(--color-danger-text);
  font-family: var(--font-mono);
  font-size: 11px;
  flex-shrink: 0;
}
.error-close {
  margin-left: auto;
  background: none;
  border: none;
  color: var(--color-danger-text);
  cursor: pointer;
  font-size: 12px;
  line-height: 1;
}

/* Empty / Welcome */
.chat-empty {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px 32px;
  text-align: center;
}
.empty-logo {
  width: 52px;
  height: 52px;
  border: 1px solid var(--h-rule);
  border-radius: 2px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-text-muted);
  margin-bottom: 18px;
  background: var(--color-bg);
}
.empty-title {
  font-family: var(--font-sans);
  font-size: 14px;
  font-weight: 600;
  color: var(--color-text-primary);
  letter-spacing: -0.01em;
  margin-bottom: 8px;
}
.empty-desc {
  font-size: var(--font-size-sm);
  color: var(--color-text-muted);
  max-width: 360px;
  line-height: 1.6;
  margin-bottom: 28px;
}
.suggestion-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
  width: 100%;
  max-width: 400px;
}
.suggestion-chip {
  padding: 9px 14px;
  background: var(--color-surface);
  border: 1px solid var(--h-rule);
  border-radius: 2px;
  font-family: var(--font-mono);
  font-size: 10px;
  font-weight: 500;
  color: var(--color-text-secondary);
  cursor: pointer;
  text-align: left;
  letter-spacing: 0.04em;
  transition: background 0.12s, border-color 0.12s;
  line-height: 1.4;
}
.suggestion-chip:hover {
  background: var(--color-bg);
  border-color: var(--color-accent);
  color: var(--color-accent);
}

/* Messages */
.chat-messages {
  flex: 1;
  overflow-y: auto;
  padding: 20px 18px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.message {
  display: flex;
  align-items: flex-start;
  gap: 12px;
}
.message--user { flex-direction: row-reverse; }

.msg-avatar {
  width: 28px;
  height: 28px;
  border-radius: 2px;
  border: 1px solid var(--h-rule);
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: var(--font-mono);
  font-size: 9px;
  font-weight: 400;
  letter-spacing: 0.06em;
  flex-shrink: 0;
}
.msg-avatar--user {
  background: var(--color-text-primary);
  color: var(--color-surface);
  border-color: var(--color-text-primary);
}
.msg-avatar--ai {
  background: var(--color-info-bg);
  color: var(--color-info-text);
  border-color: var(--color-info-border);
}

.msg-body { max-width: 70%; }
.msg-content {
  padding: 11px 14px;
  border: 1px solid var(--h-rule);
  border-radius: 2px;
  font-family: var(--font-sans);
  font-size: var(--font-size-sm);
  font-weight: 400;
  color: var(--color-text-primary);
  line-height: 1.65;
  background: var(--color-surface);
}
.message--user .msg-content {
  background: var(--color-text-primary);
  color: var(--color-surface);
  border-color: var(--color-text-primary);
}
.msg-content :deep(p)      { margin: 0 0 8px; color: inherit; }
.msg-content :deep(p:last-child) { margin-bottom: 0; }
.msg-content :deep(ul)     { padding-left: 18px; margin: 6px 0; color: inherit; }
.msg-content :deep(li)     { margin-bottom: 4px; color: inherit; }
.msg-content :deep(code)   { font-family: var(--font-mono); font-size: 11px; background: rgba(0,0,0,0.07); padding: 1px 5px; border-radius: 2px; }
.msg-content :deep(pre)    { background: var(--color-text-primary); border-radius: 2px; padding: 12px; margin: 8px 0; overflow-x: auto; }
.msg-content :deep(pre code) { background: none; color: var(--color-border); font-size: 11px; }
.msg-content :deep(strong) { font-weight: 600; color: inherit; }
.msg-content :deep(em)     { color: inherit; }

.msg-time {
  font-family: var(--font-mono);
  font-size: 9px;
  color: var(--color-text-muted-light);
  letter-spacing: 0.04em;
  margin-top: 5px;
  padding: 0 2px;
}
.message--user .msg-time { text-align: right; }

/* Typing */
.typing-bubble {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 12px 16px;
  border: 1px solid var(--h-rule);
  border-radius: 2px;
  background: var(--color-surface);
}
.typing-dot {
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: var(--color-text-muted-light);
  animation: blink 1.2s infinite;
}
.typing-dot:nth-child(2) { animation-delay: 0.2s; }
.typing-dot:nth-child(3) { animation-delay: 0.4s; }
@keyframes blink { 0%,80%,100%{opacity:.25;} 40%{opacity:1;} }

/* Input */
.chat-input-area {
  padding: 14px 16px 12px;
  border-top: 1px solid var(--h-rule);
  flex-shrink: 0;
  background: var(--color-surface);
}
.chat-input-wrap {
  display: flex;
  align-items: flex-end;
  gap: 8px;
  border: 1px solid var(--h-rule);
  border-radius: 2px;
  padding: 8px 10px;
  background: var(--color-bg);
  transition: border-color 0.15s;
}
.chat-input-wrap:focus-within {
  border-color: var(--color-accent);
  box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.08);
  background: var(--color-surface);
}
.chat-input {
  flex: 1;
  background: none;
  border: none;
  outline: none;
  resize: none;
  font-size: var(--font-size-sm);
  color: var(--color-text-primary);
  line-height: 1.5;
  font-family: var(--font-sans);
  min-height: 20px;
  max-height: 120px;
}
.chat-input::placeholder { color: var(--color-text-muted-light); }
.chat-input:disabled { opacity: 0.6; cursor: not-allowed; }
.btn-send {
  flex-shrink: 0;
  width: 30px;
  height: 30px;
  border-radius: 2px;
  background: var(--color-text-primary);
  color: var(--color-surface);
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: opacity 0.15s;
}
.btn-send:hover:not(:disabled) { opacity: 0.8; }
.btn-send:disabled { opacity: 0.35; cursor: not-allowed; }
.input-hint {
  font-family: var(--font-mono);
  font-size: 9px;
  color: var(--color-text-muted-light);
  letter-spacing: 0.06em;
  margin-top: 6px;
  padding: 0 2px;
}

/* Scrollbar */
.chat-messages::-webkit-scrollbar,
.session-list::-webkit-scrollbar { width: 4px; }
.chat-messages::-webkit-scrollbar-track,
.session-list::-webkit-scrollbar-track { background: transparent; }
.chat-messages::-webkit-scrollbar-thumb,
.session-list::-webkit-scrollbar-thumb {
  background: var(--h-rule);
  border-radius: 2px;
}

/* Responsive */
@media (max-width: 640px) {
  .chat-sidebar { width: 200px; }
  .msg-body { max-width: 85%; }
  .suggestion-grid { grid-template-columns: 1fr; }
}
</style>