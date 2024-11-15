export const TEST_ACCOUNTS = {
  admin: {
    email: 'admin@rks.com',
    password: 'admin123',
    name: 'Admin User',
    role: 'admin' as const
  },
  dealer: {
    email: 'dealer@rks.com',
    password: 'dealer123',
    name: 'Dealer User',
    role: 'dealer' as const
  },
  customer: {
    email: 'customer@rks.com',
    password: 'customer123',
    name: 'Customer User',
    role: 'customer' as const
  }
};