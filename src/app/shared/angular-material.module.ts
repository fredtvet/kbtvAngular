import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ScrollingModule} from '@angular/cdk/scrolling';

import {
   MatButtonModule,
   MatToolbarModule,
   MatIconModule,
   MatBadgeModule,
   MatSidenavModule,
   MatListModule,
   MatGridListModule,
   MatFormFieldModule,
   MatInputModule,
   MatSelectModule,
   MatRadioModule,
   MatDatepickerModule,
   MatNativeDateModule,
   MatChipsModule,
   MatTooltipModule,
   MatTableModule,
   MatPaginatorModule,
   MatCardModule,
   MatExpansionModule,
   MatTabsModule,
   MatMenuModule,
   MatSnackBarModule,
   MatCheckboxModule,
   MatDialogModule,
   MatAutocompleteModule,
   MatProgressSpinnerModule

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
      MatGridListModule,
      MatFormFieldModule,
      MatInputModule,
      MatSelectModule,
      MatRadioModule,
      MatDatepickerModule,
      MatNativeDateModule,
      MatChipsModule,
      MatTooltipModule,
      MatTableModule,
      MatPaginatorModule,
      MatCardModule,
      MatExpansionModule,
      MatTabsModule,
      MatMenuModule,
      MatSnackBarModule,
      MatCheckboxModule,
      MatDialogModule,
      MatAutocompleteModule,
      MatProgressSpinnerModule,
      ScrollingModule
   ],
   exports: [
      MatButtonModule,
      MatToolbarModule,
      MatIconModule,
      MatSidenavModule,
      MatBadgeModule,
      MatListModule,
      MatGridListModule,
      MatInputModule,
      MatFormFieldModule,
      MatSelectModule,
      MatRadioModule,
      MatDatepickerModule,
      MatChipsModule,
      MatTooltipModule,
      MatTableModule,
      MatPaginatorModule,
      MatCardModule,
      MatExpansionModule,
      MatTabsModule,
      MatMenuModule,
      MatSnackBarModule,
      MatCheckboxModule,
      MatDialogModule,
      MatAutocompleteModule,
      MatProgressSpinnerModule,
      ScrollingModule
   ],
   providers: [
      MatDatepickerModule
   ]
})

export class AngularMaterialModule { }
