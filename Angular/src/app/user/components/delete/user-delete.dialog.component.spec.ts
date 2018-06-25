import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserDeleteDialogComponent } from './user-delete.dialog.component';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';

describe('UserDeleteDialogComponent', () => {
  let component: UserDeleteDialogComponent;
  let fixture: ComponentFixture<UserDeleteDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ MatDialogModule ],
      declarations: [ UserDeleteDialogComponent ],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: {} }
    ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserDeleteDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component)
    .toBeTruthy();
  });
});
