import { MenuItem } from 'src/app/core';

export interface TaskConfiguration {
  core: { sidenav: Array<MenuItem> };
  self: { roles: Array<string> };
}

export const taskConfiguration: TaskConfiguration = {
  core: {
    sidenav: [{
      order: 2,
      link: 'tasks',
      name: 'Tasks',
      icon: 'action:ic_chrome_reader_mode_24px',
      roles: ['user', 'admin']
    }]
  },
  self: {
    roles: ['user', 'admin']
  }
};
