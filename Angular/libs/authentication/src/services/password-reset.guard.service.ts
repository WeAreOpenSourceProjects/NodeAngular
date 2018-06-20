import 'rxjs/add/operator/take';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/combineLatest';
import { ActivatedRouteSnapshot, CanActivate } from '@angular/router';
import { fromRouter } from '@waos/common/router-state';
import { AuthenticationState } from '../+state/states/authentication-state.state';
import { Store } from '@ngrx/store';
import { decode } from 'jsonwebtoken';

@Injectable()
export class PasswordResetGuardService implements CanActivate {
  constructor(private _store: Store<AuthenticationState>) { }

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> | boolean | Promise<boolean> {

    const token = route.queryParams.token;

    if (token && decode(token).exp > Date.now()) {
      return true;
    }
    this._store.dispatch(new fromRouter.Go({ path: ['auth'] }));

    return false;
  }
}
