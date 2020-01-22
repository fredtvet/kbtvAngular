import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmDeleteDialogComponent, ImageListComponent, ImageViewerDialogComponent, NavListItemComponent, PaginationComponent, VertMenuComponent, SearchBarComponent, LoadingComponent} from './components'
import { ArraySlicePipe, ThumbnailPipe } from './pipes'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularMaterialModule } from './angular-material.module';
import { LayoutModule } from '@angular/cdk/layout';
import { RouterModule } from '@angular/router';
import { IfRoleDirective } from './directives/if-role.directive';
import { MainNavComponent, BottomNavComponent, NestedNavComponent } from './layout';
import { GooglePlaceModule } from "ngx-google-places-autocomplete";
import { FlexLayoutModule } from '@angular/flex-layout';
import { SideNavHeaderComponent } from './layout/side-nav-header/side-nav-header.component';

@NgModule({
  declarations: [
    MainNavComponent,
    BottomNavComponent,
    NestedNavComponent,
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
    LoadingComponent,
    SideNavHeaderComponent
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
    NestedNavComponent,
    SearchBarComponent,
    LoadingComponent,
  ]
})
export class SharedModule { }
