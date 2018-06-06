import { Injectable } from '@angular/core';
import * as fromTask from './task.actions';
import { TaskState } from './task.interfaces';
import { Store } from '@ngrx/store';
import { getLoggedIn } from '@waos/authentication';
import { first } from 'rxjs/operators/first';
import { filter } from 'rxjs/operators/filter';

@Injectable()
export class TaskInitializationService {
  constructor(private store: Store<TaskState>) {}

  public loadTasks(): void {
    this.store
      .select(getLoggedIn)
      .pipe(first(), filter(isLoggedIn => isLoggedIn))
      .subscribe(() => this.store.dispatch(new fromTask.Load()));
  }
}
