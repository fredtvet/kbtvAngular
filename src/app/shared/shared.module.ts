import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArraySlicePipe, ThumbnailPipe } from './pipes'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularMaterialModule } from './angular-material.module';
import { LayoutModule } from '@angular/cdk/layout';
import { RouterModule } from '@angular/router';
import { IfRoleDirective } from './directives/if-role.directive';
import { MainNavComponent, BottomNavComponent } from './layout';
import { GooglePlaceModule } from "ngx-google-places-autocomplete";
import { FlexLayoutModule } from '@angular/flex-layout';
import { AgGridModule } from 'ag-grid-angular';

import {
  ConfirmDeleteDialogComponent,
  ImageListComponent,
  ImageViewerDialogComponent,
  NavListItemComponent,
  VertMenuComponent,
  SearchBarComponent,
  MissionListViewComponent,
  NotificationComponent
} from './components';
import { AddToHomeScreenComponent } from './components/add-to-home-screen/add-to-home-screen.component';
import { SubmitButtonComponent } from './components/submit-button/submit-button.component';
import { MissionTypeFormDialogComponent } from './components/mission-type-form-dialog/mission-type-form-dialog.component';
import { ReportTypeFormDialogComponent } from './components/report-type-form-dialog/report-type-form-dialog.component';

@NgModule({
  declarations: [
    MainNavComponent,
    BottomNavComponent,
    ConfirmDeleteDialogComponent,
    ImageListComponent,
    ImageViewerDialogComponent,
    NavListItemComponent,
    VertMenuComponent,
    SearchBarComponent,
    IfRoleDirective,
    ArraySlicePipe,
    ThumbnailPipe,
    NotificationComponent,
    MissionListViewComponent,
    AddToHomeScreenComponent,
    SubmitButtonComponent,
    MissionTypeFormDialogComponent,
    ReportTypeFormDialogComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    LayoutModule,
    AngularMaterialModule,
    ReactiveFormsModule,
    GooglePlaceModule,
    FlexLayoutModule,
    AgGridModule.withComponents([]),
  ],
  exports: [
    CommonModule,
    FormsModule,
    RouterModule,
    LayoutModule,
    AngularMaterialModule,
    ReactiveFormsModule,
    GooglePlaceModule,
    AgGridModule,
    FlexLayoutModule,
    ConfirmDeleteDialogComponent,
    ImageListComponent,
    ImageViewerDialogComponent,
    NavListItemComponent,
    VertMenuComponent,
    IfRoleDirective,
    ArraySlicePipe,
    ThumbnailPipe,
    MainNavComponent,
    BottomNavComponent,
    SearchBarComponent,
    MissionListViewComponent,
    AddToHomeScreenComponent,
    SubmitButtonComponent,
    MissionTypeFormDialogComponent,
    ReportTypeFormDialogComponent
  ]
})
export class SharedModule { }
