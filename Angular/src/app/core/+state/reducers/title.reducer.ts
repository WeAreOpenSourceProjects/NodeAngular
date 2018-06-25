import * as fromCore from '../actions/core-state.actions';
import { TitleState } from '../states/title.state';

export function titleReducer(
  state: TitleState = '',
  action: fromCore.Actions): TitleState {
    switch (action.type) {
      case fromCore.SET_TITLE:
        return action.payload;
      default:
        return state;
    }
}
