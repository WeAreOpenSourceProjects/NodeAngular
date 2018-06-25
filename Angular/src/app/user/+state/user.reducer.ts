import * as fromUser from './user.actions';
import { userAdapter, UserState } from './user.interfaces';
import { fromAuthentication } from 'src/app/authentication';

export const userInitialState: UserState = userAdapter.getInitialState({
  loading: false,
  loaded: false
});
export function userReducer(
  state: UserState = userInitialState,
  action: fromUser.Actions | fromAuthentication.Actions
): UserState {
  switch (action.type) {
    case fromUser.LOAD_ALL:
    case fromUser.LOAD_ONE: {
      return userAdapter.removeAll({ ...state, loading: true, loaded: false });
    }

    case fromUser.LOAD_ONE_SUCCESS: {
      return userAdapter.addOne(action.payload, { ...state, loading: false, loaded: true });
    }

    case fromUser.LOAD_ALL_SUCCESS: {
      return userAdapter.addAll(action.payload.users, { ...state, loading: false, loaded: true });
    }

    case fromAuthentication.LOCAL_LOGOUT: {
      //      return adapter.removeAll({ ...state, selectedUserId: null });
      return userInitialState;
    }

    case fromAuthentication.USER_UPDATE_SUCCESS: {
      return userAdapter.updateOne(
        {
          id: action.payload.user.id,
          changes: action.payload.user
        },
        state
      );
    }

    case fromUser.ADD_SUCCESS: {
      return userAdapter.addOne(action.payload.user, state);
    }

    case fromUser.UPDATE_SUCCESS: {
      return userAdapter.updateOne(action.payload.user, state);
    }

    case fromUser.DELETE_SUCCESS: {
      return userAdapter.removeOne(action.payload.userId, state);
    }

    case fromUser.DELETE_FAILURE: {
      return state;
    }

    default: {
      return state;
    }
  }
}
