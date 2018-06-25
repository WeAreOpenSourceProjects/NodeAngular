import { createFeatureSelector, createSelector } from '@ngrx/store';
import { userAdapter, UserState } from './user.interfaces';
import { isEmpty } from 'lodash';
import { selectCurrentUrl } from 'src/app/common/router-state';

const selectUserState = createFeatureSelector<UserState>('user');

export const {
  selectIds: selectUserIds,
  selectEntities: selectUserEntities,
  selectAll: selectAllUsers,
  selectTotal: selectUserTotal
} = userAdapter.getSelectors(selectUserState);

export const selectSelectedUserId = createSelector(selectCurrentUrl, (currentUrl: string) => {
  // tslint:disable-next-line:newline-per-chained-call
  const userId = currentUrl.split('/')[2];

  return userId || undefined;
});

export const selectSelectedUser = createSelector(selectUserEntities, selectCurrentUrl, (userEntities, currentUrl) => {
  // tslint:disable-next-line:newline-per-chained-call
  const userId = currentUrl.split('/')[2];

  return !isEmpty(userEntities[userId]) ? userEntities[userId] : undefined;
});

export const selectUserLoading = createSelector(selectUserState, (state: UserState) => state.loading);
export const selectUserLoaded = createSelector(selectUserState, (state: UserState) => state.loaded);
