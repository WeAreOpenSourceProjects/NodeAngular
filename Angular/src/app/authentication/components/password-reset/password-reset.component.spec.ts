import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PasswordResetComponent } from './password-reset.component';
import { MatCardModule } from '@angular/material/card';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { DisableControlDirective } from '../../directives/disable-control/disable-control.directive';
import { combineReducers, StoreModule } from '@ngrx/store';
import { authenticationReducers } from '../../+state/reducers';
import { RouterTestingModule } from '@angular/router/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('PasswordResetComponent', () => {
  let component: PasswordResetComponent;
  let fixture: ComponentFixture<PasswordResetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        ReactiveFormsModule,
        MatIconModule,
        MatCardModule,
        MatInputModule,
        NoopAnimationsModule,
        StoreModule.forRoot({
          authentication: combineReducers(authenticationReducers)
        }),
        RouterTestingModule
      ],
      declarations: [
        DisableControlDirective,
        PasswordResetComponent
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PasswordResetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component)
    .toBeTruthy();
  });
});
