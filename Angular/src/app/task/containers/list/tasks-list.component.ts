import { TaskDeleteDialogComponent } from '../../components/delete/task-delete.dialog.component';
import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import * as fromTask from '../../+state/task.actions';
import { selectAllTasks } from '../../+state/task.selectors';
import { TaskState } from '../../+state/task.interfaces';
import { fromRouter } from 'src/app/common/router-state';
import { Store } from '@ngrx/store';
import { Task } from '../../models/task.model';

import { Subscription, Subject } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { ObservableMedia } from '@angular/flex-layout';

@Component({
  styleUrls: ['./tasks-list.component.scss'],
  templateUrl: './tasks-list.component.html'
})
export class TasksListComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild(MatSort) sort: MatSort;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  public delete$ = new Subject();
  public view$ = new Subject();
  public edit$ = new Subject();
  public add$ = new Subject();

  public displayedColumns = ['title', 'action'];
  public dataSource: MatTableDataSource<Task>;

  private subscriptions: Subscription;

  constructor(public dialog: MatDialog, private store: Store<TaskState>, public media: ObservableMedia) {}

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource();
    const allTasksSubscriptions = this.store
    .select(selectAllTasks)
    .subscribe(tasks => (this.dataSource.data = tasks));
    this.subscriptions = allTasksSubscriptions;

    this.view$
    .subscribe(taskId => this.store.dispatch(new fromRouter.Go({ path: ['tasks', taskId] })));

    this.delete$
    .pipe(
      map(taskId => this.dialog.open(
        TaskDeleteDialogComponent,
        {
          width: '250px',
          data: { taskId }
        })
      ),
      switchMap(dialogRef => dialogRef.afterClosed())
    )
    .subscribe((taskId: string) => {
      if (taskId) {
        this.store.dispatch(new fromTask.Delete({ taskId }));
      }
    });

    this.edit$
    .subscribe(taskId => this.store.dispatch(new fromRouter.Go({ path: ['tasks', String(taskId), 'edit'] })));

    this.add$
    .subscribe(_x => this.store.dispatch(new fromRouter.Go({ path: ['tasks', 'add'] })));

    const displayedColumnsSubscription = this.media
    .asObservable()
    .pipe(
      map((media: any) => {
        if (media.mqAlias === 'xs') {
          return ['title', 'action'];
        }

        return ['title', 'action'];
      })
    )
    .subscribe(displayedColumns => this.displayedColumns = displayedColumns);
    this.subscriptions.add(displayedColumnsSubscription);
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: string): void {
    let filter = filterValue.trim();
    filter = filterValue.toLowerCase();
    this.dataSource.filter = filter;
  }

  getState(outlet): any {
    return outlet.activatedRouteData.state;
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
