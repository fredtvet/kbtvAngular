import { NgModule } from '@angular/core';
import { ScrollingModule } from '@angular/cdk/scrolling';

import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatFormFieldModule } from '@angular/material/form-field';

@NgModule({
   imports: [
      // MatButtonModule,
      // MatToolbarModule, //
      // MatIconModule,
      MatBadgeModule,
      MatFormFieldModule,
      MatInputModule,
      MatSelectModule,
      MatRadioModule,
      MatTooltipModule,
      MatTabsModule,
      // MatMenuModule, //
      // MatSnackBarModule,
      MatCheckboxModule,
      // MatDialogModule,
      MatAutocompleteModule,
      ScrollingModule, 
      // MatProgressSpinnerModule,
      // MatRippleModule, //
      // MatBottomSheetModule, //
      MatButtonToggleModule,
      MatCardModule,
      //MatDividerModule
   ],
   exports: [
      //MatButtonModule,
     // MatToolbarModule,
      //MatIconModule,
      MatBadgeModule,
      MatInputModule,
      MatFormFieldModule,
      MatSelectModule,
      MatRadioModule,
      MatTooltipModule,
      MatTabsModule,
      //MatMenuModule,
      //MatSnackBarModule,
      MatCheckboxModule,
      // MatDialogModule,
      MatAutocompleteModule,
      ScrollingModule, 
      //MatProgressSpinnerModule,
      //MatRippleModule,
      //MatBottomSheetModule,
      MatButtonToggleModule,
      MatCardModule,
      //MatDividerModule
   ],
})

export class AngularMaterialModule { }
