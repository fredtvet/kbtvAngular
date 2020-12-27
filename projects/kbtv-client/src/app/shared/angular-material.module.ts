import { ScrollingModule } from '@angular/cdk/scrolling';
import { NgModule } from '@angular/core';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatBadgeModule } from '@angular/material/badge';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSliderModule } from '@angular/material/slider';

@NgModule({
   imports: [
      MatBadgeModule,
      MatFormFieldModule,
      MatInputModule,
      MatSelectModule,
      MatRadioModule,
      MatCheckboxModule,
      MatAutocompleteModule,
      ScrollingModule, 
      MatDialogModule,
      MatBottomSheetModule,
      MatChipsModule,
      MatSliderModule
   ],
   exports: [
      MatBadgeModule,
      MatInputModule,
      MatFormFieldModule,
      MatSelectModule,
      MatRadioModule,
      MatCheckboxModule,
      MatAutocompleteModule,
      ScrollingModule, 
      MatButtonToggleModule,
      MatDialogModule,
      MatBottomSheetModule,
      MatChipsModule,
      MatSliderModule,
   ],
})

export class AngularMaterialModule {}
