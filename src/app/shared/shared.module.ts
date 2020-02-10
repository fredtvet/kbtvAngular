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

import {
  ConfirmDeleteDialogComponent,
  ImageListComponent,
  ImageViewerDialogComponent,
  NavListItemComponent,
  PaginationComponent,
  VertMenuComponent,
  SearchBarComponent,
  MissionListViewComponent,
  NotificationComponent
} from './components'

@NgModule({
  declarations: [
    MainNavComponent,
    BottomNavComponent,
    ConfirmDeleteDialogComponent,
    ImageListComponent,
    ImageViewerDialogComponent,
    NavListItemComponent,
    PaginationComponent,
    VertMenuComponent,
    SearchBarComponent,
    IfRoleDirective,
    ArraySlicePipe,
    ThumbnailPipe,
    NotificationComponent,
    MissionListViewComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    LayoutModule,
    AngularMaterialModule,
    ReactiveFormsModule,
    GooglePlaceModule,
    FlexLayoutModule
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
    ConfirmDeleteDialogComponent,
    ImageListComponent,
    ImageViewerDialogComponent,
    NavListItemComponent,
    PaginationComponent,
    VertMenuComponent,
    IfRoleDirective,
    ArraySlicePipe,
    ThumbnailPipe,
    MainNavComponent,
    BottomNavComponent,
    SearchBarComponent,
    MissionListViewComponent
  ]
})
export class SharedModule { }
