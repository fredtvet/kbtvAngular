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
import { OwlDateTimeModule, OwlNativeDateTimeModule, OwlDateTimeIntl, OWL_DATE_TIME_FORMATS, OWL_DATE_TIME_LOCALE } from 'ng-pick-datetime';

import {
  ConfirmDeleteDialogComponent,
  ImageListComponent,
  ImageViewerDialogComponent,
  NavListItemComponent,
  VertMenuComponent,
  SearchBarComponent,
  MissionListViewComponent,
  NotificationComponent,
  ReportTypeFormDialogComponent,
  MissionTypeFormDialogComponent,
  SubmitButtonComponent,
  AddToHomeScreenComponent,
  WeekPickerComponent
} from './components';

import { DefaultOwlDateTimeIntl } from './customizations/default-owl-date-time-intl';
import { DEFAULT_OWL_DATE_TIME_FORMATS } from './customizations/default-owl-date-time-formats';
import { BottomSheetComponent } from './layout/bottom-sheet/bottom-sheet.component';

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
    ReportTypeFormDialogComponent,
    WeekPickerComponent,
    BottomSheetComponent,
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
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    AgGridModule.withComponents([]),
  ],
  providers: [
    {provide: OwlDateTimeIntl, useClass: DefaultOwlDateTimeIntl},
    {provide: OWL_DATE_TIME_LOCALE, useValue: 'no'},
    {provide: OWL_DATE_TIME_FORMATS, useValue: DEFAULT_OWL_DATE_TIME_FORMATS},
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
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
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
    ReportTypeFormDialogComponent,
    WeekPickerComponent
  ]
})
export class SharedModule { }
