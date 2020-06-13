import { NgModule } from '@angular/core';
import { LayoutModule } from '@angular/cdk/layout';

import { AngularMaterialModule } from './angular-material.module';
import { GooglePlaceModule } from "ngx-google-places-autocomplete";
import { SharedAppModule } from '../shared-app/shared-app.module';

import { SortByDatePipe, GetEmployerByIdPipe, ArrayFromNumberPipe, ArraySlicePipe } from './pipes'

import { InputListenerDirective, HttpCommandButtonDirective } from './directives';

import {
  ConfirmDialogComponent,
  MailToFormComponent,
  SelectableCardComponent,
  SimpleTopNavComponent,
} from './components';

@NgModule({
  declarations: [
    ConfirmDialogComponent,
    SortByDatePipe,
    InputListenerDirective,
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
    AngularMaterialModule,
    GooglePlaceModule,
  ],
  exports: [
    SharedAppModule,
    LayoutModule,
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
    SimpleTopNavComponent
  ]
})
export class SharedModule { }
