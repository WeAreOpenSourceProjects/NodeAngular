import { createFeatureSelector, createSelector } from '@ngrx/store';
import { forEach } from 'lodash';

import { ConnectFormState } from '../states/connect-form-state.state';
import { connectFormConfiguration } from '@waos/common/connect-form/src/components/directives/connect-form.configuration';

const getConnectFormState = createFeatureSelector<ConnectFormState>('connectForm');

// We build the selector of every forms
const tempSelectors = {};
forEach(connectFormConfiguration.forms, form => {
  Object.assign(tempSelectors, {
    [`${form}Selector`]: createSelector(getConnectFormState, (state: ConnectFormState) => state[form])
  });
});

export const ConnectFormStateSelectors = tempSelectors;
