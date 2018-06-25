import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskDeleteDialogComponent } from './task-delete.dialog.component';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';

describe('TaskDeleteDialogComponent', () => {
  let component: TaskDeleteDialogComponent;
  let fixture: ComponentFixture<TaskDeleteDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MatDialogModule
      ],
      declarations: [ TaskDeleteDialogComponent ],
      providers: [
        { provide: MatDialogRef , useValue: { open: () => {} } },
        { provide: MAT_DIALOG_DATA , useValue: { } }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskDeleteDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component)
    .toBeTruthy();
  });
});
