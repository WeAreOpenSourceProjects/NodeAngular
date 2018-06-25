import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { userReducer } from './+state/user.reducer';
import { UserEffects } from './+state/user.effects';
import { UserApiService } from './services/user.api.service';
import { UserSnackComponent } from './components/user-snack/user-snack.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ModuleWithProviders, NgModule } from '@angular/core';

@NgModule({
  declarations: [UserSnackComponent],
  exports: [UserSnackComponent],
  entryComponents: [UserSnackComponent],
  imports: [
    MatSnackBarModule,
    StoreModule.forFeature('user', userReducer),
    EffectsModule.forFeature([UserEffects])
  ]
})
export class UserStateModule {
  public static forRoot(): ModuleWithProviders {
    return {
      ngModule: UserStateModule,
      providers: [
        UserApiService
      ]
    };
  }
}
