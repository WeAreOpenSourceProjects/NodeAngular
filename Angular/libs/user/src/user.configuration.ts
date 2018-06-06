import { MenuItem } from '@waos/core';

export interface UserConfiguration {
  core: { sidenav: Array<MenuItem> };
  self: { roles: Array<string>; };
}

export const userConfiguration: UserConfiguration = {
  core: {
    sidenav: [{
      order: 2,
      link: '/users',
      name: 'User',
      icon: 'action:ic_chrome_reader_mode_24px',
      roles: ['admin']
    }]
  },
  self: {
    roles: ['admin']
  }
};
