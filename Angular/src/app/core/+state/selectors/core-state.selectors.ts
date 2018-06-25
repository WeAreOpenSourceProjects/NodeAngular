import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CoreState } from '../states/core-state.state';

const getCoreState = createFeatureSelector<CoreState>('core');
export const getShowSidenav = createSelector(getCoreState, (state: CoreState) => state.showSidenav);
export const getMenuItems = createSelector(getCoreState, (state: CoreState) => state.menuItems);
export const getTitle = createSelector(getCoreState, (state: CoreState) => state.title);
export const getLogo = createSelector(getCoreState, (state: CoreState) => state.logo);
