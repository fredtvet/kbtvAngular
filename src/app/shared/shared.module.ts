import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArraySlicePipe, ThumbnailPipe, SortByDatePipe, SortByTimesheetStatusPipe } from './pipes'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularMaterialModule } from './angular-material.module';
import { LayoutModule } from '@angular/cdk/layout';
import { RouterModule } from '@angular/router';
import { IfRoleDirective } from './directives/if-role.directive';
import { MainNavComponent, BottomNavComponent, InnerNavComponent, IconButtonComponent,StrokedButtonComponent} from './layout';
import { GooglePlaceModule } from "ngx-google-places-autocomplete";
import { FlexLayoutModule } from '@angular/flex-layout';
import { OwlDateTimeModule, OwlNativeDateTimeModule, OwlDateTimeIntl, OWL_DATE_TIME_FORMATS, OWL_DATE_TIME_LOCALE } from 'ng-pick-datetime';

import {
  ConfirmDeleteDialogComponent,
  ImageListComponent,
  ImageViewerDialogComponent,
  NavListItemComponent,
  SearchBarComponent,
  MissionListViewComponent,
  NotificationComponent,
  ReportTypeFormDialogComponent,
  MissionTypeFormDialogComponent,
  SubmitButtonComponent,
  AddToHomeScreenComponent,
  WeekPickerComponent,
  PageNotFoundComponent,
  TimesheetFilterComponent,
  TimesheetFilterSheetWrapperComponent,
  ListCardComponent,
} from './components';

import { DefaultOwlDateTimeIntl } from './customizations/default-owl-date-time-intl';
import { DEFAULT_OWL_DATE_TIME_FORMATS } from './customizations/default-owl-date-time-formats';
import { BottomSheetMenuComponent } from './components/bottom-sheet-menu/bottom-sheet-menu.component';
import { DurationPipe } from './pipes/duration.pipe';
import { GetDateByDateParamsPipe } from './pipes/get-date-by-date-params.pipe';
import { SameDatePipe } from './pipes/same-date.pipe';
import { ArrayIncludesPipe } from './pipes/array-includes.pipe';
import { TimesheetFilterHeaderComponent } from './components/timesheet-filter-header/timesheet-filter-header.component';
@NgModule({
  declarations: [
    MainNavComponent,
    BottomNavComponent,
    ConfirmDeleteDialogComponent,
    ImageListComponent,
    ImageViewerDialogComponent,
    NavListItemComponent,
    SearchBarComponent,
    IfRoleDirective,
    ArraySlicePipe,
    ThumbnailPipe,
    SortByDatePipe,
    SortByTimesheetStatusPipe,
    NotificationComponent,
    MissionListViewComponent,
    AddToHomeScreenComponent,
    SubmitButtonComponent,
    MissionTypeFormDialogComponent,
    ReportTypeFormDialogComponent,
    WeekPickerComponent,
    BottomSheetMenuComponent,
    DurationPipe,
    GetDateByDateParamsPipe,
    SameDatePipe,
    PageNotFoundComponent,
    TimesheetFilterComponent,
    TimesheetFilterSheetWrapperComponent,
    ArrayIncludesPipe,
    TimesheetFilterHeaderComponent,
    InnerNavComponent,
    IconButtonComponent,
    StrokedButtonComponent,
    ListCardComponent,
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
  ],
  entryComponents:[
    BottomSheetMenuComponent,
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
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    FlexLayoutModule,
    ConfirmDeleteDialogComponent,
    ImageListComponent,
    ImageViewerDialogComponent,
    NavListItemComponent,
    IfRoleDirective,
    ArraySlicePipe,
    ThumbnailPipe,
    SortByDatePipe,
    SameDatePipe,
    DurationPipe,
    GetDateByDateParamsPipe,
    SortByTimesheetStatusPipe,
    MainNavComponent,
    InnerNavComponent,
    BottomNavComponent,
    SearchBarComponent,
    MissionListViewComponent,
    AddToHomeScreenComponent,
    SubmitButtonComponent,
    MissionTypeFormDialogComponent,
    ReportTypeFormDialogComponent,
    WeekPickerComponent,
    PageNotFoundComponent,
    TimesheetFilterSheetWrapperComponent,
    ArrayIncludesPipe,
    TimesheetFilterHeaderComponent,
    IconButtonComponent,
    StrokedButtonComponent,
    ListCardComponent,
  ]
})
export class SharedModule { }
