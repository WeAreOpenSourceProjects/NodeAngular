import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { filter } from 'rxjs/operators/filter';
import { first } from 'rxjs/operators/first';
import * as fromUser from '../+state/user.actions';
import { selectSelectedUserId, selectUserLoaded } from '../+state/user.selectors';
import { tap } from 'rxjs/operators/tap';
import { switchMap } from 'rxjs/operators/switchMap';

@Injectable()
export class UserGuardService implements CanActivate {
  constructor(private store: Store<any>) { }

  canActivate(): Observable<boolean> | boolean {

    return this.store.select(selectSelectedUserId)
    .pipe(
      tap(userId => this.store.dispatch(new fromUser.LoadOne(userId))),
      switchMap(() => this.store.select(selectUserLoaded)),
      filter((loaded: boolean) => loaded),
      first()
    );
  }
}
