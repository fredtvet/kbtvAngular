import { Component, OnInit } from '@angular/core';
import { MatBottomSheet } from '@angular/material';
import { MissionFormSheetWrapperComponent } from './mission-form/mission-form-sheet-wrapper.component';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  template: ''
})

export class MissionFormEntryComponent implements OnInit {

  constructor(
    private bottomSheet: MatBottomSheet,
    private route: ActivatedRoute,
    private location: Location
    ) {
    let missionIdPreset:number = +this.route.snapshot.queryParams['id'];

    this.openDialog({missionIdPreset});
   }

  ngOnInit() { }

  openDialog = (data) => {
    let ref = this.bottomSheet.open(MissionFormSheetWrapperComponent, {data});
    ref.afterDismissed().subscribe(x => this.location.back())
  };
}
