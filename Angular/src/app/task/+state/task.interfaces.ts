import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Task } from '../models/task.model';

export interface TaskState extends EntityState<Task> {
  loading: boolean;
  loaded: boolean;
}
export const taskAdapter: EntityAdapter<Task> = createEntityAdapter<Task>();
