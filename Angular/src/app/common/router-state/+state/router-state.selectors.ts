import { createFeatureSelector, createSelector } from '@ngrx/store';
import { RouterReducerState } from '@ngrx/router-store';
import { RouterStateUrl } from './router-state.state';

const getRouterState = createFeatureSelector<RouterReducerState<RouterStateUrl>>('router');
export const selectCurrentUrl = createSelector(
  getRouterState,
  (state: RouterReducerState<RouterStateUrl>) => state.state && state.state.url
);
