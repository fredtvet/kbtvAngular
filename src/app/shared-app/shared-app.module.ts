import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconButtonComponent } from './components/icon-button/icon-button.component';
import { ImageErrorReloaderDirective } from './directives/image-error-reloader.directive';
import { CheckRolesInButtonsPipe } from './check-roles-in-buttons.pipe';
import { ListCardComponent, StrokedButtonComponent, BottomSheetMenuComponent, PageNotFoundComponent, LoginPromptComponent, LoginFormComponent, NotificationComponent } from './components';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatMenuModule } from '@angular/material/menu';
import { MatRippleModule } from '@angular/material/core';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RouterModule } from '@angular/router';
import { IfRoleDirective, AddToHomeScreenDirective } from './directives';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDividerModule } from '@angular/material/divider';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



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
    AddToHomeScreenDirective,
    LoginPromptComponent,
    LoginFormComponent,
    NotificationComponent,
  ],
  imports: [
    RouterModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatSidenavModule,
    MatButtonModule,
    MatMenuModule,
    MatRippleModule,
    MatFormFieldModule,
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
    FormsModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatSidenavModule,
    MatMenuModule,
    MatRippleModule,
    MatDividerModule,
    MatBottomSheetModule,
    MatButtonModule,
    MatIconModule,
    MatSnackBarModule,
    MatDialogModule,
    MatFormFieldModule,
    MatProgressSpinnerModule,
    IconButtonComponent,
    StrokedButtonComponent,
    ImageErrorReloaderDirective,
    CheckRolesInButtonsPipe,
    BottomSheetMenuComponent,
    ListCardComponent,
    IfRoleDirective,
    AddToHomeScreenDirective,
    PageNotFoundComponent,
    LoginPromptComponent,
    LoginFormComponent,
    NotificationComponent
  ]
})
export class SharedAppModule { }
