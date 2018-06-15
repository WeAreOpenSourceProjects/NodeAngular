// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The users-list of which env maps to which file can be found in `angular-cli.json`.

export const environment = {
  production: false,
  authentication: {
    providers: {
      google: {
        clientId: '307800239261-ha4hmdkrhsq8ftac7uoo66gbt3fmcetv.apps.googleusercontent.com'
      },
      microsoft: {
        clientId: '5707a45e-3a3b-40fc-9827-f51c697e6fdd',
        redirectUri: 'http://localhost:4200/',
        scopes: 'https://graph.microsoft.com/user.read'
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
