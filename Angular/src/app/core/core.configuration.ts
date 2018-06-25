import { MenuItem } from './models/menu-item.model';

interface CoreConfiguration {
  self: {
    title: string;
    logo: string;
    sidenav: Array<MenuItem>;
  };
}

export const coreConfiguration: CoreConfiguration = {
  self: {
    logo: '/assets/rominet-logo.svg',
    title: 'Angular Kick Starter',
    sidenav: [{
      order: 1,
      link: 'home',
      name: 'Home',
      icon: 'action:ic_home_24px'
    }]
  }
};
