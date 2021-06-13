import { ScrollingModule } from '@angular/cdk/scrolling';
import { NgModule } from '@angular/core';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSliderModule } from '@angular/material/slider';
import { CssLoaderService } from '@core/services/css-loader.service';
import { LazyStyles } from '@shared-app/enums/lazy-styles.enum';

@NgModule({
   imports: [
      MatFormFieldModule,
      MatInputModule,
      MatSelectModule,
      MatRadioModule,
      MatCheckboxModule,
      MatAutocompleteModule,
      ScrollingModule, 
      MatBottomSheetModule,
      MatChipsModule,
      MatSliderModule
   ],
   exports: [
      ScrollingModule,  
      MatBottomSheetModule,  
      MatChipsModule,
      
      MatCheckboxModule,
      MatAutocompleteModule,
      MatInputModule,
      MatFormFieldModule,
      MatSelectModule,
      MatRadioModule,
      MatSliderModule,
   ],
})
export class AngularMaterialModule {
   constructor(cssLoaderService: CssLoaderService){
      cssLoaderService.load(LazyStyles.MatShared)
   }
}
