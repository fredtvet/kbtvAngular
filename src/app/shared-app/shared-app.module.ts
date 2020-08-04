import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImageErrorReloaderDirective } from './directives/image-error-reloader.directive';
import { ListCardComponent, BottomSheetMenuComponent, PageNotFoundComponent, NotificationComponent, AppButtonComponent } from './components';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatRippleModule } from '@angular/material/core';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RouterModule } from '@angular/router';
import { IfRoleDirective } from './directives';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDividerModule } from '@angular/material/divider';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { NavItemComponent } from './components/nav-item/nav-item.component';
import { ReverseArrayPipe, CheckRolesInButtonsPipe, TransformButtonsPipe, TransformButtonPipe } from './pipes';



@NgModule({
  declarations: [
    AppButtonComponent,
    ImageErrorReloaderDirective,
    CheckRolesInButtonsPipe,
    ReverseArrayPipe,
    TransformButtonsPipe,
    TransformButtonPipe,
    BottomSheetMenuComponent,
    ListCardComponent,
    IfRoleDirective,
    PageNotFoundComponent,
    NotificationComponent,
    NavItemComponent,
  ],
  imports: [
    RouterModule,
    CommonModule,
    MatToolbarModule,
    MatSidenavModule,
    MatButtonModule,
    MatRippleModule,
    MatBottomSheetModule,
    MatSnackBarModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    MatDividerModule,
    FlexLayoutModule
  ],
  exports: [
    CommonModule,
    RouterModule,
    FlexLayoutModule,
    MatToolbarModule, //
    MatSidenavModule, //
    MatRippleModule, //
    MatDividerModule, //
    MatBottomSheetModule, //
    MatButtonModule, //
    MatIconModule, //
    MatSnackBarModule, //
    MatDialogModule,
    MatProgressSpinnerModule, //
    ImageErrorReloaderDirective,
    CheckRolesInButtonsPipe,
    TransformButtonsPipe,
    TransformButtonPipe,
    ReverseArrayPipe,
    BottomSheetMenuComponent,
    ListCardComponent,
    IfRoleDirective,
    PageNotFoundComponent,
    NotificationComponent,
    NavItemComponent,
    AppButtonComponent,
  ]
})
export class SharedAppModule { }
