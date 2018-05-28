import { NotFoundComponent } from './components/not-found/not-found.component';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LayoutComponent } from './containers/layout/layout.component';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CoreRoutingModule } from './core-routing.module';
import { CoreDrawer, CoreDrawerContainer, CoreDrawerContent } from './components/sidenav/drawer';
import { CoreSidenav, CoreSidenavContainer, CoreSidenavContent } from './components/sidenav/sidenav';

import {
  MatButtonModule,
  MatCardModule,
  MatDialogModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatPaginatorModule,
  MatSortModule,
  MatTableModule,
  MatToolbarModule,
  MatTooltipModule
  //  MatProgressBarModule
} from '@angular/material';

const SIDENAV_COMPONENTS = [
  CoreDrawer,
  CoreDrawerContainer,
  CoreDrawerContent,
  CoreSidenav,
  CoreSidenavContainer,
  CoreSidenavContent
];

export const COMPONENTS = [
  LayoutComponent,
  HomeComponent,
  NotFoundComponent,
  ...SIDENAV_COMPONENTS
];

const MATERIAL_MODULES = [
  MatButtonModule,
  MatTooltipModule,
  MatToolbarModule,
  MatTableModule,
  MatSortModule,
  MatMenuModule,
  MatPaginatorModule,
  MatDialogModule,
  MatIconModule,
  MatCardModule,
  MatInputModule,
  MatListModule
  //  MatProgressBarModule
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    ...MATERIAL_MODULES,
    FlexLayoutModule,
    CoreRoutingModule
  ],
  declarations: COMPONENTS
})
export class CoreViewModule { }
