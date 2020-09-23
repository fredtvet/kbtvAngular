import { Component, Inject, ChangeDetectionStrategy } from '@angular/core';
import { MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { AppButton } from 'src/app/shared-app/interfaces';

@Component({
  selector: 'app-bottom-sheet-menu',
  templateUrl: './bottom-sheet-menu.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BottomSheetMenuComponent {
  constructor(
    private _bottomSheetRef: MatBottomSheetRef<BottomSheetMenuComponent>,
    @Inject(MAT_BOTTOM_SHEET_DATA) public buttons: AppButton[]) { }

  handleFn = (fn: Function, parameters: any[] = []) => {
    fn(...parameters);
    this.close();
  };

  close = () => this._bottomSheetRef.dismiss();
  
}
