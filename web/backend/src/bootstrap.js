import { passwordHasher } from './infrastructure/security/password.hasher.js';
import { SqliteUserRepository } from './infrastructure/repositories/sqlite-user.repository.js';

const DEMO_USER = {
  username: 'AvaneeshK',
  email: 'avaneesh@cartek.io',
  fullName: 'Avaneesh Kawasthi',
  password: 'A12345'
};

export function seedDemoUser() {
  const users = new SqliteUserRepository();
  if (users.findByUsername(DEMO_USER.username)) {
    return;
  }

  users.create({
    username: DEMO_USER.username,
    email: DEMO_USER.email,
    fullName: DEMO_USER.fullName,
    passwordHash: passwordHasher.hash(DEMO_USER.password)
  });
}
