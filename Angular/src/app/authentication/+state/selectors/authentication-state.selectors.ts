import { createFeatureSelector, createSelector } from '@ngrx/store';
import { StatusState } from '../states/status.state';
import { LoginPageState } from '../states/login-page.state';
import { AuthenticationState } from '../states/authentication-state.state';

const selectAuthenticationState = createFeatureSelector<AuthenticationState>('authentication');
const selectAuthenticationStatusState = createSelector(
  selectAuthenticationState,
  (state: AuthenticationState) => state.status
);
const selectLoginPageState = createSelector(selectAuthenticationState, (state: AuthenticationState) => state.loginPage);

export const getLoggedIn = createSelector(selectAuthenticationStatusState, (state: StatusState) => !!state.user);
export const getIsUserLoading = createSelector(selectAuthenticationStatusState, (state: StatusState) => state.loading);
export const getUser = createSelector(selectAuthenticationStatusState, (state: StatusState) => state.user);
export const getLoginPageError = createSelector(selectLoginPageState, (state: LoginPageState) => state.error);
export const getLoginPagePending = createSelector(selectLoginPageState, (state: LoginPageState) => state.pending);
