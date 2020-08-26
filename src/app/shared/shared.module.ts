import { NgModule } from '@angular/core';
import { LayoutModule } from '@angular/cdk/layout';

import { AngularMaterialModule } from './angular-material.module';
import { GooglePlaceModule } from "ngx-google-places-autocomplete";
import { SharedAppModule } from '../shared-app/shared-app.module';

import { SortByDatePipe, ArrayFromNumberPipe, ArraySlicePipe, TranslatePipe } from './pipes'

import { InputListenerDirective, HttpCommandButtonDirective, AddToHomeScreenDirective } from './directives';

import {
  ConfirmDialogComponent,
  MailToFormComponent,
  SelectableCardComponent,
  SimpleTopNavComponent,
} from './components';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    ConfirmDialogComponent,
    SortByDatePipe,
    InputListenerDirective,
    AddToHomeScreenDirective,
    ArrayFromNumberPipe,
    HttpCommandButtonDirective,
    MailToFormComponent,
    SelectableCardComponent,
    ArraySlicePipe,
    TranslatePipe,
    SimpleTopNavComponent
  ],
  imports: [
    SharedAppModule,
    LayoutModule,
    FormsModule,
    ReactiveFormsModule,
    AngularMaterialModule,
    GooglePlaceModule,
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
    TranslatePipe,
    ArrayFromNumberPipe,
    MailToFormComponent,
    SelectableCardComponent,
    ArraySlicePipe,
    SimpleTopNavComponent,
    AddToHomeScreenDirective
  ]
})
export class SharedModule { }
