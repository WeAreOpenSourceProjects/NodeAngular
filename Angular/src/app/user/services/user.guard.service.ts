import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { filter, first, tap, switchMap } from 'rxjs/operators';
import * as fromUser from '../+state/user.actions';
import { selectSelectedUserId, selectUserLoaded } from '../+state/user.selectors';

@Injectable({
  providedIn: 'root'
})
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
