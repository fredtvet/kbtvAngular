import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArraySlicePipe, ThumbnailPipe, SortByDatePipe, ReadableDurationPipe, DurationPipe, GetDateByDateParamsPipe, ArrayIncludesPipe, GetEmployerByIdPipe, ArrayFromNumberPipe, FiletypeFromUrlPipe } from './pipes'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularMaterialModule } from './angular-material.module';
import { LayoutModule } from '@angular/cdk/layout';
import { RouterModule } from '@angular/router';
import { IfRoleDirective } from './directives/if-role.directive';
import { MainNavComponent, MainBottomNavComponent, IconButtonComponent,StrokedButtonComponent, MainSideNavContentComponent, SimpleTopNavComponent} from './layout';
import { GooglePlaceModule } from "ngx-google-places-autocomplete";
import { FlexLayoutModule } from '@angular/flex-layout';
import { OwlDateTimeModule, OwlNativeDateTimeModule, OwlDateTimeIntl, OWL_DATE_TIME_FORMATS, OWL_DATE_TIME_LOCALE } from 'ng-pick-datetime';

import {
  ConfirmDialogComponent,
  NotificationComponent,
  SubmitButtonComponent,
  PageNotFoundComponent,
  TimesheetFilterComponent,
  TimesheetFilterSheetWrapperComponent,
  ListCardComponent,
  TimesheetCardComponent,
  WeekListFilterComponent,
  WeekListFilterSheetWrapperComponent,
  TimesheetSummaryCardContentComponent
} from './components';

import { DefaultOwlDateTimeIntl } from './customizations/default-owl-date-time-intl';
import { DEFAULT_OWL_DATE_TIME_FORMATS } from './customizations/default-owl-date-time-formats';
import { BottomSheetMenuComponent } from './components/bottom-sheet-menu/bottom-sheet-menu.component';
import { AddToHomeScreenDirective } from './directives/add-to-home-screen.directive';
import { SwipeCardComponent } from './components/swipe-card/swipe-card.component';
import { MainTopNavComponent } from './layout/main-nav/main-top-nav/main-top-nav.component';
import { InputListenerDirective, ImageErrorReloaderDirective } from './directives';
import { FileiconFromFiletypePipe } from './pipes/fileicon-from-filetype.pipe';

@NgModule({
  declarations: [
    MainNavComponent,
    MainBottomNavComponent,
    ConfirmDialogComponent,
    IfRoleDirective,
    ArraySlicePipe,
    ThumbnailPipe,
    SortByDatePipe,
    NotificationComponent,
    SubmitButtonComponent,
    BottomSheetMenuComponent,
    DurationPipe,
    GetDateByDateParamsPipe,
    PageNotFoundComponent,
    TimesheetFilterComponent,
    TimesheetFilterSheetWrapperComponent,
    ArrayIncludesPipe,
    IconButtonComponent,
    StrokedButtonComponent,
    ListCardComponent,
    TimesheetCardComponent,
    WeekListFilterComponent,
    WeekListFilterSheetWrapperComponent,
    AddToHomeScreenDirective,
    SwipeCardComponent,
    TimesheetSummaryCardContentComponent,
    MainSideNavContentComponent,
    MainTopNavComponent,
    InputListenerDirective,
    SimpleTopNavComponent,
    GetEmployerByIdPipe,
    ReadableDurationPipe,
    ImageErrorReloaderDirective,
    ArrayFromNumberPipe,
    FiletypeFromUrlPipe,
    FileiconFromFiletypePipe,
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
    IfRoleDirective,
    AddToHomeScreenDirective,
    InputListenerDirective,
    ArraySlicePipe,
    ThumbnailPipe,
    SortByDatePipe,
    DurationPipe,
    GetDateByDateParamsPipe,
    MainNavComponent,
    SubmitButtonComponent,
    PageNotFoundComponent,
    TimesheetFilterSheetWrapperComponent,
    ArrayIncludesPipe,
    IconButtonComponent,
    StrokedButtonComponent,
    ListCardComponent,
    TimesheetCardComponent,
    WeekListFilterComponent,
    WeekListFilterSheetWrapperComponent,
    TimesheetSummaryCardContentComponent,
    SwipeCardComponent,
    SimpleTopNavComponent,
    GetEmployerByIdPipe,
    ArrayFromNumberPipe,
    ImageErrorReloaderDirective,
    FiletypeFromUrlPipe,
    FileiconFromFiletypePipe
  ]
})
export class SharedModule { }
