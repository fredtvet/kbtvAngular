import { Component, OnInit, Inject, ChangeDetectionStrategy } from '@angular/core';
import { MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { SimpleNavConfig, AppButton } from 'src/app/shared/interfaces';

@Component({
  selector: 'app-mission-note-form-sheet-wrapper',
  template: `
  <app-simple-top-nav [config]="navConfig">
    <app-mission-note-form 
      [noteIdPreset]="data?.noteIdPreset"
      [missionId]="data?.missionId"
      (finished)="close()">
    </app-mission-note-form>
  </app-simple-top-nav> 
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MissionNoteFormSheetWrapperComponent implements OnInit {

  navConfig: SimpleNavConfig;

  constructor(
    private _bottomSheetRef: MatBottomSheetRef<MissionNoteFormSheetWrapperComponent>,  
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: {noteIdPreset: number, missionId: number}) { }

  ngOnInit() {
    this.navConfig = {
      title: (this.data && this.data.noteIdPreset) ? 'Rediger notat' : 'Registrer notat',
      leftBtn: {icon: 'close', callback: this.close} as AppButton,
    }
  }

  close = () => this._bottomSheetRef.dismiss();


}
