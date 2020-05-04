import { Component, OnInit, Input } from '@angular/core';
import { Mission, Timesheet } from 'src/app/shared/models';
import { Notifications, Roles } from 'src/app/shared/enums';
import { take } from 'rxjs/operators';
import { UserTimesheetService, IdentityService, MissionService, NotificationService } from 'src/app/core/services';
import { Observable } from 'rxjs';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-timesheet-form',
  templateUrl: './timesheet-form.component.html'
})

export class TimesheetFormComponent implements OnInit {
  Roles = Roles;

  @Input() date: Date;
  @Input() mission: Mission = new Mission();

  missions: Observable<Mission[]>;

  initTime: Date = new Date();
  timeRange: Date[];

  comment: string;

  dateDisabled = false;
  missionDisabled = false;

  error: string;

  constructor(
    private _userTimesheetService: UserTimesheetService,
    private _identityService: IdentityService,
    private _missionService: MissionService,
    private _notificationService: NotificationService,
    private dialogRef: MatDialogRef<TimesheetFormComponent>) {
      this.initTime.setHours(6,0,0,0);
    }

  ngOnInit(){
    this.missions = this._missionService.getAll$();
    if(this.date !== undefined) this.dateDisabled = true;
    if(this.mission !== undefined && this.mission.id !== null) this.missionDisabled = true;
  }

  onSubmit(){
    if(this.validateInputs()) this.submitTimesheet()
    else this._notificationService.setNotification("Alle felt på fylles ut", Notifications.Error)
  }

  submitTimesheet(){
    let timesheet: Timesheet = new Timesheet();

    timesheet.userName = this._identityService.getCurrentUser().userName;
    timesheet.missionId = this.mission.id;
    timesheet.comment = this.comment;

    let date = this.date.toDateString();

    timesheet.startTime = new Date(date + " " + this.timeRange[0].toTimeString());
    timesheet.endTime = new Date(date + " " + this.timeRange[1].toTimeString());

    if(this.validateDates(timesheet)) 
      this._userTimesheetService.add$(timesheet).subscribe(x => this.dialogRef.close(x));
    else 
      this._notificationService.setNotification("Sluttidspunkt må være etter starttidspunkt", Notifications.Error);   
  }

  displayFn(mission: Mission): string {
    if(mission == undefined) return null;
    return mission.address;
  }

  validateInputs(): boolean{
    if(
      !this.comment ||
      !this.timeRange || 
      this.timeRange[0] == null || 
      this.timeRange[1] == null || 
      this.date == null || 
      this.mission.id == null) return false
    else return true;
  }

  validateDates(timesheet: Timesheet): boolean{
    if(timesheet.startTime == undefined || timesheet.endTime == undefined) return false
    else if(timesheet.startTime > timesheet.endTime) return false; //Check if start time is later than end time
    else return true;
  }
}
