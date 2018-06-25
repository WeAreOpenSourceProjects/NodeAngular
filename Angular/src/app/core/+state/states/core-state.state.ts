import { TitleState } from './title.state';
import { LogoState } from './logo.state';
import { ShowSidenavState } from './show-sidenav.state';
import { MenuItemsState } from './menu-items.state';

export interface CoreState {
  readonly logo: LogoState;
  readonly title: TitleState;
  readonly showSidenav: ShowSidenavState;
  readonly menuItems: MenuItemsState;
}
