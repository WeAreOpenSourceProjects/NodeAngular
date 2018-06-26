import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectSelectedUser } from '../../+state/user.selectors';
import { first, delay, map, switchMap } from 'rxjs/operators';
import { fromRouter } from 'src/app/common/router-state';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
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
          panelClass: this._media.isActive('xs') ? ['user-edit-dialog', 'full-screen-dialog'] : 'user-edit-dialog',
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
