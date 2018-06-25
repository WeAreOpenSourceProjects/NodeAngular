import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as CoreActions from '../+state/actions/core-state.actions';
import { CoreState } from '../+state/states/core-state.state';

@Injectable()
export class CoreInitializationService {
  constructor(private store: Store<CoreState>) {}

  public addMenuItems(configuration): void {
    this.store.dispatch(new CoreActions.AddMenuItems(configuration));
  }

  public setLogo(configuration): void {
    this.store.dispatch(new CoreActions.SetLogo(configuration));
  }

  public setTitle(configuration): void {
    this.store.dispatch(new CoreActions.SetTitle(configuration));  }

}
