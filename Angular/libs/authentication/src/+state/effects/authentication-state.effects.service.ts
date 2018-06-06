import { fromRouter } from '@waos/common/router-state';
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
import { GoogleSignInService } from '../../services/google-sign-in.service';
import { MsalService } from '../../services/msal.service';
import { getUser } from '../../+state/selectors/authentication-state.selectors';
import { withLatestFrom } from 'rxjs/operators/withLatestFrom';
import { User } from '../../models/user.model';
import { AuthenticationState } from '../../+state/states/authentication-state.state';
import { switchMap } from 'rxjs/operators/switchMap';
import { filter } from 'rxjs/operators/filter';
import { of } from 'rxjs/observable/of';

@Injectable()
export class AuthenticationEffectsService {

  private _currentUser$ = this._store.select(getUser);

  @Effect()
  localLogin$ = this._actions$.ofType(fromAuthentication.LOCAL_LOGIN)
  .pipe(
    map((action: fromAuthentication.LocalLogin) => action.payload),
    exhaustMap(auth =>
      this._authenticationApiService.login(auth)
      .pipe(
        catchError((error: any) => {
          console.error(error);
          this._store.dispatch(new fromAuthentication.LocalLoginFailure('Email or Password Invalid'));

          return empty();
        })
      )
    ),
    tap((payload: any) => {
      localStorage.setItem('tokenExpiresIn', payload.tokenExpiresIn);
    }),
    map(payload => new fromAuthentication.LocalLoginSuccess({ user: payload.user, tokenExpiresIn: payload.tokenExpiresIn }))
  );

  @Effect()
  localLoginSuccess$ = this._actions$.ofType(fromAuthentication.LOCAL_LOGIN_SUCCESS)
  .pipe(
    tap(() => {
      this._snackBar.openFromComponent(AuthenticationSnackComponent, {
        duration: 1000,
        data: 'Login Success',
        horizontalPosition: 'right',
        verticalPosition: 'bottom'
      });
    }),
    mapTo(new fromRouter.Go({ path: ['tasks'] }))
  );

  @Effect({ dispatch: false })
  localLoginFailure$ = this._actions$.ofType(fromAuthentication.LOCAL_LOGIN_FAILURE)
  .pipe(
    map((action: fromAuthentication.LocalLoginFailure) => action.payload),
    tap(message =>
      this._snackBar.openFromComponent(AuthenticationSnackComponent, {
        duration: 1000,
        data: message,
        horizontalPosition: 'right',
        verticalPosition: 'bottom'
      })
    )
  );

  @Effect()
  remoteLogout$ = this._actions$.ofType(fromAuthentication.REMOTE_LOGOUT)
  .pipe(
    withLatestFrom(
      this._currentUser$.pipe(filter(user => !! user)),
      (_: any, user: User) => user.provider),
    switchMap((provider: string) => {
      console.log(provider);
      switch (provider) {
        case 'google':
//          return this._googleSignInService.signOut();
        case 'microsoft':
//          return this._msalService.signOut();
        default:
          return of(empty);
      }
    }),
    map(() => new fromAuthentication.LocalLogout())
  );

  @Effect()
  localLogout$ = this._actions$.ofType(fromAuthentication.LOCAL_LOGOUT)
  .pipe(
    tap(() => {
      localStorage.removeItem('tokenExpiresIn');
      (document as any).cookie = 'TOKEN=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
      this._snackBar.openFromComponent(AuthenticationSnackComponent, {
        duration: 1000,
        data: 'Logout',
        horizontalPosition: 'right',
        verticalPosition: 'bottom'
      });
    }),
    mapTo(new fromRouter.Go({ path: ['auth'] }))
  );

  @Effect()
  googleSignin$ = this._actions$.ofType(fromAuthentication.GOOGLE_SIGN_IN)
  .pipe(
    exhaustMap(() =>
      this._googleSignInService.signIn()
      .pipe(
        catchError((error: any) => {
          console.error(error);

          return empty();
        })
      )
    ),
    map(idToken => new fromAuthentication.GoogleLogin(idToken))
  );

  @Effect()
  googleLogin$ = this._actions$.ofType(fromAuthentication.GOOGLE_LOGIN)
  .pipe(
    exhaustMap((action: any) =>
      this._authenticationApiService.addUser({ idToken: action.payload, provider: 'google' })
      .pipe(
        catchError((error: any) => {
          console.error(error);
          this._store.dispatch(new fromAuthentication.GoogleLoginFailure('Email or Password Invalid'));

          return empty();
        }),
        tap((payload: any) => {
          localStorage.setItem('tokenExpiresIn', payload.tokenExpiresIn);
        })
      )
    ),
    map(payload => new fromAuthentication.GoogleLoginSuccess(payload))
  );

  @Effect()
  googleLoginSuccess$ = this._actions$.ofType(fromAuthentication.GOOGLE_LOGIN_SUCCESS)
  .pipe(
    tap(() => {
      this._snackBar.openFromComponent(AuthenticationSnackComponent, {
        duration: 1000,
        data: 'Login Success',
        horizontalPosition: 'right',
        verticalPosition: 'bottom'
      });
    }),
    mapTo(new fromRouter.Go({ path: ['tasks'] }))
  );

  @Effect({ dispatch: false })
  googleLoginFailure$ = this._actions$.ofType(fromAuthentication.GOOGLE_LOGIN_FAILURE)
  .pipe(
    map((action: fromAuthentication.GoogleLoginFailure) => action.payload),
    tap(message =>
      this._snackBar.openFromComponent(AuthenticationSnackComponent, {
        duration: 1000,
        data: message,
        horizontalPosition: 'right',
        verticalPosition: 'bottom'
      })
    )
  );

  @Effect()
  microsoftSignin$ = this._actions$.ofType(fromAuthentication.MICROSOFT_SIGN_IN)
  .pipe(
    exhaustMap(() =>
      this._msalService.signIn()
      .pipe(
        catchError((error: any) => {
          console.error(error);

          return empty();
        })
      )
    ),
    map(idToken => new fromAuthentication.MicrosoftLogin(idToken))
  );

  @Effect()
  microsoftLogin$ = this._actions$.ofType(fromAuthentication.MICROSOFT_LOGIN)
  .pipe(
    exhaustMap((action: any) =>
      this._authenticationApiService.addUser({ idToken: action.payload, provider: 'microsoft' })
      .pipe(
        catchError((error: any) => {
          console.error(error);
          this._store.dispatch(new fromAuthentication.MicrosoftLoginFailure('Email or Password Invalid'));

          return empty();
        }),
        tap((payload: any) => {
          localStorage.setItem('tokenExpiresIn', payload.tokenExpiresIn);
        })
      )
    ),
    map(payload => new fromAuthentication.MicrosoftLoginSuccess({ user: payload.user, tokenExpiresIn: payload.tokenExpiresIn }))
  );

  @Effect()
  microsoftLoginSuccess$ = this._actions$.ofType(fromAuthentication.MICROSOFT_LOGIN_SUCCESS)
  .pipe(
    tap(() => {
      this._snackBar.openFromComponent(AuthenticationSnackComponent, {
        duration: 1000,
        data: 'Login Success',
        horizontalPosition: 'right',
        verticalPosition: 'bottom'
      });
    }),
    mapTo(new fromRouter.Go({ path: ['tasks'] }))
  );

  @Effect({ dispatch: false })
  microsoftLoginFailure$ = this._actions$.ofType(fromAuthentication.MICROSOFT_LOGIN_FAILURE)
  .pipe(
    map((action: fromAuthentication.MicrosoftLoginFailure) => action.payload),
    tap(message =>
      this._snackBar.openFromComponent(AuthenticationSnackComponent, {
        duration: 1000,
        data: message,
        horizontalPosition: 'right',
        verticalPosition: 'bottom'
      })
    )
  );

  @Effect()
  register$ = this._actions$.ofType(fromAuthentication.REGISTER)
  .pipe(
    map((action: fromAuthentication.RegisterFailure) => action.payload),
    exhaustMap(auth =>
      this._authenticationApiService
        .register({
          ...auth,
          username: auth.firstName + auth.lastName
        })
        .pipe(
          catchError((error: any) => {
            console.error(error);
            this._store.dispatch(new fromAuthentication.RegisterFailure('Register Error'));

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
  registerSuccess$ = this._actions$.ofType(fromAuthentication.REGISTER_SUCCESS)
  .pipe(
    tap(() => {
      this._snackBar.openFromComponent(AuthenticationSnackComponent, {
        duration: 1000,
        data: 'Register Success',
        horizontalPosition: 'right',
        verticalPosition: 'bottom'
      });
    }),
    mapTo(new fromRouter.Go({ path: ['tasks'] }))
  );

  @Effect({ dispatch: false })
  registerFailure$ = this._actions$.ofType(fromAuthentication.REGISTER_FAILURE)
  .pipe(
    map((action: fromAuthentication.RegisterFailure) => action.payload),
    tap(message =>
      this._snackBar.openFromComponent(AuthenticationSnackComponent, {
        duration: 1000,
        data: message,
        horizontalPosition: 'right',
        verticalPosition: 'bottom'
      })
    )
  );

  @Effect()
  updateUser$ = this._actions$.ofType(fromAuthentication.UPDATE_USER)
  .pipe(
    map((action: fromAuthentication.UpdateUser) => action.payload),
    exhaustMap(payload =>
      this._authenticationApiService
        .updateUser(payload.user)
        .pipe(
          catchError((error: any) => {
            console.error(error);
            this._store.dispatch(new fromAuthentication.UserUpdateFailure('User Update Error'));

            return empty();
          })
        )
    ),
    map(payload => new fromAuthentication.UserUpdateSuccess({ user: payload }))
  );

  @Effect({ dispatch: false })
  UserUpdateSuccess$ = this._actions$.ofType(fromAuthentication.USER_UPDATE_SUCCESS)
  .pipe(
    tap(() => {
      this._snackBar.openFromComponent(AuthenticationSnackComponent, {
        duration: 1000,
        data: 'User Update Success',
        horizontalPosition: 'right',
        verticalPosition: 'bottom'
      });
    })
  );

  @Effect({ dispatch: false })
  userUpdateFailure$ = this._actions$.ofType(fromAuthentication.USER_UPDATE_FAILURE)
  .pipe(
    map((action: fromAuthentication.UserUpdateFailure) => action.payload),
    tap(message =>
      this._snackBar.openFromComponent(AuthenticationSnackComponent, {
        duration: 1000,
        data: message,
        horizontalPosition: 'right',
        verticalPosition: 'bottom'
      })
    )
  );

  @Effect()
  loadUser$ = this._actions$.ofType(fromAuthentication.LOAD_USER)
  .pipe(
    map((action: any) => action.payload),
    exhaustMap(() => {
      return this._authenticationApiService
      .loadUser()
      .pipe(
        catchError((error: any) => {
          console.error(error);
          this._store.dispatch(new fromAuthentication.UserLoadFailure('User Load Error'));

          return empty();
        })
      );
    }),
    map(payload => new fromAuthentication.UserLoadSuccess({ user: payload }))
  );

  @Effect({ dispatch: false })
  userLoadFailure$ = this._actions$.ofType(fromAuthentication.USER_LOAD_FAILURE)
  .pipe(
    map((action: fromAuthentication.UserLoadFailure) => action.payload),
    tap(message =>
      this._snackBar.openFromComponent(AuthenticationSnackComponent, {
        duration: 1000,
        data: message,
        horizontalPosition: 'right',
        verticalPosition: 'bottom'
      })
    )
  );

  @Effect()
  changePassword$ = this._actions$.ofType(fromAuthentication.CHANGE_PASSWORD)
  .pipe(
    map((action: fromAuthentication.ChangePassword) => action.payload),
    exhaustMap(payload =>
      this._authenticationApiService
        .changePassword(payload.email)
        .pipe(
          catchError((error: any) => {
            console.error(error);
            this._store.dispatch(new fromAuthentication.ChangePasswordFailure(error.error.message));

            return empty();
          })
        )
    ),
    map((response: any) => new fromAuthentication.ChangePasswordSuccess(response.message))
  );

  @Effect({ dispatch: false })
  changePassordSuccess$ = this._actions$.ofType(fromAuthentication.CHANGE_PASSWORD_SUCCESS)
  .pipe(
    map((action: fromAuthentication.ChangePasswordSuccess) => action.payload),
    tap(() =>
      this._snackBar.openFromComponent(AuthenticationSnackComponent, {
        duration: 1000,
        data: 'An email has been sent to the provided email with further instructions',
        horizontalPosition: 'right',
        verticalPosition: 'bottom'
      })
    )
  );

  @Effect({ dispatch: false })
  changePassordFailure$ = this._actions$.ofType(fromAuthentication.CHANGE_PASSWORD_FAILURE)
  .pipe(
    map((action: fromAuthentication.ChangePasswordFailure) => action.payload),
    tap(message =>
      this._snackBar.openFromComponent(AuthenticationSnackComponent, {
        duration: 1000,
        data: message,
        horizontalPosition: 'right',
        verticalPosition: 'bottom'
      })
    )
  );

  @Effect()
  resetPassword$ = this._actions$.ofType(fromAuthentication.RESET_PASSWORD)
  .pipe(
    map((action: fromAuthentication.ResetPassword) => action.payload),
    exhaustMap(payload =>
      this._authenticationApiService
        .resetPassword(payload.newPassword, payload.token)
        .pipe(
          catchError((error: any) => {
            console.error(error);
            this._store.dispatch(new fromAuthentication.ResetPasswordFailure(error.error.message));

            return empty();
          })
        )
    ),
    map((response: any) => new fromAuthentication.ResetPasswordSuccess(response.message))
  );

  @Effect({ dispatch: false })
  resetPassordSuccess$ = this._actions$.ofType(fromAuthentication.RESET_PASSWORD_SUCCESS)
  .pipe(
    map((action: fromAuthentication.ResetPasswordSuccess) => action.payload),
    tap(() =>
      this._snackBar.openFromComponent(AuthenticationSnackComponent, {
        duration: 1000,
        data: 'Password Reseted',
        horizontalPosition: 'right',
        verticalPosition: 'bottom'
      })
    ),
    tap(() => this._store.dispatch(new fromRouter.Go({ path: ['auth'] })))
  );

  @Effect({ dispatch: false })
  resetPassordFailure$ = this._actions$.ofType(fromAuthentication.CHANGE_PASSWORD_FAILURE)
  .pipe(
    map((action: fromAuthentication.ResetPasswordFailure) => action.payload),
    tap(message =>
      this._snackBar.openFromComponent(AuthenticationSnackComponent, {
        duration: 1000,
        data: message,
        horizontalPosition: 'right',
        verticalPosition: 'bottom'
      })
    )
  );

  constructor(
    private _actions$: Actions,
    private _authenticationApiService: AuthenticationApiService,
    private _googleSignInService: GoogleSignInService,
    private _msalService: MsalService,
    private _snackBar: MatSnackBar,
    private _store: Store<AuthenticationState>
  ) { }
}
