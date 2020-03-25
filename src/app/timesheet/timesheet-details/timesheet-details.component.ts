import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { MainNavConfig } from 'src/app/shared/layout';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { TimesheetService, IdentityService, MissionService, SessionService } from 'src/app/core/services';
import { Observable } from 'rxjs';
import { User, TimesheetInfo, Mission, Timesheet } from 'src/app/shared/models';
import { TimesheetStatus, TimesheetFilters } from 'src/app/shared/enums';
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

  timesheets$: Observable<Timesheet[]>;

  constructor(
    private sessionService: SessionService,
    private timesheetService: TimesheetService,
    private identityService: IdentityService,
    private missionService: MissionService,
    private route: ActivatedRoute,
    private router: Router) {
    this.mainCfg.menuBtnEnabled = false;
  }

  ngOnInit() {
    this.user = this.identityService.getCurrentUser();
    this.checkForPreset();
  }

  checkForPreset(){
    let preset = this.route.snapshot.params['preset'] as TimesheetFilters;
    if(preset == TimesheetFilters.Mission) this.configureForMissionRoute();
    else if(preset == TimesheetFilters.DateParams) this.configureForDateRoute();
  }

  configureForDateRoute(): void{
    const args = this.sessionService.timesheetDateParams; 
    if(!args || !args.weekNr || !args.weekDay || !args.year) return undefined;

    this.momentDate = moment().year(args.year).week(args.weekNr).isoWeekday(args.weekDay);
    this.date = this.momentDate.toDate();

    this.timesheets$ = this.timesheetService.getBy$(x => x.status === TimesheetStatus.Open)
    //this.timesheets$ = this.timesheetService.getByMomentAndUserName$(this.momentDate, this.user.userName);
    this.mainCfg.title = this.momentDate.format('Do MMMM YYYY')
  }

  configureForMissionRoute(): void{
    let missionId = this.sessionService.missionId;
    if(!missionId) return undefined;
    this.mission$ = this.missionService.get$(missionId);
    this.timesheets$ = this.timesheetService.getBy$(x => x.missionId == missionId).pipe(tap(console.log));
  }

  confirmTimesheets(ids: number[]){
    if(ids.length == 0) return null;
    this.timesheetService.changeStatuses$(ids, TimesheetStatus.Confirmed).subscribe();
  }

  onBack(): void {
    let returnRoute: string = this.route.snapshot.params['returnRoute'];
    if(returnRoute != undefined) this.router.navigate([returnRoute])
    else this.router.navigate(['timeliste/uker'])
  }

}
