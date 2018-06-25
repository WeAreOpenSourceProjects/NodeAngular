import { createFeatureSelector, createSelector } from '@ngrx/store';
import { taskAdapter, TaskState } from './task.interfaces';
import { isEmpty } from 'lodash';
import { Task } from '../models/task.model';
import { selectCurrentUrl } from 'src/app/common/router-state';

const selectTaskState = createFeatureSelector<TaskState>('task');

export const {
  selectIds: selectTaskIds,
  selectEntities: selectTaskEntities,
  selectAll: selectAllTasks,
  selectTotal: selectTaskTotal
} = taskAdapter.getSelectors(selectTaskState);

export const selectCurrentTask = createSelector(selectTaskEntities, selectCurrentUrl, (taskEntities, currentUrl) => {
  const taskId = currentUrl.split('/')[2];

  return !isEmpty(taskEntities[taskId]) ? taskEntities[taskId] : ({ comments: [] } as Task);
});

export const selectTaskLoading = createSelector(selectTaskState, (state: TaskState) => state.loading);
export const selectTaskLoaded = createSelector(selectTaskState, (state: TaskState) => state.loaded);
