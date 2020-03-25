import { Component, OnInit, Input, EventEmitter, Output, SimpleChanges } from '@angular/core';
import { Mission, Timesheet } from 'src/app/shared/models';
import { TimesheetStatus } from 'src/app/shared/enums';

@Component({
  selector: 'app-timesheet-details-view',
  templateUrl: './timesheet-details-view.component.html',
  styleUrls: ['./timesheet-details-view.component.scss']
})
export class TimesheetDetailsViewComponent implements OnInit {

  @Input() timesheets: Timesheet[];

  @Input() date: Date;
  @Input() mission: Mission;

  @Output() allConfirmed = new EventEmitter();


  isDateView = false; //Switch between date and mission view

  constructor() { }

  ngOnInit() {
    if(this.date !== undefined) this.isDateView = true;
  }

  confirmAll(){ 
    let ids = this.timesheets.reduce((acc, timesheet) => {
      if(timesheet.status === TimesheetStatus.Open) acc.push(timesheet.id);
      return acc;
    }, []);
    this.allConfirmed.emit(ids);
  }
}
