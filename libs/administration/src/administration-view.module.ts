import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserDetailComponent } from './components/detail/user-detail.component';
import { UserDetailDialogComponent } from './components/detail/user-detail.dialog.component';
import { UsersListComponent } from './components/list/users-list.component';
import { UserEditComponent } from './components/edit/user-edit.component';
import { UserEditDialogComponent } from './components/edit/user-edit.dialog.component';
import { UserDeleteDialogComponent } from './components/delete/user-delete.dialog.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormlyMaterialModule } from '@ngx-formly/material';
import { RouterModule } from '@angular/router';

import {
  MatButtonModule,
  MatCardModule,
  MatDialogModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatPaginatorModule,
  MatSortModule,
  MatTableModule,
  MatTooltipModule
} from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormlyModule } from '@ngx-formly/core';

const COMPONENTS = [
  UsersListComponent,
  UserDetailComponent,
  UserDetailDialogComponent,
  UserDeleteDialogComponent,
  UserEditComponent,
  UserEditDialogComponent
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
  MatListModule
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
    FormlyModule,
    FormlyMaterialModule,
    RouterModule
  ],
  entryComponents: [
    UserDeleteDialogComponent,
    UserDetailDialogComponent,
    UserEditDialogComponent
  ]
})
export class AdministrationViewModule { }
