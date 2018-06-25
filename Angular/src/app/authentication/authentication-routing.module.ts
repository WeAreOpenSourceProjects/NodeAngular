import { AuthenticationComponent } from './containers/authentication/authentication.component';
import { PasswordResetComponent } from './components/password-reset/password-reset.component';
import { AuthenticationGuardService } from './services/authentication.guard.service';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PasswordResetGuardService } from './services/password-reset.guard.service';
import { RoleGuardService } from './services/role.guard.service';
// import { MicrosoftAuthenticationComponent } from './components/microsoft-authentication/microsoft-authentication.component';

const authenticationRoutes: Routes = [
  {
    path: '',
    component: AuthenticationComponent,
    canActivate: [AuthenticationGuardService]
  },
  {
    path: 'password-reset',
    component: PasswordResetComponent,
    canActivate: [PasswordResetGuardService]
  }
];
//  { path: 'forbiden', component: ForbidenComponent, data: { title: 'Forbiden'} },
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
export class RootAuthenticationRoutingModule { }

// tslint:disable-next-line:max-classes-per-file
@NgModule({
  imports: [RouterModule.forChild(authenticationRoutes)]
})
export class AuthenticationRoutingModule {
  public static forRoot(): ModuleWithProviders {
    return {
      ngModule: RootAuthenticationRoutingModule,
      providers: [
        AuthenticationGuardService,
        PasswordResetGuardService,
        RoleGuardService
      ]
    };
  }
}
