import { fromRouter } from '@labdat/common/router-state';
import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { MatSnackBar } from '@angular/material';
import { AuthenticationSnackComponent } from '../../components/authentication-snack/authentication-snack.component';
import { AuthenticationApiService } from '../../services/authentication.api.service';
import * as fromAuthentication from '../actions/authentication-state.actions';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators/map';
import { mapTo } from 'rxjs/operators/mapTo';
import { tap } from 'rxjs/operators/tap';
import { exhaustMap } from 'rxjs/operators/exhaustMap';
import { catchError } from 'rxjs/operators/catchError';
import { empty } from 'rxjs/observable/empty';

@Injectable()
export class AuthenticationEffectsService {
  @Effect()
  login$ = this.actions$.ofType(fromAuthentication.LOGIN)
  .pipe(
    map((action: fromAuthentication.Login) => action.payload),
    exhaustMap(auth =>
      this.authenticationApiService.login(auth)
      .pipe(
        catchError((error: any) => {
          console.log(error);
          this.store.dispatch(new fromAuthentication.LoginFailure('Email or Password Invalid'));

          return empty();
        })
      )
    ),
    tap((payload: any) => {
      localStorage.setItem('tokenExpiresIn', payload.tokenExpiresIn);
    }),
    map(payload => new fromAuthentication.LoginSuccess({ user: payload.user, tokenExpiresIn: payload.tokenExpiresIn }))
  );

  @Effect()
  logout$ = this.actions$.ofType(fromAuthentication.LOGOUT)
  .pipe(
    map((action: fromAuthentication.Logout) => action.payload),
    tap(message => {
      localStorage.removeItem('tokenExpiresIn');
      this.snackBar.openFromComponent(AuthenticationSnackComponent, {
        duration: 1000,
        data: message || 'Logout',
        horizontalPosition: 'right',
        verticalPosition: 'top'
      });
    }),
    mapTo(new fromRouter.Go({ path: ['auth'] }))
  );

  @Effect()
  loginSuccess$ = this.actions$.ofType(fromAuthentication.LOGIN_SUCCESS)
  .pipe(
    tap(() => {
      this.snackBar.openFromComponent(AuthenticationSnackComponent, {
        duration: 1000,
        data: 'Login Success',
        horizontalPosition: 'right',
        verticalPosition: 'top'
      });
    }),
    mapTo(new fromRouter.Go({ path: ['tasks'] }))
  );

  @Effect({ dispatch: false })
  loginFailure$ = this.actions$.ofType(fromAuthentication.LOGIN_FAILURE)
  .pipe(
    map((action: fromAuthentication.LoginFailure) => action.payload),
    tap(message =>
      this.snackBar.openFromComponent(AuthenticationSnackComponent, {
        duration: 1000,
        data: message,
        horizontalPosition: 'right',
        verticalPosition: 'top'
      })
    )
  );

  @Effect()
  register$ = this.actions$.ofType(fromAuthentication.REGISTER)
  .pipe(
    map((action: fromAuthentication.RegisterFailure) => action.payload),
    exhaustMap(auth =>
      this.authenticationApiService
        .register({
          ...auth,
          username: auth.firstName + auth.lastName
        })
        .pipe(
          catchError(error => {
            console.log(error);
            this.store.dispatch(new fromAuthentication.RegisterFailure('Register Error'));

            return empty();
          })
        )
    ),
    tap((payload: any) => {
      localStorage.setItem('tokenExpiresIn', payload.tokenExpiresIn);
    }),
    map(payload => new fromAuthentication.RegisterSuccess({ ...payload }))
  );

  @Effect()
  registerSuccess$ = this.actions$.ofType(fromAuthentication.REGISTER_SUCCESS)
  .pipe(
    tap(() => {
      this.snackBar.openFromComponent(AuthenticationSnackComponent, {
        duration: 1000,
        data: 'Register Success',
        horizontalPosition: 'right',
        verticalPosition: 'top'
      });
    }),
    mapTo(new fromRouter.Go({ path: ['tasks'] }))
  );

  @Effect({ dispatch: false })
  registerFailure$ = this.actions$.ofType(fromAuthentication.REGISTER_FAILURE)
  .pipe(
    map((action: fromAuthentication.RegisterFailure) => action.payload),
    tap(message =>
      this.snackBar.openFromComponent(AuthenticationSnackComponent, {
        duration: 1000,
        data: message,
        horizontalPosition: 'right',
        verticalPosition: 'top'
      })
    )
  );

  @Effect()
  updateUser$ = this.actions$.ofType(fromAuthentication.UPDATE_USER)
  .pipe(
    map((action: fromAuthentication.UpdateUser) => action.payload),
    exhaustMap(payload =>
      this.authenticationApiService
        .updateUser(payload.user)
        .pipe(
          catchError(error => {
            console.log(error);
            this.store.dispatch(new fromAuthentication.UserUpdateFailure('User Update Error'));

            return empty();
          })
        )
    ),
    map(payload => new fromAuthentication.UserUpdateSuccess({ user: payload }))
  );

  @Effect({ dispatch: false })
  UserUpdateSuccess$ = this.actions$.ofType(fromAuthentication.USER_UPDATE_SUCCESS)
  .pipe(
    tap(() => {
      this.snackBar.openFromComponent(AuthenticationSnackComponent, {
        duration: 1000,
        data: 'User Update Success',
        horizontalPosition: 'right',
        verticalPosition: 'top'
      });
    })
  );

  @Effect({ dispatch: false })
  UserUpdateFailure$ = this.actions$.ofType(fromAuthentication.USER_UPDATE_FAILURE)
  .pipe(
    map((action: fromAuthentication.UserUpdateFailure) => action.payload),
    tap(message =>
      this.snackBar.openFromComponent(AuthenticationSnackComponent, {
        duration: 1000,
        data: message,
        horizontalPosition: 'right',
        verticalPosition: 'top'
      })
    )
  );

  @Effect()
  loadUser$ = this.actions$.ofType(fromAuthentication.LOAD_USER)
  .pipe(
    exhaustMap(_payload =>
      this.authenticationApiService
        .loadUser()
        .pipe(
          catchError(error => {
            console.log(error);
            this.store.dispatch(new fromAuthentication.UserLoadFailure('User Load Error'));

            return empty();
          })
        )
    ),
    map(payload => new fromAuthentication.UserLoadSuccess({ user: payload }))
  );

  @Effect({ dispatch: false })
  userLoadFailure$ = this.actions$.ofType(fromAuthentication.USER_LOAD_FAILURE)
  .pipe(
    map((action: fromAuthentication.UserLoadFailure) => action.payload),
    tap(message =>
      this.snackBar.openFromComponent(AuthenticationSnackComponent, {
        duration: 1000,
        data: message,
        horizontalPosition: 'right',
        verticalPosition: 'top'
      })
    )
  );

  @Effect()
  changePassword$ = this.actions$.ofType(fromAuthentication.CHANGE_PASSWORD)
  .pipe(
    map((action: fromAuthentication.ChangePassword) => action.payload),
    exhaustMap(payload =>
      this.authenticationApiService
        .changePassword(payload.email)
        .pipe(
          catchError(error => {
            console.log(error);
            this.store.dispatch(new fromAuthentication.ChangePasswordFailure(error.error.message));

            return empty();
          })
        )
    ),
    map(response => new fromAuthentication.ChangePasswordSuccess(response.message))
  );

  @Effect({ dispatch: false })
  changePassordSuccess$ = this.actions$.ofType(fromAuthentication.CHANGE_PASSWORD_SUCCESS)
  .pipe(
    map((action: fromAuthentication.ChangePasswordSuccess) => action.payload),
    tap(() =>
      this.snackBar.openFromComponent(AuthenticationSnackComponent, {
        duration: 1000,
        data: 'An email has been sent to the provided email with further instructions',
        horizontalPosition: 'right',
        verticalPosition: 'top'
      })
    )
  );

  @Effect({ dispatch: false })
  changePassordFailure$ = this.actions$.ofType(fromAuthentication.CHANGE_PASSWORD_FAILURE)
  .pipe(
    map((action: fromAuthentication.ChangePasswordFailure) => action.payload),
    tap(message =>
      this.snackBar.openFromComponent(AuthenticationSnackComponent, {
        duration: 1000,
        data: message,
        horizontalPosition: 'right',
        verticalPosition: 'top'
      })
    )
  );

  @Effect()
  resetPassword$ = this.actions$.ofType(fromAuthentication.RESET_PASSWORD)
  .pipe(
    map((action: fromAuthentication.ResetPassword) => action.payload),
    exhaustMap(payload =>
      this.authenticationApiService
        .resetPassword(payload.newPassword, payload.token)
        .pipe(
          catchError(error => {
            console.log(error);
            this.store.dispatch(new fromAuthentication.ResetPasswordFailure(error.error.message));

            return empty();
          })
        )
    ),
    map(response => new fromAuthentication.ResetPasswordSuccess(response.message))
  );

  @Effect({ dispatch: false })
  resetPassordSuccess$ = this.actions$.ofType(fromAuthentication.RESET_PASSWORD_SUCCESS)
  .pipe(
    map((action: fromAuthentication.ResetPasswordSuccess) => action.payload),
    tap(() =>
      this.snackBar.openFromComponent(AuthenticationSnackComponent, {
        duration: 1000,
        data: 'Password Reseted',
        horizontalPosition: 'right',
        verticalPosition: 'top'
      })
    ),
    tap(() => this.store.dispatch(new fromRouter.Go({ path: ['auth'] })))
  );

  @Effect({ dispatch: false })
  resetPassordFailure$ = this.actions$.ofType(fromAuthentication.CHANGE_PASSWORD_FAILURE)
  .pipe(
    map((action: fromAuthentication.ResetPasswordFailure) => action.payload),
    tap(message =>
      this.snackBar.openFromComponent(AuthenticationSnackComponent, {
        duration: 1000,
        data: message,
        horizontalPosition: 'right',
        verticalPosition: 'top'
      })
    )
  );

  constructor(
    private actions$: Actions,
    private authenticationApiService: AuthenticationApiService,
    private snackBar: MatSnackBar,
    private store: Store<any>
  ) { }
}
