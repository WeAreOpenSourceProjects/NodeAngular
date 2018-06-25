import { ModuleWithProviders, NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { TaskInitializationService } from './+state/task.initialization';
import { taskReducer } from './+state/task.reducer';
import { TaskEffects } from './+state/task.effects';
import { TaskApiService } from './services/task.api.service';
import { TaskSnackComponent } from './components/task-snack/task-snack.component';
import { HttpClientModule } from '@angular/common/http';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@NgModule({
  declarations: [ TaskSnackComponent ],
  exports: [ TaskSnackComponent ],
  entryComponents: [ TaskSnackComponent ],
  imports: [
    HttpClientModule,
    MatSnackBarModule,
    StoreModule.forFeature('task', taskReducer),
    EffectsModule.forFeature([TaskEffects])
  ]
})
export class TaskStateModule {
  public static forRoot(): ModuleWithProviders {
    return {
      ngModule: TaskStateModule,
      providers: [
        TaskInitializationService,
        TaskApiService
      ]
    };
  }
}
