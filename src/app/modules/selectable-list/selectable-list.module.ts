import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatRippleModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { ArraySlicePipe } from './array-slice.pipe';
import { NumberToArrayPipe } from './number-to-array.pipe';
import { SelectableCardComponent } from './selectable-card/selectable-card.component';
import { SelectableListComponent } from './selectable-list/selectable-list.component';

@NgModule({
  declarations: [
    SelectableListComponent,
    SelectableCardComponent,
    ArraySlicePipe,
    NumberToArrayPipe,
  ],
  imports: [ 
    CommonModule, 
    MatIconModule,
    MatRippleModule,
  ],
  exports: [
    SelectableListComponent
  ],
})
export class SelectableListModule { }
