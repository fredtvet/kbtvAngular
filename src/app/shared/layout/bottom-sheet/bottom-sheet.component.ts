import { Component, EventEmitter, Output, Inject, ViewEncapsulation } from '@angular/core';
import { MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { NavAction } from '../../components/nav-action.model';
import { BottomSheetActionHubService } from 'src/app/core/services/ui/bottom-sheet-action-hub.service';
import { AppButton } from '../../interfaces/app-button.interface';

@Component({
  selector: 'app-bottom-sheet',
  templateUrl: './bottom-sheet.component.html',
  styleUrls: ['./bottom-sheet.component.scss'],
  encapsulation : ViewEncapsulation.None,
})
export class BottomSheetComponent {
  constructor(
    private _bottomSheetRef: MatBottomSheetRef<BottomSheetComponent>,
    @Inject(MAT_BOTTOM_SHEET_DATA) public buttons: AppButton[]) { }

  ngOnInit(){
  }

  handleFn = (fn: Function) => {
    fn();
    this._bottomSheetRef.dismiss();
  }

}
