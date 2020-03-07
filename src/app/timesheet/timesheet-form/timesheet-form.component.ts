import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Mission, ROLES, Timesheet, NOTIFICATIONS } from 'src/app/shared';
import { take } from 'rxjs/operators';
import { TimesheetService, IdentityService, MissionService, NotificationService } from 'src/app/core';
import { Observable } from 'rxjs';
import * as moment from 'moment';

@Component({
  selector: 'app-timesheet-form',
  templateUrl: './timesheet-form.component.html',
  styleUrls: ['./timesheet-form.component.scss']
})

export class TimesheetFormComponent implements OnInit {
  ROLES = ROLES;

  missions: Observable<Mission[]>;

  startTime: Date;
  endTime: Date;
  date: Date;
  mission: Mission;

  error: string;

  constructor(
    private _timesheetService: TimesheetService,
    private _identityService: IdentityService,
    private _missionService: MissionService,
    private _notificationService: NotificationService) {}

  ngOnInit(){
    this.missions = this._missionService.getAll$();
  }

  onSubmit(){
    if(this.validateInputs()) this.submitTimesheet()
    else this._notificationService.setNotification("Alle felt på fylles ut", NOTIFICATIONS.Error)
  }

  submitTimesheet(){
    let timesheet: Timesheet = new Timesheet();

    timesheet.userName = this._identityService.getCurrentUser().userName;
    timesheet.missionId = this.mission.id;

    let date = this.date.toDateString();
    timesheet.startTime = new Date(date + " " + this.startTime.toTimeString());
    timesheet.endTime = new Date(date + " " + this.endTime.toTimeString());

    if(this.validateDates(timesheet)) this.createTimesheet(timesheet)
    else  this._notificationService.setNotification("Noe er feil med tidene", NOTIFICATIONS.Error);
  }

  createTimesheet(timesheet: Timesheet){
    if(!timesheet) return null;
    this._timesheetService.add$(timesheet).pipe(take(1)).subscribe();
  }

  displayFn(mission: Mission): string {
    if(mission == undefined) return null;
    return mission.address;
  }

  validateInputs(): boolean{
    if(this.startTime == null || this.endTime == null || this.date == null || this.mission.id == null) return false
    else return true;
  }

  validateDates(timesheet: Timesheet): boolean{
    if(timesheet.startTime == undefined || timesheet.endTime == undefined) return false
    else return true;

  }
}
