import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import {
  AuthenticationRoutingModule,
  AuthenticationStateModule
} from 'src/app/authentication';
import { BrowserModule } from '@angular/platform-browser';
import { NxModule } from '@nrwl/nx';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { coreConfiguration, CoreStateModule, CoreViewModule, CoreRoutingModule } from 'src/app/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { AppComponent } from './components/app.component';
import { NgModule } from '@angular/core';
import { metaReducers } from './+state/app.reducer';
import { environment } from 'src/environments/environment';
import { RouterStateModule } from 'src/app/common/router-state';
import { taskConfiguration, TaskRoutingModule, TaskStateModule } from 'src/app/task';
import { UserRoutingModule, UserStateModule } from 'src/app/user';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    NxModule.forRoot(),
    BrowserModule,
    RouterModule.forRoot([], { initialNavigation: 'enabled' }),
    BrowserAnimationsModule,
    MatIconModule,
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule,
    StoreModule.forRoot({}, { metaReducers }),
    EffectsModule.forRoot([]),
    RouterStateModule.forRoot(),
    !environment.production ? StoreDevtoolsModule.instrument() : [],

    AuthenticationRoutingModule.forRoot(),
    UserRoutingModule.forRoot(),
    TaskRoutingModule.forRoot(),

    CoreStateModule.forRoot([coreConfiguration.self, taskConfiguration.core]),
    AuthenticationStateModule.forRoot(),
    UserStateModule.forRoot(),
    TaskStateModule.forRoot(),

    CoreViewModule,
    CoreRoutingModule,

  ],
  declarations: [AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
