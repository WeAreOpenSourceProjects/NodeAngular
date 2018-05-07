import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { filter } from 'rxjs/operators/filter';
import { tap } from 'rxjs/operators/tap';
import { first } from 'rxjs/operators/first';
import * as fromUser from '../+state/user.actions';
import { selectUserLoaded } from '../+state/user.selectors';

@Injectable()
export class UsersGuardService implements CanActivate {
  constructor(private store: Store<any>) { }

  canActivate(): Observable<boolean> | boolean {
    return this.store
    .select(selectUserLoaded)
    .pipe(
      tap(loaded => {
        if (!loaded) {
          this.store.dispatch(new fromUser.Load());
        }
      }),
      filter(loaded => loaded),
      first()
    );
  }
}
