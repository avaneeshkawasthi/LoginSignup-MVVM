import bcrypt from 'bcryptjs';

const ROUNDS = 10;

export const passwordHasher = {
  hash(plain) {
    return bcrypt.hashSync(plain, ROUNDS);
  },
  compare(plain, hash) {
    return bcrypt.compareSync(plain, hash);
  }
};
