import { NgModule } from '@angular/core';
import { LazyStyles } from '@shared-app/enums/lazy-styles.enum';
import { AgGridModule } from 'ag-grid-angular';
import { CssLoaderService } from '../core/services/css-loader.service';

@NgModule({
  declarations: [],
  imports: [
    AgGridModule.withComponents([]),
  ],
  exports: [
    AgGridModule
  ]
})
export class AppAgGridModule { 
  constructor(private cssLoaderService: CssLoaderService){
    this.cssLoaderService.load(LazyStyles.AgGrid);
  }
}
