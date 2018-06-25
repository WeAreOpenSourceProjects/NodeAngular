import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserSnackComponent } from './user-snack.component';
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';

describe('UserSnackComponent', () => {
  let component: UserSnackComponent;
  let fixture: ComponentFixture<UserSnackComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserSnackComponent ],
      providers: [ { provide: MAT_SNACK_BAR_DATA, useValue: {} }]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserSnackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component)
    .toBeTruthy();
  });
});
