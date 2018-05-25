import * as fromAuthentication from '../actions/authentication-state.actions';
import { fromUser } from '@labdat/user';
import { StatusState } from '../states/status.state';

const initialStatusState: StatusState = {
  user: undefined,
  loading: false
};

export function statusReducer(state = initialStatusState, action: fromAuthentication.Actions | fromUser.Actions): StatusState {
  switch (action.type) {
    case fromAuthentication.LOAD_USER: {

      return {
        ...state,
        loading: true
      };
    }
    case fromAuthentication.USER_LOAD_SUCCESS:
    case fromAuthentication.REGISTER_SUCCESS:
    case fromAuthentication.LOCAL_LOGIN_SUCCESS:
    case fromAuthentication.GOOGLE_LOGIN_SUCCESS:
    case fromAuthentication.MICROSOFT_LOGIN_SUCCESS: {

      return {
        ...state,
        user: action.payload.user,
        loading: false
      };
    }
    case fromAuthentication.LOCAL_LOGOUT: {

      return {
        ...state,
        ...initialStatusState
      };
    }
    case fromAuthentication.USER_UPDATE_SUCCESS: {
      return {
        ...state,
        user: action.payload.user
      };
    }
    case fromUser.UPDATE_SUCCESS: {
      return {
        ...state,
        user: action.payload.user.changes
      };
    }
    default: {
      return state;
    }
  }
}
