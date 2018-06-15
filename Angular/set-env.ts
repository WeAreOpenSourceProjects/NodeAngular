import * as fs from 'fs';
import * as _ from 'lodash';
import * as objectPath from 'object-path';
import { environment as fileEnv } from './apps/default/src/environments/environment.prod';

let sysEnv = _.pickBy(process.env, (_value, key) => key.startsWith('WAOS_FRONT_'));

sysEnv = _.mapKeys(sysEnv, (_v, k) => k.replace(/WAOS_FRONT_/g, '')
.replace(/_/g, '.'));

const sysMemEnv = {};
_.forEach(sysEnv, (v, k) => objectPath.set(sysMemEnv, k, v));
const env = _.merge(fileEnv, sysMemEnv);

fs.open('./apps/default/src/environments/environment.prod.ts', 'w', (err, fd) => {
  if (err) {
    throw err;
  }
  const envConfigFile = `export const environment = ${
    JSON.stringify(env, null, 2)
    .replace(/\"([^(\")"]+)\":/g, '$1:')
    .replace(/"/g, '\'')};`;
  fs.writeSync(fd, envConfigFile);
});
