<template>
  <div class="chatbot-page">

    <!-- ─── Session Sidebar ──────────────────────────── -->
    <aside class="chat-sidebar">
      <div class="sidebar-top">
        <button class="new-chat-btn" @click="handleNewSession" :disabled="isCreating">
          <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" />
          </svg>
          {{ isCreating ? 'Membuat...' : 'Chat Baru' }}
        </button>
      </div>

      <div class="session-list-label">Riwayat Chat</div>

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
          <div class="session-icon">💬</div>
          <div class="session-info">
            <div class="session-title">{{ session.title }}</div>
            <div class="session-date">{{ formatDate(session.updated_at) }}</div>
          </div>
          <button
            class="session-delete-btn"
            @click.stop="handleDeleteSession(session.id)"
            title="Hapus sesi"
          >
            <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round"
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
      </div>
    </aside>

    <!-- ─── Chat Main ────────────────────────────────── -->
    <div class="chat-main">

      <!-- Header -->
      <div class="chat-header">
        <div class="chat-header-icon">🤖</div>
        <div class="chat-header-info">
          <div class="chat-header-title">PAKAR-AIR AI Assistant</div>
          <div class="chat-header-status">
            {{ isSending ? 'Sedang mengetik...' : 'Online — Gemini AI' }}
          </div>
        </div>
      </div>

      <!-- Error Banner -->
      <div v-if="errorMsg" class="chat-error">
        <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round"
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z" />
        </svg>
        {{ errorMsg }}
      </div>

      <!-- Messages / Empty State -->
      <div v-if="!activeSessionId" class="chat-empty">
        <div class="empty-icon">💧</div>
        <div class="empty-title">PAKAR-AIR AI Chatbot</div>
        <div class="empty-desc">
          Asisten AI untuk membantu Anda memahami data kualitas air, laporan analisis, dan rekomendasi sanitasi.
        </div>
        <div class="empty-suggestions">
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
        <!-- Messages List -->
        <div class="chat-messages" ref="messagesContainer">
          <div
            v-for="msg in messages"
            :key="msg.id"
            class="message"
            :class="msg.role"
          >
            <div class="message-avatar">
              {{ msg.role === 'user' ? userInitial : '🤖' }}
            </div>
            <div>
              <div class="message-content" v-html="renderMarkdown(msg.content)"></div>
              <div class="message-time">{{ formatTime(msg.created_at) }}</div>
            </div>
          </div>

          <!-- Typing Indicator -->
          <div v-if="isSending" class="typing-indicator">
            <div class="message-avatar" style="background: linear-gradient(135deg, #06b6d4, #0891b2); color: #fff;">
              🤖
            </div>
            <div class="typing-bubble">
              <span class="typing-dot"></span>
              <span class="typing-dot"></span>
              <span class="typing-dot"></span>
            </div>
          </div>
        </div>

        <!-- Input Area -->
        <div class="chat-input-area">
          <div class="chat-input-wrapper">
            <textarea
              ref="chatInput"
              class="chat-input"
              v-model="inputMessage"
              @keydown.enter.exact.prevent="handleSend"
              placeholder="Ketik pesan Anda..."
              rows="1"
              :disabled="isSending"
              @input="autoResize"
            ></textarea>
            <button
              class="chat-send-btn"
              @click="handleSend"
              :disabled="!inputMessage.trim() || isSending"
              title="Kirim pesan"
            >
              <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round"
                  d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
              </svg>
            </button>
          </div>
        </div>
      </template>

    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, nextTick, watch } from 'vue'
import {
  createSession,
  getSessions,
  getSessionMessages,
  sendMessage,
  deleteSession,
} from '@/api/chatbot'
import '@/assets/styles/pages/chatbot.css'

// ─── State ───────────────────────────────────────────────

const sessions = ref([])
const messages = ref([])
const activeSessionId = ref(null)
const inputMessage = ref('')
const isSending = ref(false)
const isCreating = ref(false)
const errorMsg = ref('')
const messagesContainer = ref(null)
const chatInput = ref(null)

// ─── User Info ───────────────────────────────────────────

const userInitial = computed(() => {
  try {
    const user = JSON.parse(localStorage.getItem('pakar_air_user') || '{}')
    const name = user.full_name || user.username || 'A'
    return name.charAt(0).toUpperCase()
  } catch {
    return 'A'
  }
})

// ─── Lifecycle ───────────────────────────────────────────

onMounted(async () => {
  await loadSessions()
})

// ─── Watch for scroll ────────────────────────────────────

watch(messages, () => {
  nextTick(scrollToBottom)
}, { deep: true })

// ─── Methods ─────────────────────────────────────────────

async function loadSessions() {
  try {
    sessions.value = await getSessions()
  } catch (err) {
    console.error('Failed to load sessions:', err)
  }
}

async function handleNewSession() {
  isCreating.value = true
  errorMsg.value = ''
  try {
    const session = await createSession()
    sessions.value.unshift(session)
    activeSessionId.value = session.id
    messages.value = []
  } catch (err) {
    errorMsg.value = 'Gagal membuat sesi baru.'
  } finally {
    isCreating.value = false
  }
}

async function selectSession(sessionId) {
  if (activeSessionId.value === sessionId) return
  activeSessionId.value = sessionId
  errorMsg.value = ''
  try {
    const data = await getSessionMessages(sessionId)
    messages.value = data.messages || []
  } catch (err) {
    errorMsg.value = 'Gagal memuat pesan.'
    messages.value = []
  }
}

async function handleDeleteSession(sessionId) {
  if (!confirm('Hapus sesi ini dan semua pesannya?')) return
  try {
    await deleteSession(sessionId)
    sessions.value = sessions.value.filter(s => s.id !== sessionId)
    if (activeSessionId.value === sessionId) {
      activeSessionId.value = null
      messages.value = []
    }
  } catch (err) {
    errorMsg.value = 'Gagal menghapus sesi.'
  }
}

async function handleSend() {
  const text = inputMessage.value.trim()
  if (!text || isSending.value) return

  // If no active session, create one first
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

    // Update session title in sidebar
    const idx = sessions.value.findIndex(s => s.id === activeSessionId.value)
    if (idx !== -1 && sessions.value[idx].title === 'Chat Baru') {
      sessions.value[idx].title = text.substring(0, 60) + (text.length > 60 ? '...' : '')
    }
    // Move session to top
    if (idx > 0) {
      const [session] = sessions.value.splice(idx, 1)
      sessions.value.unshift(session)
    }
  } catch (err) {
    errorMsg.value = err.response?.data?.detail || 'Gagal mengirim pesan. Coba lagi.'
  } finally {
    isSending.value = false
    nextTick(() => {
      chatInput.value?.focus()
    })
  }
}

async function quickAsk(question) {
  inputMessage.value = question
  await handleSend()
}

function scrollToBottom() {
  if (messagesContainer.value) {
    messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight
  }
}

function autoResize(e) {
  const el = e.target
  el.style.height = 'auto'
  el.style.height = Math.min(el.scrollHeight, 120) + 'px'
}

function resetTextarea() {
  nextTick(() => {
    if (chatInput.value) {
      chatInput.value.style.height = 'auto'
    }
  })
}

// ─── Formatters ──────────────────────────────────────────

function formatDate(dateStr) {
  if (!dateStr) return ''
  const d = new Date(dateStr)
  const now = new Date()
  const diff = now - d
  if (diff < 86400000) return 'Hari ini'
  if (diff < 172800000) return 'Kemarin'
  return d.toLocaleDateString('id-ID', { day: 'numeric', month: 'short' })
}

function formatTime(dateStr) {
  if (!dateStr) return ''
  return new Date(dateStr).toLocaleTimeString('id-ID', {
    hour: '2-digit',
    minute: '2-digit',
  })
}

/**
 * Simple markdown renderer for AI responses.
 * Handles: bold, italic, inline code, code blocks, lists, paragraphs.
 */
function renderMarkdown(text) {
  if (!text) return ''
  let html = text
    // Escape HTML
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    // Code blocks (```...```)
    .replace(/```(\w*)\n([\s\S]*?)```/g, '<pre><code>$2</code></pre>')
    // Inline code
    .replace(/`([^`]+)`/g, '<code>$1</code>')
    // Bold
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    // Italic
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    // Unordered lists
    .replace(/^[-*] (.+)$/gm, '<li>$1</li>')
    // Ordered lists
    .replace(/^\d+\. (.+)$/gm, '<li>$1</li>')
    // Wrap consecutive <li> in <ul>
    .replace(/((<li>.*<\/li>\n?)+)/g, '<ul>$1</ul>')
    // Line breaks → paragraphs
    .replace(/\n\n/g, '</p><p>')
    .replace(/\n/g, '<br>')

  return `<p>${html}</p>`
}
</script>
