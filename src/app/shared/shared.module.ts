import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutModule } from '@angular/cdk/layout';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AngularMaterialModule } from './angular-material.module';
import { GooglePlaceModule } from "ngx-google-places-autocomplete";
import { FlexLayoutModule } from '@angular/flex-layout';

import { SortByDatePipe, GetEmployerByIdPipe, ArrayFromNumberPipe, CheckRolesInButtons } from './pipes'

import { InputListenerDirective, ImageErrorReloaderDirective, AddToHomeScreenDirective, IfRoleDirective, HttpCommandButtonDirective } from './directives';

import { 
  MainNavComponent, 
  MainBottomNavComponent, 
  IconButtonComponent,
  StrokedButtonComponent, 
  MainSideNavContentComponent, 
  SimpleTopNavComponent, 
  MainTopNavComponent, 
  DetailTopNavComponent
} from './layout';

import {
  ConfirmDialogComponent,
  NotificationComponent,
  PageNotFoundComponent,
  ListCardComponent,
  BottomSheetMenuComponent,
  LoginPromptComponent,
  LoginFormComponent,
} from './components';

@NgModule({
  declarations: [
    MainNavComponent,
    MainBottomNavComponent,
    ConfirmDialogComponent,
    IfRoleDirective,
    SortByDatePipe,
    NotificationComponent,
    BottomSheetMenuComponent,
    PageNotFoundComponent,
    IconButtonComponent,
    StrokedButtonComponent,
    ListCardComponent,
    AddToHomeScreenDirective,
    MainSideNavContentComponent,
    MainTopNavComponent,
    InputListenerDirective,
    SimpleTopNavComponent,
    GetEmployerByIdPipe,
    ImageErrorReloaderDirective,
    ArrayFromNumberPipe,
    DetailTopNavComponent,
    LoginPromptComponent,
    LoginFormComponent,
    HttpCommandButtonDirective,
    CheckRolesInButtons,
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
  ],
  entryComponents:[
    BottomSheetMenuComponent,
  ],
  exports: [
    CommonModule,
    FormsModule,
    RouterModule,
    LayoutModule,
    AngularMaterialModule,
    ReactiveFormsModule,
    GooglePlaceModule,
    FlexLayoutModule,
    ConfirmDialogComponent,
    IfRoleDirective,
    AddToHomeScreenDirective,
    InputListenerDirective,
    HttpCommandButtonDirective,
    SortByDatePipe,
    MainNavComponent,
    PageNotFoundComponent,
    IconButtonComponent,
    StrokedButtonComponent,
    ListCardComponent,
    SimpleTopNavComponent,
    GetEmployerByIdPipe,
    ArrayFromNumberPipe,
    ImageErrorReloaderDirective,
    CheckRolesInButtons
  ]
})
export class SharedModule { }
