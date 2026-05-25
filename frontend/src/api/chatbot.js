/**
 * Chatbot API client — communicates with /api/admin/chatbot endpoints.
 */
import axios from 'axios'

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000'

function getAuthHeaders() {
  const token = localStorage.getItem('pakar_air_token') || localStorage.getItem('token') || ''
  return { Authorization: `Bearer ${token}` }
}

/**
 * Create a new chat session.
 * @param {string} [title] - Optional session title
 */
export async function createSession(title = 'Chat Baru') {
  const res = await axios.post(
    `${API_BASE}/api/admin/chatbot/sessions`,
    { title },
    { headers: getAuthHeaders() }
  )
  return res.data
}

/**
 * List all chat sessions for the current admin.
 */
export async function getSessions() {
  const res = await axios.get(
    `${API_BASE}/api/admin/chatbot/sessions`,
    { headers: getAuthHeaders() }
  )
  return res.data
}

/**
 * Get a session with all its messages.
 * @param {string} sessionId
 */
export async function getSessionMessages(sessionId) {
  const res = await axios.get(
    `${API_BASE}/api/admin/chatbot/sessions/${sessionId}`,
    { headers: getAuthHeaders() }
  )
  return res.data
}

/**
 * Send a message to the AI chatbot.
 * @param {string} sessionId
 * @param {string} message
 */
export async function sendMessage(sessionId, message) {
  const res = await axios.post(
    `${API_BASE}/api/admin/chatbot/sessions/${sessionId}/messages`,
    { message },
    { headers: getAuthHeaders() }
  )
  return res.data
}

/**
 * Delete a chat session.
 * @param {string} sessionId
 */
export async function deleteSession(sessionId) {
  const res = await axios.delete(
    `${API_BASE}/api/admin/chatbot/sessions/${sessionId}`,
    { headers: getAuthHeaders() }
  )
  return res.data
}
