import { statusReducer } from './status.reducer';
import { loginPageReducer } from './login-page.reducer';

export const authenticationReducers = {
  status: statusReducer,
  loginPage: loginPageReducer
};
