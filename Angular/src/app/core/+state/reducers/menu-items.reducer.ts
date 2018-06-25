import { MenuItemsState } from '../states/menu-items.state';
import * as fromCore from '../actions/core-state.actions';
import { keyBy } from 'lodash';

export function menuItemsReducer(state: MenuItemsState = {}, action: fromCore.Actions): MenuItemsState {
  switch (action.type) {
    case fromCore.ADD_MENU_ITEMS:
      return {
        ...state,
        ...keyBy(action.payload, 'order')
      };
    default:
      return state;
  }
}
