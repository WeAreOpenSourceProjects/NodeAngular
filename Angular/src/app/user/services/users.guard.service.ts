import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { filter, first } from 'rxjs/operators';
import * as fromUser from '../+state/user.actions';
import { selectUserLoaded } from '../+state/user.selectors';

@Injectable({
  providedIn: 'root'
})
export class UsersGuardService implements CanActivate {
  constructor(private store: Store<any>) { }

  canActivate(): Observable<boolean> | boolean {

    this.store.dispatch(new fromUser.LoadAll());

    return this.store
    .select(selectUserLoaded)
    .pipe(
      filter((loaded: boolean) => loaded),
      first()
    );
  }
}
