import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatDividerModule, MatIconModule, MatInputModule } from '@angular/material';
import { AuthenticationComponent } from './authentication.component';
import { MatTabsModule } from '@angular/material/tabs';
import { RegisterComponent } from '../../components/register/register.component';
import { MatCardModule } from '@angular/material/card';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LocalLoginComponent } from '../../components/local-login/local-login.component';
import { DisableControlDirective } from '../../directives/disable-control/disable-control.directive';
import { authenticationReducers } from '../../+state/reducers';
import { combineReducers, StoreModule } from '@ngrx/store';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { GoogleSignInComponent } from '../../components/google-sign-in/google-sign-in.component';
import { MicrosoftAuthenticationComponent } from '../../components/microsoft-authentication/microsoft-authentication.component';
import { ForgotComponent } from '../../components/forgot/forgot.component';

describe('AuthenticationComponent', () => {
  let component: AuthenticationComponent;
  let fixture: ComponentFixture<AuthenticationComponent>;

  beforeEach(async(() => {

    TestBed.configureTestingModule({
      imports: [
        MatTabsModule,
        MatCardModule,
        FormsModule,
        ReactiveFormsModule,
        MatInputModule,
        MatIconModule,
        MatDividerModule,
        NoopAnimationsModule,
        StoreModule.forRoot({
          authentication: combineReducers(authenticationReducers)
        })
      ],
      declarations: [
        AuthenticationComponent,
        ForgotComponent,
        LocalLoginComponent,
        GoogleSignInComponent,
        MicrosoftAuthenticationComponent,
        RegisterComponent,
        DisableControlDirective
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthenticationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component)
    .toBeTruthy();
  });
});
