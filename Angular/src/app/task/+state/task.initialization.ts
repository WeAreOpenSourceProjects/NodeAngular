import { Injectable } from '@angular/core';
import * as fromTask from './task.actions';
import { TaskState } from './task.interfaces';
import { Store } from '@ngrx/store';
import { getLoggedIn } from 'src/app/authentication';
import { first, filter } from 'rxjs/operators';

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
