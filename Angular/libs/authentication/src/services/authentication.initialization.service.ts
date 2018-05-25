import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromAutentication from '../+state/actions/authentication-state.actions';
import { AuthenticationState } from '../+state/states/authentication-state.state';

@Injectable()
export class AuthenticationInitializationService {
  constructor(private _store: Store<AuthenticationState>) {}

  loadUser(): any {
    const tokenExpiresIn = Number(localStorage.getItem('tokenExpiresIn'));

    if (tokenExpiresIn) {
      if (tokenExpiresIn > Date.now()) {
        this._store.dispatch(new fromAutentication.LoadUser());
      } else {
        this._store.dispatch(new fromAutentication.RemoteLogout('Token expired'));
      }
    }
  }
}
