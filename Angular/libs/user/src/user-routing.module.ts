import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserDetailComponent } from './containers/detail/user-detail.component';
import { UsersListComponent } from './containers/list/users-list.component';
import { UsersGuardService } from './services/users.guard.service';
import { UserDetailPageComponent } from './containers/detail/user-detail.page.component';
import { AuthenticationGuardService, RoleGuardService } from '@labdat/authentication';

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
      page: 'user-detail',
      roles: ['admin']
    },
    canActivate: [AuthenticationGuardService, RoleGuardService, UsersGuardService]
  },
  {
    path: '**',
    redirectTo: 'list'
  }
];

@NgModule()
export class RootUserRoutingModule { }

// tslint:disable-next-line:max-classes-per-file
@NgModule({
  imports: [RouterModule.forChild(userRoutes)]
})
export class UserRoutingModule {
  public static forRoot(): ModuleWithProviders {
    return {
      ngModule: RootUserRoutingModule,
      providers: [UsersGuardService]
    };
  }
}
