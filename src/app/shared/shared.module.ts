import { NgModule } from '@angular/core';
import { LayoutModule } from '@angular/cdk/layout';

import { AngularMaterialModule } from './angular-material.module';
import { GooglePlaceModule } from "ngx-google-places-autocomplete";
import { SharedAppModule } from '../shared-app/shared-app.module';

import { SortByDatePipe, GetEmployerByIdPipe, ArrayFromNumberPipe, ArraySlicePipe } from './pipes'

import { InputListenerDirective, HttpCommandButtonDirective, AddToHomeScreenDirective } from './directives';

import {
  ConfirmDialogComponent,
  MailToFormComponent,
  SelectableCardComponent,
  SimpleTopNavComponent,
} from './components';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HammerModule } from '@angular/platform-browser';

@NgModule({
  declarations: [
    ConfirmDialogComponent,
    SortByDatePipe,
    InputListenerDirective,
    AddToHomeScreenDirective,
    GetEmployerByIdPipe,
    ArrayFromNumberPipe,
    HttpCommandButtonDirective,
    MailToFormComponent,
    SelectableCardComponent,
    ArraySlicePipe,
    SimpleTopNavComponent
  ],
  imports: [
    SharedAppModule,
    LayoutModule,
    FormsModule,
    ReactiveFormsModule,
    AngularMaterialModule,
    GooglePlaceModule,
    HammerModule, 
  ],
  exports: [
    SharedAppModule,
    LayoutModule,
    FormsModule,
    ReactiveFormsModule,
    AngularMaterialModule,
    GooglePlaceModule,
    ConfirmDialogComponent,
    InputListenerDirective,
    HttpCommandButtonDirective,
    SortByDatePipe,
    GetEmployerByIdPipe,
    ArrayFromNumberPipe,
    MailToFormComponent,
    SelectableCardComponent,
    ArraySlicePipe,
    SimpleTopNavComponent,
    AddToHomeScreenDirective
  ]
})
export class SharedModule { }
