import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskSnackComponent } from './task-snack.component';
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';

describe('TaskSnackComponent', () => {
  let component: TaskSnackComponent;
  let fixture: ComponentFixture<TaskSnackComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaskSnackComponent ],
      providers: [ { provide: MAT_SNACK_BAR_DATA, useValue: {} }]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskSnackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component)
    .toBeTruthy();
  });
});
