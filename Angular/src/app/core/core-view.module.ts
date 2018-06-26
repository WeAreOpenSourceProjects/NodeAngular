import { NotFoundComponent } from './components/not-found/not-found.component';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LayoutComponent } from './containers/layout/layout.component';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CoreDrawer, CoreDrawerContainer, CoreDrawerContent } from './components/sidenav/drawer';
import { CoreSidenav, CoreSidenavContainer, CoreSidenavContent } from './components/sidenav/sidenav';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';

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
    FlexLayoutModule
  ],
  declarations: COMPONENTS
})
export class CoreViewModule { }
