import { jwtService } from '../../infrastructure/security/jwt.service.js';
import { AppError } from '../../application/errors/app-error.js';

export function requireAuth(req, _res, next) {
  const header = req.headers.authorization ?? '';
  const [scheme, token] = header.split(' ');

  if (scheme !== 'Bearer' || !token) {
    return next(new AppError('Please sign in to continue.', 401, 'UNAUTHENTICATED'));
  }

  try {
    const payload = jwtService.verify(token);
    req.userId = payload.userId;
    return next();
  } catch {
    return next(new AppError('Your session has expired. Please sign in again.', 401, 'TOKEN_EXPIRED'));
  }
}
