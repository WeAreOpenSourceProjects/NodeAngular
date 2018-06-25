export { coreConfiguration } from './core.configuration';
export { CoreViewModule } from './core-view.module';
export { CoreRoutingModule } from './core-routing.module';
export { CoreStateModule } from './core-state.module';

import * as fromCore from './+state/actions/core-state.actions';
export { fromCore };
export {
  getShowSidenav,
  getMenuItems,
  getTitle,
  getLogo
} from './+state/selectors/core-state.selectors';
export { CoreState } from './+state/states/core-state.state';
export { MenuItem } from './models/menu-item.model';
