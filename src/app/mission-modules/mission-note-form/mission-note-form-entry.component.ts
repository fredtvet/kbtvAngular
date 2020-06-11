import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { MissionNoteFormSheetWrapperComponent } from './mission-note-form/mission-note-form-sheet-wrapper.component';

@Component({
  template: '',
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class MissionNoteFormEntryComponent {

  constructor(
    private bottomSheet: MatBottomSheet,
    private route: ActivatedRoute,
    private location: Location
    ) {
    let idPreset:number = +this.route.snapshot.queryParams['idPreset'];
    let missionId:number = +this.route.snapshot.queryParams['missionId'];
    this.openDialog({idPreset, missionId});
   }

  openDialog = (data) => {
    let ref = this.bottomSheet.open(MissionNoteFormSheetWrapperComponent, {data});
    ref.afterDismissed().subscribe(x => this.location.back())
  };
}
