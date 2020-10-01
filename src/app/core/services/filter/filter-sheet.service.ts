import { Injectable } from '@angular/core';
import { MatBottomSheet, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { BottomSheetService } from 'src/app/shared-app/interfaces/bottom-sheet-service.interface';
import { FilterSheetWrapperComponent } from './components/filter-sheet-wrapper.component';
import { FilterSheetWrapperConfig } from './interfaces/filter-sheet-wrapper-config.interface';

@Injectable({ providedIn: "any" })
export class FilterSheetService implements BottomSheetService {

  constructor(private matBottomSheet: MatBottomSheet) {}

  open<TCriteria, TConfig>(config: FilterSheetWrapperConfig<TConfig>): 
    MatBottomSheetRef<FilterSheetWrapperComponent, TCriteria> {
    return this.matBottomSheet.open(FilterSheetWrapperComponent, { data: config });
  }
}