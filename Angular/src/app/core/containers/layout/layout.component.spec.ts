import { RouterTestingModule } from '@angular/router/testing';
import { MatListModule } from '@angular/material/list';
import { LayoutComponent } from './layout.component';
import { CoreSidenav, CoreSidenavContainer, CoreSidenavContent } from '../../components/sidenav/sidenav';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { combineReducers, Store, StoreModule } from '@ngrx/store';
import { coreReducers } from '../../+state/reducers';
import { CoreState } from '../../+state/states/core-state.state';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { DomSanitizer, BrowserModule } from '@angular/platform-browser';
import { HttpClientTestingModule } from '@angular/common/http/testing';
// import { authenticationReducers } from '@waos/authentication';

describe('LayoutComponent', () => {

  let component: LayoutComponent;
  let fixture: ComponentFixture<LayoutComponent>;
  let store: Store<CoreState>;

  beforeEach(
    async(() => {

      const initialState = {
        authentication: {
          loginPage: {
            error: undefined,
            pending: false
          },
          status: {
            user: undefined,
            loading: false
          }
        },
        core: {
          logo: '',
          menuItems: {},
          showSidenav: false,
          title: ''
        }
      };

      TestBed.configureTestingModule({
        imports: [
          MatIconModule,
          MatListModule,
          MatMenuModule,
          MatToolbarModule,
          RouterTestingModule,
          NoopAnimationsModule,
          StoreModule.forRoot({
            authentication: (state: any, _action: any) => state,
            core: combineReducers(coreReducers)
          }, { initialState }),
          FlexLayoutModule,
          BrowserModule,
          HttpClientTestingModule
        ],
        declarations: [
          CoreSidenav,
          CoreSidenavContent,
          CoreSidenavContainer,
          LayoutComponent
        ]
      });

      store = TestBed.get(Store);

      spyOn(store, 'dispatch').and
      .callThrough();
//      .compileComponents();
    })
  );

  beforeEach(inject([MatIconRegistry, DomSanitizer], (matIconRegistry: MatIconRegistry, sanitizer: DomSanitizer) => {
    ['navigation', 'social', 'action'].forEach(iconSet =>
      matIconRegistry.addSvgIconSetInNamespace(
        iconSet,
        sanitizer.bypassSecurityTrustResourceUrl(`assets/svg-sprite-${iconSet}.svg`)
      )
    );
    fixture = TestBed.createComponent(LayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should be created', () => {
    expect(component)
    .toBeTruthy();
  });
});
