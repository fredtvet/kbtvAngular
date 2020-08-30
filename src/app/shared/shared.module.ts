import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GooglePlaceModule } from "ngx-google-places-autocomplete";
import { SharedAppModule } from '../shared-app/shared-app.module';
import { AngularMaterialModule } from './angular-material.module';
import {
  ConfirmDialogComponent,
  ListCardComponent, MailToFormComponent,
  SelectableCardComponent,
  SimpleTopNavComponent
} from './components';
import { AddToHomeScreenDirective, HttpCommandButtonDirective  } from './directives';
import { ArrayFromNumberPipe, ArraySlicePipe, SortByDatePipe, TransformButtonPipe, TranslatePipe } from './pipes';






@NgModule({
  declarations: [
    ConfirmDialogComponent,
    SortByDatePipe,
    AddToHomeScreenDirective,
    ArrayFromNumberPipe,
    HttpCommandButtonDirective,
    MailToFormComponent,
    SelectableCardComponent,
    ArraySlicePipe,
    TranslatePipe,
    SimpleTopNavComponent,
    TransformButtonPipe,
    ListCardComponent,
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    AngularMaterialModule,
    GooglePlaceModule,   
    SharedAppModule,
  ],
  exports: [
    FormsModule,    
    ReactiveFormsModule,
    AngularMaterialModule,
    GooglePlaceModule,
    ConfirmDialogComponent,
    HttpCommandButtonDirective,
    SortByDatePipe,
    TranslatePipe,
    ArrayFromNumberPipe,
    MailToFormComponent,
    SelectableCardComponent,
    ArraySlicePipe,
    SimpleTopNavComponent,
    ListCardComponent,
    AddToHomeScreenDirective,    
    TransformButtonPipe,
    SharedAppModule
  ]
})
export class SharedModule { }
