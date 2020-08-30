import { ScrollingModule } from '@angular/cdk/scrolling';
import { NgModule } from '@angular/core';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
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
      MatDialogModule,
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
      MatDialogModule,
   ],
})

export class AngularMaterialModule { 
   constructor(private cssLoaderService: CssLoaderService){
      this.cssLoaderService.loadStyle(LazyStyles.MatStyles);
    }
}
