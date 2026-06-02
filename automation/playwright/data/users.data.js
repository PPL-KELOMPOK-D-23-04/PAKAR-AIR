/**
 * PAKAR-AIR — User Test Data
 */
const USERS = {
  validUser: {
    email: 'userpakarair@gmail.com',
    password: 'password123',
    fullName: 'Pengguna Publik',
    username: 'user_public',
  },
  adminUser: {
    email: 'adminpakarair@gmail.com',
    password: 'password123',
    fullName: 'Admin Pakar Air',
    username: 'admin_pakar',
  },
  newRegister: {
    email: `testregister_${Date.now()}@pakar-air.com`,
    password: 'Register@12345',
    fullName: 'Register Test User',
    username: `reguser_${Date.now()}`,
  },
  invalidUser: {
    email: 'nonexistent@fake.com',
    password: 'WrongPassword!',
  },
};

/**
 * Generate a unique user for registration tests
 */
function generateUniqueUser() {
  const ts = Date.now();
  return {
    email: `testuser_${ts}@pakar-air.com`,
    password: 'Test@12345',
    fullName: `Test User ${ts}`,
    username: `user_${ts}`,
  };
}

module.exports = {
  USERS,
  generateUniqueUser,
};
