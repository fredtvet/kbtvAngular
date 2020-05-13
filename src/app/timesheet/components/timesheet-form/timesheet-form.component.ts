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

  missions$: Observable<Mission[]> = this._missionService.getAll$();
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

}
