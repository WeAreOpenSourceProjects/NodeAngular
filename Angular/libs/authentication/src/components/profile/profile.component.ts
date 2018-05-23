import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { getUser } from '../../+state/selectors/authentication-state.selectors';
import { delay } from 'rxjs/operators/delay';
import { map } from 'rxjs/operators/map';
import { fromRouter } from '@labdat/common/router-state';
import { switchMap } from 'rxjs/operators/switchMap';
import { Subscription } from 'rxjs/Subscription';
import { MatDialog } from '@angular/material/dialog';
import { AuthenticationState } from '../../+state/states/authentication-state.state';
import { cloneDeep } from 'lodash';
import * as fromAuthentication from '../../+state/actions/authentication-state.actions';
import { User } from '../../models/user.model';
import { UserDetailDialogComponent } from '@labdat/user';

@Component({
  template: ''
})
export class ProfileComponent implements OnInit, OnDestroy {

  constructor(
    private _dialog: MatDialog,
    private store: Store<AuthenticationState>
  ) { }

  public selectedUser$ = this.store.select(getUser);
  private subscriptions: Subscription;

  back(): void {
    this.store.dispatch(new fromRouter.Back());
  }

  ngOnInit(): void {
    const dialogSubscription = this.store.select(getUser)
    .pipe(
      delay(0),
      map(user => this._dialog.open(UserDetailDialogComponent, {
        width: '50%',
        data: cloneDeep(user)
      })),
      switchMap(dialogRef => dialogRef.afterClosed())
    )
    .subscribe((user: User) => {
      if (user) {
        this.store.dispatch(new fromAuthentication.UpdateUser({ user }));
      }
      this.store.dispatch(new fromRouter.Back());
    });
    this.subscriptions = dialogSubscription;
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

}
