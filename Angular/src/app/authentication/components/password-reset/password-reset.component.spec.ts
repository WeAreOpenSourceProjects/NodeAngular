import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';

import { PasswordResetComponent } from './password-reset.component';
import { MatCardModule } from '@angular/material/card';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { DisableControlDirective } from '../../directives/disable-control/disable-control.directive';
import { combineReducers, StoreModule } from '@ngrx/store';
import { authenticationReducers } from '../../+state/reducers';
import { RouterTestingModule } from '@angular/router/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { DomSanitizer, BrowserModule } from '@angular/platform-browser';
import { HttpClientTestingModule } from '@angular/common/http/testing';

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
        RouterTestingModule,
        HttpClientTestingModule,
        BrowserModule
      ],
      declarations: [
        DisableControlDirective,
        PasswordResetComponent
      ]
    })
    .compileComponents();
  }));

  beforeEach(inject([MatIconRegistry, DomSanitizer], (matIconRegistry: MatIconRegistry, sanitizer: DomSanitizer) => {
    ['action'].forEach(iconSet =>
      matIconRegistry.addSvgIconSetInNamespace(
        iconSet,
        sanitizer.bypassSecurityTrustResourceUrl(`assets/svg-sprite-${iconSet}.svg`)
      )
    );
    fixture = TestBed.createComponent(PasswordResetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component)
    .toBeTruthy();
  });
});
