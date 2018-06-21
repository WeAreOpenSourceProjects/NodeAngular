import { APP_INITIALIZER, InjectionToken, ModuleWithProviders, NgModule } from '@angular/core';
import { CoreInitializationService } from './services/core.initialization.service';
import { coreReducers } from './+state/reducers';
import { StoreModule } from '@ngrx/store';

const CORE_CONFIGURATION = new InjectionToken('CORE_CONFIGURATION');

const initialisationFactory = (coreInitialization, configuration) => {
  return () => {
    const menuItems = configuration.reduce((acc, cur) => acc.concat(cur.sidenav), []);
    coreInitialization.setLogo(configuration[0].logo);
    coreInitialization.setTitle(configuration[0].title);
    coreInitialization.addMenuItems(menuItems);
  };
};

@NgModule({
  imports: [StoreModule.forFeature('core', coreReducers)]
})
export class CoreStateModule {
  public static forRoot(configuration: any): ModuleWithProviders {
    return {
      ngModule: CoreStateModule,
      providers: [
        CoreInitializationService,
        { provide: CORE_CONFIGURATION, useValue: configuration },
        {
          provide: APP_INITIALIZER,
          useFactory: initialisationFactory,
          deps: [CoreInitializationService, CORE_CONFIGURATION],
          multi: true
        }
      ]
    };
  }
}
