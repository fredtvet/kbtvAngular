import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Mission, Timesheet } from 'src/app/shared/models';
import { Notifications, Roles } from 'src/app/shared/enums';
import { take, map, switchMap, tap } from 'rxjs/operators';
import { UserTimesheetService, IdentityService, MissionService, NotificationService } from 'src/app/core/services';
import { Observable, BehaviorSubject, Subject } from 'rxjs';

@Component({
  selector: 'app-timesheet-form',
  templateUrl: './timesheet-form.component.html'
})

export class TimesheetFormComponent implements OnInit {
  Roles = Roles;

  @Input() timesheetIdPreset: number;
  @Input() datePreset: Date;
  @Input() missionPreset: Mission;

  @Output() finished = new EventEmitter();

  timesheetPreset$: Observable<Timesheet>;
  
  missionsSearchSubject = new BehaviorSubject<string>('');
  missions$: Observable<Mission[]>;

  isCreateForm: boolean;

  constructor(
    private _userTimesheetService: UserTimesheetService,
    private _missionService: MissionService,
    private _notificationService: NotificationService) {
    }

  ngOnInit(){
    this.missions$ = this.missionsSearchSubject.asObservable().pipe(
      switchMap(input => this._missionService.getBy$(x => this.filterMission(x, input))),
    )

    if(!this.timesheetIdPreset) this.isCreateForm = true;
    else 
      this.timesheetPreset$ = this._userTimesheetService.get$(this.timesheetIdPreset).pipe(
          tap(x => {if(!x){this.finished.emit();}})
      );
  }

  onSubmit(timesheet: Timesheet): void{
    if(this.isCreateForm) this.createTimesheet(timesheet)
    else this.editTimesheet(timesheet);
  }

  onMissionSearch = (input: string) => this.missionsSearchSubject.next(input)

  createTimesheet(timesheet: Timesheet){
    //timesheet.userName = this._identityService.getCurrentUser().userName;
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



  private filterMission(mission: Mission, input: string){
    let exp = (!input || input == null || mission.address.toLowerCase().includes(input.toLowerCase()));
    let id = +input;
    if(!isNaN(id)) exp = exp || mission.id === id
    return exp;
  }
}
