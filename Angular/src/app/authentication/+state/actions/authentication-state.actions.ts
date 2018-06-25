import { Action } from '@ngrx/store';
import { User } from '../../models/user.model';
import { Credentials } from '../../models/authenticate.model';

export const LOCAL_LOGIN = '[Auth] Local Login';
export const LOCAL_LOGIN_SUCCESS = '[Auth] Local Login Success';
export const LOCAL_LOGIN_FAILURE = '[Auth] Local Login Failure';
export const GOOGLE_SIGN_IN = '[Auth] Google Sign In';
export const GOOGLE_LOGIN = '[Auth] Google Login';
export const GOOGLE_LOGIN_SUCCESS = '[Auth] Google Login Success';
export const GOOGLE_LOGIN_FAILURE = '[Auth] Google Login Failure';
export const MICROSOFT_SIGN_IN = '[Auth] Microsoft Sign In';
export const MICROSOFT_LOGIN = '[Auth] Microsoft Login';
export const MICROSOFT_LOGIN_SUCCESS = '[Auth] Microsoft Login Success';
export const MICROSOFT_LOGIN_FAILURE = '[Auth] Microsoft Login Failure';
export const REGISTER = '[Auth] Register';
export const REGISTER_SUCCESS = '[Auth] Register Success';
export const REGISTER_FAILURE = '[Auth] Register Failure';
export const LOCAL_LOGOUT = '[Auth] Local Logout';
export const REMOTE_LOGOUT = '[Auth] Remote Logout';
export const LOAD_USER = '[Auth] Load User';
export const USER_LOAD_SUCCESS = '[Auth] User Load Success';
export const USER_LOAD_FAILURE = '[Auth] User Load Failure';
export const UPDATE_USER = '[Auth] Update User';
export const USER_UPDATE_SUCCESS = '[Auth] User Update Success';
export const USER_UPDATE_FAILURE = '[Auth] User Update Failure';
export const CHANGE_PASSWORD = '[Auth] Change Password';
export const CHANGE_PASSWORD_SUCCESS = '[Auth] Change Password Success';
export const CHANGE_PASSWORD_FAILURE = '[Auth] Change Password Failure';
export const RESET_PASSWORD = '[Auth] Reset Password';
export const RESET_PASSWORD_SUCCESS = '[Auth] Reset Password Success';
export const RESET_PASSWORD_FAILURE = '[Auth] Reset Password Failure';

export type Actions =
  | LocalLogin
  | LocalLoginSuccess
  | LocalLoginFailure
  | GoogleSignIn
  | GoogleLogin
  | GoogleLoginSuccess
  | GoogleLoginFailure
  | MicrosoftSignIn
  | MicrosoftLogin
  | MicrosoftLoginSuccess
  | MicrosoftLoginFailure
  | Register
  | RegisterSuccess
  | RegisterFailure
  | LocalLogout
  | RemoteLogout
  | LoadUser
  | UserLoadSuccess
  | UserLoadFailure
  | ChangePassword
  | ChangePasswordSuccess
  | ChangePasswordFailure
  | ResetPassword
  | ResetPasswordSuccess
  | ResetPasswordFailure
  | UpdateUser
  | UserUpdateSuccess
  | UserUpdateFailure;

export class LocalLogin implements Action {
  readonly type = LOCAL_LOGIN;
  constructor(public payload: Credentials) {}
}

// tslint:disable-next-line:max-classes-per-file
export class LocalLoginSuccess implements Action {
  readonly type = LOCAL_LOGIN_SUCCESS;
  constructor(public payload: { user: User; tokenExpiresIn: number }) {}
}

// tslint:disable-next-line:max-classes-per-file
export class LocalLoginFailure implements Action {
  readonly type = LOCAL_LOGIN_FAILURE;
  constructor(public payload?: any) {}
}

// tslint:disable-next-line:max-classes-per-file
export class GoogleSignIn implements Action {
  readonly type = GOOGLE_SIGN_IN;
}

// tslint:disable-next-line:max-classes-per-file
export class GoogleLogin implements Action {
  readonly type = GOOGLE_LOGIN;
  constructor(public payload: any) {}

}

// tslint:disable-next-line:max-classes-per-file
export class GoogleLoginSuccess implements Action {
  readonly type = GOOGLE_LOGIN_SUCCESS;
  constructor(public payload: { user: User; tokenExpiresIn: number }) {}
}

// tslint:disable-next-line:max-classes-per-file
export class GoogleLoginFailure implements Action {
  readonly type = GOOGLE_LOGIN_FAILURE;
  constructor(public payload?: any) {}
}

// tslint:disable-next-line:max-classes-per-file
export class MicrosoftSignIn implements Action {
  readonly type = MICROSOFT_SIGN_IN;
}

// tslint:disable-next-line:max-classes-per-file
export class MicrosoftLogin implements Action {
  readonly type = MICROSOFT_LOGIN;
  constructor(public payload: any) {}

}

// tslint:disable-next-line:max-classes-per-file
export class MicrosoftLoginSuccess implements Action {
  readonly type = MICROSOFT_LOGIN_SUCCESS;
  constructor(public payload: { user: User; tokenExpiresIn: number }) {}
}

// tslint:disable-next-line:max-classes-per-file
export class MicrosoftLoginFailure implements Action {
  readonly type = MICROSOFT_LOGIN_FAILURE;
  constructor(public payload?: any) {}
}

// tslint:disable-next-line:max-classes-per-file
export class Register implements Action {
  readonly type = REGISTER;
  constructor(public payload: Credentials) {}
}

// tslint:disable-next-line:max-classes-per-file
export class RegisterSuccess implements Action {
  readonly type = REGISTER_SUCCESS;
  constructor(public payload: { user: User; tokenExpiresIn: number }) {}
}

// tslint:disable-next-line:max-classes-per-file
export class RegisterFailure implements Action {
  readonly type = REGISTER_FAILURE;
  constructor(public payload?: any) {}
}

// tslint:disable-next-line:max-classes-per-file
export class LocalLogout implements Action {
  readonly type = LOCAL_LOGOUT;
  constructor(public payload?: string) { }
}

// tslint:disable-next-line:max-classes-per-file
export class RemoteLogout implements Action {
  readonly type = REMOTE_LOGOUT;
  constructor(public payload?: string) { }
}

// tslint:disable-next-line:max-classes-per-file
export class LoadUser implements Action {
  readonly type = LOAD_USER;
}

// tslint:disable-next-line:max-classes-per-file
export class UserLoadSuccess implements Action {
  readonly type = USER_LOAD_SUCCESS;
  constructor(public payload: { user: User }) { }
}

// tslint:disable-next-line:max-classes-per-file
export class UserLoadFailure implements Action {
  readonly type = USER_LOAD_FAILURE;
  constructor(public payload: any) { }
}

// tslint:disable-next-line:max-classes-per-file
export class UpdateUser implements Action {
  readonly type = UPDATE_USER;
  constructor(public payload: { user: User }) {}
}

// tslint:disable-next-line:max-classes-per-file
export class UserUpdateSuccess implements Action {
  readonly type = USER_UPDATE_SUCCESS;
  constructor(public payload: { user: User }) {}
}

// tslint:disable-next-line:max-classes-per-file
export class UserUpdateFailure implements Action {
  readonly type = USER_UPDATE_FAILURE;
  constructor(public payload?: any) {}
}

// tslint:disable-next-line:max-classes-per-file
export class ChangePassword implements Action {
  readonly type = CHANGE_PASSWORD;
  constructor(public payload?: { email: string }) {}
}

// tslint:disable-next-line:max-classes-per-file
export class ChangePasswordSuccess implements Action {
  readonly type = CHANGE_PASSWORD_SUCCESS;
  constructor(public payload?: any) {}
}

// tslint:disable-next-line:max-classes-per-file
export class ChangePasswordFailure implements Action {
  readonly type = CHANGE_PASSWORD_FAILURE;
  constructor(public payload?: any) {}
}

// tslint:disable-next-line:max-classes-per-file
export class ResetPassword implements Action {
  readonly type = RESET_PASSWORD;
  constructor(public payload: { newPassword: string, token: string }) {}
}

// tslint:disable-next-line:max-classes-per-file
export class ResetPasswordSuccess implements Action {
  readonly type = RESET_PASSWORD_SUCCESS;
  constructor(public payload?: any) {}
}

// tslint:disable-next-line:max-classes-per-file
export class ResetPasswordFailure implements Action {
  readonly type = RESET_PASSWORD_FAILURE;
  constructor(public payload?: any) {}
}
