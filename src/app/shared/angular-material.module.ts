import { NgModule } from '@angular/core';
import { ScrollingModule } from '@angular/cdk/scrolling';

import {
   MatButtonModule, //
   MatToolbarModule, //
   MatIconModule, //
   MatBadgeModule, //
   MatSidenavModule,
   MatProgressSpinnerModule,
   MatFormFieldModule,
   MatInputModule,
   MatSelectModule,
   MatRadioModule,
   MatTooltipModule, //
   MatTabsModule, //
   MatMenuModule,
   MatSnackBarModule,
   MatCheckboxModule,
   MatDialogModule,
   MatAutocompleteModule, //
   MatRippleModule,
   MatBottomSheetModule, //
   MatButtonToggleModule, //
   MatCardModule,
   MatGridListModule,
   MatDividerModule

} from '@angular/material';

@NgModule({
   imports: [
      MatButtonModule,
      MatToolbarModule,
      MatIconModule,
      MatSidenavModule,
      MatBadgeModule,
      MatFormFieldModule,
      MatInputModule,
      MatSelectModule,
      MatRadioModule,
      MatTooltipModule,
      MatTabsModule,
      MatMenuModule,
      MatSnackBarModule,
      MatCheckboxModule,
      MatDialogModule,
      MatAutocompleteModule,
      ScrollingModule, 
      MatProgressSpinnerModule,
      MatRippleModule,
      MatBottomSheetModule,
      MatButtonToggleModule,
      MatCardModule,
      MatGridListModule,
      MatDividerModule
   ],
   exports: [
      MatButtonModule,
      MatToolbarModule,
      MatIconModule,
      MatSidenavModule,
      MatBadgeModule,
      MatInputModule,
      MatFormFieldModule,
      MatSelectModule,
      MatRadioModule,
      MatTooltipModule,
      MatTabsModule,
      MatMenuModule,
      MatSnackBarModule,
      MatCheckboxModule,
      MatDialogModule,
      MatAutocompleteModule,
      ScrollingModule, 
      MatProgressSpinnerModule,
      MatRippleModule,
      MatBottomSheetModule,
      MatButtonToggleModule,
      MatCardModule,
      MatGridListModule,
      MatDividerModule
   ],
})

export class AngularMaterialModule { }
