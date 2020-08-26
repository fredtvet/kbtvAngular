import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Mission, Timesheet } from "src/app/core/models";
import { NotificationService } from 'src/app/core/services';
import { Notifications, Roles } from 'src/app/shared-app/enums';
import { UserTimesheetFormStore } from '../user-timesheet-form.store';
import { TimesheetFormConfig } from './timesheet-form-config.interface';

@Component({
  selector: 'app-user-timesheet-form',
  templateUrl: './user-timesheet-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class UserTimesheetFormComponent implements OnInit {
  Roles = Roles;

  @Input() config: TimesheetFormConfig;
  @Output() finished = new EventEmitter();

  timesheetPreset$: Observable<Timesheet>;

  missions$: Observable<Mission[]> = this.store.filteredMissions$;

  isCreateForm: boolean;

  constructor(
    private store: UserTimesheetFormStore,
    private notificationService: NotificationService) {
    }

  ngOnInit(){
    if(!this.config.idPreset) this.isCreateForm = true;
    else 
      this.timesheetPreset$ = this.store.get$(this.config.idPreset).pipe(
          tap(x => !x ? this.finished.emit() : null)
      );
  }

  onSubmit(timesheet: Timesheet): void{
    if(!timesheet || timesheet == null) this.finished.emit(null);
    if(this.isCreateForm) this.createTimesheet(timesheet)
    else this.editTimesheet(timesheet);
  }

  onMissionSearch = (input: string) => this.store.addMissionCriteria(input)

  createTimesheet(timesheet: Timesheet){
    this.store.add$(timesheet).subscribe(x => {
      this.notificationService.notify({
        title:'Time registrert!',        
        type: Notifications.Success
      })
      this.finished.emit(x);
    })
  }

  editTimesheet(timesheet: Timesheet){
    this.store.update$(timesheet).subscribe(x => {
      this.notificationService.notify({
        title:'Time oppdatert!',        
        type: Notifications.Success
      })
      this.finished.emit(x);
    })
  }

}
