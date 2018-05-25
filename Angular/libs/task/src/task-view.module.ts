// import { ConnectFormDirective } from '@labdat/connect-form/src/components/directives';
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

import {
  MatButtonModule,
  MatCardModule,
  MatDialogModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatPaginatorModule,
  MatSortModule,
  MatTableModule,
  MatTooltipModule
} from '@angular/material';
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
