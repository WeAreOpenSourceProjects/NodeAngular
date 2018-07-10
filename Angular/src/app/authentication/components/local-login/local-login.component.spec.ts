import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { LocalLoginComponent } from './local-login.component';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer, BrowserModule } from '@angular/platform-browser';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('LoginComponent', () => {
  let component: LocalLoginComponent;
  let fixture: ComponentFixture<LocalLoginComponent>;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        imports: [
          FormsModule,
          ReactiveFormsModule,
          MatIconModule,
          MatInputModule,
          NoopAnimationsModule,
          BrowserModule,
          HttpClientTestingModule
        ],
        declarations: [LocalLoginComponent]
      })
      .compileComponents();
    })
  );

  beforeEach(inject([MatIconRegistry, DomSanitizer], (matIconRegistry: MatIconRegistry, sanitizer: DomSanitizer) => {
    ['action'].forEach(iconSet =>
      matIconRegistry.addSvgIconSetInNamespace(
        iconSet,
        sanitizer.bypassSecurityTrustResourceUrl(`assets/svg-sprite-${iconSet}.svg`)
      )
    );
    fixture = TestBed.createComponent(LocalLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component)
    .toBeTruthy();
  });
});
