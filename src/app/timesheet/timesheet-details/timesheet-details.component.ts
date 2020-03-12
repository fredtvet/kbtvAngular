import { Component, OnInit } from '@angular/core';
import { MainNavConfig } from 'src/app/shared/layout';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { TimesheetService, IdentityService } from 'src/app/core/services';
import { Observable } from 'rxjs';
import { Timesheet, User, TimesheetInfo } from 'src/app/shared/models';
import { TimesheetStatus } from 'src/app/shared/enums';

@Component({
  selector: 'app-timesheet-details',
  templateUrl: './timesheet-details.component.html',
  styleUrls: ['./timesheet-details.component.scss']
})
export class TimesheetDetailsComponent implements OnInit {

  mainCfg = new MainNavConfig();
  momentDate: moment.Moment;
  date: Date; //bad workaround, freeze when toDate used in template
  user: User;

  endTime: string;
  startTime: string;

  timesheetInfo$: Observable<TimesheetInfo>;

  constructor(
    private timesheetService: TimesheetService,
    private identityService: IdentityService,
    private route: ActivatedRoute,
    private router: Router) {
    this.mainCfg.menuBtnEnabled = false;
  }

  ngOnInit() {
    this.user = this.identityService.getCurrentUser();

    this.setDateWithRoute();
    this.timesheetInfo$ = this.timesheetService.getByMomentAndUserName$(this.momentDate, this.user.userName)
    this.mainCfg.title = this.momentDate.format('Do MMMM YYYY')
  }

  setDateWithRoute(){
    this.momentDate = moment()
      .day(+this.route.snapshot.params['weekDay'])
      .year(+this.route.snapshot.params['year'])
      .isoWeek(+this.route.snapshot.params['weekNr']);
    this.date = this.momentDate.toDate();
  }

  deleteTimesheet(id: number){
     this.timesheetService.delete$(id).subscribe();
  }

  confirmTimesheet(id: number){
    this.timesheetService.changeStatus$(id, TimesheetStatus.Confirmed).subscribe();
  }

  confirmTimesheets(ids: number[]){
    if(ids.length == 0) return null;
    this.timesheetService.changeStatuses$(ids, TimesheetStatus.Confirmed).subscribe();
  }

  onBack(){
    this.router.navigate(['timeliste']);
  }


}
