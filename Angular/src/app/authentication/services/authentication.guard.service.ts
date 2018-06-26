import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AuthenticationState } from '../+state/states/authentication-state.state';
import { getIsUserLoading, getLoggedIn } from '../+state/selectors/authentication-state.selectors';
import { fromRouter } from 'src/app/common/router-state';
import { map, switchMapTo, filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationGuardService implements CanActivate {
  constructor(private _store: Store<AuthenticationState>) { }

  canActivate(_route: ActivatedRouteSnapshot, _state: RouterStateSnapshot): Observable<boolean> | boolean | Promise<boolean> {

    const path = _state.url.split('/')[1];

    return this._store.select(getIsUserLoading)
    .pipe(
      filter(isUserLoading => !isUserLoading),
      switchMapTo(this._store.select(getLoggedIn)),
      map((loggedIn: boolean) => {
        if (loggedIn) {
          if (path === 'auth') {
            this._store.dispatch(new fromRouter.Go({ path: ['home'] }));
            return false;
          }
          return true;
        }

        if (path === 'auth') {
          return true;
        }
        this._store.dispatch(new fromRouter.Go({ path: ['auth'] }));
        return false;
      })
    );
  }
}
