import path from 'node:path';
import { fileURLToPath } from 'node:url';
import express from 'express';
import cors from 'cors';
import { jwtService } from './infrastructure/security/jwt.service.js';
import { passwordHasher } from './infrastructure/security/password.hasher.js';
import { SqliteUserRepository } from './infrastructure/repositories/sqlite-user.repository.js';
import { SqliteContactRepository } from './infrastructure/repositories/sqlite-contact.repository.js';
import { AuthService } from './application/services/auth.service.js';
import { ContactService } from './application/services/contact.service.js';
import { DirectoryService } from './application/services/directory.service.js';
import { AuthController } from './presentation/controllers/auth.controller.js';
import { ContactController } from './presentation/controllers/contact.controller.js';
import { DirectoryController } from './presentation/controllers/directory.controller.js';
import { requireAuth } from './presentation/middleware/auth.middleware.js';
import { errorHandler } from './presentation/middleware/error.middleware.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const frontendDist = path.resolve(__dirname, '../../frontend/dist/frontend/browser');

export function createApp() {
  const app = express();
  const userRepository = new SqliteUserRepository();
  const authService = new AuthService({ userRepository, passwordHasher, jwtService });
  const contactService = new ContactService({
    contactRepository: new SqliteContactRepository()
  });
  const directoryService = new DirectoryService();

  const authController = new AuthController(authService);
  const contactController = new ContactController(contactService);
  const directoryController = new DirectoryController(directoryService);

  app.disable('x-powered-by');
  app.use(cors());
  app.use(express.json());

  app.get('/api/health', (_req, res) => {
    res.json({ status: 'ok', service: 'cartek-api' });
  });

  app.post('/api/auth/login', authController.login);
  app.post('/api/auth/signup', authController.signup);
  app.get('/api/auth/me', requireAuth, authController.me);
  app.post('/api/contact', contactController.submit);
  app.get('/api/directory', requireAuth, directoryController.list);

  app.use(express.static(frontendDist));
  app.get('*', (req, res, next) => {
    if (req.path.startsWith('/api/')) {
      return next();
    }
    res.sendFile(path.join(frontendDist, 'index.html'), (error) => {
      if (error) {
        res.status(503).json({
          code: 'FRONTEND_MISSING',
          message: 'Frontend build not found. Run `npm run build` from the web folder.'
        });
        return;
      }
    });
  });

  app.use(errorHandler);
  return app;
}
