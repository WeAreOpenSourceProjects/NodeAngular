import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TaskAddComponent } from './components/add/task-add.component';
import { TaskDetailComponent } from './containers/detail/task-detail.component';
import { TaskEditComponent } from './components/edit/task-edit.component';
import { TasksListComponent } from './containers/list/tasks-list.component';
import { TaskGuardService } from './services/task.guard.service';

const tasksRoutes: Routes = [
  {
    path: '',
    component: TasksListComponent,
    data: {
      page: 'tasks-list'
    },
    children: [
      {
        path: 'add',
        component: TaskAddComponent,
        pathMatch: 'full'
      },
      {
        path: ':id/edit',
        component: TaskEditComponent,
        pathMatch: 'full'
      }
    ]
//    canDeactivate: [TaskGuardService]
  },
  {
    path: ':id',
    component: TaskDetailComponent,
    data: {
      page: 'task-detail'
    }
  },
  {
    path: '**',
    redirectTo: 'list'
  }
];
/*
if (!isEmpty(taskConfiguration.self.roles)) {
  Object.assign(tasksRoutes[0], {
    data: {
      expectedRoles: taskConfiguration.self.roles
    }
  });
}
*/

@NgModule()
export class RootTaskRoutingModule { }

// tslint:disable-next-line:max-classes-per-file
@NgModule({
  imports: [RouterModule.forChild(tasksRoutes)]
})
export class TaskRoutingModule {
  public static forRoot(): ModuleWithProviders {
    return {
      ngModule: RootTaskRoutingModule,
      providers: [TaskGuardService]
    };
  }
}
