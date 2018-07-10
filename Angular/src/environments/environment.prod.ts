export const environment = {
  production: false,
  authentication: {
    providers: { }
  },
  api: {
    protocol: 'http',
    host: 'localhost',
    port: '3000',
    endPoints: {
      basePath: 'api',
      auth: 'auth',
      users: 'users',
      tasks: 'tasks'
    },
    isMailerConfigured: false
  }
};
