import { ActionReducer, MetaReducer } from '@ngrx/store';
import { ApplicationState } from './app.state';
import { environment } from 'src/environments/environment';
import { storeFreeze } from 'ngrx-store-freeze';

export function logger(reducer: ActionReducer<ApplicationState>): ActionReducer<ApplicationState> {
  return (state: ApplicationState, action: any): ApplicationState => {
    console.log('state', state);
    console.log('action', action);

    return reducer(state, action);
  };
}

export const metaReducers: Array<MetaReducer<ApplicationState>> = !environment.production ? [logger, storeFreeze] : [];
