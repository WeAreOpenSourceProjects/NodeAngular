import 'rxjs/add/operator/take';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/combineLatest';
import { ActivatedRouteSnapshot, CanActivate } from '@angular/router';
import { fromRouter } from '@waos/common/router-state';
import { AuthenticationState } from '../+state/states/authentication-state.state';
import { Store } from '@ngrx/store';
import * as jsrsasign from 'jsrsasign';

@Injectable()
export class PasswordResetGuardService implements CanActivate {
  constructor(private _store: Store<AuthenticationState>) { }

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> | boolean | Promise<boolean> {

    const token = route.queryParams.token;

    if (token) {
//      const IntDate = jsrsasign.KJUR.jws.IntDate;
      const isValid = jsrsasign.KJUR.jws.JWS.verifyJWT(
        token,
        'test',
        {
          alg: ['HS256']
          // verifyAt: IntDate.get('20150601000000Z')
        }
      );

      if (isValid && jsrsasign.KJUR.jws.JWS.readSafeJSONString(atob(token.split('.')[1]))
      .exp > Date.now()) {

        return true;
      }
    }
    this._store.dispatch(new fromRouter.Go({ path: ['auth'] }));

    return false;
  }
}
