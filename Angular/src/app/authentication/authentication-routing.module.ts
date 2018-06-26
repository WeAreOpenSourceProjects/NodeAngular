import { AuthenticationComponent } from './containers/authentication/authentication.component';
import { PasswordResetComponent } from './components/password-reset/password-reset.component';
import { AuthenticationGuardService } from './services/authentication.guard.service';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PasswordResetGuardService } from './services/password-reset.guard.service';

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

@NgModule({
  imports: [RouterModule.forChild(authenticationRoutes)]
})
export class AuthenticationRoutingModule { }
