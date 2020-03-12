import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { TimesheetInfo } from 'src/app/shared/models';

@Component({
  selector: 'app-timesheet-details-view',
  templateUrl: './timesheet-details-view.component.html',
  styleUrls: ['./timesheet-details-view.component.scss']
})
export class TimesheetDetailsViewComponent implements OnInit {

  @Input() timesheetInfo: TimesheetInfo = new TimesheetInfo();
  @Input() date: Date;

  @Output() allConfirmed = new EventEmitter();
  @Output() hasConfirmed = new EventEmitter();
  @Output() hasDeleted = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  confirmAll(){
    this.allConfirmed.emit(this.timesheetInfo.openTimesheets.map(x => x.id));
  }

}
