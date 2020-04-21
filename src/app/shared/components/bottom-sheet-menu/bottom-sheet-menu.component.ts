import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { AppButton } from '../../interfaces/app-button.interface';

@Component({
  selector: 'app-bottom-sheet-menu',
  templateUrl: './bottom-sheet-menu.component.html',
  styleUrls: ['./bottom-sheet-menu.component.scss'],
  encapsulation : ViewEncapsulation.None,
})
export class BottomSheetMenuComponent {
  constructor(
    private _bottomSheetRef: MatBottomSheetRef<BottomSheetMenuComponent>,
    @Inject(MAT_BOTTOM_SHEET_DATA) public buttons: AppButton[]) { }

  ngOnInit(){
  }

  handleFn = (fn: Function) => {
    fn();
    this._bottomSheetRef.dismiss();
  }

}
