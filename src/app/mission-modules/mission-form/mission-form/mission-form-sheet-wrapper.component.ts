import { Component, OnInit, Inject, ChangeDetectionStrategy, ViewChild, ElementRef } from '@angular/core';
import { MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { SimpleNavConfig, AppButton } from 'src/app/shared/interfaces';
import { MissionService } from 'src/app/core/services';

@Component({
  selector: 'app-mission-form-sheet-wrapper',
  template: `
  <app-simple-top-nav [config]="navConfig">
    <app-mission-form 
      [idPreset]="data?.idPreset"
      (finished)="close()">
    </app-mission-form>
  </app-simple-top-nav> 

  <input type="file" style="display:none" multiple #pdfInput (change)="createFromPdf($event.target.files[0])">
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
  
})
export class MissionFormSheetWrapperComponent implements OnInit {
  @ViewChild('pdfInput') pdfInput: ElementRef;
  navConfig: SimpleNavConfig;

  constructor(
    private missionService: MissionService,
    private _bottomSheetRef: MatBottomSheetRef<MissionFormSheetWrapperComponent>,  
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: {idPreset: number}) { }

  ngOnInit() {
    this.navConfig = {
      title: (this.data && this.data.idPreset) ? 'Rediger oppdrag' : 'Registrer oppdrag',
      leftBtn: {icon: 'close', callback: this.close} as AppButton,
      buttons: [{icon: 'note_add', callback: this.openPdfInput}] as AppButton[]
    }
  }

  close = () => this._bottomSheetRef.dismiss();

  createFromPdf = (pdf: File) => 
    this.missionService.addMissionFromPdfReport$(pdf).subscribe(x => this.close());
  
  private openPdfInput = () => this.pdfInput.nativeElement.click();
}
