import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { authenticationReducers } from '@labdat/authentication';
import { UserDetailDialogComponent } from './user-detail.dialog.component';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { combineReducers, StoreModule } from '@ngrx/store';
import { MatCardModule } from '@angular/material/card';
import { userReducer } from '@labdat/user';
import { routerReducer } from '@ngrx/router-store';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DisableControlDirective } from '../../directives/disable-control/disable-control.directive';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('UserDetailDialogComponent', () => {
  let component: UserDetailDialogComponent;
  let fixture: ComponentFixture<UserDetailDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MatIconModule,
        MatCardModule,
        MatDialogModule,
        MatInputModule,
        MatSelectModule,
        FormsModule,
        ReactiveFormsModule,
        StoreModule.forRoot({
          authentication: combineReducers(authenticationReducers),
          user: combineReducers(userReducer),
          router: combineReducers(routerReducer)
        }),
        NoopAnimationsModule
      ],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: MatDialogRef, useValue: { open: () => {} } }
      ],
      declarations: [UserDetailDialogComponent, DisableControlDirective]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserDetailDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component)
    .toBeTruthy();
  });
});
