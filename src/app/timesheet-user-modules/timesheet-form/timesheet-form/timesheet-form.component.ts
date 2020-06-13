import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { Mission, Timesheet } from "src/app/core/models";
import { Roles } from 'src/app/shared-app/enums';
import { switchMap, tap } from 'rxjs/operators';
import { UserTimesheetService, MissionService, NotificationService, DateTimeService } from 'src/app/core/services';
import { Observable, BehaviorSubject } from 'rxjs';
import { TimesheetFormConfig } from '../timesheet-form-config.interface';

@Component({
  selector: 'app-timesheet-form',
  templateUrl: './timesheet-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class TimesheetFormComponent implements OnInit {
  Roles = Roles;

  @Input() config: TimesheetFormConfig;
  @Output() finished = new EventEmitter();

  timesheetPreset$: Observable<Timesheet>;
  
  missionsSearchSubject = new BehaviorSubject<string>(undefined);
  missions$: Observable<Mission[]>;

  isCreateForm: boolean;

  constructor(
    private _dateTimeService: DateTimeService,
    private _userTimesheetService: UserTimesheetService,
    private _missionService: MissionService,
    private _notificationService: NotificationService) {
    }

  ngOnInit(){
    this.missions$ = this.missionsSearchSubject.asObservable().pipe(
      switchMap(input => this._missionService.getBy$(x => this.filterMission(x, input))),
    )

    if(!this.config.idPreset) this.isCreateForm = true;
    else 
      this.timesheetPreset$ = this._userTimesheetService.get$(this.config.idPreset).pipe(
          tap(x => {if(!x){this.finished.emit();}})
      );
  }

  onSubmit(timesheet: Timesheet): void{
    if(!timesheet || timesheet == null) this.finished.emit(null);
    if(this.isCreateForm) this.createTimesheet(timesheet)
    else this.editTimesheet(timesheet);
  }

  onMissionSearch = (input: string) => this.missionsSearchSubject.next(input)

  createTimesheet(timesheet: Timesheet){
    this._userTimesheetService.add$(timesheet).subscribe(x => {
      this._notificationService.setNotification('Time registrert!');
      this.finished.emit(x);
    })
  }

  editTimesheet(timesheet: Timesheet){
    this._userTimesheetService.update$(timesheet).subscribe(x => {
      this._notificationService.setNotification('Time oppdatert!');
      this.finished.emit(x);
    })
  }

  private filterMission(mission: Mission, input: string): boolean{
    if(!input) return this.filterInitialMission(mission);
    let exp = (!input || input == null || mission.address.toLowerCase().includes(input.toLowerCase()));
    let id = +input;
    if(!isNaN(id)) exp = exp || mission.id === id //If search input is number, include id search
    return exp;
  }

  private filterInitialMission(mission: Mission): boolean{
    let thirtyDaysAgo = this._dateTimeService.getNDaysAgo(30);
    let exp = new Date(mission.updatedAt).getTime() >= thirtyDaysAgo; //Grab missions updated last 30 days
    exp = exp || new Date(mission.lastVisited).getTime() >= thirtyDaysAgo;//Grab missions visited last 30 days
    return exp;
  }
}
