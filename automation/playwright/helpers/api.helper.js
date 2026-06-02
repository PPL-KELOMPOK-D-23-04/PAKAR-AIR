/**
 * PAKAR-AIR — API Helper
 * Direct API call utilities for test setup/teardown
 */

const API_BASE = 'http://localhost:8000';

/**
 * Register a new user via API
 */
async function registerUser(request, userData) {
  const response = await request.post(`${API_BASE}/api/auth/register`, {
    data: {
      email: userData.email,
      password: userData.password,
      full_name: userData.fullName,
      username: userData.username,
    },
  });
  return { status: response.status(), data: await response.json().catch(() => null) };
}

/**
 * Login via API and return tokens
 */
async function loginUser(request, email, password) {
  const response = await request.post(`${API_BASE}/api/auth/login`, {
    data: { email, password },
  });
  if (response.ok()) {
    return await response.json();
  }
  return null;
}

/**
 * Check if backend is healthy
 */
async function healthCheck(request) {
  try {
    const response = await request.get(`${API_BASE}/docs`);
    return response.ok();
  } catch {
    return false;
  }
}

module.exports = {
  API_BASE,
  registerUser,
  loginUser,
  healthCheck,
};
