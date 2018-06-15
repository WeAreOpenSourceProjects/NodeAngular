export const environment = {
  production: false,
  authentication: {
    providers: {
      google: {
        clientId: 'WAOS_FRONT_authentication_providers_google_clientId'
      },
      microsoft: {
        clientId: 'WAOS_FRONT_authentication_providers_microsoft_clientId',
        redirectUri: 'http://localhost:3000/',
        scopes: 'WAOS_FRONT_authentication_providers_microsoft_scopes'
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
    }
  }
};
