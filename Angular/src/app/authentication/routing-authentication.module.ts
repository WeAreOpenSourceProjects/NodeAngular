import { NgModule } from '@angular/core';
import { AuthenticationViewModule } from './authentication-view.module';
import { AuthenticationRoutingModule } from './authentication-routing.module';

@NgModule({
  imports: [AuthenticationViewModule, AuthenticationRoutingModule]
})
export class RoutingAuthenticationModule { }
