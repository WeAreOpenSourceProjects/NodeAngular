import * as fromCore from '../actions/core-state.actions';
import { LogoState } from '../states/logo.state';

export function logoReducer(
  state: LogoState = '',
  action: fromCore.Actions): LogoState {
  switch (action.type) {
    case fromCore.SET_LOGO:
      return action.payload;
    default:
      return state;
  }
}
