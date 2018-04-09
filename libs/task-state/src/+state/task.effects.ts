import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators/map';
import { catchError } from 'rxjs/operators/catchError';
import { mapTo } from 'rxjs/operators/mapTo';
import { tap } from 'rxjs/operators/tap';
import { Actions, Effect, toPayload } from '@ngrx/effects';
import { switchMap } from 'rxjs/operators/switchMap';
import { of } from 'rxjs/observable/of';
import { TaskApiService } from '../services/task.api.service';
import * as fromTasks from './task.actions';
import { fromAuthentication } from '@labdat/authentication-state';
import { Task } from '@labdat/data-models';
import { TaskSnackComponent } from '../components/task-snack/task-snack.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class TaskEffects {
  @Effect()
  loginSuccess$ = this._actions$.ofType(fromAuthentication.LOGIN_SUCCESS)
  .pipe(mapTo(new fromTasks.Load()));

  @Effect()
  registerSuccess$ = this._actions$.ofType(fromAuthentication.REGISTER_SUCCESS)
  .pipe(mapTo(new fromTasks.Load()));

  @Effect()
  load$ = this._actions$
    .ofType(fromTasks.LOAD)
    .pipe(
      switchMap(() => this._taskApiService.loadTasks()),
      map((response: any) => new fromTasks.LoadSuccess({ tasks: response })),
      catchError(error => of(new fromTasks.LoadFailure(error)))
    );

    @Effect({ dispatch: false })
    loadFailure$ = this._actions$.ofType(fromTasks.LOAD_FAILURE)
    .pipe(
      map(toPayload),
      tap(() =>
        this.snackBar.openFromComponent(TaskSnackComponent, {
          duration: 1000,
          data: 'User Load Failure',
          horizontalPosition: 'right',
          verticalPosition: 'top'
        })
      )
    );

  @Effect()
  add$ = this._actions$
    .ofType(fromTasks.ADD)
    .pipe(
      map(toPayload),
      switchMap(payload => this._taskApiService.addTask(payload.task)),
      map((task: Task) => new fromTasks.AddSuccess({ task })),
      catchError(error => of(new fromTasks.AddFailure({ error })))
    );

    @Effect({dispatch: false})
    addSuccess$ = this._actions$.ofType(fromTasks.ADD_SUCCESS)
    .pipe(
      tap(() => {
        this.snackBar.openFromComponent(TaskSnackComponent, {
          duration: 1000,
          data: 'Task Created',
          horizontalPosition: 'right',
          verticalPosition: 'top'
        });
      })
    );

    @Effect({ dispatch: false })
    addFailure$ = this._actions$.ofType(fromTasks.ADD_FAILURE)
    .pipe(
      map(toPayload),
      tap(() =>
        this.snackBar.openFromComponent(TaskSnackComponent, {
          duration: 1000,
          data: 'Task Creation Failure',
          horizontalPosition: 'right',
          verticalPosition: 'top'
        })
      )
    );

  @Effect()
  update$ = this._actions$
    .ofType(fromTasks.UPDATE)
    .pipe(
      map(toPayload),
      switchMap(payload => this._taskApiService.updateTask(payload.task)),
      map((response: any) => new fromTasks.UpdateSuccess({ task: { id: response.id, changes: { ...response } } })),
      catchError(error => of(new fromTasks.UpdateFailure(error)))
    );

    @Effect({dispatch: false})
    updateSuccess$ = this._actions$.ofType(fromTasks.UPDATE_SUCCESS)
    .pipe(
      tap(() => {
        this.snackBar.openFromComponent(TaskSnackComponent, {
          duration: 1000,
          data: 'Task Updated',
          horizontalPosition: 'right',
          verticalPosition: 'top'
        });
      })
    );

    @Effect({ dispatch: false })
    updateFailure$ = this._actions$.ofType(fromTasks.UPDATE_FAILURE)
    .pipe(
      map(toPayload),
      tap(() =>
        this.snackBar.openFromComponent(TaskSnackComponent, {
          duration: 1000,
          data: 'Task Update Failure',
          horizontalPosition: 'right',
          verticalPosition: 'top'
        })
      )
    );

  @Effect()
  delete$ = this._actions$
    .ofType(fromTasks.DELETE)
    .pipe(
      map(toPayload),
      switchMap(payload => this._taskApiService.deleteTask(payload.taskId)),
      map((response: any) => new fromTasks.DeleteSuccess(response)),
      catchError(error => of(new fromTasks.DeleteFailure(error)))
    );

    @Effect({dispatch: false})
    deleteSuccess$ = this._actions$.ofType(fromTasks.DELETE_SUCCESS)
    .pipe(
      tap(() => {
        this.snackBar.openFromComponent(TaskSnackComponent, {
          duration: 1000,
          data: 'Task Deleted',
          horizontalPosition: 'right',
          verticalPosition: 'top'
        });
      })
    );

    @Effect({ dispatch: false })
    deleteFailure$ = this._actions$.ofType(fromTasks.DELETE_FAILURE)
    .pipe(
      map(toPayload),
      tap(() =>
        this.snackBar.openFromComponent(TaskSnackComponent, {
          duration: 1000,
          data: 'Task Deletion Failure',
          horizontalPosition: 'right',
          verticalPosition: 'top'
        })
      )
    );

  @Effect({ dispatch: false })
  saveDescription$ = this._actions$
    .ofType(fromTasks.SAVE_DESCRIPTION)
    .pipe(
      map(toPayload), tap(payload => localStorage.setItem(`task${payload.taskId}Desciption`, payload.text))
    );

  constructor(private _actions$: Actions, private _taskApiService: TaskApiService, private snackBar: MatSnackBar) { }
}
