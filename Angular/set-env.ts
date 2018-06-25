import * as fs from 'fs';
import * as _ from 'lodash';
import * as objectPath from 'object-path';
import { environment as fileProdEnv } from './src/environments/environment.prod';
import { environment as fileDevEnv } from './src/environments/environment';

const fileEnv = (process.env.NODE_ENV === 'prod') ? fileProdEnv : fileDevEnv;

let frontSysEnv = _.pickBy(process.env, (_value, key) => key.startsWith('WAOS_FRONT_'));

frontSysEnv = _.mapKeys(frontSysEnv, (_v, k) => k.replace(/WAOS_FRONT_/g, '')
.replace(/_/g, '.'));

const isMailerConfigured = !_.isEmpty(_.pickBy(process.env, (_value, key) => key.startsWith('WAOS_BACK_mailer')));

const sysMemEnv = { api: { isMailerConfigured } };
_.forEach(frontSysEnv, (v, k) => objectPath.set(sysMemEnv, k, v));
const env = _.merge(fileEnv, sysMemEnv);

const filePath = `./src/environments/${(process.env.NODE_ENV === 'production') ? 'environment.prod.ts' : 'environment.ts'}`;

fs.open(filePath, 'w', (err, fd) => {
  if (err) {
    throw err;
  }
  const envConfigFile = `export const environment = ${
    JSON.stringify(env, undefined, 2)
    .replace(/\"([^(\")"]+)\":/g, '$1:')
    .replace(/"/g, '\'')};
    `;
  fs.writeSync(fd, envConfigFile);
});
