import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserDetailComponent } from './containers/detail/user-detail.component';
import { UserDetailDialogComponent } from './containers/detail/user-detail.dialog.component';
import { UserDetailPageComponent } from './containers/detail/user-detail.page.component';
import { UsersListComponent } from './containers/list/users-list.component';
import { UserDeleteDialogComponent } from './components/delete/user-delete.dialog.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { DisableControlDirective } from './directives/disable-control/disable-control.directive';
import { FlexLayoutModule } from '@angular/flex-layout';

import {
  MatButtonModule,
  MatCardModule,
  MatDialogModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatPaginatorModule,
  MatSelectModule,
  MatSortModule,
  MatTableModule,
  MatTooltipModule
} from '@angular/material';

const COMPONENTS = [
  UsersListComponent,
  UserDetailComponent,
  UserDetailPageComponent,
  UserDeleteDialogComponent,
  UserDetailDialogComponent
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
  MatSelectModule
];

@NgModule({
  declarations: [...COMPONENTS, DisableControlDirective],
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
    UserDeleteDialogComponent,
    UserDetailDialogComponent
  ]
})
export class UserViewModule { }
