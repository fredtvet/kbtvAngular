import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArraySlicePipe, ThumbnailPipe, SortByDatePipe, SortByTimesheetStatusPipe,UsernameToFullnamePipe } from './pipes'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularMaterialModule } from './angular-material.module';
import { LayoutModule } from '@angular/cdk/layout';
import { RouterModule } from '@angular/router';
import { IfRoleDirective } from './directives/if-role.directive';
import { MainNavComponent, MainBottomNavComponent, InnerNavComponent, IconButtonComponent,StrokedButtonComponent, MainSideNavContentComponent} from './layout';
import { GooglePlaceModule } from "ngx-google-places-autocomplete";
import { FlexLayoutModule } from '@angular/flex-layout';
import { OwlDateTimeModule, OwlNativeDateTimeModule, OwlDateTimeIntl, OWL_DATE_TIME_FORMATS, OWL_DATE_TIME_LOCALE } from 'ng-pick-datetime';

import {
  ConfirmDialogComponent,
  ImageListComponent,
  ImageViewerDialogComponent,
  NavListItemComponent,
  SearchBarComponent,
  MissionListViewComponent,
  NotificationComponent,
  SubmitButtonComponent,
  AddToHomeScreenComponent,
  PageNotFoundComponent,
  TimesheetFilterComponent,
  TimesheetFilterSheetWrapperComponent,
  ListCardComponent,
  TimesheetCardComponent,
  WeekListFilterComponent,
  WeekListFilterSheetWrapperComponent,
  TimesheetFilterHeaderComponent,
  TimesheetSummaryCardContentComponent
} from './components';

import { DefaultOwlDateTimeIntl } from './customizations/default-owl-date-time-intl';
import { DEFAULT_OWL_DATE_TIME_FORMATS } from './customizations/default-owl-date-time-formats';
import { BottomSheetMenuComponent } from './components/bottom-sheet-menu/bottom-sheet-menu.component';
import { DurationPipe } from './pipes/duration.pipe';
import { GetDateByDateParamsPipe } from './pipes/get-date-by-date-params.pipe';
import { SameDatePipe } from './pipes/same-date.pipe';
import { ArrayIncludesPipe } from './pipes/array-includes.pipe';
import { AddToHomeScreenDirective } from './directives/add-to-home-screen.directive';
import { SwipeCardComponent } from './components/swipe-card/swipe-card.component';
import { MainTopNavComponent } from './layout/main-nav/main-top-nav/main-top-nav.component';

@NgModule({
  declarations: [
    MainNavComponent,
    MainBottomNavComponent,
    ConfirmDialogComponent,
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
    UsernameToFullnamePipe,
    TimesheetCardComponent,
    WeekListFilterComponent,
    WeekListFilterSheetWrapperComponent,
    AddToHomeScreenDirective,
    SwipeCardComponent,
    TimesheetSummaryCardContentComponent,
    MainSideNavContentComponent,
    MainTopNavComponent
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
    ConfirmDialogComponent,
    ImageListComponent,
    ImageViewerDialogComponent,
    NavListItemComponent,
    IfRoleDirective,
    AddToHomeScreenDirective,
    ArraySlicePipe,
    ThumbnailPipe,
    SortByDatePipe,
    SameDatePipe,
    DurationPipe,
    GetDateByDateParamsPipe,
    SortByTimesheetStatusPipe,
    UsernameToFullnamePipe,
    MainNavComponent,
    InnerNavComponent,
    SearchBarComponent,
    MissionListViewComponent,
    AddToHomeScreenComponent,
    SubmitButtonComponent,
    PageNotFoundComponent,
    TimesheetFilterSheetWrapperComponent,
    ArrayIncludesPipe,
    TimesheetFilterHeaderComponent,
    IconButtonComponent,
    StrokedButtonComponent,
    ListCardComponent,
    TimesheetCardComponent,
    WeekListFilterComponent,
    WeekListFilterSheetWrapperComponent,
    TimesheetSummaryCardContentComponent,
    SwipeCardComponent
  ]
})
export class SharedModule { }
