import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserDetailComponent } from './components/detail/user-detail.component';
import { UsersListComponent } from './components/list/users-list.component';
import { UserGuardService } from './services/user.guard.service';

const adminsRoutes: Routes = [
  {
    path: 'users',
    component: UsersListComponent,
    canActivate: [ UserGuardService ],
    data: {
      page: 'user-list'
    },
    children: [
      {
        path: ':id',
        component: UserDetailComponent
      }
    ]
//    canDeactivate: [TaskGuardService]
  },

  {
    path: '**',
    redirectTo: 'list'
  }
];

@NgModule()
export class RootAdministrationRoutingModule { }

// tslint:disable-next-line:max-classes-per-file
@NgModule({
  imports: [ RouterModule.forChild(adminsRoutes) ]
})
export class AdministrationRoutingModule {
  public static forRoot(): ModuleWithProviders {
    return {
      ngModule: RootAdministrationRoutingModule,
      providers: [ UserGuardService ]
    };
  }
}
