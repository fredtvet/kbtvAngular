import { Component, ChangeDetectionStrategy } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { TimesheetFormSheetWrapperComponent } from './timesheet-form/timesheet-form-sheet-wrapper.component';
import { TimesheetFormConfig } from './timesheet-form-config.interface';

@Component({
  template: '',
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class TimesheetFormEntryComponent {

  constructor(
    private bottomSheet: MatBottomSheet,
    private route: ActivatedRoute,
    private location: Location
    ) {
      
    let config: TimesheetFormConfig = {
      idPreset: +this.route.snapshot.queryParams['idPreset'],
      missionPreset: this.route.snapshot.queryParams['missionPreset'] ? JSON.parse(this.route.snapshot.queryParams['missionPreset']) : undefined,
      datePreset: this.route.snapshot.queryParams['datePreset'] ? new Date(this.route.snapshot.queryParams['datePreset']) : undefined
    }

    this.openDialog(config);
   }

  openDialog = (data: TimesheetFormConfig) => {
    let ref = this.bottomSheet.open(TimesheetFormSheetWrapperComponent, {data});
    ref.afterDismissed().subscribe(x => this.location.back())
  };
}
