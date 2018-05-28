import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectSelectedUser } from '../../+state/user.selectors';
import { first } from 'rxjs/operators/first';
import { delay } from 'rxjs/operators/delay';
import { map } from 'rxjs/operators/map';
import { fromRouter } from '@labdat/common/router-state';
import { switchMap } from 'rxjs/operators/switchMap';
import { Subscription } from 'rxjs/Subscription';
import { MatDialog } from '@angular/material';
import { UserState } from '../../+state/user.interfaces';
import { cloneDeep } from 'lodash';
import * as fromUser from '../../+state/user.actions';
import { User } from '../../models/user.model';
import { UserDetailDialogComponent } from './user-detail.dialog.component';
import { ObservableMedia } from '@angular/flex-layout';

@Component({
  template: ''
})
export class UserDetailComponent implements OnInit, OnDestroy {

  constructor(public _dialog: MatDialog, private _store: Store<UserState>, private _media: ObservableMedia) { }

  public selectedUser$ = this._store.select(selectSelectedUser);
  private subscriptions: Subscription;

  back(): void {
    this._store.dispatch(new fromRouter.Back());
  }

  ngOnInit(): void {
    const dialogSubscription = this._store.select(selectSelectedUser)
    .pipe(
      first(),
      delay(0),
      map(user => this._dialog.open(UserDetailDialogComponent,
        {
          width: '50%',
          panelClass: this._media.isActive('xs') ? 'full-screen-dialog' : '',
          data: cloneDeep(user)
        })
      ),
      switchMap(dialogRef => dialogRef.afterClosed())
    )
    .subscribe((user: User) => {
      if (user) {
        this._store.dispatch(new fromUser.Update(
          {
            user: {
              id: user.id,
              changes: user
            }
          })
        );
      }
      this._store.dispatch(new fromRouter.Back());
    });
    this.subscriptions = dialogSubscription;
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

}
