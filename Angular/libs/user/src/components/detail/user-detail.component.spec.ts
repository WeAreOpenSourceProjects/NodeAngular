import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserDetailComponent } from './user-detail.component';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { combineReducers, StoreModule } from '@ngrx/store';
import { authenticationReducers } from '@labdat/authentication';
import { userReducer } from '@labdat/user';
import { routerReducer } from '@ngrx/router-store';

describe('UserDetailComponent', () => {
  let component: UserDetailComponent;
  let fixture: ComponentFixture<UserDetailComponent>;

  beforeEach(async(() => {

    const storeMock = {
      authentication: {
          status: {
            user: {
              id: 1,
              firstName: 'test',
              lastName: 'test',
              username: 'test',
              email: 'test@test.com',
              roles: ['user', 'admin']
            },
            loggedIn: true
          },
          loginPage: {
            pending: false,
            error: ''
          }
        },
      user: {
          ids: [],
          entities: {},
        loaded: true,
        loading: false
      },
      router: {
        navigationId: 1,
        state: {
            params: {},
            queryParams: {},
            url: '/home'
          }
      }
    };

    TestBed.configureTestingModule({
      imports: [
        MatIconModule,
        MatCardModule,
        MatDialogModule,
        StoreModule.forRoot({
          authentication: combineReducers(authenticationReducers),
          user: userReducer,
          router: routerReducer
        }, { initialState: storeMock as any })
      ],
      declarations: [UserDetailComponent]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component)
    .toBeTruthy();
  });
});
