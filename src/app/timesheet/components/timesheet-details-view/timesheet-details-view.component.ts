import { Component, OnInit, Input, EventEmitter, Output, SimpleChanges } from '@angular/core';
import { TimesheetInfo, Mission, Timesheet } from 'src/app/shared/models';

@Component({
  selector: 'app-timesheet-details-view',
  templateUrl: './timesheet-details-view.component.html',
  styleUrls: ['./timesheet-details-view.component.scss']
})
export class TimesheetDetailsViewComponent implements OnInit {

  @Input() timesheetInfo: TimesheetInfo = new TimesheetInfo();

  @Input() date: Date;
  @Input() mission: Mission;

  @Output() allConfirmed = new EventEmitter();


  isDateView = false; //Switch between date and mission view

  constructor() { }

  ngOnInit() {
    if(this.date !== undefined) this.isDateView = true;
  }

  confirmAll(){
    this.allConfirmed.emit(this.timesheetInfo.openTimesheets.map(x => x.id));
  }
  
  sortByDate(timesheets: Timesheet[]){
    const t = timesheets;
    return t.sort((a: any, b: any) =>
        new Date(a.startTime).getTime() - new Date(b.startTime).getTime()
    );
  }
}
