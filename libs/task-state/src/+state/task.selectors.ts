import { createSelector, createFeatureSelector } from '@ngrx/store';
import { TaskState, taskAdapter } from './task.interfaces';
import { isEmpty } from 'lodash';
import { Task } from '@labdat/data-models';

const selectTaskState = createFeatureSelector<TaskState>('task');

export const {
  selectIds: selectTaskIds,
  selectEntities: selectTaskEntities,
  selectAll: selectAllTasks,
  selectTotal: selectTaskTotal
} = taskAdapter.getSelectors(selectTaskState);

import { selectCurrentUrl } from '@labdat/router-state';

export const selectCurrentTask = createSelector(
  selectTaskEntities,
  selectCurrentUrl,
  (taskEntities, currentUrl) => {
    const taskId = currentUrl.split('/')[2];
    return (!isEmpty(taskEntities[taskId]))
    ? taskEntities[taskId]
    : { comments: [] } as Task;
  }
);

export const selectTaskLoading = createSelector(selectTaskState, (state: TaskState) => state.loading);
export const selectTaskLoaded = createSelector(selectTaskState, (state: TaskState) => state.loaded);

