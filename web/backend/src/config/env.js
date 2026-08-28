const env = {
  port: Number(process.env.PORT ?? 4200),
  nodeEnv: process.env.NODE_ENV ?? 'development',
  jwtSecret: process.env.JWT_SECRET ?? 'cartek-local-dev-secret-change-me',
  jwtExpiresIn: process.env.JWT_EXPIRES_IN ?? '7d',
  databasePath: process.env.DATABASE_PATH ?? new URL('../data/cartek.sqlite', import.meta.url).pathname,
  directoryApi: process.env.DIRECTORY_API ?? 'https://jsonplaceholder.typicode.com/users'
};

export { env };
