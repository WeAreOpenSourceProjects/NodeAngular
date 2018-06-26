import { AuthenticationSnackComponent } from './components/authentication-snack/authentication-snack.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { authenticationReducers } from './+state/reducers';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { AuthenticationEffectsService } from './+state/effects/authentication-state.effects.service';
import { APP_INITIALIZER, ModuleWithProviders, NgModule } from '@angular/core';
import { AuthenticationInitializationService } from './services/authentication.initialization.service';
import { AuthenticationApiService } from './services/authentication.api.service';
import { AuthenticationInterceptorService } from './services/authentication.interceptor.service';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { GoogleSignInService } from './services/google-sign-in.service';
import { MsalService } from './services/msal.service';

export function initialisationFactory(authenticationInitialisation): any {
  return () => authenticationInitialisation.loadUser();
}

@NgModule({
  declarations: [AuthenticationSnackComponent],
  imports: [
    HttpClientModule,
    MatSnackBarModule,
    StoreModule.forFeature('authentication', authenticationReducers),
    EffectsModule.forFeature([AuthenticationEffectsService])
  ],
  entryComponents: [AuthenticationSnackComponent]
})
export class AuthenticationStateModule {
  public static forRoot(): ModuleWithProviders {
    return {
      ngModule: AuthenticationStateModule,
      providers: [
        AuthenticationInitializationService,
        {
          provide: APP_INITIALIZER,
          useFactory: initialisationFactory,
          deps: [AuthenticationInitializationService],
          multi: true
        },
        {
          provide: HTTP_INTERCEPTORS,
          useClass: AuthenticationInterceptorService,
          multi: true
        }
      ]
    };
  }
}
