
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ActivatedRouteSnapshot, CanActivate } from '@angular/router';
import { fromRouter } from 'src/app/common/router-state';
import { AuthenticationState } from '../+state/states/authentication-state.state';
import { Store } from '@ngrx/store';
import { decode } from 'jwt-decode';
import { AuthenticationRoutingModule } from '../authentication-routing.module';

@Injectable({
  providedIn: AuthenticationRoutingModule
})
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
