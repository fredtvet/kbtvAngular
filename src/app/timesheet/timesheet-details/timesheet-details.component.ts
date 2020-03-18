import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { MainNavConfig } from 'src/app/shared/layout';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { TimesheetService, IdentityService, MissionService } from 'src/app/core/services';
import { Observable } from 'rxjs';
import { User, TimesheetInfo, Mission } from 'src/app/shared/models';
import { TimesheetStatus } from 'src/app/shared/enums';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-timesheet-details',
  templateUrl: './timesheet-details.component.html',
  styleUrls: ['./timesheet-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TimesheetDetailsComponent implements OnInit {

  mainCfg = new MainNavConfig();
  momentDate: moment.Moment;
  date: Date; //bad workaround, freeze when toDate used in template
  mission$: Observable<Mission>;
  user: User;

  endTime: string;
  startTime: string;

  timesheetInfo$: Observable<TimesheetInfo>;

  constructor(
    private timesheetService: TimesheetService,
    private identityService: IdentityService,
    private missionService: MissionService,
    private route: ActivatedRoute,
    private router: Router) {
    this.mainCfg.menuBtnEnabled = false;
  }

  ngOnInit() {
    this.user = this.identityService.getCurrentUser();
    this.configureForMissionRoute();
    this.configureForDateRoute();
  }

  configureForDateRoute(): void{
    let args = { 
      weekDay: +this.route.snapshot.params['weekDay'], 
      year: +this.route.snapshot.params['year'], 
      week: +this.route.snapshot.params['weekNr']
    };
    
    if(isNaN(args.week) || isNaN(args.weekDay) || isNaN(args.year)) 
      return undefined;

    this.momentDate = moment().year(args.year).week(args.week).isoWeekday(args.weekDay);
    this.date = this.momentDate.toDate();

    this.timesheetInfo$ = this.timesheetService.getByMomentAndUserName$(this.momentDate, this.user.userName);
    this.mainCfg.title = this.momentDate.format('Do MMMM YYYY')
  }

  configureForMissionRoute(): void{
    let missionId = +this.route.snapshot.params['missionId'];
    if(isNaN(missionId)) return undefined;
    this.mission$ = this.missionService.get$(+this.route.snapshot.params['missionId']);
    this.timesheetInfo$ = this.timesheetService.getByMissionId$(missionId);
  }

  confirmTimesheets(ids: number[]){
    if(ids.length == 0) return null;
    this.timesheetService.changeStatuses$(ids, TimesheetStatus.Confirmed).subscribe();
  }

  onBack(): void {
    let returnRoute: string = this.route.snapshot.params['returnRoute'];
    if(returnRoute != undefined) this.router.navigate([returnRoute])
    else this.router.navigate(['timeliste'])
  }

}
