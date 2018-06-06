import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators/map';
import { catchError } from 'rxjs/operators/catchError';
import { tap } from 'rxjs/operators/tap';
import { Actions, Effect } from '@ngrx/effects';
import { switchMap } from 'rxjs/operators/switchMap';
import { of } from 'rxjs/observable/of';
import { UserApiService } from '../services/user.api.service';
import * as fromUser from './user.actions';
import { User } from '../models/user.model';
import { UserSnackComponent } from '../components/user-snack/user-snack.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class UserEffects {

  @Effect()
  loadAll$ = this._actions$
    .ofType(fromUser.LOAD_ALL)
    .pipe(
      switchMap(() => this._userApiService.loadUsers()),
      map((response: any) => new fromUser.LoadAllSuccess({ users: response })),
      catchError(error => of(new fromUser.LoadAllFailure(error)))
    );

  @Effect({ dispatch: false })
  loadAllFailure$ = this._actions$.ofType(fromUser.LOAD_ALL_FAILURE)
  .pipe(
    map((action: fromUser.LoadAllFailure) => action.payload),
    tap(() =>
      this.snackBar.openFromComponent(UserSnackComponent, {
        duration: 1000,
        data: 'User Load Failure',
        horizontalPosition: 'right',
        verticalPosition: 'bottom'
      })
    )
  );

  @Effect()
  loadOne$ = this._actions$
    .ofType(fromUser.LOAD_ONE)
    .pipe(
      switchMap((action: any) => this._userApiService.loadUser(action.payload)),
      map((response: any) => new fromUser.LoadOneSuccess(response)),
      catchError(error => of(new fromUser.LoadOneFailure(error)))
    );

  @Effect({ dispatch: false })
  loadOneFailure$ = this._actions$.ofType(fromUser.LOAD_ONE_FAILURE)
  .pipe(
    map((action: fromUser.LoadOneFailure) => action.payload),
    tap(() =>
      this.snackBar.openFromComponent(UserSnackComponent, {
        duration: 1000,
        data: 'User Load Failure',
        horizontalPosition: 'right',
        verticalPosition: 'bottom'
      })
    )
  );

  @Effect()
  add$ = this._actions$
    .ofType(fromUser.ADD)
    .pipe(
      map((action: fromUser.Add) => action.payload),
      switchMap(payload => this._userApiService.addUser(payload.user)),
      map((user: User) => new fromUser.AddSuccess({ user })),
      catchError(error => of(new fromUser.AddFailure({ error })))
    );

  @Effect({ dispatch: false })
  addSuccess$ = this._actions$.ofType(fromUser.ADD_SUCCESS)
  .pipe(
    tap(() => {
      this.snackBar.openFromComponent(UserSnackComponent, {
        duration: 1000,
        data: 'User Created',
        horizontalPosition: 'right',
        verticalPosition: 'bottom'
      });
    })
  );

  @Effect({ dispatch: false })
  addFailure$ = this._actions$.ofType(fromUser.ADD_FAILURE)
  .pipe(
    map((action: fromUser.AddFailure) => action.payload),
    tap(() =>
      this.snackBar.openFromComponent(UserSnackComponent, {
        duration: 1000,
        data: 'User Creation Failure',
        horizontalPosition: 'right',
        verticalPosition: 'bottom'
      })
    )
  );

  @Effect()
  update$ = this._actions$
    .ofType(fromUser.UPDATE)
    .pipe(
      map((action: fromUser.Update) => action.payload),
      switchMap(payload => this._userApiService.updateUser(payload.user)),
      map((response: any) => new fromUser.UpdateSuccess({ user: { id: response.id, changes: { ...response } } })),
      catchError(error => of(new fromUser.UpdateFailure(error)))
    );

  @Effect({ dispatch: false })
    updateSuccess$ = this._actions$.ofType(fromUser.UPDATE_SUCCESS)
    .pipe(
      tap(() => {
        this.snackBar.openFromComponent(UserSnackComponent, {
          duration: 1000,
          data: 'User Updated',
          horizontalPosition: 'right',
          verticalPosition: 'bottom'
        });
      })
    );

  @Effect({ dispatch: false })
    updateFailure$ = this._actions$.ofType(fromUser.UPDATE_FAILURE)
    .pipe(
      map((action: fromUser.UpdateFailure) => action.payload),
      tap(() =>
        this.snackBar.openFromComponent(UserSnackComponent, {
          duration: 1000,
          data: 'User Update Failure',
          horizontalPosition: 'right',
          verticalPosition: 'bottom'
        })
      )
    );

  @Effect()
  delete$ = this._actions$
    .ofType(fromUser.DELETE)
    .pipe(
      map((action: fromUser.Delete) => action.payload),
      switchMap(payload => this._userApiService.deleteUser(payload.userId)),
      map((response: any) => new fromUser.DeleteSuccess({ userId: response.id })),
      catchError(error => of(new fromUser.DeleteFailure(error)))
    );

  @Effect({ dispatch: false })
    deleteSuccess$ = this._actions$.ofType(fromUser.DELETE_SUCCESS)
    .pipe(
      tap(() => {
        this.snackBar.openFromComponent(UserSnackComponent, {
          duration: 1000,
          data: 'User Deleted',
          horizontalPosition: 'right',
          verticalPosition: 'bottom'
        });
      })
    );

  @Effect({ dispatch: false })
    deleteFailure$ = this._actions$.ofType(fromUser.DELETE_FAILURE)
    .pipe(
      map((action: fromUser.DeleteFailure) => action.payload),
      tap(() =>
        this.snackBar.openFromComponent(UserSnackComponent, {
          duration: 1000,
          data: 'User Deletion Failure',
          horizontalPosition: 'right',
          verticalPosition: 'bottom'
        })
      )
    );

  @Effect({ dispatch: false })
  saveDescription$ = this._actions$
    .ofType(fromUser.SAVE_DESCRIPTION)
    .pipe(
      map((action: fromUser.SaveDescription) => action.payload),
      tap(payload => localStorage.setItem(`user${payload.userId}Desciption`, payload.text))
    );

  constructor(private _actions$: Actions, private _userApiService: UserApiService, private snackBar: MatSnackBar) { }
}
