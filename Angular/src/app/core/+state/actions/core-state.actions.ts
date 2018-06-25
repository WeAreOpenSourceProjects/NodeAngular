import { Action } from '@ngrx/store';
import { MenuItem } from '../../models/menu-item.model';

export const OPEN_SIDENAV = '[Core] Open Sidenav';
export const CLOSE_SIDENAV = '[Core] Close Sidenav';
export const ADD_MENU_ITEMS = '[Core] Add Menu Items';
export const SET_TITLE = '[Core] Set Title';
export const SET_LOGO = '[Core] Set Logo';

export class OpenSidenav implements Action {
  readonly type = OPEN_SIDENAV;
}

// tslint:disable-next-line:max-classes-per-file
export class CloseSidenav implements Action {
  readonly type = CLOSE_SIDENAV;
}

// tslint:disable-next-line:max-classes-per-file
export class AddMenuItems implements Action {
  readonly type = ADD_MENU_ITEMS;
  constructor(public payload: Array<MenuItem>) {}
}

// tslint:disable-next-line:max-classes-per-file
export class SetTitle implements Action {
  readonly type = SET_TITLE;
  constructor(public payload: string) {}
}

// tslint:disable-next-line:max-classes-per-file
export class SetLogo implements Action {
  readonly type = SET_LOGO;
  constructor(public payload: string) {}
}

export type Actions =
  OpenSidenav
| CloseSidenav
| AddMenuItems
| SetTitle
| SetLogo;
