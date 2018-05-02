import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { AuthenticationState } from '../+state/states/authentication-state.state';
import { getIsUserLoading, getLoggedIn } from '../+state/selectors/authentication-state.selectors';
import { fromRouter } from '@labdat/common/router-state';
import { map } from 'rxjs/operators/map';
import { switchMap } from 'rxjs/operators/switchMap';
import { filter } from 'rxjs/operators/filter';

@Injectable()
export class AuthenticationGuardService implements CanActivate {
  constructor(private store: Store<AuthenticationState>) { }

  canActivate(_route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean | Promise<boolean> {

    const path = state.url.split('/')[1];

    return this.store.select(getIsUserLoading)
    .pipe(
      filter(isUserLoading => !isUserLoading),
      switchMap(() => this.store.select(getLoggedIn)),
      map((loggedIn: boolean) => {
        if (loggedIn) {
          if (path === 'auth') {
            this.store.dispatch(new fromRouter.Go({ path: ['home'] }));

            return false;
          }

          return true;
        }

        if (path === 'auth') {

          return true;
        }
        this.store.dispatch(new fromRouter.Go({ path: ['auth'] }));

        return false;
      })
    );
  }
}
