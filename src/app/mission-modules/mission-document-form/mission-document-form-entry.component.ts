import { Component, ChangeDetectionStrategy } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { MissionDocumentFormSheetWrapperComponent } from './mission-document-form/mission-document-form-sheet-wrapper.component';

@Component({
  template: '',
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class MissionDocumentFormEntryComponent {

  constructor(
    private bottomSheet: MatBottomSheet,
    private route: ActivatedRoute,
    private location: Location
    ) {  
    let missionId:number = +this.route.snapshot.queryParams['missionId'];
    this.openDialog({missionId});
   }

  openDialog = (data: any) => {
    let ref = this.bottomSheet.open(MissionDocumentFormSheetWrapperComponent, data);
    ref.afterDismissed().subscribe(x => this.location.back())
  };
}
