import { logoReducer } from './logo.reducer';
import { titleReducer } from './title.reducer';
import { showSidenavReducer } from './show-sidenav.reducer';
import { menuItemsReducer } from './menu-items.reducer';

export const coreReducers = {
  logo: logoReducer,
  title: titleReducer,
  showSidenav: showSidenavReducer,
  menuItems: menuItemsReducer
};
