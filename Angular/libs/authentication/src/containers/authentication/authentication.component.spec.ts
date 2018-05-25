import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthenticationComponent } from './authentication.component';
import { LocalLoginComponent } from '../../components/local-login/local-login.component';
import { MatTabsModule } from '@angular/material/tabs';
import { RegisterComponent } from '../../components/register/register.component';
import { MatCardModule } from '@angular/material/card';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule, MatInputModule } from '@angular/material';
import { DisableControlDirective } from '../../directives/disable-control/disable-control.directive';
import { authenticationReducers } from '@labdat/authentication';
import { combineReducers, StoreModule } from '@ngrx/store';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

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
        NoopAnimationsModule,
        StoreModule.forRoot({
          authentication: combineReducers(authenticationReducers)
        })
      ],
      declarations: [AuthenticationComponent, LocalLoginComponent, RegisterComponent, DisableControlDirective]
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
