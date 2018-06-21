export const environment = {
  production: false,
  authentication: {
    providers: {
      google: {
        clientId: '307800239261-ha4hmdkrhsq8ftac7uoo66gbt3fmcetv.apps.googleusercontent.com'
      },
      microsoft: {
        clientId: '5707a45e-3a3b-40fc-9827-f51c697e6fdd',
        scopes: 'https://graph.microsoft.com/user.read',
        redirectUri: 'http://localhost:4200'
      }
    }
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
    isMailerConfigured: true
  }
};