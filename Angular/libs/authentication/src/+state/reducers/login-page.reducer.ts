import * as fromAuthentication from '../actions/authentication-state.actions';
import { LoginPageState } from '../states/login-page.state';

const initialLoginPageState: LoginPageState = {
  error: undefined,
  pending: false
};

export function loginPageReducer(state = initialLoginPageState, action: fromAuthentication.Actions): LoginPageState {
  switch (action.type) {
    case fromAuthentication.LOCAL_LOGIN: {
      return {
        ...state,
        error: undefined,
        pending: true
      };
    }
    case fromAuthentication.LOCAL_LOGIN_SUCCESS: {
      return {
        ...state,
        error: undefined,
        pending: false
      };
    }
    case fromAuthentication.LOCAL_LOGIN_FAILURE: {
      return {
        ...state,
        error: action.payload,
        pending: false
      };
    }
    default: {
      return state;
    }
  }
}
