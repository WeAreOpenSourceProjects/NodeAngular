import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { ForgotComponent } from './forgot.component';
import { MatIconModule } from '@angular/material/icon';

describe('LoginComponent', () => {
  let component: ForgotComponent;
  let fixture: ComponentFixture<ForgotComponent>;

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
        declarations: [ForgotComponent]
      })
      .compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(ForgotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component)
    .toBeTruthy();
  });
});
