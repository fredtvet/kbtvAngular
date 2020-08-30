import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Mission, Timesheet } from "src/app/core/models";
import { Roles } from 'src/app/shared-app/enums';
import { UserTimesheetFormStore } from '../user-timesheet-form.store';
import { TimesheetFormConfig } from '../../../shared-timesheet/interfaces/timesheet-form-config.interface';
import { FormAction } from 'src/app/shared/enums';
import { NotificationType, NotificationService } from 'src/app/core/services/notification';

@Component({
  selector: 'app-user-timesheet-form',
  template: `
  <app-user-timesheet-form-view 
    [config]="config"
    [timesheet]="timesheet$ | async"
    [missions]="missions$ | async"
    (formSubmitted)="onSubmit($event)"
    (missionsSearch)="onMissionSearch($event)">
  </app-user-timesheet-form-view>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class UserTimesheetFormComponent implements OnInit {
  Roles = Roles;

  @Input() config: TimesheetFormConfig;
  @Output() finished = new EventEmitter();

  timesheet$: Observable<Timesheet>;

  missions$: Observable<Mission[]> = this.store.filteredMissions$;

  isCreateForm: boolean;

  constructor(
    private store: UserTimesheetFormStore,
    private notificationService: NotificationService) {
    }

  ngOnInit(){
    if(!this.config.entityId) this.isCreateForm = true;
    else 
      this.timesheet$ = this.store.get$(this.config.entityId).pipe(
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
        type: NotificationType.Success
      })
      this.finished.emit(FormAction.Create);
    })
  }

  editTimesheet(timesheet: Timesheet){
    this.store.update$(timesheet).subscribe(x => {
      this.notificationService.notify({
        title:'Time oppdatert!',        
        type: NotificationType.Success
      })
      this.finished.emit(FormAction.Update);
    })
  }

}
