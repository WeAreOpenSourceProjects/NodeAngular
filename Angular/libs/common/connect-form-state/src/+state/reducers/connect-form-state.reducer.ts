import { connectFormConfiguration } from '@waos/common/connect-form/src/components/directives/connect-form.configuration';
import { ConnectFormState } from '../states/connect-form-state.state';
import * as fromConnectForm from '../actions/connect-form-state.actions';
import { forEach } from 'lodash';

const initialConnectFormState: ConnectFormState = {};

forEach(connectFormConfiguration.forms, form => {
  Object.assign(initialConnectFormState, { [form]: {} });
});

export function connectFormReducer(
  state: ConnectFormState = initialConnectFormState,
  action: fromConnectForm.Actions
): ConnectFormState {
  switch (action.type) {
    case fromConnectForm.FORM_SUBMIT: {
      return {
        ...state
      };
    }
    case fromConnectForm.FORM_SUBMIT_SUCCESS: {
      return {
        ...state
      };
    }
    case fromConnectForm.FORM_SUBMIT_ERROR: {
      return {
        ...state
      };
    }
    case fromConnectForm.UPDATE_FORM: {
      return { ...state, [action.payload.path]: action.payload.value };
    }
    default: {
      return state;
    }
  }
}
