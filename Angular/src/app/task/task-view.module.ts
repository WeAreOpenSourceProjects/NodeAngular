// import { ConnectFormDirective } from '@waos/connect-form/src/components/directives';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TaskDetailComponent } from './containers/detail/task-detail.component';
import { TasksListComponent } from './containers/list/tasks-list.component';
import { TaskAddComponent } from './components/add/task-add.component';
import { TaskEditComponent } from './components/edit/task-edit.component';
import { TaskEditDialogComponent } from './components/edit/task-edit.dialog.component';
import { TaskDeleteDialogComponent } from './components/delete/task-delete.dialog.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';

import { FlexLayoutModule } from '@angular/flex-layout';

const COMPONENTS = [
  TasksListComponent,
  TaskDetailComponent,
  TaskDeleteDialogComponent,
  TaskEditComponent,
  TaskEditDialogComponent,
  TaskAddComponent
];

const MATERIAL_MODULES = [
  MatButtonModule,
  MatTooltipModule,
  MatTableModule,
  MatSortModule,
  MatPaginatorModule,
  MatDialogModule,
  MatIconModule,
  MatCardModule,
  MatInputModule,
  MatListModule,
  MatFormFieldModule
];

@NgModule({
  declarations: COMPONENTS,
  imports: [
    CommonModule,
    HttpClientModule,
    ...MATERIAL_MODULES,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    RouterModule
  ],
  entryComponents: [
    TaskDeleteDialogComponent,
    TaskEditDialogComponent
  ]
})
export class TaskViewModule { }
