import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Timesheet } from 'src/app/shared/models';
import * as moment from 'moment';
import { TimesheetService } from 'src/app/core/services';
import { TimesheetStatus } from 'src/app/shared/enums';
import { SubscriptionComponent } from 'src/app/subscription.component';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-timesheet-card',
  templateUrl: './timesheet-card.component.html',
  styleUrls: ['./timesheet-card.component.scss']
})
export class TimesheetCardComponent extends SubscriptionComponent {

  @Input() timesheetId: number;
  @Input() inDialog: boolean = false;
  @Output() dialogClosed = new EventEmitter();

  startDate: moment.Moment;
  endDate: moment.Moment;
  duration: moment.Duration;
  
  timesheet: Timesheet;

  constructor(private timesheetService: TimesheetService) { super(); }

  ngOnInit() {
    this.timesheetService.getWithMission$(this.timesheetId)
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(x => {
        if(x === undefined) return undefined;
        this.timesheet = x;
        this.startDate = moment(this.timesheet.startTime);
        this.endDate = moment(this.timesheet.endTime);
        this.calcDifference();
      })
  }

  calcDifference(){
    this.duration = moment.duration(this.endDate.diff(this.startDate));
  }

  deleteTimesheet(){
    this.timesheetService.delete$(this.timesheet.id)
      .subscribe(x => this.closeIfDialog());
  }

  confirmTimesheet(){
    this.timesheetService.changeStatus$(this.timesheet.id, TimesheetStatus.Confirmed)
      .subscribe(x => this.closeIfDialog());
  }

  closeIfDialog(){
    if(this.inDialog) this.dialogClosed.emit();
  }

}
