import { Component, ChangeDetectionStrategy } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MissionFormSheetWrapperComponent } from './mission-form/mission-form-sheet-wrapper.component';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  template: '',
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class MissionFormEntryComponent {

  constructor(
    private bottomSheet: MatBottomSheet,
    private route: ActivatedRoute,
    private location: Location
    ) {
    let idPreset:number = +this.route.snapshot.queryParams['idPreset'];

    this.openDialog({idPreset});
   }

  openDialog = (data) => {
    let ref = this.bottomSheet.open(MissionFormSheetWrapperComponent, {data});
    ref.afterDismissed().subscribe(x => this.location.back())
  };
}
