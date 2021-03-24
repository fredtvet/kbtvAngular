import { Injectable } from '@angular/core';
import { MatBottomSheet, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { BottomSheetAction } from './bottom-sheet-action.interface';
import { BottomSheetMenuComponent } from './bottom-sheet-menu.component';

@Injectable({ providedIn: "any" })
export class BottomSheetMenuService {

  constructor(private matBottomSheet: MatBottomSheet) {}

  open(actions: BottomSheetAction[]): MatBottomSheetRef<BottomSheetMenuComponent> {
    return this.matBottomSheet.open(BottomSheetMenuComponent, { data: actions, panelClass: "p-0" });
  }
}