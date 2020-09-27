import { Injectable } from '@angular/core';
import { MatBottomSheet, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { AppButton } from 'src/app/shared-app/interfaces';
import { BottomSheetMenuComponent } from 'src/app/shared/components';

@Injectable({ providedIn: "any" })
export class BottomSheetMenuService {

  constructor(private matBottomSheet: MatBottomSheet) {}

  open(buttons: AppButton[]): MatBottomSheetRef<BottomSheetMenuComponent> {
    return this.matBottomSheet.open(BottomSheetMenuComponent, { data: buttons });
  }
}