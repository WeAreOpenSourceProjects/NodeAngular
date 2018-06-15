import * as fs from 'fs';
import * as _ from 'lodash';
import * as objectPath from 'object-path';
import { environment as fileProdEnv } from './apps/default/src/environments/environment.prod';
import { environment as fileDevEnv } from './apps/default/src/environments/environment';

const fileEnv = (process.env.NODE_ENV === 'prod') ? fileProdEnv : fileDevEnv;

let sysEnv = _.pickBy(process.env, (_value, key) => key.startsWith('WAOS_FRONT_'));

sysEnv = _.mapKeys(sysEnv, (_v, k) => k.replace(/WAOS_FRONT_/g, '')
.replace(/_/g, '.'));

const sysMemEnv = {};
_.forEach(sysEnv, (v, k) => objectPath.set(sysMemEnv, k, v));
const env = _.merge(fileEnv, sysMemEnv);

const filePath = `./apps/default/src/environments/${(process.env.NODE_ENV === 'prod') ? 'environment.prod.ts' : 'environment.ts'}`;

fs.open(filePath, 'w', (err, fd) => {
  if (err) {
    throw err;
  }
  const envConfigFile = `export const environment = ${
    JSON.stringify(env, undefined, 2)
    .replace(/\"([^(\")"]+)\":/g, '$1:')
    .replace(/"/g, '\'')};`;
  fs.writeSync(fd, envConfigFile);
});
