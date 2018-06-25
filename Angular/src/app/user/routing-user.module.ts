import { NgModule } from '@angular/core';
import { UserViewModule } from './user-view.module';
import { UserRoutingModule } from './user-routing.module';

@NgModule({
  imports: [UserViewModule, UserRoutingModule]
})
export class RoutingUserModule { }
