import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { LocalLoginComponent } from './local-login.component';
import { MatIconModule } from '@angular/material/icon';

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
          NoopAnimationsModule
        ],
        declarations: [LocalLoginComponent]
      })
      .compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(LocalLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component)
    .toBeTruthy();
  });
});
