import { ChangeDetectionStrategy, Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import { AppButton, SimpleNavConfig } from 'src/app/shared-app/interfaces';
import { MissionFormStore } from '../mission-form.store';

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
    private store: MissionFormStore,
    private bottomSheetRef: MatBottomSheetRef<MissionFormSheetWrapperComponent>,  
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: {idPreset: number}) { }

  ngOnInit() {
    this.navConfig = {
      title: (this.data && this.data.idPreset) ? 'Rediger oppdrag' : 'Registrer oppdrag',
      leftBtn: {icon: 'close', callback: this.close} as AppButton,
      buttons: [{icon: 'note_add', callback: this.openPdfInput}] as AppButton[]
    }
  }

  close = () => this.bottomSheetRef.dismiss();

  createFromPdf = (pdf: File) => 
    this.store.addFromPdfReport$(pdf).subscribe(x => this.close());
  
  private openPdfInput = () => this.pdfInput.nativeElement.click();
}
