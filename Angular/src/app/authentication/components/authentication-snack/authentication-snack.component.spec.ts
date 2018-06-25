import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';
import { AuthenticationSnackComponent } from './authentication-snack.component';

describe('AuthenticationSnackComponent', () => {
  let component: AuthenticationSnackComponent;
  let fixture: ComponentFixture<AuthenticationSnackComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [],
      declarations: [ AuthenticationSnackComponent ],
      providers: [ { provide: MAT_SNACK_BAR_DATA, useValue: {} } ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthenticationSnackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component)
    .toBeTruthy();
  });
});
