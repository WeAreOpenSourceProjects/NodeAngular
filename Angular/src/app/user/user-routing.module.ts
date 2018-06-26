import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserDetailComponent } from './containers/detail/user-detail.component';
import { UsersListComponent } from './containers/list/users-list.component';
import { UserGuardService } from './services/user.guard.service';
import { UsersGuardService } from './services/users.guard.service';
import { UserDetailPageComponent } from './containers/detail/user-detail.page.component';
import { AuthenticationGuardService, RoleGuardService } from 'src/app/authentication';

const userRoutes: Routes = [
  {
    path: '',
    component: UsersListComponent,
    canActivate: [AuthenticationGuardService, RoleGuardService, UsersGuardService],
    data: {
      page: 'users-list',
      roles: ['admin']
    },
    children: [
      {
        path: ':id/edit',
        component: UserDetailComponent
      }
    ]
  },
  {
    path: ':id',
    component: UserDetailPageComponent,
    data: {
      page: 'user-detail'
    },
    canActivate: [UserGuardService]
  },
  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forChild(userRoutes)]
})
export class UserRoutingModule { }
