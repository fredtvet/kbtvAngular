import { Component, Input, EventEmitter, Output, ChangeDetectionStrategy, SimpleChanges } from '@angular/core';
import { TimesheetStatus } from '../../enums/timesheet-status.enum';
import { Timesheet } from '../../models/timesheet.model';
import { Roles } from '../../enums/roles.enum';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { TimesheetFormSheetWrapperComponent } from 'src/app/timesheet/components/timesheet-form/timesheet-form-sheet-wrapper.component';

@Component({
  selector: 'app-timesheet-card',
  templateUrl: './timesheet-card.component.html',
  styleUrls: ['./timesheet-card.component.scss'],
})

export class TimesheetCardComponent {
  Roles = Roles;

  @Input() adminView: boolean = false;
  @Input() timesheet: Timesheet;
  @Output() statusChanged = new EventEmitter();
  @Output() deleteClicked = new EventEmitter();
  @Output() editClicked = new EventEmitter();

  constructor(private _bottomSheet: MatBottomSheet) { }

  deleteTimesheet = () => this.deleteClicked.emit(this.timesheet.id);

  editTimesheet(){ 
    this.editClicked.emit(this.timesheet.id);
    //this._bottomSheet.open(TimesheetFormSheetWrapperComponent, { data: { timesheetIdPreset: this.timesheet.id } });  
  }

  changeStatus = () => {
    let status = this.timesheet.status === TimesheetStatus.Open ? TimesheetStatus.Confirmed : TimesheetStatus.Open;
    this.statusChanged.emit({id: this.timesheet.id, status})
  };
}
