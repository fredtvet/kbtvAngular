import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScrollingModule } from '@angular/cdk/scrolling';

import {
   MatButtonModule,
   MatToolbarModule,
   MatIconModule,
   MatBadgeModule,
   MatSidenavModule,
   MatListModule, 
   MatProgressSpinnerModule,
   MatFormFieldModule,
   MatInputModule,
   MatSelectModule,
   MatRadioModule,
   MatTooltipModule,
   MatExpansionModule,
   MatTabsModule,
   MatMenuModule,
   MatSnackBarModule,
   MatCheckboxModule,
   MatDialogModule,
   MatAutocompleteModule,
   MatRippleModule,
   MatBottomSheetModule,
   MatButtonToggleModule,

   //Experimental
   MatCardModule

} from '@angular/material';

@NgModule({
   imports: [
      CommonModule,
      MatButtonModule,
      MatToolbarModule,
      MatIconModule,
      MatSidenavModule,
      MatBadgeModule,
      MatListModule,
      MatFormFieldModule,
      MatInputModule,
      MatSelectModule,
      MatRadioModule,
      MatTooltipModule,
      MatExpansionModule,
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
      MatCardModule
   ],
   exports: [
      MatButtonModule,
      MatToolbarModule,
      MatIconModule,
      MatSidenavModule,
      MatBadgeModule,
      MatListModule,
      MatInputModule,
      MatFormFieldModule,
      MatSelectModule,
      MatRadioModule,
      MatTooltipModule,
      MatExpansionModule,
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
      MatCardModule
   ],
})

export class AngularMaterialModule { }
