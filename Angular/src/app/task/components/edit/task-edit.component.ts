import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TaskEditDialogComponent } from './task-edit.dialog.component';
import * as fromTask from '../../+state/task.actions';
import { selectCurrentTask } from '../../+state/task.selectors';
import { TaskState } from '../../+state/task.interfaces';
import { Store } from '@ngrx/store';
import { fromRouter } from 'src/app/common/router-state';
import { Task } from '../../models/task.model';
import { first, delay, map, switchMap } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { cloneDeep } from 'lodash';
import { ObservableMedia } from '@angular/flex-layout';

@Component({
  template: ''
})
export class TaskEditComponent implements OnInit, OnDestroy {

  private subscriptions: Subscription;

  constructor(public dialog: MatDialog, private store: Store<TaskState>, private _media: ObservableMedia) { }

  ngOnInit(): void {
    const dialogSubscription = this.store.select(selectCurrentTask)
    .pipe(
      first(),
      delay(0),
      map(task => this.dialog.open(TaskEditDialogComponent, {
        panelClass: this._media.isActive('xs') ? 'full-screen-dialog' : '',
        width: '700px',
        data: {
          title: 'Edit Task',
          task: cloneDeep(task)
        }
      })),
      switchMap(dialogRef => dialogRef.afterClosed())
    )
    .subscribe((task: Task) => {
      if (task) {
        this.store.dispatch(new fromTask.Update({ task: { id: task.id, changes: task } }));
      }
      this.store.dispatch(new fromRouter.Back());
    });
    this.subscriptions = dialogSubscription;
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
