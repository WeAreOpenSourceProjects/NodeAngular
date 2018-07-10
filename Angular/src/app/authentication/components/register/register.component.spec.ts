import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';

import { RegisterComponent } from './register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { DisableControlDirective } from '../../directives/disable-control/disable-control.directive';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { DomSanitizer, BrowserModule } from '@angular/platform-browser';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        ReactiveFormsModule,
        MatInputModule,
        MatIconModule,
        NoopAnimationsModule,
        BrowserModule,
        HttpClientTestingModule
      ],
      declarations: [ RegisterComponent, DisableControlDirective ]
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
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component)
    .toBeTruthy();
  });
});
