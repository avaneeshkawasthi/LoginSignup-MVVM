import { z } from 'zod';
import { AppError } from '../errors/app-error.js';

const credentialsSchema = z.object({
  username: z.string().trim().min(3, 'Username must be at least 3 characters.'),
  password: z.string().min(5, 'Password must be at least 5 characters.')
});

const signupSchema = credentialsSchema.extend({
  fullName: z.string().trim().min(2, 'Please enter your full name.'),
  email: z.string().trim().email('Please enter a valid email address.')
});

export class AuthService {
  constructor({ userRepository, passwordHasher, jwtService }) {
    this.userRepository = userRepository;
    this.passwordHasher = passwordHasher;
    this.jwtService = jwtService;
  }

  login(input) {
    const credentials = credentialsSchema.parse(input);
    const user = this.userRepository.findByUsername(credentials.username);

    if (!user || !this.passwordHasher.compare(credentials.password, user.passwordHash)) {
      throw new AppError('Username & password Error', 401, 'INVALID_CREDENTIALS');
    }

    return this.#issueSession(user);
  }

  signup(input) {
    const payload = signupSchema.parse(input);

    if (this.userRepository.findByUsername(payload.username)) {
      throw new AppError('That username is already taken.', 409, 'USERNAME_TAKEN');
    }

    if (this.userRepository.findByEmail(payload.email)) {
      throw new AppError('That email is already registered.', 409, 'EMAIL_TAKEN');
    }

    const user = this.userRepository.create({
      username: payload.username,
      email: payload.email,
      fullName: payload.fullName,
      passwordHash: this.passwordHasher.hash(payload.password)
    });

    return this.#issueSession(user);
  }

  currentUser(userId) {
    const user = this.userRepository.findById(userId);
    if (!user) {
      throw new AppError('No User Found', 404, 'USER_NOT_FOUND');
    }
    return user.toPublic();
  }

  #issueSession(user) {
    return {
      token: this.jwtService.sign({ userId: user.id, username: user.username }),
      user: user.toPublic()
    };
  }
}
