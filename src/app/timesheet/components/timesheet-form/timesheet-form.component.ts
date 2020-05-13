import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Mission, Timesheet } from 'src/app/shared/models';
import { Notifications, Roles } from 'src/app/shared/enums';
import { take, map, switchMap, tap } from 'rxjs/operators';
import { UserTimesheetService, IdentityService, MissionService, NotificationService } from 'src/app/core/services';
import { Observable, BehaviorSubject } from 'rxjs';

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

  private missionSearchSubject = new BehaviorSubject<string>('');
  private missionSearch$ = this.missionSearchSubject.asObservable();

  missions$: Observable<Mission[]>;
  timesheetPreset$: Observable<Timesheet>;

  isCreateForm: boolean;

  constructor(
    private _userTimesheetService: UserTimesheetService,
    private _missionService: MissionService,
    private _notificationService: NotificationService) {
    }

  ngOnInit(){
    if(!this.timesheetIdPreset) this.isCreateForm = true;

    this.timesheetPreset$ = this._userTimesheetService.get$(this.timesheetIdPreset).pipe(
      tap(x => {if(!x && !this.isCreateForm){this.finished.emit();}})
    );
    
    this.missions$ = this.missionSearch$.pipe(
      switchMap(input => {
        return this._missionService.getBy$(x => this.filterMission(x, input))
      }),
      map(this._missionService.sortByHistory)
    );
  }

  onSubmit(timesheet: Timesheet): void{
    console.log(timesheet);
    if(this.isCreateForm) this.createTimesheet(timesheet)
    else this.editTimesheet(timesheet);
  }

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

  onSearch = (input: string) => {this.missionSearchSubject.next(input)};

  private filterMission(mission: Mission, input: string){
    let exp = (!input || input == null || mission.address.toLowerCase().includes(input.toLowerCase()));
    let id = +input;
    if(!isNaN(id)) exp = exp || mission.id === id
    return exp;
  }
}
