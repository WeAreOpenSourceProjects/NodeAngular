import { StatusState } from './status.state';
import { LoginPageState } from './login-page.state';

export interface AuthenticationState {
  status: StatusState;
  loginPage: LoginPageState;
}
