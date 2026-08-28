import { env } from '../../config/env.js';
import { AppError } from '../errors/app-error.js';

export class DirectoryService {
  async listUsers() {
    try {
      const response = await fetch(env.directoryApi);
      if (!response.ok) {
        throw new Error(`Directory API returned ${response.status}`);
      }
      return await response.json();
    } catch {
      throw new AppError('Unable to load the user directory right now.', 502, 'DIRECTORY_UNAVAILABLE');
    }
  }
}
