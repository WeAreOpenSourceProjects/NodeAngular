// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The users-list of which env maps to which file can be found in `angular-cli.json`.

export const environment = {
  production: false,
  authentication: {
    providers: {
      google: {
        clientid: '307800239261-8ghk4lu2me211p9ucialjl6ujer8v10j.apps.googleusercontent.com'
      },
      microsoft: {
        clientid: '5707a45e-3a3b-40fc-9827-f51c697e6fdd',
        redirecturi: 'http://localhost:4200/',
        scopes: 'https://graph.microsoft.com/user.read'
      }
    }
  },
  api: {
    protocol: 'http',
    host: 'localhost',
    port: '3000',
    endpoints: {
      basepath: 'api',
      auth: 'auth',
      users: 'users',
      tasks: 'tasks',
      media: 'media'
    }
  }
};
