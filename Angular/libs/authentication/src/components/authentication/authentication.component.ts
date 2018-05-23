import { Component } from '@angular/core';
import { AuthenticationState } from '../../+state/states/authentication-state.state';
import * as fromAuthentication from '../../+state/actions/authentication-state.actions';
import {
  getLoginPageError,
  getLoginPagePending
} from '../../+state/selectors/authentication-state.selectors';
import { Store } from '@ngrx/store';

@Component({
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.scss']
})
export class AuthenticationComponent {
  public pending$ = this.store.select(getLoginPagePending);
  public error$ = this.store.select(getLoginPageError);

  constructor(private store: Store<AuthenticationState>) {}

  onLogin(authentication: any): void {
    switch (authentication.provider) {
      case 'google':
        this.store.dispatch(new fromAuthentication.GoogleLogin(authentication.idToken));
        break;
      case 'microsoft':
        this.store.dispatch(new fromAuthentication.MicrosoftLogin(authentication.idToken));
        break;
      default:
        this.store.dispatch(new fromAuthentication.LocalLogin(authentication));
    }
  }

  onEmail(email: string): void {
    this.store.dispatch(new fromAuthentication.ChangePassword({ email }));
  }

  onRegister(registration: any): void {
    this.store.dispatch(new fromAuthentication.Register(registration));
  }
}
