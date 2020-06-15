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
import { CssLoaderService } from '../core/services';
import { LazyStyles } from '../shared-app/enums';

@NgModule({
   imports: [
      MatBadgeModule,
      MatFormFieldModule,
      MatInputModule,
      MatSelectModule,
      MatRadioModule,
      MatTooltipModule,
      MatCheckboxModule,
      MatAutocompleteModule,
      ScrollingModule, 
      MatButtonToggleModule,
   ],
   exports: [
      MatBadgeModule,
      MatInputModule,
      MatFormFieldModule,
      MatSelectModule,
      MatRadioModule,
      MatTooltipModule,
      MatCheckboxModule,
      MatAutocompleteModule,
      ScrollingModule, 
      MatButtonToggleModule,
   ],
})

export class AngularMaterialModule { 
   constructor(private cssLoaderService: CssLoaderService){
      this.cssLoaderService.loadStyle(LazyStyles.MatStyles);
    }
}
