import jwt from 'jsonwebtoken';
import { env } from '../../config/env.js';

export const jwtService = {
  sign(payload) {
    return jwt.sign(payload, env.jwtSecret, { expiresIn: env.jwtExpiresIn });
  },
  verify(token) {
    return jwt.verify(token, env.jwtSecret);
  }
};
