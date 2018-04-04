import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthenticationComponent } from './components/authentication/authentication.component';
import { ProfileComponent } from './components/profile/profile.component';
import { RegisterComponent } from './components/register/register.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './components/login/login.component';
import { PasswordResetComponent } from './components/password-reset/password-reset.component';

import {
  MatButtonModule,
  MatCardModule,
  MatCheckboxModule,
  MatIconModule,
  MatInputModule,
  MatRadioModule,
  MatSnackBarModule,
  MatTabsModule
} from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RootAuthenticationRoutingModule } from '@labdat/authentication-routing';
import { FormlyModule } from '@ngx-formly/core';
import { FormlyMaterialModule } from '@ngx-formly/material';
import { CustomFormlyModule } from '@labdat/custom-formly';

const COMPONENTS = [
  AuthenticationComponent,
  LoginComponent,
  RegisterComponent,
  ProfileComponent,
  PasswordResetComponent
];

const MATERIAL_MODULES = [
  MatButtonModule,
  MatIconModule,
  MatCheckboxModule,
  MatCardModule,
  MatInputModule,
  MatTabsModule,
  MatRadioModule,
  MatSnackBarModule,
  MatInputModule
];

@NgModule({
  imports: [
    CommonModule,
    ...MATERIAL_MODULES,
    FlexLayoutModule,
    FormlyModule,
    CustomFormlyModule,

    FormlyMaterialModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [ ...COMPONENTS ]
})
export class AuthenticationModule { }

@NgModule({
  imports: [ AuthenticationModule, RootAuthenticationRoutingModule]
})
export class RootAuthenticationModule { }
