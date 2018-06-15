// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The users-list of which env maps to which file can be found in `angular-cli.json`.

export const environment = {
  production: false,
  authentication: {
    providers: {
      google: {
        clientId: 'WAOS_FRONT_authentication_providers_google_clientId'
      },
      microsoft: {
        clientId: 'WAOS_FRONT_authentication_providers_microsoft_clientId',
        redirectUri: 'http://localhost:4200/',
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
