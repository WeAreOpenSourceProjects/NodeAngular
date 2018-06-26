import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from './components/register/register.component';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { AuthenticationComponent } from './containers/authentication/authentication.component';
import { LocalLoginComponent } from './components/local-login/local-login.component';
import { ForgotComponent } from './components/forgot/forgot.component';
import { PasswordResetComponent } from './components/password-reset/password-reset.component';
import { DisableControlDirective } from './directives/disable-control/disable-control.directive';
import { GoogleSignInComponent } from './components/google-sign-in/google-sign-in.component';
import { MicrosoftAuthenticationComponent } from './components/microsoft-authentication/microsoft-authentication.component';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTabsModule } from '@angular/material/tabs';
import { FlexLayoutModule } from '@angular/flex-layout';

const COMPONENTS = [
  AuthenticationComponent,
  LocalLoginComponent,
  RegisterComponent,
  PasswordResetComponent,
  GoogleSignInComponent,
  MicrosoftAuthenticationComponent,
  ForgotComponent
];

const MATERIAL_MODULES = [
  MatButtonModule,
  MatIconModule,
  MatCardModule,
  MatDividerModule,
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
