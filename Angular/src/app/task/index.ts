export { taskConfiguration } from './task.configuration';
export { TaskRoutingModule } from './task-routing.module';
export { TaskStateModule } from './task-state.module';
export { TaskGuardService } from './services/task.guard.service';
export {
  selectTaskIds,
  selectTaskEntities,
  selectAllTasks,
  selectTaskTotal,
  selectCurrentTask,
  selectTaskLoading,
  selectTaskLoaded
} from './+state/task.selectors';
export { TaskState } from './+state/task.interfaces';
import * as fromTask from './+state/task.actions';
export { fromTask };
