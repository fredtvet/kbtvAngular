import { Injectable } from '@angular/core';
import { MatBottomSheet, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { AppButton } from '@shared-app/interfaces/app-button.interface';
import { BottomSheetMenuComponent } from '@shared/components/bottom-sheet-menu.component';

@Injectable({ providedIn: "any" })
export class BottomSheetMenuService {

  constructor(private matBottomSheet: MatBottomSheet) {}

  open(buttons: AppButton[]): MatBottomSheetRef<BottomSheetMenuComponent> {
    return this.matBottomSheet.open(BottomSheetMenuComponent, { data: buttons, panelClass: "p-0" });
  }
}