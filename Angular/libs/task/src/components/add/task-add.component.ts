import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TaskEditDialogComponent } from '../edit/task-edit.dialog.component';
import * as fromTask from '../../+state/task.actions';
import { TaskState } from '../../+state/task.interfaces';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs/Subscription';
import { Task } from '../../models/task.model';
import { fromRouter } from '@labdat/common/router-state';
import { ObservableMedia } from '@angular/flex-layout';

@Component({
  template: ''
})
export class TaskAddComponent implements OnInit, OnDestroy {

  private subscriptions: Subscription;

  constructor(public dialog: MatDialog, private store: Store<TaskState>, private _media: ObservableMedia) { }

  ngOnInit(): void {
    setTimeout(() => {
      const dialogRef = this.dialog.open(TaskEditDialogComponent, {
        panelClass: this._media.isActive('xs') ? 'full-screen-dialog' : '',
        width: '700px',
        data: { title: 'Add Task' }
      });

      const closeDialogSubscription = dialogRef
      .afterClosed()
      .subscribe((taskModel: Task) => {
        if (taskModel) {
          this.store.dispatch(new fromTask.Add({ task: taskModel }));
        }
        this.store.dispatch(new fromRouter.Back());
      });
      this.subscriptions = closeDialogSubscription;
    });
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
