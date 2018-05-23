import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProfileComponent } from './components/profile/profile.component';
import { RegisterComponent } from './components/register/register.component';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { AuthenticationComponent } from './components/authentication/authentication.component';
import { LoginComponent } from './components/login/login.component';
import { PasswordResetComponent } from './components/password-reset/password-reset.component';
import { DisableControlDirective } from './directives/disable-control/disable-control.directive';
import { GoogleSignInComponent } from './components/google-sign-in/google-sign-in.component';
import { FacebookLoginButtonComponent } from './components/facebook-login-button/facebook-login-button.component';
import { TwitterLoginButtonComponent } from './components/twitter-login-button/twitter-login-button.component';
import { GithubLoginButtonComponent } from './components/github-login-button/github-login-button.component';
import { MicrosoftAuthenticationComponent } from './components/microsoft-authentication/microsoft-authentication.component';

import {
  MatButtonModule,
  MatCardModule,
  MatDialogModule,
  MatIconModule,
  MatInputModule,
  MatRadioModule,
  MatSelectModule,
  MatSnackBarModule,
  MatTabsModule
} from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';

const COMPONENTS = [
  AuthenticationComponent,
  LoginComponent,
  RegisterComponent,
  ProfileComponent,
  PasswordResetComponent,
  GoogleSignInComponent,
  FacebookLoginButtonComponent,
  TwitterLoginButtonComponent,
  MicrosoftAuthenticationComponent,
  GithubLoginButtonComponent
];

const MATERIAL_MODULES = [
  MatButtonModule,
  MatIconModule,
  MatCardModule,
  MatInputModule,
  MatTabsModule,
  MatRadioModule,
  MatSnackBarModule,
  MatInputModule,
  MatDialogModule,
  MatSelectModule
];

@NgModule({
  imports: [
    CommonModule,
    ...MATERIAL_MODULES,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [...COMPONENTS, DisableControlDirective],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AuthenticationViewModule { }
