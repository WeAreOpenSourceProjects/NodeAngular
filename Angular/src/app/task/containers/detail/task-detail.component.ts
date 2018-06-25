import { Component } from '@angular/core';
import { fromRouter } from 'src/app/common/router-state';
import { Store } from '@ngrx/store';
import { selectCurrentTask } from '../../+state/task.selectors';
import { Observable } from 'rxjs';

@Component({
  templateUrl: './task-detail.component.html',
  styleUrls: ['./task-detail.component.scss']
})
export class TaskDetailComponent {
  public comments$: Observable<Array<any>>;

  constructor(private store: Store<any>) {}
  public currentTask$ = this.store.select(selectCurrentTask);

  back(): void {
    this.store.dispatch(new fromRouter.Back());
  }
}
