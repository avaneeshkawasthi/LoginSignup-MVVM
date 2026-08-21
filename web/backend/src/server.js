import { env } from './config/env.js';
import { getDatabase } from './infrastructure/database/sqlite.connection.js';
import { seedDemoUser } from './bootstrap.js';
import { createApp } from './app.js';

getDatabase();
seedDemoUser();

const app = createApp();

app.listen(env.port, '0.0.0.0', () => {
  console.log(`Cartek preview ready at http://localhost:${env.port}`);
});
