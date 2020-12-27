import { NgModule } from '@angular/core';
import { AgGridModule } from 'ag-grid-angular';
import { CssLoaderService } from '../core/services/css-loader.service';
import { LazyStyles } from '../shared-app/enums';


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