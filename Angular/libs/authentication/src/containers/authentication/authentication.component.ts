import { Component } from '@angular/core';
import { AuthenticationState } from '../../+state/states/authentication-state.state';
import { getLoginPageError, getLoginPagePending } from '../../+state/selectors/authentication-state.selectors';

import { Store } from '@ngrx/store';
import * as fromAuthentication from '../../+state/actions/authentication-state.actions';
import { Credentials } from '../../models/authenticate.model';

@Component({
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.scss']
})
export class AuthenticationComponent {

  public loginPending$ = this._store.select(getLoginPagePending);
  public loginError$ = this._store.select(getLoginPageError);

  constructor(private _store: Store<AuthenticationState>) { }

  public onLocalLogin(credentials: Credentials): void {
    this._store.dispatch(new fromAuthentication.LocalLogin(credentials));
  }

  public onPasswordChangeRequest(email: string): void {
    this._store.dispatch(new fromAuthentication.ChangePassword({ email }));

  }

  public onGoogleLogin(): void {
    this._store.dispatch(new fromAuthentication.GoogleSignIn());
  }

  public onMicrosoftLogin(): void {
    this._store.dispatch(new fromAuthentication.MicrosoftSignIn());
  }

  onRegister(userInfos: any): void {
    this._store.dispatch(new fromAuthentication.Register(userInfos));
  }

}
