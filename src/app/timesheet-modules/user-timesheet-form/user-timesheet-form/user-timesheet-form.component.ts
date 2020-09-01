import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Mission, Timesheet } from "src/app/core/models";
import { Roles } from 'src/app/shared-app/enums';
import { FormAction } from 'src/app/shared/enums';
import { TimesheetFormConfig } from '../../../shared-timesheet/interfaces/timesheet-form-config.interface';
import { UserTimesheetFormStore } from '../user-timesheet-form.store';

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
    private store: UserTimesheetFormStore) {}

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
    this.finished.emit(FormAction.Create);
    this.store.add$(timesheet).subscribe()
  }

  editTimesheet(timesheet: Timesheet){ 
    this.finished.emit(FormAction.Update);
    this.store.update$(timesheet).subscribe()
  }

}
