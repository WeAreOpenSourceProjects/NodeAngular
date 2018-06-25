import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';


import { AuthenticationState } from '../+state/states/authentication-state.state';
import { getUser } from '../+state/selectors/authentication-state.selectors';
import { fromRouter } from 'src/app/common/router-state';
import { intersection } from 'lodash';
import { User } from '../models/user.model';
import { map, filter } from 'rxjs/operators';

@Injectable()
export class RoleGuardService implements CanActivate {
  constructor(private _store: Store<AuthenticationState>) { }

  private currentUser$ = this._store.select(getUser);

  canActivate(_route: ActivatedRouteSnapshot): Observable<boolean> | boolean | Promise<boolean> {
    const roles = _route.data.roles;

    return this.currentUser$.pipe(
      map((user: User) => {
        if (user) {
          if (intersection(user.roles, roles).length > 0) {
            return true;
          }
          this._store.dispatch(new fromRouter.Go({ path: ['home'] }));

          return false;
        }
      }),
      filter(x => x !== undefined)
    );
  }
}
