import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconButtonComponent } from './components/icon-button/icon-button.component';
import { ImageErrorReloaderDirective } from './directives/image-error-reloader.directive';
import { CheckRolesInButtonsPipe } from './check-roles-in-buttons.pipe';
import { ListCardComponent, StrokedButtonComponent, BottomSheetMenuComponent, PageNotFoundComponent, NotificationComponent } from './components';
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



@NgModule({
  declarations: [
    IconButtonComponent,
    StrokedButtonComponent,
    ImageErrorReloaderDirective,
    CheckRolesInButtonsPipe,
    BottomSheetMenuComponent,
    ListCardComponent,
    IfRoleDirective,
    PageNotFoundComponent,
    NotificationComponent,
  ],
  imports: [
    RouterModule,
    CommonModule,
    MatToolbarModule,
    MatSidenavModule,
    MatButtonModule,
    // MatMenuModule,
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
    //MatMenuModule,
    MatRippleModule, //
    MatDividerModule, //
    MatBottomSheetModule, //
    MatButtonModule, //
    MatIconModule, //
    MatSnackBarModule, //
    MatDialogModule,
    MatProgressSpinnerModule, //
    IconButtonComponent,
    StrokedButtonComponent,
    ImageErrorReloaderDirective,
    CheckRolesInButtonsPipe,
    BottomSheetMenuComponent,
    ListCardComponent,
    IfRoleDirective,
    PageNotFoundComponent,
    NotificationComponent
  ]
})
export class SharedAppModule { }
