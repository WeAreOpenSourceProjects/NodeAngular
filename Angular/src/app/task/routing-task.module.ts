import { NgModule } from '@angular/core';
import { TaskViewModule } from './task-view.module';
import { TaskRoutingModule } from './task-routing.module';

@NgModule({
  imports: [ TaskViewModule, TaskRoutingModule ]
})
export class RoutingTaskModule { }
