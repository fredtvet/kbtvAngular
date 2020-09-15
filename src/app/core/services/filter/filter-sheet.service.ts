import { BottomSheetService } from '../../interfaces/bottom-sheet-service.interface';
import { Injectable } from '@angular/core';
import { MatBottomSheet, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { FilterSheetWrapperComponent } from './filter-sheet-wrapper.component';
import { FilterSheetWrapperConfig } from '../../filter/interfaces/filter-sheet-wrapper-config.interface';
import { FilterConfig } from '../../filter/interfaces/filter-config.interface';

@Injectable({ providedIn: "any" })
export class FilterSheetService implements BottomSheetService {

  constructor(private matBottomSheet: MatBottomSheet) {}

  open<TCriteria, TConfig>(config: FilterSheetWrapperConfig<TConfig>): 
    MatBottomSheetRef<FilterSheetWrapperComponent, TCriteria> {
    return this.matBottomSheet.open(FilterSheetWrapperComponent, { data: config });
  }
}