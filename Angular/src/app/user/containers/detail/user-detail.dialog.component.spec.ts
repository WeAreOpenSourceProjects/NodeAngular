import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';

// import { authenticationReducers } from '@waos/authentication';
import { UserDetailDialogComponent } from './user-detail.dialog.component';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { combineReducers, StoreModule } from '@ngrx/store';
import { MatCardModule } from '@angular/material/card';
import { userReducer } from 'src/app/user';
import { routerReducer } from '@ngrx/router-store';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DisableControlDirective } from '../../directives/disable-control/disable-control.directive';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { DomSanitizer, BrowserModule } from '@angular/platform-browser';
import { HttpClientTestingModule } from '@angular/common/http/testing';

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
          authentication: (state: any, _action: any) => state,
          user: combineReducers(userReducer),
          router: combineReducers(routerReducer)
        }),
        BrowserModule,
        HttpClientTestingModule,
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

  beforeEach(inject([MatIconRegistry, DomSanitizer], (matIconRegistry: MatIconRegistry, sanitizer: DomSanitizer) => {
    matIconRegistry.addSvgIconSetInNamespace(
      'image',
      sanitizer.bypassSecurityTrustResourceUrl(`assets/svg-sprite-image.svg`)
    );
    fixture = TestBed.createComponent(UserDetailDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component)
    .toBeTruthy();
  });
});
